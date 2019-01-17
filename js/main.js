window.onload = function() {
	// console.log('onload');
	var game;
	var gamepads = navigator.getGamepads();
	gamepads = [ gamepads[0], gamepads[1] ];
	game = new StreetBrawlerController(new StreetBrawler(gamepads), new View());
	window.addEventListener('gamepadconnected', function(e) {
		navigator.getGamepads();
		game.gamepadConnected(e.gamepad);
	});
	window.addEventListener('gamepaddisconnected', function(e) {
		navigator.getGamepads();
		game.gamepadDisconnected(e.gamepad);
	});
};

function EMPTY_FUNC(){
	// console.log('EMPTY_FUNC');
}