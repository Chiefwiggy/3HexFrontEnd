import React, {useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {IGadgetData} from "../../Data/IGadgetData";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {FaHeartbeat, FaLungs} from "react-icons/fa";
import {IoMdRefresh} from "react-icons/io";
import CardEffect from "../Cards/CardEffect";
import {GiLaserBurst} from "react-icons/gi";
import {GrTechnology} from "react-icons/gr";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {MdAdsClick, MdFitnessCenter, MdOutlineSportsMma} from "react-icons/md";
import {getDamageShorthand, getSkillFormat} from "../../Utils/Shorthand";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {GetPrerequisiteString} from "../../Utils/PrerequisiteString";
import {GoPackage} from "react-icons/go";

interface IGadgetCardInput {
    gadgetData: IGadgetData,
    showPrerequisites?: boolean,
    isDraft?: boolean,
    scaleWithCharacter?: boolean
}

const GadgetCard = ({gadgetData, showPrerequisites = false, isDraft = false, scaleWithCharacter = false}: IGadgetCardInput) => {

    const [prereqString, setPrereqString] = useState<string>("None.")


    const {currentSheet} = useCharacter()

    const [finalPower, setFinalPower] = useState<number>(0)
    const [finalHit, setFinalHit] = useState<number>(0)

    useEffect(() => {
        if (currentSheet && scaleWithCharacter) {
            const nfp = gadgetData.basePower + (currentSheet.getStat("might") * gadgetData.potency)
            const nfh = gadgetData.baseHit + currentSheet.getGadgetHit()
            setFinalPower(nfp)
            console.log(gadgetData.basePower, currentSheet.getStat("might"), gadgetData.potency);
            setFinalHit(nfh)
        }

    }, [currentSheet, scaleWithCharacter])

    useEffect(() => {
        const str= GetPrerequisiteString(gadgetData.prerequisites);
        if (str != "") {
            setPrereqString(str);
        }
    }, [gadgetData.prerequisites]);



    return (
        <Box
            sx={{
                margin: "2px",
                maxWidth: "364px"
            }}
        >
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
                        <Typography variant={"h5"} >{gadgetData.gadgetName}</Typography>

                        <Typography
                            variant={"body2"}
                            sx={{
                                color: "darkgray",
                                fontSize: "14px"
                            }}
                            lineHeight={1}
                        >
                            {prereqString}
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
                            title={`Technik Cost`}
                        >
                            <GrTechnology color={"#f4c51d"}/> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{gadgetData.technikCost}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            sx={{
                                display: 'flex',
                                alignItems: "center"
                            }}
                            placement={"top"}
                            title={`Surge`}
                        >
                            <GiLaserBurst color={"#0096ff"} /> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{gadgetData.surgeCost}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            sx={{
                                display: 'flex',
                                alignItems: "center"
                            }}
                            placement={"top"}
                            title={`Package Slots`}
                        >
                            <GoPackage /> <Typography sx={{fontSize: "16px", paddingLeft: "4px"}}>{gadgetData.packageSlots}</Typography>
                        </BoxWithTooltip>
                    </Box>

                </Box>
                <Divider />
                {
                    scaleWithCharacter && gadgetData.gadgetActionType == "active" ?
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3
                            }}
                        >
                            <BoxWithTooltip
                                sx={{
                                    display: 'flex',
                                    alignItems: "center"
                                }}
                                placement={"left"}
                                title={`Gadget Power`}
                            >
                                <MdOutlineSportsMma /> <Typography sx={{fontSize: "14px", paddingLeft: "4px"}}>{finalPower} {getDamageShorthand(gadgetData.damageType)}</Typography>  <SubtypeDamageIcon damageSubtype={gadgetData.damageSubtype} size={18} />
                            </BoxWithTooltip>
                            {
                                gadgetData.baseHit != -99
                                ?
                            <BoxWithTooltip
                                sx={{
                                    display: 'flex',
                                    alignItems: "center"
                                }}
                                placement={"left"}
                                title={`Gadget Hit`}
                            >
                                <MdAdsClick /> <Typography sx={{fontSize: "14px", paddingLeft: "4px"}}>{getSkillFormat(finalHit)}</Typography>
                            </BoxWithTooltip>
                                    :
                                    <></>
                            }
                        </Box>
                    : ( gadgetData.gadgetActionType == "active" ?
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3
                            }}
                        >
                            <BoxWithTooltip
                                sx={{
                                    display: 'flex',
                                    alignItems: "center"
                                }}
                                placement={"left"}
                                title={`Gadget Base Power`}
                            >
                                <MdOutlineSportsMma /> <Typography sx={{fontSize: "14px", paddingLeft: "4px"}}>{gadgetData.basePower} {getDamageShorthand(gadgetData.damageType)}</Typography>  <SubtypeDamageIcon damageSubtype={gadgetData.damageSubtype} size={18} />
                            </BoxWithTooltip>
                            <BoxWithTooltip
                                sx={{
                                    display: 'flex',
                                    alignItems: "center"
                                }}
                                placement={"left"}
                                title={`Gadget Potency`}
                            >
                                <MdFitnessCenter/> <Typography sx={{fontSize: "14px", paddingLeft: "4px"}}>x{gadgetData.potency}</Typography>
                            </BoxWithTooltip>
                            {
                                gadgetData.baseHit != -99
                                ?
                                    <BoxWithTooltip
                                        sx={{
                                            display: 'flex',
                                            alignItems: "center"
                                        }}
                                        placement={"left"}
                                        title={`Gadget Base Hit`}
                                    >
                                        <MdAdsClick /> <Typography sx={{fontSize: "14px", paddingLeft: "4px"}}>{getSkillFormat(gadgetData.baseHit)}</Typography>
                                    </BoxWithTooltip>
                                    :
                                    <></>
                            }

                        </Box>
                    :
                    <></> )

                }

                <Box
                    sx={{
                        padding: "8px"
                    }}
                >
                    {
                        scaleWithCharacter ?
                        gadgetData.effects.map((data, index) => {
                            return <CardEffect effectData={data} key={index} finalPower={finalPower}/>
                        })
                            :
                        gadgetData.effects.map((data, index) => {
                            return <CardEffect effectData={data} key={index}/>
                        })
                    }
                </Box>


            </Paper>
        </Box>
    )
}

export default GadgetCard