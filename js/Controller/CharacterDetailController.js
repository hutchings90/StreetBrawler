function CharacterDetailController(view, utils) {
	// console.log('CharacterDetailController');
	GamepadProcessingController.call(this, view, utils);
	this.characterDetail = this.view.getElement('#character-detail');
}

CharacterDetailController.prototype = Object.create(GamepadProcessingController.prototype);
CharacterDetailController.constructor = CharacterDetailController;

CharacterDetailController.prototype.start = function() {
	// console.log('start');
};