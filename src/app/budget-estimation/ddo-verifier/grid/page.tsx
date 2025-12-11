'use client';

import React from 'react';
import { SmartBudgetGrid } from '@/components/budget-estimation/grid/SmartBudgetGrid';
import { MOCK_BUDGET_LINE_ITEMS, MOCK_ESTIMATIONS } from '@/data/budget-estimation/mockData';
import { toast } from 'sonner';

export default function DDOVerifierGridPage() {
    const estimations = MOCK_ESTIMATIONS.filter(e =>
        e.currentLevel === 'ddo_verifier' || e.status === 'under_verification'
    );

    const budgetLines = MOCK_BUDGET_LINE_ITEMS.filter(line =>
        estimations.some(e => e.budgetLineItemId === line.id)
    );

    const handleSave = () => {
        toast.success("Changes saved", {
            description: "Verification progress saved locally."
        });
    };

    const handleSubmit = () => {
        toast.success("Forwarded to Approver", {
            description: "Budget estimations have been verified and forwarded."
        });
    };

    return (
        <SmartBudgetGrid
            role="verifier"
            items={budgetLines}
            estimations={estimations}
            onSave={handleSave}
            onSubmit={handleSubmit}
        />
    );
}
