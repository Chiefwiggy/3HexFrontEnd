// cardTemplates.ts
export const templates: Record<string, string> = {
    "Commander Card": `{
  "cardName": "[CARD NAME]",
  "cardType": "commander",
  "cardSubtype": "commander",
  "effects": [
    {
      "text": "[EFFECT]",
      "icon": {
        "emblem": "info",
        "symbol": "",
        "text": ""
      }
    }
  ],
  "characterModifiers": {
    "bonuses": {}
  },
  "unlocks": {},
  "prerequisites": [
    {
      "prerequisiteType": "class",
      "skill": "seeker",
      "level": 1
    }
  ],
  "appliesTo": {
    "commander": true,
    "minions": false
  },
  "isUltimate": false,
  "isFavorite": false
}`,

    "Weapon - Base": `{
    "cardName": "[WEAPON NAME]",
    "cardType": "weapon",
    "cardSubtype": "base",
    "isCreatureWeapon": false,
    "canOffHand": false,
    "specialLogicTags": [""],
    "baseHit": {
        "baseValue": 20,
        "scalingPer": 5
    },
    "basePower": {
        "baseValue": 10,
        "scalingPer": 4
    },
    "potency": {
        "baseValue": 2,
        "scalingPer": 0
    },
    "baseCrit": {
        "baseValue": 2,
        "scalingPer": 1
    },
    "skillRequirement": {
        "baseValue": 3,
        "scalingPer": 4
    },
    "weaponType": "blade",
    "weaponClass": "standard",
    "damageType": "physical",
    "damageSubtype": "slash",
    "specialCrit": {
        "baseValue": {
            "d1": "1",
            "d2": "1",
            "d3": "1",
            "d4": "?",
            "d5": "?",
            "d6": "-"
        }
    },
    "baseRange": {
        "min": {
            "baseValue": 0
        },
        "max": {
            "baseValue": 0
        },
        "isMelee": true
    },
    "canThrow": {
        "baseValue": false
    },
    "thrownRange": {
        "min": {
            "baseValue": 0
        },
        "max": {
            "baseValue": 0
        },
        "isMelee": false
    },
    "tetherCost": {
        "baseValue": 0
    },
    "staminaCost": {
        "baseValue": 0
    },
    "weaponTags": [],
    "prerequisites": [],
    "effects": [],
    "handedness": 1
}`
    ,
    "Weapon - Form": `{
        "cardName": "[SKILL_NAME]",
        "cardType": "weapon",
        "cardSubtype": "form",
        "specialLogicTags": [""],
        "effects": [
            {
                "text": "This Form does something.",
                "icon": {
                    "emblem": "info",
                    "text": ""
                }
            }
        ],
        "prerequisites": [
            {
                "prerequisiteType": "attribute",
                "skill": "might",
                "level": 10
            }
            
        ]
    }
    `,
    "Weapon - Skill": `{
        "cardName": "[SKILL_NAME]",
        "cardType": "weapon",
        "cardSubtype": "skill",
        "specialLogicTags": [""],
        "effects": [
            {
                "text": "This Skill does something.",
                "icon": {
                    "emblem": "info",
                    "text": ""
                }
            }
        ],
        "prerequisites": [
            {
                "prerequisiteType": "attribute",
                "skill": "might",
                "level": 10
            }
            
        ]
    }
    `,
    "Weapon Order": `{
        "cardName": "[ORDER_NAME]",
        "cardType": "weapon",
        "cardSubtype": "order",
        "specialLogicTags": [""],
        "effects": [
            {
                "text": "This Order does something.",
                "icon": {
                    "emblem": "info",
                    "text": ""
                }
            }
        ],
        "prerequisites": [
            {
                "prerequisiteType": "attribute",
                "skill": "might",
                "level": 10
            }
            
        ]
    }
    `,
    "Spell - Base": `{
    "cardName": "[SPELL_NAME]",
    "arcanotype": "esoteric", 
    "cardType": "spell",
    "cardSubtype": "base",
    "isUltimate": false,
    "basePower": 0,
    "potency": 0,
    "duration": 0,
    "tetherCost": 25,
    "energyCost": 1,
    "environmentBonus": "N/A",
    "damageType": "none",
    "damageSubtype": "none",
    "baseSpellSet": 20,
    "saveType": "none",
    "effects": [
        {
            "text": "Spell Description goes here",
            "icon": {
                "emblem": "info",
                "text": ""
            }
        }
    ],
    "prerequisites": [

    ]
}`,
    "Spell - Target": `{
  "cardName": "[TARGET_NAME]",
  "cardType": "spell",
  "cardSubtype": "target",
  "baseRange": {
    "min": 0,
    "max": 0,
    "isMelee": true
  },
  "effects": [
    {
      "text": "Choose a target that you can hear within range R0-R0.",
      "icon": {
        "emblem": "default",
        "symbol": "",
        "text": ""
      }
    },
    {
      "text": "The target must meet a requirement",
      "icon": {
        "emblem": "requirement",
        "symbol": "",
        "text": ""
      }
    }
  ],
  "prerequisites": [
    {
      "prerequisiteType": "class",
      "skill": "seeker",
      "level": 1
    }
  ],
  "isUltimate": false,
  "isFavorite": false,
  "forceMelee": false,
  "forceRange": false,
  "__v": 0
}`,
    "Spell - Summon": `{
  "forceMelee": false,
  "forceRange": false,
  "cardName": "[SUMMON NAME]",
  "cardType": "spell",
  "cardSubtype": "summon",
  "baseRange": {
    "min": 0,
    "max": 2,
    "isMelee": false
  },
  "summonData": {
    "maxHealth": {
        "baseValue": 40,
        "potency": 1
    },
    "dodge": {
        "baseValue": 10
    },
    "pDEF": {
        "baseValue": 0
    },
    "mDEF": {
        "baseValue": 20
    },
    "movement": {
        "baseValue": 3
    },
    "simpleName": "[SIMPLE NAME]",
    "summonSize": "standard"
  },
  "effects": [
    {
      "text": "Describe Summon here",
      "icon": {
        "emblem": "info",
        "symbol": "",
        "text": ""
      }
    } 
  ],
  "prerequisites": [
    {
      "prerequisiteType": "attribute",
      "skill": "friendliness",
      "level": 1
    }
  ],
  "isUltimate": false,
  "isFavorite": false,
  "__v": 0
}`,
    "Spell - Modifier": `{
    "cardName": "[MODIFIER_NAME]",
    "cardType": "spell",
    "cardSubtype": "skill",
    "isUltimate": false,
    "effects": [
        {
            "text": "This spell does this awesome thing",
            "icon": {
                "emblem": "info",
                "symbol": "",
                "text": ""
            }
        }
    ],
    "prerequisites": [
        {
            "prerequisiteType": "affinity",
            "skill": "research",
            "level": 1
        }
    ]
}`,
    "Spell - Edict": `{
  "cardName": "Edict of [NAME]",
  "cardType": "spell",
  "cardSubtype": "edict",
  "isUltimate": false,
  "specialLogicTags": [],
  "effects": [
    {
      "text": "This edict does a thing.",
      "icon": {
        "emblem": "info",
        "symbol": "",
        "text": ""
      }
    },
    {
      "text": "Can only be used once per Day.",
      "icon": {
        "emblem": "warning",
        "symbol": "",
        "text": ""
      }
    }
  ],
  "prerequisites": [
        {
            "prerequisiteType": "affinity",
            "skill": "research",
            "level": 1
        }
    ]
}`,
    "Hack - Function": `{
  "cardName": "[HACK NAME]",
  "cardType": "hack",
  "cardSubtype": "base",
  "isUltimate": false,
  "basePower": 40,
  "potency": 2,
  "duration": 0,
  "technikCost": 10,
  "damageType": "none",
  "damageSubtype": "none",
  "baseSurge": 0,
  "channelRequirements": [
    {
      "channelType": "machina",
      "channelStrength": 1
    }
  ],
  "effects": [
    {
      "text": "This hack does this X times",
      "icon": {
        "emblem": "power",
        "text": "20X"
      },
      "powerX": 20
      
    }
  ],
  "prerequisites": [
    {
      "prerequisiteType": "affinity",
      "skill": "machinery",
      "level": 1
    }
  ]
}`,
    "Hack - I/O": `{
  "cardName": "[HACK_IO]",
  "cardType": "hack",
  "cardSubtype": "io",
  "baseRange": {
    "min": 0,
    "max": 0
  },
  "effects": [
    {
      "text": "Target a valid target within R0-R0.",
      "icon": {
        "emblem": "default"
      }
    },
    {
      "text": "Describe requirement",
      "icon": {
        "emblem": "requirement"
      }
    }
  ],
  "prerequisites": [
        {
            "prerequisiteType": "nodefault",
            "skill": "nodefault",
            "level": 1
        }
  ],
  "isUltimate": false
}`,
    "Hack - Protocol": `{
  "cardName": "[HACK PROTOCOL]",
  "cardType": "hack",
  "cardSubtype": "protocol",
  "baseHackSet": 10,
  "saveType": "mind",
  "protocolChannels": [
    {
        "channelType": "machina",
        "channelStrength": 1
    }
  ],
  "effects": [
    {
      "text": "Information about this protocol",
      "icon": {
        "emblem": "info"
      }
    }
  ],
  "prerequisites": [
        {
            "prerequisiteType": "nodefault",
            "skill": "nodefault",
            "level": 1
        }
  ],
  "isUltimate": false
}`,
    "Hack - Util":
    `{
  "cardName": "[HACK UTIL NAME]",
  "cardType": "hack",
  "cardSubtype": "util",
  "surgeCostMod": {
    "modifier": 5
  },
  "effects": [
    {
      "text": "This does a thing that adds 5 surge",
      "icon": {
        "emblem": "surge",
        "text": "5"
      }
    }
  ],
  "prerequisites": [
        {
            "prerequisiteType": "class",
            "skill": "seeker",
            "level": 1
        }
  ],
  "isUltimate": true
}`,
    "Hack - Else": `{
  "cardName": "[HACK ELSE NAME]",
  "cardType": "hack",
  "cardSubtype": "else",
  "effects": [
    {
      "text": "This hack does this on a failure.",
      "icon": {
        "emblem": "else"
      }
    }
  ],
  "prerequisites": [
        {
            "prerequisiteType": "nodefault",
            "skill": "nodefault",
            "level": 1
        }
  ],
  "isUltimate": false
}`

};
