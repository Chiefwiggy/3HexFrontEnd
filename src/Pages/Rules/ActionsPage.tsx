import React from 'react';
import {Box, Button, capitalize, Paper, Typography} from "@mui/material";
import {FaArrowAltCircleUp} from "react-icons/fa";
import BannerTitle from "../../Components/Generic/BannerTitle";
import HighlightType from "../../Components/Generic/HighlightType";
import {GetActionBannerColors} from "../../Utils/CardColorUtils";
import {TextUtils} from "../../Utils/TextUtils";

interface IActionsPageInput {

}



const ActionsPage = ({}: IActionsPageInput) => {






    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "7fr 1fr",
            }}
        >
            <Box
                sx={{
                    margin: "4px"
                }}
            >
                <Typography variant="h3">Actions</Typography>
                <Typography>In 3Hex, each turn you are granted 1 Action, 1 Action Point, 1 Step, and 1 Interaction per turn. You also can take any number of Free Actions. Actions and Action Points can be used interchangeably, however, if you have not used your Action by the end of your turn, it is lost. Finally, if you have already used your Interaction this turn, then you can spend an Action to take up to 2 Interactions.</Typography>

                {
                    ["standard", "interaction", "free", "special"].map((actionType) => {
                        return (
                            <Box>
                                <Typography variant={"h4"}>{capitalize(actionType)} Actions</Typography>
                                {
                                    TextUtils.Actions.GetActionData().filter(e => e.actionType == actionType).sort((a,b) =>{
                                        if (a.actionCategory == b.actionCategory) {
                                            return a.actionName.localeCompare(b.actionName)
                                        } else {
                                            if (a.actionCategory == "standard")
                                                return -1
                                            else if (b.actionCategory == "standard")
                                                return 1
                                            return a.actionCategory.localeCompare(b.actionCategory)
                                        }
                                    }).map(action => {
                                        return (
                                            <Box
                                                sx={{
                                                    marginRight: "2vw"
                                                }}
                                            >
                                                <BannerTitle
                                                    idTag={`action-${action.actionName.split(" ").join("_").toLowerCase()}`}
                                                    title={action.actionName}
                                                    subtitle={`${actionType.toUpperCase()} ACTION - ${action.actionCategory.toUpperCase()}`}
                                                    bannerColor={GetActionBannerColors(action.actionType) }
                                                >
                                                    {
                                                        action.description.map((line, index) => {
                                                            return <HighlightType text={line} xval={undefined} fontSize={"1rem"} />
                                                        })
                                                    }
                                                </BannerTitle>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        )
                    })
                }

            </Box>
            <Box>
                <Paper elevation={2}
                       sx={{
                           display: "flex",
                           flexDirection: "column",
                           padding: "12px 4px"
                       }}
                >

                    <Typography variant={"h4"} textAlign={"center"}>Table of Contents</Typography>
                    {
                        ["standard", "interaction", "free", "special"].map((actionType) => {
                            return (
                                <Box>
                                    <Typography variant={"h6"}>{capitalize(actionType)} Actions</Typography>
                                    {
                                        TextUtils.Actions.GetActionData().filter(e => e.actionType == actionType).sort((a,b) =>{
                                            if (a.actionCategory == b.actionCategory) {
                                                return a.actionName.localeCompare(b.actionName)
                                            } else {
                                                if (a.actionCategory == "standard")
                                                    return -1
                                                else if (b.actionCategory == "standard")
                                                    return 1
                                                return a.actionCategory.localeCompare(b.actionCategory)
                                            }
                                        }).map(action => {
                                            const actionKey = action.actionName.toLowerCase().split(" ").join("_")
                                            return (
                                                <Typography
                                                    key={actionKey}
                                                    component="a"
                                                    href={`#action-${actionKey}`}
                                                    sx={{
                                                        display: "block",
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                    }}
                                                >
                                                    <Typography component="span">• </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            '&:hover': {
                                                                textDecoration: 'underline',
                                                            },
                                                        }}
                                                    >
                                                        {action.actionName}
                                                    </Typography>
                                                </Typography>
                                            )
                                        })
                                    }
                                </Box>
                            )
                        })
                    }

                </Paper>
            </Box>




        </Box>
    )
}

export default ActionsPage