import React from 'react';
import {Box} from "@mui/material";
import {ICommonCardData, IScaledWeaponBaseData} from "../../Data/ICardData";
import CardBuilder from "../../Layouts/CardBuilder";
import {default_weapon_cards} from "../../Data/default_cards";
import {DEFAULT_WEAPON_CALC_TYPES} from "../../Data/Card Calculators/DefaultCalculatorTypes";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import {ICalculatedWeapon} from "../../Data/ICharacterData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useUser from "../../Hooks/useUser/useUser";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import MinionSheet from "../../Data/MinionSheet";

interface IMinionWeaponBuilderInput {
    closeSelf?: (event: React.MouseEvent) => void
    currentWeaponId?: string,
    currentWeaponEnchantment?: number,
    minionSheet?: MinionSheet
}

const MinionWeaponBuilder = ({
    closeSelf = () => {},
    currentWeaponId = "",
    currentWeaponEnchantment = 0,
    minionSheet
}: IMinionWeaponBuilderInput) => {

    const {ClassData, AffinityData, PathData, WeaponData} = usePreloadedContent();



    const GetAllCards = async(): Promise<Array<ICommonCardData>> => {
        let finalWeaponTARRAY = []
        if (currentWeaponId) {
            const myWeapon = WeaponData.GetCardById(currentWeaponId)
            if (myWeapon) {
                myWeapon.tempEnchantValue = currentWeaponEnchantment;
                finalWeaponTARRAY.push(myWeapon);
            }
        }
        return [...AffinityData.getAllAffinityCards("weapon"),
        ...PathData.getAllPathCards("weapon"),
        ...ClassData.getAllClassCards("weapon"), ...finalWeaponTARRAY]
    }

    const handleReceiveEquipCards = async(sentCards :Array<ICommonCardData|null>) => {

    }

    return minionSheet ? (
        <Box>
            <CardBuilder
                GetAllCards={GetAllCards}
                defaultCardList={default_weapon_cards}
                cardTypes={DEFAULT_WEAPON_CALC_TYPES}
                cardCalculator={new WeaponCardCalculator(DEFAULT_WEAPON_CALC_TYPES)}
                closeSelf={closeSelf}
                sendSaveData={async(sentCards: Array<ICommonCardData|null>, spellCopy: React.ReactNode) => {}}
                sendEquipData={handleReceiveEquipCards}
                sendCounterData={async(sentCards: Array<ICommonCardData|null>) => {}}
                canCounter={false}
                canSave={false}
                owner={minionSheet}
            />
        </Box>
    ) : <></>
}

export default MinionWeaponBuilder