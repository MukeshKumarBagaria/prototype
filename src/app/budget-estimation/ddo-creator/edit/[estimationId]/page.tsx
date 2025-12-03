'use client';

import React from 'react';
import { EstimationForm } from '@/components/budget-estimation/ddo/EstimationForm';
import { MOCK_ESTIMATIONS } from '@/data/budget-estimation/mockData';

export default function EditEstimationPage({ params }: { params: { estimationId: string } }) {
    const estimation = MOCK_ESTIMATIONS.find(e => e.id === params.estimationId);

    if (!estimation) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-900">Estimation Not Found</h2>
                <p className="text-slate-500 mt-2">The requested estimation could not be found.</p>
            </div>
        );
    }

    return (
        <EstimationForm
            estimationId={estimation.id}
            budgetLineItemId={estimation.budgetLineItemId}
            initialData={estimation}
            mode="edit"
        />
    );
}
