import "./styles/contentList.css"
import stats from "./stats.jsx"

function FTListItem(item) {
	let Stats = stats().render;

	switch(item.type) {
	case "music":
		return (
			<div className="contentList__item contentList__music" key={item.coverPath}>
				<div className="item__image">
					<img src={item.coverPath} alt="music's cover art" />
				</div>
				<div className="item__text">
					<p className="item__heading"> {item.title} </p>
					<p className=""> {item.artist} </p>
				</div>
			</div>
		)
	case "comment":
		return (
			<div className="contentList__item contentList__comment" key={`${item.username}${item.commentTime}`}>
				<div className="item__image">
					<img src={item.coverPath} 
						alt={`${item.username} pfp`} />
				</div>
				<div className="item__text">
					<div className="item__text--top">
						<p className="item__heading"> {`@${item.username}`} </p>
						<p> {item.commentTime} </p>
					</div>
					<p className=""> {item.comment} </p>
				</div>
			</div> 
		);
	case "artist":
		return <></>;
	default: // Collection
		return (
			<div className="contentList__item contentList__collection" key={item.coverPath}>
				<div className="item__image">
					<img src={item.coverPath} alt="music's cover art" />
				</div>
				<div className="item__text">
					<p className="item__heading"> {item.name} </p>
					<Stats opts= {
						{
							"border": true
						}
					}
						statsItems={
						{
							"": [item.visibility],
							"Songs": [item.nSongs], 
							"Views": [item.nViews],
						}
					}/>
				</div>
			</div>
		)
	}
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

