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
		visual: this.contentManager.getOverworldCharacterVisuals(newChar)
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
		if (this.utils.collide(chara.character.hurtbox,this.actors[a].character.hurtbox)) collision=true;
	}
	return collision;
};

