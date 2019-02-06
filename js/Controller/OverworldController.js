function OverworldController(model, view, utils, contentManager) {
	console.log('OverworldController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.overworld = this.view.getOverworld();
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;