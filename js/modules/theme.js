export class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'high-contrast'];
    this.currentTheme = this._getStoredTheme() || this._getPreferredTheme();
    this._applyTheme(this.currentTheme);
    this._setupMediaQueryListener();
  }

  _getStoredTheme() {
    return localStorage.getItem('ongmrqs:theme');
  }

  _getPreferredTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      return 'high-contrast';
    }
    return 'light';
  }

  _setupMediaQueryListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this._getStoredTheme()) {
        this._applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
      if (!this._getStoredTheme()) {
        this._applyTheme(e.matches ? 'high-contrast' : 'light');
      }
    });
  }

  _applyTheme(theme) {
    document.documentElement.removeAttribute('data-theme');

    if (theme !== 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    }

    this.currentTheme = theme;
    localStorage.setItem('ongmrqs:theme', theme);

    document.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { theme }
    }));
  }

  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Theme "${theme}" não existe. Temas disponíveis: ${this.themes.join(', ')}`);
      return;
    }
    this._applyTheme(theme);
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }

  getTheme() {
    return this.currentTheme;
  }
}

export function createThemeToggle() {
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.setAttribute('aria-label', 'Alternar tema');
  button.setAttribute('type', 'button');

  const icons = {
    light: '☀️',
    dark: '🌙',
    'high-contrast': '◐'
  };

  const updateButton = (theme) => {
    button.textContent = icons[theme] || '☀️';
    button.setAttribute('aria-label', `Tema atual: ${theme}. Clique para alternar`);
  };

  document.addEventListener('theme:changed', (e) => {
    updateButton(e.detail.theme);
  });

  const themeManager = new ThemeManager();
  updateButton(themeManager.getTheme());

  button.addEventListener('click', () => {
    themeManager.toggleTheme();
  });

  Object.assign(button.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '2px solid var(--color-border)',
    background: 'var(--color-background)',
    color: 'var(--color-text-primary)',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition), box-shadow var(--transition)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = 'var(--shadow-lg)';
  });

  button.addEventListener('focus', () => {
    button.style.outline = '3px solid var(--color-primary)';
    button.style.outlineOffset = '2px';
  });

  button.addEventListener('blur', () => {
    button.style.outline = 'none';
  });

  return button;
}
