function MenuStatus(restart) {
	// console.log('MenuStatus');
	this.REPEAT = 16;
	this.RESTART = 8;
	this.status = 'idle';
	this.frames = 0;
	this.restart = restart;
}

MenuStatus.prototype.idle = function() {
	// console.log('idle');
	this.updateStatus('idle');
};

MenuStatus.prototype.end = function() {
	// console.log('end');
	this.updateStatus('end');
};

MenuStatus.prototype.repeat = function() {
	// console.log('repeat');
	this.updateStatus('repeat', this.restart);
};

MenuStatus.prototype.prepeat = function() {
	// console.log('prepeat');
	this.updateStatus('prepeat', this.restart);
};

MenuStatus.prototype.start = function() {
	// console.log('start');
	this.updateStatus('start');
};

MenuStatus.prototype.processNoPress = function() {
	// console.log('processNoPress');
	if (this.status == 'end') this.idle();
	else if (this.status != 'idle') this.end();
};

MenuStatus.prototype.updateStatus = function(status, frames) {
	// console.log('updateStatus');
	this.status = status;
	this.frames = frames || 0;
};

MenuStatus.prototype.update = function(pressed) {
	// console.log('update');
	if (!pressed) this.processNoPress();
	else if (this.status == 'idle') this.start();
	else if (++this.frames == this.REPEAT) this.repeat();
	else if (this.status != 'prepeat') this.prepeat();
};