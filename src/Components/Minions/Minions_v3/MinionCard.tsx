import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, Badge, Box, Checkbox, Chip, IconButton, Paper, TextField, Typography} from "@mui/material";
import {IMinionBaseData_New, IMinionRoleData} from "../../../Data/IMinionData_New";
import usePreloadedContent from "../../../Hooks/usePreloadedContent/usePreloadedContent";
import MinionSheet_v3 from "../../../Data/Minion/MinionSheet_v3";
import {FiEdit} from "react-icons/fi";
import IconButtonWithTooltip from "../../Generic/IconButtonWithTooltip";
import {MdOutlineSave} from "react-icons/md";
import {GiAxeSword, GiCancel} from "react-icons/gi";
import MinionStat from '../../../Data/Minion/MinionStat';
import AddSubtractPanel from "../../Generic/AddSubtractPanel";
import {IDowntimeActivity} from "../../../Data/IDowntime";
import {AutoFixHighOutlined, CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import {number} from "yup";
import CharacterSheetSidebar from "../../Character Sheet/CharacterSheetSidebar";
import MinionWeaponBuilder from "../MinionWeaponBuilder";
import MinionSpellBuilder from "../MinionSpellBuilder";
import {ICalculatedSpell, ICalculatedWeapon} from "../../../Data/ICharacterData";
import {ICommonCardData} from "../../../Data/ICardData";
import MinionWeaponCardWrapper from "../../CardBuilder/MinionWeaponCardWrapper";
import MinionSpellCardWrapper from "../../CardBuilder/MinionSpellCardWrapper";

interface IMinionCardInput {
    minionSheet: MinionSheet_v3
}

const MinionCard = ({minionSheet}: IMinionCardInput) => {

    const [isInEditMode, setEditMode] = useState(false)

    const [mping, _setPing] = useState(false)
    const {MinionMetadata} = usePreloadedContent()

    const ping = () => {
        _setPing(!mping)
    }

    const handleEdit = (state: boolean) => () => {
        setEditMode(state)
    }

    const handleSave = async() => {
        await minionSheet.SaveData();
        handleEdit(false)();
        invokeCallback()
    }

    const handleCancel = () => {
        minionSheet.RevertData();
        handleEdit(false)();
        invokeCallback()
    }

    const [currentPts, setCurrentPts] = useState(minionSheet.getCurrentStatPointsSpent())
    const [maxPts, setMaxPts] = useState(minionSheet.getMaxStatPoints())
    const [minionLevel, setMinionLevel] = useState(minionSheet.data.minionLevel)

    const [allRoleData, setAllRoleData] = useState<Array<IMinionRoleData>>(MinionMetadata.GetAllRoles())


    const [currentAutocompleteValues, setCurrentAutocompleteValues] = useState<Array<IMinionRoleData>>(minionSheet.rolesData);

    const handleAutocomplete = (event: SyntheticEvent<any>, value: Array<IMinionRoleData>) => {
        setCurrentAutocompleteValues(value)
        minionSheet.data.minionRoles = value.map(e => e.roleId)
    }

    const invokeCallback = () => {
        ping()
        setCurrentPts(minionSheet.getCurrentStatPointsSpent())
        setMaxPts(minionSheet.getMaxStatPoints())
        setMinionLevel(minionSheet.data.minionLevel)
    }

    const handleLevelChange = (delta: number) => (event: React.MouseEvent) => {
        minionSheet.data.minionLevel += delta
        ping()
        invokeCallback()
    }

    const setCurrentWeapon = async(data: ICalculatedWeapon, cards: Array<ICommonCardData>) => {
        console.log(data, cards);
        minionSheet.data.currentWeapon = data;
        minionSheet.data.cardData = [...minionSheet.data.cardData.filter(e => e.cardType != "weapon"), ...cards]
        ping()
    }

    const setCurrentSpell = async(data: ICalculatedSpell, cards: Array<ICommonCardData>) => {
        console.log(data, cards);
        minionSheet.data.currentSpell = data;
        minionSheet.data.cardData = [...minionSheet.data.cardData.filter(e => e.cardType != "spell"), ...cards]
        ping()
    }






    return minionSheet ? (
        <Paper
            elevation={2}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 5fr 1fr",
                    padding: "8px"
                }}
            >
                <Box></Box>
                <Box>
                     <Typography variant={"h5"} textAlign={"center"}>
                         {minionSheet.data.minionName}
                         <Badge
                             variant={"dot"}
                             component="span"
                             color={currentPts > maxPts ? "error" : "secondary"}
                             invisible={currentPts == maxPts}
                             sx={{
                                 marginLeft: "5px",
                                 marginTop: "-16px"
                             }}
                         />
                     </Typography>


                    {
                        isInEditMode ?
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignSelf: "center",
                                        justifySelf: "center"
                                    }}
                                >
                                    <AddSubtractPanel
                                        handleChange={handleLevelChange}
                                        value={minionLevel}
                                        isAtCap={minionLevel >= 60}
                                        isAtBottom={minionLevel <= 1}
                                        textWidth={64}
                                        textVariant={"body2"}
                                        textOverride={`Rank ${minionLevel}`}

                                    />
                                </Box>
                                <Autocomplete
                                    multiple
                                    filterSelectedOptions={true}
                                    onChange={handleAutocomplete}
                                    renderInput={(params) => {
                                        return <TextField {...params} label={""} placeholder={"Minion Roles"} />
                                    }}
                                    size={"small"}
                                    options={allRoleData}
                                    getOptionLabel={(option) => option.roleName}
                                    getOptionDisabled={(options) => currentAutocompleteValues.length >= minionSheet.getMaxRoles()}
                                    renderOption={(props: any, option, { selected }) => {
                                        return (
                                            <li {...props} key={option.roleId}>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlank fontSize={"small"} />}
                                                    checkedIcon={<CheckBox fontSize={"small"} />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.roleName}
                                            </li>
                                        );
                                    }}
                                    renderTags={(tagValue, getTagProps) => {
                                      return tagValue.map((option, index) => (
                                        <Chip {...getTagProps({ index })} key={option.roleId} label={option.roleName} size={"small"} />
                                      ))
                                    }}
                                    value={currentAutocompleteValues}
                                />
                                <Typography variant="body2" textAlign={"center"} color={currentPts > maxPts ? "red" : "white"}>Stat Points:  {currentPts}/{maxPts}</Typography>
                            </>
                            :
                            <>
                                <Typography variant="subtitle1" color={"grey"} textAlign={"center"}>{[`Rank ${minionSheet.data.minionLevel}`, ...currentAutocompleteValues.map(e => e.roleName)].join(" • ").toUpperCase()}</Typography>
                            </>
                    }

                </Box>

                    {
                        isInEditMode ?
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    paddingRight: "12px",
                                    paddingTop: "4px"
                                }}
                            >
                                <Box>
                                    <IconButtonWithTooltip title={`Save ${minionSheet.data.minionName}`} placement={"right"} onClick={handleSave} size={"small"}>
                                        <MdOutlineSave />
                                    </IconButtonWithTooltip>
                                </Box>
                                <Box>
                                    <IconButtonWithTooltip title={`Revert Changes`} placement={"right"} onClick={handleCancel} size={"small"}>
                                        <GiCancel />
                                    </IconButtonWithTooltip>
                                </Box>
                            </Box>
                            :
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: "12px",
                                    paddingTop: "4px"
                                }}
                            >
                                <Box>
                                    <IconButtonWithTooltip title={`Edit ${minionSheet.data.minionName}`} placement={"top"} onClick={handleEdit(true)} size={"small"}>
                                        <FiEdit />
                                    </IconButtonWithTooltip>
                                </Box>
                            </Box>
                    }
            </Box>
            <Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr"
                    }}
                >
                    <MinionStat minionSheet={minionSheet} stat={"might"}  isInEditMode={isInEditMode} callback={invokeCallback}/>
                    <MinionStat minionSheet={minionSheet} stat={"technique"} isInEditMode={isInEditMode} callback={invokeCallback}/>
                    <MinionStat minionSheet={minionSheet} stat={"toughness"} isInEditMode={isInEditMode} callback={invokeCallback}/>
                </Box>
            </Box>
            <Box>
                {
                    isInEditMode ?
                        <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <CharacterSheetSidebar
                        title={"Build Weapon"}
                        icon={GiAxeSword}
                        panelComponent={MinionWeaponBuilder}
                        placement={"left"}
                        tooltipPlacement={"left"}
                        panelProps={{
                            // currentWeaponId: formik.values.currentWeaponId,
                            // currentWeaponEnchantment: formik.values.currentWeaponEnchantment,
                            minionSheet: minionSheet,
                            receiveFinalData: setCurrentWeapon
                        }}
                    />
                            {
                                minionSheet.isUnlocked("spellcasting")
                                ?
                                    <CharacterSheetSidebar title={"Build Spell"} icon={AutoFixHighOutlined} panelComponent={MinionSpellBuilder} placement={"left"}
                                                           tooltipPlacement={"right"}
                                                           panelProps={{
                                                                minionSheet: minionSheet,
                                                                receiveFinalData: setCurrentSpell
                                                            }}
                                    />
                                    :
                                    <></>
                            }

                </Box>
                        :
                        <></>
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: "10px",
                    margin: "12px"
                }}
            >
                <Box>
                    {
                        minionSheet.data.currentWeapon != null ?
                            <MinionWeaponCardWrapper weaponData={minionSheet.data.currentWeapon} minionData={minionSheet} ping={mping}/>
                            :
                            <></>
                    }
                </Box>
                <Box>
                    {
                        minionSheet.data.currentSpell != null && minionSheet.isUnlocked("spellcasting") ?
                            <MinionSpellCardWrapper spellData={minionSheet.data.currentSpell} minionData={minionSheet} ping={mping} />
                            :
                            <></>
                    }
                </Box>
            </Box>
        </Paper>
    ) : <></>
}

export default MinionCard