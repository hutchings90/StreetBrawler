function BattleCharacterController(view) {
	// console.log('BattleCharacterController');
	GamepadProcessingController.call(this, view);
}

BattleCharacterController.prototype = Object.create(GamepadProcessingController.prototype);
BattleCharacterController.constructor = BattleCharacterController;

BattleCharacterController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.menuButtonsPressed(status.buttons, [ 9 ])) {
			console.log(9);
		}
	}
};