/**
 * @file
 * Provides AIPlayer model used by AIController and StreetBrawlerController
 */

// Each variable correlates to an index in DIFFICULTY_FREQUENCIES
var EASY = 0;
var MEDIUM = 1;
var HARD = 2;

/**
 * Holds the data of an AIPlayer
 */
function AIPlayer(gamepad) {
	// console.log('AIPlayer');

	 // Use the same Player variables but use a GamepadSimulator and set isAI to true;
	Player.call(this, gamepad, true);
	this.DIFFICULTY_FREQUENCIES = [ 100, 75, 25 ]; // These are milliseconds, NOT frames
	this.difficulty = HARD; // Default to easy
	this.playing = false; 
	if (!gamepad) this.activeGamepad = false;
	else this.activeGamepad = true;

	this.currentFrequency = 0; // This will help measure when the AI should make a move
	this.isWalking = false;
	this.isJumping = false;
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

AIPlayer.prototype.getFrequency = function() {
	return this.currentFrequency;
}

AIPlayer.prototype.resetFrequency = function() {
	this.currentFrequency = 0; // Reset the count to 0
}

AIPlayer.prototype.incrementFrequency = function() {
	this.currentFrequency += 1;
}

AIPlayer.prototype.canDoMove = function() {
	if (this.currentFrequency == this.DIFFICULTY_FREQUENCIES[this.difficulty]) {
		return true; // The AI can do another action
	}
	return false; // The AI can't do another action
}

// Changes the boolean to see if the AI is walking or not
// To be used in deciding what to do next
AIPlayer.prototype.toggleWalking = function() {
	this.isWalking = !this.isWalking;
}

// Changes the boolean to see if the AI is walking or not
// To be used in deciding what to do next
AIPlayer.prototype.toggleJumping = function() {
	this.isJumping = !this.isJumping;
}