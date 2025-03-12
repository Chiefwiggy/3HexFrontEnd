import {IDataModifiers, IPrerequisite} from "./GenericData";
import {IAffinities} from "./ICharacterData";
import {UArcanotype} from "./ISourceData";

export type USpellTypes = "base" | "target" | "skill" | "edict" | "summon" | null;
export type UWeaponClass = "light" | "standard" | "heavy"
export type UWeaponType = "axe" | "blade" | "bomb" | "bow" | "club" | "polearm" | "wand" | "spear" | "unarmed"
export type UCritDie = "-" | "?" | "1" | "2" | "3" | "4" | "5" | "6"
export interface ISpellBaseCardData extends ISpellModifierCardData {
    arcanotype: UArcanotype,
    basePower: number,
    potency: number,
    duration: number,
    tetherCost: number,
    energyCost: number,
    environmentBonus: string,
    baseSpellSet: number,
    damageType: UDamageType,
    damageSubtype: UDamageSubtype,
    saveType: string,
    isFromTemporarySource: boolean
}

export interface ITargetSummonScaling {
    potency: number,
    scalingStat: string,
    baseValue: number
}

export interface ISpellTargetCardData extends ISpellModifierCardData {
    baseRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    summonData?: {
        maxHealth: ITargetSummonScaling,
        pDEF: ITargetSummonScaling,
        mDEF: ITargetSummonScaling,
        dodge: ITargetSummonScaling,
        movement: ITargetSummonScaling,
        simpleName: string,
        summonSize: string
    }
}


export interface ISpellModifierCardData extends ICommonCardData {
    castTimeMod?: IDataModifiers,
    durationMod?: IDataModifiers,
    tetherCostMod?: IDataModifiers,
    moneyCostMod?: IDataModifiers,
    baseSpellSetMod?: IDataModifiers,
    spellSetMod?: IDataModifiers,
    summonHealthMod?: IDataModifiers,
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
export const VDamageSubtypes = ["pierce", "slash", "kinetic", "burn", "frost", "shock", "corrosive", "sensory", "holy", "curse", "soul", "none"]

export type UDamageSubtype = typeof VDamageSubtypes[number]


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
    canUseForOffhand?: boolean,
    offhandOnly? :boolean,
    weaponClassOverride?: UWeaponClass,
    weaponDamageTypeOverride?: UDamageType,
    weaponDamageSubtypeOverride?: UDamageSubtype
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
    damageSubtype: UDamageSubtype,
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
    damageSubtype: UDamageSubtype,
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

export interface IConditionCard extends IWeaponCommonData, ISpellModifierCardData {
    appliesTo: {
        attacks: boolean,
        spells: boolean,
        hacks: boolean
    }
}

export interface IConditionTag {
    conditionId: string,
    conditionName: string,
    conditionType: string
    conditionCountdownType: "uses" | "decay10" | "decay1" | "rounds" | "onWounding" | "perFight" | "singleUse" | "untilSaved"
    description: Array<string>,
    xVals: Array<{
        basePower: number
    }>,
    conditionTier: number
}



export type UPrerequisiteType = "attribute" | "affinity" | "class" | "path" | "nodefault" | "race" | "fateline" | "secret" | "subrace"
export type UCharacterStat = "might" | "agility" | "skill" | "awareness" | "vitality" | "knowledge" | "mind" | "presence" | "authority" | "endurance"
export type UAffinity = `${keyof IAffinities}`