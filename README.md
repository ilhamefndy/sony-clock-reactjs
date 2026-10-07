# ⏱️ Sony Bangi — Go Home Calculator

A modern, responsive React 18 web application designed specifically for **Sony Bangi (Malaysia)** employees to calculate shift completion times, half-day leaves, overtime tiers, live weather updates, and Islamic prayer schedules.

---

## 🌟 Features

### 1. 🕒 Shift Calculations & Modes
* **☀️ Full Day Shift (9.5 Hours Base)**: 
  * Flexible morning clock-in window (**07:00 AM – 09:30 AM**).
  * Prominently displays both **1st Half Day Leave (+4.75 hours)** and **Full Day Clock-Out (+9.5 hours)**.
* **🌅 1st Half Leave Shift (4.75 Hours Base)**:
  * Morning shift with clock-in window (**07:00 AM – 09:30 AM**) targeting leave time (**11:45 AM – 02:15 PM**).
* **🌆 2nd Half Day Shift (4.75 Hours Base)**:
  * Afternoon shift window (**11:45 AM – 02:15 PM**).
  * Clock-ins before 11:45 AM are clamped to the 11:45 AM minimum floor.
* **🌅 Early Clock-In Floor Clamping**:
  * Clocking in before `07:00 AM` for Full Day / 1st Half shifts automatically clamps calculation starting from `07:00 AM`.
* **⚠️ Late Clock-In & 7:00 PM Max Capping**:
  * Clock-ins after `09:30 AM` (Full Day / 1st Half) or `02:15 PM` (2nd Half) display exact late duration and strictly cap standard clock-out at **19:00 (7:00 PM) MAX** (with midnight wrap protection).

---

### 2. ⚡ Smart Time Picker & Quick Presets
* **Smart PM Auto-Locking**: Typing afternoon hours (`1:00` to `6:59`) automatically locks to **PM**.
* **Explicit AM / PM Toggle**: Instant toggle button to switch between AM and PM.
* **📍 Now Button**: One-click fill with current local time.
* **Quick Presets**: Dynamic preset buttons for common clock-in times (`07:00 AM`, `07:30 AM`, `08:00 AM`, `08:30 AM`, `09:00 AM`, `09:30 AM` for Full Day / `11:45 AM`, `12:15 PM`, `01:15 PM`, etc., for 2nd Half).

---

### 3. 📊 Shift Progress & OT Breakdown
* **Live Progress & Countdown**: Real-time progress bar (0–100%) and dynamic countdown showing hours, minutes, and seconds remaining until clock-out.
* **📋 Official 3-Column Schedule & Lookup Matrix**: Interactive table matching official company schedule lookup tables with active row highlighting and mode-aware 5-minute step intervals.
* **📊 Overtime Breakdown & "See More" Modal**: Compact main dashboard preview showing quick 4-tier milestones (`1h`, `2h`, `3h`, `4h`) paired with a **"See More"** button that opens a comprehensive documentation modal popup with policy explanations, 3-card tier architecture (Early, Standard, Extended OT), full 30-minute interval table, and one-click schedule copying.

---

### 4. 🌤️ Local Bangi Services & Utilities
* **🌤️ Live Weather for Sony Bangi**: Real-time local temperature and weather status via Open-Meteo API.
* **🍃 Live IPU (Air Pollutant Index) in Putrajaya**: Real-time air quality index monitoring for Putrajaya (the closest DOE station to Sony Bangi, ~10km). Displays official Malaysian IPU rating (Baik, Sederhana, Tidak Sihat, Sangat Tidak Sihat, Berbahaya), dynamic 5-band spectrum gauge, contextual health advisories (bilingual BM/EN), dominant pollutant detector, micro-chips for PM2.5, PM10, O₃, NO₂, and direct link to the official Department of Environment (JAS) APIMS portal.
* **🕌 Islamic Prayer Times (Zone SGR01)**: Live today's prayer times (Subuh, Zohor, Asar, Maghrib, Isyak) via WaktuSolat API with live countdown to the next prayer.
* **🌙 Dark / Light Mode**: Seamless dark and light themes with automatic system preference detection and `localStorage` persistence.
* **👤 Portfolio Navigation**: Direct "Portfolio" button in header and footer pointing to [portfolio.ilhameffendy.com](https://portfolio.ilhameffendy.com) (Shift+Click to edit destination URL).
* **🖥️ Auto Device Resolution & Responsive Scaling**: Real-time screen resolution detector and adaptive scaling system (`Mobile`, `Tablet`, `Laptop`, `4K Display`) that automatically optimizes typography, spacing, and layout scaling based on the connected device.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 18 (CDN-based via `@babel/standalone`)
* **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, HSL color system)
* **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
* **APIs**:
  * [Open-Meteo Weather API](https://open-meteo.com/) (Live Bangi Weather)
  * [Open-Meteo Air Quality API](https://open-meteo.com/) (Live Putrajaya PM2.5, PM10, AQI / IPU)
  * [WaktuSolat API](https://waktusolat.app/) (Zone SGR01 Prayer Times)

---

## 📁 Project Structure

```text
Sony Clock reactjs/
├── index.html            # Main HTML entry point
├── manifest.json         # PWA Manifest (Add to Home Screen)
├── README.md             # Project documentation
├── .gitignore            # Git exclusion rules
├── assets/               # Static media & icon assets
│   └── icons/
│       ├── app-icon.png         # Navbar logo image
│       ├── apple-touch-icon.png # iOS home screen icon
│       ├── favicon.png          # Browser tab icon
│       ├── icon-192.png         # PWA 192x192 icon
│       └── icon-512.png         # PWA 512x512 icon
└── src/                  # Application source code
    ├── css/
    │   └── style.css     # Design system & responsive styles
    └── js/
        └── app.js        # React 18 application logic
```

---

## 🚀 Getting Started

Since this is a lightweight React CDN single-page application, no build process or package installation (`npm install`) is required!

### Run Locally:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/sony-clock-reactjs.git
   ```
2. Open `index.html` in any modern web browser or run with Live Server.

---

## 📄 License

Created for Sony Bangi employees. Open source for personal use.
