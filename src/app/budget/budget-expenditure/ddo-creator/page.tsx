'use client';

import React, { useState, useMemo } from 'react';
import { SmartBudgetGrid } from '@/components/budget-expenditure/grid/SmartBudgetGrid';
import { TableBudgetGrid } from '@/components/budget-expenditure/grid/TableBudgetGrid';
import { MOCK_BUDGET_LINE_ITEMS, MOCK_ESTIMATIONS, getUniqueSchemesFromBudgetLines } from '@/data/budget-expenditure/mockData';
import { toast } from 'sonner';
import { LayoutGrid, Table2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DDOCreatorPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
    const [filledSchemes, setFilledSchemes] = useState<Set<string>>(new Set());

    const allBudgetLines = MOCK_BUDGET_LINE_ITEMS;
    const schemes = useMemo(() => getUniqueSchemesFromBudgetLines(), []);

    // Filter budget lines by selected scheme
    const budgetLines = useMemo(() => {
        if (!selectedScheme) return [];
        return allBudgetLines.filter(item => {
            const match = item.scheme.match(/\((\d+)\)/);
            const code = match ? match[1] : 'UNKNOWN';
            return code === selectedScheme;
        });
    }, [allBudgetLines, selectedScheme]);

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

    const handleSchemeSelect = (schemeCode: string) => {
        // Mark previous scheme as filled if switching
        if (selectedScheme && selectedScheme !== schemeCode) {
            setFilledSchemes(prev => new Set(prev).add(selectedScheme));
        }
        setSelectedScheme(schemeCode);
    };

    const handleSave = () => {
        toast.success("Draft saved successfully", {
            description: "Your changes have been saved locally."
        });
    };

    const handleSubmit = () => {
        if (selectedScheme) {
            setFilledSchemes(prev => new Set(prev).add(selectedScheme));
        }
        toast.success("Submitted to Verifier", {
            description: "Budget estimations have been forwarded to the DDO Verifier."
        });
    };

    // View toggle component to render inside the header bar
    const ViewToggle = (
        <div className="bg-slate-100 rounded-lg p-1 flex gap-1">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                    "gap-2 px-3 h-8",
                    viewMode === 'grid'
                        ? "bg-white text-blue-700 shadow-sm hover:bg-white"
                        : "text-slate-600 hover:bg-slate-200"
                )}
            >
                <LayoutGrid size={16} />
                <span>Card View</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('table')}
                className={cn(
                    "gap-2 px-3 h-8",
                    viewMode === 'table'
                        ? "bg-white text-blue-700 shadow-sm hover:bg-white"
                        : "text-slate-600 hover:bg-slate-200"
                )}
            >
                <Table2 size={16} />
                <span>Table View</span>
            </Button>
        </div>
    );

    return (
        <>
            {viewMode === 'grid' ? (
                <SmartBudgetGrid
                    role="creator"
                    items={budgetLines}
                    estimations={estimations}
                    onSave={handleSave}
                    onSubmit={handleSubmit}
                    viewToggle={ViewToggle}
                    schemes={schemes}
                    selectedScheme={selectedScheme}
                    filledSchemes={filledSchemes}
                    onSchemeSelect={handleSchemeSelect}
                />
            ) : (
                <TableBudgetGrid
                    role="creator"
                    items={budgetLines}
                    estimations={estimations}
                    viewToggle={ViewToggle}
                    schemes={schemes}
                    selectedScheme={selectedScheme}
                    filledSchemes={filledSchemes}
                    onSchemeSelect={handleSchemeSelect}
                />
            )}
        </>
    );
}
