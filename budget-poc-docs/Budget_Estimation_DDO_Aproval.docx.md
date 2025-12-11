**User Story: Budget Estimation – DDO Approver (Expenditure)**

**User Story ID:** BEL\_BM\_IFMIS\_BE\_EXP\_DDO\_APPROVER\_03  
**Module:** Budget Management – Budget Estimation  
**BEL Contact**: Kamal Saryam, Shrikant Tirki, Gaurav Singh  
**DTA SPOC**: Ashish Nandanwar  
**DTA Technical**: Abhay Borikar

**1\. User Story**

As a DDO Approver, I want to review, modify, and approve the Expenditure Budget Estimation submitted by the DDO Verifier, so that I can ensure the data is accurate, rule-compliant, and ready for forwarding to the BCO or returned with remarks.

I should be able to:

* Review system-fetched historical and analytical data

* Validate RE/BE/MTE deviations

* Modify values when needed

* Verify breakup details for specific Detail Heads

* Verify pension details for specific Major Head

* Forward or Return the record with mandatory remarks

**2\. Pre-Conditions**

* DDO Verifier must have submitted the budget estimation.

* Budget Lines for the DDO must be activated by the Department/BCO.

* Actuals, BE, RE, MTE, and Past-5-Year data must be pre-fetched from AG/VLC, HoA Master.

**3\. Process Flow – DDO Creator**

**Data Synchronization (Auto by System)**

* Fetch DDO user profile, Department, DDO Code from HRMS.

* Auto-populate all related Budget Line details from HoA Master.

* Retrieve:

  * Previous Year BE/RE

  * Past 5 Years Actuals

  * Actuals till cutoff month

  * System-Projected (Sep–Mar)

  * MTE

  * Breakup details (if applicable)

  * Pensioners details(if applicable)

**As a DDO Approver, I want to:**

**Login & Navigate**

* Log in → Worklist → **Pending**

* Open any Budget Line Estimation forwarded by DDO Verifier.

**Review Auto-Fetched Information**

The Approver reviews:

* HoA (Demand to Detail Head)

* Past 5-Year trends (optional toggle)

* BE/RE values of previous year

* Current year Actuals \+ Projections

* System Suggested RE & System Suggested BE

* Medium-Term Estimates & Deviation %

* Ceiling Limit (for the budget line)

**Verify Creator Inputs**

Approver validates:

* Proposed RE (Current Year)

* BE1 (Next Year)

* BE2 (Next Year \+1)

* BE3 (Next Year \+2)

* Detail Head breakup correctness & completeness

**Edit, If Needed**

Approver can edit the following fields:

* Proposed RE

* BE1, BE2, BE3

* Breakup rows

* Add Approver remarks

* Pensioners Details

* Attach supporting documents (optional)

**System Validations Auto-Trigger**

At any edit or on submit, system checks:

* RE ≥ Actuals

* Medium-term deviation auto-highlights if high

* Numeric field validations

* No negative or unrealistic numbers

**Actions Available to DDO Approver**

**Modify & Forward**

If data is correct → **Click Forward** to BCO.

**Return to DDO Verifier**

If corrections needed:

* Click **Return**

* Enter mandatory remarks

**Save as Draft**

Approver can save ongoing modifications as **Draft** without forwarding.

**4\. Process Flow Diagram**

**5\. Rule Management/Business Logic**

