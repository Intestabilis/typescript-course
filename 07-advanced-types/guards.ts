/*
type FileSource = { path: string };
const fileSource: FileSource = {
  path: "some/path/to/file.csv",
};

type DBSource = { connectionUrl: string };
const dbSource: DBSource = {
  connectionUrl: "some-connection-url",
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
  // we can't write just one code since our possible source are different and we should define what we got
  // so called Type Guard
  if (
    // typeof source === "object"&& // we can add this check, but it's redundant because our parameter type is Source already
    // so we know it's either FileSource or DBSource that both are object types
    "path" in source
  ) {
    // source.path; => use that to open a file
    return;
  }
  // source.connectionUrl; => to reach out a DB
  // typescript already understands that source is either FileSource or DBSource and we already checked for FileSource before in if check
}

*/

// Common pattern for checking is working with Discriminated Unions
// instead of checking for existence of properties we can use some shared property that exists in both types

// Discriminated union pattern

type FileSource = { type: "file"; path: string };

const fileSource: FileSource = {
  type: "file",
  path: "some/path/to/file.csv",
};

type DBSource = { type: "database"; connectionUrl: string };
const dbSource: DBSource = {
  type: "database",
  connectionUrl: "some-connection-url",
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
  // we can do this instead of checking for properties and check value of type property
  // value is either "file" | "database"
  if (source.type === "file") {
    // ts understands that we're dealing fith FileSource type so we can do this
    source.path;
    // source.path; => use that to open a file
    return;
  }
  // same with dealing with DBSource
  source.connectionUrl;
  // source.connectionUrl; => to reach out a DB
}
