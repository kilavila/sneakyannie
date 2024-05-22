class HeroComponent extends HTMLElement {

	constructor() {
		super();

		this.bee;
		this.clickCounter = 0;
		this.maxPokes = Math.floor(Math.random() * (99) + 1);
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
		/** @type {NodeList} */
		const hexagonList = this.querySelectorAll('.hex-col');
		/** @type {number} */
		const randomHexIdx = Math.floor(Math.random() * ((hexagonList.length - 1) - 1) + 1);

		hexagonList.forEach(
			/** 
				* @param {HTMLElement} hex
				* @param {number} idx
			*/
			(hex, idx) => {
				/** @type {HTMLElement} */
				const hexInner = hex.querySelector('.hex-col-inner');
				/** @type {number} */
				const opacity = Math.random();
				hexInner.style.opacity = opacity.toString();

				if (idx === randomHexIdx) {
					hex.classList.add('hexagon-bee');
					this.bee = document.createElement('i');
					this.bee.classList.add('nf', 'nf-md-bee', 'hexagon-bee-icon');
					hex.append(this.bee);
				}
			});

		/** @ts-ignore */
		const sneakyType = new window.TypeIt('#test', {
			speed: 100,
			afterComplete: () => {
				sneakyType.destroy(true);
			}
		})
		sneakyType.pause(1200).type('Sneaky').pause(1600).go();

		console.log(this.maxPokes);
		this.bee.addEventListener('click', () => {
			this.clickCounter++;
			if (this.clickCounter >= this.maxPokes) {
				alert('Stop poking me!');
			}
		});

		return this;
	}
}

export default HeroComponent;
