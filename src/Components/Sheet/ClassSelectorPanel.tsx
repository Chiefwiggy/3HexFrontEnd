import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, Typography} from "@mui/material";
import {IClassMetaData} from "../../Data/IClassMetaData";
import BannerTitle from "../Generic/BannerTitle";
import {getNameFromClassTier} from "../../Utils/Shorthand";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import AbilityItem from "../Abilities/AbilityItem";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";
import {IAbility} from "../../Data/IAbilities";
import {ICommonCardData} from "../../Data/ICardData";
import {convertToSnakeCase} from "../../Utils/NameCodifier";
import BoxWithTooltip from "../Generic/BoxWithTooltip";

interface IClassSelectorPanelInput {
    classMetadata: IClassMetaData,
    callback: (action: "add" | "remove", isPromotion: boolean) => void,
    hasClass: boolean,
    hasPromotion: boolean,
    isCompendium?: boolean
}

const ClassSelectorPanel = ({classMetadata, callback, hasClass, hasPromotion, isCompendium=false}: IClassSelectorPanelInput) => {

    const {ClassData} = usePreloadedContent()

    const [freeCards, setFreeCards] = useState<Array<ICommonCardData>>([])
    const [freeAbilities, setFreeAbilities] = useState<Array<IAbility>>([])
    const [unlockableCards, setUnlockableCards] = useState<Array<ICommonCardData>>([])
    const [unlockableAbilities, setUnlockableAbilities] = useState<Array<IAbility>>([])

    useEffect(() => {
        setFreeCards(ClassData.getFreeClassCards(convertToSnakeCase(classMetadata.className)))
        setFreeAbilities(ClassData.getFreeClassAbilities(convertToSnakeCase(classMetadata.className)))
        setUnlockableCards(ClassData.getUnlockableClassCards(convertToSnakeCase(classMetadata.className)))
        setUnlockableAbilities(ClassData.getUnlockableClassAbilities(convertToSnakeCase(classMetadata.className)))
    }, [classMetadata])

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true,
        meetsPrerequisites: !isCompendium
    }

    return (
        <Box>
            <Box>
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: `#123456`,
                        borderRadius: 1,
                        margin: "8px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="span">{classMetadata.className}</Typography>
                        <Typography variant="h6" fontSize="16px" component="span" sx={{paddingLeft: "4px"}}> {getNameFromClassTier(classMetadata.classTier).toUpperCase()}</Typography>
                    </Box>
                    {
                        isCompendium ?
                            <></>
                            :
                            <Box
                                sx={{
                                  pr: 2,
                                    pt: "3px",
                                    display: "flex",
                                    gap: "10px"
                                }}
                            >
                                <Box>
                                    <Button variant={hasClass ? "contained" : "outlined"} component="span" color="info" onClick={() => callback(hasClass ? "remove" : "add", false)}>
                                        {hasClass ? "Remove" : "Add"}
                                    </Button>
                                </Box>
                                <BoxWithTooltip title={"When you Promote a class, you unlock its Ultimate card and gain an additional Affinity Point."} placement={"top"}>
                                    <Button variant={hasPromotion ? "contained" : "outlined"} disabled={!hasClass} component="span" color="info" onClick={() => callback(hasPromotion ? "remove" : "add", true)}>
                                        {hasPromotion ? "De-Promote" : "Promote"}
                                    </Button>
                                </BoxWithTooltip>

                            </Box>
                    }


                </Box>
                <Box
                    sx={{
                        px: "12px",
                        py: "4px"
                    }}
                >
                    <Typography>{classMetadata.description}</Typography>
                    <Typography>
                        Upon taking this class, gain Expertise in
                        {classMetadata.classExpertises.map((exp, i, arr) => (
                            <Typography component="span" key={exp}>
                                {" "}
                                <Typography component="span" sx={{ fontWeight: "bold" }}>
                                    {capitalize(exp)}
                                </Typography>
                                {arr.length === 2 && i === 0 && " and"}
                                {arr.length > 2 && i < arr.length - 2 && ","}
                                {arr.length > 2 && i === arr.length - 2 && ", and"}
                            </Typography>
                        ))}
                    </Typography>
                    <br />
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: `#123456`,
                            borderRadius: 1,
                            padding: "8px"
                        }}
                    >
                        <Box>
                            <Typography variant="h5" component="span">Free Cards</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: "repeat( auto-fill , max(264px, 18vw))",
                            gridGap: "10px",
                            my: 2,
                        }}
                    >
                        {
                            disambiguateCard([...freeAbilities, ...freeCards], compendiumProps)
                        }

                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: `#123456`,
                            borderRadius: 1,
                            padding: "8px",
                            my: 2
                        }}
                    >
                        <Box>
                            <Typography variant="h5" component="span">Unlockable Cards</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: "repeat( auto-fill , max(264px, 18vw))",
                            gridGap: "10px",
                            my: 2,
                        }}
                    >
                        {
                            disambiguateCard([...unlockableAbilities, ...unlockableCards], compendiumProps)
                        }

                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default ClassSelectorPanel