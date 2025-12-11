'use client';

import React from 'react';
import { SmartBudgetGrid } from '@/components/budget-estimation/grid/SmartBudgetGrid';
import { MOCK_BUDGET_LINE_ITEMS, MOCK_ESTIMATIONS } from '@/data/budget-estimation/mockData';
import { toast } from 'sonner';

export default function DDOApproverGridPage() {
    const estimations = MOCK_ESTIMATIONS.filter(e =>
        e.currentLevel === 'ddo_approver' || e.status === 'under_approval'
    );

    const budgetLines = MOCK_BUDGET_LINE_ITEMS.filter(line =>
        estimations.some(e => e.budgetLineItemId === line.id)
    );

    const handleSave = () => {
        toast.success("Changes saved", {
            description: "Approval progress saved locally."
        });
    };

    const handleSubmit = () => {
        toast.success("Approved & Forwarded", {
            description: "Budget estimations have been approved and forwarded to BCO."
        });
    };

    return (
        <SmartBudgetGrid
            role="approver"
            items={budgetLines}
            estimations={estimations}
            onSave={handleSave}
            onSubmit={handleSubmit}
        />
    );
}
