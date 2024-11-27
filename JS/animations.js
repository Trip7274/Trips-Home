// This code was from Fireship (https://youtu.be/T33NN_pPeNI)

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		}
	});
});

const hiddenElements = document.querySelectorAll('.animate');
hiddenElements.forEach((el) => observer.observe(el));