// ENUMS

// non-existent in default JS so only TS feature (and on compilation will become a var with function)

/*

enum Role {
  Admin,
  // Admin = 1 , //we can override default numeric values (in this example Admin = 1, Editor = 2...)
  // Editor = "Editor", // can override not only with numbers, but then must do a string for every other option
  Editor,
  Guest,
}

// we can use enums as a custom "types"
let userRole: Role;

userRole = Role.Admin;
// below code is userRole = Role.Guest basically
userRole = 2;

*/

// Alternative for ENUMS: union types + literal types
// Literal Types

// Literal types, it's on the left side of = so it's also a "type"
// let userRole: "admin" = "admin";

// example of using literal types + union types
let userRole: "admin" | "user" | "editor" = "admin";

// ofc we're not limited to strings only, example on previous possibleResults tuple
// let possibleResults: [number, number]: now it's not only 2 numeric values, but exactly -1 or 1 values
let possibleResults: [1 | -1, 1 | -1];

userRole = "editor";

// Type Aliases & Custom Types

// we can do this, but obviously it's not efficient
// function access(role: "admin" | "user" | "editor") {}

// using type keyword to create custom type (type alias)
type Role = "admin" | "user" | "editor";
// we can also do this, but not making much sense
// type myNumber = number;

let userRole1: Role;

userRole1 = "admin";

function access(role: Role) {
  console.log(role);
}

access(userRole1);

// ofc extremely useful with object types

type User = {
  name: string;
  age: number;
  permissions: string[];
  role: Role;
};

// Function Return value Types

// we add : after parameters to specify return type (this function will return a number)
function add(a: number, b: number): number {
  return a + b;
  // error
  // return "test";
}
// we don't need to add this to many function because TS can infer it too

// there's a void return type as in others programming language
// function that does not return anything has void return type
function log(message: string): void {
  console.log(message);
}
// once again it's inferred so mostly we're not obliged to do it explicitly

// "never" Type

// if we're not overwriting return type it'll be void in this function
function logAndThrow(errorMessage: string): never {
  console.log(errorMessage);
  throw new Error(errorMessage);
}
// never type is more specific and it specifies that function will never complete (finish)

// variable will have never type
const logged = logAndThrow("Hi");

// Functions as Types

// we can define callback parameter type as a function (functions also values in JS so it's logical), but it isn't specific
// function performJob(callback: Function) {

// so called Function Type
// we're defining it by (params:types) => returnType syntax
// doesn't matter if parameter name in Function Type is different from parameter name in actual passed function
// numbers and types of parameters (and return) are important, not names
function performJob(callback: (message: string) => void) {
  //..
  callback("message");
}

performJob(logAndThrow);

// we can use it in custom types too
type User1 = {
  name: string;
  age?: number;
  greet: (message: string) => void;
};

let user: User1 = {
  name: "Max",
  age: 22,
  greet(message: string) {
    console.log(message);
  },
};
