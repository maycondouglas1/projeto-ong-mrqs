// components/modal.js - Modal simples
export class Modal {
  constructor({ title = "", content = "" } = {}) {
    this.title = title;
    this.content = content;
    this._build();
  }
  _build() {
    this.backdrop = document.createElement("div");
    this.backdrop.className = "modal-backdrop";

    Object.assign(this.backdrop.style, {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    });

    this.dialog = document.createElement("div");
    this.dialog.className = "modal-content card";

    Object.assign(this.dialog.style, {
      maxWidth: "640px",
      width: "90%",
      background: "var(--color-neutral-100)",
      borderRadius: "var(--radius-md)",
    });

    this.dialog.innerHTML = `
      <div class="card-header">${this.title}</div>
      <div class="card-body">${this.content}</div>
      <div class="card-footer" style="text-align:right">
        <button class="btn btn-outline" data-close>Fechar</button>
      </div>
    `;

    this.backdrop.appendChild(this.dialog);
    this.backdrop.addEventListener("click", (e) => {
      if (e.target === this.backdrop || e.target.closest("[data-close]"))
        this.close();
    });
  }
  open() {
    document.body.appendChild(this.backdrop);
  }
  close() {
    this.backdrop.remove();
  }
}
