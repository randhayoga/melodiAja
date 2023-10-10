const formModel = (() => {
})()

const formView = (() => {
	const insertEntryWarning = (errorType, target) => {
		let warningText = document.createElement("p");

		target.appendChild(warningText)
	}

})()

const formController = (() => {
	let model = formModel;
	let view = formView;

	const setEssentialListeners = () => {
	}

})

(function main() {
	formController.setListeners()
})()
