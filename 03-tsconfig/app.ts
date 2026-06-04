let userName: string;

userName = "Max";

console.log(userName);

// we can configure how typescript will behave in project folder with typescript configuration file

// we can use tsc --init in terminal to create tsconfig.json

// for compile with a compiler (and with considering tsconfig.json) we use just tsc without file

// we can use tsc --watch to run compiler in a watch mode (it will retrigger compilation on saved changes as similar tools)

import fs from "node:fs";
// by default there will be type related error with this import
// it's because node.js types are not built into typescript so it doesn't know what to do with this
// also applies to other libraries as well, so we also should install extra type packages into projects that use typescript
// (ofc it doesn't apply if library already written in typescript or has it's own .d.ts type definition files)

// npm install @types/node for node
// npm install @types/react for react
// etc...
// ofc we should install it with --save-dev since ts is a developer tool

// https://github.com/DefinitelyTyped/DefinitelyTyped
