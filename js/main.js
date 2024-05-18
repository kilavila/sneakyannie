import NavbarComponent from './components/navbar.component.js';
import HeroComponent from './components/hero.component.js';
import AboutComponent from './components/about.component.js';
import CommandsComponent from './components/commands.component.js';

class AppContainer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

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
