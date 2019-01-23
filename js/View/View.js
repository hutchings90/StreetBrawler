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

View.prototype.getBattleMenu = function() {
	// console.log('getBattleMenu');
	return this.getElement('#battle-menu');
};

View.prototype.getBattleAreaContainer = function() {
	// console.log('getBattleAreaContainer');
	return this.getElement('#battle-area-container');
};

View.prototype.getBattleArea = function() {
	// console.log('getBattleArea');
	return this.getElement('#battle-area');
};

View.prototype.getBattleTimer = function() {
	// console.log('getBattleTimer');
	return this.getElement('#battle-timer p');
};

View.prototype.getCharacterSelectMenu = function() {
	// console.log('getCharacterSelect');
	return this.getElement('#character-select');
};

View.prototype.getBattleStartButton = function() {
	// console.log('getBattleStartButton');
	return this.getElement('#battle-start');
};

View.prototype.getCharacterDetail = function() {
	// console.log('getCharacterDetail');
	return this.getElement('#character-detail');
};

View.prototype.getOverworld = function() {
	// console.log('getOverworld');
	return this.getElement('#overworld');
};

View.prototype.getBattleObjects = function() {
	// console.log('getBattleObjects');
	return this.getElement('#battle-objects');
};

View.prototype.show = function(e) {
	// console.log('show');
	this.removeClassName(e, this.HIDE_CLASS);
};

View.prototype.hide = function(e) {
	// console.log('show');
	this.addClassName(e, this.HIDE_CLASS);
};

View.prototype.isHidden = function(e) {
	// console.log('isHidden');
	return this.hasClassName(e, 'hide');
};

View.prototype.hasClassName = function(e, className) {
	// console.log('hasClassName');
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

View.prototype.getOptionAction = function(e) {
	// console.log('getOptionAction');
	return e.dataset['action'] || e.innerHTML;
};

View.prototype.selectPlayerCharacter = function(options, oi, pi) {
	// console.log('selectPlayerCharacter');
	var indicator = this.getPlayerCharacterIndicator(options, oi, pi);
	this.clearOption(indicator);
	this.selectOption(indicator);
};

View.prototype.activatePlayerCharacter = function(options, oi, pi) {
	// console.log('activatePlayerCharacter');
	var indicator = this.getPlayerCharacterIndicator(options, oi, pi);
	this.clearOption(indicator);
	this.activateOption(indicator);
};

View.prototype.deactivatePlayerCharacter = function(options, oi, pi) {
	// console.log('deactivatePlayerCharacter');
	this.clearOption(this.getPlayerCharacterIndicator(options, oi, pi));
};

View.prototype.isPlayerCharacterSelected = function(options, oi, pi) {
	// console.log('isPlayerCharacterSelected');
	return this.hasClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'selected');
};

View.prototype.getPlayerCharacterIndicator = function(options, oi, pi) {
	// console.log('getPlayerCharacterIndicator');
	return options[oi].children[1].children[0].children[pi];
};

View.prototype.isPlayerCharacterActive = function(options, oi, pi) {
	// console.log('isPlayerCharacterSelected');
	return this.hasClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'active');
};

View.prototype.clearPlayerCharacter = function(options, oi, pi) {
	// console.log('clearPlayerCharacter');
	this.replaceClassName(this.getPlayerCharacterIndicator(options, oi, pi), 'selected', 'active');
};

View.prototype.getCharacterName = function(options, oi) {
	// console.log('getCharacterName');
	return options[oi].dataset['name'];
};

View.prototype.setContents = function(e, contents) {
	// console.log('setContents');
	e.innerHTML = contents;
};

View.prototype.clearTimer = function(e) {
	// console.log('clearTimer')
	this.removeClassName(e, e.className);
};

View.prototype.updateTimer = function(e, className) {
	// console.log('updateTimer');
	this.clearTimer(e);
	this.addClassName(e, className);
};

View.prototype.steadyTimer = function(e) {
	// console.log('steadyTimer');
	this.updateTimer(e, 'steady');
};

View.prototype.urgentTimer = function(e) {
	// console.log('urgentTimer');
	this.updateTimer(e, 'urgent');
};

View.prototype.doneTimer = function(e) {
	// console.log('doneTimer');
	this.updateTimer(e, 'done');
};