function BattleCharacterController(view, utils, contentManager) {
	// console.log('BattleCharacterController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	this.setCharacters([]);
	this.characterAttacks = [ [], [] ];
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
		if (character.character.move() || !this.view.hasClassName(character.e, character.character.direction)) {
			var img = character.visual[character.character.state];
			this.view.replaceBattleImage(character.e, img, character.character.direction);
			character.e = img;
		}
		this.view.setCharacterPosition(character);
	}
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
	var img = character.visual[character.character.curAttack.name];
	this.view.replaceBattleImage(character.e, img, character.character.direction);
	character.e = img;
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