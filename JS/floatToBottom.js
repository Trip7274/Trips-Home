function floatToBottom() {
	const contentDiv = document.getElementById("MainDiv");
	const headerDiv = document.querySelector('header');
	const masterGrid = document.getElementById("MasterGrid");

	masterGrid.style.gridTemplateRows = `${Math.max(window.innerHeight - contentDiv.clientHeight - (14 + (window.innerWidth * 0.03621)), headerDiv.clientHeight)}px 1fr`;
}// calc(14px + .3621vw)

window.onload = floatToBottom;
