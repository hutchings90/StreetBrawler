function StreetBrawlerController(model, view) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view);
	this.FRAME_MS = 20;
	this.streetBrawler = model;
	this.mainMenuController = new MainMenuController(view);
	this.characterSelectController = new CharacterSelectController(view);
	this.characterDetailsController = new CharacterDetailsController(view);
	this.battleController = new BattleController(view);
	this.pauseMenuController = new PauseMenuController(view);
	this.activeController = this.mainMenuController;
}

StreetBrawlerController.prototype = Object.create(Controller.prototype);
StreetBrawlerController.constructor = StreetBrawlerController;

StreetBrawlerController.prototype.start = function() {
	// console.log('start');
	var me = this;
	this.activeController.start();
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
		var actions = gamepadReader.read(ts);
		this.activeController.processActions(actions);
	}
};

StreetBrawlerController.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	if (gamepad.index > 1) return;
	this.streetBrawler.players[gamepad.index].gamepadReader.resetInputs();
};

StreetBrawlerController.prototype.gamepadDisconnected = function(gameapd) {
	// console.log('gamepadDisconnected')
	if (gamepad.index > 1) return;
	this.streetBrawler.players[gamepad.index].gamepadReader.resetInputs();
};