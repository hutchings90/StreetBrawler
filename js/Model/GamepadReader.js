function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.REPEAT = 16;
	this.RESTART = 8;
	this.gamepad = gamepad;
	this.mode = '';
	this.status = new GamepadStatus(gamepad.axes.length, gamepad.buttons.length, this.RESTART);
	this.read = EMPTY_FUNC;
}

GamepadReader.prototype.setMode = function(mode) {
	// console.log('setMode');
	this.mode = mode;
	if (!this.mode) this.read = EMPTY_FUNC;
	else this.read = this[this.mode + 'Read'];
};

GamepadReader.prototype.menuRead = function(ts) {
	// console.log('menuRead');
	var gamepad = this.gamepad;
	for (var i in gamepad.buttons) {
		var button = gamepad.buttons[i];
		var status = this.status.buttons[i];
		if (!button.pressed) {
			if (status.status == 'end') {
				this.status.buttons[i].idle();
			}
			else if (status.status != 'idle') {
				this.status.buttons[i].end();
			}
		}
		else if (status.status == 'idle') {
			this.status.buttons[i].start();
		}
		else {
			status.frames++;
			if (status.frames == this.REPEAT) {
				this.status.buttons[i].repeat();
			}
		}
	}
	return Object.create(this.status);
};

GamepadReader.prototype.battleRead = function(ts) {
	console.log('battleRead');
};

GamepadReader.prototype.reset = function() {
	// console.log('reset');
	this.status = new GamepadStatus(this.gamepad.axes.length, this.gamepad.buttons.length);
};