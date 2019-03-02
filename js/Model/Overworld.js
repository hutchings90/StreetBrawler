function Overworld() {
	// console.log('Building Overworld');
	this.actors = [];
};

//creates a new overworldCharacter object and adds it to the actors list
Overworld.prototype.loadActor = function(charName,x,y){
	var actor = {
		character: new OverworldCharacter(character),
		//audio: this.contentManager.getBattleCharacterAudio(character),
		visual: this.contentManager.getOverworldCharacterVisuals(character)
	}
	actor.character.x = x;
	actor.character.y = y;
	actors.push(actor);
};