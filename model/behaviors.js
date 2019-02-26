class Behaviors{
	constructor(behaviors_array){
		this.behaviors_array = behaviors_array;
	}

	search(index){
		return this.behaviors_array[index - 1];
	}

	newBehavior(behavior){
		return this.behaviors_array.push(behavior);
	}

	deleteBehavior(behavior){
		if(this.behaviors_array.includes(behavior)){
			let index_of_behavior = this.behaviors_array.indexOf(behavior);
			return this.behaviors_array.splice(index_of_behavior, index_of_behavior + 1);
		}else{
			return "The behavior was not in the Behaviors set.\
			 If you want to insert it, use the newBehavior method";
		}
	}
}

// test
const b = new Behaviors(["1", "2"]);
console.log(b.search(1));
console.log(b.search(2));
// test

module.exports = {Behaviors};