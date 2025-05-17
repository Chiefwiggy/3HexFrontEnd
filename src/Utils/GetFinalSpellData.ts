import {
    IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData, UDamageSubtype,
    UDamageType
} from "../Data/ICardData";
import spellModifierCard from "../Components/Cards/SpellModifierCard";
import {IDataModifiers} from "../Data/GenericData";
import {ICharacterBaseData} from "../Data/ICharacterData";
import {IMinionData} from "../Data/IMinionData";
import CharacterSheet from "../Data/CharacterSheet";
import MinionSheet from "../Data/MinionSheet";
import AbstractSheet from "../Data/AbstractSheet";

export interface ITotalSpellStats {
    tetherCost: number,
    moneyCost: number,
    castTime: number,
    totalPower: number,
    duration: number,
    range: {
        min: number,
        max: number,
        isMelee: boolean
    },
    spellSet: number,
    summon: {
        pDEF: number,
        mDEF: number,
        movement: number,
        dodge: number,
        maxHealth: number,
        simpleName: string
    }
}

export interface ITotalWeaponStats {
    totalPower: number,
    toHit: number,
    crit: number,
    range: {
        min: number,
        max: number,
        isMelee: boolean
    },
    thrownRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    damageType:  UDamageType,
    damageSubtype: UDamageSubtype

}

const GetSummonScaler = (scalingTerm: string, char: AbstractSheet, power: number, spellSet: number, tetherCost: number) => {
    const splitTerm = scalingTerm.split(".");

    switch(splitTerm[0]) {
        case "bar":
            if (splitTerm[1] === "maxTether") {
                return char.getMaxTether()
            } else if (splitTerm[1] === "maxStamina") {
                return char.getMaxStamina()
            } else {
                return char.getMaxHealth()
            }
        case "spell":
            if (splitTerm[1] === "power") {
                return power
            } else if (splitTerm[1] == "spellSet") {
                return spellSet;
            } else {
                return tetherCost
            }
        default:
            return char.getMaxTether()
    }
}

export const GetFinalSpellData = (spellBase: ISpellBaseCardData, spellTarget: ISpellTargetCardData, rest: Array<ISpellModifierCardData|null>, char: AbstractSheet): ITotalSpellStats => {
    try {
        let specialLogicTags = [...spellBase.specialLogicTags ?? [], ...spellTarget.specialLogicTags ?? [], ...rest.flatMap(e => e?.specialLogicTags ?? [])];
        let finalBasePower = StatChain(spellBase.basePower, [spellBase.basePowerMod, spellTarget.basePowerMod, ...rest.map(e => e?.basePowerMod)]);
        let finalPotencyPower = Math.floor(StatChain(spellBase.potency, [spellBase.potencyMod, spellTarget.potencyMod, ...rest.map(e => e?.potencyMod)], false) * char.getPowerStat(specialLogicTags))
        const finalPower = StatChain(finalBasePower + finalPotencyPower + char.getBonusSpellPower(spellBase.arcanotype), [spellBase.powerMod, spellTarget.powerMod, {modifier: char.getAbilityBonuses("spellDamage")}, ...rest.map(e => e?.powerMod)]);
        const minRange = StatChain(spellTarget.baseRange.min, [spellBase.minRangeMod, spellTarget.minRangeMod, ...rest.map(e => e?.minRangeMod)]);
        const maxRange = StatChain(spellTarget.baseRange.max, [spellBase.maxRangeMod, spellTarget.maxRangeMod, ...rest.map(e => e?.maxRangeMod)]);
        const minRangePreFinal = StatChain(minRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, ...rest.map(e => e?.fullRangeMod)]);
        const maxRangePreFinal = StatChain(maxRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, ...rest.map(e => e?.fullRangeMod)]);
        const [minRangeFinal, maxRangeFinal] = char.applyRangedModifiers(minRangePreFinal, maxRangePreFinal, "spell");

        let finalBaseSet = StatChain(spellBase.baseSpellSet, [spellBase.baseSpellSetMod, spellTarget.baseSpellSetMod, ...rest.map(e => e?.baseSpellSetMod)])
        let finalSet = StatChain(finalBaseSet + char.getSpellSet(), [spellBase.spellSetMod, spellTarget.spellSetMod, ...rest.map(e => e?.spellSetMod)])

        const isMelee = [spellBase.forceMelee, spellTarget.forceMelee, ...rest.map(e => e?.forceMelee)].reduce((pv: boolean, cv: boolean | undefined) => {
            if (cv) {
                return true;
            }
            return pv;
        }, false);

        const isRanged = [spellBase.forceRanged, spellTarget.forceRanged, ...rest.map(e => e?.forceRanged)].reduce((pv: boolean, cv: boolean | undefined) => {
            if (cv) {
                return true;
            }
            return pv;
        }, false);

        const finalCost = StatChain(spellBase.energyCost, [spellBase.castTimeMod, spellTarget.castTimeMod, ...rest.map(e => e?.castTimeMod)])

        const tetherCost = StatChain(spellBase.tetherCost, [spellBase.tetherCostMod, spellTarget.tetherCostMod, ...rest.map(e => e?.tetherCostMod)])

        let summonPDEF = 0;
        let summonMDEF = 0;
        let summonMovement = 0;
        let summonHealth = 0;
        let summonBasicName = ""
        let summonDodge = 0;

        if (specialLogicTags.includes("isSummon") && spellTarget.summonData) {
            summonPDEF = spellTarget.summonData.pDEF.baseValue + (spellBase.damageType == "physical" ? 10 : 0)
                // + spellTarget.summonData.pDEF.potency * 0)
            summonMDEF = spellTarget.summonData.mDEF.baseValue + (spellBase.damageType == "magical" ? 10 : 0)
            summonMovement = spellTarget.summonData.movement.baseValue
            summonHealth = StatChain( tetherCost * (spellTarget.summonData.maxHealth.potency ?? 1), [spellBase.summonHealthMod, ...rest.map(e => e?.summonHealthMod)])
            summonBasicName = spellTarget.summonData.simpleName
            summonDodge = spellTarget.summonData.dodge.baseValue + char.getBlockDodge()
        }



        return {
            tetherCost: tetherCost,
            moneyCost: StatChain(0, [spellBase.moneyCostMod, spellTarget.moneyCostMod, ...rest.map(e => e?.moneyCostMod)]),
            castTime: finalCost,
            totalPower: finalPower,
            duration: StatChain(spellBase.duration, [spellBase.durationMod, spellTarget.durationMod, ...rest.map(e => e?.durationMod)]),
            range: {
                min: minRangeFinal,
                max: maxRangeFinal,
                isMelee: isMelee ? true : isRanged ? false : spellTarget.baseRange.isMelee
            },
            spellSet: finalSet,
            summon: {
                pDEF: summonPDEF,
                mDEF: summonMDEF,
                movement: summonMovement,
                maxHealth: summonHealth,
                simpleName: summonBasicName,
                dodge: summonDodge
            }
        }
    } catch (e) {
        return {
            tetherCost:0,
            moneyCost: 0,
            castTime: 0,
            totalPower: 0,
            duration: 0,
            range: {
                min: 0,
                max: 0,
                isMelee: true
            },
            spellSet: 0,
            summon: {
                pDEF: 0,
                mDEF: 0,
                movement: 0,
                maxHealth: 0,
                simpleName: "",
                dodge: 0
            }
        }
    }

}



