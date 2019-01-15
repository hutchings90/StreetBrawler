function StreetBrawlerController(model, view) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view);
	this.streetBrawler = model;
	this.mainMenuController = new MainMenuController();
	this.characterSelectController = new CharacterSelectController();
	this.battleController = new BattleController();
	this.pauseMenuController = new PauseMenuController();
	this.FRAME_MS = 20;
}

StreetBrawlerController.prototype = Controller.prototype;
StreetBrawlerController.constructor = StreetBrawlerController;

StreetBrawlerController.prototype.start = function() {
	// console.log('start');
	var me = this;
	setInterval(function() {
		me.gameLoop();
	}, this.FRAME_MS);
};

StreetBrawlerController.prototype.gameLoop = function() {
	// console.log('gameLoop');
	var ts = (new Date).getTime();
	this.readGamepads(ts);
};

StreetBrawlerController.prototype.readGamepads = function(ts) {
	// console.log('readGamepads');
	navigator.getGamepads();
	var model = this.streetBrawler;
	var players = model.players;
	for (var i in players) {
		var player = players[i];
		var gamepadReader = player.gamepadReader;
		gamepadReader.read(ts);
	}
};

StreetBrawlerController.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	this.streetBrawler.players[gamepad.index].gamepadReader.resetInputs();
};

StreetBrawlerController.prototype.gamepadDisconnected = function(gameapd) {
	// console.log('gamepadDisconnected')
	this.streetBrawler.players[gamepad.index].gamepadReader.resetInputs();
};