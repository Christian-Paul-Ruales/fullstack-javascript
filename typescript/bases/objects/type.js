"use strict";
(() => {
    let flash = {
        name: 'Barry alien',
        age: 25,
        powers: ['Super velocidad', 'Es blanco'],
        getName() {
            return this.name;
        },
    };
    let superMenso = {
        name: 'Clar qen',
        age: 65,
        powers: ['Super vago', 'Es millonario'],
        getName() {
            return this.name;
        },
    };
    flash = {
        name: 'Super Pendejo',
        powers: ['Le mide 24', 'Puede volar'],
    };
    console.log(flash);
})();
