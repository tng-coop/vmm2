// my-app.js
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
// Import the separated group theory component
import './z-group-demo.js';

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
        <sl-button variant="primary" @click=${() => this.handleMenuClick('group')}>
          Group Theory Exhibit
        </sl-button>
        <sl-button variant="success" @click=${() => this.handleMenuClick('other')}>
          Other Exhibit
        </sl-button>
        <sl-button variant="danger" @click=${() => this.handleMenuClick('third')}>
          Third Exhibit
        </sl-button>
      </nav>
      <main class="content">
        ${this.activeView === 'group'
          ? html`<z-group-demo></z-group-demo>`
          : this.activeView === 'other'
          ? html`<p>Other Exhibit coming soon!</p>`
          : this.activeView === 'third'
          ? html`<p>Third Exhibit coming soon!</p>`
          : html`<p>Welcome to the Museum of Mathematics. Please select an exhibit from the menu above.</p>`}
      </main>
    `;
  }
}

customElements.define('my-app', MyApp);
