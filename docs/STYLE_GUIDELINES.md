# Style Guidelines - BEL Application

## Typography

### Font Family
- **Primary Font**: `Noto Sans` (with Hindi/Devanagari support)
- **Monospace**: System default for all numerical/code displays

### Font Weights
| Usage | Weight |
|-------|--------|
| Headings | Bold (700) |
| Labels | Semibold (600) |
| Body Text | Medium (500) |
| Regular | Normal (400) |

---

## Color Palette

### Primary Colors (Brand - Blue)
| Name | Hex Code | Usage |
|------|----------|-------|
| Primary | `#2563EB` | Buttons, links, primary actions |
| Primary Dark | `#1D4ED8` | Hover states |
| Primary Light | `#EFF6FF` | Input backgrounds, highlights |
| Primary 100 | `#DBEAFE` | Badges, light backgrounds |
| Primary 200 | `#BFDBFE` | Borders, timeline |
| Primary 300 | `#93C5FD` | Input borders |
| Primary 400 | `#60A5FA` | - |
| Primary 500 | `#3B82F6` | Alternate primary |
| Primary 800 | `#1E40AF` | Strong labels |
| Primary 900 | `#1E3A8A` | Headings |

### Neutral Colors (Slate)
| Name | Hex Code | Usage |
|------|----------|-------|
| Slate 50 | `#F8FAFC` | Page backgrounds, hover states |
| Slate 100 | `#F1F5F9` | Table headers, secondary backgrounds |
| Slate 200 | `#E2E8F0` | Borders, dividers |
| Slate 300 | `#CBD5E1` | Disabled borders |
| Slate 400 | `#94A3B8` | Icons, placeholders |
| Slate 500 | `#64748B` | Secondary text |
| Slate 600 | `#475569` | Body text |
| Slate 700 | `#334155` | Strong secondary text |
| Slate 800 | `#1E293B` | Data values |
| Slate 900 | `#0F172A` | Headings, primary text |

### Success Colors (Emerald/Green)
| Name | Hex Code | Usage |
|------|----------|-------|
| Emerald 50 | `#ECFDF5` | Success alerts background |
| Emerald 100 | `#D1FAE5` | Success badges, stat cards |
| Emerald 200 | `#A7F3D0` | Success borders |
| Emerald 600 | `#059669` | Success buttons, icons |
| Emerald 700 | `#047857` | Success hover, strong text |
| Emerald 800 | `#065F46` | Success alert text |
| Green 600 | `#16A34A` | Alternative success icons |

### Warning Colors (Amber)
| Name | Hex Code | Usage |
|------|----------|-------|
| Amber 50 | `#FFFBEB` | Warning alerts background |
| Amber 100 | `#FEF3C7` | Warning badges, stat cards |
| Amber 200 | `#FDE68A` | Warning borders |
| Amber 400 | `#FBBF24` | Warning left border |
| Amber 600 | `#D97706` | Warning icons, text |
| Amber 800 | `#92400E` | Warning alert text |

### Danger/Return Colors (Orange)
| Name | Hex Code | Usage |
|------|----------|-------|
| Orange 50 | `#FFF7ED` | Return action hover |
| Orange 100 | `#FFEDD5` | Return badges, stat cards |
| Orange 200 | `#FED7AA` | - |
| Orange 300 | `#FDBA74` | Return button borders |
| Orange 600 | `#EA580C` | Return icons, text |
| Orange 700 | `#C2410C` | Return badge text |

### Error Colors (Red)
| Name | Hex Code | Usage |
|------|----------|-------|
| Red 50 | `#FEF2F2` | Error alerts background |
| Red 100 | `#FEE2E2` | Error badges |
| Red 300 | `#FCA5A5` | Error input borders |
| Red 500 | `#EF4444` | Error left border, icons |
| Red 600 | `#DC2626` | Error text, icons |
| Red 700 | `#B91C1C` | Error alert text |
| Red 900 | `#7F1D1D` | Strong error text |

