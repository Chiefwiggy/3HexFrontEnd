import React, {useEffect, useState} from 'react';
import PreloadedCharacterContext from "./PreloadedContentContext"
import PLC_ClassData from "./PLC_ClassData";
import useAPI from "../useAPI/useAPI";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_PathData from "./PLC_PathData";
import PLC_WeaponData from "./PLC_WeaponData";
import PLC_ArmorData from "./PLC_ArmorData";
import Axios from "axios";
import {IAffinitiesArray, IPathArray} from "../../Data/ICharacterData";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";
import PLC_SourceData from "./PLC_SourceData";
import PLC_ConsumableData from "./PLC_ConsumableData";
import PLC_FatelineData from "./PLC_FatelineData";
import PLC_ConditionData from "./PLC_ConditionData";
import PLC_DowntimeData from "./PLC_DowntimeData";
import PLC_SettingsData from "./PLC_SettingsData";
import PLC_ShieldData from "./PLC_ShieldData";
import PLC_MountData from "./PLC_MountData";
import PLC_MinionMetadata from "./PLC_MinionMetadata";
import PLC_RaceData from "./PLC_RaceData";
import PLC_DevelopmentData from "./PLC_DevelopmentData";

interface IPreloadedContentProviderInput {
    children: any
}

export interface IPreloadedContentContextInput {
    ClassData: PLC_ClassData,
    AffinityData: PLC_AffinityData,
    PathData: PLC_PathData,
    WeaponData: PLC_WeaponData,
    ArmorData: PLC_ArmorData,
    ShieldData: PLC_ShieldData,
    SourceData: PLC_SourceData,
    ConsumableData: PLC_ConsumableData,
    FatelineData: PLC_FatelineData,
    ConditionData: PLC_ConditionData,
    DowntimeData: PLC_DowntimeData,
    SettingsData: PLC_SettingsData,
    MountData: PLC_MountData,
    MinionMetadata: PLC_MinionMetadata,
    RaceData: PLC_RaceData,
    DevelopmentData: PLC_DevelopmentData,
    isLoaded: boolean
}
const PreloadedContentProvider = ({children}: IPreloadedContentProviderInput) => {

    const [ClassData, setClassData] = useState(new PLC_ClassData());

    const [AffinityData, setAffinityData] = useState(new PLC_AffinityData());

    const [PathData, setPathData] = useState(new PLC_PathData());

    const [WeaponData, setWeaponData] = useState(new PLC_WeaponData());

    const [ArmorData, setArmorData] = useState(new PLC_ArmorData());

    const [SourceData, setSourceData]  = useState(new PLC_SourceData());

    const [ConsumableData, setConsumableData] = useState(new PLC_ConsumableData());

    const [FatelineData, setFatelineData] = useState(new PLC_FatelineData());

    const [ConditionData, setConditionData] = useState(new PLC_ConditionData());

    const [DowntimeData, setDowntimeData] = useState(new PLC_DowntimeData());

    const [SettingsData, setSettingsData] = useState(new PLC_SettingsData());

    const [ShieldData, setShieldData] = useState(new PLC_ShieldData());

    const [MountData, setMountData] = useState(new PLC_MountData());

    const [MinionMetadata, setMinionMetadata] = useState(new PLC_MinionMetadata());

    const [RaceData, setRaceData] = useState(new PLC_RaceData());

    const [DevelopmentData, setDevelopmentData] = useState(new PLC_DevelopmentData())

    const [isLoaded, setIsLoaded] = useState(false);

    const API = useAPI();

    useEffect(() => {
        (async() => {

            const data = await API.PreloadedAPI.GetPreloadedData();
            const classData = await API.ClassAPI.GetAllClasses();


            await ClassData.Initialize(data.class.cards, data.class.abilities, classData);
            await AffinityData.Initialize(data.affinity.cards as IAffinitiesArray<ICommonCardData>, data.affinity.abilities as IAffinitiesArray<IAbility>);
            await PathData.Initialize(data.path.cards as IPathArray<ICommonCardData>, data.path.abilities as IPathArray<IAbility>);
            await WeaponData.Initialize(data.weaponData);
            await ArmorData.Initialize(data.armorData);
            await ShieldData.Initialize(data.shieldData)
            await SourceData.Initialize(data.sources);
            await ConsumableData.Initialize(data.consumableData);
            await FatelineData.Initialize(data.fatelineData);
            await ConditionData.Initialize(data.conditionCards, data.conditionTags);
            await DowntimeData.Initialize(data.downtimeActivitiesData)
            await MinionMetadata.Initialize(data.minionRoles, data.allMinions)
            console.log(data.raceData)
            await RaceData.Initialize(data.raceData.raceCards, data.raceData.subraceCards, data.raceData.raceRoleCards, data.raceData.raceAbilities, data.raceData.subraceAbilities, data.raceData.raceRoleAbilities, data.raceData.raceMetadata)
            await DevelopmentData.Initialize(data.development.cards, data.development.abilities)
            setIsLoaded(true);
            await MountData.Initialize(data.mountData)
        })();
    }, []);

    return (
        <PreloadedCharacterContext.Provider
            value={{
                ClassData,
                PathData,
                AffinityData,
                WeaponData,
                ArmorData,
                ShieldData,
                SourceData,
                ConsumableData,
                FatelineData,
                ConditionData,
                DowntimeData,
                SettingsData,
                MountData,
                MinionMetadata,
                RaceData,
                DevelopmentData,
                isLoaded
            }}
        >
            {children}
        </PreloadedCharacterContext.Provider>
    )
}

export default PreloadedContentProvider