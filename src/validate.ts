import { type Result, ok, err } from './result.js';

/** Validate that a parsed value matches the expected shape. */
export function validateShape<T>(
  value: unknown,
  guard: (v: unknown) => v is T,
): Result<T, Error> {
  if (guard(value)) return ok(value);
  return err(new Error(`Value does not match expected shape: ${typeof value}`));
}
