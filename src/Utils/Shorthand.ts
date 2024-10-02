import {UDamageType} from "../Data/ICardData";
import AbstractSheet from "../Data/AbstractSheet";
import {ICharacterBaseData} from "../Data/ICharacterData";
import {UArmorClass} from "../Data/IArmorData";
import {IMinionData} from "../Data/IMinionData";


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

export const getHandedness = (sheet: ICharacterBaseData|IMinionData|null, handednessValue: number) => {
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
        default:
            return "legend";
    }
}
