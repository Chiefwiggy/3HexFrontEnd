import {IScalingData} from "./ICardData";


export interface IDowntimeActivity {
    _id: string,
    activityName: string,
    activityId: string,
    description: IScalingData<string>,
    xVals: Array<IScalingData<number>>,
    timeSlots: IScalingData<number>
}

export interface IDowntimePlayerData {
    activityId: string,
    currentProgress: number,
    proficiency: number
}

export interface IDowntimeFullScaledData {
    _id: string,
    activityName: string,
    activityId: string,
    description: string,
    timeSlots: number,
    currentProgress: number,
    proficiency: number
}