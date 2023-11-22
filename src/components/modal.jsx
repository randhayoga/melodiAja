import "./styles/modal.css"
import {useState} from "react";

const modalView = () => {
	const toggle = (id) => {
		document.getElementById(id).classList.toggle("modal__box--hidden");
	}

	const render = ({id, heading}, Component) => {
		return (
			<section id={`${id}Modal`}>
				<div className="modal__box">
					<div className="modal__top">
						<h3 className="modal__name"> {heading} </h3>
						<div className="icon icon--tiny"
							onClick={() => toggle(`${id}Modal`)}
						>
							<img src="/icons/close_x.png" alt="close icon" />
						</div>
					</div>
					<div className="modal__body">
						<Component />
					</div>
				</div>
				<div className="modal__shade" > </div>
			</section>
		)
	}
	
	return {render, toggle};
}

export default function modal(modalID, modalName) {
	let view = modalView();
	let config = {
		id: modalID,
		heading: modalName,
	};

	const render = ({component}) => {
		return view.render(config, component);
	}

	const toggle = () => {
		view.toggle(config.id + "Modal");
	}
	
	return {render, toggle};
}
