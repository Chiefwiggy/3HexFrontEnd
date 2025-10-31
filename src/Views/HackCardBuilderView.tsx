import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import CardBuilder from "../Layouts/CardBuilder";
import {default_hack_cards, default_spell_cards} from "../Data/default_cards";
import useAPI from "../Hooks/useAPI/useAPI";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {ICalculatedHack, ICalculatedSpell} from "../Data/ICharacterData";
import {ICommonCardData} from "../Data/ICardData";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";

interface IHackCardBuilderViewInput {
    closeSelf: (event: any) => void
}

const HackCardBuilderView = ({closeSelf}: IHackCardBuilderViewInput) => {
    const {CardAPI, CharacterAPI} = useAPI();
    const {currentSheet, charPing} = useCharacter();

    const {DatachipData} = usePreloadedContent();

    const [standbyCards, setStandbyCards] = useState<ICalculatedHack|null>(null);
    const [standbyStyle, setStandbyStyle] = useState<React.ReactNode>(<></>);

    const [saveHackDialog, setSaveHackDialog] = useState<boolean>(false);
    const [customName, setCustomName] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomName(event.target.value);
    }




    const GetAllCards = async(): Promise<Array<ICommonCardData>> => {
        if (currentSheet) {
            return [...currentSheet.getPreparedHackCards()]

        }
        return []
    }

    const handleReceiveSaveCards = async(sentCards: Array<ICommonCardData|null>, hackCopy: React.ReactNode) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];

        const base = cards.find(e => e.cardSubtype == "function");
        const io = cards.find(e => e.cardSubtype == "io");
        const protocol = cards.find(e => e.cardSubtype == "protocol");
        const rest = cards.filter(e => e.cardSubtype == "else" || e.cardSubtype == "util");

        if (base && io && protocol && rest && currentSheet) {
            const hackCalcData: ICalculatedHack = {
                hackFunctionId: base._id,
                hackIOId: io._id,
                hackProtocolId: protocol._id,
                hackCardsIds: rest.map(e => e._id)
            }
            setStandbyCards(hackCalcData);
            setSaveHackDialog(true);
            setStandbyStyle(hackCopy);
        }
    }

    const handleEquip = async(sentCards: Array<ICommonCardData|null>) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];
        const base = cards.find(e => e.cardSubtype == "function");
        const io = cards.find(e => e.cardSubtype == "io");
        const protocol = cards.find(e => e.cardSubtype == "protocol");
        const rest = cards.filter(e => e.cardSubtype == "else" || e.cardSubtype == "util");


        if (base && io && protocol && rest && currentSheet) {
            const hackCalcData: ICalculatedHack = {
                hackFunctionId: base._id,
                hackIOId: io._id,
                hackProtocolId: protocol._id,
                hackCardsIds: rest.map(e => e._id)
            }
            await handleFinalEquip(hackCalcData)
        }
    }

    const handleCounter = async(sentCards: Array<ICommonCardData|null>) => {

    }


    const handleFinalSend = (doEquip: boolean) => async(event: React.MouseEvent) => {
        if (currentSheet && standbyCards) {
            if (customName != "") {
                standbyCards.customName = customName;
            }
            await CharacterAPI.AddPrepHack(currentSheet.data._id, standbyCards)
            currentSheet.data.createdHacks.push(standbyCards);

            if (doEquip) {
                await handleFinalEquip(standbyCards);
            }
        }
        handleCloseSaveDialog(event);
    }



    const handleFinalEquip = async(hackData: ICalculatedHack) => {
        if (currentSheet) {
            await CharacterAPI.SetPrepHack(currentSheet.data._id, hackData);
                currentSheet.setCurrentHack(hackData);
                closeSelf(null);
        }
    }

    const handleCloseSaveDialog = (event: React.MouseEvent) => {
        setSaveHackDialog(false);
        setCustomName("");
        setStandbyCards(null);
    }

    const getDefaultCards = () => {
        if (currentSheet && DatachipData) {
            const datachipHacks = DatachipData.GetDatachipsFromIdList(currentSheet.data.knownDatachips).reduce((pv: Array<ICommonCardData>, datachip) => {
                return [...pv, ...datachip.builtinHacks]
            }, [])
            return [...default_hack_cards, ...datachipHacks]
        } else {
            return default_hack_cards
        }


    }

    return currentSheet ? (
        <>
            <CardBuilder
                GetAllCards={GetAllCards}
                defaultCardList={getDefaultCards()}
                cardTypes={currentSheet.getHackCalculatorTypes()}
                cardCalculator={currentSheet.hackCalculator}
                closeSelf={closeSelf}
                sendSaveData={handleReceiveSaveCards}
                sendEquipData={handleEquip}
                sendCounterData={handleCounter}
                canCounter={false}
                owner={currentSheet}
            />
            <Dialog
                open={saveHackDialog}
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