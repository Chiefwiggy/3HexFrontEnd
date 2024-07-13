import React, {useEffect, useState} from 'react';
import PreloadedCharacterContext from "./PreloadedContentContext"
import PLC_ClassData from "./PLC_ClassData";
import useAPI from "../useAPI/useAPI";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_ArcanaData from "./PLC_ArcanaData";

interface IPreloadedContentProviderInput {
    children: any
}

export interface IPreloadedContentContextInput {
    ClassData: PLC_ClassData,
    AffinityData: PLC_AffinityData,
    ArcanaData: PLC_ArcanaData,
    isLoaded: boolean
}
const PreloadedContentProvider = ({children}: IPreloadedContentProviderInput) => {

    const [ClassData, setClassData] = useState(new PLC_ClassData());

    const [AffinityData, setAffinityData] = useState(new PLC_AffinityData());

    const [ArcanaData, setArcanaData] = useState(new PLC_ArcanaData());

    const [isLoaded, setIsLoaded] = useState(false);

    const API = useAPI();

    useEffect(() => {
        (async() => {
            await ClassData.Initialize(API);
            await AffinityData.Initialize(API);
            await ArcanaData.Initialize(API);
            setIsLoaded(true);
        })();
    }, []);

    return (
        <PreloadedCharacterContext.Provider
            value={{
                ClassData,
                ArcanaData,
                AffinityData,
                isLoaded
            }}
        >
            {children}
        </PreloadedCharacterContext.Provider>
    )
}

export default PreloadedContentProvider