| Rule ID | Rule Name | Category | Trigger / Event | Input Parameters / Data Fields | Logic / Formula / Condition | Effective From | Owner Department / Editable By | Parameter Name | Data Type | Value Range | Current Values | Source / Master Table | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **RM\_VER\_01** | RE Minimum Validation | Validation | On RE edit / Submit | Proposed RE, Actual Expenditure Till Cutoff | Proposed RE ≥ Actual Expenditure | FY 2025–26 | FD (Finance Dept) / System Admin | RE Validation | Numeric | ≥ Actuals | Auto from system | AG / VLC Actuals | Ensures Approver cannot approve RE lower than actuals |
| **RM\_VER\_02** | BE–MTE Deviation Calculation | Calculation | On BE edit | BE1, BE2, BE3, MTE Yr+1, MTE Yr+2 | Deviation \= BE – MTE; Deviation % \= (Deviation / MTE) × 100 | FY 2025–26 | FD Budget | Deviation Threshold | Numeric (%) | 0–100 | 10% | MTE Master | Rows highlighted in red if deviation \> threshold |
| **RM\_VER\_03** | Breakup Requirement Validation | Business Rule | When Detail Head loads | Detail Head Code | If DetailHead ∈ BreakupList → Breakup mandatory | FY 2025–26 | Finance Dept | Breakup Required List | Text | Specific Detail Heads | 22/002, 22/003, 22/009, 23/001, 27/001, 31/007 | Detail Head Master | Approver must check correctness of breakup |
| **RM\_VER\_04** | Breakup Total Cost Rule | Calculation | On Qty / Unit Cost edit | Qty, Unit Cost | Total Cost \= Qty × Unit Cost | FY 2025–26 | Budget Module Admin | Cost Formula | Numeric | ≥ 0 | Auto | Breakup Entry | Used for budget justification |
| **RM\_VER\_05** | Attachment Rule for Exceeding Ceiling | Validation | On exceeding ceiling | Justification Doc | File Type \= PDF/JPG, Size ≤ 10 MB | FY 2025–26 | FD IT Team | File Size | Numeric (MB) | 1–10 | 10 MB | Document Repository | Only needed when BE1 \> Ceiling |
| **RM\_VER\_6** | Auto-Lock System Fields | System Rule | On form load | System Projected RE/BE, MTE, Actuals | These fields must remain non-editable | FY 2025–26 | Budget Module Admin | Projection Lock | Boolean | True/False | True | Projection Engine | Approver cannot change system values |

**6\. Acts, Rules & Circulars Referenced**

* Budget Manual of Madhya Pradesh (2012), Page 149, Point 12

* Madhya Pradesh Financial Code, Volume–I, Page 362 of 378 – Annexure III: Reference Rules & Acts

**7\. Acceptance Criteria**

* The budget estimation is considered successfully approved when:

  * All mandatory fields are complete and valid.

  * RE values meet the rule (RE ≥ Actuals).

  * Breakup data complete (if applicable).

  * No validation errors remain.

  * Approver approves the record → Moves to **BCO Creator Worklist**.

  * If returned, the status updates → **Returned to DDO Verifier**, with remarks captured in audit trail.

**8\. Internal Module Integration**

* e-HRMIS

* Purchase Inventory

* Book Keeping & Asset Register

**9\. External Module Integration**

* Not Applicable

**9\. Field Table**

