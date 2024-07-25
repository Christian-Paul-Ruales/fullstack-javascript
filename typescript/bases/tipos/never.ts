( () => {
    // never no debe terminar exitosamente
    const abc = (msg: string): never => {
        
        throw new Error(msg);
    }

    abc('Auxilio');

})()