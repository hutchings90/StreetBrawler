/**
 * @file
 * Provides the controller for the Street Brawler game.
 */

function StreetBrawlerController(model, view, utils, contentManager) {
	// console.log('StreetBrawlerController');
	Controller.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.interval = null;
	this.mainMenuController = new MainMenuController(view, utils, contentManager);
	this.characterSelectController = new CharacterSelectController(view, utils, contentManager);
	this.characterDetailController = new CharacterDetailController(view, utils, contentManager);
	this.battleController = new BattleController(model, view, utils, contentManager);
	this.campaignController = new CampaignController(model, view, utils, contentManager, this.battleController);
	this.activateMainMenu();
	//where is this.streetBrawler defined?
	if (this.streetBrawler.activePlayerCount() > 0) this.start();
}

//initialises StreetBrawlerController.prototype, sets its own constructor?
StreetBrawlerController.prototype = Object.create(Controller.prototype);
StreetBrawlerController.constructor = StreetBrawlerController;

/*
Called from gamepadConnected if interval is null
When called, gamepad.index is provided, but seems to be missing from the parameters for start?
what is an interval?
setInterval is redirected to gameLoop
but where is interval actually set?
*/
StreetBrawlerController.prototype.start = function() {
	// console.log('start');
	var me = this;
	if (me.interval) me.clearInterval();
	me.interval = setInterval(function() {
		me.gameLoop();
	}, FRAME_MS);
};

/*
retrieves a timestamp, then calls readGamepads using that timestamp
*/
StreetBrawlerController.prototype.gameLoop = function() {
	// console.log('gameLoop');
	var ts = (new Date).getTime();
	this.readGamepads(ts);
};

/*
only called by gameLoop
@param ts = timestamp
calls getInputs and passes along ts. Passes returned inputs to activeController.nextFrame
I'm not certain what the last line does; the syntax is foreign to me
*/
StreetBrawlerController.prototype.readGamepads = function(ts) {
	// console.log('readGamepads');
	if (!this.activeController) return;
	navigator.getGamepads();
	var report = this.activeController.nextFrame(this.getInputs(ts));
	if (report) this[report.action](report.pi, report.params);
};

/*
Called only by gameLoop
checks for inputs from either player, and returns these
*/
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

/*
connects new gamepat to streetbrawler. calls start. 
*/
StreetBrawlerController.prototype.gamepadConnected = function(gamepad) {
	// console.log('gamepadConnected');
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadConnected(gamepad);
	if (!this.interval) this.start(gamepad.index);
};

/*
removes disconnected gamepad from streetBrawler. Calls clearInterval if there are no players.
*/
StreetBrawlerController.prototype.gamepadDisconnected = function(gamepad) {
	// console.log('gamepadDisconnected')
	if (gamepad.index > 1) return;
	this.streetBrawler.gamepadDisconnected(gamepad);
	if (this.streetBrawler.activePlayerCount() < 1) this.clearInterval();
};

/*
calls clearInterval with interval as a parameter, but clearInterval accepts no parameters?
sets interval to null
*/
StreetBrawlerController.prototype.clearInterval = function() {
	// console.log('clearInterval')
	clearInterval(this.interval);
	this.interval = null;
};

/*
activates main menu, then calls streetBrawler.allHumansPlaying
*/
StreetBrawlerController.prototype.activateMainMenu = function(pi) {
	// console.log('activateMainMenu');
	this.activateMenu('mainMenu', pi);
	this.streetBrawler.allHumansPlaying();
};

/*
Called by StreetBrawlerController.prototype.singlePlayer/..twoPlayer/..characterDetails
@param pi = player index, mode = a string defining the selection type
Sets the mode this.characterSelectController is in, activates characterSelect menu,
and passes pi along.
*/
StreetBrawlerController.prototype.activateCharacterSelect = function(pi, mode) {
	// console.log('activateCharacterSelect');
	this.characterSelectController.mode = mode;
	this.activateMenu('characterSelect', pi);
};

/*
Called only from StreetBrawlerController.prototype.campaign
@param pi = player index, mode = 'campaign'
sets the characterSelectController mode to 'campaign'
activates campaign menu
*/
StreetBrawlerController.prototype.activateCampaign = function(pi, mode) {
	// console.log('activateCampaign');
	this.characterSelectController.mode = mode;
	this.activateMenu('campaign', 'menu', pi);
};

/*
Called only by characterDetail
@param pi = player index
activates characterDetail menu using specified player index
*/
StreetBrawlerController.prototype.activateCharacterDetail = function(pi) {
	// console.log('activateCharacterDetail');
	this.activateMenu('characterDetail', pi);
};

/*
@param pi = player index, params contains characters
calls battleController.setCharacters using params.characters
calls activates battle controller
*/
StreetBrawlerController.prototype.activateBattle = function(pi, params) {
	// console.log('activateBattle');
	this.battleController.setCharacters(params.characters);
	this.activateController('battle', 'battle', pi);
};

/*
activates pause menu
*/
StreetBrawlerController.prototype.activatePauseMenu = function(pi) {
	// console.log('activatePauseMenu');
	this.activateMenu('pauseMenu', pi);
};
/*
@param menu = string containing menu name, pi = player index
activates menu by passing parameters to activateController
*/
StreetBrawlerController.prototype.activateMenu = function(menu, pi) {
	// console.log('activateMenu');
	this.activateController(menu, 'menu', pi);
};

/*
discards extra params and calls activateMainMenu
*/
StreetBrawlerController.prototype.mainMenu = function(pi, params) {
	// console.log('mainMenu');
	this.activateMainMenu(pi);
};

/**
 * Begins the character selection process for single player mode for the specified human player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 establishes taht otehr player is not playing, then calls activateCharacterSelect 'onePlayerBattle'
 */
StreetBrawlerController.prototype.singlePlayer = function(pi, params) {
	// console.log('singlePlayer');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayerIndex(pi));
	//where is this.activateCharacterSelect defined?
	this.activateCharacterSelect(pi, 'onePlayerBattle');
};

/**
 * Begins the campaign for the specified human player.
 * @param {number} i
 *   The index within this controller's streetBrawler model of the player who selected this option.
 establishes that other player is not playing,then calls activateCampaign
 */
StreetBrawlerController.prototype.campaign = function(pi, params) {
	// console.log('campaign');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayerIndex(pi));
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
 establishes that other player is not playing, calls activateCharacterSelect 'characterDetail'
 */
StreetBrawlerController.prototype.characterDetails = function(pi, params) {
	// console.log('characterDetails');
	this.streetBrawler.playerNotPlaying(this.getOtherPlayerIndex(pi));
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

/*
activates main menu, deactivates AI
*/
StreetBrawlerController.prototype.quitBattle = function(pi, params) {
	// console.log('quitBattle');
	this.activateMainMenu(pi);
	this.streetBrawler.deactivateAI();
};

/*
activates AI, then calls activateBattle, passing playier index parameter
*/
StreetBrawlerController.prototype.onePlayerBattle = function(pi, params) {
	// console.log('onePlayerBattle');
	this.streetBrawler.activateAI();
	this.activateBattle(pi, params);
};

/*
passes player index and params to activateBattle
*/
StreetBrawlerController.prototype.twoPlayerBattle = function(pi, params) {
	// console.log('twoPlayerBattle');
	this.activateBattle(pi, params);
};