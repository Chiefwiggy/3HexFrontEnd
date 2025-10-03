import React from 'react'
import {
    ICommanderCardData,
    ICommonCardData,
    IHackBaseCardData,
    IHackIOCardData,
    IHackModifierCardData,
    IHackProtocolCardData,
    IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
    IWeaponCommonData
} from "../../Data/ICardData";
import {Grid} from "@mui/material";
import SpellBaseCard from "./SpellBaseCard";
import SpellTargetCard from "./SpellTargetCard";
import SpellModifierCard from "./SpellModifierCard";
import {ICardSendbackData} from "../../Layouts/GenericCardLayout";
import WeaponBaseCard from "./WeaponBaseCard";
import HackModifierCard from './HackModifierCard';
import WeaponModCard from "./WeaponModCard";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import SpellTargetSummonCard from './SpellTargetSummonCard';
import HackBaseCard from './HackBaseCard';
import HackProtocolCard from './HackProtocolCard';
import HackIOCard from './HackIOCard';
import CommanderCard from "./CommanderCard";


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
                    } else if (val.cardType == "weapon") {
                        switch (val.cardSubtype) {
                            case 'base':
                                return (
                                    <Grid item key={val.cardName}>
                                        <WeaponBaseCard cardData={val as IWeaponBaseData} enchantmentData={(val as IWeaponBaseData).tempEnchantValue ?? {enchantmentLevel: 0, baseId: ""}} sendBack={onClickButton}
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
                    } else if (val.cardType == "hack") {
                        switch (val.cardSubtype) {
                            case 'function':
                                return (
                                    <Grid item key={val.cardName}>
                                        <HackBaseCard cardData={val as IHackBaseCardData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            case 'io':
                                return (
                                    <Grid item key={val.cardName}>
                                        <HackIOCard cardData={val as IHackIOCardData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            case 'protocol':
                                return (
                                    <Grid item key={val.cardName}>
                                        <HackProtocolCard cardData={val as IHackProtocolCardData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                            default:
                                return (
                                    <Grid item key={val.cardName}>
                                        <HackModifierCard cardData={val as IHackModifierCardData} sendBack={onClickButton}
                                                       isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                       isAdd={isAdd} canFavorite={canFavorite}/>
                                    </Grid>
                                )
                        }
                    } else if (val.cardType == "commander") {
                        return (
                            <Grid item key={val.cardName}>
                                <CommanderCard cardData={val as ICommanderCardData}
                                                   sendBack={onClickButton}
                                                   isExpanded={isExpanded} canToggleExpand={canToggleExpand}
                                                   isAdd={isAdd} canFavorite={canFavorite}/>
                            </Grid>
                        )
                    }


                })
            }
        </>
    )
}

export default CardList