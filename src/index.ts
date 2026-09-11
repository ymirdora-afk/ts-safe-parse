import { Result, ok, err } from './result.js';

export { Result, ok, err } from './result.js';

/**
 * Error returned when parsing or serialization fails.
 */
export class ParseError extends Error {
  override readonly name = 'ParseError';
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Safely parses a JSON string into type `T` without throwing.
 */
export function safeParse<T = unknown>(input: string): Result<T, ParseError> {
  if (typeof input !== 'string') {
    return err(new ParseError('Input must be a string'));
  }

  try {
    const parsed = JSON.parse(input) as T;
    return ok(parsed);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return err(new ParseError(`Failed to parse: ${message}`, cause));
  }
}

/**
 * Safely serializes a value to a JSON string without throwing.
 */
export function safeStringify(
  value: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
): Result<string, ParseError> {
  try {
    const serialized = JSON.stringify(value, replacer as any, space);
    if (serialized === undefined) {
      return err(new ParseError('Value is not serializable to valid JSON'));
    }
    return ok(serialized);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return err(new ParseError(`Failed to stringify: ${message}`, cause));
  }
}
