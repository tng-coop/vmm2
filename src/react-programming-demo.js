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
    ['code', 'language'].forEach((attr) => {
      if (this.hasAttribute(attr)) {
        prismCodeElement.setAttribute(attr, this.getAttribute(attr));
      }
    });

    // Append the inner component to the container, then append the container to this element.
    container.appendChild(prismCodeElement);
    this.appendChild(container);
  }
}

customElements.define('react-programming-demo', ReactProgrammingDemo);
