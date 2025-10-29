import React from 'react';
import {Box} from "@mui/material";
import {GiCog, GiPlantsAndAnimals} from "react-icons/gi";
import IconButtonWithTooltip from "../Components/Generic/IconButtonWithTooltip";
import {ImNeutral} from "react-icons/im";
import {TbTree} from "react-icons/tb";
import {SiNginxproxymanager} from "react-icons/si";
import {PiBroadcastFill} from "react-icons/pi";

interface IChannelTypeInput {
    channelType: string,
    channelStrength: number
}

const ChannelType = ({channelType, channelStrength}: IChannelTypeInput) => {
    let IconElement: React.ElementType = ImNeutral
    switch(channelType) {
        case "machina":
            IconElement = SiNginxproxymanager
            break;
        case "eden":
            IconElement = GiPlantsAndAnimals
            break;
        case "biomantle":
            break
        case "lattice":
            break;
        case "lexica":
            IconElement = PiBroadcastFill
            break;
    }
    return (
        <Box display="flex" gap={1} sx={{justifyContent: "center"}}>
            {Array.from({ length: channelStrength }).map((_, idx) => (
                <IconElement key={idx} fontSize="28px" />
            ))}
        </Box>
    )
}

export default ChannelType