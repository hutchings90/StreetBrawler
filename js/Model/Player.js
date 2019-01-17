function Player(gamepad) {
	// console.log('Player');
	this.gamepadReader = new GamepadReader(gamepad);
	if (!gamepad) this.active = false;
	else this.active = true;
}

Player.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	this.gamepadReader.setGamepad(gamepad);
	this.active = false;
};

Player.prototype.gamepadDisconnected = function() {
	// console.log('gamepadDisconnected');
	this.gamepadReader.reset();
	this.active = true;
};