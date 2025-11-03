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
    this.backdrop.setAttribute("role", "dialog");
    this.backdrop.setAttribute("aria-modal", "true");
    this.backdrop.setAttribute("aria-labelledby", "modal-title");

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
    this.dialog.setAttribute("tabindex", "-1");

    Object.assign(this.dialog.style, {
      maxWidth: "640px",
      width: "90%",
      background: "var(--color-neutral-100)",
      borderRadius: "var(--radius-md)",
    });

    this.dialog.innerHTML = `
      <div class="card-header" id="modal-title">${this.title}</div>
      <div class="card-body">${this.content}</div>
      <div class="card-footer" style="text-align:right">
        <button class="btn btn-outline" data-close aria-label="Fechar modal">Fechar</button>
      </div>
    `;

    this.backdrop.appendChild(this.dialog);

    this.backdrop.addEventListener("click", (e) => {
      if (e.target === this.backdrop || e.target.closest("[data-close]"))
        this.close();
    });

    this._handleKeyboard = (e) => {
      if (e.key === "Escape") {
        this.close();
      }
      if (e.key === "Tab") {
        this._trapFocus(e);
      }
    };
  }

  _trapFocus(e) {
    const focusableElements = this.dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }

  open() {
    this.previousActiveElement = document.activeElement;
    document.body.appendChild(this.backdrop);
    document.addEventListener("keydown", this._handleKeyboard);

    const closeButton = this.dialog.querySelector("[data-close]");
    if (closeButton) {
      closeButton.focus();
    }
  }

  close() {
    document.removeEventListener("keydown", this._handleKeyboard);
    this.backdrop.remove();
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }
}
