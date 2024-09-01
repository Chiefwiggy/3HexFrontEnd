import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {IAffinities, IClassData} from "../../Data/ICharacterData";
import {IClassMetaData} from "../../Data/IClassMetaData";
import MultiselectChoice from "./ChoiceElements/MultiselectChoice"
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface ISelectAffinitiesDialogInput {
    classData: IClassMetaData,
    open: boolean,
    sendClose: (doPick: boolean, cancel?: boolean, affinityData?: IAffinities) => (event: React.MouseEvent) => void,
    isPromotion: boolean,
    existingData: IClassData | undefined
}

const SelectAffinitiesDialog = ({
    classData,
    open,
    sendClose,
    isPromotion,
    existingData
}: ISelectAffinitiesDialogInput) => {

    const handleClose = (cancel: boolean) => (event: React.MouseEvent) => {
        sendClose(true, cancel, baseChoices)(event);
    }

    useEffect(() => {
        if (open) {
            setBaseChoices(existingData?.affinities ?? {
            abjuration: 0,
            biohacking: 0,
            deft: 0,
            erudite: 0,
            guardian: 0,
            hex: 0,
            infantry: 0,
            leadership: 0,
            machinery: 0,
            rune: 0,
            soul: 0,
            supply: 0
        })
        }
    }, [open]);

    const [baseChoices, setBaseChoices] = useState<IAffinities>(existingData?.affinities ??
        {
            abjuration: 0,
            biohacking: 0,
            deft: 0,
            erudite: 0,
            guardian: 0,
            hex: 0,
            infantry: 0,
            leadership: 0,
            machinery: 0,
            rune: 0,
            soul: 0,
            supply: 0
        }
    )


    return (
        <Dialog open={open} onClose={handleClose(true)}>
            <DialogTitle>{classData.className}</DialogTitle>
            <DialogContent>
                <MultiselectChoice choiceData={isPromotion ? classData.choices.prestigeChoice : classData.choices.baseChoice} choices={baseChoices} setChoices={setBaseChoices} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose(true)} variant={"contained"} color={"error"}>Cancel</Button>
                <Button onClick={handleClose(false)} variant={"contained"} color={"success"}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SelectAffinitiesDialog