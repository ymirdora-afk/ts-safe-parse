import { type Result, ok, err } from './result.js';

/** Chain multiple parse operations, short-circuiting on first error. */
export function chain<A, B, E>(
  result: Result<A, E>,
  fn: (value: A) => Result<B, E>,
): Result<B, E> {
  if (!result.ok) return result;
  return fn(result.value);
}

/** Map the success value of a Result. */
export function map<A, B, E>(
  result: Result<A, E>,
  fn: (value: A) => B,
): Result<B, E> {
  if (!result.ok) return result;
  return ok(fn(result.value));
}
