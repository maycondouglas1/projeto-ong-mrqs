// templates.js - Templates básicos para SPA
export function getTemplates() {
  return {
    home: () => `
      <section class="hero mb-lg" aria-labelledby="hero-title">
        <div class="fade-up">
          <h1 id="hero-title">Transforme Vidas com a <strong>ONG MRQS</strong></h1>
          <p class="mt-sm">
            Junte-se a milhares de voluntários e apoiadores na construção de um
            futuro mais justo. Doe, participe de projetos e acompanhe nossos
            resultados com transparência.
          </p>
          <nav class="actions mt-md" aria-label="Ações principais">
            <a href="#/projetos" class="btn btn-primary">Conhecer Projetos</a>
            <a href="#/cadastro" class="btn btn-outline">Quero Participar</a>
          </nav>
        </div>
      </section>
      <section aria-labelledby="about-title">
        <h2 id="about-title">Sobre Nossa Organização</h2>
        <article class="card">
          <h3 class="card-header">Missão</h3>
          <div class="card-body">
            <p>Promover desenvolvimento social sustentável por meio de projetos e voluntariado.</p>
          </div>
        </article>
        <div class="row">
          <article class="card col-12 md:col-6">
            <h3 class="card-header">Nossa História</h3>
            <div class="card-body">
              <p>Desde 2015 impactando comunidades com transparência e resultados.</p>
            </div>
          </article>
          <article class="card col-12 md:col-6">
            <h3 class="card-header">Conquistas</h3>
            <div class="card-body">
              <ul aria-label="Lista de conquistas">
                <li><span class="badge badge-success" aria-label="10 mil">10k+</span> voluntários</li>
                <li><span class="badge badge-success" aria-label="150">150+</span> projetos</li>
                <li><span class="badge badge-success" aria-label="100 mil">100k+</span> vidas impactadas</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    `,
    projetos: () => `
      <section aria-labelledby="projects-title">
        <h2 id="projects-title">Projetos em Andamento</h2>
        <div id="projects-list" class="row" role="list"></div>
      </section>
      <section aria-labelledby="donate-title">
        <h2 id="donate-title">Como Doar</h2>
        <article class="card">
          <h3 class="card-header">Formas de Doação</h3>
          <div class="card-body">
            <p>Doação online, transferência, PIX. Transparência total.</p>
          </div>
        </article>
      </section>
    `,
    cadastro: () => `
      <section aria-labelledby="form-title">
        <h2 id="form-title">Formulário de Cadastro</h2>
        <form id="form-cadastro" novalidate aria-labelledby="form-title">
          <fieldset>
            <legend>Dados Pessoais</legend>
            <div class="form-group">
              <input type="text" id="nome-completo" name="nome-completo" class="form-control" required minlength="3" maxlength="100" placeholder="Digite seu nome completo" aria-required="true" aria-describedby="nome-completo-error" />
              <label class="form-label" for="nome-completo">Nome Completo (*)</label>
              <span id="nome-completo-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="email" class="form-control" required placeholder="seu.email@exemplo.com" aria-required="true" aria-describedby="email-error" />
              <label class="form-label" for="email">E-mail (*)</label>
              <span id="email-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <input type="text" id="cpf" name="cpf" class="form-control" required placeholder="000.000.000-00" maxlength="14" aria-required="true" aria-describedby="cpf-error" />
              <label class="form-label" for="cpf">CPF (*)</label>
              <span id="cpf-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <input type="tel" id="telefone" name="telefone" class="form-control" required placeholder="(00) 00000-0000" maxlength="15" aria-required="true" aria-describedby="telefone-error" />
              <label class="form-label" for="telefone">Telefone (*)</label>
              <span id="telefone-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <input type="text" id="cep" name="cep" class="form-control" required placeholder="00000-000" maxlength="9" aria-required="true" aria-describedby="cep-error" />
              <label class="form-label" for="cep">CEP (*)</label>
              <span id="cep-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
            <div class="form-group">
              <input type="date" id="data-nascimento" name="data-nascimento" class="form-control" required max="2024-12-31" aria-required="true" aria-describedby="data-nascimento-error" />
              <label class="form-label" for="data-nascimento">Data de Nascimento (*)</label>
              <span id="data-nascimento-error" class="error-message" role="alert" aria-live="polite"></span>
            </div>
          </fieldset>
          <div class="form-actions">
            <button class="btn btn-primary" type="submit" aria-label="Enviar formulário de cadastro">Enviar Cadastro</button>
            <button class="btn btn-outline" type="reset" aria-label="Limpar todos os campos do formulário">Limpar</button>
          </div>
        </form>
      </section>
    `,
  };
}
