function MenuController(view, utils, menu) {
	// console.log('MenuController');
	GamepadProcessingController.call(this, view, utils);
	this.TRANSITION_DELAY = 40;
	this.menu = this.view['get' + menu + 'Menu']();
	this.options = this.view.getOptions(this.menu);
	this.endFrames = 0;
}

MenuController.prototype = Object.create(GamepadProcessingController.prototype);
MenuController.constructor = MenuController;

MenuController.prototype.start = function(activator) {
	// console.log('start');
	if (activator) this.activator = activator;
	this.move(this.i || 0);
	this.view.show(this.menu);
};

MenuController.prototype.startEnd = function() {
	// console.log('startEnd');
	if (this.endFrames) return;
	this.endFrames = 1;
	this.view.selectOption(this.options[this.i]);
};

MenuController.prototype.trackEndFrames = function() {
	// console.log('trackEndFrames');
	if (this.endFrames == 0 || ++this.endFrames <= this.TRANSITION_DELAY) return false;
	this.endFrames = 0;
	return true;
};

MenuController.prototype.end = function(pi) {
	// console.log('end');
	this.hide();
	this.clearAllOptions();
	return {
		action: this.view.getOptionAction(this.options[this.i]),
		pi: pi,
		params: {}
	};
};

MenuController.prototype.clearAllOptions = function(pi) {
	// console.log('clearAllOptions');
	for (var i = this.options.length - 1; i >= 0; i--) {
		this.clearOption(i, pi);
	}
};

MenuController.prototype.hide = function() {
	// console.log('hide');
	this.view.hide(this.menu);
};

MenuController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.menu);
};

MenuController.prototype.moveVertical = function(direction, pi) {
	// console.log('moveVertical');
	if (direction < 0) this.moveUp(pi);
	else if (direction > 0) this.moveDown(pi);
};

MenuController.prototype.moveHorizontal = function(direction, pi) {
	// console.log('moveHorizontal');
	if (direction < 0) this.moveLeft(pi);
	else if (direction > 0) this.moveRight(pi);
};

MenuController.prototype.setIndex = function(i, pi) {
	// console.log('setIndex');
	this.i = this.validI(i);
}

MenuController.prototype.validI = function(i) {
	// console.log('validI');
	if (i < 0) i = this.options.length - 1;
	if (i >= this.options.length) i = 0;
	return i;
};

MenuController.prototype.replaceOption = function(oldi, newi, pi) {
	// console.log('replaceOption');
	this.clearOption(oldi, pi);
	this.activateOption(newi, pi);
};

MenuController.prototype.clearOption = function(i, pi) {
	// console.log('clearOption');
	this.view.clearOption(this.options[i]);
};

MenuController.prototype.activateOption = function(i, pi) {
	// console.log('activateOption');
	this.view.activateOption(this.options[i]);
};

MenuController.prototype.moveUp = function(pi) {
	// console.log('moveUp');
	this.move(this.i - 1, pi);
};

MenuController.prototype.moveDown = function(pi) {
	// console.log('moveDown');
	this.move(this.i + 1, pi);
};

MenuController.prototype.moveLeft = function(pi) {
	// console.log('moveLeft');
	this.move(this.i - 1, pi);
};

MenuController.prototype.moveRight = function(pi) {
	// console.log('moveRight');
	this.move(this.i + 1, pi);
};

MenuController.prototype.move = function(i, pi) {
	// console.log('move');
	var oldi = this.i;
	this.setIndex(i, pi);
	this.replaceOption(oldi, this.i, pi);
};