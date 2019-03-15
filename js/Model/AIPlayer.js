/**
 * @file
 * Provides AIPlayer model used by AIController and StreetBrawlerController
 */

// const variables to avoid confusion
var HORIZONTAL_AXIS = 0;
var VERTICLE_AXIS = 1; 
var MOVE_LEFT = -1;
var MOVE_RIGHT = 1;
var MOVE_STOP = 0;
var MOVE_JUMP = -1;
var MOVE_CROUCH = 1;

// Numbers are the index of the action on the controller
var ATTACK_JAB = 0;
var ATTACK_HAYMAKER = 1;
var ATTACK_HIGHKICK = 2;
var ATTACK_LOWKICK = 3;
var BLOCK = 4;
var GRAB = 6;


// Each variable correlates to an index in DIFFICULTY_FREQUENCIES
var EASY = 0;
var MEDIUM = 1;
var HARD = 2;

/**
 * Holds the data of an AIPlayer
 */
function AIPlayer() {
	// console.log('AIPlayer');

	 // Use the same Player variables but use a GamepadSimulator and set isAI to true;
	Player.call(this, new GamepadSimulator(), true);
	this.DIFFICULTY_FREQUENCIES = [ 38, 27, 20 ]; // These are milliseconds, NOT frames
	this.difficulty = EASY; // Default to easy
	this.playing = false; 

	this.currentFrequency = 0; // This will help measure when the AI should make a move
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

/**
 * This determines if the AI can do a move if the right amount of time has past.
 * Returns true if the AI can make a move.
 * Returns false if the AI can't make a move yet.
 */
AIPlayer.prototype.canDoMove = function() {
	if (this.currentFrequency == this.DIFFICULTY_FREQUENCIES[this.difficulty]) {
		return true; // The AI can do another action
	}
	return false; // The AI can't do another action
}
