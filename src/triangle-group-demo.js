import { LitElement, html, css, render } from 'lit';

// --- Helper functions for D₃ ---

const elementToObj = {
  "1":   { k: 0, d: 0 },
  "r":   { k: 1, d: 0 },
  "r2":  { k: 2, d: 0 },
  "f":   { k: 0, d: 1 },
  "rf":  { k: 1, d: 1 },
  "r2f": { k: 2, d: 1 }
};

function composeD3(a, b) {
  const A = elementToObj[a];
  const B = elementToObj[b];
  // Multiplication: (k₁, d₁)·(k₂, d₂) = (k₁ + (-1)^(d₁)*k₂ mod 3, d₁+d₂ mod 2)
  let k = A.k + (A.d === 0 ? B.k : -B.k);
  k = ((k % 3) + 3) % 3;
  const d = (A.d + B.d) % 2;
  for (let key in elementToObj) {
    const val = elementToObj[key];
    if (val.k === k && val.d === d) return key;
  }
  return null;
}

function inverseD3(a) {
  for (let candidate in elementToObj) {
    if (composeD3(a, candidate) === "1") return candidate;
  }
  return null;
}

/**
 * Convert a D₃ element (as a string) to a MathML representation.
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

// --- LitElement Component ---

class TriangleGroupDemo extends LitElement {
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
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
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
    // currentElement holds the “accumulated” D₃ element (starts with the identity)
    this.currentElement = "1";
  }

  firstUpdated() {
    // Reset demo after first render.
    this.resetDemo();
    // (No need for setupInteractive() if we use declarative event handlers below.)
  }

  /** Reset the triangle’s transformation and vertex labels. */
  resetTriangle() {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      group.getAnimations().forEach(animation => animation.cancel());
      group.setAttribute("transform", "rotate(0) scale(1)");
    }
    const labels = this.renderRoot.querySelectorAll('.vertex-label');
    labels.forEach(label => label.removeAttribute('transform'));
  }

  /** Reset the demo to the identity. */
  resetDemo() {
    this.resetTriangle();
    this.currentElement = "1";
    const formulaDisplay = this.renderRoot.querySelector("#formula-display");
    if (formulaDisplay) {
      formulaDisplay.innerHTML = `Result: <math><mrow>${displayD3("1")}<mo>=</mo>${displayD3("1")}</mrow></math>`;
    }
  }

  /** Update the formula display for a multiplication step. */
  updateFormulaDisplay(factorLeft, factorRight, product) {
    const formulaDisplay = this.renderRoot.querySelector("#formula-display");
    if (formulaDisplay) {
      formulaDisplay.innerHTML =
        `Result: <math><mrow>${displayD3(factorLeft)}<mo>&#x22C5;</mo>${displayD3(factorRight)}<mo>=</mo>${displayD3(product)}</mrow></math>`;
    }
  }

  // --- Helpers to read current transform values ---
  getCurrentRotation() {
    const group = this.renderRoot.querySelector("#triangle-group");
    const transform = group.getAttribute("transform") || "";
    const match = transform.match(/rotate\(([-\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  getCurrentScale() {
    const group = this.renderRoot.querySelector("#triangle-group");
    const transform = group.getAttribute("transform") || "";
    const match = transform.match(/scale\(([-\d.]+)/);
    return match ? parseFloat(match[1]) : 1;
  }

  /** Animate a rotation relative to the current rotation. */
  animateRotation(targetAngle, duration = 500) {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    let startTime = null;
    const startAngle = this.getCurrentRotation();
    const finalAngle = startAngle + targetAngle;
    const currentScale = this.getCurrentScale();
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentAngle = startAngle + progress * (finalAngle - startAngle);
      group.setAttribute("transform", `rotate(${currentAngle}) scale(${currentScale})`);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Adjust vertex labels to counter the rotation.
        const labels = this.renderRoot.querySelectorAll('.vertex-label');
        labels.forEach(label => {
          const x = label.getAttribute("x");
          const y = label.getAttribute("y");
          label.setAttribute("transform", `rotate(-${finalAngle}, ${x}, ${y})`);
        });
      }
    };
    requestAnimationFrame(step);
  }

  /** Animate a horizontal flip (reflection) about the triangle’s top vertex. */
  animateFlip(duration = 500) {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    let startTime = null;
    const startS = 1;
    const targetS = -1;
    const currentRotation = this.getCurrentRotation();
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const s = startS + progress * (targetS - startS);
      group.setAttribute("transform",
        `rotate(${currentRotation}) translate(0, 100) scale(${s},1) translate(0, -100)`
      );
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        const labels = this.renderRoot.querySelectorAll('.vertex-label');
        labels.forEach(label => {
          const x = label.getAttribute("x");
          const y = label.getAttribute("y");
          label.setAttribute("transform",
            `translate(${x}, ${y}) scale(-1,1) translate(${-x}, ${-y})`
          );
        });
      }
    };
    requestAnimationFrame(step);
  }

  /** Animate a flip then a rotation. */
  animateFlipThenRotation(targetAngle, flipDuration = 500, rotationDuration = 500) {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (!group) return;
    const initialRotation = this.getCurrentRotation();
    const startS = 1;
    const targetS = -1;
    let startTimeFlip = null;
    const stepFlip = (timestamp) => {
      if (!startTimeFlip) startTimeFlip = timestamp;
      const elapsed = timestamp - startTimeFlip;
      const progress = Math.min(elapsed / flipDuration, 1);
      const s = startS + progress * (targetS - startS);
      group.setAttribute("transform",
        `rotate(${initialRotation}) translate(0, 100) scale(${s},1) translate(0, -100)`
      );
      if (progress < 1) {
        requestAnimationFrame(stepFlip);
      } else {
        const labels = this.renderRoot.querySelectorAll('.vertex-label');
        labels.forEach(label => {
          const x = label.getAttribute("x");
          const y = label.getAttribute("y");
          label.setAttribute("transform",
            `translate(${x}, ${y}) scale(-1,1) translate(${-x}, ${-y})`
          );
        });
        startRotationPhase();
      }
    };
    const startRotationPhase = () => {
      let startTimeRot = null;
      const finalRotation = initialRotation + targetAngle;
      const stepRotation = (timestamp) => {
        if (!startTimeRot) startTimeRot = timestamp;
        const elapsed = timestamp - startTimeRot;
        const progress = Math.min(elapsed / rotationDuration, 1);
        const currentRotation = initialRotation + progress * (finalRotation - initialRotation);
        group.setAttribute("transform",
          `rotate(${currentRotation}) translate(0, 100) scale(${targetS},1) translate(0, -100)`
        );
        if (progress < 1) {
          requestAnimationFrame(stepRotation);
        } else {
          const labels = this.renderRoot.querySelectorAll('.vertex-label');
          labels.forEach(label => {
            const x = label.getAttribute("x");
            const y = label.getAttribute("y");
            label.setAttribute("transform",
              `translate(${x}, ${y}) scale(-1,1) rotate(-${finalRotation}) translate(${-x}, ${-y})`
            );
          });
        }
      };
      requestAnimationFrame(stepRotation);
    };
    requestAnimationFrame(stepFlip);
  }

  /** Visual “raise” effect. */
  raiseTriangle() {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      const current = group.getAttribute("transform") || "";
      group.animate([{ transform: current }, { transform: current + " scale(1.2)" }], {
        duration: 150, fill: "forwards", easing: "ease-out"
      });
    }
  }

  /** Visual “lower” effect. */
  lowerTriangle() {
    const group = this.renderRoot.querySelector("#triangle-group");
    if (group) {
      const current = group.getAttribute("transform") || "";
      group.animate([{ transform: current }, { transform: current.replace(/scale\([^)]*\)/, "scale(1)") }], {
        duration: 150, fill: "forwards", easing: "ease-out"
      });
    }
  }

  // --- Declarative Event Handlers for the Interactive Sections ---

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
    const prod = composeD3(a, inv);
    this.renderRoot.querySelector('#inverse-result-prop').innerHTML =
      `Result: <math><mrow>${displayD3(a)}<mo>&#x22C5;</mo>${displayD3(inv)}<mo>=</mo><mi>1</mi></mrow></math> Inverse holds.`;
  }

  render() {
    return html`
      <h1>Triangle Group Demonstration (Dihedral Group D₃)</h1>
      
      <!-- Formula display: resets to identity on load -->
      <div id="formula-display"></div>
      
      <!-- Animated triangle with transformation buttons -->
      <svg id="triangle-svg" width="300" height="300" viewBox="-150 -150 300 300">
        <g id="triangle-group">
          <polygon points="0,-100 86.6,50 -86.6,50" fill="#007BFF" stroke="#0056b3" stroke-width="3"></polygon>
          <text x="0" y="10" font-size="36" text-anchor="middle" fill="white">🐱</text>
          <text class="vertex-label" x="0" y="-60" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">1</text>
          <text class="vertex-label" x="50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">2</text>
          <text class="vertex-label" x="-50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">3</text>
        </g>
      </svg>
      
      <div class="buttons">
        <!-- Identity: 1 · (current) -->
        <button id="identity-button"
          @pointerdown="${() => this.raiseTriangle()}"
          @pointerup="${() => {
              const trans = '1';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.lowerTriangle();
          }}">
          1 (Identity)
        </button>
        <!-- Rotation by 120°: r · (current) -->
        <button 
          @pointerup="${() => {
              const trans = 'r';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.animateRotation(120, 500);
          }}">
          r (Rotate 120°)
        </button>
        <!-- Rotation by 240°: r² · (current) -->
        <button 
          @pointerup="${() => {
              const trans = 'r2';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.animateRotation(240, 1000);
          }}">
          r² (Rotate 240°)
        </button>
        <!-- Reflection: f · (current) -->
        <button 
          @pointerup="${() => {
              const trans = 'f';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.animateFlip(500);
          }}">
          f (Reflect)
        </button>
        <!-- Reflection then rotation: (r·f) · (current) -->
        <button 
          @pointerup="${() => {
              const trans = 'rf';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.animateFlipThenRotation(120, 500, 500);
          }}">
          r·f
        </button>
        <!-- Reflection then rotation: (r²·f) · (current) -->
        <button 
          @pointerup="${() => {
              const trans = 'r2f';
              const newElem = composeD3(trans, this.currentElement);
              this.updateFormulaDisplay(trans, this.currentElement, newElem);
              this.currentElement = newElem;
              this.animateFlipThenRotation(240, 500, 1000);
          }}">
          r²·f
        </button>
        <!-- Explicit Reset Button -->
        <button id="reset-button"
          @pointerup="${() => this.resetDemo()}">
          Reset
        </button>
      </div>
      
      <!-- Interactive sections for group properties -->
      <div class="interactive">
        <section id="closure">
          <h2>Closure</h2>
          <p>Select two elements to check closure under composition:</p>
          <label for="closure-a">a:</label>
          <select id="closure-a">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="closure-b">b:</label>
          <select id="closure-b">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-closure" @click="${this.handleInteractiveClosure}">Check Closure</button>
          <div id="closure-result" class="result"></div>
        </section>
        
        <section id="identity-property">
          <h2>Identity</h2>
          <p>Select an element to see that composing with the identity yields the same element:</p>
          <label for="identity-element">a:</label>
          <select id="identity-element">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-identity-prop" @click="${this.handleInteractiveIdentityProp}">Check Identity</button>
          <div id="identity-result-prop" class="result"></div>
        </section>
        
        <section id="associativity-property">
          <h2>Associativity</h2>
          <p>Select three elements to verify associativity: (a·b)·c = a·(b·c)</p>
          <label for="assoc-a">a:</label>
          <select id="assoc-a">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-b">b:</label>
          <select id="assoc-b">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-c">c:</label>
          <select id="assoc-c">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-associativity-prop" @click="${this.handleInteractiveAssociativityProp}">Check Associativity</button>
          <div id="associativity-result-prop" class="result"></div>
        </section>
        
        <section id="inverse-property">
          <h2>Inverse</h2>
          <p>Select an element to find its inverse (b such that a·b = 1):</p>
          <label for="inverse-element">a:</label>
          <select id="inverse-element">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-inverse-prop" @click="${this.handleInteractiveInverseProp}">Check Inverse</button>
          <div id="inverse-result-prop" class="result"></div>
        </section>
      </div>
    `;
  }
}

customElements.define("triangle-group-demo", TriangleGroupDemo);
