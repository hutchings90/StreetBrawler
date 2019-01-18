function MainMenuController(view) {
	// console.log('MainMenuController');
	MenuController.call(this, view, 'Main');
}

MainMenuController.prototype = Object.create(MenuController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.processInputs = function(status) {
	// console.log('processInputs');
	if (!status) return null;
	if (this.menuButtonsPressed(status.buttons, [ 0, 1, 2, 3 ])) return this.end();
	this.moveVertical(this.verticalDirection(status.axes));
	return null;
};

MainMenuController.prototype.moveUp = function() {
	// console.log('moveUp');
	this.setIndex(this.i - 1);
};

MainMenuController.prototype.moveDown = function() {
	// console.log('moveDown');
	this.setIndex(this.i + 1);
};