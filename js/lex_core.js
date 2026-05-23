/**
 * LEX CORE - SHARED UI LOGIC (POMODORO & THEME)
 * Consolidates persistence and UI across all pages.
 */

const LexCore = {
    // Timer State
    workTime: parseInt(localStorage.getItem('lex-pomo-work')) || 25,
    breakTime: parseInt(localStorage.getItem('lex-pomo-break')) || 5,
    state: localStorage.getItem('lex-pomo-state') || 'idle', // 'work', 'break', 'idle'
    endTime: parseInt(localStorage.getItem('lex-pomo-end')) || 0,
    
    // Theme State
    theme: localStorage.getItem('lex-theme') || 'dark',

    init() {
        this.applyTheme();
        this.renderUI();
        this.attachListeners();
        this.startSync();
        this.tick();
    },

    // --- THEME LOGIC ---
    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        this.updateThemeIcons();
    },

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('lex-theme', this.theme);
        this.applyTheme();
    },

    updateThemeIcons() {
        const sun = document.getElementById('sun-icon');
        const moon = document.getElementById('moon-icon');
        if (sun && moon) {
            sun.style.display = this.theme === 'light' ? 'block' : 'none';
            moon.style.display = this.theme === 'light' ? 'none' : 'block';
        }
    },

    // --- POMODORO LOGIC ---
    renderUI() {
        const controls = document.querySelector('.header-controls');
        if (!controls) return;

        // Clean up any existing elements
        const existingPomo = document.getElementById('lex-pomo-container');
        if (existingPomo) existingPomo.remove();
        const existingOverlay = document.getElementById('lex-break-overlay');
        if (existingOverlay) existingOverlay.remove();

        const pomoHTML = `
            <div id="lex-pomo-container" class="pomodoro-mini ${this.state === 'break' ? 'on-break' : ''}">
                <div id="lex-pomo-settings" class="pomo-settings-popup" style="display:none;">
                    <div class="setting-row">
                        <label>Studio (min)</label>
                        <input type="number" id="lex-input-work" value="${this.workTime}" min="1">
                    </div>
                    <div class="setting-row">
                        <label>Pausa (min)</label>
                        <input type="number" id="lex-input-break" value="${this.breakTime}" min="1">
                    </div>
                    <button id="lex-save-pomo">Salva Impostazioni</button>
                </div>
                
                <span id="lex-pomo-label" class="pomo-label" style="display: ${this.state === 'idle' ? 'none' : 'block'}">
                    ${this.state === 'work' ? 'Studio' : 'Pausa'}
                </span>
                
                <span id="lex-pomo-timer" class="pomo-timer-display">${this.getDisplayTime()}</span>
                
                <button id="lex-pomo-start" class="pomo-btn" title="Avvia/Stop">
                    ${this.getStartIcon()}
                </button>
                
                <button id="lex-pomo-settings-btn" class="pomo-settings-btn" title="Impostazioni">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
            </div>
            
            <div id="lex-break-overlay" class="break-lock-overlay" style="display: ${this.state === 'break' ? 'flex' : 'none'}">
                <div class="break-content">
                    <h2>Mente in Riposo</h2>
                    <p>Lo studio è sospeso per permettere la sedimentazione dei concetti.</p>
                    <div id="lex-break-timer" class="break-timer-big">${this.getDisplayTime()}</div>
                    <p class="break-quote">"Il riposo non è ozio, ma nutrimento per lo spirito accademico."</p>
                </div>
            </div>
        `;

        controls.insertAdjacentHTML('afterbegin', pomoHTML);
    },

    getDisplayTime() {
        if (this.state === 'idle') return `${this.workTime.toString().padStart(2, '0')}:00`;
        const now = Date.now();
        const diff = Math.max(0, Math.floor((this.endTime - now) / 1000));
        const m = Math.floor(diff / 60);
        const s = diff % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    },

    getStartIcon() {
        if (this.state === 'idle') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    },

    attachListeners() {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) themeBtn.onclick = () => this.toggleTheme();

        const startBtn = document.getElementById('lex-pomo-start');
        const settingsBtn = document.getElementById('lex-pomo-settings-btn');
        const saveBtn = document.getElementById('lex-save-pomo');
        const settingsPopup = document.getElementById('lex-pomo-settings');

        startBtn?.addEventListener('click', () => {
            if (this.state === 'idle') this.startTimer('work', this.workTime);
            else this.stopTimer();
        });

        settingsBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsPopup.style.display = settingsPopup.style.display === 'none' ? 'block' : 'none';
        });

        saveBtn?.addEventListener('click', () => {
            const w = parseInt(document.getElementById('lex-input-work').value);
            const b = parseInt(document.getElementById('lex-input-break').value);
            if (w > 0 && b > 0) {
                this.workTime = w;
                this.breakTime = b;
                localStorage.setItem('lex-pomo-work', w);
                localStorage.setItem('lex-pomo-break', b);
                settingsPopup.style.display = 'none';
                this.updateUI();
            }
        });

        document.addEventListener('click', (e) => {
            if (settingsPopup && !settingsPopup.contains(e.target) && e.target !== settingsBtn) {
                settingsPopup.style.display = 'none';
            }
        });
    },

    startTimer(type, mins) {
        this.state = type;
        this.endTime = Date.now() + (mins * 60 * 1000);
        this.saveState();
        this.updateUI();
        this.notify();
    },

    stopTimer() {
        this.state = 'idle';
        this.endTime = 0;
        this.saveState();
        this.updateUI();
        this.notify();
    },

    saveState() {
        localStorage.setItem('lex-pomo-state', this.state);
        localStorage.setItem('lex-pomo-end', this.endTime);
    },

    updateUI() {
        const t = document.getElementById('lex-pomo-timer');
        const bt = document.getElementById('lex-break-timer');
        const l = document.getElementById('lex-pomo-label');
        const o = document.getElementById('lex-break-overlay');
        const c = document.getElementById('lex-pomo-container');
        const s = document.getElementById('lex-pomo-start');

        const timeStr = this.getDisplayTime();
        if (t) t.textContent = timeStr;
        if (bt) bt.textContent = timeStr;
        if (l) {
            l.style.display = this.state === 'idle' ? 'none' : 'block';
            l.textContent = this.state === 'work' ? 'Studio' : 'Pausa';
        }
        if (o) o.style.display = this.state === 'break' ? 'flex' : 'none';
        if (c) {
            if (this.state === 'break') c.classList.add('on-break');
            else c.classList.remove('on-break');
        }
        if (s) s.innerHTML = this.getStartIcon();
    },

    tick() {
        setInterval(() => {
            if (this.state === 'idle') return;
            const now = Date.now();
            if (now >= this.endTime) {
                if (this.state === 'work') {
                    this.startTimer('break', this.breakTime);
                    alert('Sessione di studio completata! Inizia la pausa.');
                } else {
                    this.stopTimer();
                    alert('Pausa terminata! Sei pronto a riprendere?');
                }
            } else {
                this.updateUI();
            }
        }, 1000);
    },

    startSync() {
        window.addEventListener('storage', (e) => {
            if (e.key.startsWith('lex-')) {
                this.workTime = parseInt(localStorage.getItem('lex-pomo-work')) || 25;
                this.breakTime = parseInt(localStorage.getItem('lex-pomo-break')) || 5;
                this.state = localStorage.getItem('lex-pomo-state') || 'idle';
                this.endTime = parseInt(localStorage.getItem('lex-pomo-end')) || 0;
                this.theme = localStorage.getItem('lex-theme') || 'dark';
                this.applyTheme();
                this.updateUI();
            }
        });
    },

    notify() {
        localStorage.setItem('lex-sync', Date.now());
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LexCore.init());
} else {
    LexCore.init();
}
