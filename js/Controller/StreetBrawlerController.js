function StreetBrawlerController(model, view) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view);
	this.FRAME_MS = 20;
	this.interval = null;
	this.timeout = null;
	this.streetBrawler = model;
	this.mainMenuController = new MainMenuController(view);
	this.characterSelectController = new CharacterSelectController(view);
	this.characterDetailsController = new CharacterDetailsController(view);
	this.battleController = new BattleController(view);
	this.pauseMenuController = new PauseMenuController(view);
	this.activateMainMenu();
	if (this.streetBrawler.activePlayerCount() > 0) this.start();
}

StreetBrawlerController.prototype = Object.create(Controller.prototype);
StreetBrawlerController.constructor = StreetBrawlerController;

StreetBrawlerController.prototype.start = function() {
	// console.log('start');
	var me = this;
	this.activeController.start();
	this.interval = setInterval(function() {
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
		if (player.active) {
			var gamepadReader = player.gamepadReader;
			var actions = gamepadReader.read(ts);
			this.activeController.processActions(actions);
		}
	}
};

StreetBrawlerController.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadConnected(gamepad);
	if (!this.interval) this.start();
};

StreetBrawlerController.prototype.gamepadDisconnected = function(gamepad) {
	// console.log('gamepadDisconnected')
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadDisconnected(gamepad);
	if (this.streetBrawler.activePlayerCount() < 1) clearInterval(this.interval);
};

StreetBrawlerController.prototype.activateMainMenu = function() {
	// console.log('activateMainMenu');
	this.activateMenu('mainMenu');
};

StreetBrawlerController.prototype.activateCharacterSelect = function() {
	// console.log('activateCharacterSelect');
	this.activateMenu('characterSelect');
};

StreetBrawlerController.prototype.activateCharacterDetails = function() {
	// console.log('activateCharacterDetails');
	this.activateMenu('characterDetails');
};

StreetBrawlerController.prototype.activateBattle = function() {
	// console.log('activateBattle');
	this.activateController('battle', 'battle');
};

StreetBrawlerController.prototype.activatePauseMenu = function() {
	// console.log('activatePauseMenu');
	this.activateMenu('pauseMenu');
};

StreetBrawlerController.prototype.activateMenu = function(menu) {
	// console.log('activateMenu');
	this.streetBrawler.setGamepadMode('menu');
	this.activateController(menu, 'menu');
};

StreetBrawlerController.prototype.activateController = function(controller, mode) {
	// console.log('activeController');
	var me = this;
	clearTimeout(me.timeout);
	me.streetBrawler.setGamepadMode('');
	if (me.activeController) me.activeController.end();
	me.activeController = me[controller + 'Controller'];
	me.timeout = setTimeout(function() {
		me.streetBrawler.setGamepadMode(mode);
	}, 1000);
};