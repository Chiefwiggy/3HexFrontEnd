import React from 'react';
import {Box} from "@mui/material";
import {SlChemistry} from "react-icons/sl";
import {GrStatusUnknown} from "react-icons/gr";
import {FaGem} from "react-icons/fa";
import {GiCursedStar, GiHolyWater, GiTotemMask, GiTrumpetFlag} from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import BoxWithTooltip from "../Generic/BoxWithTooltip";

interface IDowntimeTooltipInput {
    tooltipKey: string,
    size: number
}

const DowntimeTooltip = ({tooltipKey, size}: IDowntimeTooltipInput) => {

    const getIconName = () => {
        switch (tooltipKey) {
            case "alchemy":
            case "potion":
            case "oil":
            case "poison":
                return "Alchemy Kit"
            case "gem":
                return "Gemcarving Kit"
            case "curse":
                return "Hemocraft Kit"
            case "holy":
                return "Sanctifier's Kit"
            case "totem":
                return "Totem Carving Kit"
            case "flag":
                return "Train Minions"
            case "medical":
                return "N/A"
            default:
                return "idk"
        }
    }

    const getIcon = () => {
        switch (tooltipKey) {
            case "alchemy":
            case "potion":
            case "oil":
            case "poison":
                return <SlChemistry size={size}/>
            case "gem":
                return <FaGem size={size}/>
            case "curse":
                return <GiCursedStar size={size}/>
            case "holy":
                return <GiHolyWater size={size}/>
            case "totem":
                return <GiTotemMask size={size}/>
            case "flag":
                return <GiTrumpetFlag size={size}/>
            case "medical":
                return <FaUserDoctor size={size}/>
            default:
                return <GrStatusUnknown size={size}/>
        }
    }

    return (
        <BoxWithTooltip title={getIconName()} placement={"left"}>
            {getIcon()}
        </BoxWithTooltip>
    )
}

export default DowntimeTooltip