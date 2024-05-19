import { commands } from '../constants/commands.js';

const debounce = (func, wait) => {
	let timeout = null;

	return function(...args) {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}

class CommandsComponent extends HTMLElement {
	constructor() {
		super();

		this.commands = commands;
	}

	connectedCallback() {
		this.render()
			.listeners();
	}

	renderCommand(cmd) {
		return `
			<li class="list-item ${cmd.type === 'highlighted' ? 'highlight' : ''}">
				<div class="list-item-header">
					<div class="keyword">${cmd.keyword}</div>
					<div class="type">${cmd.type}</div>
				</div>
				<div class="description">${cmd.description}</div>
			</li>
		`;
	}

	render() {
		this.innerHTML = `
			<h2>
				Commands
			</h2>

			<div class="input-group">
				<div class="input-prefix">
					<i class="nf nf-fa-search"></i>
				</div>
				<input type="text" id="searchField" class="input-field" placeholder="Search commands...">
			</div>

			<ul class="command-list">
				${this.commands.map(cmd => this.renderCommand(cmd)).join('')}
			</ul>
		`;

		return this;
	}

	commandSearch = debounce((query) => {
		const commandList = this.querySelector('.command-list');
		const filter = this.commands.filter(
			cmd => cmd.keyword.toLowerCase().includes(query) ||
				cmd.description.toLowerCase().includes(query) ||
				cmd.type.toLowerCase().includes(query)
		);
		commandList.innerHTML = filter.map(cmd => this.renderCommand(cmd)).join('');
	}, 500);

	listeners() {
		const searchField = this.querySelector('#searchField');
		searchField.addEventListener('input', () => this.commandSearch(searchField.value.toLowerCase()));

		return this;
	}
}

export default CommandsComponent;
