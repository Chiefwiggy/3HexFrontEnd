import {
    IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData
} from "../Data/ICardData";
import spellModifierCard from "../Components/Cards/SpellModifierCard";
import {IDataModifiers} from "../Data/GenericData";
import {ICharacterBaseData} from "../Data/ICharacterData";

export interface ITotalSpellStats {
    tetherCost: number,
    castTime: number,
    totalPower: number,
    duration: number,
    range: {
        min: number,
        max: number,
        isMelee: boolean
    },
    spellSet: number
}

export interface ITotalWeaponStats {
    totalPower: number,
    toHit: number,
    crit: number,
    range: {
        min: number,
        max: number,
        isMelee: boolean
    }

}

export const GetFinalSpellData = (spellBase: ISpellBaseCardData, spellTarget: ISpellTargetCardData, spellSkill: ISpellModifierCardData, spellEdict: ISpellModifierCardData | null, char: ICharacterBaseData): ITotalSpellStats => {
    try {
        let finalBasePower = StatChain(spellBase.basePower, [spellBase.basePowerMod, spellTarget.basePowerMod, spellSkill.basePowerMod, spellEdict?.basePowerMod]);
        let finalPotencyPower = Math.floor(StatChain(spellBase.potency, [spellBase.potencyMod, spellTarget.potencyMod, spellSkill.potencyMod, spellEdict?.potencyMod]) * char.characterStats.might.value);
        const finalPower = StatChain(finalBasePower + finalPotencyPower, [spellBase.powerMod, spellTarget.powerMod, spellSkill.powerMod, spellEdict?.powerMod]);
        const minRange = StatChain(spellTarget.baseRange.min, [spellBase.minRangeMod, spellTarget.minRangeMod, spellSkill.minRangeMod, spellEdict?.minRangeMod]);
        const maxRange = StatChain(spellTarget.baseRange.max, [spellBase.maxRangeMod, spellTarget.maxRangeMod, spellSkill.maxRangeMod, spellEdict?.maxRangeMod]);
        const minRangeFinal = StatChain(minRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, spellSkill.fullRangeMod, spellEdict?.fullRangeMod]);
        const maxRangeFinal = StatChain(maxRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, spellSkill.fullRangeMod, spellEdict?.fullRangeMod]);

        let finalBaseSet = StatChain(spellBase.baseSpellSet, [spellBase.baseSpellSetMod, spellTarget.baseSpellSetMod, spellSkill.baseSpellSetMod, spellEdict?.baseSpellSetMod])
        let finalSet = StatChain(finalBaseSet + char.characterStats.presence.value, [spellBase.spellSetMod, spellTarget.spellSetMod, spellSkill.spellSetMod, spellEdict?.spellSetMod])

        const isMelee = [spellBase.forceMelee, spellTarget.forceMelee, spellSkill.forceMelee, spellEdict?.forceMelee].reduce((pv: boolean, cv: boolean | undefined) => {
            if (cv) {
                return true;
            }
            return pv;
        }, false);

        const isRanged = [spellBase.forceRanged, spellTarget.forceRanged, spellSkill.forceRanged, spellEdict?.forceRanged].reduce((pv: boolean, cv: boolean | undefined) => {
            if (cv) {
                return true;
            }
            return pv;
        }, false);

        const finalCost = StatChain(spellBase.energyCost, [spellBase.castTimeMod, spellTarget.castTimeMod, spellSkill.castTimeMod, spellEdict?.castTimeMod])

        return {
            tetherCost: StatChain(spellBase.tetherCost, [spellBase.tetherCostMod, spellTarget.tetherCostMod, spellSkill.tetherCostMod, spellEdict?.tetherCostMod]),
            castTime: finalCost,
            totalPower: finalPower,
            duration: StatChain(spellBase.duration, [spellBase.durationMod, spellTarget.durationMod, spellSkill.durationMod, spellEdict?.durationMod]),
            range: {
                min: minRangeFinal,
                max: maxRangeFinal,
                isMelee: isMelee ? true : isRanged ? false : spellTarget.baseRange.isMelee
            },
            spellSet: finalSet
        }
    } catch (e) {
        return {
            tetherCost:0,
            castTime: 0,
            totalPower: 0,
            duration: 0,
            range: {
                min: 0,
                max: 0,
                isMelee: true
            },
            spellSet: 0
        }
    }

}

export const GetFinalWeaponData = (weaponBase: IScaledWeaponBaseData, allCards: Array<IWeaponCommonData | null>, char: ICharacterBaseData): ITotalWeaponStats => {

    let finalBasePower = StatChain(weaponBase.basePower, allCards.map(c => c?.basePowerMod));
    let finalPotencyPower = Math.floor(StatChain(weaponBase.potency, allCards.map(c => c?.potencyMod), false) * char.characterStats.might.value);
    const finalPower = StatChain(finalBasePower + finalPotencyPower, allCards.map(c => c?.powerMod));
    const minRange = StatChain(weaponBase.baseRange.min, allCards.map(c => c?.minRangeMod));
    const maxRange = StatChain(weaponBase.baseRange.max, allCards.map(c => c?.maxRangeMod));
    const minRangeFinal = StatChain(minRange, allCards.map(c => c?.fullRangeMod));
    const maxRangeFinal = StatChain(maxRange, allCards.map(c => c?.fullRangeMod));

    const isMelee = weaponBase.baseRange.isMelee;

    const finalBaseCrit = StatChain(weaponBase.baseCrit, allCards.map(c => c?.baseCritMod));
    const finalCrit = StatChain(char.characterStats.skill.value + finalBaseCrit + (char.bonuses?.critBonus ?? 0), allCards.map(c => c?.critMod));

    const finalBaseHit = StatChain(weaponBase.baseHit, allCards.map(c => c?.baseHitMod));

    const finalHitMod = StatChain(finalBaseHit + (char.characterStats.awareness.value*2) + char.characterStats.skill.value + (char.bonuses?.hitBonus ?? 0), allCards.map(c => c?.hitMod));


    return {
        crit: finalCrit,
        range: {
            isMelee: isMelee,
            max: maxRangeFinal,
            min: minRangeFinal
        },
        toHit: finalHitMod,
        totalPower: finalPower
    }

}

export const StatChain = (
    baseValue: number,
    cards: Array<IDataModifiers | undefined>,
    doFloor: boolean = true
) => {

    for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (card?.override != undefined) {
            return card.override;
        }
    }
    let statBase = baseValue;

    cards.forEach(card => {
        if (card?.modifier != undefined) {
            statBase += card.modifier ?? 0;
        }
    })

    let finalMod = 1;
    cards.forEach(card => {
        if (card?.multiplier != undefined) {
            finalMod *= card.multiplier ?? 1;
        }
    })

    statBase *= finalMod
    if (doFloor) {
        statBase = Math.floor(statBase);
    }

    return statBase;

}