import React from 'react';
import {Box, capitalize} from "@mui/material";
import {GiCog, GiPlantsAndAnimals} from "react-icons/gi";
import IconButtonWithTooltip from "../Components/Generic/IconButtonWithTooltip";
import {ImNeutral} from "react-icons/im";
import {TbTree} from "react-icons/tb";
import {SiNginxproxymanager, SiNodemon} from "react-icons/si";
import {PiBroadcastFill} from "react-icons/pi";
import BoxWithTooltip from "../Components/Generic/BoxWithTooltip";
import {MdPersonPin} from "react-icons/md";
import {RiGhostSmileFill} from "react-icons/ri";

interface IChannelTypeInput {
    channelType: string,
    channelStrength: number,
    color?: string
}

const ChannelType = ({channelType, channelStrength, color = "white"}: IChannelTypeInput) => {
    let IconElement: React.ElementType = ImNeutral
    switch(channelType) {
        case "machina":
            IconElement = SiNginxproxymanager
            break;
        case "eden":
            IconElement = GiPlantsAndAnimals
            break;
        case "biomantle":
            IconElement = MdPersonPin
            break;
        case "network":
            IconElement = PiBroadcastFill
            break;
        case "daemon":
            IconElement = SiNodemon
            break;
        case "eidolon":
            IconElement = RiGhostSmileFill
            break;
    }
    return (
        <BoxWithTooltip
            sx={{
                justifyContent: "center",
                display: "flex",
                gap: 1
            }}
            title={`${capitalize(channelType)} ${channelStrength}`}
            placement="top"
        >
            {Array.from({ length: Math.abs(channelStrength) }).map((_, idx) => (
                <IconElement key={idx} fontSize="28px" color={channelStrength > 0 ? color : "gray"} />
            ))}
        </BoxWithTooltip>
    )
}

export default ChannelType