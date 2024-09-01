import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AffinitiesPanel from "../Components/ClassSelect/Affinities/AffinitiesPanel";
import ClassSelectPanel from "../Components/ClassSelect/ClassSelectPanel";
import {IClassData} from "../Data/ICharacterData";
import useCharacter from "../Hooks/useCharacter/useCharacter";

interface IClassSelectViewInput {

}

const ClassSelectView = ({}: IClassSelectViewInput) => {

    const {currentSheet} = useCharacter();
    const [myClasses, setMyClasses] = useState<Array<IClassData>>([]);

    useEffect(() => {
        if (currentSheet) {
            setMyClasses(currentSheet.data.classes);
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
            <ClassSelectPanel myClasses={myClasses} sendBack={handleSelectClass} />
            <AffinitiesPanel myClasses={myClasses}/>
        </Box>
    )
}

export default ClassSelectView