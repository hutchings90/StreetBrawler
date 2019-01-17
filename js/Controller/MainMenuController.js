function MainMenuController(view) {
	// console.log('MainMenuController');
	MenuController.call(this, view, 'Main');
}

MainMenuController.prototype = Object.create(MenuController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.processActions = function(actions) {
	// console.log('processActions');
	if (!actions) return;
	if (this.buttonsPressed(actions.buttons, [ 0, 1, 2, 3 ])) {
		return this.end();
	}
	return null;
};

MainMenuController.prototype.end = function() {
	// console.log('end');
	return this.REPORTS[this.index];
};