### Accent Colors (Indigo/Purple)
| Name | Hex Code | Usage |
|------|----------|-------|
| Indigo 50 | `#EEF2FF` | Asset badges |
| Indigo 100 | `#E0E7FF` | Asset count badges |
| Indigo 200 | `#C7D2FE` | Asset button borders |
| Indigo 500 | `#6366F1` | Asset focus rings |
| Indigo 600 | `#4F46E5` | Asset buttons, headers |
| Indigo 700 | `#4338CA` | Asset hover |
| Purple 100 | `#F3E8FF` | Verification badges |
| Purple 600 | `#9333EA` | Verification icons |

---

## Status Colors Summary

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Draft | `#FEF3C7` | `#D97706` | `#FDE68A` |
| Submitted | `#DBEAFE` | `#2563EB` | `#BFDBFE` |
| Under Verification | `#F3E8FF` | `#9333EA` | `#E9D5FF` |
| Verified | `#D1FAE5` | `#059669` | `#A7F3D0` |
| Returned | `#FFEDD5` | `#EA580C` | `#FED7AA` |
| Approved | `#D1FAE5` | `#047857` | `#6EE7B7` |

---

## Button Colors

| Variant | Background | Text | Hover BG |
|---------|------------|------|----------|
| Primary | `#2563EB` | `#FFFFFF` | `#1D4ED8` |
| Success | `#059669` | `#FFFFFF` | `#047857` |
| Outline | `transparent` | `#475569` | `#F8FAFC` |
| Danger Outline | `transparent` | `#EA580C` | `#FFF7ED` |

---

## Input Field Colors

| State | Background | Border | Focus Border |
|-------|------------|--------|--------------|
| Default | `#FFFFFF` | `#E2E8F0` | `#3B82F6` |
| Editable | `#EFF6FF` | `#93C5FD` | `#2563EB` |
| Disabled | `#F1F5F9` | `#E2E8F0` | - |
| Error | `#FEF2F2` | `#FCA5A5` | `#EF4444` |

---

## Dashboard Stat Card Icons

| Metric | Icon BG | Icon Color |
|--------|---------|------------|
| Pending | `#FEF3C7` | `#D97706` |
| Completed | `#D1FAE5` | `#059669` |
| Returned | `#FFEDD5` | `#EA580C` |
| Total | `#DBEAFE` | `#2563EB` |

---

## CSS Theme Variables

| Variable | Hex Equivalent |
|----------|----------------|
| Primary | `#2563EB` |
| Primary Dark | `#1D4ED8` |
| Primary Light | `#EFF6FF` |
| Success | `#16A34A` |
| Warning | `#F97316` |
| Error | `#DC2626` |
| Info | `#0891B2` |
| Background | `#F8FAFC` |
| Foreground | `#0F172A` |
| Border | `#E2E8F0` |
| Radius | `8px` |

---

## Quick Reference

| Color Family | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|--------------|----|----|----|----|----|----|----|----|----|----|
| Slate | `#F8FAFC` | `#F1F5F9` | `#E2E8F0` | `#CBD5E1` | `#94A3B8` | `#64748B` | `#475569` | `#334155` | `#1E293B` | `#0F172A` |
| Blue | `#EFF6FF` | `#DBEAFE` | `#BFDBFE` | `#93C5FD` | `#60A5FA` | `#3B82F6` | `#2563EB` | `#1D4ED8` | `#1E40AF` | `#1E3A8A` |
| Emerald | `#ECFDF5` | `#D1FAE5` | `#A7F3D0` | `#6EE7B7` | `#34D399` | `#10B981` | `#059669` | `#047857` | `#065F46` | `#064E3B` |
| Amber | `#FFFBEB` | `#FEF3C7` | `#FDE68A` | `#FCD34D` | `#FBBF24` | `#F59E0B` | `#D97706` | `#B45309` | `#92400E` | `#78350F` |
| Orange | `#FFF7ED` | `#FFEDD5` | `#FED7AA` | `#FDBA74` | `#FB923C` | `#F97316` | `#EA580C` | `#C2410C` | `#9A3412` | `#7C2D12` |
| Red | `#FEF2F2` | `#FEE2E2` | `#FECACA` | `#FCA5A5` | `#F87171` | `#EF4444` | `#DC2626` | `#B91C1C` | `#991B1B` | `#7F1D1D` |
| Indigo | `#EEF2FF` | `#E0E7FF` | `#C7D2FE` | `#A5B4FC` | `#818CF8` | `#6366F1` | `#4F46E5` | `#4338CA` | `#3730A3` | `#312E81` |
