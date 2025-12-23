import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {LockOpenOutlined, LockOutlined} from '@mui/icons-material';
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import {MdLocationDisabled} from "react-icons/md";

interface IUnlockWrapperInput {
    el: JSX.Element,
    _id: string,
    unlockedByDefault: boolean,
    unlockList: Array<string>,
    updateUnlockList: (newUnlockList: Array<string>) => void,
    isDisabled?: boolean
}

const UnlockWrapper = ({el, _id, unlockedByDefault, unlockList, updateUnlockList, isDisabled=false}: IUnlockWrapperInput) => {

    const [isCurrentlyUnlocked, setIsCurrentlyUnlocked ] = useState<boolean>(unlockList.includes(_id))

    useEffect(() => {
        setIsCurrentlyUnlocked(unlockList.includes(_id))
    }, [unlockList]);

    const setToUnlocked = () => {
        updateUnlockList([...unlockList, _id])
    }

    const setToLocked = () => {
        updateUnlockList(unlockList.filter(id => id !== _id))
    }


    return unlockedByDefault ? (
        <Box key={_id}>
            {el}
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Box key={_id}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#141414",
                    borderRadius: "12px"
                }}
            >
                {el}
                <IconButtonWithTooltip disabled={!isCurrentlyUnlocked && isDisabled} title={isCurrentlyUnlocked ? "Lock" : "Unlock"} placement={"right"} onClick={isCurrentlyUnlocked ? setToLocked : setToUnlocked}>
                    {
                        isCurrentlyUnlocked ?
                            <LockOpenOutlined color={"success"} />
                            :
                            (
                                isDisabled ?
                                    <MdLocationDisabled color={"disabled"} />
                                    :
                                    <LockOutlined color={"error"}/>
                            )
                    }
                </IconButtonWithTooltip>


            </Box>
        </Box>
    )
}

export default UnlockWrapper