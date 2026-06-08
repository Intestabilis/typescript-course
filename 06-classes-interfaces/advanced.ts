class User {
  constructor(
    protected _firstName: string,
    private lastName: string,
  ) {}

  // getter in js is basically a calculated value
  // (ig there's still definition like in other languages but why we would use it for non-private fields when we can access properties with .)
  // or well we can do smth like get _firstName to create getters for private properties idk (i don't remember a proper naming convention)
  get fullName() {
    return this._firstName + this.lastName;
  }

  set firstName(name: string) {
    if (name.trim() === "") {
      throw new Error("Name can not be empty");
    }
    this._firstName = name;
  }

  static eid = "USER";
}

// can access static properties on class itself
console.log(User.eid);

const max = new User("Test", "User");
// using setter similar to a property
max.firstName = "Max";

class Employee extends User {
  constructor(
    public jobTitle: string,
    lastName: string,
    firstName: string,
  ) {
    super(firstName, lastName);
    super.firstName = "Max";
  }

  work() {
    // if private field, can't do this
    // if protected, can
    console.log(this._firstName);
  }
}

// Abstract classes (supported in Typescript but not JS)

abstract class UIElement {
  constructor(public identifier: string) {}

  clone(targetLocation: string) {
    // logic to duplicate an element
  }
}

// can't create an instance of abstract class - an error there
// let uiElement = new UIElement();

// as in other languages act only as a base classes for others (like this SideDrawer)
class SideDrawerElement extends UIElement {
  constructor(
    public identifier: string,
    public position: "left" | "right",
  ) {
    super(identifier);
  }
}
