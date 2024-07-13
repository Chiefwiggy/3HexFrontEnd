import {IPrerequisite} from "./GenericData";


export type UArmorClass = "light" | "standard" | "heavy"

export interface IArmor {
    armorName: string,
    armorClass: UArmorClass,
    vitalityRequirement: number,
    additionalPrerequisites: Array<IPrerequisite>,
    pDEFBonus: number,
    mDEFBonus: number,
    blockPDEFBonus: number,
    blockMDEFBonus: number
}

export interface IShield {
    shieldName: string,
    shieldClass: UArmorClass,
    vitalityRequirement: number,
    additionalPrerequisites: Array<IPrerequisite>
    pDEFBonus: number,
    mDEFBonus: number
}