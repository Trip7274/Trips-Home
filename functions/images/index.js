// This just uses the Cloudflare Transformations example code: https://developers.cloudflare.com/images/transform-images/transform-via-workers/#an-example-worker

addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
	// Parse request URL to get access to query string
	let url = new URL(request.url)

	// Cloudflare-specific options are in the cf object.
	let options = { cf: { image: {} } }

	// Copy parameters from query string to request options.
	// You can implement various different parameters here.
	if (url.searchParams.has("fit")) {
		options.cf.image.fit = url.searchParams.get("fit")
	} else {
		options.cf.image.fit = "scale-down"
	}

	if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
	if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
	if (url.searchParams.has("metadata")) {
		options.cf.image.metadata = url.searchParams.get("metadata")
	} else {
		options.cf.image.metadata = "none"
	}

	let formatSupported = false;

	if (url.searchParams.has("format")) {
		const supportedFormats = ["png", "webp", "avif", "jpeg", "baseline-jpeg", "auto"];

		const format = url.searchParams.get("format");
		formatSupported = supportedFormats.includes(format);
	}

	// Your Worker is responsible for automatic format negotiation. Check the Accept header.
	const accept = request.headers.get("Accept");
	if (formatSupported) {
		options.cf.image.format = url.searchParams.get("format");
	} else if (/image\/avif/.test(accept)) {
		options.cf.image.format = 'avif';
	} else if (/image\/webp/.test(accept)) {
		options.cf.image.format = 'webp';
	} else {
		options.cf.image.format = 'jpeg';
	}

	// Get URL of the original (full size) image to resize.
	// You could adjust the URL here, e.g., prefix it with a fixed address of your server,
	// so that user-visible URLs are shorter and cleaner.
	const imageURL = `https://trps.dev/${url.searchParams.get("image")}`
	if (!imageURL) return new Response(`Missing "image" value, ${url.searchParams.get("image")}`, { status: 400 })

	try {
		const { hostname, pathname } = new URL(imageURL)

		// Optionally, only allow URLs with JPEG, PNG, GIF, or WebP file extensions
		// @see https://developers.cloudflare.com/images/url-format#supported-formats-and-limitations
		if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
			return new Response(`Disallowed file extension, ${imageURL}, ${pathname}`, { status: 400 })
		}

		// Demo: Only accept "example.com" images
		const supportedDomains = ["trps.dev", "gamertrip.xyz", "gamertrip.info", "cta.gay"];
		if (!supportedDomains.includes(hostname) && !`oc.${supportedDomains.includes(hostname)}`) {
			return new Response(`Must use source images from a supported domain, not ${hostname}`, { status: 403 })
		}
	} catch (err) {
		return new Response('Invalid "image" value', { status: 400 })
	}

	// Build a request that passes through request headers
	const imageRequest = new Request(imageURL, {
		headers: request.headers
	})

	// Returning fetch() with resizing options will pass through response with the resized image.
	return fetch(imageRequest, options)
}