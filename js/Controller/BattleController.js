function BattleController(view) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view);
	this.battleCharacterController = new BattleCharacterController(view);
	this.battleMenuController = new BattleMenuController(view);
	this.battleAreaContainer = this.view.getBattleAreaContainer();
	this.battleArea = this.view.getBattleArea();
	this.battleTimer = this.view.getBattleTimer();
	this.activeController = this.battleCharacterController;
}

BattleController.prototype = Object.create(GamepadProcessingController.prototype);
BattleController.constructor = BattleController;

BattleController.prototype.start = function() {
	// console.log('start');
	this.activeController = this.battleCharacterController;
};

BattleController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	this.activeController.processInputs(status, pi);
};

BattleController.prototype.end = function(pi) {
	// console.log('end');
	this.hide();
	this.clearTimer();
	return {
		action: 'quitBattle',
		params: {}
	};
};

BattleController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.battleAreaContainer);
};

BattleController.prototype.clearTimer = function() {
	// console.log('clearTimer');
	this.view.clearTimer(this.battleTimer);
	this.view.setContents(this.battleTimer, 99);
};