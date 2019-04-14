function BattleCharacterController(view, utils, contentManager, testing) {
	// console.log('BattleCharacterController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	this.BATTLE_AREA_W = 900;
	this.setCharacters([]);
	this.projectiles = [[], []];
	this.testing = testing;
}

BattleCharacterController.prototype = Object.create(GamepadProcessingController.prototype);
BattleCharacterController.constructor = BattleCharacterController;

BattleCharacterController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	var loser = -1;
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		if (!status) continue;
		var character = this.characters[i];
		var c = character.character;
		if (this.buttonPressed(status.buttons[9])) return this.createReport('showBattleMenu', {}, input.pi);
		this.processAxes(character, status.axes);
		this.processButtons(character, status.buttons);
		if (c.attackFrames == 1 && c.curAttack.projectile) {
			var projectile = c.getProjectile();
			projectile.img = this.view.createProjectileImage(character);
			if (c.direction == 'left') projectile.x += c.x;
			else {
				projectile.x = c.x + character.visual.idle.width - projectile.x - character.visual[c.curAttack.name + 'Object'].width;
				projectile.dx *= -1;
			}
			projectile.y += c.y;
			this.view.setProjectilePosition(projectile);
			this.view.addProjectile(projectile.img);
			this.projectiles[i].push(projectile);
		}
	}
	this.setCharacterDirections();
	for (var i = this.characters.length - 1; i >= 0; i--) {
		var character = this.characters[i];
		var c = character.character;
		var o = this.characters[this.getOtherPlayerIndex(i)];
		var oc = o.character;
		var preX = c.x;
		if (c.move() || !this.view.hasClassName(character.e, c.direction) || this.blockTransition(character)) this.setCharacterImage(character, c.state);
		if (!c.state.includes('jump') && !oc.state.includes('jump') && this.utils.charactersCollide(character, o)) {
			if (c.dx < 0) {
				if (c.direction == 'right') {
					var ocRight = oc.x + oc.hurtbox.x + oc.hurtbox.width;
					var minLeft = ocRight - character.visual.idle.width + c.hurtbox.x + c.hurtbox.width;
					if (preX >= minLeft) c.setX(minLeft);
					else c.setX(preX);
				}
			}
			else if (c.dx > 0) {
				if (c.direction == 'left') {
					var ocLeft = oc.x + o.visual.idle.width - oc.hurtbox.x - oc.hurtbox.width;
					var maxRight = ocLeft - c.hurtbox.x - c.hurtbox.width;
					if (preX <= maxRight) c.setX(maxRight);
					else c.setX(preX);
				}
			}
		}
		if (c.direction == 'left') {
			var left = c.x + c.hurtbox.x;
			var right = left + c.hurtbox.width;
			var minLeft = 0 - c.hurtbox.x
			var maxRight = this.BATTLE_AREA_W - c.hurtbox.x - c.hurtbox.width;
		}
		else {
			var offset = c.x + character.visual.idle.width;
			var right = offset - c.hurtbox.x;
			var left = right - c.hurtbox.width;
			var minLeft = c.hurtbox.x + c.hurtbox.width - character.visual.idle.width;
			var maxRight = this.BATTLE_AREA_W - character.visual.idle.width + c.hurtbox.x;
		}
		if (left < 0) c.x = minLeft;
		if (right > this.BATTLE_AREA_W) c.x = maxRight;
		if (c.y < 0) c.y = 0;
		this.setHitboxes(character);
		this.view.setCharacterPosition(character);
	}
	for (var i = 0; i < this.characters.length; i++) {
		var character = this.characters[i];
		var c = character.character;
		var opponentI = this.getOtherPlayerIndex(i);
		var opponent = this.characters[opponentI];
		var hurtbox = this.getHurtbox(character);
		var hitbox = this.getHitbox(opponent);
		var projectiles = this.projectiles[opponentI];
		var playingHitSound = false;
		for (var j = projectiles.length - 1; j >= 0; j--) {
			var removeProjectile = false;
			var projectile = projectiles[j];
			projectile.x += projectile.dx;
			if (!projectile.hasHit) {
				if (!this.utils.collide(projectile, hurtbox)) {
					if (projectile.x < 0 - projectile.img.width || projectile.x > this.BATTLE_AREA_W) removeProjectile = true;
					else this.view.setProjectilePosition(projectile);
				}
				else {
					projectile.hasHit = true;
					removeProjectile = projectile.destroyOnHit;
					if (c.state == 'block') {
						if (!playingHitSound) this.contentManager.playSFX('blockedHit');
					}
					else {
						if (!playingHitSound) this.contentManager.playSFX('hit');
						c.health -= projectile.damage;
					}
					playingHitSound = true;
				}
			}
			if (projectile.maxFrames && ++projectile.frames >= projectile.maxFrames) removeProjectile = true;
			if (removeProjectile) {
				this.view.removeProjectile(projectile);
				projectiles.splice(j, 1);
			}
		}
		if (this.utils.collide(hurtbox, hitbox)) {
			if (c.state == 'block') {
				if (!playingHitSound) {
					this.contentManager.playSFX('blockedHit');
					playingHitSound = true;
				}
			}
			else if (!hitbox.hasHit) {
				if (!playingHitSound) {
					this.contentManager.playSFX('hit');
					playingHitSound = true;
				}
				c.health -= hitbox.damage;
				opponent.character.hitbox.hasHit = true;
			}
		}
		if (c.health <= 0) {
			c.health = 0;
			loser += i + 1;
		}
	}
	if (loser > -1) {
		return this.createReport('endRound', {
			loser: loser
		});
	}
};

