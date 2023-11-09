import "./styles/stats.css"

const statsView = (() => {
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

	function render({opts, statsItems}) {
		// How tf does this works now. It wasn't working before
		return (
			<section id="" className={`stats${opts["border"] == true? " stats--separated": ""}`}>
				{
					Object.keys(statsItems).map((key) => {
						if(statsItems[key].length !== undefined) {
							return ( 
								<div className="stats__item" key={key}>
									<span className="stats__criteria"> 
										<img src={statsItems[key][0]} alt="" />
									</span>
									<p>{normalize(statsItems[key][1])}  </p>
								</div>
							)
						}

						return (
							<div className="stats__item" key={key}>
								<p>{normalize(statsItems[key])} <span className="stats__criteria"> {key} </span> </p>
							</div>
						)
					})
				}
			</section>
		)
	}

	return {render}
})()

export default function Stats() {
	let view = statsView;

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}
