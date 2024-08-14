import {IDataModifiers, IModifiable} from "./GenericData";
import {IArmor} from "./IArmorData";
import {IMinionData} from "./IMinionData";

export interface IAttributeBars {
    health: IAttributeBar,
    stamina: IAttributeBar,
    tether: IAttributeBar
}

export interface ICharacterStats {
    might: IModifiable,
    agility: IModifiable,
    skill: IModifiable,
    awareness: IModifiable,
    vitality: IModifiable,
    knowledge: IModifiable,
    mind: IModifiable,
    presence: IModifiable,
    authority: IModifiable,
    endurance: IModifiable
}

export interface IPreparedCard {
    cardId: string,
    additionalData?: number
}

export interface IPreparedSource {
    sourceId: string,
    attunementLevel: number
}

export interface ICharacterBaseData {
    characterName: string,
    characterLevel: number,
    classes: Array<IClassData>,
    attributeBars: IAttributeBars,
    currentActionPoints: number,
    characterStats: ICharacterStats,
    movement: {
        stepSpeed: IModifiable,
        dashSpeed: IModifiable,
        canClimb?: boolean,
        canFly?: boolean
        canSwim?: boolean
    },
    bonuses?: {
        staminaRefresh?: number,
        tetherRefresh?: number,
        maxHealth?: number,
        maxStamina?: number,
        maxTether?: number,
        expertiseDice?: number,
        hitBonus?: number,
        critBonus?: number,
    },
    preparedCards: Array<IPreparedCard>,
    preparedCommanderCards: Array<string>,
    createdSpells: Array<ICalculatedSpell>,
    createdWeapons: Array<ICalculatedWeapon>,
    currentSpell: ICalculatedSpell | null,
    currentWeapon: ICalculatedWeapon | null,
    counterWeapon: ICalculatedWeapon | null,
    currentArmor: IEnchantmentData | null,
    knownArmor: Array<IEnchantmentData>,
    knownBaseSpells: Array<string>,
    knownWeapons: Array<IEnchantmentData>,
    knownSources: Array<IPreparedSource>,
    skillPoints: ISkillPointObject,
    minionsOwned: Array<{
        minionId: string,
        isEquipped: boolean
    }>
    _id: string
}

export interface IEnchantmentData {
    baseId: string,
    enchantmentLevel: number
}

export interface ISkillPointObject {
    athletics: number,
    handling: number,
    stealth: number,
    deduction: number,
    identify: number,
    science: number,
    technology: number,
    biology: number,
    metaphysics: number,
    spellcraft: number,
    survival: number,
    perception: number,
    streetwise: number,
    discovery: number,
    diplomacy: number,
    hostility: number,
    guile: number,
    lore: number,
    occult: number,
    society: number
}

export interface IAttributeBar {
    current: number,
    scaling: IModifiable
}

export interface IClassData {
    className: string,
    affinities: IAffinities,
    classExpertises: Array<string>,
    downtimeActivities: Array<string>,
    classTier: number
}

export interface IAffinities {
    hex: number,
    rune: number,
    soul: number,
    deft: number,
    infantry: number,
    guardian: number,
    leadership: number,
    erudite: number,
    supply: number,
    biohacking: number,
    abjuration: number,
    machinery: number
}

export interface IAffinitiesArray<T> {
    hex: Array<T>,
    rune: Array<T>,
    soul: Array<T>,
    deft: Array<T>,
    infantry: Array<T>
    guardian: Array<T>,
    leadership: Array<T>
    erudite: Array<T>,
    supply: Array<T>
    biohacking: Array<T>,
    abjuration: Array<T>,
    machinery: Array<T>
}

export interface IArcanaKeys {
    warrior: number,
    arcane: number,
    support: number,
    hacker: number
}

export interface IArcanaArray<T> {
    warrior: Array<T>,
    arcane: Array<T>,
    support: Array<T>,
    hacker: Array<T>
}

export interface IArcanaKeysPlusAny {
    warrior: number,
    arcane: number,
    support: number,
    hacker: number,
    any: number
}

export interface ICalculatedSpell {
    customName?: string,
    spellBaseId: string,
    spellTargetId: string,
    spellSkillsIds: Array<string>
}

export interface ICalculatedArmor {
    baseId: string,
    enchantmentLevel: 0
}

export interface ICalculatedWeapon {
    customName?: string,
    weaponBaseData: {
        baseId: string,
        enchantmentLevel: number
    },
    weaponCardsIds: Array<string>
}

export type UStance = "block" | "evade"