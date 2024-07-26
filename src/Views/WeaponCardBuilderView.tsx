import React, {useState} from 'react'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {ICommonCardData, IScaledWeaponBaseData, IWeaponBaseData} from "../Data/ICardData";
import CardBuilder, {ICardBuilderType} from "../Layouts/CardBuilder";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import {default_spell_cards, default_weapon_cards} from "../Data/default_cards";
import useAPI from "../Hooks/useAPI/useAPI";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import WeaponCardCalculator from "../Data/Card Calculators/WeaponCardCalculator";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import {ICalculatedWeapon} from "../Data/ICharacterData";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";

interface IWeaponCardBuilderViewInput {
    closeSelf: (event: any) => void
}

const WeaponCardBuilderView = ({closeSelf}: IWeaponCardBuilderViewInput) => {

    const {CardAPI, CharacterAPI} = useAPI();
    const {currentSheet} = useCharacter();
    const {WeaponData} = usePreloadedContent();

    const [standbyCards, setStandbyCards] = useState<ICalculatedWeapon|null>(null);

    const [standbyStyle, setStandbyStyle] = useState<React.ReactNode>(<></>);

    const [saveWeaponDialog, setSaveWeaponDialog] = useState<boolean>(false);

    const [customName, setCustomName] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomName(event.target.value);
    }

    const GetAllCards = async(): Promise<Array<ICommonCardData>> => {
        if (currentSheet) {
            return [...currentSheet.getPreparedWeaponCards(), ...WeaponData.GetCardPreparedStruct(currentSheet.data.knownWeapons)];
        }
        return []
    }

    const handleReceiveSaveCards = async(sentCards: Array<ICommonCardData|null>, spellCopy: React.ReactNode) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];
        const base = cards.find(e => e.cardSubtype == "base") as IScaledWeaponBaseData;
        const rest = cards.filter(e => e.cardSubtype != "base");
        if (base && rest && currentSheet) {
            const weaponCalcData: ICalculatedWeapon = {
                weaponBaseData: {
                    baseId: base._id,
                    enchantmentLevel: base.enchantmentLevel
                },
                weaponCardsIds: rest.map(e => e._id)
            };
            setStandbyCards(weaponCalcData);
            setSaveWeaponDialog(true);
            setStandbyStyle(spellCopy);
        }
    }

    const handleReceiveEquipCards = async(sentCards :Array<ICommonCardData|null>) => {
        const cards: Array<ICommonCardData> = sentCards.filter(c => c !== null && c !== undefined) as ICommonCardData[];
        const base = cards.find(e => e.cardSubtype == "base");
        const rest = cards.filter(e => e.cardSubtype != "base");
        if (base && rest && currentSheet) {
            const weaponCalcData: ICalculatedWeapon = {
                // weaponBaseId: base._id,
                weaponBaseData: {
                    baseId: base._id,
                    enchantmentLevel: 0
                },
                weaponCardsIds: rest.map(e => e._id)
            };
            await handleFinalEquip(weaponCalcData);
        }
    }

    const handleFinalEquip = async(weaponData: ICalculatedWeapon) => {
        if (currentSheet) {
            await CharacterAPI.SetPrepWeapon(currentSheet.data._id, weaponData);
            currentSheet.setCurrentWeapon(weaponData);
            closeSelf(null);
        }
    }

    const handleFinalSend = (doEquip: boolean) => async(event: React.MouseEvent) => {
        if (currentSheet && standbyCards) {
            if (customName != "") {
                standbyCards.customName = customName;
            }
            await CharacterAPI.AddPrepWeapon(currentSheet.data._id, standbyCards);
            if (doEquip) {
                await handleFinalEquip(standbyCards);
            }
        }
    }

    const handleCloseSaveDialog = (event: React.MouseEvent) => {
        setSaveWeaponDialog(false);
        setCustomName("");
        setStandbyCards(null);
    }


    return currentSheet ? (
        <>
            <CardBuilder
                GetAllCards={GetAllCards}
                defaultCardList={default_weapon_cards}
                cardTypes={currentSheet.weaponCalculatorTypes}
                cardCalculator={currentSheet.weaponCalculator}
                closeSelf={closeSelf}
                sendSaveData={handleReceiveSaveCards}
                sendEquipData={handleReceiveEquipCards}
            />
            <Dialog
                open={saveWeaponDialog}
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

export default WeaponCardBuilderView