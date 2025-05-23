import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import CardBuilder from "../Layouts/CardBuilder";
import {default_spell_cards} from "../Data/default_cards";
import useAPI from "../Hooks/useAPI/useAPI";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {ICalculatedSpell} from "../Data/ICharacterData";
import {ICommonCardData} from "../Data/ICardData";

interface IHackCardBuilderViewInput {
    closeSelf: (event: any) => void
}

const HackCardBuilderView = ({closeSelf}: IHackCardBuilderViewInput) => {
    const {CardAPI, CharacterAPI} = useAPI();
    const {currentSheet, charPing} = useCharacter();

    const [standbyCards, setStandbyCards] = useState<ICalculatedSpell|null>(null);
    const [standbyStyle, setStandbyStyle] = useState<React.ReactNode>(<></>);

    const [saveSpellDialog, setSaveSpellDialog] = useState<boolean>(false);
    const [customName, setCustomName] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomName(event.target.value);
    }




    const GetAllCards = async(): Promise<Array<ICommonCardData>> => {
        if (currentSheet) {
            return [...currentSheet.getPreparedSpellCards()]

        }
        return []
    }

    const handleReceiveSaveCards = async(sentCards: Array<ICommonCardData|null>, spellCopy: React.ReactNode) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];
        const base = cards.find(e => e.cardSubtype == "base");
        const target = cards.find(e => e.cardSubtype == "target" || e.cardSubtype == "summon") ;
        const rest = cards.filter(e => e.cardSubtype != "base" && (e.cardSubtype != "target" && e.cardSubtype != "summon"));
        if (base && target && rest && currentSheet) {
            const spellCalcData: ICalculatedSpell = {
                spellBaseId: base._id,
                spellTargetId: target._id,
                spellSkillsIds: rest.map(e => e._id)
            }
            setStandbyCards(spellCalcData);
            setSaveSpellDialog(true);
            setStandbyStyle(spellCopy);
        }
    }

    const handleEquip = async(sentCards: Array<ICommonCardData|null>) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];
        const base = cards.find(e => e.cardSubtype == "base");
        const target = cards.find(e => e.cardSubtype == "target" || e.cardSubtype == "summon") ;
        const rest = cards.filter(e => e.cardSubtype != "base" && (e.cardSubtype != "target" && e.cardSubtype != "summon"));
        if (base && target && rest && currentSheet) {
            const spellCalcData: ICalculatedSpell = {
                spellBaseId: base._id,
                spellTargetId: target._id,
                spellSkillsIds: rest.map(e => e._id)
            }
            await handleFinalEquip(spellCalcData);
        }
    }

    const handleCounter = async(sentCards: Array<ICommonCardData|null>) => {

    }


    const handleFinalSend = (doEquip: boolean) => async(event: React.MouseEvent) => {
        if (currentSheet && standbyCards) {
            if (customName != "") {
                standbyCards.customName = customName;
            }
            await CharacterAPI.AddPrepSpell(currentSheet.data._id, standbyCards)
            currentSheet.data.createdSpells.push(standbyCards);

            if (doEquip) {
                await handleFinalEquip(standbyCards);
            }
        }
        handleCloseSaveDialog(event);
    }



    const handleFinalEquip = async(spellData: ICalculatedSpell) => {
        if (currentSheet) {
            await CharacterAPI.SetPrepSpell(currentSheet.data._id, spellData);
                currentSheet.setCurrentSpell(spellData);
                closeSelf(null);
        }
    }

    const handleCloseSaveDialog = (event: React.MouseEvent) => {
        setSaveSpellDialog(false);
        setCustomName("");
        setStandbyCards(null);
    }

    return currentSheet ? (
        <>
            <CardBuilder
                GetAllCards={GetAllCards}
                defaultCardList={default_spell_cards}
                cardTypes={currentSheet.getHackCalculatorTypes()}
                cardCalculator={currentSheet.spellCalculator}
                closeSelf={closeSelf}
                sendSaveData={handleReceiveSaveCards}
                sendEquipData={handleEquip}
                sendCounterData={handleCounter}
                canCounter={false}
                owner={currentSheet}
            />
            <Dialog
                open={saveSpellDialog}
                onClose={handleCloseSaveDialog}
                fullWidth
            >
                <DialogTitle>
                    Save this Spell?
                </DialogTitle>
                <DialogContent>
                    {standbyStyle}
                    <TextField
                        autoFocus={true}
                        fullWidth={true}
                        label={"Custom Name"}
                        variant={"standard"}
                        margin={"dense"}
                        value={customName}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFinalSend(false)}>
                        Save
                    </Button>
                    <Button onClick={handleFinalSend(true)}>
                        Save and Equip
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    ) : <></>
}

export default HackCardBuilderView