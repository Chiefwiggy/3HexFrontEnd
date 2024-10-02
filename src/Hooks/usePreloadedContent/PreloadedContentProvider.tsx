import React, {useEffect, useState} from 'react';
import PreloadedCharacterContext from "./PreloadedContentContext"
import PLC_ClassData from "./PLC_ClassData";
import useAPI from "../useAPI/useAPI";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_ArcanaData from "./PLC_ArcanaData";
import PLC_WeaponData from "./PLC_WeaponData";
import PLC_ArmorData from "./PLC_ArmorData";
import Axios from "axios";
import {IAffinitiesArray, IArcanaArray} from "../../Data/ICharacterData";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";
import PLC_SourceData from "./PLC_SourceData";
import PLC_ConsumableData from "./PLC_ConsumableData";
import PLC_FatelineData from "./PLC_FatelineData";
import PLC_ConditionData from "./PLC_ConditionData";
import PLC_DowntimeData from "./PLC_DowntimeData";

interface IPreloadedContentProviderInput {
    children: any
}

export interface IPreloadedContentContextInput {
    ClassData: PLC_ClassData,
    AffinityData: PLC_AffinityData,
    ArcanaData: PLC_ArcanaData,
    WeaponData: PLC_WeaponData,
    ArmorData: PLC_ArmorData,
    SourceData: PLC_SourceData,
    ConsumableData: PLC_ConsumableData,
    FatelineData: PLC_FatelineData,
    ConditionData: PLC_ConditionData,
    DowntimeData: PLC_DowntimeData,
    isLoaded: boolean
}
const PreloadedContentProvider = ({children}: IPreloadedContentProviderInput) => {

    const [ClassData, setClassData] = useState(new PLC_ClassData());

    const [AffinityData, setAffinityData] = useState(new PLC_AffinityData());

    const [ArcanaData, setArcanaData] = useState(new PLC_ArcanaData());

    const [WeaponData, setWeaponData] = useState(new PLC_WeaponData());

    const [ArmorData, setArmorData] = useState(new PLC_ArmorData());

    const [SourceData, setSourceData]  = useState(new PLC_SourceData());

    const [ConsumableData, setConsumableData] = useState(new PLC_ConsumableData());

    const [FatelineData, setFatelineData] = useState(new PLC_FatelineData());

    const [ConditionData, setConditionData] = useState(new PLC_ConditionData());

    const [DowntimeData, setDowntimeData] = useState(new PLC_DowntimeData());

    const [isLoaded, setIsLoaded] = useState(false);

    const API = useAPI();

    useEffect(() => {
        (async() => {

            const data = await API.PreloadedAPI.GetPreloadedData();
            const classData = await API.ClassAPI.GetAllClasses();


            await ClassData.Initialize(data.class.cards, data.class.abilities, classData);
            await AffinityData.Initialize(data.affinity.cards as IAffinitiesArray<ICommonCardData>, data.affinity.abilities as IAffinitiesArray<IAbility>);
            await ArcanaData.Initialize(data.arcana.cards as IArcanaArray<ICommonCardData>, data.arcana.abilities as IArcanaArray<IAbility>);
            await WeaponData.Initialize(data.weaponData);
            await ArmorData.Initialize(data.armorData);
            await SourceData.Initialize(data.sources);
            await ConsumableData.Initialize(data.consumableData);
            await FatelineData.Initialize(data.fatelineData);
            await ConditionData.Initialize(data.conditionCards);
            await DowntimeData.Initialize(data.downtimeActivitiesData)
            setIsLoaded(true);
        })();
    }, []);

    return (
        <PreloadedCharacterContext.Provider
            value={{
                ClassData,
                ArcanaData,
                AffinityData,
                WeaponData,
                ArmorData,
                SourceData,
                ConsumableData,
                FatelineData,
                ConditionData,
                DowntimeData,
                isLoaded
            }}
        >
            {children}
        </PreloadedCharacterContext.Provider>
    )
}

export default PreloadedContentProvider