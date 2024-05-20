class NavbarComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render()
			.listeners();
	}

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

	listeners() {
		const links = this.querySelectorAll('a');
		links.forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const id = link.getAttribute('href');
				const section = document.querySelector(id);
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
