"use strict";
(() => {
    const fullName = (firstname, lastname, upper = false) => {
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
//# sourceMappingURL=args-default.js.map