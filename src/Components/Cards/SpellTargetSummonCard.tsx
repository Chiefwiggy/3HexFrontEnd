import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import {ISpellTargetCardData} from "../../Data/ICardData";
import GenericCardLayout, {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import StatShieldWithSecondary from "../SmallComponents/StatShieldWithSecondary";
import {FaHeartbeat} from "react-icons/fa";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {BackHandOutlined} from "@mui/icons-material";
import NumericIcon from "./NumericIcon";
import {
    GiArcheryTarget,
    GiBorderedShield,
    GiBrokenShield,
    GiClockwork,
    GiFist,
    GiRun,
    GiRuneSword
} from "react-icons/gi";
import {getSkillFormat} from "../../Utils/Shorthand";
import {FaRegClock} from "react-icons/fa6";

interface ISpellTargetSummonCardInput {
    cardData: ISpellTargetCardData
    sendBack: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    showPrerequisites?: boolean
}

const SpellTargetSummonCard = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd = true,
    canFavorite = true,
    showPrerequisites=false
}: ISpellTargetSummonCardInput) => {


    return cardData.summonData ? (
        <GenericCardLayout cardData={cardData} sendBack={sendBack} isExpanded={isExpanded} canToggleExpand={canToggleExpand} isAdd={isAdd} canFavorite={canFavorite} showPrerequisites={showPrerequisites} showAdd={showAdd}>
            <Box>
                <Box
                    aria-description={"header"}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: "flex-end"
                        }}
                    >
                        <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardData.summonData.simpleName}</Typography> <Typography sx={{fontSize: "12px", color: "grey"}}>{cardData.summonData.summonSize.toUpperCase()}</Typography>
                    </Box>
                    <BoxWithTooltip
                        sx={{
                            display: 'flex',
                            alignItems: "center"
                        }}
                        placement={"top"}
                        title={`Summon Health = ${cardData.summonData.maxHealth.scalingStat} + ${cardData.summonData.maxHealth.baseValue}`}
                    >
                        <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>+{cardData.summonData.maxHealth.baseValue}</Typography><FaHeartbeat />
                    </BoxWithTooltip>

                </Box>
                <Divider sx={{flexGrow: 1}} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr"
                    }}
                >


                    <NumericIcon fontSize={"16px"} val={`+${cardData.powerMod?.modifier ?? 0}`} icon={GiFist} title={`damage = ${cardData.powerMod?.modifier ?? 0 }`} />
                    <NumericIcon fontSize={"16px"} align="center" val={`${getSkillFormat(cardData.spellSetMod?.modifier ?? 0)}`} icon={GiArcheryTarget} title={`To Hit = ${getSkillFormat(cardData.spellSetMod?.modifier ?? 0)}`} />
                    <NumericIcon fontSize={"16px"} align="right" val={` +${cardData.durationMod?.modifier ?? 0}`} icon={FaRegClock} title={`duration += ${cardData.durationMod?.modifier ?? 0}`}/>

                    <NumericIcon fontSize={"16px"} val={cardData.summonData.pDEF.baseValue} icon={GiBorderedShield} title={`pDEF = ${cardData.summonData.pDEF.baseValue }`} />
                    <NumericIcon fontSize={"16px"} align="center" val={cardData.summonData.mDEF.baseValue} icon={GiBrokenShield} title={`mDEF = ${cardData.summonData.mDEF.baseValue }`} />
                    <NumericIcon fontSize={"16px"} align="right" val={cardData.summonData.movement.baseValue} icon={GiRun} title={`Base Movement = ${cardData.summonData.movement.baseValue }`}/>
                </Box>

            </Box>
        </GenericCardLayout>
    ) : <>BROKEN CARD</>
}

export default SpellTargetSummonCard