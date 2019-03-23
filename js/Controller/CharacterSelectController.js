function CharacterSelectController(view, utils, contentManager) {
	// console.log('CharacterSelectController');
	MenuController.call(this, view, utils, contentManager, 'CharacterSelect');
	this.ONE_PLAYER = 'onePlayerBattle';
	this.TWO_PLAYER = 'twoPlayerBattle';
	this.CAMPAIGN = 'campaign';
	this.CHARACTER_DETAIL = 'characterDetail';
	this.characterDetails = this.view.getCharacterDetails();
	this.mode = '';
	this.i = [ 0, 0 ];
	this.startButton = this.view.getBattleStartButton();
	this.startButtonFrames = 0;
}

CharacterSelectController.prototype = Object.create(MenuController.prototype);
CharacterSelectController.constructor = CharacterSelectController;

CharacterSelectController.prototype.start = function(activator) {
	// console.log('start');
	if (activator) this.activator = activator;
	this.setIndex(0, this.activator);
	if (this.mode == this.TWO_PLAYER) this.setIndex(0, this.getNonActivator());
	this.view.show(this.menu);
	if (this.mode == this.CHARACTER_DETAIL) {
		this.view.show(this.characterDetails.children[this.i[0]]);
		this.view.show(this.characterDetails);
	}
};

CharacterSelectController.prototype.nextFrame = function(inputs) {
	// console.log('nextFrame');
	this.trackStartButtonFrames();
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.trackEndFrames()) return this.end(pi);
		if (this.buttonPressed(status.buttons[2])) {
			if (!this.isPlayerSelected(pi)) return this.end(pi);
			this.activatePlayer(pi);
		}
		if (this.mode != this.CHARACTER_DETAIL && this.buttonPressed(status.buttons[1])) {
			if (this.canProceed()) this.startEnd(pi);
			else if (!this.isPlayerSelected(pi)) this.selectPlayer(pi);
			if (this.allCharactersSelected()) this.showStartButton(pi);
		}
		if (!this.isPlayerSelected(pi)) {
			var direction = this.horizontalDirection(status.axes);
			var prevI = this.i[pi];
			this.moveHorizontal(direction, pi);
			if (this.mode == this.CHARACTER_DETAIL && prevI != this.i[pi]) {
				this.view.hide(this.characterDetails.children[prevI]);
				this.view.show(this.characterDetails.children[this.i[pi]]);
			}
		}
	}
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
	this.hideStartButton();
};

CharacterSelectController.prototype.deactivatePlayer = function(pi) {
	// console.log('deactivatePlayer');
	this.view.deactivatePlayerCharacter(this.options, this.i[pi], pi);
};

CharacterSelectController.prototype.showStartButton = function(pi) {
	// console.log('showStartButton');
	if (this.startButtonFrames == 0) {
		this.view.show(this.startButton.parentNode);
		this.startButtonFrames = 1;
	}
};

CharacterSelectController.prototype.hideStartButton = function(pi) {
	// console.log('hideStartButton');
	this.view.hide(this.startButton.parentNode);
	this.startButtonFrames = 0;
	this.view.clearOption(this.startButton);
};

CharacterSelectController.prototype.trackStartButtonFrames = function() {
	// console.log('trackStartButtonFrames');
	if (this.startButtonFrames != 0 && ++this.startButtonFrames > this.TRANSITION_DELAY) {
		this.startButtonFrames = 0;
		this.view.activateOption(this.startButton);
	}
};

CharacterSelectController.prototype.canProceed = function(pi) {
	// console.log('canProceed');
	return this.startButtonFrames == 0 && this.allCharactersSelected();
};

CharacterSelectController.prototype.clearAllOptions = function(pi) {
	// console.log('clearAllOptions');
	for (var i in this.i) {
		this.deactivatePlayer(i);
	}
};

CharacterSelectController.prototype.setIndex = function(i, pi) {
	// console.log('setIndex');
	this.deactivatePlayer(pi);
	this.i[pi] = this.validI(i);
	this.activatePlayer(pi);
};

CharacterSelectController.prototype.startEnd = function() {
	// console.log('startEnd');
	if (this.endFrames) return;
	this.endFrames = 1;
	this.view.selectOption(this.startButton);
};

CharacterSelectController.prototype.end = function(pi) {
	// console.log('end');
	var ret = this.createReport('mainMenu', { characters: [] }, pi);
	if (this.allCharactersSelected()) {
		switch (this.mode) {
		case this.TWO_PLAYER:
			ret.action = 'twoPlayerBattle';
			ret.params.characters = [
				this.getBattleCharacter(0, this.getPlayerCharacter(0)),
				this.getBattleCharacter(1, this.getPlayerCharacter(1))
			];
			break;
		case this.ONE_PLAYER:
			ret.action = 'onePlayerBattle';
			ret.params.characters = [
				this.getBattleCharacter(pi, this.getPlayerCharacter(pi)),
				this.getBattleCharacter(2, this.view.getRandomCharacter())
			];
			break;
		case this.CAMPAIGN:
			ret.action = 'startCampaign';
			ret.params.character = this.getOverworldCharacter(pi, new OverworldCharacter(this.view.getCharacterName(this.options, this.i[pi], pi)));
			break;
		}
	}
	this.hide();
	this.hideStartButton();
	this.view.hide(this.characterDetails.children[this.i[0]]);
	this.view.hide(this.characterDetails);
	this.mode = '';
	this.clearAllOptions(pi);
	return ret;
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

CharacterSelectController.prototype.getPlayerCharacter = function(pi) {
	// console.log('getPlayerCharacter');
	return this.view.createCharacter(this.view.getCharacterName(this.options, this.i[pi], pi));
};

CharacterSelectController.prototype.getBattleCharacter = function(pi, character) {
	// console.log('getBattleCharacter');
	return {
		pi: pi,
		character: character,
		audio: this.contentManager.getBattleCharacterAudio(character),
		visual: this.contentManager.getBattleCharacterVisuals(character)
	}
};

CharacterSelectController.prototype.getOverworldCharacter = function(pi, character) {
	// console.log('getOverworldCharacter');
	return {
		pi: pi,
		character: character,
		audio: this.contentManager.getOverworldCharacterAudio(character),
		visual: this.contentManager.getOverworldCharacterVisuals(character)
	}
};