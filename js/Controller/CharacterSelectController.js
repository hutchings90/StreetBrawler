function CharacterSelectController(view) {
	// console.log('CharacterSelectController');
	MenuController.call(this, view, 'CharacterSelect');
	this.TWO_PLAYER = 'twoPlayerBattle';
	this.CHARACTER_DETAIL = 'characterDetail';
	this.mode = '';
	this.i = [ 0, 0 ];
}

CharacterSelectController.prototype = Object.create(MenuController.prototype);
CharacterSelectController.constructor = CharacterSelectController;

CharacterSelectController.prototype.start = function(activator) {
	// console.log('start');
	if (activator) this.activator = activator;
	this.setIndex(0, this.activator);
	if (this.mode == this.TWO_PLAYER) this.setIndex(0, this.getNonActivator());
	this.view.show(this.menu);
};

CharacterSelectController.prototype.processInputs = function(status, pi) {
	// console.log('processInputs');
	if (!status) return null;
	if (this.menuButtonsPressed(status.buttons, [ 2 ], pi)) {
		if (!this.isPlayerSelected(pi)) return this.end(pi);
		this.activatePlayer(pi);
	}
	if (this.menuButtonsPressed(status.buttons, [ 1 ], pi)) {
		if (this.allCharactersSelected()) return this.end(pi);
		if (this.mode == this.CHARACTER_DETAIL) return this.end(pi);
		if (!this.isPlayerSelected(pi)) this.selectPlayer(pi);
	}
	if (!this.isPlayerSelected(pi)) this.moveHorizontal(this.horizontalDirection(status.axes), pi);
};

CharacterSelectController.prototype.allCharactersSelected = function() {
	// console.log('allCharactersSelected');
	var count = this.numCharactersSelected();
	if (this.mode == this.TWO_PLAYER) return count == 2;
	return count == 1;
};

CharacterSelectController.prototype.numCharactersSelected = function() {
	// console.log('numCharactersSelected');
	var count = 0;
	for (var i in this.i) {
		if (this.isPlayerSelected(i)) count++;
	}
	return count;
};

CharacterSelectController.prototype.isPlayerSelected = function(pi) {
	// console.log('isPlayerSelected');
	return this.view.isPlayerCharacterSelected(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.selectPlayer = function(pi) {
	// console.log('activatePlayer');
	this.view.selectPlayerCharacter(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.isPlayerActive = function(pi) {
	// console.log('isPlayerActive');
	return this.view.isPlayerCharacterActive(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.activatePlayer = function(pi) {
	// console.log('activatePlayer');
	this.view.activatePlayerCharacter(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.deactivatePlayer = function(pi) {
	// console.log('deactivatePlayer');
	this.view.deactivatePlayerCharacter(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.clearAllOptions = function(pi) {
	// console.log('clearAllOptions');
	for (var i = 0; i < this.i.length; i++) {
		this.deactivatePlayer(i);
	}
};

CharacterSelectController.prototype.setIndex = function(i, pi) {
	// console.log('setIndex');
	this.deactivatePlayer(pi);
	this.i[pi] = this.validI(i);
	this.activatePlayer(pi);
};

CharacterSelectController.prototype.end = function(pi) {
	// console.log('end');
	this.mode = '';
	this.hide();
	this.clearAllOptions(pi);
	if (this.allCharactersSelected()) {
		if (this.mode == this.TWO_PLAYER) return {
			action: 'twoPlayerBattle',
			params: []
		};
		return {
			action: 'onePlayerBattle',
			params: []
		};
	}
	return {
		action: 'mainMenu',
		params: []
	};
};

CharacterSelectController.prototype.moveUp = function(pi) {
	// console.log('moveUp');
	this.move(this.i[pi] - 1, pi);
};

CharacterSelectController.prototype.moveDown = function(pi) {
	// console.log('moveDown');
	this.move(this.i[pi] + 1, pi);
};

CharacterSelectController.prototype.moveLeft = function(pi) {
	// console.log('moveLeft');
	this.move(this.i[pi] - 1, pi);
};

CharacterSelectController.prototype.moveRight = function(pi) {
	// console.log('moveRight');
	this.move(this.i[pi] + 1, pi);
};