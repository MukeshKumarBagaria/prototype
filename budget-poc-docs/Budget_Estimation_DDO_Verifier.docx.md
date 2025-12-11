**User Story: Budget Estimation – DDO Verifier (Expenditure)**

**User Story ID:** BEL\_BM\_IFMIS\_BE\_EXP\_DDO\_VERIFIER\_02  
**Module:** Budget Management – Budget Estimation  
**BEL Contact**: Kamal Saryam, Shrikant Tirki, Gaurav Singh  
**DTA SPOC**: Ashish Nandanwar  
**DTA Technical**: Abhay Borikar

**1\. User Story**

As a DDO Verifier, I want to review, modify, and verify the Expenditure Budget Estimation submitted by the DDO Creator, so that I can ensure the data is accurate, rule-compliant, and ready for forwarding to the DDO Approver or returned with remarks.

I should be able to:

* Review system-fetched historical and analytical data

* View RE/BE deviations from Medium term Estimate (MTE)

* Modify values when needed

* Verify breakup details for specific Detail Heads

* Verify pension details for specific Major Head

* Forward or Return the record with mandatory remarks

**2\. Pre-Conditions**

* DDO Creator must have submitted the budget estimation.

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

**As a DDO Verifier, I want to:**

**Login & Navigate**

* Log in → Worklist → **Pending**

* Open any Budget Line Estimation submitted by DDO Creator.

**Review Auto-Fetched Information**

The Verifier reviews:

* HoA (Demand to Detail Head)

* Past 5-Year trends (optional toggle)

* BE/RE values of previous year

* Current year Actuals \+ Projections

* System Suggested RE & System Suggested BE

* Medium-Term Estimates & Deviation %

**Verify Creator Inputs**

Verifier validates the Creator-entered fields:

* Proposed RE (Current Year)

* BE1 (Next Year)

* BE2 (Next Year \+1)

* BE3 (Next Year \+2)

* Detail Head breakup correctness & completeness

* DDO Remarks

**Edit, If Needed**

Verifier can edit the following fields:

* Proposed RE

* BE1, BE2, BE3

* Detail head Breakup rows

* Pensioners Details

* Add Verifier remarks

* Attach supporting documents (optional)

**System Validations Auto-Trigger**

At any edit or on submit, system checks:

* RE ≥ Actuals

* Medium-term deviation auto-highlights if high

* Numeric field validations

* No negative or unrealistic numbers

**Actions Available to DDO Verifier**

**Modify & Forward**

If data is correct → **Click Forward** to DDO Approver.

**Return to DDO Creator**

If corrections are needed:

* Click **Return**

* Enter mandatory remarks

**Save as Draft**

Verifier can save ongoing modifications as **Draft** without forwarding.

**4\. Process Flow Diagram**

**5\. Rule Management/Business Logic**

