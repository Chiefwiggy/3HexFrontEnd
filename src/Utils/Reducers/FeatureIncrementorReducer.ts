import React from "react";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";

export type FeatureIncrementorAction = {type: "affinity", val: number} | {type: "weapon_specialization", val: number} | {type: "fateline_abilities", val: number} | {type: "favored_terrain", val: number} | {type: "setAll", vals: IFeatureIncrementor}


export interface IFeatureIncrementor {
    affinity: number,
    weapon_specialization: number,
    favored_terrain: number,
    fateline_abilities: number
}

export const FeatureIncrementorReducer = (state: IFeatureIncrementor, action: FeatureIncrementorAction): IFeatureIncrementor => {
    switch (action.type) {
        case "affinity":
            return {
                affinity: action.val,
                weapon_specialization: state.weapon_specialization,
                favored_terrain: state.favored_terrain,
                fateline_abilities: state.fateline_abilities,
            }
        case "weapon_specialization":
            return {
                affinity: state.affinity,
                weapon_specialization: action.val,
                favored_terrain: state.favored_terrain,
                fateline_abilities: state.fateline_abilities,
            }
        case "favored_terrain":
            return {
                affinity: state.affinity,
                weapon_specialization: state.weapon_specialization,
                favored_terrain: action.val,
                fateline_abilities: state.fateline_abilities,
            }
        case "fateline_abilities":
            return {
                affinity: state.affinity,
                weapon_specialization: state.weapon_specialization,
                favored_terrain: state.favored_terrain,
                fateline_abilities: action.val,
            }
        case "setAll":
            return action.vals
        default:
            return state
    }
}

export const featureIncrementorHelper = (dispatchFeatureIncrementor: React.Dispatch<FeatureIncrementorAction>, featureIncrementors: IFeatureIncrementor, feature: IAbility|ICommonCardData, isAdd: boolean) => {
    let modVal = 1
    if (!isAdd) {
        modVal = -1
    }
    if ("abilityName" in feature) {
        if ("affinityPoints" in feature.bonuses) {
            const bonuses = feature.bonuses as {affinityPoints: number};
            dispatchFeatureIncrementor({type: "affinity", val: featureIncrementors.affinity + (modVal*bonuses.affinityPoints)})
        }
        if ("favoriteTerrains" in feature.bonuses) {
            const bonuses = feature.bonuses as {favoriteTerrains: number};
            dispatchFeatureIncrementor({type: "favored_terrain", val: featureIncrementors.favored_terrain + (modVal*bonuses.favoriteTerrains)})
        }
        if ("weaponSpecializations" in feature.bonuses) {
            const bonuses = feature.bonuses as {weaponSpecializations: number};
            dispatchFeatureIncrementor({type: "weapon_specialization", val: featureIncrementors.weapon_specialization + (modVal*bonuses.weaponSpecializations)})
        }
        if ("fatelineUnlocks" in feature.bonuses) {
            const bonuses = feature.bonuses as {fatelineUnlocks: number};
            dispatchFeatureIncrementor({type: "fateline_abilities", val: featureIncrementors.fateline_abilities + (modVal*bonuses.fatelineUnlocks)})
        }
    }
}