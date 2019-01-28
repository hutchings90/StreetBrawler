function Controller(view, utils, contentManager) {
	// console.log('Controller');
	this.view = view;
	this.utils = utils;
	this.contentManager = contentManager;
	this.activator = null;
}

Controller.prototype.show = function() {
	// console.log('show');
};

Controller.prototype.start = function() {
	// console.log('start');
};

Controller.prototype.end = function() {
	// console.log('end');
	return {
		action: 'mainMenu',
		pi: pi,
		params: {}
	}
};

Controller.prototype.getOtherPlayerIndex = function(i) {
	// console.log('getOtherPlayerIndex');
	return (i + 1) & 1;
};

Controller.prototype.getNonActivator = function(i) {
	// console.log('getNonActivator');
	return this.getOtherPlayerIndex(this.activator);
};