import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IMountBaseModel} from "../../Data/IMountData";
import CardEffect from "./CardEffect";
import {FaHeartbeat, FaLungs} from "react-icons/fa";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {FiRefreshCcw} from "react-icons/fi";
import {IoMdRefresh} from "react-icons/io";

interface IMountBaseCardInput {
    mountData: IMountBaseModel
}

const MountBaseCard = ({mountData}: IMountBaseCardInput) => {


    return (
        <Paper
            elevation={1}
            sx={{
                margin: "4px",
                padding: "6px",
                width: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between"
                }}
            >
                <Box sx={{paddingLeft: "2px"}}>
                    <Typography variant={"h5"} >{mountData.speciesName}</Typography>

                    <Typography
                        variant={"body2"}
                        sx={{
                            color: "darkgray",
                            fontSize: "14px"
                        }}
                        lineHeight={1}
                    >
                        AUT {mountData.authorityRequirement} • SKL {mountData.skillRequirement}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: "3px"
                    }}
                >
                    <Box>

                    </Box>
                    <BoxWithTooltip
                        sx={{
                            display: 'flex',
                            alignItems: "center"
                        }}
                        placement={"top"}
                        title={`Max Health`}
                    >
                        <FaHeartbeat /> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{mountData.mountHealth}</Typography>
                    </BoxWithTooltip>
                    <BoxWithTooltip
                        sx={{
                            display: 'flex',
                            alignItems: "center"
                        }}
                        placement={"top"}
                        title={`Max Stamina`}
                    >
                        <FaLungs /> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{mountData.mountStamina}</Typography>
                    </BoxWithTooltip>
                    <BoxWithTooltip
                        sx={{
                            display: 'flex',
                            alignItems: "center"
                        }}
                        placement={"top"}
                        title={`Stamina Refresh`}
                    >
                        <IoMdRefresh color={"lime"} /> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{mountData.mountRefresh}</Typography>
                    </BoxWithTooltip>
                </Box>

            </Box>
            <Divider />
            <Box
                sx={{
                    padding: "8px"
                }}
            >
                {
                    mountData.details.map((data, index) => {
                        return <CardEffect effectData={data} key={index}/>
                    })
                }
            </Box>


        </Paper>
    )
}

export default MountBaseCard