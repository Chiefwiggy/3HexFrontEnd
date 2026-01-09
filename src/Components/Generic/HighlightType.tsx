import React from 'react';
import {capitalize, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import BoxWithTooltip from "./BoxWithTooltip";
import ConditionTooltip from "../Conditions/ConditionTooltip";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {GiFlyingDagger} from "react-icons/gi";
import { TypeColors } from "../../Utils/CardColorUtils";

interface IHighlightTypeInput {
    text: string;
    xval: number | undefined,
    fontSize?: string,
    component?: React.ElementType
}

const HighlightType = ({ text, xval, fontSize="0.8rem", component="div" }: IHighlightTypeInput) => {
    const parts = text.split(/(X|\[\[.*?\]\])/g);

    const {ConditionData} = usePreloadedContent();

    const GetTooltipText = (tag: string): React.ReactElement => {

        const newTag = tag.replace(/^\[\[(.*)]]$/, '$1');
        const tagParts = newTag.split(".");
        if (tagParts[0] == "condition") {
            const condData = ConditionData.GetConditionTagById(tagParts[1]);
            if (condData.conditionId == "unknown") return <Typography sx={{ fontSize: fontSize }} color="error" component={"span"}>{capitalize(tagParts[1])}</Typography>;
            return <ConditionTooltip placement={"top"} conditionData={condData} >{condData.conditionName}</ConditionTooltip>
        } else if (tagParts[0] == "damageType") {
            return <SubtypeDamageIcon damageSubtype={tagParts[1]} component={"span"} boxSx={{
                position: "relative",
                display: "inline-block",
                padding: 0,
                top: 3
            }} size={14}/>
        } else if (tagParts[0] == "color") {
            return <Typography color={TypeColors(tagParts[1])} component={"span"} fontSize={fontSize}>{tagParts.slice(2).join(".").replace(/'/g, "")}</Typography>
        }

        return <>{tag}</>
    }

    return (
        <Typography sx={{ fontSize: fontSize }} component={component}>
            {parts.map((part, index) =>
                (part === 'X' && xval != undefined) ? (
                    <Typography key={index} component="span" color="primary">
                        {xval}*
                    </Typography>
                ) : part.startsWith("[[") && part.endsWith("]]") ? (
                    <Typography key={index} component="span" color="secondary" sx={{ fontSize: fontSize }}>
                        {
                            GetTooltipText(part)
                        }
                    </Typography>
                ) : (
                    part
                )
            )}
        </Typography>
    );
};

export default HighlightType;
