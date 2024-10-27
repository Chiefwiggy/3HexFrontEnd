import {
    ICommanderCardData,
    ICommonCardData, IScaledWeaponBaseData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData
} from "./ICardData";


export const default_spell_cards: Array<ISpellTargetCardData|ISpellModifierCardData> = [
    {
        "_id": "___defaultSpellTarget",
        "cardName": "Touch",
        "cardType": "spell",
        "cardSubtype": "target",
        "effects": [
            {
                "text": "Choose a target with a range of M0.",
                "icon": {
                    "emblem": "default",
                    "symbol": "",
                    "text": ""
                }
            },
            {
                "text": "Tether cost is halved for this spell.",
                "icon": {
                    "emblem": "default",
                    "symbol": "",
                    "text": ""
                }
            }
        ],
        "prerequisites": [],
        "baseRange": {
            "min": 0,
            "max": 0,
            "isMelee": true
        },
        tetherCostMod: {
            multiplier: 0.5
        }
    },
    {
        _id: "___defaultSpellSkill",
        cardName: "Cantrip",
        cardType: "spell",
        cardSubtype: "skill",
        effects: [
            {
                "text": "This spell's Tether cost and Power are set to 0.",
                "icon": {
                    "emblem": "priority",
                    "symbol": "",
                    "text": ""
                }
            },
            {
                "text": "This cannot inflict Status Conditions or effect the greater environment.",
                "icon": {
                    "emblem": "warning",
                    "symbol": "",
                    "text": ""
                }
            }
        ],
        prerequisites: [],
        tetherCostMod: {
            override: 0
        },
        powerMod: {
            override: 0
        }
    },
]

export const default_weapon_cards: Array<IWeaponCommonData|IWeaponBaseData> = [
    {
        cardName: "Fists",
        cardType: "weapon",
        cardSubtype: "base",
        effects: [],
        prerequisites: [],
        baseHit: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        basePower: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        potency: {
            baseValue: 2.5,
            breakpoints: [],
            breakpointBonuses: []
        },
        weaponClass: "light",
        weaponType: "unarmed",
        damageType: "physical",
        damageSubtype: "impact",
        baseCrit: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        specialCrit:
        {
            baseValue: {
            d1: "5",
            d2: "5",
            d3: "5",
            d4: "?",
            d5: "?",
            d6: "-"
        },
            breakpoints: [],
            breakpointBonuses: []
        }


            ,
        baseRange: {
            min: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
            max: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
            isMelee: true
        },
        thrownRange: {
            min: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
            max: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
            isMelee: true
        },
        canThrow: {
            baseValue: false,
            breakpoints: [],
            breakpointBonuses: []
        },
        skillRequirement: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        staminaCost: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        tetherCost: {
            baseValue: 0,
            breakpoints: [],
            breakpointBonuses: []
        },
        weaponTags: ["unarmed"],
        handedness: 1.0,
        _id: "___defaultBaseWeapon"
    },
    {
        cardName: "Standard Attack",
        cardType: "weapon",
        cardSubtype: "form",
        effects: [{
            text: "Make a standard attack with a weapon.",
            icon: {
                emblem: "default",
                text: "",
                symbol: ""
            }
        }],
        prerequisites: [],
        _id: "___defaultWeaponForm"
    }
]




export const default_commander_cards: Array<ICommanderCardData> = [
    // {
    //     _id: "___defaultCommanderCard",
    //     cardName: "First Follower",
    //     cardType: "commander",
    //     cardSubtype: "commander",
    //     effects: [
    //         {
    //             text: "Increase your Minion Capacity by 1.",
    //             icon: {
    //                 emblem: "info",
    //                 symbol: "",
    //                 text: ""
    //             }
    //         }
    //     ],
    //     prerequisites: [],
    //     isUltimate: false,
    //     isFavorite: false,
    //     appliesTo: {
    //         commander: true,
    //         minions: true
    //     },
    //     characterModifiers: {},
    //     unlocks: {},
    //     minionSlots: 1
    // }
]