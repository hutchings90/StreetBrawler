function Player(gamepad) {
	// console.log('Player');
	this.gamepadReader = new GamepadReader(gamepad);
	this.playing = true;
	if (!gamepad) this.activeGamepad = false;
	else this.activeGamepad = true;
}

Player.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	this.gamepadReader.setGamepad(gamepad);
	this.activeGamepad = true;
};

Player.prototype.gamepadDisconnected = function() {
	// console.log('gamepadDisconnected');
	this.gamepadReader.reset();
	this.activeGamepad = false;
};

Player.prototype.isActive = function() {
	// console.log('isActive');
	return this.activeGamepad && this.playing;
};