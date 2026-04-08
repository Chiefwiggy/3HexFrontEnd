import React, {Dispatch, useEffect, useState} from 'react';
import {Box, capitalize, Tab, Tabs, Typography} from "@mui/material";
import {IMiscUnlockData} from "../../Data/ICharacterData";
import {MiscUnlockAction} from "../../Utils/MiscUnlockReducer";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";
import BannerTitle from "../Generic/BannerTitle";
import {getNameFromClassTier} from "../../Utils/Shorthand";
import UnlockWrapper from "../Unlocks/UnlockWrapper";

interface IWeaponSpecializationPanelInput {
    miscUnlocks: Array<IMiscUnlockData>,
    dispatchMiscUnlocks: Dispatch<MiscUnlockAction>
}

const WeaponSpecializationPanel = ({miscUnlocks, dispatchMiscUnlocks}: IWeaponSpecializationPanelInput) => {

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    const WEAPON_CATEGORY = "weapon_specialization"

    const [wsKey, setWsKey] = useState<number>(0)

    const {OtherSpecializationData, isLoaded} = usePreloadedContent()

    const [weaponFeatures, setWeaponFeatures] = useState<undefined | Record<string, Record<string, Array<ICommonCardData|IAbility>>>>(undefined)

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        setWeaponFeatures(OtherSpecializationData.GetFeaturesForCategorySplitBySubcategory(WEAPON_CATEGORY))

    }, [isLoaded])

    useEffect(() => {
        let mIndex = miscUnlocks.findIndex( e => e.categoryId == WEAPON_CATEGORY)
        if (mIndex == -1) {
            dispatchMiscUnlocks({type: "add_category", category: WEAPON_CATEGORY})
        }
        setWsKey(mIndex)
        console.log("STACK OVERFLOW")
    }, [miscUnlocks]);

    const updateUnlockList = (newUnlockList: Array<string>) => {
        dispatchMiscUnlocks({type: "set", category: WEAPON_CATEGORY, ids: newUnlockList})
    }

    return weaponFeatures ? (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 9fr"
                }}
            >
                <Box>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        variant={"fullWidth"}
                        orientation={"vertical"}
                    >
                        {
                            Object.keys(weaponFeatures).map((key, index) => {
                                return <Tab value={index} label={key.toUpperCase()} key={key} />
                            })
                        }
                    </Tabs>
                </Box>
                <Box>
                    <BannerTitle idTag={"test"} title={capitalize(Object.keys(weaponFeatures)[tabIndex])} bannerColor={"#123456"}>
                    {
                        Object.entries(Object.values(weaponFeatures)[tabIndex]).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => {
                            const catName = capitalize(Object.keys(weaponFeatures)[tabIndex])
                            return <Box key={key}>
                                    <Box
                                        sx={{
                                            width: "95%",
                                            backgroundColor: "#123456",
                                            borderRadius: 1,
                                            margin: "4px",
                                            padding: "4px",
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="h6" component="span">
                                                {catName} - {capitalize(getNameFromClassTier(+key.replace("rank", "")))}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex"
                                        }}
                                    >
                                        {disambiguateCard(value, {...compendiumProps}).map((card, index) => {
                                            if (card) {
                                                return <Box key={index}><UnlockWrapper el={card} _id={value[index]._id} unlockedByDefault={false} unlockList={miscUnlocks[wsKey]?.unlockIds ?? []} updateUnlockList={updateUnlockList} key={index} isDisabled={miscUnlocks[wsKey]?.unlockIds.length+1 < +key.replace("rank", "")}/></Box>
                                            }
                                        })}
                                    </Box>


                            </Box>
                        })
                    }
                    </BannerTitle>

                </Box>
            </Box>
        </Box>
    ) : <></>
}

export default WeaponSpecializationPanel