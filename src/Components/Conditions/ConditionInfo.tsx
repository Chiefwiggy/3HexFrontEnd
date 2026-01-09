import React from 'react';
import {Box, Divider, IconButton, Typography} from "@mui/material";
import {IConditionTag} from "../../Data/ICardData";
import ConditionTooltip from "./ConditionTooltip";
import {getConditionBorderColor} from "../../Utils/CardColorUtils";
import {TextUtils} from "../../Utils/TextUtils";
import HighlightType from "../Generic/HighlightType";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {FaBookAtlas} from "react-icons/fa6";
import useSnackbar from "../../Hooks/useSnackbar/useSnackbar";
import {FaCode} from "react-icons/fa6";

interface IConditionInfoInput {
    conditionData: IConditionTag
}

const ConditionInfo = ({conditionData}: IConditionInfoInput) => {

    const {ConditionData} = usePreloadedContent()
    const {SendToSnackbar} = useSnackbar()

    const copyConditionBlurb = async() => {
        const blurb = `[[condition.${conditionData.conditionId}]]`
        await navigator.clipboard.writeText(blurb)
        SendToSnackbar(`Copied ${blurb} to clipboard.`, "info")
    }

    return (
        <Box
            id={`condition-${conditionData.conditionId}`}
            sx={{
                scrollMarginTop: 96
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: `${getConditionBorderColor(conditionData)}66`,
                    borderRadius: 1,
                    margin: "8px",
                    padding: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Typography variant="h4" component="span">{conditionData.conditionName} </Typography>
                    <Typography variant="h6" component="span">TIER {conditionData.conditionTier}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Box>
                        <IconButton
                            size={"small"}
                            onClick={copyConditionBlurb}
                        >
                            <FaCode fontSize={"16px"} />
                        </IconButton>
                    </Box>
                </Box>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "12px",
                    gap: "10px"
                }}
            >
                <Typography><HighlightType text={TextUtils.Conditions.GetPopulatedDescription(conditionData)} xval={undefined} fontSize={"1rem"} /></Typography>
                {
                    conditionData.heighteningStackCount > 0 && (
                        <Typography>
                            <Typography component={"span"} fontWeight={"bold"}>Heighten ({conditionData.heighteningStackCount}). </Typography>
                            <HighlightType text={conditionData.heighteningDescription} xval={undefined} fontSize={"0.9rem"} component={"span"}/>
                        </Typography>
                    )
                }
                {conditionData.inverseConditionId && (
                    <Typography
                        sx={{
                            display: "block",
                            fontSize: "0.9rem",
                        }}
                    >
                        Inverse Condition:{" "}
                        <Box
                            component="a"
                            href={`#condition-${conditionData.inverseConditionId}`}
                            sx={{
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "inherit",
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            See {ConditionData.GetConditionTagById(conditionData.inverseConditionId).conditionName}
                        </Box>
                    </Typography>
                )}
                <Divider />
                <Typography color={"darkgray"} variant={"body2"}>{TextUtils.Conditions.GetCountdownDescription(conditionData)}</Typography>
            </Box>
        </Box>
    )
}

export default ConditionInfo