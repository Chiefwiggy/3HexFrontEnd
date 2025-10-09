import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { ICharacterBaseData } from "../Data/ICharacterData";
import CharacterSelectCard from "../Components/Character Select/CharacterSelectCard";
import { AddOutlined } from "@mui/icons-material";
import useAPI from "../Hooks/useAPI/useAPI";
import useUser from "../Hooks/useUser/useUser";
import { useNavigate } from "react-router-dom";

const CharacterSelectView = () => {
  const [allCharacters, setAllCharacters] = useState<Array<ICharacterBaseData>>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("all");

  const { loggedIn, charactersOwned, userPermissions } = useUser();
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(event.target.value);
  };

  useEffect(() => {
    if (loggedIn) {
      setAllCharacters(charactersOwned);
    } else {
      setAllCharacters([]);
    }
  }, [charactersOwned, loggedIn]);

  const handleGotoNewCharacter = () => {
    navigate("/new/character");
  };

  // Collect all unique campaign IDs across characters
  const campaignIds = useMemo(() => {
    const ids = new Set<string>();
    allCharacters.forEach((char) =>
      char.campaignIds?.forEach((id) => ids.add(id))
    );
    return Array.from(ids).sort();
  }, [allCharacters]);

  // Filtered + sorted characters
  const filteredCharacters = useMemo(() => {
    return allCharacters
      .filter((char) => {
        // Campaign tab filtering
        if (currentTab !== "all" && !char.campaignIds?.includes(currentTab)) {
          return false;
        }
        // Text filter
        if (!currentFilter) return true;
        const filter = currentFilter.toLowerCase();
        const inName = char.characterName.toLowerCase().includes(filter);
        const inClass = char.classes.some((clz) =>
          clz.className.toLowerCase().includes(filter)
        );
        return inName || inClass;
      })
      .sort((a, b) => {
        if (a.isMainCharacter !== b.isMainCharacter) {
          return b.isMainCharacter ? 1 : -1;
        } else if (a.isDead !== b.isDead) {
          return Number(a.isDead) - Number(b.isDead);
        } else {
          return a.characterName.localeCompare(b.characterName);
        }
      });
  }, [allCharacters, currentFilter, currentTab]);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          padding: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <Box></Box>
        <Typography variant="h5" component="div" textAlign="center">
          My Characters
        </Typography>
        {loggedIn &&
        (userPermissions.includes("registered") ||
          userPermissions.includes("admin")) ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              flexDirection: "row-reverse",
            }}
          >
            <Button variant="contained" onClick={handleGotoNewCharacter}>
              <AddOutlined /> New Character
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>

      {/* Filter Input */}
      <Box sx={{ padding: "2px 20%" }}>
        <TextField
          value={currentFilter}
          onChange={handleFilterChange}
          placeholder="Type here to filter..."
          fullWidth
          autoComplete="off"
        />
      </Box>

      {/* Campaign Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" value="all" />
          {campaignIds.map((id) => (
            <Tab key={id} label={id} value={id} />
          ))}
        </Tabs>
      </Box>

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(264px, 1fr))",
            gap: "10px",
            margin: 4,
          }}
        >
          {filteredCharacters.map((character) => (
            <CharacterSelectCard
              characterData={character}
              key={character.characterName}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography variant="body1">
            Seems you don't have any characters... maybe you should create one!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CharacterSelectView;
