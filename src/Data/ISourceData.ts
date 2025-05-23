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
    tempAttunementLevel: number
}



export const VArcanotype =  ["elemental", "divine", "mystical", "axum", "primal", "eonic", "animus", "esoteric"]

export type UArcanotype = typeof VArcanotype[number]

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