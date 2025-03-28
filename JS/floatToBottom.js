function floatToBottom() {
	const contentHeight = document.getElementById("MainDiv").clientHeight;
	const headerHeight = document.querySelector('header').clientHeight;

	// The math is for the margin of #MasterDiv
	document.getElementById("MasterGrid").style.gridTemplateRows = `${Math.max(window.innerHeight - contentHeight - (14 + (window.innerWidth * 0.03621)), headerHeight)}px 1fr`;
}

window.addEventListener("load", floatToBottom, false);
