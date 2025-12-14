import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import CurrencySpinner from "./CurrencySpinner";
import { ICurrencyData } from "../../Data/ICharacterData";
import AddIcon from "@mui/icons-material/Add";

interface ICurrencyPanelInput {}

const CurrencyPanel = ({}: ICurrencyPanelInput) => {
    const { currentSheet } = useCharacter();

    const [localCurrencyValues, setLocalCurrencyValues] = useState<ICurrencyData[]>([]);
    const [dirty, setDirty] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStore, setNewStore] = useState('');
    const [newType, setNewType] = useState('');

    // Sync local state with currentSheet on mount / when currencyValues change
    useEffect(() => {
        if (currentSheet?.data.currencyValues) {
            setLocalCurrencyValues([...currentSheet.data.currencyValues]);
            setDirty(false);
        }
    }, [currentSheet?.data.currencyValues]);

    const handleSpinnerChange = (index: number, newAmount: number) => {
        const updated = [...localCurrencyValues];
        updated[index] = { ...updated[index], currencyAmount: newAmount };
        setLocalCurrencyValues(updated);
        setDirty(true); // mark as changed
    };

    const handleSave = async () => {
        if (!currentSheet) return;
        await currentSheet.SaveCharacterCurrency(localCurrencyValues);
        setDirty(false);
    };

    const handleAddCurrency = () => {
        const newCurrency: ICurrencyData = {
            currencyAmount: 0,
            currencyStore: newStore,
            currencyType: newType,
        };
        setLocalCurrencyValues([...localCurrencyValues, newCurrency]);
        setDirty(true);
        setIsDialogOpen(false);
        setNewStore('');
        setNewType('');
    };

    if (!currentSheet) return null;

    return (
        <Box>
            {/* Header with Save and Add buttons */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h6">Currency</Typography>
                <Box>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleSave}
                        disabled={!dirty}
                        sx={{ mr: 1 }}
                    >
                        Save
                    </Button>
                    <IconButton
                        color="default"
                        size="small"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* List of currency spinners */}
            {localCurrencyValues.map((currency, index) => (
                <CurrencySpinner
                    key={currency._id || index}
                    currencyData={currency}
                    onChange={(newAmount) => handleSpinnerChange(index, newAmount)}
                />
            ))}

            {/* Dialog for adding new currency */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Add New Currency</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Currency Store"
                        value={newStore}
                        onChange={(e) => setNewStore(e.target.value)}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Currency Type</InputLabel>
                        <Select
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            label="Currency Type"
                        >
                            {["elos", "arc", "unum"].map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleAddCurrency}
                        disabled={!newStore || !newType}
                        variant="contained"
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CurrencyPanel;
