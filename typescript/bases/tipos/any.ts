(
	() => {
		let avenger:any = 123;
	
		let exists; // sin tipo de dato es any
		let power;

		avenger = 'La Brandon';
		//console.log(avenger.charAt(0));
		console.log((avenger as string).charAt(0));
		avenger = 150.2367878;
		
		console.log((<number>avenger).toFixed(2));
	
	}
)()
