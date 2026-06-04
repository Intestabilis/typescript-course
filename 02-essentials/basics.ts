"use strict";

// TYPE ASSIGNMENT AND INFERENCE

// type assignment
let userName: string;
// type inference
let userAge = 20;

// ...

userName = "Max";

// error because typescript inferred number type on creation
// userAge = "test";

// assigning types to function parameters

function add(a: number, b: number) {
  return a + b;
}
// type inference also works
// function add(a: number, b = 23){}
