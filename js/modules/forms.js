// modules/forms.js - Interações de formulário
import { toast } from "../app.js";
import { buscarCEP } from "../services/api.js";
import { storage } from "../services/storage.js";
import { FormValidator } from "../services/validation.js";
import { applyMask, masks } from "../utils/masks.js";

const STORAGE_KEY = "ongmrqs:volunteers";

export function initForms() {
  setupEnhancements();
  document.addEventListener("route:rendered", ({ detail }) => {
    if (detail.route === "cadastro") setupEnhancements();
  });
}

// Função para configurar as melhorias do formulário
function setupEnhancements() {
  const form =
    document.querySelector("form#form-cadastro") ||
    document.querySelector('form[action="#"]');
  if (!form) return;

  const cpf = form.querySelector("#cpf");
  const tel = form.querySelector("#telefone");
  const cep = form.querySelector("#cep");

  if (cpf) applyMask(cpf, masks.cpf);
  if (tel) applyMask(tel, masks.telefone);
  if (cep) applyMask(cep, masks.cep);

  const validator = new FormValidator(form);

  form.addEventListener("input", (e) => {
    // Validação em tempo real por campo
    const el = e.target;
    if (el.id) {
      validator.validate();
    }
  });

  if (cep) {
    cep.addEventListener("blur", async () => {
      const data = await buscarCEP(cep.value);
      if (data && !data.error) {
        fillAddress(form, data);
        toast.show("Endereço preenchido via CEP", "success");
      } else if (data.error) {
        toast.show(data.error, "warning");
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validator.validate()) {
      toast.show("Corrija os campos destacados", "error");
      return;
    }
    const payload = formToObject(new FormData(form));
    payload.id = cryptoRandomId();
    payload.timestamp = Date.now();
    const list = storage.get(STORAGE_KEY, []);
    list.push(payload);
    storage.save(STORAGE_KEY, list);
    toast.show("Cadastro salvo com sucesso!", "success");
    form.reset();
  });
}

// Função para preencher o endereço com os dados do CEP
function fillAddress(form, data) {
  const cidade = form.querySelector("#cidade");
  const estado = form.querySelector("#estado");
  const endereco = form.querySelector("#endereco");
  if (cidade && data.localidade) {
    cidade.value = data.localidade;
  }

  if (estado && data.uf) {
    estado.value = data.uf;
  }

  if (endereco && (data.logradouro || data.bairro)) {
    endereco.value = `${data.logradouro || ""} ${
      data.bairro ? " - " + data.bairro : ""
    }`.trim();
  }
}

// Função para converter o formulário em um objeto
function formToObject(formData) {
  const obj = {};

  for (const [k, v] of formData.entries()) {
    if (obj[k]) {
      if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    } else {
      obj[k] = v;
    }
  }
  return obj;
}

// Função para gerar um ID aleatório
function cryptoRandomId() {
  if (window.crypto?.getRandomValues) {
    const a = new Uint32Array(4);
    window.crypto.getRandomValues(a);

    return Array.from(a, (x) => x.toString(16).padStart(8, "0")).join("");
  }
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
