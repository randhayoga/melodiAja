import { useState } from "react"
import "./styles/searchBar.css"

const searchBarModel = () => {
	const validate = (query, setWarning, warnElem) => {
		setWarning(warnElem, false)

		let isValid = query != "";
		if(!isValid) setWarning(warnElem, true, "Nothing to search")
		return isValid;
	}

	const getSearchResult = async(query, wantedItemType) => {
		return [
			{
				type: "playlist",
				name: "Friday Night",
				nSongs: 10,
				nViews: 2000,
				visibility: "Public",
				imgPath: "/defaults/defaultCover2.jpg",
			},
			{
				type: "music",
				id: "1",
				title: "Bersamamu",
				artist: "Jaz",
				imgPath: `/assets/musicCover/1.png`,
			},
		]
	}

	return {getSearchResult, validate}
}

const searchBarView = () => {
	const setWarning = (warnElem, toActive, message="") => {
		if(toActive) {
			warnElem.textContent = message;
			warnElem.classList.add("searchBar__warn--active");
		} else {
			warnElem.classList.remove("searchBar__warn--active");
		}
	}

	const render = (id, searchHandler, componentHandler) => {
		return (
			<section className="searchBar">
				<form action="" id={`search__${id}`}>
					<input
						name="searchQuery"
						required
						placeholder="Search something here..."
						type="text" 
					/>
					<p className="searchBar__warn" id={`searchWarn__${id}`}> </p>
				</form>
				<img className="icon icon--small" 
					src="/icons/search.png" alt="searchIcon" 
					onClick={async() => {
						const searchQuery = (new FormData(
							document.getElementById(`search__${id}`))).get("searchQuery");
						
						const warnElem = document.getElementById(`searchWarn__${id}`)
						const isValid = searchHandler.validate(searchQuery, warnElem)
						if(isValid) {
							componentHandler([])
							const searchResult = await searchHandler.getResult(searchQuery);
							componentHandler(searchResult);
						}
					}}
				/>
			</section>
		)
	}

	return {render, setWarning};
}

export default (id, type) => {
	let view = searchBarView();
	let model = searchBarModel();
	
	const validate = (query, warnElem) => {
		return model.validate(query, view.setWarning, warnElem);
	}
	
	const getResult = (query) => {
		return model.getSearchResult(query, type);
	}

	const render = ({handlers}) => {
		return view.render(id, {validate: validate, getResult: getResult}, handlers);
	}

	return {render, getResult};
}
