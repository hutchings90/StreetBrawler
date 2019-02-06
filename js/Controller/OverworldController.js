function OverworldController(model, view, utils, contentManager) {
	console.log('OverworldController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.overworld = this.view.getOverworld();
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;

OverworldController.prototype.startBattle = function(params){};

OverworldController.prototype.interact = function(params){};

OverworldController.prototype.left = function (params){};

OverworldController.prototype.right = function (params){};

OverworldController.prototype.up = function (params){};

OverworldController.prototype.down = function (params){};

/*
The map information will need to be stored and processed somehow. 
This function loads and manages the map info
*/
OverworldController.prototype.loadMap = function (params){};