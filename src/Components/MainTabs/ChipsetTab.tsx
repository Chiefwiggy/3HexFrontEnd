import React, { SyntheticEvent, useEffect, useState } from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button, capitalize,
    Checkbox,
    Chip,
    TextField,
    Typography
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useUser from "../../Hooks/useUser/useUser";

import { IDatachipData, IPackageData } from "../../Data/ChipsetData";
import { IGadgetData } from "../../Data/IGadgetData";

import DatachipInfo from "../Chipsets/DatachipInfo";
import PackageWidget from "../Chipsets/PackageWidget";
import PackageSlotBar from "../Chipsets/PackageSlotBar";
import GadgetCard from "../Gadgets/GadgetCard";
import {GoPackage} from "react-icons/go";
import GadgetWrapper from "../Gadgets/GadgetWrapper";

/* ---------- Union type ---------- */

export interface IGadgetDataPlusActive {
    gadgetData: IGadgetData;
    isGadgetActive: boolean
}

type ChipsetOption =
    | { type: "package"; data: IPackageData }
    | { type: "gadget"; data: IGadgetData };

const ChipsetTab = () => {

    const { currentSheet, isReady, charPing } = useCharacter();
    const { userPermissions } = useUser();
    const { DatachipData, PackageData, GadgetData } = usePreloadedContent();

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [characterDatachips, setCharacterDatachips] = useState<IDatachipData[]>([]);
    const [characterPackages, setCharacterPackages] = useState<IPackageData[]>([]);
    const [characterGadgets, setCharacterGadgets] = useState<Array<IGadgetDataPlusActive>>([]);

    const [packageSlots, setPackageSlots] = useState<number>(0);

    useEffect(() => {
        if (currentSheet) {
            console.log("NEW SHEETS")
            setPackageSlots(currentSheet.getPackageSlots(characterDatachips[0]))
            console.log(`WITH: ${currentSheet.getPackageSlots(characterDatachips[0])}`);
        }

    }, [isReady, currentSheet, characterDatachips, charPing]);

    const isValidGadget = (
        g: { gadgetData: IGadgetData | undefined; isGadgetActive: boolean }
    ): g is IGadgetDataPlusActive => g.gadgetData !== undefined;

    /* ---------- Init / Reset ---------- */

    const cancelSaveData = () => {
        if (!currentSheet) return;

        setJustUpdated(true);
        setCharacterDatachips(
            DatachipData.GetDatachipsFromIdList(currentSheet.data.knownDatachips)
        );
        setCharacterPackages(
            PackageData.GetPackagesFromIdList(currentSheet.data.knownPackages)
        );

        setCharacterGadgets(
            currentSheet.data.knownGadgets.map(e => {
                return {
                    gadgetData: GadgetData.GetGadgetById(e.gadgetId),
                    isGadgetActive: e.isGadgetActive
                }
            }).filter(isValidGadget)
        );
    };

    useEffect(() => {
        cancelSaveData();
    }, []);

    /* ---------- Save ---------- */

    const saveData = async () => {
        if (!currentSheet) return;

        setJustUpdated(true);

        await currentSheet.SaveCharacterChipset(
            characterDatachips.map(dc => dc._id),
            characterPackages.map(pkg => pkg._id),
            characterGadgets.map(gad => {
                return {
                    gadgetId: gad.gadgetData._id,
                    isGadgetActive: gad.isGadgetActive,
                }
            }),
        );

        await currentSheet.ManualSetAllCards();
        await currentSheet.healthPingExecute(true);
        setShowStatus(true);
    };

    const toggleGadgetActive = (gadgetId: string) => () => {
        setCharacterGadgets(prev =>
            prev.map(g =>
                g.gadgetData._id === gadgetId
                    ? { ...g, isGadgetActive: !g.isGadgetActive }
                    : g
            )

        );
        setJustUpdated(false);
    };

    /* ---------- Datachip Autocomplete ---------- */

    const handleAutocompleteDatachip = (
        event: SyntheticEvent,
        value: IDatachipData[]
    ) => {
        setJustUpdated(false);
        setCharacterDatachips(value);
    };

    /* ---------- Combined Package + Gadget Autocomplete ---------- */

    const combinedOptions: ChipsetOption[] = [
        ...PackageData.GetPackageDataForUser(userPermissions).map(pkg => ({
            type: "package" as const,
            data: pkg
        })),
        ...GadgetData.GetGadgetDataForUser(userPermissions).map(gadget => ({
            type: "gadget" as const,
            data: gadget
        }))
    ];

    const combinedValue: ChipsetOption[] = [
        ...characterPackages.map(pkg => ({
            type: "package" as const,
            data: pkg
        })),
        ...characterGadgets.map(gadget => ({
            type: "gadget" as const,
            data: gadget.gadgetData
        }))
    ];

    const isPackageOption = (
        option: ChipsetOption
    ): option is { type: "package"; data: IPackageData } =>
        option.type === "package";

    const isGadgetOption = (
        option: ChipsetOption
    ): option is { type: "gadget"; data: IGadgetData } =>
        option.type === "gadget";

    const handleAutocompletePackages = (
        event: SyntheticEvent,
        value: ChipsetOption[]
    ) => {
        setJustUpdated(false);

        setCharacterPackages(
            value.filter(isPackageOption).map(v => v.data)
        );

        setCharacterGadgets(prev => {
            const selectedGadgets = value
                .filter(isGadgetOption)
                .map(v => v.data);

            return selectedGadgets.map(gadget => {
                const existing = prev.find(
                    g => g.gadgetData._id === gadget._id
                );

                return existing
                    ? existing // preserve isGadgetActive
                    : {
                        gadgetData: gadget,
                        isGadgetActive: false
                    };
            });
        });
    };

    /* ---------- Render ---------- */

    if (!currentSheet) return null;

    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button color="error" onClick={cancelSaveData} disabled={justUpdated}>
                    Cancel
                </Button>
                <Button color="success" onClick={saveData} disabled={justUpdated}>
                    Save
                </Button>
                <Alert
                    severity="success"
                    sx={{ transition: "opacity 1s ease-out", opacity: showStatus ? 1 : 0 }}
                >
                    Success!
                </Alert>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "3fr 4fr",
                    gap: 2
                }}
            >
                {/* Datachips */}
                <Autocomplete
                    multiple
                    filterSelectedOptions
                    value={characterDatachips}
                    options={DatachipData.GetDatachipDataForUser(userPermissions)}
                    getOptionLabel={(o) => o.datachipName}
                    isOptionEqualToValue={(o, v) => o._id === v._id}
                    onChange={handleAutocompleteDatachip}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Datachips" />
                    )}
                />

                {/* Packages + Gadgets */}
                <Autocomplete
                    multiple
                    filterSelectedOptions
                    options={combinedOptions}
                    value={combinedValue}
                    onChange={handleAutocompletePackages}
                    getOptionLabel={(option) =>
                        option.type === "package"
                            ? option.data.packageName
                            : option.data.gadgetName
                    }
                    isOptionEqualToValue={(o, v) =>
                        o.type === v.type && o.data._id === v.data._id
                    }
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Packages & Gadgets" />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} key={`${option.type}-${option.data._id}`}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlank fontSize="small" />}
                                checkedIcon={<CheckBox fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            <Typography sx={{ flexGrow: 1 }}>
                                {option.type === "package"
                                    ? option.data.packageName
                                    : option.data.gadgetName}
                            </Typography>
                            <Chip
                                label={
                                    capitalize(option.type)
                                }
                            />
                            <Chip
                                label={
                                    option.data.packageSlots
                                }
                                icon={<GoPackage />}
                                sx={{
                                    "& .MuiChip-icon": {
                                        marginLeft: "6px"
                                    }
                                }}
                            />
                        </li>
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const { key, ...chipProps } = getTagProps({ index });

                            return (
                                <Chip
                                    key={key}
                                    {...chipProps}
                                    label={
                                        option.type === "package"
                                            ? option.data.packageName
                                            : option.data.gadgetName
                                    }
                                />
                            );
                        })
                    }
                />
            </Box>

            <Box
                sx={{
                    marginTop: 2,
                    display: "grid",
                    gridTemplateColumns: "10fr 1fr 14fr",
                    gap: 2
                }}
            >
                <Box>
                    {characterDatachips.map((dc, i) => (
                        <DatachipInfo key={dc._id} datachip={dc} index={i} />
                    ))}
                </Box>

                <PackageSlotBar
                    packageSlotTotal={packageSlots}
                    packageSlotsUsed={[...characterPackages, ...characterGadgets.map(e => e.gadgetData)].reduce(
                        (pv, cv) => pv + cv.packageSlots,
                        0
                    )}
                />

                <Box>
                    {characterPackages.map(pkg => (
                        <PackageWidget key={pkg._id} packageData={pkg} />
                    ))}
                    {characterGadgets.map(gadget => (
                        <GadgetWrapper gadgetDataPA={gadget} key={gadget.gadgetData._id} toggleGadgetActive={toggleGadgetActive(gadget.gadgetData._id)} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ChipsetTab;
