// src/prism-code.js
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js'; // load JavaScript syntax highlighting
import 'prismjs/themes/prism.css';              // load PrismJS CSS theme

class PrismCode extends HTMLElement {
  // Watch for changes to the "code" and "language" attributes.
  static get observedAttributes() {
    return ['code', 'language'];
  }

  constructor() {
    super();
    // No shadow DOM is used here; we work in the light DOM.
  }

  connectedCallback() {
    this.render();
  }

  // When attributes change, re-render the component.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Clear any existing content.
    this.replaceChildren();

    // Retrieve the attributes, falling back to default code if not provided.
    const code = this.getAttribute('code') || 'console.log("Hello, world!");';
    const language = this.getAttribute('language') || 'javascript';

    // Create a <pre> element and a <code> element.
    const pre = document.createElement('pre');
    const codeElement = document.createElement('code');
    codeElement.className = `language-${language}`;
    
    // Use textContent to safely insert the code (avoiding HTML interpretation).
    codeElement.textContent = code;

    pre.appendChild(codeElement);
    this.appendChild(pre);

    // Trigger PrismJS to perform syntax highlighting on the code element.
    Prism.highlightElement(codeElement);
  }
}

customElements.define('prism-code', PrismCode);
