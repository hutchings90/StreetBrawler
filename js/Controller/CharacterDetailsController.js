function CharacterDetailsController(view) {
	// console.log('CharacterDetailsController');
	GamepadProcessingController.call(this, view);
	this.characterDetails = this.view.getElement('#character-details');
}

CharacterDetailsController.prototype = Object.create(GamepadProcessingController.prototype);
CharacterDetailsController.constructor = CharacterDetailsController;

CharacterDetailsController.prototype.start = function() {
	// console.log('start');
};