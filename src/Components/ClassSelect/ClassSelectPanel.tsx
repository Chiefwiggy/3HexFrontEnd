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
import {getNameFromTier, getTierFromName} from "../../Utils/Shorthand";
import FatelinePreview from '../Fatelines/FatelinePreview';
import {IFatelineData} from "../../Data/IFatelineData";
import characterSheet from "../../Data/CharacterSheet";

interface IClassSelectPanelInput {
    myClasses: IClassData[],
    myFate: IFatelineData|undefined,
    sendBack: (doPick: boolean, classData: IClassData) => void
    sendBackFate: (doPick: boolean, fateData: IFatelineData) => void
}

const ClassSelectPanel = ({
    myClasses,
    myFate,
    sendBack,
    sendBackFate
}: IClassSelectPanelInput) => {

    const {currentSheet, invokeSave} = useCharacter();

    const {ClassData, FatelineData, isLoaded} = usePreloadedContent();

    const [allClassData, setAllClassData] = useState<Array<IClassMetaData>>([]);

    const [canPromote, setCanPromote] = useState<boolean>(false);

    const [canEquip, setCanEquip] = useState<boolean>(false);

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.classes = myClasses;
            currentSheet.data.fateline = myFate;
            currentSheet.setPreparedCards([]);
            currentSheet.data.currentWeapon = null;
            currentSheet.data.currentSpell = null;
            await currentSheet.SaveCharacterSheet();
        }
    }

    const handleSendBack = (doPick: boolean, classData: IClassData) => {
        sendBack(doPick, classData);
    }

    const handleFateSendback = (doPick: boolean, fateData: IFatelineData) => {
        sendBackFate(doPick, fateData);
    }

    const setPromotionLogic = () => {
        if (currentSheet) {
            const tierNumber = getTierFromName(tier);
            let minLevel = 60 * (tierNumber - 1);
            const classesOfTier = myClasses.filter(clz => clz.classTier === tierNumber).length;
            const promotions = myClasses.filter(clz => clz.classTier === tierNumber && clz.isPromoted).length;
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
                            <MenuItem value="fate">Fateline</MenuItem>
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="intermediate">Intermediate</MenuItem>
                            <MenuItem value="advanced">Advanced</MenuItem>
                            <MenuItem value="expert">Expert</MenuItem>
                            <MenuItem value="master">Master</MenuItem>
                            <MenuItem value="legend">Legend</MenuItem>
                      </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography variant="h4">{capitalize(tier)} Classes</Typography>

                    {
                        tier != "fate" ?

                            (tier != "legend" ?
                            <>
                                <Typography variant={"subtitle2"}>Unlock Classes at Level {(getTierFromName(tier)-1)*60}</Typography>
                                <Typography variant={"subtitle2"}>Unlock Promotions at Level {(getTierFromName(tier)-1)*60 + 20} and {(getTierFromName(tier)-1)*60 + 40} </Typography>
                            </>
                            :
                            <>
                                <Typography variant={"subtitle2"}>Unlock Class at Level {(getTierFromName(tier)-1)*60}</Typography>
                            </>)
                            : <>
                                <Typography variant={"subtitle2"}>Choose a Fateline. This decision cannot be changed unless you undergo a major transformation</Typography>
                            </>
                    }


                </Box>

                <Button onClick={handleSave}> SAVE </Button>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    width: '100%',
                    maxHeight: "88vh",
                    overflowY: "auto",
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    scrollbarWidth: 'thin',
                }}
            >
                {
                    tier != "fate" ?
                    allClassData.map(cd => {
                        return <ClassPreview classData={cd} isEquipped={hasClass(cd.className)} canEquip={canEquip} canPromote={canPromote} sendBack={handleSendBack} key={cd._id} equipData={hasClass(cd.className) ? getMyClass(cd.className) : undefined}/>
                    })
                        :
                        FatelineData.GetAllFatelineData().map(fd => {
                            return <FatelinePreview key={fd.fatelineId} fateData={fd} isEquipped={myFate?.fatelineId === fd.fatelineId} canEquip={!myFate} equipData={myFate} sendBack={handleFateSendback} />
                        })
                }
            </Box>
        </Box>
    ) : <></>
}

export default ClassSelectPanel