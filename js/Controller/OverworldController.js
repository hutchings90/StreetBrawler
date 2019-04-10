function OverworldController(model, view, utils, contentManager) {
	//console.log('OverworldController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	//actually retrieves overworld-objects
	this.overworldCanvas = this.view.getOverworld();
	this.overworldContainer = this.view.getOverworldContainer();
	this.character = null;
	this.overworld = null;
	this.opponent = null; 
}

OverworldController.prototype = Object.create(GamepadProcessingController.prototype);
OverworldController.constructor = OverworldController;

OverworldController.prototype.setCharacter = function(character) {
	this.character = character;
};
OverworldController.prototype.setOverworld = function(overworld) {
	this.overworld = overworld;
	if (overworld != null) this.showActors();
};

OverworldController.prototype.nextFrame = function(inputs) {
	//console.log('OverworldController frame');
	var input = inputs[0];
	var status = input.status;
	if (!status) return;
	if (this.buttonPressed(status.buttons[9])) return this.createReport('showCampaignMenu', {}, input.pi);
	this.processAxes(this.character, status.axes);
	this.processButtons(this.character, status.buttons);
	if (this.opponent) return this.createReport('activateBattle',this.opponent,input.pi);

	this.character.overworldCharacter.move();
	if (this.overworld.collider(this.character)) this.character.overworldCharacter.unmove();
	this.view.setOverworldCharacterPosition(this.character);
};

OverworldController.prototype.interact = function(){
	interaction = this.overworld.interacter(this.character);
	if (!interaction) return;
	if (interaction[0] === 'fight'){
		this.opponent = this.view.createCharacter(interaction[1]);
	}
};

OverworldController.prototype.left = function (character){
	this.character.overworldCharacter.left();
};

OverworldController.prototype.right = function (character){
	this.character.overworldCharacter.right();
};

OverworldController.prototype.up = function (character){
	this.character.overworldCharacter.up();
};

OverworldController.prototype.down = function (character){
	this.character.overworldCharacter.down();
};

OverworldController.prototype.resetState = function(character) {
	// console.log('resetState');
	this.character.overworldCharacter.resetState();
};

OverworldController.prototype.processAction = function(character, action) {
	// console.log('processAction');
	if (action && action.action) this[action.action](character, action.params);
};

OverworldController.prototype.processAxes = function(character, axes) {
	 //console.log('processAxes');
	this.processAction(character, this[character.overworldCharacter.state + 'Axes'](axes));
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

OverworldController.prototype.processButtons = function(character, buttons) {
	// console.log('processButtons');
	this.processAction(character, this[character.overworldCharacter.state + 'Buttons'](buttons));
};

OverworldController.prototype.idleButtons = function(buttons) {
	// console.log('idleButtons');
	if (this.buttonPressed(buttons[1])) return this.createReport('interact', { button: 1 });
};

OverworldController.prototype.walkButtons = function(buttons) {
	// console.log('walkButtons');
};

OverworldController.prototype.show = function() {
	//console.log(this.overworldContainer);
	this.view.show(this.overworldContainer);
	this.showCharacter();
	//this.showActors();
};

OverworldController.prototype.hide = function() {
	// console.log('hide');
	this.view.hide(this.overworldContainer);
};

OverworldController.prototype.showCharacter = function() {
	//console.log(this.character);
	var img = this.character.overworldVisual.down;
	this.drawImage(img);
	this.view.setCharacterPosition(this.character);
};

OverworldController.prototype.showActors = function() {
	var actors = this.overworld.actors;
	for (i=0; i<actors.length; i++){
		var img = actors[i].visual.down;
		actors[i].e = img;
		this.view.addOverworldImage(this.overworldCanvas,img);
		this.view.setCharacterPosition(actors[i]);
	}
};

OverworldController.prototype.drawImage = function(img){
	this.character.e = img;
	this.view.addOverworldImage(this.overworldCanvas,img);
};

OverworldController.prototype.end = function(){
	this.view.clearBattleObjects(this.overworldCanvas);
};

/*
The map information will need to be stored and processed somehow. 
This function loads and manages the map info
*/
OverworldController.prototype.loadMap = function (params){};