function MainMenuController(view) {
	// console.log('MainMenuController');
	MenuController.call(this, view, 'Main');
}

MainMenuController.prototype = Object.create(MenuController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	if (this.trackEndFrames()) return this.end(pi);
	if (!status) return null;
	if (this.menuButtonsPressed(status.buttons, [ 1 ], pi)) this.startEnd(pi);
	this.moveVertical(this.verticalDirection(status.axes), pi);
	return null;
};