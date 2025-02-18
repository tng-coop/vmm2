import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { scheme } from '@codemirror/legacy-modes/mode/scheme';
import BiwaScheme from 'biwascheme';

@customElement('lisp-demo')
export class LispDemo extends LitElement {
  @property({ type: String })
  code: string = `(define (fact n)
  (if (< n 2)
      1
      (* n (fact (- n 1)))))

(fact 5)`;

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
    .result, .error {
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

  private editorView?: EditorView;

  firstUpdated() {
    // Create an EditorState with CodeMirror's basic setup and Scheme mode.
    // No custom decoration plugin is added.
    const state = EditorState.create({
      doc: this.code,
      extensions: [basicSetup, StreamLanguage.define(scheme)]
    });

    const editorContainer = this.shadowRoot!.querySelector('#editor') as HTMLElement;
    this.editorView = new EditorView({
      state,
      parent: editorContainer
    });
  }

  evaluateCode(): void {
    this.result = '';
    this.error = '';
    if (this.editorView) {
      const code = this.editorView.state.doc.toString();
      const interpreter = new BiwaScheme.Interpreter();
      interpreter.evaluate(code, (res: any) => {
        this.result = res === BiwaScheme.undef ? 'No result' : res.toString();
        this.requestUpdate();
      });
    }
  }

  render() {
    return html`
      <h2>Lisp Demo using BiwaScheme</h2>
      <p>
        Enter your Scheme (Lisp) code below and click "Evaluate" to run it.
      </p>
      <div id="editor"></div>
      <button @click=${this.evaluateCode}>Evaluate</button>
      ${this.result ? html`<div class="result"><strong>Result:</strong> ${this.result}</div>` : ''}
      ${this.error ? html`<div class="error"><strong>Error:</strong> ${this.error}</div>` : ''}
    `;
  }
}
