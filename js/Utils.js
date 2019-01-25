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
		me.streetBrawler.setGamepadMode('');
		nextController.show();
		clearTimeout(me.timeout);
		me.timeout = setTimeout(function() {
			me.activeController = nextController;
			me.activeController.activator = pi;
			me.activeController.start();
			me.streetBrawler.setGamepadMode(mode);
		}, 1000);
	};
};