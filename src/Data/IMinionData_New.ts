import {UArmorClass} from "./IArmorData";
import {IWeaponBaseData} from "./ICardData";
import {IEnchantmentData, ISkillPointObject} from "./ICharacterData";

export enum EMinionRole {
    DUELIST="duelist", // quick footed
    SOLDIER="soldier", // standard warrior
    BRAWLER="brawler", // high strength/damage
    VANGUARD="vanguard", // defensive
    EVOKER="evoker", // magic blaster
    CHANTER="chanter", // magic support
    HEXER="hexer", //debuff mage,
    MEDIC="medic", // healer,
    CONVOY="convoy", // focus on consumables
    SCOUT="scout", // focuses on stealth, movement, and information gathering,
    MARKSMAN="marksman", // focuses on accuracy and range
}



export interface IMinionBaseData_New {
    _id: string,
    minionName: string,
    isNamedMinion: boolean,
    minionLevel: number,
    minionRoles: Array<EMinionRole>,
    minionStats: {
        might: number,
        technique: number,
        toughness: number
    }
    armorData: IEnchantmentData,
    baseWeapon: IEnchantmentData,
    downtimeSkill: string,
    primarySkill: keyof ISkillPointObject,
    secondarySkill: keyof ISkillPointObject,
    tertiarySkill: keyof ISkillPointObject
}

export interface IMinionRoleData {
    roleId: EMinionRole,
    roleName: string,
    roleDescription: string,
    commanderAuthorityModifiers: {
        finalPower: number,
        toHit: number,
        critDamage: number,
        spellSaveSet:number,
        allSavesModifier: number,
        maxStamina: number
    },
    minionMightModifiers: {
        finalPower: number,
    },
    minionTechniqueModifiers: {
        toHit: number,
        critDamage: number,
        maxTether: number,
        dodge: number
    },
    minionToughnessModifiers: {
        spellSaveSet: number,
        allSavesModifier: number,
        maxStamina: number,
        maxHealth: number,
        staminaRefreshMultiplier: number,
        tetherRefreshMultiplier: number,
        pDEF: number,
        mDEF: number
    },
    otherModifiers: {
        movement: number,
    }

}

export type UMinionStat = "might" | "technique" | "toughness"