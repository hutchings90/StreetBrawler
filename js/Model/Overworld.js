function Overworld(contentManager) {
	// console.log('Building Overworld');
	this.actors = [];
	this.contentManager = contentManager;
};

//creates a new overworldCharacter object and adds it to the actors list
Overworld.prototype.addActor = function(charName,x,y){
	var actor = {
		character: new OverworldCharacter(charName),
		//audio: this.contentManager.getBattleCharacterAudio(character),
		visual: this.contentManager.getOverworldCharacterVisuals(charName)
	}
	actor.character.x = x;
	actor.character.y = y;
	actors.push(actor);
};

