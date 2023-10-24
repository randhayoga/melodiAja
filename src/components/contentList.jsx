function FTListItem(item) {
	if(item.type === "music") {
		return (
			<div className="contentList__item" key={item.coverPath}>
				<div className="item__image">
					<img src={item.coverPath} alt="music's cover art" />
				</div>
				<div className="item__text">
					<p className="item__heading"> {item.title} </p>
					<p className="item__text"> {item.artist} </p>
				</div>
			</div>
		)
	} else if(item.type === "artist") {
	}
	
	return (
		<div className="contentList__item" key={item.coverPath}>
			<div className="item__image">
				<img src={item.coverPath} alt="music's cover art" />
			</div>
			<div className="item__text">
				<p className="item__heading"> {item.title} </p>
				<p className="item__text"> {item.artist} </p>
			</div>
		</div>
	)
}

const contentListView = () => {
	const render = ({itemList}) => {
		return (
			<div className="section__content section__content--list">
				{
					itemList.map((item) => {
						return (FTListItem(item));
					})
				}
			</div>
		)
	}

	return {render}
}

export default function contentList() {
	let view = contentListView();

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}

