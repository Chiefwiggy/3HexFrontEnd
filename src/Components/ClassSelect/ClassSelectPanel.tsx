import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    capitalize,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import ClassPreview from "./ClassPreview";
import {IClassData} from "../../Data/ICharacterData";
import {getTierFromName} from "../../Utils/Shorthand";

interface IClassSelectPanelInput {
    myClasses: IClassData[];
    sendBack: (doPick: boolean, classData: IClassData) => void
}

const ClassSelectPanel = ({
    myClasses,
    sendBack
}: IClassSelectPanelInput) => {

    const {currentSheet, invokeSave} = useCharacter();

    const {ClassData, isLoaded} = usePreloadedContent();

    const [allClassData, setAllClassData] = useState<Array<IClassMetaData>>([]);

    const [canPromote, setCanPromote] = useState<boolean>(false);

    const [canEquip, setCanEquip] = useState<boolean>(false);

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.classes = myClasses;
            currentSheet.setPreparedCards([]);
            currentSheet.data.currentWeapon = null;
            currentSheet.data.currentSpell = null;
            await currentSheet.SaveCharacterSheet();
        }
    }

    const handleSendBack = (doPick: boolean, classData: IClassData) => {
        sendBack(doPick, classData);
    }

    const setPromotionLogic = () => {
        if (currentSheet) {
            const tierNumber = getTierFromName(tier);
            let minLevel = 60 * (tierNumber - 1);
            const classesOfTier = myClasses.filter(clz => clz.classTier === tierNumber).length;
            const promotions = myClasses.filter(clz => clz.classTier === tierNumber && clz.isPromoted).length;
            console.log(minLevel, classesOfTier, promotions, currentSheet.getLevel());
            if (classesOfTier < 2 && currentSheet.getLevel() >= minLevel) {
                setCanEquip(true);
            } else {
                setCanEquip(false);
            }
            if (currentSheet.getLevel() >= (minLevel + ((promotions+1) * 20))) {
                setCanPromote(true);
            } else {
                setCanPromote(false);
            }
        }
    }

    const hasClass = (className: string) => {
        return myClasses.map(e => e.className.toLowerCase()).includes(className.toLowerCase());
    }

    const getMyClass = (className: string) => {
        return myClasses.find(e => e.className.toLowerCase() === className.toLowerCase());
    }

     const [tier, setTier] = useState('beginner');

    useEffect(() => {
        setPromotionLogic();
        setAllClassData(ClassData.getClassesData(getTierFromName(tier)));
    }, [isLoaded, myClasses, tier]);

    const handleChange = (event: SelectChangeEvent) => {
        setTier(event.target.value);
    };



    return currentSheet ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width:'100%'
                }}
            >
                <Box>
                    <FormControl fullWidth variant="outlined" sx={{ width: "150px"}}>
                      <InputLabel id="tier-select-label">Tier</InputLabel>
                      <Select
                        labelId="tier-select-label"
                        id="tier-select"
                        value={tier}
                        onChange={handleChange}
                        label="Tier"
                        fullWidth
                      >
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                        <MenuItem value="expert">Expert</MenuItem>
                        <MenuItem value="master">Master</MenuItem>
                        <MenuItem value="legend">Legend</MenuItem>
                      </Select>
                    </FormControl>
                </Box>
                <Typography variant="h5">{capitalize(tier)} Classes</Typography>
                <Button onClick={handleSave}> SAVE </Button>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    width: '100%'
                }}
            >
                {
                    allClassData.map(cd => {
                        return <ClassPreview classData={cd} isEquipped={hasClass(cd.className)} canEquip={canEquip} canPromote={canPromote} sendBack={handleSendBack} key={cd._id} equipData={hasClass(cd.className) ? getMyClass(cd.className) : undefined}/>
                    })
                }
            </Box>
        </Box>
    ) : <></>
}

export default ClassSelectPanel