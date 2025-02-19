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

@customElement('adder-demo')
export class AdderDemo extends LitElement {
  @property({ type: String })
  result: string = '';

  @property({ type: String })
  error: string = '';

  // Tracks the current demo type.
  @property({ type: String })
  demoType: string = 'half-adder';

  // Hidden code: defines our custom logical and, xor, and or for numbers.
  private hiddenCode: string = `(define (my-and a b)
  (if (and (= a 1) (= b 1))
      1
      0))
(define and my-and)
(define (xor a b)
  (if (= (+ a b) 1)
      1
      0))
(define (my-or a b)
  (if (and (= a 0) (= b 0))
      0
      1))
(define or my-or)`;

  // Demo templates for different types of adders.
  private demoTemplates: Record<string, { name: string, code: string }> = {
    'half-adder': {
      name: 'Half-Adder Demo',
      code: `(define (half-adder a b)
  (cons (and a b) (xor a b)))

; Test the half-adder with inputs: 1 and 0
(half-adder 1 0)
`
    },
    'full-adder': {
      name: 'Full-Adder Demo',
      code: `(define (full-adder a b c)
  (let ((sum (xor (xor a b) c))
        (carry (or (and a b) (and (xor a b) c))))
    (cons carry sum)))

; Test the full adder with inputs: 1, 1, 0
(full-adder 1 1 0)
`
    },
    'chained-full-adder': {
      name: 'Chained Full-Adder Demo',
      code: `(define (full-adder a b c)
  (let ((sum (xor (xor a b) c))
        (carry (or (and a b) (and (xor a b) c))))
    (cons carry sum)))

; Chaining two full adders for two-bit addition
(let* ((fa1 (full-adder 1 0 0)) ; first bit addition, carry in 0
       (carry1 (car fa1))
       (sum1 (cdr fa1))
       (fa2 (full-adder 1 1 carry1))
       (carry2 (car fa2))
       (sum2 (cdr fa2)))
  (list carry2 sum2 sum1))
`
    }
  };

  // The code that is shown in the editor.
  code: string = this.demoTemplates[this.demoType].code;

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
    select {
      margin-bottom: 10px;
      padding: 5px;
      font-size: 16px;
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

  // Called when the user selects a different demo.
  handleDemoTypeChange(e: Event): void {
    const select = e.target as HTMLSelectElement;
    this.demoType = select.value;
    // Update the code in the editor with the template for the selected demo.
    const newCode = this.demoTemplates[this.demoType].code;
    this.code = newCode;
    if (this.editorView) {
      this.editorView.dispatch({
        changes: { from: 0, to: this.editorView.state.doc.length, insert: newCode }
      });
    }
    // Clear previous results/errors.
    this.result = '';
    this.error = '';
  }

  evaluateCode(): void {
    this.result = '';
    this.error = '';
    if (this.editorView) {
      const userCode = this.editorView.state.doc.toString();
      // Prepend the hidden definitions for and, xor, and or.
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
      <h2>${this.demoTemplates[this.demoType].name}</h2>
      <p>
        The definitions for <strong>and</strong>, <strong>xor</strong>, and <strong>or</strong> are hidden.
        Edit the code below and click "Evaluate" to simulate the selected adder.
      </p>
      <label for="demo-select">Select Demo:</label>
      <select id="demo-select" @change=${this.handleDemoTypeChange}>
        <option value="half-adder" ?selected=${this.demoType === 'half-adder'}>Half Adder</option>
        <option value="full-adder" ?selected=${this.demoType === 'full-adder'}>Full Adder</option>
        <option value="chained-full-adder" ?selected=${this.demoType === 'chained-full-adder'}>Chained Full Adder</option>
      </select>
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
