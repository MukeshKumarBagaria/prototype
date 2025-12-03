'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BudgetLineItemCard } from '@/components/budget-estimation/shared/BudgetLineItemCard';
import { MOCK_BUDGET_LINE_ITEMS } from '@/data/budget-estimation/mockData';

export default function NewEstimationPage() {
    const router = useRouter();

    const handleSelect = (id: string) => {
        router.push(`/budget-estimation/ddo-creator/new/${id}`);
    };

    return (
        <div className="space-y-6">
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
                        <h1 className="text-3xl font-bold text-slate-900">Select Budget Line Item</h1>
                        <p className="text-slate-500 mt-1">Choose a budget line to create estimation</p>
                    </div>
                </div>
            </div>

            {/* Budget Line Items Grid */}
            <div className="grid grid-cols-1 gap-6">
                {MOCK_BUDGET_LINE_ITEMS.map(item => (
                    <div
                        key={item.id}
                        className="group cursor-pointer transition-all hover:scale-[1.01]"
                        onClick={() => handleSelect(item.id)}
                    >
                        <div className="relative">
                            <BudgetLineItemCard item={item} />
                            <Button
                                className="absolute bottom-6 right-6 gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                size="lg"
                            >
                                Select
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
