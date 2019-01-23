function CampaignController(view, battleController) {
	// console.log('CampaignController');
	GamepadProcessingController.call(this, view);
	this.overworldController = new OverworldController(this.view);
	this.battleController = battleController;
	this.character = new LavaGolem();
}

CampaignController.prototype = Object.create(GamepadProcessingController.prototype);
CampaignController.constructor = BattleController;

CampaignController.prototype.show = function() {
	// console.log('show');
};