export const GetFinalWeaponData = (weaponBase: IScaledWeaponBaseData, allCards: Array<IWeaponCommonData | null>, char: AbstractSheet): ITotalWeaponStats => {
    let specialLogicTags = [...weaponBase.specialLogicTags ?? [], ...allCards.flatMap(e => e?.specialLogicTags ?? [])];
    let finalBasePower = StatChain(weaponBase.basePower, allCards.map(c => c?.basePowerMod));
    let finalPotencyPower = Math.floor(StatChain(weaponBase.potency, allCards.map(c => c?.potencyMod), false) * char.getPowerStat(specialLogicTags));
    const finalPower = StatChain(finalBasePower + finalPotencyPower, [...allCards.map(c => c?.powerMod), {modifier: char.getAbilityBonuses("weaponDamage")}]);
    const minRange = StatChain(weaponBase.baseRange.min, allCards.map(c => c?.minRangeMod));
    const maxRange = StatChain(weaponBase.baseRange.max, allCards.map(c => c?.maxRangeMod));
    const minRangePreFinal = StatChain(minRange, allCards.map(c => c?.fullRangeMod));
    const maxRangePreFinal = StatChain(maxRange, allCards.map(c => c?.fullRangeMod));

    const [minRangeFinal, maxRangeFinal] = char.applyRangedModifiers(minRangePreFinal, maxRangePreFinal, "weapon");

    const minThrownRange = StatChain(weaponBase.thrownRange.min, allCards.map(c => c?.minRangeMod));
    const maxThrownRange = StatChain(weaponBase.thrownRange.max, allCards.map(c => c?.maxRangeMod));
    const minThrownRangeFinal = StatChain(minThrownRange, allCards.map(c => c?.fullRangeMod));
    const maxThrownRangeFinal = StatChain(maxThrownRange, allCards.map(c => c?.fullRangeMod));

    const isMelee = weaponBase.baseRange.isMelee;

    const isThrownMelee = weaponBase.thrownRange.isMelee

    const finalBaseCrit = StatChain(weaponBase.baseCrit, allCards.map(c => c?.baseCritMod));
    const finalCrit = StatChain(char.getCritStat() + finalBaseCrit + char.getCritBonus(), allCards.map(c => c?.critMod));

    const finalBaseHit = StatChain(weaponBase.baseHit, allCards.map(c => c?.baseHitMod));

    const finalHitMod = StatChain(finalBaseHit + char.getHitStat() + char.getCritBonus(), allCards.map(c => c?.hitMod));

    let finalDamageType: UDamageType = weaponBase.damageType;
    let finalDamageSubtype = weaponBase.damageSubtype;

    for (const card of allCards) {
        if (card) {
            if (card.weaponDamageTypeOverride) {
                finalDamageType = card.weaponDamageTypeOverride
            }
            if (card.weaponDamageSubtypeOverride) {
                finalDamageSubtype = card.weaponDamageSubtypeOverride
            }
        }
    }


    return {
        crit: finalCrit,
        range: {
            isMelee: isMelee,
            max: maxRangeFinal,
            min: minRangeFinal
        },
        thrownRange: {
            max: maxThrownRangeFinal,
            min: minThrownRangeFinal,
            isMelee: isThrownMelee
        },
        toHit: finalHitMod,
        totalPower: finalPower,
        damageType: finalDamageType,
        damageSubtype: finalDamageSubtype
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