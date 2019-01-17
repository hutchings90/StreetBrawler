function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.NUM_AXES = 2;
	this.mode = '';
	if (gamepad) {
		this.setGamepad(gamepad);
		this.status = new GamepadStatus(this.NUM_AXES, gamepad.buttons.length, this.RESTART);
	}
	else {
		this.gamepad = null;
		this.status = new GamepadStatus();
	}
}

GamepadReader.prototype.setMode = function(mode) {
	// console.log('setMode');
	this.mode = mode;
	if (!this.mode) this.read = EMPTY_FUNC;
	else this.read = this[this.mode + 'Read'];
};

GamepadReader.prototype.read = EMPTY_FUNC;

GamepadReader.prototype.menuRead = function() {
	// console.log('menuRead');
	this.menuReadAxes();
	this.menuReadButtons();
	return Object.create(this.status);
};

GamepadReader.prototype.menuReadButtons = function() {
	// console.log('menuReadButtons');
	var gamepad = this.gamepad;
	for (var i in gamepad.buttons) {
		this.status.buttons[i].update(gamepad.buttons[i].pressed);
	}
};

GamepadReader.prototype.menuReadAxes = function() {
	// console.log('menuReadAxes');
	var gamepad = this.gamepad;
	for (var i = this.NUM_AXES - 1; i >= 0; i--) {
		this.status.axes[i].update(gamepad.axes[i]);
	}
};

GamepadReader.prototype.battleRead = function(ts) {
	console.log('battleRead');
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