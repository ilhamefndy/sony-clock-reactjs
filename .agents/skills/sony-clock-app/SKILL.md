---
name: sony-clock-app
description: >
  A React 18 CDN-based "Go Home Calculator" dashboard for Sony Bangi employees.
  Calculates shift end times and overtime tiers based on clock-in time,
  supports Full Day (9.5h) and 2nd Half Day (4.75h) shift modes,
  Full Day mode displays 1st Half Leave card (+4.75h) and restricts clock-in to AM only,
  2nd Half mode supports AM/PM clock-in (11:45 AM - 02:15 PM),
  early clock-in floor clamping (clocking in before 07:00 AM counts as 07:00 AM; before 11:45 AM in 2nd Half counts as 11:45 AM),
  universal dual-segment numeric time picker with mobile keyboard popup (inputmode="numeric"),
  custom shift date selector modal with keyboard keypad entry,
  displays live weather for Sony Bangi (via Open-Meteo), Islamic prayer times for the SGR01 zone (via WaktuSolat API),
  accurate live IPU (Air Pollutant Index) calculated according to official Malaysian Department of Environment (JAS/DOE) APIMS standards with 5-band spectrum gauge & health advice,
  a live date/time clock, shift progress percentage with live countdown, quick-preset time selectors, persistent
  settings in localStorage, light/dark theme toggling, late-time calculation (after 09:30 AM for Full Day / after 02:15 PM for 2nd Half),
  explicit late-duration capping disclaimer ("Late by Xh Ym from 9:30 AM flex limit. Uncapped shift would end at 8:28 PM, capped at 7:00 PM max"),
  19:00 (7:00 PM) max standard clock-out capping, early clock-in detection (before 07:00 AM),
  and universal responsive design for laptops and smartphones.
---

# Sony Clock — Go Home Calculator

## 1. Project Overview

This is a **single-page React 18 application** designed for Sony Bangi (Malaysia) employees. Its primary purpose is to answer the question: *"When can I go home?"*

### Core Features

| Feature | Description |
|---|---|
| **Explicit Capping & Late Disclaimer** | Displays exact late duration from flex limit: `(Late by 1h 28m from 9:30 AM flex limit. Uncapped shift would end at 8:28 PM, capped at 7:00 PM max)` |
| **2nd Half Day Rules & 7 PM Capping** | Min clock-in **`11:45 AM`**, Max valid clock-in **`02:15 PM`**. Clock-ins after `02:15 PM` are marked **LATE** and capped at **`7:00 PM`** |
| **Early Floor Clamping** | Clocking in before `07:00 AM` still counts as `07:00 AM` (Time OUT = `4:30 PM`, Half Day = `11:45 AM`). Clocking in before `11:45 AM` in 2nd Half counts as `11:45 AM` |
| **Full Day AM Only & 2nd Half AM/PM** | Full Day clock-in is restricted to **AM**; 2nd Half mode keeps both **AM** and **PM** active |
| **Shift Modes** | **Full Day** (9.5h) and **2nd Half Day** (4.75h) tab selector |
| **1-Minute Precision** | Step="60" on time picker allows exact minute clock-in entry & 12-hour AM/PM formatting |
| **Late Clock-In & Capping** | If clock-in is after 09:30 AM (Full Day) or after 02:15 PM (2nd Half), displays exact minutes/hours late. Standard clock-out is **capped at MAX 19:00 (7:00 PM)** |
| **Shift Progress & Countdown** | Real-time progress bar (0–100%) and dynamic time-remaining countdown |
| **Overtime Table & "See More" Modal** | Compact main card showing 4-tier milestones (`1h`, `2h`, `3h`, `4h`) with a "See More" button opening an architecture modal dialog with 3-tier cards, full 30-min table, and copy schedule action |
| **Live Weather** | Real-time weather for Sony Bangi from Open-Meteo with local temp & status messages |
| **Live IPU (Putrajaya)** | Real-time Air Pollutant Index (IPU) from Putrajaya (~10km from Bangi) with 5-band spectrum gauge, health advice, and pollutant breakdown (PM2.5, PM10, O₃, NO₂) |
| **Prayer Times** | Today's 5 prayer times (Subuh → Isyak) for zone SGR01 + next prayer countdown |
| **Multi-Language Selector (i18n)** | Header language dropdown supporting **English (`en`)** as default, **Bahasa Melayu (`ms`)**, **Malaysian Chinese (`zh` / 简体中文)**, and **Japanese (`ja` / 日本語)** with zero mixed-language text across cards, modals, prayer schedules, IPU, and document titles |
| **Universal Mobile Numeric Keypad** | Dual-segment time box (`[ HH ] : [ MM ]`) and Date Selector Modal (`[ DD ] / [ MM ] / [ YYYY ]`) with `inputmode="numeric"` guaranteeing software keypad popup on all mobile browsers |
| **Accurate JAS/DOE APIMS IPU** | Calculated strictly per Malaysian Department of Environment APIMS breakpoints from PM2.5 and PM10, eliminating uncalibrated ozone spikes and US EPA AQI mismatches |
| **Universal Responsive Layout** | 2-column grid dashboard on laptops/desktops & stacked single-column flow on smartphones |
| **State Persistence** | Language preference, theme, shift mode, and last entered clock-in time persisted via `localStorage` |

