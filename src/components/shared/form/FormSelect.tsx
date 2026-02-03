'use client';

import React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    Typography,
    Box,
    SelectChangeEvent,
    useTheme
} from '@mui/material';

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    error?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = '-- Please Select --',
    required = false,
    fullWidth = true,
    disabled = false,
    error = false,
}) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <Box>
            <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, color: 'text.primary', fontSize: '14px' }}
            >
                {label} {required && <span style={{ color: theme.palette.warning.main }}>*</span>}
            </Typography>
            <FormControl fullWidth={fullWidth} disabled={disabled} error={error}>
                <Select
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                        borderRadius: '8px',
                        fontSize: '14px',
                        height: '44px',
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    }}
                >
                    <MenuItem value="" disabled>
                        <em>{placeholder}</em>
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default FormSelect;
