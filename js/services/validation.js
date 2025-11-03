// services/validation.js - Validadores para os formulários
export const validators = {
  cpf(value) {
    const v = (value || "").replace(/\D/g, "");
    if (v.length !== 11 || /^([0-9])\1{10}$/.test(v)) {
      return { valid: false, message: "CPF inválido" };
    }
    const calc = (base) => {
      let sum = 0;

      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base[i]) * (base.length + 1 - i);
      }

      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };
    const d1 = calc(v.slice(0, 9));
    const d2 = calc(v.slice(0, 9) + d1);
    const valid = d1 === parseInt(v[9]) && d2 === parseInt(v[10]);

    return { valid, message: valid ? "" : "CPF inválido" };
  },
  email(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = re.test(value || "");

    return { valid, message: valid ? "" : "E-mail inválido" };
  },
  telefone(value) {
    const re = /^\(\d{2}\) \d{5}-\d{4}$/;
    const valid = re.test(value || "");

    return { valid, message: valid ? "" : "Telefone inválido" };
  },
  cep(value) {
    const re = /^\d{5}-\d{3}$/;
    const valid = re.test(value || "");

    return { valid, message: valid ? "" : "CEP inválido" };
  },
  dataNascimento(value) {
    if (!value) {
      return { valid: false, message: "Data obrigatória" };
    }

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      return { valid: false, message: "Data inválida" };
    }

    const hoje = new Date();
    const min = new Date(
      hoje.getFullYear() - 16,
      hoje.getMonth(),
      hoje.getDate()
    );
    const valid = d <= min;
    return { valid, message: valid ? "" : "Idade mínima 16 anos" };
  },
};

export class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = {};
  }
  validate() {
    this.errors = {};
    const fields = [
      {
        id: "nome-completo",
        fn: (v) => ({
          valid: (v || "").trim().length >= 3,
          message: "Mínimo 3 caracteres",
        }),
      },
      { id: "email", fn: validators.email },
      { id: "cpf", fn: validators.cpf },
      { id: "telefone", fn: validators.telefone },
      { id: "cep", fn: validators.cep },
      { id: "data-nascimento", fn: validators.dataNascimento },
    ];
    fields.forEach(({ id, fn }) => {
      const el = this.form.querySelector(`#${id}`);
      if (!el) {
        return;
      }

      const { valid, message } = fn(el.value);
      if (!valid) {
        this.showError(el, message);
      } else {
        this.clearError(el);
      }
    });
    return Object.keys(this.errors).length === 0;
  }
  showError(field, message) {
    field.setAttribute("aria-invalid", "true");
    field.style.borderColor = "var(--color-error)";
    let msg = field.parentElement.querySelector(".field-error");

    if (!msg) {
      msg = document.createElement("small");
      msg.className = "field-error";
      msg.style.color = "var(--color-error)";
      msg.style.display = "block";
      msg.style.marginTop = "6px";
      field.parentElement.appendChild(msg);
    }

    msg.textContent = message;
    this.errors[field.id] = message;
  }
  clearError(field) {
    field.removeAttribute("aria-invalid");
    field.style.borderColor = "";
    const msg = field.parentElement.querySelector(".field-error");
    if (msg) {
      msg.remove();
    }
    delete this.errors[field.id];
  }
}
