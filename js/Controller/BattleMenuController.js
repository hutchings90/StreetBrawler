function BattleMenuController(view, utils, contentManager) {
	// console.log('BattleMenuController');
	MenuController.call(this, view, utils, contentManager, 'Battle');
}

BattleMenuController.prototype = Object.create(MenuController.prototype);
BattleMenuController.constructor = BattleMenuController;

BattleMenuController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.trackEndFrames()) return this.end(pi);
		if (this.buttonPressed(status.buttons[1])) this.startEnd(pi);
		if (this.buttonPressed(status.buttons[2])) {
			this.contentManager.playSFX(this.backSFX);
			return this.end(pi);
		}
		this.moveVertical(this.verticalDirection(status.axes));
	}
};

BattleMenuController.prototype.end = function(pi) {
	// console.log('end');
	var ret = this.createReport('resume', {}, pi);
	if (this.view.hasSelectedOption(this.options)) ret.action = this.view.getOptionAction(this.options[this.i]);
	this.hide();
	this.clearAllOptions();
	return ret;
};