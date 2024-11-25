import {UDamageType, UWeaponClass} from "../Data/ICardData";
import AbstractSheet from "../Data/AbstractSheet";
import {ICharacterBaseData, IClassData} from "../Data/ICharacterData";
import {UArmorClass} from "../Data/IArmorData";
import {IMinionData, IMinionTemplateData} from "../Data/IMinionData";


export type UStat = "might" | "agility" | "skill" | "awareness" | "vitality" | "knowledge" | "mind" | "presence" | "authority" | "endurance"
export const getStatShorthand = (stat: UStat | "none" | "luck" | "command"): string => {
    switch (stat) {
        case "might":
            return "mht"
        case "agility":
            return "agi"
        case "skill":
            return "skl"
        case "awareness":
            return "awa"
        case "vitality":
            return "vit"
        case "knowledge":
            return "kno"
        case "mind":
            return "mnd"
        case "presence":
            return "pre"
        case "authority":
            return "aut"
        case "command":
            return "cmd";
        case "endurance":
            return "end"
        case "luck":
            return "lck";
        case "none":
            return "n/a";
    }
}

export const getSkillFormat = (value: number, showSign: boolean = true) : string => {
    let val = value;
    if (val < 0) {
        let x = Math.abs(value);
        let a = Math.floor((x - 1) / 10);
        val = -((a+1)*20-x);
    }

    let prefix = val.toString().slice(0, -1);
    if (prefix == "") {
        prefix = "0";
    }
    let postfix = val.toString().slice(-1);
    let sign = ""
    if (value >= 0) {
        sign = "+"
    }
    return `${showSign ? sign : ""}${prefix} : ${postfix}`;

}

export const getDamageShorthand = (dt: UDamageType) => {
    switch (dt) {
        case "physical":
            return "Phy"
        case "magical":
            return "Mag"
        case "raw":
            return "Raw"
        case "none":
            return ""

    }
}


export const getHandedness = (handednessValue: number) => {
    if (handednessValue >= 2) {
        return "Two-Handed"
    } else if (handednessValue >= 1.5) {
        return "Versatile"
    } else {
        return "One-Handed"
    }
}

export const getArmorAffinityRequirement = (armorClass: UArmorClass, enchantmentLevel: number, showBullet = true): string => {
    if (enchantmentLevel == 0) {
        if (armorClass != "heavy") {
            return "";
        } else {
            return "• Guardian 1"
        }
    }
    switch (armorClass) {
        case "light":
            return `• Deft ${enchantmentLevel}`
        case "standard":
            return `• Infantry ${enchantmentLevel}`
        case "heavy":
            return `• Guardian ${enchantmentLevel}`
    }
}

export const getWeaponAffinityRequirement = (weaponClass: UWeaponClass, enchantmentLevel: number, handedness: number, hasIronGrasp: boolean, showBullet: boolean = true): string => {
    let retVal = ""
    if (showBullet) {
        retVal = "• "
    }
    if (enchantmentLevel == 0) {
        return retVal
    }
    let enchantmentLevelMod = enchantmentLevel;
    if (hasIronGrasp) {
        enchantmentLevelMod -= 1;
    }
    switch (weaponClass) {
        case "light":
            retVal += `Deft ${enchantmentLevelMod}`
            break;
        case "standard":
            retVal += `Infantry ${enchantmentLevelMod}`
            break;
        case "heavy":
            retVal += `Guardian ${enchantmentLevelMod}`
            break;
    }
    if (hasIronGrasp) {
        if (handedness > 1.2 && handedness < 2.0) {
            retVal += `/${enchantmentLevel}`
        }
    }
    return retVal;
}

export const getTierFromName = (tierName: string) => {
    switch (tierName) {
        case 'beginner':
            return 1;
        case 'intermediate':
            return 2;
        case 'advanced':
            return 3;
        case 'expert':
            return 4;
        case 'master':
            return 5;
        case 'legend':
            return 6;
        default:
            return 0;
    }
}

export const getNameFromTier = (tierNo: number) => {
    switch (tierNo) {
        case 1:
            return "beginner";
        case 2:
            return "intermediate";
        case 3:
            return "advanced";
        case 4:
            return "expert";
        case 5:
            return "master";
        case 6:
            return "legend";
        default:
            return "unknown";
    }
}

export const getTrainingLevel = (trainingProf: number) => {
    switch (trainingProf) {
        case 0:
            return "Untrained";
        case 1:
            return "beginner";
        case 2:
            return "intermediate";
        case 3:
            return "advanced";
        case 4:
            return "expert";
        case 5:
            return "master";
        case 6:
            return "legend";
        case 7:
            return "legend+"
        case 8:
            return "legend++"
        default:
            return "???"
    }
}

export function romanize(num: number) {
    const values =
        [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols =
        ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let roman = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            roman += symbols[i];
            num -= values[i];
        }
    }

    return roman;
}

export function getClassesString(classes: Array<IClassData>) {
        const highestTier = classes.reduce((pv, cv) => {
            if (cv.classTier > pv) {
                return cv.classTier;
            }
            return pv;
        }, 0)
        return classes.filter(e => e.classTier == highestTier).sort((a,b) => {
            if (a.isPromoted != b.isPromoted) {
                if (a.isPromoted) return -1;
                else return 1;
            } else {
                return a.className.localeCompare(b.className);
            }
        }).map(e => e.isPromoted ? e.className + "+" : e.className).join(" • ")
    }
