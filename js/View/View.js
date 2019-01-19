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

View.prototype.hasClassName = function(e, className) {
	// console.log('hasClassName');
	// console.log(e.className.includes(className), e, className);
	return e.className.includes(className);
};

View.prototype.removeClassName = function(e, className) {
	// console.log('removeClassName');
	this.replaceClassName(e, className, '');
};

View.prototype.addClassName = function(e, className) {
	// console.log('addClassName');
	if (!this.hasClassName(e, className)) {
		if (e.className.length > 0) e.className += ' ';
		e.className += className;
	}
};

View.prototype.replaceClassName = function(e, oldClassName, newClassName) {
	// console.log('replaceClassName');
	var re = new RegExp(oldClassName, 'g');
	e.className = e.className.replace(re, newClassName).replace(/\s+/g, ' ').trim();
};

View.prototype.getOptions = function(e) {
	// console.log('getOptions');
	return e.children;
};

View.prototype.clearOption = function(option) {
	// console.log('clearOption');
	if (option) {
		this.removeClassName(option, 'active');
		this.removeClassName(option, 'selected');
	}
};

View.prototype.activateOption = function(option) {
	// console.log('activateOption');
	if (option) this.addClassName(option, 'active');
};

View.prototype.selectOption = function(option) {
	if (option) this.addClassName(option, 'selected');
};

View.prototype.getOptionData = function(e) {
	// console.log('getOptionData');
	return {
		action: e.dataset['action'] || e.innerHTML,
		params: e.dataset['params'] || {}
	};
};

View.prototype.selectPlayerCharacter = function(options, oi, pi) {
	// console.log('selectPlayerCharacter');
	if (oi < 0 || oi >= options.length) return;
	var indicator = this.getPlayerCharacterIndicator(options, oi, pi);
	this.clearOption(indicator);
	this.selectOption(indicator);
};

View.prototype.activatePlayerCharacter = function(options, oi, pi) {
	// console.log('activatePlayerCharacter');
	if (oi < 0 || oi >= options.length) return;
	var indicator = this.getPlayerCharacterIndicator(options, oi, pi);
	this.clearOption(indicator);
	this.activateOption(indicator);
};

View.prototype.deactivatePlayerCharacter = function(options, oi, pi) {
	// console.log('deactivatePlayerCharacter');
	if (oi < 0 || oi >= options.length) return;
	this.clearOption(this.getPlayerCharacterIndicator(options, oi, pi));
};

View.prototype.isPlayerCharacterSelected = function(options, oi, pi) {
	// console.log('isPlayerCharacterSelected');
	return oi >= 0 && oi < options.length && this.hasClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'selected');
};

View.prototype.getPlayerCharacterIndicator = function(options, oi, pi) {
	// console.log('getPlayerCharacterIndicator');
	if (oi < 0 || pi >= options.length) return null;
	return options[oi].children[1].children[0].children[pi];
};

View.prototype.isPlayerCharacterActive = function(options, oi, pi) {
	// console.log('isPlayerCharacterSelected');
	return oi >= 0 && oi < options.length && this.hasClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'active');
};

View.prototype.clearPlayerCharacter = function(options, oi, pi) {
	// console.log('clearPlayerCharacter');
	if (oi >= 0 && oi < options.length) this.replaceClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'selected', 'active');
};