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
 *   This data should only be read; the AI should not manipulate it.
 *   To access character hurtboxes, this.battleController.battleCharacterController.characters[playerIndex].character.hurtboxes[characterState]
 *     See Model/Character.js
 *   To access projectile hurtboxes, this.battleController.battleCharacterController.charactersAttacks[playerIndex][attackIndex].hurtbox
 *     See Model/Attack.js
 */
function AIController(ai, battleController) {
	// console.log('AIController');
	this.ai = ai;
	this.interval = null;
	this.battleController = battleController;
}

/**
 * private
 * Starts an interval for deciding how to control the AIPlayer
 */
AIController.prototype.activate = function() {
	// console.log('activate');
	// this does not refer to this instance of AIController in the inverval
	var me = this;
	me.ai.playing = true;
	me.interval = setInterval(function() { // IPlayer decision making.
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
	var button = 0; // The button we're going to press for the AI.
	var decide = rand(11); // Decides which move will be executed.

	// Pick the faster attacks more often.
	if (decide <= 3) {
		button = ATTACK_JAB;
	}
	else if (decide <= 6) {
		button = ATTACK_LOWKICK;
	}
	// Pick the slower attacks less often.
	else if (decide <= 8) {
		button = ATTACK_HAYMAKER;
	}
	else {
		button = ATTACK_HIGHKICK;
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
	var gamepad = this.ai.gamepadReader.gamepad; // Make a func scoped gamepad variable.
	var state = this.battleController.battleCharacterController.characters[1].character.state; // Make a func scoped state variable
	var pickHorizontalMove = rand(2); // Decides if AI will move left(0) or right(1)
	var stop = rand(4); // Stop the AI from doing anything. 25% chance of stopping
	var willWalk = rand(3); // Decides if AI will walk. 50% chance
	var willJump = rand(6); // Decides if the AI will jump. 16% chance
	var willCrouch = rand(4); // Decides if AI will crouch. 25% chance. NOT READY YET
	var willAttack = rand(2); // Decides if AI will attack. 50% chance
	var willBlock = rand(8); // Decides if AI will block. 13% chance
	var willGrab = rand(10); // Decides if AI will grab. 10% chance

	if (state.includes('jump')) { // Only make the AI jump once for one button input
		gamepad.releaseVerticalAxis(); // Stop jumping
		// willWalk = 0; // If the AI just jumped, don't let it jump again but make it walk if it does an action.
	}
	if (state.includes('Attack') || state.includes('grab')) { // Don't want to make it attack rapidly in a row after 1 button press
		gamepad.clearButtons();
	}

	// 
	if (this.ai.canDoMove()) {
		// console.log("left(0) or right(1)? ", pickHorizontalMove);
		if (state.includes('block')) { // Make the AI stop blocking so it can do a new action
			// console.log("ai stops blocking");
			gamepad.clearButtons();
		}

		if (stop == 0 && !state.includes('idle')) { // Make the AI do nothing until it can act again
			// console.log("ai is idle");
			gamepad.clearButtons();
			gamepad.releaseVerticalAxis();
			gamepad.releaseHorizontalAxis();
		}
		else { // If the AI is idle, make it do something
			// Allow AI to walk or jump
			if (willWalk == 0) { // AI walks
				// console.log("ai walks");
				(rand(2) == 0) ? gamepad.left() : gamepad.right();
			}
			else if (willJump == 0) { // AI jumps
				// console.log("ai jumps");
				gamepad.up();
			}
			else if (willCrouch == 0) { // AI crouches
				// gamepad.down();
			}

			// Allow AI to attack even if walking (but not while jumping)
			if (willAttack == 0 && !state.includes('jump')) { 
				// console.log("ai attacks");
				gamepad.releaseHorizontalAxis(); // Stop AI from walking
				gamepad.pressButton(pickAttack()); // Attack
			}
			else if (willGrab == 0 && !state.includes('jump')) { // AI can grab if not attacking
				// console.log("ai grabs");
				// gamepad.pressButton(GRAB);
			}

			// Allows AI to block if it's walking or idle.
			if (willBlock == 0 && (state.includes('idle') || state.includes('walk'))) {
				// console.log("ai blocks");
				gamepad.releaseHorizontalAxis(); // AI stops walking
				gamepad.pressButton(BLOCK); // AI now blocks
			}
			
		}
		this.ai.resetFrequency(); // Always reset the frequency when an action is done
	}
	this.ai.incrementFrequency(); // Always increment the frequency
};