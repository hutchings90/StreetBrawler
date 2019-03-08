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
	this.gamepad = new GamepadSimulator();
}

// Created functions for ease when calling AI actions
AIController.prototype.jump = function(gamepad) {
	gamepad.pressAxis(VERTICLE_AXIS, MOVE_JUMP);
}

AIController.prototype.crouch = function(gamepad) {
	gamepad.pressAxis(VERTICLE_AXIS, MOVE_CROUCH);
}

AIController.prototype.walkLeft = function(gamepad) {
	gamepad.pressAxis(HORIZONTAL_AXIS, MOVE_LEFT);
}

AIController.prototype.walkRight = function(gamepad) {
	gamepad.pressAxis(HORIZONTAL_AXIS, MOVE_RIGHT);
}

AIController.prototype.stop = function(gamepad) {
	gamepad.pressAxis(VERTICLE_AXIS, MOVE_STOP);
	gamepad.pressAxis(HORIZONTAL_AXIS, MOVE_STOP);
}

// TODO: implement attack functions


/**
 * private
 * Determines what move the AI will make according to the Difficulty Frequency
 * @param gamepad
 * 	 Is the gamepad simulator that we're manipulating
 */
AIController.prototype.pickMove = function(gamepad) {
	this.gamepad.pressAxis(VERTICLE_AXIS, MOVE_JUMP);
};

/**
 * private
 * Starts an interval for deciding how to control the AIPlayer
 */
AIController.prototype.activate = function() {
	// console.log('AI activate');
	this.ai.playing = true;
	// this.interval = this.pickMove(this.gamepad), this.ai.getDifficultyFrequency();
	this.interval = this.ai.getDifficultyFrequency();
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