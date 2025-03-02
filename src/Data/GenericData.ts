import {UPrerequisiteType} from "./ICardData";

export interface IDataModifiers {
    modifier?: number,
    multiplier?: number,
    override?: number,
}

export interface IModifiable {
    value: number,
    modifiers?: IDataModifiers
}

export interface IPrerequisite {
    prerequisiteType: UPrerequisiteType,
    skill: string,
    level: number
}
