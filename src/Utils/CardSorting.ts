import {ICommonCardData} from "../Data/ICardData";


export const SortCardList = (a: ICommonCardData, b:ICommonCardData) => {
    let cardAValue = _AssignValueToSubtype(a.cardSubtype);
    let cardBValue = _AssignValueToSubtype(b.cardSubtype);

    if (cardAValue != cardBValue) {
        return cardAValue - cardBValue;
    }

    return a.cardName.localeCompare(b.cardName);
}

const _AssignValueToSubtype = (subtype: string): number => {
    switch (subtype) {
        case "base":
            return 1;
        case "target":
        case "form":
            return 2;
        case "modifier":
        case "skill":
            return 3;
        case "edict":
            return 4;
        default:
            return 5;
    }
}

