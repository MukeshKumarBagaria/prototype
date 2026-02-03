'use client';

import React from 'react';
import { Switch, Typography, Box, useTheme } from '@mui/material';

interface FormSwitchProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
    disabled?: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
    label,
    description,
    checked,
    onChange,
    required = false,
    disabled = false,
    activeLabel = 'Active',
    inactiveLabel = 'Inactive',
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '14px' }}>
                    {label} {required && <span style={{ color: theme.palette.warning.main }}>*</span>}
                </Typography>
                {description && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: '14px' }}>
                        {description}
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Switch
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'primary.main',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'primary.main',
                        },
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        fontSize: '14px',
                        color: checked ? 'primary.main' : 'text.secondary'
                    }}
                >
                    {checked ? activeLabel : inactiveLabel}
                </Typography>
            </Box>
        </Box>
    );
};

export default FormSwitch;
