function TestWorld(contentManager,utils) {
	Overworld.call(this,contentManager,utils);
	this.addActor('PlantGolem',300,300);
}

TestWorld.prototype = Object.create(Overworld.prototype);
TestWorld.constructor = TestWorld;



