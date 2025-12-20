import {ICommonCardData, ISpellBaseCardData, ISpellModifierCardData} from "./ICardData";

export interface ISourceData {
    _id: string,
    sourceName: string,
    sourceArcanotype: UArcanotype,
    sourceTier: number,
    law: null | ILawData,
    sourceTiers: Array<ITierData>,
    visibility: "all" | "restricted" | "admin",
    onlyTemporary: boolean,
    neverTemporary: boolean,
    tempAttunementLevel: number,
    campaignIds: Array<string>
}

export interface ISourceDataAPI {
    sourceName: string,
    sourceArcanotype: UArcanotype,
    sourceTier: number,
    sourceTiers: Array<{
        layer: number,
        cardType: string,
        cardId: string,
        isSecret?: boolean
    }>,
    visibility: "all" | "restricted" | "admin",
    onlyTemporary: boolean,
    neverTemporary: boolean,
    campaignIds: Array<string>
}



export const VArcanotype =  ["elemental", "divine", "mystical", "axum", "primal", "eonic", "animus", "esoteric"]

export type UArcanotype = typeof VArcanotype[number]

export interface ITierData {
    layer: number,
    cardType: string,
    cardData: ISpellBaseCardData | ISpellModifierCardData,
    isSecret?: boolean
}

export interface ILawData {
    lawName: string,
    lawDescription: Array<string>,
    tetherCost: number,
    castTime?: string,
    materialComponents?: Array<string>
}