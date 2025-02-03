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
 * Convert a D₃ element to a MathML representation.
 */
function displayD3(elem) {
  switch (elem) {
    case "1":
      return "<mi>1</mi>";
    case "r":
      return "<mi>r</mi>";
    case "r2":
      return "<msup><mi>r</mi><mn>2</mn></msup>";
    case "f":
      return "<mi>f</mi>";
    case "rf":
      return "<mrow><mi>r</mi><mo>&#x22C5;</mo><mi>f</mi></mrow>";
    case "r2f":
      return "<mrow><msup><mi>r</mi><mn>2</mn></msup><mo>&#x22C5;</mo><mi>f</mi></mrow>";
    default:
      return `<mi>${elem}</mi>`;
  }
}

/**
 * Mapping from each D₃ element to the numbers assigned to the triangle’s vertices.
 *
 * Our fixed vertex positions in the SVG are:
 *  - top: (0, –60)  (default number "1")
 *  - right: (50, 30)  (default number "2")
 *  - left: (–50, 30)  (default number "3")
 *
 * For example, the identity "1" is:
 *   { top: "1", right: "2", left: "3" }
 *
 * And the rotation "r" (rotate 120° counterclockwise) updates the assignment to:
 *   { top: "3", right: "1", left: "2" }
 *
 * The reflection "f" (about the vertical axis) yields:
 *   { top: "1", right: "3", left: "2" }
 *
 * Similarly, "rf" becomes { top: "2", right: "1", left: "3" } and
 * "r2f" becomes { top: "3", right: "2", left: "1" }.
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
    currentElement: { type: String }
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
    svg {
      display: block;
      margin: 0 auto 20px;
      overflow: visible;
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
    #formula-display {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
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
    // Start with the identity element.
    this.currentElement = "1";
  }

  firstUpdated() {
    this.resetDemo();
  }

  /** Reset the demo to the identity element. */
  resetDemo() {
    this.currentElement = "1";
    this.updateFormulaDisplay("1", "1", "1");
    this.updateVertices();
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      group.setAttribute("transform", "");
    }
  }

  /** Update the MathML formula display with the current multiplication step. */
  updateFormulaDisplay(factorLeft, factorRight, product) {
    const formulaDisplay = this.renderRoot.querySelector("#formula-display");
    if (formulaDisplay) {
      formulaDisplay.innerHTML =
        `Result: <math><mrow>${displayD3(factorLeft)}<mo>&#x22C5;</mo>${displayD3(factorRight)}<mo>=</mo>${displayD3(product)}</mrow></math>`;
    }
  }

  /**
   * Update the text labels at the triangle’s vertices according to the current D₃ element.
   */
  updateVertices() {
    const mapping = vertexMapping[this.currentElement];
    this.renderRoot.querySelector('#vertex-top').textContent = mapping.top;
    this.renderRoot.querySelector('#vertex-right').textContent = mapping.right;
    this.renderRoot.querySelector('#vertex-left').textContent = mapping.left;
  }

  // --- Transformation Handlers ---

  /**
   * Identity:
   * When pressed, animate a brief “raise” (scale up) effect.
   * The animation is added (composite:"add") so that it does not break any other transform animations.
   */
  handleIdentityClick() {
    const trans = '1';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    const group = this.renderRoot.querySelector("#triangle-group");
    // Animate scale from 1 to 1.2 and back to 1.
    group.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" }
      ],
      { duration: 300, easing: "ease-out", fill: "forwards", composite: "add" }
    ).finished.then(() => {
      // Identity leaves the triangle unchanged.
      this.currentElement = newElem;
      this.updateVertices();
    });
  }

  /** Animate a rotation from 0° to targetAngle. */
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
      }
    };
    requestAnimationFrame(animateStep);
  }

  /** Handler for r (rotate 120°) */
  handleRotate120Click() {
    const trans = 'r';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    this.animateRotation(120, 500, newElem);
  }

  /** Handler for r2 (rotate 240°) */
  handleRotate240Click() {
    const trans = 'r2';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    this.animateRotation(240, 1000, newElem);
  }

  /** Animate a reflection by scaling x from 1 to -1. */
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
      }
    };
    requestAnimationFrame(animateStep);
  }

  /** Handler for f (reflect) */
  handleReflectClick() {
    const trans = 'f';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    this.animateReflection(500, newElem);
  }

  /**
   * Animate a flip-then-rotation.
   * First, animate a flip (scale x from 1 to –1) over flipDuration.
   * Then, animate a rotation (while keeping scale –1) over rotationDuration.
   * The transform during the rotation phase is: rotate(angle) scale(-1,1)
   */
  animateFlipThenRotation(targetAngle, flipDuration, rotationDuration, newElem) {
    const group = this.renderRoot.querySelector("#triangle-group");
    const flipStartTime = performance.now();
    const animateFlip = (now) => {
      const elapsed = now - flipStartTime;
      const progress = Math.min(elapsed / flipDuration, 1);
      const currentScale = 1 - 2 * progress; // from 1 to -1
      group.setAttribute("transform", `scale(${currentScale}, 1)`);
      if (progress < 1) {
        requestAnimationFrame(animateFlip);
      } else {
        // Start rotation phase (keeping scale at -1).
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
          }
        };
        requestAnimationFrame(animateRotationPhase);
      }
    };
    requestAnimationFrame(animateFlip);
  }

  /** Handler for r·f (rf): flip then rotate 120° */
  handleRFClick() {
    const trans = 'rf';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    this.animateFlipThenRotation(120, 500, 500, newElem);
  }

  /** Handler for r²·f (r2f): flip then rotate 240° */
  handleR2FClick() {
    const trans = 'r2f';
    const newElem = composeD3(trans, this.currentElement);
    this.updateFormulaDisplay(trans, this.currentElement, newElem);
    this.animateFlipThenRotation(240, 500, 1000, newElem);
  }

  // --- Interactive Sections for Group Properties ---

  handleInteractiveClosure() {
    const a = this.renderRoot.querySelector('#closure-a').value;
    const b = this.renderRoot.querySelector('#closure-b').value;
    const product = composeD3(a, b);
    this.renderRoot.querySelector('#closure-result').innerHTML =
      `Result: <math><mrow>${displayD3(a)}<mo>&#x22C5;</mo>${displayD3(b)}<mo>=</mo>${displayD3(product)}</mrow></math>. Closure holds because the result is in D₃.`;
  }

  handleInteractiveIdentityProp() {
    const a = this.renderRoot.querySelector('#identity-element').value;
    const product = composeD3("1", a);
    this.renderRoot.querySelector('#identity-result-prop').innerHTML =
      `Result: <math><mrow>${displayD3("1")}<mo>&#x22C5;</mo>${displayD3(a)}<mo>=</mo>${displayD3(product)}</mrow></math>. The identity element is 1.`;
  }

  handleInteractiveAssociativityProp() {
    const a = this.renderRoot.querySelector('#assoc-a').value;
    const b = this.renderRoot.querySelector('#assoc-b').value;
    const c = this.renderRoot.querySelector('#assoc-c').value;
    const left = composeD3(composeD3(a, b), c);
    const right = composeD3(a, composeD3(b, c));
    let msg = `Result: <math><mrow>( ${displayD3(a)}<mo>&#x22C5;</mo>${displayD3(b)} )<mo>&#x22C5;</mo>${displayD3(c)}<mo>=</mo>${displayD3(left)}</mrow></math> and <math><mrow>${displayD3(a)}<mo>&#x22C5;</mo>( ${displayD3(b)}<mo>&#x22C5;</mo>${displayD3(c)} )<mo>=</mo>${displayD3(right)}</mrow></math>. `;
    msg += (left === right) ? "Associativity holds." : "Associativity fails!";
    this.renderRoot.querySelector('#associativity-result-prop').innerHTML = msg;
  }

  handleInteractiveInverseProp() {
    const a = this.renderRoot.querySelector('#inverse-element').value;
    const inv = inverseD3(a);
    this.renderRoot.querySelector('#inverse-result-prop').innerHTML =
      `Result: <math><mrow>${displayD3(a)}<mo>&#x22C5;</mo>${displayD3(inv)}<mo>=</mo><mi>1</mi></mrow></math> Inverse holds.`;
  }

  render() {
    return html`
      <h1>Triangle Group Demonstration (Dihedral Group D₃)</h1>
      
      <!-- Formula display -->
      <div id="formula-display" data-test-id="formula-display"></div>
      
      <!-- SVG Triangle (the entire group rotates or reflects) -->
      <svg id="triangle-svg" width="300" height="300" viewBox="-150 -150 300 300" aria-label="Triangle group demonstration">
        <g id="triangle-group">
          <polygon points="0,-100 86.6,50 -86.6,50" fill="#007BFF" stroke="#0056b3" stroke-width="3"></polygon>
          <!-- The text labels are initially positioned at fixed coordinates. -->
          <text id="vertex-top" class="vertex-label" x="0" y="-60" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">1</text>
          <text id="vertex-right" class="vertex-label" x="50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">2</text>
          <text id="vertex-left" class="vertex-label" x="-50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">3</text>
        </g>
      </svg>
      
      <div class="buttons">
        <button id="identity-button" 
          aria-label="Apply identity transformation"
          data-test-id="identity-button"
          @click="${this.handleIdentityClick}">
          1 (Identity)
        </button>
        <button id="rotate-120-button" 
          aria-label="Rotate triangle 120 degrees"
          data-test-id="rotate-120-button"
          @click="${this.handleRotate120Click}">
          r (Rotate 120°)
        </button>
        <button id="rotate-240-button" 
          aria-label="Rotate triangle 240 degrees"
          data-test-id="rotate-240-button"
          @click="${this.handleRotate240Click}">
          r² (Rotate 240°)
        </button>
        <button id="reflect-button" 
          aria-label="Reflect triangle"
          data-test-id="reflect-button"
          @click="${this.handleReflectClick}">
          f (Reflect)
        </button>
        <button id="rf-button" 
          aria-label="Reflect then rotate 120 degrees"
          data-test-id="rf-button"
          @click="${this.handleRFClick}">
          r·f
        </button>
        <button id="r2f-button" 
          aria-label="Reflect then rotate 240 degrees"
          data-test-id="r2f-button"
          @click="${this.handleR2FClick}">
          r²·f
        </button>
        <button id="reset-button" 
          aria-label="Reset demonstration"
          data-test-id="reset-button"
          @click="${this.resetDemo}">
          Reset
        </button>
      </div>
      
      <!-- Interactive Sections for Group Properties -->
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
            data-test-id="check-identity-prop-button"
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
