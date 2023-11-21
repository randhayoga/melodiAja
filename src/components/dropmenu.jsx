import "./styles/dropdown.css"
import {useState} from "react";

const dropmenuItemFT = ({name, handler}, key) => {
	return (
		<div className="dropmenu__item"
			onClick = {handler}
			key={key}
		>
			<p> {name} </p>
		</div>
	)
}

const dropmenuView = (dropdownID) => {
	let id = `dropmenu__${id}`;

	const render = (menus) => {
		return (
			<section className="dropmenu dropmenu--hidden" id={id}>
				{ menus.map((menu, idx) => dropmenuItemFT(menu, idx)) }
			</section>
		)
	}
		
	const toggle = () => {
		document.getElementById(id).classList.toggle("dropmenu--hidden");
	}

	return {render, toggle};
}

export default (dropdownID) => {
	let view = dropmenuView(dropdownID);

	const render = ({menuList}) => {
		return view.render(menuList)
	}
	
	const toggle = () => {
		view.toggle();
	}

	return {render, toggle};
}
