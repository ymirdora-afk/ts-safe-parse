/**
 * Discriminated union representing either success (`ok: true`) or failure (`ok: false`).
 */
export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Creates a successful Result containing a value.
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/**
 * Creates a failed Result containing an error.
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
