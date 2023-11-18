import "./styles/contentTiled.css"

const contentTiledView = () => {
	function FTTileItem(item) {
			return (
				<div className="contentTiled__tile" key={item.subheading + item.heading}>
					<div className="tile__background">
						<img src={item.imgPath} alt="" />
					</div>
					<div className="tile__text">
						{(() => {
							if(item.subheading === undefined) {
								return (
								<>
									<p className="tile__heading"> {item.heading} </p>
								</>
								)
							}
							return (
								<>
									<p className="tile__subheading"> {item.subheading} </p>
									<p className="tile__heading"> {item.heading} </p>
								</>
							)
						})() }
					</div>
				</div>
			)
	}

	const render = ({nRows, id, itemList}) => {
		return (
			<div className={`section__content section__content--tiled contentTiled--${nRows}`} id={id}>
				{
					itemList.map((item) => {
						return (FTTileItem(item));
					})
				}
			</div>
		)
	}

	return {render}
}

export default function contentTiled() {
	let view = contentTiledView();

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}

