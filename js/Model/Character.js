function Character(name, attacks) {
	// console.log('Character');
	this.GRAVITY = -.1;
	this.JUMP_VY = 20;
	this.JUMP_VX = 6;
	this.WALK_VX = 2;
	this.BATTLE_AREA_W = 900;
	this.name = name;
	this.health = 100;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.jumpFrames = 0;
	this.attacks = attacks || this.createAttacks(
		[ 'haymaker', 'jab', 'roundhouse', 'special' ],
		[ 'uppercut', 'highKick', 'lowKick', 'crouchSpecial' ],
		[ 'jumpPunchHigh', 'jumpPunchLow', 'jumpKickLow', 'jumpKickHigh' ]);
	this.hurtboxes = {
		idle: this.makeHurtbox(10, 0, 210, 60),
		jump: this.makeHurtbox(10, 0, 210, 60),
		crouch: this.makeHurtbox(),
		walk: this.makeHurtbox(),
		block: this.makeHurtbox(),
		grab: this.makeHurtbox(),
		haymaker: this.makeHurtbox(50, 0, 210, 55),
		jab: this.makeHurtbox(70, 0, 210, 62),
		roundhouse: this.makeHurtbox(),
		special: this.makeHurtbox(),
		uppercut: this.makeHurtbox(),
		highKick: this.makeHurtbox(),
		lowKick: this.makeHurtbox(),
		crouchSpecial: this.makeHurtbox(),
		jumpPunchHigh: this.makeHurtbox(),
		jumpPunchLow: this.makeHurtbox(),
		jumpKickLow: this.makeHurtbox(),
		jumpKickHigh: this.makeHurtbox()
	};
	this.resetState();
}

Character.prototype.makeHurtbox = function(x, y, height, width) {
	// console.log('makeHurtbox');
	return {
		x: x || 0,
		y: y || 0,
		height: height || 0,
		width: width || 0
	};
};

Character.prototype.createAttacks = function(idle, crouch, jump) {
	// console.log('createAttacks');
	return {
		idle: idle,
		crouch: crouch,
		jump: jump
	}
};

Character.prototype.reset = function(x) {
	// console.log('reset');
	this.x = x || 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
};

Character.prototype.setState = function(state) {
	// console.log('setState');
	this.state = state;
	this.hurtbox = this.hurtboxes[state];
};

Character.prototype.resetState = function() {
	console.log('resetState');
	this.setState('idle');
	this.curAttack = null;
	this.move = this.walkMove;
	this.reset(this.x);
};

Character.prototype.jump = function(direction) {
	// console.log('jump');
	this.state = 'jump';
	this.move = this.jumpMove;
	this.dx = direction * this.JUMP_VX;
	this.dy = this.JUMP_VY;
	this.jumpFrames = 0;
};

Character.prototype.crouch = function() {
	// console.log('crouch');
	this.state = 'crouch';
	this.dx = 0;
};

Character.prototype.left = function() {
	// console.log('left');
	this.walk(-1);
};

Character.prototype.right = function() {
	// console.log('right');
	this.walk(1);
};

Character.prototype.walk = function(direction) {
	// console.log('walk');
	this.state = 'walk';
	this.dx = direction * this.WALK_VX;
};

Character.prototype.block = function() {
	console.log('block');
	this.state = 'block';
};

Character.prototype.grab = function() {
	console.log('grab');
	this.state = 'grab';
};

Character.prototype.attack = function(i) {
	// console.log('attack');
	this.curAttack = this.attacks[this.state][i];
	this.state = 'attack';
};

Character.prototype.walkMove = function() {
	// console.log('move');
	this.moveX();
};

Character.prototype.jumpMove = function() {
	// console.log('jumpMove');
	this.moveX();
	this.moveY();
	this.jumpFrames++;
	this.dy += this.GRAVITY * this.jumpFrames;
	if (this.y <= 0) this.resetState();
};

Character.prototype.moveX = function() {
	// console.log('moveX');
	this.setX(this.dx + this.x);
};

Character.prototype.moveY = function() {
	// console.log('moveY');
	this.setY(this.dy + this.y);
};

Character.prototype.setX = function(x) {
	// console.log('setX');
	if (x < 0) x = 0;
	if (x > this.BATTLE_AREA_W) x = this.BATTLE_AREA_W;
	this.x = x;
};

Character.prototype.setY = function(y) {
	// console.log('setY');
	if (y < 0) y = 0;
	this.y = y;
};