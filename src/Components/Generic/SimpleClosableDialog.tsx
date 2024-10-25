import React, {useState} from 'react'
import {
    Button,
    ButtonPropsVariantOverrides,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";


export interface IDialogButton {
    action: () => void,
    label?: string,
    color?: any,
    variant?: any,
    isIcon?: boolean,
    icon?: React.ReactNode,
    disableCondition?: boolean
}
interface ISimpleCloseableDialogInput {
    title: string,
    content?: React.ReactNode,
    buttons: Array<IDialogButton>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    fullWidth?: boolean,
    runOnClose?: () => void
}
const SimpleClosableDialog = ({
    title,
    content,
    buttons,
    isOpen,
    setIsOpen,
    fullWidth=false,
    runOnClose = () => {}
}: ISimpleCloseableDialogInput) => {

    const handleClose = () => {
        runOnClose();
        setIsOpen(false);
    }


    return (
        <Dialog
            open={isOpen}
            fullWidth={fullWidth}
        >
            <DialogTitle>{title}</DialogTitle>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
              onClick={handleClose}
            >
              <CloseOutlined />
            </IconButton>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                {
                    buttons.map((button, index) => {
                        if (button.isIcon) {
                            return (
                                <IconButton
                                    onClick={button.action}
                                    key={index}
                                    disabled={button?.disableCondition ?? false}
                                >
                                    {button.icon}
                                </IconButton>
                            )
                        } else {
                            return (
                                <Button
                                    onClick={button.action}
                                    key={index}
                                    color={button.color}
                                    variant={button.variant ?? "primary"}
                                    disabled={button?.disableCondition ?? false}
                                >
                                    {button.label}
                                </Button>
                            )
                        }
                    })
                }
            </DialogActions>
        </Dialog>
    )
}

export default SimpleClosableDialog;