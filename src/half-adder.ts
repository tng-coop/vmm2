import { LitElement, html, css } from 'lit';
import BiwaScheme from 'biwascheme';
import { customElement, property } from 'lit/decorators';

@customElement('half-adder-demo')
export class HalfAdderDemo extends LitElement {
  @property({ type: String })
  code: string = `(define (xor a b)
  (or (and a (not b))
      (and (not a) b)))

(define (half-adder a b)
  (cons (and a b) (xor a b)))

; Test the half-adder with inputs: #t and #f
(half-adder #t #f)`;

  @property({ type: String })
  result: string = '';

  @property({ type: String })
  error: string = '';

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

  evaluateCode(): void {
    this.result = '';
    this.error = '';
    try {
      const interpreter = new BiwaScheme.Interpreter();
      interpreter.evaluate(this.code, (res: unknown) => {
        this.result = res !== undefined ? res.toString() : 'No result';
        this.requestUpdate();
      });
    } catch (err: any) {
      this.error = err.message;
    }
  }

  render() {
    return html`
      <h2>Half-Adder Demo using BiwaScheme</h2>
      <p>
        Enter your Scheme code below and click "Evaluate" to simulate a half-adder.
      </p>
      <textarea
        .value=${this.code}
        @input=${(e: Event) => {
          const target = e.target as HTMLTextAreaElement;
          this.code = target.value;
        }}
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
