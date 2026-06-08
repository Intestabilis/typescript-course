// Interfaces also only Typescript feature

interface Authenticatable {
  // as in other languages we only describe a type, not an implementation (so without values)
  email: string;
  password: string;

  login(email: string, password: string): void;
  logout(): void;
}

// We can use interface as an object type
let user: Authenticatable;

// now assigned object must have the shape of an interface
user = {
  email: "test@example.com",
  password: "1234",
  login(email: string, password: string) {
    // real login logic
  },
  logout() {
    // real logout logic
  },
  // role: "admin",
};

// Difference between interface and type alias usage
// if we only want to define a shape for objects we absolutely can just use type alias

// subtle difference (matters in certain scenarios) - declaration merging

// with interfaces we can add properties/methods to an interface defining it again like this

// typescript will merge these 2 definitions into one and now interface has all before properties and methods + this role property

/*
interface Authenticatable {
  role: string;
}
*/

// mostly useful if we're working with interfaces from other files/libraries etc (so when we're wanna extend some existing interface we don't have access to)

// We can also use interfaces to define Function Type
// we can do this as a Function Type
type someFn = (a: number, b: number) => number;
// or we can do this

// interface someFn {
//   (a: number, b: number): number;
// }

// Implementing interfaces

// implements keyword for implementing an interface with a class

// we can implement multiple interfaces separating them with a coma
// class AuthenticatableUser implements Authenticatable, A, B {

class AuthenticatableUser implements Authenticatable {
  constructor(
    // we can do more properties/methods etc than interface has but interface defined thing are must have
    public userName: string,
    public email: string,
    public password: string,
  ) {}

  login(email: string, password: string) {
    // real login logic
  }
  logout() {
    // real logout logic
  }
}

// Ensuring base types with interfaces

// we can do this (well interface usage as in other languages)
function aunthenticate(user: Authenticatable) {
  // no error because interfaces guarantees existing of this method
  // user.logout();
}

// Extending Interfaces
// we can extend interface with other interface to add more properties/methods, but have our parent interface too

interface AuthenticatableAdmin extends Authenticatable {
  role: "admin" | "superadmin";
}

// Basically all typical OOP stuff
