import React from 'react';
import {Box, Button, capitalize, Paper, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import ConditionInfo from "../Components/Conditions/ConditionInfo";
import {FaArrowAltCircleUp} from "react-icons/fa";

interface IConditionCompendiumInput {

}

function ArrowUpwardIcon() {
    return null;
}

const ConditionCompendium = ({}: IConditionCompendiumInput) => {

    const {ConditionData} = usePreloadedContent()

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // smooth scrolling
        });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "8fr 2fr"
                }}
            >
                <Box
                    sx={{
                        margin: "12px"
                    }}
                >
                    {
                        ["buff", "debuff"].map(type => {
                            return (
                                <Box>
                                    <Typography variant={"h3"}>{capitalize(type)}s</Typography>
                                    {
                                        [1,2,3].map(tier => {
                                            return (
                                                <Box key={`${tier}-${type}`}>
                                                    <Typography variant={"h4"}>Tier {tier}</Typography>
                                                    {
                                                        ConditionData.GetConditionTagsByTypeAndTier(type, tier).map(condition => {
                                                            return <ConditionInfo conditionData={condition} key={condition.conditionId} />
                                                        })
                                                    }
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box>
                    <Paper elevation={2}
                        sx={{
                            borderRadius: 4,
                            padding: "12px",
                            margin: "12px"
                        }}
                    >
                        <Typography variant="h4" textAlign={"center"}>Table of Contents</Typography>
                        {
                            ["buff", "debuff"].map(type => {
                                return (
                                    <Box>
                                        <Typography variant={"h5"}>{capitalize(type)}s</Typography>
                                        {
                                            [1,2,3].map(tier => {
                                                return (
                                                    <Box key={`${tier}-${type}-toc`}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column"
                                                        }}
                                                    >
                                                        <Typography variant={"h6"}>Tier {tier}</Typography>
                                                        {
                                                            ConditionData.GetConditionTagsByTypeAndTier(type, tier).map(condition => {
                                                                return (
                                                                    <Typography
                                                                        key={condition.conditionId}
                                                                        component="a"
                                                                        href={`#condition-${condition.conditionId}`}
                                                                        sx={{
                                                                            display: "block",
                                                                            cursor: "pointer",
                                                                            textDecoration: "none",
                                                                            color: "inherit",
                                                                        }}
                                                                    >
                                                                        <Typography component="span">• </Typography>
                                                                        <Typography
                                                                            component="span"
                                                                            sx={{
                                                                                '&:hover': {
                                                                                    textDecoration: 'underline',
                                                                                },
                                                                            }}
                                                                        >
                                                                            {condition.conditionName}
                                                                        </Typography>
                                                                    </Typography>
                                                                );
                                                            })
                                                        }

                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                )
                            })
                        }
                    </Paper>

                </Box>
            </Box>
            {/* Back to Top Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToTop}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    borderRadius: '50%',
                    minWidth: 0,
                    width: 48,
                    height: 48,
                    padding: 0,
                    zIndex: 1000,
                    boxShadow: 3,
                }}
            >
                <FaArrowAltCircleUp />
            </Button>


        </Box>
    )
}

export default ConditionCompendium