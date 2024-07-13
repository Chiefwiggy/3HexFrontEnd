import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import ClassPreview from "./ClassPreview";
import {IClassData} from "../../Data/ICharacterData";

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

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.classes = myClasses;
            currentSheet.setPreparedCards([]);
            currentSheet.data.currentWeapon = null;
            currentSheet.data.currentSpell = null;
            await currentSheet.SaveCharacterSheet();
        }
    }


    const hasClass = (className: string) => {
        return myClasses.map(e => e.className.toLowerCase()).includes(className.toLowerCase());
    }

    useEffect(() => {
        setAllClassData(ClassData.getClassesData());
    }, [isLoaded]);






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
                <Box></Box>
                <Typography variant="h5">Starter Classes</Typography>
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
                        return <ClassPreview classData={cd} isEquipped={hasClass(cd.className)} canEquip={myClasses.length < 2} sendBack={sendBack} key={cd._id} />
                    })
                }
            </Box>
        </Box>
    ) : <></>
}

export default ClassSelectPanel