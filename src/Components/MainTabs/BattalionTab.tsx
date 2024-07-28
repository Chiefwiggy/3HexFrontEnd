import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import {sample_minions} from "../../Data/sample_minions";
import CustomTabPanel from "../../Utils/CustomTabPanel";
import MinionPanel from "../Minions/MinionPanel";
import MinionSheet from "../../Data/MinionSheet";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import MinionSimplePanel from "../Minions/MinionSimplePanel";
import MinionOverviewPanel from '../Minions/MinionOverviewPanel';

interface IBattalionTabInput {

}

const BattalionTab = ({}: IBattalionTabInput) => {


    const [currentTab, setCurrentTab] = useState<number>(0);

    const {currentSheet, charPing, isReady} = useCharacter();

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number ) => {
        setCurrentTab(newValue);
    }

    const [currentMinions, setCurrentMinions] = useState<Array<MinionSheet>>([]);

    const [displayedMinions, setDisplayedMinions] = useState<Array<MinionSheet>>([]);

    useEffect(() => {
        if (currentSheet) {
            setCurrentMinions(currentSheet.minionData);
            setDisplayedMinions(currentSheet.minionData.filter(e => e.isPrepared));
        }
    }, [currentSheet?.minionData, charPing]);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 7fr"
            }}
        >
            <Box>
                <Tabs onChange={handleChangeTab} value={currentTab} orientation="vertical" variant={"scrollable"}>
                    <Tab label={"Overview"} value={0}/>
                    {
                        displayedMinions.map(((minion, index) => {
                            return <Tab label={minion.data.minionName} value={index+1} key={index+1}/>
                        }))
                    }
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel index={currentTab} value={0}>
                    <MinionOverviewPanel currentMinions={currentMinions} displayMinions={displayedMinions}/>
                </CustomTabPanel>
                <Box
                    hidden={currentTab === 0}
                    role={"tabpanel"}
                >
                    <MinionPanel minionData={displayedMinions[currentTab-1]} />
                </Box>
            </Box>

        </Box>
    )
}

export default BattalionTab