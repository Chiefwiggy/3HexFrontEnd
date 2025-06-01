import {IAffinities} from "./ICharacterData";

export interface ICharacterRacialData {
    raceId: string,
    raceRoles: Array<string>,
    pointsSpentOn: Array<string>,
    subraceId: string,
}

export interface IRaceData {
    raceName: string,
    raceId: string,
    raceDescription: string,
    availableRoles: Array<string>
}

export interface IRaceRoleData {

}