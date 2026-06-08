/*
// at this moment will return string | number value
function getLength(value: string | any[]) {
  if (typeof value === "string") {
    const numWords = value.split(" ").length;
    return `${numWords} words`;
  } //X words if a string
  return value.length; //X words if a string
}

// TS still thinks it's a string | number type
const numWords = getLength("Does he know?");
// we can do type casting but that's not ideal
// const numWords = getLength("Does he know?") as string;
// so this will cause an error because of number possibility (and numbers don't have length obv)
// console.log(numWords.length);
const numItems = getLength(["Abc", "Cba", "ttt"]);
*/

// Function overloads in practice

// we can add multiple function signatures to the same function (still one function body)
// still works
function getLength(value: any[]): number;
function getLength(value: string): string;
function getLength(value: string | any[]) {
  if (typeof value === "string") {
    const numWords = value.split(" ").length;
    return `${numWords} words`;
  }
  return value.length;
}

const numWords = getLength("Does he know?");

// now it works without type casting because of function overload and defined returned string type
console.log(numWords.length);

const numItems = getLength(["Abc", "Cba", "ttt"]);
