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