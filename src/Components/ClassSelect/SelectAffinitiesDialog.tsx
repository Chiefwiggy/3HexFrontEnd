import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {IAffinities, IClassData} from "../../Data/ICharacterData";
import {IClassChoiceData, IClassMetaData} from "../../Data/IClassMetaData";
import MultiselectChoice from "./ChoiceElements/MultiselectChoice"
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface ISelectAffinitiesDialogInput {
    choiceName: string,
    choiceData: IClassChoiceData,
    open: boolean,
    sendClose: (doPick: boolean, cancel?: boolean, affinityData?: IAffinities) => (event: React.MouseEvent) => void,
    existingData: IAffinities|undefined
}

const SelectAffinitiesDialog = ({
    choiceName,
    choiceData,
    open,
    sendClose,
    existingData
}: ISelectAffinitiesDialogInput) => {

    const handleClose = (cancel: boolean) => (event: React.MouseEvent) => {
        sendClose(true, cancel, baseChoices)(event);
    }

    useEffect(() => {
        if (open) {
            setBaseChoices(existingData ?? {
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
            abjuration: 0,
            biohacking: 0,
        })
        }
    }, [open]);

    const [baseChoices, setBaseChoices] = useState<IAffinities>(existingData ??
        {
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
            abjuration: 0,
            biohacking: 0,
        }
    )


    return (
        <Dialog open={open} onClose={handleClose(true)}>
            <DialogTitle>{choiceName}</DialogTitle>
            <DialogContent>
                <MultiselectChoice choiceData={choiceData} choices={baseChoices} setChoices={setBaseChoices} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose(true)} variant={"contained"} color={"error"}>Cancel</Button>
                <Button onClick={handleClose(false)} variant={"contained"} color={"success"}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SelectAffinitiesDialog