function MainMenuController(view) {
	// console.log('MainMenuController');
	MenuController.call(this, view, 'Main');
}

MainMenuController.prototype = Object.create(MenuController.prototype);
MainMenuController.constructor = MainMenuController;

MainMenuController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.trackEndFrames()) return this.end(pi);
		if (this.menuButtonsPressed(status.buttons, [ 1 ], pi)) this.startEnd(pi);
		this.moveVertical(this.verticalDirection(status.axes), pi);
	}
};