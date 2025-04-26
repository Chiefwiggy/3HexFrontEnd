import {IDataModifiers, IModifiable} from "./GenericData";
import {IArmor} from "./IArmorData";
import {IMinionData} from "./IMinionData";
import {IFatelineData} from "./IFatelineData";
import {IDowntimePlayerData} from "./IDowntime";
import {ICharacterRacialData} from "./IRacialData";

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

export interface ISettingsData {
    dieColorId: string
}

export interface ICharacterBaseData {
    characterName: string,
    characterLevel: number,
    isMainCharacter: boolean,
    classes: Array<IClassData>,
    attributeBars: IAttributeBars,
    downtimeData: Array<IDowntimePlayerData>,
    fateline: IFatelineData|undefined,
    currentActionPoints: number,
    characterStats: ICharacterStats,
    race: ICharacterRacialData|undefined,
    specialId: string,
    movement: {
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
    currentOffhandWeapon: ICalculatedWeapon | null,
    counterWeapon: ICalculatedWeapon | null,
    currentArmor: IEnchantmentData | null,
    currentShield: IEnchantmentData | null,
    knownConsumables: Array<IConsumablePlayerData>,
    knownArmor: Array<IEnchantmentData>,
    knownBaseSpells: Array<string>,
    knownWeapons: Array<IEnchantmentData>,
    knownSources: Array<IPreparedSource>,
    temporarySources: Array<IPreparedSource>,
    skillPoints: ISkillPointObject,
    minionsOwned: Array<IMinionOwnedData>,
    settings: ISettingsData,
    isDead: boolean,
    creatorName: string,
    __times_accessed: number,
    _id: string
}

export interface IMinionOwnedData {
    minionId: string,
    isEquipped: boolean,
    equippedAs: string
}

export interface IEnchantmentData {
    baseId: string,
    enchantmentLevel: number,
    improvements?: number,
    efficientUse?: boolean
}

export interface IConsumablePlayerData {
    consumableId: string,
    amount: number,
    prepared: number
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

export const ESkill = ["athletics", "handling", "stealth", "deduction", "identify", "science", "technology", "biology", "metaphysics", "spellcraft", "survival", "perception" ,"streetwise", "discovery", "diplomacy", "hostility", "guile", "lore", "occult", "society"]

export interface IAttributeBar {
    current: number,
    scaling: IModifiable
}

export interface IClassData {
    className: string,
    affinities: IAffinities,
    classExpertises: Array<string>,
    classTier: number,
    isPromoted: boolean
}

export interface IAffinities {
    nimble: number,
    infantry: number,
    guardian: number,
    focus: number,
    creation: number,
    alteration: number,
    leadership: number,
    supply: number,
    summoning: number,
    swift: number,
    riding: number,
    versatile: number,
    rune: number,
    sourcecraft: number,
    research: number,
    machinery: number,
    abjuration: number,
    biohacking: number
}



export interface IAffinitiesAndPath {
    affinities: IAffinities,
    path: IPathKeys
}

export interface IAffinitiesArray<T> {
    nimble: Array<T>,
    infantry: Array<T>,
    guardian: Array<T>,
    focus: Array<T>,
    creation: Array<T>,
    alteration: Array<T>,
    leadership: Array<T>,
    supply: Array<T>,
    summoning: Array<T>,
    swift: Array<T>,
    riding: Array<T>,
    versatile: Array<T>,
    rune: Array<T>,
    sourcecraft: Array<T>,
    research: Array<T>,
    machinery: Array<T>,
    abjuration: Array<T>,
    biohacking: Array<T>
}

export interface IPathKeys {
    warrior: number,
    arcanist: number,
    commander: number,
    navigator: number,
    scholar: number,
    hacker: number
}

export interface IPathArray<T> {
    warrior: Array<T>,
    arcanist: Array<T>,
    commander: Array<T>,
    navigator: Array<T>,
    scholar: Array<T>,
    hacker: Array<T>
}

export interface IPathKeysPlusAny {
    warrior: number,
    arcanist: number,
    commander: number,
    navigator: number,
    scholar: number,
    hacker: number
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
    weaponBaseData: IEnchantmentData,
    weaponCardsIds: Array<string>
}

export type UStance = "block" | "evade" | "exposed"