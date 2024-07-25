(
	() => {
		let avengers: number = 10;
		console.log(avengers);
	
		const villians: number = 20;
		
		if(avengers < villians){
			console.log('We are in problems');
		}else{
			console.log('We are ok');
		}
		// nan es considerado un numero en javascript
		avengers = Number('55A');

		console.log({avengers});
	}
)()