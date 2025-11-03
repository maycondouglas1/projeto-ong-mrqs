# ONG MRQS - Site Institucional

Site institucional da ONG MRQS (Organização Não Governamental fictícia) desenvolvido como projeto universitário de desenvolvimento web. Uma Single Page Application (SPA) moderna, acessível e otimizada, construída com HTML5, CSS3 e JavaScript vanilla.

## Branches

- **main**: Contém todas as entregas e código atual
- **feat/entrega-1**: Contém código da Entrega 1 da atividade
- **feat/entrega-2**: Contém código da Entrega 2 da atividade
- **feat/entrega-3**: Contém código da Entrega 3 da atividade
- **feat/entrega-4**: Contém código da Entrega 4 da atividade

## Características

- **SPA com Roteamento**: Navegação sem reload usando History API
- **WCAG 2.1 AA**: Totalmente acessível com suporte a leitores de tela
- **3 Temas**: Light, Dark e Alto Contraste
- **Navegação por Teclado**: Suporte completo
- **Responsivo**: Mobile-first design
- **Otimizado**: Build system com minificação
- **Offline-ready**: LocalStorage para persistência
- **SEO-friendly**: Estrutura semântica adequada

## Início Rápido

### Pré-requisitos

- Node.js 18+ (para scripts de build)
- Python 3 (para servidor de desenvolvimento) ou qualquer servidor HTTP

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd projeto-ongs

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:8000

### Build para Produção

```bash
# Gere build otimizado
npm run build

# Otimize imagens (opcional)
npm run optimize-images
```

Os arquivos otimizados estarão em `dist/`

## 📁 Estrutura do Projeto

```
projeto-ongs/
├── index.html              # Página principal
├── css/
│   ├── main.css           # Importa todos os estilos
│   ├── variables.css      # Design tokens e temas
│   ├── base.css           # Estilos base
│   ├── components.css     # Componentes reutilizáveis
│   ├── forms.css          # Estilos de formulários
│   ├── layout.css         # Sistema de grid
│   ├── navigation.css     # Navegação
│   ├── reset.css          # CSS reset
│   └── utilities.css      # Classes utilitárias
├── js/
│   ├── app.js             # Entry point
│   ├── router.js          # Sistema de rotas
│   ├── templates.js       # Templates HTML
│   ├── components/
│   │   ├── modal.js       # Modal acessível
│   │   └── toast.js       # Sistema de notificações
│   ├── modules/
│   │   ├── forms.js       # Validação de formulários
│   │   ├── projects.js    # Listagem de projetos
│   │   └── theme.js       # Gerenciador de temas
│   ├── services/
│   │   ├── api.js         # Integração ViaCEP
│   │   ├── storage.js     # LocalStorage abstraction
│   │   └── validation.js  # Validadores
│   └── utils/
│       └── masks.js       # Máscaras de input
├── assets/
│   └── images/            # Imagens do site
├── build.js               # Script de build
├── optimize-images.js     # Otimização de imagens
└── package.json           # Dependências e scripts
```

## Temas

O site oferece três temas com contraste adequado (WCAG AA):

### Light Theme (Padrão)

- Fundo branco (#ffffff)
- Texto escuro (#1b2834)
- Contraste: 15.5:1

### Dark Theme

- Fundo escuro (#1b2834)
- Texto claro (#f0f4f8)
- Contraste: 14.8:1
- Ativado automaticamente com `prefers-color-scheme: dark`

### High Contrast Theme

- Fundo preto (#000000)
- Texto branco (#ffffff)
- Contraste máximo: 21:1
- Ativado automaticamente com `prefers-contrast: more`

Alterne entre temas clicando no botão flutuante no canto inferior direito (☀️/🌙/◐).

## ♿ Acessibilidade

O site segue as diretrizes WCAG 2.1 Nível AA:

### Navegação por Teclado

- **Tab/Shift+Tab**: Navegar entre elementos
- **Enter/Space**: Ativar botões e links
- **Escape**: Fechar modais
- Skip link para pular navegação

### Leitores de Tela

- Landmarks ARIA (header, nav, main, footer)
- Labels descritivos em todos os controles
- Live regions para notificações
- Hierarquia de headings correta
- Alt text descritivo em imagens

### Contraste

- Texto normal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos interativos: 3:1

## Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Custom Properties, Grid, Flexbox
- **JavaScript ES6+**: Modules, Classes, Async/Await
- **APIs Web**:
  - History API (routing)
  - Fetch API (requisições)
  - LocalStorage (persistência)
  - matchMedia (preferências do sistema)

### Sem Frameworks

Este projeto foi desenvolvido com vanilla JavaScript para demonstrar:

- Compreensão profunda de fundamentos web
- Performance sem overhead de frameworks
- Controle total sobre o código
- Tamanho reduzido do bundle

## Build e Deploy

### Sistema de Build

O script `build.js` otimiza todos os assets:

- **HTML**: Minificação com remoção de comentários e espaços
- **CSS**: Level 2 optimization (merge de regras, otimização de valores)
- **JavaScript**: Minificação com Terser (dead code elimination)
- **Imagens**: Conversão para WebP + otimização JPEG

### Otimização de Imagens

```bash
npm run optimize-images
```

Gera versões otimizadas:

- JPEG progressivo (85% qualidade)
- WebP moderno (80% qualidade)
- Redimensionamento automático (max 1920px)

### Deploy

Suporta deploy em:

- Netlify
- Vercel
- GitHub Pages
- Servidor próprio (Apache, Nginx)

## 📝 Formulário de Cadastro

O formulário de voluntários inclui:

### Validações

- **Nome completo**: 3-100 caracteres
- **Email**: Formato válido
- **CPF**: Algoritmo oficial com dígitos verificadores
- **Telefone**: Formato brasileiro (11) 99999-9999
- **CEP**: 8 dígitos com auto-preenchimento via ViaCEP
- **Data de nascimento**: Formato válido

### Funcionalidades

- Validação em tempo real
- Máscaras automáticas (CPF, telefone, CEP)
- Busca automática de endereço por CEP
- Mensagens de erro acessíveis
- Persistência em LocalStorage

## 🧪 Testes

### Testes Manuais

```bash
# Rode o servidor
npm run dev

# Teste:
# - Navegação entre páginas
# - Validação do formulário
# - Auto-preenchimento de CEP
# - Alternância de temas
# - Navegação por teclado
# - Responsividade (mobile, tablet, desktop)
```

## Contribuindo

Este é um projeto universitário, mas sugestões são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
