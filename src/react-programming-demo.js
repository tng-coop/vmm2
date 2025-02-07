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
    // Updated parent's file:
    // Line 1: import React from 'react';
    // Line 2: import ReactDOM from 'react-dom';
    // Line 3: import ParentComponent from './ParentComponent';
    // Line 4: (empty)
    // Lines 5–10: ReactDOM.render( ... );
    this.parentGroups = [
      [1, 1],   // Group 0: line 1
      [2, 2],   // Group 1: line 2
      [3, 3],   // Group 2: line 3 (now importing ParentComponent)
      [5, 10]   // Group 3: the render call
    ];

    // --- Component Definition code groups (absolute line numbers, counting empty lines):
    // Updated component definition file (31 lines total):
    // Lines:
    //   1: import React, { useState } from 'react';
    //   2: (empty)
    //   3–14: Definition of Greeting component
    //   15: (empty)
    //   16–18: Definition of CharCount component
    //   19: (empty)
    //   20–29: Definition of ParentComponent component
    //   30: (empty)
    //   31: export default ParentComponent;
    this.definitionGroups = [
      [1, 30],
      [31, 31],
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
import ParentComponent from './ParentComponent';

ReactDOM.render(
  <React.StrictMode>
    <ParentComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
    `.trim();

    const componentDefinitionCode = `
import React, { useState } from 'react';

const Greeting = ({ greeting, setGreeting }) => {
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

const CharCount = ({ greeting }) => {
  return <p>Character Count: {greeting.length}</p>;
};

const ParentComponent = () => {
  const [greeting, setGreeting] = useState('Hello Function Component!');
  
  return (
    <div>
      <Greeting greeting={greeting} setGreeting={setGreeting} />
      <CharCount greeting={greeting} />
    </div>
  );
};

export default ParentComponent;
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
      /* Bubble hint styling: now in document flow, below the input */
      .bubble-hint {
        background: #fffae6;
        border: 1px solid #f0c36d;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        display: none;
        margin-top: 10px;
      }
      /* NEW: Explanation area styling */
      .explanation-area {
        margin-top: 10px;
        font-size: 14px;
        color: #333;
        padding: 10px;
        background: #f7f7f7;
        border: 1px solid #ddd;
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

    // Navigation buttons container: "Previous", "Next", and "Reset"
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const prevButton = document.createElement('sl-button');
    prevButton.setAttribute('variant', 'primary');
    prevButton.textContent = 'Previous';

    const nextButton = document.createElement('sl-button');
    nextButton.setAttribute('variant', 'primary');
    nextButton.textContent = 'Next';

    // NEW: Reset button to start over.
    const resetButton = document.createElement('sl-button');
    resetButton.setAttribute('variant', 'primary');
    resetButton.textContent = 'Reset';

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    buttonContainer.appendChild(resetButton);
    leftCodeContainer.appendChild(buttonContainer);

    // NEW: Explanation area describing what each step does.
    const explanationArea = document.createElement('div');
    explanationArea.className = 'explanation-area';
    explanationArea.textContent = 'Step Explanation: ...';
    leftCodeContainer.appendChild(explanationArea);

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

    // NEW: Display character count (simulating the CharCount component)
    const demoCharCount = document.createElement('p');
    demoCharCount.textContent = 'Character Count: ' + demoGreeting.length;
    demoTop.appendChild(demoCharCount);

    // NEW: Bubble hint element, appended right after the simulated inbox.
    const bubbleHint = document.createElement('div');
    bubbleHint.className = 'bubble-hint';
    bubbleHint.textContent = 'Type something in the inbox above!';
    demoTop.appendChild(bubbleHint);

    // Bottom half: displays debug/inner state message.
    const demoBottom = document.createElement('div');
    demoBottom.className = 'demo-bottom';
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
        nextButton.disabled = false;
        
        if (this.browserEnabled || this.parentGroupIndex === this.parentGroups.length - 1) {
          demoTop.style.display = 'block';
          demoBottom.style.display = 'block';
          demoBottom.textContent = 'Inner state: ' + demoGreeting;
        } else {
          demoTop.style.display = 'none';
          demoBottom.style.display = 'none';
        }
        
        if (this.parentGroupIndex === this.parentGroups.length - 1 && !this.browserEnabled) {
          bubbleHint.style.display = 'block';
          bubbleHint.textContent = 'Type something in the inbox above!';
        } else {
          bubbleHint.style.display = 'none';
        }
      } else { // activeBox === 'definition'
        const [start, end] = this.definitionGroups[this.definitionGroupIndex];
        definitionPrism.setAttribute('highlight', `${start}-${end}`);
        parentPrism.setAttribute('highlight', '');
        prevButton.disabled = false;
        nextButton.disabled = false;
        bubbleHint.style.display = 'none';
        if (this.browserEnabled) {
          demoTop.style.display = 'block';
          demoBottom.style.display = 'block';
          demoBottom.textContent = "Component definition complete. State: 'greeting' = '" + demoGreeting + "'.";
        } else {
          demoTop.style.display = 'none';
          demoBottom.style.display = 'none';
        }
      }
      
      // ---------------------------
      // NEW: Update the Explanation Area
      // ---------------------------
      let explanation = '';
      if (this.activeBox === 'parent') {
        switch (this.parentGroupIndex) {
          case 0:
            explanation = "Step 1: Import React. This line imports the React library required to build the UI components.";
            break;
          case 1:
            explanation = "Step 2: Import ReactDOM. This line brings in ReactDOM so that React components can be rendered in the browser.";
            break;
          case 2:
            explanation = "Step 3: Import ParentComponent. This line imports your main component, allowing it to be used in the render call.";
            break;
          case 3:
            explanation = "Step 4: Render the ParentComponent. This statement mounts your React application into the DOM and starts the app.";
            break;
          default:
            explanation = "";
            break;
        }
      } else { // activeBox === 'definition'
        switch (this.definitionGroupIndex) {
          case 0:
            explanation = "Step 5: Define the Component. This section contains the definitions for Greeting, CharCount, and ParentComponent, including state management.";
            break;
          case 1:
            explanation = "Step 6: Export the Component. This final line exports ParentComponent as the default export, making it available for use elsewhere.";
            break;
          default:
            explanation = "";
            break;
        }
      }
      explanationArea.textContent = explanation;

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
        if (this.parentGroupIndex < this.parentGroups.length - 2) {
          this.parentGroupIndex++;
        } else if (this.parentGroupIndex === this.parentGroups.length - 2) {
          // Switch to definition mode after group 2
          this.activeBox = 'definition';
          this.definitionGroupIndex = 0;
        } else if (this.parentGroupIndex === this.parentGroups.length - 1) {
          // Do nothing if already at the final parent's group
        }
      } else { // activeBox === 'definition'
        if (this.definitionGroupIndex < this.definitionGroups.length - 1) {
          this.definitionGroupIndex++;
        } else {
          // When at the final group of definition, go back to parent's final group.
          this.activeBox = 'parent';
          this.parentGroupIndex = this.parentGroups.length - 1;
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
          this.activeBox = 'parent';
          this.parentGroupIndex = this.parentGroups.length - 2;
        }
      } else { // activeBox === 'parent'
        if (this.parentGroupIndex === this.parentGroups.length - 1) {
          this.activeBox = 'definition';
          this.definitionGroupIndex = this.definitionGroups.length - 1;
        } else if (this.parentGroupIndex > 0) {
          this.parentGroupIndex--;
        }
      }
      updateHighlight();
    });

    // ---------------------------
    // Reset Button: Restore the initial state.
    // ---------------------------
    resetButton.addEventListener('click', () => {
      this.activeBox = 'parent';
      this.parentGroupIndex = 0;
      this.definitionGroupIndex = 0;
      this.browserEnabled = false;
      demoGreeting = 'Hello Function Component!';
      demoInput.value = demoGreeting;
      demoHeading.textContent = demoGreeting;
      demoCharCount.textContent = 'Character Count: ' + demoGreeting.length;
      demoBottom.textContent = 'Inner state: ' + demoGreeting;
      updateHighlight();
    });

    // ---------------------------
    // Live Demo: Update inner state as user types.
    // ---------------------------
    demoInput.addEventListener('input', (event) => {
      demoGreeting = event.target.value;
      demoHeading.textContent = demoGreeting;
      demoCharCount.textContent = 'Character Count: ' + demoGreeting.length;
      
      // When the user types, automatically switch to definition mode if not already there.
      if (this.activeBox !== 'definition') {
        this.activeBox = 'definition';
        this.definitionGroupIndex = this.definitionGroups.length - 1;
        // Enable the web browser permanently.
        this.browserEnabled = true;
        updateHighlight();
      }
      
      // In definition mode, temporarily blink a highlight on the definition block.
      const originalHighlight = definitionPrism.getAttribute('highlight') || '';
      // Blink the main block (lines 3-29: Greeting, CharCount, ParentComponent)
      definitionPrism.setAttribute('highlight', '3-29');
      Prism.highlightElement(definitionPrism.querySelector('code'));
      demoBottom.textContent = "Component definition complete. State: 'greeting' = '" + demoGreeting + "'.";
      setTimeout(() => {
        definitionPrism.setAttribute('highlight', '');
        Prism.highlightElement(definitionPrism.querySelector('code'));
      }, 500);
    });
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
