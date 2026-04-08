import {IPrerequisite} from "./GenericData";

export interface IAbility {
    _id: string,
    abilityName: string,
    prerequisites: Array<IPrerequisite>,
    description: Array<string>,
    isUltimate?: boolean,
    isPassive: boolean,
    uses: number,
    actionType: string,
    abilityRefreshTime: string,
    bonuses: Object,
    unlocks: Object,
    showByDefault: boolean
}