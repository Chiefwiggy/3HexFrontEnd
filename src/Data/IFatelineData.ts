import {IClassChoiceData} from "./IClassMetaData";
import {ICommonCardData} from "./ICardData";
import {IAbility} from "./IAbilities";
import {IAffinities} from "./ICharacterData";

export interface IFatelineFullData {
    fatelineName: string,
    fatelineId: string,
    fatelineNumber: number,
    upright: IFatelineSidedData,
    reversed: IFatelineSidedData
}

export interface IFatelineSidedData {
    fatelineDescription: [string],
    affinityChoices: IClassChoiceData,
    cards: Array<ICommonCardData>,
    abilities: Array<IAbility>
}

export interface IFatelineData {
    fatelineName: string,
    fatelineId: string
    affinities: IAffinities,
    isReversed: boolean
}

