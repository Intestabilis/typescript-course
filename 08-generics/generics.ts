let names: Array<string> = ["Max", "Anna"];

// Array<string> uses generics type
// In some kind generics are about combination of types and well building flexible code

// Creating and Using Generic Type

// we're defining type with generic like that: using <> with type and setting up a placeholder (placeholder often is T)
type DataStore<T> = {
  // and then we're using placeholder in definition
  [key: string]: T;
};
// We can use multiple placeholders if we need to
// type DataStore<T, U>

let store: DataStore<string | boolean> = {};

store.name = "Max";
store.isBro = true;

let nameStore: DataStore<string> = {};

// Generic Functions & Inference

// basic example
// we can do this with any, but it'll create some problems (at least we'll get any[] array in return)
// so at least we'll lose information about types in this array
// function merge(a: any, b: any) {

function merge<T>(a: T, b: T) {
  return [a, b];
}

// const ids = merge<number>(1, 2);
// in situations like this we can even omit <> because of inference
const ids1 = merge(1, 2);

// Multiple placeholders

// example above won't let us merge different types because of the same generic, but this example can
function mergeDifferent<T, U>(a: T, b: U) {
  return [a, b];
}

const ids2 = mergeDifferent(1, "Max");

// Generics and Constraints

// we can use just T like generic, but it won't be that good because we might want to get different type of values, but not all types of values
// so we can add so-called constaint for parameters (placeholders)
// for this we're using extends operator with wanted type(s)
// function mergeObj<T extends object>(a: T, b: T) {
function mergeObj<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

// Constraints and multiple generic types

// With one placeholder inferred type there is kinda complex because we're passing 2 different objects
// With two placeholders situation with inferred type is better
const mergedObj = mergeObj({ name: "Max" }, { age: 23 });
console.log(mergeObj);

// Generic Types & Interfaces
// we can use Generics with classes and interfaces like this

class Role<T> {}

class User<T> {
  constructor(public id: T) {}
}
