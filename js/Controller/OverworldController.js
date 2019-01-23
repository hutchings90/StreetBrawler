function OverworldController(view) {
	GamepadProcessingController.call(this, view);
	this.overworld = this.view.getOverworld();
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;