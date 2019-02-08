//constructor function as defined below
function BattleController(model, view, utils, contentManager) {
	// console.log('BattleController');
	GamepadProcessingController.call(this, view, utils, contentManager);
	utils.makeControllerVariableInput(this, model, this.controllerActivated);
	this.URGENT_TIME = 15;
	this.ROUNDS = 3;
	this.PRE_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.END_ROUND_FRAMES = FRAMES_PER_SECOND * 3;
	this.FULL_TIME = 99;
	this.battleCharacterController = new BattleCharacterController(view, utils, contentManager);
	this.battleMenuController = new BattleMenuController(view, utils, contentManager);
	this.battleAreaContainer = this.view.getBattleAreaContainer();
	this.battleArea = this.view.getBattleArea();
	this.battleTimer = this.view.getBattleTimer();
	this.activeController = this.battleCharacterController;
	this.battleObjects = this.view.getBattleObjects();
	this.aiControllers = [];
	this.time = this.FULL_TIME;
	this.timerFrames = 0;
	this.preRoundFrames = 0;
	this.endRoundFrames = 0;
	this.round = 0;
	this.quitter = -1;
	this.setCharacters([]);
	this.clearTimer();
}

BattleController.prototype = Object.create(GamepadProcessingController.prototype);
//defines constructor funtion?
BattleController.constructor = BattleController;

/*
Called externally?
starts a new battle
*/
BattleController.prototype.start = function() {
	// console.log('start');
	this.round = 0;
	this.activeController = this.battleCharacterController;
	this.nextFrame = this.preRoundFrame;
	this.initAIControllers();
	this.startRound();
};

/*
Called by start, preRoundFrame
increments round count
sets view.steadyTimer to battleTimer, which is gotten from view?
sets nextFrame to roundFrame
activates AI's
*/
BattleController.prototype.startRound = function() {
	// console.log('startRound');
	this.round++;
	this.view.steadyTimer(this.battleTimer);
	this.nextFrame = this.roundFrame;
	this.activateAI();
};

/*
Starts rounds when preRoundFrames are met
*/
BattleController.prototype.preRoundFrame = function(inputs) {
	// console.log('preRoundFrame');
	if (++this.preRoundFrames >= this.PRE_ROUND_FRAMES) this.startRound();
};

/*
I think this is the default nextFrame function. Calls nextFrame?
*/
BattleController.prototype.roundFrame = function(inputs) {
	// console.log('roundFrame');
	if (!this.activeController) return;
	if (this.activeController == this.battleCharacterController) this.trackTimer();
	var report = this.activeController.nextFrame(inputs);
	if (report) this[report.action](report.pi, report.params);
};

/*
plays out end-round-frame count. if this is the last round, sets nextFrame tp preEndFrame
else, starts new round? With not much fanfare it seems
*/
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

/*
apparently there's a buton, and if it's pressed we progress to end? but end is given no parameter?
*/
BattleController.prototype.preEndFrame = function(inputs) {
	// console.log('preEndFrame');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var input = inputs[i];
		var status = input.status;
		if (!status) continue;
		if (this.buttonPressed(status.buttons[1])) return this.end();
	}
};

/*
returns end
*/
BattleController.prototype.endFrame = function(inputs) {
	// console.log('endFrame');
	return this.end(this.quitter);
};

/*
Called by preEndFrame and endFrame
@param pi = this.quitter, or null?
clears screen, resets characters, and calls createReport
Where is createReport defined?
*/
BattleController.prototype.end = function(pi) {
	// console.log('end');
	this.hide();
	this.clearBattleObjects();
	this.clearTimer();
	this.setCharacters([]);
	return this.createReport('quitBattle', {}, pi);
};

/*
Called externally?
shows battleAreaContainer
calls showCharacters
*/
BattleController.prototype.show = function() {
	// console.log('show');
	this.view.show(this.battleAreaContainer);
	this.showCharacters();
};

/*
Called by end
hides battleAreaContainer
*/
BattleController.prototype.hide = function() {
	// console.log('hide');
	this.view.hide(this.battleAreaContainer);
};

/*
Called by constructor, end, and endRoundFrame
resets time to FULL_TIME, calls view.clearTimer, calls setTimerContents
*/
BattleController.prototype.clearTimer = function() {
	// console.log('clearTimer');
	this.time = this.FULL_TIME;
	this.timerFrames = 0;
	this.view.clearTimer(this.battleTimer);
	this.setTimerContents(this.time);
};

/*
called by clearTimer, decrementTimer
sets time as string in view.setContents. For drawing?
*/
BattleController.prototype.setTimerContents = function(time) {
	// console.log('setTimerContents');
	this.view.setContents(this.battleTimer, time.toString().padStart(2, 0));
};

