import { LitElement, html, css } from 'lit';
import BiwaScheme from 'biwascheme';

export class LispDemo extends LitElement {
  static properties = {
    code: { type: String },
    result: { type: String },
    error: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background: #f9f9f9;
      font-family: Arial, sans-serif;
    }
    h2 {
      color: #333;
    }
    textarea {
      width: 100%;
      height: 150px;
      font-family: monospace;
      padding: 10px;
      box-sizing: border-box;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      margin-top: 10px;
      font-size: 16px;
      background: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .result,
    .error {
      margin-top: 20px;
      padding: 10px;
      border-radius: 4px;
    }
    .result {
      background: #e0ffe0;
      color: #006600;
    }
    .error {
      background: #ffe0e0;
      color: #990000;
    }
  `;

  constructor() {
    super();
    // A sample Scheme snippet: define a factorial function and compute (fact 5)
    this.code = `(define (fact n)
  (if (< n 2)
      1
      (* n (fact (- n 1)))))

(fact 5)`;
    this.result = '';
    this.error = '';
  }

  evaluateCode() {
    this.result = '';
    this.error = '';
    try {
      const interpreter = new BiwaScheme.Interpreter();
      interpreter.evaluate(this.code, (res) => {
        // Convert the result to a string, if defined.
        this.result = res !== undefined ? res.toString() : 'No result';
        // Trigger an update after the asynchronous callback.
        this.requestUpdate();
      });
    } catch (err) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <h2>Lisp Demo using BiwaScheme</h2>
      <p>
        Enter your Scheme (Lisp) code below and click "Evaluate" to run it.
      </p>
      <textarea
        .value=${this.code}
        @input=${(e) => (this.code = e.target.value)}
      ></textarea>
      <br />
      <button @click=${this.evaluateCode}>Evaluate</button>
      ${this.result
        ? html`<div class="result"><strong>Result:</strong> ${this.result}</div>`
        : ''}
      ${this.error
        ? html`<div class="error"><strong>Error:</strong> ${this.error}</div>`
        : ''}
    `;
  }
}

customElements.define('lisp-demo', LispDemo);