| Rule ID | Rule Name | Category | Trigger / Event | Input Parameters / Data Fields | Logic / Formula / Condition | Effective From | Owner Department / Editable By | Parameter Name | Data Type | Value Range | Current Values | Source / Master Table | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **RM\_VER\_01** | RE Minimum Validation | Validation | On RE edit / Submit | Proposed RE, Actual Expenditure Till Cutoff | Proposed RE ≥ Actual Expenditure | FY 2025–26 | FD (Finance Dept) / System Admin | RE Validation | Numeric | ≥ Actuals | Auto from system | AG / VLC Actuals | Ensures Verifier cannot approve RE lower than actuals |
| **RM\_VER\_02** | BE–MTE Deviation Calculation | Calculation | On BE edit | BE1, BE2, BE3, MTE Yr+1, MTE Yr+2 | Deviation \= BE – MTE; Deviation % \= (Deviation / MTE) × 100 | FY 2025–26 | FD Budget | Deviation Threshold | Numeric (%) | 0–100 | 10% | MTE Master | Rows highlighted in red if deviation \> threshold |
| **RM\_VER\_03** | Breakup Requirement Validation | Business Rule | When Detail Head loads | Detail Head Code | If DetailHead ∈ BreakupList → Breakup mandatory | FY 2025–26 | Finance Dept | Breakup Required List | Text | Specific Detail Heads | 22/002, 22/003, 22/009, 23/001, 27/001, 31/007 | Detail Head Master | Verifier must check correctness of breakup |
| **RM\_VER\_04** | Breakup Total Cost Rule | Calculation | On Qty / Unit Cost edit | Qty, Unit Cost | Total Cost \= Qty × Unit Cost | FY 2025–26 | Budget Module Admin | Cost Formula | Numeric | ≥ 0 | Auto | Breakup Entry | Used for budget justification |
| **RM\_VER\_05** | Attachment Rule for Exceeding Ceiling | Validation | On exceeding ceiling | Justification Doc | File Type \= PDF/JPG, Size ≤ 10 MB | FY 2025–26 | FD IT Team | File Size | Numeric (MB) | 1–10 | 10 MB | Document Repository | Only needed when BE1 \> Ceiling |
| **RM\_VER\_6** | Auto-Lock System Fields | System Rule | On form load | System Projected RE/BE, MTE, Actuals | These fields must remain non-editable | FY 2025–26 | Budget Module Admin | Projection Lock | Boolean | True/False | True | Projection Engine | Verifier cannot change system values |

**6\. Acts, Rules & Circulars Referenced**

* Budget Manual of Madhya Pradesh (2012), Page 149, Point 12

* Madhya Pradesh Financial Code, Volume–I, Page 362 of 378 – Annexure III: Reference Rules & Acts

**7\. Acceptance Criteria**

* The budget estimation is considered successfully verified when:

  * All mandatory fields are complete and valid.

  * RE values meet the rule (RE ≥ Actuals).

  * Breakup data complete (if applicable).

  * No validation errors remain.

  * Verifier forwards the record → Moves to **DDO Approver Worklist**.

  * If returned, the status updates → **Returned to DDO Creator**, with remarks captured in audit trail.

**8\. Internal Module Integration**

* e-HRMIS

* Purchase Inventory

* Book Keeping & Asset Register

**9\. External Module Integration**

* Not Applicable

**9\. Field Table**

