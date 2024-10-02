import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import SourceComponent from '../Components/Sources/SourceComponent';
import {Helmet} from "react-helmet";

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
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Sources - Ursura</title>
            </Helmet>
            {SourceData.GetAllSourceData().map((data) => {
                return (
                    <Box>
                        <SourceComponent sourceData={data} key={data._id} />
                    </Box>

                )
            })}
        </Box>
    )
}

export default SourceCompendium