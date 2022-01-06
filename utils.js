const debounce = (func, delay = 500) => {
	let timeoutID;
	return (...args) => {
		//...args equal to any number of args
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
		timeoutID = setTimeout(() => {
			func.apply(null, args); //apply will aplly all args
		}, delay);
	};
};
