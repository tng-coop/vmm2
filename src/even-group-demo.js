import { LitElement, html, css } from 'lit';

export class EvenGroupDemo extends LitElement {
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
    button {
      padding: 8px 16px;
      font-size: 14px;
      margin-top: 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #007BFF;
      color: #fff;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
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

  // Helper function to determine if a number is even.
  isEven(n) {
    return n % 2 === 0;
  }

  checkClosure() {
    const a = parseInt(this.renderRoot.getElementById('closure-a').value, 10);
    const b = parseInt(this.renderRoot.getElementById('closure-b').value, 10);
    if (isNaN(a) || isNaN(b)) {
      this.closureResult = "Please enter valid integers for a and b.";
      return;
    }
    if (!this.isEven(a) || !this.isEven(b)) {
      this.closureResult = "Both a and b must be even numbers.";
      return;
    }
    const sum = a + b;
    this.closureResult = `Result: ${a} + ${b} = ${sum}. Closure holds because the sum is even.`;
  }

  checkIdentity() {
    const a = parseInt(this.renderRoot.getElementById('identity-a').value, 10);
    if (isNaN(a)) {
      this.identityResult = "Please enter a valid integer for a.";
      return;
    }
    if (!this.isEven(a)) {
      this.identityResult = "Please enter an even number for a.";
      return;
    }
    const result = a + 0;
    this.identityResult = `Result: ${a} + 0 = ${result}. The identity element is 0, which is even.`;
  }

  checkAssociativity() {
    const a = parseInt(this.renderRoot.getElementById('assoc-a').value, 10);
    const b = parseInt(this.renderRoot.getElementById('assoc-b').value, 10);
    const c = parseInt(this.renderRoot.getElementById('assoc-c').value, 10);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      this.associativityResult = "Please enter valid integers for a, b, and c.";
      return;
    }
    if (!this.isEven(a) || !this.isEven(b) || !this.isEven(c)) {
      this.associativityResult = "All of a, b, and c must be even numbers.";
      return;
    }
    const left = (a + b) + c;
    const right = a + (b + c);
    let message = `Result: ( ${a} + ${b} ) + ${c} = ${left} and ${a} + ( ${b} + ${c} ) = ${right}. `;
    message += (left === right) ? "Associativity holds." : "Associativity does not hold!";
    this.associativityResult = message;
  }

  checkInverse() {
    const a = parseInt(this.renderRoot.getElementById('inverse-a').value, 10);
    if (isNaN(a)) {
      this.inverseResult = "Please enter a valid integer for a.";
      return;
    }
    if (!this.isEven(a)) {
      this.inverseResult = "Please enter an even number for a.";
      return;
    }
    const inverse = -a;
    const sum = a + inverse;
    this.inverseResult = `Result: ${a} + (${inverse}) = ${sum}. Every even number a has an inverse (-a) such that a + (-a) = 0.`;
  }

  render() {
    return html`
      <h1>Even Numbers Group Demonstration</h1>
      <p>
        This demonstration shows the group properties of the set of even numbers 
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mn>2</mn>
          <mi>&#x2124;</mi>
        </math>
        under addition.
      </p>
      
      <section id="closure">
        <h2>Closure</h2>
        <p>
          Enter two even numbers to demonstrate closure:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mi>b</mi>
            <mo>=</mo>
            <mrow>
              <mn>2</mn>
              <mi>&#x2124;</mi>
            </mrow>
          </math>
        </p>
        <label for="closure-a">a:</label>
        <input id="closure-a" type="number" step="1">
        <label for="closure-b">b:</label>
        <input id="closure-b" type="number" step="1">
        <button @click=${this.checkClosure} id="check-closure">Check Closure</button>
        <div class="result" id="closure-result">${this.closureResult}</div>
      </section>
      
      <section id="identity">
        <h2>Identity</h2>
        <p>
          Enter an even number to demonstrate the identity property:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mn>0</mn>
            <mo>=</mo>
            <mi>a</mi>
          </math>
        </p>
        <label for="identity-a">a:</label>
        <input id="identity-a" type="number" step="1">
        <button @click=${this.checkIdentity} id="check-identity">Check Identity</button>
        <div class="result" id="identity-result">${this.identityResult}</div>
      </section>
      
      <section id="associativity">
        <h2>Associativity</h2>
        <p>
          Enter three even numbers to demonstrate associativity:
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
        <input id="assoc-a" type="number" step="1">
        <label for="assoc-b">b:</label>
        <input id="assoc-b" type="number" step="1">
        <label for="assoc-c">c:</label>
        <input id="assoc-c" type="number" step="1">
        <button @click=${this.checkAssociativity} id="check-associativity">Check Associativity</button>
        <div class="result" id="associativity-result">${this.associativityResult}</div>
      </section>
      
      <section id="inverse">
        <h2>Inverse</h2>
        <p>
          Enter an even number to demonstrate the inverse property:
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
        <input id="inverse-a" type="number" step="1">
        <button @click=${this.checkInverse} id="check-inverse">Check Inverse</button>
        <div class="result" id="inverse-result">${this.inverseResult}</div>
      </section>
    `;
  }
}

customElements.define('even-group-demo', EvenGroupDemo);
