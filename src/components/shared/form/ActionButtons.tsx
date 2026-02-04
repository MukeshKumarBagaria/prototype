'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
// Material UI Icons - matching Figma design exactly
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';

// Button type definitions based on Figma design
export type ActionButtonVariant = 'submit' | 'reset' | 'return' | 'draft' | 'hold' | 'close' | 'reject';

interface ActionButtonConfig {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

interface ActionButtonsProps {
    // Individual button configurations
    onReset?: () => void;
    onClose?: () => void;
    onSaveDraft?: () => void;
    onSubmit?: () => void;
    onReturn?: () => void;
    onHold?: () => void;
    onReject?: () => void;

    // Visibility controls
    showReset?: boolean;
    showClose?: boolean;
    showSaveDraft?: boolean;
    showSubmit?: boolean;
    showReturn?: boolean;
    showHold?: boolean;
    showReject?: boolean;

    // Custom labels
    resetLabel?: string;
    closeLabel?: string;
    saveDraftLabel?: string;
    submitLabel?: string;
    returnLabel?: string;
    holdLabel?: string;
    rejectLabel?: string;

    // Global disabled state
    disabled?: boolean;

    // Custom button arrangement (for more flexibility)
    leftButtons?: ActionButtonVariant[];
    rightButtons?: ActionButtonVariant[];
}

// Button styles based on Figma design
const getButtonStyles = (variant: ActionButtonVariant, disabled: boolean = false) => {
    const baseStyles = {
        borderRadius: '4px',
        textTransform: 'none' as const,
        fontWeight: 500,
        fontSize: '14px',
        height: '36px',
        px: 2,
        boxShadow: 'none',
        minWidth: 'auto',
        gap: 0.5,
    };

    const variants = {
        submit: {
            bgcolor: '#1976D2',
            color: '#FFFFFF',
            borderColor: '#1976D2',
            '&:hover': {
                bgcolor: '#1565C0',
                boxShadow: 'none',
            },
            '&:active': {
                bgcolor: '#0D47A1',
            },
            '&:disabled': {
                bgcolor: '#BDBDBD',
                color: '#757575',
            },
        },
        reset: {
            bgcolor: '#FFFFFF',
            color: '#424242',
            border: '1px solid #E0E0E0',
            '&:hover': {
                bgcolor: '#F5F5F5',
                borderColor: '#BDBDBD',
            },
            '&:active': {
                bgcolor: '#EEEEEE',
            },
            '&:disabled': {
                bgcolor: '#FAFAFA',
                color: '#BDBDBD',
                borderColor: '#E0E0E0',
            },
        },
        return: {
            bgcolor: '#FFC107',
            color: '#000000',
            '&:hover': {
                bgcolor: '#FFB300',
                boxShadow: 'none',
            },
            '&:active': {
                bgcolor: '#FFA000',
            },
            '&:disabled': {
                bgcolor: '#E0E0E0',
                color: '#9E9E9E',
            },
        },
        draft: {
            bgcolor: '#FFC107',
            color: '#000000',
            '&:hover': {
                bgcolor: '#FFB300',
                boxShadow: 'none',
            },
            '&:active': {
                bgcolor: '#FFA000',
            },
            '&:disabled': {
                bgcolor: '#E0E0E0',
                color: '#9E9E9E',
            },
        },
        hold: {
            bgcolor: '#FFC107',
            color: '#000000',
            '&:hover': {
                bgcolor: '#FFB300',
                boxShadow: 'none',
            },
            '&:active': {
                bgcolor: '#FFA000',
            },
            '&:disabled': {
                bgcolor: '#E0E0E0',
                color: '#9E9E9E',
            },
        },
        close: {
            bgcolor: '#FFFFFF',
            color: '#D32F2F',
            border: '1px solid #FFCDD2',
            '&:hover': {
                bgcolor: '#FFEBEE',
                borderColor: '#EF9A9A',
            },
            '&:active': {
                bgcolor: '#FFCDD2',
            },
            '&:disabled': {
                bgcolor: '#FAFAFA',
                color: '#BDBDBD',
                borderColor: '#E0E0E0',
            },
        },
        reject: {
            bgcolor: '#D32F2F',
            color: '#FFFFFF',
            '&:hover': {
                bgcolor: '#C62828',
                boxShadow: 'none',
            },
            '&:active': {
                bgcolor: '#B71C1C',
            },
            '&:disabled': {
                bgcolor: '#BDBDBD',
                color: '#757575',
            },
        },
    };

    return { ...baseStyles, ...variants[variant] };
};

// Icons for each button type - matching Figma design exactly
const getButtonIcon = (variant: ActionButtonVariant) => {
    const iconProps = { fontSize: 'small' as const, sx: { fontSize: '18px' } };

    switch (variant) {
        case 'submit':
            return <CheckCircleOutlineIcon {...iconProps} />;
        case 'reset':
            return <ReplayIcon {...iconProps} />;
        case 'return':
            return <ArrowBackIcon {...iconProps} />;
        case 'draft':
            return <DescriptionOutlinedIcon {...iconProps} />;
        case 'hold':
            return <PauseCircleOutlineIcon {...iconProps} />;
        case 'close':
            return <CancelOutlinedIcon {...iconProps} />;
        case 'reject':
            return <CloseIcon {...iconProps} />;
        default:
            return null;
    }
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    onReset,
    onClose,
    onSaveDraft,
    onSubmit,
    onReturn,
    onHold,
    onReject,
    showReset = true,
    showClose = true,
    showSaveDraft = true,
    showSubmit = true,
    showReturn = false,
    showHold = false,
    showReject = false,
    resetLabel = 'Reset',
    closeLabel = 'Close',
    saveDraftLabel = 'Draft',
    submitLabel = 'Submit',
    returnLabel = 'Return',
    holdLabel = 'Hold',
    rejectLabel = 'Reject',
    disabled = false,
    leftButtons,
    rightButtons,
}) => {
    // Build button configuration
    const buttonConfigs: Record<ActionButtonVariant, { show: boolean; label: string; onClick?: () => void }> = {
        submit: { show: showSubmit, label: submitLabel, onClick: onSubmit },
        reset: { show: showReset, label: resetLabel, onClick: onReset },
        return: { show: showReturn, label: returnLabel, onClick: onReturn },
        draft: { show: showSaveDraft, label: saveDraftLabel, onClick: onSaveDraft },
        hold: { show: showHold, label: holdLabel, onClick: onHold },
        close: { show: showClose, label: closeLabel, onClick: onClose },
        reject: { show: showReject, label: rejectLabel, onClick: onReject },
    };

    // Default button arrangement if not specified
    const defaultLeftButtons: ActionButtonVariant[] = ['reset', 'close'];
    const defaultRightButtons: ActionButtonVariant[] = ['draft', 'submit'];

    const left = leftButtons || defaultLeftButtons;
    const right = rightButtons || defaultRightButtons;

    const renderButton = (variant: ActionButtonVariant) => {
        const config = buttonConfigs[variant];
        if (!config.show) return null;

        return (
            <Button
                key={variant}
                variant={variant === 'reset' || variant === 'close' ? 'outlined' : 'contained'}
                onClick={config.onClick}
                disabled={disabled}
                startIcon={getButtonIcon(variant)}
                sx={getButtonStyles(variant, disabled)}
            >
                {config.label}
            </Button>
        );
    };

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
                {left.map(variant => renderButton(variant))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {right.map(variant => renderButton(variant))}
            </Box>
        </Box>
    );
};

// Standalone button component for custom usage
interface SingleActionButtonProps {
    variant: ActionButtonVariant;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const SingleActionButton: React.FC<SingleActionButtonProps> = ({
    variant,
    label,
    onClick,
    disabled = false,
}) => {
    const defaultLabels: Record<ActionButtonVariant, string> = {
        submit: 'Submit',
        reset: 'Reset',
        return: 'Return',
        draft: 'Draft',
        hold: 'Hold',
        close: 'Close',
        reject: 'Reject',
    };

    return (
        <Button
            variant={variant === 'reset' || variant === 'close' ? 'outlined' : 'contained'}
            onClick={onClick}
            disabled={disabled}
            startIcon={getButtonIcon(variant)}
            sx={getButtonStyles(variant, disabled)}
        >
            {label || defaultLabels[variant]}
        </Button>
    );
};

export default ActionButtons;
