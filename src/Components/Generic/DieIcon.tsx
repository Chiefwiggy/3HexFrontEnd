import React from 'react';
import {Box} from "@mui/material";
import {FaDiceFour, FaDiceOne, FaDiceSix, FaDiceFive, FaDiceThree, FaDiceTwo, FaSquare, FaDice} from "react-icons/fa6";
import {IconBaseProps} from "react-icons";
import {UCritDie} from "../../Data/ICardData";
import {BsQuestionSquare, BsQuestionSquareFill} from "react-icons/bs";

interface IDieIconInput extends IconBaseProps{
    value: UCritDie
}

const DieIcon = ({value, ...iconProps}: IDieIconInput) => {

    const {size, style, ...otherProps} = iconProps;

    const diceStyle = {
        margin: `${typeof size == "number" ? size / 14 : 0}px ${typeof size == "number" ? size / 40 : 0}px`,
        // margin: "3px 1px",
        ...style
    }
    switch (value) {
        case "1":
            return <FaDiceOne {...otherProps} size={size}  style={style}/>
        case "2":
            return <FaDiceTwo {...otherProps} size={size} style={style}/>
        case "3":
            return <FaDiceThree {...otherProps} size={size} style={style}/>
        case "4":
            return <FaDiceFour {...otherProps} size={size} style={style}/>
        case "5":
            return <FaDiceFive {...otherProps} size={size} style={style}/>
        case "6":
            return <FaDiceSix {...otherProps} size={size} style={style}/>
        case "-":
            return <FaSquare {...otherProps} size={size} style={style}/>
        case "?":
            return <BsQuestionSquareFill {...otherProps} size={typeof size == "number" ? size * 0.88 : size} style={diceStyle}/>
    }
}

export default DieIcon