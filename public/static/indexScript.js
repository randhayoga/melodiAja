(function main() {
	const HERO_TOP = document.getElementById("heroTop");
	const NAVBAR = document.getElementById("navbar")

	setInterval( () => {
		if(window.scrollY > HERO_TOP.getBoundingClientRect().bottom) {
			NAVBAR.classList.add("navbar--withbg")
		} else {
			NAVBAR.classList.remove("navbar--withbg")
		}
		}, 100
	);
})()
