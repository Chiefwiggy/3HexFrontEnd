import {IAffinities} from "./ICharacterData";

export interface ICharacterRacialData {
    raceName: string,
    raceId: string,
    raceRole: string,
    subraceId: string,
    affinities: IAffinities
}

export interface IRaceData {
    raceName: string,
    raceId: string,
    raceDescription: string,
    availableRoles: Array<string>
}

export interface IRaceRoleData {

}