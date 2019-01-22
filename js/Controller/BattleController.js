function BattleController(view) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view);
	this.battleAreaContainer = this.view.getBattleAreaContainer();
	this.battleArea = this.view.getBattleArea();
}

BattleController.prototype = Object.create(GamepadProcessingController.prototype);
BattleController.constructor = BattleController;

BattleController.prototype.start = function() {
	// console.log('start');
};

BattleController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	if (!status) return null;
	if (this.menuButtonsPressed(status.buttons, [ 9 ])) {
		console.log(9);
	}
};

BattleController.prototype.end = function(pi) {
	// console.log('end');
	return {
		action: 'quitBattle',
		params: {}
	};
};

BattleController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.battleAreaContainer);
};