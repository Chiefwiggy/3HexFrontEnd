import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {ICommonCardData} from "../../Data/ICardData";
import CardBuilder from "../../Layouts/CardBuilder";
import {default_spell_cards, default_weapon_cards} from "../../Data/default_cards";
import {
    DEFAULT_SPELL_CALC_TYPES,
    DEFAULT_WEAPON_CALC_TYPES,
    MINION_SPELL_CALC_TYPES
} from "../../Data/Card Calculators/DefaultCalculatorTypes";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import useUser from "../../Hooks/useUser/useUser";
import MinionSheet from "../../Data/MinionSheet";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";

interface IMinionSpellBuilderInput {
    closeSelf?: (event: React.MouseEvent) => void,
    minionSheet?: MinionSheet
}

const MinionSpellBuilder = ({
    closeSelf = () => {},
    minionSheet
}: IMinionSpellBuilderInput) => {


    const {ClassData, AffinityData, PathData, SourceData} = usePreloadedContent();

    const {userPermissions} = useUser();

    const GetAllCards = async(): Promise<Array<ICommonCardData>> => {
        const sd = SourceData.GetSourceDataForUser(userPermissions, "all").flatMap(e => e.sourceTiers.map(e => e.cardData));
        const filtered_sd = sd.reduce((pv: Array<ICommonCardData>, cv) => {
            if (pv.map(e => e._id).includes(cv._id)) {
                return pv;
            }
            return [...pv, cv]
        }, [])
        return [...AffinityData.getAllAffinityCards("spell"),
        ...PathData.getAllPathCards("spell"),
        ...ClassData.getAllClassCards("spell"), ...filtered_sd
           ].filter(e => e.cardSubtype != "edict")
    }

    const handleReceiveEquipCards = async(sentCards :Array<ICommonCardData|null>) => {

    }

    return minionSheet ? (
        <Box>
            <CardBuilder
                GetAllCards={GetAllCards}
                defaultCardList={default_spell_cards}
                cardTypes={MINION_SPELL_CALC_TYPES}
                cardCalculator={new SpellCardCalculator(MINION_SPELL_CALC_TYPES)}
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

export default MinionSpellBuilder