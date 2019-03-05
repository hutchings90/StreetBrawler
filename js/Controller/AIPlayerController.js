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
	me.interval = setInterval(function() {
		// TODO: Implement AIPlayer decision making.
		me.makeDecisions();
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
 * Determines which buttons/axes should be pressed/released
 */
AIController.prototype.makeDecisions = function() {
	console.log('makeDecisions');
	var gamepad = this.ai.gamepadReader.gamepad;
	gamepad.clear();
	// 50% chance that a button will be pressed
	if (Math.floor((Math.random() * 2)) == 1) {
		// The last four buttons of a GamepadSimulator are there to
		//   match the layout of a real gamepad. They should not be
		//   used by the AIPlayer.
		gamepad.pressButton(Math.floor(Math.random() * (gamepad.buttons.length - 4)));
	}
	else {
		// 50% chance that the horizontal axis will be pressed
		if (Math.floor((Math.random() * 2)) == 1) {
			// 50/50 left/right
			gamepad.pressAxis(0, Math.floor((Math.random() * 2)) == 1 ? -1 : 1);
		}
		// 50% chance that the vertical axis will be pressed
		if (Math.floor((Math.random() * 2)) == 1) {
			// 50/50 up/down
			gamepad.pressAxis(1, Math.floor((Math.random() * 2)) == 1 ? -1 : 1);
		}
	}
};