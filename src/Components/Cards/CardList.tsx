import React from 'react'
import {
    ICommonCardData, IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData, IWeaponCommonData
} from "../../Data/ICardData";
import {Grid} from "@mui/material";
import SpellBaseCard from "./SpellBaseCard";
import SpellTargetCard from "./SpellTargetCard";
import SpellModifierCard from "./SpellModifierCard";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import WeaponBaseCard from "./WeaponBaseCard";
import WeaponModCard from "./WeaponModCard";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import SpellTargetSummonCard from './SpellTargetSummonCard';


interface ICardListInput {
    cardList: Array<ICommonCardData>,
    onClickButton: (cardData: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    canFavorite?: boolean,
}

const CardList = ({
  cardList,
  onClickButton,
  isExpanded = false,
  canToggleExpand = true,
  isAdd = true,
  canFavorite = true
}: ICardListInput) => {

    return (
        <>
            {
                cardList.map((val: ICommonCardData) => {
                    if (val.cardType == "spell") {
                        switch (val.cardSubtype) {
                            case 'base':
                                return (
                                    <Grid item key={val.cardName}>
                                        <SpellBaseCard cardData={val as ISpellBaseCardData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            case 'target':
                                return (
                                    <Grid item key={val.cardName}>
                                        <SpellTargetCard cardData={val as ISpellTargetCardData} sendBack={onClickButton}
                                                         isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                         isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            case 'summon':
                                return (
                                    <Grid item key={val.cardName}>
                                        <SpellTargetSummonCard cardData={val as ISpellTargetCardData} sendBack={onClickButton}
                                                         isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                         isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            case 'skill':
                            case 'edict':
                                return (
                                    <Grid item key={val.cardName}>
                                        <SpellModifierCard cardData={val as ISpellModifierCardData}
                                                           sendBack={onClickButton}
                                                           isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                           isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )


                        }
                    } else {
                        switch (val.cardSubtype) {
                            case 'base':
                                return (
                                    <Grid item key={val.cardName}>
                                        <WeaponBaseCard cardData={val as IWeaponBaseData} enchantmentData={0} sendBack={onClickButton}
                                                        isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                        isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            default:
                                return (
                                    <Grid item key={val.cardName}>
                                        <WeaponModCard cardData={val as IWeaponCommonData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )


                        }
                    }


                })
            }
        </>
    )
}

export default CardList