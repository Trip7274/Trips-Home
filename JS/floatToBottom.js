const contentHeight = document.getElementById("MainDiv").clientHeight,
	headerHeight = document.querySelector('header').clientHeight,
	delay = 250;

let timeout;

function floatToBottom() {
	// The math is for the margin of #MasterDiv
	document.getElementById("MasterGrid").style.gridTemplateRows = `${Math.max(window.innerHeight - contentHeight - (14 + (window.innerWidth * 0.03621)), headerHeight)}px 1fr`;
}

window.addEventListener("load", floatToBottom, false);
window.addEventListener("resize", function () {
	clearTimeout(timeout)
	timeout = setTimeout(floatToBottom, delay)
});
