import React from 'react';
import {Box, SxProps, Tooltip, Typography} from "@mui/material";
import {IConditionTag} from "../../Data/ICardData";
import {KeyboardDoubleArrowUpOutlined} from "@mui/icons-material";
import {getConditionBorderColor} from "../../Utils/CardColorUtils";
import {TextUtils} from "../../Utils/TextUtils";

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







    return (
        <Tooltip
            title={
                <Box>
                    <Typography variant={"h6"}>{conditionData.conditionName} </Typography>
                    <Typography sx={{fontSize: "1.4em", color: "darkgray" }} variant={"body1"}>{conditionData.conditionType.toUpperCase()} </Typography>
                    <Typography variant={"body2"}>{TextUtils.Conditions.GetPopulatedDescription(conditionData)}</Typography>
                    <hr />
                    {
                        <Typography sx={{fontSize: "1.1em"}} variant={"body2"} color={"lightgrey"}>{TextUtils.Conditions.GetCountdownDescription(conditionData)}</Typography>
                    }
                </Box>
            }
            componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#232323',
                      border: `4px double ${getConditionBorderColor(conditionData)}`,
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