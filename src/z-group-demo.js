// z-group-demo.js
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
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    section {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }
    label {
      margin-right: 10px;
    }
    input {
      margin: 5px;
      padding: 5px;
      width: 60px;
    }
    sl-button {
      margin-top: 10px;
    }
    .result {
      margin-top: 10px;
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.closureResult = '';
    this.identityResult = '';
    this.associativityResult = '';
    this.inverseResult = '';
  }

  // Check closure property
  checkClosure() {
    const a = parseInt(this.renderRoot.querySelector('#closure-a').value, 10);
    const b = parseInt(this.renderRoot.querySelector('#closure-b').value, 10);
    if (isNaN(a) || isNaN(b)) {
      this.closureResult = "Please enter valid integers for a and b.";
      return;
    }
    const sum = a + b;
    this.closureResult = `Result: ${a} + ${b} = ${sum}. Closure holds because the sum is an integer.`;
  }

  // Check identity property
  checkIdentity() {
    const a = parseInt(this.renderRoot.querySelector('#identity-a').value, 10);
    if (isNaN(a)) {
      this.identityResult = "Please enter a valid integer for a.";
      return;
    }
    const result = a + 0;
    this.identityResult = `Result: ${a} + 0 = ${result}. The identity element in (ℤ, +) is 0.`;
  }

  // Check associativity property
  checkAssociativity() {
    const a = parseInt(this.renderRoot.querySelector('#assoc-a').value, 10);
    const b = parseInt(this.renderRoot.querySelector('#assoc-b').value, 10);
    const c = parseInt(this.renderRoot.querySelector('#assoc-c').value, 10);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      this.associativityResult = "Please enter valid integers for a, b, and c.";
      return;
    }
    const left = (a + b) + c;
    const right = a + (b + c);
    let message = `Result: (${a} + ${b}) + ${c} = ${left} and ${a} + (${b} + ${c}) = ${right}. `;
    message += (left === right) ? "Associativity holds." : "Associativity does not hold!";
    this.associativityResult = message;
  }

  // Check inverse property
  checkInverse() {
    const a = parseInt(this.renderRoot.querySelector('#inverse-a').value, 10);
    if (isNaN(a)) {
      this.inverseResult = "Please enter a valid integer for a.";
      return;
    }
    const inverse = -a;
    const sum = a + inverse;
    this.inverseResult = `Result: ${a} + (${inverse}) = ${sum}. Every integer a has an inverse (–a) such that a + (–a) = 0.`;
  }

  render() {
    return html`
      <h1>Z Group Demonstration</h1>
      <p>
        This demonstration shows the group properties of the set of integers 
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mi>&#x2124;</mi>
        </math>
        under addition.
      </p>

      <!-- Closure Section -->
      <section id="closure">
        <h2>Closure</h2>
        <p>
          Enter two integers to demonstrate closure:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mi>b</mi>
            <mo>=</mo>
            <mi>&#x2124;</mi>
          </math>
        </p>
        <label for="closure-a">a:</label>
        <input id="closure-a" type="number" step="1" />
        <label for="closure-b">b:</label>
        <input id="closure-b" type="number" step="1" />
        <sl-button variant="primary" @click=${this.checkClosure}>
          Check Closure
        </sl-button>
        <div class="result">${this.closureResult}</div>
      </section>

      <!-- Identity Section -->
      <section id="identity">
        <h2>Identity</h2>
        <p>
          Enter an integer to demonstrate the identity element:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mn>0</mn>
            <mo>=</mo>
            <mi>a</mi>
          </math>
        </p>
        <label for="identity-a">a:</label>
        <input id="identity-a" type="number" step="1" />
        <sl-button variant="primary" @click=${this.checkIdentity}>
          Check Identity
        </sl-button>
        <div class="result">${this.identityResult}</div>
      </section>

      <!-- Associativity Section -->
      <section id="associativity">
        <h2>Associativity</h2>
        <p>
          Enter three integers to demonstrate associativity:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo>(</mo>
            <mi>a</mi>
            <mo>+</mo>
            <mi>b</mi>
            <mo>)</mo>
            <mo>+</mo>
            <mi>c</mi>
            <mo>=</mo>
            <mi>a</mi>
            <mo>+</mo>
            <mo>(</mo>
            <mi>b</mi>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
          </math>
        </p>
        <label for="assoc-a">a:</label>
        <input id="assoc-a" type="number" step="1" />
        <label for="assoc-b">b:</label>
        <input id="assoc-b" type="number" step="1" />
        <label for="assoc-c">c:</label>
        <input id="assoc-c" type="number" step="1" />
        <sl-button variant="primary" @click=${this.checkAssociativity}>
          Check Associativity
        </sl-button>
        <div class="result">${this.associativityResult}</div>
      </section>

      <!-- Inverse Section -->
      <section id="inverse">
        <h2>Inverse</h2>
        <p>
          Enter an integer to demonstrate the inverse property:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mrow>
              <mo>(</mo>
              <mo>&#x2212;</mo>
              <mi>a</mi>
              <mo>)</mo>
            </mrow>
            <mo>=</mo>
            <mn>0</mn>
          </math>
        </p>
        <label for="inverse-a">a:</label>
        <input id="inverse-a" type="number" step="1" />
        <sl-button variant="primary" @click=${this.checkInverse}>
          Check Inverse
        </sl-button>
        <div class="result">${this.inverseResult}</div>
      </section>
    `;
  }
}

customElements.define('z-group-demo', ZGroupDemo);
