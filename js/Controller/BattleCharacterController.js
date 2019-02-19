function BattleCharacterController(view, utils, contentManager, testing) {
	// console.log('BattleCharacterController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	this.BATTLE_AREA_W = 900;
	this.setCharacters([]);
	this.characterAttacks = [ [], [] ];
	this.testing = testing;
}

BattleCharacterController.prototype = Object.create(GamepadProcessingController.prototype);
BattleCharacterController.constructor = BattleCharacterController;

BattleCharacterController.prototype.nextFrame = function(inputs) {
	// console.log('BattleCharacterController');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		if (!status) continue;
		var character = this.characters[i];
		if (this.buttonPressed(status.buttons[9])) return this.createReport('showBattleMenu', {}, input.pi);
		this.processAxes(character, status.axes);
		this.processButtons(character, status.buttons);
	}
	for (var i in this.characterAttacks) {
		var character = this.characters[this.getOtherPlayerIndex(i)];
		var attacks = this.characterAttacks[i];
		for (var j in attacks) {
			var attack = attacks[j];
		}
	}
	this.setCharacterDirections();
	for (var i = this.characters.length - 1; i >= 0; i--) {
		var character = this.characters[i];
		var c = character.character;
		var o = this.characters[this.getOtherPlayerIndex(i)];
		var oc = o.character;
		var preX = c.x;
		if (c.move() || !this.view.hasClassName(character.e, c.direction)) this.setCharacterImage(character, c.state);
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
};

BattleCharacterController.prototype.setHitboxes = function(character) {
	// console.log('setHitboxes');
	if (!this.testing) return;
	var c = character.character;
	if (c.direction == 'left') character.hurtE.style.left = (c.x + c.hurtbox.x) + 'px';
	else character.hurtE.style.left = (c.x + character.visual.idle.width - c.hurtbox.x - c.hurtbox.width) + 'px';
	character.hurtE.style.bottom = (c.y + c.hurtbox.y) + 'px';
	character.hurtE.style.height = c.hurtbox.height + 'px';
	character.hurtE.style.width = c.hurtbox.width + 'px';
	if (c.hitbox) {
		if (c.direction == 'left') character.hitE.style.left = (c.x + c.hitbox.x) + 'px';
		else character.hitE.style.left = (c.x + character.visual.idle.width - c.hitbox.x - c.hitbox.width) + 'px';
		character.hitE.style.bottom = (c.y + c.hitbox.y) + 'px';
		character.hitE.style.height = c.hitbox.height + 'px';
		character.hitE.style.width = c.hitbox.width + 'px';
	}
	else {
		character.hitE.style.left = '0px';
		character.hitE.style.bottom = '0px';
		character.hitE.style.height = '0px';
		character.hitE.style.width = '0px';
	}
};

BattleCharacterController.prototype.setCharacterImage = function(character, name) {
	// console.log('setCharacterImage');
	var img = character.visual[name];
	this.view.replaceBattleImage(character.e, img, character.character.direction);
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
};

BattleCharacterController.prototype.grab = function(character) {
	// console.log('grab');
	character.character.grab();
};

BattleCharacterController.prototype.attack = function(character, params) {
	// console.log('attack');
	if (character.character.freezeFrames) return;
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
};

BattleCharacterController.prototype.heldButtons = function(buttons) {
	// console.log('heldButtons');
};

BattleCharacterController.prototype.blockButtons = function(buttons) {
	// console.log('blockButtons');
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