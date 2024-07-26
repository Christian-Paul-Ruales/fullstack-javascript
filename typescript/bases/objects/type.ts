(
    () => {
        /**
         * Type nos permite crear un tipo personalizado
         */
        type Hero = {
            name:string;
            age?: number;
            powers: string[]; 
            getName?: ()=> string
        }
        let flash: Hero = {
            name: 'Barry alien',
            age: 25,
            powers: ['Super velocidad','Es blanco'],
            getName() {
                return this.name;
            },
        };
        let superMenso: Hero = {
            name: 'Clar qen',
            age: 65,
            powers: ['Super vago','Es millonario'],
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