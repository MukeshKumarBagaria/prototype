'use client';

import React from 'react';
import { EstimationForm } from '@/components/budget-estimation/ddo/EstimationForm';
import { use } from 'react';

export default function NewEstimationFormPage({ params }: { params: Promise<{ budgetLineId: string }> }) {
    const { budgetLineId } = use(params);

    return (
        <EstimationForm
            budgetLineItemId={budgetLineId}
            mode="create"
        />
    );
}
