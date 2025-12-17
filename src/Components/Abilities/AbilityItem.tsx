import React, {useEffect, useState} from 'react';
import {Box, capitalize, Collapse, IconButton, Paper, Typography} from "@mui/material";
import {IAbility} from "../../Data/IAbilities";
import {ExpandMoreOutlined} from "@mui/icons-material";
import {ExpandMore} from "../../Elements/ExpandMore";
import {GetPrerequisiteString} from "../../Utils/PrerequisiteString";
import HighlightType from "../Generic/HighlightType";
import {IoInformationCircleOutline} from "react-icons/io5";
import useSnackbar from "../../Hooks/useSnackbar/useSnackbar";

interface IAbilityItemInput {
    abilityData: IAbility,
    showPrerequisites?: boolean,
    isDraft?: boolean
}

const AbilityItem = ({abilityData, showPrerequisites = false, isDraft=false}: IAbilityItemInput) => {

    const [prereqString, setPrereqString] = useState<string>("None.")

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const str = GetPrerequisiteString(abilityData.prerequisites);
        if (str != "") {
            setPrereqString(str);
        }
        setIsOpen(false);
    }, [abilityData]);

    const {SendToSnackbar} = useSnackbar()

    const handleCopyInfo = async() => {
        await window.navigator.clipboard.writeText(abilityData._id)
        SendToSnackbar(`${abilityData._id} copied to clipboard`, "info")
    }



    return (
        <Box
            sx={{
                margin: "2px"
            }}
        >
            <Paper elevation={1} sx={{
                borderRadius: "12px",
                width: "16vw",
                minWidth: "264px",
                padding: '12px',
                textAlign: "center"
            }}>
                {/*Header*/}
                <Box>
                    <Typography variant={"h5"}>{abilityData.abilityName}</Typography>
                    {
                        showPrerequisites ?
                            <Typography
                                variant={"body2"}
                                sx={{
                                    color: "darkgray",
                                    fontSize: "12px"
                                }}
                            >
                                Requirements: {prereqString}
                            </Typography>
                            : <></>
                    }
                </Box>
                <Box
                    sx={{
                        '&::before': isDraft ? {
                            content: '""',
                            display: 'block',
                            marginTop: "2px",
                            height: '16px', // thickness of the caution tape
                            background: 'repeating-linear-gradient(45deg, yellow 0, yellow 10px, black 10px, black 20px)',
                        } : {}
                    }}
                >

                </Box>

                <Collapse in={isOpen} timeout={"auto"} unmountOnExit
                    sx={{
                        padding: "12px"
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "12px"
                        }}
                    >
                        {
                            abilityData.description.map((desc, index) => {
                                // return <Typography variant={"body2"} sx={{
                                //     fontSize: "14px",
                                //     textAlign: "left",
                                //     paddingBottom: "2px"
                                // }} key={index}>{desc}</Typography>
                                return <HighlightType text={desc} xval={0} key={index}/>
                            })
                        }
                    </Paper>

                </Collapse>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    {
                        isDraft ?
                            <></>
                            :
                            <IconButton
                                size={"small"}
                                aria-label={"use"}
                                onClick={handleCopyInfo}
                            >
                                <IoInformationCircleOutline />
                            </IconButton>
                    }
                    <ExpandMore
                      expand={isOpen}
                      onClick={() => setIsOpen(!isOpen)}
                      aria-expanded={isOpen}
                      aria-label="show more"
                    >
                        <ExpandMoreOutlined />
                    </ExpandMore>
                </Box>

            </Paper>
        </Box>
    )
}

export default AbilityItem