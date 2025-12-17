// Utils/safeJson.ts
export function toPlainJson<T>(value: T): any {
    return JSON.parse(JSON.stringify(value));
}
