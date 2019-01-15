window.onload = function() {
	// console.log('onload');
	var gamepads = navigator.getGamepads();
	gamepads = [ gamepads[0], gamepads[1] ];
	var game = new StreetBrawlerController(new StreetBrawler(gamepads), new View());
	game.start();
	window.addEventListener('gamepadconnected', function(e) {
		navigator.getGamepads();
		game.gamepadConnected(e.gamepad);
	});
	window.addEventListener('gamepaddisonnected', function(e) {
		navigator.getGamepads();
		game.gamepadDisconnected(e.gamepad);
	})
};