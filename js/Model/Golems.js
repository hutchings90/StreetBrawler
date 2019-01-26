function FireGolem() {
	// console.log('FireGolem');
	Golem.call(this, 'Fire');
}

FireGolem.prototype = Object.create(Golem.prototype);
FireGolem.constructor = FireGolem;

function IceGolem() {
	// console.log('IceGolem');
	Golem.call(this, 'Ice');
}

IceGolem.prototype = Object.create(Golem.prototype);
IceGolem.constructor = IceGolem;

function LavaGolem() {
	// console.log('LavaGolem');
	Golem.call(this, 'Lava');
}

LavaGolem.prototype = Object.create(Golem.prototype);
LavaGolem.constructor = LavaGolem;

function PlantGolem() {
	// console.log('PlantGolem');
	Golem.call(this, 'Plant');
}

PlantGolem.prototype = Object.create(Golem.prototype);
PlantGolem.constructor = PlantGolem;

function SandGolem() {
	// console.log('SandGolem');
	Golem.call(this, 'Sand');
}

SandGolem.prototype = Object.create(Golem.prototype);
SandGolem.constructor = SandGolem;

function WindGolem() {
	// console.log('WindGolem');
	Golem.call(this, 'Wind');
}

WindGolem.prototype = Object.create(Golem.prototype);
WindGolem.constructor = WindGolem;