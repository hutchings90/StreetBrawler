/**
 * @file
 * Provides the controller for the Street Brawler game.
 */

function StreetBrawlerController(model, view) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view);
	this.interval = null;
	this.timeout = null;
	this.streetBrawler = model;
	this.mainMenuController = new MainMenuController(view);
	this.characterSelectController = new CharacterSelectController(view);
	this.characterDetailController = new CharacterDetailController(view);
	this.battleController = new BattleController(view);
	this.campaignController = new CampaignController(view, this.battleController);
	this.activateMainMenu();
	if (this.streetBrawler.activePlayerCount() > 0) this.start();
}

StreetBrawlerController.prototype = Object.create(Controller.prototype);
StreetBrawlerController.constructor = StreetBrawlerController;

StreetBrawlerController.prototype.start = function() {
	// console.log('start');
	var me = this;
	if (me.interval) me.clearInterval();
	me.interval = setInterval(function() {
		me.gameLoop();
	}, FRAME_MS);
};

StreetBrawlerController.prototype.gameLoop = function() {
	// console.log('gameLoop');
	var ts = (new Date).getTime();
	this.readGamepads(ts);
};

StreetBrawlerController.prototype.readGamepads = function(ts) {
	// console.log('readGamepads');
	if (!this.activeController) return;
	navigator.getGamepads();
	var report = this.activeController.nextFrame(this.getInputs(ts));
	if (report) this[report.action](report.pi, report.params);
};

StreetBrawlerController.prototype.getInputs = function(ts) {
	// console.log('getInputs');
	var inputs = [];
	var players = this.streetBrawler.players;
	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		if (player.isActive()) inputs.push({
			status: player.gamepadReader.read(ts),
			pi: i
		});
	}
	return inputs;
};

StreetBrawlerController.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadConnected(gamepad);
	if (!this.interval) this.start(gamepad.index);
};

StreetBrawlerController.prototype.gamepadDisconnected = function(gamepad) {
	// console.log('gamepadDisconnected')
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadDisconnected(gamepad);
	if (this.streetBrawler.activePlayerCount() < 1) this.clearInterval();
};

StreetBrawlerController.prototype.clearInterval = function() {
	// console.log('clearInterval')
	clearInterval(this.interval);
	this.interval = null;
};

StreetBrawlerController.prototype.activateMainMenu = function(pi) {
	// console.log('activateMainMenu');
	this.activateMenu('mainMenu', pi);
	this.streetBrawler.allPlaying();
};

StreetBrawlerController.prototype.activateCharacterSelect = function(pi, mode) {
	// console.log('activateCharacterSelect');
	this.characterSelectController.mode = mode;
	this.activateMenu('characterSelect', pi);
};

StreetBrawlerController.prototype.activateCampaign = function(pi, mode) {
	// console.log('activateCampaign');
	this.characterSelectController.mode = mode;
	this.activateMenu('campaign', 'menu', pi);
};

StreetBrawlerController.prototype.activateCharacterDetail = function(pi) {
	// console.log('activateCharacterDetail');
	this.activateMenu('characterDetail', pi);
};

StreetBrawlerController.prototype.activateBattle = function(pi) {
	// console.log('activateBattle');
	this.activateController('battle', 'battle', pi);
};

StreetBrawlerController.prototype.activatePauseMenu = function(pi) {
	// console.log('activatePauseMenu');
	this.activateMenu('pauseMenu', pi);
};

StreetBrawlerController.prototype.activateMenu = function(menu, pi) {
	// console.log('activateMenu');
	this.activateController(menu, 'menu', pi);
};

StreetBrawlerController.prototype.activateController = function(controller, mode, pi) {
	// console.log('activateController');
	var me = this;
	var nextController = me[controller + 'Controller'];
	me.streetBrawler.setGamepadMode('');
	nextController.show();
	clearTimeout(me.timeout);
	me.timeout = setTimeout(function() {
		me.activeController = nextController;
		me.activeController.activator = pi;
		me.activeController.start();
		me.streetBrawler.setGamepadMode(mode);
	}, 1000);
};

StreetBrawlerController.prototype.mainMenu = function(pi, params) {
	// console.log('mainMenu');
	this.activateMainMenu(pi);
};

/**
 * Begins the character selection process for single player mode for the specified human player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.singlePlayer = function(pi, params) {
	// console.log('singlePlayer');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayer(pi));
	this.activateCharacterSelect(pi, 'onePlayerBattle');
};

/**
 * Begins the campaign for the specified human player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.campaign = function(pi, params) {
	// console.log('campaign');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayer(pi));
	this.activateCampaign(pi, 'campaign');
};

/**
 * Begins the character selection process for two player mode for the both human players.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.twoPlayer = function(pi, params) {
	// console.log('twoPlayer');
	this.activateCharacterSelect(pi, 'twoPlayerBattle');
};

/**
 * Begins the character selection process for character details for the specified player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.characterDetails = function(pi, params) {
	// console.log('characterDetails');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayer(pi));
	this.activateCharacterSelect(pi, 'characterDetail');
};

/**
 * Begins the character detail for the specified player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 */
StreetBrawlerController.prototype.characterDetail = function(pi, params) {
	// console.log('characterDetail');
	this.activateCharacterDetail(pi);
};

StreetBrawlerController.prototype.quitBattle = function(pi, params) {
	// console.log('quitBattle');
	this.activateMainMenu(pi);
};

StreetBrawlerController.prototype.onePlayerBattle = function() {
	// console.log('onePlayerBattle');
	this.activateBattle();
};

StreetBrawlerController.prototype.twoPlayerBattle = function() {
	// console.log('twoPlayerBattle');
	this.activateBattle();
};