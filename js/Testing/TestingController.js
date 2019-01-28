function TestingController(model) {
	// console.log('TestingController');
	GamepadSimulatorController.call(this, model);
}

TestingController.prototype = Object.create(GamepadSimulatorController);
TestingController.constructor = TestingController;