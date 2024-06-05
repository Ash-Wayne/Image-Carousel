let currentImage;
let currentCircle;
let intervalID;

export default function setupImageCarousel(images, circles, arrows) {
	// TODO: Later include options for animations for the transitions

	currentImage = images[0];
	currentCircle = circles[0];

	setupArrowListeners(images, circles, arrows[0], arrows[1]);
	setupCircleListeners(images, circles);
	setupAutoMoveFoward(images, circles);
}

function setupArrowListeners(images, circles, leftArrow, rightArrow) {
	leftArrow.addEventListener('click', () => {
		goToImage(images[getIndexOfPreviousImageAndCircle(images)], circles[getIndexOfPreviousImageAndCircle(images)]);

		// restart automoveforward after being interrupted by user action
		setupAutoMoveFoward(images, circles);
	});

	rightArrow.addEventListener('click', () => {
		goToNextImage(images, circles);

		// restart automoveforward after being interrupted by user action
		setupAutoMoveFoward(images, circles);
	});
}

function setupCircleListeners(images, circles) {
	circles.forEach(circle => {
		circle.addEventListener('click', () => {
			goToImage(images[circles.indexOf(circle)], circle);

			// restart automoveforward after being interrupted by user action
			setupAutoMoveFoward(images, circles);
		});
	});
}

function setupAutoMoveFoward(images, circles) {
	if (intervalID) clearInterval(intervalID);
	intervalID = setInterval(goToNextImage, 5000, images, circles);
}

function goToImage(newImage, newCircle) {
	currentImage.classList.add('no-display');
	currentCircle.classList.remove('black-bg');
	newImage.classList.remove('no-display');
	newCircle.classList.add('black-bg');

	changeCurrentImageAndCircle(newImage, newCircle);
}

function getIndexOfNextImageAndCircle(images) {
	if (images.indexOf(currentImage) === images.length - 1) return 0;
	else return images.indexOf(currentImage) + 1;
}

function getIndexOfPreviousImageAndCircle(images) {
	if (images.indexOf(currentImage) === 0) return images.length - 1;
	else return images.indexOf(currentImage) - 1;
}

function goToNextImage(images, circles) {
	goToImage(images[getIndexOfNextImageAndCircle(images)], circles[getIndexOfNextImageAndCircle(images)]);
}

function changeCurrentImageAndCircle(newImage, newCircle) {
	currentImage = newImage;
	currentCircle = newCircle;
}
