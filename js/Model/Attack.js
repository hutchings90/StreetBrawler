/**
 * @file
 * UNDER CONSTRUCTION
 * Provides Attack model used for character projectile attacks.
 */

/**
 * Constructor
 */
function Attack() {
	// console.log('Attack');
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.hurtbox = {
		x: 0,
		y: 0,
		height: 0,
		width: 0
	};
}