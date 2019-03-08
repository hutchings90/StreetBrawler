/**
 * @file
 * Provides AIPlayer model used by AIController and StreetBrawlerController
 */

/**
 * Holds the data of an AIPlayer
 */
function AIPlayer() {
	// console.log('AIPlayer');
	Player.call(this, new GamepadSimulator(), true);
	this.DIFFICULTY_FREQUENCIES = [ 500, 350, 250 ];
	this.playing = false;
	this.difficulty = 0; // Will probably use an enum for difficulty setting. 
}

AIPlayer.prototype = Object.create(Player.prototype);
AIPlayer.constructor = AIPlayer;

/**
 * Gets AIPlayer's difficulty frequency.
 * @return
 *   The number of milliseconds between each AI decision
 */
AIPlayer.prototype.getDifficultyFrequency = function() {
	// console.log('getDifficultyFrequency');
	return this.DIFFICULTY_FREQUENCIES[this.difficulty];
};