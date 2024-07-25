(
	() => {
		const batman:string = 'Fatman';
		const greenlinter: string = 'Green lintern';
		const BlackVolcan: string = `Hero: Black Volcan`;

		console.log(`I'm ${batman}`);
		console.log(batman.toUpperCase());

		// ? es null chek
		console.log(batman[10]?.toUpperCase() || 'nu ahi 10');
	}
)()