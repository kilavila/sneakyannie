class HeroComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render()
			.listeners();
	}

	hexagon() {
		return `
			<div class="hex-col">
				<div class="hex-col-inner">
					<div class="hex-top"></div>
					<div class="hex-center"></div>
					<div class="hex-bottom"></div>
					<div class="hex-inner">
						<div class="hex-top"></div>
						<div class="hex-center"></div>
						<div class="hex-bottom"></div>
					</div>
				</div>
			</div>
		`;
	}

	render() {
		this.innerHTML = `
			<div class="hex-row">
				${[...Array(12)].map(() => this.hexagon()).join('')}
			</div>
			<div class="hex-row">
				${[...Array(13)].map(() => this.hexagon()).join('')}
			</div>
			<div class="hex-row">
				${[...Array(12)].map(() => this.hexagon()).join('')}
			</div>
			<div class="hex-row">
				${[...Array(13)].map(() => this.hexagon()).join('')}
			</div>
			<div class="hex-row">
				${[...Array(12)].map(() => this.hexagon()).join('')}
			</div>

			<h1 class="branding">
				<small>
					Hive
					<i class="nf nf-md-hexagon_multiple"></i>
					Community
				</small>
				<div class="branding-title">
					<div id="test" class="sneaky"></div>
					<div class="annie">Annie</div>
				</div>
			</h1>
		`;

		return this;
	}

	async listeners() {
		const hexagonList = this.querySelectorAll('.hex-col');
		const randomHexIdx = Math.floor(Math.random() * ((hexagonList.length - 1) - 1) + 1);
		console.log(hexagonList.length);
		console.log(randomHexIdx);

		hexagonList.forEach((hex, idx) => {
			const hexInner = hex.querySelector('.hex-col-inner');
			const opacity = Math.random();
			hexInner.style.opacity = opacity;

			if (idx === randomHexIdx) {
				const icon = document.createElement('i');
				icon.classList.add('nf', 'nf-md-bee', 'hexagon-bee-icon');
				hex.append(icon);
			}
		});

		const sneakyType = new window.TypeIt('#test', {
			speed: 100,
			afterComplete: () => {
				sneakyType.destroy(true);
			}
		})
		sneakyType.pause(1200).type('Sneaky').pause(1600).go();

		return this;
	}
}

export default HeroComponent;
