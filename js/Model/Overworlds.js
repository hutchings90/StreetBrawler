function TestWorld(contentManager) {
	Overworld.call(this,contentManager);
	this.addActor('PlantGolem',0,0);
}

TestWorld.prototype = Object.create(Overworld.prototype);
TestWorld.constructor = TestWorld;



