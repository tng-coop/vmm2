// src/react-programming-demo.js
import { LitElement } from 'lit';
import './prism-code.js'; // ensure Prism is registered

export class ReactProgrammingDemo extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    // --- Parent (caller) code groups (absolute line numbers, including empty lines):
    // Suppose the parent's file looks like this:
    // Line 1: import React from 'react';
    // Line 2: import ReactDOM from 'react-dom';
    // Line 3: import App from './App';
    // Line 4: (empty)
    // Lines 5–10: ReactDOM.render( ... );
    // We will navigate only groups 0–2 (the first three lines) before switching to definition.
    this.parentGroups = [
      [1, 1],   // Group 0: line 1
      [2, 2],   // Group 1: line 2
      [3, 3],   // Group 2: line 3
      [5, 10]   // Group 3: the render call (displayed after the component definition is complete)
    ];

    // --- Component Definition code groups (absolute line numbers, counting empty lines):
    // The component definition file (18 lines total) is assumed to be:
    // Line 1: import React, { useState } from 'react';
    // Line 2: (empty)
    // Line 3: const App = () => {
    // Line 4:   const [greeting, setGreeting] = useState('Hello Function Component!');
    // Line 5: (empty)
    // Line 6:   return (
    // Line 7:     <div>
    // Line 8:       <h1>{greeting}</h1>
    // Line 9:       <input 
    // Line 10:         type="text"
    // Line 11:         value={greeting}
    // Line 12:         onChange={(event) => setGreeting(event.target.value)}
    // Line 13:       />
    // Line 14:     </div>
    // Line 15:   );
    // Line 16: };
    // Line 17: (empty)
    // Line 18: export default App;
    //
    // We define two groups:
    // Group 0: [1,17] → the entire definition except the final export line (incomplete definition)
    // Group 1: [18,18] → the export statement (definition complete)
    this.definitionGroups = [
      [1, 17],
      [18, 18],
    ];

    // Start with parent's (caller) code active.
    this.activeBox = 'parent'; // 'parent' (caller) or 'definition' (component definition)
    this.parentGroupIndex = 0;
    this.definitionGroupIndex = 0;
    // When the user starts typing, we want the live demo (web browser) to be permanently enabled.
    this.browserEnabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderDemo();
  }

  renderDemo() {
    // Clear previous content.
    this.replaceChildren();

    // ---------------------------
    // Define our code samples.
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
    // Create the main container.
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
      /* LEFT COLUMN: Two code boxes arranged side by side */
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
        /* Top half: live demo */
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
    // (Parent's code on the left, component definition code on the right.)
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
      const [start, end] = this.parentGroups[this.parentGroupIndex];
      parentPrism.setAttribute('highlight', `${start}-${end}`);
    } else {
      parentPrism.setAttribute('highlight', '');
    }
    parentBox.appendChild(parentPrism);

    // Component Definition code box.
    const definitionBox = document.createElement('div');
    definitionBox.className = 'code-box';
    const definitionPrism = document.createElement('prism-code');
    definitionPrism.setAttribute('code', componentDefinitionCode);
    definitionPrism.setAttribute('language', 'javascript');
    if (this.activeBox === 'definition') {
      const [start, end] = this.definitionGroups[this.definitionGroupIndex];
      definitionPrism.setAttribute('highlight', `${start}-${end}`);
    } else {
      definitionPrism.setAttribute('highlight', '');
    }
    definitionBox.appendChild(definitionPrism);

    codeBoxes.appendChild(parentBox);
    codeBoxes.appendChild(definitionBox);
    leftCodeContainer.appendChild(codeBoxes);

    // Navigation buttons (only "Previous" and "Next" remain).
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const prevButton = document.createElement('sl-button');
    prevButton.setAttribute('variant', 'primary');
    prevButton.textContent = 'Previous';

    const nextButton = document.createElement('sl-button');
    nextButton.setAttribute('variant', 'primary');
    nextButton.textContent = 'Next';

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
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

    // Bottom half: displays debug/inner state message.
    const demoBottom = document.createElement('div');
    demoBottom.className = 'demo-bottom';
    // In parent's mode, the demo is normally shown only for the final group.
    // But once browserEnabled is true, it stays visible.
    demoBottom.textContent = 'Inner state: ' + demoGreeting;

    demoArea.appendChild(demoTop);
    demoArea.appendChild(demoBottom);

    // Append left (code) and middle (demo) columns to the main container.
    container.appendChild(leftCodeContainer);
    container.appendChild(demoArea);
    this.appendChild(container);

    // ---------------------------
    // Navigation Update Function
    // ---------------------------
    const updateHighlight = () => {
      if (this.activeBox === 'parent') {
        const [start, end] = this.parentGroups[this.parentGroupIndex];
        parentPrism.setAttribute('highlight', `${start}-${end}`);
        definitionPrism.setAttribute('highlight', '');
        prevButton.disabled = (this.parentGroupIndex === 0);
        // Disable the Next button if we are at the final parent's group.
        nextButton.disabled = (this.parentGroupIndex === this.parentGroups.length - 1);
        // Show the live demo if either we're in parent's final group or the browser has been enabled.
        if (this.browserEnabled || this.parentGroupIndex === this.parentGroups.length - 1) {
          demoTop.style.display = 'block';
          demoBottom.style.display = 'block';
          demoBottom.textContent = 'Inner state: ' + demoGreeting;
        } else {
          demoTop.style.display = 'none';
          demoBottom.style.display = 'none';
        }
      } else { // activeBox === 'definition'
        const [start, end] = this.definitionGroups[this.definitionGroupIndex];
        definitionPrism.setAttribute('highlight', `${start}-${end}`);
        parentPrism.setAttribute('highlight', '');
        prevButton.disabled = false;
        nextButton.disabled = false;
        // If browserEnabled is true, show the live demo even in definition mode.
        if (this.browserEnabled) {
          demoTop.style.display = 'block';
          demoBottom.style.display = 'block';
          demoBottom.textContent = "Component definition complete. State: 'greeting' = '" + demoGreeting + "'.";
        } else {
          demoTop.style.display = 'none';
          demoBottom.style.display = 'none';
        }
      }
      console.log("Active Box:", this.activeBox, 
                  "Parent Group Index:", this.parentGroupIndex, 
                  "Definition Group Index:", this.definitionGroupIndex,
                  "Browser Enabled:", this.browserEnabled);
    };

    updateHighlight();

    // ---------------------------
    // Next Button: Move forward through statement groups.
    // ---------------------------
    nextButton.addEventListener('click', () => {
      if (this.activeBox === 'parent') {
        // In parent's mode, only groups 0,1,2 are normally shown.
        if (this.parentGroupIndex < this.parentGroups.length - 2) { // i.e. if index < 2
          this.parentGroupIndex++;
        } else if (this.parentGroupIndex === this.parentGroups.length - 2) {
          // When finishing group 2 ("import App from './App';"), switch to definition mode.
          this.activeBox = 'definition';
          this.definitionGroupIndex = 0;
        }
      } else { // activeBox === 'definition'
        if (this.definitionGroupIndex < this.definitionGroups.length - 1) {
          this.definitionGroupIndex++;
        } else {
          // When at the final group of definition ("export default App;"),
          // pressing Next goes back to the parent's final group (the render call).
          this.activeBox = 'parent';
          this.parentGroupIndex = this.parentGroups.length - 1; // group 3
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
          // At the beginning of definition mode; go back to parent's group 2.
          this.activeBox = 'parent';
          this.parentGroupIndex = this.parentGroups.length - 2; // group 2
        }
      } else { // activeBox === 'parent'
        if (this.parentGroupIndex === this.parentGroups.length - 1) {
          // If we're at the final parent's group (render call), go back to definition mode.
          this.activeBox = 'definition';
          this.definitionGroupIndex = this.definitionGroups.length - 1; // final definition group
        } else if (this.parentGroupIndex > 0) {
          this.parentGroupIndex--;
        }
      }
      updateHighlight();
    });

    // ---------------------------
    // Live Demo: Update inner state as user types.
    // ---------------------------
    demoInput.addEventListener('input', (event) => {
      demoGreeting = event.target.value;
      demoHeading.textContent = demoGreeting;
      
      // When the user types, automatically switch to definition mode if not already there.
      if (this.activeBox !== 'definition') {
        this.activeBox = 'definition';
        this.definitionGroupIndex = this.definitionGroups.length - 1; // final definition group
        // Enable the web browser permanently.
        this.browserEnabled = true;
        updateHighlight();
      }
      
      // In definition mode, temporarily blink a highlight on the definition block.
      const originalHighlight = definitionPrism.getAttribute('highlight') || '';
      // Temporarily set the highlight to cover the main block (e.g., lines 3-17)
      definitionPrism.setAttribute('highlight', '3-17');
      Prism.highlightElement(definitionPrism.querySelector('code'));
      demoBottom.textContent = "Component definition complete. State: 'greeting' = '" + demoGreeting + "'.";
      // Blink for 100ms, then remove any highlighting.
      setTimeout(() => {
        definitionPrism.setAttribute('highlight', '');
        Prism.highlightElement(definitionPrism.querySelector('code'));
      }, 500);
    });
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
