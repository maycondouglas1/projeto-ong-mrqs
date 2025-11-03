// utils/masks.js - Máscaras de input
export const masks = {
  cpf: "000.000.000-00",
  telefone: "(00) 00000-0000",
  cep: "00000-000",
};

export function applyMask(input, pattern) {
  function format(value, pattern) {
    const digits = (value || "").replace(/\D/g, "");
    let i = 0;
    let out = "";

    for (const ch of pattern) {
      if (ch === "0") {
        if (i < digits.length) {
          out += digits[i++];
        }
      } else {
        if (i < digits.length) {
          out += ch;
        }
      }
    }
    return out;
  }

  // Função para aplicar a máscara
  const handler = () => {
    input.value = format(input.value, pattern);
    // Move o caret para o final após aplicar a máscara
    const len = input.value.length;
    try {
      input.setSelectionRange(len, len);
    } catch (_) {
      // alguns tipos de input podem não suportar setSelectionRange
    }
  };

  // Adiciona o evento de input para aplicar a máscara
  input.addEventListener("input", handler);
}
