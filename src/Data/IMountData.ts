export interface IMountDefenseBonuses {
    pDEFBonus: number,
    mDEFBonus: number,
    dodgeBonus: number
}

export interface IMountBaseModel extends Document {
    speciesName: string,
    mountType: string,
    mountTier: string,
    mountSize: string,
    hunger: number,
    riders: number,
    associatedWeapon: string,
    favoriteTerrain: string,
    landMovement: number,
    swimMovement: number,
    flyMovement: number,
    authorityRequirement: number,
    skillRequirement: number,
    mountDefenses: IMountDefenseBonuses,
    primaryRiderDefenses: IMountDefenseBonuses,
    secondaryRidersDefenses: IMountDefenseBonuses,
    mountHealth: number,
    mountStamina: number,
    mountRefresh: number,
    details: Array<{
        text: string,
        icon: {
            emblem: string,
            text: string
        }
    }>
}