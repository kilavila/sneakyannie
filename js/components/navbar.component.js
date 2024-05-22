class NavbarComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render()
			.listeners();
	}

	// https://discord.com/invite/AhexQMSHp6
	// https://streamelements.com/sneakyannie/tip

	/** @returns {this} */
	render() {
		this.innerHTML = `
			<a href="#discord">
				<i class="nf nf-fa-discord"></i>
				Discord
			</a>
			<a href="#commands">
				<i class="nf nf-oct-command_palette"></i>
				Commands
			</a>
			<a href="#tipjar">
				<i class="nf nf-fae-coins"></i>
				Tip Jar
			</a>
			<!-- <a href="#about">About me</a> -->
			<!-- <a href="#rules">Rules</a> -->
			<!-- <a href="#specs">PC Specs</a> -->
			<!-- <a href="#setup">Setup</a> -->
		`;

		return this;
	}

	/** @returns {this} */
	listeners() {
		/** @type {NodeList} */
		const links = this.querySelectorAll('a');

		links.forEach(
			/** @param {HTMLElement} link */
			(link) => {
				link.addEventListener('click', (e) => {
					e.preventDefault();
					/** @type {string} */
					const id = link.getAttribute('href');
					/** @type {HTMLElement} */
					const section = document.querySelector(id);
					/** @type {DOMRect} */
					const sectionPosition = section.getBoundingClientRect();

					window.scrollTo({
						top: sectionPosition.y,
						behavior: 'smooth',
					});
				});
			});

		return this;
	}
}

export default NavbarComponent;
