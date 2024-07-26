"use strict";
(() => {
    const fullName = (firstname, lastname, upper = false) => {
        // validacion unicamente para undefined
        let sentence = `${firstname} ${lastname || 'No lastname'}`;
        if (upper) {
            return sentence.toUpperCase();
        }
        else {
            return sentence;
        }
    };
    const name = fullName('Tony', 'Cosculluela', true);
    console.log({ name });
})();
