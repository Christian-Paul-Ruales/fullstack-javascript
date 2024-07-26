(
    () => {
        const fullName = (firstname: string, lastname?: string, upper: boolean = false): string => {
            // validacion unicamente para undefined
            let sentence: string = `${firstname} ${lastname || 'No lastname'}`;

            if(upper){
                return sentence.toUpperCase();
            }else{
                return sentence;
            }

        }

        const name = fullName('Tony', 'Cosculluela', true);
    
        console.log({ name });
    }   
)()