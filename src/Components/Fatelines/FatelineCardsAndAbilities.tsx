import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {IFatelineSidedData} from "../../Data/IFatelineData";
import {StringAction} from "../../Utils/StringReducer";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";
import UnlockWrapper from "../Unlocks/UnlockWrapper";
import {IAbility} from "../../Data/IAbilities";
import {ICommonCardData} from "../../Data/ICardData";

interface IFatelineCardsAndAbilitiesInput {
    sidedData: IFatelineSidedData,
    hasFateline: boolean,
    fatelineUnlocks: Array<string>
    invokeFatelineUnlocks: React.Dispatch<StringAction>
}

const FatelineCardsAndAbilities = ({
    sidedData,
    hasFateline,
    fatelineUnlocks,
    invokeFatelineUnlocks,
}: IFatelineCardsAndAbilitiesInput) => {

    const compendiumPropsTemplate = {
        isExpanded: true,
        canToggleExpand: false,
        canFavorite: false,
        isAdd: false,
        showAdd: false,
        showPrerequisites: false,
    }

    const [sidedFeatures, setSidedFeatures] = useState<Array<ICommonCardData|IAbility>>([])

    useEffect(() => {
        setSidedFeatures([...sidedData.cards, ...sidedData.abilities])
    }, [sidedData]);

    const updateUnlockList = (newUnlockList: Array<string>) => {
        invokeFatelineUnlocks({type: "set", strs: newUnlockList});
    }

    return (
        <Box>
            {
                disambiguateCard(sidedFeatures, {...compendiumPropsTemplate}).map((card, index) => {
                    if (card) {
                        return <UnlockWrapper el={card} _id={sidedFeatures[index]._id} key={index} unlockedByDefault={false} unlockList={fatelineUnlocks} updateUnlockList={updateUnlockList} isDisabled={!hasFateline} />
                    }
                })
            }
        </Box>
    )
}

export default FatelineCardsAndAbilities