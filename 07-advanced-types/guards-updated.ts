type FileSource = { type: "file"; path: string };
const fileSource: FileSource = {
  type: "file",
  path: "some/path/to/file.csv",
};

type DBSource = { type: "db"; connectionUrl: string };
const dbSource: DBSource = {
  type: "db",
  connectionUrl: "some-connection-url",
};

type Source = FileSource | DBSource;

// we can outsource type guards
function isFile(source: Source) {
  // modern ts won't return a boolean but a type predicate
  // ts will use this returned info (if return is true, then the type of checked value is FileSource)
  return source.type === "file";
}

function loadData(source: Source) {
  // if ('path' in source) {
  if (isFile(source)) {
    // if (source.type === "file") {
    // source.path
    // source.path; => use that to open the file
    return;
  }
  // source.connectionUrl; => to reach out to database
}

class User {
  constructor(public name: string) {}

  join() {
    // ...
  }
}

class Admin {
  constructor(permissions: string[]) {}

  scan() {
    // ...
  }
}

const user = new User("Max");
const admin = new Admin(["ban", "restore"]);

type Entity = User | Admin;

// if check (type guards) via "instanceof"
// we can use this instanceof check when dealing with classes (js keyword but works for us there)

function init(entity: Entity) {
  if (entity instanceof User) {
    entity.join();
    // in previous and this example - we can safely use other type after if brackets only if we do a return there
    // that's kinda obvious since if we're not returning in this if our checked type still can make it further
    return;
  }

  entity.scan();

  // .join() OR .scan() ...
}
