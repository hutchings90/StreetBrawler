function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.gamepad = gamepad;
	this.mode = '';
	this.resetAxes();
	this.resetButtons();
}

GamepadReader.prototype.setMode = function(mode) {
	// console.log('setMode');
	this.mode = mode;
	if (this.mode) this.mode += 'Read';
};

GamepadReader.prototype.read = function(ts) {
	// console.log('read');
	if (!this.mode) return;
	this[this.mode](ts);
};

GamepadReader.prototype.menuRead = function(ts) {
	console.log('menuRead');
};

GamepadReader.prototype.battleRead = function(ts) {
	console.log('battleRead');
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