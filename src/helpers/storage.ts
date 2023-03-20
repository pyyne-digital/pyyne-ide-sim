export function load(key: string, fallback?: unknown) {
  const data = localStorage.getItem(key)!;
  try {
    const attempt = JSON.parse(data);
    return (
      (attempt === null || attempt === 'null' ? fallback : attempt) || null
    );
  } catch (oof) {
    return data;
  }
}

export function save(key: string, value: unknown) {
  if (value === null) return localStorage.removeItem(key);

  localStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : (value as string),
  );
}

export const LS = (key: string, value?: unknown) =>
  value === undefined ? load(key) : save(key, value);
