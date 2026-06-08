// Decorators

// Decorators are code to manipulate other code (for instance some checks on properties etc)
// Code interacting with other code
// good example - class-validator library
// OOP feature so can be used with classes only
// 2 kinds of decorators: ECMAScript (this section, JS but still on stage 3 ig) and experimental from TS

// decorators in JS are just functions written in a certain way

// Decorator factory is a function that produces decorators

// ECMAScript decorator typically accepts 2 arguments (target and context)

// decorator
// this weird syntax with new () => represents class for TS, () => {} is a class constructor
// ahh now I understand, T looks like this because new *Classname* is a syntax to create a class, and basically
// it's to call a function with a new keyword (default JS thing that will call JS constructor with auto this yadayadayada)
function logger<T extends new (...args: any[]) => any>(
  target: T,
  context: ClassDecoratorContext,
) {
  console.log("Logger decorator");
  console.log(target);
  console.log(context);

  // returning a new class
  // return class extends target {
  // age = 35;
  // };
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log("class constructor");
      console.log(this);
    }
  };
}

// method decorator
// target is a function
function autobind(
  target: (...args: any[]) => any,
  context: ClassMethodDecoratorContext,
) {
  //   console.log(target);
  //   console.log(context);
  // solving binding problem and do autobinder
  // Utility method to run code related to decorated thing after class initializing
  // (giving access to the constructor of the class decorated method belongs to)
  // passed function will be executed as a part of a constructor
  context.addInitializer(function (this: any) {
    // if we execute target in return this code won't have any effect because target() is the original method
    this[context.name] = this[context.name].bind(this);
  });

  // like with the class decorator, we can return an updated version of a function
  return function (this: any) {
    // adding more code
    console.log("Executing original function");
    // executing original function
    // target();
    // executing function with the same effect as from addInitializer
    target.apply(this);
  };
}

// Field decorator

// type of target will always be undefined because decorator code will be executed before field initialization

/*

function replacer(
  target: undefined,
  context: ClassFieldDecoratorContext,
) {
  console.log(target);
  console.log(context);

  // we can also return smth to change the thing (value of a field)
  // we're returning a function that will be executed after field initialization
  return (initialValue: any) => {
    console.log(initialValue);
    // changing and returning a new value
    return "";
  };
}

*/

// Decorator factory
// now on execution we're returning actual decorator and pointing at it
function replacer<T>(initValue: T) {
  return function replacerDecorator(
    target: undefined,
    context: ClassFieldDecoratorContext,
  ) {
    console.log(target);
    console.log(context);

    // we can also return smth to change the thing (value of a field)
    // we're returning a function that will be executed after field initialization
    return (initialValue: any) => {
      console.log(initialValue);
      // changing and returning a new value
      return initValue;
    };
  };
}

// decorator usage (with @ symbol)
@logger
class Person {
  @replacer("Initial value from decorator (will replace field value)")
  public name = "Max";

  // constructor() {
  //   // thing for autobinding when we assign function pointer to some other variable, default JS
  //   this.greet = this.greet.bind(this);
  // }

  @autobind
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
}

// We can also use decorators to change thing it attached to (by returning a new class based on an old class)

const max = new Person();
console.log(max);
// now this object will have age property (with the first return in decorator)

const greet = max.greet;
greet();
