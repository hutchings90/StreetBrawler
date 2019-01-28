function GamepadSimulatorController(model) {
	// console.log('GamepadSimulatorController');
	var players = model.game.streetBrawler.players;
	this.model = model;
	this.gamepads = [ players[0].gamepadReader.gamepad, players[1].gamepadReader.gamepad ];
}