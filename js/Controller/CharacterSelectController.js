function CharacterSelectController(view) {
	// console.log('CharacterSelectController');
	GamepadProcessingController.call(this, view);
	this.characterSelect = this.view.getElement('#character-select');
}

CharacterSelectController.prototype = Object.create(GamepadProcessingController.prototype);
CharacterSelectController.constructor = CharacterSelectController;

CharacterSelectController.prototype.start = function() {
	// console.log('start');
};