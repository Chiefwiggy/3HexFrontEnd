import React, {useEffect, useState} from 'react';
import {Box, IconButton, TableCell, Typography} from "@mui/material";
import {getSkillFormat} from "../../Utils/Shorthand";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import DefensiveStatPopover from "../Defenses/DefensiveStatPopover";
import GrayBox from "../Defenses/GrayBox";
import ClickPopup from "../Generic/ClickPopup";
import {ISkillPointObject} from "../../Data/ICharacterData";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";

interface ISkillCellInput {
    skillName: string,
    invokeUpdate: () => void
}

const SkillCell = ({
    skillName,
    invokeUpdate
}: ISkillCellInput) => {

    const {currentSheet, charPing, cancelPing, isInEditMode, statPing} = useCharacter();

    useEffect(() => {
        if (currentSheet) {
            const {value, isExpert} = currentSheet.getSkillData(skillName.toLowerCase());
            setHasExpert(isExpert);
            setSkillValue(value);
        }
    }, [charPing, cancelPing, statPing]);

    useEffect(() => {
        if (currentSheet) {
            const {value, isExpert} = currentSheet.getSkillData(skillName.toLowerCase());
            setHasExpert(isExpert);
            setSkillValue(value);
        }
    }, []);

    const [hasExpert, setHasExpert] = useState(false);
    const [skillValue, setSkillValue] = useState<number>(0)

    const handleChangeSP = (val: number) => (event: React.MouseEvent) => {
        if (currentSheet) {
            currentSheet.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject] += val;
            const {value} = currentSheet.getSkillData(skillName.toLowerCase());
            setSkillValue(value);
            invokeUpdate();
        }
    }


    return currentSheet ? (
        <>
            <TableCell>
                <Typography
                    sx={ hasExpert ? {
                        fontWeight: "bold"
                    } : {}}
                >{skillName} {hasExpert ? "*" : ""}</Typography>
            </TableCell>
            <TableCell>
                {
                    isInEditMode ?
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: 2
                                }}
                            >
                                <IconButton
                                    onClick={handleChangeSP(-1)}
                                    disabled={currentSheet.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject] <= 0}
                                >
                                    <RemoveCircleOutlined />
                                </IconButton>
                                <Typography
                                    sx={ currentSheet.isSkillCapped(skillName.toLowerCase(), true) ? {
                                        color: "red"
                                    } : {}}
                                >{getSkillFormat(skillValue)}</Typography>
                                <IconButton
                                    onClick={handleChangeSP(1)}
                                    disabled={
                                        currentSheet.getSkillPointsUsed() >= currentSheet.getMaxSkillPoints()
                                        ||
                                        currentSheet.isSkillCapped(skillName.toLowerCase())
                                    }
                                >
                                    <AddCircleOutlined />
                                </IconButton>

                                <Typography>{currentSheet.data.skillPoints[skillName.toLowerCase() as keyof ISkillPointObject]} pts.</Typography>
                            </Box>
                        </>
                        :
                        <ClickPopup
                            clickElement={
                                <DefensiveStatPopover breakdown={currentSheet.getSkillBreakdown(skillName)} />
                            }
                            anchorOrigin={{
                                vertical: "center",
                                horizontal: "left"
                            }}
                            transformOrigin={{
                                vertical: "center",
                                horizontal: "right"
                            }}
                        >
                            <Typography
                                sx={ currentSheet.isSkillCapped(skillName.toLowerCase(), true) ? {
                                    color: "red"
                                } : {}}
                            >{getSkillFormat(skillValue)}</Typography>
                        </ClickPopup>
                }


            </TableCell>
        </>
    ) : <></>
}

export default SkillCell