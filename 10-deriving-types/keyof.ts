// keyof typescript operator

type User = {
  name: string;
  age: number;
};

// keyof should be followed by another type
type UserKeys = keyof User;
// now UserKeys is a union type of all keys from User

// can be "age" or "name" since it's the keys of User type
let validKey: UserKeys;
validKey = "name";
validKey = "age";

// More realistic example

// idea of function - extract value from the object for given key
// function getProp(obj: User, key: UserKeys) {
// function getProp(obj: User, key: keyof User) {
// well we can even do it with generics to make function universal
// function getProp<T extends object>(obj: T, key: keyof T) {
// or we can do it like this
// also this version allows TS to track specific property types more precisely
function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];
  if (val === undefined || val === null) {
    throw new Error("Accesing undefined or null value");
  }
  return val;
}

const user = { name: "Max", age: 22 };

const val = getProp(user, "name");
