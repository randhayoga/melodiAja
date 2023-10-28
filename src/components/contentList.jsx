import "./styles/contentList.css"

function FTListItem(item) {

	if(item.type === "music") {
		return (
			<div className="contentList__item contentList__music" key={item.coverPath}>
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
	
	// Collection
	let viewsConverted = `${item.nViews / 1000.0}k`;
	return (
		<div className="contentList__item contentList__collection" key={item.coverPath}>
			<div className="item__image">
				<img src={item.coverPath} alt="music's cover art" />
			</div>
			<div className="item__text">
				<p className="item__heading"> {item.name} </p>
				<section id="profileSect__stats" className="stats">
					<div className="stats__item">
						<p>{item.visibility} </p>
					</div>
					<div className="stats__item">
						<p>{item.nSongs} <span className="stats__criteria"> Songs </span> </p>
					</div>
					<div className="stats__item">
						<p>{viewsConverted} <span className="stats__criteria"> Views </span> </p>
					</div>
				</section>
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

