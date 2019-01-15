function StreetBrawler(gamepads) {
	// console.log('StreetBrawler');
	this.players = [ new Player(gamepads[0]), new Player(gamepads[1]) ];
}