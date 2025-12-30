'use client';

import React, { useState, useMemo } from 'react';
import {
    FileText, Clock, CheckCircle, ChevronRight, ChevronDown,
    Users, Check, X, Zap, Search, Building2, User2, LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    getSchemeViews,
    getAllDDOSubmissions,
    formatCurrency,
    getDDOList,
    MOCK_BUDGET_LINE_ITEMS
} from '@/data/budget-expenditure/mockData';
import { DDOSubmission, SchemeView, BudgetLineItem } from '@/data/budget-expenditure/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type ViewMode = 'scheme' | 'ddo';

// Status badge component
function SubmissionStatusBadge({ status }: { status: DDOSubmission['submissionStatus'] }) {
    const config = {
        'not_submitted': { label: 'Not Submitted', class: 'bg-slate-100 text-slate-600' },
        'submitted': { label: 'Submitted', class: 'bg-blue-100 text-blue-700' },
        'accepted': { label: 'Accepted', class: 'bg-emerald-100 text-emerald-700' },
        'rejected': { label: 'Rejected', class: 'bg-red-100 text-red-700' },
        'system_generated': { label: 'System Generated', class: 'bg-amber-100 text-amber-700' },
    };

    const { label, class: className } = config[status] || config['not_submitted'];

    return (
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', className)}>
            {label}
        </span>
    );
}

// Consolidation status badge
function ConsolidationStatusBadge({ status }: { status: SchemeView['consolidationStatus'] }) {
    const config = {
        'draft': { label: 'Draft', class: 'bg-slate-100 text-slate-600' },
        'in_progress': { label: 'In Progress', class: 'bg-amber-100 text-amber-700' },
        'submitted': { label: 'Submitted', class: 'bg-emerald-100 text-emerald-700' },
    };

    const { label, class: className } = config[status];

    return (
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', className)}>
            {label}
        </span>
    );
}

// View Toggle Component
function ViewToggle({ viewMode, setViewMode }: { viewMode: ViewMode; setViewMode: (mode: ViewMode) => void }) {
    return (
        <div className="bg-slate-100 rounded-lg p-1 flex gap-1">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('scheme')}
                className={cn(
                    "gap-2 px-3 h-8",
                    viewMode === 'scheme'
                        ? "bg-white text-blue-700 shadow-sm hover:bg-white"
                        : "text-slate-600 hover:bg-slate-200"
                )}
            >
                <Building2 size={16} />
                <span>Scheme-wise</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('ddo')}
                className={cn(
                    "gap-2 px-3 h-8",
                    viewMode === 'ddo'
                        ? "bg-white text-blue-700 shadow-sm hover:bg-white"
                        : "text-slate-600 hover:bg-slate-200"
                )}
            >
                <User2 size={16} />
                <span>DDO-wise</span>
            </Button>
        </div>
    );
}

// ============================================
// DDO-wise View Components
// ============================================

