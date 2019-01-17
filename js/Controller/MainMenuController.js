function MainMenuController(view) {
	// console.log('MainMenuController');
	MenuController.call(this, view, 'Main');
}

MainMenuController.prototype = Object.create(MenuController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.processActions = function(status) {
	// console.log('processActions');
	if (!status) return;
	if (this.menuButtonsPressed(status.buttons, [ 0, 1, 2, 3 ])) return this.end();
	this.moveVertical(this.verticalDirection(status.axes));
	return null;
};

MainMenuController.prototype.end = function() {
	// console.log('end');
	return this.REPORTS[this.index];
};

MainMenuController.prototype.moveVertical = function() {
	// console.log('moveVertical');
};