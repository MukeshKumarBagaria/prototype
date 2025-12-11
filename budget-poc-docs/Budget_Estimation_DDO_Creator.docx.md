**User Story: Budget Estimation – DDO Creator (Expenditure)**

**User Story ID:** BEL\_BM\_IFMIS\_BE\_EXP\_DDO\_CREATOR\_01  
**Module:** Budget Management – Budget Estimation

**BEL Contact**: Kamal Saryam, Shrikant Tirki, Gaurav Singh  
**DTA SPOC**: Ashish Nandanwar  
**DTA Technical**: Abhay Borikar

**1\. User Story**

As a DDO Creator, I want to prepare and submit the Expenditure Budget Estimation so that:

* I can enter Revised Estimates (RE) for current year

* I can enter Budget Estimates (BE) for next three years

* I can view past expenditure data and system projections

* I can submit my estimation to DDO Verifier for further review

* I can enter item-wise breakup for specific Detail Heads where breakup is required

* I can enter Pensioners Estimation data when the Major Head belongs to pension category (e.g., 2701\) so that pension-related expenditure is captured accurately

**2\. Pre-Conditions**

* Budget Module is activated for the Department.

* Budget Line Items are mapped with the DDO by BCO.

* Past 5 years actuals, previous RE, previous BE availability through integration with AG/Accounts systems.

* DDO employee details, designation, DDO code must exist in HRMS.

* Mapping of Detail Heads Heads (e.g., Telephone, Furniture Purchase, Petrol, oil ,etc., Purchase of Office Equipment, IT Computer Purchase Capital, Trasportation Service, Salaries) requiring breakup must be maintained in Budget Master.

* System must generate Medium-Term Estimates (MTE) for:

  * Past 1 year (T–1)

  * Current year (T)

  * Next 2 years (T+1, T+2)  
    Previousd on previous year submitted Rolling Budget.

* Pensioner retirement data (next 1–2 years) must be available from e-HRMS  (auto-fetched but editable).

**3\. Process Flow – DDO Creator**

**Data Synchronization**

System fetches Employee → DDO → Department mapping from e-HRMS API.  
System retrieves:

* Budget lines assigned to the DDO

* Actual expenditure for last 5 years

* Previous year RE & BE

* System-forecasted RE & BE

* Medium-Term Estimates (MTE) for 3 years using rolling budget

* Usage data for all  breakup-required detail heads (Telephone, Furniture, Car Rental, Fuel, IT Assets, Electricity, etc.)

**DDO Creator Actions**

Navigation:  
**Budget Estimation → Expenditure → Create**

System auto-populates the following upon selecting the Budget Line Item:

* Demand No, Major, Sub-Major, Minor

* Segment, Scheme, Project

* Object Head, Detail Head

* Departmental Account details

* Past expenditure (5 years)

* Previous RE, Previous BE

* Current Year Actuals

* Projected expenditure for remaining period

**DDO Enter Budget Values**

* Revised Estimate (Current Year)

* Main Budget Estimate: Next Year (BE1)

* Next Year \+ 1 (BE2)

* Next Year \+ 2 (BE3) etc

**Breakup Section(Conditional)**

If the Detail Head requires breakup → System shows **Breakup Details** section.

**Breakup Required Detail Heads**

| Object Head | Detail Head Code | Detail Head Description (English) |
| :---- | :---- | :---- |
| 11 |  | Regular Salary (Permanent Employees) |
| 12 |  | Wages – Permanent Labour |
| 16 |  | IAS Salary (Indian Administrative Service) |
| 19 |  | Work-Charged / Temporary Duty Employee Salary |
| 31 | 004 | Outsourced Staff Payment |
| 22 | 002 | Telephone  |
| 22 | 003 | Furniture Purchase |
| 22 | 005 | Electricity |
| 22 | 009 | Petrol, Oil etc |
| 23 | 001 | Purchase of Office Equipment |
| 27 | 001 | IT & Computer Purchase Capital |
| 31 | 007 | Transportation Service |

**Item-Wise Breakup Fields**

* Name of Item / Asset

* Description

* Old Available Quantity

* Number of Employees Using Asset

* New Required Quantity

* Per Unit Cost / Monthly Charge (depending on detail head)

* Total Cost (auto \= Qty × Unit Cost) / Yearly Total

* Reason for New Purchase

**Pension-related data (if Major Head \= 2701), including:**

* Number of employees retiring

* Grade pay

* Expected retirement month

* Salary to be stopped

* Estimated pension start amount

* Total savings for remaining months

**Remarks Entry**

* DDO adds remarks for each budget line if needed

**Save or Submit**

* **Save Draft**

* **Submit for Verification**

* On submission → workflow moves to **DDO Verifier**

**4\. Process Flow Diagram**

**5\. Rule Management/Business Logic**

