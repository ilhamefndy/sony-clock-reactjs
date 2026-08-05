const { useState, useEffect, useMemo } = React;

function App() {
    // --- STATE MANAGEMENT ---
    const [shiftMode, setShiftMode] = useState(() => {
        const saved = localStorage.getItem('sony_shift_mode');
        if (saved === 'half2') return saved;
        return 'full'; // 'full', 'half2'
    });

    const [timeIn, setTimeIn] = useState(() => {
        const savedMode = localStorage.getItem('sony_shift_mode');
        const savedTime = localStorage.getItem('sony_time_in');
        if (savedTime) return savedTime;
        return savedMode === 'half2' ? "11:45" : "08:30";
    });

    // Persistent theme preference
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('sony_theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    
    // Portfolio URL State with persistent localStorage
    const [portfolioUrl, setPortfolioUrl] = useState(() => {
        const saved = localStorage.getItem('sony_portfolio_url');
        if (saved) return saved;
        return 'https://portfolio.ilhameffendy.com';
    });

    const handleEditPortfolioUrl = (e) => {
        if (e.shiftKey || e.altKey) {
            e.preventDefault();
            const newUrl = prompt("Enter your Portfolio URL:", portfolioUrl);
            if (newUrl !== null && newUrl.trim() !== '') {
                const formatted = newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`;
                setPortfolioUrl(formatted);
                localStorage.setItem('sony_portfolio_url', formatted);
            }
        }
    };
    
    // Live Date & Time State
    const [currentDate, setCurrentDate] = useState(new Date());

    // Auto Resolution & Device Detection State
    const [screenRes, setScreenRes] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
        dpr: typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1,
        deviceType: 'Desktop'
    }));

    // Auto Resolution Adjustment & Responsive Viewport Calculator
    useEffect(() => {
        const updateResolution = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = parseFloat((window.devicePixelRatio || 1).toFixed(2));

            let deviceType = 'Desktop';
            if (w <= 480) deviceType = 'Mobile';
            else if (w <= 859) deviceType = 'Tablet';
            else if (w <= 1440) deviceType = 'Laptop';
            else deviceType = '4K Display';

            setScreenRes({ width: w, height: h, dpr, deviceType });

            const doc = document.documentElement;
            doc.style.setProperty('--window-width', `${w}px`);
            doc.style.setProperty('--window-height', `${h}px`);
            doc.style.setProperty('--vh', `${h * 0.01}px`);

            if (w >= 1920) {
                doc.style.setProperty('--auto-scale', `${Math.min(1.25, Math.max(1, w / 1920))}`);
            } else if (w <= 360) {
                doc.style.setProperty('--auto-scale', '0.92');
            } else {
                doc.style.setProperty('--auto-scale', '1');
            }
        };

        updateResolution();
        window.addEventListener('resize', updateResolution);
        window.addEventListener('orientationchange', updateResolution);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateResolution);
        }

        return () => {
            window.removeEventListener('resize', updateResolution);
            window.removeEventListener('orientationchange', updateResolution);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateResolution);
            }
        };
    }, []);

    // Weather States
    const [weatherData, setWeatherData] = useState(null);

    // Prayer Time States
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [timeToNextPrayer, setTimeToNextPrayer] = useState("");

    // Dynamic Presets based on Shift Mode
    const PRESETS = useMemo(() => {
        if (shiftMode === 'half2') {
            return [
                { label: "11:45 AM", value: "11:45" },
                { label: "12:15 PM", value: "12:15" },
                { label: "1:15 PM", value: "13:15" },
                { label: "1:45 PM", value: "13:45" },
                { label: "2:15 PM", value: "14:15" },
            ];
        }
        return [
            { label: "07:00 AM", value: "07:00" },
            { label: "07:30 AM", value: "07:30" },
            { label: "08:00 AM", value: "08:00" },
            { label: "08:30 AM", value: "08:30" },
            { label: "09:00 AM", value: "09:00" },
            { label: "09:30 AM", value: "09:30" },
        ];
    }, [shiftMode]);

    // --- SETUP & INIT ---
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('sony_theme', theme);
    }, [theme]);

    useEffect(() => {
        fetchWeather();
        fetchPrayerTimes();

        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleModeChange = (mode) => {
        setShiftMode(mode);
        localStorage.setItem('sony_shift_mode', mode);
        
        if (mode === 'half2' && timeIn < "11:45") {
            handleTimeInChange("11:45");
        } else if (mode === 'full') {
            let [h, m] = timeIn.split(':').map(Number);
            if (h >= 12) {
                h = h % 12;
                const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                setTimeIn(formatted < "07:00" ? "08:30" : formatted);
            } else if (timeIn >= "11:45" || timeIn < "07:00") {
                handleTimeInChange("08:30");
            }
        }
    };

    // Smart Time In Change with AM locking for Full Day & PM auto-detection for 2nd Half
    const handleTimeInChange = (newTime) => {
        if (!newTime) return;
        let [h, m] = newTime.split(':').map(Number);
        
        if (shiftMode === 'full') {
            // Full Day is strictly AM: If hour >= 12, convert to AM
            if (h >= 12) {
                h = h % 12;
            }
        } else if (shiftMode === 'half2') {
            // Smart PM auto-locking: If user inputs 1..6 (e.g. 02:15), convert to PM (14:15)
            if (h >= 1 && h <= 6) {
                h = h + 12;
            }
        }

        const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        setTimeIn(formatted);
        localStorage.setItem('sony_time_in', formatted);
    };

    // Toggle explicit AM/PM
    const setPeriod = (targetPeriod) => {
        if (!timeIn) return;
        if (shiftMode === 'full') return; // Full Day is strictly AM
        let [h, m] = timeIn.split(':').map(Number);
        
        if (targetPeriod === 'PM' && h < 12) {
            h = h + 12;
        } else if (targetPeriod === 'AM' && h >= 12) {
            h = h - 12;
        }

        const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        setTimeIn(formatted);
        localStorage.setItem('sony_time_in', formatted);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // --- HELPER: FORMAT 24h TIME TO 12h AM/PM ---
    const format12h = (time24) => {
        if (!time24) return "";
        const [hStr, mStr] = time24.split(':');
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        const mFormatted = m < 10 ? '0' + m : m;
        return `${h}:${mFormatted} ${ampm}`;
    };

    // --- TIME MATH HELPER ---
    const addTime = (baseTime, hoursToAdd, minutesToAdd) => {
        if (!baseTime) return "";
        const [h, m] = baseTime.split(':').map(Number);
        const date = new Date();
        date.setHours(h, m, 0, 0);
        date.setHours(date.getHours() + hoursToAdd);
        date.setMinutes(date.getMinutes() + minutesToAdd);
        const newH = String(date.getHours()).padStart(2, '0');
        const newM = String(date.getMinutes()).padStart(2, '0');
        return `${newH}:${newM}`;
    };

    // --- DATE & TIME FORMATTERS ---
    const formattedDate = useMemo(() => {
        return currentDate.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
        });
    }, [currentDate]);

    const formattedTime = useMemo(() => {
        return currentDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }, [currentDate]);

    // --- WEATHER LOGIC ---
    const fetchWeather = async () => {
        try {
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=2.937019&longitude=101.760007&current_weather=true"
            );
            const data = await response.json();
            setWeatherData(data.current_weather);
        } catch (error) {
            console.error("Failed to fetch weather", error);
        }
    };

    const getWeatherMessage = (code) => {
        if (code === undefined) return { icon: "🌤️", title: "Checking Sony Bangi...", msg: "Fetching local weather update..." };
        if (code >= 95) return { icon: "⛈️", title: "Thunderstorm at Sony", msg: "Heavy storms in Bangi! Stay inside. ⚡" };
        else if (code >= 51) return { icon: "☔", title: "Rainy at Sony", msg: "Don't forget your umbrella! Sky is drizzling. 🌧️" };
        else return { icon: "☀️", title: "Sunny at Sony Bangi", msg: "Clear skies! Have a productive workday. ✨" };
    };

    // --- PRAYER TIME LOGIC ---
    const fetchPrayerTimes = async () => {
        try {
            const res = await fetch("https://api.waktusolat.app/v2/solat/SGR01");
            const data = await res.json();
            const today = new Date();
            const day = today.getDate();
            const todayPrayers = data.prayers[day - 1]; 

            if (todayPrayers) {
                const list = [
                    { name: 'Subuh', time: format12h(new Date(todayPrayers.fajr * 1000).toTimeString().slice(0, 5)), raw: todayPrayers.fajr },
                    { name: 'Zohor', time: format12h(new Date(todayPrayers.dhuhr * 1000).toTimeString().slice(0, 5)), raw: todayPrayers.dhuhr },
                    { name: 'Asar', time: format12h(new Date(todayPrayers.asr * 1000).toTimeString().slice(0, 5)), raw: todayPrayers.asr },
                    { name: 'Maghrib', time: format12h(new Date(todayPrayers.maghrib * 1000).toTimeString().slice(0, 5)), raw: todayPrayers.maghrib },
                    { name: 'Isyak', time: format12h(new Date(todayPrayers.isha * 1000).toTimeString().slice(0, 5)), raw: todayPrayers.isha }
                ];
                setPrayerTimes(list);
            }
        } catch (error) {
            console.error("Failed to fetch prayer times", error);
        }
    };

    useEffect(() => {
        if (!prayerTimes.length) return;
        const now = Math.floor(currentDate.getTime() / 1000);
        const next = prayerTimes.find(p => p.raw > now);
        
        if (next) {
            setNextPrayer(next.name);
            const diffSeconds = next.raw - now;
            const hours = Math.floor(diffSeconds / 3600);
            const mins = Math.floor((diffSeconds % 3600) / 60);
            const secs = diffSeconds % 60;
            if (hours > 0) {
                setTimeToNextPrayer(`${hours}h ${mins}m`);
            } else {
                setTimeToNextPrayer(`${mins}m ${secs}s`);
            }
        } else {
            setNextPrayer(null);
            setTimeToNextPrayer("");
        }
    }, [currentDate, prayerTimes]);

    // --- DYNAMIC CALCULATIONS WITH EARLY FLOOR CLAMPING & 7PM CAPPING ---
    const calcResults = useMemo(() => {
        if (!timeIn) return null;

        const [h, m] = timeIn.split(':').map(Number);
        const inMins = h * 60 + m;

        let calcTimeIn = timeIn;
        let isClampedEarly = false;
        let clampFloorText = '';

        // Clamping Rule 1: Full Day clock-in < 07:00 AM -> Clamped to 07:00 AM
        if (shiftMode === 'full' && inMins < (7 * 60)) {
            calcTimeIn = "07:00";
            isClampedEarly = true;
            clampFloorText = "07:00 AM";
        }
        // Clamping Rule 2: 2nd Half clock-in < 11:45 AM -> Clamped to 11:45 AM
        else if (shiftMode === 'half2' && inMins < (11 * 60 + 45)) {
            calcTimeIn = "11:45";
            isClampedEarly = true;
            clampFloorText = "11:45 AM";
        }

        // Half Day (+4h 45m = 285 mins) calculated from calcTimeIn
        const halfDayExitRaw24 = addTime(calcTimeIn, 4, 45);
        const [hHalf, mHalf] = halfDayExitRaw24.split(':').map(Number);
        const uncappedHalfMins = hHalf * 60 + mHalf;

        const [calcH, calcM] = calcTimeIn.split(':').map(Number);
        const calcInMins = calcH * 60 + calcM;

        const max7pmMins = 19 * 60; // 19:00 / 7:00 PM
        let halfDayExit24 = halfDayExitRaw24;
        let isHalfCapped = false;

        // Cap half day exit at 7:00 PM max (also detect midnight wrap)
        if (uncappedHalfMins > max7pmMins || uncappedHalfMins < calcInMins) {
            halfDayExit24 = "19:00";
            isHalfCapped = true;
        }
        const halfDayExit12 = format12h(halfDayExit24);

        // Full Day (+9h 30m = 570 mins) calculated from calcTimeIn
        const fullDayExitRaw24 = addTime(calcTimeIn, 9, 30);
        const [outH, outM] = fullDayExitRaw24.split(':').map(Number);
        const uncappedOutMins = outH * 60 + outM;

        let fullDayExit24 = fullDayExitRaw24;
        let isCapped = false;

        // Always cap full day exit at 7:00 PM max (also detect midnight wrap)
        if (uncappedOutMins > max7pmMins || uncappedOutMins < calcInMins) {
            fullDayExit24 = "19:00";
            if (shiftMode === 'full') isCapped = true;
        }
        if (shiftMode === 'half2' && isHalfCapped) {
            isCapped = true;
        }
        const fullDayExit12 = format12h(fullDayExit24);

        // Flex & Validation Status
        let type = 'valid';
        let minsDiff = 0;
        let lateText = '';
        let earlyText = '';
        let flexLimitText = '09:30 AM';

        if (isClampedEarly) {
            type = 'clamped_early';
        } else if (shiftMode === 'full') {
            const flexStartMins = 7 * 60;     // 07:00 AM
            const flexEndMins = 9 * 60 + 30;   // 09:30 AM
            flexLimitText = '09:30 AM';

            if (inMins < flexStartMins) {
                type = 'early';
                minsDiff = flexStartMins - inMins;
                const diffH = Math.floor(minsDiff / 60);
                const diffM = minsDiff % 60;
                earlyText = diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`;
            } else if (inMins > flexEndMins) {
                type = 'late';
                minsDiff = inMins - flexEndMins;
                const diffH = Math.floor(minsDiff / 60);
                const diffM = minsDiff % 60;
                lateText = diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`;
            }
        } else if (shiftMode === 'half2') {
            const maxHalf2Mins = 14 * 60 + 15; // 02:15 PM (855 mins)
            flexLimitText = '02:15 PM';

            if (inMins > maxHalf2Mins) {
                type = 'late_half2';
                minsDiff = inMins - maxHalf2Mins;
                const diffH = Math.floor(minsDiff / 60);
                const diffM = minsDiff % 60;
                lateText = diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`;
            }
        }

        // Active target time based on mode
        let activeTarget24 = fullDayExit24;
        if (shiftMode === 'half2') activeTarget24 = halfDayExit24;

        // OT Table (30-min intervals from 1h to 4h, first hour includes 10-min break)
        const ot1h   = addTime(activeTarget24, 1, 10);   // 1h OT (+10m break)
        const ot1h30 = addTime(ot1h, 0, 30);             // 1.5h OT
        const ot2h   = addTime(ot1h, 1, 0);              // 2h OT
        const ot2h30 = addTime(ot2h, 0, 30);             // 2.5h OT
        const ot3h   = addTime(ot2h, 1, 0);              // 3h OT
        const ot3h30 = addTime(ot3h, 0, 30);             // 3.5h OT
        const ot4h   = addTime(ot3h, 1, 0);              // 4h OT

        const otTableRows = [
            { label: "1 Hour OT",     duration: "+1h 10m (incl. break)", time: ot1h,   time12: format12h(ot1h) },
            { label: "1.5 Hours OT",  duration: "+1h 40m",              time: ot1h30, time12: format12h(ot1h30) },
            { label: "2 Hours OT",    duration: "+2h 10m",              time: ot2h,   time12: format12h(ot2h) },
            { label: "2.5 Hours OT",  duration: "+2h 40m",              time: ot2h30, time12: format12h(ot2h30) },
            { label: "3 Hours OT",    duration: "+3h 10m",              time: ot3h,   time12: format12h(ot3h) },
            { label: "3.5 Hours OT",  duration: "+3h 40m",              time: ot3h30, time12: format12h(ot3h30) },
            { label: "4 Hours OT",    duration: "+4h 10m",              time: ot4h,   time12: format12h(ot4h) },
        ];

        return {
            timeIn12: format12h(timeIn),
            calcTimeIn12: format12h(calcTimeIn),
            isClampedEarly,
            clampFloorText,
            flexLimitText,
            halfDayExit24,
            halfDayExit12,
            fullDayExit24,
            fullDayExit12,
            uncappedExit12: format12h(shiftMode === 'half2' ? halfDayExitRaw24 : fullDayExitRaw24),
            activeTarget24,
            activeTarget12: format12h(activeTarget24),
            isCapped,
            type,
            minsDiff,
            lateText,
            earlyText,
            otTableRows
        };
    }, [timeIn, shiftMode]);

    // --- SHIFT PROGRESS & COUNTDOWN ---
    const shiftStats = useMemo(() => {
        if (!timeIn || !calcResults) return { percent: 0, statusText: "Awaiting Input", countdownText: "", isFinished: false };

        const [inH, inM] = timeIn.split(':').map(Number);
        const [outH, outM] = calcResults.activeTarget24.split(':').map(Number);

        const startTime = new Date(currentDate);
        startTime.setHours(inH, inM, 0, 0);

        const endTime = new Date(currentDate);
        endTime.setHours(outH, outM, 0, 0);

        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const now = currentDate.getTime();
        const start = startTime.getTime();
        const end = endTime.getTime();

        if (now < start) {
            const diffSeconds = Math.floor((start - now) / 1000);
            const mins = Math.floor(diffSeconds / 60);
            return {
                percent: 0,
                statusText: "Shift Has Not Started Yet",
                countdownText: `Starts in ${mins} min`,
                isFinished: false
            };
        }

        if (now >= end) {
            return {
                percent: 100,
                statusText: "Shift Completed! 🎉",
                countdownText: "You can clock out now!",
                isFinished: true
            };
        }

        const totalShiftMs = end - start;
        const elapsedMs = now - start;
        const percent = Math.min(100, Math.max(0, (elapsedMs / totalShiftMs) * 100));

        const remainingSecs = Math.floor((end - now) / 1000);
        const remH = Math.floor(remainingSecs / 3600);
        const remM = Math.floor((remainingSecs % 3600) / 60);
        const remS = remainingSecs % 60;

        const countdownStr = remH > 0 
            ? `${remH}h ${remM}m ${remS}s left`
            : `${remM}m ${remS}s left`;

        return {
            percent: Math.round(percent),
            statusText: "Shift In Progress ⏳",
            countdownText: countdownStr,
            isFinished: false
        };
    }, [currentDate, timeIn, calcResults]);

    const weatherInfo = getWeatherMessage(weatherData?.weathercode);
    const isPM = parseInt(timeIn.split(':')[0], 10) >= 12;

    return (
        <div className="app-viewport">
            <header className="app-header">
                <div className="header-brand">
                    <img src="assets/icons/app-icon.png" alt="Sony Clock Icon" className="app-header-logo" />
                    <span className="logo-badge">DS4</span>
                    <div>
                        <h1>Sony Bangi — Go Home Calculator</h1>
                        <p className="subhead">Flexible Shift & Overtime Management System</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="clock-badge">
                        <span className="live-date">{formattedDate}</span>
                        <span className="live-time">{formattedTime}</span>
                    </div>
                    <a 
                        href={portfolioUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn" 
                        title="Back to Portfolio (Shift+Click to edit URL)"
                        onClick={handleEditPortfolioUrl}
                    >
                        <i className="fa-solid fa-user portfolio-btn-icon"></i>
                        <span className="portfolio-btn-text">Portfolio</span>
                    </a>
                    <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark/Light Mode">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </header>

            <main className="dashboard-grid">
                {/* --- LEFT PANEL: CONTROL & FORMAT SUMMARY --- */}
                <section className="dash-card primary-card">
                    {/* Shift Mode Selector */}
                    <div className="mode-selector">
                        <button 
                            className={`mode-btn ${shiftMode === 'full' ? 'active' : ''}`}
                            onClick={() => handleModeChange('full')}
                        >
                            ☀️ Full Day (9.5h)
                        </button>
                        <button 
                            className={`mode-btn ${shiftMode === 'half2' ? 'active' : ''}`}
                            onClick={() => handleModeChange('half2')}
                        >
                            🌆 2nd Half (4.75h)
                        </button>
                    </div>

                    <div className="card-header">
                        <h2>⏱️ Shift Clock-In</h2>
                        {calcResults?.isClampedEarly && (
                            <span className="status-pill pill-info">
                                🌅 Early Floor ({calcResults.clampFloorText})
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'early' && (
                            <span className="status-pill pill-info">
                                🌅 Early by {calcResults.earlyText}
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'late' && (
                            <span className="status-pill pill-error">
                                ⚠️ Late by {calcResults.lateText}
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'valid' && (
                            <span className="status-pill pill-success">
                                ✓ DS4 Valid Flex
                            </span>
                        )}
                        {shiftMode === 'half2' && !calcResults?.isClampedEarly && calcResults?.type === 'valid' && (
                            <span className="status-pill pill-success">
                                ✓ Valid 2nd Half
                            </span>
                        )}
                        {shiftMode === 'half2' && calcResults?.type === 'late_half2' && (
                            <span className="status-pill pill-error">
                                ⚠️ Late by {calcResults.lateText}
                            </span>
                        )}
                    </div>

                    <div className="input-section">
                        <label htmlFor="timeInInput">Enter Clock-In Time</label>
                        
                        <div className="time-input-container">
                            <input 
                                id="timeInInput"
                                type="time" 
                                step="60"
                                value={timeIn} 
                                onChange={(e) => handleTimeInChange(e.target.value)}
                            />
                            
                            {/* AM / PM Explicit Toggle Controls */}
                            <div className="period-toggle">
                                <button 
                                    type="button"
                                    className={`period-btn ${!isPM ? 'active' : ''}`}
                                    onClick={() => setPeriod('AM')}
                                    title={shiftMode === 'full' ? "Full Day is AM only" : "Set to AM"}
                                >
                                    AM
                                </button>
                                <button 
                                    type="button"
                                    className={`period-btn ${isPM ? 'active' : ''} ${shiftMode === 'full' ? 'disabled' : ''}`}
                                    onClick={() => setPeriod('PM')}
                                    disabled={shiftMode === 'full'}
                                    title={shiftMode === 'full' ? "Full Day is AM only" : "Set to PM"}
                                >
                                    PM
                                </button>
                            </div>
                        </div>

                        {/* Quick Presets */}
                        <div className="preset-container">
                            <span className="preset-label">Quick Select Presets:</span>
                            <div className="preset-buttons">
                                {PRESETS.map((preset) => (
                                    <button 
                                        key={preset.value} 
                                        className={`btn-preset ${timeIn === preset.value ? 'active' : ''}`}
                                        onClick={() => handleTimeInChange(preset.value)}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contextual Notes */}
                        {calcResults?.isClampedEarly && (
                            <div className="note-box info">
                                <span className="note-icon">🌅</span>
                                <div>
                                    <strong>Early Clock-In!</strong> You clocked in at <strong>{calcResults.timeIn12}</strong>.<br/>
                                    Working hours are calculated starting from <strong>{calcResults.clampFloorText}</strong> minimum floor (Half Day: <strong>{calcResults.halfDayExit12}</strong>, Full Day Clock-Out: <strong>{calcResults.fullDayExit12}</strong>).
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'late' && (
                            <div className="note-box error">
                                <span className="note-icon">🚨</span>
                                <div>
                                    <strong>Late Clock-In!</strong> You clocked in at <strong>{calcResults.timeIn12}</strong> (Late by <strong>{calcResults.lateText}</strong> after 09:30 AM flex limit).<br/>
                                    Standard clock-out is <strong>capped at max 19:00 (7:00 PM)</strong>.
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'half2' && calcResults?.type === 'late_half2' && (
                            <div className="note-box error">
                                <span className="note-icon">🚨</span>
                                <div>
                                    <strong>Late 2nd Half Clock-In!</strong> You clocked in at <strong>{calcResults.timeIn12}</strong> (Late by <strong>{calcResults.lateText}</strong> after 2:15 PM limit).<br/>
                                    Standard clock-out is <strong>capped at max 19:00 (7:00 PM)</strong>.
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'half2' && calcResults?.type !== 'late_half2' && (
                            <div className="note-box info">
                                <span className="note-icon">🌆</span>
                                <div>
                                    <strong>2nd Half Window:</strong> Min clock in is <strong>11:45 AM</strong>, Max clock in is <strong>2:15 PM</strong>.<br/>
                                    Clocking in before 11:45 AM calculates shift from 11:45 AM.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* OFFICIAL SUMMARY CARDS (Time IN | Half Day | Time OUT) */}
                    {calcResults && (
                        <div className="official-summary-container">
                            <div className="summary-title">
                                📋 Official Shift Schedule (Calculated from {calcResults.isClampedEarly ? calcResults.clampFloorText : calcResults.timeIn12})
                            </div>
                            
                            <div className="summary-grid">
                                <div className="summary-box box-in">
                                    <span className="s-label">Time IN</span>
                                    <span className="s-time">{calcResults.timeIn12}</span>
                                    <small className="s-sub">{calcResults.isClampedEarly ? `Counts as ${calcResults.clampFloorText}` : timeIn}</small>
                                </div>

                                {shiftMode === 'full' && (
                                    <div className="summary-box box-half">
                                        <span className="s-label">1st Half Leave</span>
                                        <span className="s-time">{calcResults.halfDayExit12}</span>
                                        <small className="s-sub">+4h 45m</small>
                                    </div>
                                )}

                                <div className="summary-box box-out active-mode">
                                    <span className="s-label">{shiftMode === 'half2' ? '2nd Half OUT' : 'Time OUT'}</span>
                                    <span className="s-time">{shiftMode === 'half2' ? calcResults.halfDayExit12 : calcResults.fullDayExit12}</span>
                                    <small className="s-sub">{shiftMode === 'half2' ? '+4h 45m' : '+9h 30m'} {calcResults.isCapped ? '(Capped 7pm)' : ''}</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Standard Time Out Hero Banner */}
                    <div className={`hero-timeout-card ${calcResults?.isCapped ? 'hero-capped' : ''}`}>
                        <div className="hero-top">
                            <span className="hero-label">
                                {shiftMode === 'full' ? 'Target Full Day Clock-Out' : 'Target 2nd Half Clock-Out'}
                            </span>
                            <span className="hero-badge">
                                {calcResults?.isCapped ? '⚠️ Capped Max 7:00 PM' : (shiftMode === 'full' ? '9.5 Hours Base' : '4.75 Hours Half Shift')}
                            </span>
                        </div>

                        <div className="hero-time-display">
                            {calcResults?.activeTarget12 || "--:--"}
                            <span className="hero-time-24">({calcResults?.activeTarget24})</span>
                        </div>
                        
                        {calcResults?.isCapped && (
                            <div className="capped-subtext">
                                (Late by {calcResults.lateText} from {calcResults.flexLimitText} flex limit. Clock-out capped at 7:00 PM max)
                            </div>
                        )}

                        {/* Progress Bar */}
                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <span>{shiftStats.statusText}</span>
                                <strong>{shiftStats.countdownText}</strong>
                            </div>
                            <div className="progress-track">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${shiftStats.percent}%` }}
                                ></div>
                            </div>
                            <div className="progress-footer">
                                <small>Shift Completion: {shiftStats.percent}%</small>
                                <small>Clock In: {calcResults?.timeIn12}</small>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- RIGHT PANEL: OVERTIME BREAKDOWN --- */}
                <section className="dash-column">
                    <div className="dash-card">
                        <div className="card-header">
                            <h2>📊 OT Breakdown</h2>
                            <span className="status-pill pill-info">30-min Tiers</span>
                        </div>

                        <div className="table-responsive">
                            <table className="ot-table">
                                <thead>
                                    <tr>
                                        <th>OT Tier</th>
                                        <th>Duration</th>
                                        <th>Target Clock Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calcResults?.otTableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="ot-badge">{row.label}</span>
                                            </td>
                                            <td className="text-secondary">{row.duration}</td>
                                            <td className="ot-time-cell">
                                                {row.time12} <small className="text-secondary">({row.time})</small>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Live Weather Widget */}
                    <div className="dash-card weather-card">
                        <div className="weather-content">
                            <div className="weather-icon-large">{weatherInfo.icon}</div>
                            <div className="weather-details">
                                <div className="weather-temp-row">
                                    <h3>{weatherInfo.title}</h3>
                                    {weatherData && (
                                        <span className="temp-badge">{weatherData.temperature}°C</span>
                                    )}
                                </div>
                                <p>{weatherInfo.msg}</p>
                            </div>
                        </div>
                    </div>

                    {/* Waktu Solat Widget */}
                    <div className="dash-card prayer-section">
                        <div className="card-header">
                            <h2>🕌 Waktu Solat (Zone SGR01)</h2>
                            {nextPrayer && (
                                <span className="next-prayer-pill">
                                    Next: <strong>{nextPrayer}</strong> ({timeToNextPrayer})
                                </span>
                            )}
                        </div>
                        <div className="prayer-grid">
                            {prayerTimes.map((p, index) => (
                                <div key={index} className={`prayer-item ${nextPrayer === p.name ? 'active-prayer' : ''}`}>
                                    <span className="p-name">{p.name}</span>
                                    <span className="p-time">{p.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);