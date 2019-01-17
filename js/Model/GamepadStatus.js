function GamepadStatus(numAxes, numButtons, restart) {
	// console.log('GamepadStatus');
	this.numAxes = numAxes || 0;
	this.numButtons = numButtons || 0;
	this.restart = restart;
	this.reset();
}

GamepadStatus.prototype.resetAxes = function() {
	// console.log('resetAxes');
	this.axes = [];
	for (var i = this.numAxes - 1; i >= 0; i--) {
		this.axes.push(new MenuAxisStatus());
	}
};

GamepadStatus.prototype.resetButtons = function() {
	// console.log('resetButtons');
	this.buttons = [];
	for (var i = this.numButtons - 1; i >= 0; i--) {
		this.buttons.push(new MenuButtonStatus(this.restart));
	}
};

GamepadStatus.prototype.reset = function() {
	// console.log('reset');
	this.resetAxes();
	this.resetButtons();
};