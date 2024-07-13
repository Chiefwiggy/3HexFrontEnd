import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import {sample_minions} from "../../Data/sample_minions";
import CustomTabPanel from "../../Utils/CustomTabPanel";
import MinionPanel from "../Minions/MinionPanel";
import MinionSheet from "../../Data/MinionSheet";

interface IBattalionTabInput {

}

const BattalionTab = ({}: IBattalionTabInput) => {


    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number ) => {
        setCurrentTab(newValue);
    }

    const [currentMinions, setCurrentMinions] = useState<Array<MinionSheet>>([]);

    useEffect(() => {

        setCurrentMinions(sample_minions.map(e => new MinionSheet(e)));
    }, []);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 7fr"
            }}
        >
            <Box>
                <Tabs onChange={handleChangeTab} value={currentTab} orientation="vertical" variant={"scrollable"}>
                    <Tab label={"Prepare"} value={0}/>
                    {
                        currentMinions.map(((minion, index) => {
                            return <Tab label={minion.data.minionName} value={index+1} key={index+1}/>
                        }))
                    }
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel index={currentTab} value={0}>
                    test2
                </CustomTabPanel>
                <Box
                    hidden={currentTab === 0}
                    role={"tabpanel"}
                >
                    <MinionPanel minionData={currentMinions[currentTab-1]} />
                </Box>
            </Box>

        </Box>
    )
}

export default BattalionTab