import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {FaFire, FaSnowflake, FaWind} from "react-icons/fa";
import {
    GiAcidTube,
    GiAxeSwing,
    GiCursedStar, GiFlyingDagger, GiGhost, GiHolyGrail,
    GiLightningDissipation,
    GiPiercedBody, GiPunchBlast,
    GiSmashArrows,
    GiWeightCrush
} from "react-icons/gi";
import {LiaGrav} from "react-icons/lia";
import {TfiShine} from "react-icons/tfi";
import {IoMdEyeOff} from "react-icons/io";
import {IoNuclear} from "react-icons/io5";
import {UDamageSubtype, UDamageType} from "../../Data/ICardData";

interface ISubtypeDamageIconInput {
    damageSubtype: UDamageSubtype
}

const ElementIconMap: { [key: string]: JSX.Element } = {
    force: <FaWind color={"#c8ff90"}/>,
    pierce: <GiFlyingDagger color={"#ff5757"} />,
    slash: <GiAxeSwing color={"silver"} />,
    impact: <GiPunchBlast color={"brown"} />,
    burn: <FaFire color={"orange"}/>,
    frost: <FaSnowflake color={"lightblue"} />,
    shock: <GiLightningDissipation />,
    corrosive: <GiAcidTube color={"darkolivegreen"}/>,
    perception: <IoMdEyeOff color={"slateblue"} />,
    holy: <GiHolyGrail color={"goldenrod"} />,
    curse: <GiCursedStar color={"#000000"} />,
    soul: <GiGhost color={"rebeccapurple"}/>,
    none: <></>
}

const SubtypeDamageIcon = ({damageSubtype}: ISubtypeDamageIconInput) => {

    return (
        <Box
            sx={{
                padding: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {ElementIconMap[damageSubtype] || <>({damageSubtype})</>}
        </Box>
    )



}

export default SubtypeDamageIcon