import {IDataModifiers, IPrerequisite} from "./GenericData";
import {IAffinities} from "./ICharacterData";

export type USpellTypes = "base" | "target" | "skill" | "edict" | null;
export type UWeaponClass = "light" | "standard" | "heavy"
export type UWeaponType = "axe" | "blade" | "bomb" | "bow" | "club" | "polearm" | "wand" | "spear" | "unarmed"
export type UCritDie = "-" | "?" | "1" | "2" | "3" | "4" | "5" | "6"
export interface ISpellBaseCardData extends ISpellModifierCardData {
    arcanotype: string,
    basePower: number,
    potency: number,
    duration: number,
    tetherCost: number,
    energyCost: number,
    environmentBonus: string,
    baseSpellSet: number,
    damageType: string,
    damageSubtype: string,
    saveType: string
}

export interface ISpellTargetCardData extends ISpellModifierCardData {
    baseRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
}


export interface ISpellModifierCardData extends ICommonCardData {
    castTimeMod?: IDataModifiers,
    durationMod?: IDataModifiers,
    tetherCostMod?: IDataModifiers,
    baseSpellSetMod?: IDataModifiers,
    spellSetMod?: IDataModifiers
    forceMelee?: boolean,
    forceRanged?: boolean
}

export interface ICommanderCardData extends ICommonCardData {
    appliesTo: {
        commander: boolean,
        adjutant?: boolean
        minions: boolean
    },
    characterModifiers: {
        stats?: {
            might: IDataModifiers,
            agility: IDataModifiers,
            skill: IDataModifiers,
            awareness: IDataModifiers,
            vitality: IDataModifiers,
            knowledge: IDataModifiers,
            mind: IDataModifiers,
            presence: IDataModifiers,
            authority: IDataModifiers,
            endurance: IDataModifiers,
        },
        movement?: {
            stepSpeed: IDataModifiers,
            dashSpeed: IDataModifiers,
        },
        bonuses?: Object,
        specialization?: {
            axes?: ISpecialistData,
            blades?: ISpecialistData,
            bows?: ISpecialistData,
            clubs?: ISpecialistData,
            polearms?: ISpecialistData,
            wands?: ISpecialistData,
            spears?: ISpecialistData,
            unarmed?: ISpecialistData
        },
        quickSlots?: IDataModifiers,
    },
    unlocks: {
        minionsUseEdicts?: boolean,
    },
    minionSlots?: number,
    adjutantSlots?: number
}

export interface ISpecialistData {
    hit?: IDataModifiers;
    power?: IDataModifiers;
}

export type UDamageType = "physical" | "magical" | "raw" | "resistant" | "none";


export interface ICommonCardData {
    cardName: string,
    cardType: string,
    cardSubtype: string,
    effects: Array<IEffectData>,
    prerequisites: Array<IPrerequisite>,
    isUltimate?: boolean
    isFavorite?: boolean
    powerMod?: IDataModifiers,
    basePowerMod?: IDataModifiers,
    potencyMod?: IDataModifiers,
    fullRangeMod?: IDataModifiers,
    minRangeMod?: IDataModifiers,
    maxRangeMod?: IDataModifiers,
    _id: string
}

export interface IWeaponCommonData extends ICommonCardData {
    baseHitMod?: IDataModifiers,
    hitMod?: IDataModifiers,
    baseCritMod?: IDataModifiers,
    critMod?: IDataModifiers
    weaponClassOverride?: UWeaponClass,
    weaponDamageTypeOverride?: UDamageType,
    wepaonDamageSubtypeOverride?: string
}

export interface IScalingData<T> {
    baseValue: T,
    scalingPer?: number,
    breakpoints: Array<number>,
    breakpointBonuses: Array<T>
}

export interface IScaledWeaponBaseData extends IWeaponCommonData {
    baseHit: number,
    basePower: number,
    potency: number,
    weaponClass: UWeaponClass,
    weaponType: UWeaponType,
    baseCrit: number,
    damageType: UDamageType,
    damageSubtype: string,
    handedness: number,
    specialCrit: {
        d1: UCritDie,
        d2: UCritDie,
        d3: UCritDie,
        d4: UCritDie,
        d5: UCritDie,
        d6: UCritDie,
    },
    baseRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    canThrow: boolean,
    thrownRange: {
        min: number,
        max: number,
        isMelee: boolean
    }
    tetherCost: number,
    staminaCost: number,
    skillRequirement: number
    enchantmentLevel: number
    weaponTags: Array<string>
}

export interface IWeaponBaseData extends IWeaponCommonData {
    baseHit: IScalingData<number>,
    basePower: IScalingData<number>,
    potency: IScalingData<number>,
    weaponClass: UWeaponClass,
    weaponType: UWeaponType,
    baseCrit: IScalingData<number>,
    damageType: UDamageType,
    damageSubtype: string,
    handedness: number,
    specialCrit: IScalingData<{
        d1: UCritDie,
        d2: UCritDie,
        d3: UCritDie,
        d4: UCritDie,
        d5: UCritDie,
        d6: UCritDie
    }>,
    baseRange: {
        min: IScalingData<number>,
        max: IScalingData<number>,
        isMelee: boolean
    },
    canThrow: IScalingData<boolean>,
    thrownRange: {
        min: IScalingData<number>,
        max: IScalingData<number>,
        isMelee: boolean
    }
    tetherCost: IScalingData<number>,
    staminaCost: IScalingData<number>,
    skillRequirement: IScalingData<number>
    weaponTags: Array<string>
    tempEnchantValue?: number
}

export interface IEffectData {
    text: string,
    icon: {
        emblem: string,
        symbol: string,
        text: string
    },
    powerX?: number
}



export type UPrerequisiteType = "attribute" | "affinity" | "class" | "arcana" | "nodefault"
export type UCharacterStat = "might" | "agility" | "skill" | "awareness" | "vitality" | "knowledge" | "mind" | "presence" | "authority" | "endurance"
export type UAffinity = `${keyof IAffinities}`