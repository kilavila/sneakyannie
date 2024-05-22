import { commands } from '../constants/commands.js';

/**
	* @param {Function} func
	* @param {number} wait
	*
	* @returns {Function}
*/
const debounce = (func, wait) => {
	let timeout = null;

	/** @param {any[]} args */
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
		this.listExpanded = false;
	}

	connectedCallback() {
		this.render()
			.listeners();
	}

	/** @param {string} type */
	cmdIcon(type) {
		if (type === 'highlighted') return 'nf-md-star';
		if (type === 'sound') return 'nf-md-music';
		if (type === 'video') return 'nf-md-video';
		if (type === 'other') return 'nf-md-hexagon_outline';
	}

	/**
		* @param {Object} cmd
		* @param {string} cmd.keyword
		* @param {string} cmd.description
		* @param {string} cmd.type
		*
		* @returns {string}
	*/
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

	/**	@returns {this} */
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
			</ul>
			<button class="cmd-expand-list">
				View all commands
				<i class="nf nf-fa-chevron_down"></i>
			</button>
		`;

		return this;
	}

	commandSearch = debounce(
		/**
		* @param {HTMLElement} commandList
		* @param {string} query
		*/
		(commandList, query) => {
			const filter = this.commands.filter(
				cmd => cmd.keyword.toLowerCase().includes(query) ||
					cmd.description.toLowerCase().includes(query) ||
					cmd.type.toLowerCase().includes(query)
			);
			if (query.length === 0) {
				commandList.innerHTML = this.commands.slice(0, 6).map(cmd => this.renderCommand(cmd)).join('');
				return;
			}
			commandList.innerHTML = filter.map(cmd => this.renderCommand(cmd)).join('');
		}, 500);

	/**
		* @param {HTMLElement} commandList
		* @param {HTMLElement} btn
	*/
	viewAllCommands(commandList, btn) {
		this.listExpanded = !this.listExpanded;

		console.log(this.listExpanded);

		if (this.listExpanded) {
			commandList.innerHTML = commands.map(cmd => this.renderCommand(cmd)).join('');
			btn.innerHTML = `
				Hide commands
				<i class="nf nf-fa-chevron_up"></i>
			`;
		} else {
			commandList.innerHTML = this.commands.slice(0, 6).map(cmd => this.renderCommand(cmd)).join('');
			btn.innerHTML = `
				View all commands
				<i class="nf nf-fa-chevron_down"></i>
			`;
		}
	}

	/**	@returns {this} */
	listeners() {
		/** @type {HTMLElement} */
		const commandList = this.querySelector('.command-list');
		/** @type {NodeListOf<HTMLElement>} */
		const commandListItems = this.querySelectorAll('.list-item');
		commandListItems.forEach(item => {
			item.addEventListener('click', () => {
				const keyword = item.getAttribute('data-cmd');
				navigator.clipboard.writeText(keyword);
			});
		});

		/** @type {HTMLInputElement} */
		const searchField = this.querySelector('#searchField');
		searchField.addEventListener('input', () => this.commandSearch(commandList, searchField.value.toLowerCase()));

		/** @type {HTMLElement} */
		const expandCmds = this.querySelector('.cmd-expand-list');
		expandCmds.addEventListener('click', () => this.viewAllCommands(commandList, expandCmds));

		return this;
	}
}

export default CommandsComponent;
