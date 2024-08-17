type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

type RemoveNull<T> = ExpandRecursively<{
  [K in keyof T]: Exclude<RemoveNull<T[K]>, null | undefined>
}>

export function removeEmpty<T>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj as any)
      .filter(([_, v]) => v !== null || v !== undefined)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  ) as RemoveNull<T>
}
