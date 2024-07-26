import React, {useEffect, useState} from 'react';
import PreloadedCharacterContext from "./PreloadedContentContext"
import PLC_ClassData from "./PLC_ClassData";
import useAPI from "../useAPI/useAPI";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_ArcanaData from "./PLC_ArcanaData";
import PLC_WeaponData from "./PLC_WeaponData";

interface IPreloadedContentProviderInput {
    children: any
}

export interface IPreloadedContentContextInput {
    ClassData: PLC_ClassData,
    AffinityData: PLC_AffinityData,
    ArcanaData: PLC_ArcanaData,
    WeaponData: PLC_WeaponData
    isLoaded: boolean
}
const PreloadedContentProvider = ({children}: IPreloadedContentProviderInput) => {

    const [ClassData, setClassData] = useState(new PLC_ClassData());

    const [AffinityData, setAffinityData] = useState(new PLC_AffinityData());

    const [ArcanaData, setArcanaData] = useState(new PLC_ArcanaData());

    const [WeaponData, setWeaponData] = useState(new PLC_WeaponData());

    const [isLoaded, setIsLoaded] = useState(false);

    const API = useAPI();

    useEffect(() => {
        (async() => {
            await ClassData.Initialize(API);
            await AffinityData.Initialize(API);
            await ArcanaData.Initialize(API);
            await WeaponData.Initialize(API);
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
                isLoaded
            }}
        >
            {children}
        </PreloadedCharacterContext.Provider>
    )
}

export default PreloadedContentProvider