function GamepadSimulator() {
	// console.log('GamepadSimulator');
	this.buttons = [ this.button() ];
	this.axes = [ 0, 0 ];
}

GamepadSimulator.prototype.button = function() {
	return {
		pressed: false,
		value: 0
	};
};