// ANY TYPE
// any type allows to use any kind of value and don't get an error

/*
let age: any = 36;

//..

age = "37";
age = true;
age = {};
age = [];
*/

// should use as a last resort since it's literally allowing any type of value and lowkey defies the purpose of typescript

// UNION TYPE

// union type, we can use either a string or a number for this variable
let age: string | number = 35;

age = "23 years old";
// errors
// age = true;
// age = {};
// age = [];
