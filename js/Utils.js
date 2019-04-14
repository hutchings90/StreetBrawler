function Utils() {
	// console.log('Utils');
}

Utils.prototype.makeControllerVariableInput = function(controller, model, controllerActivated) {
	// console.log('makeControllerVariableInput');
	controller.timeout = null;
	controller.streetBrawler = model;
	controller.activateController = function(controllerName, mode, pi) {
		 //console.log('activateController');
		var me = this;
		var nextController = me[controllerName + 'Controller'];
		me.streetBrawler.setGamepadHalted(true);
		nextController.show();
		me.activeController = null;
		clearTimeout(me.timeout);
		me.timeout = setTimeout(function() {
			me.activeController = nextController;
			me.activeController.activator = pi;
			me.activeController.start();
			me.streetBrawler.setGamepadHalted(false);
			me.streetBrawler.setGamepadMode(mode);
			me.controllerActivated();
		}, 1000);
	};
	controller.controllerActivated = controllerActivated || function() {
		 //console.log('controllerActivated');
	};
};

Utils.prototype.charactersCollide = function(c1, c2) {
	// console.log('charactersCollide');
	return this.collide(this.characterHitboxArea(c1), this.characterHitboxArea(c2));
};

Utils.prototype.collide = function(obj1, obj2) {
	// console.log('collide');
	return !(obj1.x + obj1.width < obj2.x || obj1.y + obj1.height < obj2.y || obj1.x > obj2.x + obj2.width || obj1.y > obj2.y + obj2.height);
};

Utils.prototype.characterHitboxArea = function(character) {
	// console.log('characterHitboxArea');
	var c = character.character;
	if (c.direction == 'left') var x = c.x + c.hurtbox.x;
	else var x = c.x + character.visual.idle.width - c.hurtbox.x - c.hurtbox.width;
	return {
		x: x,
		y: c.y + c.hurtbox.y,
		height: c.hurtbox.height,
		width: c.hurtbox.width
	};
};