import React, {Dispatch, useState} from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";
import CustomTabPanel from "../../Utils/CustomTabPanel";
import WeaponSpecializationPanel from "../../Components/OtherUnlocks/WeaponSpecializationPanel";
import {IMiscUnlockData} from "../../Data/ICharacterData";
import {MiscUnlockAction} from "../../Utils/MiscUnlockReducer";

interface IOtherFeaturesTabViewInput {
    miscUnlocks: Array<IMiscUnlockData>,
    dispatchMiscUnlocks: Dispatch<MiscUnlockAction>
}



const OtherFeaturesTabView = ({miscUnlocks, dispatchMiscUnlocks}: IOtherFeaturesTabViewInput) => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Tabs onChange={handleTabChange} value={tabIndex}>
                    <Tab label={"Arcanotypes"} value={1}/>
                    <Tab label={"Weapon Specialization"} value={2}/>
                    <Tab label={"Favored Terrain"} value={3} />
                </Tabs>
            </Box>
            <Divider />
            <CustomTabPanel index={tabIndex} value={0}>
                NO
            </CustomTabPanel>
            <CustomTabPanel index={tabIndex} value={1}>
                ARCAN
            </CustomTabPanel>
            <CustomTabPanel index={tabIndex} value={2}>
                <WeaponSpecializationPanel miscUnlocks={miscUnlocks} dispatchMiscUnlocks={dispatchMiscUnlocks} />
            </CustomTabPanel>
            <CustomTabPanel index={tabIndex} value={3}>
                FAV
            </CustomTabPanel>
        </Box>
    )
}

export default OtherFeaturesTabView