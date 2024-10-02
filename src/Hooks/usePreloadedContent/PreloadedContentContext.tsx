import React, {createContext} from 'react';
import {Box} from "@mui/material";
import {IPreloadedContentContextInput} from "./PreloadedContentProvider";
import PLC_ClassData from "./PLC_ClassData";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_ArcanaData from "./PLC_ArcanaData";
import PLC_WeaponData from "./PLC_WeaponData";
import PLC_ArmorData from "./PLC_ArmorData";
import PLC_SourceData from "./PLC_SourceData";
import PLC_ConsumableData from "./PLC_ConsumableData";
import PLC_FatelineData from "./PLC_FatelineData";
import PLC_ConditionData from "./PLC_ConditionData";
import PLC_DowntimeData from "./PLC_DowntimeData";



const PreloadedContentContext =     createContext<IPreloadedContentContextInput>({
        ClassData: new PLC_ClassData(),
        ArcanaData: new PLC_ArcanaData(),
        AffinityData: new PLC_AffinityData(),
        WeaponData: new PLC_WeaponData(),
        ArmorData: new PLC_ArmorData(),
        SourceData: new PLC_SourceData(),
        ConsumableData: new PLC_ConsumableData(),
        FatelineData: new PLC_FatelineData(),
        ConditionData: new PLC_ConditionData(),
        DowntimeData: new PLC_DowntimeData(),
        isLoaded: false
    }
);

export default PreloadedContentContext