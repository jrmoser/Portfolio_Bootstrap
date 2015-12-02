/**
 * Created by jarodmoser on 11/13/15.
 */
var canvas,
	renderingContext,
	width = 600,
	height = 430,
	rudolph,
	clouds,
	foregroundPosition = 0,
	gameFrames = 0,
	currentState,
	corals,
	score = 0,
	highScore = 0,
	difficulty = {
		easy: 2,
		medium: 5,
		hard: 10,
		ludicrousSpeed: 30
	},
	difficultyLevel = difficulty.easy,
	states = {
		Splash: 0,
		Difficulty: 1,
		Game: 2,
		Score: 3
	};

function CoralCollection() {
	this._corals = [];

	/**
	 * Empty corals array
	 */
	this.reset = function () {
		this._corals = [];
	};

	/**
	 * Creates and adds a new Coral to the game.
	 */
	this.add = function () {
		this._corals.push(new Coral()); // Create and push coral to array
	};

	/**
	 * Update the position of existing corals and add new corals when necessary.
	 */
	this.update = function () {
		if (Math.floor(gameFrames % 100) === 0) { // Add a new coral to the game every 100 frames.
			this.add();
		}

		for (var i = 0, len = this._corals.length; i < len; i++) { // Iterate through the array of corals and update each.
			var coral = this._corals[i]; // The current coral.

			if (i === 0) { // If this is the leftmost coral, it is the only coral that the rudolph can collide with . . .
				coral.detectCollision(); // . . . so, determine if the rudolph has collided with this leftmost coral.
			}

			coral.x -= difficultyLevel; // Each frame, move each coral two pixels to the left. Higher/lower values change the movement speed.
			if (coral.x < -coral.width) { // If the coral has moved off screen . . .
				this._corals.splice(i, 1); // . . . remove it.
				i--;
				len--;
			}
			if (coral.x <= rudolph.x - 10 && coral.x >= rudolph.x - 20) {
				score++;
			}
		}
	};

	/**
	 * Draw all corals to canvas context.
	 */
	this.draw = function () {
		for (var i = 0, len = this._corals.length; i < len; i++) {
			var coral = this._corals[i];
			coral.draw();
		}
	};
}

/**
 * The Coral class. Creates instances of Coral.
 */
function Coral() {
	this.x = 600;
	this.y = height - (chimneySprite.height + foregroundSprite.height + 120 + 200 * Math.random());
	this.width = chimneySprite.width;
	this.height = chimneySprite.height;

	/**
	 * Determines if the rudolph has collided with the Coral.
	 * Calculates x/y difference and use normal vector length calculation to determine
	 */
	this.detectCollision = function () {
		// intersection
		var cx = Math.min(Math.max(rudolph.x, this.x), this.x + this.width);
		var cy1 = Math.min(Math.max(rudolph.y, this.y), this.y + this.height);
		var cy2 = Math.min(Math.max(rudolph.y, this.y + this.height + 80), this.y + 2 * this.height + 80);
		// Closest difference
		var dx = rudolph.x - cx;
		var dy1 = rudolph.y - cy1;
		var dy2 = rudolph.y - cy2;
		// Vector length
		var d1 = dx * dx + dy1 * dy1;
		var d2 = dx * dx + dy2 * dy2;
		var r = rudolph.radius * rudolph.radius;
		// Determine intersection
		if (r > d1 || r > d2) {
			currentState = states.Score;
		}
	};

	this.draw = function () {
		icicleSprite.draw(renderingContext, this.x + 25, this.y);
		chimneySprite.draw(renderingContext, this.x, this.y + 100 + this.height);
	};
}

