import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {ICalculatedWeapon} from "../../Data/ICharacterData";
import MinionTemplateSheet from "../../Data/MinionTemplateSheet";
import CalculatedCard from "../CardBuilder/CalculatedCard";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IWeaponBaseData} from "../../Data/ICardData";

interface IMinionTemplateWeaponCardWrapperInput {
    weaponData: ICalculatedWeapon | null,
    overrideWidth?: number,
    minionData: MinionTemplateSheet
}

const MinionTemplateWeaponCardWrapper = ({
    weaponData,
    overrideWidth,
    minionData
}: IMinionTemplateWeaponCardWrapperInput) => {


    const [weaponCalc, setWeaponCalc] = useState<WeaponCardCalculator|null>(null);

    const [currentWeaponData, setCurrentWeaponData] = useState<Array<any>>([]);

    useEffect(() => {
        if (minionData) {
            const newCalc = new WeaponCardCalculator(minionData.getWeaponCalculatorTypes())
            setWeaponCalc(newCalc)
            _setWeaponData(newCalc);
        }

    }, []);

    useEffect(() => {
        if (minionData && weaponCalc) {
            _setWeaponData(weaponCalc);
        }
    }, [weaponData, minionData.data.cardData]);

    const _setWeaponData = (calc: WeaponCardCalculator, timeout = 0) => {
        if (minionData && weaponData) {
            let allCards = minionData.data.cardData;
            if (allCards) {
                const base: IWeaponBaseData = allCards.find(b => {
                    return b._id == weaponData.weaponBaseData.baseId
                }) as IWeaponBaseData
                const cards = weaponData.weaponCardsIds.map(skill => {
                        return allCards.find(b => b._id == skill)
                    })
                console.log(allCards)
                setCurrentWeaponData([base, ...cards]);

            }
        }
    }


    return minionData && weaponCalc ? (
        <CalculatedCard cardCalculator={weaponCalc} depArray={currentWeaponData} overrideName={weaponData?.customName ?? ""} overrideWidth={overrideWidth} owner={minionData}/>
    ) : <></>
}

export default MinionTemplateWeaponCardWrapper