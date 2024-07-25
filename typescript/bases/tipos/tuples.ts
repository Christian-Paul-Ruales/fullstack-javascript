(
	() => {
		const hero: [string, number, boolean] = ['Dr Extraño', 100, true];

		hero[0] = 'El chapulin colorado';
		hero[1] = 20;
		hero[2] = false;

		console.log(hero);

	}
)()