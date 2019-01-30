function GamepadButtonStatus() {
	// console.log('GamepadButtonStatus');
	GamepadItemStatus.call(this);
}

GamepadButtonStatus.prototype = Object.create(GamepadItemStatus.prototype);
GamepadButtonStatus.constructor = GamepadButtonStatus;