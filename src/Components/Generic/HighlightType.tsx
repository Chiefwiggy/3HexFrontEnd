import React from 'react';
import {capitalize, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import BoxWithTooltip from "./BoxWithTooltip";
import ConditionTooltip from "../Conditions/ConditionTooltip";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import {GiFlyingDagger} from "react-icons/gi";

interface IHighlightTypeInput {
    text: string;
    xval: number | undefined
}

const HighlightType = ({ text, xval }: IHighlightTypeInput) => {
    const parts = text.split(/(X|\[\[.*?\]\])/g);

    const {ConditionData} = usePreloadedContent();

    const GetTooltipText = (tag: string): React.ReactElement => {

        const newTag = tag.replace(/^\[\[(.*)]]$/, '$1');
        const tagParts = newTag.split(".");
        if (tagParts[0] == "condition") {
            const condData = ConditionData.GetConditionTagById(tagParts[1]);
            if (condData.conditionId == "unknown") return <Typography sx={{ fontSize: "0.8rem" }} color="error" component={"span"}>{capitalize(tagParts[1])}</Typography>;
            return <ConditionTooltip placement={"top"} conditionData={condData} >{condData.conditionName}</ConditionTooltip>
        } else if (tagParts[0] == "damageType") {
            return <SubtypeDamageIcon damageSubtype={tagParts[1]} component={"span"} boxSx={{
                display: "inline",
                padding: 0,
            }} size={14}/>
        }

        return <>{tag}</>
    }

    return (
        <Typography sx={{ fontSize: "0.8rem" }}>
            {parts.map((part, index) =>
                (part === 'X' && xval != undefined) ? (
                    <Typography key={index} component="span" color="primary">
                        {xval}*
                    </Typography>
                ) : part.startsWith("[[") && part.endsWith("]]") ? (
                    <Typography key={index} component="span" color="secondary" sx={{ fontSize: "0.8rem" }}>
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
