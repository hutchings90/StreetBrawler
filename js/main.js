const FRAME_MS = 20;
const FRAMES_PER_SECOND = 1000 / FRAME_MS;

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
	new TestingController(new Testing(startSimulatedGame()));
}

function startAI() {
	// console.log('startAI');
	new AIController(new AI(startSimulatedGame()));
}

function startSimulatedGame() {
	// console.log('startSimulatedGame');
	return startGame([ new GamepadSimulator(), new GamepadSimulator() ]);
}

function startProduction() {
	// console.log('startProduction');
	var gamepads = navigator.getGamepads();
	startGame([ gamepads[0], gamepads[1] ]);
}

function startGame(gamepads) {
	// console.log('startGame');
	var view = new View();
	var game = new StreetBrawlerController(new StreetBrawler(gamepads), view, new Utils(), new ContentManager(view));
	window.addEventListener('gamepadconnected', function(e) {
		navigator.getGamepads();
		game.gamepadConnected(e.gamepad);
	});
	window.addEventListener('gamepaddisconnected', function(e) {
		navigator.getGamepads();
		game.gamepadDisconnected(e.gamepad);
	});
	return game;
}