function Golem(name) {
	// console.log('Golem');
	Character.call(this, name + ' Golem');
}

Golem.prototype = Object.create(Character.prototype);
Golem.constructor = Golem;