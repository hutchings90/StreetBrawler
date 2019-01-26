function BattleMenuController(view, utils, contentManager) {
	// console.log('BattleMenuController');
	MenuController.call(this, view, utils, contentManager, 'Battle');
}

BattleMenuController.prototype = Object.create(MenuController.prototype);
BattleMenuController.constructor = BattleMenuController;

BattleMenuController.prototype.start = function() {
	// console.log('start');
};