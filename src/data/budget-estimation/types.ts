// Mock data types for Budget Estimation POC

export interface BudgetLineItem {
    id: string;
    demandNo: string;
    majorHead: string;
    subMajorHead: string;
    minorHead: string;
    segmentHead: string;
    scheme: string;
    project?: string;
    chargedOrVoted: 'Charged' | 'Voted';
    objectHead: string;
    detailHead: string;
    ddoCode: string;
    ddoName: string;
    ceilingLimit: number;
}

export interface HistoricalData {
    budgetLineItemId: string;
    fy5: number;
    fy4: number;
    fy3: number;
    fy2: number;
    fy1: number;
    currentYearBE: number;
    actualTillDate: number;
    projectedBalance: number;
}

export interface EstimationRecord {
    id: string;
    budgetLineItemId: string;
    reviseEstimateCY: number;
    budgetEstimateNextYear: number;
    forwardEstimateY2?: number;
    forwardEstimateY3?: number;
    percentageDeviation: number;

    // Outcome-Based Budgeting (NEW in Next Gen)
    outcomeCategory?: string;
    sdgGoal?: string; // SDG 1-17
    sdgTarget?: string;
    genderTag?: 'Women' | 'Child' | 'Youth' | 'General';
    scstTag?: boolean;
    geographyTag?: string; // State/District/Block

    // Workflow
    status: 'draft' | 'submitted' | 'under_verification' | 'verified' | 'under_approval' | 'approved' | 'rejected' | 'returned';
    currentLevel: 'ddo_creator' | 'ddo_verifier' | 'ddo_approver' | 'bco_creator' | 'bco_verifier' | 'bco_approver';

    // Remarks
    creatorRemarks?: string;
    verifierRemarks?: string;
    approverRemarks?: string;

    // Audit trail
    createdBy: string;
    createdAt: string;
    modifiedBy?: string;
    modifiedAt?: string;
    submittedAt?: string;
    verifiedAt?: string;
    approvedAt?: string;

    // Asset details (if applicable)
    assets?: AssetRequirement[];

    // Exceed ceiling
    exceedsCeiling: boolean;
    exceedJustification?: string;
    exceedAttachment?: string;
}

export interface AssetRequirement {
    id: string;
    itemName: string;
    oldQuantity: number;
    employeesUsing: number;
    newRequired: number;
    unitCost: number;
    totalCost: number;
    reason: string;
    remarks?: string;
}

export interface User {
    id: string;
    name: string;
    designation: string;
    role: 'ddo_creator' | 'ddo_verifier' | 'ddo_approver' | 'bco_creator' | 'bco_verifier' | 'bco_approver';
    department: string;
    ddoCode?: string;
}

export interface WorkflowAction {
    id: string;
    estimationId: string;
    action: 'created' | 'submitted' | 'returned' | 'verified' | 'approved' | 'rejected';
    performedBy: string;
    performedAt: string;
    remarks?: string;
    fromStatus: string;
    toStatus: string;
}
