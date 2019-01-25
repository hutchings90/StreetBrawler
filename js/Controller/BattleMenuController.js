function BattleMenuController(view, utils) {
	// console.log('BattleMenuController');
	MenuController.call(this, view, utils, 'Battle');
}

BattleMenuController.prototype = Object.create(MenuController.prototype);
BattleMenuController.constructor = BattleMenuController;

BattleMenuController.prototype.start = function() {
	// console.log('start');
};