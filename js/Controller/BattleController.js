function BattleController(model, view, utils, contentManager) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model);
	this.URGENT_TIME = 15;
	this.ROUNDS = 3;
	this.PRE_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.END_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.FULL_TIME = 20;
	this.battleCharacterController = new BattleCharacterController(view, utils, contentManager);
	this.battleMenuController = new BattleMenuController(view, utils, contentManager);
	this.battleAreaContainer = this.view.getBattleAreaContainer();
	this.battleArea = this.view.getBattleArea();
	this.battleTimer = this.view.getBattleTimer();
	this.activeController = this.battleCharacterController;
	this.battleObjects = this.view.getBattleObjects();
	this.healthBars = this.view.getBattleHealthBars();
	this.time = this.FULL_TIME;
	this.timerFrames = 0;
	this.preRoundFrames = 0;
	this.endRoundFrames = 0;
	this.round = 0;
	this.characters = [];
	this.clearTimer();
}

BattleController.prototype = Object.create(GamepadProcessingController.prototype);
BattleController.constructor = BattleController;

BattleController.prototype.start = function() {
	// console.log('start');
	this.round = 0;
	this.activeController = this.battleCharacterController;
	this.nextFrame = this.preRoundFrame;
	this.startRound();
};

BattleController.prototype.startRound = function() {
	// console.log('startRound');
	this.round++;
	this.view.steadyTimer(this.battleTimer);
	this.nextFrame = this.roundFrame;
};

BattleController.prototype.preRoundFrame = function(inputs) {
	// console.log('preRoundFrame');
	if (++this.preRoundFrames >= this.PRE_ROUND_FRAMES) this.startRound();
};

BattleController.prototype.roundFrame = function(inputs) {
	// console.log('roundFrame');
	this.trackTimer();
	var report = this.activeController.nextFrame(inputs);
	if (report) this[report.action](report.pi, report.params);
};

BattleController.prototype.endRoundFrame = function(inputs) {
	// console.log('endRoundFrame');
	if (++this.endRoundFrames >= this.END_ROUND_FRAMES) {
		if (this.round >= this.ROUNDS) this.nextFrame = this.preEndFrame;
		else {
			this.clearTimer();
			this.nextFrame = this.preRoundFrame;
			this.preRoundFrames = 0;
		}
	}
};

BattleController.prototype.preEndFrame = function(inputs) {
	// console.log('preEndFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		var pi = input.pi;
		if (!status) continue;
		if (this.menuButtonsPressed(status.buttons, [ 1 ], pi)) return this.end();
	}
};

BattleController.prototype.end = function(pi) {
	// console.log('end');
	this.hide();
	this.clearBattleObjects();
	this.clearTimer();
	this.characters = [];
	return {
		action: 'quitBattle',
		pi: pi,
		params: {}
	};
};

BattleController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.battleAreaContainer);
	this.showCharacters();
};

BattleController.prototype.hide = function() {
	// console.log('hide');
	this.view.hide(this.battleAreaContainer);
};

BattleController.prototype.clearTimer = function() {
	// console.log('clearTimer');
	this.time = this.FULL_TIME;
	this.timerFrames = 0;
	this.view.clearTimer(this.battleTimer);
	this.setTimerContents(this.time);
};

BattleController.prototype.setTimerContents = function(time) {
	// console.log('setTimerContents');
	this.view.setContents(this.battleTimer, time.toString().padStart(2, 0));
};

BattleController.prototype.trackTimer = function() {
	// console.log('trackTimer');
	if (++this.timerFrames >= FRAMES_PER_SECOND) this.decrementTimer();
};

BattleController.prototype.decrementTimer = function() {
	// console.log('decrementTimer');
	this.timerFrames = 0;
	this.setTimerContents(--this.time);
	if (this.time == this.URGENT_TIME) this.view.urgentTimer(this.battleTimer);
	else if (this.time == 0) this.endRound();
};

BattleController.prototype.endRound = function() {
	// console.log('endRound');
	this.view.doneTimer(this.battleTimer);
	this.nextFrame = this.endRoundFrame;
	this.endRoundFrames = 0;
};

BattleController.prototype.setCharacters = function(characters) {
	// console.log('setCharacters');
	this.characters = characters;
};

BattleController.prototype.showCharacters = function() {
	// console.log('showCharacters');
	var ci = 1;
	var characters = this.characters;
	var players = this.streetBrawler.players;
	for (var i = characters.length - 1; i >= 0; i--) {
		var character = characters[i];
		if (players[character.pi].isActive()) this.showCharacter(character, ci--);
	}
};

BattleController.prototype.showCharacter = function(character, pi) {
	// console.log('showCharacter');
	var healthBar = this.healthBars[pi];
	this.view.addBattleImage(this.battleObjects, character.visual.idle, character.pi);
	this.view.setBattleNametag(healthBar, character.character.name);
	this.view.setBattleHealth(healthBar, character.character.health);
};

BattleController.prototype.clearBattleObjects = function() {
	// console.log('clearBattleObjects');
	this.view.clearBattleObjects(this.battleObjects);
};