import React from 'react';
import {Box} from "@mui/material";
import {FaDiceFour, FaDiceOne, FaDiceSix, FaDiceFive, FaDiceThree, FaDiceTwo, FaSquare, FaDice} from "react-icons/fa6";
import {IconBaseProps} from "react-icons";
import {UCritDie} from "../../Data/ICardData";
import {BsQuestionSquare, BsQuestionSquareFill} from "react-icons/bs";

interface IDieIconInput extends IconBaseProps{
    value: UCritDie
    mode?: "dark" | "light"
}

const DieIcon = ({value, mode="dark", ...iconProps}: IDieIconInput) => {

    const {size, style, ...otherProps} = iconProps;

    const nstyle = {
        color: "white",
        ...style
    }

    const s_diceStyle = {
        margin: `${typeof size == "number" ? size / 14 : 0}px ${typeof size == "number" ? size / 40 : 0}px`,
        ...nstyle
    }
    const renderIcon = (Icon: React.ElementType, iconSize = size, iconStyle = nstyle) => (
        <Box sx={{}} component={"span"}>
            <Icon {...otherProps} size={iconSize} style={iconStyle} />
        </Box>
    );

    switch (value) {
        case "1": return renderIcon(FaDiceOne);
        case "2": return renderIcon(FaDiceTwo);
        case "3": return renderIcon(FaDiceThree);
        case "4": return renderIcon(FaDiceFour);
        case "5": return renderIcon(FaDiceFive);
        case "6": return renderIcon(FaDiceSix);
        case "-": return renderIcon(FaSquare);
        case "?": return renderIcon(
            BsQuestionSquareFill,
            typeof size === "number" ? size * 0.88 : size,
            s_diceStyle
        );
    }
}

export default DieIcon