function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.NUM_AXES = 2;
	this.halted = false;
	if (gamepad) {
		this.setGamepad(gamepad);
		this.status = new GamepadStatus(this.NUM_AXES, gamepad.buttons.length);
	}
	else {
		this.gamepad = null;
		this.status = new GamepadStatus();
	}
}

GamepadReader.prototype.read = function() {
	// console.log('read');
	if (this.halted) return;
	this.readAxes();
	this.readButtons();
	return Object.create(this.status);
};

GamepadReader.prototype.readButtons = function() {
	// console.log('readButtons');
	var gamepad = this.gamepad;
	for (var i in gamepad.buttons) {
		this.status.buttons[i].update(gamepad.buttons[i].pressed);
	}
};

GamepadReader.prototype.readAxes = function() {
	// console.log('readAxes');
	var gamepad = this.gamepad;
	for (var i = this.NUM_AXES - 1; i >= 0; i--) {
		this.status.axes[i].update(gamepad.axes[i]);
	}
};

GamepadReader.prototype.reset = function() {
	// console.log('reset');
	this.status = new GamepadStatus(this.NUM_AXES, this.gamepad.buttons.length);
};

GamepadReader.prototype.setGamepad = function(gamepad) {
	// console.log('setGamepad');
	this.gamepad = gamepad;
	this.reset();
};