BattleCharacterController.prototype.getHurtbox = function(c) {
	// console.log('getHurtbox');
	return this.getCharacterHurtbox(c, 'hurtbox');
};

BattleCharacterController.prototype.getHitbox = function(c) {
	// console.log('getHitbox');
	return this.getCharacterHurtbox(c, 'hitbox');
};

BattleCharacterController.prototype.getCharacterHurtbox = function(c, prop) {
	// console.log('getCharacterHurtbox');
	var character = c.character;
	var hurtbox = character[prop];
	var x = -1;
	var y = -1;
	var height = 0;
	var width = 0;
	var damage = 0;
	var hasHit = false;
	if (hurtbox) {
		switch (character.direction) {
		case 'left': x = character.x + hurtbox.x; break;
		case 'right': x = character.x + c.visual.idle.width - hurtbox.x - hurtbox.width; break;
		}
		y = character.y + hurtbox.y;
		height = hurtbox.height;
		width =  hurtbox.width;
		if (hurtbox.damage) {
			damage = hurtbox.damage;
			hasHit = hurtbox.hasHit;
		}
	}
	return {
		x: x,
		y: y,
		height: height,
		width: width,
		damage: damage,
		hasHit: hasHit
	};
};

BattleCharacterController.prototype.setHitboxes = function(character) {
	// console.log('setHitboxes');
	var c = character.character;
	if (c.state == 'block' || this.testing) {
		var hurtbox = this.getHurtbox(character);
		this.view.setHitboxPosition(character.hurtE, hurtbox.x, hurtbox.y, hurtbox.height, hurtbox.width);
	}
	if (!this.testing) return;
	if (!c.hitbox) this.view.setHitboxPosition(character.hitE, 0, 0, 0, 0);
	else {
		var hitbox = this.getHitbox(character);
		this.view.setHitboxPosition(character.hitE, hitbox.x, hitbox.y, hitbox.height, hitbox.width);
	}
};

BattleCharacterController.prototype.blockTransition = function(character) {
	// console.log('blockTransition');
	var c = character.character;
	var e = character.e;
	return (c.state == 'block' && !this.view.hasClassName(e, 'block')) || (c.state == 'idle' && this.view.hasClassName(e, 'block'));
};

BattleCharacterController.prototype.setCharacterImage = function(character, name) {
	// console.log('setCharacterImage');
	var img = character.visual[name];
	this.view.replaceBattleImage(character.e, img, character.character.direction, character.character.state);
	character.e = img;
	this.setHitboxes(character);
};

BattleCharacterController.prototype.setCharacterDirections = function() {
	// console.log('setCharacterDirections');
	var c1 = this.characters[0].character;
	var c2 = this.characters[1].character;
	if (c1.canTurn()) {
		if (c1.x < c2.x) c1.direction = 'left';
		else c1.direction = 'right';
	}
	if (c2.canTurn()) {
		if (c1.x < c2.x) c2.direction = 'right';
		else c2.direction = 'left';
	}
};

BattleCharacterController.prototype.processAction = function(character, action) {
	// console.log('processAction');
	if (action && action.action) this[action.action](character, action.params);
};

BattleCharacterController.prototype.resetState = function(character) {
	// console.log('resetState');
	character.character.resetState();
	if (!this.testing) this.view.characterUnblock(character.hurtE);
};

BattleCharacterController.prototype.jump = function(character, params) {
	// console.log('jump');
	character.character.jump(params.direction);
};

BattleCharacterController.prototype.crouch = function(character) {
	// console.log('crouch');
	character.character.crouch();
};

BattleCharacterController.prototype.left = function(character) {
	// console.log('left');
	character.character.left();
};

BattleCharacterController.prototype.right = function(character) {
	// console.log('right');
	character.character.right();
};

BattleCharacterController.prototype.block = function(character) {
	// console.log('block');
	character.character.block();
	this.view.characterBlock(character.hurtE);
};

BattleCharacterController.prototype.grab = function(character) {
	// console.log('grab');
	character.character.grab();
	this.view.characterBlock(character.hurtE);
};

BattleCharacterController.prototype.attack = function(character, params) {
	// console.log('attack');
	if (character.character.freezeFrames) return;
	switch (params.button) {
	case 0: this.contentManager.playSFX('explosion'); break;
	case 3: this.contentManager.playSFX('launchProjectile'); break;
	}
	character.character.attack(params.button);
	this.setCharacterImage(character, character.character.curAttack.name);
	this.setHitboxes(character);
};

BattleCharacterController.prototype.processAxes = function(character, axes) {
	// console.log('processAxes');
	this.processAction(character, this[character.character.state + 'Axes'](axes));
};

