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
import { InputAdornment } from "@mui/material";

interface NumberSpinnerProps extends BaseNumberField.Root.Props {
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    error?: boolean;
    step?: number;
    postText?: string;
    preText?: string;
}

export default function NumberSpinner({
                                          id: idProp,
                                          label,
                                          error,
                                          size = 'medium',
                                          step = 1,
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

            {/* Buttons + Input */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>

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
            </Box>
        </BaseNumberField.Root>
    );
}
