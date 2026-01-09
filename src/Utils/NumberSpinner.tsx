import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OutlinedInput from '@mui/material/OutlinedInput';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {Utils} from "./LanguageLacking";
import {InputAdornment} from "@mui/material";

interface NumberSpinnerProps extends BaseNumberField.Root.Props {
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    error?: boolean;
    step?: number;       // small step
    stepLarge?: number;  // large step
    postText?: string;
    preText?: string;

}

export default function NumberSpinner({
    id: idProp,
    label,
    error,
    size = 'medium',
    step = 1,
    stepLarge = 10,
    value,
    onValueChange,
    max,
    min,
    preText = "",
    postText = "",
    ...other
}: NumberSpinnerProps) {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    // Internal handler for large step buttons
    const handleLargeIncrement = () => {
        if (onValueChange) {
            const newValue = max ?  Math.min(max, (value ?? 0) + stepLarge) : (value ?? 0) + stepLarge
            onValueChange(newValue, null as any);
        }
    };

    const handleLargeDecrement = () => {
        if (onValueChange) {
            const newValue = min !== undefined ? Math.max(min, (value ?? 0) - stepLarge) : (value ?? 0) - stepLarge
            onValueChange(newValue, null as any);
        }
    };

    return (
        <BaseNumberField.Root
            {...other}
            value={value}
            onValueChange={onValueChange}
            step={step}
            min={min}
            max={max}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                    sx={{
                        '& .MuiButton-root': {
                            borderColor: 'divider',
                            minWidth: 0,
                            bgcolor: 'action.hover',
                            '&:not(.Mui-disabled)': {
                                color: 'text.primary',
                            },
                        },
                    }}
                >
                    {props.children}
                </FormControl>
            )}
        >
            {/* Scrub area */}
            <BaseNumberField.ScrubArea
                render={
                    <Box component="span" sx={{ userSelect: 'none', width: 'max-content' }} />
                }
            >
                <FormLabel
                    htmlFor={id}
                    sx={{
                        display: 'inline-block',
                        cursor: 'ew-resize',
                        fontSize: '0.875rem',
                        color: 'text.primary',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        mb: 0.5,
                    }}
                >
                    {label}
                </FormLabel>
                <BaseNumberField.ScrubAreaCursor>
                    <OpenInFullIcon
                        fontSize="small"
                        sx={{ transform: 'translateY(12.5%) rotate(45deg)' }}
                    />
                </BaseNumberField.ScrubAreaCursor>
            </BaseNumberField.ScrubArea>

            {/* Buttons + Input */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {/* Large decrement */}
                <Button
                    variant="outlined"
                    size={size}
                    onClick={handleLargeDecrement}
                    aria-label={`Decrease by ${stepLarge}`}
                    disabled={min !== undefined && value !== null && value !== undefined && value <= min}
                >
                    -{stepLarge}
                </Button>


                {/* Small decrement */}
                <BaseNumberField.Decrement
                    render={
                        <Button
                            variant="outlined"
                            size={size}
                            sx={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: '0px',
                                '&.Mui-disabled': { borderRight: '0px' },
                            }}
                            aria-label={`Decrease by ${step}`}
                        >
                            {step !== 1 ? `-${step}` : <RemoveIcon fontSize={size} />}
                        </Button>
                    }
                />

                {/* Input */}
                <BaseNumberField.Input
                    id={id}
                    render={(props, state) => (
                        <OutlinedInput
                            inputRef={props.ref}
                            value={state.inputValue}
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                            onKeyUp={props.onKeyUp}
                            onKeyDown={props.onKeyDown}
                            onFocus={props.onFocus}
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
                            slotProps={{
                                input: {
                                    ...props,
                                    size: 7,
                                    sx: { textAlign: 'center' },
                                },
                            }}
                            sx={{
                                borderRadius: 0,
                                flex: 1,
                                '& .MuiOutlinedInput-input': {
                                    px: 1,
                                    textAlign: 'center',
                                },
                            }}
                        />
                    )}
                />

                {/* Small increment */}
                <BaseNumberField.Increment
                    render={
                        <Button
                            variant="outlined"
                            size={size}
                            sx={{
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeft: '0px',
                                '&.Mui-disabled': { borderLeft: '0px' },
                            }}
                            aria-label={`Increase by ${step}`}
                        >
                            {step !== 1 ? `+${step}` : <AddIcon fontSize={size} />}
                        </Button>
                    }
                />

                {/* Large increment */}

                <Button
                    variant="outlined"
                    size={size}
                    onClick={handleLargeIncrement}
                    aria-label={`Increase by ${stepLarge}`}
                    disabled={Boolean(max && value && value >= max)}
                >
                    +{stepLarge}
                </Button>
            </Box>
        </BaseNumberField.Root>
    );
}
