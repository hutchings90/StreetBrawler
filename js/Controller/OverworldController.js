function OverworldController(model, view, utils, contentManager) {
	//console.log('OverworldController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	//actually retrieves overworld-objects
	this.overworldImgs = this.view.getOverworld();
	this.overworldContainer = this.view.getOverworldContainer();
	this.character = this.getOverworldCharacter('IceGolem');
	
	
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;

OverworldController.prototype.setCharacter = hunction(character) {
	this.character = character;
};

OverworldController.prototype.nextFrame = function(inputs) {
	//console.log('OverworldController frame');
	var input = inputs[0];
	var status = input.status;
	if (!status) return;
	if (this.buttonPressed(status.buttons[9])) return this.createReport('showBattleMenu', {}, input.pi);
	this.processAxes(this.character, status.axes);
	//this.processButtons(this.character, status.buttons);

	this.character.character.move();
	//console.log('x/y:',this.character.character.x,this.character.character.y);
	this.view.setCharacterPosition(this.character);
};

OverworldController.prototype.startBattle = function(params){};

OverworldController.prototype.interact = function(params){};

OverworldController.prototype.left = function (character){
	this.character.character.left();
};

OverworldController.prototype.right = function (character){
	this.character.character.right();
};

OverworldController.prototype.up = function (character){
	this.character.character.up();
};

OverworldController.prototype.down = function (character){
	this.character.character.down();
};

OverworldController.prototype.resetState = function(character) {
	// console.log('resetState');
	this.character.character.resetState();
};

OverworldController.prototype.processAction = function(character, action) {
	// console.log('processAction');
	if (action && action.action) this[action.action](character, action.params);
};

OverworldController.prototype.processAxes = function(character, axes) {
	 //console.log('processAxes');
	this.processAction(character, this[this.character.character.state + 'Axes'](axes));
};

OverworldController.prototype.idleAxes = function(axes) {
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

OverworldController.prototype.walkAxes = function(axes) {
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

OverworldController.prototype.show = function() {
	//console.log(this.overworldContainer);
	this.view.show(this.overworldContainer);
	this.showCharacter();
};

OverworldController.prototype.showCharacter = function() {
	//console.log(this.character);
	var img = this.character.visual.down;
	this.drawImage(img);
	this.view.setCharacterPosition(this.character);
};

OverworldController.prototype.drawImage = function(img){
	this.character.e = img;
	this.view.addOverworldImage(this.overworldImgs,img);
};

/*
	create img library for overWorld character
*/
OverworldController.prototype.getOverworldCharacter = function(character) {
	return {
		character: new OverworldCharacter(character),
		//audio: this.contentManager.getBattleCharacterAudio(character),
		visual: this.contentManager.getOverworldCharacterVisuals(character)
	}
};

/*
The map information will need to be stored and processed somehow. 
This function loads and manages the map info
*/
OverworldController.prototype.loadMap = function (params){};