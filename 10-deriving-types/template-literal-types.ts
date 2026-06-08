// default js template literal
// const userName = `Max`;
// const greeting = `Hi there, ${userName}`;

// typescript offers a type that works in a similar way

type ReadPermissions = "no-read" | "read";
type WritePermissions = "no-write" | "write";

// we want not to just use union type again, but to have a new string literals that combine all string values above
// "no-read-write" etc like below, we can just manually do it or use template literal type feature

/*
type FilePermissions =
| "no-read-write"
| "read-no-write"
| "no-read-no-write"
| "read-write";
*/

// same js syntax but ts feature
// now it's a valid type definition with new string literal type (like above)
type FilePermissions = `${ReadPermissions}-${WritePermissions}`;

type DataFile = {
  data: string;
  permissions: FilePermissions;
};

// type with some methods with related to permissions names
// "dataChanged" and "permissionsChanged" as a result
type DataFileEventNames = `${keyof DataFile}Changed`;
// and now we can use this to create a mapped type
type DataFileEvents = {
  [Key in DataFileEventNames]: () => void;
};
