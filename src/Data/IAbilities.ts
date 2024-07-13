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
    bonuses: {
        affinity?: {
            hex?: number,
            rune?: number,
            soul?: number,
            deft?: number,
            infantry?: number,
            guardian?: number,
            leadership?: number,
            erudite?: number,
            supply?: number,
            biohacking?: number,
            abjuration?: number,
            machinery?: number
        },
        arcana?: {
            arcane?: number,
            warrior?: number,
            support?: number,
            hacker?: number
        }
        pDEF?: number,
        mDEF?: number,
        maxStamina?: number,
        maxHealth?: number,
        maxTether?: number,
        cardSlots?: number,
    },
    unlocks: {
        unarmoredDefense?: boolean
    }
}