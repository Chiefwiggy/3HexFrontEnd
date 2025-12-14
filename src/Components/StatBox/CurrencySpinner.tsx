import React, {useEffect, useState} from 'react';
import {Box, capitalize} from "@mui/material";
import NumberSpinner from "../../Utils/NumberSpinner";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {ICurrencyData} from "../../Data/ICharacterData";

interface ICurrencySpinnerInput {
    currencyData: ICurrencyData;
    onChange: (newAmount: number) => void;
}

const CurrencySpinner = ({currencyData, onChange}: ICurrencySpinnerInput) => {

    const [currencyAmount, setCurrencyAmount] = useState<number>(currencyData.currencyAmount);

    useEffect(() => {
        setCurrencyAmount(currencyData.currencyAmount);
    }, [currencyData.currencyAmount]);


    const handleChange = (value: number | null) => {
        if (value !== null) {
            setCurrencyAmount(value);
            onChange(value)
        }
    };

    return (
        <Box>
            <NumberSpinner
                label={capitalize(currencyData.currencyStore) + " - " + capitalize(currencyData.currencyType)}
                min={0}
                size={"small"}
                onValueChange={handleChange}
                value={currencyAmount}
                step={15}
                stepLarge={100}
            />
        </Box>
    )
}

export default CurrencySpinner