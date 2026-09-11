# ts-safe-parse

A zero-dependency JSON/YAML-like safe parser that never throws. Returns typed `Result<T, ParseError>` discriminated unions.

## Features

- **Never throws**: Returns structured `Result` objects instead of throwing exceptions.
- **Type-safe**: Discriminated unions (`ok: true | false`) for reliable compiler checks.
- **Zero dependencies**: Lightweight with no external runtime dependencies.
- **NodeNext ESM**: Native modern ECMAScript module targeting Node.js 20+.

## Installation

```bash
npm install ts-safe-parse
```

## Usage

```typescript
import { safeParse, safeStringify } from 'ts-safe-parse';

const parsed = safeParse<{ id: number; name: string }>('{"id": 1, "name": "Alice"}');
if (parsed.ok) {
  console.log(parsed.value.name);
} else {
  console.error(parsed.error.message);
}

const serialized = safeStringify({ active: true });
if (serialized.ok) {
  console.log(serialized.value);
}
```

## API

- `safeParse<T>(input: string): Result<T, ParseError>`
- `safeStringify(value: unknown): Result<string, ParseError>`
- `ok<T>(value: T): Result<T, never>`
- `err<E>(error: E): Result<never, E>`

## License

MIT
