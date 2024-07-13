

export interface ISkillConfig {
    athletics: ISkillItemConfig,
    handling: ISkillItemConfig,
    stealth: ISkillItemConfig,
    deduction: ISkillItemConfig,
    identify: ISkillItemConfig,
    science: ISkillItemConfig,
    technology: ISkillItemConfig,
    biology: ISkillItemConfig,
    metaphysics: ISkillItemConfig,
    spellcraft: ISkillItemConfig,
    survival: ISkillItemConfig,
    perception: ISkillItemConfig,
    streetwise: ISkillItemConfig,
    discovery: ISkillItemConfig,
    diplomacy: ISkillItemConfig,
    hostility: ISkillItemConfig,
    guile: ISkillItemConfig,
    lore: ISkillItemConfig,
    occult: ISkillItemConfig,
    society: ISkillItemConfig
}

export interface ISkillItemConfig {
    attr: Array<string>
}

export const skill_config: ISkillConfig = {
    athletics: {
        attr: ["endurance", "might"]
    },
    handling: {
        attr: ["skill", "awareness"]
    },
    stealth: {
        attr: ["skill", "agility"]
    },
    deduction: {
        attr: ["mind", "knowledge"]
    },
    identify: {
        attr: ["knowledge", "authority"]
    },
    science: {
        attr: ["knowledge", "mind"]
    },
    technology: {
        attr: ["mind", "skill"]
    },
    biology: {
        attr: ["knowledge", "vitality"]
    },
    metaphysics: {
        attr: ["mind", "presence"]
    },
    spellcraft: {
        attr: ["knowledge", "mind"]
    },
    survival: {
        attr: ["skill", "endurance"]
    },
    perception: {
        attr: ["awareness", "presence"]
    },
    streetwise: {
        attr: ["skill", "authority"]
    },
    discovery: {
        attr: ["awareness", "knowledge"]
    },
    diplomacy: {
        attr: ["presence", "mind"]
    },
    hostility: {
        attr: ["presence", "authority"]
    },
    guile: {
        attr: ["presence", "skill"]
    },
    lore: {
        attr: ["knowledge", "authority"]
    },
    occult: {
        attr: ["knowledge", "presence"]
    },
    society: {
        attr: ["presence", "authority"]
    }
}