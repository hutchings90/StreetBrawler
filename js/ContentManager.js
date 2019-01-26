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
		WindGolem: this.loadGolemAudio('Wind')
	};
};

ContentManager.prototype.loadGolemVisuals = function(golemType) {
	// console.log('loadGolemVisuals');
	var path = this.golemVisualPath(golemType);
	return {
		bust: this.view.createImage(path + 'bust.png', 60),
		idle: this.view.createImage(path + 'idle.png', 60)
	};
};

ContentManager.prototype.loadGolemAudio = function(golemType) {
	// console.log('loadGolemAudio');
	var path = this.golemAudioPath(golemType);
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

ContentManager.prototype.getBattleCharacterVisuals = function(character) {
	// console.log('getBattleCharacterVisuals');
	return this.getBattleCharacterVisualsFromAsset(this.visuals[character.name.replace(/ /g, '')]);
};

ContentManager.prototype.getBattleCharacterVisualsFromAsset = function(asset) {
	// console.log('getBattleCharacterVisualsFromAsset');
	return {
		idle: asset.idle.cloneNode(true)
	};
};