// Experimental decorators

// once again - decorator is just a function
// capital character not a must but good convention ig
// for class it's one argument - ctor function (target/constructor)
/*
function Logger(constructor: Function) {
  console.log("Logging");
  console.log(constructor);
}
  */

// Decorator factory example
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// More useful decorators
/*
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("Rendering template");
    const hookEl = document.getElementById(hookId);
    const person = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = person.name;
    }
  };
}
*/

// Returning and changing a class in a class decorator
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T,
  ) {
    console.log("Rendering template");

    // we can return a new ctor function that will replace the old one
    // well class in fact a syntax sugar for ctor function so we can use it as well
    // we're extending original ctor to keep all the properties from it
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // calling original construction (default JS)
        super();
        // extra logic
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          // now we can use this instead of calling og constructor
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// We can return values is some decorators (classes, methods, accessors)
// so our Log2 and Log3
// decorators on properties/parameters can return smth, but TS will ignore it

// adding decorator like before
// @Logger
// for factory once again we must execute it (and we can pass whatever arguments)
// we can add more than one decorator (they execute bottoms up - first WithTemplate, then Logger (But decorator factory runs earlier))
@Logger("LOGGING PERSON")
@WithTemplate("<h1>Person Object!</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object");
  }
}

const person = new Person();

console.log(person);

// Property decorators
// -----

// property decorator gets 2 arguments - target (for static property refer to a ctor function, for instance - prototype of the object)
// and property name
function Log(target: any, propertyName: string | symbol) {
  console.log("PROPERTY DECORATOR");
  console.log(target);
  console.log(propertyName);
}
// executes when class definition is registered by JS (so when we're defining this property)

// Accessor and Parameter Decorator (accessors - getters/setters)
// 3 args - target (as before), name (accessor name), descriptor (describe accessor with fields like configurable enumerable etc)

function Log2(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor,
) {
  console.log("ACCESSOR DECORATOR");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  // we can return a new descriptor object there
}

// Method decorator
// same args (just a little different descriptor since it's a method, we have properties like value writable etc)

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor,
) {
  console.log("METHOD DECORATOR");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter decorator
// name arg - the name of a METHOD that uses the parameter, not parameter (so basically like before)
// position - position of the argument (first in this example)

function Log4(target: any, name: string | symbol, position: number) {
  console.log("PARAMETER DECORATOR");
  console.log(target);
  console.log(name);
  console.log(position);
}

// Decorator order - all running without instantiated a product object, they executed when we're defining a class (like ECMAScript decorators)

class Product {
  @Log
  title: string;
  _price: number;

  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Price can't be negative or 0");
    }
  }
  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Example with autobind decorator

// function Autobind(target: any, methodName: string | symbol, descriptor: PropertyDescriptor,) {
function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  // accessing method with a descriptor
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // extra logic when user access this property (before executing the function)
    get() {
      // getter method will be triggered by the concrete object, so this === concrete object
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const button = document.querySelector("button");

// won't work correctly on default because this in showMessage will be a button, not a printer (default trouble with eventListeners, fixable with bind)
// after creating and using a decorator (Autobind) it works correctly
button?.addEventListener("click", printer.showMessage);

// default solution (when we're not using autobind decorator)
// button?.addEventListener("click", printer.showMessage.bind(printer));

// ---------------------------------
// Validation with decorators

// decorators for validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]; //["required", "positive"] etc., list of validators
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  // buggy version
  // getting class name as a key
  // registeredValidators[target.constructor.name] = {
  //   ...registeredValidators[target.constructor.name],
  //   [propName]: ["required"],
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

// basically goes through every validator and do validation logic for each one of them
function validate(obj: any) {
  // same logic with getting name
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  // going through every prop
  for (const prop in objValidatorConfig) {
    // going through every validator
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // also works with empty values so we wanna add validation
  // we can do this ofc but then validation logic is not included in the core class
  // if(title.trim().length === 0 ||) {}

  const createdCourse = new Course(title, price);

  // so after creating decorators (or with 3rd party library) we're using them for validation (with guard clause)
  if (!validate(createdCourse)) {
    alert("Invalid input!");
    return;
  }

  console.log(createdCourse);
});
