function MenuButtonStatus(restart) {
	// console.log('MenuButtonStatus');
	this.status = 'idle';
	this.frames = 0;
	this.restart = restart;
}

MenuButtonStatus.prototype.idle = function() {
	console.log('idle');
	this.updateStatus('idle');
};

MenuButtonStatus.prototype.end = function() {
	console.log('end');
	this.updateStatus('end');
};

MenuButtonStatus.prototype.repeat = function() {
	console.log('repeat');
	this.updateStatus('repeat', this.restart);
};

MenuButtonStatus.prototype.start = function() {
	console.log('start');
	this.updateStatus('start');
};

MenuButtonStatus.prototype.updateStatus = function(status, frames) {
	// console.log('updateStatus');
	this.status = status;
	this.frames = frames || 0;
};