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

GamepadProcessingController.prototype.menuButtonsPressed = function(buttons, checks, pi) {
	// console.log('menuButtonsPressed');
	for (var i in checks) {
		var status = buttons[checks[i]].status;
		if (status == 'start' || status == 'repeat') return true;
	}
	return false;
};

GamepadProcessingController.prototype.axisPressed = function(axis, pi) {
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
	// console.log('verticalDirection');
	var axis = axes[0];
	if (this.axisPressed(axis)) return axis.direction;
	return 0;
};