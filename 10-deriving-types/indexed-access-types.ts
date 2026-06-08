// {][] = array of objects in type definition

const appUser = {
  name: "Max",
  age: 35,
  permissions: [
    { id: "1", title: "read", description: "access to read files" },
  ],
};

// type AppUser = typeof appUser;
type AppUser = {
  name: string;
  age: string;
  permissions: {
    id: string;
    title: string;
    description: string;
  }[];
};

// Indexed access type helps us to derive a part of other object type into another type (example below)
// we use [] with the name of property we want to derive
type Perms = AppUser["permissions"];
// ofc we can use this feature in any place where types are defined (function parameters etc)

// Accessing Array Elements with Indexed Access Type
// we're not limited to using it only with property names
// we can use it on arrays to extract the value type of a stored element

// with using number we're extracting the type of stored elements of the array
// (in this case it will be an object type without the square brackets)
// Perm = {id: string; title: string; description: string}
type Perm = Perms[number];

// strings array type
type Names = string[];
// string type
type Name = Names[number];

// ofc it's just a typescript feature
