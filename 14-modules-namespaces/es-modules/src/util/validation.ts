// validatable object
export interface Validatable {
  value: string | number;
  // nullable (can just add | undefined)
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  // for numbers
  min?: number;
  max?: number;
}

export function validate(input: Validatable) {
  let isValid = true;
  // required check
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  // min max length
  if (
    input.minLength != null &&
    input.minLength &&
    typeof input.value === "string"
  ) {
    isValid = isValid && input.value.trim().length >= input.minLength;
  }
  if (
    input.maxLength != null &&
    input.maxLength &&
    typeof input.value === "string"
  ) {
    isValid = isValid && input.value.trim().length <= input.maxLength;
  }
  // min max for numbers
  if (input.min != null && typeof input.value === "number") {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max != null && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
}
