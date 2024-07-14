import React, {ChangeEvent, useEffect, useState, useRef, useLayoutEffect} from 'react'
import {
    Box,
    Button,
    ButtonPropsColorOverrides, capitalize,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, FormControl,
    IconButton, InputLabel, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";

import {CloseOutlined} from "@mui/icons-material";
import {AttributeActionTypes, BarDialogActionTypes} from "./AttributeBar";
import {UDamageType} from "../../Data/ICardData";

interface ChangeBarDataDialogInput {
    barName: string,
    handleClose: (value: number, crit: number, type: AttributeActionTypes, damageType: UDamageType) => () => void,
    isOpen: boolean,
    actionType: BarDialogActionTypes
}


const ChangeBarDataDialog = ({
     handleClose,
     isOpen,
     barName,
     actionType
 }: ChangeBarDataDialogInput) => {

    const [currentValue, setCurrentValue] = useState<string>("");
    const [currentCrit, setCurrentCrit] = useState("0");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.target.value);
    };

    const handleCritChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentCrit(event.target.value);
    }

    const textRef = useRef<HTMLInputElement>();
    const critRef = useRef<HTMLInputElement>();

    const [buttonColor, setButtonColor] = useState<any>("primary");

    const [damageType, setDamageType] = useState<UDamageType>("physical")

    const handleDamageTypeChange = (event: SelectChangeEvent) => {
        setDamageType(event.target.value as UDamageType);
    }

    useEffect(() => {
        if (isOpen) {

        } else {
            setCurrentValue("");
            setCurrentCrit("0");
            setDamageType("physical");
        }
        switch (actionType) {
            case "use":
            case "damage":
                setButtonColor("error")
                break;
            case "heal":
            case "recover":
                setButtonColor("stamina")
                break;
        }
    }, [isOpen]);

    useLayoutEffect(() => {
        if (textRef.current && isOpen) {
            textRef.current.focus();
        }
    }, [textRef.current, isOpen])


    return actionType ? (
        <Dialog
            open={isOpen}
        >

            <DialogTitle
                sx={{
                    textTransform: "capitalize"
                }}
            >
                {actionType} {barName}
            </DialogTitle>
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                }}
                onClick={handleClose(0, 0,'cancel', 'none')}
            >
                <CloseOutlined/>
            </IconButton>
            <Divider/>
            <FormControl>
                <DialogContent
                    sx={{
                        width: 400
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 4
                        }}
                    >
                        <TextField
                            variant={"standard"}
                            autoFocus={true}
                            inputRef={textRef}
                            label={capitalize(actionType)}
                            value={currentValue}
                            onChange={handleInputChange}
                            size={"medium"}
                            autoComplete={"off"}
                            fullWidth
                        />
                        {
                            actionType == "damage" ?
                                <Box>
                                    <Select
                                        value={damageType}
                                        onChange={handleDamageTypeChange}
                                        variant={"outlined"}
                                        size={"small"}
                                        sx={{
                                            marginTop: 2,
                                            width: "120px",
                                        }}
                                    >
                                        <MenuItem value={"physical"}>Physical</MenuItem>
                                        <MenuItem value={"magical"}>Magical</MenuItem>
                                        <MenuItem value={"raw"}>Raw</MenuItem>
                                        <MenuItem value={"resistant"}>Resistant</MenuItem>
                                    </Select>
                                </Box>
                                : <></>
                        }

                    </Box>
                    <br/>
                    {
                        actionType == "damage"
                            ?
                            <Box>
                                <TextField
                                    variant={"standard"}
                                    inputRef={critRef}
                                    label={"Critical"}
                                    value={currentCrit}
                                    onChange={handleCritChange}
                                    size={"small"}
                                    autoComplete={"off"}
                                    fullWidth
                                />
                            </Box>
                            :
                            <></>
                    }

                </DialogContent>
                <DialogActions>
                    {
                        actionType === "damage" ?
                            <>
                                <Button
                                    onClick={handleClose(Number(currentValue), Number(currentCrit), "damage", damageType)}
                                    color={"info"}
                                    variant={"contained"}
                                >
                                    Damage
                                </Button>
                            </>
                            :
                            <Button
                                onClick={handleClose(Number(currentValue), 0, actionType, "none")}
                                color={buttonColor}
                                variant={"contained"}
                            >
                                {actionType?.toUpperCase()}
                            </Button>
                    }

                </DialogActions>
            </FormControl>


        </Dialog>
    ) : <></>
}

export default ChangeBarDataDialog;