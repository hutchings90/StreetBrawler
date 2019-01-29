/**
 * @file
 * Provides AI decision making.
 */

/**
 * Holds the AI model and intervals used for AIPlayers
 * @param {AIPlayer} ai
 *   The AIPlayer that will be controlled
 */
function AIController(ai) {
	// console.log('AIController');
	this.ai = ai;
	this.interval = null;
}

/**
 * private
 * Starts an interval for deciding how to control the AIPlayer
 */
AIController.prototype.activate = function() {
	// console.log('activate');
	this.ai.playing = true;
	this.interval = setInterval(function() {
		// TODO: Implement AIPlayer decision making.
	}, this.ai.getDifficultyFrequency());
};

/**
 * private
 * Stops the interval for deciding how to control the AIPlayer
 */
AIController.prototype.deactivate = function() {
	// console.log('deactivate');
	this.ai.playing = false;
	clearInterval(this.interval);
	this.interval = null;
};