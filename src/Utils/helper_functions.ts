
interface ICreateRangeStringInput {
    min: number,
    max: number,
    isMelee: boolean
}
export const createRangeString = (range: ICreateRangeStringInput) => {
    const rangeSymbol = range.isMelee ? "M" : "R";
    return `${rangeSymbol}${range.min} - ${rangeSymbol}${range.max}`
}