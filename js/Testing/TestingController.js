function TestingController(model) {
	// console.log('TestingController');
	// INTERLUDE_TIME used to wait while active controllers are switch
	//   (i.e. CharacterSelectController to BattleController).
	this.INTERLUDE_TIME = 5000;
	this.REPEAT = 360;
	this.BEFORE_REPEAT = this.REPEAT / 2;
	this.AFTER_REPEAT = this.REPEAT + 1;
	this.PREPEAT = 160;
	this.BEFORE_PREPEAT = this.PREPEAT / 2;
	this.AFTER_PREPEAT = this.PREPEAT + 1;
	this.MAIN_MENU_START_REPORT = 'Main Menu starting index';
	this.MAIN_MENU_DOWN_REPORT_PREFIX = 'Active Main Menu option - ';
	this.model = model;
	this.gamepad1 = model.game.streetBrawler.players[0].gamepadReader.gamepad;
	this.gamepad2 = model.game.streetBrawler.players[1].gamepadReader.gamepad;
	this.failures = [];
	this.successes = [];
	this.mainMenu = document.getElementById('main-menu');
	this.runTests();
}

TestingController.prototype.report = function() {
	// console.log('report');
	console.log('-- Successes -----------------------------------');
	console.log(this.successes);
	console.log('-- End Successes -------------------------------');
	console.log('-- Failures ------------------------------------');
	console.log(this.failures);
	console.log('-- End Failures --------------------------------');
};

TestingController.prototype.runTests = function() {
	// console.log('runTests');
	var me = this;
	me.successes = [];
	me.failures = [];
	setTimeout(function() {
		me.testMainMenu(function() {
			me.report();
		});
	}, me.INTERLUDE_TIME);
};

TestingController.prototype.testMainMenu = function(cb) {
	// console.log('testMainMenu');
	if (!this.mainMenuOptionActive(0)) this.addFailure(this.MAIN_MENU_START_REPORT);
	else this.addSuccess(this.MAIN_MENU_START_REPORT);
	this.mainMenuDownTest(1, cb);
};

TestingController.prototype.mainMenuOptionActive = function(i) {
	// console.log('mainMenuOptionActive');
	var regex = /active/;
	var options = this.mainMenu.children;
	for (var k = options.length - 1; k >= 0; k--) {
		var isActive = regex.test(options[k].className);
		if (i == k) {
			if (!isActive) return false;
		}
		else if (isActive) return false;
	}
	return true;
};

TestingController.prototype.mainMenuDownTest = function(i, cb) {
	// console.log('mainMenuDownTest');
	var me = this;
	var report = me.MAIN_MENU_DOWN_REPORT_PREFIX + i;
	setTimeout(function() {
		me.gamepad1.down();
		setTimeout(function() {
			me.gamepad1.releaseVerticalAxis();
			if (!me.mainMenuOptionActive(i)) me.addFailure(report);
			else me.addSuccess(report);
			if (cb) cb();
		}, me.BEFORE_REPEAT);
	}, me.BEFORE_REPEAT);
};

TestingController.prototype.addSuccess = function(success) {
	// console.log('addSuccess');
	this.successes.push(success);
};

TestingController.prototype.addFailure = function(failure) {
	// console.log('addFailure');
	this.failures.push(failure);
};