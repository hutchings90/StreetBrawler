function CreditsController(view, utils, contentManager) {
	// console.log('CreditsController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	this.credits = this.view.getCredits();
	this.nextFrame = null;
}

CreditsController.prototype = Object.create(GamepadProcessingController.prototype);
CreditsController.constructor = CreditsController;

CreditsController.prototype.start = function(activator) {
	// console.log('start');
	this.nextFrame = this.processingFrame;
};

CreditsController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.credits);
};

CreditsController.prototype.processingFrame = function(inputs) {
	// console.log('processingFrame');
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
	this.endFrame = 0;
	this.nextFrame = null;
	this.view.hide(this.credits);
	return this.createReport('mainMenu', {}, this.activator);
};