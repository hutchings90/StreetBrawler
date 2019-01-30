function Utils() {
	// console.log('Utils');
}

Utils.prototype.makeControllerVariableInput = function(controller, model, controllerActivated) {
	// console.log('makeControllerVariableInput');
	controller.timeout = null;
	controller.streetBrawler = model;
	controller.activateController = function(controllerName, mode, pi) {
		// console.log('activateController');
		var me = this;
		var nextController = me[controllerName + 'Controller'];
		me.streetBrawler.setGamepadHalted(true);
		nextController.show();
		me.activeController = null;
		clearTimeout(me.timeout);
		me.timeout = setTimeout(function() {
			me.activeController = nextController;
			me.activeController.activator = pi;
			me.activeController.start();
			me.streetBrawler.setGamepadHalted(false);
			me.streetBrawler.setGamepadMode(mode);
			me.controllerActivated();
		}, 1000);
	};
	controller.controllerActivated = controllerActivated || function() {
		// console.log('controllerActivated');
	};
};