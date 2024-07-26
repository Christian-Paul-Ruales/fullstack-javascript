(
    () => {
        type Hero = {
            name:string;
            age?: number;
            powers: number[]; 
            getName?: ()=> string
        }

        let myCustomVariable: string | number | Hero = 'Ferxo';
        console.log(typeof myCustomVariable);

        myCustomVariable = 10;
        console.log(typeof myCustomVariable);
        
        myCustomVariable = {
            name: 'bruce',
            age: 43,
            powers:[1]
        };
        console.log(typeof myCustomVariable);


    }
)()