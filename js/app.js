// app.js - Inicialização do app
import { Toast } from "./components/toast.js";
import { initForms } from "./modules/forms.js";
import { initProjectsModule } from "./modules/projects.js";
import { initRouter } from "./router.js";
import { ThemeManager, createThemeToggle } from "./modules/theme.js";

// Instância global de toast
export const toast = new Toast();
export const themeManager = new ThemeManager();

function initGlobalNavEnhancements() {
  // Scroll suave para âncoras internas
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) {
      return;
    }

    const id = anchor.getAttribute("href");
    if (!id || id.length <= 1) {
      return;
    }

    const target = document.querySelector(id);
    if (!target) {
      return;
    }
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function domReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

// Inicialização
_domInit();

function _domInit() {
  domReady(() => {
    initRouter();
    initProjectsModule();
    initForms();
    initGlobalNavEnhancements();

    const themeToggle = createThemeToggle();
    document.body.appendChild(themeToggle);
  });
}
