// router.js - SPA com hash-based routing
import { getTemplates } from "./templates.js";

const routes = {
  "/": "home",
  "/projetos": "projetos",
  "/cadastro": "cadastro",
};

let templates;

export function initRouter() {
  templates = getTemplates();

  // Trata mudanças no hash
  window.addEventListener("hashchange", onHashChange);

  // Render inicial
  onHashChange();
}

function onHashChange() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "") || "/";
  render(path);
}

export function navigateTo(path) {
  window.location.hash = path;
}

function render(path) {
  const templateKey = routes[path] || "home";
  const main = document.querySelector("main#conteudo, main");

  if (!main) {
    return;
  }

  // Renderiza o template
  main.innerHTML = templates[templateKey]();

  // Atualiza classes active na navegação
  updateActiveNav(path);

  // Reexecuta possíveis inicializações pós-render
  document.dispatchEvent(
    new CustomEvent("route:rendered", { detail: { route: templateKey } })
  );
}

function updateActiveNav(path) {
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === `#${path}`) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
}
