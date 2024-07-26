"use strict";
(() => {
    const addNumber = (a, b) => a + b;
    const greet = (name) => `Hello ${name}`;
    const saveTheWorld = () => 'The world was saved';
    let myFunction;
    let exampleF;
    let functionNumber;
    let functionString;
    let soloReturnString; // puede ser void tambien
    //myFunction = 10;
    myFunction = addNumber;
    console.log(myFunction(1, 2));
    myFunction = greet;
    console.log(myFunction('Christian'));
    myFunction = saveTheWorld;
    console.log(myFunction());
})();
