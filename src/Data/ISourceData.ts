import {ICommonCardData, ISpellBaseCardData, ISpellModifierCardData} from "./ICardData";

export interface ISourceData {
    sourceName: string,
    sourceArcanotype: string,
    sourceTier: number,
    law: null | ILawData,
    sourceTiers: Array<ITierData>
}

export interface ITierData {
    layer: number,
    cardType: string,
    cardData: ISpellBaseCardData | ISpellModifierCardData,
    arcaneRequirement: number,
    isSecret?: boolean
}

export interface ILawData {
    lawName: string,
    lawDescription: Array<string>,
    tetherCost: number,
    castTime?: string,
    materialComponents?: Array<string>
}