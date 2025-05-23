import {ICommonCardData} from "../Data/ICardData";
import {ISourceData, UArcanotype} from "../Data/ISourceData";
import CharacterSheet from "../Data/CharacterSheet";


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
        case "summon":
        case "form":
            return 2;
        case "modifier":
        case "skill":
            return 3;
        case "edict":
        case "order":
            return 4;
        default:
            return 5;
    }
}

export const SortSourcesByArcanotype = (playerSourceData: Array<[string, number]>) => (a: ISourceData, b: ISourceData) => {
    const newSortData = playerSourceData.sort(([_, valA], [__, valB]) => valB - valA).map(e => e[0])
    return _SortSourcesByArcanotypeHelper(newSortData, a,b);
}

const _SortSourcesByArcanotypeHelper = (criteriaList: Array<string>, a: ISourceData, b: ISourceData): number => {
    return criteriaList.findIndex(rx => rx === a.sourceArcanotype) - criteriaList.findIndex(rx => rx === b.sourceArcanotype)
}

