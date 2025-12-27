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
import {IAffinities, IPathKeys, IPathKeysPlusAny} from "../../../Data/ICharacterData";

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

    const allAffinities = ["nimble", "infantry", "guardian", "focus", "creation", "alteration", "leadership", "supply", "summoning", "swift", "riding", "adaptation", "rune", "sourcecraft", "research", "proxy", "daemoncraft", "transduction"]

    const [affDropdown, setAffDropdown] = useState<keyof IAffinities | "">("");




    const affDataHardCode = {
        warrior: ["nimble", "infantry", "guardian"],
        arcanist: ["focus", "creation", "alteration"],
        commander: ["leadership", "supply", "summoning"],
        navigator: ["swift", "riding", "adaptation"],
        scholar: ["rune", "sourcecraft", "research"],
        hacker: ["transduction", "daemoncraft", "proxy"]
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
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IPathKeys][0] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[0]}
                            name={`cb-${choiceNo}-0`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IPathKeys][0])}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            value={localCheckboxes[1]}
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IPathKeys][1] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[1]}
                            name={`cb-${choiceNo}-1`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IPathKeys][1])}
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            value={localCheckboxes[2]}
                            onChange={handleChange(affDataHardCode[choiceData.choiceName as keyof IPathKeys][2] as keyof IAffinities)}
                            disabled={(disableNew || disableOuter )&& !localCheckboxes[2]}
                            name={`cb-${choiceNo}-2`}
                        />
                        }
                        label={capitalize(affDataHardCode[choiceData.choiceName as keyof IPathKeys][2])}
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