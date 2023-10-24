const statsView = (() => {
	function render({nFollowers, nMusics, nCollections}) {
		return (
			<section id="profileSect__stats">
				<div className="stats__item">
					<p>{nFollowers} <span className="stats__criteria"> Followers </span> </p>
				</div>
				<div className="stats__item">
					<p>{nMusics} <span className="stats__criteria"> Musics </span> </p>
				</div>
				<div className="stats__item">
					<p>{nCollections} <span className="stats__criteria"> Collections </span> </p>
				</div>
			</section>
		)
	}

	return {render}
})()

function Stats() {
	let view = statsView

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}

let stats = Stats();
export default {
	render: () => stats.render
};
