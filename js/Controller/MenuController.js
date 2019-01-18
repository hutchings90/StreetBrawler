function MenuController(view, menu) {
	// console.log('MenuController');
	GamepadProcessingController.call(this, view);
	this.menu = this.view['get' + menu + 'Menu']();
	this.options = this.view.getOptions(this.menu);
	this.setIndex(0);
}

MenuController.prototype = Object.create(GamepadProcessingController.prototype);
MenuController.constructor = MenuController;

MenuController.prototype.start = function(activator) {
	// console.log('start');
	if (activator) this.activator = activator;
	this.view.show(this.menu);
};

MenuController.prototype.end = function() {
	// console.log('end');
	this.view.hide(this.menu);
	return this.view.getOptionData(this.options[this.i]);
};

MenuController.prototype.processInputs = function(status) {
	// console.log('processInputs');
}

MenuController.prototype.moveVertical = function(direction) {
	// console.log('moveVertical');
	if (direction < 0) this.moveUp();
	else if (direction > 0) this.moveDown();
};

MenuController.prototype.moveHorizontal = function() {
	// console.log('moveHorizontal');
	if (direction < 0) this.moveLeft();
	else if (direction > 0) this.moveRight();
};

MenuController.prototype.setIndex = function(i) {
	// console.log('setIndex');
	if (i < 0) i = this.options.length - 1;
	if (i >= this.options.length) i = 0;
	if (i != this.i) {
		this.view.clearOption(this.options[this.i]);
		this.view.setOption(this.options[i]);
		this.i = i;
	}
};

MenuController.prototype.moveUp = function() {
	// console.log('moveUp');
};

MenuController.prototype.moveDown = function() {
	// console.log('moveDown');
};

MenuController.prototype.moveLeft = function() {
	// console.log('moveLeft');
};

MenuController.prototype.moveRight = function() {
	// console.log('moveRight');
};