// there is also typeof in ts, and what is used (js typeof or ts typeof) depends on the place where we use it (automatically)

const username = "Max";
// js typeof
console.log(typeof username);

// ts typeof (ofc because we're using it in a type definition)
// with const it will be strictly "Max", if we change it to let it will be a string type
type UserName = typeof username;
// we're kind of reverse engineering the type from the value there?

// More realistic/useful example
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["John", "Pork"],
};

// we can do this and create type manually, but it's annoying + we can make some errors doing that
/*
type Settings = {
  difficulty: string;
  minLevel: number;
  didStart: boolean;
  players: string[];
};
*/

// but we can use typeof instead to do this and it's much easier
type Settings = typeof settings;

// we can also use it there if we want but obv with different parameter name then
// function loadData(s: typeof settings) {
function loadData(settings: Settings) {
  // ...
}

loadData(settings);
