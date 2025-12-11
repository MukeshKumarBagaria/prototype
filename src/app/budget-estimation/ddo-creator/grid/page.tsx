'use client';

import React from 'react';
import { SmartBudgetGrid } from '@/components/budget-estimation/grid/SmartBudgetGrid';
import { MOCK_BUDGET_LINE_ITEMS, MOCK_ESTIMATIONS } from '@/data/budget-estimation/mockData';
import { toast } from 'sonner';

export default function DDOCreatorGridPage() {
    const budgetLines = MOCK_BUDGET_LINE_ITEMS;

    const estimations = budgetLines.map(line => {
        const existing = MOCK_ESTIMATIONS.find(e => e.budgetLineItemId === line.id);
        return existing || {
            id: `TEMP_${line.id}`,
            budgetLineItemId: line.id,
            status: 'draft' as const,
            currentLevel: 'ddo_creator' as const,
            reviseEstimateCY: 0,
            budgetEstimateNextYear: 0,
            forwardEstimateY2: 0,
            forwardEstimateY3: 0,
            percentageDeviation: 0,
            creatorRemarks: '',
            createdBy: 'CURRENT_USER',
            createdAt: new Date().toISOString(),
            exceedsCeiling: false
        };
    });

    const handleSave = () => {
        toast.success("Draft saved successfully", {
            description: "Your changes have been saved locally."
        });
    };

    const handleSubmit = () => {
        toast.success("Submitted to Verifier", {
            description: "Budget estimations have been forwarded to the DDO Verifier."
        });
    };

    return (
        <SmartBudgetGrid
            role="creator"
            items={budgetLines}
            estimations={estimations}
            onSave={handleSave}
            onSubmit={handleSubmit}
        />
    );
}