function Clouds() {

	this.draw = function (renderingContext) {
		renderingContext.save();

		// Draw clouds
		cloudSprite.draw(renderingContext, 100, 0);
		cloudSprite.draw(renderingContext, 300, 0);
		cloudSprite.draw(renderingContext, 5, 0);
		cloudSprite.draw(renderingContext, 205, 0);
		cloudSprite.draw(renderingContext, 405, 0);

		if (currentState === states.Splash) {
			renderingContext.fillStyle = '#05057a';
			renderingContext.font = "bolder 30px Arial";
			renderingContext.fillText("Rudolph Training", 200, 50);
			renderingContext.fillStyle = '#9e1300';
			renderingContext.fillText("Tap to start training", 180, 300);
		} else if (currentState === states.Difficulty) {
			renderingContext.fillStyle = '#05057a';
			renderingContext.font = "bolder 30px Arial";
			renderingContext.fillStyle = '#9e1300';
			renderingContext.fillText("Easy", 180, 210);
			renderingContext.fillText("Medium", 180, 240);
			renderingContext.fillText("Hard", 180, 270);
			renderingContext.fillText("Ludicrous Speed", 180, 300);
		} else {
			if (difficultyLevel === difficulty.easy) {
				highScore = localStorage.getItem("easyHighScore");
			}

			if (difficultyLevel === difficulty.medium) {
				highScore = localStorage.getItem("mediumHighScore");
			}

			if (difficultyLevel === difficulty.hard) {
				highScore = localStorage.getItem("hardHighScore");
			}

			if (difficultyLevel === difficulty.ludicrousSpeed) {
				highScore = localStorage.getItem("ludicrousSpeedHighScore");
			}

			highScore = highScore === null ? 0 : highScore;

			renderingContext.fillStyle = '#05057a';
			renderingContext.font = "30px Arial";
			renderingContext.fillText('Score: ' + score, 230, 50);
			renderingContext.font = "20px Arial";
			renderingContext.fillText('High Score: ' + highScore, 440, 50);
		}

		renderingContext.restore();
	};

}

function Rudolph() {
	this.x = 140;
	this.y = 0;

	this.frame = 0;
	this.velocity = 0;
	this.animation = [0, 1, 2, 1]; // The animation sequence

	this.rotation = 0;
	this.radius = 2;

	this.gravity = 0.25;
	this._jump = 4.6;

	/**
	 * Makes Rudolph jump
	 */
	this.jump = function () {
		this.velocity = -this._jump;
	};

	/**
	 * Update sprite animation and position of Rudolph
	 */
	this.update = function () {
		// Play animation twice as fast during game state
		var n = currentState === states.Splash ? 10 : 5;

		this.frame += gameFrames % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		if (currentState === states.Splash || currentState === states.Difficulty) {
			this.updateIdleRudolph();
		} else { // Game state
			this.updatePlayingRudolph();
		}
	};

	/**
	 * Runs the Rudolph through its idle animation.
	 */
	this.updateIdleRudolph = function () {
		this.y = height - 280 + 5 * Math.cos(gameFrames / 10);
		this.rotation = 0;
	};

	/**
	 * Determines Rudolph animation for the player-controlled Rudolph.
	 */
	this.updatePlayingRudolph = function () {
		this.velocity += this.gravity;
		this.y += this.velocity;

		// Change to the score state when Rudolph touches the ground
		if (this.y >= height - foregroundSprite.height - 10) {
			this.y = height - foregroundSprite.height - 10;

			if (currentState === states.Game) {
				currentState = states.Score;
			}

			this.velocity = this._jump; // Set velocity to jump speed for correct rotation
		}

		// When Rudolph lacks upward momentum increment the rotation angle
		if (this.velocity >= this._jump) {
			this.frame = 1;
			this.rotation = Math.min(Math.PI / 4, this.rotation + 0.2);
		} else {
			this.rotation = -0.2;
		}
	};

	/**
	 * Draws Rudolph to canvas renderingContext
	 * @param {CanvasRenderingContext2D} renderingContext the context used for drawing
	 */
	this.draw = function (renderingContext) {
		renderingContext.save();

		// translate and rotate renderingContext coordinate system
		renderingContext.translate(this.x, this.y);
		renderingContext.rotate(this.rotation);

		var n = this.animation[this.frame];

		// draws Rudolph with center in origin
		rudolphSprite[n].draw(renderingContext, -rudolphSprite[n].width / 2, -rudolphSprite[n].height / 2);

		renderingContext.restore();
	};
}

