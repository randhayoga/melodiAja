import "./styles/contentList.css"
import stats from "./stats.jsx"

function FTListItem(item, handlers, idx) {
	let Stats = stats().render;

	const getAttributes = (attributes) => attributes;

	switch(item.type) {
	case "queueMusic":
		return (
			<div className="contentList__item contentList__music musicQueue__item" 
				key={idx}
			>
				<div className="item__image">
					<img src={item.imgPath} alt="music's cover art" />
				</div>
				<div className="item__text">
					<p className="item__heading"> {item.title} </p>
					<p className=""> {item.artist} </p>
				</div>
			</div>
		)
	case "music":
		return (
			<div className="contentList__item contentList__music" 
				key={idx}
			>
				<div className="item__image">
					<img src={item.imgPath} alt="music's cover art" />
				</div>
				<div className="item__text">
					<p className="item__heading"> {item.title} </p>
					<p className=""> {item.artist} </p>
				</div>
				<div className="item__actions">
					<img 
						className="icon icon--tiny" 
						src="/icons/play.png"
						onClick={(e) => {
							e.stopPropagation()
							handlers.playNow(getAttributes(item).id)
						}}
					/>
					<img 
						className="icon icon--tiny" 
						src="/icons/music.png"
						onClick={(e) => {
							e.stopPropagation()
							handlers.selectMusic(getAttributes(item))
						}}
					/>
				</div>
			</div>
		)
	case "comment":
		return (
			<div className="contentList__item contentList__comment" key={`${item.username}${item.commentTime}`}>
				<div className="item__image">
					<img src={item.imgPath} 
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
			<div 
				to={`/playlist/${item.id}`}
				className="contentList__item contentList__collection" 
				key={item.imgPath}
			>
				<div className="item__image">
					<img src={item.imgPath} alt="music's cover art" />
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
	const render = ({itemList, id, className, handlers}) => {
		return (
			<div className={`section__content section__content--list${" " + className}`} 
				id={id}
			>
				{
					itemList.map((item, idx) => {
						return (FTListItem(item, handlers, idx));
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


