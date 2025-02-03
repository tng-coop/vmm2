import { LitElement, html, css } from 'lit';

// --- Helper functions for D₃ ---
const elementToObj = {
  "1":   { k: 0, d: 0 },
  "r":   { k: 1, d: 0 },
  "r2":  { k: 2, d: 0 },
  "f":   { k: 0, d: 1 },
  "rf":  { k: 1, d: 1 },
  "r2f": { k: 2, d: 1 }
};

/**
 * Multiply two elements in D₃.
 * (k₁, d₁)·(k₂, d₂) = (k₁ + (-1)^(d₁)*k₂ mod 3, d₁+d₂ mod 2)
 */
function composeD3(a, b) {
  const A = elementToObj[a];
  const B = elementToObj[b];
  let k = A.k + (A.d === 0 ? B.k : -B.k);
  k = ((k % 3) + 3) % 3;
  const d = (A.d + B.d) % 2;
  for (let key in elementToObj) {
    const val = elementToObj[key];
    if (val.k === k && val.d === d) return key;
  }
  return null;
}

/**
 * Find the inverse of an element in D₃.
 */
function inverseD3(a) {
  for (let candidate in elementToObj) {
    if (composeD3(a, candidate) === "1") return candidate;
  }
  return null;
}

/**
 * Convert a D₃ element to a plain-text representation.
 */
function displayD3(elem) {
  switch (elem) {
    case "1":
      return "1";
    case "r":
      return "r";
    case "r2":
      return "r²";
    case "f":
      return "f";
    case "rf":
      return "r·f";
    case "r2f":
      return "r²·f";
    default:
      return elem;
  }
}

/**
 * Mapping from each D₃ element to the numbers assigned to the triangle’s vertices.
 */
const vertexMapping = {
  "1":   { top: "1", right: "2", left: "3" },
  "r":   { top: "3", right: "1", left: "2" },
  "r2":  { top: "2", right: "3", left: "1" },
  "f":   { top: "1", right: "3", left: "2" },
  "rf":  { top: "2", right: "1", left: "3" },
  "r2f": { top: "3", right: "2", left: "1" }
};

// --- TriangleGroupDemo Component ---
class TriangleGroupDemo extends LitElement {
  static properties = {
    currentElement: { type: String },
    animating: { type: Boolean }
  };

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
    /* Flex container for the triangle and multiplication table */
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
    /* Multiplication table styles */
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
    /* Persistent table highlights */
    .table-left-highlight {
      background-color: rgba(255, 200, 200, 0.3);
    }
    .table-right-highlight {
      background-color: rgba(200, 200, 255, 0.3);
    }
    .table-product-highlight {
      background-color: rgba(200, 255, 200, 0.8);
    }
    /* Formula display highlight styles */
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
    /* Buttons and interactive sections */
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

  constructor() {
    super();
    // Start with the identity element and no ongoing animation.
    this.currentElement = "1";
    this.animating = false;
  }

  firstUpdated() {
    this.resetDemo();
  }

  /** Remove any persistent table highlights */
  clearTableHighlights() {
    const allCells = this.renderRoot.querySelectorAll(
      '#multiplication-table td, #multiplication-table th'
    );
    allCells.forEach(cell => {
      cell.classList.remove('table-left-highlight', 'table-right-highlight', 'table-product-highlight');
    });
  }

