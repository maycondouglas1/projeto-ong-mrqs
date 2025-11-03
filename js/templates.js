// templates.js - Templates básicos para SPA
export function getTemplates() {
  return {
    home: () => `
      <section class="hero mb-lg">
        <div class="fade-up">
          <h1>Transforme Vidas com a <strong>ONG MRQS</strong></h1>
          <p class="mt-sm">
            Junte-se a milhares de voluntários e apoiadores na construção de um
            futuro mais justo. Doe, participe de projetos e acompanhe nossos
            resultados com transparência.
          </p>
          <div class="actions mt-md">
            <a href="#/projetos" class="btn btn-primary">Conhecer Projetos</a>
            <a href="#/cadastro" class="btn btn-outline">Quero Participar</a>
          </div>
        </div>
      </section>
      <section>
        <h2>Sobre Nossa Organização</h2>
        <article class="card">
          <div class="card-header">Missão</div>
          <div class="card-body">
            <p>Promover desenvolvimento social sustentável por meio de projetos e voluntariado.</p>
          </div>
        </article>
        <div class="row">
          <article class="card col-12 md:col-6">
            <div class="card-header">Nossa História</div>
            <div class="card-body">
              <p>Desde 2015 impactando comunidades com transparência e resultados.</p>
            </div>
          </article>
          <article class="card col-12 md:col-6">
            <div class="card-header">Conquistas</div>
            <div class="card-body">
              <ul>
                <li><span class="badge badge-success">10k+</span> voluntários</li>
                <li><span class="badge badge-success">150+</span> projetos</li>
                <li><span class="badge badge-success">100k+</span> vidas impactadas</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    `,
    projetos: () => `
      <section>
        <h2>Projetos em Andamento</h2>
        <div id="projects-list" class="row"></div>
      </section>
      <section>
        <h2>Como Doar</h2>
        <article class="card">
          <div class="card-header">Formas de Doação</div>
          <div class="card-body">
            <p>Doação online, transferência, PIX. Transparência total.</p>
          </div>
        </article>
      </section>
    `,
    cadastro: () => `
      <section>
        <h2>Formulário de Cadastro</h2>
        <form id="form-cadastro" novalidate>
          <fieldset>
            <legend>Dados Pessoais</legend>
            <div class="form-group">
              <input type="text" id="nome-completo" name="nome-completo" class="form-control" required minlength="3" maxlength="100" placeholder="Digite seu nome completo" aria-required="true" />
              <label class="form-label" for="nome-completo">Nome Completo (*)</label>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="email" class="form-control" required placeholder="seu.email@exemplo.com" aria-required="true" />
              <label class="form-label" for="email">E-mail (*)</label>
            </div>
            <div class="form-group">
              <input type="text" id="cpf" name="cpf" class="form-control" required placeholder="000.000.000-00" maxlength="14" aria-required="true" />
              <label class="form-label" for="cpf">CPF (*)</label>
            </div>
            <div class="form-group">
              <input type="tel" id="telefone" name="telefone" class="form-control" required placeholder="(00) 00000-0000" maxlength="15" aria-required="true" />
              <label class="form-label" for="telefone">Telefone (*)</label>
            </div>
            <div class="form-group">
              <input type="text" id="cep" name="cep" class="form-control" required placeholder="00000-000" maxlength="9" aria-required="true" />
              <label class="form-label" for="cep">CEP (*)</label>
            </div>
            <div class="form-group">
              <input type="date" id="data-nascimento" name="data-nascimento" class="form-control" required max="2024-12-31" aria-required="true" />
              <label class="form-label" for="data-nascimento">Data de Nascimento (*)</label>
            </div>
          </fieldset>
          <div class="form-actions">
            <button class="btn btn-primary" type="submit">Enviar Cadastro</button>
            <button class="btn btn-outline" type="reset">Limpar</button>
          </div>
        </form>
      </section>
    `,
  };
}
