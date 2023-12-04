import "./styles/loadScreen.css"

export default (() => {
	return (
		<section className="loadScreen">
			<img className="loadScreen__icon" 
				src="/img/Load_gif1.gif" 
				alt="Loading..." />
			<p className="loadScreen__caption">
				{
					[
						"Loading your musical journey...",
						"Elevating your experience, just a moment more...",
						"Your symphony is about to unfold...",
						"Loading the stage for your audio journey...",
						"Loading the beats that will set the tone for your mood...",
					][Date.now() % 5]
				}
			</p>
		</section>
	)
})
