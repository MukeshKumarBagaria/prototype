'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Search, CheckCircle2, Circle, ChevronDown, ChevronRight,
    FileSpreadsheet, ListFilter, X, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SchemeInfo {
    code: string;
    name: string;
    budgetLineCount: number;
}

type StatusFilter = 'all' | 'pending' | 'filled';

interface SchemeSelectorProps {
    schemes: SchemeInfo[];
    selectedScheme: string | null;
    filledSchemes: Set<string>;
    onSchemeSelect: (schemeCode: string) => void;
}

// Strip the "(XXXX) " code prefix from scheme name since code is shown separately
function stripCodePrefix(name: string): string {
    return name.replace(/^\(\d+\)\s*/, '');
}

export function SchemeSelector({ schemes, selectedScheme, filledSchemes, onSchemeSelect }: SchemeSelectorProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filledCount = filledSchemes.size;
    const pendingCount = schemes.length - filledCount;
    const progressPercent = schemes.length > 0 ? (filledCount / schemes.length) * 100 : 0;

    const currentScheme = schemes.find(s => s.code === selectedScheme);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Focus search on open
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const filteredSchemes = useMemo(() => {
        return schemes.filter(s => {
            const matchesSearch = !searchQuery ||
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.code.includes(searchQuery);
            const isFilled = filledSchemes.has(s.code);
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'filled' && isFilled) ||
                (statusFilter === 'pending' && !isFilled);
            return matchesSearch && matchesStatus;
        });
    }, [schemes, searchQuery, statusFilter, filledSchemes]);

    const handleSelect = (code: string) => {
        onSchemeSelect(code);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 mb-3 overflow-visible" ref={dropdownRef}>
            {/* Compact Bar */}
            <div className="flex items-center gap-3 px-4 py-2.5">
                <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-white text-xs whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #1B6498, #1B557E)' }}>
                    Select Budget Line
                </div>

                <div className="flex-1 min-w-0">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        data-scheme-selector-trigger="true"
                        className={cn(
                            "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-left",
                            isDropdownOpen
                                ? "border-[#1D81C9] ring-2 ring-[#A3D3F5]/40 bg-white"
                                : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                        )}
                    >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {currentScheme ? (
                                <>
                                    <div className="h-6 w-6 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1B557E' }}>
                                        {currentScheme.code.slice(-2)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-sm font-semibold text-slate-800 truncate block">
                                            {currentScheme.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-slate-400 flex-shrink-0">
                                        {currentScheme.budgetLineCount} lines
                                    </span>
                                </>
                            ) : (
                                <span className="text-sm text-slate-400">Select a budget line to begin...</span>
                            )}
                        </div>
                        <ChevronDown
                            size={16}
                            className={cn(
                                "text-slate-400 transition-transform duration-200 flex-shrink-0",
                                isDropdownOpen && "rotate-180"
                            )}
                        />
                    </button>
                </div>

                {/* Progress Mini */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10">
                            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                <circle
                                    cx="18" cy="18" r="15.5" fill="none"
                                    stroke="url(#progressGrad)"
                                    strokeWidth="3"
                                    strokeDasharray={`${progressPercent * 0.975} 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-700 ease-out"
                                />
                                <defs>
                                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                                {filledCount}
                            </span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold text-slate-700">{filledCount}/{schemes.length}</p>
                            <p className="text-[10px] text-slate-400">Completed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown Panel */}
            {isDropdownOpen && (
                <div className="absolute left-0 right-0 z-50 mt-0 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/60 overflow-hidden">

                    {/* Search + Filter Bar */}
                    <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                <Input
                                    ref={searchInputRef}
                                    placeholder="Search by code or name..."
                                    className="pl-9 h-9 text-sm bg-white border-slate-200 rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Status Filter Tabs */}
                            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                                {([
                                    { key: 'all' as StatusFilter, label: 'All', count: schemes.length },
                                    { key: 'pending' as StatusFilter, label: 'Pending', count: pendingCount },
                                    { key: 'filled' as StatusFilter, label: 'Done', count: filledCount },
                                ]).map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setStatusFilter(tab.key)}
                                        className={cn(
                                            "px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150",
                                            statusFilter === tab.key
                                                ? "text-white shadow-sm"
                                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                        )}
                                        style={statusFilter === tab.key ? { backgroundColor: '#1B6498' } : undefined}
                                    >
                                        {tab.label} <span className="opacity-70">({tab.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Scheme List */}
                    <div className="max-h-[340px] overflow-y-auto">
                        {filteredSchemes.length === 0 ? (
                            <div className="py-10 text-center">
                                <Search className="mx-auto mb-2 text-slate-300" size={28} />
                                <p className="text-sm font-medium text-slate-500">No schemes found</p>
                                <p className="text-xs text-slate-400 mt-0.5">Try a different search or filter</p>
                            </div>
                        ) : (
                            <div className="py-1">
                                {filteredSchemes.map((scheme) => {
                                    const isFilled = filledSchemes.has(scheme.code);
                                    const isSelected = selectedScheme === scheme.code;
                                    return (
                                        <button
                                            key={scheme.code}
                                            onClick={() => handleSelect(scheme.code)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-100 border-l-[3px]",
                                                isSelected
                                                    ? "border-l-[#1B6498]"
                                                    : "hover:bg-slate-50 border-l-transparent",
                                            )}
                                            style={isSelected ? { backgroundColor: '#F6FAFD' } : undefined}
                                        >
                                            {/* Status icon */}
                                            <div className={cn(
                                                "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center",
                                                isFilled
                                                    ? "bg-emerald-100 text-emerald-600"
                                                    : isSelected
                                                        ? "text-[#1B6498]"
                                                        : "bg-slate-100 text-slate-400"
                                            )}
                                            style={isSelected && !isFilled ? { backgroundColor: '#E5F4FF' } : undefined}
                                            >
                                                {isFilled ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                                            </div>

                                            {/* Code badge */}
                                            <span className={cn(
                                                "text-xs font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0",
                                                isSelected
                                                    ? "text-white"
                                                    : "bg-slate-100 text-slate-600"
                                            )}
                                            style={isSelected ? { backgroundColor: '#1B557E' } : undefined}
                                            >
                                                {scheme.code}
                                            </span>

                                            {/* Name — stripped of the (XXXX) prefix since code badge shows it */}
                                            <span className={cn(
                                                "flex-1 text-sm truncate",
                                                isSelected ? "font-semibold" : "text-slate-700"
                                            )}
                                            style={isSelected ? { color: '#132939' } : undefined}
                                            >
                                                {stripCodePrefix(scheme.name)}
                                            </span>

                                            {/* Meta */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className="text-xs text-slate-400">
                                                    {scheme.budgetLineCount} {scheme.budgetLineCount === 1 ? 'line' : 'lines'}
                                                </span>
                                                {isFilled && (
                                                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                                        Done
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer summary */}
                    <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                            Showing {filteredSchemes.length} of {schemes.length} schemes
                        </span>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle2 size={12} /> {filledCount} completed
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                                <Circle size={12} /> {pendingCount} pending
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