function onPress(evt) {
	switch (currentState) {
		case states.Splash: // Start the game and update the rudolph velocity
			currentState = states.Difficulty;
			rudolph.jump();
			break;

		case states.Game: // updating rudolph velocity
			rudolph.jump();
			break;

		case states.Score: // change from this to splash on ok button
			// get event location
			var mouseX = evt.offsetX,
				mouseY = evt.offsetY;
			if (mouseX === null || mouseY === null) {
				mouseX = evt.touches[0].clientX;
				mouseY = evt.touches[0].clientY;
			}

			//check hit button

			if (okButton.x < mouseX && mouseX < okButton.width && okButton.y < mouseY && mouseY < okButton.y + okButton.height) {
				corals.reset();
				score = 0;
				currentState = states.Splash;

			}
			break;

		case states.Difficulty:
			var mouseX = evt.offsetX,
				mouseY = evt.offsetY;
			if (mouseX === null || mouseY === null) {
				mouseX = evt.touches[0].clientX;
				mouseY = evt.touches[0].clientY;
			}

			if (180 < mouseX && mouseX < 460 && 180 < mouseY && mouseY < 209) {
				difficultyLevel = difficulty.easy;
				currentState = states.Game;
			}
			if (180 < mouseX && mouseX < 460 && 210 < mouseY && mouseY < 239) {
				difficultyLevel = difficulty.medium;
				currentState = states.Game;
			}
			if (180 < mouseX && mouseX < 460 && 240 < mouseY && mouseY < 269) {
				difficultyLevel = difficulty.hard;
				currentState = states.Game;
			}
			if (180 < mouseX && mouseX < 460 && 270 < mouseY && mouseY < 299) {
				difficultyLevel = difficulty.ludicrousSpeed;
				currentState = states.Game;
			}
			break;

	}
}

function windowSetup() {
	// Retrieve the width and height of the window
	width = window.innerWidth;
	height = window.innerHeight;

	// Set the width and height if we are on a display with a width > 500px (e.g., a desktop or tablet environment).
	var inputEvent = "touchstart";
	if (width >= 500) {
		width = 600;
		height = 430;
		inputEvent = "mousedown";
	}

	// Create a listener on the input event.
	document.addEventListener(inputEvent, onPress);
}

function main() {
	windowSetup();
	canvasSetup();

	currentState = states.Splash; // Game begins at the splash screen.

	document.body.appendChild(canvas); // Append the canvas we've created to the body element in our HTML document.

	rudolph = new Rudolph();
	clouds = new Clouds();
	corals = new CoralCollection();

	loadGraphics();
}

function canvasSetup() {
	canvas = document.createElement('canvas');
	canvas.style.border = '3px solid #670800';
	canvas.width = width;
	canvas.height = height;
	renderingContext = canvas.getContext('2d');
}

function loadGraphics() {
	var img = new Image();
	img.src = 'https://lh3.googleusercontent.com/xION--s7wu0VhAUcI9IKlEnDDqhKMJ6g7wVIPhJZe_8=w1920-h1080-rw';
	img.onload = function () {
		initSprites(this);
		renderingContext.fillStyle = '#01011b';
		renderingContext.fillRect(0, 0, width, height);
		okButton = {
			x: 130,
			y: 250,
			width: okButtonSprite.width * 2,
			height: okButtonSprite.height * 2
		};
		gameLoop();
	};
}

function gameLoop() {
	update();
	render();
	window.requestAnimationFrame(gameLoop);
}

function update() {
	gameFrames++;

	if (currentState === states.Splash || currentState === states.Difficulty) {
		foregroundPosition = (foregroundPosition - 1) % 700; // Move left two px each frame. Wrap every 14px.
	}

	if (currentState === states.Game) {
		corals.update();
		foregroundPosition = (foregroundPosition - difficultyLevel) % 700; // Move left two px each frame. Wrap every 14px.
	}

	rudolph.update();
}

/**
 * Re-draw the game view.
 */
function render() {
	// Draw background color
	renderingContext.fillRect(0, 0, width, height);

	// Draw background sprites
	backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
	backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);

	//Draw rudolph
	rudolph.draw(renderingContext);

	corals.draw(renderingContext);

	//Draw clouds
	clouds.draw(renderingContext);

	//icicleSprite.draw(renderingContext, 200, 200);
	//chimneySprite.draw(renderingContext, 300, 200);

	// Draw foreground sprites
	foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
	foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);

	if (currentState === states.Score) {
		if (difficultyLevel === difficulty.easy && score > localStorage.getItem("easyHighScore")) {
			localStorage.setItem("easyHighScore", score);
		}

		if (difficultyLevel === difficulty.hard && score > localStorage.getItem("hardHighScore")) {
			localStorage.setItem("hardHighScore", score);
		}

		if (difficultyLevel === difficulty.medium && score > localStorage.getItem("mediumHighScore")) {
			localStorage.setItem("mediumHighScore", score);
		}

		if (difficultyLevel === difficulty.ludicrousSpeed && score > localStorage.getItem("ludicrousSpeedHighScore")) {
			localStorage.setItem("ludicrousSpeedHighScore", score);
		}

		okButtonSprite.draw(renderingContext, okButton.x, okButton.y);
	}
}