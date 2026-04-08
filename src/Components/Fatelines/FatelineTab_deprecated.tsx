import React, {useState} from 'react';
import {Box, Divider, Tab, Tabs, Typography} from "@mui/material";
import {IFatelineFullData} from "../../Data/IFatelineData";
import FatelineDetails_deprecated from "./FatelineDetails_deprecated";

interface IFatelineTabInput {
    fateline: IFatelineFullData
}

const FatelineTab_deprecated = ({fateline}: IFatelineTabInput) => {

    const [currentTabIndex, setCurrentTabIndex] = useState(1);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTabIndex(value);
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                padding: "12px"
            }}
        >
            <Typography variant={"h3"}>{fateline.fatelineName}</Typography>
            <Tabs onChange={handleTabChange} value={currentTabIndex}>
                <Tab label={"Upright"} value={1}/>
                <Tab label={"Reversed"} value={-1} />
            </Tabs>
            <FatelineDetails_deprecated fateline={fateline} reversed={currentTabIndex === -1} />
        </Box>
    )
}

export default FatelineTab_deprecated