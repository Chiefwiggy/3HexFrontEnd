import {UDamageType, UWeaponClass} from "../Data/ICardData";
import AbstractSheet from "../Data/AbstractSheet";
import {ICharacterBaseData, IClassData_deprecated} from "../Data/ICharacterData";
import {UArmorClass} from "../Data/IArmorData";
import {IMinionData, IMinionTemplateData} from "../Data/IMinionData";
import CharacterSheet from "../Data/CharacterSheet";
import PLC_ClassData from "../Hooks/usePreloadedContent/PLC_ClassData";
import {capitalize} from "@mui/material";


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
        default:
            return "n/a";
    }
}

export const getSkillFormat = (value: number, showSign: boolean = true, isSubtractive = false) : string => {
    let val = value;
    if (val < 0 && !isSubtractive) {
        let x = Math.abs(value);
        let a = Math.floor((x - 1) / 10);
        val = -((a+1)*20-x);
    }

    let prefix = val.toString().slice(0, -1);
    if (prefix == "" || prefix == "-") {
        prefix += "0";
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

export const getArmorAffinityRequirement = (armorClass: UArmorClass, enchantmentLevel: number, armorAffinityBonus: number = 0, showBullet = true): string => {
    if (enchantmentLevel == 0) {
        if (armorClass != "heavy") {
            return "";
        } else {
            return "• Guardian 1"
        }
    }
    let enchantmentLevelMod  = enchantmentLevel - armorAffinityBonus
    switch (armorClass) {
        case "light":
        case "standard":
            return `• Warrior ${enchantmentLevelMod}`
        case "heavy":
            return `• Guardian 1 & Warrior ${enchantmentLevelMod}`
    }
}

export const getWeaponAffinityRequirement = (weaponClass: UWeaponClass, enchantmentLevel: number, handedness: number, damageType: UDamageType, isCreature: boolean, hasIronGrasp: boolean, prestigeLower: number = 0, showBullet: boolean = true): string => {
    let retVal = ""
    if (showBullet) {
        retVal = "• "
    }
    if (enchantmentLevel < 0) {
        return retVal
    }
    let enchantmentLevelMod = enchantmentLevel - prestigeLower;
    if (hasIronGrasp && handedness == 1.5 && weaponClass == "standard") {
        enchantmentLevelMod -= 1;
    }
    if (enchantmentLevelMod < 0) {
        return retVal;
    }

    if (isCreature) {
        retVal += `Captain ${enchantmentLevelMod}`
    } else {
        retVal += `Warrior ${enchantmentLevelMod}`
        // switch (weaponClass) {
        //     case "light":
        //         retVal += `Deft ${enchantmentLevelMod}`
        //         break;
        //     case "standard":
        //         retVal += `Infantry ${enchantmentLevelMod}`
        //         break;
        //     case "heavy":
        //         retVal += `Guardian ${enchantmentLevelMod}`
        //         break;
        // }
    }

    if (hasIronGrasp) {
        if (handedness > 1.2 && handedness < 2.0) {
            retVal += `/${enchantmentLevel - prestigeLower}`
        }
    }
    return retVal;
}

export const getTierFromName = (tierName: string) => {
    switch (tierName) {
        case 'beginner':
            return 1;
        case 'advanced':
            return 2;
        case 'expert':
            return 3;
        case 'master':
            return 4;
        default:
            return 1;
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

export const getNameFromClassTier = (tierNo: number) => {
    switch (tierNo) {
        case 1:
            return "beginner";
        case 2:
            return "advanced";
        case 3:
            return "expert";
        case 4:
            return "master";
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

export function getClassesString(classes: Array<IClassData_deprecated>) {
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


export function getClassesString_new(ClassData: PLC_ClassData, classes: Array<string>) {
    const names = ClassData.getAllClassNamesByTierFiltered(classes);
    if (names.tier4.length > 0) {
        return getClassesStringHelper(names.tier4)
    } else if (names.tier3.length > 0) {
        return getClassesStringHelper(names.tier3)
    } else if (names.tier2.length > 0) {
        return getClassesStringHelper(names.tier2)
    } else if (names.tier1.length > 0) {
        return getClassesStringHelper(names.tier1)
    } else {
        return "Unclassed"
    }
}

export function getClassesStringHelper(names: Array<string>) {
    // 1. Transform suffixes and capitalize
    const transformed = names.map(name => {
        const cleanName = name.endsWith("_promoted")
            ? name.replace("_promoted", "+")
            : name;
        return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    });

    // 2. Remove duplicates (e.g., if Rogue and Rogue+ both exist, we need to filter)
    // We prioritize the string with '+' if two strings have the same base name
    const uniqueNames = Array.from(new Set(transformed)).filter((name, index, self) => {
        if (!name.endsWith("+")) {
            // If current is "Rogue", but "Rogue+" exists in the array, discard "Rogue"
            return !self.includes(name + "+");
        }
        return true;
    });

    // 3. Sort and Join
    return uniqueNames
        .sort((a, b) => {
            const aIsPromoted = a.endsWith("+");
            const bIsPromoted = b.endsWith("+");

            // Priority 1: Promoted classes first
            if (aIsPromoted && !bIsPromoted) return -1;
            if (!aIsPromoted && bIsPromoted) return 1;

            // Priority 2: Alphabetical
            return a.localeCompare(b);
        })
        .join(" • ");
}

export type UHackType = "function" | "protocol" | "io" | "util"

export function getHackShorthand(input: UHackType) {
    switch(input) {
        case "function":
            return "fn";
        case "protocol":
            return "pcl";
        case "io":
            return "io"
        case "util":
            return "utl"
    }
}

export function getAccessShorthand(input: number): string {
    let accessString = "N/A"
    switch(input) {
        case 1:
            accessString = "USR";
            break;
        case 2:
            accessString = "ADM";
            break;
        case 3:
            accessString = "ROOT";
            break;
    }
    return accessString;
}

export function getFatelineNameFromId(fatelineId: string) {
    switch (fatelineId) {
        case 'fool':
        case 'magician':
        case 'empress':
        case 'emperor':
        case 'hierophant':
        case 'lovers':
        case 'chariot':
        case 'hermit':
        case 'devil':
        case 'tower':
        case 'star':
        case 'moon':
        case 'sun':
        case 'world':
        case 'automaton':
            return `The ${capitalize(fatelineId)}`;
        case 'strength':
        case 'fortune':
        case 'justice':
        case 'death':
        case 'temperance':
        case 'judgement':
            return capitalize(fatelineId)
        case 'high_priestess':
        case 'hanged_man':
            return `The ${capitalize(fatelineId.split("_").join(" "))}`;
        default:
            return 'None'
    }
}