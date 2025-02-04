// src/prism-code.js
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js'; // load JavaScript syntax highlighting
import 'prismjs/themes/prism.css';              // load PrismJS CSS theme

class PrismCode extends HTMLElement {
  constructor() {
    super();
    // No shadow DOM is used here; we're working directly in the light DOM.
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Clear any existing content
    this.replaceChildren();

    // Retrieve attributes (or use defaults)
    const code = this.getAttribute('code') || 'console.log("Hello, world!");';
    const language = this.getAttribute('language') || 'javascript';

    // Create a <pre> and <code> block for the snippet
    const pre = document.createElement('pre');
    const codeElement = document.createElement('code');
    codeElement.className = `language-${language}`;
    codeElement.textContent = code;

    // Append the code element into the pre tag, then add pre to the component
    pre.appendChild(codeElement);
    this.appendChild(pre);

    // Trigger PrismJS highlighting on the created code element
    Prism.highlightElement(codeElement);
  }
}

// Register the web component
customElements.define('prism-code', PrismCode);
