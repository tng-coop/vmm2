import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EditorState, RangeSetBuilder } from '@codemirror/state';
import { EditorView, Decoration, DecorationSet, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { scheme } from '@codemirror/legacy-modes/mode/scheme';
import BiwaScheme from 'biwascheme';

// Define decorations for "and" and "xor"
const andDeco = Decoration.mark({ class: 'cm-and-highlight' });
const xorDeco = Decoration.mark({ class: 'cm-xor-highlight' });

// Create a CodeMirror view plugin to highlight "and" and "xor", excluding tokens in comments.
const keywordHighlighter = ViewPlugin.fromClass(class {
  decorations: DecorationSet;
  constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }
  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }
  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    // Match whole words "and" or "xor"
    const regex = /\b(and|xor)\b/g;
    for (let { from, to } of view.visibleRanges) {
      const text = view.state.doc.sliceString(from, to);
      let match;
      while ((match = regex.exec(text)) !== null) {
        const token = match[1];
        const start = from + match.index;
        const end = start + token.length;
        // Determine the line that contains this token.
        const line = view.state.doc.lineAt(start);
        // Get the portion of the line up to the token.
        const beforeToken = line.text.slice(0, start - line.from);
        // If there's a semicolon in the text before the token, assume it's in a comment.
        if (beforeToken.indexOf(";") !== -1) {
          continue;
        }
        const deco = token === 'and' ? andDeco : xorDeco;
        builder.add(start, end, deco);
      }
    }
    return builder.finish();
  }
}, { decorations: v => v.decorations });

@customElement('half-adder-demo')
export class HalfAdderDemo extends LitElement {
  @property({ type: String })
  result: string = '';

  @property({ type: String })
  error: string = '';

  // Hidden code: defines our custom logical and (via an alias) and xor for numbers.
  private hiddenCode: string = `(define (my-and a b)
  (if (and (= a 1) (= b 1))
      1
      0))
(define and my-and)
(define (xor a b)
  (if (= (+ a b) 1)
      1
      0))`;

  // Visible code: uses and and xor to compute the half-adder.
  code: string = `(define (half-adder a b)
  (cons (and a b) (xor a b)))

; Test the half-adder with inputs: 1 and 0
(half-adder 1 0)
`;

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
    /* Special highlighting for the keywords "and" and "xor" */
    .cm-and-highlight {
      background-color: #a0d8ef; /* Light blue */
    }
    .cm-xor-highlight {
      background-color: #ffcc80; /* Light orange */
    }
  `;

  firstUpdated() {
    const state = EditorState.create({
      doc: this.code,
      extensions: [
        basicSetup,
        StreamLanguage.define(scheme),
        keywordHighlighter
      ]
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
      // Prepend the hidden definitions for and and xor.
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
      <h2>Half-Adder Demo</h2>
      <p>
        The definitions for <strong>and</strong> and <strong>xor</strong> are hidden.
        Edit the half-adder code below and click "Evaluate" to simulate a half-adder using 0 and 1.
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
