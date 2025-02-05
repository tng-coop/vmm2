// src/react-programming-demo.js
import { LitElement } from 'lit';
import './prism-code.js'; // ensure Prism is registered

export class ReactProgrammingDemo extends LitElement {
  // Override createRenderRoot to avoid using shadow DOM so that global CSS (e.g. Prism’s theme)
  // can easily style the inner content.
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    // No shadow DOM is used for easier styling.
  }

  connectedCallback() {
    super.connectedCallback(); // Always call the parent’s connectedCallback.
    this.renderDemo();
  }

  renderDemo() {
    // Clear any existing content.
    this.replaceChildren();

    // Create the main container.
    const container = document.createElement('div');
    container.className = 'reactprogramming-demo';

    // Insert CSS styles. These styles will affect the container’s children.
    const style = document.createElement('style');
    style.textContent = `
      /* Main container uses flexbox to create columns */
      .reactprogramming-demo {
        display: flex;
      }
      /* The left column (code area) takes up more space */
      .code-area {
        flex: 2;
        padding: 10px;
      }
      /* The right column (explain area) takes less space, with a left border */
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
    `;
    // Append the <style> element as the first child of the container.
    container.appendChild(style);

    // Create the left column for the code.
    const codeArea = document.createElement('div');
    codeArea.className = 'code-area';

    // Create and configure the <prism-code> element.
    const prismCodeElement = document.createElement('prism-code');
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
    prismCodeElement.setAttribute('code', code.trim());
    prismCodeElement.setAttribute('language', 'javascript');
    prismCodeElement.setAttribute('highlight', '2');

    // Append the code element to the left area.
    codeArea.appendChild(prismCodeElement);

    // Create the right column for the explanation.
    const explainArea = document.createElement('div');
    explainArea.className = 'explain-area';

    // Create the "hello" box.
    const helloBox = document.createElement('div');
    helloBox.className = 'hello-box';
    helloBox.textContent = 'hello';

    // Append the hello box to the explanation area.
    explainArea.appendChild(helloBox);

    // Append both columns to the main container.
    container.appendChild(codeArea);
    container.appendChild(explainArea);

    // Finally, append the container to this custom element.
    this.appendChild(container);
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
