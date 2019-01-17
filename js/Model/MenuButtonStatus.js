function MenuButtonStatus(restart) {
	// console.log('MenuButtonStatus');
	MenuStatus.call(this, restart);
}

MenuButtonStatus.prototype = Object.create(MenuStatus.prototype);
MenuButtonStatus.constructor = MenuButtonStatus;