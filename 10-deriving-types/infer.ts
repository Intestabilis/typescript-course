// infer keyword may be important feature

function add(a: number, b: number) {
  return a + b;
}

// let's say we wanna write utility type that helps extract just return type information
// that will hold entire type information (function signature)
type AddFn = typeof add;
// we use infer to extract that return type
// it needs to be used with conditional type (ternary operator)
// also this type must be a generic (not sure if that's the condition in general or in this example case)
// (that generic in this case is a function type)
// syntax with ... inspired by rest operator (that signature is basically any number of parameters of any types)
// we can do that thanks to infer, basically we're using it in conditional check to extract some extra information from checking

type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : never;
// type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : T;

// using this helper class
type AddFnReturnValueType = ReturnValueType<AddFn>;

// The infer keyword in TypeScript is used to dynamically extract and capture a type from another complex type
// It can only be used inside the extends clause of a conditional type (Condition ? True : False).
// The variable declared by infer is only available in the true/positive branch of the conditional statement.

// we can unwrap a promise with that? not sure about syntax and why infer in <> in this example
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ResolvedString = UnwrapPromise<Promise<string>>;
type NonPromise = UnwrapPromise<number>;
