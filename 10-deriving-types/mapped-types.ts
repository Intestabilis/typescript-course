// Another derived types feature - mapped types
// A way to convert one object type to another object type (well mapping)

// defining a type
/*
type Operations = {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
};
*/

// here we want to store results of operations, not functions
/*
type Results = {
  add: number;
  subtract: number;
};
*/

let mathOperations: Operations = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

// ofc we can do this, but Results type is kinda related to Operations type
// so we can do Results like this with dynamic properties
// here we want to store results of operations, not functions
/*
type Results<T> = {
  //K - another type placeholder that is NOT defined in <>
  // in this place "in" operator is also by typescript
  // this is basically a mapped type
  [K in keyof T]: number;
};
*/

// let mathResults: Results = {
let mathResults: Results<Operations> = {
  add: mathOperations.add(1, 2),
  subtract: mathOperations.subtract(5, 3),
};

// Readonly types + Optional mapping

// mapped types allows us to make non-optinal properties optional and in reverse
type Results<T> = {
  // simply adding ? to make all these properties optional (in Results type)
  [K in keyof T]?: number;
};

let mathResultsOpt: Results<Operations> = {
  add: mathOperations.add(1, 2),
  // now we don't have to do subtract
};

// if we make those properties optional they will be optional in Results as well
type Operations = {
  add?: (a: number, b: number) => number;
  subtract?: (a: number, b: number) => number;
};

// making optional properties non-optional
type Results<T> = {
  // simply adding -? to make all these properties non-optional (in Results type)
  //we're removing optional flag with this -
  [K in keyof T]-?: number;
};

// we also can add/remove readonly flag

type Results<T> = {
  // adding readonly (not mapped types exclusive)
  // it's exclusive to mapped types that we can map not-readonly properties as readonly in the mapped type
  readonly [K in keyof T]?: number;
};

// removing readonly

type Operations = {
  readonly add: (a: number, b: number) => number;
  readonly subtract: (a: number, b: number) => number;
};

type Results<T> = {
  // once again we're adding - to remove readonly flag in mapped type
  -readonly [K in keyof T]?: number;
};
