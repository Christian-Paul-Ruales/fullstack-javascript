"use strict";
(() => {
    // never no debe terminar exitosamente
    const abc = (msg) => {
        throw new Error(msg);
    };
    abc('Auxilio');
})();
