/**
 * @file
 *
 * This simulates a gamepad. A gamepad (for our purposes) consists of 10
 * buttons and 2 axes. The axes have a value from -1 to 1 (inclusive).
 * Each button is an object with only one key. The key is a boolean called
 * "pressed".
 * Each axis is a number from -1 to 1, inclusive.
 * Each frame, the values of the axes and the buttons' "pressed" booleans
 * are checked and interpreted by the GamepadReader, GamepadStatus,
 * GamepadAxisStatus, GamepadButtonStatus and GamepadItemStatus. The
 * possible interpretations are start, end, idle repeat, prepeat and
 * postpeat (see GamepadItemStatus for explanation of states).
 *
 * Gamepad Layout
 *   TRIGGERS
 *    |L2|    (bottom)   |R2|
 *    |L1|     (top)     |R1|
 *
 *   FRONT
 *     ---                   ---
 *    / ^ \-----------------/ 1 \
 *   | < > | |SEL| |START| | 4 2 |
 *    \ V /-----------------\ 3 /
 *     ---                   ---
 *
 *
 *   Buttons
 *     Right button indixes, clockwise, starting from top: 0, 1, 2, 3
 *     L1: 4
 *     L2: 6
 *     R1: 5
 *     R2: 7
 *     Select: 8
 *     Start: 9
 *   Axes
 *     Horizontal
 *       Index: 0
 *       Left: -1
 *       Right: 1
 *     Vertical
 *       Index: 1
 *       Up: -1
 *       Down: 1
 */

/**
 * Constructor for instance of GamepadSimulator.
 */
function GamepadSimulator() {
	// console.log('GamepadSimulator');
	this.buttons = [ this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton(), this.makeButton() ];
	this.axes = [ 0, 0 ]; // Sets the character movement to Stopped.
}

/**
 * Factory for a button that simulates a real gampepad button.
 *
 * @return {object}
 *   An object that simulates a real gamepad button. It has one property, a
 *   boolean called "pressed".
 */
GamepadSimulator.prototype.makeButton = function() {
	// console.log('makeButton');
	return {
		pressed: false
	};
};

/**
 * Sets the specified button's "pressed" boolean to true, if
 * i is a valid button index.
 *
 * @param {number} i
 *   The index of the button to be pressed
 */
GamepadSimulator.prototype.pressButton = function(i) {
	// console.log('pressButton');
	if (!this.validateButton(i)) return;
	this.buttons[i].pressed = true;
};

/**
 * Sets the specified button's "pressed" boolean to false, if
 * i is a valid button index.
 *
 * @param {number} i
 *   The index of the button to be released
 */
GamepadSimulator.prototype.releaseButton = function(i) {
	// console.log('releaseButton');
	if (!this.validateButton(i)) return;
	this.buttons[i].pressed = false;
};

/**
 * Sets the specified axis to direction, if i is a valid axis index.
 *
 * @param {number} i
 *   The index of the axis to be set
 * @param {number} direction
 *   The direction of the axis
 */
GamepadSimulator.prototype.pressAxis = function(i, direction) {
	// console.log('pressAxis');
	if (!this.validateAxis(i)) return;
	this.axes[i] = direction;
};

/**
 * Sets the specified axis to 0, if i is a valid axis index.
 *
 * @param {number} i
 *   The index of the axis to be released
 */
GamepadSimulator.prototype.releaseAxis = function(i) {
	// console.log('releaseAxis');
	if (!this.validateAxis(i)) return;
	this.axes[i] = 0;
};

/**
 * Calls validate with parameters "buttons" and i, returns the result.
 *
 * @param {number} i
 *   The index of the button to be validated
 */
GamepadSimulator.prototype.validateButton = function(i) {
	// console.log('validateButton');
	return this.validate('buttons', i);
};

/**
 * Calls validate with parameters "axes" and i, returns the result.
 *
 * @param {number} i
 *   The index of the axis to be validated
 */
GamepadSimulator.prototype.validateAxis = function(i) {
	// console.log('validateAxis');
	return this.validate('axes', i);
};

/**
 * Logs an error message to the console if i is not a valid
 * index of prop. Calls isValid, returns the result.
 *
 * @param {string}
 *   The name of the property of the GamepadSimulator instance
 * @param {number} i
 *   The index within
 * @return True if i is a valid index of prop, false otherwise
 */
GamepadSimulator.prototype.validate = function(prop, i) {
	// console.log('validate');
	if (this.isValid(prop, i)) return true;
	console.log(prop + '[' + i + '] is not valid.');
	return false;
};

/**
 * Checks whether i is an index of prop
 *
 * @param {string}
 *   The name of the property of the GamepadSimulator instance
 * @param {number} i
 *   The index within prop
 * @return True if i is a valid index of prop, false otherwise
 */
GamepadSimulator.prototype.isValid = function(prop, i) {
	// console.log('isValid');
	return Math.floor(i) == i && i >= 0 && this[prop] && i < this[prop].length;
};