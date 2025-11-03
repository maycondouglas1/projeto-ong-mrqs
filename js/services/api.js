// services/api.js - Serviços para integrações externas
export async function buscarCEP(cep) {
  const onlyDigits = (cep || "").replace(/\D/g, "");

  if (onlyDigits.length !== 8) {
    return { error: "CEP inválido" };
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
    const data = await res.json();

    if (data.erro) {
      return { error: "CEP não encontrado" };
    }

    return data;
  } catch (e) {
    return { error: "Falha ao consultar CEP" };
  }
}

export const delay = (ms) => new Promise((r) => setTimeout(r, ms));
