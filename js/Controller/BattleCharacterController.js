function BattleCharacterController(view) {
	// console.log('BattleCharacterController');
	GamepadProcessingController.call(this, view);
}

BattleCharacterController.prototype = Object.create(GamepadProcessingController.prototype);
BattleCharacterController.constructor = BattleCharacterController;

BattleCharacterController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	if (!status) return null;
	if (this.menuButtonsPressed(status.buttons, [ 9 ])) {
		console.log(9);
	}
};