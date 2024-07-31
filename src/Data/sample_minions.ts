import {IMinionData} from "./IMinionData";


export const sample_minions: Array<IMinionData> = [
    {
        _id: "___sampleMinion",
        minionName: "Frog Brute",
        leadershipRequirement: 1,
        attributeBars: {
            health: {
                current: 0,
                scaling: {
                    value: 2
                }
            },
            stamina: {
                current: 0,
                scaling: {
                    value: 3
                }
            },
            tether: {
                current: 0,
                scaling: {
                    value: 3
                }
            }
        },
        minionStats: {
            might: {
                value: 7
            },
            agility: {
                value: 4
            },
            skill: {
                value: 4
            },
            awareness: {
                value: 9
            },
            vitality: {
                value: 7
            },
            knowledge: {
                value: 1
            },
            mind: {
                value: 1
            },
            presence: {
                value: 3
            },
            command: {
                value: 4
            },
            endurance: {
                value: 6
            }
        },
        movement: {
            stepSpeed: {
                value: 1
            },
            dashSpeed: {
                value: 4
            }
        },
        currentSpell: null,
        currentWeapon: {
            weaponBaseData: {
              baseId: "66943f29d0853b84ce4a3f4e",
              enchantmentLevel: 0
            },
            weaponCardsIds: [
              "___defaultWeaponForm"
            ],
        },
        bonuses: {
            staminaRefresh: 0,
            tetherRefresh: 0
        },
        currentArmor: null,
        cardData: [],
        isAdjutant: false
    }
]