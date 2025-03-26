function navBlur() {
	const destenationUrl = document.getElementById("PageLink").attributes.getNamedItem("linkTo").value;

	if (window.matchMedia("prefers-reduced-motion").matches) {
		window.location.href = destenationUrl;
		return;
	}

	const direction = document.querySelector("body").attributes.getNamedItem("slide-direction").value;
	const toBeAnimated = document.querySelectorAll('.animate');

	toBeAnimated.forEach((entry) => {
		entry.classList.add("slide");
		entry.classList.add(`slide${direction}`);
	});

	// Seriously? JS doesn't have a proper, one-line `Thread.Sleep(ms)` or `time.sleep(sec)` function? How is this a real langauge that people use? Is this just ragebait?
	setTimeout(function(){
		window.location.href = destenationUrl;
	}, 450);
}