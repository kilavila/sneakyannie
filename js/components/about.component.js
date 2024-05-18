class AboutComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<!-- <h2> -->
			<!-- 	About me -->
			<!-- </h2> -->
			<p>
				Hey there, I'm SneakyAnnie, a part-time streamer and sports coach
				who's all about TrackMania and good times. Join me for casual TrackMania
				sessions, laughter, and a welcoming community. Let's have fun together
				on the virtual racetracks!
			</p>
			<div class="section-icons">
				<i class="nf nf-fa-flag_checkered"></i>
				<i class="nf nf-md-google_controller"></i>
				<i class="nf nf-fa-face_grin_beam"></i>
			</div>
		`;
		return this;
	}
}

export default AboutComponent;
