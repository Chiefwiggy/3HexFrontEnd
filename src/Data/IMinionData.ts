import {IAttributeBar, ICalculatedSpell, ICalculatedWeapon, IEnchantmentData} from "./ICharacterData";
import {IModifiable} from "./GenericData";
import {IArmor} from "./IArmorData";
import {ICommonCardData} from "./ICardData";


export interface IMinionData {
    _id: string,
    minionName: string,
    leadershipRequirement: number,
    attributeBars: {
        health: IAttributeBar,
        stamina: IAttributeBar
        tether: IAttributeBar
    },
    minionStats: {
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
    },
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