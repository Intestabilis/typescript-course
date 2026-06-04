// Inferred null & first look at type narrowing

// from form in index.html
// we can do workaround to force "not-null" value (this code will not yield null) with ! operator
// ofc if it WILL return null we'll get a runtime error
const inputEl = document.getElementById("user-name")!;

// there errors in console.log(inputEl.value) line
// 1) inputEl might possibly be null
// makes sense, because we get either get HTMLElement from method or null (if there's no element with this id)
// so inputEl:HTMLElement | null, it infers null

// we can do some base checking
// it can be reduntant in some cases
if (!inputEl) {
  throw new Error("Element not found");
}

// Typescript smart enough to narrow types, so now inputEl:HTMLElement, since we did a check for a null

// we can use ! in the place we use forced not-null value
// console.log(inputEl!.value);

// we can use ? in a place we use potentionally null value (in fact optional chaining) that means it can be null
// console.log(inputEl?.value);

console.log(inputEl.value);

// Type casting

// we use as operator (typescript specific) to do type casting
// now we don't have an error with inputEl.value because while default HTMLElement doesn't have value property, HTMLInputElement does
// also without union types it overrides both returned types (HTMLElement and null)
const inputEl1 = document.getElementById("user-name") as HTMLInputElement;
// We can do this for defining possible null in this example
// const inputEl1 = document.getElementById("user-name") as HTMLInputElement | null;
console.log(inputEl1.value);
