import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';

export class ZGroupDemo extends LitElement {
  static properties = {
    closureResult: { type: String },
    identityResult: { type: String },
    associativityResult: { type: String },
    inverseResult: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      background-color: #eef;
      padding: 20px;
    }
    section {
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      background-color: #fff;
    }
    h3 {
      margin-top: 0;
    }
    label {
      margin-right: 5px;
    }
    input {
      margin: 5px;
      padding: 5px;
      width: 60px;
    }
    .result {
      margin-top: 10px;
      font-weight: bold;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  `;

  // Declare properties with type annotations
  closureResult: string = '';
  identityResult: string = '';
  associativityResult: string = '';
  inverseResult: string = '';

  constructor() {
    super();
  }

  checkClosure(): void {
    const inputA = this.renderRoot.querySelector<HTMLInputElement>('#closure-a');
    const inputB = this.renderRoot.querySelector<HTMLInputElement>('#closure-b');

    if (!inputA || !inputB) {
      this.closureResult = 'Input elements not found.';
      return;
    }

    const a = parseInt(inputA.value, 10);
    const b = parseInt(inputB.value, 10);

    if (isNaN(a) || isNaN(b)) {
      this.closureResult = 'Please enter valid integers for a and b.';
      return;
    }

    const sum = a + b;
    this.closureResult = `Result: ${a} + ${b} = ${sum}. Closure holds because the sum is an integer.`;
  }

  checkIdentity(): void {
    const inputA = this.renderRoot.querySelector<HTMLInputElement>('#identity-a');

    if (!inputA) {
      this.identityResult = 'Input element not found.';
      return;
    }

    const a = parseInt(inputA.value, 10);

    if (isNaN(a)) {
      this.identityResult = 'Please enter a valid integer for a.';
      return;
    }

    const result = a + 0;
    this.identityResult = `Result: ${a} + 0 = ${result}. The identity element is 0.`;
  }

  checkAssociativity(): void {
    const inputA = this.renderRoot.querySelector<HTMLInputElement>('#assoc-a');
    const inputB = this.renderRoot.querySelector<HTMLInputElement>('#assoc-b');
    const inputC = this.renderRoot.querySelector<HTMLInputElement>('#assoc-c');

    if (!inputA || !inputB || !inputC) {
      this.associativityResult = 'Input elements not found.';
      return;
    }

    const a = parseInt(inputA.value, 10);
    const b = parseInt(inputB.value, 10);
    const c = parseInt(inputC.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      this.associativityResult = 'Please enter valid integers for a, b, and c.';
      return;
    }

    const left = (a + b) + c;
    const right = a + (b + c);
    let message = `Result: (${a} + ${b}) + ${c} = ${left} and ${a} + (${b} + ${c}) = ${right}. `;
    message += left === right ? 'Associativity holds.' : 'Associativity does not hold!';
    this.associativityResult = message;
  }

  checkInverse(): void {
    const inputA = this.renderRoot.querySelector<HTMLInputElement>('#inverse-a');

    if (!inputA) {
      this.inverseResult = 'Input element not found.';
      return;
    }

    const a = parseInt(inputA.value, 10);

    if (isNaN(a)) {
      this.inverseResult = 'Please enter a valid integer for a.';
      return;
    }

    const inverse = -a;
    const sum = a + inverse;
    this.inverseResult = `Result: ${a} + (${inverse}) = ${sum}. Every integer has an inverse such that a + (-a) = 0.`;
  }

  render() {
    return html`
      <!-- Closure Section -->
      <section id="closure">
        <h3>Closure</h3>
        <div class="row">
          <div>
            <label for="closure-a">a:</label>
            <input id="closure-a" type="number" data-test-id="closure-a-input" />
            <label for="closure-b">b:</label>
            <input id="closure-b" type="number" data-test-id="closure-b-input" />
          </div>
          <sl-button
            id="check-closure"
            data-test-id="check-closure-button"
            aria-label="Check Closure"
            variant="primary"
            @click=${this.checkClosure}
          >
            Check Closure
          </sl-button>
        </div>
        <div class="result" data-test-id="closure-result">
          ${this.closureResult}
        </div>
      </section>

      <!-- Identity Section -->
      <section id="identity">
        <h3>Identity</h3>
        <div class="row">
          <div>
            <label for="identity-a">a:</label>
            <input id="identity-a" type="number" data-test-id="identity-a-input" />
          </div>
          <sl-button
            id="check-identity"
            data-test-id="check-identity-button"
            aria-label="Check Identity"
            variant="primary"
            @click=${this.checkIdentity}
          >
            Check Identity
          </sl-button>
        </div>
        <div class="result" data-test-id="identity-result">
          ${this.identityResult}
        </div>
      </section>

      <!-- Associativity Section -->
      <section id="associativity">
        <h3>Associativity</h3>
        <div class="row">
          <div>
            <label for="assoc-a">a:</label>
            <input id="assoc-a" type="number" data-test-id="assoc-a-input" />
            <label for="assoc-b">b:</label>
            <input id="assoc-b" type="number" data-test-id="assoc-b-input" />
            <label for="assoc-c">c:</label>
            <input id="assoc-c" type="number" data-test-id="assoc-c-input" />
          </div>
          <sl-button
            id="check-associativity"
            data-test-id="check-associativity-button"
            aria-label="Check Associativity"
            variant="primary"
            @click=${this.checkAssociativity}
          >
            Check Associativity
          </sl-button>
        </div>
        <div class="result" data-test-id="associativity-result">
          ${this.associativityResult}
        </div>
      </section>

      <!-- Inverse Section -->
      <section id="inverse">
        <h3>Inverse</h3>
        <div class="row">
          <div>
            <label for="inverse-a">a:</label>
            <input id="inverse-a" type="number" data-test-id="inverse-a-input" />
          </div>
          <sl-button
            id="check-inverse"
            data-test-id="check-inverse-button"
            aria-label="Check Inverse"
            variant="primary"
            @click=${this.checkInverse}
          >
            Check Inverse
          </sl-button>
        </div>
        <div class="result" data-test-id="inverse-result">
          ${this.inverseResult}
        </div>
      </section>
    `;
  }
}

customElements.define('z-group-demo', ZGroupDemo);