| Rule ID | Rule Name | Category | Trigger / Event | Input Parameters / Data Fields | Logic / Formula / Condition | Effective From | Owner Department / Editable By | Parameter Name | Data Type | Value Range | Current Values | Source / Master Table | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **RM\_BE\_01** | Proposed RE Minimum Check | Validation | On entering Proposed RE | Proposed RE, Actual Expenditure Till Aug | RE must satisfy RE ≥ Actual Till Aug | FY 2025–26 | Budget Module Admin | Minimum RE Rule | Numeric | ≥ Actuals | Auto | Expenditure API | Ensures RE cannot be lower than actual expenditure |
| **RM\_BE\_02** | Total RE Auto Calculation | Calculation | On RE entry or projection update | Actual Till Aug, System Projection (Sep–Mar) | Total RE \= Actual \+ Projected | FY 2025–26 | Budget Module | Projection Factor | Numeric | System-generated | Dynamic | Projection Engine | Auto-calculated, non-editable |
| **RM\_BE\_03** | BE–MTE Deviation Calculation | Calculation | When BE1/BE2/BE3 is entered | BE1, BE2, BE3, Medium-Term Estimate (MTE) | Deviation \= BE – MTE; Deviation % \= (Deviation/MTE) × 100 | FY 2025–26 | Budget Module | MTE Reference | Numeric | N/A | Auto | MTE Engine | Used by Verifier/Approver for analysis |
| **RM\_BE\_04** | Mandatory Fields Validation | Validation | On Save / Submit | RE, BE1, BE2, BE3, Required Auto Fields | All mandatory numeric fields must be filled | FY 2025–26 | Budget Module Admin | Mandatory Fields | Text | N/A | Configurable | UI Meta Table | No partial submission allowed |
| **RM\_BE\_05** | Past 5-Year Toggle Display Rule | UI Behavior | On Toggle Click | Toggle State: Show/Hide | If toggle ON → Show Table; OFF → Hide | Immediate | UI/UX Admin | Toggle Visibility | Boolean | ON/OFF | Default OFF | UI Configuration Table | Requested by customer to reduce clutter |
| **RM\_BE\_06** | Workflow Role Validation | Workflow | On Modify / Return / Approve | Role, Current Status | Only allowed role can perform an action | FY 2025–26 | Workflow Admin | Workflow Matrix | Text | Valid Roles Only | Creator/Verifier/Approver | Workflow Master | Prevents unauthorized task execution |
| **RM\_BE\_07** | Detail Head Breakup Requirement | Business Rule | On selecting Budget Line Item | Detail Head Code | If DetailHead ∈ “BreakupRequiredMaster” → Show breakup table | FY 2025–26 | Finance Department | Breakup Head List | Text | List of Detail Heads | If Detail Head Code is in the breakup-required list → System must display Item-wise Breakup Form. | Detail Head Master | New requirement added from user feedback |
| **RM\_BE\_08** | Breakup Total Cost Calculation | Calculation | On entering New Qty or Unit Cost | New Qty, Per Unit Cost | Total \= Qty × Unit Cost | FY 2025–26 | Budget Module | Cost Formula | Numeric | ≥0 | Auto | Breakup Entry | Used for justification logic |
| **RM\_BE\_09** | Auto-Save Draft Rule | System Behavior | On Data Entry Pause | Form Data | Auto-save draft every 30 sec | FY 2025–26 | Application Admin | Auto-Save Frequency | Numeric (seconds) | 10–300 | Default 30 sec | UI Config Table | Prevents data loss |
| RM\_BE\_10 | Pension Section Visibility Rule | UI Behavior / Business Rule | On selecting Budget Line Item | Major Head Code | If Major Head \= 2701 → Display Pension Estimation Section (Mandatory). Else → Hide section. | FY 2025–26 | Budget Module Admin | Pension Section Toggle | Boolean | Show / Hide | Auto | HoA Master | Required to capture pensioner data only for pension-related heads |

**6\. Acts, Rules & Circulars Referenced**

* Budget Manual of Madhya Pradesh (2012), Page 149, Point 12

* Madhya Pradesh Financial Code, Volume–I, Page 362 of 378 – Annexure III: Reference Rules & Acts

**7\. Acceptance Criteria**

* System must auto-fetch all budget line items mapped to the DDO after login.

* DDO must enter Revised Estimate (RE) for current year, and RE cannot be less than the actual expenditure already incurred.

* DDO must enter Budget Estimate (BE) for next 3 years.

* System must display deviation (+ / –) between BE and Medium-Term Estimates automatically.

* On submission, the estimation must move to the DDO Verifier.

* If Major Head \= 2701, system must automatically show the Pensioners Estimation Section and make its fields mandatory. If Major Head ≠ 2701, the section must remain hidden.

* The system should show a provision to enter breakup, and the DDO decides whether to enter it.

* DDO must enter item/asset-level breakup for those heads.

* If breakup not required, section should remain hidden.

* All monetary values (RE/BE/MTE, breakup values, salary/pension entries, unit costs) shall be entered in thousands (₹000), and the system must clearly indicate the unit next to each field.

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
| Proposed Expenditure (Remaining Months) | DDO-projected expenditure for remaining FY | Input | Numeric | 15 | Y | ≥ 0 | Used for Total RE calculation |
| Total Revised Estimate (RE) | Total RE for the current year | Display | Numeric | 15 | Y | ≥ 0 | Formula: RE \= Expenditure Till Date \+ Proposed Remaining Expenditure |
| Amount Remaining for Surrender | Unutilized budget to surrender | Display | Numeric | 15 | N | Can be negative | Formula: Surrender \= Total BE – Total RE |
| % RE Over BE (Previous FY) | Percentage difference of RE over Previous Year BE | Display | Numeric | 5 | N | Auto-calculated | Formula: ((RE – PreviousYearBE) / PreviousYearBE) × 100 |
| BE for Next FY (BE1) | Main budget estimate for next FY | Input | Numeric | 15 | Y | ≥ 0 | Entered by DDO/Edited by BCO |
| % BE1 Over Current BE | Variance % from current BE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentBE) / CurrentBE) × 100 |
| % BE1 Over Current RE | Variance % from current RE | Display | Numeric | 10 | N | Auto | Formula: ((BE1 – CurrentRE) / CurrentRE) × 100 |
| BE for Next FY \+1 (BE2) | Budget projection for subsequent year | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| BE for Next FY \+2 (BE3) | Two-year forward budget estimate | Input | Numeric | 15 | Y | ≥ 0 | MTE |
| DDO Remarks | General explanation | Text Area | Text | 2000 | N | None | Optional |
| Supporting Documents | Additional docs | File Upload | PDF/JPG | 10MB | N | None | Optional |

