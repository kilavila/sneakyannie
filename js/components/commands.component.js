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

	cmdIcon(type) {
		if (type === 'highlighted') return 'nf-md-star';
		if (type === 'sound') return 'nf-md-music';
		if (type === 'video') return 'nf-md-video';
		if (type === 'other') return 'nf-md-hexagon_outline';
	}

	renderCommand(cmd) {
		return `
			<li title="Copy ${cmd.keyword} to clipboard" data-cmd="${cmd.keyword}" class="list-item ${cmd.type === 'highlighted' ? 'highlight' : ''}">
				<div class="list-item-header">
					<div class="keyword">${cmd.keyword}</div>
					<div class="type">
						<i class="nf ${this.cmdIcon(cmd.type)}"></i>
					</div>
				</div>
				<div class="description">${cmd.description}</div>
			</li>
		`;
	}

	render() {
		this.id = 'commands';
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
				${this.commands.slice(0, 6).map(cmd => this.renderCommand(cmd)).join('')}
				<li class="cmd-expand-list">
					View all commands
					<i class="nf nf-fa-chevron_down"></i>
				</li>
			</ul>
		`;

		return this;
	}

	commandSearch = debounce((commandList, query) => {
		const filter = this.commands.filter(
			cmd => cmd.keyword.toLowerCase().includes(query) ||
				cmd.description.toLowerCase().includes(query) ||
				cmd.type.toLowerCase().includes(query)
		);
		commandList.innerHTML = filter.map(cmd => this.renderCommand(cmd)).join('');
	}, 500);

	viewAllCommands(commandList) {
		commandList.innerHTML = commands.map(cmd => this.renderCommand(cmd)).join('');
	}

	listeners() {
		const commandList = this.querySelector('.command-list');
		const commandListItems = this.querySelectorAll('.list-item');
		commandListItems.forEach(item => {
			item.addEventListener('click', () => {
				const keyword = item.getAttribute('data-cmd');
				navigator.clipboard.writeText(keyword);
			});
		});

		const searchField = this.querySelector('#searchField');
		searchField.addEventListener('input', () => this.commandSearch(commandList, searchField.value.toLowerCase()));

		const expandCmds = this.querySelector('.cmd-expand-list');
		expandCmds.addEventListener('click', () => this.viewAllCommands(commandList));

		return this;
	}
}

export default CommandsComponent;
