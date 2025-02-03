import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
// Import the separated components
import './z-group-demo.js';
import './even-group-demo.js';
import './triangle-group-demo.js';

export class MyApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: system-ui, sans-serif;
      background-color: #fafafa;
    }
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
  `;

  static properties = {
    activeView: { type: String },
  };

  constructor() {
    super();
    // No exhibit is selected by default.
    this.activeView = '';
  }

  handleMenuClick(view) {
    this.activeView = view;
  }

  render() {
    return html`
      <header>
        <h1>Museum of Mathematics</h1>
        <p>Explore our exhibits by selecting one from the menu below.</p>
      </header>
      <nav class="menu">
        <!-- Group demos as a dropdown submenu -->
        <sl-dropdown>
          <sl-button slot="trigger" variant="primary">
            Group Demos
          </sl-button>
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
          </sl-menu>
        </sl-dropdown>
        <!-- New top-level Web Programming item -->
        <sl-button variant="primary" @click=${() => this.handleMenuClick('webprogramming')}>
          Web Programming
        </sl-button>
      </nav>
      <main class="content">
        ${this.activeView === 'group'
          ? html`<z-group-demo></z-group-demo>`
          : this.activeView === 'even'
          ? html`<even-group-demo></even-group-demo>`
          : this.activeView === 'other'
          ? html`<triangle-group-demo></triangle-group-demo>`
          : this.activeView === 'webprogramming'
          ? html`<p>Web Programming Exhibit coming soon!</p>`
          : html`<p>Welcome to the Museum of Mathematics. Please select an exhibit from the menu above.</p>`}
      </main>
    `;
  }
}

customElements.define('my-app', MyApp);
