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

View.prototype.getPauseMenu = function() {
	// console.log('getPauseMenu');
	return this.getElement('#pause-menu');
};

View.prototype.getBattleArea = function() {
	// console.log('getBattleArea');
	return this.getElement('#battle-area');
};

View.prototype.getCharacterSelectMenu = function() {
	// console.log('getCharacterSelect');
	return this.getElement('#character-select');
};

View.prototype.getCharacterDetail = function() {
	// console.log('getCharacterDetail');
	return this.getElement('#character-detail');
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
	if (!e.className.match(className)) {
		if (e.className.length > 0) e.className += ' ';
		e.className += className;
	}
};

View.prototype.getOptions = function(e) {
	// console.log('getOptions');
	return e.children;
};

View.prototype.clearOption = function(option) {
	// console.log('clearOption');
	if (option) this.removeClassName(option, 'active');
};

View.prototype.setOption = function(option) {
	// console.log('setOption');
	if (option) this.addClassName(option, 'active');
};

View.prototype.getOptionData = function(e) {
	// console.log('getOptionData');
	return {
		action: e.dataset['action'] || e.innerHTML,
		params: e.dataset['params'] || {}
	};
};