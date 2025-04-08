

export const getDowntimeTimeModifier = (craftingType: string, itemName: string) => {
    const exceptions = ["Ether"]

    if (exceptions.includes(itemName)) {
        return 1;
    }

    switch (craftingType) {
        case "poison":
        case "totem":
            return 3
        case "potion":
        case "gem":
            return 2
        case "medical":
            return 0
        default:
            return 1
    }
}