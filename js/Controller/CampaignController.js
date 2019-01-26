function CampaignController(model, view, utils, contentManager, battleController) {
	// console.log('CampaignController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.overworldController = new OverworldController(model, view, utils, contentManager);
	this.battleController = battleController;
	this.character = new LavaGolem();
}

CampaignController.prototype = Object.create(GamepadProcessingController.prototype);
CampaignController.constructor = BattleController;

CampaignController.prototype.show = function() {
	// console.log('show');
};