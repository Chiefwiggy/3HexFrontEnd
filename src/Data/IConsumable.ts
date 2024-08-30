import {ICharacterStats} from "./ICharacterData";
import {IRangeData} from "./Card Calculators/AbstractCardCalculator";


export enum EConsumableType {
    HEALING = "healing",
    BOMB = "bomb",
    TRAP = "trap"
}

export interface IConsumableTemplate {
    _id: string,
    itemName: string,
    basePower: number,
    potency: number,
    skillScaling: keyof ICharacterStats | "none",
    tetherCost?: number,
    itemType: EConsumableType,
    description: Array<string>,
    slotCost: number,
}