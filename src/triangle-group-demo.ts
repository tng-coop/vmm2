import { LitElement, html, css, render, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Define a union type for the D₃ elements.
export type D3Element = "1" | "r" | "r2" | "f" | "rf" | "r2f";

interface D3Obj {
  k: number;
  d: number;
}

// --- Helper functions for D₃ ---
const elementToObj: Record<D3Element, D3Obj> = {
  "1":   { k: 0, d: 0 },
  "r":   { k: 1, d: 0 },
  "r2":  { k: 2, d: 0 },
  "f":   { k: 0, d: 1 },
  "rf":  { k: 1, d: 1 },
  "r2f": { k: 2, d: 1 }
};

export function composeD3(a: D3Element, b: D3Element): D3Element {
  const A = elementToObj[a];
  const B = elementToObj[b];
  let k = A.k + (A.d === 0 ? B.k : -B.k);
  k = ((k % 3) + 3) % 3;
  const d = (A.d + B.d) % 2;
  // Iterate over the entries (with an appropriate cast) to find the matching element.
  for (const [key, val] of Object.entries(elementToObj) as [D3Element, D3Obj][]) {
    if (val.k === k && val.d === d) return key;
  }
  // Should never happen for D₃.
  throw new Error(`composeD3: No matching element for k=${k}, d=${d}`);
}

export function inverseD3(a: D3Element): D3Element {
  for (const candidate in elementToObj) {
    if (composeD3(a, candidate as D3Element) === "1") return candidate as D3Element;
  }
  throw new Error(`inverseD3: No inverse found for element ${a}`);
}

export function displayD3(elem: D3Element): TemplateResult {
  switch (elem) {
    case "1":
      return html`1`;
    case "r":
      return html`r`;
    case "r2":
      return html`r<sup>2</sup>`;
    case "f":
      return html`f`;
    case "rf":
      return html`r&middot;f`;
    case "r2f":
      return html`r<sup>2</sup>&middot;f`;
    default:
      return html`${elem}`;
  }
}

const vertexMapping: Record<D3Element, { top: string; right: string; left: string }> = {
  "1":   { top: "1", right: "2", left: "3" },
  "r":   { top: "3", right: "1", left: "2" },
  "r2":  { top: "2", right: "3", left: "1" },
  "f":   { top: "1", right: "3", left: "2" },
  "rf":  { top: "2", right: "1", left: "3" },
  "r2f": { top: "3", right: "2", left: "1" }
};

// --- TriangleGroupDemo Component ---
@customElement('triangle-group-demo')
export class TriangleGroupDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #eef;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .demo-container {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    svg {
      overflow: visible;
    }
    #multiplication-table {
      font-family: monospace;
      font-size: 16px;
    }
    #multiplication-table table {
      border-collapse: collapse;
    }
    #multiplication-table th,
    #multiplication-table td {
      border: 1px solid #ccc;
      padding: 5px 10px;
      text-align: center;
    }
    .table-left-highlight {
      background-color: rgba(255, 200, 200, 0.3);
    }
    .table-right-highlight {
      background-color: rgba(200, 200, 255, 0.3);
    }
    .table-product-highlight {
      background-color: rgba(200, 255, 200, 0.8);
    }
    #formula-display {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .left-highlight {
      background-color: rgba(255, 200, 200, 0.8);
      padding: 0 4px;
    }
    .right-highlight {
      background-color: rgba(200, 200, 255, 0.8);
      padding: 0 4px;
    }
    .product-highlight {
      background-color: rgba(200, 255, 200, 0.8);
      padding: 0 4px;
    }
    .buttons, .interactive {
      text-align: center;
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      margin: 5px;
      font-size: 14px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    section {
      background: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 20px auto;
      max-width: 600px;
      border-radius: 8px;
      text-align: left;
    }
    section h2 {
      margin-top: 0;
      text-align: center;
    }
    section label {
      margin-right: 10px;
    }
    section select, section input {
      margin: 5px;
      padding: 5px;
      width: 80px;
    }
    section div.result {
      margin-top: 10px;
      font-weight: bold;
      text-align: center;
    }
  `;

  @property({ type: String })
  currentElement: D3Element = "1";

  @property({ type: Boolean })
  animating: boolean = false;

  @property({ type: Object })
  formula: TemplateResult = html`
      Result: <span class="left-highlight">${displayD3("1")}</span> &middot; 
      <span class="right-highlight">${displayD3("1")}</span> = 
      <span class="product-highlight">${displayD3("1")}</span>
  `;

  clearTableHighlights(): void {
    const allCells = this.renderRoot.querySelectorAll(
      '#multiplication-table td, #multiplication-table th'
    );
    allCells.forEach(cell => {
      cell.classList.remove('table-left-highlight', 'table-right-highlight', 'table-product-highlight');
    });
  }

  resetDemo(): void {
    if (this.currentElement !== "1") {
      this.currentElement = "1";
    }
    this.formula = html`
      Result: <span class="left-highlight">${displayD3("1")}</span> &middot; 
      <span class="right-highlight">${displayD3("1")}</span> = 
      <span class="product-highlight">${displayD3("1")}</span>
    `;
    this.updateVertices();
    this.clearTableHighlights();
    this.highlightMultiplicationCell("1", "1");
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      group.setAttribute("transform", "");
    }
  }

  updateFormulaDisplay(factorLeft: D3Element, factorRight: D3Element, product: D3Element): void {
    this.formula = html`
      Result: <span class="left-highlight">${displayD3(factorLeft)}</span> &middot; 
      <span class="right-highlight">${displayD3(factorRight)}</span> = 
      <span class="product-highlight">${displayD3(product)}</span>
    `;
  }

  updateVertices(): void {
    const mapping = vertexMapping[this.currentElement];
    const vertexTop = this.renderRoot.querySelector('#vertex-top');
    const vertexRight = this.renderRoot.querySelector('#vertex-right');
    const vertexLeft = this.renderRoot.querySelector('#vertex-left');
    if (vertexTop) {
      vertexTop.textContent = mapping.top;
    }
    if (vertexRight) {
      vertexRight.textContent = mapping.right;
    }
    if (vertexLeft) {
      vertexLeft.textContent = mapping.left;
    }
  }

  highlightMultiplicationCell(left: D3Element, right: D3Element): void {
    this.clearTableHighlights();
    const rowCells = this.renderRoot.querySelectorAll(
      `#multiplication-table [data-left="${left}"]`
    );
    rowCells.forEach(cell => cell.classList.add('table-left-highlight'));
    const colCells = this.renderRoot.querySelectorAll(
      `#multiplication-table [data-right="${right}"]`
    );
    colCells.forEach(cell => cell.classList.add('table-right-highlight'));
    const mainCell = this.renderRoot.querySelector(
      `#multiplication-table td[data-left="${left}"][data-right="${right}"]`
    );
    if (mainCell) {
      mainCell.classList.remove('table-left-highlight', 'table-right-highlight');
      mainCell.classList.add('table-product-highlight');
    }
  }

  // --- Transformation Handlers using async/await ---
  async handleIdentityClick(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "1";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      const anim = group.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.2)" },
          { transform: "scale(1)" }
        ],
        { duration: 300, easing: "ease-out", fill: "forwards" }
      );
      await anim.finished;
      anim.cancel();
      group.setAttribute("transform", "");
    }
    this.currentElement = newElem;
    this.updateVertices();
    this.animating = false;
  }

  async animateRotation(targetAngle: number, duration: number, newElem: D3Element): Promise<void> {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    const startTime = performance.now();
    await new Promise<void>(resolve => {
      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        group.setAttribute("transform", `rotate(${targetAngle * progress})`);
        if (progress < 1) {
          requestAnimationFrame(animateStep);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animateStep);
    });
    group.setAttribute("transform", "");
    this.currentElement = newElem;
    this.updateVertices();
    this.animating = false;
  }

  async handleRotate120Click(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "r";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    await this.animateRotation(120, 500, newElem);
  }

  async handleRotate240Click(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "r2";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    await this.animateRotation(240, 1000, newElem);
  }

  async animateReflection(duration: number, newElem: D3Element): Promise<void> {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    const startTime = performance.now();
    await new Promise<void>(resolve => {
      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentScale = 1 - 2 * progress;
        group.setAttribute("transform", `scale(${currentScale}, 1)`);
        if (progress < 1) {
          requestAnimationFrame(animateStep);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animateStep);
    });
    group.setAttribute("transform", "");
    this.currentElement = newElem;
    this.updateVertices();
    this.animating = false;
  }

  async handleReflectClick(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "f";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    await this.animateReflection(500, newElem);
  }

  async animateFlipThenRotation(targetAngle: number, flipDuration: number, rotationDuration: number, newElem: D3Element): Promise<void> {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    // Flip phase
    const flipStartTime = performance.now();
    await new Promise<void>(resolve => {
      const animateFlip = (now: number) => {
        const elapsed = now - flipStartTime;
        const progress = Math.min(elapsed / flipDuration, 1);
        const currentScale = 1 - 2 * progress;
        group.setAttribute("transform", `scale(${currentScale}, 1)`);
        if (progress < 1) {
          requestAnimationFrame(animateFlip);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animateFlip);
    });
    // Rotation phase (with reflection in place)
    const rotationStartTime = performance.now();
    await new Promise<void>(resolve => {
      const animateRotationPhase = (now2: number) => {
        const elapsed2 = now2 - rotationStartTime;
        const progress2 = Math.min(elapsed2 / rotationDuration, 1);
        group.setAttribute("transform", `rotate(${targetAngle * progress2}) scale(-1,1)`);
        if (progress2 < 1) {
          requestAnimationFrame(animateRotationPhase);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animateRotationPhase);
    });
    group.setAttribute("transform", "");
    this.currentElement = newElem;
    this.updateVertices();
    this.animating = false;
  }

  async handleRFClick(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "rf";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    await this.animateFlipThenRotation(120, 500, 500, newElem);
  }

  async handleR2FClick(): Promise<void> {
    if (this.animating) return;
    this.animating = true;
    const trans: D3Element = "r2f";
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    await this.animateFlipThenRotation(240, 500, 1000, newElem);
  }

  // --- Interactive Sections for Group Properties ---
  handleInteractiveClosure(): void {
    const closureAElement = this.renderRoot.querySelector('#closure-a') as HTMLSelectElement | null;
    const closureBElement = this.renderRoot.querySelector('#closure-b') as HTMLSelectElement | null;
    if (!closureAElement || !closureBElement) return;
    const a = closureAElement.value as D3Element;
    const b = closureBElement.value as D3Element;
    const product = composeD3(a, b);
    const closureTemplate = html`
      Result: ${displayD3(a)} &middot; ${displayD3(b)} = ${displayD3(product)}. Closure holds because the result is in D₃.
    `;
    render(closureTemplate, this.renderRoot.querySelector<HTMLDivElement>('#closure-result')!);
  }

  handleInteractiveIdentityProp(): void {
    const identityElement = this.renderRoot.querySelector('#identity-element') as HTMLSelectElement | null;
    if (!identityElement) return;
    const a = identityElement.value as D3Element;
    const product = composeD3("1", a);
    const identityTemplate = html`
      Result: ${displayD3("1")} &middot; ${displayD3(a)} = ${displayD3(product)}. The identity element is 1.
    `;
    render(identityTemplate, this.renderRoot.querySelector<HTMLDivElement>('#identity-result-prop')!);
  }

  handleInteractiveAssociativityProp(): void {
    const assocAElement = this.renderRoot.querySelector('#assoc-a') as HTMLSelectElement | null;
    const assocBElement = this.renderRoot.querySelector('#assoc-b') as HTMLSelectElement | null;
    const assocCElement = this.renderRoot.querySelector('#assoc-c') as HTMLSelectElement | null;
    if (!assocAElement || !assocBElement || !assocCElement) return;
    const a = assocAElement.value as D3Element;
    const b = assocBElement.value as D3Element;
    const c = assocCElement.value as D3Element;
    const left = composeD3(composeD3(a, b), c);
    const right = composeD3(a, composeD3(b, c));
    const assocTemplate = html`
      Result: ( ${displayD3(a)} &middot; ${displayD3(b)} ) &middot; ${displayD3(c)} = ${displayD3(left)}
      and ${displayD3(a)} &middot; ( ${displayD3(b)} &middot; ${displayD3(c)} ) = ${displayD3(right)}.
      ${left === right ? 'Associativity holds.' : 'Associativity fails!'}
    `;
    render(assocTemplate, this.renderRoot.querySelector<HTMLDivElement>('#associativity-result-prop')!);
  }

  handleInteractiveInverseProp(): void {
    const inverseElement = this.renderRoot.querySelector('#inverse-element') as HTMLSelectElement | null;
    if (!inverseElement) return;
    const a = inverseElement.value as D3Element;
    const inv = inverseD3(a);
    const inverseTemplate = html`
      Result: ${displayD3(a)} &middot; ${displayD3(inv)} = 1. Inverse holds.
    `;
    render(inverseTemplate, this.renderRoot.querySelector<HTMLDivElement>('#inverse-result-prop')!);
  }

  render(): TemplateResult {
    const elements: D3Element[] = ["1", "r", "r2", "f", "rf", "r2f"];
    return html`
      <h1>Triangle Group Demonstration (Dihedral Group D₃)</h1>
      
      <div id="formula-display" data-test-id="formula-display">${this.formula}</div>
      
      <div class="demo-container">
        <svg id="triangle-svg" width="300" height="300" viewBox="-150 -150 300 300" aria-label="Triangle group demonstration">
          <g id="triangle-group">
            <polygon points="0,-100 86.6,50 -86.6,50" fill="#007BFF" stroke="#0056b3" stroke-width="3"></polygon>
            <text id="vertex-top" class="vertex-label" x="0" y="-60" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">1</text>
            <text id="vertex-right" class="vertex-label" x="50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">2</text>
            <text id="vertex-left" class="vertex-label" x="-50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">3</text>
          </g>
        </svg>
        
        <div id="multiplication-table">
          <table>
            <thead>
              <tr>
                <th>*</th>
                ${elements.map(el => html`<th data-right="${el}">${displayD3(el)}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${elements.map(left => html`
                <tr>
                  <th data-left="${left}">${displayD3(left)}</th>
                  ${elements.map(right => html`
                    <td data-left="${left}" data-right="${right}">
                      ${displayD3(composeD3(left, right))}
                    </td>
                  `)}
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="buttons">
        <button id="identity-button" 
          aria-label="Apply identity transformation"
          data-test-id="identity-button"
          ?disabled="${this.animating}"
          @click="${this.handleIdentityClick}">
          1 (Identity)
        </button>
        <button id="rotate-120-button" 
          aria-label="Rotate triangle 120 degrees"
          data-test-id="rotate-120-button"
          ?disabled="${this.animating}"
          @click="${this.handleRotate120Click}">
          r (Rotate 120°)
        </button>
        <button id="rotate-240-button" 
          aria-label="Rotate triangle 240 degrees"
          data-test-id="rotate-240-button"
          ?disabled="${this.animating}"
          @click="${this.handleRotate240Click}">
          r<sup>2</sup> (Rotate 240°)
        </button>
        <button id="reflect-button" 
          aria-label="Reflect triangle"
          data-test-id="reflect-button"
          ?disabled="${this.animating}"
          @click="${this.handleReflectClick}">
          f (Reflect)
        </button>
        <button id="rf-button" 
          aria-label="Reflect then rotate 120 degrees"
          data-test-id="rf-button"
          ?disabled="${this.animating}"
          @click="${this.handleRFClick}">
          r&middot;f
        </button>
        <button id="r2f-button" 
          aria-label="Reflect then rotate 240 degrees"
          data-test-id="r2f-button"
          ?disabled="${this.animating}"
          @click="${this.handleR2FClick}">
          r<sup>2</sup>&middot;f
        </button>
        <button id="reset-button" 
          aria-label="Reset demonstration"
          data-test-id="reset-button"
          ?disabled="${this.animating}"
          @click="${this.resetDemo}">
          Reset
        </button>
      </div>
      
      <div class="interactive">
        <section id="closure-section" aria-labelledby="closure-heading" data-test-id="closure-section">
          <h2 id="closure-heading">Closure</h2>
          <p>Select two elements to check closure under composition:</p>
          <label for="closure-a">a:</label>
          <select id="closure-a" data-test-id="closure-a-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="closure-b">b:</label>
          <select id="closure-b" data-test-id="closure-b-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-closure" 
            aria-label="Check closure property"
            data-test-id="check-closure-button"
            @click="${this.handleInteractiveClosure}">
            Check Closure
          </button>
          <div id="closure-result" class="result" data-test-id="closure-result"></div>
        </section>
        
        <section id="identity-prop-section" aria-labelledby="identity-prop-heading" data-test-id="identity-prop-section">
          <h2 id="identity-prop-heading">Identity</h2>
          <p>Select an element to see that composing with the identity yields the same element:</p>
          <label for="identity-element">a:</label>
          <select id="identity-element" data-test-id="identity-element-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-identity-prop" 
            aria-label="Check identity property"
            data-test-id="identity-result-prop-button"
            @click="${this.handleInteractiveIdentityProp}">
            Check Identity
          </button>
          <div id="identity-result-prop" class="result" data-test-id="identity-result-prop"></div>
        </section>
        
        <section id="associativity-prop-section" aria-labelledby="associativity-prop-heading" data-test-id="associativity-prop-section">
          <h2 id="associativity-prop-heading">Associativity</h2>
          <p>Select three elements to verify associativity: (a·b)·c = a·(b·c)</p>
          <label for="assoc-a">a:</label>
          <select id="assoc-a" data-test-id="assoc-a-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-b">b:</label>
          <select id="assoc-b" data-test-id="assoc-b-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-c">c:</label>
          <select id="assoc-c" data-test-id="assoc-c-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-associativity-prop" 
            aria-label="Check associativity property"
            data-test-id="check-associativity-prop-button"
            @click="${this.handleInteractiveAssociativityProp}">
            Check Associativity
          </button>
          <div id="associativity-result-prop" class="result" data-test-id="associativity-result-prop"></div>
        </section>
        
        <section id="inverse-prop-section" aria-labelledby="inverse-prop-heading" data-test-id="inverse-prop-section">
          <h2 id="inverse-prop-heading">Inverse</h2>
          <p>Select an element to find its inverse (b such that a·b = 1):</p>
          <label for="inverse-element">a:</label>
          <select id="inverse-element" data-test-id="inverse-element-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-inverse-prop" 
            aria-label="Check inverse property"
            data-test-id="inverse-result-prop-button"
            @click="${this.handleInteractiveInverseProp}">
            Check Inverse
          </button>
          <div id="inverse-result-prop" class="result" data-test-id="inverse-result-prop"></div>
        </section>
      </div>
    `;
  }
}