**Fields for Salary(Object Head – 11/12/16/19/31)**

| Field Name | Description | UI Component | Field Type | Length | Mandatory (Y/N) | Validation Rule | Remarks |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **DDO Code** | DDO identifier | Display | Text | 10 | Y | Read-only | Auto-fetched |
| **DDO Name** | DDO name | Display | Text | 100 | Y | Read-only | Auto-fetched |
| **Grade Pay Code** | Grade pay code (e.g., GP2400) | Dropdown / Display | Text | 10 | Y | Must be valid grade pay | Selectable from GradePay master |
| **Employee Count (Grade)** | Number of active employees in this grade (for salary) | Numeric Input | Integer | 6 | Y | ≥ 0 | Fetched from HRMS but editable by DDO/BCO with remark |
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

  ![][image1] ![][image2]

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAloAAADqCAYAAAB6Duu2AAAmFUlEQVR4Xu3d+29Vdb7/8f4J58+QjEkTEid8E6PJF/1BNJmJiUEMOt9MxBwz7ky+NVXGBmYfQSgMTNF6oANU3ErlfivDpQJFoJQpFShWLAVPy7QUyrTcWkrv8z6f9+ez1r6sbmy5rHa3+/lIXq69P2utfeu6vPYuduf09A5IuvzQ8D8CAACAVF33ekf0Jj9PP/10SnKCC1C0AAAARFrabgSHrNCLls4jhBBCCJmqudzcGqw/caEXLQAAgGxF0QIAAAgJRQsAACAkFC0AAICQULQAAABCMmFFq6Oz02as/OX7gjOMpqHgCAAAwMQLv2jdrg+OWFe9aUfVBjm8er5c7RfJnf6qHZv/7uvSZcpTw85PZNbKWjuWO/0tbw2RzSsX2sKVO32GNJipJrqzUc53icx67T27TPFH78nhln6ZZZbZeVFk5+qFZtpt5817zd0PAABAmEIvWtH3Xw8OWXmLPpGoydWYK1BapHKnL7TXdfzXpiCdWDAjvnzu9BfsuL38zMvemJt/Qi8vOOnKWEuZHas5VGHnz7fLtNn7y5vznEh7ucz76DO7DAAAQJhCL1qzvVIUlL5omcs9J6W4qtlcfjlt0dJPr2YtOCq575TbT6s6JF3RapSdP3faolX8ygxpaBeZGSmRP7w4Q/oOzZcm/TVk/JYBAADCEXrRAgAAyFYULQAAgJBQtAAAAEISatFq77hJCCGEEJIVSSfUogUAAJDNKFoAAAAhoWgBAACEhKIFAAAQklCLVsHHhXJ3ODg6dn/9eIud6u0Ub9lnLv1gL//1u+tufOel+PyH1n/WTa9XpI4nySv7wbvUa9Jk76eg7KwsO8SfO8UY3Djitpkt/nYkcrdLtyWnbou33XrLKbu8t91LQ2L7T3b/zu2U65HFe7xLTWbmabv8skOtUnHLX8LtL8B4+6tuzytL7OXkbXvxn6LJi8UVLHHz/WN8Mn+7X/bxCjuNfrwqefYIkZLj9j7X7z8b38e+qdfHsUWOfJq4/4L8z73H9rnkFbhvFlH//M8v45eBxxFq0VpzzpQVsxFH8hdL3Z0O2VtVIbX3zNjCQvlg0w/yTTQqawrNBn//rFTXVtgTy/H96+26i7dUmB0gZi9HNpwWGTYRTUKrzivwTkqeSOE+7/7MjlgUk7zCMolEt0jUjH2zcrHcPb9H1n99xC5bYMbij2NxVIrNzr/eTOVcTNZ8vSe+M9bFzLT/unmMe6SurVdiBW7859/+P7k0d0H8voGgiLcNr9l/3OwP3WZ7XSWRhavkg/xVUrvBO9hf1zcRIhdM2r31lL+dXfC+x8Dellm2IF/HE/vT3r+45ez0ziWpPl4mjbd033MnuMa5f5BLCw7ay8B4iprtXAab7OXEtn3bvDn4XDqPl0jFls/dckWJY32TeXMe3d8qeX9aId806BuJHTZuu3eOtFXb6Qf/vUfyio9I9MPFdp1IgTnGe8tUD7tzUHXp4vg+pux+dCNxfVebWaa2Wr6pvSR3v3OPR9+cXJrz/+PLAI8j9KKl7IZd6wpUJHbWfhJVYHbAyKdaeLQumf9eqJBdS6Jy17xrGfDG/JOU7nzFH+pOllq0jtzRsuTe3RT8xb2rd0XLrafqzO3pbdodPrC+fz3yaYVdJlJQYkuWjeGfCI+XuOkHWviMvVoOgTGw26J9k2Auf1hmt89o2Vm7DQWLlkouWrrddR5y77b101W/aK3RE07S/rTG7hsiWz9208X73f7jtnlg4vjboB6rk7dtPaavMW90VV1gXIuRlqbY+dv2E+DaDYvtGwq73Xv82233ju8RfUOtx37vGK1iDd45aLB6ZNHyjvHq+H1z/tnv7StJ48CTEmrRCvI/+tWdyDfgTf1fqcR/tdLf7c15sF1f77DTgf7BwJyHN5DmV5yRIv/Xiu4dmS/xK0VgbAbuJf26b3D0bXss/P2p2v8ty333Lt8X04/IgAx2tz848rD8Y//Ic8DxLYlfAwat35LYVyJJvy5clu9/ogU8OeNatAAAALIJRQsAACAkoRatzlv+P0sEprah4ZG/e77f2ycDg0OEZEVudKb+37CqvjH1n10AU9mDtvdQixaQzXS/CJ6MCJnKATASRQsICUWLZFsAjETRAkJC0SLZFgAjjXPRcn/LxP8tpk6nLW+SaTnTRMrfkDdyckQuu7+Lpd4oj18EJp10RWvP3Bx5KmeOu35xuZ1eMnl9l5lnpjlz98qyX+XIpcJpI9bVZXJ+tVyeKrw8Yh4hmZCx8M8COW/uCxzz3Zkh+byQ83TifABMVuNatHJ0pwr8TSrd2ezOZHa2aTlviNsN3TK6swGTVbqipUVKy5IWroFdrnBpwdIsu+gVLjPPzo+v54qVFiyN3kbwdgnJhIzFisvuTbQe+4PHfJ9/XnDzgclt3IrWNFuyVOIv9OoOZ/N0js2+N138pRJLApNPsGj5BUnLkn5q5QqUK1H+vJycOTb20y7vEy+NX8aeMu/ytZAFT3CEZEJGk3xc1zKVfMzX32qo5PMCb7YxFYxb0QKyTbBoETLVA2AkihYQEooWybYAGImiBYTkx4tNI05EhEzlBKX7Q77AVPWg7T3UonXlarudR8hUz4P+InBwOUKmavR4H6TfjhBcjpCpGt3e0wm1aAEAAGQzihYAAEBIKFoAgHFX+uVWO1395Q47XetdH2w7LbFv67x5u93CxvZNW+XmsMjdi8dk+6mf4+OxUx3xy2q1dzsq9rVbR6RbVn/tbmtzTVt8vmo4sCnlOvCkUbQAACG6J3f+mSgzfhGqLNtoo7ZfcPNKy6ril0Xq3XL2n365clRXvjHlerJEweqOjxWXbJSGLpGidZuk6czB+Pi1+CUgfBQtAEBoem7esgmyJav1mLk0JDfNfwdNdjcOydrSg3LtuPuUyy9N90zquoakaPMpKTJlrK78QZ9CDck173/8qrnYYdcrXbtPTm419zXQYsdX7zhj1t8qpVtPe+vc96ZAOChaAIBJa/ep5uDQQ6mrrAwOAU8URQsAACAkFC0AAICQULQAAABCQtECAAAISahFq+DjQukcFvnGTPVyfHznJXs9ecyO//cRiRVEU8ZU+3cl8WXj63WeluinW+LLRArK3LzFZbLsUOrfVQEmSsHHK7xp0vbesCW+TafsA0nbdLov9NFl1+8/K39NWi+atP7WxVFZ78+7UBYfv/bhovhlYDzptrq4JLEtJovmL05cGe4Vad2TuD4GdVv8bb9XvqlP7GPB843+P4V6fWuV2atuHEk6lyTOH76Cj2N2qvuR3r4ue+RG4raPfDry/ASMJtSiteacSF7paVmTn7pxtib9V+lyKlK4T+T8yJ2yff8qO931T28ZX7P/vwCLVJtCV11bLRX1rYmy9q9KufTbefFlgIlQbY70kQ3+/0ou8e2zdkOag7a3TUf3J/YPn+4n1aWLzQnK7Q++WIObRv/eKrVmH4h6+5sra/3y85x5ctdfGBhH/rYaKTkueX9aIR98WCjF/+iViqKonVf8J/PmwLxBOLLWLHddj+0dsreqQmrvmXPHwhXy1+O33fqL99g3D+0Vq8xtlNgx3X90P9E3GPYccs6VpJTzTYMrU3uvmzcihVHvPpxIvlt+oOu23L3j/ozE+go3/8h3bp6/H+r61o2k8w8wRqEXrWLzriVYtI7c0f+mL1p+qUrmj0U+PZIoWsOt0ur9vRSlJ5XIQrdz7NUdCsgQeZt+SClax0seULSStml/n0hmxwa1SHn7yKA7Ofj7RHF1r0hb4kRQG78ETAx/Wy3Y3SSx81pobttitOy723ZepKDEFSQtQJra9Xb5SOysLTn+fnP/H+vNsq40feB9Eqb7T/VaV7IeWLTuH7cTW5T+uSdt0Uqmt7O1ckf8tkYULW8ceBihFq0H2fV14pOooPUVPwSHxiRSVBG/nFf2aLcBjJeB4ECy/p+CIw/W3xu/WPxh0q9ibiX2B2AyuX/HfYr1pFT8nNhHHtf6LdXBIWBUE1K0AAAAsgFFCwAAICShFq3OW/wTXGSHoeGkfzDoud/bFxwCpqx0x/sfLzbJwOAQIVkR3d7TCbVoAdmM/QLZLngiImSqJx2KFhAS9gtku+BJiJCpnnQoWkBI2C+Q7YInIUKmetIZ36J12f2VbJ/+NnPa8iaZljNNpPwNeSMnJ2WZN8oTywKTTbr9YsXTOXaak/NGfFvX/UC3df0LPzlv7rPLNC2fllgJmKSCJyE/r5tj/VOFl2Xg4nJ7/ZI3vsckZ+5eWfarHLlUOE32zM0ZsS4hmZx0JqBo7Uv5ehE9seQ8vcLOm6YnH3u6cUtoCQMmq3T7hV+0rHLd3t0Wr1lx2Stcb+bYAJNd8CSUHFu0ds2xl7Vg6XTZRVPCdg3ZgqXRshVcj5BMTjqjFa1Vq1bJu++++/hFy//USvn1SU8sNubko0k+wfgnH2CyCu4X+sbBfmrr7QduT3B7g77hsFPzZiP+aVfgE2BgsgmehJJji9agn8R4Ts4cG/2066kcihaZXElntKK1YcMGm8cuWkC2Yb9AtguehAiZ6kmHogWEhP0C2S54EiJkqicdihYQkvpG/o0hsltv/8CIExEhUzW6vacTatG6crXdziNkqudBpSq4HCFTNXq8D9JvRwguR8hUzYO+DSTUogUAAJDNKFoAAAAhCbVoFZVslNVfbrXxHbh8XYr3/WQvl1Y2SnHpQZGWSrnb2Rhf5uQdN22q3Cqla3e4Kz1n5O6dFtEP5op3nZHKdrPc1h2yurJZftznLWMcaIlfBCacv/2v/nK3N9ItLWf8P1wyJC13btltuWbHRrcvBCTvL7qMXTdpX9hcP2Snpcfb4uuk//AaGH+lJfuk5fIpuRacYTT8T0fiyoWDMvivxDkgKGU7H05aTw03mv3hVvxqQ+ctidV0yO4vtkpR2SlpqNgkq3eckWtV/j4IjK9Qi5bvXvzfh7mTQV35xvg83cG2lySKUrKisiqR9ip7ubLMrbP9gtidtlTnWd3e1EmMA5nn2vGkbf2CK1a6zRaV18ev+/uJz99f7DKSui/IQLdcO5a6/9hxIAOUlrhtWo/l37aK3Dy1206LDzTa7b6vv1/undlrt33dN779yr0pv5t8IyrNdq7ib+KHE/uMvsG/Nmzuo3SHFJmC5aT/v8GA8RBq0dJ3GZqydYliVdc1JEWbT0lLjzkh1N+R0rW7pa9O3+EnCpP/qdT3uzbK9tJNcq+tTqT1mOjOctP8t/RYi+xudDvOgZYhKTU7097Lbp2i3XXuApAB/H2gaNMpb8Rs3Nf1zYBu7/dl0PxXt+Vvv9pk9wWf/6mUv7/8eKbOLmPXTdoX/BNI8j/F//Z60hVgAtmi1d8hP/a6T6Oaju2Vk1tdOdKitfZYm9Tt3hQvWnrMD755dpK2805/X/J1yz1vKuI+2Sr+6pjJYVO2DtvrZWe7ZfuXlRKrSXzyBYyXUIsWgHHW3xwcAQBMIIoWAABASChaAAAAIaFoAQAAhISiBQAAEJJQi1bBxzFvusWk0Oaber3upurIp1Gp2+LmHbmRWLezdocs3lBh5wMAAExGoRat9RX7RP65RyL5rnBFNpy2071J//t5ZMkeN1boClXthkSxqt6wWOSG/8cdAQAAJpdQi9aacyIFH8Z+sWgV5H/uxgJF626//tcsf86tCwAAMNmEWrQAAACyGUULAAAgJBQtAACAkIRatG503paBwSFCCCGEkCmd+sbkb51NCLVoBR8EIYQQQshUTToULUIIIYSQJ5B0KFqEEEIIIU8g6Yxv0bq4POX6JZOnCi/LUznTZGDXHHk9Jydlmdd3jXwShBBCCCGZmHQmpGgt+1VOfCxn7l7J+dVyO++pnDlmbK/JZTtPS9iI2yCEEEIIycCkM25Fy//USi9rudLpsoteTPHS7JnrovP2eAk+CUIIIYSQTEw641a0CCGEEEKmctKhaBFCCCGEPIGkQ9EihBBCCHnM9PYPBGuQFWrRunK13c4jhBBCCJnKud/bF6xBVqhFCwAAIJuFWrSWba+WSLRM5Po+qa6tlryV+0TunZa9VdXSOuyWieYXyvH961NX/AW1wQEAAIAMFWrRWnNO5H51iS1aqmlnoaz/MGovR/7ixqL5UcnTsTtHpODjQmn31o3ub5U1Zl7xykKJ5Mds7Hr++n9a7C0JAACQmUItWhFTlKpvDNqipZcvdCXGfdH8VXZafS8w7hUtLVbJRUs/0Yos1OtR6fQ+FQMAAMhEoRYtAACAbEbRAgAACAlFCwAAICQULQAAgMc0NJz+H45TtAAAAEJC0QIAAAjJuBWt0vx889+zKWP5G1Kv/7IbwYGH8DjrAgAAPJpxK1pL97uyk1x5kouWjh+8bv5z/aCLuFqWbwqaHQ+WpXOl8Yu6TH7hQbmxf6kpdEvtVMcSbsTva2nKOAAAQHjGrWhpMfLLjz89WJhvC5gtSlqoCl1hSle0/GXiAkVLb8cvWu523W04rqRp2bK3Y0vX2Xh1y893t5VazgAAAB7P+BUtAACALEPRAgAACAlFCwAAICQULQAAgJBQtAAAAEJC0QIAAAgJRQsAACAkFC0AAICQULQAAABCQtECAAAICUULAAAgJBQtAACAkFC0AAAAQkLRAgAACAlFCwAAICQULQAAgJBQtAAAAB7DO++8ExyKo2gBAAA8Ir9kDQ0PB+Y4oRatK1fb7TxCCCGEkKmc+719wRpkhVq0AAAAshlFCwAAICQULQAAgJBQtAAAAEJC0QIAAAgJRQsAACAkFC0AAICQTFjR6ujslPR/cSJZf3BgpKF+e1uj6agsscuO1Ck1Q2b+7XTzxmbl35uDQ9as35UFhwAAQBaZsKJ11eTEghn2ckP7UTud91GJnZ6IfSYrt9WbSyft9Vhtt0R3NppO5K6faO+Uq34vavHKTPMGO5n/7uvSZYpT3twXJLrupKx8/205f9vcx85P4suu/Og9b+XEY8idUya5019NuY2diz6RNxdsk2JzG8mlcIkZb9j2ib0c3VTvHtvteolVtdmxN195205jc91tAwCA7DRhRWvzoaPy22dcETlsSk1szgyJmgITaxHpuHDSm3dScl/5zC6Tu+BkvCgVXxCZNd0rMX7RMq7G3rK38WszTy+rE4e2mQI1wxUqb9nclxJFS+/XjtmitTDlNuYn3Y7e/2xzXW+rY+d7kvv8CmmSRlsYdd4883ibuvrtOrq+3pYcWxi/HwAAkH1CLVp9Fyps6dCc70qdl2fGfjvDlZwTumzVJ9JUVSLnzeXZq2q9InVSukxZsWVm+nPyh9+7T5xyn39bcp/xypIpT67YmOV7TkpxVbO5/LL0HZgvh//RLDVtnYGiZcrQoWaZt9P7deO5Fe42bdF6K+U2gkUrma5u79Obp5dnm7J1deNb0tDWJrmRctn/Pp9oAQCQzUItWmHRT70mg9wXXYkDAADZaVIWLQAAgMmAogUAABCSUItWe8dNQgghhJCsSDqhFi0AAIBsRtECAAAICUULAAAgJBQtAACAkIRatA5fGP07CJP5f6Vd1Rw6mpgBAAAwCYVatPy/mC5D+pfWXYmaveAzyX3J5JnXzbj7q+3+H43Pfac8vu6zy+tlc7vI/JdmSO6M1GX/YMZquvy/zN5tp01D8VUBAAAyQvhFK+k7AmfH2mz0q23cp1epJemEX5bat8nMV14V/ZLn4nfNdIZ+9U5iWZ3q1+XEvwJnuiteAAAAmST0oqVfzux/otVnxlKKljce7EhazFRD8auS95vnJPf5t1KW1bHNP/dL7PfPSQefaAEAgAwVatECAADIZhQtAACAkFC0AAAAQkLRAgAACEmoRetfN28HhwAAAKacy82twSEr1KIFAACQDf79738HhyyKFgAAQEjGrWgF1yGEEEIImewZDUWLEEIIIeQRMxqKFiGEEELII2Y0FC1CCCGEkEfMaCamaJ3+0k7/XN5sps1yxRuP5BfLN4ui3viALF1ZLJ/nR+3lgyc2uWWWFnvLfmlSNOKxTIZEzHNqPVAcfx16elulpntA7vQMSOk5c/3y3qR5p7y45+y/XvrcI/mL7XjexnMSMa/VyVL3WpHMTGTlATu9Uu5tt97POJJfaKdnzc/fbhd2zP0sI4u2Sf4XtSNu60knsnSvnS4t0vu/JEvN/eu+9926qOxc6h5LaYG3L95IPC5/nv9cruxzz6397sj7CDv6mHUfiL++vV3SfrjYHk/856c/g7Nfuf3G7U8D8pFZz9+Xwk6k9JR9XTVLD19PexzzH8uqyut2qq/73z50r/MdO98/NgzI375324quE1nunuNERY/dS+3jdMcrTaTokHx3eyB+HD/Z647tN4+tkbMbE6+5247OSau5nPLzuX1CDha5dT8/7d1Xj388jNrb9/eVTEpwH9esMq9NZNEu9/Pt6ZKe8+6cpj/fyCduv995ZeRtkdT8tGOF5OnP3Hv9/vZf5vh5xW37uh3524u+ztoh3PbozrHtNzpG3N6TyGgyqmjpSSZSciJetHTH0oOgvrC6M6061mUPmH9evSbtAWqyZGTRcgfUby6nFq32n3aJX7S+qz7hLfuAomUO4B8tyrwDDklk9KJ1X2r2pRatRGkIN34R0X1u1afmzY5XBi7fvJ+2aPmPK1i0Wn9y2+lHOy6NuI/xiO4Dya/ZUrOP/Dl/hZzscdf1Z/BdoGglH4PCTmT1UVnlvbZaNtIdx9IVrRpv///ubmrR0p9FvretJI9PVFxRSCpatgSusc/3G7utuGO7nVeaWO5BRcuWEz0H9CYVrWY9Lpr5C9zz/ThDi9aVY+tSipZ7Lcybl+8vSU/LgdSiZfY/PddRtEaP/zqOpWjpNhNZtEL8c2wkXy+PvM3HzWgmpmiRkem+NXJsDLnTPXKMTN7cPDexn0qMljt3u0aMBXPzxqNty+OVy0fdATqTk9iv78fH0n1KqJ+Q+Jf1jVpw/lRN8nPVN+fB+Zke/WTSXU78fMmj5AGvX7rj1COeY8eS0VC0CCGEEEIeMaOhaBFCCCGEPGJGQ9EihBBCCHnEjGbcipYuQwghhBAylTKacStaAAAA2YaiBQAAEBKKFgAAQEgoWgAAYEq5crU9ODRhKFoAAGBKyaReQtECAABTSib1kgkrWnmLPpGZkXJ7uaazU+ZNf1WK350fWCph/vS3gkMP0B8cyDixOTPkzf/7XHD4ga4GB0YxO9YWHIrT+z6xYIbMK64PznpsmyOvymR4/bPNypeek+jvXg4OTyp6fIiaY0ame/alyfM673//ZYm+4x7vzN99Jl1memLBy7LSG1PzYxUSazYXmstkf2xhfHyqyJ3xusx8xj1f//nlvficzHvJHZ83/73Mvi4q8dp0S+zv26RpyJvxAPvffyHlun8cz51TJnnvlsjKV/JEekY7Dp8MDjy0WZFtIi3uXDtl3T4i/+c//iNl6FF6SVgmpmi1lLlpT0V8aPb0hbZMNazWk7UpX+Z8ve7nfvnDnk57PVG0ur2pyOHbZiOaPl/OLx95cPPnPfvRUek6lFkHCC07alZxY9LjcztUg85vNs/3+VdtIVK6g86ebp7jhRK3vtejZq6sl9znF0rfD5+5AY8WrXkbm+XwRy+Y9czO3u925i5zYMid7opW7oKTKevqvPPe+rkvLrQHVpFGkaFu6TOX5h/qlpW/mSFXY/7PodH+Vx9Dnh6ohprjz0udMEen2c+8ag4qG6Rrz/z4z7opvgTGU1dlZu0DDyv3xZfNSdEdGzLb458Yx8v8L8rM8UALhTug6DHBf5OW/OYu+sxb9vis5h9LmjEFbNZ/xuMdAw9vW2Gn6za+bba1tyX5dVH+a+Mfl7Uw/ZK8Q+5N5zxzHNRjsL6mK3/ot+v557vk7eVwj7mPdc2y831z+z9v80YT8+cfMwVv7nOSO7fM259P2mOznkf843PfIfdhxc5OfbzNMnN5rXuces7tOZq4LW/5yc+dUW4PXpefBlPnPHQvCdHEFC1vA276wj9pJ4pW8SuJdwG6EfniRWso9UCm40ueT33n4LO3dyE4OvH8QlJ8UZIen3teZj+T8/2JT56UK1qJMhZrcWsodxBIfU30gKA7tJYi/wAp4srWkueTilZ8XVeafG9uc+XWL3aHTQk7Ie4AEy9a3jyV+3t3UEgULXeA0eXtwckv1mb8Fz5sQ1i6UrePyaimWbep5uBwBpo8r/Vvv2hOua77au77iTe/vlnPLDTHDVdyk489U0GHfiplS0izva7HZD0G+8dL5Rcs/7Xp2Pmeu+4VsPTq5fChozJrdWP8+KjH8Q5xBS21aLnj7/xK9/rqMTbxhjZxH7qu9PfLklq9oI/JzdPH4R+f92tJ89QMuXOoX7T6DrgSptXEX37yM8+mu2xEyVIP30vCM0FFCyP90k4LAADGKpN6CUULAABMKZnUSyhaAABgSsmkXkLRAgAAUwp/sBQAACALULQAAABCQtECAAAICUULAAAgJBQtAACAkFC0AAAAQkLRAgAACAlFCwAyhH7pe0dns8zemPhS0I7O7vhl+911073vqBuKD1sdt913jKrcOZ9JzarEd8nasekL3TLH/O8/9bXZ776Tfnc/we/Aa7hYL7NW1qZZb3J79v1yWTfXPNfOcjl8WyTvQL88a17bvuZy+6XMudNfTrzWxswFR2W2uV6sX8Y81C3Pui8dBEZF0QKADKEn9lkvvSCH2/Xy25Jni1enV7z6Je/5GXaZ3Be19LiCpNftF7r3VMh573Y2L3g7Ma7L6JfIm9vTZfzCNKu4UWqWvBC/HenptuskilazW1fHuvRS25T6Uml9XjPnujKqr1NTvxtrqvrMFi390m3/9dPvotUvY9Yve/bLV679UmhgdBQtAMgQehKPLlooz9pitNCUnhfkRNVRiVb120+pZmrJ0mVe1JN9v/z6tfn2UxgtBEteey5xO8+8LPNemiGHP3C354qWt4wpWvsrG80yr8vMZ/R22mT+tgrJ29kcKFpOkykXHXrBlLSGlDmTm75Gv9bS1F4uby4qs2V2lrm+eeXbcn7I/Sw0HTvfc8vPeN29PotelljsM5mnbQwYA4oWAExyiU9enqwlVYlfR85/5dWkOQDGiqIFAAAQEooWAABASChaAAAAIaFoAQAAhISiBQAAEBKKFgAAwGO619MbHLJCL1o6jxBCCCFkquZyc2uw/sSFXrQAAACyFUULAAAgJBQtAACAkFC0xsndnsRXWWSMge7gCAAAeILGpWit3XdKiredlu1fbhXpqZMff6oTaa/y5nZLzfk6aRgWN25cS1pHFZXXS+nxNin66qCsXbtPjpdvlbryTVJTscPM7ZDvzfo6X+0+9ZNsrrvvrl84KEWbK0WuV5ll3P3tPf+TxHYcFv0S+rKjZ2Tt0RaJley2j6eybKNU7t4k0nLMPJZTdvm68o2ye53ezy173VdU5m5vbfkx87iOyT1zX6Vrd0hDxSb5UR+Xuc8ff3LLNJ0/Jd9fbJPtF8x6X+yT2Beb4o9P77fGPCZ9vvq8N59qlliN/QpXKV23SYpLD7rn+u1uO7b7lHmuVe652tfFPA7/dVldfirpdXGuHU9c/rHtunmdb8kB83pdM88ndrhOtpckbn/z2k3y7bZN5vFWStNt93PwX7eYeXxFu9zP5/vDu+3z/f5Mpb2++fgZO9XHI11uGQAAME5FS9XsMCWmbIf01e2TQR3wi5aWDY+O68ldk8wvWmWnW6Ru90ZbHop2uJO7v75ftFq67seXl/p99nJl2SY7z68AWngq20UaOrtlrSkqWjb08RRXNLrbOLrVW9IVLS1z336VGFN+0dLb1Oe1vWRvfN73lbvNWPLy7rHp/Z68I/Zx+Y/Pfx36/EUHuqX425/txdKvq6SpcqsUbXWF01emj1cSRct/XWwZ9V8XT3LR6utqsfevj1lfY308+tz92y8qc6XUPDC3rve448t796uv+XYtp964zxYtAAAQNz5Fa/h+ytV7AylX5d4dbR+B8cA6VuBXXX3Dbnq3K7Gsf1tB6X5119eV+imVsiVQErft+z79n8dIy7+NdPc5qLerBWuEITfpTzx+LVG++ON5iNcl6EGvjXLreI8hSbrn4LvbP3J5AACQMD5FCwAAIAtRtAAAAEJC0QIAAAgJRQsAACAkFC0AAICQhFq02jtuEkIIIYRkRdIJtWgBAABkM4oWAABASChaAAAAIZlSRavz1t3gEAAAeIKuXG0PDk2o5MezZEuX/Oa/Oics6UypogUAAMKVaef85McTLD7jnXQoWgAAYMwy7ZxP0QIAAFNG2nP+UL90dHbajLeHKVr9g8Mjxp5k0hn3opX34gzzA+kODhsngwOjyp1TFhwCAAAhSnfOz52+UKKLPpFZr71nrjUHZ0usJTiS3okFM+x0/nQ3TXFsoWhXuBoY/sWiVdxjxxcUd8o9M92YphiNWGeMaU2zbjrjXrS0ZM3UshVwNfZWyvVc8yLrD0ZfUP0BJl509yKf0HGKFgAA4yrdOV/P01L1ieQ9r+fqtuBsew63y5hzuJ7fpUXP323x0uSfz/2ipdP4ed8ULLvOoxQtk7+dGfTm3Roxz3e+160rptNoIbPzzw3Z69LRZ6732eX8ea3nMrhorfu5305zF6X/BEtfTPtCmx9CctGKv/jimrEdp2gBADCu0p3zXYnyBYvWSffhiJYtc962pcm7ruy8Ba4T+Od6necXrdmxtqSilShnvtGKluadY4Ny7ObI+f46XzT/207vNffEy5Tyy5QtXJIoWlq+0t1fOuNetAAAwOSVaef8sRQtzbGj4f/ph3QoWgAAYMwy7Zw/1qI1HkmHogUAAMYs0875WV20xvsvtdc3NgWHAADAE3S/t0+GhoeDwxNGH4/v52uDI8rPeOW1JRNQtAAAALIZRQsAACAkFC0AAICQULQAAABC8kSK1t3u+8HbBQAAyGr/unlbunv6RvSmhy5amjtdPXLrTjchhBBCCDH5pU+zHrpoEUIIIYSQsYeiRQghhBASUrRcJYeiRQghhBDyhELRIoQQQggJKfzqkBBCCCEkpFC0CCGEEEJCiparP/7xj/FfHf4vwTpvmfYuqkoAAAAASUVORK5CYII=>