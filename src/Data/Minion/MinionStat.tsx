import React, {SetStateAction, useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import MinionSheet_v3 from "./MinionSheet_v3";
import {UMinionStat} from "../IMinionData_New";
import AddSubtractPanel from "../../Components/Generic/AddSubtractPanel";

interface IMinionStatInput {
    minionSheet: MinionSheet_v3,
    stat: UMinionStat,
    isInEditMode: boolean,
    callback: () => void
}

const MinionStat = ({minionSheet, stat, isInEditMode, callback}: IMinionStatInput) => {

    const [statHolder, setStatHolder] = useState<number>(minionSheet.getStat(stat))

    const handleChange = (delta: number) => (event: React.MouseEvent) => {
        setStatHolder((prevState) => prevState + delta)
    }

    const finalChange = () => {
        minionSheet.SetStat(stat, statHolder)
        callback()
    }

    useEffect(() => {
        setStatHolder(minionSheet.getStat(stat))

    }, [minionSheet.data.minionStats]);


    return isInEditMode ? (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                <Typography variant={"h6"} textAlign={"center"}>{capitalize(stat)}</Typography>
                <Box
                    sx={{
                        alignSelf: "center"
                    }}
                >
                    <AddSubtractPanel
                        handleChange={handleChange}
                        value={statHolder}
                        isAtCap={statHolder >= minionSheet.getMaxPointsInStat()}
                        isAtBottom={statHolder <= 0}
                        textWidth={30}
                        textSx={{
                            fontSize: "24px"
                        }}
                        callAfterChange={finalChange}
                    />
                </Box>
                {
                    stat === "might" ?
                        <Typography textAlign={"center"} color={"grey"}>Base Power: {minionSheet.getPowerStat(false).toFixed(2)}</Typography>
                        :
                        <></>
                }

            </Box>
        </Box>
    ) : (
        <Box>
            <Box>
                <Typography variant={"h6"} textAlign={"center"}>{capitalize(stat)}</Typography>
                <Typography variant={"h5"} textAlign={"center"}>{minionSheet.getStat(stat)}</Typography>
                {
                    stat === "might" ?
                        <Typography textAlign={"center"} color={"grey"}>Base Power: {minionSheet.getPowerStat(false).toFixed(2)}</Typography>
                        :
                        <></>
                }
            </Box>
        </Box>
    )
}

export default MinionStat