function Overworld(contentManager,utils) {
	// console.log('Building Overworld');
	this.actors = [];
	this.contentManager = contentManager;
	this.utils = utils;
};

//creates a new overworldCharacter object and adds it to the actors list
Overworld.prototype.addActor = function(charName,x,y){
	newChar = new OverworldCharacter(charName);
	var actor = {
		character: newChar,
		audio: this.contentManager.getOverworldCharacterAudio(newChar),
		visual: this.contentManager.getOverworldCharacterVisuals(newChar),
		onInteract: this.fightInteraction
	}
	actor.character.setX(x);
	actor.character.setY(y);
	this.actors.push(actor);
};

//Given an overworld character, checks for a collision with each actor.
//Returns a boolean object; true for collision, false for no collision
// Chara is an OverworldCharacter object
Overworld.prototype.collider = function(chara){
	collision = false;
	for (var a = 0; a<this.actors.length; a++){
		if (this.utils.collide(chara.overworldCharacter.hurtbox,this.actors[a].character.hurtbox)) collision=true;
	}
	return collision;
};

//Given an overworld character, checks for a collision with each actor, and interracts if there is a collision.
// Chara is an OverworldCharacter object
Overworld.prototype.interacter = function(chara) {
	var hb = {
		x: chara.overworldCharacter.hurtbox.x - 5,
		y: chara.overworldCharacter.hurtbox.y - 5,
		width: chara.overworldCharacter.hurtbox.width +10,
		height: chara.overworldCharacter.hurtbox.height + 10
	};
	for (var a = 0; a<this.actors.length; a++){
		if (this.utils.collide(hb,this.actors[a].character.hurtbox)) return this.actors[a].onInteract(this.actors[a]);
	}
};

Overworld.prototype.fightInteraction = function(actor) {
	ret = ['fight', actor.character.name];
	return ret;
};

//TODO: add interaction function that loads dialogue from external file
