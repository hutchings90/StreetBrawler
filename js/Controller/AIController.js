function AIController(model) {
	// console.log('AIController');
	GamepadSimulatorController.call(this, model);
}

AIController.prototype = Object.create(GamepadSimulatorController);
AIController.constructor = AIController;