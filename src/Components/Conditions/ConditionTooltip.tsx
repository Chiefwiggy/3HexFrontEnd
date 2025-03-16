import React from 'react';
import {Box, SxProps, Tooltip, Typography} from "@mui/material";
import {IConditionTag} from "../../Data/ICardData";
import {KeyboardDoubleArrowUpOutlined} from "@mui/icons-material";

interface IConditionTooltipInput {
    conditionData: IConditionTag
    placement: "top" | "bottom" | "left" | "right",
    sx?: SxProps<any>,
    component?: React.ElementType
    children: React.ReactNode
}


const ConditionTooltip = ({
    conditionData,
    placement,
    sx = {},
    component="span",
    children
}: IConditionTooltipInput) => {

    const GetPopulatedDescription = () => {
        const nCondData = conditionData.xVals.map(e => e);
        const output = conditionData.description[0].replace(/\[X(\d+)\]/g, (_: any, match: any) => {
          const index = parseInt(match, 10);
          const elem = conditionData.xVals[index];
          if (elem.basePower && elem.tierScaling) {
              return `${elem.basePower} (+${elem.tierScaling} per Prestige)`
          }
          return elem.basePower.toString() || "";
        });
        return output;
    }

    const GetCountdownDescription = () => {
        switch (conditionData.conditionCountdownType) {
            case "uses":
                return "Uses: This condition decrements by 1 everytime you would use the affected attribute. The condition is removed at the end of the Scene."
            case "decay1":
                return "Decay (1): At the start an affected creature's turn, the effect goes off, then its value is halved. The condition is then removed if the value of this condition is 1 or lower."
            case "decay10":
                return "Decay (10): At the start an affected creature's turn, the effect goes off, then its value is halved. The condition is then removed if the value of this condition is 10 or lower."
            case "rounds":
                return "Rounds: When all characters Refresh, decrement this condition by 1."
            case "onWounding":
                return "On Wound: When you take or receive Health damage, decrement this condition by 1."
            case "perFight":
                return "Encounter: Lasts for the remainder of the encounter."
            case "singleUse":
                return "Single Use: Effect is removed upon use."
            case "untilSaved":
                return "On Save: Effect lasts until you successfully save. Reattempt saves at the start of your turn."
            default:
                return "Contact Collin, this is missing."
        }
    }

    const getConditionBorderColor = () => {
        if (conditionData.conditionType == "buff") {
            switch(conditionData.conditionTier) {
                case 1:
                    return "#3d6a8e";
                case 2:
                    return "#30ca1f";
                case 3:
                    return "#c5b413";
                default:
                    return "black"
            }
        } else {
            switch(conditionData.conditionTier) {
                case 1:
                    return "#813c34";
                case 2:
                    return "#da2e3f";
                case 3:
                    return "#8b25bf";
                default:
                    return "black"
            }
        }
    }


    return (
        <Tooltip
            title={
                <Box>
                    <Typography variant={"h6"}>{conditionData.conditionName} </Typography>
                    <Typography sx={{fontSize: "1.4em", color: "darkgray" }} variant={"body1"}>{conditionData.conditionType.toUpperCase()} </Typography>
                    <Typography variant={"body2"}>{GetPopulatedDescription()}</Typography>
                    <hr />
                    {
                        <Typography sx={{fontSize: "1.1em"}} variant={"body2"} color={"lightgrey"}>{GetCountdownDescription()}</Typography>
                    }
                </Box>
            }
            componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#232323',
                      border: `4px double ${getConditionBorderColor()}`,
                      padding: "14px",
                    '& .MuiTooltip-arrow': {
                      color: '#121212',
                    },
                  },
                },
              }}
            placement={placement}  >
            <Box sx={sx} component={component}>
                {children}
            </Box>
        </Tooltip>
    )
}

export default ConditionTooltip