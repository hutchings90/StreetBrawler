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
	// this does not refer to this instance of AIController in the inverval
	var me = this;
	me.ai.playing = true;
	me.interval = setInterval(function() { // IPlayer decision making.
		me.makeRandomDecision();
	}, me.ai.getDifficultyFrequency());
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

/**
 * private
 * Determines which buttons/axes should be pressed/released.
 * 
 * Since the AI makes a decision depending on the amount of time passed instead of frames,
 * we have to consider that every button/axis pressed will be pressed for a certain amount of time.
 * So far, jumping, grabbing, and attacking (all moves that should only execute ONCE per button press),
 * will be released the very next time this funciton is called. That way the AI isn't always jumping 
 * until the AI can make its next decision.
 */
AIController.prototype.makeRandomDecision = function() {
	var gamepad = this.ai.gamepadReader.gamepad;
	var pickHorizontalMovement = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	// var pickVerticalMovement = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	var flipToNeg = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	var jumpOrWalk = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1

	if (flipToNeg == 0) { pickHorizontalMovement *= -1; }
	// else if (flipToNeg == 1) { pickVerticalMovement *= -1; }

	if (this.ai.isJumping) { // Only make the AI jump once for one button input
		gamepad.releaseAxis(VERTICLE_AXIS); // Stop moving
		this.ai.toggleJumping();
		jumpOrWalk = 0; // If the AI just jumped, don't let it jump again but make it walk if it does an action.
	}
	if (this.ai.canDoMove()) {
		if (this.ai.isWalking) {
			gamepad.releaseAxis(HORIZONTAL_AXIS); // Stop moving
			this.ai.toggleWalking();
		}
		else if (this.ai.isJumping) {
			gamepad.releaseAxis(VERTICLE_AXIS); // Stop moving
			this.ai.toggleJumping();
		}
		else { // If the AI isn't doing anything, make it do something
			if (jumpOrWalk == 0) { // AI walks
				gamepad.pressAxis(HORIZONTAL_AXIS, pickHorizontalMovement);
				this.ai.toggleWalking();
			}
			else { // AI jumps
				gamepad.pressAxis(VERTICLE_AXIS, MOVE_JUMP);
				this.ai.toggleJumping();
			}
		}
		this.ai.resetFrequency(); // Always reset the frequency when an action is done
	}
	this.ai.incrementFrequency(); // Always increment the frequency
};