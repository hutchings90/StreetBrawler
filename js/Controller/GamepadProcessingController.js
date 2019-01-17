function GamepadProcessingController(view) {
	// console.log('GamepadProcessingController');
	Controller.call(this, view);
}

GamepadProcessingController.prototype = Object.create(Controller.prototype);
GamepadProcessingController.constructor = GamepadProcessingController;

GamepadProcessingController.prototype.processActions = function(actions) {
	// console.log('processActions');
};

GamepadProcessingController.prototype.buttonsPressed = function(buttons, checks) {
	// console.log('buttonsPressed');
	if (!buttons) return false;
	for (var i in checks) {
		var status = buttons[i].status;
		if (status == 'start' || status == 'repeat') return true;
	}
	return false;
};