/**
 * SHARED POMODORO TIMER LOGIC - LEX STUDIORUM
 * Handles persistence across pages using localStorage and BroadcastChannel
 */

const PomoTimer = {
    workTime: parseInt(localStorage.getItem('pomo-work-min')) || 25,
    breakTime: parseInt(localStorage.getItem('pomo-break-min')) || 5,
    state: localStorage.getItem('pomo-state') || 'idle', // 'work', 'break', 'idle'
    endTime: parseInt(localStorage.getItem('pomo-end-time')) || 0,
    interval: null,

    init() {
        this.renderUI();
        this.attachListeners();
        this.startSync();
        this.tick();
    },

    renderUI() {
        const controls = document.querySelector('.header-controls');
        if (!controls) return;

        // Remove old if exists
        const oldPomo = document.getElementById('pomodoro-container');
        if (oldPomo) oldPomo.remove();

        const pomoHTML = `
            <div id="pomodoro-container" class="pomodoro-mini ${this.state === 'break' ? 'on-break' : ''}">
                <div class="pomo-settings-popup" id="pomo-settings" style="display:none;">
                    <div class="setting-row">
                        <label>Studio (min):</label>
                        <input type="number" id="input-work" value="${this.workTime}" min="1" max="60">
                    </div>
                    <div class="setting-row">
                        <label>Pausa (min):</label>
                        <input type="number" id="input-break" value="${this.breakTime}" min="1" max="30">
                    </div>
                    <button id="save-pomo-settings">Salva</button>
                </div>
                <span id="pomo-label" style="font-size: 0.7rem; color: var(--text-muted); margin-right: 4px; display: ${this.state === 'idle' ? 'none' : 'block'}">${this.state === 'work' ? 'STUDIO' : 'PAUSA'}</span>
                <span id="pomo-timer" class="timer-display">${this.getDisplayTime()}</span>
                <button id="pomo-start-btn" class="pomo-btn">
                    ${this.getButtonIcon()}
                </button>
                <button id="pomo-settings-btn" class="pomo-settings-btn" title="Impostazioni">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
            </div>
            <div id="break-overlay" class="break-lock-overlay" style="display: ${this.state === 'break' ? 'flex' : 'none'}">
                <div class="break-content">
                    <h2>Tempo di Pausa!</h2>
                    <p>Lo studio è bloccato per rigenerare la mente.</p>
                    <div class="break-timer" id="break-timer-display">${this.getDisplayTime()}</div>
                    <p class="break-quote">"La bellezza richiede riposo per essere compresa."</p>
                </div>
            </div>
        `;
        controls.insertAdjacentHTML('beforeend', pomoHTML);
    },

    getDisplayTime() {
        if (this.state === 'idle') return `${this.workTime}:00`;
        const now = Date.now();
        const diff = Math.max(0, Math.floor((this.endTime - now) / 1000));
        const m = Math.floor(diff / 60);
        const s = diff % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    },

    getButtonIcon() {
        if (this.state === 'idle') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    },

    attachListeners() {
        const startBtn = document.getElementById('pomo-start-btn');
        const settingsBtn = document.getElementById('pomo-settings-btn');
        const saveBtn = document.getElementById('save-pomo-settings');
        const settingsPopup = document.getElementById('pomo-settings');

        startBtn?.addEventListener('click', () => this.toggleTimer());
        settingsBtn?.addEventListener('click', () => {
            settingsPopup.style.display = settingsPopup.style.display === 'none' ? 'block' : 'none';
        });

        saveBtn?.addEventListener('click', () => {
            this.workTime = parseInt(document.getElementById('input-work').value);
            this.breakTime = parseInt(document.getElementById('input-break').value);
            localStorage.setItem('pomo-work-min', this.workTime);
            localStorage.setItem('pomo-break-min', this.breakTime);
            settingsPopup.style.display = 'none';
            if (this.state === 'idle') {
                document.getElementById('pomo-timer').textContent = `${this.workTime}:00`;
            }
        });
    },

    toggleTimer() {
        if (this.state !== 'idle') {
            this.stopTimer();
        } else {
            this.startTimer('work', this.workTime);
        }
    },

    startTimer(type, minutes) {
        this.state = type;
        this.endTime = Date.now() + (minutes * 60 * 1000);
        this.saveState();
        this.updateUI();
        this.notifyOthers();
    },

    stopTimer() {
        this.state = 'idle';
        this.endTime = 0;
        this.saveState();
        this.updateUI();
        this.notifyOthers();
    },

    saveState() {
        localStorage.setItem('pomo-state', this.state);
        localStorage.setItem('pomo-end-time', this.endTime);
    },

    updateUI() {
        const timerDisplay = document.getElementById('pomo-timer');
        const breakDisplay = document.getElementById('break-timer-display');
        const startBtn = document.getElementById('pomo-start-btn');
        const label = document.getElementById('pomo-label');
        const overlay = document.getElementById('break-overlay');
        const container = document.getElementById('pomodoro-container');

        const timeStr = this.getDisplayTime();
        if (timerDisplay) timerDisplay.textContent = timeStr;
        if (breakDisplay) breakDisplay.textContent = timeStr;
        
        if (label) {
            label.style.display = this.state === 'idle' ? 'none' : 'block';
            label.textContent = this.state === 'work' ? 'STUDIO' : 'PAUSA';
        }

        if (startBtn) startBtn.innerHTML = this.getButtonIcon();
        
        if (overlay) overlay.style.display = this.state === 'break' ? 'flex' : 'none';
        if (container) {
            if (this.state === 'break') container.classList.add('on-break');
            else container.classList.remove('on-break');
        }
    },

    tick() {
        setInterval(() => {
            if (this.state === 'idle') return;

            const now = Date.now();
            if (now >= this.endTime) {
                if (this.state === 'work') {
                    this.startTimer('break', this.breakTime);
                    alert('Tempo di studio terminato! Inizia la pausa.');
                } else {
                    this.stopTimer();
                    alert('Pausa terminata! Sei pronto per riprendere?');
                }
            } else {
                this.updateUI();
            }
        }, 1000);
    },

    startSync() {
        // Sync across tabs
        window.addEventListener('storage', (e) => {
            if (e.key.startsWith('pomo-')) {
                this.workTime = parseInt(localStorage.getItem('pomo-work-min')) || 25;
                this.breakTime = parseInt(localStorage.getItem('pomo-break-min')) || 5;
                this.state = localStorage.getItem('pomo-state') || 'idle';
                this.endTime = parseInt(localStorage.getItem('pomo-end-time')) || 0;
                this.updateUI();
            }
        });
    },

    notifyOthers() {
        // Trigger storage event in other tabs
        localStorage.setItem('pomo-sync', Date.now());
    }
};

document.addEventListener('DOMContentLoaded', () => PomoTimer.init());
