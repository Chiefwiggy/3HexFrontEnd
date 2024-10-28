

export interface IDiceColor {
    id: string,
    name: string,
    colorData: {
        dotColor: string,
        faceColor: string
        outline: boolean,
        outlineColor?: string,
    }
    lockedByDefault: boolean
}