/*
Called by roundFrame
increment timerFrames up. if it's >= FPS, then it's been 1 second, decrement timer
*/
BattleController.prototype.trackTimer = function() {
	// console.log('trackTimer');
	if (++this.timerFrames >= FRAMES_PER_SECOND) this.decrementTimer();
};

/*
called by trackTimer; counts down timer 
calls view.urgentTimer if time =URGENT_TIME -what's an urgent time?
if time = 0, calls endRound
*/
BattleController.prototype.decrementTimer = function() {
	// console.log('decrementTimer');
	this.timerFrames = 0;
	this.setTimerContents(--this.time);
	if (this.time == this.URGENT_TIME) this.view.urgentTimer(this.battleTimer);
	else if (this.time == 0) this.endRound();
};

/*
Called by decrementTimer
sets nextFrame to endRoundFrame (calls it?)
sets endRoundFrames to 0? What's that mean?
deactivates AI
*/
BattleController.prototype.endRound = function() {
	// console.log('endRound');
	this.view.doneTimer(this.battleTimer);
	this.nextFrame = this.endRoundFrame;
	this.endRoundFrames = 0;
	this.deactivateAI();
};

/*
called by constructor and by end
@param characters = an array of characters
seths this.characters to characters, and sets the characters for BattleCharacterController
*/
BattleController.prototype.setCharacters = function(characters) {
	// console.log('setCharacters');
	this.characters = characters;
	this.battleCharacterController.setCharacters(characters);
};

/*
Called by show
draws all active characters. I'm still unclear on what the purpose of ci is, if we're passing the
character object
*/
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

/*
Called by showCharacters
sets specified character to be drawn in idle poses
calls resetCharacter on specified character
*/
BattleController.prototype.showCharacter = function(character, ci) {
	// console.log('showCharacter');
	var img = character.visual.idle;
	this.view.addBattleImage(this.battleObjects, img);
	character.e = img;
	this.resetCharacter(character, ci);
};

/*
Called by showCharacter
resets specified charater. What does ci represent?
*/
BattleController.prototype.resetCharacter = function(character, ci) {
	// console.log('resetCharacter');
	character.character.reset(ci == 1 ? this.view.BATTLE_AREA_W - character.e.width : 0);
	this.view.resetCharacter(character, ci);
};

/*
Called by end
deletes all objects related to the battle?
*/
BattleController.prototype.clearBattleObjects = function() {
	// console.log('clearBattleObjects');
	this.view.clearBattleObjects(this.battleObjects);
};

/*
called on pause?
sets all players to not playing
deactivates AI's
calls activateController 'battleMenu'
clears the battleTimer? 
*/
BattleController.prototype.showBattleMenu = function(pi, params) {
	// console.log('showBattleMenu');
	this.streetBrawler.players[this.getOtherPlayerIndex(pi)].playing = false;
	this.deactivateAI();
	this.activateController('battleMenu', 'menu', pi);
	this.view.clearTimer(this.battleTimer);
};

/*
called when play resumes from pause?
alows other human player to resume playing, and calls activateController 'battleCharacer'
*/
BattleController.prototype.resume = function(pi, params) {
	// console.log('resume');
	if (this.aiControllers.length < 1) this.streetBrawler.players[this.getOtherPlayerIndex(pi)].playing = true;
	this.activateController('battleCharacter', 'battle', pi);
};

/*
called when a player quits?
sets quitter, sets nextFrame to endFrame; does this mean the endFrame function is called?
*/
BattleController.prototype.quit = function(pi, params) {
	// console.log('quit');
	this.quitter = pi;
	this.nextFrame = this.endFrame;
};

/*
called by start
for each player that playing but not controlled, create a new aiController
*/
BattleController.prototype.initAIControllers = function() {
	// console.log('initAIControllers');
	var players = this.streetBrawler.players;
	this.aiControllers = [];
	for (var i in players) {
		var player = players[i];
		if (player.isAI && player.playing) this.aiControllers.push(new AIController(player));
	}
};

/*
Called by startRound and controllerActivated.
calls activate on each registered aiController
*/
BattleController.prototype.activateAI = function() {
	// console.log('activateAI');
	for (var i in this.aiControllers) {
		this.aiControllers[i].activate();
	}
};

/*
Called by endRound and showBattleMenu
calls deactivate on each aiController
*/
BattleController.prototype.deactivateAI = function() {
	// console.log('deactivateAI');
	for (var i in this.aiControllers) {
		this.aiControllers[i].deactivate();
	}
};

/*
Called by constructor function
if activeCtonroller = battleCharacterController, start battle timer and activate AI's?
*/
BattleController.prototype.controllerActivated = function() {
	// console.log('controllerActivated');
	if (this.activeController == this.battleCharacterController) {
		this.view.steadyTimer(this.battleTimer);
		this.activateAI();
	}
};