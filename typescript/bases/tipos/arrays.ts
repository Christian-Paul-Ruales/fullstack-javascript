(
	() => {
		//const number: (string | number | boolean)[] =[1,2,3,'4',5,6];
		const number: number[] =[1,2,3,4,5,6];
		number.push(7);
		console.log(number);


		const villians = ['Omega rojo', 'Dormammu', 'Duende verde'];
		villians.forEach(v => console.log(v.toUpperCase()))

	}

)()