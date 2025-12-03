import { BudgetLineItem, HistoricalData, EstimationRecord, User, AssetRequirement } from './types';

// Mock Budget Line Items
export const MOCK_BUDGET_LINE_ITEMS: BudgetLineItem[] = [
    {
        id: 'BL001',
        demandNo: 'D-23',
        majorHead: '2202',
        subMajorHead: '01',
        minorHead: '110',
        segmentHead: 'Education',
        scheme: 'Samagra Shiksha Abhiyan',
        project: 'SSA-MP-2024',
        chargedOrVoted: 'Voted',
        objectHead: '13',
        detailHead: 'Office Expenses',
        ddoCode: 'DDO/MP/001',
        ddoName: 'Directorate of Public Instructions, Bhopal',
        ceilingLimit: 50000000 // 5 Crores
    },
    {
        id: 'BL002',
        demandNo: 'D-23',
        majorHead: '2202',
        subMajorHead: '01',
        minorHead: '101',
        segmentHead: 'Education',
        scheme: 'Mid-Day Meal',
        chargedOrVoted: 'Voted',
        objectHead: '21',
        detailHead: 'Food Materials',
        ddoCode: 'DDO/MP/001',
        ddoName: 'Directorate of Public Instructions, Bhopal',
        ceilingLimit: 120000000 // 12 Crores
    },
    {
        id: 'BL003',
        demandNo: 'D-24',
        majorHead: '2210',
        subMajorHead: '01',
        minorHead: '110',
        segmentHead: 'Health',
        scheme: 'National Health Mission',
        project: 'NHM-MP-2024',
        chargedOrVoted: 'Voted',
        objectHead: '14',
        detailHead: 'Medical Equipment',
        ddoCode: 'DDO/MP/002',
        ddoName: 'Directorate of Health Services, Indore',
        ceilingLimit: 80000000 // 8 Crores
    },
    {
        id: 'BL004',
        demandNo: 'D-25',
        majorHead: '2215',
        subMajorHead: '01',
        minorHead: '110',
        segmentHead: 'Water Supply',
        scheme: 'Jal Jeevan Mission',
        chargedOrVoted: 'Voted',
        objectHead: '24',
        detailHead: 'Water Infrastructure',
        ddoCode: 'DDO/MP/003',
        ddoName: 'Public Health Engineering Department, Jabalpur',
        ceilingLimit: 200000000 // 20 Crores
    },
    {
        id: 'BL005',
        demandNo: 'D-26',
        majorHead: '3054',
        subMajorHead: '03',
        minorHead: '110',
        segmentHead: 'Roads',
        scheme: 'Pradhan Mantri Gram Sadak Yojana',
        project: 'PMGSY-MP-2024',
        chargedOrVoted: 'Voted',
        objectHead: '53',
        detailHead: 'Road Construction',
        ddoCode: 'DDO/MP/004',
        ddoName: 'Rural Engineering Services, Gwalior',
        ceilingLimit: 350000000 // 35 Crores
    }
];

// Mock Historical Data
export const MOCK_HISTORICAL_DATA: HistoricalData[] = [
    {
        budgetLineItemId: 'BL001',
        fy5: 38000000,
        fy4: 41000000,
        fy3: 43500000,
        fy2: 45000000,
        fy1: 47000000,
        currentYearBE: 48000000,
        actualTillDate: 28000000,
        projectedBalance: 18000000
    },
    {
        budgetLineItemId: 'BL002',
        fy5: 95000000,
        fy4: 100000000,
        fy3: 105000000,
        fy2: 110000000,
        fy1: 115000000,
        currentYearBE: 118000000,
        actualTillDate: 70000000,
        projectedBalance: 45000000
    },
    {
        budgetLineItemId: 'BL003',
        fy5: 62000000,
        fy4: 66000000,
        fy3: 70000000,
        fy2: 73000000,
        fy1: 76000000,
        currentYearBE: 78000000,
        actualTillDate: 46000000,
        projectedBalance: 30000000
    },
    {
        budgetLineItemId: 'BL004',
        fy5: 150000000,
        fy4: 165000000,
        fy3: 175000000,
        fy2: 185000000,
        fy1: 190000000,
        currentYearBE: 195000000,
        actualTillDate: 115000000,
        projectedBalance: 75000000
    },
    {
        budgetLineItemId: 'BL005',
        fy5: 280000000,
        fy4: 300000000,
        fy3: 315000000,
        fy2: 330000000,
        fy1: 340000000,
        currentYearBE: 345000000,
        actualTillDate: 200000000,
        projectedBalance: 130000000
    }
];

// Mock Users
export const MOCK_USERS: User[] = [
    {
        id: 'U001',
        name: 'Rajesh Kumar',
        designation: 'Assistant Director',
        role: 'ddo_creator',
        department: 'Education',
        ddoCode: 'DDO/MP/001'
    },
    {
        id: 'U002',
        name: 'Priya Sharma',
        designation: 'Deputy Director',
        role: 'ddo_verifier',
        department: 'Education',
        ddoCode: 'DDO/MP/001'
    },
    {
        id: 'U003',
        name: 'Amit Verma',
        designation: 'Director',
        role: 'ddo_approver',
        department: 'Education',
        ddoCode: 'DDO/MP/001'
    },
    {
        id: 'U004',
        name: 'Sunita Patel',
        designation: 'Budget Officer',
        role: 'bco_creator',
        department: 'Finance'
    },
    {
        id: 'U005',
        name: 'Vikram Singh',
        designation: 'Joint Director (Budget)',
        role: 'bco_verifier',
        department: 'Finance'
    },
    {
        id: 'U006',
        name: 'Kavita Malhotra',
        designation: 'Director (Budget)',
        role: 'bco_approver',
        department: 'Finance'
    }
];