| Field Name | Description | UI Component | Field Type | Field Length | Mandatory (Y/N) | *Validation Rule* | *Remarks* |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Demand No** | Demand Number mapped to Budget Line | Display Field | Auto-Fetched | 3 digits | Y | None | Fetched from HoA Master |
| **Major Head** | Major classification | Display Field | Auto-Fetched | 4 digits | Y | None | Read-only |
| **Sub Major Head** | Sub-major classification | Display Field | Auto-Fetched | 2 digits | Y | None | Read-only |
| **Minor Head** | Minor classification | Display Field | Auto-Fetched | 3 digits | Y | None | Read-only |
| **Segment Head** | Segment code | Display Field | Auto-Fetched | 4 digits | Y | None | Read-only |
| **Scheme** | Scheme mapped with budget line | Display Field | Auto-Fetched | N/A | Y | None | Read-only |
| **Project** | Project Code (if applicable) | Display Field | Auto-Fetched | N/A | N | None | Optional |
| **Object Head** | Accounting object head | Display Field | Auto-Fetched | 2 digits | Y | None | Read-only |
| **Detail Head** | Detail object head | Display Field | Auto-Fetched | 3 digits | Y | None | Read-only |
| **Charged / Voted** | Indicates nature of expenditure | Display Field | Auto-Fetched | N/A | Y | None | Read-only |
| **Previous 5 Years Actuals** | Prior year expenditure history | Table | Numeric | N/A | N | Auto-fetched numbers | Displayed on toggle |
| **Budget Estimate (Previous FY)** | BE of the last FY | Display | Numeric | 15 | N | ≥ 0 | Fetched from AG/VLC |
| **Expenditure (Previous FY)** | Actual expenditure for the last FY | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| **Budget Estimate (Current FY)** | Approved BE for current financial year | Display | Numeric | 15 | Y | ≥ 0 | Auto-fetched |
| **Budget Allotment (Current FY)** | Allotment released to DDO | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| **Budget Re-appropriation** | Additions/reductions during FY | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| **Supplementary Budget (RA \+ Suppl.)** | Read-only field showing the total supplementary amount sanctioned for the current FY | Display Field | Numeric | 15 | N | Cannot be edited | Auto-fetched from Supplementary Budget records |
| **Total Budget Estimate (Current FY)** | Sum of BE \+ RA \+ Supplementary | Display | Numeric | 15 | Y | ≥ 0 | Formula: BE \+ RA \+ Suppl. |
| **Expenditure Upto Cutoff Date** | Actual expenditure till system-defined cutoff (e.g., 31 Aug) | Display | Numeric | 15 | Y | ≥ 0 | Auto-fetched |
| **Proposed Expenditure (Remaining Months)** | DDO-projected expenditure for remaining FY | Input | Numeric | 15 | Y | ≥ 0 | Approver can modify |
| **Total Revised Estimate (RE)** | Total RE for the current year | Display | Numeric | 15 | Y | ≥ 0 | Formula: RE \= Expenditure Till Date \+ Proposed Remaining Expenditure |
| **Amount Remaining for Surrender** | Unutilized budget to surrender | Display | Numeric | 15 | N | Can be negative | Formula: Surrender \= Total BE – Total RE |
| **% RE Over BE (Previous FY)** | Percentage difference of RE over Previous Year BE | Display | Numeric | 5 | N | Auto-calculated | Formula: ((RE – PreviousYearBE) / PreviousYearBE) × 100 |
| **BE for Next FY (BE1)** | Main budget estimate for next FY | Input | Numeric | 15 | Y | ≥ 0 | Verify  can modify |
| **% BE1 Over Current BE** | Variance % from current BE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentBE) / CurrentBE) × 100 |
| **% BE1 Over Current RE** | Variance % from current RE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentRE) / CurrentRE) × 100 |
| **BE for Next FY \+1 (BE2)** | Budget projection for subsequent year | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| **BE for Next FY \+2 (BE3)** | Two-year forward budget estimate | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| **DDO Verifier Remarks** | General explanation | Text Area | Text | 2000 | N | None | Optional |
| **Supporting Documents** | Additional docs | File Upload | PDF/JPG | 10MB | N | None | Optional |
| **Audit Trail** | Complete history of all actions | Read-only Grid / Tab | Auto | — | N | None | Shows Creator  actions, timestamps & field changes |

**Fields for Salary(Object Head – 11/12/16/19/31)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| **Grade Pay Code** | Grade pay code (e.g., GP2400) | Dropdown / Display | Text | 10 | Y | Must be valid grade pay | Selectable from GradePay master |
| **Employee Count (Grade)** | Number of active employees in this grade (for salary) | Numeric Input | Integer | 6 | Y | ≥ 0 | Fetched from HRMS but editable by DDO Approver |
| **Avg Basic Pay (per emp)** | Average basic pay for employees in this grade used for budget calc | Numeric Input | Decimal | 12 | Y | ≥ 0 | Auto-calculated from HRMS (avg) and editable |
| **DA % (Configured)** | Dearness Allowance percent used for estimation | Display / Input | Decimal | 5 (pct) | Y | 0–100 | System-configured value; editable by FD admin |
| **Monthly Estimated Salary (computed)** | Estimated monthly obligation for this grade (incl DA) | Display (computed) | Numeric | 15 | Y | \= Employee Count × Avg Basic × (1 \+ DA%) | Auto-calculated; read-only |
| **Annual Estimated Salary (computed)** | Annual estimate \= Monthly × 12 | Display (computed) | Numeric | 15 | Y | \= Monthly × 12 | Auto-calculated; read-only |

**Fields for Telephone(22/002)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| **Type of Telephone Connection** | Mobile/Landline/Broadband | Dropdown | Enum | NA | Y | Must select one | Master maintained |
| **Description** | Short usage/purpose description | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | Existing active telephone connections | Number Input | Integer | 5 | Y | ≥ 0 | Fetched from backend; editable |
| **Number of Employees Using Asset** | Employees assigned telephone service | Number Input | Integer | 5 | N | ≥ 0 | Backend data; editable |
| **New Required Quantity** | Additional connections needed | Number Input | Integer | 5 | Y | ≥ 0 | DDO entry |
| **Monthly Charge (₹)** | Monthly tariff per connection | Number Input | Decimal | 12 | Y | \> 0 | Editable |
| **Yearly Total (₹)** | Auto yearly telephone cost | Display | Numeric | NA | Y | (Old \+ New Qty) × Monthly Charge × 12 | Auto |
| **Reason for New Purchase** | Justification | Text Area | Text | 500 | Y | Cannot be blank | Mandatory if New Qty \> 0 |

