---
name: sony-clock-app
description: >
  A React 18 CDN-based "Go Home Calculator" dashboard for Sony Bangi employees.
  Calculates shift end times and overtime tiers based on clock-in time,
  supports Full Day (9.5h) and 2nd Half Day (4.75h) shift modes,
  Full Day mode displays 1st Half Leave card (+4.75h) and restricts clock-in to AM only,
  2nd Half mode supports AM/PM clock-in (11:45 AM - 02:15 PM),
  early clock-in floor clamping (clocking in before 07:00 AM counts as 07:00 AM; before 11:45 AM in 2nd Half counts as 11:45 AM),
  1-minute precision time picker with explicit AM/PM toggle,
  displays live weather for Sony Bangi (via Open-Meteo), Islamic prayer times for the SGR01 zone (via WaktuSolat API),
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
| **Overtime Table** | Auto-generated table showing clock-out times for 1–4 hours of OT (first OT hour includes a 10-min gap) |
| **Live Weather** | Real-time weather for Sony Bangi from Open-Meteo with local temp & status messages |
| **Prayer Times** | Today's 5 prayer times (Subuh → Isyak) for zone SGR01 + next prayer countdown |
| **Universal Responsive Layout** | 2-column grid dashboard on laptops/desktops & stacked single-column flow on smartphones |
| **State Persistence** | Theme preference, selected shift mode, and last entered clock-in time persisted via `localStorage` |
