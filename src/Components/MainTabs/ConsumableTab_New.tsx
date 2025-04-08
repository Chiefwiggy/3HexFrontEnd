import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    capitalize,
    Checkbox,
    Chip,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useAPI from "../../Hooks/useAPI/useAPI";
import {ISourceData} from "../../Data/ISourceData";
import {IConsumableTemplate} from "../../Data/IConsumable";
import {GetConsumableCraftingColor, GetConsumableItemTypeColor} from "../../Utils/CardColorUtils";
import {CheckBox, CheckBoxOutlineBlank, FlipOutlined} from "@mui/icons-material";
import ConsumablePreparedCard from "../Items/ConsumablePreparedCard";
import {IConsumablePlayerData} from "../../Data/ICharacterData";
import ConsumableCard from "../Items/ConsumableCard";
import ConsumableCard_New from '../Items/ConsumableCard_New';

interface IConsumableTab_NewInput {

}

const ConsumableTab_New = ({}: IConsumableTab_NewInput) => {

    const {currentSheet} = useCharacter();
    const {ConsumableData} = usePreloadedContent();
    const {CharacterAPI} = useAPI();
    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [currentConsumables, setCurrentConsumables] = useState<Array<IConsumableTemplate>>([])

    const handleAutocomplete = (event: SyntheticEvent<any>, value: Array<IConsumableTemplate>) => {
        setCurrentConsumables(value)
        setJustUpdated(false)
    }



    const saveData = async() => {
        if (currentSheet) {
            const newConsumables = currentConsumables.map(cc => {
                return {
                    consumableId: cc._id,
                    amount: 0,
                    prepared: 0
                }
            })

            currentSheet.data.knownConsumables = newConsumables;
            await CharacterAPI.UpdateConsumables(currentSheet.data._id, newConsumables)
            currentSheet.manualCharPing()
            setJustUpdated(true);
            setShowStatus(true);
            setTimeout(() => {
                setShowStatus(false);
            }, 2000)
        }
    }

    const cancelSaveData = () => {
        if (currentSheet) {
            setJustUpdated(true);
            const consumableData = currentSheet.data.knownConsumables
              .map(cc => ConsumableData.GetConsumableById(cc.consumableId))
              .filter((c): c is IConsumableTemplate => c !== undefined);
            setCurrentConsumables(consumableData)
        }
    }

    useEffect(() => {
        cancelSaveData()
    }, []);





    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <FlipOutlined />
                    <Typography sx={{paddingLeft: "4px"}}>{currentSheet.getQuickSlots()} Slots</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "row-reverse",
                    }}
                >

                    <Button onClick={cancelSaveData} color={"error"} disabled={justUpdated}> Cancel </Button>
                    <Button onClick={saveData} color={"success"} disabled={justUpdated}> Save </Button>

                    <Alert severity="success" sx={{
                        transition: 'opacity 1s ease-out',
                        opacity: showStatus ? 1 : 0
                    }}> Success! </Alert>
                </Box>
            </Box>

            <Box>
                <Autocomplete
                    multiple
                    filterSelectedOptions={true}
                    onChange={handleAutocomplete}
                    renderInput={(params) => {
                        return (
                            <TextField {...params} label={""} placeholder={"Consumables"} />
                        )
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={option._id} // Make sure this key is stable and unique
                                    label={option.itemName}
                                    {...tagProps}
                                />
                            );
                        })
                    }
                    options={ConsumableData.GetAllConsumableData().sort((a,b) => {
                        if (a.craftingType != b.craftingType) {
                            return a.craftingType.localeCompare(b.craftingType);
                        } else if (a.itemType != b.itemType) {
                            return a.itemType.localeCompare(b.itemType);
                        } else if (a.itemTier != b.itemTier) {
                            return a.itemTier - b.itemTier
                        } else {
                            return a.itemName.localeCompare(b.itemName);
                        }
                    })}
                    value={currentConsumables}
                    getOptionLabel={(option) => option.itemName}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option, {selected}) => {
                        return (
                            <li key={option._id} {...props} >
                                <Box
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize={"small"}/>}
                                            checkedIcon={<CheckBox fontSize={"small"}/>}
                                            style={{marginRight: 8}}
                                            checked={selected}
                                        />
                                        <Typography sx={{
                                        }}>
                                            {option.itemName}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "6px"
                                        }}
                                    >
                                        <Chip
                                            label={capitalize(option.itemType)}
                                            sx={{
                                                backgroundColor: GetConsumableItemTypeColor(option.itemType)
                                            }}
                                        />
                                        <Chip
                                            label={capitalize(option.craftingType)}
                                            sx={{
                                                backgroundColor: GetConsumableCraftingColor(option.craftingType)
                                            }}
                                        />

                                    </Box>
                                </Box>


                            </li>
                        )
                    }}
                />
            </Box>
            <Box sx={{margin: "12px 0"}}>

            </Box>
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                        gridGap: "10px"
                    }}
                >
                    {
                        currentConsumables.map((consumable, index) => {
                            return (
                                <Box key={index}>
                                    <ConsumableCard_New consumableTemplate={consumable} defaultScaled={true}/>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    ) : <></>
}

export default ConsumableTab_New