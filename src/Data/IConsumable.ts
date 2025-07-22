import {ICharacterStats} from "./ICharacterData";
import {IRangeData} from "./Card Calculators/AbstractCardCalculator";


export enum EConsumableType {
    HEALING = "healing",
    CURE = "cure",
    BUFF = "buff",
    DAMAGE = "damage",
    DEBUFF = "debuff",
    POISON = "poison",
    CONTAINER = "container",
    SUPPORT = "support",
    OTHER = "other"
}

export enum EConsumableCraftingType {
    POTION = "potion",
    TRAP = "trap",
    TOTEM = "totem",
    GEM = "gem",
    CURSE = "curse",
    HOLY = "holy",
    FLAG = "flag",
    BOMB = "bomb",
    MEDICAL = "medical",
    NONE = "none"
}

export interface IConsumableTemplate {
    _id: string,
    itemName: string,
    itemType: EConsumableType,
    craftingType: EConsumableCraftingType,
    alchemistOnly: boolean,
    craftingCost: number,
    xVals: Array<{
        basePower: number,
        potency: number,
        skillScaling: keyof ICharacterStats | "none",
        abilityScaling: {
            modifiers?: Array<string>,
            multipliers?: Array<string>,
            overrides?: Array<string>
        }
    }>,
    tetherCost?: number,
    description: Array<string>,
    slotCost: number,
    itemTier: number
    itemCost: number,
    materialCost: number

}

export interface IConsumableMergedData extends IConsumableTemplate {
    consumableId: string,
    prepared: number,
    amount: number
}