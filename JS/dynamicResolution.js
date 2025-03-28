function updateImageSrcsWithScreenDimensions() {
	document.querySelectorAll(".dynamic").forEach(imageElement => {
		if (imageElement.src) {
			const imageUrl = new URL(imageElement.src, window.location.href);

			// Replace the low-quality image placeholder with the original image path
			let originalPath = imageElement.src.replace("_LQIP", "").replace("-LQIP", "").replace(`${imageUrl.origin}/`, "");

			// Make sure that this isn't a local dev enviroment
			if ((imageUrl.protocol === "http:" || imageUrl.protocol === "https:") && !(imageUrl.hostname === "localhost" || imageUrl.hostname === "127.0.0.1")) {
				imageElement.src = `https://cdn.${imageUrl.host}/?image=${originalPath}&width=${imageElement.clientWidth}&height=${imageElement.clientHeight}`;
				imageElement.classList.add("load");
			}
			else {
				console.log(`Keeping original URL for non-HTTP(S) path: ${originalPath}`);
				originalPath = originalPath.replace("OC-info/", "");
				imageElement.src = `${originalPath}`;
				imageElement.classList.add("load");
			}
		}
	});
}

window.addEventListener("load", updateImageSrcsWithScreenDimensions, false);
