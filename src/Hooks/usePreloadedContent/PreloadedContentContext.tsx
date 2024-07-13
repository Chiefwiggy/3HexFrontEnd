import React, {createContext} from 'react';
import {Box} from "@mui/material";
import {IPreloadedContentContextInput} from "./PreloadedContentProvider";
import PLC_ClassData from "./PLC_ClassData";
import PLC_AffinityData from "./PLC_AffinityData";
import PLC_ArcanaData from "./PLC_ArcanaData";



const PreloadedContentContext =     createContext<IPreloadedContentContextInput>({
        ClassData: new PLC_ClassData(),
        ArcanaData: new PLC_ArcanaData(),
        AffinityData: new PLC_AffinityData(),
        isLoaded: false
    }
);

export default PreloadedContentContext