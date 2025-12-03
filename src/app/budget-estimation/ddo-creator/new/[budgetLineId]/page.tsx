'use client';

import React from 'react';
import { EstimationForm } from '@/components/budget-estimation/ddo/EstimationForm';

export default function NewEstimationFormPage({ params }: { params: { budgetLineId: string } }) {
    return (
        <EstimationForm
            budgetLineItemId={params.budgetLineId}
            mode="create"
        />
    );
}
