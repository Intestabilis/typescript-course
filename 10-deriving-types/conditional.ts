// Conditional types feature is particulary useful for building helper types
// imagine we're dealing with array types in different places of our application

// helper type to more easily extract a type of array elements
type StringArrayType = string[];
// not the conditional type but make do in this example
// type ElementType = StringArrayType[number];
// also works as generic extractor
// type ElementType<T extends any[]> = T[number];

// type Example1 = ElementType<StringArrayType>;

// potential problem - we can't use this ElementType on smth that's not an array

let text = "helo";

// ofc error because text isn't an array (not necessarily a problem)
// type Example2 = ElementType<typeof text>;

// we could build even more generic type using conditional type feature
// we can add a ternary expression-like syntax to make this a conditional type
// same logic - if condition is met, it "returns" a type after ?, if not - after :
type GetElementType<T> = T extends any[] ? T[number] : never;
// will return just a type if not an array, but never above is like "if it's not an array it won't work"
// type GetElementType<T> = T extends any[] ? T[number] : T;

// string type
type Example1 = GetElementType<StringArrayType>;

// never type
type Example2 = GetElementType<typeof text>;

// Another example

// we can do this
// ts identify return as a string, but it's string | never if we're not make it into if check
// function getFullname<T extends object>(person: T) {

type FullnamePerson = { firstName: string; lastName: string };
type FullnameOrNothing<T> = T extends FullnamePerson ? string : never;

// so we can use conditional type in a return type
function getFullname<T extends object>(person: T): FullnameOrNothing<T> {
  // these two will still give an error for return and not assignable type, so we outsource that check
  // ): T extends FullnamePerson ? string : never {
  // ): T extends { firstName: string; lastName: string } ? string : never {
  // we can do this with js
  if (
    "firstName" in person &&
    "lastName" in person &&
    person.firstName &&
    person.lastName
  ) {
    // now error goes away
    return `${person.firstName} ${person.lastName}` as FullnameOrNothing<T>;
  }
  throw new Error("No first name and or last name found");
}

// never
const name1 = getFullname({});
const name2 = getFullname({ firstName: "Max", lastName: "Verstappen" });
