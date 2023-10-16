import { useState } from "react"
import "./styles/musicMeterPin.css"

const musicMeterPinView = (() => {
	let position, setPosition;

	const update = (newPos) => {
		setPosition(`${newPos}%`);
	}

	const getElem = () => {
		[position, setPosition] = useState("0%")
		return (
			<div id="musicMeter__progressPin" style={
				{
					marginLeft: position,
				}
			}></div>
		)
	};

	return {update, getElem};
})()

function MusicMeterPin() {
	let view = musicMeterPinView;

	const update = (newPos) => {
		view.update(newPos);
	};

	const render = () => {
		return view.getElem();
	}

	return {render, update}
}

let musicMeterPin = MusicMeterPin();
export default {
	render: () => musicMeterPin.render,
	update: musicMeterPin.update,
};
