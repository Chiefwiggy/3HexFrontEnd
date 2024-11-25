import React, {useEffect, useState} from 'react';
import {Box, Divider, Pagination, TablePagination, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import ConsumableCard from "../Components/Items/ConsumableCard";
import BarracksConsumable from "../Components/Equipment/BarracksConsumable";
import {Helmet} from "react-helmet";
import {IConsumableTemplate} from "../Data/IConsumable";

interface IConsumableCompendiumInput {

}

const ConsumableCompendium = ({}: IConsumableCompendiumInput) => {

    const {ConsumableData, isLoaded} = usePreloadedContent();

    const [consumableData, setConsumableData] = useState<Array<IConsumableTemplate>>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [elementsPerPage, setElementsPerPage] = useState(25);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setCurrentPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setElementsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    }
    useEffect(() => {
        setConsumableData(ConsumableData.GetAllConsumableData().sort((a, b) => {
            if (a.itemType === b.itemType) {
                if (a.craftingType == b.craftingType) {
                    return a.itemName.localeCompare(b.itemName);
                }
                return a.craftingType.localeCompare(b.craftingType);
            }
            return a.itemType.localeCompare(b.itemType);
        }));
    }, [isLoaded]);



    // @ts-ignore
    return (
        <Box
            sx={{
                padding: 2
            }}
        >
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Consumables - Ursura</title>
            </Helmet>
            <Box
                sx={{
                    marginBottom: 2
                }}
            >
                <Typography variant={"h4"}>Consumables</Typography>
                <Divider />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    consumableData
                        .slice(currentPage*elementsPerPage, (currentPage+1)*elementsPerPage)
                        .map((consumable) => {
                        return (
                            <BarracksConsumable consumable={consumable} key={consumable._id} />
                        )
                    })
                }

            </Box>
            <TablePagination
                component={"div"}
                count={consumableData.length}
                page={currentPage}
                rowsPerPage={elementsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5,10,15,20,25]}
            />
        </Box>
    )
}

export default ConsumableCompendium