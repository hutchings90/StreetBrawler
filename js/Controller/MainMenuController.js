function MainMenuController(view) {
	// console.log('MainMenuController');
	GamepadProcessingController.call(this, view);
	this.mainMenu = this.view.getMainMenu();
}

MainMenuController.prototype = Object.create(GamepadProcessingController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.start = function() {
	// console.log('start');
	this.view.show(this.mainMenu);
};