import NavbarComponent from './components/navbar.component.js';
import HeroComponent from './components/hero.component.js';
import AboutComponent from './components/about.component.js';
import CommandsComponent from './components/commands.component.js';

/** @link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry */
class AppContainer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	/** @returns {this} */
	render() {
		this.innerHTML = `
			<app-navbar></app-navbar>
			<app-hero></app-hero>
			<app-about></app-about>
			<app-commands></app-commands>
		`;

		return this;
	}
}

customElements.define('app-container', AppContainer);
customElements.define('app-navbar', NavbarComponent);
customElements.define('app-hero', HeroComponent);
customElements.define('app-about', AboutComponent);
customElements.define('app-commands', CommandsComponent);
