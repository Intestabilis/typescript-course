// we can set parameter to be optional with question mark like this
// it also works on object properties afaik
function generateError(message?: string) {
  throw new Error(message);
}

// both works
generateError();
generateError("Error message!");

// won't work because it's still required to pass a string
// generateError(123);

// well optional properties in object types

type User = {
  name: string;
  age: number;
  // may be added, but does not have to be added
  role?: "admin" | "quest";
};

// Nullish coalescing operator

let input = null;

// false if input === null, true if input is an empty string or a regular string
// we can do this with basic JS, but if input will be an empty string it still will be false (since "" is falsy)
// const didProvideInput = input || false;
// if we want it to be a true with empty string, but it will be an empty string in result
const didProvideInput = input ?? false;
