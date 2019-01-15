function GamepadProcessingController(view) {
	// console.log('GamepadProcessingController');
	Controller.call(this, view);
}

GamepadProcessingController.prototype = Object.create(Controller.prototype);
GamepadProcessingController.constructor = GamepadProcessingController;

GamepadProcessingController.prototype.processActions = function(actions) {
	// console.log('processActions');
};