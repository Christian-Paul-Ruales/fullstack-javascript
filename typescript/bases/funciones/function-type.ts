(
    () => {

        const addNumber = (a: number, b: number): number => a + b;
        const greet = (name: string): string => `Hello ${name}`;
        const saveTheWorld = () => 'The world was saved';
    
        let myFunction: Function;
        let exampleF: () => number;
        let functionNumber: (a:number, b:number) => number;
        let functionString: (a:string) => string;
        let soloReturnString: () => string; // puede ser void tambien
        
        //myFunction = 10;

        myFunction = addNumber;
        console.log(myFunction(1,2));

        myFunction = greet;
        console.log(myFunction('Christian'));

        myFunction = saveTheWorld;
        console.log(myFunction());


    }
)()