**Fields for Furniture Purchase(22/003)**

| Field Name | Description | UI Component | Type | Len | Mandatory | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | Auto | Display | Text | 10 | Y | Read-only | Backend |
| **DDO Name** | Auto | Display | Text | 100 | Y | Read-only | Backend |
| **Name of Furniture Item** | Table/Chair/Almirah etc. | Text Box | Text | 200 | Y | No special chars | Master suggested |
| **Description** | Short usage/purpose description | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | Present usable items | Number Input | Integer | 5 | Y | ≥ 0 | Backend editable |
| **Number of Employees Using Asset** | Staff using items | Number Input | Integer | 5 | N | ≥ 0 | Optional |
| **New Required Quantity** | Additional items | Number Input | Integer | 5 | Y | ≥ 0 | DDO entry |
| **Per Unit Cost (₹)** | Purchase price per item | Number Input | Decimal | 12 | Y | \> 0 | Editable |
| **Total Cost (₹)** | Cost of new quantity | Display | Numeric | NA | Y | Qty × Unit Cost | Auto |
| **Reason for New Purchase** | Justification | Text Area | Text | 500 | Y | Must explain requirement | Mandatory |

**Fields for Petrol, Oil etc(22/009)**

| Field Name | Description | UI Component | Type | Len | Mandatory | Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | Auto | Display | Text | 10 | Y | Read-only | — |
| **DDO Name** | Auto | Display | Text | 100 | Y | Read-only | — |
| **Type of Vehicle** | Car/Jeep/Two Wheeler | Dropdown | Enum | NA | Y | Must select | For fuel mapping |
| **Description** | Short usage/purpose description | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | No. of vehicles currently in use | Number | Int | 5 | Y | ≥ 0 | Backend editable |
| **Number of Employees Using Asset** | Persons authorized | Number | Int | 5 | N | ≥ 0 | Optional |
| **New Required Quantity** | Additional vehicles needing fuel | Number | Int | 5 | Y | ≥ 0 | — |
| **Monthly Fuel Cost (₹)** | Average monthly fuel expense | Number | Decimal | 12 | Y | \> 0 | Editable |
| **Yearly Total (₹)** | Auto \= Monthly Cost × 12 × Total Vehicles | Display | Numeric | NA | Y | System calculated | — |
| **Reason for Additional Requirement** | Justification | Text Area |  |  | Y | Mandatory | — |

**Fields for Purchase of Office Equipment (23/001)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | Unique code of DDO | Display Field | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | Name of DDO | Display Field | Text | 100 | Y | Read-only | Auto-fetched |
| **Name of Office Equipment** | Printer, Scanner, UPS, etc. | Text Box | String | 200 | Y | No special chars | Editable |
| **Description** | Short usage/purpose description | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | Existing working equipment quantity | Number Input | Integer | 5 | Y | ≥ 0 | Fetched from backend; editable |
| **Number of Employees Using Asset** | Employees dependent on this equipment | Number Input | Integer | 5 | N | ≥ 0 | Optional |
| **New Required Quantity** | Additional equipment required | Number Input | Integer | 5 | Y | ≥ 0 | Must be non-negative |
| **Per Unit Cost (₹)** | Cost per equipment item | Number Input | Decimal | 12 | Y | \> 0 | Editable by DDO |
| **Total Cost (₹)** | Auto \= New Qty × Per Unit Cost | Display | Numeric | — | Y | Autocalculated | Read-only |
| **Reason for New Purchase** | Why new equipment is needed | Text Area | String | 500 | Y | Cannot be blank | Mandatory if New Qty \> 0 |

