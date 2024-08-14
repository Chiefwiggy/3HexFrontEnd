import React, {useState} from 'react';
import {Box, Card, Typography} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";
import SpellBaseCard from "../Cards/SpellBaseCard";
import {ISpellBaseCardData, ISpellModifierCardData} from "../../Data/ICardData";
import SpellModifierCard from "../Cards/SpellModifierCard";
import SourceList from './SourceList';

interface ISourceComponentInput {
    sourceData: ISourceData
}

const SourceComponent = ({sourceData}: ISourceComponentInput) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSetIndex = (newIndex: number) => (event: React.MouseEvent<any>) => {
        setCurrentIndex(newIndex);
    }

    return (
        <Card elevation={2} sx={{
            padding: "12px",
            margin: "12px"
        }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center"
                }}
            >
                {sourceData.sourceName}
            </Typography>
            <Typography
                variant={"subtitle1"}
                sx={{
                    color: "lightgrey",
                    textAlign: "center"
                }}
            >
                {sourceData.sourceArcanotype.toUpperCase()}
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr"
                }}
            >
                <Box>
                    <SourceList sourceData={sourceData} handleSetIndex={handleSetIndex} currentIndex={currentIndex}/>
                </Box>
                <Box>
                    {
                        sourceData.sourceTiers[currentIndex].cardType == "base" ?
                            <SpellBaseCard cardData={sourceData.sourceTiers[currentIndex].cardData as ISpellBaseCardData} sendBack={()=>{}} canFavorite={false}   isExpanded={true} canToggleExpand={false} />
                            :
                            <SpellModifierCard cardData={sourceData.sourceTiers[currentIndex].cardData as ISpellModifierCardData} sendBack={() => {}} canFavorite={false} isExpanded={true} canToggleExpand={false}/>
                    }

                </Box>

            </Box>
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        display: 'grid',*/}
            {/*        gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",*/}
            {/*        gridGap: "10px"*/}
            {/*    }}*/}
            {/*>*/}
            {/*        {*/}
            {/*            sourceData.sourceTiers.map(tier => {*/}
            {/*                if (tier.cardType == "base") {*/}
            {/*                    return (*/}
            {/*                            <Box>*/}
            {/*                                 <SpellBaseCard cardData={tier.cardData as ISpellBaseCardData} sendBack={()=>{}} canFavorite={false}  />*/}
            {/*                            </Box>*/}
            {/*                        )*/}

            {/*                } else {*/}
            {/*                    return (*/}
            {/*                        <Box>*/}
            {/*                            <SpellModifierCard cardData={tier.cardData as ISpellModifierCardData} sendBack={() => {}} canFavorite={false}/>*/}
            {/*                        </Box>*/}

            {/*                    )*/}
            {/*                }*/}
            {/*            })*/}
            {/*        }*/}

            {/*</Box>*/}
        </Card>
    )
}

export default SourceComponent