import React from "react";
import {
    AppBar, Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import useUser from "../Hooks/useUser/useUser";
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {

    const {loggedIn, LogoutUser} = useUser();

    const navigate = useNavigate();

    const handleNavigate = (to: string) => (event: React.MouseEvent<any>) => {
        navigate(to);
    }

    const handleLogout = () => {
        LogoutUser();
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        URSURA
                    </Typography>
                    <Button onClick={handleNavigate("/")}>
                        Characters
                    </Button>
                    <Button onClick={handleNavigate("/compendium/classes")}>
                        Class Guide
                    </Button>
                    <Button onClick={handleNavigate("/compendium/affinities")}>
                        Affinities
                    </Button>

                    <Box sx={{flexGrow: 1}}/>
                    {loggedIn ? (
                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button variant="contained" onClick={handleNavigate("/login")}>Login</Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default NavigationBar;