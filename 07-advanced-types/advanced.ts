// Index Types

// we might want a flexible data type
type DataStore = {
  // [prop] (in square brackets) is a placeholder for any number of properties (with any names) with this type
  // we need to define type of property name (not stored value but name) in [] - usually string, might be number or Symbol
  [prop: string]: number | boolean;
  //... as many props as we want as long as they have shared value type
};

// some similarity to Record type (in both string key type and number | boolean value type)
let someObj: Record<string, number | boolean>;

let store: DataStore = {};

//..
store.id = 5;
store.isOpen = false;
store.number = 10;

// won't work because [prop] allows only number or boolean
// store.name = "23/7";

// Constant types with "as const"

// in some cases we won't more strict type definition
// so we can add as const after value assignment for ts to be as narrow as possible
// so now type is literally readonly ["admin", "guest", "editor"]
let roles = ["admin", "guest", "editor"] as const;

// won't work with as const
// roles.push("test");

// ts knows that this will be "admin" string because of "as const" above
const firstRole = roles[0];

// Satisfies keyword

/*
const dataEntries: Record<string, number> = {
  entry1: 0.123,
  entry2: -123,
};
*/
// won't be an error since entry3 a string
// dataEntries.entry3;

const dataEntries = {
  entry1: 0.123,
  entry2: -123,
} satisfies Record<string, number>;

// with satisfies TS will look at assigned values and will use a more specific type
// also will infer a more specific type from the concrete set values

// basically now dataEntries will not be an object with any string:number k:v pairs, but concrete object with properties entry1 and entry2
// but those entries still will be checked for Record<string, number> condition

//...

// now it's an error
// dataEntries.entry3;

// but it's not
dataEntries.entry2;
