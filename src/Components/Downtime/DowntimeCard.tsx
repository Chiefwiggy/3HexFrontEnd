import React, {useState} from 'react';
import {Box, capitalize, Collapse, LinearProgress, Paper, Typography} from "@mui/material";
import {IDowntimeFullScaledData} from "../../Data/IDowntime";
import {
    Casino,
    CasinoOutlined,
    ExpandMoreOutlined,
    HourglassEmptyOutlined,
    HourglassFullOutlined
} from "@mui/icons-material";
import {getTrainingLevel} from "../../Utils/Shorthand";
import {ExpandMore} from "../../Elements/ExpandMore";

interface IDowntimeCardInput {
    downtimeData: IDowntimeFullScaledData
}

const DowntimeCard = ({
    downtimeData
}: IDowntimeCardInput) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Box>

        <Paper
            elevation={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px",
                borderRadius: "12px"

            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 8fr 1fr"
                }}
            >
                <Box></Box>
                <Typography variant={"h5"} textAlign={"center"}>{downtimeData.activityName}</Typography>
                <Box sx={{
                    display: "flex"
                }}>
                    {downtimeData.timeSlots}
                    <HourglassEmptyOutlined sx={{
                        fontSize: "22px"
                    }}/>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                {
                    new Array(Math.max(6, (downtimeData.proficiency+2))).fill(0).map((_, index) => {
                        return (
                            <Box key={index}>
                                {
                                    (downtimeData.proficiency+2) > index ?
                                        <Casino sx={{color: index >= 6 ? "mediumpurple" : "white"}}/>
                                        :
                                        <CasinoOutlined sx={{color: "darkgray"}} />
                                }
                            </Box>
                        )
                    })
                }
            </Box>
            <Typography variant={"body2"} sx={{
                fontSize: "14px",
                marginTop: "-6px",
                color: "darkgray"
            }}>
                {capitalize(getTrainingLevel(downtimeData.proficiency))}
            </Typography>
            <Collapse in={isExpanded}>
                <Paper elevation={2} sx={{
                    padding: "6px"
                }}>
                    <Typography variant={"body2"} textAlign={"center"}>{downtimeData.description}</Typography>
                </Paper>

            </Collapse>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%"
                }}
            >
                <ExpandMore
                  expand={isExpanded}
                  onClick={handleExpandClick}
                  aria-expanded={isExpanded}
                  aria-label="show more"
                >
                  <ExpandMoreOutlined />
                </ExpandMore>
            </Box>

        </Paper>
        </Box>
    )
}

export default DowntimeCard