import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  capitalize,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import { IClassMetaData } from "../../Data/IClassMetaData";
import ClassPreview from "./ClassPreview";
import { IClassData } from "../../Data/ICharacterData";
import { getNameFromTier, getTierFromName } from "../../Utils/Shorthand";
import FatelinePreview from '../Fatelines/FatelinePreview';
import { IFatelineData } from "../../Data/IFatelineData";
import DevelopmentTab from "../Development/DevelopmentTab";


interface IClassSelectPanelInput {
  myClasses: IClassData[];
  myFate: IFatelineData | undefined;
  sendBack: (doPick: boolean, classData: IClassData) => void;
  sendBackFate: (doPick: boolean, fateData: IFatelineData) => void;
}

const TIER_OPTIONS = [
  "fate",
  "development",
  "beginner",
  "intermediate",
  "advanced",
  "expert",
  "master",
  "legend"
];

const ClassSelectPanel = ({
  myClasses,
  myFate,
  sendBack,
  sendBackFate
}: IClassSelectPanelInput) => {
  const { currentSheet } = useCharacter();
  const { ClassData, FatelineData, isLoaded } = usePreloadedContent();

  const [tier, setTier] = useState("beginner");
  const [allClassData, setAllClassData] = useState<IClassMetaData[]>([]);
  const [canPromote, setCanPromote] = useState(false);
  const [canEquip, setCanEquip] = useState(false);

  const handleTierChange = (event: SelectChangeEvent) => {
    setTier(event.target.value);
  };

  const hasClass = (className: string) =>
    myClasses.some(e => e.className.toLowerCase() === className.toLowerCase());

  const getMyClass = (className: string) =>
    myClasses.find(e => e.className.toLowerCase() === className.toLowerCase());

  const handleSave = async () => {
    if (!currentSheet) return;
    currentSheet.data.classes = myClasses;
    currentSheet.data.fateline = myFate;
    currentSheet.setPreparedCards([]);
    currentSheet.data.currentWeapon = null;
    currentSheet.data.currentSpell = null;
    await currentSheet.SaveCharacterSheet();
  };

  const evaluatePromotionEligibility = () => {
    if (!currentSheet || tier === "fate" || tier === "development") return;

    const tierNumber = getTierFromName(tier);
    const level = currentSheet.getLevel();
    const baseLevel = 60 * (tierNumber - 1);
    const classesOfTier = myClasses.filter(clz => clz.classTier === tierNumber).length;
    const promotions = myClasses.filter(clz => clz.classTier === tierNumber && clz.isPromoted).length;

    const maxClasses = 2 + Math.min(2, Math.floor((level - baseLevel) / 20));
    const eligibleToEquip = (classesOfTier + promotions) < maxClasses && level >= baseLevel;

    setCanEquip(eligibleToEquip);
    setCanPromote(eligibleToEquip && level >= baseLevel + 20);
  };

  useEffect(() => {
    if (isLoaded) {
      evaluatePromotionEligibility();
      if (tier !== "fate" && tier !== "development") {
        setAllClassData(ClassData.getClassesData(getTierFromName(tier)));
      }
    }
  }, [isLoaded, myClasses, tier]);

  const renderTierInfo = () => {
    if (tier === "fate") {
      return "Choose a Fateline. This decision cannot be changed unless you undergo a major transformation.";
    }
    if (tier === "development") {
      return "Unlock Talents every 20 Levels, starting at Level 10.";
    }

    const tierNum = getTierFromName(tier);
    return tier !== "legend"
      ? `Unlock Classes at Level ${tierNum * 60 - 60}, Promotions at ${tierNum * 60 - 40} and ${tierNum * 60 - 20}`
      : `Unlock Class at Level ${(tierNum - 1) * 60}`;
  };

  const renderContent = () => {
    if (tier === "development") return <DevelopmentTab />;
    if (tier === "fate") {
      return FatelineData.GetAllFatelineData().map(fd => (
        <FatelinePreview
          key={fd.fatelineId}
          fateData={fd}
          isEquipped={myFate?.fatelineId === fd.fatelineId}
          canEquip={!myFate}
          equipData={myFate}
          sendBack={sendBackFate}
        />
      ));
    }

    return allClassData.map(cd => (
      <ClassPreview
        key={cd._id}
        classData={cd}
        isEquipped={hasClass(cd.className)}
        canEquip={canEquip}
        canPromote={canPromote}
        sendBack={sendBack}
        equipData={hasClass(cd.className) ? getMyClass(cd.className) : undefined}
      />
    ));
  };

  if (!currentSheet) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="space-around" width="100%">
        <FormControl fullWidth variant="outlined" sx={{ width: 150 }}>
          <InputLabel id="tier-select-label">Tier</InputLabel>
          <Select
            labelId="tier-select-label"
            id="tier-select"
            value={tier}
            onChange={handleTierChange}
            label="Tier"
            fullWidth
          >
            {TIER_OPTIONS.map(option => (
              <MenuItem key={option} value={option}>
                {capitalize(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4">
            {capitalize(tier)} {tier !== "fate" && tier !== "development" ? "Classes" : "Talents"}
          </Typography>
          <Typography variant="subtitle2">{renderTierInfo()}</Typography>
        </Box>

        <Button onClick={handleSave}>SAVE</Button>
      </Box>

      <Box
        sx={
          tier !== "development"
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                width: "100%",
                maxHeight: "88vh",
                overflowY: "auto",
                scrollbarColor: "#6b6b6b #2b2b2b",
                scrollbarWidth: "thin"
              }
            : {}
        }
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ClassSelectPanel;
