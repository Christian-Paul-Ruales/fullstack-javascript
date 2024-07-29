"use strict";
(() => {
    const fullName = (firstname, lastname) => {
        if (!firstname) {
            throw new Error('firstname required');
        }
        return `${firstname} ${lastname || 'No lastname'}`;
    };
    const name = fullName('Tony');
    console.log({ name });
})();
//# sourceMappingURL=args-optional.js.map