// Budget Line Table Row (for DDO-wise view)
function BudgetLineTableRow({
    budgetLine,
    submission,
    onAccept,
    onReject
}: {
    budgetLine: BudgetLineItem;
    submission: DDOSubmission;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}) {
    return (
        <tr className="hover:bg-slate-50 border-b border-slate-100">
            <td className="px-3 py-2 text-xs">
                <code className="font-mono font-semibold text-slate-900">{budgetLine.budgetHead}</code>
            </td>
            <td className="px-3 py-2 text-xs text-slate-600 max-w-[200px] truncate">
                {budgetLine.schemeNomenclature || budgetLine.scheme}
            </td>
            <td className="px-3 py-2 text-right font-mono text-xs">{formatCurrency(submission.reviseEstimateCY)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-semibold text-blue-600">{formatCurrency(submission.budgetEstimateNextYear)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs">{formatCurrency(submission.forwardEstimateY2)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs">{formatCurrency(submission.forwardEstimateY3)}</td>
            <td className="px-3 py-2 text-center text-xs">
                {submission.hasBreakup ? <span className="text-emerald-600">Yes</span> : <span className="text-slate-400">No</span>}
            </td>
            <td className="px-3 py-2 text-center">
                <SubmissionStatusBadge status={submission.submissionStatus} />
            </td>
            <td className="px-3 py-2">
                <div className="flex items-center justify-center gap-1">
                    {!submission.acceptedByBCO && submission.submissionStatus !== 'rejected' && (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-emerald-600 hover:bg-emerald-50"
                                onClick={() => onAccept(submission.id)}
                            >
                                <Check size={12} />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-red-600 hover:bg-red-50"
                                onClick={() => onReject(submission.id)}
                            >
                                <X size={12} />
                            </Button>
                        </>
                    )}
                    {submission.acceptedByBCO && (
                        <span className="text-xs text-emerald-600">✓</span>
                    )}
                </div>
            </td>
        </tr>
    );
}

// DDO Card with expandable budget lines table
function DDOCard({
    ddoCode,
    ddoName,
    submissions,
    budgetLines,
    onAcceptSubmission,
    onRejectSubmission,
    onAcceptAll
}: {
    ddoCode: string;
    ddoName: string;
    submissions: DDOSubmission[];
    budgetLines: BudgetLineItem[];
    onAcceptSubmission: (id: string) => void;
    onRejectSubmission: (id: string) => void;
    onAcceptAll: (ddoCode: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const acceptedCount = submissions.filter(s => s.acceptedByBCO).length;
    const totalCount = submissions.length;

    // Calculate totals
    const totals = useMemo(() => ({
        re: submissions.reduce((sum, s) => sum + s.reviseEstimateCY, 0),
        be1: submissions.reduce((sum, s) => sum + s.budgetEstimateNextYear, 0),
        be2: submissions.reduce((sum, s) => sum + s.forwardEstimateY2, 0),
        be3: submissions.reduce((sum, s) => sum + s.forwardEstimateY3, 0),
    }), [submissions]);

    const acceptedTotals = useMemo(() => {
        const accepted = submissions.filter(s => s.acceptedByBCO);
        return {
            re: accepted.reduce((sum, s) => sum + s.reviseEstimateCY, 0),
            be1: accepted.reduce((sum, s) => sum + s.budgetEstimateNextYear, 0),
            be2: accepted.reduce((sum, s) => sum + s.forwardEstimateY2, 0),
            be3: accepted.reduce((sum, s) => sum + s.forwardEstimateY3, 0),
        };
    }, [submissions]);

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            {/* DDO Header */}
            <div
                className="px-4 py-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <button className="p-1">
                    {isExpanded ? (
                        <ChevronDown size={20} className="text-slate-500" />
                    ) : (
                        <ChevronRight size={20} className="text-slate-500" />
                    )}
                </button>

                <div className="p-2 bg-blue-100 rounded-lg">
                    <User2 size={20} className="text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900">{ddoName}</h3>
                    <p className="text-sm text-slate-500">{ddoCode}</p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                        <p className="text-xs text-slate-500">Budget Lines</p>
                        <p className="font-semibold text-slate-900">{totalCount}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500">Accepted</p>
                        <p className="font-semibold text-emerald-600">{acceptedCount} / {totalCount}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500">Total BE1</p>
                        <p className="font-semibold text-blue-600 font-mono">{formatCurrency(totals.be1)}</p>
                    </div>
                    {!isExpanded && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAcceptAll(ddoCode);
                            }}
                        >
                            Accept All
                        </Button>
                    )}
                </div>
            </div>

            {/* Expanded Budget Lines Table */}
            {isExpanded && (
                <div className="border-t border-slate-200">
                    {/* Actions bar */}
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                            Budget Lines submitted by this DDO
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => onAcceptAll(ddoCode)}
                        >
                            <Check size={14} className="mr-1" />
                            Accept All Pending
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 border-b border-slate-200">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700">Budget Head</th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700">Scheme</th>
                                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700">RE (CY)</th>
                                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700">BE1</th>
                                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700">BE2</th>
                                    <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700">BE3</th>
                                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700">Breakup</th>
                                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => {
                                    const bl = budgetLines.find(b => b.id === sub.budgetLineItemId);
                                    if (!bl) return null;
                                    return (
                                        <BudgetLineTableRow
                                            key={sub.id}
                                            budgetLine={bl}
                                            submission={sub}
                                            onAccept={onAcceptSubmission}
                                            onReject={onRejectSubmission}
                                        />
                                    );
                                })}
                            </tbody>
                            {/* Footer with totals */}
                            <tfoot className="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colSpan={2} className="px-3 py-2 text-xs font-semibold text-slate-700">Total (All)</td>
                                    <td className="px-3 py-2 text-right font-mono text-xs font-semibold">{formatCurrency(totals.re)}</td>
                                    <td className="px-3 py-2 text-right font-mono text-xs font-semibold text-blue-600">{formatCurrency(totals.be1)}</td>
                                    <td className="px-3 py-2 text-right font-mono text-xs font-semibold">{formatCurrency(totals.be2)}</td>
                                    <td className="px-3 py-2 text-right font-mono text-xs font-semibold">{formatCurrency(totals.be3)}</td>
                                    <td colSpan={3}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Accepted totals */}
                    {acceptedCount > 0 && (
                        <div className="px-4 py-3 bg-emerald-50 border-t border-emerald-100">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-emerald-800">
                                    Accepted Totals ({acceptedCount} items)
                                </span>
                                <div className="flex gap-6 text-sm">
                                    <div><span className="text-emerald-600">RE:</span> <span className="font-mono font-semibold">{formatCurrency(acceptedTotals.re)}</span></div>
                                    <div><span className="text-emerald-600">BE1:</span> <span className="font-mono font-semibold">{formatCurrency(acceptedTotals.be1)}</span></div>
                                    <div><span className="text-emerald-600">BE2:</span> <span className="font-mono font-semibold">{formatCurrency(acceptedTotals.be2)}</span></div>
                                    <div><span className="text-emerald-600">BE3:</span> <span className="font-mono font-semibold">{formatCurrency(acceptedTotals.be3)}</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================
// Scheme-wise View Components (existing)
// ============================================

// DDO Submissions Table for a budget line
function DDOSubmissionsTable({
    submissions,
    onAccept,
    onReject,
}: {
    submissions: DDOSubmission[];
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}) {
    if (submissions.length === 0) {
        return (
            <div className="p-4 text-center text-slate-500">
                No DDO submissions found for this budget line.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">DDO</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">RE (CY)</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">BE1</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">BE2</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">BE3</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-700">Breakup</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-700">Status</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-900">{sub.ddoName}</p>
                                    <p className="text-xs text-slate-500">{sub.ddoCode}</p>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-700">
                                {formatCurrency(sub.reviseEstimateCY)}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-900 font-semibold">
                                {formatCurrency(sub.budgetEstimateNextYear)}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-700">
                                {formatCurrency(sub.forwardEstimateY2)}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-700">
                                {formatCurrency(sub.forwardEstimateY3)}
                            </td>
                            <td className="px-4 py-3 text-center">
                                {sub.hasBreakup ? (
                                    <span className="text-emerald-600">Yes</span>
                                ) : (
                                    <span className="text-slate-400">No</span>
                                )}
                            </td>
                            <td className="px-4 py-3 text-center">
                                <SubmissionStatusBadge status={sub.submissionStatus} />
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                    {!sub.acceptedByBCO && sub.submissionStatus !== 'rejected' && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                onClick={() => onAccept(sub.id)}
                                            >
                                                <Check size={14} className="mr-1" />
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => onReject(sub.id)}
                                            >
                                                <X size={14} className="mr-1" />
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                    {sub.acceptedByBCO && (
                                        <span className="text-xs text-emerald-600 font-medium">✓ Accepted</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Budget Line Row with expandable DDO submissions
function BudgetLineRow({
    budgetLine,
    submissions,
    onAcceptSubmission,
    onRejectSubmission,
}: {
    budgetLine: BudgetLineItem;
    submissions: DDOSubmission[];
    onAcceptSubmission: (id: string) => void;
    onRejectSubmission: (id: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const acceptedCount = submissions.filter(s => s.acceptedByBCO).length;
    const totalSubmissions = submissions.length;

    // Calculate consolidated totals from accepted submissions
    const consolidatedTotals = useMemo(() => {
        const accepted = submissions.filter(s => s.acceptedByBCO);
        return {
            re: accepted.reduce((sum, s) => sum + s.reviseEstimateCY, 0),
            be1: accepted.reduce((sum, s) => sum + s.budgetEstimateNextYear, 0),
            be2: accepted.reduce((sum, s) => sum + s.forwardEstimateY2, 0),
            be3: accepted.reduce((sum, s) => sum + s.forwardEstimateY3, 0),
        };
    }, [submissions]);

    return (
        <div className="border-b border-slate-200 last:border-b-0">
            {/* Budget Line Header */}
            <div
                className="px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-slate-50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <button className="p-1">
                    {isExpanded ? (
                        <ChevronDown size={16} className="text-slate-500" />
                    ) : (
                        <ChevronRight size={16} className="text-slate-500" />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-slate-900 font-semibold">
                            {budgetLine.budgetHead}
                        </code>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {budgetLine.chargedOrVoted}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 truncate mt-0.5">
                        {budgetLine.schemeNomenclature || budgetLine.scheme}
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                        <p className="text-xs text-slate-500">DDO Submissions</p>
                        <p className="font-semibold text-slate-900">
                            {acceptedCount} / {totalSubmissions}
                            <span className="text-slate-400 text-xs ml-1">accepted</span>
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-slate-500">Consolidated BE</p>
                        <p className="font-semibold text-blue-600 font-mono">
                            {formatCurrency(consolidatedTotals.be1)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Expanded DDO Submissions */}
            {isExpanded && (
                <div className="bg-slate-50 border-t border-slate-200">
                    <DDOSubmissionsTable
                        submissions={submissions}
                        onAccept={onAcceptSubmission}
                        onReject={onRejectSubmission}
                    />

                    {/* Consolidated Totals */}
                    {acceptedCount > 0 && (
                        <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-800">
                                    Consolidated Totals (from {acceptedCount} accepted submissions)
                                </span>
                                <div className="flex gap-6 text-sm">
                                    <div className="text-right">
                                        <span className="text-blue-600">RE: </span>
                                        <span className="font-mono font-semibold">{formatCurrency(consolidatedTotals.re)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-blue-600">BE1: </span>
                                        <span className="font-mono font-semibold">{formatCurrency(consolidatedTotals.be1)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-blue-600">BE2: </span>
                                        <span className="font-mono font-semibold">{formatCurrency(consolidatedTotals.be2)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-blue-600">BE3: </span>
                                        <span className="font-mono font-semibold">{formatCurrency(consolidatedTotals.be3)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================
// Consolidated Accepted List Component
// ============================================

function ConsolidatedAcceptedList({ submissions }: { submissions: DDOSubmission[] }) {
    const acceptedSubmissions = submissions.filter(s => s.acceptedByBCO);

    if (acceptedSubmissions.length === 0) {
        return null;
    }

    const totals = {
        re: acceptedSubmissions.reduce((sum, s) => sum + s.reviseEstimateCY, 0),
        be1: acceptedSubmissions.reduce((sum, s) => sum + s.budgetEstimateNextYear, 0),
        be2: acceptedSubmissions.reduce((sum, s) => sum + s.forwardEstimateY2, 0),
        be3: acceptedSubmissions.reduce((sum, s) => sum + s.forwardEstimateY3, 0),
    };

    return (
        <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <CheckCircle size={20} className="text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-emerald-900">Consolidated Accepted Submissions</h3>
                        <p className="text-sm text-emerald-700">{acceptedSubmissions.length} budget lines accepted for consolidation</p>
                    </div>
                </div>
                <div className="flex gap-6 text-sm">
                    <div className="text-right">
                        <p className="text-xs text-emerald-600">Total RE</p>
                        <p className="font-mono font-semibold text-emerald-800">{formatCurrency(totals.re)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-emerald-600">Total BE1</p>
                        <p className="font-mono font-semibold text-emerald-800">{formatCurrency(totals.be1)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-emerald-600">Total BE2</p>
                        <p className="font-mono font-semibold text-emerald-800">{formatCurrency(totals.be2)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-emerald-600">Total BE3</p>
                        <p className="font-mono font-semibold text-emerald-800">{formatCurrency(totals.be3)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Main BCO Dashboard component
// ============================================

export function BCODashboard() {
    const [viewMode, setViewMode] = useState<ViewMode>('scheme');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedSchemes, setExpandedSchemes] = useState<Set<string>>(new Set());
    const [submissions, setSubmissions] = useState<DDOSubmission[]>(getAllDDOSubmissions());

    const schemeViews = useMemo(() => getSchemeViews(), []);
    const ddoList = useMemo(() => getDDOList(), []);
    const budgetLines = MOCK_BUDGET_LINE_ITEMS;

    // Stats
    const stats = useMemo(() => {
        const allSubmissions = submissions;
        return {
            totalSubmissions: allSubmissions.length,
            pendingReview: allSubmissions.filter(s => s.submissionStatus === 'submitted' && !s.acceptedByBCO).length,
            accepted: allSubmissions.filter(s => s.acceptedByBCO).length,
            systemGenerated: allSubmissions.filter(s => s.submissionSource === 'system').length,
        };
    }, [submissions]);

    // Filter schemes based on search
    const filteredSchemes = useMemo(() => {
        if (!searchTerm) return schemeViews;
        const term = searchTerm.toLowerCase();
        return schemeViews.filter(s =>
            s.schemeName.toLowerCase().includes(term) ||
            s.schemeCode.toLowerCase().includes(term)
        );
    }, [schemeViews, searchTerm]);

    // Filter DDOs based on search
    const filteredDDOs = useMemo(() => {
        if (!searchTerm) return ddoList;
        const term = searchTerm.toLowerCase();
        return ddoList.filter(d =>
            d.name.toLowerCase().includes(term) ||
            d.code.toLowerCase().includes(term)
        );
    }, [ddoList, searchTerm]);

    const toggleScheme = (schemeCode: string) => {
        setExpandedSchemes(prev => {
            const next = new Set(prev);
            if (next.has(schemeCode)) {
                next.delete(schemeCode);
            } else {
                next.add(schemeCode);
            }
            return next;
        });
    };

    const handleAcceptSubmission = (submissionId: string) => {
        setSubmissions(prev => prev.map(s =>
            s.id === submissionId
                ? { ...s, acceptedByBCO: true, submissionStatus: 'accepted' as const, isFrozen: true, acceptedAt: new Date().toISOString() }
                : s
        ));
        toast.success('Submission accepted', { description: 'DDO submission has been accepted for consolidation.' });
    };

    const handleRejectSubmission = (submissionId: string) => {
        setSubmissions(prev => prev.map(s =>
            s.id === submissionId
                ? { ...s, submissionStatus: 'rejected' as const }
                : s
        ));
        toast.error('Submission rejected', { description: 'DDO submission has been rejected.' });
    };

    const handleAcceptAllScheme = (schemeCode: string) => {
        setSubmissions(prev => prev.map(s =>
            s.schemeCode === schemeCode && !s.acceptedByBCO && s.submissionStatus !== 'rejected'
                ? { ...s, acceptedByBCO: true, submissionStatus: 'accepted' as const, isFrozen: true, acceptedAt: new Date().toISOString() }
                : s
        ));
        toast.success('All submissions accepted', { description: 'All pending DDO submissions have been accepted.' });
    };

    const handleAcceptAllDDO = (ddoCode: string) => {
        setSubmissions(prev => prev.map(s =>
            s.ddoCode === ddoCode && !s.acceptedByBCO && s.submissionStatus !== 'rejected'
                ? { ...s, acceptedByBCO: true, submissionStatus: 'accepted' as const, isFrozen: true, acceptedAt: new Date().toISOString() }
                : s
        ));
        toast.success('All submissions accepted', { description: `All pending submissions from this DDO have been accepted.` });
    };

    const handleSubmitToVerifier = () => {
        toast.success('Submitted to BCO Verifier', { description: 'Consolidated budget estimates have been forwarded for verification.' });
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">BCO Budget Compilation</h1>
                        <p className="text-slate-500 mt-1">Review and consolidate DDO budget submissions</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleSubmitToVerifier}
                        >
                            Submit to Verifier
                        </Button>
                    </div>
                </div>
            </header>

            {/* Stats */}
            <div className="px-6 py-4 bg-white border-b border-slate-200">
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total Submissions</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.totalSubmissions}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Clock size={20} className="text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Pending Review</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.pendingReview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <CheckCircle size={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Accepted</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.accepted}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Zap size={20} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">System Generated</p>
                                <p className="text-2xl font-bold text-slate-900">{stats.systemGenerated}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="px-6 py-3 bg-white border-b border-slate-200">
                <div className="relative max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder={viewMode === 'scheme' ? "Search schemes..." : "Search DDOs..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
                {/* Consolidated Accepted List */}
                <ConsolidatedAcceptedList submissions={submissions} />

                {viewMode === 'scheme' ? (
                    // Scheme-wise View
                    <div className="space-y-4">
                        {filteredSchemes.map((scheme) => {
                            const isExpanded = expandedSchemes.has(scheme.schemeCode);
                            const schemeSubmissions = submissions.filter(s => s.schemeCode === scheme.schemeCode);
                            const acceptedCount = schemeSubmissions.filter(s => s.acceptedByBCO).length;

                            return (
                                <div
                                    key={scheme.schemeCode}
                                    className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
                                >
                                    {/* Scheme Header */}
                                    <div
                                        className="px-4 py-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50"
                                        onClick={() => toggleScheme(scheme.schemeCode)}
                                    >
                                        <button className="p-1">
                                            {isExpanded ? (
                                                <ChevronDown size={20} className="text-slate-500" />
                                            ) : (
                                                <ChevronRight size={20} className="text-slate-500" />
                                            )}
                                        </button>

                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Building2 size={20} className="text-blue-600" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-slate-900">
                                                    {scheme.schemeName}
                                                </h3>
                                                <ConsolidationStatusBadge status={scheme.consolidationStatus} />
                                            </div>
                                            <p className="text-sm text-slate-500 mt-0.5">
                                                {scheme.budgetLines.length} budget lines · {schemeSubmissions.length} DDO submissions
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <p className="text-xs text-slate-500">Accepted</p>
                                                <p className="font-semibold text-emerald-600">
                                                    {acceptedCount} / {schemeSubmissions.length}
                                                </p>
                                            </div>

                                            {!isExpanded && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAcceptAllScheme(scheme.schemeCode);
                                                    }}
                                                >
                                                    Accept All
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Budget Lines */}
                                    {isExpanded && (
                                        <div className="border-t border-slate-200">
                                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Budget Lines in this scheme
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                                                    onClick={() => handleAcceptAllScheme(scheme.schemeCode)}
                                                >
                                                    <Check size={14} className="mr-1" />
                                                    Accept All Pending
                                                </Button>
                                            </div>

                                            {scheme.budgetLines.slice(0, 10).map((bl) => {
                                                const blSubmissions = submissions.filter(s => s.budgetLineItemId === bl.id);
                                                if (blSubmissions.length === 0) return null;

                                                return (
                                                    <BudgetLineRow
                                                        key={bl.id}
                                                        budgetLine={bl}
                                                        submissions={blSubmissions}
                                                        onAcceptSubmission={handleAcceptSubmission}
                                                        onRejectSubmission={handleRejectSubmission}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // DDO-wise View
                    <div className="space-y-4">
                        {filteredDDOs.map((ddo) => {
                            const ddoSubmissions = submissions.filter(s => s.ddoCode === ddo.code);
                            if (ddoSubmissions.length === 0) return null;

                            return (
                                <DDOCard
                                    key={ddo.code}
                                    ddoCode={ddo.code}
                                    ddoName={ddo.name}
                                    submissions={ddoSubmissions}
                                    budgetLines={budgetLines}
                                    onAcceptSubmission={handleAcceptSubmission}
                                    onRejectSubmission={handleRejectSubmission}
                                    onAcceptAll={handleAcceptAllDDO}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
