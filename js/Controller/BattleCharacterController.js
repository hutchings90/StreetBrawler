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
		if (this.buttonPressed(status.buttons[9])) return {
			action: 'showBattleMenu',
			pi: i,
			params: {}
		};
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
	for (var i = this.characters.length - 1; i >= 0; i--) {
		var character = this.characters[i];
		character.character.move();
		this.view.setCharacterPosition(character, i);
	}
};

BattleCharacterController.prototype.processAction = function(character, action) {
	// console.log('processAction');
	if (action && action.action) this[action.action](character, action.params);
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

BattleCharacterController.prototype.processAxes = function(character, axes) {
	// console.log('processAxes');
	this.processAction(character, this[character.character.state + 'Axes'](axes));
};

BattleCharacterController.prototype.idleAxes = function(axes) {
	// console.log('idleAxes');
	var v = this.verticalDirection(axes);
	var h = this.horizontalDirection(axes);
	if (v == 1) return {
		action: 'crouch',
		params: {}
	};
	if (v == -1) return {
		action: 'jump',
		params: {
			direction: h
		}
	};
	if (h == 1) return {
		action: 'right',
		params: {}
	};
	if (h == -1) return {
		action: 'left',
		params: {}
	};
};

BattleCharacterController.prototype.walkAxes = function(axes) {
	// console.log('walkAxes');
};

BattleCharacterController.prototype.jumpAxes = function(axes) {
	// console.log('jumpAxes');
};

BattleCharacterController.prototype.crouchAxes = function(axes) {
	// console.log('crouchAxes');
};

BattleCharacterController.prototype.attackAxes = function(axes) {
	// console.log('attackAxes');
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
	if (this.buttonsPressed(buttons, [ 4, 5 ])) return {
		action: 'block',
		params: {}
	};
	if (this.buttonsPressed(buttons, [ 6, 7 ])) return {
		action: 'grab',
		params: {}
	};
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

BattleCharacterController.prototype.attackButtons = function(buttons) {
	// console.log('attackButtons');
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