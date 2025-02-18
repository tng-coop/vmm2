import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EditorState, RangeSetBuilder } from '@codemirror/state';
import { EditorView, ViewPlugin, Decoration, ViewUpdate } from '@codemirror/view';
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
    /* The editor container */
    #editor {
      height: 150px;
      border: 1px solid #ccc;
      font-family: monospace;
      font-size: 16px;
      padding: 10px;
      box-sizing: border-box;
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
    /* Custom decoration for highlighting a keyword (e.g. "define") */
    .cm-content .highlight-word {
      background-color: yellow;
    }
  `;

  private editorView?: EditorView;

  firstUpdated() {
    // Define a decoration to highlight the word "define"
    const highlightDecoration = Decoration.mark({ class: 'highlight-word' });
    function buildDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      for (const { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        const regex = /\bdefine\b/g; // change this regex to highlight different keywords if desired
        let match: RegExpExecArray | null;
        while ((match = regex.exec(text)) !== null) {
          builder.add(
            from + match.index,
            from + match.index + match[0].length,
            highlightDecoration
          );
        }
      }
      return builder.finish();
    }
    const highlightPlugin = ViewPlugin.fromClass(
      class {
        decorations = buildDecorations(this.view);
        constructor(public view: EditorView) {}
        update(update: ViewUpdate) {
          if (update.docChanged || update.viewportChanged) {
            this.decorations = buildDecorations(update.view);
          }
        }
      },
      { decorations: v => v.decorations }
    );

    // Create the initial EditorState with CodeMirror's basic setup, Scheme language mode, and the highlight plugin.
    const state = EditorState.create({
      doc: this.code,
      extensions: [
        basicSetup,
        StreamLanguage.define(scheme),
        highlightPlugin
      ]
    });

    // Mount the CodeMirror editor into the shadow DOM
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
      // Retrieve the current code from the editor
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
      ${this.result
        ? html`<div class="result"><strong>Result:</strong> ${this.result}</div>`
        : ''}
      ${this.error
        ? html`<div class="error"><strong>Error:</strong> ${this.error}</div>`
        : ''}
    `;
  }
}
