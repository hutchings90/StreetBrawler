function GamepadReader(gamepad) {
	// console.log('GamepadReader');
	this.NUM_AXES = 2;
	this.halted = false;
	if (gamepad) {
		this.setGamepad(gamepad);
		this.status = new GamepadStatus(this.NUM_AXES, gamepad.buttons.length);
	}
	else {
		this.gamepad = null;
		this.status = new GamepadStatus();
	}
}

GamepadReader.prototype.read = function(player) {
	// console.log('read');
	if (this.halted) return;
	this.readAxes(player);
	this.readButtons(player);
	return Object.create(this.status);
};

GamepadReader.prototype.readButtons = function(player) {
	// console.log('readButtons');
	var gamepad = this.gamepad;
	if (gamepad == typeof GamepadSimulator) { // THIS COULD BE WHERE WE DECIDE AI ACTIONS
		// console.log("AI CONTROLLER");
		// this.moveAI(player, gamepad); // Not much configured for buttons yet
	}
	for (var i in gamepad.buttons) {
		this.status.buttons[i].update(gamepad.buttons[i].pressed);
	}
};

GamepadReader.prototype.readAxes = function(player) {
	// console.log('readAxes');
	var gamepad = this.gamepad; 
	if (gamepad instanceof GamepadSimulator) { // THIS COULD BE WHERE WE DECIDE AI ACTIONS
		// console.log("AI CONTROLLER");
		this.moveAI(player, gamepad);
	}
	for (var i = this.NUM_AXES - 1; i >= 0; i--) {
		this.status.axes[i].update(gamepad.axes[i]);
	}
};

GamepadReader.prototype.reset = function() {
	// console.log('reset');
	this.status = new GamepadStatus(this.NUM_AXES, this.gamepad.buttons.length);
};

GamepadReader.prototype.setGamepad = function(gamepad) {
	// console.log('setGamepad');
	this.gamepad = gamepad;
	this.reset();
};

 

// TODO: Need to make this function call the AIPlayerController to follow MVC patter.
GamepadReader.prototype.moveAI = function(player, gamepad) {
	var pickHorizontalMovement = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	// var pickVerticalMovement = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	var flipToNeg = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	var jumpOrWalk = Math.floor(Math.random() * Math.floor(3)); // Picks a number between 0 and 2
	var attackOrBlock = Math.floor(Math.random() * Math.floor(3)); // Picks a number between 0 and 2

	if (flipToNeg == 0) { pickHorizontalMovement *= -1; }
	// else if (flipToNeg == 1) { pickVerticalMovement *= -1; }

	// Stop the AI from repeatedly doing these same moves until it can act again.
	if (player.isJumping) { // Only make the AI jump once in a row for now
		gamepad.releaseAxis(VERTICLE_AXIS); // Stop moving
		player.toggleJumping();
		jumpOrWalk = 0; // If the AI just jumped, don't let it jump again but make it walk if it does an action.
	}
	if(player.isAttacking) {
		gamepad.releaseButton(ATTACK_JAB);
		player.toggleAttacking();
		var attackOrBlock = Math.floor(Math.random() * Math.floor(2)); // Picks a number between 0 and 1
	}
	if (player.isGrabbing) {
		// gamepad.releaseButton(ATTACK_GRAB);
		// player.toggleGrabbing();
	}

	if (player.canDoMove()) {
		if (player.isWalking) {
			gamepad.releaseAxis(HORIZONTAL_AXIS); // Stop moving
			player.toggleWalking();
		}
		// else { // If the AI isn't doing anything, make it do something
			if (jumpOrWalk < 2) { // AI walks
				gamepad.pressAxis(HORIZONTAL_AXIS, pickHorizontalMovement);
				player.toggleWalking();
			}
			else if (jumpOrWalk == 1) { // AI jumps
				gamepad.pressAxis(VERTICLE_AXIS, MOVE_JUMP);
				player.toggleJumping();
			}
			else if (attackOrBlock == 2) { // AI attacks 
				gamepad.pressButton(ATTACK_JAB);
				player.toggleAttacking();
			}
			else if (attackOrBlock == 1) { // AI blocks
				// gamepad.pressButton();
				// player.toggleBlock();
			}
			else { // Only possible action for checking is blocking
				// gamepad.pressButton();
				// player.toggleGrabbing();
			}
		// }
		player.resetFrequency(); // Always reset the frequency when an action is done
	}
	player.incrementFrequency(); // Always increment the frequency
}