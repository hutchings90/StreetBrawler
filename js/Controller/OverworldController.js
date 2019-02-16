function OverworldController(model, view, utils, contentManager) {
	console.log('OverworldController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.overworld = this.view.getOverworld();
	this.character = this.getOverworldCharacter();
	
	
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;

OverworldController.prototype.nextFrame = function(inputs) {
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

	for (var i = this.characters.length - 1; i >= 0; i--) {
		var character = this.characters[i];
		character.character.move();
		this.view.setCharacterPosition(character);
	}
};

OverworldController.prototype.startBattle = function(params){};

OverworldController.prototype.interact = function(params){};

OverworldController.prototype.left = function (character){
	character.character.left();
};

OverworldController.prototype.right = function (character){
	character.character.right();
};

OverworldController.prototype.up = function (character){
	character.character.up();
};

OverworldController.prototype.down = function (character){
	character.character.down();
};

BattleCharacterController.prototype.processAxes = function(character, axes) {
	// console.log('processAxes');
	this.processAction(character, this[character.character.state + 'Axes'](axes));
};

BattleCharacterController.prototype.idleAxes = function(axes) {
	// console.log('idleAxes');
	var v = this.verticalDirection(axes);
	var h = this.horizontalDirection(axes);
	if (v == 1) return this.createReport('down');
	if (v == -1) return this.createReport('up', {
		direction: h
	});
	if (h == 1) return this.createReport('right');
	if (h == -1) return this.createReport('left');
};

BattleCharacterController.prototype.walkAxes = function(axes) {
	// console.log('walkAxes');
	var v = this.verticalDirection(axes);
	var h = this.horizontalDirection(axes);
	if (v == 1) return this.createReport('down');
	if (v == -1) return this.createReport('up', {
		direction: h
	});
	if (h == 1) return this.createReport('right');
	if (h == -1) return this.createReport('left');
	return this.createReport('resetState');
};

BattleCharacterController.prototype.show = function() {
	this.view.show(this.overworld);
	this.showCharacter();
};

BattleCharacterController.prototype.showCharacter() {
	var img = this.character.visual.down();
	this.drawImage();
};

BattleCharacterController.prototype.drawImage = function(img){
	this.view.addOverworldImage(this.overworld,img);
};

/*
	create img library for overWorld character
*/
BattleCharacterController.prototype.getOverworldCharacter = function() {
	return {
		character: new OverworldCharacter('IceGolem'),
		//audio: this.contentManager.getBattleCharacterAudio(character),
		visual: this.contentManager.getOverworldCharacterVisuals()
	}
};

/*
The map information will need to be stored and processed somehow. 
This function loads and manages the map info
*/
OverworldController.prototype.loadMap = function (params){};