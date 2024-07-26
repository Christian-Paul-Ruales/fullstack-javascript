// funcion anonima autoinvocada
(
    () => {
        const hero: string = 'Flash'
        
        function returnName(): string {
            return hero;
        }
    
        const activeBatisignal = () => {
           return 'Chuuuuuupalo'; 
        }
    
        console.log(typeof activeBatisignal());
    
        const heroName = returnName();
        
    }
)()