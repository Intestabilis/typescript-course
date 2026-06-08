// Intersection types

type FileData = {
  path: string;
  content: string;
};

type DatabaseData = {
  connectionUrl: string;
  credentials: string;
};

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};

// Intersection type

type AccessedFileData = FileData & Status;
// using & for combining types

// example of good using of intersection: outsourcing shared info in Status type and then combining it with other types that needs that info
type AccessedDatabaseDate = DatabaseData & Status;

// tbh we could do it with interfaces too (extending from ...Data and Status interfaces)
