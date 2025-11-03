// modules/projects.js - Dados mockados de projetos e renderização
import { Modal } from "../components/modal.js";

const projects = [
  {
    id: "p1",
    title: "Educação para Todos",
    img: "assets/images/projeto-educacao.jpg",
    summary: "Reforço escolar e desenvolvimento pessoal.",
    category: "educacao",
    status: "andamento",
    impact: "350 crianças",
  },
  {
    id: "p2",
    title: "Alimentação Solidária",
    img: "assets/images/projeto-alimentacao.jpg",
    summary: "Cestas básicas e refeições nutritivas.",
    category: "assistencia",
    status: "andamento",
    impact: "800 famílias/mês",
  },
  {
    id: "p3",
    title: "Horta Comunitária",
    img: "assets/images/projeto-horta.jpg",
    summary: "Hortas urbanas e educação ambiental.",
    category: "meio-ambiente",
    status: "andamento",
    impact: "12 hortas",
  },
];

export function initProjectsModule() {
  document.addEventListener("route:rendered", ({ detail }) => {
    if (detail.route === "projetos") {
      renderProjects();
    }
  });

  // Se a página atual já contém a seção, renderizar também (progressive enhancement)
  if (document.querySelector("#projects-list")) {
    renderProjects();
  }
}

export function renderProjects() {
  const container = document.querySelector("#projects-list");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  projects.forEach((p) => container.appendChild(createProjectCard(p)));
}

function createProjectCard(project) {
  const art = document.createElement("article");
  art.className = "card col-12 md:col-6";
  art.innerHTML = `
    <div class="card-header">${project.title}</div>
    <div class="card-body">
      <figure>
        <img src="${project.img}" alt="${project.title}" />
        <figcaption>${project.summary}</figcaption>
      </figure>
      <ul>
        <li><span class="badge badge-primary">Categoria</span> ${project.category}</li>
        <li><span class="badge badge-success">Status</span> ${project.status}</li>
        <li><span class="badge badge-info">Impacto</span> ${project.impact}</li>
      </ul>
      <button class="btn btn-primary" data-details>Detalhes</button>
    </div>
  `;
  art.querySelector("[data-details]").addEventListener("click", () => {
    const modal = new Modal({
      title: project.title,
      content: `<p>${project.summary}</p><p><strong>Impacto:</strong> ${project.impact}</p>`,
    });
    modal.open();
  });

  return art;
}
