// This code was written by Google Gemini - UNUSED (or should be)

function updateImageSrcsWithScreenDimensions() {
  const imageElements = document.querySelectorAll(".dynamic");

imageElements.forEach(imageElement => {
	if (imageElement.src) {
		const originalSrc = imageElement.src;
		const originalPath = originalSrc.replace(/^.*\/([^/]*)_LQIP\.webp$/, (match, filename) => {
	return filename === "cherryy,,.,"
	? "assets/cats/cherryy,,.,.webp" // Handle edge case for "cherryy,,.,.webp"
	: "assets/cats/" + filename + ".jpg"; // Handle other files
});

	const { clientWidth: elementWidth, clientHeight: elementHeight } = imageElement;
	const imageUrl = new URL(imageElement.src, window.location.href);
	const domain = imageUrl.host;

		if (imageUrl.protocol === "http:" || imageUrl.protocol === "https:") {
			imageElement.src = `https://cdn.${domain}/?image=${originalPath}&width=${elementWidth}&height=${elementHeight}`;
			imageElement.classList.add("load");
		} else {
			console.log(`Keeping original URL for non-HTTP(S) path: ${imageElement.src}`);
			imageElement.classList.add("load");
		}
	}
  });
}

window.onload = updateImageSrcsWithScreenDimensions;
