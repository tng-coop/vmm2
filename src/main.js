// src/main.js

// Import global styles and Shoelace components
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

// Import the existing custom elements
import './z-group-demo.js';
import './even-group-demo.js';
import './triangle-group-demo.js';
import './prism-code-wrapper.js';
import './react-programming-demo.js';

class MyApp extends HTMLElement {
  constructor() {
    super();
    // Initialize state
    this.activeView = '';

    // Array of Bible verses for the footer.
    const verses = [
      "Ecclesiastes 1:13 – 'And I applied my mind to seek and to search out by wisdom all that is done under heaven; it is an unhappy business that God has given to the sons of men to be busy with.'",
      "Romans 1:20 – 'Ever since the creation of the world his invisible nature, namely, his eternal power and deity, has been clearly perceived in the things that have been made. So they are without excuse;'",
      "Psalm 19:1 – 'The heavens are telling the glory of God; and the firmament proclaims his handiwork.'",
      "Colossians 1:16–17 – 'For in him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or principalities or authorities—all things were created through him and for him. He is before all things, and in him all things hold together.'",
      "Proverbs 1:5 – 'The wise man also may hear and increase in learning, and the man of understanding acquire skill,'"
    ];

    // Pick a random verse.
    this.randomVerse = verses[Math.floor(Math.random() * verses.length)];
  }

  connectedCallback() {
    this.render();
  }

  handleMenuClick(view) {
    this.activeView = view;
    this.render();
  }

  // Helper: Create and return a <style> element with component CSS.
  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      header {
        text-align: center;
        margin-bottom: 2rem;
      }
      nav.menu {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      main.content {
        border: none;
      }
      footer {
        text-align: center;
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: #fff;
        padding: 1.5rem;
        margin-top: 2rem;
        font-size: 1rem;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
      }
    `;
    return style;
  }

  // Helper: Create and return the header element.
  createHeader() {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = "Museum of Mathematics";
    const subtitle = document.createElement('p');
    subtitle.textContent = "Explore our exhibits by selecting one from the menu below.";
    header.append(title, subtitle);
    return header;
  }

  // Helper: Create and return the navigation menu.
  createNav() {
    const nav = document.createElement('nav');
    nav.className = 'menu';

    // Create the Group Demos dropdown.
    nav.appendChild(this.createGroupDropdown());

    // Create the Web Programming button.
    const webButton = document.createElement('sl-button');
    webButton.setAttribute('variant', 'primary');
    webButton.textContent = "Web Programming";
    webButton.addEventListener('click', () => this.handleMenuClick('webprogramming'));
    nav.appendChild(webButton);

    return nav;
  }

  // Helper: Create and return the Group Demos dropdown.
  createGroupDropdown() {
    const dropdown = document.createElement('sl-dropdown');

    // Create dropdown trigger.
    const trigger = document.createElement('sl-button');
    trigger.setAttribute('slot', 'trigger');
    trigger.setAttribute('variant', 'primary');
    trigger.textContent = "Group Demos";
    dropdown.appendChild(trigger);

    // Create dropdown menu.
    const menu = document.createElement('sl-menu');
    const items = [
      { label: "Group Theory Exhibit", view: 'group' },
      { label: "Even Numbers Exhibit", view: 'even' },
      { label: "Triangle Groups Exhibit", view: 'other' }
    ];

    items.forEach(item => {
      const menuItem = document.createElement('sl-menu-item');
      menuItem.textContent = item.label;
      menuItem.addEventListener('click', () => this.handleMenuClick(item.view));
      menu.appendChild(menuItem);
    });

    dropdown.appendChild(menu);
    return dropdown;
  }

  // Helper: Create and return the main content based on the active view.
  createMain() {
    const main = document.createElement('main');
    main.className = 'content';
    let contentElement;

    switch (this.activeView) {
      case 'group':
        contentElement = document.createElement('z-group-demo');
        break;
      case 'even':
        contentElement = document.createElement('even-group-demo');
        break;
      case 'other':
        contentElement = document.createElement('triangle-group-demo');
        break;
      case 'webprogramming':
        contentElement = document.createElement('react-programming-demo');
        break;
      default:
        contentElement = document.createElement('p');
        contentElement.textContent =
          "Welcome to the Museum of Mathematics. Please select an exhibit from the menu above.";
    }

    main.appendChild(contentElement);
    return main;
  }

  // Helper: Create and return the footer element.
  createFooter() {
    const footer = document.createElement('footer');
    const footerText = document.createElement('p');
    footerText.textContent = this.randomVerse;
    footer.appendChild(footerText);
    return footer;
  }

  // Render the full component.
  render() {
    // Clear existing content.
    this.replaceChildren();

    // Append all parts.
    this.appendChild(this.createStyles());
    this.appendChild(this.createHeader());
    this.appendChild(this.createNav());
    this.appendChild(this.createMain());
    this.appendChild(this.createFooter());
  }
}

// Register the custom element.
customElements.define('my-app', MyApp);
