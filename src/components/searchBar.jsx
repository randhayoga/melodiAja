import "./styles/searchBar.css"

const searchBarView = () => {
	const render = () => {
		return (
			<section className="searchBar">
				<form action="" id="searchPage__search">
					<input
						placeholder="Search something here..."
						type="text" 
					/>
				</form>
				<img className="icon icon--small" 
					src="/icons/search.png" alt="searchIcon" 
					onClick={() => {alert("GGGG");}}
				/>
			</section>
		)
	}

	return {render};
}

const searchBarModel = () => {
}

export default function searchBar() {
	let view = searchBarView();
	let model = searchBarModel();
	
	const render = () => {
		return view.render();
	}

	return {render};
}
