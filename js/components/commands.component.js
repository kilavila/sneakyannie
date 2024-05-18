class CommandsComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<h2>
				Commands
			</h2>
		`;
		return this;
	}
}

export default CommandsComponent;
