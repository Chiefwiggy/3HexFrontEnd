

export const getDowntimeTimeModifier = (craftingType: string, itemName: string) => {


    switch (craftingType) {
        case "totem":
            return 3
        case "gem":
        case "bomb":
            return 2
        case "medical":
            return 0
        default:
            return 1
    }
}