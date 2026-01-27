import React from 'react';
import {Box, List, ListItem, Typography} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";
import useUser from "../../Hooks/useUser/useUser";
import {CardGetColor} from "../../Utils/CardColorUtils";

interface ISourceListInput {
    sourceData: ISourceData,
    handleSetIndex: (newIndex: number) => (event: React.MouseEvent) => void
    currentIndex: number
}

const SourceList = ({sourceData, handleSetIndex, currentIndex}: ISourceListInput) => {

    const {userPermissions} = useUser();


    return (
        <Box>
            <List dense>
                {
                    sourceData.sourceTiers.filter((elem) => {
                        return !elem.isSecret || userPermissions.includes("admin") || userPermissions.includes(`spell_${elem.cardData._id}_src_${sourceData._id}`)
                    }).map((tier, index) => {
                        return (
                            <ListItem
                                key={tier.cardData._id}
                                sx={currentIndex == index ? {
                                    backgroundColor: "#454545"
                                } : {
                                    '&:hover': {
                                        backgroundColor: "#343434"
                                    },

                                }}
                                onClick={handleSetIndex(index)}
                            >
                                <Box
                                    sx={{
                                        width: "4px",
                                        height: "18px",
                                        backgroundColor: CardGetColor(`${tier.cardData.cardType}.${tier.cardData.cardSubtype}`),
                                    }}
                                ></Box>
                                <Typography sx={{
                                    textAlign: "right",
                                    width: "100%"
                                }} variant={"body2"}>{tier.cardData.cardName}</Typography>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default SourceList