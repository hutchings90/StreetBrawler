function StreetBrawler(gamepads) {
	// console.log('StreetBrawler');
	this.players = [ new Player(gamepads[0]), new Player(gamepads[1]) ];
}

StreetBrawler.prototype.setGamepadMode = function(mode) {
	// console.log('setGamepadMode');
	for (var i in this.players) {
		this.players[i].gamepadReader.setMode(mode);
	}
};

StreetBrawler.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	this.players[gamepad.index].gamepadConnected(gamepad);
};

StreetBrawler.prototype.gamepadDisconnected = function(gamepad) {
	// console.log('gamepadDisconnected');
	this.players[gamepad.index].gamepadDisconnected();
};

StreetBrawler.prototype.activePlayerCount = function() {
	// console.log('gamepadCount');
	var count = 0;
	for (var i in this.players) {
		if (this.players[i].active) count++;
	}
	return count;
};