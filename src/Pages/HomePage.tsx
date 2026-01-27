

import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Drawer, Tab, Tabs, TextField, Typography} from "@mui/material";
import CharacterSheetView from "../Views/CharacterSheetView";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import CharacterSelectView from "../Views/CharacterSelectView";
import CharacterSheetFullView from "../Views/CharacterSheetFullView";
import SplashImage from "../Data/Static Images/splash_example.png"
import CardImage from '../Data/Static Images/cards_example.png'
import {Link} from "react-router-dom";
import useUser from "../Hooks/useUser/useUser";
import {Helmet} from "react-helmet";


const HomePage = () => {

    const [imageNumber, setImageNumber] = useState(0);

    const [imageList, setImageList] = useState<Array<string>>([]);

    const {loggedIn} = useUser();

    useEffect(() => {
        setImageList([SplashImage, CardImage]);
    }, []);




    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 90px"
            }}
        >
            <Helmet>
                <meta charSet={"utf-8"} />
                <title>Ursura Reference</title>
            </Helmet>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column"
                }}
            >
                <Box>
                    <Typography variant={"h3"} textAlign={"center"}>  </Typography>
                </Box>
                <Divider sx={{marginBottom: 2, marginTop: 1}} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 3fr",
                        height: "50vh",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "start",
                            flexDirection: "column",
                            paddingLeft: "20%"
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            Welcome to 3Hex
                        </Typography>

                        {
                            loggedIn ?
                                <Typography variant="body1" paragraph>
                                    <Button component={Link} to="/character_select" variant={"contained"}>Create a Character</Button>
                                </Typography>
                                :
                                <Typography variant="body1" paragraph>
                                    <Button component={Link} to="/signup" variant={"contained"}>Sign Up For Free</Button>
                                </Typography>
                        }

                        <Box>

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Box
                            component={"img"}
                            src={imageList[imageNumber]}
                            sx={{
                                width: "90%"
                            }}
                        />
                    </Box>

                </Box>
                <Divider sx={{marginBottom: 2, marginTop: 22}} />


            </Box>

        </Box>
    )
}

export default HomePage;