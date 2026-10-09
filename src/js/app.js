const { useState, useEffect, useMemo, useRef } = React;

// --- MULTI-LANGUAGE TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
    en: {
        code: "en",
        label: "English",
        flag: "🇺🇸",
        appTitle: "Sony Bangi — Go Home Calculator",
        subhead: "Flexible Shift & Overtime Management System",
        portfolio: "Portfolio",
        portfolioEditPrompt: "Enter your Portfolio URL:",
        fullDayMode: "☀️ Full Day (9.5h)",
        half2Mode: "🌆 2nd Half (4.75h)",
        shiftClockInTitle: "⏱️ Shift Clock-In",
        validFlex: "✓ DS4 Valid Flex",
        validHalf2: "✓ Valid 2nd Half",
        earlyFloorPill: (floor) => `🌅 Early Floor (${floor})`,
        earlyByPill: (diff) => `🌅 Early by ${diff}`,
        lateByPill: (diff) => `⚠️ Late by ${diff}`,
        enterClockIn: "Enter Clock-In Time",
        quickPresetsLabel: "Quick Select Presets:",
        fullDayAmOnly: "Full Day is AM only (07:00 - 09:30 AM flex)",
        setAm: "Set to AM",
        setPm: "Set to PM",
        stepUpTooltip: "+5 Minutes",
        stepDownTooltip: "-5 Minutes",
        clockPickerTooltip: "Open OS clock picker",
        earlyClockInTitle: "Early Clock-In!",
        earlyClockInDesc: (timeIn12, floor, halfExit, fullExit) => 
            `You clocked in early at ${timeIn12}. Working hours are calculated starting from ${floor} minimum floor (1st Half Leave: ${halfExit}, Full Day Clock-Out: ${fullExit}).`,
        lateClockInTitle: "Late Clock-In!",
        lateClockInDesc: (timeIn12, lateText, limit) =>
            `You clocked in at ${timeIn12} (Late by ${lateText} after ${limit} flex limit). Standard clock-out is capped at max 19:00 (7:00 PM).`,
        lateHalf2Title: "Late 2nd Half Clock-In!",
        lateHalf2Desc: (timeIn12, lateText, limit) =>
            `You clocked in at ${timeIn12} (Late by ${lateText} after ${limit} limit). Standard clock-out is capped at max 19:00 (7:00 PM).`,
        half2WindowNoticeTitle: "2nd Half Window:",
        half2WindowNoticeDesc: "Min clock in is 11:45 AM, Max clock in is 2:15 PM. Clocking in before 11:45 AM calculates shift from 11:45 AM.",
        customDateNoticeTitle: "Custom Date View:",
        customDateNoticeDesc: (dateStr) => `You are currently viewing the schedule for ${dateStr}.`,
        resetToToday: "↺ Return to Today",
        officialScheduleTitle: (time) => `📋 Official Shift Schedule (Calculated from ${time})`,
        timeInLabel: "Time IN",
        firstHalfLeaveLabel: "1st Half Leave",
        timeOutLabel: "Time OUT",
        secondHalfOutLabel: "2nd Half OUT",
        countsAs: (floor) => `Counts as ${floor}`,
        capped7pmSub: "(Capped 7pm)",
        targetFullDayClockOut: "Target Full Day Clock-Out",
        targetHalf2ClockOut: "Target 2nd Half Clock-Out",
        cappedMaxBadge: "⚠️ Capped Max 7:00 PM",
        baseHoursBadge: (isFull) => isFull ? "9.5 Hours Base" : "4.75 Hours Half Shift",
        cappedDisclaimer: (lateText, limit) => `(Late by ${lateText} from ${limit} flex limit. Clock-out capped at 7:00 PM max)`,
        awaitingInput: "Awaiting Input",
        shiftNotStartedYet: "Shift Has Not Started Yet",
        startsIn: (mins) => `Starts in ${mins} min`,
        shiftCompletedTitle: "Shift Completed! 🎉",
        canClockOutNow: "You can clock out now!",
        shiftInProgressTitle: "Shift In Progress ⏳",
        timeLeftStr: (h, m, s) => h > 0 ? `${h}h ${m}m ${s}s left` : `${m}m ${s}s left`,
        pastShiftCompleted: "Shift Completed (Past Date)",
        pastShiftRecorded: "Past Shift Record",
        upcomingShiftScheduled: "Upcoming Shift (Scheduled)",
        upcomingNotStarted: "Not Started Yet",
        shiftCompletionLabel: "Shift Completion:",
        clockInPrefix: "Clock In:",
        otBreakdownTitle: "📊 OT Breakdown",
        tiers30min: "30-min Tiers",
        seeMore: "See More",
        modalOtKicker: "OVERTIME SCHEDULE & TIERS",
        modalOtTitle: "Overtime (OT) Breakdown",
        modalOtSubtitle: (activeTarget12, activeTarget24, modeName, dateStr) =>
            `Target clock-out schedule calculated from base target ${activeTarget12} (${activeTarget24}) for ${modeName} on ${dateStr}.`,
        modalOtPolicyTitle: "📌 Overtime Policy & Calculation Rules",
        modalOtPolicyDesc: (targetTime) =>
            `Standard shift concludes at ${targetTime}. For the first overtime tier (1.0h OT), a mandatory 10-minute rest break is included (+1h 10m total elapsed time). Subsequent overtime tiers advance in 30-minute intervals up to a maximum of 4.0 hours.`,
        modalOtTiersTitle: "💡 OT Tiers & Quick Targets",
        earlyOtKicker: "🟡 Early OT",
        standardOtKicker: "🟠 Standard OT",
        extendedOtKicker: "🔴 Extended OT",
        inclBreakTag: "+1h 10m (incl. break)",
        breakMandatoryNote: "Includes mandatory 10-minute rest break.",
        eveningExtendedNote: "Evening extended shift window.",
        maxOtDailyNote: "Maximum allowable daily overtime (4 hours).",
        fullTableTitle: "📋 Full 30-Minute Schedule Table",
        colOtTier: "OT Tier",
        colDurationAdded: "Duration Added",
        colTarget12: "Target Clock Out (12h)",
        colFormat24: "24h Format",
        copyScheduleBtn: "Copy Schedule",
        copiedScheduleAlert: "Overtime schedule copied to clipboard!",
        failedCopyAlert: "Failed to copy automatically. Please select and copy manually.",
        closeBtn: "Close",
        weatherAndIpuTitle: "🌤️ Weather & Air Quality",
        weatherIpuBadge: "Bangi & Putrajaya (DOE Standard)",
        liveIndicator: "LIVE",
        refreshEnvTooltip: "Refresh Weather & Air Quality",
        sonyBangiLabel: "Sony Bangi",
        ipuLabel: "IPU Bangi (~10km)",
        loadingIpu: "Loading IPU...",
        apimsJasLink: "APIMS DOE ↗",
        prayerTimesTitle: "🕌 Prayer Times (Zone SGR01)",
        nextPrayerPrefix: "Next:",
        fullPrayerSchedulePill: "Full Schedule",
        dateModalKicker: "SELECT SHIFT DATE",
        dateModalTitle: "📅 Shift Date & Work Records",
        dateModalSubtitle: "Select a date to check past or upcoming shift targets, OT schedules, and prayer times.",
        quickPresetsTitle: "⚡ Quick Presets",
        todayBtn: "📌 Today",
        todaySub: "Today",
        yesterdayBtn: "⬅️ Yesterday",
        yesterdaySub: "Yesterday",
        tomorrowBtn: "➡️ Tomorrow",
        tomorrowSub: "Tomorrow",
        customDateSectionTitle: "⌨️ Custom Date Entry",
        orUseCalendarLabel: "Or pick from calendar:",
        applyDateBtn: "✓ Apply Date",
        resetDateBtn: "↺ Reset to Today",
        invalidDateAlert: "Please enter a valid date (DD / MM / YYYY).",
        customDatePill: "Custom",
        changeDateBtn: "Change",
        weatherCheckingTitle: "Checking Sony Bangi...",
        weatherCheckingMsg: "Fetching local weather update...",
        weatherThunderTitle: "Thunderstorm at Sony",
        weatherThunderMsg: "Heavy storms in Bangi! Stay inside. ⚡",
        weatherRainTitle: "Rainy at Sony",
        weatherRainMsg: "Don't forget your umbrella! Sky is drizzling. 🌧️",
        weatherSunnyTitle: "Sunny at Sony Bangi",
        weatherSunnyMsg: "Clear skies! Have a productive workday. ✨",
        otTierLabel: (hours, isMax) => `${hours.toFixed(1)} ${hours === 1 ? 'Hour' : 'Hours'} OT${isMax ? ' (Max)' : ''}`,
        otQuickLabel: (hours, isMax) => `${hours}h OT${isMax ? ' (Max)' : ''}`,
        otDurationTag: (h, m) => `+${h}h ${m}m`,
        otDurationMaxTag: (h, m) => `+${h}h ${m}m (Max)`,
        formatDiff: (h, m) => h > 0 ? `${h}h ${m}m` : `${m} mins`,
        countdownPrayer: (h, m, s) => h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`,
        dayLabel: "Day",
        monthLabel: "Month",
        yearLabel: "Year",
        ipuSegGood: "Good (0-50)",
        ipuSegMod: "Moderate (51-100)",
        ipuSegUnhealthy: "Unhealthy (101-200)",
        ipuSegVUnhealthy: "Very Unhealthy (201-300)",
        ipuSegHazard: "Hazardous (>300)",
        prayerNames: {
            Subuh: "Subuh (Fajr)",
            Zohor: "Zohor (Dhuhr)",
            Asar: "Asar (Asr)",
            Maghrib: "Maghrib",
            Isyak: "Isyak (Isha)"
        }
    },
    ms: {
        code: "ms",
        label: "Bahasa Melayu",
        flag: "🇲🇾",
        appTitle: "Sony Bangi — Kalkulator Balik Kerja",
        subhead: "Sistem Pengurusan Syif Fleksibel & Kerja Lebih Masa (OT)",
        portfolio: "Portfolio",
        portfolioEditPrompt: "Masukkan URL Portfolio anda:",
        fullDayMode: "☀️ Hari Penuh (9.5j)",
        half2Mode: "🌆 Separuh Hari Ke-2 (4.75j)",
        shiftClockInTitle: "⏱️ Waktu Masuk Syif",
        validFlex: "✓ DS4 Flex Sah",
        validHalf2: "✓ Separuh Hari Sah",
        earlyFloorPill: (floor) => `🌅 Had Awal Syif (${floor})`,
        earlyByPill: (diff) => `🌅 Awal sebanyak ${diff}`,
        lateByPill: (diff) => `⚠️ Lewat sebanyak ${diff}`,
        enterClockIn: "Masukkan Waktu Masuk Kerja",
        quickPresetsLabel: "Pilihan Waktu Pantas:",
        fullDayAmOnly: "Syif Pagi sahaja untuk Hari Penuh (07:00 - 09:30 AM)",
        setAm: "Tukar ke AM (Pagi)",
        setPm: "Tukar ke PM (Petang)",
        stepUpTooltip: "+5 Minit",
        stepDownTooltip: "-5 Minit",
        clockPickerTooltip: "Buka pemilih jam telefon / OS",
        earlyClockInTitle: "Masuk Kerja Awal!",
        earlyClockInDesc: (timeIn12, floor, halfExit, fullExit) => 
            `Anda masuk awal pada ${timeIn12}. Waktu bekerja dikira bermula dari had minimum ${floor} (Cuti Separuh Hari: ${halfExit}, Balik Hari Penuh: ${fullExit}).`,
        lateClockInTitle: "Masuk Kerja Lewat!",
        lateClockInDesc: (timeIn12, lateText, limit) =>
            `Anda masuk kerja pada ${timeIn12} (Lewat ${lateText} dari had fleksibel ${limit}). Waktu balik standard dihadkan maksimum 19:00 (7:00 Petang).`,
        lateHalf2Title: "Lewat Syif Separuh Hari Ke-2!",
        lateHalf2Desc: (timeIn12, lateText, limit) =>
            `Anda masuk kerja pada ${timeIn12} (Lewat ${lateText} dari had ${limit}). Waktu balik dihadkan maksimum 19:00 (7:00 Petang).`,
        half2WindowNoticeTitle: "Tempoh Syif Separuh Hari Ke-2:",
        half2WindowNoticeDesc: "Waktu masuk minimum ialah 11:45 AM, maksimum 2:15 PM. Masuk sebelum 11:45 AM akan dikira bermula dari 11:45 AM.",
        customDateNoticeTitle: "Paparan Tarikh Khas:",
        customDateNoticeDesc: (dateStr) => `Anda sedang melihat jadual bagi ${dateStr}.`,
        resetToToday: "↺ Kembali ke Hari Ini",
        officialScheduleTitle: (time) => `📋 Jadual Syif Rasmi (Dikira dari ${time})`,
        timeInLabel: "Waktu Masuk",
        firstHalfLeaveLabel: "Cuti Separuh Hari",
        timeOutLabel: "Waktu Balik",
        secondHalfOutLabel: "Balik Separuh Hari Ke-2",
        countsAs: (floor) => `Dikira sebagai ${floor}`,
        capped7pmSub: "(Had 7:00 ptg)",
        targetFullDayClockOut: "Sasaran Balik Hari Penuh",
        targetHalf2ClockOut: "Sasaran Balik Separuh Hari Ke-2",
        cappedMaxBadge: "⚠️ Had Maksimum 7:00 Malam",
        baseHoursBadge: (isFull) => isFull ? "Asas 9.5 Jam" : "Asas 4.75 Jam Separuh Hari",
        cappedDisclaimer: (lateText, limit) => `(Lewat ${lateText} dari had fleksibel ${limit}. Waktu balik dihadkan pada 7:00 Malam)`,
        awaitingInput: "Menunggu Masa Masuk",
        shiftNotStartedYet: "Syif Belum Bermula",
        startsIn: (mins) => `Bermula dalam ${mins} minit`,
        shiftCompletedTitle: "Syif Selesai! 🎉",
        canClockOutNow: "Anda boleh balik sekarang!",
        shiftInProgressTitle: "Syif Sedang Berjalan ⏳",
        timeLeftStr: (h, m, s) => h > 0 ? `Tinggal ${h}j ${m}m ${s}s` : `Tinggal ${m}m ${s}s`,
        pastShiftCompleted: "Syif Telah Selesai (Tarikh Lepas)",
        pastShiftRecorded: "Rekod Syif Selesai",
        upcomingShiftScheduled: "Syif Akan Datang (Jadual Terancang)",
        upcomingNotStarted: "Belum Bermula",
        shiftCompletionLabel: "Kemajuan Syif:",
        clockInPrefix: "Waktu Masuk:",
        otBreakdownTitle: "📊 Pecahan OT",
        tiers30min: "Peringkat 30 min",
        seeMore: "Lihat Penuh",
        modalOtKicker: "JADUAL & PERINGKAT KERJA LEBIH MASA (OT)",
        modalOtTitle: "Pecahan Masa Kerja Lebih Masa (OT)",
        modalOtSubtitle: (activeTarget12, activeTarget24, modeName, dateStr) =>
            `Sasaran waktu balik dikira daripada asas ${activeTarget12} (${activeTarget24}) bagi ${modeName} pada ${dateStr}.`,
        modalOtPolicyTitle: "📌 Polisi Kerja Lebih Masa & Syarat Kiraan",
        modalOtPolicyDesc: (targetTime) =>
            `Syif standard selesai pada ${targetTime}. Untuk peringkat OT pertama (1.0j OT), rehat wajib 10 minit disertakan (+1j 10m jumlah masa berlalu). Peringkat OT seterusnya meningkat dalam selang 30 minit sehingga maksimum 4.0 jam.`,
        modalOtTiersTitle: "💡 Peringkat OT & Sasaran Pantas",
        earlyOtKicker: "🟡 OT Peringkat Awal",
        standardOtKicker: "🟠 OT Standard",
        extendedOtKicker: "🔴 OT Lanjutan",
        inclBreakTag: "+1j 10m (termasuk rehat)",
        breakMandatoryNote: "Termasuk rehat wajib 10 minit.",
        eveningExtendedNote: "Tempoh lanjutan syif petang.",
        maxOtDailyNote: "Had maksimum kerja lebih masa harian yang dibenarkan (4 jam).",
        fullTableTitle: "📋 Jadual Lengkap Selang 30 Minit",
        colOtTier: "Peringkat OT",
        colDurationAdded: "Masa Tambahan",
        colTarget12: "Sasaran Balik (12j)",
        colFormat24: "Format 24j",
        copyScheduleBtn: "Salin Jadual",
        copiedScheduleAlert: "Jadual kerja lebih masa berjaya disalin!",
        failedCopyAlert: "Gagal menyalin secara automatik. Sila salin secara manual.",
        closeBtn: "Tutup",
        weatherAndIpuTitle: "🌤️ Cuaca & Kualiti Udara",
        weatherIpuBadge: "Bangi & Putrajaya (Piawaian JAS)",
        liveIndicator: "LIVE",
        refreshEnvTooltip: "Muat semula Cuaca & Kualiti Udara",
        sonyBangiLabel: "Sony Bangi",
        ipuLabel: "IPU Bangi (~10km)",
        loadingIpu: "Memuatkan IPU...",
        apimsJasLink: "APIMS JAS ↗",
        prayerTimesTitle: "🕌 Waktu Solat (Zon SGR01)",
        nextPrayerPrefix: "Seterusnya:",
        fullPrayerSchedulePill: "Jadual Penuh",
        dateModalKicker: "PILIH TARIKH SYIF",
        dateModalTitle: "📅 Tarikh Syif & Rekod Kerja",
        dateModalSubtitle: "Pilih tarikh untuk semak rekod waktu kerja, jadual OT, dan waktu solat zone SGR01.",
        quickPresetsTitle: "⚡ Pilihan Pantas",
        todayBtn: "📌 Hari Ini",
        todaySub: "Hari Ini",
        yesterdayBtn: "⬅️ Semalam",
        yesterdaySub: "Semalam",
        tomorrowBtn: "➡️ Esok",
        tomorrowSub: "Esok",
        customDateSectionTitle: "⌨️ Masukkan Tarikh Khusus",
        orUseCalendarLabel: "Atau pilih dari kalendar:",
        applyDateBtn: "✓ Guna Tarikh Ini",
        resetDateBtn: "↺ Reset ke Hari Ini",
        invalidDateAlert: "Sila masukkan tarikh yang sah (HH / BB / TTTT).",
        customDatePill: "Khas",
        changeDateBtn: "Tukar",
        weatherCheckingTitle: "Memeriksa Sony Bangi...",
        weatherCheckingMsg: "Mendapatkan kemas kini cuaca tempatan...",
        weatherThunderTitle: "Ribut Petir di Sony",
        weatherThunderMsg: "Ribut lebat di Bangi! Kekal di dalam bangunan. ⚡",
        weatherRainTitle: "Hujan di Sony",
        weatherRainMsg: "Jangan lupa payung anda! Cuaca renyai/hujan. 🌧️",
        weatherSunnyTitle: "Cerah di Sony Bangi",
        weatherSunnyMsg: "Langit cerah! Semoga hari kerja anda produktif. ✨",
        otTierLabel: (hours, isMax) => `${hours.toFixed(1)} Jam OT${isMax ? ' (Maks)' : ''}`,
        otQuickLabel: (hours, isMax) => `${hours}j OT${isMax ? ' (Maks)' : ''}`,
        otDurationTag: (h, m) => `+${h}j ${m}m`,
        otDurationMaxTag: (h, m) => `+${h}j ${m}m (Maks)`,
        formatDiff: (h, m) => h > 0 ? `${h}j ${m}m` : `${m} minit`,
        countdownPrayer: (h, m, s) => h > 0 ? `${h}j ${m}m` : `${m}m ${s}s`,
        dayLabel: "Hari",
        monthLabel: "Bulan",
        yearLabel: "Tahun",
        ipuSegGood: "Baik (0-50)",
        ipuSegMod: "Sederhana (51-100)",
        ipuSegUnhealthy: "Tidak Sihat (101-200)",
        ipuSegVUnhealthy: "Sangat Tidak Sihat (201-300)",
        ipuSegHazard: "Berbahaya (>300)",
        prayerNames: {
            Subuh: "Subuh",
            Zohor: "Zohor",
            Asar: "Asar",
            Maghrib: "Maghrib",
            Isyak: "Isyak"
        }
    },
    zh: {
        code: "zh",
        label: "中文 (简体)",
        flag: "🇨🇳",
        appTitle: "索尼万宜 — 下班倒计时计算器",
        subhead: "弹性工时与加班（OT）时间管理系统",
        portfolio: "个人主页",
        portfolioEditPrompt: "请输入您的作品集/个人主页网址：",
        fullDayMode: "☀️ 全天班 (9.5小时)",
        half2Mode: "🌆 下半段半天班 (4.75小时)",
        shiftClockInTitle: "⏱️ 上班打卡",
        validFlex: "✓ DS4 弹性工时有效",
        validHalf2: "✓ 下半段有效工时",
        earlyFloorPill: (floor) => `🌅 最早计工时限 (${floor})`,
        earlyByPill: (diff) => `🌅 提前 ${diff}`,
        lateByPill: (diff) => `⚠️ 迟到 ${diff}`,
        enterClockIn: "输入上班打卡时间",
        quickPresetsLabel: "快捷时间预设：",
        fullDayAmOnly: "全天班仅限上午打卡 (07:00 - 09:30 AM 弹性时段)",
        setAm: "设为上午 (AM)",
        setPm: "设为下午 (PM)",
        stepUpTooltip: "+5 分钟",
        stepDownTooltip: "-5 分钟",
        clockPickerTooltip: "打开系统时钟选择器",
        earlyClockInTitle: "早到打卡！",
        earlyClockInDesc: (timeIn12, floor, halfExit, fullExit) => 
            `您在 ${timeIn12} 提前打卡。工时按最早起计底线 ${floor} 计算（上半天休假离岗：${halfExit}，全天下班时间：${fullExit}）。`,
        lateClockInTitle: "迟到打卡！",
        lateClockInDesc: (timeIn12, lateText, limit) =>
            `您在 ${timeIn12} 打卡（超出 ${limit} 弹性时限 ${lateText}）。标准下班时间最晚封顶至 19:00（晚上 7:00）。`,
        lateHalf2Title: "下半段半天班迟到！",
        lateHalf2Desc: (timeIn12, lateText, limit) =>
            `您在 ${timeIn12} 打卡（超出 ${limit} 时限 ${lateText}）。标准下班时间最晚封顶至 19:00（晚上 7:00）。`,
        half2WindowNoticeTitle: "下半段半天班打卡时段：",
        half2WindowNoticeDesc: "最早打卡时间为 11:45 AM，最晚打卡时间为 2:15 PM。若早于 11:45 AM 打卡，将从 11:45 AM 开始计工。",
        customDateNoticeTitle: "指定日期视图：",
        customDateNoticeDesc: (dateStr) => `您当前正在查看 ${dateStr} 的排班记录。`,
        resetToToday: "↺ 返回今天",
        officialScheduleTitle: (time) => `📋 官方排班时间表（依据 ${time} 计算）`,
        timeInLabel: "上班打卡",
        firstHalfLeaveLabel: "上半天离岗",
        timeOutLabel: "全天下班",
        secondHalfOutLabel: "下半天下班",
        countsAs: (floor) => `计工起始：${floor}`,
        capped7pmSub: "(上限晚上7点)",
        targetFullDayClockOut: "目标全天下班时间",
        targetHalf2ClockOut: "目标下半天下班时间",
        cappedMaxBadge: "⚠️ 最晚封顶 7:00 PM",
        baseHoursBadge: (isFull) => isFull ? "基础工时 9.5 小时" : "半天基础 4.75 小时",
        cappedDisclaimer: (lateText, limit) => `(迟到 ${lateText} 超出 ${limit} 弹性时限。下班时间封顶至晚上 7:00)`,
        awaitingInput: "等待输入打卡时间",
        shiftNotStartedYet: "班次尚未开始",
        startsIn: (mins) => `距开始还有 ${mins} 分钟`,
        shiftCompletedTitle: "工时已满，下班啦！🎉",
        canClockOutNow: "您可以打卡下班啦！",
        shiftInProgressTitle: "工时进行中 ⏳",
        timeLeftStr: (h, m, s) => h > 0 ? `剩余 ${h}小时 ${m}分 ${s}秒` : `剩余 ${m}分 ${s}秒`,
        pastShiftCompleted: "历史工时已完成",
        pastShiftRecorded: "历史排班记录",
        upcomingShiftScheduled: "未来排班计划",
        upcomingNotStarted: "尚未开始",
        shiftCompletionLabel: "工时进度：",
        clockInPrefix: "打卡：",
        otBreakdownTitle: "📊 加班（OT）明细",
        tiers30min: "30分钟档位",
        seeMore: "查看详情",
        modalOtKicker: "加班档位与时间安排",
        modalOtTitle: "加班（OT）时间详解",
        modalOtSubtitle: (activeTarget12, activeTarget24, modeName, dateStr) =>
            `以 ${activeTarget12} (${activeTarget24}) 为基础基准时刻，计算 ${dateStr} ${modeName} 的目标下班时间。`,
        modalOtPolicyTitle: "📌 加班规则与计算说明",
        modalOtPolicyDesc: (targetTime) =>
            `标准工作时间于 ${targetTime} 结束。首档加班（1.0小时OT）包含规定的 10 分钟工间休息（总耗时+1小时10分）。其后每档以 30 分钟递增，每日最多可加班 4.0 小时。`,
        modalOtTiersTitle: "💡 加班档位与目标时刻",
        earlyOtKicker: "🟡 初期加班",
        standardOtKicker: "🟠 标准加班",
        extendedOtKicker: "🔴 延长加班",
        inclBreakTag: "+1小时10分 (含休息)",
        breakMandatoryNote: "包含强制 10 分钟休息时间。",
        eveningExtendedNote: "傍晚延长加班时段。",
        maxOtDailyNote: "每日最高允许加班时长 (4小时)。",
        fullTableTitle: "📋 30分钟完整加班时刻表",
        colOtTier: "加班档位",
        colDurationAdded: "增加时长",
        colTarget12: "目标下班时刻 (12h)",
        colFormat24: "24小时制",
        copyScheduleBtn: "复制时刻表",
        copiedScheduleAlert: "加班时间表已成功复制到剪贴板！",
        failedCopyAlert: "自动复制失败，请手动选中文本复制。",
        closeBtn: "关闭",
        weatherAndIpuTitle: "🌤️ 天气与空气质量",
        weatherIpuBadge: "万宜与布城 (环境局标准)",
        liveIndicator: "实时",
        refreshEnvTooltip: "刷新天气与空气质量数据",
        sonyBangiLabel: "索尼万宜",
        ipuLabel: "万宜空气指数 (~10km)",
        loadingIpu: "正在加载空气质量...",
        apimsJasLink: "马来西亚环境局 APIMS ↗",
        prayerTimesTitle: "🕌 祈祷时刻 (雪兰莪 SGR01 区)",
        nextPrayerPrefix: "下一次：",
        fullPrayerSchedulePill: "完整日程",
        dateModalKicker: "选择考勤日期",
        dateModalTitle: "📅 考勤日期与工作记录",
        dateModalSubtitle: "选择日期以查看历史或未来排班目标、加班排程及祈祷时刻。",
        quickPresetsTitle: "⚡ 快捷预设",
        todayBtn: "📌 今天",
        todaySub: "今天",
        yesterdayBtn: "⬅️ 昨天",
        yesterdaySub: "昨天",
        tomorrowBtn: "➡️ 明天",
        tomorrowSub: "明天",
        customDateSectionTitle: "⌨️ 输入指定日期",
        orUseCalendarLabel: "或从日历选取：",
        applyDateBtn: "✓ 确认使用该日期",
        resetDateBtn: "↺ 重置为今天",
        invalidDateAlert: "请输入有效的日期 (日 / 月 / 年)。",
        customDatePill: "自定义",
        changeDateBtn: "修改",
        weatherCheckingTitle: "正在查询索尼万宜...",
        weatherCheckingMsg: "获取当地最新天气数据中...",
        weatherThunderTitle: "雷暴天气提醒",
        weatherThunderMsg: "万宜局部有强雷雨！请尽量留在室内。⚡",
        weatherRainTitle: "下雨提醒",
        weatherRainMsg: "出门请携带雨伞！天空下着小雨。🌧️",
        weatherSunnyTitle: "天气晴朗",
        weatherSunnyMsg: "晴空万里！祝工作顺心高效。✨",
        otTierLabel: (hours, isMax) => `${hours.toFixed(1)} 小时 OT${isMax ? ' (上限)' : ''}`,
        otQuickLabel: (hours, isMax) => `${hours}h OT${isMax ? ' (上限)' : ''}`,
        otDurationTag: (h, m) => `+${h}小时${m}分`,
        otDurationMaxTag: (h, m) => `+${h}小时${m}分 (上限)`,
        formatDiff: (h, m) => h > 0 ? `${h}小时 ${m}分钟` : `${m} 分钟`,
        countdownPrayer: (h, m, s) => h > 0 ? `${h}小时 ${m}分` : `${m}分 ${s}秒`,
        dayLabel: "日",
        monthLabel: "月",
        yearLabel: "年",
        ipuSegGood: "优良 (0-50)",
        ipuSegMod: "中等 (51-100)",
        ipuSegUnhealthy: "不健康 (101-200)",
        ipuSegVUnhealthy: "极不健康 (201-300)",
        ipuSegHazard: "危险 (>300)",
        prayerNames: {
            Subuh: "晨礼 (Subuh)",
            Zohor: "晌礼 (Zohor)",
            Asar: "晡礼 (Asar)",
            Maghrib: "昏礼 (Maghrib)",
            Isyak: "宵礼 (Isyak)"
        }
    },
    ja: {
        code: "ja",
        label: "日本語",
        flag: "🇯🇵",
        appTitle: "ソニー・バンギ — 退勤時間計算機",
        subhead: "フレックス勤務＆残業（OT）管理システム",
        portfolio: "ポートフォリオ",
        portfolioEditPrompt: "ポートフォリオのURLを入力してください：",
        fullDayMode: "☀️ 全日勤務 (9.5h)",
        half2Mode: "🌆 後半半休 (4.75h)",
        shiftClockInTitle: "⏱️ 出勤打刻",
        validFlex: "✓ DS4 フレックス適用",
        validHalf2: "✓ 後半勤務有効",
        earlyFloorPill: (floor) => `🌅 早朝勤務フロア (${floor})`,
        earlyByPill: (diff) => `🌅 ${diff} 早い出勤`,
        lateByPill: (diff) => `⚠️ ${diff} 遅刻`,
        enterClockIn: "出勤打刻時間を入力",
        quickPresetsLabel: "クイック選択プリセット：",
        fullDayAmOnly: "全日勤務は午前（AM）打刻のみ有効 (07:00 - 09:30 AM フレックス枠)",
        setAm: "AM（午前）",
        setPm: "PM（午後）",
        stepUpTooltip: "+5分",
        stepDownTooltip: "-5分",
        clockPickerTooltip: "端末の時計ピッカーを開く",
        earlyClockInTitle: "早朝出勤！",
        earlyClockInDesc: (timeIn12, floor, halfExit, fullExit) => 
            `${timeIn12} に早朝打刻されました。実働時間は最低フロア ${floor} から起算されます（前半半休退社：${halfExit}、全日退勤時刻：${fullExit}）。`,
        lateClockInTitle: "遅刻打刻！",
        lateClockInDesc: (timeIn12, lateText, limit) =>
            `${timeIn12} に打刻されました（フレックス限度 ${limit} より ${lateText} 遅刻）。定時退勤は最大 19:00（午後7時）に打ち切られます。`,
        lateHalf2Title: "後半半休の遅刻！",
        lateHalf2Desc: (timeIn12, lateText, limit) =>
            `${timeIn12} に打刻されました（限度 ${limit} より ${lateText} 遅刻）。退勤は最大 19:00（午後7時）に打ち切られます。`,
        half2WindowNoticeTitle: "後半半休の打刻時間枠：",
        half2WindowNoticeDesc: "打刻可能時間は 11:45 AM 〜 02:15 PM です。11:45 AM より前に打刻した場合は 11:45 AM 起算となります。",
        customDateNoticeTitle: "指定日表示：",
        customDateNoticeDesc: (dateStr) => `現在 ${dateStr} の勤務記録を表示しています。`,
        resetToToday: "↺ 今日へ戻る",
        officialScheduleTitle: (time) => `📋 公式勤務スケジュール（${time} 起算）`,
        timeInLabel: "出勤時刻",
        firstHalfLeaveLabel: "前半半休退社",
        timeOutLabel: "定時退勤",
        secondHalfOutLabel: "後半半休退勤",
        countsAs: (floor) => `${floor} 起算扱い`,
        capped7pmSub: "(19時上限)",
        targetFullDayClockOut: "目標全日退勤時刻",
        targetHalf2ClockOut: "目標後半退勤時刻",
        cappedMaxBadge: "⚠️ 最大19:00打ち切り",
        baseHoursBadge: (isFull) => isFull ? "基準勤務 9.5時間" : "半休基準 4.75時間",
        cappedDisclaimer: (lateText, limit) => `(フレックス限度 ${limit} より ${lateText} 遅刻。退勤は最大19:00に打ち切り)`,
        awaitingInput: "打刻時間待ち",
        shiftNotStartedYet: "勤務開始前",
        startsIn: (mins) => `開始まであと ${mins}分`,
        shiftCompletedTitle: "所定勤務達成！🎉",
        canClockOutNow: "退勤打刻が可能です！",
        shiftInProgressTitle: "勤務中 ⏳",
        timeLeftStr: (h, m, s) => h > 0 ? `残り ${h}時間 ${m}分 ${s}秒` : `残り ${m}分 ${s}秒`,
        pastShiftCompleted: "過去の勤務達成済み",
        pastShiftRecorded: "過去の勤務記録",
        upcomingShiftScheduled: "予定勤務（計画）",
        upcomingNotStarted: "未開始",
        shiftCompletionLabel: "勤務進捗率：",
        clockInPrefix: "出勤時刻：",
        otBreakdownTitle: "📊 残業（OT）計算",
        tiers30min: "30分間隔",
        seeMore: "詳細を見る",
        modalOtKicker: "残業スケジュール＆区分",
        modalOtTitle: "残業（OT）詳細スケジュール",
        modalOtSubtitle: (activeTarget12, activeTarget24, modeName, dateStr) =>
            `${dateStr} の ${modeName}、基準退勤時刻 ${activeTarget12} (${activeTarget24}) をもとに算出した残業目安です。`,
        modalOtPolicyTitle: "📌 残業規定＆算出ルール",
        modalOtPolicyDesc: (targetTime) =>
            `通常勤務は ${targetTime} に終了します。最初の残業枠（1.0h OT）には、社内規定に基づく必須10分間の休憩が含まれます（実経過時間 +1h 10m）。それ以降は30分刻みで最大4.0時間まで残業が可能です。`,
        modalOtTiersTitle: "💡 残業区分＆目標退勤時刻",
        earlyOtKicker: "🟡 初期残業",
        standardOtKicker: "🟠 標準残業",
        extendedOtKicker: "🔴 延長残業",
        inclBreakTag: "+1時間10分 (休憩込)",
        breakMandatoryNote: "規定の10分間休憩が含まれます。",
        eveningExtendedNote: "夕方延長勤務時間帯。",
        maxOtDailyNote: "1日の最大許容残業枠（4.0時間）。",
        fullTableTitle: "📋 30分間隔詳細スケジュール",
        colOtTier: "残業区分",
        colDurationAdded: "加算時間",
        colTarget12: "退勤目標 (12h表記)",
        colFormat24: "24h表記",
        copyScheduleBtn: "日程をコピー",
        copiedScheduleAlert: "残業スケジュールをクリップボードにコピーしました！",
        failedCopyAlert: "コピーに失敗しました。手動でコピーしてください。",
        closeBtn: "閉じる",
        weatherAndIpuTitle: "🌤️ 天気＆大気質指数",
        weatherIpuBadge: "バンギ＆プトラジャヤ (マレーシア環境局基準)",
        liveIndicator: "LIVE",
        refreshEnvTooltip: "気象・大気データを更新",
        sonyBangiLabel: "ソニー・バンギ",
        ipuLabel: "バンギ大気汚染指数 (~10km)",
        loadingIpu: "大気データを読み込み中...",
        apimsJasLink: "マレーシア環境局 APIMS ↗",
        prayerTimesTitle: "🕌 礼拝時刻 (スランゴール州 SGR01)",
        nextPrayerPrefix: "次回：",
        fullPrayerSchedulePill: "全スケジュール",
        dateModalKicker: "勤務日を選択",
        dateModalTitle: "📅 勤務日＆業務記録",
        dateModalSubtitle: "過去または予定の勤務終了目標、残業枠、礼拝時間を確認する日付を選択します。",
        quickPresetsTitle: "⚡ クイック選択",
        todayBtn: "📌 今日",
        todaySub: "今日",
        yesterdayBtn: "⬅️ 昨日",
        yesterdaySub: "昨日",
        tomorrowBtn: "➡️ 明日",
        tomorrowSub: "明日",
        customDateSectionTitle: "⌨️ 指定日付入力",
        orUseCalendarLabel: "またはカレンダーから選択：",
        applyDateBtn: "✓ この日付を適用",
        resetDateBtn: "↺ 今日へリセット",
        invalidDateAlert: "正しい日付を入力してください (日 / 月 / 年)。",
        customDatePill: "指定日",
        changeDateBtn: "変更",
        weatherCheckingTitle: "ソニー・バンギの天気を取得中...",
        weatherCheckingMsg: "現地の気象データを取得しています...",
        weatherThunderTitle: "雷雨注意",
        weatherThunderMsg: "バンギ周辺で激しい雷雨が発生しています。屋内に留まってください。⚡",
        weatherRainTitle: "降雨注意",
        weatherRainMsg: "傘をお忘れなく！小雨が降っています。🌧️",
        weatherSunnyTitle: "晴れ",
        weatherSunnyMsg: "快晴です！今日も充実した勤務を。✨",
        otTierLabel: (hours, isMax) => `${hours.toFixed(1)} 時間 OT${isMax ? ' (最大)' : ''}`,
        otQuickLabel: (hours, isMax) => `${hours}h OT${isMax ? ' (最大)' : ''}`,
        otDurationTag: (h, m) => `+${h}時間${m}分`,
        otDurationMaxTag: (h, m) => `+${h}時間${m}分 (最大)`,
        formatDiff: (h, m) => h > 0 ? `${h}時間 ${m}分` : `${m} 分`,
        countdownPrayer: (h, m, s) => h > 0 ? `${h}時間 ${m}分` : `${m}分 ${s}秒`,
        dayLabel: "日",
        monthLabel: "月",
        yearLabel: "年",
        ipuSegGood: "良好 (0-50)",
        ipuSegMod: "普通 (51-100)",
        ipuSegUnhealthy: "不健康 (101-200)",
        ipuSegVUnhealthy: "非常に不健康 (201-300)",
        ipuSegHazard: "危険 (>300)",
        prayerNames: {
            Subuh: "ファジュル (Subuh)",
            Zohor: "ズフル (Zohor)",
            Asar: "アスル (Asar)",
            Maghrib: "マグリブ (Maghrib)",
            Isyak: "イシャー (Isyak)"
        }
    }
};

// Universal inline SVG flags that render with 100% color fidelity across Windows, iOS, Android, macOS
const renderFlagIcon = (code) => {
    switch (code) {
        case 'en':
            return (
                <span className="lang-flag-chip" aria-hidden="true">
                    <svg viewBox="0 0 640 480" className="flag-svg">
                        <path fill="#bd3d44" d="M0 0h640v480H0z"/>
                        <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/>
                        <path fill="#192f5d" d="M0 0h260v259H0z"/>
                        <g fill="#fff">
                            <circle cx="36" cy="35" r="11"/><circle cx="100" cy="35" r="11"/><circle cx="164" cy="35" r="11"/><circle cx="228" cy="35" r="11"/>
                            <circle cx="68" cy="72" r="11"/><circle cx="132" cy="72" r="11"/><circle cx="196" cy="72" r="11"/>
                            <circle cx="36" cy="109" r="11"/><circle cx="100" cy="109" r="11"/><circle cx="164" cy="109" r="11"/><circle cx="228" cy="109" r="11"/>
                            <circle cx="68" cy="146" r="11"/><circle cx="132" cy="146" r="11"/><circle cx="196" cy="146" r="11"/>
                            <circle cx="36" cy="183" r="11"/><circle cx="100" cy="183" r="11"/><circle cx="164" cy="183" r="11"/><circle cx="228" cy="183" r="11"/>
                            <circle cx="68" cy="220" r="11"/><circle cx="132" cy="220" r="11"/><circle cx="196" cy="220" r="11"/>
                        </g>
                    </svg>
                </span>
            );
        case 'ms':
            return (
                <span className="lang-flag-chip" aria-hidden="true">
                    <svg viewBox="0 0 640 480" className="flag-svg">
                        <path fill="#cc0000" d="M0 0h640v480H0z"/>
                        <path stroke="#fff" strokeWidth="34.3" d="M0 51.4h640M0 120h640M0 188.6h640M0 257.1h640M0 325.7h640M0 394.3h640M0 462.9h640"/>
                        <path fill="#000066" d="M0 0h320v274.3H0z"/>
                        <circle cx="145" cy="137" r="85" fill="#ffcc00"/>
                        <circle cx="170" cy="137" r="72" fill="#000066"/>
                        <polygon fill="#ffcc00" points="220,137 205,145 215,158 198,157 200,174 185,165 178,180 170,165 155,174 157,157 140,158 150,145 135,137 150,129 140,116 157,117 155,100 170,109 178,94 185,109 200,100 198,117 215,116 205,129"/>
                    </svg>
                </span>
            );
        case 'zh':
            return (
                <span className="lang-flag-chip" aria-hidden="true">
                    <svg viewBox="0 0 640 480" className="flag-svg">
                        <path fill="#de2910" d="M0 0h640v480H0z"/>
                        <polygon fill="#ffde00" points="100,50 115,95 160,95 124,122 138,167 100,140 62,167 76,122 40,95 85,95"/>
                        <polygon fill="#ffde00" points="185,45 188,58 200,58 190,66 194,78 185,70 176,78 180,66 170,58 182,58"/>
                        <polygon fill="#ffde00" points="220,78 223,91 235,91 225,99 229,111 220,103 211,111 215,99 205,91 217,91"/>
                        <polygon fill="#ffde00" points="220,128 223,141 235,141 225,149 229,161 220,153 211,161 215,149 205,141 217,141"/>
                        <polygon fill="#ffde00" points="185,165 188,178 200,178 190,186 194,198 185,190 176,198 180,186 170,178 182,178"/>
                    </svg>
                </span>
            );
        case 'ja':
            return (
                <span className="lang-flag-chip" aria-hidden="true">
                    <svg viewBox="0 0 640 480" className="flag-svg">
                        <path fill="#ffffff" d="M0 0h640v480H0z"/>
                        <circle cx="320" cy="240" r="144" fill="#bc002d"/>
                    </svg>
                </span>
            );
        default:
            return <i className="fa-solid fa-globe"></i>;
    }
};

function App() {
    // --- LANGUAGE STATE (Defaults to English 'en') ---
    const [lang, setLang] = useState(() => {
        const savedLang = localStorage.getItem('sony_language');
        if (savedLang && TRANSLATIONS[savedLang]) return savedLang;
        return 'en'; // default english as requested
    });

    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);

    // Active translation dictionary
    const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.en, [lang]);

    // Keep document title and HTML lang in sync with selected language
    useEffect(() => {
        document.title = t.appTitle;
        document.documentElement.lang = lang;
    }, [t, lang]);

    // Close language dropdown on outside tap / click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
                setIsLangMenuOpen(false);
            }
        };
        if (isLangMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isLangMenuOpen]);

    // --- SHIFT & TIME STATE MANAGEMENT ---
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
            const newUrl = prompt(t.portfolioEditPrompt, portfolioUrl);
            if (newUrl !== null && newUrl.trim() !== '') {
                const formatted = newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`;
                setPortfolioUrl(formatted);
                localStorage.setItem('sony_portfolio_url', formatted);
            }
        }
    };
    
    // Live Date & Time State (ticks every second)
    const [currentDate, setCurrentDate] = useState(new Date());

    // Helper: format date to YYYY-MM-DD
    const formatDateKey = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Date Selection State (Universal Date Picker & keypad support)
    const todayKey = useMemo(() => formatDateKey(currentDate), [currentDate]);
    const [selectedDateKey, setSelectedDateKey] = useState(() => formatDateKey(new Date()));
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    
    const isCustomDate = selectedDateKey !== todayKey;

    // Active Date object for calculating shifts & prayer times
    const activeDate = useMemo(() => {
        if (!selectedDateKey) return currentDate;
        const [y, m, d] = selectedDateKey.split('-').map(Number);
        return new Date(y, m - 1, d, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    }, [selectedDateKey, currentDate]);

    // Modal segmented numeric date fields (Day, Month, Year for mobile keyboard popup)
    const [modalDay, setModalDay] = useState(() => String(new Date().getDate()).padStart(2, '0'));
    const [modalMonth, setModalMonth] = useState(() => String(new Date().getMonth() + 1).padStart(2, '0'));
    const [modalYear, setModalYear] = useState(() => String(new Date().getFullYear()));

    useEffect(() => {
        if (selectedDateKey) {
            const [y, m, d] = selectedDateKey.split('-');
            setModalYear(y);
            setModalMonth(m);
            setModalDay(d);
        }
    }, [selectedDateKey]);

    // OT Details Modal State
    const [isOtModalOpen, setIsOtModalOpen] = useState(false);

    // Lock body scroll and listen for Escape key when modals are open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isOtModalOpen) setIsOtModalOpen(false);
                if (isDateModalOpen) setIsDateModalOpen(false);
                if (isLangMenuOpen) setIsLangMenuOpen(false);
            }
        };
        if (isOtModalOpen || isDateModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOtModalOpen, isDateModalOpen, isLangMenuOpen]);

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

    // IPU (Air Pollutant Index) Sony Bangi & Putrajaya States
    const [ipuData, setIpuData] = useState(() => {
        try {
            const cached = localStorage.getItem('sony_ipu_cache_v3');
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    });
    const [ipuLoading, setIpuLoading] = useState(false);

    // Prayer Time States (Full month array for instant date switches)
    const [monthPrayers, setMonthPrayers] = useState([]);
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
        fetchIpu();

        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Auto-refresh weather & IPU every 15 minutes
        const pollTimer = setInterval(() => {
            fetchWeather();
            fetchIpu();
        }, 15 * 60 * 1000);

        return () => {
            clearInterval(timer);
            clearInterval(pollTimer);
        };
    }, []);

    // Mode change handler
    const handleModeChange = (mode) => {
        setShiftMode(mode);
        localStorage.setItem('sony_shift_mode', mode);
        
        if (mode === 'half2') {
            if (timeIn < "11:45" || timeIn > "14:15") {
                handleTimeInChange("11:45");
            }
        } else if (mode === 'full') {
            let [h, m] = timeIn.split(':').map(Number);
            if (h >= 12) {
                h = h % 12;
                if (h === 0) h = 8;
                const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                handleTimeInChange(formatted < "07:00" ? "08:30" : formatted);
            } else if (timeIn >= "11:45" || timeIn < "07:00") {
                handleTimeInChange("08:30");
            }
        }
    };

    // Smart Time In Change with AM locking for Full Day & PM auto-detection for 2nd Half
    const handleTimeInChange = (newTime) => {
        if (!newTime) return;
        let [h, m] = newTime.split(':').map(Number);
        if (isNaN(h)) h = 8;
        if (isNaN(m)) m = 30;
        
        if (shiftMode === 'full') {
            // Full Day is strictly AM: If hour >= 12, convert to AM morning
            if (h >= 12) {
                h = h % 12;
                if (h === 0) h = 8;
            }
        } else if (shiftMode === 'half2') {
            // Smart PM auto-locking: If user inputs 1..6 (e.g. 02:15), convert to PM (14:15)
            if (h >= 1 && h <= 6) {
                h = h + 12;
            }
        }

        const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        setTimeIn(formatted);
        try {
            localStorage.setItem('sony_time_in', formatted);
        } catch (e) {}
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
        try {
            localStorage.setItem('sony_time_in', formatted);
        } catch (e) {}
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
        const [h, m] = baseTime.split(':').map(Number);
        const totalMins = h * 60 + m + (hoursToAdd * 60) + minutesToAdd;
        const normalized = ((totalMins % 1440) + 1440) % 1440;
        const newH = String(Math.floor(normalized / 60)).padStart(2, '0');
        const newM = String(normalized % 60).padStart(2, '0');
        return `${newH}:${newM}`;
    };

    // Locale mapping for each language
    const currentLocale = useMemo(() => {
        switch (lang) {
            case 'ms': return 'ms-MY';
            case 'zh': return 'zh-Hans-CN';
            case 'ja': return 'ja-JP';
            case 'en':
            default: return 'en-GB';
        }
    }, [lang]);

    // --- DATE & TIME FORMATTERS ---
    const formattedDate = useMemo(() => {
        return activeDate.toLocaleDateString(currentLocale, { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }, [activeDate, currentLocale]);

    const formattedTime = useMemo(() => {
        return currentDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }, [currentDate]);

    // --- WEATHER LOGIC (Sony Bangi) ---
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
        if (code === undefined) return { icon: "🌤️", title: t.weatherCheckingTitle, msg: t.weatherCheckingMsg };
        if (code >= 95) return { icon: "⛈️", title: t.weatherThunderTitle, msg: t.weatherThunderMsg };
        else if (code >= 51) return { icon: "☔", title: t.weatherRainTitle, msg: t.weatherRainMsg };
        else return { icon: "☀️", title: t.weatherSunnyTitle, msg: t.weatherSunnyMsg };
    };

    // --- ACCURATE MALAYSIAN DOE APIMS IPU LOGIC ---
    // Calculated strictly using Department of Environment (JAS / DOE) Malaysia official standards
    // PM2.5 (24h continuous), PM10 (24h continuous).
    const calculateIPUDetails = (current) => {
        if (!current) return null;

        const pm25 = typeof current.pm2_5 === 'number' ? current.pm2_5 : null;
        const pm10 = typeof current.pm10 === 'number' ? current.pm10 : null;

        // 1. PM2.5 calculation according to Malaysian DOE APIMS official breakpoints (µg/m³):
        // 0 – 12.0: IPU 0 – 50
        // 12.1 – 75.5: IPU 51 – 100
        // 75.6 – 150.4: IPU 101 – 200
        // 150.5 – 250.4: IPU 201 – 300
        // 250.5 – 350.4: IPU 301 – 400
        // > 350.4: IPU 401 – 500
        let pm25Ipu = null;
        if (pm25 !== null && !isNaN(pm25)) {
            if (pm25 <= 12.0) pm25Ipu = (50 / 12.0) * pm25;
            else if (pm25 <= 75.5) pm25Ipu = ((100 - 51) / (75.5 - 12.1)) * (pm25 - 12.1) + 51;
            else if (pm25 <= 150.4) pm25Ipu = ((200 - 101) / (150.4 - 75.6)) * (pm25 - 75.6) + 101;
            else if (pm25 <= 250.4) pm25Ipu = ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201;
            else if (pm25 <= 350.4) pm25Ipu = ((400 - 301) / (350.4 - 250.5)) * (pm25 - 250.5) + 301;
            else pm25Ipu = ((500 - 401) / (500.4 - 350.5)) * (pm25 - 350.5) + 401;
        }

        // 2. PM10 calculation according to Malaysian DOE breakpoints (µg/m³):
        // 0 – 50: IPU 0 – 50
        // 51 – 150: IPU 51 – 100
        // 151 – 350: IPU 101 – 200
        // 351 – 420: IPU 201 – 300
        // > 420: IPU 301 – 500
        let pm10Ipu = null;
        if (pm10 !== null && !isNaN(pm10)) {
            if (pm10 <= 50) pm10Ipu = pm10;
            else if (pm10 <= 150) pm10Ipu = ((100 - 51) / (150 - 51)) * (pm10 - 51) + 51;
            else if (pm10 <= 350) pm10Ipu = ((200 - 101) / (350 - 151)) * (pm10 - 151) + 101;
            else if (pm10 <= 420) pm10Ipu = ((300 - 201) / (420 - 351)) * (pm10 - 351) + 201;
            else pm10Ipu = ((400 - 301) / (500 - 421)) * (pm10 - 421) + 301;
        }

        // 3. Sub-indexes pool: Malaysian DOE APIMS standards prioritize particulate matter
        // (PM2.5 and PM10) as the primary determinant for public ambient air reporting.
        const subIndexes = [
            { name: "PM2.5", val: pm25Ipu },
            { name: "PM10", val: pm10Ipu }
        ].filter(item => typeof item.val === 'number' && !isNaN(item.val) && item.val > 0);

        let maxItem = subIndexes.length > 0 
            ? subIndexes.reduce((max, cur) => cur.val > max.val ? cur : max, subIndexes[0])
            : { name: "PM2.5", val: 50 };

        const ipuVal = Math.min(500, Math.max(0, Math.round(maxItem.val)));
        const dominant = maxItem.name;

        // Categorization & Health Advice dictionaries per language
        const categoryDict = {
            good: { en: "Good", ms: "Baik", zh: "优良", ja: "良好" },
            moderate: { en: "Moderate", ms: "Sederhana", zh: "中等", ja: "普通" },
            unhealthy: { en: "Unhealthy", ms: "Tidak Sihat", zh: "不健康", ja: "不健康" },
            veryUnhealthy: { en: "Very Unhealthy", ms: "Sangat Tidak Sihat", zh: "极不健康", ja: "非常に不健康" },
            hazardous: { en: "Hazardous", ms: "Berbahaya", zh: "危险", ja: "危険" }
        };

        const adviceDict = {
            good: {
                en: "Air quality is good. Safe for outdoor commute & activities.",
                ms: "Kualiti udara bersih & nyaman. Selamat untuk aktiviti luar dan perjalanan kerja.",
                zh: "空气质量优良，适合户外活动及日常通勤。",
                ja: "大気質は良好です。通勤や屋外活動に適しています。"
            },
            moderate: {
                en: "Moderate air quality. Safe for normal daily commute & work.",
                ms: "Kualiti udara sederhana. Tiada kesan mudarat kepada kesihatan umum.",
                zh: "空气质量中等，对一般人群日常活动无负面影响。",
                ja: "大気質は普通です。通常の通勤・生活に影響はありません。"
            },
            unhealthy: {
                en: "Unhealthy air. Sensitive individuals should reduce outdoor exposure.",
                ms: "Kualiti udara tidak sihat. Golongan berisiko dinasihatkan hadkan aktiviti luar.",
                zh: "空气不健康，敏感人群应减少户外活动。",
                ja: "健康に影響が出る可能性があります。屋外活動は控えめに。"
            },
            veryUnhealthy: {
                en: "Very unhealthy air. Wear face mask and avoid outdoor exertion.",
                ms: "Kualiti udara buruk. Pakai pelitup muka dan elakkan aktiviti fizikal di luar.",
                zh: "重度污染，建议佩戴口罩并避免剧烈户外运动。",
                ja: "大気汚染が進んでいます。マスクの着用を推奨します。"
            },
            hazardous: {
                en: "Hazardous conditions. Stay strictly indoors.",
                ms: "Amaran kecemasan! Kekal di dalam bangunan dan tutup tingkap.",
                zh: "危险污染状态，请留在室内并关闭门窗！",
                ja: "危険レベルです。原則外出を避けてください。"
            }
        };

        let catKey = "good";
        let levelClass = "good";
        let color = "#34c759";
        let icon = "🍃";

        if (ipuVal <= 50) {
            catKey = "good";
            levelClass = "good";
            color = "#34c759";
            icon = "🍃";
        } else if (ipuVal <= 100) {
            catKey = "moderate";
            levelClass = "moderate";
            color = "#0284c7";
            icon = "🌤️";
        } else if (ipuVal <= 200) {
            catKey = "unhealthy";
            levelClass = "unhealthy";
            color = "#ff9500";
            icon = "😷";
        } else if (ipuVal <= 300) {
            catKey = "veryUnhealthy";
            levelClass = "very-unhealthy";
            color = "#ff3b30";
            icon = "⚠️";
        } else {
            catKey = "hazardous";
            levelClass = "hazardous";
            color = "#af52de";
            icon = "🛑";
        }

        // Percentage for spectrum pointer (0-300+ scale)
        const scalePercent = Math.min(100, Math.max(3, (ipuVal / 300) * 100));
        const now = new Date();
        const updateTimeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });

        return {
            ipu: ipuVal,
            catKey,
            levelClass,
            color,
            icon,
            categoryDict,
            adviceDict,
            dominant,
            scalePercent,
            pm2_5: current.pm2_5 ? current.pm2_5.toFixed(1) : "--",
            pm10: current.pm10 ? current.pm10.toFixed(1) : "--",
            ozone: current.ozone ? current.ozone.toFixed(1) : "--",
            no2: current.nitrogen_dioxide ? current.nitrogen_dioxide.toFixed(1) : "--",
            co: current.carbon_monoxide ? current.carbon_monoxide.toFixed(0) : "--",
            lastUpdated: updateTimeStr
        };
    };

    const fetchIpu = async () => {
        setIpuLoading(true);
        try {
            // Direct Sony Bangi coordinates (2.9360, 101.7680)
            const res = await fetch(
                "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=2.9360&longitude=101.7680&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone"
            );
            const data = await res.json();
            if (data && data.current) {
                const processed = calculateIPUDetails(data.current);
                setIpuData(processed);
                try {
                    localStorage.setItem('sony_ipu_cache_v3', JSON.stringify(processed));
                } catch (e) {}
            }
        } catch (error) {
            console.error("Failed to fetch IPU for Sony Bangi", error);
        } finally {
            setIpuLoading(false);
        }
    };

    // --- PRAYER TIME LOGIC (Zone SGR01) ---
    const fetchPrayerTimes = async () => {
        try {
            const res = await fetch("https://api.waktusolat.app/v2/solat/SGR01");
            const data = await res.json();
            if (data && data.prayers && Array.isArray(data.prayers)) {
                setMonthPrayers(data.prayers);
            }
        } catch (error) {
            console.error("Failed to fetch prayer times", error);
        }
    };

    // Dynamic prayer times that adapt to active selected date
    useEffect(() => {
        if (!monthPrayers.length) return;
        const currentDayNum = activeDate.getDate();
        const selectedPrayers = monthPrayers.find(p => p.day === currentDayNum) || monthPrayers[currentDayNum - 1];

        if (selectedPrayers) {
            const list = [
                { name: 'Subuh', time: format12h(new Date(selectedPrayers.fajr * 1000).toTimeString().slice(0, 5)), raw: selectedPrayers.fajr },
                { name: 'Zohor', time: format12h(new Date(selectedPrayers.dhuhr * 1000).toTimeString().slice(0, 5)), raw: selectedPrayers.dhuhr },
                { name: 'Asar', time: format12h(new Date(selectedPrayers.asr * 1000).toTimeString().slice(0, 5)), raw: selectedPrayers.asr },
                { name: 'Maghrib', time: format12h(new Date(selectedPrayers.maghrib * 1000).toTimeString().slice(0, 5)), raw: selectedPrayers.maghrib },
                { name: 'Isyak', time: format12h(new Date(selectedPrayers.isha * 1000).toTimeString().slice(0, 5)), raw: selectedPrayers.isha }
            ];
            setPrayerTimes(list);
        }
    }, [monthPrayers, activeDate]);

    // Live countdown to next prayer (only for today)
    useEffect(() => {
        if (!prayerTimes.length) return;
        if (isCustomDate) {
            setNextPrayer(null);
            setTimeToNextPrayer("");
            return;
        }

        const now = Math.floor(currentDate.getTime() / 1000);
        const next = prayerTimes.find(p => p.raw > now);
        
        if (next) {
            setNextPrayer(next.name);
            const diffSeconds = next.raw - now;
            const hours = Math.floor(diffSeconds / 3600);
            const mins = Math.floor((diffSeconds % 3600) / 60);
            const secs = diffSeconds % 60;
            if (t.countdownPrayer) {
                setTimeToNextPrayer(t.countdownPrayer(hours, mins, secs));
            } else if (hours > 0) {
                setTimeToNextPrayer(`${hours}h ${mins}m`);
            } else {
                setTimeToNextPrayer(`${mins}m ${secs}s`);
            }
        } else {
            setNextPrayer(null);
            setTimeToNextPrayer("");
        }
    }, [currentDate, prayerTimes, isCustomDate, t]);

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
                earlyText = t.formatDiff ? t.formatDiff(diffH, diffM) : (diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`);
            } else if (inMins > flexEndMins) {
                type = 'late';
                minsDiff = inMins - flexEndMins;
                const diffH = Math.floor(minsDiff / 60);
                const diffM = minsDiff % 60;
                lateText = t.formatDiff ? t.formatDiff(diffH, diffM) : (diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`);
            }
        } else if (shiftMode === 'half2') {
            const maxHalf2Mins = 14 * 60 + 15; // 02:15 PM (855 mins)
            flexLimitText = '02:15 PM';

            if (inMins > maxHalf2Mins) {
                type = 'late_half2';
                minsDiff = inMins - maxHalf2Mins;
                const diffH = Math.floor(minsDiff / 60);
                const diffM = minsDiff % 60;
                lateText = t.formatDiff ? t.formatDiff(diffH, diffM) : (diffH > 0 ? `${diffH}h ${diffM}m` : `${diffM} mins`);
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
            { label: t.otTierLabel ? t.otTierLabel(1.0) : "1.0 Hour OT",            duration: t.inclBreakTag,                                              time: ot1h,   time12: format12h(ot1h) },
            { label: t.otTierLabel ? t.otTierLabel(1.5) : "1.5 Hours OT",           duration: t.otDurationTag ? t.otDurationTag(1, 40) : "+1h 40m",       time: ot1h30, time12: format12h(ot1h30) },
            { label: t.otTierLabel ? t.otTierLabel(2.0) : "2.0 Hours OT",           duration: t.otDurationTag ? t.otDurationTag(2, 10) : "+2h 10m",       time: ot2h,   time12: format12h(ot2h) },
            { label: t.otTierLabel ? t.otTierLabel(2.5) : "2.5 Hours OT",           duration: t.otDurationTag ? t.otDurationTag(2, 40) : "+2h 40m",       time: ot2h30, time12: format12h(ot2h30) },
            { label: t.otTierLabel ? t.otTierLabel(3.0) : "3.0 Hours OT",           duration: t.otDurationTag ? t.otDurationTag(3, 10) : "+3h 10m",       time: ot3h,   time12: format12h(ot3h) },
            { label: t.otTierLabel ? t.otTierLabel(3.5) : "3.5 Hours OT",           duration: t.otDurationTag ? t.otDurationTag(3, 40) : "+3h 40m",       time: ot3h30, time12: format12h(ot3h30) },
            { label: t.otTierLabel ? t.otTierLabel(4.0, true) : "4.0 Hours OT (Max)", duration: t.otDurationMaxTag ? t.otDurationMaxTag(4, 10) : "+4h 10m (Max)", time: ot4h, time12: format12h(ot4h) },
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
    }, [timeIn, shiftMode, t]);

    // --- SHIFT PROGRESS & COUNTDOWN ---
    const shiftStats = useMemo(() => {
        if (!timeIn || !calcResults) return { percent: 0, statusText: t.awaitingInput, countdownText: "", isFinished: false };

        const [inH, inM] = timeIn.split(':').map(Number);
        const [outH, outM] = calcResults.activeTarget24.split(':').map(Number);

        // Check if viewing custom date
        if (isCustomDate) {
            const todayMid = new Date(currentDate);
            todayMid.setHours(0, 0, 0, 0);

            const activeMid = new Date(activeDate);
            activeMid.setHours(0, 0, 0, 0);

            if (activeMid < todayMid) {
                return {
                    percent: 100,
                    statusText: t.pastShiftCompleted,
                    countdownText: t.pastShiftRecorded,
                    isFinished: true
                };
            } else if (activeMid > todayMid) {
                return {
                    percent: 0,
                    statusText: t.upcomingShiftScheduled,
                    countdownText: t.upcomingNotStarted,
                    isFinished: false
                };
            }
        }

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
                statusText: t.shiftNotStartedYet,
                countdownText: t.startsIn(mins),
                isFinished: false
            };
        }

        if (now >= end) {
            return {
                percent: 100,
                statusText: t.shiftCompletedTitle,
                countdownText: t.canClockOutNow,
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

        return {
            percent: Math.round(percent),
            statusText: t.shiftInProgressTitle,
            countdownText: t.timeLeftStr(remH, remM, remS),
            isFinished: false
        };
    }, [currentDate, activeDate, isCustomDate, timeIn, calcResults, t]);

    const weatherInfo = getWeatherMessage(weatherData?.weathercode);

    // --- UNIVERSAL TIME INPUT COMPONENT LOGIC ---
    const hourInputRef = useRef(null);
    const minInputRef = useRef(null);
    const nativeTimePickerRef = useRef(null);
    const nativeDatePickerRef = useRef(null);

    const [h24, m24] = useMemo(() => {
        const parts = (timeIn || "08:30").split(':').map(Number);
        return [parts[0] !== undefined ? parts[0] : 8, parts[1] !== undefined ? parts[1] : 30];
    }, [timeIn]);

    const isPM = h24 >= 12;

    const displayHour12 = useMemo(() => {
        let h12 = h24 % 12;
        if (h12 === 0) h12 = 12;
        return String(h12).padStart(2, '0');
    }, [h24]);

    const displayMin = useMemo(() => String(m24).padStart(2, '0'), [m24]);

    const [hourStr, setHourStr] = useState(displayHour12);
    const [minStr, setMinStr] = useState(displayMin);

    useEffect(() => {
        setHourStr(displayHour12);
        setMinStr(displayMin);
    }, [displayHour12, displayMin]);

    // Handle Hour Input changes with auto-advance to Minutes
    const handleHourChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 2);
        setHourStr(val);
        if (!val) return;

        let hNum = parseInt(val, 10);
        if (hNum > 12) hNum = 12;

        // Auto-advance cursor to Minute if 2 digits entered, or if 1st digit > 1 (e.g. typing 2..9)
        if (val.length === 2 || (val.length === 1 && parseInt(val, 10) > 1)) {
            minInputRef.current?.focus();
            minInputRef.current?.select();
        }

        if (hNum >= 1 && hNum <= 12) {
            applyHour(hNum);
        }
    };

    const handleHourBlur = () => {
        let hNum = parseInt(hourStr, 10);
        if (isNaN(hNum) || hNum < 1) hNum = 8;
        if (hNum > 12) hNum = 12;
        setHourStr(String(hNum).padStart(2, '0'));
        applyHour(hNum);
    };

    const applyHour = (hNum) => {
        let newH24 = hNum;
        if (shiftMode === 'full') {
            newH24 = hNum % 12;
            if (hNum === 12) newH24 = 8; // prevent midnight for morning shift
        } else {
            if (isPM && hNum < 12) newH24 = hNum + 12;
            else if (!isPM && hNum === 12) newH24 = 0;
        }
        const formatted = `${String(newH24).padStart(2, '0')}:${String(m24).padStart(2, '0')}`;
        handleTimeInChange(formatted);
    };

    const handleMinChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 2);
        setMinStr(val);
        if (!val) return;

        let mNum = parseInt(val, 10);
        if (mNum > 59) mNum = 59;
        if (mNum < 0) mNum = 0;

        if (val.length === 2) {
            applyMin(mNum);
        }
    };

    const handleMinBlur = () => {
        let mNum = parseInt(minStr, 10);
        if (isNaN(mNum) || mNum < 0) mNum = 0;
        if (mNum > 59) mNum = 59;
        setMinStr(String(mNum).padStart(2, '0'));
        applyMin(mNum);
    };

    const applyMin = (mNum) => {
        const formatted = `${String(h24).padStart(2, '0')}:${String(mNum).padStart(2, '0')}`;
        handleTimeInChange(formatted);
    };

    const handleHourKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === ':') {
            e.preventDefault();
            minInputRef.current?.focus();
            minInputRef.current?.select();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            stepHour(1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            stepHour(-1);
        }
    };

    const handleMinKeyDown = (e) => {
        if (e.key === 'Backspace' && (!minStr || minStr.length === 0)) {
            hourInputRef.current?.focus();
        } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
            hourInputRef.current?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            stepMin(e.shiftKey ? 1 : 5);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            stepMin(e.shiftKey ? -1 : -5);
        }
    };

    const stepHour = (delta) => {
        let newH = (h24 + delta + 24) % 24;
        if (shiftMode === 'full') {
            if (newH >= 12) newH = 8;
            if (newH < 7) newH = 7;
        }
        const formatted = `${String(newH).padStart(2, '0')}:${String(m24).padStart(2, '0')}`;
        handleTimeInChange(formatted);
    };

    const stepMin = (delta) => {
        let totalMins = h24 * 60 + m24 + delta;
        if (totalMins < 0) totalMins += 24 * 60;
        totalMins = totalMins % (24 * 60);
        let newH = Math.floor(totalMins / 60);
        let newM = totalMins % 60;
        if (shiftMode === 'full' && newH >= 12) newH = 8;
        const formatted = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
        handleTimeInChange(formatted);
    };

    const triggerNativeTimePicker = () => {
        if (nativeTimePickerRef.current) {
            try {
                if (typeof nativeTimePickerRef.current.showPicker === 'function') {
                    nativeTimePickerRef.current.showPicker();
                } else {
                    nativeTimePickerRef.current.click();
                }
            } catch {
                nativeTimePickerRef.current.focus();
            }
        }
    };

    // --- DATE MODAL ACTIONS ---
    const handleDatePreset = (offsetDays) => {
        const target = new Date();
        target.setDate(target.getDate() + offsetDays);
        const key = formatDateKey(target);
        setSelectedDateKey(key);
    };

    const handleApplyModalDate = () => {
        const y = parseInt(modalYear, 10);
        const m = parseInt(modalMonth, 10);
        const d = parseInt(modalDay, 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d) && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
            const key = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            setSelectedDateKey(key);
            setIsDateModalOpen(false);
        } else {
            alert(t.invalidDateAlert);
        }
    };

    const handleResetDate = () => {
        setSelectedDateKey(todayKey);
        setIsDateModalOpen(false);
    };

    // Copy OT Schedule with reliable fallback
    const handleCopySchedule = () => {
        if (calcResults?.otTableRows) {
            const summaryText = calcResults.otTableRows.map(r => `${r.label}: ${r.time12}`).join('\n');
            const textToCopy = `Sony Bangi OT Schedule (${formattedDate} | Base Out: ${calcResults.activeTarget12}):\n${summaryText}`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert(t.copiedScheduleAlert);
                }).catch(() => {
                    fallbackCopy(textToCopy);
                });
            } else {
                fallbackCopy(textToCopy);
            }
        }
    };

    const fallbackCopy = (text) => {
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            alert(t.copiedScheduleAlert);
        } catch {
            alert(t.failedCopyAlert);
        }
    };

    return (
        <div className="app-viewport">
            <header className="app-header">
                <div className="header-brand">
                    <img src="assets/icons/app-icon.png" alt="Sony Clock Icon" className="app-header-logo" />
                    <span className="logo-badge">DS4</span>
                    <div>
                        <h1>{t.appTitle}</h1>
                        <p className="subhead">{t.subhead}</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="clock-badge">
                        <button 
                            type="button" 
                            className="date-badge-btn" 
                            onClick={() => setIsDateModalOpen(true)}
                            title={t.dateModalTitle}
                            aria-label={t.dateModalTitle}
                        >
                            <i className="fa-regular fa-calendar-days"></i>
                            <span className="live-date">{formattedDate}</span>
                            {isCustomDate && <span className="custom-date-pill">{t.customDatePill}</span>}
                        </button>
                        <span className="live-time">{formattedTime}</span>
                    </div>

                    <div className="header-actions-right">
                        {/* Language Selector Dropdown */}
                        <div className="lang-dropdown-container" ref={langMenuRef}>
                            <button 
                                type="button" 
                                className="lang-btn" 
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                title="Change Language / Tukar Bahasa / 切换语言 / 言語切替"
                                aria-label="Language Selector"
                            >
                                {renderFlagIcon(lang)}
                                <span>{t.label}</span>
                                <i className={`fa-solid fa-chevron-down lang-chevron ${isLangMenuOpen ? 'open' : ''}`}></i>
                            </button>
                            {isLangMenuOpen && (
                                <div className="lang-menu">
                                    {Object.keys(TRANSLATIONS).map((k) => (
                                        <button
                                            key={k}
                                            type="button"
                                            className={`lang-menu-item ${lang === k ? 'active' : ''}`}
                                            onClick={() => {
                                                setLang(k);
                                                localStorage.setItem('sony_language', k);
                                                setIsLangMenuOpen(false);
                                            }}
                                        >
                                            <div className="lang-menu-item-left">
                                                {renderFlagIcon(k)}
                                                <span>{TRANSLATIONS[k].label}</span>
                                            </div>
                                            {lang === k && <i className="fa-solid fa-check lang-item-check"></i>}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                            <span className="portfolio-btn-text">{t.portfolio}</span>
                        </a>

                        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark/Light Mode">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
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
                            {t.fullDayMode}
                        </button>
                        <button 
                            className={`mode-btn ${shiftMode === 'half2' ? 'active' : ''}`}
                            onClick={() => handleModeChange('half2')}
                        >
                            {t.half2Mode}
                        </button>
                    </div>

                    <div className="card-header">
                        <h2>{t.shiftClockInTitle}</h2>
                        {calcResults?.isClampedEarly && (
                            <span className="status-pill pill-info">
                                {t.earlyFloorPill(calcResults.clampFloorText)}
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'early' && (
                            <span className="status-pill pill-info">
                                {t.earlyByPill(calcResults.earlyText)}
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'late' && (
                            <span className="status-pill pill-error">
                                {t.lateByPill(calcResults.lateText)}
                            </span>
                        )}
                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'valid' && (
                            <span className="status-pill pill-success">
                                {t.validFlex}
                            </span>
                        )}
                        {shiftMode === 'half2' && !calcResults?.isClampedEarly && calcResults?.type === 'valid' && (
                            <span className="status-pill pill-success">
                                {t.validHalf2}
                            </span>
                        )}
                        {shiftMode === 'half2' && calcResults?.type === 'late_half2' && (
                            <span className="status-pill pill-error">
                                {t.lateByPill(calcResults.lateText)}
                            </span>
                        )}
                    </div>

                    <div className="input-section">
                        <div className="input-header-row">
                            <label htmlFor="timeHourInput">{t.enterClockIn}</label>
                            <button 
                                type="button" 
                                className="shift-date-inline-btn" 
                                onClick={() => setIsDateModalOpen(true)}
                                title={t.dateModalTitle}
                            >
                                <i className="fa-regular fa-calendar"></i>
                                <span>{activeDate.toLocaleDateString(currentLocale, { day: 'numeric', month: 'short' })}</span>
                                {isCustomDate && <span className="custom-date-pill">{t.customDatePill}</span>}
                            </button>
                        </div>
                        
                        {/* Universal Dual-Segment Numeric Time Input (Brings up mobile keyboard on ANY phone) */}
                        <div className="time-input-container">
                            <div className="time-digit-container" onClick={() => hourInputRef.current?.focus()}>
                                <input 
                                    ref={hourInputRef}
                                    id="timeHourInput"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    className="time-digit-box"
                                    value={hourStr}
                                    placeholder="08"
                                    onChange={handleHourChange}
                                    onKeyDown={handleHourKeyDown}
                                    onBlur={handleHourBlur}
                                    aria-label="Clock-in Hour"
                                />
                                <span className="time-colon">:</span>
                                <input 
                                    ref={minInputRef}
                                    id="timeMinInput"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    className="time-digit-box"
                                    value={minStr}
                                    placeholder="30"
                                    onChange={handleMinChange}
                                    onKeyDown={handleMinKeyDown}
                                    onBlur={handleMinBlur}
                                    aria-label="Clock-in Minute"
                                />

                                {/* Steppers for rapid adjustment */}
                                <div className="time-stepper-controls">
                                    <button 
                                        type="button" 
                                        className="stepper-btn" 
                                        onClick={() => stepMin(5)}
                                        title={t.stepUpTooltip}
                                        aria-label={t.stepUpTooltip}
                                    >
                                        ▲
                                    </button>
                                    <button 
                                        type="button" 
                                        className="stepper-btn" 
                                        onClick={() => stepMin(-5)}
                                        title={t.stepDownTooltip}
                                        aria-label={t.stepDownTooltip}
                                    >
                                        ▼
                                    </button>
                                </div>

                                {/* Native OS Clock Picker Trigger */}
                                <button 
                                    type="button" 
                                    className="native-clock-btn" 
                                    onClick={triggerNativeTimePicker}
                                    title={t.clockPickerTooltip}
                                    aria-label={t.clockPickerTooltip}
                                >
                                    <i className="fa-regular fa-clock"></i>
                                </button>

                                <input 
                                    ref={nativeTimePickerRef}
                                    type="time" 
                                    step="60"
                                    value={timeIn} 
                                    onChange={(e) => handleTimeInChange(e.target.value)}
                                    className="hidden-native-picker"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                />
                            </div>
                            
                            {/* AM / PM Explicit Toggle Controls */}
                            <div className="period-toggle">
                                <button 
                                    type="button"
                                    className={`period-btn ${!isPM ? 'active' : ''}`}
                                    onClick={() => setPeriod('AM')}
                                    title={shiftMode === 'full' ? t.fullDayAmOnly : t.setAm}
                                >
                                    AM
                                </button>
                                <button 
                                    type="button"
                                    className={`period-btn ${isPM ? 'active' : ''} ${shiftMode === 'full' ? 'disabled' : ''}`}
                                    onClick={() => setPeriod('PM')}
                                    disabled={shiftMode === 'full'}
                                    title={shiftMode === 'full' ? t.fullDayAmOnly : t.setPm}
                                >
                                    PM
                                </button>
                            </div>
                        </div>

                        {/* Quick Presets */}
                        <div className="preset-container">
                            <span className="preset-label">{t.quickPresetsLabel}</span>
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

                        {/* Custom Date Notice */}
                        {isCustomDate && (
                            <div className="note-box info">
                                <span className="note-icon">📅</span>
                                <div>
                                    <strong>{t.customDateNoticeTitle}</strong> {t.customDateNoticeDesc(formattedDate)}
                                    <button 
                                        type="button"
                                        onClick={handleResetDate}
                                        style={{ marginLeft: '8px', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        {t.resetToToday}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Contextual Notes */}
                        {calcResults?.isClampedEarly && (
                            <div className="note-box info">
                                <span className="note-icon">🌅</span>
                                <div>
                                    <strong>{t.earlyClockInTitle}</strong> {t.earlyClockInDesc(calcResults.timeIn12, calcResults.clampFloorText, calcResults.halfDayExit12, calcResults.fullDayExit12)}
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'full' && calcResults?.type === 'late' && (
                            <div className="note-box error">
                                <span className="note-icon">🚨</span>
                                <div>
                                    <strong>{t.lateClockInTitle}</strong> {t.lateClockInDesc(calcResults.timeIn12, calcResults.lateText, calcResults.flexLimitText)}
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'half2' && calcResults?.type === 'late_half2' && (
                            <div className="note-box error">
                                <span className="note-icon">🚨</span>
                                <div>
                                    <strong>{t.lateHalf2Title}</strong> {t.lateHalf2Desc(calcResults.timeIn12, calcResults.lateText, calcResults.flexLimitText)}
                                </div>
                            </div>
                        )}

                        {!calcResults?.isClampedEarly && shiftMode === 'half2' && calcResults?.type !== 'late_half2' && (
                            <div className="note-box info">
                                <span className="note-icon">🌆</span>
                                <div>
                                    <strong>{t.half2WindowNoticeTitle}</strong> {t.half2WindowNoticeDesc}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* OFFICIAL SUMMARY CARDS (Time IN | Half Day | Time OUT) */}
                    {calcResults && (
                        <div className="official-summary-container">
                            <div className="summary-title">
                                {t.officialScheduleTitle(calcResults.isClampedEarly ? calcResults.clampFloorText : calcResults.timeIn12)}
                            </div>
                            
                            <div className="summary-grid">
                                <div className="summary-box box-in">
                                    <span className="s-label">{t.timeInLabel}</span>
                                    <span className="s-time">{calcResults.timeIn12}</span>
                                    <small className="s-sub">{calcResults.isClampedEarly ? t.countsAs(calcResults.clampFloorText) : timeIn}</small>
                                </div>

                                {shiftMode === 'full' && (
                                    <div className="summary-box box-half">
                                        <span className="s-label">{t.firstHalfLeaveLabel}</span>
                                        <span className="s-time">{calcResults.halfDayExit12}</span>
                                        <small className="s-sub">+4h 45m</small>
                                    </div>
                                )}

                                <div className="summary-box box-out active-mode">
                                    <span className="s-label">{shiftMode === 'half2' ? t.secondHalfOutLabel : t.timeOutLabel}</span>
                                    <span className="s-time">{shiftMode === 'half2' ? calcResults.halfDayExit12 : calcResults.fullDayExit12}</span>
                                    <small className="s-sub">{shiftMode === 'half2' ? '+4h 45m' : '+9h 30m'} {calcResults.isCapped ? t.capped7pmSub : ''}</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Standard Time Out Hero Banner */}
                    <div className={`hero-timeout-card ${calcResults?.isCapped ? 'hero-capped' : ''}`}>
                        <div className="hero-top">
                            <span className="hero-label">
                                {shiftMode === 'full' ? t.targetFullDayClockOut : t.targetHalf2ClockOut}
                            </span>
                            <span className="hero-badge">
                                {calcResults?.isCapped ? t.cappedMaxBadge : t.baseHoursBadge(shiftMode === 'full')}
                            </span>
                        </div>

                        <div className="hero-time-display">
                            {calcResults?.activeTarget12 || "--:--"}
                            <span className="hero-time-24">({calcResults?.activeTarget24})</span>
                        </div>
                        
                        {calcResults?.isCapped && (
                            <div className="capped-subtext">
                                {t.cappedDisclaimer(calcResults.lateText, calcResults.flexLimitText)}
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
                                <small>{t.shiftCompletionLabel} {shiftStats.percent}%</small>
                                <small>{t.clockInPrefix} {calcResults?.timeIn12}</small>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- RIGHT PANEL: OVERTIME BREAKDOWN --- */}
                <section className="dash-column">
                    {/* Compact OT Breakdown Preview Card */}
                    <div className="dash-card ot-compact-card">
                        <div className="card-header">
                            <div className="ot-header-title">
                                <h2>{t.otBreakdownTitle}</h2>
                                <span className="status-pill pill-info">{t.tiers30min}</span>
                            </div>
                            <button 
                                type="button" 
                                className="btn-see-more"
                                onClick={() => setIsOtModalOpen(true)}
                                title={t.seeMore}
                            >
                                <span>{t.seeMore}</span>
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </button>
                        </div>

                        {/* Quick 4-Pill Milestones */}
                        <div className="ot-quick-grid">
                            <div className="ot-quick-item" onClick={() => setIsOtModalOpen(true)} title={t.seeMore}>
                                <span className="ot-quick-label">{t.otQuickLabel ? t.otQuickLabel(1) : "1h OT"}</span>
                                <strong className="ot-quick-time">{calcResults?.otTableRows[0]?.time12 || "--:--"}</strong>
                                <small>{t.inclBreakTag}</small>
                            </div>
                            <div className="ot-quick-item" onClick={() => setIsOtModalOpen(true)} title={t.seeMore}>
                                <span className="ot-quick-label">{t.otQuickLabel ? t.otQuickLabel(2) : "2h OT"}</span>
                                <strong className="ot-quick-time">{calcResults?.otTableRows[2]?.time12 || "--:--"}</strong>
                                <small>{t.otDurationTag ? t.otDurationTag(2, 10) : "+2h 10m"}</small>
                            </div>
                            <div className="ot-quick-item" onClick={() => setIsOtModalOpen(true)} title={t.seeMore}>
                                <span className="ot-quick-label">{t.otQuickLabel ? t.otQuickLabel(3) : "3h OT"}</span>
                                <strong className="ot-quick-time">{calcResults?.otTableRows[4]?.time12 || "--:--"}</strong>
                                <small>{t.otDurationTag ? t.otDurationTag(3, 10) : "+3h 10m"}</small>
                            </div>
                            <div className="ot-quick-item highlight" onClick={() => setIsOtModalOpen(true)} title={t.seeMore}>
                                <span className="ot-quick-label">{t.otQuickLabel ? t.otQuickLabel(4, true) : "4h OT (Max)"}</span>
                                <strong className="ot-quick-time">{calcResults?.otTableRows[6]?.time12 || "--:--"}</strong>
                                <small>{t.otDurationMaxTag ? t.otDurationMaxTag(4, 10) : "+4h 10m"}</small>
                            </div>
                        </div>
                    </div>

                    {/* Unified Environment Hub (Cuaca Bangi & IPU Sony Bangi / Putrajaya) */}
                    <div className="dash-card env-card">
                        <div className="card-header env-card-header">
                            <div className="env-title-group">
                                <h2>{t.weatherAndIpuTitle}</h2>
                                <span className="status-pill pill-info">{t.weatherIpuBadge}</span>
                            </div>
                            <div className="env-header-actions">
                                <span className="live-dot-indicator" title={t.liveIndicator}>
                                    <span className="live-dot"></span> {t.liveIndicator}
                                </span>
                                <button 
                                    className={`ipu-refresh-btn ${ipuLoading ? 'spinning' : ''}`}
                                    onClick={() => { fetchWeather(); fetchIpu(); }}
                                    title={t.refreshEnvTooltip}
                                    aria-label={t.refreshEnvTooltip}
                                >
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </button>
                            </div>
                        </div>

                        <div className="env-tiles-grid">
                            {/* Left Tile: Weather at Sony Bangi */}
                            <div className="env-mini-tile weather-tile">
                                <div className="tile-top">
                                    <span className="tile-label"><i className="fa-solid fa-cloud-sun"></i> {t.sonyBangiLabel}</span>
                                    {weatherData && (
                                        <span className="temp-badge">{weatherData.temperature}°C</span>
                                    )}
                                </div>
                                <div className="weather-tile-body">
                                    <div className="weather-icon-tile">{weatherInfo.icon}</div>
                                    <div className="weather-tile-info">
                                        <h4>{weatherInfo.title}</h4>
                                        <p>{weatherInfo.msg}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Tile: Live IPU in Sony Bangi & Putrajaya */}
                            <div className={`env-mini-tile ipu-tile ipu-level-${ipuData?.levelClass || 'good'}`}>
                                <div className="tile-top">
                                    <span className="tile-label"><i className="fa-solid fa-wind"></i> {t.ipuLabel}</span>
                                    {ipuData && (
                                        <span className={`ipu-mini-pill ipu-pill-${ipuData.levelClass}`}>
                                            {ipuData.icon} {ipuData.categoryDict ? ipuData.categoryDict[ipuData.catKey][lang] : ipuData.catKey}
                                        </span>
                                    )}
                                </div>

                                {ipuData ? (
                                    <div className="ipu-tile-body">
                                        <div className="ipu-tile-score-row">
                                            <div className="ipu-tile-number-group">
                                                <span className="ipu-tile-number">{ipuData.ipu}</span>
                                                <span className="ipu-tile-unit">IPU</span>
                                            </div>
                                            <div className="ipu-tile-substats">
                                                <span>PM2.5: <strong>{ipuData.pm2_5}</strong></span>
                                                <span>PM10: <strong>{ipuData.pm10}</strong></span>
                                            </div>
                                        </div>

                                        {/* Slim Minimalist Gauge Track */}
                                        <div className="ipu-mini-track-wrap">
                                            <div className="ipu-mini-track">
                                                <div className="seg seg-good" title={t.ipuSegGood || "Good (0-50)"}></div>
                                                <div className="seg seg-mod" title={t.ipuSegMod || "Moderate (51-100)"}></div>
                                                <div className="seg seg-unhealthy" title={t.ipuSegUnhealthy || "Unhealthy (101-200)"}></div>
                                                <div className="seg seg-vunhealthy" title={t.ipuSegVUnhealthy || "Very Unhealthy (201-300)"}></div>
                                                <div className="seg seg-hazard" title={t.ipuSegHazard || "Hazardous (>300)"}></div>
                                                <div 
                                                    className="mini-pin"
                                                    style={{ left: `${ipuData.scalePercent}%` }}
                                                    title={`IPU: ${ipuData.ipu}`}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="ipu-tile-footer">
                                            <span className="ipu-tile-advice">
                                                {ipuData.adviceDict ? ipuData.adviceDict[ipuData.catKey][lang] : ""}
                                            </span>
                                            <a 
                                                href="https://apims.doe.gov.my" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="apims-mini-link"
                                                title="Official Department of Environment (JAS/DOE) APIMS Portal"
                                            >
                                                {t.apimsJasLink}
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="ipu-loading-mini">
                                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                                        <span>{t.loadingIpu}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Waktu Solat Widget */}
                    <div className="dash-card prayer-section">
                        <div className="card-header">
                            <h2>{t.prayerTimesTitle}</h2>
                            {nextPrayer ? (
                                <span className="next-prayer-pill">
                                    {t.nextPrayerPrefix} <strong>{t.prayerNames && t.prayerNames[nextPrayer] ? t.prayerNames[nextPrayer] : nextPrayer}</strong> ({timeToNextPrayer})
                                </span>
                            ) : (
                                <span className="next-prayer-pill">
                                    {isCustomDate ? formattedDate : t.fullPrayerSchedulePill}
                                </span>
                            )}
                        </div>
                        <div className="prayer-grid">
                            {prayerTimes.map((p, index) => (
                                <div key={index} className={`prayer-item ${nextPrayer === p.name ? 'active-prayer' : ''}`}>
                                    <span className="p-name">{t.prayerNames && t.prayerNames[p.name] ? t.prayerNames[p.name] : p.name}</span>
                                    <span className="p-time">{p.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* --- DATE SELECTOR MODAL (Universal Mobile & Desktop) --- */}
            {isDateModalOpen && (
                <div className="modal-overlay" onClick={() => setIsDateModalOpen(false)}>
                    <div className="modal-dialog date-modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-top-bar">
                            <span className="modal-kicker-pill">{t.dateModalKicker}</span>
                            <button 
                                type="button" 
                                className="modal-close-btn" 
                                onClick={() => setIsDateModalOpen(false)}
                                aria-label={t.closeBtn}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="modal-header-text">
                            <h2>{t.dateModalTitle}</h2>
                            <p>{t.dateModalSubtitle}</p>
                        </div>

                        <div className="modal-body">
                            {/* Quick Presets */}
                            <div className="modal-section">
                                <span className="section-title">{t.quickPresetsTitle}</span>
                                <div className="date-presets-row">
                                    <button 
                                        type="button" 
                                        className={`btn-date-preset ${selectedDateKey === todayKey ? 'active' : ''}`}
                                        onClick={() => handleDatePreset(0)}
                                    >
                                        <span>{t.todayBtn}</span>
                                        <small>{t.todaySub}</small>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-date-preset"
                                        onClick={() => handleDatePreset(-1)}
                                    >
                                        <span>{t.yesterdayBtn}</span>
                                        <small>{t.yesterdaySub}</small>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-date-preset"
                                        onClick={() => handleDatePreset(1)}
                                    >
                                        <span>{t.tomorrowBtn}</span>
                                        <small>{t.tomorrowSub}</small>
                                    </button>
                                </div>
                            </div>

                            {/* Direct Date Entry with Mobile Numeric Keyboard */}
                            <div className="modal-section">
                                <span className="section-title">{t.customDateSectionTitle}</span>
                                <div className="date-inputs-card">
                                    <div className="date-numeric-container">
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            pattern="[0-9]*" 
                                            maxLength={2}
                                            className="date-num-box date-num-day" 
                                            placeholder="DD"
                                            value={modalDay} 
                                            onChange={(e) => setModalDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                            aria-label={t.dayLabel || "Day"}
                                        />
                                        <span className="date-sep">/</span>
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            pattern="[0-9]*" 
                                            maxLength={2}
                                            className="date-num-box date-num-month" 
                                            placeholder="MM"
                                            value={modalMonth} 
                                            onChange={(e) => setModalMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                            aria-label={t.monthLabel || "Month"}
                                        />
                                        <span className="date-sep">/</span>
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            pattern="[0-9]*" 
                                            maxLength={4}
                                            className="date-num-box date-num-year" 
                                            placeholder="YYYY"
                                            value={modalYear} 
                                            onChange={(e) => setModalYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            aria-label={t.yearLabel || "Year"}
                                        />
                                    </div>

                                    {/* Native Calendar Picker Alternative */}
                                    <div className="date-native-row">
                                        <span className="date-native-label">{t.orUseCalendarLabel}</span>
                                        <input 
                                            ref={nativeDatePickerRef}
                                            type="date" 
                                            className="date-native-input" 
                                            value={selectedDateKey} 
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    setSelectedDateKey(e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="modal-btn modal-btn-secondary" 
                                onClick={handleResetDate}
                            >
                                {t.resetDateBtn}
                            </button>
                            <button 
                                type="button" 
                                className="modal-btn modal-btn-primary" 
                                onClick={handleApplyModalDate}
                            >
                                {t.applyDateBtn}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- OVERTIME DETAILS MODAL (Pop-up matching reference design) --- */}
            {isOtModalOpen && (
                <div className="modal-overlay" onClick={() => setIsOtModalOpen(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="modal-top-bar">
                            <span className="modal-kicker-pill">{t.modalOtKicker}</span>
                            <button 
                                type="button" 
                                className="modal-close-btn" 
                                onClick={() => setIsOtModalOpen(false)}
                                aria-label={t.closeBtn}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="modal-header-text">
                            <h2>{t.modalOtTitle}</h2>
                            <p>
                                {t.modalOtSubtitle(calcResults?.activeTarget12, calcResults?.activeTarget24, shiftMode === 'full' ? t.fullDayMode : t.half2Mode, formattedDate)}
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            {/* Policy Overview Section */}
                            <div className="modal-section">
                                <h3 className="section-title">{t.modalOtPolicyTitle}</h3>
                                <p className="section-desc">
                                    {t.modalOtPolicyDesc(calcResults?.activeTarget12)}
                                </p>
                            </div>

                            {/* 3-Cards Architecture */}
                            <div className="modal-section">
                                <h3 className="section-title">{t.modalOtTiersTitle}</h3>
                                <div className="modal-cards-grid">
                                    {/* Card 1: Early OT */}
                                    <div className="modal-inner-card">
                                        <div className="card-kicker">{t.earlyOtKicker}</div>
                                        <ul className="modal-tier-list">
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(1.0) : "1.0 Hour OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[0]?.time12}</strong>
                                                <small className="tier-gap">{t.inclBreakTag}</small>
                                            </li>
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(1.5) : "1.5 Hours OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[1]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationTag ? t.otDurationTag(1, 40) : "+1h 40m"}</small>
                                            </li>
                                        </ul>
                                        <div className="card-note">{t.breakMandatoryNote}</div>
                                    </div>

                                    {/* Card 2: Mid OT */}
                                    <div className="modal-inner-card">
                                        <div className="card-kicker">{t.standardOtKicker}</div>
                                        <ul className="modal-tier-list">
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(2.0) : "2.0 Hours OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[2]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationTag ? t.otDurationTag(2, 10) : "+2h 10m"}</small>
                                            </li>
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(2.5) : "2.5 Hours OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[3]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationTag ? t.otDurationTag(2, 40) : "+2h 40m"}</small>
                                            </li>
                                        </ul>
                                        <div className="card-note">{t.eveningExtendedNote}</div>
                                    </div>

                                    {/* Card 3: Extended / Max OT */}
                                    <div className="modal-inner-card">
                                        <div className="card-kicker">{t.extendedOtKicker}</div>
                                        <ul className="modal-tier-list">
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(3.0) : "3.0 Hours OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[4]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationTag ? t.otDurationTag(3, 10) : "+3h 10m"}</small>
                                            </li>
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(3.5) : "3.5 Hours OT"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[5]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationTag ? t.otDurationTag(3, 40) : "+3h 40m"}</small>
                                            </li>
                                            <li>
                                                <span className="tier-name">{t.otTierLabel ? t.otTierLabel(4.0, true) : "4.0 Hours OT (Max)"}:</span>
                                                <strong className="tier-time">{calcResults?.otTableRows[6]?.time12}</strong>
                                                <small className="tier-gap">{t.otDurationMaxTag ? t.otDurationMaxTag(4, 10) : "+4h 10m (Max)"}</small>
                                            </li>
                                        </ul>
                                        <div className="card-note">{t.maxOtDailyNote}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Complete 30-Min Schedule Table */}
                            <div className="modal-section">
                                <h3 className="section-title">{t.fullTableTitle}</h3>
                                <div className="table-responsive modal-table-wrap">
                                    <table className="ot-table modal-ot-table">
                                        <thead>
                                            <tr>
                                                <th>{t.colOtTier}</th>
                                                <th>{t.colDurationAdded}</th>
                                                <th>{t.colTarget12}</th>
                                                <th>{t.colFormat24}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {calcResults?.otTableRows.map((row, index) => (
                                                <tr key={index}>
                                                    <td><span className="ot-badge">{row.label}</span></td>
                                                    <td className="text-secondary">{row.duration}</td>
                                                    <td className="ot-time-cell">{row.time12}</td>
                                                    <td className="text-secondary font-mono">{row.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="modal-btn modal-btn-secondary" 
                                onClick={handleCopySchedule}
                            >
                                <i className="fa-regular fa-copy"></i> {t.copyScheduleBtn}
                            </button>
                            <button 
                                type="button" 
                                className="modal-btn modal-btn-close" 
                                onClick={() => setIsOtModalOpen(false)}
                            >
                                {t.closeBtn}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);