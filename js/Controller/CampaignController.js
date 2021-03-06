function CampaignController(model, view, utils, contentManager, battleController) {
	// console.log('CampaignController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.overworldController = new OverworldController(model, view, utils, contentManager);
	this.campaignMenuController = new CampaignMenuController(view, utils, contentManager);
	this.battleController = battleController;
}

CampaignController.prototype = Object.create(GamepadProcessingController.prototype);
CampaignController.constructor = BattleController;

CampaignController.prototype.nextFrame = function(inputs){
	if (!this.activeController) return;
	var report = this.activeController.nextFrame(inputs);
	if (report) return this[report.action](report.pi, report.params);
};

CampaignController.prototype.start = function() {
	this.loadOverworld();
};

CampaignController.prototype.show = function() {
	// console.log('show');
	//this.loadOverworld();
};

CampaignController.prototype.hide = function() {
	// console.log('hide');
	this.overworldController.hide();
};

//TODO: develop system to determine appropriate world, modify to generate procedurally
CampaignController.prototype.loadOverworld = function() {
	this.activateController('overworld','overworld',this.activator);
	var overworld = new TestWorld(this.contentManager,this.utils);
	this.overworldController.setOverworld (overworld);
};

CampaignController.prototype.activateBattle = function(pi, opponent) {
	// console.log('activateBattle');
	this.ai.character = opponent;
	this.ai.audio = this.contentManager.getBattleCharacterAudio(opponent);
	this.ai.visual = this.contentManager.getBattleCharacterVisuals(opponent);
	this.streetBrawler.activateAI();
	this.overworldController.character.character.resetHealth();	
	this.ai.character.resetHealth();
	this.battleController.setCharacters([this.overworldController.character,this.ai]);
	this.overworldController.hide();
	this.activateController('battle', 'battle', pi);
	this.contentManager.stopBackgroundMusic('voyage');
};

CampaignController.prototype.quitBattle = function(pi, params){
	this.overworldController.opponent = null;
	this.contentManager.playBackgroundMusic('voyage');
	this.activateController('overworld', 'battle', pi);
	this.streetBrawler.deactivateAI();
};

CampaignController.prototype.showCampaignMenu = function(pi, params) {
	// console.log('showBattleMenu');
	this.contentManager.pauseBackgroundMusic('voyage');
	this.contentManager.playSFX('pause');
	this.activateController('campaignMenu', 'menu', pi);
};

CampaignController.prototype.resume = function(pi, params) {
	// console.log('resume');
	this.contentManager.playBackgroundMusic('voyage');
	this.activateController('overworld', 'battle', pi);
};

CampaignController.prototype.quit = function(pi, params) {
	// console.log('quit');
	this.quitter = pi;
	return this.end(this.quitter);
};

CampaignController.prototype.end = function(pi) {
	// console.log('end');
	this.overworldController.end();
	this.hide();
	this.overworldController.setCharacter(null);
	this.overworldController.setOverworld(null);
	return this.createReport('quitCampaign', {}, pi);
};