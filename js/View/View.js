function View() {
	// console.log('View');
	this.HIDE_CLASS = 'hide';
}

View.prototype.getElement = function(selector) {
	// console.log('selector');
	return document.querySelector(selector);
};

View.prototype.getMainMenu = function() {
	// console.log('getMainMenu');
	return this.getElement('#main-menu');
};

View.prototype.getGameMenu = function() {
	// console.log('getGameMenu');
	return this.getElement('#game-menu');
};

View.prototype.getBattleArea = function() {
	// console.log('getBattleArea');
	return this.getElement('#battle-area');
};

View.prototype.getCharacterSelect = function() {
	// console.log('getCharacterSelect');
	return this.getElement('#character-select');
};

View.prototype.getCharacterDetails = function() {
	// console.log('getCharacterDetails');
	return this.getElement('#character-details');
};

View.prototype.show = function(e) {
	// console.log('show');
	this.removeClassName(e, this.HIDE_CLASS);
};

View.prototype.hide = function(e) {
	// console.log('show');
	this.addClassName(e, this.HIDE_CLASS);
};

View.prototype.removeClassName = function(e, className) {
	// console.log('removeClassName');
	var re = new RegExp(className, 'g');
	e.className = e.className.replace(re, '').replace(/\s+/g, ' ').trim();
};

View.prototype.addClassName = function(e, className) {
	// console.log('addClassName');
	if (!e.match(className)) e.className += className;
};