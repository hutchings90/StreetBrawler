/**
 * @file
 * Provides AI.
 */

/**
 * Holds the AI model and intervals used for AIPlayers
 * @param {AI}
 *   model defined by AI.js
 */
function AIController(model) {
	// console.log('AIController');
	GamepadSimulatorController.call(this, model);
	this.initIntervals();
}

AIController.prototype = Object.create(GamepadSimulatorController);
AIController.constructor = AIController;

/**
 * private
 * Sets an interval to null for each AIPlayer.
 */
AIController.prototype.initIntervals = function() {
	// console.log('initIntervals');
	this.intervals = [];
	var players = this.getAIPlayers();
	for (var i in players.length) {
		this.intervals.push(null);
	}
};

/**
 * Starts an interval for each AIPlayer with frequency == AIPlayer.getGifficultyFrequency()
 */
AIController.prototype.startPlaying = function() {
	// console.log('startPlaying');
	this.initIntervals();
	var players = this.getAIPlayers();
	for (var i in players.length) {
		this.startPlayer(players[i], i);
	}
};

/**
 * private
 * Starts an interval for a given AIPlayer with frequency == AIPlayer.getGifficultyFrequency()
 * TODO: Implement AIPlayer decision making.
 * @param {AIPlayer} player
 *   Player to start playing.
 * @param {int} pi
 *   The index of the player within the list returned by this.getAIPlayers(). Should match index within this.interval.
 */
AIController.prototype.startPlayer = function(player, pi) {
	// console.log('startPlayer');
	this.stopPlayer(pi);
	this.intervals[pi] = setInterval(function() {
		;
	}, player.getDifficultyFrequency());
};

/**
 * Stops each AIPlayer's interval
 */
AIController.prototype.stopPlaying = function() {
	// console.log('stopPlaying');
	var players = this.getAIPlayers();
	for (var i in players.length) {
		this.stopPlayer(i);
	}
};

/**
 * private
 * Stops a given AIPlayer's interval
 * @param {int} pi
 *   The index of the player within the list returned by this.getAIPlayers(). Should match index within this.interval.
 */
AIController.prototype.stopPlayer = function(pi) {
	// console.log('stopPlayer');
	clearInterval(this.intervals[pi]);
	this.intervals[pi] = null;
};

/**
 * private
 * Lists all AIPlayers.
 * @return
 *   A list of AIPlayers
 */
AIController.prototype.getAIPlayers = function() {
	// console.log('getAIPlayers');
	var ais = [];
	var players = this.getPlayers();
	for (var i in players) {
		var player = players[i];
		if (player.isAI) ais.push(player);
	}
	return ais;
};

/**
 * private
 * Lists all Players (both Human and AI).
 * @return
 *   A list of all Players
 */
AIController.prototype.getPlayers = function() {
	// console.log('getPlayers');
	return this.model.game.streetBrawler.players;
};