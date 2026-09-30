/**
 * Deeply sets a value in an object given a dot-separated path string.
 * Example: setByPath({ a: { b: 1 } }, 'a.b', 2) => { a: { b: 2 } }
 */
export function setByPath<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const result = JSON.parse(JSON.stringify(obj || {})) as Record<string, unknown>;
  const keys = path.split('.');
  let current: Record<string, unknown> = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result as T;
}

/**
 * Gets a value from an object by dot-separated path.
 */
export function getByPath<T = unknown>(
  obj: Record<string, unknown> | undefined,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj) return defaultValue;
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return (current as T) ?? defaultValue;
}
