function Overworld(contentManager) {
	// console.log('Building Overworld');
	this.actors = [];
	this.contentManager = contentManager;
};

//creates a new overworldCharacter object and adds it to the actors list
Overworld.prototype.addActor = function(charName,x,y){
	newChar = new OverworldCharacter(charName);
	var actor = {
		character: newChar,
		audio: this.contentManager.getOverworldCharacterAudio(newChar),
		visual: this.contentManager.getOverworldCharacterVisuals(newChar)
	}
	actor.character.x = x;
	actor.character.y = y;
	this.actors.push(actor);
};

