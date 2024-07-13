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
}
interface ISimpleCloseableDialogInput {
    title: string,
    content?: React.ReactNode,
    buttons: Array<IDialogButton>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const SimpleClosableDialog = ({
    title,
    content,
    buttons,
    isOpen,
    setIsOpen
}: ISimpleCloseableDialogInput) => {

    const handleClose = () => {
        setIsOpen(false);
    }


    return (
        <Dialog
            open={isOpen}
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