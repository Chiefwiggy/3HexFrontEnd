import React from 'react';
import {Box, capitalize, IconButton, Paper, Typography} from "@mui/material";
import {IClassChoiceData, IClassChoiceType, IClassMetaData} from "../../../Data/IClassMetaData";
import {OpenInNewOutlined} from "@mui/icons-material";

interface ICompendiumChoiceAffinitiesInput {
    choiceData: IClassChoiceData
}

const CompendiumChoiceAffinities = ({choiceData}: ICompendiumChoiceAffinitiesInput) => {

    const handleNavigateToAffinity = (cc: IClassChoiceType) => () => {
        if (cc.choiceName == "any") {
            window.open(`/compendium/affinities`, "_blank");
        } else {
            window.open(`/compendium/affinities?${cc.choiceType}=${cc.choiceName}`, "_blank");
        }

    }
    return (
        <Box
            sx={{
                display: "flex",
                gap: "20px"
            }}
        >
        {
                    choiceData.choices.map((cd, index) => {
                        return (
                            <Paper
                                sx={{
                                    padding: 1,
                                    borderRadius: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={
                                        cd.choiceType === "arcana" ?
                                            (
                                                cd.choiceName == "any"
                                                    ? {
                                                        color: "#d733e3"
                                                    }
                                                    : {
                                                        color: "#e6a5ab"
                                                    }
                                            )
                                            : {}
                                    }
                                >
                                    {capitalize(cd.choiceName)}
                                </Typography>
                                <Box sx={{width: "4px"}}></Box>
                                <IconButton onClick={handleNavigateToAffinity(cd)}><OpenInNewOutlined sx={{fontSize: "13px"}} /></IconButton>
                            </Paper>
                        )
                    })
                }
        </Box>
    )
}

export default CompendiumChoiceAffinities