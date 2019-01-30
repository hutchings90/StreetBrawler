function GamepadItemStatus() {
	// console.log('GamepadItemStatus');
	this.REPEAT = 18;
	this.RESTART = 10;
	this.status = 'idle';
	this.frames = 0;
	this.mode = '';
}

GamepadItemStatus.prototype.idle = function() {
	// console.log('idle');
	this.updateStatus('idle');
};

GamepadItemStatus.prototype.end = function() {
	// console.log('end');
	this.updateStatus('end');
};

GamepadItemStatus.prototype.repeat = function() {
	// console.log('repeat');
	this.updateStatus('repeat');
};

GamepadItemStatus.prototype.prepeat = function() {
	// console.log('prepeat');
	this.updateStatus('prepeat');
};

GamepadItemStatus.prototype.postpeat = function() {
	// console.log('postpeat');
	this.updateStatus('postpeat', this.RESTART);
};

GamepadItemStatus.prototype.start = function() {
	// console.log('start');
	this.updateStatus('start');
};

GamepadItemStatus.prototype.processNoPress = function(pi) {
	// console.log('processNoPress');
	if (this.status == 'end') this.idle();
	else if (this.status != 'idle') this.end();
};

GamepadItemStatus.prototype.updateStatus = function(status, frames) {
	// console.log('updateStatus');
	this.status = status;
	this.frames = frames || 0;
};

GamepadItemStatus.prototype.update = function(pressed) {
	// console.log('update');
	if (!this.mode) return;
	this[this.mode + 'Update'](pressed);
};

GamepadItemStatus.prototype.menuUpdate = function(pressed) {
	// console.log('menuUpdate');
	if (!pressed) this.processNoPress();
	else if (this.status == 'idle') this.start();
	else if (++this.frames == this.REPEAT) this.repeat();
	else if (this.status == 'start') this.prepeat();
	else if (this.status == 'repeat') this.postpeat();
};

GamepadItemStatus.prototype.battleUpdate = function(pressed) {
	// console.log('battleUpdate');
	if (!pressed) this.processNoPress();
	else if (this.status == 'idle') this.start();
};