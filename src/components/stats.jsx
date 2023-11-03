import "./styles/stats.css"

const statsView = () => {
	function normalize(num) {
		if(num >= 1000000) {
			return `${Number.parseFloat(
						Math.floor(num / 1000000.0)
					).toFixed(0)}M`;
		} else if(num >= 1000) {
			return `${Number.parseFloat(
						Math.floor(num / 1000.0)
					).toFixed(0)}k`;
		}
		return `${num}`
	}

	function render({type, statsItems}) {
		let normalizedStats = Object.keys(statsItems).map(
			(key) => normalize(statsItems[key])
		);
		switch(type) {
			case "user":
				let [nFollowers, nMusics, nCollections] = normalizedStats;
				return (
					<section id="" className="stats stats--separated">
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
			case "music":
				let {nListens, nLikes, nDislikes, nComments} = statsItems;
				return (
					<section id="" className="stats">
					</section>
				)
			default: // collection
				let [visibility, nSongs, nViews] = normalizedStats;
				return (
					<section id="" className="stats stats--separated">
						<div className="stats__item">
							<p>{visibility} </p>
						</div>
						<div className="stats__item">
							<p>{nSongs} <span className="stats__criteria"> Songs </span> </p>
						</div>
						<div className="stats__item">
							<p>{nViews} <span className="stats__criteria"> Views </span> </p>
						</div>
					</section>
				)
		}
	}

	return {render}
}

export default function Stats() {
	let view = statsView()

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}
