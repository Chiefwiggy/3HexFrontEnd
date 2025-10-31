import {IHackBaseCardData, IHackModifierCardData} from "./ICardData";
import {IPrerequisite} from "./GenericData";
import {UStat} from "../Utils/Shorthand";


export interface IPackageData {
    _id: string,
    packageName: string,
    memorySlots: number,
    builtinHacks: Array<IHackModifierCardData>,
    prerequisites: Array<IPrerequisite>,
    visibility: string
}

export interface IDatachipData {
    _id: string,
    datachipName: string,
    baseTechnikCapacity: number,
    primaryTechnikScaling: number,
    secondaryTechnikScaling: number,
    primaryTechnikStat: UStat,
    secondaryTechnikStat: UStat,
    prerequisites: Array<IPrerequisite>,
    builtinHacks: Array<IHackModifierCardData>,
    visibility: string
}