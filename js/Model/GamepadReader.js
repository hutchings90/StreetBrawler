function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.gamepad = gamepad;
	this.resetAxes();
	this.resetButtons();
}

GamepadReader.prototype.read = function(ts) {
	// console.log('read');
};

GamepadReader.prototype.resetAxes = function() {
	// console.log('resetAxes');
	this.resetInput('axes');
};

GamepadReader.prototype.resetButtons = function() {
	// console.log('resetButtons');
	this.resetInput('buttons');
};

GamepadReader.prototype.resetInput = function(input) {
	// console.log('resetInput');
	this[input] = [];
	if (!this.gamepad) return;
	this[input].length = this.gamepad[input].length;
	this[input].fill('0');
};

GamepadReader.prototype.resetInputs = function() {
	// console.log('resetInputs');
	this.resetAxes();
	this.resetButtons();
};