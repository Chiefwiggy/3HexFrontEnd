import PageHeader from "./PageHeader";
import {Outlet} from "react-router-dom";
import PageFooter from "./PageFooter";
import DarkTheme from "../../Themes/DarkTheme";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import NavigationBar from "../../Modules/NavigationBar";
import React from "react";


const PageLayout = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline/>
            <Box
                sx={{height: "64px"}}
            ></Box>
            <PageHeader/>
            <Outlet/>
            <PageFooter/>
        </ThemeProvider>

    )
}

export default PageLayout