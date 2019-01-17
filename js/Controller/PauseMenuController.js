function PauseMenuController(view) {
	// console.log('PauseMenuController');
	MenuController.call(this, view, 'Pause');
}

PauseMenuController.prototype = Object.create(MenuController.prototype);
PauseMenuController.constructor = PauseMenuController;

PauseMenuController.prototype.start = function() {
	// console.log('start');
};