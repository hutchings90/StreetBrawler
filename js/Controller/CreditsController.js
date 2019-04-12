function CreditsController(view, utils, contentManager) {
	// console.log('CreditsController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	this.credits = this.view.getCredits();
}

CreditsController.prototype = Object.create(GamepadProcessingController.prototype);
CreditsController.constructor = CreditsController;

CreditsController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.credits);
};

CreditsController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.buttonPressed(status.buttons[2])) return this.end();
	}
};

CreditsController.prototype.end = function() {
	// console.log('end');
	this.contentManager.playSFX('menuBack');
	this.view.hide(this.credits);
	return this.createReport('mainMenu', {}, this.activator);
};