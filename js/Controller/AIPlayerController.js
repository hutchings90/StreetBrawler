/**
 * @file
 * Provides AI decision making.
 */

/**
 * Holds the AI model and intervals used for AIPlayers
 * @param {AIPlayer} ai
 *   The AIPlayer that will be controlled
 * @param {BattleController}
 *   The BattleController with information regarding hurtboxes.
 *   This data should only be READ; the AI should NOT manipulate it.
 *   To access character hit/hurt boxes, battleCharacterController.get{Hit/Hurt}(battleCharacterController.characters[playerIndex])
 *     See Model/Character.js, make{Hurt/Hit}box
 *   To access projectile hitboxes, battleCharacterController.projectiles[playerIndex][projectileIndex]
 *     See Model/Character.js, createProjectile function
 */
function AIController(ai, battleController) {
	// console.log('AIController');
	this.ai = ai;
	this.interval = null;
	this.battleController = battleController;
	// this.aiHurtbox = battleController.battleCharacterController.getHurtbox(battleController.battleCharacterController.characters[1]);
	// this.aiHitbox = battleController.battleCharacterController.getHitbox(battleController.battleCharacterController.characters[1]);
}

/**
 * private
 * Starts an interval for deciding how to control the AIPlayer
 */
AIController.prototype.activate = function() {
	// console.log('activate');
	// this does not refer to this instance of AIController in the inverval
	let me = this;
	me.ai.playing = true;
	me.interval = setInterval(function() { // IPlayer decision making.
		// me.getHurtBox(); // Hurtboxes seem to work even without this.
		me.makeRandomDecision();
	}, me.ai.getDifficultyFrequency());
};

/**
 * private
 * Stops the interval for deciding how to control the AIPlayer
 */
AIController.prototype.deactivate = function() {
	// console.log('deactivate');
	this.ai.playing = false;
	clearInterval(this.interval);
	this.interval = null;
};

AIController.prototype.getHurtBox = function() {
	this.aiHurtbox = battleController.battleCharacterController.getHurtbox(battleController.battleCharacterController.characters[1]);
};

/**
 * This will randomly return a number from 0 to num-1.
 * @param num
 * 		This number will decide how far the random will go.
 */
rand = function(num) {
	return Math.floor(Math.random() * Math.floor(num));
}

/** 
 * This randomly picks one of the 4 attacks a character can do.
 * This is excluding grabs.
 */
pickAttack = function() {
	let button = 0; // The button we're going to press for the AI.
	let decide = rand(9); // Decides which move will be executed.

	// Pick the faster attacks more often.
	if (decide <= 3) {
		button = ATTACK_HAYMAKER;
	}
	else if (decide <= 6) {
		button = ATTACK_JAB;
	}
	// Pick the slower attacks less often.
	else if (decide <= 8) {
		button = ATTACK_PROJECTILE;
	}
	else {
		// button = ATTACK_HIGHKICK; // Not working right now
	}

	return button; // Return the index of the attack button
}

/**
 * private
 * Determines which buttons/axes should be pressed/released.
 * 
 * Since the AI makes a decision depending on the amount of time passed instead of frames,
 * we have to consider that every button/axis pressed will be pressed for a certain amount of time.
 * So far, jumping, grabbing, and attacking (all moves that should only execute ONCE per button press),
 * will be released the very next time this funciton is called. That way the AI isn't always jumping 
 * until the AI can make its next decision.
 * 
 * FUTURE IMPLEMENTATION IDEAS:
 * Maybe adjust the frequency of actions by taking the difficulty_frequency / randomized_number.
 * Once the game can track where the other player is on the screen, the ai can be manipulated as such:
 *	- Move towards the other player more often
 *	- Allow grabbing to occur when within grab range/proximity
 */
AIController.prototype.makeRandomDecision = function() {
	let gamepad = this.ai.gamepadReader.gamepad; // Make a func scoped gamepad variable.
	let state = this.battleController.battleCharacterController.characters[1].character.state; // Make a func scoped state variable
	let stop = rand(6); // Stop the AI from doing anything. 17% chance of stopping
	let willWalk = rand(2); // Decides if AI will walk. 50% chance
	let willJump = rand(6); // Decides if the AI will jump. 17% chance
	// let willCrouch = rand(4); // NOT READY YET
	let willAttack = rand(3); // Decides if AI will attack. 33% chance
	let willBlock = rand(8); // Decides if AI will block. 13% chance
	// let willGrab = rand(10); // NOT READY YET

	if (state.includes('jump')) { // Only make the AI jump once for one button input
		gamepad.releaseVerticalAxis(); // Stop jumping
		// willWalk = 0; // If the AI just jumped, don't let it jump again but make it walk if it does an action.
	}
	if (state.includes('Attack') || state.includes('grab')) { // Don't want to make it attack rapidly in a row after 1 button press
		gamepad.clearButtons();
	}

	// 
	if (this.ai.canDoMove()) {
		// console.log("NEW AI MOVE");
		if (stop == 0 && !state.includes('idle') && this.ai.getDifficultyFrequency() != HARD) { // Make the AI do nothing if it was doing an action. If on hard mode, never make it stop doing actions
			// console.log("ai is idle");
			gamepad.clearButtons();
			gamepad.releaseVerticalAxis();
			gamepad.releaseHorizontalAxis();
		}
		else { // If the AI is idle, make it do something
			// Allow AI to walk or jump
			if (willWalk == 0) { // AI walks
				// console.log("ai walks");
				(rand(4) == 0) ? gamepad.right() : gamepad.left(); // Pick to move left more often
			}
			if (willJump == 0) { // AI jumps
				// console.log("ai jumps");
				let doSideJump = rand(2);
				if (doSideJump == 0 && state.includes('walk')) { // decides if the ai will do a side jump while walking
					gamepad.releaseHorizontalAxis(); // Do a verticle jump
				}
				else if (doSideJump == 0 && !state.includes('walk')) {
					// console.log("decide to move left or right");
					(rand(3) == 0) ? gamepad.right() : gamepad.left(); // Pick to move left more often
				}
				gamepad.up();
			}
			// else if (willCrouch == 0) { // AI crouching isn't implemented yet
			// 	gamepad.down();
			// }

			// Allow AI to attack if not walking or jumping
			if (willAttack == 0) { 
				// console.log("ai attacks");
				gamepad.releaseHorizontalAxis(); // Stop AI from walking
				gamepad.releaseVerticalAxis(); // Stop AI jumping
				gamepad.pressButton(pickAttack()); // Attack
			}
			// else if (willGrab == 0 && !state.includes('jump')) { // Grab not implemented yet
			// 	console.log("ai grabs");
			// 	gamepad.pressButton(GRAB);
			// }

			// Allows AI to block if it's attacking or idle.
			if (willBlock == 0) {
				// console.log("ai blocks");
				gamepad.releaseHorizontalAxis(); // AI stops walking
				gamepad.pressButton(BLOCK); // AI now blocks
			}
			
		}
		this.ai.resetFrequency(); // Always reset the frequency when an action is done
	}
	this.ai.incrementFrequency(); // Always increment the frequency
};