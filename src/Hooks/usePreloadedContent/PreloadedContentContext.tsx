import React, {createContext} from 'react';
import {Box} from "@mui/material";
import {IPreloadedContentContextInput} from "./PreloadedContentProvider";
import PLC_ClassData from "./PLC_ClassData";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_PathData from "./PLC_PathData";
import PLC_WeaponData from "./PLC_WeaponData";
import PLC_ArmorData from "./PLC_ArmorData";
import PLC_SourceData from "./PLC_SourceData";
import PLC_ConsumableData from "./PLC_ConsumableData";
import PLC_FatelineData from "./PLC_FatelineData";
import PLC_ConditionData from "./PLC_ConditionData";
import PLC_DowntimeData from "./PLC_DowntimeData";
import PLC_SettingsData from "./PLC_SettingsData";
import PLC_ShieldData from "./PLC_ShieldData";
import PLC_MountData from "./PLC_MountData";



const PreloadedContentContext =     createContext<IPreloadedContentContextInput>({
        ClassData: new PLC_ClassData(),
        PathData: new PLC_PathData(),
        AffinityData: new PLC_AffinityData(),
        WeaponData: new PLC_WeaponData(),
        ArmorData: new PLC_ArmorData(),
        ShieldData: new PLC_ShieldData(),
        SourceData: new PLC_SourceData(),
        ConsumableData: new PLC_ConsumableData(),
        FatelineData: new PLC_FatelineData(),
        ConditionData: new PLC_ConditionData(),
        DowntimeData: new PLC_DowntimeData(),
        SettingsData: new PLC_SettingsData(),
        MountData: new PLC_MountData(),
        isLoaded: false
    }
);

export default PreloadedContentContext