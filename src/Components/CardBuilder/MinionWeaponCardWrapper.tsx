import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {ICalculatedWeapon} from "../../Data/ICharacterData";
import MinionSheet from "../../Data/MinionSheet";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IWeaponBaseData} from "../../Data/ICardData";
import CalculatedCard from "./CalculatedCard";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";

interface IMinionWeaponCardWrapperInput {
    weaponData: ICalculatedWeapon | null,
    overrideWidth?: number,
    minionData: MinionSheet
}

const MinionWeaponCardWrapper = ({
    weaponData,
    overrideWidth,
    minionData
}: IMinionWeaponCardWrapperInput) => {

    const {isReady, charPing} = useCharacter();

    const [weaponCalc, setWeaponCalc] = useState<WeaponCardCalculator|null>(null);

    const [currentWeaponData, setCurrentWeaponData] = useState<Array<any>>([]);

    useEffect(() => {
        if (minionData) {
            const newCalc = new WeaponCardCalculator(minionData.weaponCalculatorTypes)
            setWeaponCalc(newCalc)
            _setWeaponData(newCalc);
        }

    }, []);

    useEffect(() => {
        if (minionData && weaponCalc) {
            _setWeaponData(weaponCalc);
        }
    }, [isReady, weaponData, charPing]);

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
                setCurrentWeaponData([base, ...cards]);

            }
        }
    }

    return minionData && weaponCalc ? (
        <CalculatedCard cardCalculator={weaponCalc} depArray={currentWeaponData} overrideName={weaponData?.customName ?? ""} overrideWidth={overrideWidth} owner={minionData}/>
    ) : <></>
}

export default MinionWeaponCardWrapper;