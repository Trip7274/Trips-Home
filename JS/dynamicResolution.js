function updateImageSrcsWithScreenDimensions() {
	document.querySelectorAll(".dynamic").forEach(imageElement => {
		if (imageElement.src) {
			const imageUrl = new URL(imageElement.src, window.location.href);

			const allowedDomains = ["trps.dev", "localhost", "127.0.0.1"]
			if (!allowedDomains.includes(imageUrl.hostname)) {

				imageElement.classList.add("load");
				return;
			}

			// Replace the low-quality image placeholder with the original image path
			let originalPath = imageElement.src.replace("_LQIP", "").replace("-LQIP", "").replace(`${imageUrl.origin}/`, "");

			// Make sure that this isn't a local dev enviroment
			if ((imageUrl.protocol === "http:" || imageUrl.protocol === "https:") && !(imageUrl.hostname === "localhost" || imageUrl.hostname === "127.0.0.1")) {

				let imageHeight = imageElement.clientHeight;
				let imageWidth = imageElement.clientWidth;

				if ((imageHeight < 300 || imageWidth < 300) && !window.matchMedia("prefers-reduced-data").matches) {
					imageHeight = imageHeight * 2;
					imageWidth = imageWidth * 2;
				}

				imageElement.src = `https://cdn.${imageUrl.host}/?image=${originalPath}&width=${imageWidth}&height=${imageHeight}`;
				imageElement.classList.add("load");
			}
			else {
				//originalPath = originalPath.replace("Trips-Home/", "");
				console.log(`Keeping original URL for non-HTTP(S) path: ${originalPath}`);
				imageElement.src = `${originalPath}`;
				imageElement.classList.add("load");
			}
		}
	});
}

window.addEventListener("load", updateImageSrcsWithScreenDimensions, false);