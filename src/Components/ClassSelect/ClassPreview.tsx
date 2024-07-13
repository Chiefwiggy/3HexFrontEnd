import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassMetaData} from "../../Data/IClassMetaData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAffinities, IClassData} from "../../Data/ICharacterData";
import SelectAffinitiesDialog from "./SelectAffinitiesDialog";

interface IClassPreviewInput {
    classData: IClassMetaData,
    isEquipped: boolean,
    canEquip: boolean,
    sendBack: (doPick: boolean, classData: IClassData) => void
}

const ClassPreview = ({classData, isEquipped, canEquip, sendBack}: IClassPreviewInput) => {

    const {currentSheet} = useCharacter();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleEquipClassDialog = (open: boolean) => (event: React.MouseEvent) => {
        setDialogOpen(open);
    }

    const handleButton = (doPick: boolean, cancel=false, affinityData: IAffinities = {
        hex: 0,
        rune: 0,
        soul: 0,
        deft: 0,
        infantry: 0,
        guardian: 0,
        leadership: 0,
        erudite: 0,
        supply: 0,
        biohacking: 0,
        abjuration: 0,
        machinery: 0
    }) => (event: React.MouseEvent) => {
        setDialogOpen(false);

        if (!cancel) {
                sendBack(doPick, {
                className: classData.className,
                classExpertises: classData.classExpertises,
                downtimeActivities: classData.downtimeActivities,
                classTier: classData.classTier,
                affinities: affinityData,
            });
        }

    }

    return currentSheet && classData ? (
        <Box
            sx={{
                backgroundColor: "gray",
                padding: "40px"
            }}
        >
            {classData.className}
            <br/>
            {
                isEquipped
                    ?
                    <Button
                        onClick={handleButton(false)}
                    >
                        Remove
                    </Button>
                    :
                    <Button
                        disabled={!canEquip}
                        onClick={handleEquipClassDialog(true)}
                    >
                        Add
                    </Button>
            }
            <SelectAffinitiesDialog classData={classData} open={isDialogOpen} sendClose={handleButton}/>
        </Box>
    ) : <></>
}

export default ClassPreview