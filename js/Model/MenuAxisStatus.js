function MenuAxisStatus(restart) {
	// console.log('MenuAxisStatus');
	MenuStatus.call(this, restart);
	this.direction = 0;
}

MenuAxisStatus.prototype = Object.create(MenuStatus.prototype);
MenuAxisStatus.constructor = MenuAxisStatus;

MenuAxisStatus.prototype.start = function(direction) {
	// console.log('start');
	this.updateStatus('start', 0, direction);
};

MenuAxisStatus.prototype.repeat = function() {
	// console.log('repeat');
	this.updateStatus('repeat', this.restart, this.direction);
};

MenuAxisStatus.prototype.prepeat = function() {
	// console.log('prepeat');
	this.updateStatus('prepeat', this.restart, this.direction);
};

MenuAxisStatus.prototype.updateStatus = function(status, frames, direction) {
	// console.log('updateStatus');
	this.status = status;
	this.frames = frames || 0;
	this.direction = direction || 0;
};

MenuAxisStatus.prototype.update = function(direction) {
	// console.log('update');
	if (Math.abs(direction) != 1) this.processNoPress();
	else if (this.status == 'idle' || this.direction != direction) this.start(direction);
	else if (++this.frames == this.REPEAT) this.repeat();
	else if (this.status != 'prepeat') this.prepeat();
};