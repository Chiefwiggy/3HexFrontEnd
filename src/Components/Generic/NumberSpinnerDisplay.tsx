import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from "@mui/material";

interface NumberSpinnerDisplayProps {
    id?: string;
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    error?: boolean;
    value?: number | null;
    preText?: string;
    postText?: string;
}

export default function NumberSpinnerDisplay({
                                                 id,
                                                 label,
                                                 size = 'medium',
                                                 error,
                                                 value,
                                                 preText = "",
                                                 postText = "",
                                             }: NumberSpinnerDisplayProps) {

    return (
        <FormControl
            size={size}
            disabled
            error={error}
            variant="outlined"
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'action.hover',
                }
            }}
        >
            {label && (
                <FormLabel
                    htmlFor={id}
                    sx={{
                        fontSize: '0.875rem',
                        color: 'text.primary',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        mb: 0.5,
                    }}
                >
                    {label}
                </FormLabel>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <OutlinedInput
                    id={id}
                    value={value ?? ""}
                    readOnly
                    startAdornment={
                        preText ? (
                            <InputAdornment position="start">
                                {preText}
                            </InputAdornment>
                        ) : undefined
                    }
                    endAdornment={
                        postText ? (
                            <InputAdornment position="end">
                                {postText}
                            </InputAdornment>
                        ) : undefined
                    }
                    sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-input': {
                            px: 1,
                            textAlign: 'center',
                        },
                    }}
                />
            </Box>
        </FormControl>
    );
}
