// src/react-programming-demo.js
import { LitElement } from 'lit';
import './prism-code.js'; // ensure Prism is registered

export class ReactProgrammingDemo extends LitElement {
  // Render into the light DOM so that global CSS (e.g. Prism’s theme) applies.
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    // Set the initial highlighted line to 1.
    this.currentHighlightLine = 1;
    // For demonstration, the "React state" will reflect the current highlight.
    this.reactState = `Current Highlight: ${this.currentHighlightLine}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderDemo();
  }

  renderDemo() {
    // Clear any existing content.
    this.replaceChildren();

    // Create the main container.
    const container = document.createElement('div');
    container.className = 'reactprogramming-demo';

    // Insert CSS styles for layout and buttons.
    const style = document.createElement('style');
    style.textContent = `
      /* Main container uses flexbox for three columns */
      .reactprogramming-demo {
        display: flex;
        height: 100%;
      }
      /* Left column: Code area */
      .code-area {
        flex: 2;
        padding: 10px;
      }
      /* Middle column: React state display area */
      .state-area {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /* Right column: Explanation area with the "hello" box */
      .explain-area {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /* Styling for the "hello" box and state box */
      .box {
        border: 2px solid #000;
        padding: 10px;
        background-color: #f5f5f5;
        font-family: sans-serif;
      }
      /* Container for the navigation buttons */
      .button-container {
        margin-top: 10px;
        display: flex;
        gap: 10px;
      }
    `;
    container.appendChild(style);

    // ============================
    // LEFT COLUMN: Code Area
    // ============================
    const codeArea = document.createElement('div');
    codeArea.className = 'code-area';

    // The code snippet to display.
    const code = `
import React from 'react';

const HelloWorld = () => (
  <div>
    <h1>Hello, world!</h1>
    <p>This is a sample JSX component.</p>
  </div>
);

export default HelloWorld;
    `;
    const trimmedCode = code.trim();
    const codeLines = trimmedCode.split('\n');
    const totalLines = codeLines.length;

    // Create the <prism-code> element.
    const prismCodeElement = document.createElement('prism-code');
    prismCodeElement.setAttribute('code', trimmedCode);
    prismCodeElement.setAttribute('language', 'javascript');
    // Set the initial highlighted line.
    prismCodeElement.setAttribute('highlight', this.currentHighlightLine.toString());

    codeArea.appendChild(prismCodeElement);

    // Create a container for the navigation buttons.
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Create the "Previous" button.
    const prevButton = document.createElement('sl-button');
    prevButton.setAttribute('variant', 'primary');
    prevButton.textContent = 'Previous';

    // Create the "Next" button.
    const nextButton = document.createElement('sl-button');
    nextButton.setAttribute('variant', 'primary');
    nextButton.textContent = 'Next';

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    codeArea.appendChild(buttonContainer);

    // ============================
    // MIDDLE COLUMN: React State Box
    // ============================
    const stateArea = document.createElement('div');
    stateArea.className = 'state-area';

    const stateBox = document.createElement('div');
    stateBox.className = 'box';
    stateBox.textContent = `React State: ${this.reactState}`;
    stateArea.appendChild(stateBox);

    // ============================
    // RIGHT COLUMN: "hello" Box
    // ============================
    const explainArea = document.createElement('div');
    explainArea.className = 'explain-area';

    const helloBox = document.createElement('div');
    helloBox.className = 'box';
    helloBox.textContent = 'hello';
    explainArea.appendChild(helloBox);

    // Append the three columns to the main container.
    container.appendChild(codeArea);
    container.appendChild(stateArea);
    container.appendChild(explainArea);

    // Append the main container to this custom element.
    this.appendChild(container);

    // ----------------------------
    // Update Functionality
    // ----------------------------
    // Function to update the highlighted line and button states,
    // and to update the "React state" display.
    const updateHighlight = () => {
      prismCodeElement.setAttribute('highlight', this.currentHighlightLine.toString());
      prevButton.disabled = this.currentHighlightLine <= 1;
      nextButton.disabled = this.currentHighlightLine >= totalLines;
      // Update the react state (for demo, we simply reflect the current highlight)
      this.reactState = `Current Highlight: ${this.currentHighlightLine}`;
      stateBox.textContent = `React State: ${this.reactState}`;
    };

    // Initialize the button states.
    updateHighlight();

    // "Previous" button click handler.
    prevButton.addEventListener('click', () => {
      if (this.currentHighlightLine > 1) {
        this.currentHighlightLine--;
        updateHighlight();
      }
    });

    // "Next" button click handler.
    nextButton.addEventListener('click', () => {
      if (this.currentHighlightLine < totalLines) {
        this.currentHighlightLine++;
        updateHighlight();
      }
    });
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
