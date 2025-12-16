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
import {Link} from 'react-router-dom'

const NavigationBar = () => {

    const {loggedIn, userPermissions, LogoutUser} = useUser();

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
                    <Typography variant="h5" component={Link} to={"/"} sx={{
                        textDecoration: "none",
                        color: "white",
                        flexGrow: 1
                    }}>
                        URSURA
                    </Typography>
                    {
                        loggedIn ?
                            <Button component={Link} to="/character_select">
                                Characters
                            </Button>
                            :
                            <></>
                    }
                    <Button component={Link} to="/compendium/classes">
                        Class Guide
                    </Button>
                    <Button component={Link} to="/compendium/affinities">
                        Affinities
                    </Button>
                    <Button component={Link} to="/barracks">
                        Barracks
                    </Button>
                    {
                        userPermissions.includes("admin") || userPermissions.includes("creator") ?
                            <Button component={Link} to="/creator">
                                Creator
                            </Button>
                            :
                            <></>
                    }
                    <Box sx={{flexGrow: 1}}/>
                    {loggedIn ? (
                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Box>
                            <Button sx={{margin: 2}} variant="contained" onClick={handleNavigate("/login")}>Login</Button>

                            <Button sx={{margin: 2}} variant="contained" onClick={handleNavigate("/signup")}>Sign up</Button>
                        </Box>

                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default NavigationBar;