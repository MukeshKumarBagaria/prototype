'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Send, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BudgetLineItemCard } from '@/components/budget-estimation/shared/BudgetLineItemCard';
import { HistoricalTrends } from '@/components/budget-estimation/shared/HistoricalTrends';
import { EstimationInputs } from '@/components/budget-estimation/shared/EstimationInputs';
import { RemarksSection } from '@/components/budget-estimation/shared/RemarksSection';
import { EstimationRecord } from '@/data/budget-estimation/types';
import {
    getBudgetLineItemById,
    getHistoricalDataByBudgetLineId,
    calculatePercentageDeviation
} from '@/data/budget-estimation/mockData';

interface EstimationFormProps {
    estimationId?: string;
    budgetLineItemId: string;
    initialData?: Partial<EstimationRecord>;
    mode: 'create' | 'edit';
}

export function EstimationForm({ estimationId, budgetLineItemId, initialData, mode }: EstimationFormProps) {
    const router = useRouter();
    const budgetLine = getBudgetLineItemById(budgetLineItemId);
    const historicalData = getHistoricalDataByBudgetLineId(budgetLineItemId);

    const [formData, setFormData] = useState({
        reviseEstimateCY: initialData?.reviseEstimateCY || 0,
        budgetEstimateNextYear: initialData?.budgetEstimateNextYear || 0,
        forwardEstimateY2: initialData?.forwardEstimateY2 || 0,
        forwardEstimateY3: initialData?.forwardEstimateY3 || 0,
        creatorRemarks: initialData?.creatorRemarks || ''
    });

    const [saving, setSaving] = useState(false);

    if (!budgetLine || !historicalData) {
        return <div>Budget line item not found</div>;
    }

    const handleInputChange = (field: string, value: number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (submit: boolean = false) => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);

        if (submit) {
            // Navigate to success page or back to dashboard
            router.push('/budget/estimation/ddo-creator');
        }
    };

    const exceedsCeiling = formData.budgetEstimateNextYear > budgetLine.ceilingLimit;
    const percentageDeviation = calculatePercentageDeviation(
        formData.budgetEstimateNextYear,
        formData.reviseEstimateCY
    );

    return (
        <div className="space-y-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/budget-estimation/ddo-creator">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft size={16} />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {mode === 'create' ? 'New' : 'Edit'} Budget Estimation
                            </h1>
                            <p className="text-slate-500 mt-1">Fill in the estimation details below</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => handleSave(false)}
                            disabled={saving}
                        >
                            <Save size={16} />
                            Save Draft
                        </Button>
                        <Button
                            className="gap-2"
                            onClick={() => handleSave(true)}
                            disabled={saving || formData.budgetEstimateNextYear === 0}
                        >
                            <Send size={16} />
                            Submit for Verification
                        </Button>
                    </div>
                </div>

                {/* Warning for ceiling excess */}
                {exceedsCeiling && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangle className="text-red-600 mt-0.5" size={20} />
                        <div className="flex-1">
                            <h4 className="font-semibold text-red-900">Ceiling Limit Exceeded</h4>
                            <p className="text-sm text-red-700 mt-1">
                                The Budget Estimate exceeds the ceiling limit. You must provide justification and supporting documents.
                            </p>
                        </div>
                    </div>
                )}

                {/* Budget Line Info */}
                <BudgetLineItemCard item={budgetLine} />

                {/* Historical Trends */}
                <HistoricalTrends data={historicalData} />

                {/* Estimation Inputs */}
                <EstimationInputs
                    reviseEstimateCY={formData.reviseEstimateCY}
                    budgetEstimateNextYear={formData.budgetEstimateNextYear}
                    forwardEstimateY2={formData.forwardEstimateY2}
                    forwardEstimateY3={formData.forwardEstimateY3}
                    ceilingLimit={budgetLine.ceilingLimit}
                    currentYearBE={historicalData.currentYearBE}
                    onChange={handleInputChange}
                />

                {/* Remarks */}
                <RemarksSection
                    remarks={formData.creatorRemarks ? [{
                        id: '1',
                        author: 'Rajesh Kumar',
                        role: 'DDO Creator',
                        content: formData.creatorRemarks,
                        timestamp: new Date().toLocaleString()
                    }] : []}
                    canAddRemark={true}
                    onAddRemark={(content) => setFormData(prev => ({ ...prev, creatorRemarks: content }))}
                    placeholder="Add remarks about this estimation..."
                />

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Estimation Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-blue-600">Revised Estimate (CY)</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(formData.reviseEstimateCY)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-600">Budget Estimate (NY)</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(formData.budgetEstimateNextYear)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-600">% Deviation</p>
                            <p className="text-xl font-bold text-blue-900 mt-1">{percentageDeviation.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-600">Ceiling Status</p>
                            <p className={`text-xl font-bold mt-1 ${exceedsCeiling ? 'text-red-600' : 'text-emerald-600'}`}>
                                {exceedsCeiling ? 'Exceeded' : 'Within Limit'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
