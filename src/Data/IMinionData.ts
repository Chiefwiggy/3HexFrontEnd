import {
    IAttributeBar,
    ICalculatedArmor,
    ICalculatedSpell,
    ICalculatedWeapon,
    IEnchantmentData,
    ISkillPointObject
} from "./ICharacterData";
import {IModifiable} from "./GenericData";
import {IArmor} from "./IArmorData";
import {ICommonCardData} from "./ICardData";

export interface IMinionStats {
    might: IModifiable,
    agility: IModifiable,
    skill: IModifiable,
    awareness: IModifiable,
    vitality: IModifiable,
    knowledge: IModifiable,
    mind: IModifiable,
    presence: IModifiable,
    command: IModifiable,
    endurance: IModifiable
}

export interface IMinionTemplateStats {
    might: number,
    agility: number,
    skill: number,
    awareness: number,
    vitality: number,
    knowledge: number,
    mind: number,
    presence: number,
    command: number,
    endurance: number
}
export interface IMinionData {
    _id: string,
    minionName: string,
    leadershipRequirement: number,
    attributeBars: {
        health: IAttributeBar,
        stamina: IAttributeBar
        tether: IAttributeBar
    },
    minionStats: IMinionStats ,
    movement: {
        stepSpeed: IModifiable,
        dashSpeed: IModifiable,
        canClimb?: boolean,
        canFly?: boolean,
        canSwim?: boolean
    },
    currentSpell: ICalculatedSpell|null,
    currentWeapon: ICalculatedWeapon|null,
    isAdjutant: boolean,
    currentArmor: IEnchantmentData | null,
    cardData: Array<ICommonCardData>
    bonuses: {
        staminaRefresh?: number,
        tetherRefresh?: number,
        maxHealth?: number,
        maxStamina?: number,
        maxTether?: number,
        hitBonus?: number,
        critBonus?: number
    }
}

export interface IMinionTemplateData {
    _id: string,
    minionTemplateName: string,
    minionBaseStats: IMinionTemplateStats,
    currentSpell: ICalculatedSpell|null,
    currentWeapon: ICalculatedWeapon|null,
    currentArmor: IEnchantmentData|null,
    cardData: Array<ICommonCardData>,
    baseAuthorityRequirement: number,
    primarySkill: keyof ISkillPointObject,
    secondarySkill: keyof ISkillPointObject,
    tertiarySkill: keyof ISkillPointObject,
    downtimeSkill: string,
    bonuses: Object
}