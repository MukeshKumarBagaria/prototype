'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Divider, Stack, Chip } from '@mui/material';
import {
    FormInput,
    FormSelect,
    FormRadioGroup,
    FormSwitch,
    ActionButtons
} from '@/components/shared/form';

type StatusType = 'Draft' | 'Pending' | 'Approved' | 'Rejected';

interface DemandFormData {
    demandNo: string;
    demandType: string;
    nomenclatureEnglish: string;
    nomenclatureHindi: string;
    bookNo: string;
    isActive: boolean;
}

const getStatusColor = (status: StatusType): string => {
    switch (status) {
        case 'Draft':
            return '#1565c0'; // Blue
        case 'Pending':
            return '#e65100'; // Orange
        case 'Approved':
            return '#1b5e20'; // Green
        case 'Rejected':
            return '#c62828'; // Red
        default:
            return '#1565c0';
    }
};

const getStatusBgColor = (status: StatusType): string => {
    switch (status) {
        case 'Draft':
            return '#e3f2fd'; // Light Blue
        case 'Pending':
            return '#fff3e0'; // Light Orange
        case 'Approved':
            return '#e8f5e9'; // Light Green
        case 'Rejected':
            return '#ffebee'; // Light Red
        default:
            return '#e3f2fd';
    }
};

const bookOptions = [
    { value: 'book1', label: 'Book 1' },
    { value: 'book2', label: 'Book 2' },
    { value: 'book3', label: 'Book 3' },
    { value: 'book4', label: 'Book 4' },
];

const demandTypeOptions = [
    { value: 'Common', label: 'Common' },
    { value: 'Normal', label: 'Normal' },
];

const CreateDemandMaster: React.FC = () => {
    const [formData, setFormData] = useState<DemandFormData>({
        demandNo: '',
        demandType: 'Normal',
        nomenclatureEnglish: '',
        nomenclatureHindi: '',
        bookNo: '',
        isActive: true
    });

    // Status can be: Draft, Pending, Approved, Rejected
    const [status] = useState<StatusType>('Draft');

    const handleInputChange = (field: keyof DemandFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFormData({
            demandNo: '',
            demandType: 'Normal',
            nomenclatureEnglish: '',
            nomenclatureHindi: '',
            bookNo: '',
            isActive: true
        });
    };

    const handleClose = () => {
        window.history.back();
    };

    const handleSaveDraft = () => {
        console.log('Save Draft:', formData);
    };

    const handleSubmit = () => {
        console.log('Submit:', formData);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                <Card>
                    {/* Header Section with Gray Background */}
                    <Box sx={{
                        bgcolor: '#F8FAFC',
                        px: 4,
                        py: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <Box>
                            <Typography
                                variant="h5"
                                component="h1"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 0.5
                                }}
                            >
                                Create Demand Master
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                                Fill in the details below to create a new demand record.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                bgcolor: getStatusBgColor(status),
                                color: getStatusColor(status),
                                px: 2,
                                py: 0.75,
                                borderRadius: 1,
                                fontSize: '14px',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {status}
                        </Box>
                    </Box>

                    {/* Form Content */}
                    <CardContent sx={{ p: 4 }}>
                        {/* Form Fields */}
                        <Stack spacing={3}>
                            {/* Row 1: Demand No and Demand Type */}
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                <FormInput
                                    label="Demand No"
                                    value={formData.demandNo}
                                    onChange={(value) => handleInputChange('demandNo', value)}
                                    placeholder="Enter 3 digit demand no"
                                    required
                                    maxLength={3}
                                />

                                <FormRadioGroup
                                    label="Demand Type"
                                    value={formData.demandType}
                                    onChange={(value) => handleInputChange('demandType', value)}
                                    options={demandTypeOptions}
                                    required
                                />
                            </Box>

                            {/* Row 2: Nomenclature English and Hindi */}
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                <FormInput
                                    label="Nomenclature (English)"
                                    value={formData.nomenclatureEnglish}
                                    onChange={(value) => handleInputChange('nomenclatureEnglish', value)}
                                    placeholder="Enter description in English"
                                    required
                                />

                                <FormInput
                                    label="Nomenclature (Hindi)"
                                    value={formData.nomenclatureHindi}
                                    onChange={(value) => handleInputChange('nomenclatureHindi', value)}
                                    placeholder="विवरण हिंदी में दर्ज करें"
                                />
                            </Box>

                            {/* Row 3: Book No */}
                            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                                <FormSelect
                                    label="Book No"
                                    value={formData.bookNo}
                                    onChange={(value) => handleInputChange('bookNo', value)}
                                    options={bookOptions}
                                    required
                                />
                            </Box>

                            {/* Active Status */}
                            <FormSwitch
                                label="Active Status"
                                description="Enable or disable this demand number immediately."
                                checked={formData.isActive}
                                onChange={(checked) => handleInputChange('isActive', checked)}
                                required
                            />
                        </Stack>

                        {/* Divider */}
                        <Divider sx={{ my: 4 }} />

                        {/* Action Buttons */}
                        <ActionButtons
                            onReset={handleReset}
                            onClose={handleClose}
                            onSaveDraft={handleSaveDraft}
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default CreateDemandMaster;
