// ARRAYS AND TYPES

// typescript undestrands under the hood that this array stores only string values
let hobbies = ["cooking", "ttrpg"];

// we can also assign this explicitly
// let hobbies: string[];

// error
// hobbies.push(23);

// ADVANCED ARRAY TYPES

// we can also use union types (array that holds values that either string or number ([23, 14, "test", "max", 123]))
// let users: (string | number)[];

// users = [1, "max"];
// users = [123, "testtest", 32, "cdscs"];
// users = [1, 2, 3];
// users = ["id1", "id2"];

// alternative with GENERIC TYPES
let users: Array<string | number> = [23, "test"];

// TUPLE TYPE

// this telling ts that possible results is an array with exactly 2 number values (ofc it can be more that 2 elements like [string, number, boolean] for instance)
let possibleResults: [number, number]; // [1, -1] - want only 2 number values

possibleResults = [1, -1];
// error
// possibleResults = [5, 12, 213];

// OBJECT TYPES

// Typescript also inferring type for object properties
let user = { name: "Max", age: 22 };
// Can assign explicitly too
/*
let user: {
  name: string;
  age: number;
} = {name: "Max", age: 22};
*/
// ofc can use other things like union types arrays objects etc.
/*
let test: {
  name: string;
  age: number;
  array: string[];
  role: { description: string; id: number };
};
*/
// By default every defined property in object IS REQUIRED

// The "Must Not Be Null" Value

// NOT OBJECT TYPE
// means "any value that not undefined or null" (so Must Not be Null value)
let val: {} = "some text";

// Record Type (Flexible Objects) - Generic Type (will be covered later)
// we can use it for objects which key:value pairs we don't know at the moment (some data from API etc.)
// Record<keys type, values type>
// Also using Record forces to use an object
let data: Record<string, number | string>;

// valid
// data = {};
data = {
  entry1: 1,
  entry2: "string",
};
