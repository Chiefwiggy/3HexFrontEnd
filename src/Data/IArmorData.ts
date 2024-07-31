import {IPrerequisite} from "./GenericData";
import {IScalingData} from "./ICardData";


export type UArmorClass = "light" | "standard" | "heavy"

export interface IArmor {
    _id: string,
    armorName: string,
    armorClass: UArmorClass,
    vitalityRequirement: number,
    additionalPrerequisites: Array<IPrerequisite>,
    pDEFBonus: number,
    mDEFBonus: number,
    blockPDEFBonus: number,
    blockMDEFBonus: number
}

export interface IBaseArmorData {
    _id: string,
    armorName: string,
    armorClass: UArmorClass,
    vitalityRequirement: IScalingData<number>,
    additionalPrerequisites: IScalingData<Array<IPrerequisite>>,
    pDEFBonus: IScalingData<number>,
    mDEFBonus: IScalingData<number>,
    blockPDEFBonus: IScalingData<number>,
    blockMDEFBonus: IScalingData<number>
}

export interface IShield {
    shieldName: string,
    shieldClass: UArmorClass,
    vitalityRequirement: number,
    additionalPrerequisites: Array<IPrerequisite>
    pDEFBonus: number,
    mDEFBonus: number
}