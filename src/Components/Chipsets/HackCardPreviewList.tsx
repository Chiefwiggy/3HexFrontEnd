import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {IHackModifierCardData, IHackProtocolCardData} from "../../Data/ICardData";
import ChannelType from "../../Utils/ChannelType";

interface IHackCardPreviewListInput {
    hackList: Array<IHackModifierCardData | IHackProtocolCardData>
}

const HackCardPreviewList = ({hackList}: IHackCardPreviewListInput) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px"
            }}
        >
            {
                hackList.map(e => {
                    return (
                        <Paper key={e._id} elevation={2} sx={{
                            padding: "4px"
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Box>
                                    <Typography variant={"h6"}>{e.cardName}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">

                                    {e.cardSubtype === "protocol"
                                        ? (e as IHackProtocolCardData).protocolChannels.map((channel) => (
                                            <ChannelType
                                                key={channel.channelType}
                                                channelType={channel.channelType}
                                                channelStrength={channel.channelStrength}
                                                color="gray"
                                            />
                                        ))
                                        : e.channelRequirements?.map((channel, index) => (
                                            <React.Fragment key={channel.channelType}>
                                                {index > 0 && (
                                                    <Typography
                                                        component="span"
                                                        sx={{ mx: 1, color: "text.secondary" }}
                                                    >
                                                        OR
                                                    </Typography>
                                                )}
                                                <ChannelType
                                                    channelType={channel.channelType}
                                                    channelStrength={channel.channelStrength}
                                                />
                                            </React.Fragment>
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant={"body2"} color={"grey"}>{e.cardSubtype.toUpperCase()}</Typography>
                            </Box>



                        </Paper>
                    )
                })
            }
        </Box>
    )
}

export default HackCardPreviewList