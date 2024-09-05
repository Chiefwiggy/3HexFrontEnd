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
            focus?: number,
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
        pDEFBlock?: number,
        mDEFBlock?: number,
        pDEFEvade?: number,
        mDEFEvade?: number,
        maxStamina?: number,
        maxHealth?: number,
        maxTether?: number,
        dodge?: number,
        dodgeEvade?: number,
        dodgeBlock?: number,
        cardSlots?: number,
        critDamage?: number,
        expertiseDice?: number,
        weaponRequirement?: number,
        weaponPrestigeRequirement?: number,
        quickSlots?: number,
        maxGlyphs?: number
    },
    unlocks: {
        unarmoredDefense?: boolean,
        heavyArmor?: boolean,
        evadeWithHeavyArmor?: boolean,
        mindBreathing?: boolean,
        ironGrasp?: boolean
    }
}