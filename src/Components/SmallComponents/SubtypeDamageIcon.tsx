import React, {useEffect, useState} from 'react';
import {Box, capitalize, SxProps} from "@mui/material";
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
import {IoNuclear, IoWater} from "react-icons/io5";
import {UDamageSubtype, UDamageType} from "../../Data/ICardData";
import {FaGripfire} from "react-icons/fa6";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import BoxWithTooltip from "../Generic/BoxWithTooltip";

interface ISubtypeDamageIconInput {
    damageSubtype: UDamageSubtype,
    placement?: "top" | "bottom" | "left" | "right",
    boxSx?: SxProps<typeof Box>,
    component?: React.ElementType,
    size?: number
}



const getElementIcon = (damageSubtype: string, size: number) => {
    const ElementIconProps = {
        size: size
    }
    const ElementIconMap: { [key: string]: JSX.Element} = {
        pierce: <GiFlyingDagger color={"#ff5757"}  {...ElementIconProps}/>,
        slash: <GiAxeSwing color={"silver"}  {...ElementIconProps}/>,
        impact: <GiPunchBlast color={"brown"}  {...ElementIconProps}/>,
        water: <IoWater color={"#1670c5"} {...ElementIconProps} />,
        gale: <GiWhirlwind  color={"#c8ff90"}   {...ElementIconProps}/>,
        burn: <FaGripfire color={"#ff9d09"} {...ElementIconProps}/>,
        frost: <FaSnowflake color={"lightblue"}  {...ElementIconProps}/>,
        shock: <GiLightningBranches color={"#f6e410"} {...ElementIconProps}/>,
        corrosive: <GiDustCloud color={"#165c08"} {...ElementIconProps}/>,
        sensory: <GiBrainstorm color={"#fb628c"}  {...ElementIconProps}/>,
        holy: <GiAngelOutfit color={"goldenrod"}  {...ElementIconProps}/>,
        curse: <GiCursedStar color={"#ff1a00"}  {...ElementIconProps}/>,
        soul: <GiSparkSpirit color={"#a958ef"} {...ElementIconProps} />,
        none: <></>
    }

    return ElementIconMap[damageSubtype] || <>({damageSubtype})</>
}

const SubtypeDamageIcon = ({
    damageSubtype,
    placement = "right",
    boxSx = {},
    component = "div",
    size = 21
}: ISubtypeDamageIconInput) => {
    return damageSubtype ? (
        <BoxWithTooltip
            sx={{
                padding: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...boxSx,
            }}
            placement={placement}
            component={component} // Pass component to BoxWithTooltip
            title={capitalize(damageSubtype) + " Damage"}
        >
            {getElementIcon(damageSubtype, size)}
        </BoxWithTooltip>
    ) : <></>;
};

export default SubtypeDamageIcon