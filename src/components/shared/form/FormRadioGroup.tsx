'use client';

import React from 'react';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    useTheme
} from '@mui/material';

interface RadioOption {
    value: string;
    label: string;
}

interface FormRadioGroupProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: RadioOption[];
    required?: boolean;
    row?: boolean;
    disabled?: boolean;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
    label,
    value,
    onChange,
    options,
    required = false,
    row = true,
    disabled = false,
}) => {
    const theme = useTheme();

    return (
        <Box>
            <FormControl component="fieldset" disabled={disabled}>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 500, color: 'text.primary', fontSize: '14px' }}
                >
                    {label} {required && <span style={{ color: theme.palette.warning.main }}>*</span>}
                </Typography>
                <RadioGroup
                    row={row}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{ height: 56, alignItems: 'center' }}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={
                                <Radio
                                    sx={{
                                        color: 'primary.main',
                                        '&.Mui-checked': { color: 'primary.main' }
                                    }}
                                />
                            }
                            label={option.label}
                            sx={{ mr: 4, '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default FormRadioGroup;
