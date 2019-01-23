function BattleController(view) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view);
	this.URGENT_TIME = 15;
	this.ROUNDS = 3;
	this.PRE_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.END_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.FULL_TIME = 10;
	this.battleCharacterController = new BattleCharacterController(view);
	this.battleMenuController = new BattleMenuController(view);
	this.battleAreaContainer = this.view.getBattleAreaContainer();
	this.battleArea = this.view.getBattleArea();
	this.battleTimer = this.view.getBattleTimer();
	this.activeController = this.battleCharacterController;
	this.battleObjects = this.view.getBattleObjects();
	this.time = this.FULL_TIME;
	this.timerFrames = 0;
	this.preRoundFrames = 0;
	this.endRoundFrames = 0;
	this.round = 0;
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
	this.activeController.nextFrame(inputs);
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
	this.clearTimer();
	return {
		action: 'quitBattle',
		pi: pi,
		params: {}
	};
};

BattleController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.battleAreaContainer);
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
	this.view.setContents(this.battleTimer, this.time);
};

BattleController.prototype.trackTimer = function() {
	// console.log('trackTimer');
	if (++this.timerFrames >= FRAMES_PER_SECOND) this.decrementTimer();
};

BattleController.prototype.decrementTimer = function() {
	// console.log('decrementTimer');
	this.timerFrames = 0;
	this.view.setContents(this.battleTimer, --this.time)
	if (this.time == this.URGENT_TIME) this.view.urgentTimer(this.battleTimer);
	else if (this.time == 0) this.endRound();
};

BattleController.prototype.endRound = function() {
	// console.log('endRound');
	this.view.doneTimer(this.battleTimer);
	this.nextFrame = this.endRoundFrame;
	this.endRoundFrames = 0;
};