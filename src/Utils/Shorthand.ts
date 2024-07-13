import {UDamageType} from "../Data/ICardData";


export type UStat = "might" | "agility" | "skill" | "awareness" | "vitality" | "knowledge" | "mind" | "presence" | "authority" | "endurance"
export const getStatShorthand = (stat: UStat | "none" | "luck"): string => {
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