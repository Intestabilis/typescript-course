// unknown type is typically used in conjunction with functinos
// good in situations where we don't know which kind of value we will get

// unknown a bit like any but quite not like it
// with any we can do anything (basically like vanilla javascript)
function process(value: unknown) {
  // it forces to add some if checks for value with unknown types
  // just an example we can do it another ways ig
  if (
    typeof value === "object" &&
    !!value &&
    "log" in value &&
    typeof value.log === "function"
  )
    // this code only executes on conditions above
    // basically it's also type narrowing
    value.log();
}
