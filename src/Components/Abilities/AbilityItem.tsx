import React, {useEffect, useState} from 'react';
import {Box, capitalize, IconButton, Paper, Typography} from "@mui/material";
import {IAbility} from "../../Data/IAbilities";
import {ExpandMoreOutlined} from "@mui/icons-material";
import {ExpandMore} from "../../Elements/ExpandMore";

interface IAbilityItemInput {
    abilityData: IAbility,
    showPrerequisites?: boolean
}

const AbilityItem = ({abilityData, showPrerequisites = false}: IAbilityItemInput) => {

    const [prereqString, setPrereqString] = useState<string>("None.")

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const str = abilityData.prerequisites.map(prereq => {
            return `${capitalize(prereq.skill)} ${prereq.level}`
        }).join(", ");
        if (str != "") {
            setPrereqString(str);
        }
    }, [abilityData]);



    return (
        <Box
            sx={{
                margin: "2px"
            }}
        >
            <Paper elevation={2} sx={{
                borderRadius: "12px",
                maxWidth: '18vw',
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
                        display: isOpen ? "box" : "none",
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
                                return <Typography variant={"body2"} key={index}>{desc}</Typography>
                            })
                        }
                    </Paper>

                </Box>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
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