BattleCharacterController.prototype.idleAxes = function(axes) {
	// console.log('idleAxes');
	var v = this.verticalDirection(axes);
	var h = this.horizontalDirection(axes);
	if (v == 1) return this.createReport('crouch');
	if (v == -1) return this.createReport('jump', {
		direction: h
	});
	if (h == 1) return this.createReport('right');
	if (h == -1) return this.createReport('left');
};

BattleCharacterController.prototype.walkAxes = function(axes) {
	// console.log('walkAxes');
	var v = this.verticalDirection(axes);
	var h = this.horizontalDirection(axes);
	if (v == 1) return this.createReport('crouch');
	if (v == -1) return this.createReport('jump', {
		direction: h
	});
	if (h == 1) return this.createReport('right');
	if (h == -1) return this.createReport('left');
	return this.createReport('resetState');
};

BattleCharacterController.prototype.jumpAxes = function(axes) {
	// console.log('jumpAxes');
};

BattleCharacterController.prototype.crouchAxes = function(axes) {
	// console.log('crouchAxes');
	var v = this.verticalDirection(axes);
	if (v == -1) return this.createReport('jump', {
		direction: this.horizontalDirection(axes)
	});
	if (v == 0) return this.createReport('resetState');
};

BattleCharacterController.prototype.idleAttackAxes = function(axes) {
	// console.log('idleAttackAxes');
};

BattleCharacterController.prototype.jumpAttackAxes = function(axes) {
	// console.log('jumpAttackAxes');
};

BattleCharacterController.prototype.grabAxes = function(axes) {
	// console.log('grabAxes');
};

BattleCharacterController.prototype.heldAxes = function(axes) {
	// console.log('heldAxes');
};

BattleCharacterController.prototype.blockAxes = function(axes) {
	// console.log('blockAxes');
};

BattleCharacterController.prototype.launchAxes = function(axes) {
	// console.log('launchAxes');
};

BattleCharacterController.prototype.knockAxes = function(axes) {
	// console.log('knockAxes');
};

BattleCharacterController.prototype.processButtons = function(character, buttons) {
	// console.log('processButtons');
	this.processAction(character, this[character.character.state + 'Buttons'](buttons));
};

BattleCharacterController.prototype.idleButtons = function(buttons) {
	// console.log('idleButtons');
	if (this.buttonsPressed(buttons, [ 4, 5 ])) return this.createReport('block');
	if (this.buttonsPressed(buttons, [ 6, 7 ])) return this.createReport('grab');
	if (this.buttonPressed(buttons[0])) return this.createReport('attack', { button: 0 });
	if (this.buttonPressed(buttons[1])) return this.createReport('attack', { button: 1 });
	if (this.buttonPressed(buttons[2])) return this.createReport('attack', { button: 2 });
	if (this.buttonPressed(buttons[3])) return this.createReport('attack', { button: 3 });
};

BattleCharacterController.prototype.walkButtons = function(buttons) {
	// console.log('walkButtons');
};

BattleCharacterController.prototype.jumpButtons = function(buttons) {
	// console.log('jumpButtons');
};

BattleCharacterController.prototype.crouchButtons = function(buttons) {
	// console.log('crouchButtons');
};

BattleCharacterController.prototype.idleAttackButtons = function(axes) {
	// console.log('idleAttackButtons');
};

BattleCharacterController.prototype.jumpAttackButtons = function(axes) {
	// console.log('jumpAttackButtons');
};

BattleCharacterController.prototype.grabButtons = function(buttons) {
	// console.log('grabButtons');
	if (!this.buttonsPressed(buttons, [ 4, 5, 6, 7 ])) return this.createReport('resetState');
};

BattleCharacterController.prototype.heldButtons = function(buttons) {
	// console.log('heldButtons');
};

BattleCharacterController.prototype.blockButtons = function(buttons) {
	// console.log('blockButtons');
	if (!this.buttonsPressed(buttons, [ 4, 5, 6, 7 ])) return this.createReport('resetState');
};

BattleCharacterController.prototype.launchButtons = function(buttons) {
	// console.log('launchButtons');
};

BattleCharacterController.prototype.knockButtons = function(buttons) {
	// console.log('knockButtons');
};

BattleCharacterController.prototype.setCharacters = function(characters) {
	// console.log('setCharacters');
	this.characters = characters;
};

BattleCharacterController.prototype.updateBattleHealth = function() {
	// console.log('updateBattleHealth');
	for (var i = 0; i < this.characters.length; i++) {
		var character = this.characters[i];
		var diff = character.health - character.character.health;
		if (diff) {
			character.health -= diff / Math.abs(diff);
			this.view.updateBattleHealth(i, character.health);
		}
	}
};

BattleCharacterController.prototype.clearProjectiles = function() {
	// console.log('clearProjectiles');
	for (var i = this.projectiles.length - 1; i >= 0; i--) {
		var projectiles = this.projectiles[i];
		for (var k = projectiles.length - 1; k >= 0; k--) {
			this.view.removeProjectile(projectiles.pop());
		}
	}
};