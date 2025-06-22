import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AffinitiesPanel from "../Components/ClassSelect/Affinities/AffinitiesPanel";
import ClassSelectPanel from "../Components/ClassSelect/ClassSelectPanel";
import {IAffinitiesAndPath, IClassData} from "../Data/ICharacterData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {IFatelineData} from "../Data/IFatelineData";
import {GetPathAndAffinitiesFromClassList} from "../Utils/CalculateAffinities";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";

interface IClassSelectViewInput {

}

const ClassSelectView = ({}: IClassSelectViewInput) => {

    const {currentSheet} = useCharacter();
    const {DevelopmentData} = usePreloadedContent()
    const [myClasses, setMyClasses] = useState<Array<IClassData>>([]);
    const [myFate, setMyFate] = useState<IFatelineData|undefined>(undefined)
    const [myDev, setMyDev] = useState<Array<string>>([])
    const [affData, setAffData] = useState<IAffinitiesAndPath>({
        affinities: {
            nimble: 0,
            infantry: 0,
            guardian: 0,
            focus: 0,
            creation: 0,
            alteration: 0,
            leadership: 0,
            supply: 0,
            summoning: 0,
            swift: 0,
            riding: 0,
            adaptation: 0,
            rune: 0,
            sourcecraft: 0,
            research: 0,
            machinery: 0,
            biohacking: 0,
            abjuration: 0
        },
        path: {
            warrior: 0,
            arcanist: 0,
            commander: 0,
            navigator: 0,
            scholar: 0,
            hacker: 0
        }
    })

    useEffect(() => {
        const myList = DevelopmentData.GetDevelopmentAbilities().filter(e => myDev.includes(e._id))
        setAffData(GetPathAndAffinitiesFromClassList(myClasses, myFate, myList));
    }, [myClasses, myFate, myDev]);

    useEffect(() => {
        if (currentSheet) {
            setMyClasses(currentSheet.data.classes);
            setMyFate(currentSheet.data.fateline);
            setMyDev(currentSheet.data.developmentIds)
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

    const handleSelectDevelopment = (newDevList: Array<string>) => {
        setMyDev(newDevList)
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
            <ClassSelectPanel myClasses={myClasses} myFate={myFate} myDev={myDev} sendBack={handleSelectClass} sendBackFate={handleSelectFate} sendBackDev={handleSelectDevelopment}/>
            <AffinitiesPanel myClasses={myClasses} myFate={myFate} affData={affData}/>
        </Box>
    )
}

export default ClassSelectView