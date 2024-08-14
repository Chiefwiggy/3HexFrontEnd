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
                gridTemplateColumns: "repeat( auto-fill , max(396px, 33vw))",
                gridGap: "10px"
            }}
        >
            {SourceData.GetAllSourceData().map((data) => {
                return (
                    <SourceComponent sourceData={data} />
                )
            })}
        </Box>
    )
}

export default SourceCompendium