

export const clone = (obj: Object) => {
    return JSON.parse(JSON.stringify(obj));
}