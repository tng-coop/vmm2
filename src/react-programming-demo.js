// src/react-programming-demo.js
import { LitElement } from 'lit';
import './prism-code.js'; // ensure Prism is registered

export class ReactProgrammingDemo extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    // We work with statement groups.
    // For the parent's (caller) code sample, the groups (using 1-indexed line numbers) are:
    //   Group 0: [1, 1] → "import React from 'react';"
    //   Group 1: [2, 2] → "import ReactDOM from 'react-dom';"
    //   Group 2: [3, 3] → "import App from './App';"
    //   Group 3: [4, 9] → The entire ReactDOM.render( … );
    //
    // For the component definition code sample, the groups are:
    //   Group 0: [1, 1] → "import React, { useState } from 'react';"
    //   Group 1: [3, 16] → The definition of App (arrow function with its body)
    //   Group 2: [18, 18] → "export default App;"
    this.activeBox = 'parent'; // 'parent' (caller) or 'definition' (component definition)
    this.parentGroupIndex = 0;
    this.definitionGroupIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderDemo();
  }

  renderDemo() {
    // Clear previous content.
    this.replaceChildren();

    // ---------------------------
    // Define code samples.
    // ---------------------------
    const parentCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
    `.trim();

    const componentDefinitionCode = `
import React, { useState } from 'react';

const App = () => {
  const [greeting, setGreeting] = useState('Hello Function Component!');
  
  return (
    <div>
      <h1>{greeting}</h1>
      <input 
        type="text"
        value={greeting}
        onChange={(event) => setGreeting(event.target.value)}
      />
    </div>
  );
};

export default App;
    `.trim();

    // ---------------------------
    // Define statement group boundaries.
    // Each group is [startLine, endLine] (1-indexed).
    const parentGroups = [
      [1, 1],   // import React from 'react';
      [2, 2],   // import ReactDOM from 'react-dom';
      [3, 3],   // import App from './App';
      [4, 9]    // The entire ReactDOM.render(…) call.
    ];
    const definitionGroups = [
      [1, 1],    // import React, { useState } from 'react';
      [3, 16],   // Definition of App (arrow function with its body)
      [18, 18]   // export default App;
    ];

    // ---------------------------
    // Create main container.
    // ---------------------------
    const container = document.createElement('div');
    container.className = 'reactprogramming-demo';

    const style = document.createElement('style');
    style.textContent = `
      .reactprogramming-demo {
        display: flex;
        height: 100%;
        font-family: sans-serif;
      }
      /* LEFT COLUMN: Two code boxes side by side */
      .left-code-container {
        flex: 2;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: auto;
      }
      .code-boxes {
        display: flex;
        gap: 10px;
      }
      .code-box {
        flex: 1;
        border: 1px solid #ccc;
        padding: 5px;
      }
      /* Navigation buttons container */
      .button-container {
        display: flex;
        gap: 10px;
      }
      sl-button {
        font-size: 14px;
      }
      /* MIDDLE COLUMN: Demo area split vertically */
      .demo-area {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .demo-top {
        /* Live demo */
      }
      .demo-bottom {
        border-top: 1px solid #ccc;
        padding-top: 5px;
        font-size: 14px;
        color: #555;
      }
      input {
        padding: 5px;
        font-size: 16px;
        margin-top: 10px;
      }
    `;
    container.appendChild(style);

    // ---------------------------
    // LEFT COLUMN: Create two code boxes.
    // (Swapped order: parent's code on the left, component definition on the right.)
    const leftCodeContainer = document.createElement('div');
    leftCodeContainer.className = 'left-code-container';

    const codeBoxes = document.createElement('div');
    codeBoxes.className = 'code-boxes';

    // Parent (caller) code box.
    const parentBox = document.createElement('div');
    parentBox.className = 'code-box';
    const parentPrism = document.createElement('prism-code');
    parentPrism.setAttribute('code', parentCode);
    parentPrism.setAttribute('language', 'javascript');
    if (this.activeBox === 'parent') {
      const [start, end] = parentGroups[this.parentGroupIndex];
      parentPrism.setAttribute('highlight', `${start}-${end}`);
    } else {
      parentPrism.setAttribute('highlight', '');
    }
    parentBox.appendChild(parentPrism);

    // Component definition code box.
    const definitionBox = document.createElement('div');
    definitionBox.className = 'code-box';
    const definitionPrism = document.createElement('prism-code');
    definitionPrism.setAttribute('code', componentDefinitionCode);
    definitionPrism.setAttribute('language', 'javascript');
    if (this.activeBox === 'definition') {
      const [start, end] = definitionGroups[this.definitionGroupIndex];
      definitionPrism.setAttribute('highlight', `${start}-${end}`);
    } else {
      definitionPrism.setAttribute('highlight', '');
    }
    definitionBox.appendChild(definitionPrism);

    codeBoxes.appendChild(parentBox);
    codeBoxes.appendChild(definitionBox);
    leftCodeContainer.appendChild(codeBoxes);

    // Navigation buttons (using sl-button).
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const prevButton = document.createElement('sl-button');
    prevButton.setAttribute('variant', 'primary');
    prevButton.textContent = 'Previous';

    const nextButton = document.createElement('sl-button');
    nextButton.setAttribute('variant', 'primary');
    nextButton.textContent = 'Next';

    const backToParentButton = document.createElement('sl-button');
    backToParentButton.setAttribute('variant', 'primary');
    backToParentButton.textContent = 'Back to Parent';

    // New button: Skip to Component Definition.
    const skipToDefinitionButton = document.createElement('sl-button');
    skipToDefinitionButton.setAttribute('variant', 'primary');
    skipToDefinitionButton.textContent = 'Skip to Component Definition';

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    buttonContainer.appendChild(backToParentButton);
    buttonContainer.appendChild(skipToDefinitionButton);
    leftCodeContainer.appendChild(buttonContainer);

    // ---------------------------
    // MIDDLE COLUMN: Live Demo Area (split vertically)
    // ---------------------------
    const demoArea = document.createElement('div');
    demoArea.className = 'demo-area';

    // Top half: interactive live demo.
    const demoTop = document.createElement('div');
    demoTop.className = 'demo-top';
    let demoGreeting = 'Hello Function Component!';
    const demoHeading = document.createElement('h1');
    demoHeading.textContent = demoGreeting;
    const demoInput = document.createElement('input');
    demoInput.type = 'text';
    demoInput.value = demoGreeting;
    demoTop.appendChild(demoHeading);
    demoTop.appendChild(demoInput);

    // Bottom half: display inner state.
    const demoBottom = document.createElement('div');
    demoBottom.className = 'demo-bottom';
    demoBottom.textContent = 'Inner state: ' + demoGreeting;

    demoArea.appendChild(demoTop);
    demoArea.appendChild(demoBottom);

    // Append left and middle columns.
    container.appendChild(leftCodeContainer);
    container.appendChild(demoArea);
    this.appendChild(container);

    // ---------------------------
    // Navigation Update Function
    // ---------------------------
    const updateHighlight = () => {
      if (this.activeBox === 'parent') {
        const [start, end] = parentGroups[this.parentGroupIndex];
        parentPrism.setAttribute('highlight', `${start}-${end}`);
        definitionPrism.setAttribute('highlight', '');
        // In parent's mode, disable Previous if at first group.
        prevButton.disabled = (this.parentGroupIndex === 0);
        // Always enable Next in parent's mode (to allow transition).
        nextButton.disabled = false;
      } else { // activeBox === 'definition'
        const [start, end] = definitionGroups[this.definitionGroupIndex];
        definitionPrism.setAttribute('highlight', `${start}-${end}`);
        parentPrism.setAttribute('highlight', '');
        // In definition mode, always enable Previous so that pressing it at group 0 jumps back.
        prevButton.disabled = false;
        nextButton.disabled = (this.definitionGroupIndex === definitionGroups.length - 1);
      }
      backToParentButton.disabled = (this.activeBox === 'parent');
      console.log("Active Box:", this.activeBox, 
                  "Parent Group Index:", this.parentGroupIndex, 
                  "Definition Group Index:", this.definitionGroupIndex);
    };

    updateHighlight();

    // ---------------------------
    // Next Button: Move forward through statement groups.
    // ---------------------------
    nextButton.addEventListener('click', () => {
      if (this.activeBox === 'parent') {
        if (this.parentGroupIndex < parentGroups.length - 1) {
          this.parentGroupIndex++;
        } else {
          // At end of parent's statements; switch to component definition.
          this.activeBox = 'definition';
          this.definitionGroupIndex = 0;
        }
      } else { // activeBox === 'definition'
        if (this.definitionGroupIndex < definitionGroups.length - 1) {
          this.definitionGroupIndex++;
        }
      }
      updateHighlight();
    });

    // ---------------------------
    // Previous Button: Move backward through statement groups.
    // ---------------------------
    prevButton.addEventListener('click', () => {
      if (this.activeBox === 'definition') {
        if (this.definitionGroupIndex > 0) {
          this.definitionGroupIndex--;
        } else {
          // At beginning of component definition; jump back to parent's last statement.
          this.activeBox = 'parent';
          this.parentGroupIndex = parentGroups.length - 1;
        }
      } else { // activeBox === 'parent'
        if (this.parentGroupIndex > 0) {
          this.parentGroupIndex--;
        }
      }
      updateHighlight();
    });

    // ---------------------------
    // Back to Parent Button: Switch active box to parent's code.
    // ---------------------------
    backToParentButton.addEventListener('click', () => {
      if (this.activeBox === 'definition') {
        this.activeBox = 'parent';
      }
      updateHighlight();
    });

    // ---------------------------
    // Skip to Component Definition Button: Immediately jump to component definition.
    // ---------------------------
    skipToDefinitionButton.addEventListener('click', () => {
      this.activeBox = 'definition';
      this.definitionGroupIndex = 0;
      updateHighlight();
    });

    // ---------------------------
    // Live Demo: Update inner state as user types.
    // ---------------------------
    demoInput.addEventListener('input', (event) => {
      demoGreeting = event.target.value;
      demoHeading.textContent = demoGreeting;
      demoBottom.textContent = 'Inner state: ' + demoGreeting;
    });
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
