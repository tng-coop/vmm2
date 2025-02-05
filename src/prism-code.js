// src/prism-code.js
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js'; // load JavaScript syntax highlighting
import 'prismjs/themes/prism.css';              // load PrismJS CSS theme

// Import the Line Highlight plugin (both JS and CSS)
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

class PrismCode extends HTMLElement {
  // Watch for changes to the "code", "language", and "highlight" attributes.
  static get observedAttributes() {
    return ['code', 'language', 'highlight'];
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

    // Retrieve attributes, falling back to default values if not provided.
    const code = this.getAttribute('code') || 'console.log("Hello, world!");';
    const language = this.getAttribute('language') || 'javascript';
    const highlight = this.getAttribute('highlight'); // new attribute for line highlighting

    // Create a <pre> element and a <code> element.
    const pre = document.createElement('pre');
    
    // If the highlight attribute is provided, set the data-line attribute.
    if (highlight) {
      pre.setAttribute('data-line', highlight);
    }

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
