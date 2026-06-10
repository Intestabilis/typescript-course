// TS special syntax with ///
// makes namespace available in this file
/// <reference path="models/drag-drop.ts"/>
/// <reference path="models/project.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>
/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>
// this import won't work after compilation in JS so we'll get an error
// to make it work we should use outFile in tsconfig file so it'll compile all in one JS file
// BUTTT it's deprecated and ig this moment in a course outdated as well

// in general all of this with namespaces is outdated since ES modules doing fine now and absolutely a standard
// also honestly they're uncomfortable af to use

// also if we won't import all correctly even without any info about that and without compilation error we can still get runtime error
// this shit is so ass

// to use smth from the namespace we have to put things that uses it in the same namespace
namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
