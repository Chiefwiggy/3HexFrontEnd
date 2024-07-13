import React, {useEffect, useState} from 'react';
import {Box, capitalize, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import {IClassChoiceData, IClassChoiceType} from "../../../Data/IClassMetaData";
import AffinityCheckbox from "./AffinityCheckbox"
import {IAffinities} from "../../../Data/ICharacterData";

interface IMultiselectChoiceInput {
    choiceData: IClassChoiceData,
    choices: IAffinities,
    setChoices: React.Dispatch<React.SetStateAction<IAffinities>>
}

const MultiselectChoice = ({choiceData, choices, setChoices}: IMultiselectChoiceInput) => {

    const [checkboxBoolean, setCheckboxBoolean] = useState<Array<boolean>>([]);
    const [disableNew, setDisableNew] = useState<boolean>(false);

    const updateAffinity = (affinity: keyof IAffinities, changeValue: number) => {
        const affCpy = choices;
        affCpy[affinity] += changeValue;
        setChoices(affCpy);
    }


    useEffect(() => {
        setCheckboxBoolean(new Array(choiceData.choices.length).fill(false));
    }, [choiceData]);


    const handleChange = (affinity: keyof IAffinities) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.name.split('-')[1]);
        const newCheckboxBoolean = [...checkboxBoolean];
        updateAffinity(affinity, event.target.checked ? 1 : -1);
        newCheckboxBoolean[index] = event.target.checked;
        setCheckboxBoolean(newCheckboxBoolean);
        setDisableNew((newCheckboxBoolean.filter(e => e).length >= choiceData.amount));
    }

    return (
        <Box>
            <FormControl component={"fieldset"} variant={"standard"}>
                <FormLabel component="legend">Choice Data (choose {choiceData.amount})</FormLabel>
                <FormGroup row>
                    {
                        choiceData.choices.map((cd, index) => {
                            return (
                                <AffinityCheckbox choiceData={cd} key={cd.choiceName} choiceNo={index}
                                                  value={checkboxBoolean[index]} handleChangeOuter={handleChange}
                                                  disableOuter={disableNew}/>
                            )
                        })
                    }
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default MultiselectChoice
