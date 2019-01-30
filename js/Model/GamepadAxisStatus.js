function GamepadAxisStatus(restart) {
	// console.log('GamepadAxisStatus');
	GamepadItemStatus.call(this, restart);
	this.direction = 0;
}

GamepadAxisStatus.prototype = Object.create(GamepadItemStatus.prototype);
GamepadAxisStatus.constructor = GamepadAxisStatus;

GamepadAxisStatus.prototype.start = function(direction) {
	// console.log('start');
	this.updateStatus('start', 0, direction);
};

GamepadAxisStatus.prototype.repeat = function() {
	// console.log('repeat');
	this.updateStatus('repeat', 0, this.direction);
};

GamepadAxisStatus.prototype.prepeat = function() {
	// console.log('prepeat');
	this.updateStatus('prepeat', 0, this.direction);
};

GamepadAxisStatus.prototype.postpeat = function() {
	// console.log('postpeat');
	this.updateStatus('postpeat', this.RESTART, this.direction);
};

GamepadAxisStatus.prototype.updateStatus = function(status, frames, direction) {
	// console.log('updateStatus');
	this.status = status;
	this.frames = frames || 0;
	this.direction = direction || 0;
};

GamepadAxisStatus.prototype.update = function(direction) {
	// console.log('update');
	if (!this.mode) return;
	this[this.mode + 'Update'](direction);
};

GamepadAxisStatus.prototype.menuUpdate = function(direction) {
	// console.log('menuUpdate');
	if (Math.abs(direction) != 1) this.processNoPress();
	else if (this.status == 'idle' || this.direction != direction) this.start(direction);
	else if (++this.frames == this.REPEAT) this.repeat();
	else if (this.status == 'start') this.prepeat();
	else if (this.status == 'repeat') this.postpeat();
};

GamepadAxisStatus.prototype.battleUpdate = function(direction) {
	// console.log('battleUpdate');
	if (Math.abs(direction) != 1) this.processNoPress();
	else if (this.status == 'idle' || this.direction != direction) this.start(direction);
};