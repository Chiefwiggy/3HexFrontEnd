import React from 'react';
import {Box, IconButton} from "@mui/material";
import {SiFoundryvirtualtabletop} from "react-icons/si";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IFoundryButtonInput {

}

const FoundryButton = ({}: IFoundryButtonInput) => {

    const {currentSheet} = useCharacter()

    function formatInlineTags(text: string) {
        return text.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
            const parts = inner.split('.').filter(Boolean);
            const word = parts.at(-1);

            if (!word) return text;

            const capitalized =
                word.charAt(0).toUpperCase() + word.slice(1);

            return `<span style="color: #80cbc4;">${capitalized}</span>`;
        });
    }

    const copyToClipboard = () => {
        if (currentSheet) {
            const finalObject = {
                "system.props.maxHealth": currentSheet.getMaxHealth().toString(),
                "system.props.maxStamina": currentSheet.getMaxStamina().toString(),
                "system.props.maxTether": currentSheet.getMaxTether().toString(),
                "system.props.maxOrders": currentSheet.getMaxOrders().toString(),
                "system.props.maxTechnik_pre": currentSheet.getMaxTechnik().toString(),
                "system.props.stamina_refresh": currentSheet.getStaminaRefresh().toString(),
                "system.props.tether_refresh": currentSheet.getTetherRefresh().toString(),
                "system.props.action_points_max": currentSheet.getActionPointsMax().toString(),
                "system.props.pDEF_evade": currentSheet.getEvadePDEF().toString(),
                "system.props.pDEF_block": currentSheet.getBlockPDEF().toString(),
                "system.props.mDEF_evade": currentSheet.getEvadeMDEF().toString(),
                "system.props.mDEF_block": currentSheet.getBlockMDEF().toString(),
                "system.props.dodge_evade": currentSheet.getEvadePDEF().toString(),
                "system.props.dodge_block": currentSheet.getBlockDodge().toString(),
                "system.props.technik_reduction": currentSheet.getLockedTechnik().toString(),
                "system.props.maxExpertiseDice": currentSheet.getExpertiseDice().toString(),
                "system.props.commander_cards": currentSheet.getPreparedCommanderCards().reduce((pv, cv) => {
                    return pv + `
                        <h3>${cv.cardName}</h3>
                    ` + cv.effects.reduce((pv2, cv2) => {
                        return pv2 + `
                            <p>${formatInlineTags(cv2.text)}</p>
                        `
                    }, "")
                }, "")
            }

            window.navigator.clipboard.writeText(JSON.stringify(finalObject, null, 2))
        }

    }

    return currentSheet ? (
        <Box
            sx={{
                mt: 1
            }}
        >
            <IconButtonWithTooltip title={"Copy to Foundry"} placement={"left"} onClick={copyToClipboard}>
                <SiFoundryvirtualtabletop />
            </IconButtonWithTooltip>
        </Box>
    )
        :
        <></>
}

export default FoundryButton