// components/toast.js - Notificações simples
export class Toast {
  constructor() {
    this.container = document.createElement("div");

    Object.assign(this.container.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      display: "grid",
      gap: "8px",
      zIndex: 1100,
    });

    document.addEventListener("DOMContentLoaded", () =>
      document.body.appendChild(this.container)
    );
  }
  show(message, type = "info", timeout = 3000) {
    const el = document.createElement("div");
    el.className = `alert alert-${type}`;
    el.textContent = message;
    el.style.boxShadow = "var(--shadow-md)";

    // Adiciona o elemento ao container e remove após timeout
    this.container.appendChild(el);
    setTimeout(() => el.remove(), timeout);
  }
}
