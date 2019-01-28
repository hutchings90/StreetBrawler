function Character(name) {
	// console.log('Character');
	this.name = name;
	this.health = 100;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.jumpFrames = 0;
	this.resetState();
}

Character.prototype.reset = function() {
	// console.log('reset');
	this.x = 0;
	this.y = 0;
	this.dx = 0;
};

Character.prototype.resetState = function() {
	// console.log('resetState');
	this.state = 'idle';
	this.move = this.walkMove;
};

Character.prototype.jump = function(direction) {
	console.log('jump');
	this.state = 'jump';
	this.move = this.jumpMove;
	this.dx = direction;
	this.jumpFrames = 0;
};

Character.prototype.crouch = function() {
	console.log('crouch');
	this.state = 'crouch';
};

Character.prototype.left = function() {
	console.log('left');
	this.walk(-1);
};

Character.prototype.right = function() {
	console.log('right');
	this.walk(1);
};

Character.prototype.walk = function(direction) {
	console.log('walk');
	this.state = 'walk';
	this.dx = direction;
};

Character.prototype.block = function() {
	console.log('block');
	this.state = 'block';
};

Character.prototype.grab = function() {
	console.log('grab');
	this.state = 'grab';
};

Character.prototype.walkMove = function() {
	// console.log('move');
	this.x += this.dx;
};

Character.prototype.jumpMove = function() {
	// console.log('jumpMove');
	this.jumpFrames++;
	if (this.x == 0) this.resetState();
};