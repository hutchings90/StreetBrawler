function Character(name, attacks) {
	// console.log('Character');
	this.GRAVITY = -.1;
	this.JUMP_VY = 20;
	this.JUMP_VX = 6;
	this.WALK_VX = 2;
	this.name = name;
	this.health = 100;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.jumpFrames = 0;
	this.direction = '';
	this.attackFrames = 0;
	this.freezeFrames = 0;
	this.attacks = attacks || this.createAttacks(
		[ this.createAttack('haymaker', 8), this.createAttack('jab', 5), this.createAttack('roundhouse', 15), this.createAttack('special', 10) ],
		[ this.createAttack('uppercut', 10), this.createAttack('highKick', 15), this.createAttack('lowKick', 15), this.createAttack('crouchSpecial', 10) ],
		[ this.createAttack('jumpPunchHigh', 10), this.createAttack('jumpPunchLow', 10), this.createAttack('jumpKickLow', 10), this.createAttack('jumpKickHigh', 10) ]
	);
	this.hurtboxes = {
		idle: {
			hurt: this.makeHurtbox(10, 0, 210, 60),
			hit: this.makeHitbox()
		},
		jump: {
			hurt: this.makeHurtbox(10, 0, 210, 60),
			hit: this.makeHitbox()
		},
		crouch: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		walk: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		block: {
			hurt: this.makeHurtbox(0, 0, 210, 127),
			hit: this.makeHitbox()
		},
		grab: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		haymaker: {
			hurt: this.makeHurtbox(5, 0, 210, 55),
			hit: this.makeHitbox(75, 90, 30, 40, 20)
		},
		jab: {
			hurt: this.makeHurtbox(17, 0, 210, 62),
			hit: this.makeHitbox(100, 93, 30, 55, 10)
		},
		roundhouse: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		special: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		uppercut: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		highKick: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		lowKick: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		crouchSpecial: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		jumpPunchHigh: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		jumpPunchLow: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		jumpKickLow: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		},
		jumpKickHigh: {
			hurt: this.makeHurtbox(),
			hit: this.makeHitbox()
		}
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

Character.prototype.makeHitbox = function(x, y, height, width, damage) {
	// console.log('makeHitbox');
	var box = this.makeHurtbox(x, y, height, width);
	box.damage = damage;
	box.hasHit = false;
	return box;
};

Character.prototype.createAttacks = function(idle, crouch, jump) {
	// console.log('createAttacks');
	return {
		idle: idle,
		crouch: crouch,
		jump: jump
	}
};

Character.prototype.createAttack = function(name, frames) {
	// console.log('createAttack');
	return {
		name: name,
		frames: frames
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
	this.hurtbox = this.hurtboxes[state].hurt;
};

Character.prototype.resetState = function() {
	// console.log('resetState');
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
	// console.log('block');
	this.state = 'block';
	this.hurtbox = this.hurtboxes.block.hurt;
};

Character.prototype.grab = function() {
	// console.log('grab');
	this.block();
};

Character.prototype.attack = function(i) {
	// console.log('attack');
	if (this.freezeFrames) return;
	this.curAttack = this.attacks[this.state][i];
	this.state += 'Attack';
	this.attackFrames = 1;
	this.hurtbox = this.hurtboxes[this.curAttack.name].hurt;
	this.hitbox = this.hurtboxes[this.curAttack.name].hit;
	this.hitbox.hasHit = false;
};

Character.prototype.baseMove = function() {
	// console.log('baseMove');
	if (this.attackFrames && this.attackFrames++ >= this.curAttack.frames) {
		this.endAttack();
		return true;
	}
	if (this.freezeFrames && this.freezeFrames-- <= 0) {
		this.endFreeze();
	}
};

Character.prototype.endAttack = function() {
	// console.log('endAttack');
	this.attackFrames = 0;
	this.curAttack = null;
	this.setState(this.state.replace('Attack', ''));
	this.freezeFrames = 5;
	this.hitbox = null;
};

Character.prototype.endFreeze = function() {
	// console.log('endFreeze');
	this.freezeFrames = 0;
};

Character.prototype.walkMove = function() {
	// console.log('move');
	this.moveX();
	return this.baseMove();
};

Character.prototype.jumpMove = function() {
	// console.log('jumpMove');
	this.moveX();
	this.moveY();
	this.jumpFrames++;
	this.dy += this.GRAVITY * this.jumpFrames;
	if (this.y <= 0) this.resetState();
	return this.baseMove();
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
	this.x = x;
};

Character.prototype.setY = function(y) {
	// console.log('setY');
	this.y = y;
};

Character.prototype.canTurn = function() {
	// console.log('canTurn');
	return this.state == 'walk' || this.state == 'idle' || this.state == 'crouch';
};

Character.prototype.resetHealth = function() {
	// console.log('resetHealth');
	this.health = 100;
};