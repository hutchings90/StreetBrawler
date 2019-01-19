function MenuStatus() {
	// console.log('MenuStatus');
	this.REPEAT = 18;
	this.RESTART = 10;
	this.status = 'idle';
	this.frames = 0;
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
	this.updateStatus('repeat');
};

MenuStatus.prototype.prepeat = function() {
	// console.log('prepeat');
	this.updateStatus('prepeat');
};

MenuStatus.prototype.postpeat = function() {
	// console.log('postpeat');
	this.updateStatus('postpeat', this.RESTART);
};

MenuStatus.prototype.start = function() {
	// console.log('start');
	this.updateStatus('start');
};

MenuStatus.prototype.processNoPress = function(pi) {
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
	else if (this.status == 'start') this.prepeat();
	else if (this.status == 'repeat') this.postpeat();
};