| Field Name | Description | UI Component | Field Type | Field Length | Mandatory (Y/N) | *Validation Rule* | *Remarks* |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Demand No | Demand Number mapped to Budget Line | Display Field | Auto-Fetched | 3 digits | Y | None | Fetched from HoA Master |
| Major Head | Major classification | Display Field | Auto-Fetched | 4 digits | Y | None | Read-only |
| Sub Major Head | Sub-major classification | Display Field | Auto-Fetched | 2 digits | Y | None | Read-only |
| Minor Head | Minor classification | Display Field | Auto-Fetched | 3 digits | Y | None | Read-only |
| Segment Head | Segment code | Display Field | Auto-Fetched | 4 digits | Y | None | Read-only |
| Scheme | Scheme mapped with budget line | Display Field | Auto-Fetched | N/A | Y | None | Read-only |
| Project | Project Code (if applicable) | Display Field | Auto-Fetched | N/A | N | None | Optional |
| Object Head | Accounting object head | Display Field | Auto-Fetched | 2 digits | Y | None | Read-only |
| Detail Head | Detail object head | Display Field | Auto-Fetched | 3 digits | Y | None | Read-only |
| Charged / Voted | Indicates nature of expenditure | Display Field | Auto-Fetched | N/A | Y | None | Read-only |
| Previous 5 Years Actuals | Prior year expenditure history | Table | Numeric | N/A | N | Auto-fetched numbers | Displayed on toggle |
| Budget Estimate (Previous FY) | BE of the last FY | Display | Numeric | 15 | N | ≥ 0 | Fetched from AG/VLC |
| Expenditure (Previous FY) | Actual expenditure for the last FY | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| Budget Estimate (Current FY) | Approved BE for current financial year | Display | Numeric | 15 | Y | ≥ 0 | Auto-fetched |
| Budget Allotment (Current FY) | Allotment released to DDO | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| Budget Re-appropriation | Additions/reductions during FY | Display | Numeric | 15 | N | ≥ 0 | Auto-fetched |
| **Supplementary Budget (RA \+ Suppl.)** | Read-only field showing the total supplementary amount sanctioned for the current FY | Display Field | Numeric | 15 | N | Cannot be edited | Auto-fetched from Supplementary Budget records |
| Total Budget Estimate (Current FY) | Sum of BE \+ RA \+ Supplementary | Display | Numeric | 15 | Y | ≥ 0 | Formula: BE \+ RA \+ Suppl. |
| Expenditure Upto Cutoff Date | Actual expenditure till system-defined cutoff (e.g., 31 Aug) | Display | Numeric | 15 | Y | ≥ 0 | Auto-fetched |
| Proposed Expenditure (Remaining Months) | DDO-projected expenditure for remaining FY | Input | Numeric | 15 | Y | ≥ 0 | Verify can modify |
| Total Revised Estimate (RE) | Total RE for the current year | Display | Numeric | 15 | Y | ≥ 0 | Formula: RE \= Expenditure Till Date \+ Proposed Remaining Expenditure |
| Amount Remaining for Surrender | Unutilized budget to surrender | Display | Numeric | 15 | N | Can be negative | Formula: Surrender \= Total BE – Total RE |
| % RE Over BE (Previous FY) | Percentage difference of RE over Previous Year BE | Display | Numeric | 5 | N | Auto-calculated | Formula: ((RE – PreviousYearBE) / PreviousYearBE) × 100 |
| BE for Next FY (BE1) | Main budget estimate for next FY | Input | Numeric | 15 | Y | ≥ 0 | Verify  can modify |
| % BE1 Over Current BE | Variance % from current BE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentBE) / CurrentBE) × 100 |
| % BE1 Over Current RE | Variance % from current RE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentRE) / CurrentRE) × 100 |
| BE for Next FY \+1 (BE2) | Budget projection for subsequent year | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| BE for Next FY \+2 (BE3) | Two-year forward budget estimate | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| DDO Verifier Remarks | General explanation | Text Area | Text | 2000 | N | None | Optional |
| Supporting Documents | Additional docs | File Upload | PDF/JPG | 10MB | N | None | Optional |
| Audit Trail | Complete history of all actions | Read-only Grid / Tab | Auto | — | N | None | Shows Creator  actions, timestamps & field changes |

**Fields for Salary(Object Head – 11/12/16/19/31)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| **Grade Pay Code** | Grade pay code (e.g., GP2400) | Dropdown / Display | Text | 10 | Y | Must be valid grade pay | Selectable from GradePay master |
| **Employee Count (Grade)** | Number of active employees in this grade (for salary) | Numeric Input | Integer | 6 | Y | ≥ 0 | Fetched from HRMS but editable by DDO Verifier |
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
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
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
| DDO Code | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| DDO Name | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| Grade Pay Code | Grade pay of retiree | Dropdown | Text | 10 | Y | Valid grade pay | Auto from HRMS |
| Retirement Date | Date of retirement (effective) | Date Picker | Date | — | Y | Must be a future or current date | Used to compute months of saving |
| Avg/Expected Pension Start Amount (monthly) | Expected monthly pension for this retiree | Numeric Input | Decimal | 12 | Y | ≥ 0 | Can be estimated from last pay & rules |
| Months of Pension in FY | Months pension falls in budget year (computed) | Display | Integer | 2 | Y | Calculated from date | Auto |
| Estimated Annual Pension (computed) | \= Pension Start Amount × 12 (or MonthsOfPension × monthly) | Display | Numeric | 15 | Y | Auto | Read-only |
| Justification / Note | Reason / special case | Text Area | Text | 500 | N | If pension \> expected | Optional |

**10\. Wireframe**

![][image1]![][image2] 

   

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>