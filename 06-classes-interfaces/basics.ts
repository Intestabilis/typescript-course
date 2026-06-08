// DEFAULT CLASS CREATION

/*
class User {
  // ts way (but modern js syntax supports it too ig)
  // name = "Max";

  // once again ts but with type definition
  name = "Max";
  age: number;

  //constructor() {
    // default js way
    // this.name = "Max";
  //}
   

  // once again ts
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
*/

// TYPESCRIPT SHORTCUT
// we can add public in constructor parameters before a parameter
// it immediately creating a property with the same name and assign a received value
/*
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}
  */

// standard js code btw
// const max = new User("Max", 22);
// const john = new User("Pork", 20);

// public and private are ts inclusive keywords

class User {
  public readonly hobbies: string[] = [];

  constructor(
    public name: string,
    public age: number,
    // private role: string,
    // protected: ,
  ) {}

  roleInfo() {
    // console.log(this.role);
  }
}

const max = new User("Max", 22);
const john = new User("Pork", 20);
