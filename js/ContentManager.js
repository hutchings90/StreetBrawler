function ContentManager(view) {
	// console.log('ContentManager');
	this.ASSET_PATH = 'assets/';
	this.GENERAL_PATH = this.ASSET_PATH + 'general/';
	this.AUDIO_PATH = 'audio/';
	this.VISUAL_PATH = 'visual/';
	this.GENERAL_SOUND_PATH = this.GENERAL_PATH + this.AUDIO_PATH;
	this.GENERAL_VISUAL_PATH = this.GENERAL_PATH + this.VISUAL_PATH;
	this.CHARACTER_PATH = this.ASSET_PATH + 'character/';
	this.GOLEM_PATH = this.CHARACTER_PATH + 'golem/';
	this.view = view;
	this.loadVisuals();
	this.loadAudio();
}

ContentManager.prototype.golemPath = function(golemType) {
	// console.log('golemPath');
	return this.GOLEM_PATH + golemType + 'Golem/';
};

ContentManager.prototype.golemVisualPath = function(golemType) {
	// console.log('golemVisualPath');
	return this.golemPath(golemType) + this.VISUAL_PATH;
};

ContentManager.prototype.golemAudioPath = function(golemType) {
	// console.log('golemAudioPath');
	return this.golemPath(golemType) + this.VISUAL_PATH;
};

ContentManager.prototype.loadVisuals = function() {
	// console.log('loadVisuals')
	this.visuals = {
		FireGolem: this.loadGolemVisuals('Fire'),
		IceGolem: this.loadGolemVisuals('Ice'),
		LavaGolem: this.loadGolemVisuals('Lava'),
		PlantGolem: this.loadGolemVisuals('Plant'),
		SandGolem: this.loadGolemVisuals('Sand'),
		WindGolem: this.loadGolemVisuals('Wind')
	};
};

ContentManager.prototype.loadAudio = function() {
	// console.log('loadAudio')
	this.audio = {
		FireGolem: this.loadGolemAudio('Fire'),
		IceGolem: this.loadGolemAudio('Ice'),
		LavaGolem: this.loadGolemAudio('Lava'),
		PlantGolem: this.loadGolemAudio('Plant'),
		SandGolem: this.loadGolemAudio('Sand'),
		WindGolem: this.loadGolemAudio('Wind'),
		backgroundMusic: this.loadBackgroundMusic()
	};
};

ContentManager.prototype.loadGolemVisuals = function(golemType) {
	// console.log('loadGolemVisuals');
	var path = this.golemVisualPath(golemType);
	return {
		bust: this.view.createBattleCharacterImage(path + 'bust.png'),
		idle: this.view.createBattleCharacterImage(path + 'idle.png', 90),
		walk: this.view.createBattleCharacterImage(path + 'idle.png', 90),
		haymaker: this.view.createBattleCharacterImage(path + 'haymaker.png', 109),
		jab: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		roundhouse: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		special: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		uppercut: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		highKick: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		lowKick: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		crouchSpecial: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		jumpPunchHigh: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		jumpPunchLow: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		jumpKickLow: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		jumpKickHigh: this.view.createBattleCharacterImage(path + 'jab.png', 150),
		block: this.view.createBattleCharacterImage(path + 'block.png', 127),
		overworldBack: this.view.createBattleCharacterImage(path + 'bust.png', 90),
		overworldFront: this.view.createBattleCharacterImage(path + 'bust.png', 90),
		overworldSide: this.view.createBattleCharacterImage(path + 'bust.png', 90)
	};
};

ContentManager.prototype.loadGolemAudio = function(golemType) {
	// console.log('loadGolemAudio');
	var path = this.golemAudioPath(golemType);
	return {};
};

ContentManager.prototype.getOverworldCharacterAudio = function(character) {
	// console.log('getOverworldCharacterAudio');
	return this.getOverworldCharacterAudioFromAsset(this.audio[character.name]);
};

ContentManager.prototype.getOverworldCharacterAudioFromAsset = function(asset) {
	// console.log('getOverworldCharacterAudioFromAsset');
	return {};
};

ContentManager.prototype.getBattleCharacterAudio = function(character) {
	// console.log('getBattleCharacterAudio');
	return this.getBattleCharacterAudioFromAsset(this.audio[character.constructor.name]);
};

ContentManager.prototype.getBattleCharacterAudioFromAsset = function(asset) {
	// console.log('getBattleCharacterAudioFromAsset');
	return {};
};

ContentManager.prototype.getOverworldCharacterVisuals = function(character){
	return this.getOverworldCharacterVisualsFromAsset(this.visuals[character.name]);
};

ContentManager.prototype.getOverworldCharacterVisualsFromAsset = function(asset) {
	return {
		down: asset.overworldFront.cloneNode(true),
		up: asset.overworldBack.cloneNode(true),
		side: asset.overworldSide.cloneNode(true)
	};
};

ContentManager.prototype.getBattleCharacterVisuals = function(character) {
	// console.log('getBattleCharacterVisuals');
	return this.getBattleCharacterVisualsFromAsset(this.visuals[character.name.replace(/ /g, '')]);
};

ContentManager.prototype.getBattleCharacterVisualsFromAsset = function(asset) {
	// console.log('getBattleCharacterVisualsFromAsset');
	return {
		idle: asset.idle.cloneNode(true),
		walk: asset.idle.cloneNode(true),
		haymaker: asset.haymaker.cloneNode(true),
		jab: asset.jab.cloneNode(true),
		roundhouse: asset.roundhouse.cloneNode(true),
		special: asset.special.cloneNode(true),
		uppercut: asset.uppercut.cloneNode(true),
		highKick: asset.highKick.cloneNode(true),
		lowKick: asset.lowKick.cloneNode(true),
		crouchSpecial: asset.crouchSpecial.cloneNode(true),
		jumpPunchHigh: asset.jumpPunchHigh.cloneNode(true),
		jumpPunchLow: asset.jumpPunchLow.cloneNode(true),
		jumpKickLow: asset.jumpKickLow.cloneNode(true),
		jumpKickHigh: asset.jumpKickHigh.cloneNode(true),
		block: asset.block.cloneNode(true),
	};
};

ContentManager.prototype.loadBackgroundMusic = function() {
	return {
		astroid: this.view.createBackgroundMusic(this.GENERAL_SOUND_PATH + 'Astroid.mp3'),
		voyage: this.view.createBackgroundMusic(this.GENERAL_SOUND_PATH + 'Voyage.mp3', .5)
	};
};

ContentManager.prototype.playBackgroundMusic = function(key) {
	// console.log('playBackgroundMusic');
	this.playAudio('backgroundMusic', key);
};

ContentManager.prototype.playAudio = function(key1, key2) {
	// console.log('playAudio');
	this.audio[key1][key2].play();
};

ContentManager.prototype.stopBackgroundMusic = function(key) {
	// console.log('stopBackgroundMusic');
	this.stopAudio('backgroundMusic', key);
};

ContentManager.prototype.stopAudio = function(key1, key2) {
	// console.log('stopAudio');
	var audio = this.audio[key1][key2];
	audio.pause();
	audio.currentTime = 0;
};

ContentManager.prototype.pauseBackgroundMusic = function(key) {
	// console.log('pauseBackgroundMusic');
	this.pauseAudio('backgroundMusic', key);
};

ContentManager.prototype.pauseAudio = function(key1, key2) {
	// console.log('pauseAudio');
	this.audio[key1][key2].pause();
};