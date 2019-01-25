function CampaignController(model, view, utils, battleController) {
	// console.log('CampaignController');
	GamepadProcessingController.call(this, view, utils);
	utils.makeControllerVariableInput(this, model);
	this.overworldController = new OverworldController(model, view, utils);
	this.battleController = battleController;
	this.character = new LavaGolem();
}

CampaignController.prototype = Object.create(GamepadProcessingController.prototype);
CampaignController.constructor = BattleController;

CampaignController.prototype.show = function() {
	// console.log('show');
};