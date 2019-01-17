function MenuController(view, menu) {
	// console.log('MenuController');
	GamepadProcessingController.call(this, view);
	this.REPORTS = [];
	this.menu = this.view['get' + menu + 'Menu']();
	this.setIndex(0);
}

MenuController.prototype = Object.create(GamepadProcessingController.prototype);
MenuController.constructor = MenuController;

MenuController.prototype.start = function() {
	// console.log('start');
	this.view.show(this.menu);
};

MenuController.prototype.setIndex = function(index) {
	// console.log('setIndex');
};

MenuController.prototype.moveVertical = function() {
	// console.log('moveVertical');
};

MenuController.prototype.moveHorizontal = function() {
	// console.log('moveHorizontal');
};