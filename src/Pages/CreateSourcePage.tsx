import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Autocomplete,
    Stack,
    Paper,
    Chip
} from "@mui/material";
import useAPI from "../Hooks/useAPI/useAPI";
import {
    ICommonCardData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    IWeaponCommonData
} from "../Data/ICardData";
import SourceCompendium from "./SourceCompendium";
import SourceComponent from "../Components/Sources/SourceComponent";
import UnmadeSourceComponent from "../Components/Sources/UnmadeSourceComponent";
import {ISourceDataAPI, ITierData} from "../Data/ISourceData";
import useSnackbar from "../Hooks/useSnackbar/useSnackbar";

type CardType = "base" | "edict" | "order";

interface ISourceTierDraft {
    cardType: CardType;
    cardId: string | null;
    isSecret: boolean;
}

const CreateSourcePage = () => {
    const { CardAPI, SourceAPI } = useAPI();
    const {SendToSnackbar} = useSnackbar()

    const [localBases, setBases] = useState<ISpellBaseCardData[]>([]);
    const [localEdicts, setEdicts] = useState<ISpellModifierCardData[]>([]);
    const [localOrders, setOrders] = useState<IWeaponCommonData[]>([]);

    const [sourceName, setSourceName] = useState("");
    const [sourceArcanotype, setSourceArcanotype] = useState("");
    const [sourceTier, setSourceTier] = useState<number>(1);
    const [visibility, setVisibility] = useState<"all" | "restricted" | "admin">("all");

    const [campaignIds, setCampaignIds] = useState<string[]>([]);
    const [onlyTemporary, setOnlyTemporary] = useState(false);
    const [neverTemporary, setNeverTemporary] = useState(false);

    const CAMPAIGN_OPTIONS = [
        "nature",
        "principego",
        "elkarand"
    ];

    const [tiers, setTiers] = useState<ISourceTierDraft[]>([]);

    useEffect(() => {
        (async () => {
            const resp = await CardAPI.GetSourceCards();
            const { bases, edicts, orders } = resp;
            setBases(bases.reverse());
            setEdicts(edicts.reverse());
            setOrders(orders.reverse());
        })();
    }, []);

    const addTier = () => {
        setTiers(prev => [
            ...prev,
            { cardType: "base", cardId: null, isSecret: false }
        ]);
    };

    const removeTier = (index: number) => {
        setTiers(prev => prev.filter((_, i) => i !== index));
    };

    const updateTier = (index: number, patch: Partial<ISourceTierDraft>) => {
        setTiers(prev =>
            prev.map((t, i) => (i === index ? { ...t, ...patch } : t))
        );
    };

    const getOptionsForType = (type: CardType): Array<ICommonCardData> => {
        switch (type) {
            case "base":
                return localBases;
            case "edict":
                return localEdicts;
            case "order":
                return localOrders;
        }
    };

    const submitForm = async() => {
        const payload: ISourceDataAPI  = {
            sourceName,
            sourceArcanotype: sourceArcanotype.toLowerCase(),
            sourceTier,
            campaignIds: campaignIds,
            sourceTiers: tiers
                .filter(t => t.cardId != null)
                .map((t, i) => ({
                    layer: i,
                    cardType: t.cardType.toString(),
                    cardId: t.cardId!,
                    isSecret: t.isSecret
                })),
            visibility,
            onlyTemporary,
            neverTemporary
        };
        try {
            let nsd = await SourceAPI.AddSource(payload)
            SendToSnackbar(`Successfully created ${sourceName}`, "success")
            // Reset the form
            setSourceName("");
            setSourceArcanotype("");
            setSourceTier(1);
            setVisibility("all");
            setCampaignIds([]);
            setOnlyTemporary(false);
            setNeverTemporary(false);
            setTiers([]);
        } catch (error) {
            SendToSnackbar(`Failed to create source ${sourceName}: ${error}`, "error")
        }



        console.log("SUBMIT SOURCE (dummy)", payload);
    };

    const previewData = useMemo(() => ({
        _id: "",
        sourceName,
        sourceArcanotype,
        sourceTier,
        visibility,
        sourceTiers: tiers
            .map((t, i) => {
                const options = getOptionsForType(t.cardType);
                const cardObj = options.find(c => c._id === t.cardId);
                if (!cardObj) return undefined; // use undefined for clarity
                return {
                    layer: i,
                    cardType: t.cardType,
                    cardData: cardObj,
                    isSecret: t.isSecret
                };
            })
            .filter((x): x is { layer: number; cardType: CardType; cardData: ICommonCardData; isSecret: boolean } => x !== undefined),
        law: null,
        onlyTemporary: false,
        neverTemporary: false,
        tempAttunementLevel: 0,
        campaignIds,

    }), [tiers, sourceName, sourceArcanotype, sourceTier]);


    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <Paper
                sx={{
                    margin: "12px",
                    padding: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 1,
                    height: "calc(100vh - 24px)",
                    overflowY: "auto"
                }}
                elevation={0}
            >
                <Typography variant="h5" gutterBottom>
                    Create Source
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Source Name"
                        value={sourceName}
                        onChange={e => setSourceName(e.target.value)}
                        fullWidth
                        autoComplete={"off"}
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel>Arcanotype</InputLabel>
                            <Select
                                value={sourceArcanotype}
                                label="Arcanotype"
                                onChange={e => setSourceArcanotype(e.target.value)}
                            >
                                <MenuItem value="elemental">Elemental</MenuItem>
                                <MenuItem value="divine">Divine</MenuItem>
                                <MenuItem value="mystical">Mystical</MenuItem>
                                <MenuItem value="axum">Axum</MenuItem>
                                <MenuItem value="primal">Primal</MenuItem>
                                <MenuItem value="eonic">Eonic</MenuItem>
                                <MenuItem value="animus">Animus</MenuItem>
                                <MenuItem value="esoteric">Esoteric</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={onlyTemporary}
                                    disabled={neverTemporary}
                                    onChange={e => setOnlyTemporary(e.target.checked)}
                                />
                            }
                            label="Temporary"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={neverTemporary}
                                    disabled={onlyTemporary}
                                    onChange={e => setNeverTemporary(e.target.checked)}
                                />
                            }
                            label="Never Temporary"
                        />
                    </Stack>

                    <Autocomplete
                        multiple
                        freeSolo
                        options={CAMPAIGN_OPTIONS}
                        value={campaignIds}
                        onChange={(_, value) => {
                            setCampaignIds(Array.from(new Set(value)));
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                    key={option}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Campaign IDs"
                                placeholder="Select or type a campaign ID"
                            />
                        )}
                    />

                    <Stack direction="row" spacing={2}>
                        <TextField
                            type="number"
                            label="Source Tier"
                            value={sourceTier}
                            onChange={e => setSourceTier(Number(e.target.value))}
                            sx={{ flex: 1 }}
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

                    <Typography variant="h6">Source Layers</Typography>

                    {tiers.map((tier, index) => {
                        const options = getOptionsForType(tier.cardType);

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
                                                        cardType: e.target.value as CardType,
                                                        cardId: null
                                                    })
                                                }
                                            >
                                                <MenuItem value="base">Base</MenuItem>
                                                <MenuItem value="edict">Edict</MenuItem>
                                                <MenuItem value="order">Order</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(opt: any) => opt.cardName}
                                            value={
                                                options.find(o => o._id === tier.cardId) ??
                                                null
                                            }
                                            onChange={(_, value) =>
                                                updateTier(index, {
                                                    cardId: value ? value._id : null
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
                        );
                    })}

                    <Button variant="outlined" onClick={addTier}>
                        Add Layer
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                    >
                        Submit Source
                    </Button>
                </Stack>
            </Paper>
            <Box>
                <UnmadeSourceComponent
                    sourceData={previewData}
                />
            </Box>
        </Box>
    );
};

export default CreateSourcePage;
