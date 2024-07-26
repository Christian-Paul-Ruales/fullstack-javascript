"use strict";
(() => {
    const fullName = (firstname, lastname) => {
        // validacion unicamente para undefined
        if (!firstname) {
            throw new Error('firstname required');
        }
        return `${firstname} ${lastname || 'No lastname'}`;
    };
    const name = fullName('Tony');
    console.log({ name });
})();
