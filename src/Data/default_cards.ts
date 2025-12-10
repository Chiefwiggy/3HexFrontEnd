import {
    ICommanderCardData,
    ICommonCardData, IHackBaseCardData, IHackIOCardData, IHackProtocolCardData, IScaledWeaponBaseData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData
} from "./ICardData";


export const default_spell_cards: Array<ISpellTargetCardData | ISpellModifierCardData> = [
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
                "text": "This spell's Tether cost and Power are set to 1.",
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
            override: 1
        },
        powerMod: {
            override: 1
        }
    },
]

export const default_weapon_cards: Array<IWeaponCommonData | IWeaponBaseData> = [
    {
        cardName: "Fists",
        cardType: "weapon",
        cardSubtype: "base",
        effects: [],
        prerequisites: [],
        baseHit: {
            baseValue: 25,
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
        tempEnchantValue: {
            baseId: "___defaultBaseWeapon",
            enchantmentLevel: 0
        },
        _id: "___defaultBaseWeapon"
    },
    {
        cardName: "Improvised Weapon",
        cardType: "weapon",
        cardSubtype: "base",
        effects: [],
        prerequisites: [],
        baseHit: {
            baseValue: 10,
            breakpoints: [],
            breakpointBonuses: []
        },
        basePower: {
            baseValue: 5,
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
            baseValue: 5,
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
            },
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
                baseValue: 1,
                breakpoints: [],
                breakpointBonuses: []
            },
            isMelee: true
        },
        canThrow: {
            baseValue: true,
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
        tempEnchantValue: {
            baseId: "___defaultImprovisedWeapon",
            enchantmentLevel: 0
        },
        _id: "___defaultImprovisedWeapon"
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

export const default_hack_cards: Array<IHackIOCardData | IHackBaseCardData | IHackProtocolCardData> = [
    {
        _id: "___defaultHackBase",
        "cardName": "On/Off",
        "cardType": "hack",
        "cardSubtype": "function",
        "accessLevel": 3,
        "isUltimate": false,
        "basePower": 0,
        "potency": 0,
        "duration": 0,
        "technikCost": 2,
        "damageType": "none",
        "damageSubtype": "none",
        "baseSurge": 0,
        "channelRequirements": [{
            "channelType": "machina",
            "channelStrength": 1
        }],
        "effects": [
            {
                "text": "Toggle the Electrical Power of all targets.",
                "icon": {
                    "emblem": "info",
                    "text": ""
                }
            }
        ],
        "prerequisites": [

        ]
    },
    {
        "_id": "___defaultHackIO",
        "cardName": "Wired",
        "cardType": "hack",
        "cardSubtype": "io",
        "baseRange": {
            "min": 0,
            "max": 0
        },
        "effects": [
            {
              "text": "This hack works on a target you are wired into directly. You are always wired into yourself.",
              icon: {
                "emblem": "info",
                  text: ""

              }
            }
          ],
          "prerequisites": [
          ],
          "isUltimate": false
    },
    {
          "_id": "___defaultHackProtocol",
          "cardName": "Frontdoor",
          "cardType": "hack",
          "cardSubtype": "protocol",
          "baseHackSet": -100,
        "protocolChannels": [{
            "channelType": "machina",
            "channelStrength": 1
        }],
          "saveType": "might",
          "effects": [
            {
              "text": "Very unlikely to work on a sentient or protected entity.",
              "icon": {
                  "text": "",
                "emblem": "default"
              }
            }
          ],
          "prerequisites": [

          ],
          "isUltimate": false
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