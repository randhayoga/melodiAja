export default (prefix, warningFields, {CANVAS_WIDTH, CANVAS_HEIGHT}) => {
	const clearWarning = () => {
		warningFields.forEach((item) => {
			document.getElementById(`warning__${prefix}${item}`)
				.classList.remove("entry__warning--showing")
		})
	}

	const changePreviewImage = (data) => {
		document.getElementById(`${prefix}__imgPreviewCaption`)
			.classList.add("form__imgPreviewCaption--hidden")
		const ctx = document.getElementById(`${prefix}__imgPreview`)
				.getContext("2d");

		const img = new Image();
		img.src = data;
		img.onload = () => ctx.drawImage(
			img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT
		);
	}

	const clearCanvas = () => {
		document.getElementById(`${prefix}__imgPreviewCaption`)
			.classList.remove("form__imgPreviewCaption--hidden")
		document.getElementById(`${prefix}__imgPreview`)
			.getContext("2d")
			.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	}

	const setWarning = (elemID, message) => {
		let elem = document.getElementById(elemID);
		elem.classList.add("entry__warning--showing");
		elem.textContent = message;
	}

	return {clearCanvas, clearWarning, changePreviewImage, setWarning}
}
