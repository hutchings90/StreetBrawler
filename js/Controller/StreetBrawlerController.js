/**
 * @file
 * Provides the controller for the Street Brawler game.
 */

function StreetBrawlerController(model, view) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view);
	this.FRAME_MS = 20;
	this.interval = null;
	this.timeout = null;
	this.streetBrawler = model;
	this.mainMenuController = new MainMenuController(view);
	this.characterSelectController = new CharacterSelectController(view);
	this.characterDetailController = new CharacterDetailController(view);
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
			var action = this.activeController.processInputs(player.gamepadReader.read(ts));
			if (action) {
				this[action.action](i, action.params);
				return;
			}
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

StreetBrawlerController.prototype.activateCharacterSelect = function(i) {
	// console.log('activateCharacterSelect');
	this.activateMenu('characterSelect', i);
};

StreetBrawlerController.prototype.activateCharacterDetail = function(i) {
	// console.log('activateCharacterDetail');
	this.activateMenu('characterDetail', i);
};

StreetBrawlerController.prototype.activateBattle = function(i) {
	// console.log('activateBattle');
	this.activateController('battle', 'battle', i);
};

StreetBrawlerController.prototype.activatePauseMenu = function(i) {
	// console.log('activatePauseMenu');
	this.activateMenu('pauseMenu', i);
};

StreetBrawlerController.prototype.activateMenu = function(menu, i) {
	// console.log('activateMenu');
	this.activateController(menu, 'menu', i);
};

StreetBrawlerController.prototype.activateController = function(controller, mode, i) {
	// console.log('activateController');
	var me = this;
	clearTimeout(me.timeout);
	me.streetBrawler.setGamepadMode('');
	if (me.activeController) me.activeController.end();
	me.activeController = me[controller + 'Controller'];
	me.activeController.activator = i;
	me.activeController.start();
	me.timeout = setTimeout(function() {
		me.streetBrawler.setGamepadMode(mode);
	}, 1000);
};

/**
 * Begins the single player mode for the specified human player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.singlePlayer = function(i, params) {
	// console.log('singlePlayer');
	this.activateBattle(i);
};

/**
 * Begins the two player mode for the both human players.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.twoPlayer = function(i, params) {
	// console.log('twoPlayer');
	this.activateBattle(i);
};

/**
 * Begins the character details process for the specified player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.characterDetails = function(i, params) {
	// console.log('characterDetail');
	this.activateCharacterSelect(i);
};

StreetBrawlerController.prototype.quitBattle = function(i, params) {
	// console.log('quitBattle');
	this.activateMainMenu();
};