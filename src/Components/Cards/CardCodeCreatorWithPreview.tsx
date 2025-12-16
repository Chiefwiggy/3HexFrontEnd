import React, { useState } from "react";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
    TextField
} from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { disambiguateCard } from "../../Utils/DisambiguateCardType";
import { ICommonCardData } from "../../Data/ICardData";
import { templates } from "../../Data/CardJSONTemplates";
import useAPI from "../../Hooks/useAPI/useAPI";
import SafeWrapper from "../../Utils/SafeWrapper";
import useUser from "../../Hooks/useUser/useUser";
import useSnackbar from "../../Hooks/useSnackbar/useSnackbar";

// Type guard with error reporting
function validateCardData(obj: any): { valid: boolean; missing?: string[] } {
    const requiredFields: Array<keyof ICommonCardData> = [
        "cardName",
        "cardType",
        "cardSubtype",
        "effects",
        "prerequisites"
    ];
    const missing = requiredFields.filter((key) => obj[key] === undefined);
    return { valid: missing.length === 0, missing: missing.length > 0 ? missing : undefined };
}

const CardCodeCreatorWithPreview: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("Commander Card");
    const [jsonInput, setJsonInput] = useState<string>(templates["Commander Card"]);
    const [parsedData, setParsedData] = useState<ICommonCardData | null>(() => {
        try {
            return JSON.parse(templates["Commander Card"]);
        } catch {
            return null;
        }
    });
    const [existingCardId, setExistingCardId] = useState<string>("");
    const [isLoadedCard, setIsLoadedCard] = useState(false);
    const [loadedId, setLoadedId] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { CardAPI, CardRequestAPI } = useAPI();
    const { userPermissions } = useUser()
    const { SendToSnackbar } = useSnackbar()

    const compendiumProps = {
        isExpanded: true,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true,
        isDraft: true
    };

    // Load existing card
    const handleLoadCard = async () => {
        if (!existingCardId) {
            alert("Please enter a card ID to load.");
            return;
        }

        try {
            const fullCard = await CardAPI.GetCardById(existingCardId);
            const {
                _id,
                __v,
                createdAt,
                updatedAt,
                ...card
            } = fullCard;
            const validation = validateCardData(card);

            if (!validation.valid) {
                setErrorMessage(`Missing required fields: ${validation.missing?.join(", ")}`);
                setParsedData(null);
            } else {
                setErrorMessage("");
                setLoadedId(_id)
                setParsedData(card);
            }

            setJsonInput(JSON.stringify(card, null, 2));
            setIsLoadedCard(true);
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to load card. Check ID.");
            setIsLoadedCard(false);
        }
    };

    const resetToDefaultTemplate = () => {
        const defaultTemplate = "Commander Card";
        const templateJson = templates[defaultTemplate];

        setSelectedTemplate(defaultTemplate);
        setJsonInput(templateJson);
        setExistingCardId("");
        setLoadedId("");
        setIsLoadedCard(false);
        setErrorMessage("");

        try {
            setParsedData(JSON.parse(templateJson));
        } catch {
            setParsedData(null);
        }
    };

    // Handle template selection
    const handleTemplateChange = (event: SelectChangeEvent<string>) => {
        const templateName = event.target.value;
        setSelectedTemplate(templateName);

        const templateJson = templates[templateName] ?? "{}";
        setJsonInput(templateJson);

        try {
            const parsed = JSON.parse(templateJson);
            const validation = validateCardData(parsed);

            if (!validation.valid) {
                setErrorMessage(`Missing required fields: ${validation.missing?.join(", ")}`);
                setParsedData(null);
            } else {
                setErrorMessage("");
                setParsedData(parsed);
            }

            setIsLoadedCard(false); // new card from template
        } catch {
            setErrorMessage("Invalid JSON syntax");
            setParsedData(null);
            setIsLoadedCard(false);
        }
    };

    // Handle manual JSON edits
    const handleJsonChange = (value: string | undefined) => {
        const input = value ?? "";
        setJsonInput(input);

        try {
            const parsed = JSON.parse(input);
            const validation = validateCardData(parsed);

            if (!validation.valid) {
                setErrorMessage(`Missing required fields: ${validation.missing?.join(", ")}`);
                setParsedData(null);
            } else {
                setErrorMessage("");
                setParsedData(parsed);
            }
        } catch {
            setErrorMessage("Invalid JSON syntax");
            setParsedData(null);
        }
    };

    // Submit or update card
    const handleSubmit = async () => {
        if (!parsedData) {
            alert("Cannot submit: invalid card data");
            return;
        }

        try {

            const { cardType, cardSubtype } = parsedData;

            console.log(cardType, cardSubtype);

            let uri = `${cardType}s/${cardSubtype}`;

            if (cardType === "commander") {
                uri = `commander`;
            } else {
                const subtypeMap: Record<string, string> = {
                    hack_function: "hacks/base",
                    weapon_order: "weapons/skill/order",
                    spell_summon: "spells/target/summon",
                    spell_skill: "spells/modifier",
                    spell_edict: "spells/modifier/edict",
                    hack_util: `hacks/modifier/util`,
                    hack_else: `hacks/modifier/else`,
                };
                if (`${cardType}_${cardSubtype}` in subtypeMap) {
                    uri = subtypeMap[`${cardType}_${cardSubtype}`];
                }
            }

            console.log(uri)


            if (isLoadedCard) {
                // Update existing card
                console.log(uri, parsedData)
                if (userPermissions.includes("admin")) {
                    await CardAPI.UpdateCard(uri, loadedId, parsedData);
                    SendToSnackbar(`Update to ${parsedData.cardName} submitted.`, "success")
                } else {
                    await CardRequestAPI.MakeRequest(localStorage.getItem("email") ?? "error", "update", uri, JSON.stringify(parsedData))
                    SendToSnackbar(`Update to ${parsedData.cardName} request submitted.`, "success")
                }
                resetToDefaultTemplate();
            } else {
                if (userPermissions.includes("admin")) {
                    await CardAPI.AddCard(uri, parsedData);
                    SendToSnackbar(`${parsedData.cardName} added.`, "success")
                } else {
                    await CardRequestAPI.MakeRequest(localStorage.getItem("email") ?? "error", "new_card", uri, JSON.stringify(parsedData))
                    SendToSnackbar(`Creation of ${parsedData.cardName} request submitted.`, "success")
                }

                resetToDefaultTemplate();
            }
        } catch (err) {
            console.error(err);
            SendToSnackbar(`Submission failed. ${err}`, "error")
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                height: "100vh",
                padding: 2
            }}
        >
            {/* Left Panel */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6">Raw JSON</Typography>

                {/* Template Selector */}
                <FormControl fullWidth>
                    <InputLabel>Template</InputLabel>
                    <Select value={selectedTemplate} onChange={handleTemplateChange} label="Template">
                        {Object.keys(templates).map((tpl) => (
                            <MenuItem key={tpl} value={tpl}>
                                {tpl}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Load Existing Card */}
                <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
                    <TextField
                        label="Card ID"
                        value={existingCardId}
                        onChange={(e) => setExistingCardId(e.target.value)}
                        size="small"
                        fullWidth
                    />
                    <Button variant="outlined" onClick={handleLoadCard}>
                        Load
                    </Button>
                </Box>

                {/* Ace Editor */}
                <AceEditor
                    mode="json"
                    theme="monokai"
                    value={jsonInput}
                    onChange={handleJsonChange}
                    width="100%"
                    height="calc(100% - 150px)"
                    fontSize={14}
                    setOptions={{
                        tabSize: 2,
                        useWorker: false,
                        autoCloseBrackets: true,
                        showLineNumbers: true,
                        wrap: true
                    }}
                    editorProps={{ $blockScrolling: true }}
                />

                {errorMessage && (
                    <Typography color="error" variant="body2">
                        {errorMessage}
                    </Typography>
                )}
            </Box>

            {/* Right Panel - Preview */}
            <Box sx={{ overflowY: "auto", padding: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h4">Preview</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 1 }}
                        onClick={handleSubmit}
                        disabled={!parsedData}
                    >
                        {userPermissions.includes("admin") ? (isLoadedCard ? "Update Card" : "Submit Card") : (isLoadedCard ? "Request Update" : "Request New Card")}
                    </Button>
                </Box>

                {parsedData ? (
                    <SafeWrapper>
                        {disambiguateCard([parsedData], compendiumProps).filter(Boolean)}
                    </SafeWrapper>
                ) : (
                    <Typography>Invalid card JSON</Typography>
                )}
            </Box>
        </Box>
    );
};

export default CardCodeCreatorWithPreview;
