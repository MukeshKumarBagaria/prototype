'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    OutlinedInput,
} from '@mui/material';
import {
    FormInput,
    FormSelect,
    FormRadioGroup,
    FormSwitch,
    ActionButtons,
} from '@/components/shared/form';

type StatusType = 'Draft' | 'Pending' | 'Approved' | 'Rejected';

interface DemandFormData {
    demandNo: string;
    demandType: string;
    nomenclatureEnglish: string;
    nomenclatureHindi: string;
    bookNo: string;
    isActive: boolean;
    verifierRemarks: string;
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

// Sample audit trail data


const VerifyDemandMaster: React.FC = () => {
    const [formData, setFormData] = useState<DemandFormData>({
        // Sample pre-filled data from FD Creator
        demandNo: '101',
        demandType: 'Normal',
        nomenclatureEnglish: 'Agriculture and Allied Services',
        nomenclatureHindi: 'कृषि एवं संबद्ध सेवाएं',
        bookNo: 'book1',
        isActive: true,
        verifierRemarks: ''
    });

    // Status is Pending as it's submitted for verification
    const [status] = useState<StatusType>('Pending');


    const handleInputChange = (field: keyof DemandFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };



    const handleClose = () => {
        window.history.back();
    };

    const handleVerify = () => {
        console.log('Verify:', formData);
        // Move to Approver worklist
        alert('Record verified and sent to FD Approver worklist.');
    };

    const handleRevert = () => {
        if (!formData.verifierRemarks.trim()) {
            alert('Remarks are mandatory when reverting.');
            return;
        }
        console.log('Revert:', formData);
        // Move back to FD Creator
        alert('Record reverted to FD Creator with remarks.');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
            <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
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
                                Verify Demand Master
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                                Review the demand request and verify or revert with remarks.
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
                                    onChange={() => { }} // Read-only for verifier
                                    placeholder="Enter 3 digit demand no"
                                    required
                                    maxLength={3}
                                    disabled
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

                            {/* Divider */}
                            <Divider />

                            {/* Verifier Remarks */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    component="span"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        color: 'text.primary'
                                    }}
                                >
                                    Verifier Remarks
                                    <Typography component="span" sx={{ color: 'error.main' }}>*</Typography>
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: 'text.secondary',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            ml: 1
                                        }}
                                    >
                                        (Required when reverting)
                                    </Typography>
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.verifierRemarks}
                                    onChange={(e) => handleInputChange('verifierRemarks', e.target.value)}
                                    placeholder="Enter Remarks ........ Mandatory if Reverting...."
                                    sx={{
                                        mt: 2,
                                        fontSize: '14px',
                                        bgcolor: '#f8fafc',
                                        padding: '12px',
                                        '& .MuiOutlinedInput-input': {
                                            padding: 0,
                                        },
                                        '& textarea::placeholder': {
                                            color: '#9ca3af',
                                            opacity: 1,
                                        }
                                    }}
                                />
                            </Box>
                        </Stack>


                        {/* Divider */}
                        <Divider sx={{ my: 4 }} />

                        {/* Action Buttons */}
                        <ActionButtons
                            showReset={false}
                            showSaveDraft={false}
                            showSubmit={true}
                            showClose={true}
                            showReturn={true}
                            onClose={handleClose}
                            onReturn={handleRevert}
                            onSubmit={handleVerify}
                            submitLabel="Verify"
                            returnLabel="Revert"
                            leftButtons={['close']}
                            rightButtons={['return', 'submit']}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default VerifyDemandMaster;
