function OverworldCharacter(name) {
	// console.log('Character');
	this.WALK_V = 2;
	this.BATTLE_AREA_W = 900;
	this.BATTLE_AREA_H = 500;
	this.BATTLE_CHARACTER_W = 90;
	this.MAX_X = this.BATTLE_AREA_W - this.BATTLE_CHARACTER_W;
	this.MAX_Y = this.BATTLE_AREA_H - this.BATTLE_CHARACTER_W;
	this.name = name;
	this.health = 100;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.oldx = 0;
	this.oldy = 0;
	this.hurtbox = this.makeHurtbox(0, 0, 90, 90);
	this.resetState();
}

OverworldCharacter.prototype.makeHurtbox = function(x, y, height, width) {
	// console.log('makeHurtbox');
	return {
		x: x || 0,
		y: y || 0,
		height: height || 0,
		width: width || 0
	};
};

OverworldCharacter.prototype.reset = function(x,y) {
	// console.log('reset');
	this.x = x || 0;
	this.y = y || 0;
	this.dx = 0;
	this.dy = 0;
};

OverworldCharacter.prototype.resetState = function() {
	//console.log('resetState');
	this.state = 'idle';
	this.move = this.walkMove;
	this.reset(this.x,this.y);
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

//TODO: enable walking on angles

OverworldCharacter.prototype.walkMove = function() {
	// console.log('move');
	this.moveX();
	this.moveY();
};

OverworldCharacter.prototype.move = function() {
	this.moveX();
	this.moveY();
};

//revert character to its frame prior to moving
OverworldCharacter.prototype.unmove = function() {
	this.setX(this.oldx);
	this.setY(this.oldy);
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
	this.oldx = this.x;
	if (x < 0) x = 0;
	if (x > this.MAX_X) x = this.MAX_X;
	this.x = x;
	this.hurtbox.x=x;
	//console.log(this.x,x)
};

OverworldCharacter.prototype.setY = function(y) {
	// console.log('setY'); 
	this.oldy = this.y;
	if (y < 0) y = 0;
	if (y> this.MAX_Y) y = this.MAX_Y;
	this.y = y;
	this.hurtbox.y=y;
};