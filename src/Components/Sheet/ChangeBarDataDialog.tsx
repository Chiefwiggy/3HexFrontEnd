import React, {ChangeEvent, useEffect, useState, useRef, useLayoutEffect} from 'react'
import {
    Box,
    Button,
    ButtonPropsColorOverrides, capitalize,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TextField
} from "@mui/material";

import {CloseOutlined} from "@mui/icons-material";
import {AttributeActionTypes, BarDialogActionTypes} from "./AttributeBar";

interface ChangeBarDataDialogInput {
    barName: string,
    handleClose: (value: number, type: AttributeActionTypes) => () => void,
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.target.value);
    };

    const textRef = useRef<HTMLInputElement>();

    const [buttonColor, setButtonColor] = useState<any>("primary");

    useEffect(() => {
        if (isOpen) {

        } else {
            setCurrentValue("");
        }
        switch(actionType) {
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
              onClick={handleClose(0, 'cancel')}
            >
              <CloseOutlined />
            </IconButton>
            <Divider />
            <DialogContent
                sx={{
                    width: 400
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
            </DialogContent>
            <DialogActions>
                {
                    actionType === "damage" ?
                        <>
                            <Button
                                onClick={handleClose(Number(currentValue), "raw")}
                                color={"info"}
                                variant={"contained"}
                            >
                                RAW
                            </Button>
                            <Button
                                onClick={handleClose(Number(currentValue), "magical")}
                                color={"tether"}
                                variant={"contained"}
                            >
                                MAGICAL
                            </Button>
                            <Button
                                onClick={handleClose(Number(currentValue), "physical")}
                                color={buttonColor}
                                variant={"contained"}
                            >
                                PHYSICAL
                            </Button>
                        </>
                        :
                        <Button
                            onClick={handleClose(Number(currentValue), actionType)}
                            color={buttonColor}
                            variant={"contained"}
                        >
                            {actionType?.toUpperCase()}
                        </Button>
                }

            </DialogActions>

        </Dialog>
    ) : <></>
}

export default ChangeBarDataDialog;