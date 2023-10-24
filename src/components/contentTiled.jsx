const contentTiledView = () => {
	function FTTileItem(item) {
			return (
				<div className="contentTiled__tile" key={item.subheading + item.heading}>
					<div className="tile__background">
						<img src={item.bgPath} alt="" />
					</div>
					<div className="tile__text">
						<p className="tile__subheading"> {item.subheading} </p>
						<p className="tile__heading"> {item.heading} </p>
					</div>
				</div>
			)
	}

	const render = ({id, itemList}) => {
		return (
			<div className="section__content section__content--tiled" id={id}>
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

