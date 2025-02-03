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
      text-align: center;
    }
    .button-container {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  `;

  static properties = {
    showOldApp: { type: Boolean },
  };

  constructor() {
    super();
    this.showOldApp = false;
  }

  handleButtonClick(buttonNumber) {
    if (buttonNumber === 1) {
      // Show the group theory component when Button 1 is clicked.
      this.showOldApp = true;
    } else {
      alert(`Button ${buttonNumber} clicked!`);
    }
  }

  render() {
    return this.showOldApp
      ? html`<z-group-demo></z-group-demo>`
      : html`
          <h1>Rollup + Shoelace + Lit</h1>
          <div class="button-container">
            <sl-button variant="primary" @click=${() => this.handleButtonClick(1)}>
              Button 1
            </sl-button>
            <sl-button variant="success" @click=${() => this.handleButtonClick(2)}>
              Button 2
            </sl-button>
            <sl-button variant="danger" @click=${() => this.handleButtonClick(3)}>
              Button 3
            </sl-button>
          </div>
        `;
  }
}

customElements.define('my-app', MyApp);
