import React, {useEffect, useMemo, useState} from 'react';
import {
    Autocomplete,
    Box, Button,
    capitalize, Checkbox,
    FormControl, FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {UHackType, UStat} from "../Utils/Shorthand";
import useAPI from "../Hooks/useAPI/useAPI";
import useSnackbar from "../Hooks/useSnackbar/useSnackbar";
import {
    ICommonCardData,
    IHackBaseCardData,
    IHackIOCardData,
    IHackModifierCardData,
    IHackProtocolCardData
} from "../Data/ICardData";
import DatachipDetailedView from "../Components/Chipsets/DatachipDetailedView";
import PackageDetailedView from "../Components/Chipsets/PackageDetailedView";
import {
    IDatachipData,
    IDatachipDataExport,
    IDatachipTierDraft,
    IPackageData,
    IPackageDataExport
} from "../Data/ChipsetData";

interface ICreateChipsetPageInput {

}



const CreateChipsetPage = ({}: ICreateChipsetPageInput) => {

    const {CardAPI, ChipsetAPI} = useAPI();
    const {SendToSnackbar} = useSnackbar();

    const [localFunctions, setFunctions] = useState<IHackBaseCardData[]>([])
    const [localIO, setLocalIO] = useState<IHackIOCardData[]>([])
    const [localProtocols, setProtocols] = useState<IHackProtocolCardData[]>([])
    const [localUtils, setUtils] = useState<IHackModifierCardData[]>([])

    const [creationType, setCreationType] = useState<string>("datachip")

    const [datachipName, setDatachipName] = useState<string>("[PLACEHOLDER]")
    const [chipTier, setChipTier] = useState<number>(1)
    const [baseTechnik, setBaseTechnik] = useState<number>(0)
    const [primaryStat, setPrimaryStat] = useState<UStat | "none">("knowledge")
    const [secondaryStat, setSecondaryStat] = useState<UStat | "none">("none")
    const [primaryStatScaling, setPrimaryStatScaling] = useState<number>(1.5)
    const [secondaryStatScaling, setSecondaryStatScaling] = useState<number>(1.0)
    const [visibility, setVisibility] = useState<"all" | "restricted" | "admin">("all");
    const [packageSlots, setPackageSlots] = useState<number>(1)

    const [tiers, setTiers] = useState<IDatachipTierDraft[]>([]);

    useEffect(() => {
        (async () => {
            const resp = await CardAPI.GetDatachipCards()
            const { functions, io, protocols, utils} = resp;
            setFunctions(functions.reverse());
            setLocalIO(io.reverse())
            setProtocols(protocols.reverse())
            setUtils(utils.reverse())
        })();
    }, [])

    const addTier = () => {
        setTiers(prev => [
            ...prev,
            { cardType: "function", hackId: null, isSecret: false }
        ]);
    };

    const removeTier = (index: number) => {
        setTiers(prev => prev.filter((_, i) => i !== index));
    };

    const updateTier = (index: number, patch: Partial<IDatachipTierDraft>) => {
        setTiers(prev =>
            prev.map((t, i) => (i === index ? { ...t, ...patch } : t))
        );
    };

    const getOptionsForType = (type: UHackType) => {
        switch (type) {
            case "function":
                return localFunctions
            case "io":
                return localIO
            case "protocol":
                return localProtocols
            case "util":
                return localUtils
        }
    }

    const submitForm = async() => {
        try {
            console.log(tiers)
            if (creationType === "datachip") {
                const datachipDataExport: IDatachipDataExport = {
                    datachipName,
                    baseTechnikCapacity: baseTechnik,
                    primaryTechnikScaling: primaryStatScaling,
                    secondaryTechnikScaling: secondaryStatScaling,
                    primaryTechnikStat: primaryStat,
                    secondaryTechnikStat: secondaryStat,
                    prerequisites: [],
                    builtinHackIds: tiers,
                    chipTier,
                    visibility
                }
                let nsd = await ChipsetAPI.AddDatachip(datachipDataExport)
                SendToSnackbar(`Successfully created ${previewData.datachipName}`, "success")
            } else if (creationType === "package") {
                const packageDataExport: IPackageDataExport = {
                    packageName: datachipName,
                    packageSlots,
                    chipTier,
                    builtinHackIds: tiers,
                    prerequisites: [],
                    visibility
                }
                let nsd = await ChipsetAPI.AddPackage(packageDataExport)
                SendToSnackbar(`Successfully created ${pkgPreviewData.packageName}`, "success")
            }
            setCreationType("datachip")
            setDatachipName("[PLACEHOLDER]")
            setChipTier(1)
            setBaseTechnik(0)
            setPrimaryStat("knowledge")
            setPrimaryStatScaling(1.5)
            setSecondaryStat("none")
            setSecondaryStatScaling(1)
            setVisibility("all")
            setPackageSlots(1)
            setTiers([])

        } catch (e) {
            SendToSnackbar(`Failed to create... ${e}`, "error")
        }
    }

    const previewData = useMemo<IDatachipData>(() => ({
        _id: "",
        datachipName,
        chipTier,
        visibility,
        baseTechnikCapacity: baseTechnik,
        primaryTechnikStat: primaryStat,
        secondaryTechnikStat: secondaryStat,
        primaryTechnikScaling: primaryStatScaling,
        secondaryTechnikScaling: secondaryStatScaling,
        builtinHacks: tiers
            .map((t, i) => {
                const options = getOptionsForType(t.cardType);
                const cardObj = options.find(c => c._id === t.hackId);
                if (!cardObj) return undefined;
                return {
                    ...cardObj
                } as IHackModifierCardData & { layer: number; cardType: UHackType; isSecret: boolean };
            })
            .filter((x): x is IHackModifierCardData & { layer: number; cardType: UHackType; isSecret: boolean } => x !== undefined),
        prerequisites: []
    }), [tiers, datachipName, chipTier, baseTechnik, primaryStat, secondaryStat, primaryStatScaling, secondaryStatScaling]);

    const pkgPreviewData = useMemo<IPackageData>(() => ({
        _id: "",
        packageName: datachipName,
        chipTier,
        visibility,
        packageSlots,
        builtinHacks: tiers
            .map((t, i) => {
                const options = getOptionsForType(t.cardType);
                const cardObj = options.find(c => c._id === t.hackId);
                if (!cardObj) return undefined;
                return {
                    ...cardObj,
                    layer: i,
                    cardType: t.cardType,
                    isSecret: t.isSecret
                } as IHackModifierCardData & { layer: number; cardType: UHackType; isSecret: boolean };
            })
            .filter((x): x is IHackModifierCardData & { layer: number; cardType: UHackType; isSecret: boolean } => x !== undefined),
        prerequisites: []
    }), [tiers, datachipName, chipTier, packageSlots]);

    useEffect(() => {
        console.log(previewData)
    }, [tiers]);




    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                height: "calc(100vh - 64px)"
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    margin: "12px",
                    padding: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 1,
                    overflowY: "auto",
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    scrollbarWidth: 'thin'
                }}
            >
                <Typography component="h1" variant="h5" gutterBottom> Create Datachip </Typography>
                <Stack spacing={2}>
                    <TextField
                        label={"Name"}
                        value={datachipName}
                        onChange={e => setDatachipName(e.target.value)}
                        fullWidth
                        autoComplete="off"
                    />
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <FormControl sx={{flex: 1}}>
                            <InputLabel>Creation Type</InputLabel>
                            <Select
                                value={creationType}
                                label={"Creation Type"}
                                onChange={e => setCreationType(e.target.value)}
                            >
                                <MenuItem value={"datachip"}>Datachip</MenuItem>
                                <MenuItem value={"package"}>Package</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="number"
                            label="Chip Tier"
                            value={chipTier}
                            onChange={e => setChipTier(Number(e.target.value))}
                            sx={{ flex: 1 }}
                            inputProps={{ min: 1 }}
                        />
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel>Visibility</InputLabel>
                            <Select
                                value={visibility}
                                label="Visibility"
                                onChange={e =>
                                    setVisibility(e.target.value as "all" | "restricted" | "admin")
                                }
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="restricted">Restricted</MenuItem>
                                <MenuItem value="admin">GM Only</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {
                        creationType == "datachip" ?
                        (
                            <Stack direction="row" spacing={2}>
                                <Stack direction="row" spacing={2} sx={{ width: "20%" }}>
                                    <TextField
                                        type="number"
                                        label="Base Technik"
                                        value={baseTechnik}
                                        onChange={e => setBaseTechnik(Number(e.target.value))}
                                        sx={{ flex: 1 }}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ width: "80%" }}>
                                    <FormControl sx={{flex: 1}}>
                                        <InputLabel>Primary Stat</InputLabel>
                                        <Select
                                            value={primaryStat}
                                            label={"Primary Stat"}
                                            onChange={e => setPrimaryStat(e.target.value as UStat | "none")}
                                        >
                                            <MenuItem value="none">None</MenuItem>
                                            <MenuItem value="knowledge">Knowledge</MenuItem>
                                            <MenuItem value="might">Might</MenuItem>
                                            <MenuItem value="agility">Agility</MenuItem>
                                            <MenuItem value="skill">Skill</MenuItem>
                                            <MenuItem value="awareness">Awareness</MenuItem>
                                            <MenuItem value="vitality">Vitality</MenuItem>
                                            <MenuItem value="mind">Mind</MenuItem>
                                            <MenuItem value="presence">Presence</MenuItem>
                                            <MenuItem value="authority">Authority</MenuItem>
                                            <MenuItem value="endurance">Endurance</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        type="number"
                                        label={`${capitalize(primaryStat) ?? "Primary Stat"} Scaling`}
                                        value={primaryStatScaling}
                                        onChange={e => setPrimaryStatScaling(Number(e.target.value))}
                                        inputProps={{ step: 0.1, min: 0 }}
                                        sx={{ flex: 1 }}
                                    />
                                    <FormControl sx={{flex: 1}}>
                                        <InputLabel>Secondary Stat</InputLabel>
                                        <Select
                                            value={secondaryStat}
                                            label={"Secondary Stat"}
                                            onChange={e => setSecondaryStat(e.target.value as UStat | "none")}
                                        >
                                            <MenuItem value="none">None</MenuItem>
                                            <MenuItem value="might">Might</MenuItem>
                                            <MenuItem value="agility">Agility</MenuItem>
                                            <MenuItem value="skill">Skill</MenuItem>
                                            <MenuItem value="awareness">Awareness</MenuItem>
                                            <MenuItem value="vitality">Vitality</MenuItem>
                                            <MenuItem value="knowledge">Knowledge</MenuItem>
                                            <MenuItem value="mind">Mind</MenuItem>
                                            <MenuItem value="presence">Presence</MenuItem>
                                            <MenuItem value="authority">Authority</MenuItem>
                                            <MenuItem value="endurance">Endurance</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        type="number"
                                        label={`${secondaryStat != "none" ? capitalize(secondaryStat) : "Secondary Stat"} Scaling`}
                                        value={secondaryStatScaling}
                                        inputProps={{ step: 0.1, min: 0 }}
                                        onChange={e => setSecondaryStatScaling(Number(e.target.value))}
                                        sx={{ flex: 1 }}
                                    />
                                </Stack>
                            </Stack>
                        )
                            :
                            (
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        type="number"
                                        label={`Package Slots`}
                                        value={packageSlots}
                                        inputProps={{ step: 1, min: 0 }}
                                        onChange={e => setPackageSlots(Number(e.target.value))}
                                        sx={{ flex: 1 }}
                                    />
                                </Stack>
                            )
                    }
                    <Typography variant="h6" sx={{ mt: 2}}>{capitalize(creationType)} Layers</Typography>
                    <Stack direction={"row"} spacing={2} sx={{ width: "100%"}}>
                        <Button variant="outlined" onClick={addTier} sx={{ width: "80%"}}>
                            Add Layer
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                            sx={{ width: "20%"}}
                        >
                            Submit Source
                        </Button>
                    </Stack>

                    {
                        tiers.map((tier, index) => {
                            const options = getOptionsForType(tier.cardType)

                            return (
                                <Paper
                                    elevation={1}
                                    key={index}
                                >
                                    <Box
                                        p={2}
                                        border="1px solid rgba(255,255,255,0.12)"
                                        borderRadius={1}
                                    >
                                        <Stack spacing={2}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="subtitle2">
                                                    Layer {index}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => removeTier(index)}
                                                >
                                                    Remove
                                                </Button>
                                            </Stack>
                                            <FormControl fullWidth>
                                                <InputLabel>Card Type</InputLabel>
                                                <Select
                                                    value={tier.cardType}
                                                    label="Card Type"
                                                    onChange={e =>
                                                        updateTier(index, {
                                                            cardType: e.target.value as UHackType,
                                                            hackId: null
                                                        })
                                                    }
                                                >
                                                    <MenuItem value="function">Function</MenuItem>
                                                    <MenuItem value="io">IO</MenuItem>
                                                    <MenuItem value="protocol">Protocol</MenuItem>
                                                    <MenuItem value="util">Util</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Autocomplete
                                                options={options}
                                                getOptionLabel={(opt: any) => opt.cardName}
                                                value={
                                                    options.find(o => o._id === tier.hackId) ??
                                                    null
                                                }
                                                onChange={(_, value) =>
                                                    updateTier(index, {
                                                        hackId: value ? value._id : null
                                                    })
                                                }
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        label="Card"
                                                    />
                                                )}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={tier.isSecret}
                                                        onChange={e =>
                                                            updateTier(index, {
                                                                isSecret: e.target.checked
                                                            })
                                                        }
                                                    />
                                                }
                                                label="Secret"
                                            />
                                        </Stack>

                                    </Box>
                                </Paper>
                            )
                        })
                    }




                </Stack>
            </Paper>
            <Box>
                {
                    creationType === "datachip" ?
                        <DatachipDetailedView datachipData={previewData} startExpanded={true} />
                        :
                        <PackageDetailedView packageData={pkgPreviewData} />
                }
            </Box>
        </Box>
    )
}

export default CreateChipsetPage