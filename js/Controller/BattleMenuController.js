function BattleMenuController(view) {
	// console.log('BattleMenuController');
	MenuController.call(this, view, 'Battle');
}

BattleMenuController.prototype = Object.create(MenuController.prototype);
BattleMenuController.constructor = BattleMenuController;

BattleMenuController.prototype.start = function() {
	// console.log('start');
};