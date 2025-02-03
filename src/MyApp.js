import { LitElement, html, css } from 'lit';
// Import the Shoelace button component so that <sl-button> is available.
import '@shoelace-style/shoelace/dist/components/button/button.js';

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

  handleButtonClick(buttonNumber) {
    alert(`Button ${buttonNumber} clicked!`);
  }

  render() {
    return html`
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

// Manually define the custom element
customElements.define('my-app', MyApp);
