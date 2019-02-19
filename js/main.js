const FRAME_MS = 20;
const FRAMES_PER_SECOND = 1000 / FRAME_MS;
var test = null;

window.onload = function() {
	// console.log('onload');
	document.getElementById('development-menu-container').className = '';
};

function start(enviro) {
	// console.log('start');
	document.getElementById('development-menu-container').className = 'hide';
	document.getElementById('street-brawler').className = '';
	window[enviro]();
}

function startTesting() {
	// console.log('startTesting');
	test = new TestingController(new Testing(startGame([ new GamepadSimulator(), new GamepadSimulator() ], true)));
}

function startProduction() {
	// console.log('startProduction');
	var gamepads = navigator.getGamepads();
	var game = startGame([ gamepads[0], gamepads[1] ], false);
	window.addEventListener('gamepadconnected', function(e) {
		navigator.getGamepads();
		game.gamepadConnected(e.gamepad);
	});
	window.addEventListener('gamepaddisconnected', function(e) {
		navigator.getGamepads();
		game.gamepadDisconnected(e.gamepad);
	});
}

function startGame(gamepads, testing) {
	// console.log('startGame');
	var view = new View();
	return new StreetBrawlerController(new StreetBrawler(gamepads), view, new Utils(), new ContentManager(view), testing);
}