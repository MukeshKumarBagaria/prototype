'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

interface ActionButtonsProps {
    onReset?: () => void;
    onClose?: () => void;
    onSaveDraft?: () => void;
    onSubmit?: () => void;
    showReset?: boolean;
    showClose?: boolean;
    showSaveDraft?: boolean;
    showSubmit?: boolean;
    resetLabel?: string;
    closeLabel?: string;
    saveDraftLabel?: string;
    submitLabel?: string;
    disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onReset,
    onClose,
    onSaveDraft,
    onSubmit,
    showReset = true,
    showClose = true,
    showSaveDraft = true,
    showSubmit = true,
    resetLabel = 'Reset',
    closeLabel = 'Close',
    saveDraftLabel = 'Save Draft',
    submitLabel = 'Submit',
    disabled = false,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
            }}
        >
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {showReset && (
                    <Button
                        variant="outlined"
                        onClick={onReset}
                        disabled={disabled}
                        sx={{
                            borderColor: 'divider',
                            color: 'text.primary',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '16px',
                            height: '48px',
                            px: 3,
                            '&:hover': {
                                borderColor: 'grey.400',
                                bgcolor: 'background.default'
                            }
                        }}
                    >
                        {resetLabel}
                    </Button>
                )}
                {showClose && (
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={disabled}
                        sx={{
                            borderColor: 'error.main',
                            color: 'error.main',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '16px',
                            height: '48px',
                            px: 3,
                            '&:hover': {
                                borderColor: 'error.dark',
                                bgcolor: 'error.light'
                            }
                        }}
                    >
                        {closeLabel}
                    </Button>
                )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {showSaveDraft && (
                    <Button
                        variant="contained"
                        onClick={onSaveDraft}
                        startIcon={<SaveIcon />}
                        disabled={disabled}
                        sx={{
                            bgcolor: 'warning.main',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '16px',
                            height: '48px',
                            px: 3,
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: 'warning.dark',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {saveDraftLabel}
                    </Button>
                )}
                {showSubmit && (
                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        startIcon={<CheckIcon />}
                        disabled={disabled}
                        sx={{
                            bgcolor: 'primary.main',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '16px',
                            height: '48px',
                            px: 3,
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {submitLabel}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ActionButtons;
