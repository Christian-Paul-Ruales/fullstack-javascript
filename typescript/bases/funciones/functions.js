"use strict";
// funcion anonima autoinvocada
(() => {
    const hero = 'Flash';
    function returnName() {
        return hero;
    }
    const activeBatisignal = () => {
        return 'Chuuuuuupalo';
    };
    console.log(typeof activeBatisignal());
    const heroName = returnName();
})();
