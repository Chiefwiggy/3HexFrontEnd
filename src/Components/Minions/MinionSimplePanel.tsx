import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Checkbox, Typography} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import MinionSheet from "../../Data/MinionSheet";
import MinionDefenses from "./MinionDefenses";
import MinionAttributeBars from './MinionAttributeBars';
import {getSkillFormat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IMinionSimplePanelInput {
    minionData: MinionSheet,
    minionIndex: number,
    cancelPing: boolean,
    changeCallback: (index: number, delta: number) => (event: ChangeEvent) => void
}

const MinionSimplePanel = ({
    minionData,
    minionIndex,
    cancelPing,
    changeCallback
}: IMinionSimplePanelInput) => {


    const [isMinionPrepared, setIsMinionPrepared] = useState(false);
    const {healthPing} = useCharacter()

    useEffect(() => {
        setIsMinionPrepared(minionData.isPrepared);
    }, [cancelPing]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsMinionPrepared(event.target.checked)
        changeCallback(minionIndex, event.target.checked ? 1 : -1)(event);
    }



    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "6px",
                padding: "6px",
                borderRadius: 2,
                backgroundColor: "#232323"
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr 1fr",
                    width: "100%"
                }}
            >
                <Box></Box>
                    <Typography sx={{
                        textAlign: "center"
                    }} variant="h5" component="div">{minionData.data.minionName}</Typography>

                <Box>
                    <Checkbox
                        size={"small"}
                        checked={isMinionPrepared}
                        onChange={handleChange}
                        sx={{
                            padding: 0
                        }}
                    />
                </Box>
            </Box>
            {/*<MinionAttributeBars minionData={minionData} />*/}
            <Box>
                <Typography>pDEF: {minionData.getPDEF()} • mDEF: {minionData.getMDEF()} • Dodge: {getSkillFormat(minionData.getDodge(), false)}</Typography>
            </Box>
        </Box>
    )
}

export default MinionSimplePanel