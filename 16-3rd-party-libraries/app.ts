/*
import _ from "lodash";

// lodash is a JS library so we can't just use it as it is

// good solution - install extra package (@types) to add declaration file (.d.ts)
// npm i --save-dev @types/lodash
// once again definitely typed repository
// after execution we have this type definition

const numbers = [1, 2, 3, 4, 5];

// split
const chunks = _.chunk(numbers, 2);
*/

import fs from "node:fs";

import { z } from "zod";

// 1st example
/*
// expecting data to be a string
const dataSchema = z.string();
const content = fs.readFileSync("data.json");
// will parse the content and check if it's inline with data schema (in runtime)
// will give a runtime error though because our data is not a string
// ofc if it won't throw an error parsedData will be defined in schema type (in this case string)
const parsedData = dataSchema.parse(content);
*/

// 2nd example
const dataSchema = z.object({
  title: z.string(),
  id: z.number(),
  // values: z.array(z.string()),
  // basically zod gives us TS toolkit in the runtime
  values: z.array(z.union([z.string(), z.number()])),
});
const content = JSON.parse(fs.readFileSync("data.json").toString());
// and now we already get proper type
const parsedData = dataSchema.parse(content);

// we need to define a type for a function argument but can't without code duplication
// but we can get access to zod dataSchema type with infer that will, well, infer type that is "defined" by dataSchema
type Data = z.infer<typeof dataSchema>;
//= {title: string;
// id: number;
// values: (string | number)[];}

function output(data: Data) {
  console.log(data);
}
