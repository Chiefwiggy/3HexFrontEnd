import React from 'react';
import {Box, capitalize, Paper, Typography} from "@mui/material";
import {IDatachipData} from "../../Data/ChipsetData";
import {getHackShorthand, UHackType} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import HackCardPreviewList from "./HackCardPreviewList";

interface IDatachipInfoInput {
    datachip: IDatachipData,
    index: number
}

const DatachipInfo = ({datachip, index}: IDatachipInfoInput) => {

    const {currentSheet} = useCharacter()

    return currentSheet ? (
        <Paper
            sx={{
                width: "100%",
                padding: "12px",
                marginBottom: "6px"
            }}
            elevation={1}
        >
            <Typography variant="h6">{datachip.datachipName}</Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr"
                }}
            >
                <Box>
                    <Box
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        <Typography>Base Technik</Typography>
                        <Typography variant={"h4"}>{datachip.baseTechnikCapacity}</Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-around"
                        }}
                    >
                        <Box>
                            <Typography>From {capitalize(datachip.primaryTechnikStat)}</Typography>
                            <Typography variant="h4" component="span">
                                {datachip.primaryTechnikScaling * currentSheet.getStat(datachip.primaryTechnikStat)}{" "}
                                /{" "}
                                <span style={{ color: "gray" }}>
            {Math.floor((datachip.primaryTechnikScaling * currentSheet.getStat(datachip.primaryTechnikStat)) / 5)}
        </span>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>From {capitalize(datachip.secondaryTechnikStat)}</Typography>
                            <Typography variant="h4" component="span">
                                {datachip.secondaryTechnikScaling * currentSheet.getStat(datachip.secondaryTechnikStat)}{" "}
                                /{" "}
                                <span style={{ color: "gray" }}>
            {Math.floor((datachip.secondaryTechnikScaling * currentSheet.getStat(datachip.secondaryTechnikStat)) / 5)}
        </span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <HackCardPreviewList hackList={datachip.builtinHacks} />
            </Box>
        </Paper>
    ) : <></>
}

export default DatachipInfo