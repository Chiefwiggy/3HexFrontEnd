import React, {useEffect, useState} from 'react';
import {Box, Grid, TablePagination} from "@mui/material";
import {ICommonCardData} from "../../Data/ICardData";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import CardBuilderGridItem from "./CardBuilderGridItem";

interface ICardBuilderGridListInput {
    cardList: Array<ICommonCardData>,
    cardTypes: Array<ICardBuilderType>,
    sendBack: Function
}
const CardBuilderGridList = ({
    cardList,
    cardTypes,
    sendBack = (num: number) => Function
}: ICardBuilderGridListInput) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    useEffect(() => {
        setPage(0);
    }, [cardList]);

    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <TablePagination
                component={"div"}
                count={cardList.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[4,8,12,16,20,24]}

            />
            <Grid container spacing={2} justifyContent={"center"}>
                {
                    cardList.slice(page*rowsPerPage,rowsPerPage+(rowsPerPage*page)).map((card: ICommonCardData) => {
                        const typeIndex = cardTypes.findIndex((type) => type.name.map(e => e.split(".")[1]).includes(card.cardSubtype));
                        const type = cardTypes[typeIndex];
                        return (
                            <Grid item key={card.cardName}>
                                <CardBuilderGridItem
                                    cardData={card}
                                    cardType={type}
                                    sendBack={sendBack(typeIndex)}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>

        </Box>

    )
}

export default CardBuilderGridList;