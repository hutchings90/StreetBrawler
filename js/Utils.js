function Utils() {
	// console.log('Utils');
}

Utils.prototype.makeControllerVariableInput = function(controller, model) {
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
		}, 1000);
	};
};