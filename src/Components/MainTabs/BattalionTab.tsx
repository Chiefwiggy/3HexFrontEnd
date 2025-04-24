import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import {sample_minions} from "../../Data/sample_minions";
import CustomTabPanel from "../../Utils/CustomTabPanel";
import MinionPanel from "../Minions/MinionPanel";
import MinionSheet from "../../Data/MinionSheet";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import MinionSimplePanel from "../Minions/MinionSimplePanel";
import MinionOverviewPanel from '../Minions/MinionOverviewPanel';
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import MinionCard from "../Minions/Minions_v3/MinionCard";
import MinionSheet_v3 from "../../Data/Minion/MinionSheet_v3";
import useAPI from "../../Hooks/useAPI/useAPI";

interface IBattalionTabInput {

}

const BattalionTab = ({}: IBattalionTabInput) => {



    const {currentSheet, charPing, isReady} = useCharacter()
    const api = useAPI()

    const {MinionMetadata} = usePreloadedContent()
    const [minionSheets, setMinionSheets] = useState<Array<MinionSheet_v3>>([])

    useEffect(() => {
        setMinionSheets(MinionMetadata.GetAllMinions().map(e => new MinionSheet_v3(e, MinionMetadata, api)));
    }, []);


    return (
        <Box>
            <Box>
                <Typography variant={"h6"}>Battalion</Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px"
                }}
            >
                {
                    minionSheets.map(minionSheet => {
                        return <MinionCard minionSheet={minionSheet} key={minionSheet.data._id}/>
                    })
                }

            </Box>
        </Box>
    )
}

export default BattalionTab