**Fields for IT Computer Purchase Capital (27/001)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | Auto-fetched DDO Code | Display | Text | 10 | Y | Read-only | From HRMS |
| **DDO Name** | Auto-fetched DDO Name | Display | Text | 100 | Y | Read-only | From HRMS |
| **IT Asset Type** | Desktop / Laptop / Printer / Scanner / Server | Dropdown | Enum | — | Y | Must select | Asset Master-driven |
| **Description** | Technical or usage description | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | Existing available IT assets | Number Input | Integer | 5 | Y | ≥ 0 | Backend value, editable |
| **Number of Employees Using Asset** | Users assigned asset | Number Input | Integer | 5 | N | ≥ 0 | Optional |
| **New Required Quantity** | New machines/devices required | Number Input | Integer | 5 | Y | ≥ 0 | DDO Entry |
| **Per Unit Cost (₹)** | Cost per device | Number Input | Decimal | 12 | Y | \> 0 | Editable |
| **Total Cost (₹)** | Auto \= Qty × Unit Cost | Display | Numeric | — | Y | Auto | Read-only |
| **Reason for New Purchase** | Business/technical justification | Text Area | String | 500 | Y | Cannot be blank | Mandatory when New Qty \> 0 |

**Fields for Transportation Service(31/007)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO Identifier | Display | Text | 10 | Y | Read-only | Auto |
| **DDO Name** | DDO Name | Display | Text | 100 | Y | Read-only | Auto |
| **Type of Vehicle** | Sedan/SUV/Hatchback rental type | Dropdown | Enum | — | Y | Must select | Rental Master |
| **Description** | Purpose of vehicle (inspection, official visits) | Text Box | String | 300 | N | — | Auto-fetched |
| **Old Available Quantity** | No. of rental cars currently used | Number Input | Integer | 5 | Y | ≥ 0 | Backend data |
| **Number of Employees Using Asset** | Officers using rental car service | Number Input | Integer | 5 | N | ≥ 0 | Optional |
| **New Required Quantity** | No. of additional rental cars required | Number Input | Integer | 5 | Y | ≥ 0 | — |
| **Monthly Rental Charge (₹)** | Monthly cost per car | Number Input | Decimal | 12 | Y | \> 0 | Editable |
| **Yearly Total (₹)** | Auto \= (Old \+ New Qty) × Monthly Charge × 12 | Display | Numeric | — | Y | Auto | Read-only |
| **Reason for New Requirement** | Justification for additional rental cars | Text Area | String | 500 | Y | Cannot be blank | Required when New Qty \> 0 |

**Fields for Electricity(22/005)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | Unique identifier of the DDO | Display Field | Auto-Fetched | — | Y | Non-editable | From HRMS |
| **DDO Name** | Name of the DDO | Display Field | Auto-Fetched | — | Y | Non-editable | Retrieved from HRMS |
| **Description / Meter Purpose** | Short description of electricity usage (building/office) | Text Box | String | 200 | Y | No special characters | e.g., “Main Office Electricity” |
| **Actual Yearly Expenditure (₹)** | Total electricity amount spent in last FY | Numeric Input | Number | 15 | Y | Must be ≥ 0 | Can be fetched from AG/VLC; editable by DDO |
| **System Expected Expenditure (₹)** | 10% escalation applied by system | Display Field (Auto) | Numeric | — | Y | Auto \= Actual × 1.10 | Non-editable |
| **DDO Estimated Expenditure (₹)** | Amount proposed by DDO for next FY | Numeric Input | Number | 15 | Y | Must be ≥ Actual Expenditure | If \> system expected → justification required |
| **Reason for Higher Estimate** | Justification if estimate exceeds system’s escalated value | Text Area | String | 500 | Conditional | Mandatory when DDO Estimate \> System Expected | Example: “New AC units installed” |
| **Supporting Document** | Upload proof or note (optional) | File Upload | PDF/JPG | 10 MB | N | Valid formats | Optional unless required for justification |

**Fields for Pension** 

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| **Grade Pay Code** | Grade pay of retiree | Dropdown | Text | 10 | Y | Valid grade pay | Auto from HRMS |
| **Retirement Date** | Date of retirement (effective) | Date Picker | Date | — | Y | Must be a future or current date | Used to compute months of saving |
| **Avg/Expected Pension Start Amount (monthly)** | Expected monthly pension for this retiree | Numeric Input | Decimal | 12 | Y | ≥ 0 | Can be estimated from last pay & rules |
| **Months of Pension in FY** | Months pension falls in budget year (computed) | Display | Integer | 2 | Y | Calculated from date | Auto |
| **Estimated Annual Pension (computed)** | \= Pension Start Amount × 12 (or MonthsOfPension × monthly) | Display | Numeric | 15 | Y | Auto | Read-only |
| **Justification / Note** | Reason / special case | Text Area | Text | 500 | N | If pension \> expected | Optional |

**10\. Wireframe**

![][image1] ![][image2] 

   

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>