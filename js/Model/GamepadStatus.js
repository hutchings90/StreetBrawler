function GamepadStatus(numAxes, numButtons) {
	// console.log('GamepadStatus');
	this.numAxes = numAxes || 0;
	this.numButtons = numButtons || 0;
	this.reset();
}

GamepadStatus.prototype.resetAxes = function() {
	// console.log('resetAxes');
	this.axes = [];
	for (var i = this.numAxes - 1; i >= 0; i--) {
		this.axes.push(new GamepadAxisStatus());
	}
};

GamepadStatus.prototype.resetButtons = function() {
	// console.log('resetButtons');
	this.buttons = [];
	for (var i = this.numButtons - 1; i >= 0; i--) {
		this.buttons.push(new GamepadButtonStatus());
	}
};

GamepadStatus.prototype.reset = function() {
	// console.log('reset');
	this.resetAxes();
	this.resetButtons();
};

GamepadStatus.prototype.setGamepadMode = function(mode) {
	// console.log('setGamepadMode');
	for (var i in this.axes) {
		this.axes[i].mode = mode;
	}
	for (var i in this.buttons) {
		this.buttons[i].mode = mode;
	}
};