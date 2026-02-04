'use client';

import React from 'react';
import { TextField, Typography, Box, useTheme } from '@mui/material';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
    type?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    maxLength,
    type = 'text',
    fullWidth = true,
    disabled = false,
    error = false,
    helperText = '',
}) => {
    const theme = useTheme();

    return (
        <Box>
            <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, color: 'text.primary', fontSize: '14px' }}
            >
                {label} {required && <span style={{ color: theme.palette.error.main }}>*</span>}
            </Typography>
            <TextField
                fullWidth={fullWidth}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                inputProps={{ maxLength }}
                size="medium"
                disabled={disabled}
                error={error}
                helperText={helperText}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        fontSize: '14px',
                        height: '44px',
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                    },
                    '& .MuiInputBase-input::placeholder': {
                        fontSize: '14px',
                    },
                }}
            />
        </Box>
    );
};

export default FormInput;
