// null & undefined - Special Types

// a will hold a value of null
let a: null;

a = null;
// error
// a = "test";

// not helpful at it's own, but we can combine it with the other types using union types
let b: null | string;

b = "String";
b = null;

// undefined type

// error, it's not equal to null
// a - undefined;

let c: undefined;

// Forced "Not Null" And Optional Chaining
