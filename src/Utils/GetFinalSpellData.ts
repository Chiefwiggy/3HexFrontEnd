import {
    IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData,
    UDamageType
} from "../Data/ICardData";
import spellModifierCard from "../Components/Cards/SpellModifierCard";
import {IDataModifiers} from "../Data/GenericData";
import {ICharacterBaseData} from "../Data/ICharacterData";
import {IMinionData} from "../Data/IMinionData";
import CharacterSheet from "../Data/CharacterSheet";
import MinionSheet from "../Data/MinionSheet";

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
    },
    thrownRange: {
        min: number,
        max: number,
        isMelee: boolean
    },
    damageType:  UDamageType,
    damageSubtype: string

}

export const GetFinalSpellData = (spellBase: ISpellBaseCardData, spellTarget: ISpellTargetCardData, rest: Array<ISpellModifierCardData|null>, char: CharacterSheet|MinionSheet): ITotalSpellStats => {
    try {
        let finalBasePower = StatChain(spellBase.basePower, [spellBase.basePowerMod, spellTarget.basePowerMod, ...rest.map(e => e?.basePowerMod)]);
        let finalPotencyPower = Math.floor(StatChain(spellBase.potency, [spellBase.potencyMod, spellTarget.potencyMod, ...rest.map(e => e?.potencyMod)]) * char.getStat("might"));
        const finalPower = StatChain(finalBasePower + finalPotencyPower, [spellBase.powerMod, spellTarget.powerMod, ...rest.map(e => e?.powerMod)]);
        const minRange = StatChain(spellTarget.baseRange.min, [spellBase.minRangeMod, spellTarget.minRangeMod, ...rest.map(e => e?.minRangeMod)]);
        const maxRange = StatChain(spellTarget.baseRange.max, [spellBase.maxRangeMod, spellTarget.maxRangeMod, ...rest.map(e => e?.maxRangeMod)]);
        const minRangeFinal = StatChain(minRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, ...rest.map(e => e?.fullRangeMod)]);
        const maxRangeFinal = StatChain(maxRange, [spellBase.fullRangeMod, spellTarget.fullRangeMod, ...rest.map(e => e?.fullRangeMod)]);

        let finalBaseSet = StatChain(spellBase.baseSpellSet, [spellBase.baseSpellSetMod, spellTarget.baseSpellSetMod, ...rest.map(e => e?.baseSpellSetMod)])
        let finalSet = StatChain(finalBaseSet + char.getStat("presence"), [spellBase.spellSetMod, spellTarget.spellSetMod, ...rest.map(e => e?.spellSetMod)])

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

        return {
            tetherCost: StatChain(spellBase.tetherCost, [spellBase.tetherCostMod, spellTarget.tetherCostMod, ...rest.map(e => e?.tetherCostMod)]),
            castTime: finalCost,
            totalPower: finalPower,
            duration: StatChain(spellBase.duration, [spellBase.durationMod, spellTarget.durationMod, ...rest.map(e => e?.durationMod)]),
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



export const GetFinalWeaponData = (weaponBase: IScaledWeaponBaseData, allCards: Array<IWeaponCommonData | null>, char: CharacterSheet|MinionSheet): ITotalWeaponStats => {

    let might = 0;
    let skill = 0;
    let awareness = 0;
    might = char.getStat("might");
    skill = char.getStat("skill");
    awareness = char.getStat("awareness");

    let finalBasePower = StatChain(weaponBase.basePower, allCards.map(c => c?.basePowerMod));
    let finalPotencyPower = Math.floor(StatChain(weaponBase.potency, allCards.map(c => c?.potencyMod), false) * might);
    const finalPower = StatChain(finalBasePower + finalPotencyPower, allCards.map(c => c?.powerMod));
    const minRange = StatChain(weaponBase.baseRange.min, allCards.map(c => c?.minRangeMod));
    const maxRange = StatChain(weaponBase.baseRange.max, allCards.map(c => c?.maxRangeMod));
    const minRangeFinal = StatChain(minRange, allCards.map(c => c?.fullRangeMod));
    const maxRangeFinal = StatChain(maxRange, allCards.map(c => c?.fullRangeMod));

    const minThrownRange = StatChain(weaponBase.thrownRange.min, allCards.map(c => c?.minRangeMod));
    const maxThrownRange = StatChain(weaponBase.thrownRange.max, allCards.map(c => c?.maxRangeMod));
    const minThrownRangeFinal = StatChain(minThrownRange, allCards.map(c => c?.fullRangeMod));
    const maxThrownRangeFinal = StatChain(maxThrownRange, allCards.map(c => c?.fullRangeMod));

    const isMelee = weaponBase.baseRange.isMelee;

    const isThrownMelee = weaponBase.thrownRange.isMelee

    const finalBaseCrit = StatChain(weaponBase.baseCrit, allCards.map(c => c?.baseCritMod));
    const finalCrit = StatChain(skill + finalBaseCrit + (char.data.bonuses?.critBonus ?? 0), allCards.map(c => c?.critMod));

    const finalBaseHit = StatChain(weaponBase.baseHit, allCards.map(c => c?.baseHitMod));

    const finalHitMod = StatChain(finalBaseHit + (awareness*2) + skill + (char.data.bonuses?.hitBonus ?? 0), allCards.map(c => c?.hitMod));

    let finalDamageType: UDamageType = weaponBase.damageType;
    let finalDamageSubtype = weaponBase.damageSubtype;

    for (const card of allCards) {
        if (card) {
            if (card.weaponDamageTypeOverride) {
                finalDamageType = card.weaponDamageTypeOverride
            }
            if (card.wepaonDamageSubtypeOverride) {
                finalDamageSubtype = card.wepaonDamageSubtypeOverride
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