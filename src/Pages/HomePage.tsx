

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
                        gridTemplateColumns: "1fr 1fr",
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
                        <Typography variant="body1" paragraph>
                            A revolutionary tabletop RPG designed for players who crave tactical depth and endless customization. In 3Hex, every move counts. Whether you’re casting spells, launching attacks, or even hacking the system, your abilities are represented by powerful cards, giving you full control over how you approach each encounter.
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Forge Your Own Path
                        </Typography>
                        <Typography variant="body1" paragraph>
                            At the heart of 3Hex is a unique class system where your character is a fusion of two distinct classes. This dual-class system opens up limitless possibilities for building a character that’s truly your own. Want to excel in a specialized role or create a versatile jack-of-all-trades? The choice is yours.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Master the Game
                        </Typography>
                        <Typography variant="body1" paragraph>
                            As you advance, you'll unlock higher-tier classes, gain access to even more powerful cards, and incrementally increase your attributes. Customize your character’s abilities to fit a specific niche or keep them flexible for any challenge. With each level-up, you’ll unlock new passives and devastating abilities, making every session fresh and exciting.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Are You Ready to Dominate the Table?
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