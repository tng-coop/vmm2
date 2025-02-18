import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { scheme } from '@codemirror/legacy-modes/mode/scheme';
import BiwaScheme from 'biwascheme';

@customElement('half-adder-demo')
export class HalfAdderDemo extends LitElement {
  @property({ type: String })
  result: string = '';

  @property({ type: String })
  error: string = '';

  // This code will be hidden from the editor.
  private hiddenCode: string = `(define (xor a b)
  (or (and a (not b))
      (and (not a) b)))`;

  // The visible code that the user can edit.
  code: string = `(define (half-adder a b)
  (cons (and a b) (xor a b)))

; Test the half-adder with inputs: #t and #f
(half-adder #t #f)`;

  private editorView?: EditorView;

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
    /* CodeMirror editor container */
    #editor {
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 150px;
      overflow: auto;
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

  firstUpdated() {
    const state = EditorState.create({
      doc: this.code,
      extensions: [basicSetup, StreamLanguage.define(scheme)]
    });
    const editorContainer = this.shadowRoot?.querySelector('#editor');
    if (editorContainer) {
      this.editorView = new EditorView({
        state,
        parent: editorContainer as HTMLElement
      });
    }
  }

  evaluateCode(): void {
    this.result = '';
    this.error = '';
    if (this.editorView) {
      const userCode = this.editorView.state.doc.toString();
      // Prepend the hidden XOR definition to the user code.
      const fullCode = `${this.hiddenCode}\n${userCode}`;
      const interpreter = new BiwaScheme.Interpreter();
      try {
        interpreter.evaluate(fullCode, (res: any) => {
          this.result = res !== BiwaScheme.undef ? res.toString() : 'No result';
          this.requestUpdate();
        });
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }

  render() {
    return html`
      <h2>Half-Adder Demo using BiwaScheme</h2>
      <p>
        The XOR function definition is hidden. Edit the half-adder code below and click "Evaluate" to simulate a half-adder.
      </p>
      <div id="editor"></div>
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
