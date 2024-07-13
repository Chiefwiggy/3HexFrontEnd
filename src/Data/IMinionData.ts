import {IAttributeBar, ICalculatedSpell, ICalculatedWeapon} from "./ICharacterData";
import {IModifiable} from "./GenericData";
import {IArmor} from "./IArmorData";


export interface IMinionData {
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
    currentArmor: IArmor|null,
    bonuses: {
        staminaRefresh?: number,
        tetherRefresh?: number
    }
}