// Mock Estimation Records
export const MOCK_ESTIMATIONS: EstimationRecord[] = [
    {
        id: 'EST001',
        budgetLineItemId: 'BL001',
        reviseEstimateCY: 46000000,
        budgetEstimateNextYear: 49000000,
        forwardEstimateY2: 51500000,
        forwardEstimateY3: 54000000,
        percentageDeviation: 2.08,
        status: 'approved',
        currentLevel: 'bco_approver',
        creatorRemarks: 'Increased allocation needed for new schools',
        verifierRemarks: 'Verified all calculations',
        approverRemarks: 'Approved with conditions',
        createdBy: 'U001',
        createdAt: '2024-10-15T10:30:00Z',
        submittedAt: '2024-10-15T14:00:00Z',
        verifiedAt: '2024-10-16T11:00:00Z',
        approvedAt: '2024-10-17T09:00:00Z',
        exceedsCeiling: false
    },
    {
        id: 'EST002',
        budgetLineItemId: 'BL002',
        reviseEstimateCY: 115000000,
        budgetEstimateNextYear: 119000000,
        forwardEstimateY2: 124000000,
        percentageDeviation: 0.85,
        status: 'under_verification',
        currentLevel: 'ddo_verifier',
        creatorRemarks: 'Increased student enrollment',
        createdBy: 'U001',
        createdAt: '2024-11-01T09:00:00Z',
        submittedAt: '2024-11-01T16:30:00Z',
        exceedsCeiling: false
    },
    {
        id: 'EST003',
        budgetLineItemId: 'BL003',
        reviseEstimateCY: 76000000,
        budgetEstimateNextYear: 79000000,
        forwardEstimateY2: 82000000,
        percentageDeviation: 1.28,
        status: 'draft',
        currentLevel: 'ddo_creator',
        creatorRemarks: '',
        createdBy: 'U001',
        createdAt: '2024-11-20T14:00:00Z',
        exceedsCeiling: false
    },
    {
        id: 'EST004',
        budgetLineItemId: 'BL004',
        reviseEstimateCY: 190000000,
        budgetEstimateNextYear: 198000000,
        forwardEstimateY2: 206000000,
        percentageDeviation: 1.54,
        status: 'under_approval',
        currentLevel: 'bco_creator',
        creatorRemarks: 'Expansion of water supply to 50 new villages',
        verifierRemarks: 'All documents verified',
        createdBy: 'U001',
        createdAt: '2024-10-25T11:00:00Z',
        submittedAt: '2024-10-25T17:00:00Z',
        verifiedAt: '2024-10-26T10:00:00Z',
        exceedsCeiling: false
    },
    {
        id: 'EST005',
        budgetLineItemId: 'BL005',
        reviseEstimateCY: 330000000,
        budgetEstimateNextYear: 360000000,
        forwardEstimateY2: 380000000,
        percentageDeviation: 4.35,
        status: 'returned',
        currentLevel: 'ddo_creator',
        creatorRemarks: 'Major new road construction projects',
        verifierRemarks: '',
        approverRemarks: 'Please justify ceiling excess',
        createdBy: 'U001',
        createdAt: '2024-11-10T10:00:00Z',
        submittedAt: '2024-11-10T15:00:00Z',
        modifiedAt: '2024-11-12T09:00:00Z',
        exceedsCeiling: true,
        exceedJustification: 'New national highway project allocation',
        assets: [
            {
                id: 'AST001',
                itemName: 'Road Construction Equipment',
                oldQuantity: 5,
                employeesUsing: 20,
                newRequired: 3,
                unitCost: 5000000,
                totalCost: 15000000,
                reason: 'Expansion of road network'
            }
        ]
    }
];

// Helper functions
export function getBudgetLineItemById(id: string): BudgetLineItem | undefined {
    return MOCK_BUDGET_LINE_ITEMS.find(item => item.id === id);
}

export function getHistoricalDataByBudgetLineId(budgetLineItemId: string): HistoricalData | undefined {
    return MOCK_HISTORICAL_DATA.find(data => data.budgetLineItemId === budgetLineItemId);
}

export function getEstimationsByRole(role: string): EstimationRecord[] {
    const levelMap: Record<string, string[]> = {
        'ddo_creator': ['draft', 'returned'],
        'ddo_verifier': ['under_verification'],
        'ddo_approver': ['under_approval'],
        'bco_creator': ['under_approval'],
        'bco_verifier': ['under_verification'],
        'bco_approver': ['under_approval']
    };

    return MOCK_ESTIMATIONS.filter(est => {
        if (role.startsWith('ddo')) {
            return est.currentLevel.startsWith('ddo');
        } else if (role.startsWith('bco')) {
            return est.currentLevel.startsWith('bco');
        }
        return false;
    });
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

export function calculateTotalExpected(actual: number, projected: number): number {
    return actual + projected;
}

export function calculatePercentageDeviation(be: number, re: number): number {
    if (re === 0) return 0;
    return ((be - re) / re) * 100;
}
