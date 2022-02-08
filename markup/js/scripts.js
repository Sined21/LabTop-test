// javascript
let loadLazyLoadScript = false;

document.addEventListener('DOMContentLoaded', function () {
	lazyLoad();
	correctVh();
	correctVw();

	ScrollOut({
		threshold: .2,
		once: true
	});
	// dev2
	// dev3
});

window.addEventListener('resize', function () {
	correctVh();
	correctVw();

	// dev2
	// dev3
});

// replaseInlineSvg
function replaseInlineSvg(el) {
	var imgID = el.getAttribute('id');
	var imgClass = el.getAttribute('class');
	var imgURL = el.getAttribute('src');
	fetch(imgURL).then(function(data) {
		return data.text();
	}).then(function(response) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(response, 'text/html');
		var svg = xmlDoc.querySelector('svg');
		if (typeof imgID !== 'undefined') {
			svg.setAttribute('id', imgID);
		}
		if (typeof imgClass !== 'undefined') {
			svg.setAttribute('class', imgClass + ' replaced-svg');
		}
		svg.removeAttribute('xmlns:a');
		el.parentNode.replaceChild(svg, el);
	});
}

// lazyLoad
function lazyLoad() {
	if ('loading' in HTMLImageElement.prototype) {
		var images = document.querySelectorAll('img.lazyload');
		images.forEach(function (img) {
			img.src = img.dataset.src;
			img.onload = function () {
				img.classList.add('lazyloaded');
			};
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
		});
	} else {
		if (!loadLazyLoadScript) {
			loadLazyLoadScript = true;
			var script = document.createElement('script');
			script.async = true;
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js';
			document.body.appendChild(script);
		}
		document.addEventListener('lazyloaded', function (e) {
			var img = e.target;
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
		});
	}
}

// correctVh
function correctVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
}

// correctVw
function correctVw() {
	let vw = document.documentElement.clientWidth * 0.01;
	document.documentElement.style.setProperty('--vw', vw + 'px');
}

// dev2
// dev3
// dev4