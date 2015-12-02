/**
 * Created by jarodmoser on 11/13/15.
 */


// sprite variables

var rudolphSprite,
	backgroundSprite,
	foregroundSprite,
	icicleSprite,
	chimneySprite,
	cloudSprite,
	okButtonSprite;

// sprite constructor

function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x * 2;
	this.y = y * 2;
	this.width = width * 2;
	this.height = height * 2;
}

// define draw method (prototype)

Sprite.prototype.draw = function (renderingContext, x, y){
	renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

// initialize sprites

function initSprites(img) {
	rudolphSprite = [
		new Sprite(img, 0, 189, 80, 33),
		new Sprite(img, 0, 227, 80, 33),
		new Sprite(img, 0, 268, 80, 33)
	];

	cloudSprite = new Sprite(img, 324, 2, 95, 41 );
	backgroundSprite = new Sprite(img, 0, 0, 320, 185);
	foregroundSprite = new Sprite(img, 85, 300, 350, 50);
	okButtonSprite = new Sprite(img, 128, 205, 180 ,40);
	icicleSprite = new Sprite(img, 330, 50, 45, 120);
	chimneySprite = new Sprite(img, 365, 50, 45, 120);
}