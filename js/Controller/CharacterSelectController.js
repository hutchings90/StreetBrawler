function CharacterSelectController(view) {
	// console.log('CharacterSelectController');
	MenuController.call(this, view, 'CharacterSelect');
}

CharacterSelectController.prototype = Object.create(MenuController.prototype);
CharacterSelectController.constructor = CharacterSelectController;