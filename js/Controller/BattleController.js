function BattleController(view) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view);
	this.battleArea = this.view.getElement('#battle-area');
}

BattleController.prototype = Object.create(GamepadProcessingController.prototype);
BattleController.constructor = BattleController;

BattleController.prototype.start = function() {
	// console.log('start');
};

BattleController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	return {
		action: 'quitBattle',
		params: {}
	};
};