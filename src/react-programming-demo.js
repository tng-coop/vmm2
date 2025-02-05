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
    // Set the initial highlighted line to 1 now.
    this.currentHighlightLine = 1;
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

    // Insert CSS styles for the layout and buttons.
    const style = document.createElement('style');
    style.textContent = `
      /* Flex layout for two columns */
      .reactprogramming-demo {
        display: flex;
      }
      /* Left column: Code area */
      .code-area {
        flex: 2;
        padding: 10px;
      }
      /* Right column: Explanation area */
      .explain-area {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /* Styling for the "hello" box */
      .hello-box {
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

    // LEFT COLUMN: Code Area
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
    // Trim and calculate the total number of lines.
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

    // Append buttons to the button container.
    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);

    // Append the button container to the code area.
    codeArea.appendChild(buttonContainer);

    // Function to update the highlighted line and button disabled states.
    const updateHighlight = () => {
      prismCodeElement.setAttribute('highlight', this.currentHighlightLine.toString());
      prevButton.disabled = this.currentHighlightLine <= 1;
      nextButton.disabled = this.currentHighlightLine >= totalLines;
    };

    // Initialize the button states.
    updateHighlight();

    // Update the highlight when "Previous" is clicked.
    prevButton.addEventListener('click', () => {
      if (this.currentHighlightLine > 1) {
        this.currentHighlightLine--;
        updateHighlight();
      }
    });

    // Update the highlight when "Next" is clicked.
    nextButton.addEventListener('click', () => {
      if (this.currentHighlightLine < totalLines) {
        this.currentHighlightLine++;
        updateHighlight();
      }
    });

    // RIGHT COLUMN: Explanation Area with "hello" box.
    const explainArea = document.createElement('div');
    explainArea.className = 'explain-area';

    const helloBox = document.createElement('div');
    helloBox.className = 'hello-box';
    helloBox.textContent = 'hello';
    explainArea.appendChild(helloBox);

    // Append both the code area and explanation area to the main container.
    container.appendChild(codeArea);
    container.appendChild(explainArea);

    // Append the main container to the component.
    this.appendChild(container);
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
