function PauseMenuController(view) {
	// console.log('PauseMenuController');
	GamepadProcessingController.call(this, view);
	this.gameMenu = this.view.getElement('#game-menu');
}

PauseMenuController.prototype = Object.create(GamepadProcessingController.prototype);
PauseMenuController.constructor = PauseMenuController;

PauseMenuController.prototype.start = function() {
	// console.log('start');
};