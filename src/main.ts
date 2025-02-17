// Import global styles and Shoelace components
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

// Import the existing custom elements
import './z-group-demo.js';
import './lisp-demo.js';
import './even-group-demo.js';
import './triangle-group-demo.ts';

import { LitElement, html, css } from 'lit';

class MyApp extends LitElement {
  // Define styles for this component.
  static styles = css`
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    nav.menu {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    main.content {
      border: none;
    }
    footer {
      text-align: center;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      color: #fff;
      padding: 1.5rem;
      margin-top: 2rem;
      font-size: 1rem;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
    }
  `;

  // Declare reactive properties.
  static properties = {
    activeView: { type: String },
    randomVerse: { type: String }
  };

  // Class fields with explicit type annotations.
  activeView: string;
  randomVerse: string;

  constructor() {
    super();
    this.activeView = '';

    // Array of Bible verses for the footer.
    const verses: string[] = [
      "Ecclesiastes 1:13 – 'And I applied my mind to seek and to search out by wisdom all that is done under heaven; it is an unhappy business that God has given to the sons of men to be busy with.'",
      "Romans 1:20 – 'Ever since the creation of the world his invisible nature, namely, his eternal power and deity, has been clearly perceived in the things that have been made. So they are without excuse;'",
      "Psalm 19:1 – 'The heavens are telling the glory of God; and the firmament proclaims his handiwork.'",
      "Colossians 1:16–17 – 'For in him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or principalities or authorities—all things were created through him and for him. He is before all things, and in him all things hold together.'",
      "Proverbs 1:5 – 'The wise man also may hear and increase in learning, and the man of understanding acquire skill,'"
    ];

    // Pick a random verse.
    this.randomVerse = verses[Math.floor(Math.random() * verses.length)];
  }

  render() {
    return html`
      <header>
        <h1>Museum of Mathematics</h1>
        <p>Explore our exhibits by selecting one from the menu below.</p>
      </header>
      <nav class="menu">
        <sl-dropdown>
          <sl-button slot="trigger" variant="primary">Exhibits</sl-button>
          <sl-menu>
            <sl-menu-item @click=${() => this.handleMenuClick('group')}>
              Group Theory Exhibit
            </sl-menu-item>
            <sl-menu-item @click=${() => this.handleMenuClick('even')}>
              Even Numbers Exhibit
            </sl-menu-item>
            <sl-menu-item @click=${() => this.handleMenuClick('other')}>
              Triangle Groups Exhibit
            </sl-menu-item>
            <sl-menu-item @click=${() => this.handleMenuClick('lisp')}>
              Lisp Demo
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
      <main class="content">
        ${this.activeView === 'group'
          ? html`<z-group-demo></z-group-demo>`
          : this.activeView === 'even'
            ? html`<even-group-demo></even-group-demo>`
            : this.activeView === 'other'
              ? html`<triangle-group-demo></triangle-group-demo>`
              : this.activeView === 'lisp'
                ? html`<lisp-demo></lisp-demo>`
                : html`<p>Welcome to the Museum of Mathematics. Please select an exhibit from the menu above.</p>`
        }
      </main>
      <footer>
        <p>${this.randomVerse}</p>
      </footer>
    `;
  }

  // Type annotate the parameter as a string.
  handleMenuClick(view: string): void {
    this.activeView = view;
  }
}

customElements.define('my-app', MyApp);
