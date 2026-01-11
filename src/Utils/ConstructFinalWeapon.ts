import {IScaledWeaponBaseData, IScalingData, IWeaponBaseData} from "../Data/ICardData";
import {IArmor, IBaseArmorData, IBaseShieldData, IShield} from "../Data/IArmorData";
import {IEnchantmentData} from "../Data/ICharacterData";
import {IGadgetData} from "../Data/IGadgetData";


export const ConstructFinalWeapon = (baseWeaponData: IWeaponBaseData, enchantmentData: IEnchantmentData): IScaledWeaponBaseData => {

    const improvements = enchantmentData.enchantmentLevel + (enchantmentData?.improvements ?? 0) + (enchantmentData?.efficientUse ? 1 : 0);

    return {
        ...baseWeaponData,
        _id: baseWeaponData._id,
        baseCrit: ScaleChainNumeric(baseWeaponData.baseCrit, improvements),
        baseHit: ScaleChainNumeric(baseWeaponData.baseHit, improvements),
        basePower: ScaleChainNumeric(baseWeaponData.basePower, improvements),
        baseRange: {isMelee: baseWeaponData.baseRange.isMelee, max: ScaleChainNumeric(baseWeaponData.baseRange.max, improvements), min: ScaleChainNumeric(baseWeaponData.baseRange.min, improvements)},
        canThrow: ScaleChainNonNumeric(baseWeaponData.canThrow, improvements),
        cardName: baseWeaponData.cardName,
        cardSubtype: baseWeaponData.cardSubtype,
        cardType: baseWeaponData.cardType,
        damageSubtype: baseWeaponData.damageSubtype,
        damageType: baseWeaponData.damageType,
        effects: baseWeaponData.effects,
        enchantmentData: enchantmentData,
        potency: ScaleChainNumeric(baseWeaponData.potency, improvements, false),
        prerequisites: baseWeaponData.prerequisites,
        skillRequirement: ScaleChainNumeric(baseWeaponData.skillRequirement, improvements),
        specialCrit: ScaleChainNonNumeric(baseWeaponData.specialCrit, improvements),
        staminaCost: ScaleChainNumeric(baseWeaponData.staminaCost, improvements),
        tetherCost: ScaleChainNumeric(baseWeaponData.tetherCost, improvements),
        thrownRange: {isMelee: baseWeaponData.thrownRange.isMelee, max: ScaleChainNumeric(baseWeaponData.thrownRange.max, improvements), min: ScaleChainNumeric(baseWeaponData.thrownRange.min, improvements)},
        weaponClass: baseWeaponData.weaponClass,
        weaponTags: baseWeaponData.weaponTags,
        canScale: baseWeaponData.canScale,
        weaponType: baseWeaponData.weaponType,
        handedness: baseWeaponData.handedness,
        isCreatureWeapon: baseWeaponData.isCreatureWeapon
    }
}

export const ConstructFinalGadget = (baseGadgetData: IGadgetData): IScaledWeaponBaseData => {
    return {
        _id: baseGadgetData._id,
        baseCrit: 0,
        baseHit: baseGadgetData.baseHit,
        basePower: baseGadgetData.basePower,
        baseRange: {
            isMelee: true,
            max: 0,
            min: 0
        },
        canThrow: false,
        cardName: baseGadgetData.gadgetName,
        cardSubtype: "gadget",
        cardType: "weapon",
        damageSubtype: baseGadgetData.damageSubtype,
        damageType: baseGadgetData.damageType,
        effects: [{
            text: `This Gadget takes ${baseGadgetData.technikCost} [[color.highlight.Technik]] to use. It applies [[condition.surge]] ${baseGadgetData.surgeCost} .`,
            icon: {
                emblem: "technik",
                text: baseGadgetData.technikCost.toString()
            }
        },...baseGadgetData.effects],
        enchantmentData: {
            baseId: "",
            enchantmentLevel: 0
        },
        potency: baseGadgetData.potency,
        prerequisites: baseGadgetData.prerequisites,
        skillRequirement: 0,
        specialCrit: {
            "d1": "2",
            "d2": "2",
            "d3": "2",
            "d4": "?",
            "d5": "?",
            "d6": "-"
        },
        staminaCost: 0,
        tetherCost: 0,
        thrownRange: {
            isMelee: true,
            max: 0,
            min: 0
        },
        weaponClass: "standard",
        weaponTags: [""],
        canScale: false,
        weaponType: "gadget",
        handedness: 1,
        isCreatureWeapon: false,
        specialLogicTags: ["gadget"]
    }
}

export const ConstructFinalArmor = (baseArmorData: IBaseArmorData, enchantment: number): IArmor => {

    return {
        ...baseArmorData,
        _id: baseArmorData._id,
        armorName: baseArmorData.armorName,
        armorClass: baseArmorData.armorClass,
        vitalityRequirement: ScaleChainNumeric(baseArmorData.vitalityRequirement, enchantment),
        additionalPrerequisites: ScaleChainNonNumeric(baseArmorData.additionalPrerequisites, enchantment),
        pDEFBonus: ScaleChainNumeric(baseArmorData.pDEFBonus, enchantment),
        mDEFBonus: ScaleChainNumeric(baseArmorData.mDEFBonus, enchantment),
        blockPDEFBonus: ScaleChainNumeric(baseArmorData.blockPDEFBonus, enchantment),
        blockMDEFBonus: ScaleChainNumeric(baseArmorData.blockMDEFBonus, enchantment),
        enchantmentLevel: enchantment
    }
}

export const ConstructFinalShield = (baseShieldData: IBaseShieldData, enchantment: number): IShield => {
    return {
        ...baseShieldData,
        _id: baseShieldData._id,
        shieldName: baseShieldData.shieldName,
        armorClass: baseShieldData.armorClass,
        skillRequirement: ScaleChainNumeric(baseShieldData.skillRequirement, enchantment),
        pDEFBonus: ScaleChainNumeric(baseShieldData.pDEFBonus, enchantment),
        mDEFBonus: ScaleChainNumeric(baseShieldData.mDEFBonus, enchantment),
        blockPDEFBonus: ScaleChainNumeric(baseShieldData.blockPDEFBonus, enchantment),
        blockMDEFBonus: ScaleChainNumeric(baseShieldData.blockMDEFBonus, enchantment),
        enchantmentLevel: enchantment

    }
}

export const ScaleChainNumeric = (scaleData: IScalingData<number>, enchantment: number, doFloor = true) => {
    let finalValue = scaleData.baseValue;
    if (scaleData.scalingPer) {
        finalValue += scaleData.scalingPer * enchantment;
    }
    if (scaleData.breakpoints) {
        scaleData.breakpoints.forEach((breakpoint, index) => {
            if (breakpoint <= enchantment) {
                finalValue += scaleData.breakpointBonuses[index]
            }
        })
    }
    if (doFloor) {
        return Math.floor(finalValue);
    }
    return finalValue;
}

export const ScaleChainNonNumeric = (scaleData: IScalingData<any>, enchantment: number) => {
    let finalValue = scaleData.baseValue;
    if (scaleData.breakpoints) {
        scaleData.breakpoints.forEach((breakpoint, index) => {
            if (breakpoint <= enchantment) {
                finalValue = scaleData.breakpointBonuses[index]
            }
        })
    }
    return finalValue;
}