import {UDamageSubtype, UDamageType} from "./ICardData";
import {IPrerequisite} from "./GenericData";


export interface IGadgetData {
    _id: string,
    gadgetName: string,
    effects: Array<{
        text: string,
        icon: {
            emblem: string,
            symbol: string,
            text: string
        },
        powerX?: number
    }>,
    packageSlots: number,
    prerequisites: Array<IPrerequisite>,
    gadgetActionType: string,
    gadgetType: string,
    technikCost: number,
    surgeCost: number,
    basePower: number,
    baseHit: number,
    potency: number,
    damageType: UDamageType,
    damageSubtype: UDamageSubtype,
    visibility: string,
    bonuses: Object,
    unlocks: Object,
}