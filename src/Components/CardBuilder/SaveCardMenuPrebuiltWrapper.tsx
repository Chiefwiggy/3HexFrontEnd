import React from 'react';
import {Box, Button, IconButton, Paper} from "@mui/material";
import {ICalculatedSpell, ICalculatedWeapon} from "../../Data/ICharacterData";
import PrebuiltWeaponCardWrapper from "./PrebuiltWeaponCardWrapper";
import PrebuiltSpellCardWrapper from "./PrebuiltSpellCardWrapper";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import {SaveOutlined} from "@mui/icons-material";
import {MdMoveDown, MdOutlineDeleteForever} from "react-icons/md";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useAPI from "../../Hooks/useAPI/useAPI";

interface ISaveCardMenuPrebuiltWrapperInput {
    cardData: ICalculatedWeapon | ICalculatedSpell
    cardType: "spell" | "weapon",
    closeSelf: (event: React.MouseEvent) => void
}

const SaveCardMenuPrebuiltWrapper = ({cardData, cardType, closeSelf}: ISaveCardMenuPrebuiltWrapperInput) => {

    const {currentSheet} = useCharacter();
    const {CharacterAPI} = useAPI();


    const handleEquipSavedCard = (isOffhand = false) => async(event: React.MouseEvent) => {
        console.log("I COMPARE YA")
        if (currentSheet) {
            if (cardType === "weapon") {
                const weaponData = cardData as ICalculatedWeapon;
                await CharacterAPI.SetPrepWeapon(currentSheet.data._id, weaponData);
                    currentSheet.setCurrentWeapon(weaponData);
                // if (isOffhand) {
                //     await CharacterAPI.SetOffhandPrepWeapon(currentSheet.data._id, weaponData);
                //     currentSheet.setOffhandWeapon(weaponData);
                // } else {
                //
                // }
            } else {
                const spellData = cardData as ICalculatedSpell;
                await CharacterAPI.SetPrepSpell(currentSheet.data._id, spellData);
                currentSheet.setCurrentSpell(spellData);
            }
            closeSelf(event)
        }
    }

    const handleDeleteSavedCard = async (event: React.MouseEvent) => {
        if (currentSheet) {
            if (cardType === "weapon") {
                const weaponData = cardData as ICalculatedWeapon;

                const newArray = currentSheet.data.createdWeapons.filter(item =>
                    item.weaponBaseData.baseId !== weaponData.weaponBaseData.baseId ||
                    item.weaponCardsIds.length !== weaponData.weaponCardsIds.length ||
                    !item.weaponCardsIds.every((id, index) => id === weaponData.weaponCardsIds[index]))

                currentSheet.data.createdWeapons = newArray;

            } else {
                const spellData = cardData as ICalculatedSpell;
                const newArray = currentSheet.data.createdSpells.filter(item =>
                    item.spellBaseId !== spellData.spellBaseId ||
                    item.spellTargetId !== spellData.spellTargetId ||
                    !item.spellSkillsIds.every((id, index) => id === spellData.spellSkillsIds[index]))

                currentSheet.data.createdSpells = newArray;
            }

            currentSheet.manualCharPing()
            await CharacterAPI.UpdateCharacter(currentSheet.data._id, currentSheet.data);
        }
    }


    return (
        <Box>
            <Box>
            {
                cardType === "weapon" ?
                    <PrebuiltWeaponCardWrapper weaponData={cardData as ICalculatedWeapon} overrideWidth={19}/>
                    :
                    <PrebuiltSpellCardWrapper spellData={cardData as ICalculatedSpell} overrideWidth={19}/>
            }
            </Box>
            <Paper elevation={3} sx={{
                borderRadius: "0 0 12px 12px",
                padding: "6px",
                marginTop: "-3px"
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <IconButtonWithTooltip title={"Delete"} placement={"bottom"} onClick={handleDeleteSavedCard}><MdOutlineDeleteForever color={"firebrick"}/></IconButtonWithTooltip>
                    <Box>
                        <IconButtonWithTooltip title={"Equip"} placement={"bottom"} onClick={handleEquipSavedCard(false)}><MdMoveDown /></IconButtonWithTooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default SaveCardMenuPrebuiltWrapper