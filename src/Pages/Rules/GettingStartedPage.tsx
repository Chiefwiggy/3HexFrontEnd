import React from 'react';
import {Box, Typography} from "@mui/material";
import BannerTitle from "../../Components/Generic/BannerTitle";
import DieIcon from "../../Components/Generic/DieIcon";
import DiceExplanationCard from "../../Components/Rules/DiceExplanationCard";

interface IGettingStartedPageInput {

}

const GettingStartedPage = ({}: IGettingStartedPageInput) => {
    return (
        <Box>
            <Box
                sx={{
                    margin: "4px"
                }}
            >
                <Typography variant={"h3"}>Getting Started</Typography>
                <Typography>Ursura is a sci-fi fantasy tabletop roleplaying game designed to help facilitate storytelling of grand heroes.</Typography>
                <BannerTitle idTag={"gs-dice"} title={"The Dice"} bannerColor={"#12345666"}>
                    <Typography>The 3Hex system uses the d6 as its primary and only die type. When you make a standard roll in the system, unless otherwise specified, you will roll 6d6. The actual numeric value of the dice, however, are irrelevant. For this system, you could use dice with 6 colors or pictures of weapons, as long as the symbols are the same across the 6 dice.</Typography>
                    <Typography variant={"h5"}>Interpreting the Dice</Typography>
                    <Typography>When you roll your dice, you are looking for multiple of the same number. Each of those sets of numbers has a corresponding value, which starts at 1 for a pair, and increases by 2 for every additional die.</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap"
                        }}
                    >
                        <DiceExplanationCard dice={["1","1"]} title={"Pair"} value={"1"} />
                        <DiceExplanationCard dice={["1","1","1"]} title={"Three of a Kind"} value={"3"} />
                        <DiceExplanationCard dice={["1","1","1","1"]} title={"Four of a Kind"} value={"5"} />
                        <DiceExplanationCard dice={["1","1","1","1","1"]} title={"Five of a Kind"} value={"7"} />
                        <DiceExplanationCard dice={["1","1","1","1","1","1"]} title={"Six of a Kind"} value={"9"} />
                        <DiceExplanationCard dice={["1","1","1","1","1","?"]} title={"N of a Kind"} value={"(2n-3)"} />
                    </Box>
                    <Typography variant={"h6"}>Combination Bonus</Typography>
                    <Typography>Additionally, you can earn what is called a Combination Bonus. If you have 3 or more different sets of numbers, you add +2 for each Set beyond the second. Here are some examples:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap"
                        }}
                    >
                        <DiceExplanationCard dice={["1","1","2","2","3","3"]} title={"Three Pairs"} value={"5"} subtitle={"Normally, each of these pairs would earn only a +1, however, because there are 3 separate sets, there is a +2 bonus applied."} />
                        <DiceExplanationCard dice={["1","1","1","2","2","3","3"]} title={"Three of a Kind + Two Pairs"} value={"7"}
                            subtitle={"The sets do not need to be the same type to earn the Combination Bonus. 5 + 2 = 7"}
                        />
                        <DiceExplanationCard dice={["1","1","2","2", "3", "3", "4", "4"]} title={"Four Pair"} value={"8"}
                            subtitle={"In this example, there are Four sets, so you apply the +2 bonus twice. 4 + 4 = 8"}
                        />
                        <DiceExplanationCard dice={["1","2", "3", "3", "5", "6"]} title={"One Pair"} value={"1"}
                                             subtitle={"A Set must be made up of two like elements or more. You cannot use the solitary numbers to earn a Combination Bonus, so this is simply a Single Pair"}
                        />
                    </Box>
                    <Typography variant={"h5"}>Roll Table</Typography>
                    <Typography>If trying to figure out the math behind the rolling is confusing, it may help to have a view of all the possibilities you can get on a set of 6 dice. The built-in dice roller will also take care of the math for you if you wish to use that.</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap"
                        }}
                    >
                        <DiceExplanationCard dice={["1","2","3","4","5","6"]} title={"Critical Failure"} value={"0"} subtitle={"No matter what, this roll fails. Thankfully the chances of rolling this are only about 1.5%"}/>
                        <DiceExplanationCard dice={["1","1","-","-","-","-"]} title={"One Pair"} value={"1"} />
                        <DiceExplanationCard dice={["1","1","2","2","-","-"]} title={"Two Pair"} value={"2"} />
                        <DiceExplanationCard dice={["1","1","1","-","-","-"]} title={"Three of a Kind"} value={"3"} />
                        <DiceExplanationCard dice={["1","1","1","2","2","-"]} title={"Full House"} value={"4"} />
                        <DiceExplanationCard dice={["1","1","2","2","3","3"]} title={"Three Pair"} value={"5"} subtitle={"See Combination Bonus section for more detail."} />
                        <DiceExplanationCard dice={["1","1","1","1","-","-"]} title={"Four of a Kind"} value={"5"} />
                        <DiceExplanationCard dice={["1","1","1","2","2","2"]} title={"Two Three of a Kinds"} value={"6"} />
                        <DiceExplanationCard dice={["1","1","1","1","2","2"]} title={"Four of a Kind + One Pair"} value={"6"} />
                        <DiceExplanationCard dice={["1","1","1","1","1","-"]} title={"Five of a Kind"} value={"7"} subtitle={"On a weapon attack, this is a Critical Hit."}/>
                        <DiceExplanationCard dice={["1","1","1","1","1","1"]} title={"Six of a Kind"} value={"9"} subtitle={"On a weapon attack, this is a Critical Hit."}/>

                    </Box>

                </BannerTitle>
            </Box>

        </Box>
    )
}

export default GettingStartedPage