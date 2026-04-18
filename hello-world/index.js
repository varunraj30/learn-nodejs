const math = require("./math.js");
// const {addFn,subFn} = require("./math.js");

console.log("Hello World");

// From V8 Engine, DOM related elements have been removed (other elements like crypto and file handling have been added) and embedded with c

console.log(window);

console.log(alert);

console.log(math.addFn(1, 2));
console.log(math.subFn(3, 2));
