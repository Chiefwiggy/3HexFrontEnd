import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import SourceComponent from '../Components/Sources/SourceComponent';

interface ISourceCompendiumInput {

}

const SourceCompendium = ({}: ISourceCompendiumInput) => {

    const {SourceData} = usePreloadedContent();


    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: "repeat( auto-fill , max(532px, calc(33.3vw - 20px)))",
                gridGap: "10px"
            }}
        >
            {SourceData.GetAllSourceData().map((data) => {
                return (
                    <SourceComponent sourceData={data} key={data._id} />
                )
            })}
        </Box>
    )
}

export default SourceCompendium