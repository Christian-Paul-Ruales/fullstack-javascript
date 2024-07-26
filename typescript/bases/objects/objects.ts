(
    () => {
        /**
         * objeto literal en javascript
        */

        let flash: { name:string, age?: number, powers: string[], getName?: ()=> string } = {
            name: 'Barry alien',
            age: 25,
            powers: ['Super velocidad','Es blanco'],
            getName() {
                return this.name;
            },
        };
    
        flash ={
            name: 'Super Pendejo',
            powers: ['Le mide 24','Puede volar'],
    
        }
        console.log(flash);

    }
)()