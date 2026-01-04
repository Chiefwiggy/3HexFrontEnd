import {ICommonCardData, UDamageSubtype, UDamageType} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";

export interface ISubraceMetadata {
    subraceName: string,
    subraceId: string,
    subraceDescription: string,
    cdnImageLink: string,
    innateResistances: Array<UDamageSubtype>,
    innateVulnerabilities: Array<UDamageSubtype>,
    innateImmunities: Array<UDamageSubtype>,
    subraceRoles: Array<string>
}
export interface IRaceMetadata {
    raceName: string,
    raceId: string
    raceDescription: string,
    availableSubraces: Array<ISubraceMetadata>,
    availableRoles: Array<string>
}


class PLC_RaceData {
    private raceCards: Record<string, Array<ICommonCardData>>
    private subraceCards: Record<string, Array<ICommonCardData>>
    private raceRoleCards: Record<string, Array<ICommonCardData>>
    private raceAbilities: Record<string, Array<IAbility>>
    private subraceAbilities: Record<string, Array<IAbility>>
    private raceRoleAbilities: Record<string, Array<IAbility>>
    public raceMetadata: Array<IRaceMetadata>

    constructor() {
        this.raceCards = {};
        this.subraceCards = {};
        this.raceRoleCards = {};
        this.raceAbilities = {}
        this.subraceAbilities = {}
        this.raceRoleAbilities = {}
        this.raceMetadata = []
    }

    public async Initialize(raceCards: Record<string, Array<ICommonCardData>>, subraceCards: Record<string, Array<ICommonCardData>>, raceRoleCards: Record<string, Array<ICommonCardData>>,  raceAbilities: Record<string, Array<IAbility>>, subraceAbilities: Record<string, Array<IAbility>>, raceRoleAbilities: Record<string, Array<IAbility>>, raceMetadata:  Array<IRaceMetadata>) {
        this.raceCards = raceCards
        this.subraceCards = subraceCards
        this.raceRoleCards = raceRoleCards
        this.raceAbilities = raceAbilities
        this.subraceAbilities = subraceAbilities
        this.raceRoleAbilities = raceRoleAbilities
        this.raceMetadata = raceMetadata
    }

    public GetRaceDataById(id: string) {
        return this.raceMetadata.find(e => e.raceId == id) ?? null
    }

    public GetBaseRaceCards(raceId: string, level: number) {
        if (this.raceCards[raceId]) {
            return this._GetRaceCardsFromArray(raceId, "race", this.raceCards[raceId], level)
        }
        return []
    }

    public GetSubraceCards(subraceId: string, level: number) {
        if (this.subraceCards[subraceId]) {
            return this._GetRaceCardsFromArray(subraceId, "subrace", this.subraceCards[subraceId], level)
        }
        return []
    }

    public GetRaceRoleCards(raceId: string, level: number) {

        const raceRoles = this.raceMetadata.find(e => e.raceId == raceId)?.availableRoles
        if (raceRoles) {
            let final_list: Array<ICommonCardData > = []
            raceRoles.forEach(role => {
                if (this.raceRoleCards[role] && this.raceRoleCards[role].length > 0) {
                    final_list = [...final_list, ...(this._GetRaceCardsFromArray(role, "race_role", this.raceRoleCards[role], level))]
                }
            })
            return final_list
        }
        return []
    }

    public GetSubraceRoleCards(raceId: string, subraceId: string, level: number) {
        const raceRoles =
            this.raceMetadata
                .find(e => e.raceId === raceId)
                ?.availableSubraces
                ?.find(e => e.subraceId === subraceId)
                ?.subraceRoles;
        if (raceRoles) {
            let final_list: Array<ICommonCardData > = []
            raceRoles.forEach(role => {
                if (this.raceRoleCards[role] && this.raceRoleCards[role].length > 0) {
                    final_list = [...final_list, ...(this._GetRaceCardsFromArray(role, "race_role", this.raceRoleCards[role], level))]
                }
            })
            return final_list
        }
        return []
    }

    private _GetRaceCardsFromArray(id: string, label: "race" | "subrace" | "race_role", list: Array<ICommonCardData>, level: number) {
        if (list.length > 0) {
            return list.filter( e => {
                let prereq = e.prerequisites.find(e => e.prerequisiteType == label)
                if (prereq) {
                    return prereq.skill == id && prereq.level == level
                }
                return false
            })
        }
        return []

    }

    public GetBaseRaceAbilities = (raceId: string, level: number) => {
        if (this.raceAbilities[raceId]) {
            return this._GetRaceAbilitiesFromArray(raceId, "race", this.raceAbilities[raceId], level)
        }
        return []

    }

    public GetSubraceAbilities = (subraceId: string, level: number) => {
        if (this.subraceAbilities[subraceId]) {
            return this._GetRaceAbilitiesFromArray(subraceId, "subrace", this.subraceAbilities[subraceId], level)
        }
        return []
    }

    public GetRaceRoleAbilities = (raceId: string, level: number) => {
        const raceRoles = this.raceMetadata.find(e => e.raceId == raceId)?.availableRoles
        if (raceRoles) {
            let final_list: Array<IAbility > = []
            raceRoles.forEach(role => {
                if (this.raceRoleAbilities[role] && this.raceRoleAbilities[role].length > 0) {
                    final_list = [...final_list, ...(this._GetRaceAbilitiesFromArray(role, "race_role", this.raceRoleAbilities[role], level))]
                }
            })
            return final_list
        }
        return []
    }

    public GetSubraceRoleAbilities = (raceId: string, subraceId: string, level: number) => {
        const raceRoles =
            this.raceMetadata
                .find(e => e.raceId === raceId)
                ?.availableSubraces
                ?.find(e => e.subraceId === subraceId)
                ?.subraceRoles;
        if (raceRoles) {
            let final_list: Array<IAbility > = []
            raceRoles.forEach(role => {
                if (this.raceRoleAbilities[role] && this.raceRoleAbilities[role].length > 0) {
                    final_list = [...final_list, ...(this._GetRaceAbilitiesFromArray(role, "race_role", this.raceRoleAbilities[role], level))]
                }
            })
            return final_list
        }
        return []
    }

    private _GetRaceAbilitiesFromArray(id: string, label: "race" | "subrace" | "race_role", list: Array<IAbility>, level: number) {
        if (list.length > 0) {
            return list.filter( e => {
                let prereq = e.prerequisites.find(e => e.prerequisiteType == label)
                if (prereq) {
                    return prereq.skill == id && prereq.level == level
                }
                return false
            })
        }
        return []
    }

    public GetRaceVulnerabilityAndResistances = (raceId: string, subraceId: string)=> {
        let raceData = this.raceMetadata.find(e => e.raceId == raceId)
        let subraceData = raceData?.availableSubraces.find(e => e.subraceId == subraceId)
        if (subraceData) {
            return {
                vulnerabilities: subraceData.innateVulnerabilities,
                resistances: subraceData.innateResistances,
                immunities: subraceData.innateImmunities
            }
        }
        return {
            vulnerabilities: [],
            resistances: [],
            immunities: []
        }
    }

}

export default PLC_RaceData