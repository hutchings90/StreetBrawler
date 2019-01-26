function StreetBrawler(gamepads) {
	// console.log('StreetBrawler');
	this.players = [ new Player(gamepads[0]), new Player(gamepads[1]), new AIPlayer() ];
}

StreetBrawler.prototype.setGamepadHalted = function(halted) {
	// console.log('setGamepadHalted');
	for (var i in this.players) {
		this.players[i].gamepadReader.halted = halted;
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
		if (this.players[i].isActive()) count++;
	}
	return count;
};

StreetBrawler.prototype.playerNotPlaying = function(pi) {
	// console.log('playerNotPlaying');
	this.players[pi].playing = false;
};

StreetBrawler.prototype.allHumansPlaying = function() {
	// console.log('allHumansPlaying');
	for (var i = this.players.length - 2; i >= 0; i--) {
		this.players[i].playing = true;
	}
	this.deactivateAI();
};

StreetBrawler.prototype.activateAI = function() {
	// console.log('activateAI');
	this.players[this.players.length - 1].playing = true;
};

StreetBrawler.prototype.deactivateAI = function() {
	// console.log('deactivateAI');
	this.players[this.players.length - 1].playing = false;
};