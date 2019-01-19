function Controller(view) {
	// console.log('Controller');
	this.view = view;
	this.activator = null;
}

Controller.prototype.start = function() {
	// console.log('start');
};

Controller.prototype.end = function() {
	// console.log('end');
};

Controller.prototype.getOtherPlayer = function(i) {
	// console.log('getOtherPlayer');
	return (i + 1) & 1;
};

Controller.prototype.getNonActivator = function(i) {
	// console.log('getNonActivator');
	return this.getOtherPlayer(this.activator);
};