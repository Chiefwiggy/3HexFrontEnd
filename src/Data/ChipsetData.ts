import {IHackBaseCardData, IHackModifierCardData} from "./ICardData";
import {IPrerequisite} from "./GenericData";
import {UHackType, UStat} from "../Utils/Shorthand";

export interface IDatachipTierDraft {
    cardType: UHackType
    hackId: string | null,
    isSecret: boolean
}

export interface IPackageData {
    _id: string,
    packageName: string,
    packageSlots: number,
    chipTier: number,
    builtinHacks: Array<IHackModifierCardData>,
    prerequisites: Array<IPrerequisite>,
    visibility: string
}

export interface IDatachipData {
    _id: string,
    datachipName: string,
    chipTier: number,
    baseTechnikCapacity: number,
    primaryTechnikScaling: number,
    secondaryTechnikScaling: number,
    primaryTechnikStat: UStat | "none",
    secondaryTechnikStat: UStat | "none",
    prerequisites: Array<IPrerequisite>,
    builtinHacks: Array<IHackModifierCardData>,
    visibility: string
}

export interface IPackageDataExport {
    packageName: string,
    packageSlots: number,
    chipTier: number,
    builtinHackIds: Array<IDatachipTierDraft>,
    prerequisites: Array<IPrerequisite>,
    visibility: string
}

export interface IDatachipDataExport {
    datachipName: string,
    chipTier: number,
    baseTechnikCapacity: number,
    primaryTechnikScaling: number,
    secondaryTechnikScaling: number,
    primaryTechnikStat: UStat | "none",
    secondaryTechnikStat: UStat | "none",
    prerequisites: Array<IPrerequisite>,
    builtinHackIds: Array<IDatachipTierDraft>,
    visibility: string
}

