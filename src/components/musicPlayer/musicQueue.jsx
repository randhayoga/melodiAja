const mQueueModel = (() => {
	const getData = () => {
		return 1;
	}

	return {getData};
})()

const mQueueView = (() => {
	const render = (musicList) => {
		return (
			<>
				<p> Hello </p>
			</>
		)
	}

	return {render};

})()

function MQueue(props) {
	let model = mQueueModel;
	let view = mQueueView;

	let musicList = model.getData();
	return view.render(musicList);
}

export default MQueue;
