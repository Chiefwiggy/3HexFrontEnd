import React, {useEffect, useState} from 'react';
import {
    Box,
    capitalize,
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {IClassChoiceType} from "../../../Data/IClassMetaData";
import {IAffinities, IArcanaKeys, IArcanaKeysPlusAny} from "../../../Data/ICharacterData";

interface IAffinityCheckboxInput {
    choiceData: IClassChoiceType,
    choiceNo: number,
    value: boolean,
    handleChangeOuter: (affinity: keyof IAffinities) => (event: React.ChangeEvent<HTMLInputElement>) => void
    disableOuter: boolean
}

const AffinityCheckbox = ({
    choiceData,
    choiceNo,
    value,
    handleChangeOuter,
    disableOuter
}: IAffinityCheckboxInput) => {

    const [localCheckboxes, setLocalCheckboxes] = useState<Array<boolean>>([false, false, false]);

    const [disableNew, setDisableNew] = useState<boolean>(false);

    const allAffinities = ["deft", "infantry", "guardian", "hex", "soul", "rune", "leadership", "erudite", "supply", "machinery", "abjuration", "biohacking"]

    const [affDropdown, setAffDropdown] = useState<keyof IAffinities | "">("");




    const affDataHardCode = {
        warrior: ["deft", "infantry", "guardian"],
        arcane: ["hex", "soul", "rune"],
        support: ["leadership", "erudite", "supply"],
        hacker: ["machinery", "abjuration", "biohacking"]
    }

    const handleChange = (affinity: keyof IAffinities) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.name.split('-')[2]);
        const ncb = [...localCheckboxes];
        ncb[index] = event.target.checked;
        setLocalCheckboxes(ncb);
        setDisableNew((ncb.filter(e => e).length >= 1));
        handleChangeOuter(affinity)(event);
    }

    // useEffect(() => {
    //     if (choiceData.choiceName == "any") {
    //         // @ts-ignore
    //         const e2: React.ChangeEvent<HTMLInputElement> = {target: {name: "", checked: false}};
    //         e2.target.name = `cb-${choiceNo}`
    //         e2.target.checked = true;
    //         handleChangeOuter("deft")(e2);
    //         console.log("banchan");
    //     }
    // }, []);

    const handleDropdownChange = (event: SelectChangeEvent) => {
        setAffDropdown(event.target.value as keyof IAffinities);
        const e2 = event as React.ChangeEvent<HTMLInputElement>;
        e2.target.name = `cb-${choiceNo}`
        e2.target.checked = true;
        handleChangeOuter(event.target.value as keyof IAffinities)(e2);
        e2.target.checked = false;
        if (affDropdown != "") {
            handleChangeOuter(affDropdown)(e2)
        }
    }


    return choiceData.choiceType == "affinity" ? (
        <FormControlLabel
            control={
                <Checkbox
                    value={value}
                    onChange={handleChangeOuter(choiceData.choiceName as keyof IAffinities)}
                    disabled={disableOuter && !value}
                    name={`cb-${choiceNo}`}
                />
            }
            label={capitalize(choiceData.choiceName)}
        />
    ) : (
        <FormControlLabel
            control={ choiceData.choiceName != "any" ?
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox
                            value={localCheckboxes[0]}
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][0] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[0]}
                            name={`cb-${choiceNo}-0`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][0])}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            value={localCheckboxes[1]}
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][1] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[1]}
                            name={`cb-${choiceNo}-1`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][1])}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            value={localCheckboxes[2]}
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][2] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[2]}
                            name={`cb-${choiceNo}-2`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IArcanaKeys][2])}
                    />
                </FormGroup> :
                <FormControlLabel
                    sx={{
                        paddingLeft: "24px"
                    }}
                    control={
                        // <Checkbox
                        //     value={value}
                        //     onChange={handleChangeOuter(choiceData.choiceName as keyof IAffinities)}
                        //     disabled={disableOuter && !value}
                        //     name={`cb-${choiceNo}`}
                        // />
                        <Select
                            value={affDropdown}
                            onChange={handleDropdownChange}
                            sx={{
                                width: "120px"
                            }}
                        >
                            {
                                allAffinities.map(aff => {
                                    return <MenuItem value={aff} key={aff}>{capitalize(aff)}</MenuItem>
                                })
                            }

                        </Select>
                    }
                    label={""}
                />
            }
            label={""}
        />
    )
}

export default AffinityCheckbox;