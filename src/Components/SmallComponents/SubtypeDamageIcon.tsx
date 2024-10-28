import React, {useEffect, useState} from 'react';
import {Box, capitalize} from "@mui/material";
import {FaFire, FaFireAlt, FaSnowflake, FaWind} from "react-icons/fa";
import {
    GiAcidTube, GiAngelOutfit,
    GiAxeSwing, GiBigWave, GiBrainstorm,
    GiCursedStar, GiDustCloud, GiFlyingDagger, GiGhost, GiHolyGrail, GiLightningBranches,
    GiLightningDissipation,
    GiPiercedBody, GiPunchBlast,
    GiSmashArrows, GiSparkSpirit,
    GiWeightCrush,
    GiWhirlwind, GiWindHole
} from "react-icons/gi";
import {LiaGrav} from "react-icons/lia";
import {TfiShine} from "react-icons/tfi";
import {IoMdEyeOff} from "react-icons/io";
import {IoNuclear} from "react-icons/io5";
import {UDamageSubtype, UDamageType} from "../../Data/ICardData";
import {FaGripfire} from "react-icons/fa6";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import BoxWithTooltip from "../Generic/BoxWithTooltip";

interface ISubtypeDamageIconInput {
    damageSubtype: UDamageSubtype,
    placement?: "top" | "bottom" | "left" | "right",
}

const ElementIconProps = {
    size: 21
}

const ElementIconMap: { [key: string]: JSX.Element } = {
    // force: <GiWindHole  color={"#c8ff90"}   {...ElementIconProps}/>,
    pierce: <GiFlyingDagger color={"#ff5757"}  {...ElementIconProps}/>,
    slash: <GiAxeSwing color={"silver"}  {...ElementIconProps}/>,
    kinetic: <GiPunchBlast color={"brown"}  {...ElementIconProps}/>,
    burn: <FaGripfire color={"#ff9d09"} {...ElementIconProps}/>,
    frost: <FaSnowflake color={"lightblue"}  {...ElementIconProps}/>,
    shock: <GiLightningBranches color={"#f6e410"} {...ElementIconProps}/>,
    corrosive: <GiDustCloud color={"#165c08"} {...ElementIconProps}/>,
    sensory: <GiBrainstorm color={"#fb628c"}  {...ElementIconProps}/>,
    holy: <GiAngelOutfit color={"goldenrod"}  {...ElementIconProps}/>,
    curse: <GiCursedStar color={"#ff1a00"}  {...ElementIconProps}/>,
    soul: <GiSparkSpirit color={"#0083e3"} {...ElementIconProps}/>,
    none: <></>
}

const SubtypeDamageIcon = ({damageSubtype, placement = "right"}: ISubtypeDamageIconInput) => {

    return (
        <BoxWithTooltip
            sx={{
                padding: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            placement={placement}
            title={capitalize(damageSubtype) + " Damage"}
        >
                {ElementIconMap[damageSubtype] || <>({damageSubtype})</>}
        </BoxWithTooltip>
    )



}

export default SubtypeDamageIcon