  /** Reset the demo to the identity element and clear highlights.
   * When initially loaded, the highlight is set to 1 · 1 = 1.
   */
  resetDemo() {
    this.currentElement = "1";
    this.updateFormulaDisplay("1", "1", "1");
    this.updateVertices();
    this.clearTableHighlights();
    // Set the multiplication table highlight to show 1 · 1 = 1
    this.highlightMultiplicationCell("1", "1");
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      group.setAttribute("transform", "");
    }
  }

  /**
   * Update the formula display with three highlighted variables.
   * The left factor, right factor, and product are wrapped in spans with
   * classes that match the table highlighting colors.
   */
  updateFormulaDisplay(factorLeft, factorRight, product) {
    const formulaDisplay = this.renderRoot.querySelector("#formula-display");
    if (formulaDisplay) {
      formulaDisplay.innerHTML =
        `Result: <span class="left-highlight">${displayD3(factorLeft)}</span> · ` +
        `<span class="right-highlight">${displayD3(factorRight)}</span> = ` +
        `<span class="product-highlight">${displayD3(product)}</span>`;
    }
  }

  /** Update the triangle’s vertex labels according to the current element */
  updateVertices() {
    const mapping = vertexMapping[this.currentElement];
    this.renderRoot.querySelector('#vertex-top').textContent = mapping.top;
    this.renderRoot.querySelector('#vertex-right').textContent = mapping.right;
    this.renderRoot.querySelector('#vertex-left').textContent = mapping.left;
  }

  /**
   * Highlights the multiplication table for the current transformation.
   * Clears previous highlights, then:
   * - Adds a "table-left-highlight" class to all cells (and header cells)
   *   that have data-left equal to the left factor.
   * - Adds a "table-right-highlight" class to all cells with data-right equal
   *   to the right factor.
   * - For the main cell (with matching left and right factors), removes any
   *   row/column highlights and adds "table-product-highlight".
   *
   * The colors of these classes match those used in the formula display.
   */
  highlightMultiplicationCell(left, right) {
    // Clear previous table highlights
    this.clearTableHighlights();
    
    // Highlight the entire row (left factor)
    const rowCells = this.renderRoot.querySelectorAll(
      `#multiplication-table [data-left="${left}"]`
    );
    rowCells.forEach(cell => {
      cell.classList.add('table-left-highlight');
    });
    
    // Highlight the entire column (right factor)
    const colCells = this.renderRoot.querySelectorAll(
      `#multiplication-table [data-right="${right}"]`
    );
    colCells.forEach(cell => {
      cell.classList.add('table-right-highlight');
    });
    
    // For the main cell, remove row/column highlights and add product highlight
    const mainCell = this.renderRoot.querySelector(
      `#multiplication-table td[data-left="${left}"][data-right="${right}"]`
    );
    if (mainCell) {
      mainCell.classList.remove('table-left-highlight', 'table-right-highlight');
      mainCell.classList.add('table-product-highlight');
    }
  }

  // --- Transformation Handlers ---
  // (Each now calls highlightMultiplicationCell and updates the formula display.)
  
  handleIdentityClick() {
    if (this.animating) return;
    this.animating = true;
    const trans = '1';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    const group = this.renderRoot.querySelector("#triangle-group");
    const anim = group.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" }
      ],
      { duration: 300, easing: "ease-out", fill: "forwards" }
    );
    anim.finished.then(() => {
      anim.cancel();
      group.setAttribute("transform", "");
      this.currentElement = newElem;
      this.updateVertices();
      this.animating = false;
    });
  }

  animateRotation(targetAngle, duration, newElem) {
    const group = this.renderRoot.querySelector("#triangle-group");
    const startTime = performance.now();
    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const angle = targetAngle * progress;
      group.setAttribute("transform", `rotate(${angle})`);
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        group.setAttribute("transform", "");
        this.currentElement = newElem;
        this.updateVertices();
        this.animating = false;
      }
    };
    requestAnimationFrame(animateStep);
  }

  handleRotate120Click() {
    if (this.animating) return;
    this.animating = true;
    const trans = 'r';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    this.animateRotation(120, 500, newElem);
  }

  handleRotate240Click() {
    if (this.animating) return;
    this.animating = true;
    const trans = 'r2';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    this.animateRotation(240, 1000, newElem);
  }

  animateReflection(duration, newElem) {
    const group = this.renderRoot.querySelector("#triangle-group");
    const startTime = performance.now();
    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentScale = 1 - 2 * progress; // from 1 to -1
      group.setAttribute("transform", `scale(${currentScale}, 1)`);
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        group.setAttribute("transform", "");
        this.currentElement = newElem;
        this.updateVertices();
        this.animating = false;
      }
    };
    requestAnimationFrame(animateStep);
  }

  handleReflectClick() {
    if (this.animating) return;
    this.animating = true;
    const trans = 'f';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    this.animateReflection(500, newElem);
  }

  animateFlipThenRotation(targetAngle, flipDuration, rotationDuration, newElem) {
    const group = this.renderRoot.querySelector("#triangle-group");
    const flipStartTime = performance.now();
    const animateFlip = (now) => {
      const elapsed = now - flipStartTime;
      const progress = Math.min(elapsed / flipDuration, 1);
      const currentScale = 1 - 2 * progress;
      group.setAttribute("transform", `scale(${currentScale}, 1)`);
      if (progress < 1) {
        requestAnimationFrame(animateFlip);
      } else {
        const rotationStartTime = performance.now();
        const animateRotationPhase = (now2) => {
          const elapsed2 = now2 - rotationStartTime;
          const progress2 = Math.min(elapsed2 / rotationDuration, 1);
          const angle = targetAngle * progress2;
          group.setAttribute("transform", `rotate(${angle}) scale(-1,1)`);
          if (progress2 < 1) {
            requestAnimationFrame(animateRotationPhase);
          } else {
            group.setAttribute("transform", "");
            this.currentElement = newElem;
            this.updateVertices();
            this.animating = false;
          }
        };
        requestAnimationFrame(animateRotationPhase);
      }
    };
    requestAnimationFrame(animateFlip);
  }

  handleRFClick() {
    if (this.animating) return;
    this.animating = true;
    const trans = 'rf';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    this.animateFlipThenRotation(120, 500, 500, newElem);
  }

  handleR2FClick() {
    if (this.animating) return;
    this.animating = true;
    const trans = 'r2f';
    const oldElem = this.currentElement;
    const newElem = composeD3(trans, oldElem);
    this.highlightMultiplicationCell(trans, oldElem);
    this.updateFormulaDisplay(trans, oldElem, newElem);
    this.animateFlipThenRotation(240, 500, 1000, newElem);
  }

  // --- Interactive Sections for Group Properties (unchanged) ---
  
  handleInteractiveClosure() {
    const a = this.renderRoot.querySelector('#closure-a').value;
    const b = this.renderRoot.querySelector('#closure-b').value;
    const product = composeD3(a, b);
    this.renderRoot.querySelector('#closure-result').innerHTML =
      `Result: ${displayD3(a)} · ${displayD3(b)} = ${displayD3(product)}. Closure holds because the result is in D₃.`;
  }

  handleInteractiveIdentityProp() {
    const a = this.renderRoot.querySelector('#identity-element').value;
    const product = composeD3("1", a);
    this.renderRoot.querySelector('#identity-result-prop').innerHTML =
      `Result: ${displayD3("1")} · ${displayD3(a)} = ${displayD3(product)}. The identity element is 1.`;
  }

  handleInteractiveAssociativityProp() {
    const a = this.renderRoot.querySelector('#assoc-a').value;
    const b = this.renderRoot.querySelector('#assoc-b').value;
    const c = this.renderRoot.querySelector('#assoc-c').value;
    const left = composeD3(composeD3(a, b), c);
    const right = composeD3(a, composeD3(b, c));
    let msg = `Result: ( ${displayD3(a)} · ${displayD3(b)} ) · ${displayD3(c)} = ${displayD3(left)} and `;
    msg += `${displayD3(a)} · ( ${displayD3(b)} · ${displayD3(c)} ) = ${displayD3(right)}. `;
    msg += (left === right) ? "Associativity holds." : "Associativity fails!";
    this.renderRoot.querySelector('#associativity-result-prop').innerHTML = msg;
  }

  handleInteractiveInverseProp() {
    const a = this.renderRoot.querySelector('#inverse-element').value;
    const inv = inverseD3(a);
    this.renderRoot.querySelector('#inverse-result-prop').innerHTML =
      `Result: ${displayD3(a)} · ${displayD3(inv)} = 1. Inverse holds.`;
  }

  render() {
    // The order of elements (using the six D₃ elements) is important.
    const elements = ["1", "r", "r2", "f", "rf", "r2f"];
    return html`
      <h1>Triangle Group Demonstration (Dihedral Group D₃)</h1>
      
      <!-- Formula display with highlighted variables -->
      <div id="formula-display" data-test-id="formula-display"></div>
      
      <!-- Container for the SVG triangle and multiplication table -->
      <div class="demo-container">
        <!-- SVG Triangle -->
        <svg id="triangle-svg" width="300" height="300" viewBox="-150 -150 300 300" aria-label="Triangle group demonstration">
          <g id="triangle-group">
            <polygon points="0,-100 86.6,50 -86.6,50" fill="#007BFF" stroke="#0056b3" stroke-width="3"></polygon>
            <text id="vertex-top" class="vertex-label" x="0" y="-60" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">1</text>
            <text id="vertex-right" class="vertex-label" x="50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">2</text>
            <text id="vertex-left" class="vertex-label" x="-50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">3</text>
          </g>
        </svg>
        
        <!-- Multiplication Table for D₃ (generated dynamically with data attributes) -->
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
                      ${composeD3(left, right)}
                    </td>
                  `)}
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Buttons -->
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
          r² (Rotate 240°)
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
          r·f
        </button>
        <button id="r2f-button" 
          aria-label="Reflect then rotate 240 degrees"
          data-test-id="r2f-button"
          ?disabled="${this.animating}"
          @click="${this.handleR2FClick}">
          r²·f
        </button>
        <button id="reset-button" 
          aria-label="Reset demonstration"
          data-test-id="reset-button"
          ?disabled="${this.animating}"
          @click="${this.resetDemo}">
          Reset
        </button>
      </div>
      
      <!-- Interactive Sections for Group Properties (unchanged) -->
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
            data-test-id="check-inverse-prop-button"
            @click="${this.handleInteractiveInverseProp}">
            Check Inverse
          </button>
          <div id="inverse-result-prop" class="result" data-test-id="inverse-result-prop"></div>
        </section>
      </div>
    `;
  }
}

customElements.define("triangle-group-demo", TriangleGroupDemo);
