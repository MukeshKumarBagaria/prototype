'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Save } from 'lucide-react';
import { BudgetLineItem } from '@/data/budget-estimation/types';
import { formatCurrency } from '@/data/budget-estimation/mockData';

// Heads that require breakup
export const BREAKUP_REQUIRED_HEADS = ['22/002', '22/003', '22/009', '23/001', '27/001', '31/007'];

export interface BreakupItem {
    id: string;
    name: string; // Item name / Asset type
    description?: string;
    oldQty: number;
    newQty: number;
    unitCost: number;
    totalCost: number;
    justification: string;
}

interface BreakupModalProps {
    budgetLine: BudgetLineItem;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (items: BreakupItem[]) => void;
    initialData?: BreakupItem[];
    isReadOnly?: boolean;
}

export function BreakupModal({ budgetLine, isOpen, onOpenChange, onSave, initialData = [], isReadOnly = false }: BreakupModalProps) {
    const [items, setItems] = useState<BreakupItem[]>(initialData.length > 0 ? initialData : []);

    const addItem = () => {
        const newItem: BreakupItem = {
            id: crypto.randomUUID(),
            name: '',
            oldQty: 0,
            newQty: 0,
            unitCost: 0,
            totalCost: 0,
            justification: ''
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof BreakupItem, value: any) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                // Auto-calculate total cost
                if (field === 'newQty' || field === 'unitCost') {
                    // For fuel (22/009) logic might be different (monthly * 12 * vehicles), 
                    // but standard is Qty * Unit Cost. adhering to generic rule for now.
                    updated.totalCost = (Number(updated.newQty) || 0) * (Number(updated.unitCost) || 0);
                }
                return updated;
            }
            return item;
        }));
    };

    const deleteItem = (id: string) => {
        setItems(prevItems => prevItems.filter(i => i.id !== id));
    };

    const handleSave = () => {
        onSave(items);
        onOpenChange(false);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.totalCost, 0);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Breakup Details: {budgetLine.scheme}</DialogTitle>
                    <p className="text-sm text-slate-500 font-mono">
                        {budgetLine.budgetHead} • {budgetLine.detailHead}
                    </p>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center text-sm text-blue-800">
                        <span>Breakup Required for <strong>{budgetLine.detailHead}</strong></span>
                        <span className="font-bold">Total: {formatCurrency(totalAmount)}</span>
                    </div>

                    <div className="rounded-md border border-slate-200 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[180px]">Item Name</TableHead>
                                    <TableHead className="w-[80px]">Old Qty</TableHead>
                                    <TableHead className="w-[80px]">New Qty</TableHead>
                                    <TableHead className="w-[120px]">Unit Cost (₹)</TableHead>
                                    <TableHead className="w-[120px]">Total (₹)</TableHead>
                                    <TableHead>Justification</TableHead>
                                    {!isReadOnly && <TableHead className="w-[50px]"></TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Input
                                                value={item.name}
                                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                                placeholder="Item name"
                                                className="h-8"
                                                readOnly={isReadOnly}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={item.oldQty}
                                                onChange={(e) => updateItem(item.id, 'oldQty', parseFloat(e.target.value))}
                                                className="h-8"
                                                readOnly={isReadOnly}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={item.newQty}
                                                onChange={(e) => updateItem(item.id, 'newQty', parseFloat(e.target.value))}
                                                className="h-8 bg-blue-50/50 focus:bg-white"
                                                readOnly={isReadOnly}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={item.unitCost}
                                                onChange={(e) => updateItem(item.id, 'unitCost', parseFloat(e.target.value))}
                                                className="h-8"
                                                readOnly={isReadOnly}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-right">
                                            {formatCurrency(item.totalCost)}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.justification}
                                                onChange={(e) => updateItem(item.id, 'justification', e.target.value)}
                                                placeholder="Reason..."
                                                className="h-8"
                                                readOnly={isReadOnly}
                                            />
                                        </TableCell>
                                        {!isReadOnly && (
                                            <TableCell>
                                                <Button size="icon" variant="ghost" onClick={() => deleteItem(item.id)} className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                                {items.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6 text-slate-500 italic">
                                            No items added. Click "Add Item" to start.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {!isReadOnly && (
                        <Button onClick={addItem} variant="outline" className="gap-2 border-dashed">
                            <Plus size={16} /> Add Item
                        </Button>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    {!isReadOnly && (
                        <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
                            <Save size={16} /> Save Details
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
