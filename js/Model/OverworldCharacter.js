function OverworldCharacter(name) {
	// console.log('Character');
	//TODO: update vars
	//this.GRAVITY = -.1;
	//this.JUMP_VY = 20;
	//this.JUMP_VX = 6;
	this.WALK_V = 2;
	this.BATTLE_AREA_W = 900;
	this.BATTLE_CHARACTER_W = 90;
	this.MAX_X = this.BATTLE_AREA_W - this.BATTLE_CHARACTER_W;
	this.name = name;
	this.health = 100;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	//this.jumpFrames = 0;
	this.resetState();
}

OverworldCharacter.prototype.reset = function(x) {
	// console.log('reset');
	this.x = x || 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
};

OverworldCharacter.prototype.resetState = function() {
	//console.log('resetState');
	this.state = 'idle';
	this.move = this.walkMove;
	this.reset(this.x);
};

OverworldCharacter.prototype.left = function() {
	// console.log('left');
	this.walk(-1,0);
};

OverworldCharacter.prototype.right = function() {
	// console.log('right');
	this.walk(1,0);
};

OverworldCharacter.prototype.up = function() {
	this.walk(0,1)
};

OverworldCharacter.prototype.down = function() {
	this.walk(0,-1)
};

OverworldCharacter.prototype.walk = function(directionX, directionY) {
	// console.log('walk');
	this.state = 'walk';
	this.dx = directionX * this.WALK_V;
	this.dy = directionY * this.WALK_V;
	//console.log(this.dx,this.dy);
};

//TODO: add walkVert

OverworldCharacter.prototype.walkMove = function() {
	// console.log('move');
	this.moveX();
	this.moveY();
};

OverworldCharacter.prototype.move = function() {
	this.moveX();
	this.moveY();
};

OverworldCharacter.prototype.moveX = function() {
	// console.log('moveX');
	this.setX(this.dx + this.x);
};

OverworldCharacter.prototype.moveY = function() {
	// console.log('moveY');
	this.setY(this.dy + this.y);
};

OverworldCharacter.prototype.setX = function(x) {
	// console.log('setX');
	//console.log(x);
	if (x < 0) x = 0;
	if (x > this.MAX_X) x = this.MAX_X;
	this.x = x;
	//console.log(this.x,x)
};

OverworldCharacter.prototype.setY = function(y) {
	// console.log('setY'); 
	if (y < 0) y = 0;
	this.y = y;
};