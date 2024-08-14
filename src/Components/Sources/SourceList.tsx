import React from 'react';
import {Box, List, ListItem, Typography} from "@mui/material";
import {ISourceData} from "../../Data/ISourceData";

interface ISourceListInput {
    sourceData: ISourceData,
    handleSetIndex: (newIndex: number) => (event: React.MouseEvent) => void
    currentIndex: number
}

const SourceList = ({sourceData, handleSetIndex, currentIndex}: ISourceListInput) => {


    return (
        <Box>
            <List dense>
                {
                    sourceData.sourceTiers.map((tier, index) => {
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
                                <Typography sx={{
                                    textAlign: "right",
                                    width: "100%"
                                }} variant={"body2"}>{tier.cardData.cardName} [{tier.arcaneRequirement}]</Typography>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default SourceList