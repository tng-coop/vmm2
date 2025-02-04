// src/react-programming-demo.js
import { LitElement, html, css } from 'lit';
import './prism-code.js'; // ensure Prism is registered
export class ReactProgrammingDemo extends LitElement {
  constructor() {
    super();
    // Note: We're not using shadow DOM here so that global CSS (e.g. Prism’s theme)
    // can style the inner content without extra setup.
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Clear any existing content
    this.replaceChildren();

    // Create a container element (optional, for styling or structure)
    const container = document.createElement('div');
    container.className = 'prism-code-wrapper';

    // Create the inner <prism-code> element
    const prismCodeElement = document.createElement('prism-code');
    // Forward the "code" and "language" attributes from the wrapper to the inner element
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

    // Append the inner component to the container, then append the container to this element.
    container.appendChild(prismCodeElement);
    this.appendChild(container);
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
