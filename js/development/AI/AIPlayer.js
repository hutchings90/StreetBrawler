function AIPlayer() {
	// console.log('AIPlayer');
	Player.call(this, new GamepadSimulator());
	this.playing = false;
}

AIPlayer.prototype = Object.create(Player.prototype);
AIPlayer.constructor = AIPlayer;