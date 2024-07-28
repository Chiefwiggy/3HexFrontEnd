import {IScaledWeaponBaseData, IScalingData, IWeaponBaseData} from "../Data/ICardData";


export const ConstructFinalWeapon = (baseWeaponData: IWeaponBaseData, enchantment: number): IScaledWeaponBaseData => {

    const a = {
        ...baseWeaponData,
        _id: baseWeaponData._id,
        baseCrit: ScaleChainNumeric(baseWeaponData.baseCrit, enchantment),
        baseHit: ScaleChainNumeric(baseWeaponData.baseHit, enchantment),
        basePower: ScaleChainNumeric(baseWeaponData.basePower, enchantment),
        baseRange: {isMelee: baseWeaponData.baseRange.isMelee, max: ScaleChainNumeric(baseWeaponData.baseRange.max, enchantment), min: ScaleChainNumeric(baseWeaponData.baseRange.min, enchantment)},
        canThrow: ScaleChainNonNumeric(baseWeaponData.canThrow, enchantment),
        cardName: baseWeaponData.cardName,
        cardSubtype: baseWeaponData.cardSubtype,
        cardType: baseWeaponData.cardType,
        damageSubtype: baseWeaponData.damageSubtype,
        damageType: baseWeaponData.damageType,
        effects: baseWeaponData.effects,
        enchantmentLevel: enchantment,
        potency: ScaleChainNumeric(baseWeaponData.potency, enchantment, false),
        prerequisites: baseWeaponData.prerequisites,
        skillRequirement: ScaleChainNumeric(baseWeaponData.skillRequirement, enchantment),
        specialCrit: ScaleChainNonNumeric(baseWeaponData.specialCrit, enchantment),
        staminaCost: ScaleChainNumeric(baseWeaponData.staminaCost, enchantment),
        tetherCost: ScaleChainNumeric(baseWeaponData.tetherCost, enchantment),
        thrownRange: {isMelee: baseWeaponData.thrownRange.isMelee, max: ScaleChainNumeric(baseWeaponData.thrownRange.max, enchantment), min: ScaleChainNumeric(baseWeaponData.thrownRange.min, enchantment)},
        weaponClass: baseWeaponData.weaponClass,
        weaponTags: baseWeaponData.weaponTags,
        weaponType: baseWeaponData.weaponType
    }
    return a;

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