function TestWorld(contentManager) {
	Overworld.call(this,contentManager);
	this.addActor('Plant',0,0);
}

TestWorld.prototype = Object.create(Overworld.prototype);
TestWorld.constructor = TestWorld;



