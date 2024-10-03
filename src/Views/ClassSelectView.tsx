import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AffinitiesPanel from "../Components/ClassSelect/Affinities/AffinitiesPanel";
import ClassSelectPanel from "../Components/ClassSelect/ClassSelectPanel";
import {IClassData} from "../Data/ICharacterData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {IFatelineData} from "../Data/IFatelineData";

interface IClassSelectViewInput {

}

const ClassSelectView = ({}: IClassSelectViewInput) => {

    const {currentSheet} = useCharacter();
    const [myClasses, setMyClasses] = useState<Array<IClassData>>([]);
    const [myFate, setMyFate] = useState<IFatelineData|undefined>(undefined)

    useEffect(() => {
        if (currentSheet) {
            setMyClasses(currentSheet.data.classes);
            setMyFate(currentSheet.data.fateline);
        }
    }, []);

    const handleSelectClass = (doPick: boolean, classData: IClassData) => {
        if (doPick) {

            const exists = myClasses.find(e => e.className === classData.className);
            if (exists) {
                setMyClasses([...myClasses.filter(e => e.className.toLowerCase() !== classData.className.toLowerCase()), classData]);
            } else {
                setMyClasses([...myClasses, classData]);
            }
        } else {
            setMyClasses(myClasses.filter(e => e.className.toLowerCase() !== classData.className.toLowerCase()));
        }
    }

    const handleSelectFate = (doPick: boolean, fateData: IFatelineData) => {
        if (doPick) {
            setMyFate(fateData);
        } else {
            setMyFate(undefined);
        }
    }

    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100%",
                display: 'grid',
                gridTemplateColumns: "5fr 1fr",
                padding: "32px 12px"
            }}
        >
            <ClassSelectPanel myClasses={myClasses} myFate={myFate} sendBack={handleSelectClass} sendBackFate={handleSelectFate}/>
            <AffinitiesPanel myClasses={myClasses} myFate={myFate}/>
        </Box>
    )
}

export default ClassSelectView