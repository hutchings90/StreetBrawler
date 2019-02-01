/**
 * @file
 *
 * This simulates a gamepad. A gamepad (for our purposes) consists of 10
 * buttons and 2 axes. The axes have a value from -1 to 1 (inclusive). The
 * buttons are objects with only one key. The key is a boolean called
 * pressed. Each frame, pressed is checked and interpreted by the
 * GamepadReader, GamepadStatus, GamepadAxisStatus, GamepadButtonStatus
 * and GamepadItemStatus. The possible interpretations are start, end, idle
 * repeat, prepeat and postpeat.
 */

function GamepadSimulator() {
	// console.log('GamepadSimulator');
	this.buttons = [ this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button(), this.button() ];
	this.axes = [ 0, 0 ];
}

GamepadSimulator.prototype.button = function() {
	// console.log('button');
	return {
		pressed: false
	};
};