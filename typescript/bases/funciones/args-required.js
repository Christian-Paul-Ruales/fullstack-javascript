"use strict";
(() => {
    const fullName = (firstname, lastname) => {
        if (!firstname) {
            throw new Error('firstname required');
        }
        return `${firstname} ${lastname}`;
    };
    const name = fullName('Tony', 'Stark');
    console.log({ name });
})();
//# sourceMappingURL=args-required.js.map