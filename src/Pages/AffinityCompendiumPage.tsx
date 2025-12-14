import React, { useEffect, useState } from 'react';
import {Box, Divider, SxProps, Tab, Tabs, Typography} from "@mui/material";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import { useSearchParams } from "react-router-dom";
import { IAffinities, IPathKeys } from "../Data/ICharacterData";
import CompendiumAffinityElement from "../Components/Compendium/CompendiumAffinityElement";
import { Helmet } from "react-helmet";

interface IAffinityCompendiumPageInput {}

const AffinityCompendiumPage = ({}: IAffinityCompendiumPageInput) => {
  const { isLoaded } = usePreloadedContent();

  const [currentTabValue, setCurrentTabValue] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isPath, setIsPath] = useState<boolean>(true);

  const [currentName, setCurrentName] = useState<keyof IPathKeys | keyof IAffinities | "_">(
    (searchParams.get("path") ?? searchParams.get("affinity") ?? "warrior") as keyof IPathKeys | keyof IAffinities | "_"
  );

  const paths: Array<keyof IPathKeys> = ["warrior", "arcanist", "commander", "navigator", "scholar", "hacker"];
  const affinities: Array<keyof IAffinities | "_"> = [
    "_", "nimble", "infantry", "guardian", "_", "focus", "creation", "alteration", "_", "leadership", "supply", "summoning", "_", "swift", "riding", "adaptation", "_", "rune", "sourcecraft", "research", "_", "transmutation",  "abjuration", "infusion"
  ];

  useEffect(() => {
    const path = searchParams.get("path") ?? "";
    const affinity = searchParams.get("affinity") ?? "";
    if (paths.includes(path as keyof IPathKeys)) {
      setCurrentTabValue(paths.findIndex((e) => e === path) * 4);
      setIsPath(true);
    } else if (affinities.includes(affinity as keyof IAffinities)) {
      setCurrentTabValue(affinities.findIndex((e) => e === affinity));
      setIsPath(false);
    }
  }, [searchParams]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
    if (newValue % 4 === 0) {
      setIsPath(true);
      const newName = paths[Math.floor(newValue * 0.25)];
      setSearchParams({
        path: newName,
      });
      setCurrentName(newName);
    } else {
      setIsPath(false);
      setSearchParams({
        affinity: affinities[newValue],
      });
      setCurrentName(affinities[newValue]);
    }
  };

  const tabProperties: SxProps = {
    padding: 0,
  };

  return isLoaded ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1px 9fr",
      }}
    >
      <Helmet>
        <meta charSet={"utf-8"} />
        <title>Affinities - Ursura</title>
      </Helmet>

      <Box
        sx={{
          height: "90vh",
          overflowY: "auto",
          scrollbarColor: '#6b6b6b #2b2b2b',
          scrollbarWidth: 'thin',
          direction: 'rtl'
        }}
      >

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentTabValue}
          onChange={handleTabChange}
        >
          <Tab label={<Typography variant={"h6"}>Warrior</Typography>} sx={tabProperties} />
          <Tab label={"Nimble"} sx={tabProperties} />
          <Tab label={"Infantry"} sx={tabProperties} />
          <Tab label={"Guardian"} sx={tabProperties} />
          <Tab label={<Typography variant={"h6"}>Arcanist</Typography>} sx={tabProperties} />
          <Tab label={"Focus"} sx={tabProperties} />
          <Tab label={"Creation"} sx={tabProperties} />
          <Tab label={"Alteration"} sx={tabProperties} />
          <Tab label={<Typography variant={"h6"}>Commander</Typography>} sx={tabProperties} />
          <Tab label={"Leadership"} sx={tabProperties} />
          <Tab label={"Supply"} sx={tabProperties} />
          <Tab label={"Summoning"} sx={tabProperties} />
          <Tab label={<Typography variant={"h6"}>Navigator</Typography>} sx={tabProperties} />
          <Tab label={"Swift"} sx={tabProperties} />
          <Tab label={"Riding"} sx={tabProperties} />
          <Tab label={"Adaptation"} sx={tabProperties} />
          <Tab label={<Typography variant={"h6"}>Scholar</Typography>} sx={tabProperties} />
          <Tab label={"Rune"} sx={tabProperties} />
          <Tab label={"Sourcecraft"} sx={tabProperties} />
          <Tab label={"Research"} sx={tabProperties} />
          <Tab label={<Typography variant={"h6"}>Hacker</Typography>} sx={tabProperties} />
          <Tab label={"Transmutation"} sx={tabProperties} />
          <Tab label={"Abjuration"} sx={tabProperties} />
          <Tab label={"Infusion"} sx={tabProperties} />
        </Tabs>

      </Box>
      <Divider orientation={"vertical"}/>

      <Box sx={{
        padding: "12px",
        height: "90vh",
        overflowY: "auto",
        scrollbarColor: '#6b6b6b #2b2b2b',
        scrollbarWidth: 'thin',
      }}>
        <CompendiumAffinityElement elemName={currentName} isPath={isPath} description={""} />
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default AffinityCompendiumPage;
