function GamepadProcessingController(view, utils, contentManager) {
	// console.log('GamepadProcessingController');
	Controller.call(this, view, utils, contentManager);
	this.UP = -1;
	this.DOWN = 1;
	this.LEFT = -1;
	this.RIGHT = 1;
}

GamepadProcessingController.prototype = Object.create(Controller.prototype);
GamepadProcessingController.constructor = GamepadProcessingController;

GamepadProcessingController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
};

GamepadProcessingController.prototype.buttonsPressed = function(buttons, checks) {
	// console.log('buttonsPressed');
	for (var i in checks) {
		if (this.buttonPressed(buttons[checks[i]])) return true;
	}
	return false;
};

GamepadProcessingController.prototype.buttonPressed = function(button) {
	// console.log('buttonPressed');
	return button.status == 'start' || button.status == 'repeat';
};

GamepadProcessingController.prototype.axisPressed = function(axis) {
	// console.log('axisPressed');
	return axis.status == 'start' || axis.status == 'repeat';
};

GamepadProcessingController.prototype.verticalDirection = function(axes) {
	// console.log('verticalDirection');
	var axis = axes[1];
	if (this.axisPressed(axis)) return axis.direction;
	return 0;
};

GamepadProcessingController.prototype.horizontalDirection = function(axes) {
	// console.log('horizontalDirection');
	var axis = axes[0];
	if (this.axisPressed(axis)) return axis.direction;
	return 0;
};