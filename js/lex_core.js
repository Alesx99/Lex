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

    // Focus Player State
    focusSound: localStorage.getItem('lex-focus-sound') || 'none',
    focusVolume: parseFloat(localStorage.getItem('lex-focus-volume') ?? '0.5'),
    focusAudioCtx: null,
    focusSourceNode: null,
    focusGainNode: null,
    focusPlaying: false,
    focusLfoNodes: [],
    focusOscNodes: [],

    // TTS State variables
    ttsBlocks: [],
    ttsCurrentIndex: -1,
    ttsUtterance: null,
    ttsIsSpeaking: false,
    ttsIsPaused: false,
    ttsSpeed: 1.0,

    // Cloud Restore state
    isRestoring: false,

    init() {
        this.applyTheme();
        this.renderUI();
        this.attachListeners();
        this.attachCloudListeners();
        this.checkOAuthCallback();
        this.setupLocalStorageProxy();
        this.startSync();
        this.tick();
        this.initTTS();

        // Track visited pages for achievements
        try {
            let pageName = window.location.pathname.split('/').pop() || 'index.html';
            if (!pageName) pageName = 'index.html';
            const visited = JSON.parse(localStorage.getItem('lex-visited-pages') || '[]');
            if (!visited.includes(pageName)) {
                visited.push(pageName);
                localStorage.setItem('lex-visited-pages', JSON.stringify(visited));
            }
        } catch(e) {
            console.error("Errore tracciamento pagine visitate:", e);
        }

        // Hook global sweet features
        window.addEventListener('load', () => this.hookGlobalFeatures());
        setTimeout(() => this.hookGlobalFeatures(), 600);
        this.updateBrandName();
    },

    // --- THEME LOGIC ---
    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('coccole-theme');
            this.stopFloatingHeartsBackground();
        } else if (this.theme === 'coccole') {
            document.body.classList.add('coccole-theme');
            document.body.classList.remove('light-theme');
            this.startFloatingHeartsBackground();
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.remove('coccole-theme');
            this.stopFloatingHeartsBackground();
        }
        this.updateThemeIcons();
        this.updateBrandName();
    },

    toggleTheme() {
        const now = Date.now();
        if (now - (this.lastThemeClick || 0) < 500) {
            this.themeClickCount = (this.themeClickCount || 0) + 1;
            if (this.themeClickCount >= 4) { // 5 consecutive clicks within 500ms intervals
                this.theme = 'coccole';
                localStorage.setItem('lex-theme', this.theme);
                this.applyTheme();
                this.themeClickCount = 0;
                alert("💕 Modalità Coccole Attivata! 💕\nI colori si sono addolciti e l'amore è nell'aria!");
                return;
            }
        } else {
            this.themeClickCount = 0;
        }
        this.lastThemeClick = now;

        if (this.theme === 'coccole') {
            this.theme = 'dark';
        } else {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
        }
        localStorage.setItem('lex-theme', this.theme);
        this.applyTheme();
    },

    updateThemeIcons() {
        const sun = document.getElementById('sun-icon');
        const moon = document.getElementById('moon-icon');
        if (sun && moon) {
            if (this.theme === 'coccole') {
                sun.style.display = 'none';
                moon.style.display = 'block';
            } else {
                sun.style.display = this.theme === 'light' ? 'block' : 'none';
                moon.style.display = this.theme === 'light' ? 'none' : 'block';
            }
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

        const currentProvider = localStorage.getItem('lex-cloud-provider') || 'none';
        const isAutosave = localStorage.getItem('lex-cloud-autosave') === 'true';

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
                    
                    <div class="pomo-divider"></div>
                    
                    <div class="backup-section">
                        <span class="backup-title">Backup Dati Studio</span>
                        <div style="display:flex; gap:0.4rem;">
                            <button id="lex-export-btn" class="backup-btn btn-export" style="flex:1;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                                Esporta
                            </button>
                            <button id="lex-import-btn" class="backup-btn btn-import" style="flex:1;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                                Importa
                            </button>
                        </div>
                        <input type="file" id="lex-import-file" style="display:none;" accept=".json">
                        
                        <button id="lex-cloud-toggle-btn" class="backup-btn btn-export" style="margin-top:0.4rem; justify-content: space-between;">
                            <span style="display:flex; align-items:center; gap:0.4rem;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                Sync Cloud
                            </span>
                            <span id="lex-cloud-badge" class="cloud-status-dot"></span>
                        </button>
                        
                        <div id="lex-cloud-section" class="cloud-sync-section" style="display:none; border-top:1px solid var(--border-color); padding-top:0.6rem; margin-top:0.4rem; display:flex; flex-direction:column; gap:0.5rem;">
                            <div class="setting-row" style="margin-bottom:0.5rem;">
                                <label style="font-size:0.6rem;">Provider Cloud</label>
                                <select id="lex-cloud-provider" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:6px; color:var(--text-primary); padding:0.4rem; font-size:0.75rem; outline:none;">
                                    <option value="none" ${currentProvider === 'none' ? 'selected' : ''}>Disattivato</option>
                                    <option value="gdrive" ${currentProvider === 'gdrive' ? 'selected' : ''}>Google Drive</option>
                                    <option value="dropbox" ${currentProvider === 'dropbox' ? 'selected' : ''}>Dropbox</option>
                                    <option value="webdav" ${currentProvider === 'webdav' ? 'selected' : ''}>WebDAV</option>
                                </select>
                            </div>
                            
                            <!-- GDrive fields -->
                            <div id="lex-cloud-gdrive-fields" style="display:none; flex-direction:column; gap:0.4rem;">
                                <div class="setting-row" style="margin-bottom:0.4rem;">
                                    <label style="font-size:0.6rem;">Google Client ID</label>
                                    <input type="text" id="lex-gdrive-client-id" placeholder="Inserisci Client ID" style="padding:0.4rem; font-size:0.75rem;">
                                    <small style="font-size:0.55rem; color:var(--text-muted); display:block; margin-top:0.2rem; line-height:1.2;">Redirect URI autorizzato:<br><code id="lex-gdrive-redirect-uri" style="word-break:break-all; font-family:monospace; background:rgba(0,0,0,0.2); padding:1px 3px; border-radius:3px;"></code></small>
                                </div>
                                <button id="lex-gdrive-connect-btn" class="backup-btn btn-import" style="padding:0.4rem; font-size:0.7rem;">Connetti Account</button>
                            </div>
                            
                            <!-- Dropbox fields -->
                            <div id="lex-cloud-dropbox-fields" style="display:none; flex-direction:column; gap:0.4rem;">
                                <div class="setting-row" style="margin-bottom:0.4rem;">
                                    <label style="font-size:0.6rem;">Dropbox App Key</label>
                                    <input type="text" id="lex-dropbox-client-id" placeholder="Inserisci App Key" style="padding:0.4rem; font-size:0.75rem;">
                                    <small style="font-size:0.55rem; color:var(--text-muted); display:block; margin-top:0.2rem; line-height:1.2;">Redirect URI autorizzato:<br><code id="lex-dropbox-redirect-uri" style="word-break:break-all; font-family:monospace; background:rgba(0,0,0,0.2); padding:1px 3px; border-radius:3px;"></code></small>
                                </div>
                                <button id="lex-dropbox-connect-btn" class="backup-btn btn-import" style="padding:0.4rem; font-size:0.7rem;">Connetti Account</button>
                            </div>
                            
                            <!-- WebDAV fields -->
                            <div id="lex-cloud-webdav-fields" style="display:none; flex-direction:column; gap:0.4rem;">
                                <div class="setting-row" style="margin-bottom:0.4rem;">
                                    <label style="font-size:0.6rem;">URL Server WebDAV</label>
                                    <input type="text" id="lex-webdav-url" placeholder="https://esempio.com/remote.php/dav/files/user/" style="padding:0.4rem; font-size:0.75rem;">
                                </div>
                                <div class="setting-row" style="margin-bottom:0.4rem;">
                                    <label style="font-size:0.6rem;">Username</label>
                                    <input type="text" id="lex-webdav-user" placeholder="Username" style="padding:0.4rem; font-size:0.75rem;">
                                </div>
                                <div class="setting-row" style="margin-bottom:0.4rem;">
                                    <label style="font-size:0.6rem;">Password / Token</label>
                                    <input type="password" id="lex-webdav-pass" placeholder="Password" style="padding:0.4rem; font-size:0.75rem;">
                                </div>
                                <button id="lex-webdav-connect-btn" class="backup-btn btn-import" style="padding:0.4rem; font-size:0.7rem;">Salva & Collega</button>
                            </div>
                            
                            <!-- Sync Actions -->
                            <div id="lex-cloud-sync-actions" style="display:none; flex-direction:column; gap:0.4rem; margin-top:0.2rem;">
                                <span id="lex-cloud-status" style="font-size:0.65rem; font-weight:700; color:var(--accent-gold); text-align:center; display:block;">Stato: Non Connesso</span>
                                <div style="display:flex; gap:0.3rem;">
                                    <button id="lex-cloud-upload-btn" class="backup-btn btn-export" style="flex:1; padding:0.4rem; font-size:0.7rem;">Carica</button>
                                    <button id="lex-cloud-download-btn" class="backup-btn btn-import" style="flex:1; padding:0.4rem; font-size:0.7rem;">Scarica</button>
                                </div>
                                
                                <label style="display:flex; align-items:center; gap:0.3rem; font-size:0.65rem; color:var(--text-secondary); cursor:pointer; margin-top:0.2rem; user-select:none;">
                                    <input type="checkbox" id="lex-cloud-autosave" ${isAutosave ? 'checked' : ''}>
                                    Salvataggio automatico
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pomo-divider"></div>
                    
                    <div class="focus-player-section">
                        <span class="backup-title">Focus Player 🎧</span>
                        <div class="setting-row" style="margin-top: 0.4rem;">
                            <label style="font-size:0.7rem;">Suono Ambientale</label>
                            <select id="lex-focus-sound" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:6px; color:var(--text-primary); padding:0.4rem; font-size:0.75rem; outline:none; font-family:inherit;">
                                <option value="none" ${this.focusSound === 'none' ? 'selected' : ''}>Nessuno</option>
                                <option value="white" ${this.focusSound === 'white' ? 'selected' : ''}>Rumore Bianco</option>
                                <option value="brown" ${this.focusSound === 'brown' ? 'selected' : ''}>Rumore Marrone</option>
                                <option value="rain" ${this.focusSound === 'rain' ? 'selected' : ''}>Pioggia Battente</option>
                                <option value="ocean" ${this.focusSound === 'ocean' ? 'selected' : ''}>Onde del Mare</option>
                                <option value="drone" ${this.focusSound === 'drone' ? 'selected' : ''}>Drone Ambientale</option>
                            </select>
                        </div>
                        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem;">
                            <button id="lex-focus-play-btn" class="backup-btn" style="padding:0.4rem; font-size:0.7rem; display:flex; align-items:center; gap:0.2rem; min-width:65px; justify-content:center;">
                                <svg id="lex-focus-play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                <span id="lex-focus-play-text">Play</span>
                            </button>
                            <div style="flex:1; display:flex; align-items:center; gap:0.4rem;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                <input type="range" id="lex-focus-volume" min="0" max="1" step="0.05" value="${this.focusVolume}" style="flex:1; accent-color:var(--accent-gold); height:4px; border-radius:2px; background:rgba(255,255,255,0.2); cursor:pointer;">
                            </div>
                        </div>
                    </div>
                    
                    <div class="pomo-divider"></div>
                    
                    <div class="coupons-section">
                        <span class="backup-title">Bacheca Premi 🎁</span>
                        <div class="coupons-list-container" id="lex-coupons-list"></div>
                    </div>
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
                    <h2>Mente in Riposo 🌸</h2>
                    <div id="lex-break-timer" class="break-timer-big">${this.getDisplayTime()}</div>
                    
                    <div id="lex-memory-game-wrapper">
                        <div id="lex-memory-intro">
                            <p class="break-quote">"Il riposo non è ozio, ma nutrimento per lo spirito."</p>
                            <p style="margin-top: 0.8rem; font-size: 0.9rem; color: var(--text-secondary);">Mentre la mente sedimenta i concetti, rilassati con il Memory dell'Amore!</p>
                            <button id="lex-start-memory-btn" class="btn-close-letter" style="margin-top: 1.2rem;">Gioca al Memory 🎮</button>
                        </div>
                        
                        <div id="lex-memory-board" style="display: none;">
                            <div class="memory-stats" style="display: flex; justify-content: space-around; margin-bottom: 0.8rem; font-size: 0.9rem; font-weight: 600; color: var(--text-secondary);">
                                <span>Mosse: <span id="memory-moves">0</span></span>
                                <span>Coppie: <span id="memory-matches">0</span> / 8</span>
                            </div>
                            <div class="lex-memory-grid"></div>
                        </div>
                        
                        <div id="lex-memory-victory" style="display: none;">
                            <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem; font-size: 1.4rem; animation: heartbeat-anim 1.2s infinite;">Bravissima! 🎉</h3>
                            <p>Hai risolto il memory in <span id="victory-moves">0</span> mosse!</p>
                            <div class="unlocked-coupon-card" style="background: rgba(212,175,55,0.1); border: 2px dashed var(--accent-gold); padding: 1rem; border-radius: 12px; margin: 1rem auto; max-width: 280px;">
                                <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--accent-gold);">Hai sbloccato un Coupon d'Amore! 🎁</div>
                                <div id="unlocked-coupon-text" style="font-size: 0.9rem; font-weight: 700; margin-top: 0.4rem; color: var(--text-primary);"></div>
                            </div>
                            <button id="lex-save-coupon-btn" class="btn-close-letter" style="margin-top: 0.5rem;">Salva nei Premi 🎁</button>
                        </div>
                    </div>
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
            const show = settingsPopup.style.display === 'none';
            settingsPopup.style.display = show ? 'block' : 'none';
            if (show) {
                this.renderCoupons();
            }
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

        // Delegate clicks for dynamically rendered memory game buttons
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'lex-start-memory-btn') {
                const intro = document.getElementById('lex-memory-intro');
                const board = document.getElementById('lex-memory-board');
                if (intro) intro.style.display = 'none';
                if (board) board.style.display = 'block';
                this.startMemoryGame();
            }
            if (e.target && e.target.closest('#lex-save-coupon-btn')) {
                const textEl = document.getElementById('unlocked-coupon-text');
                if (textEl) {
                    const text = textEl.textContent;
                    const unlocked = JSON.parse(localStorage.getItem('lex-unlocked-coupons')) || [];
                    unlocked.push({ text, redeemed: false, date: new Date().toLocaleDateString() });
                    localStorage.setItem('lex-unlocked-coupons', JSON.stringify(unlocked));
                    this.renderCoupons();
                    
                    const victory = document.getElementById('lex-memory-victory');
                    const intro = document.getElementById('lex-memory-intro');
                    if (victory) victory.style.display = 'none';
                    if (intro) intro.style.display = 'block';
                    
                    alert("🎁 Coupon salvato con successo nella tua Bacheca dei Premi!");
                }
            }
        });

        // --- BACKUP LOGIC ---
        const exportBtn = document.getElementById('lex-export-btn');
        const importBtn = document.getElementById('lex-import-btn');
        const importFile = document.getElementById('lex-import-file');

        exportBtn?.addEventListener('click', () => {
            const content = this.getBackupData();
            const blob = new Blob([content], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const date = new Date().toISOString().split('T')[0];
            a.href = url;
            a.download = `Lex_Backup_${date}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });

        importBtn?.addEventListener('click', () => importFile?.click());

        importFile?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                if (confirm('Importando questi dati, sovrascriverai gli appunti attuali su questo dispositivo. Continuare?')) {
                    if (this.restoreBackupData(event.target.result)) {
                        alert('Importazione completata con successo! La pagina verrà ricaricata.');
                        window.location.reload();
                    } else {
                        alert('Errore durante l\'importazione: file non valido.');
                    }
                }
            };
            reader.readAsText(file);
        });

        // Focus Player listeners
        const focusSelect = document.getElementById('lex-focus-sound');
        const focusPlayBtn = document.getElementById('lex-focus-play-btn');
        const focusVol = document.getElementById('lex-focus-volume');
        
        focusSelect?.addEventListener('change', (e) => {
            this.onFocusSoundChange(e.target.value);
        });
        
        focusPlayBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFocusPlay();
        });
        
        focusVol?.addEventListener('input', (e) => {
            this.onFocusVolumeChange(parseFloat(e.target.value));
        });
    },

    // --- CLOUD SYNC LOGIC ---
    attachCloudListeners() {
        const toggleBtn = document.getElementById('lex-cloud-toggle-btn');
        const section = document.getElementById('lex-cloud-section');
        const providerSelect = document.getElementById('lex-cloud-provider');
        
        const gdriveConnect = document.getElementById('lex-gdrive-connect-btn');
        const dropboxConnect = document.getElementById('lex-dropbox-connect-btn');
        const webdavConnect = document.getElementById('lex-webdav-connect-btn');
        
        const uploadBtn = document.getElementById('lex-cloud-upload-btn');
        const downloadBtn = document.getElementById('lex-cloud-download-btn');
        const autosaveCheck = document.getElementById('lex-cloud-autosave');
        
        toggleBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = section.style.display === 'none';
            section.style.display = isHidden ? 'flex' : 'none';
            if (isHidden) {
                this.updateCloudUI();
            }
        });
        
        providerSelect?.addEventListener('change', () => {
            this.updateCloudUI();
        });
        
        gdriveConnect?.addEventListener('click', () => {
            const clientIdInput = document.getElementById('lex-gdrive-client-id');
            localStorage.setItem('lex-gdrive-client-id', clientIdInput.value.trim());
            this.redirectToGDrive();
        });
        
        dropboxConnect?.addEventListener('click', () => {
            const appKeyInput = document.getElementById('lex-dropbox-client-id');
            localStorage.setItem('lex-dropbox-client-id', appKeyInput.value.trim());
            this.redirectToDropbox();
        });
        
        webdavConnect?.addEventListener('click', async () => {
            const url = document.getElementById('lex-webdav-url').value.trim();
            const user = document.getElementById('lex-webdav-user').value.trim();
            const pass = document.getElementById('lex-webdav-pass').value.trim();
            
            if (!url || !user || !pass) {
                alert('Tutti i campi WebDAV sono obbligatori.');
                return;
            }
            
            localStorage.setItem('lex-webdav-url', url);
            localStorage.setItem('lex-webdav-user', user);
            localStorage.setItem('lex-webdav-pass', pass);
            localStorage.setItem('lex-cloud-provider', 'webdav');
            
            this.updateCloudUI();
            
            // Connection test: upload current backup
            alert('Test di connessione WebDAV avviato...');
            await this.syncCloud('upload');
        });
        
        uploadBtn?.addEventListener('click', () => this.syncCloud('upload'));
        downloadBtn?.addEventListener('click', () => this.syncCloud('download'));
        
        autosaveCheck?.addEventListener('change', () => {
            localStorage.setItem('lex-cloud-autosave', autosaveCheck.checked);
        });
        
        document.getElementById('lex-gdrive-client-id')?.addEventListener('change', (e) => {
            localStorage.setItem('lex-gdrive-client-id', e.target.value.trim());
        });
        document.getElementById('lex-dropbox-client-id')?.addEventListener('change', (e) => {
            localStorage.setItem('lex-dropbox-client-id', e.target.value.trim());
        });
    },

    updateCloudUI() {
        const providerSelect = document.getElementById('lex-cloud-provider');
        if (!providerSelect) return;
        
        const provider = providerSelect.value;
        localStorage.setItem('lex-cloud-provider', provider);
        
        // Hide all fields first
        document.getElementById('lex-cloud-gdrive-fields').style.display = 'none';
        document.getElementById('lex-cloud-dropbox-fields').style.display = 'none';
        document.getElementById('lex-cloud-webdav-fields').style.display = 'none';
        document.getElementById('lex-cloud-sync-actions').style.display = 'none';
        
        const badge = document.getElementById('lex-cloud-badge');
        const statusLabel = document.getElementById('lex-cloud-status');
        
        if (badge) {
            badge.className = 'cloud-status-dot';
            if (provider !== 'none') {
                badge.classList.add('active'); // show yellow dot if active but not confirmed
            }
        }

        if (provider === 'gdrive') {
            document.getElementById('lex-cloud-gdrive-fields').style.display = 'flex';
            document.getElementById('lex-cloud-sync-actions').style.display = 'flex';
            
            const clientId = localStorage.getItem('lex-gdrive-client-id') || '';
            document.getElementById('lex-gdrive-client-id').value = clientId;
            
            const redirectUri = window.location.origin + window.location.pathname;
            document.getElementById('lex-gdrive-redirect-uri').textContent = redirectUri;
            
            const token = localStorage.getItem('lex-gdrive-token');
            const expiry = localStorage.getItem('lex-gdrive-token-expiry');
            const isConnected = token && (!expiry || Date.now() < parseInt(expiry));
            
            if (isConnected) {
                statusLabel.textContent = "Stato: GDrive Collegato";
                statusLabel.style.color = "var(--accent-gold)";
                if (badge) {
                    badge.classList.remove('active');
                    badge.classList.add('connected'); // green dot
                }
            } else {
                statusLabel.textContent = token ? "Stato: Sessione Scaduta" : "Stato: Non Connesso";
                statusLabel.style.color = "#ef4444";
            }
            
        } else if (provider === 'dropbox') {
            document.getElementById('lex-cloud-dropbox-fields').style.display = 'flex';
            document.getElementById('lex-cloud-sync-actions').style.display = 'flex';
            
            const clientId = localStorage.getItem('lex-dropbox-client-id') || '';
            document.getElementById('lex-dropbox-client-id').value = clientId;
            
            const redirectUri = window.location.origin + window.location.pathname;
            document.getElementById('lex-dropbox-redirect-uri').textContent = redirectUri;
            
            const token = localStorage.getItem('lex-dropbox-token');
            const isConnected = !!token;
            
            if (isConnected) {
                statusLabel.textContent = "Stato: Dropbox Collegato";
                statusLabel.style.color = "var(--accent-gold)";
                if (badge) {
                    badge.classList.remove('active');
                    badge.classList.add('connected');
                }
            } else {
                statusLabel.textContent = "Stato: Non Connesso";
                statusLabel.style.color = "#ef4444";
            }
            
        } else if (provider === 'webdav') {
            document.getElementById('lex-cloud-webdav-fields').style.display = 'flex';
            document.getElementById('lex-cloud-sync-actions').style.display = 'flex';
            
            document.getElementById('lex-webdav-url').value = localStorage.getItem('lex-webdav-url') || '';
            document.getElementById('lex-webdav-user').value = localStorage.getItem('lex-webdav-user') || '';
            document.getElementById('lex-webdav-pass').value = localStorage.getItem('lex-webdav-pass') || '';
            
            const hasCreds = localStorage.getItem('lex-webdav-url') && localStorage.getItem('lex-webdav-user') && localStorage.getItem('lex-webdav-pass');
            if (hasCreds) {
                statusLabel.textContent = "Stato: Credenziali Salvate";
                statusLabel.style.color = "var(--accent-gold)";
                if (badge) {
                    badge.classList.remove('active');
                    badge.classList.add('connected');
                }
            } else {
                statusLabel.textContent = "Stato: Non Configurato";
                statusLabel.style.color = "#ef4444";
            }
        }
    },

    checkOAuthCallback() {
        const hash = window.location.hash;
        if (!hash) return;
        
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const state = params.get('state');
        
        if (accessToken) {
            if (state === 'gdrive') {
                localStorage.setItem('lex-gdrive-token', accessToken);
                const expires = params.get('expires_in');
                const expiry = expires ? Date.now() + parseInt(expires) * 1000 : Date.now() + 3600 * 1000;
                localStorage.setItem('lex-gdrive-token-expiry', expiry);
                localStorage.setItem('lex-cloud-provider', 'gdrive');
                
                window.history.replaceState({}, document.title, window.location.pathname);
                alert('Connesso a Google Drive con successo!');
                this.syncCloud('download');
            } else if (state === 'dropbox') {
                localStorage.setItem('lex-dropbox-token', accessToken);
                localStorage.setItem('lex-cloud-provider', 'dropbox');
                
                window.history.replaceState({}, document.title, window.location.pathname);
                alert('Connesso a Dropbox con successo!');
                this.syncCloud('download');
            }
        }
    },

    redirectToGDrive() {
        const clientId = localStorage.getItem('lex-gdrive-client-id') || '';
        if (!clientId) {
            alert('Inserisci un Google Client ID valido prima di collegare Google Drive.');
            return;
        }
        const redirectUri = window.location.origin + window.location.pathname;
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=https://www.googleapis.com/auth/drive.file&state=gdrive`;
        window.location.href = url;
    },

    redirectToDropbox() {
        const clientId = localStorage.getItem('lex-dropbox-client-id') || '';
        if (!clientId) {
            alert('Inserisci un Dropbox App Key valida prima di collegare Dropbox.');
            return;
        }
        const redirectUri = window.location.origin + window.location.pathname;
        const url = `https://www.dropbox.com/oauth2/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&state=dropbox`;
        window.location.href = url;
    },

    async gdriveSearchFile(token) {
        const url = `https://www.googleapis.com/drive/v3/files?q=name='Lex_Backup.json' and trashed=false&fields=files(id,name)`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Errore API Google Drive: ${response.statusText}`);
        const result = await response.json();
        return (result.files && result.files.length > 0) ? result.files[0].id : null;
    },

    async gdriveUpload(token, fileId, content) {
        let url, method, headers = { 'Authorization': `Bearer ${token}` };
        
        if (fileId) {
            url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
            method = 'PATCH';
            headers['Content-Type'] = 'application/json';
            const response = await fetch(url, { method, headers, body: content });
            if (!response.ok) throw new Error(`Errore caricamento Google Drive: ${response.statusText}`);
            return await response.json();
        } else {
            url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
            const boundary = 'lex_gdrive_boundary';
            headers['Content-Type'] = `multipart/related; boundary=${boundary}`;
            const metadata = { name: 'Lex_Backup.json', mimeType: 'application/json' };
            const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${content}\r\n--${boundary}--`;
            const response = await fetch(url, { method: 'POST', headers, body });
            if (!response.ok) throw new Error(`Errore creazione Google Drive: ${response.statusText}`);
            return await response.json();
        }
    },

    async gdriveDownload(token, fileId) {
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Errore download Google Drive: ${response.statusText}`);
        return await response.text();
    },

    async dropboxUpload(token, content) {
        const url = 'https://content.dropboxapi.com/2/files/upload';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Dropbox-API-Arg': JSON.stringify({
                    path: '/Lex_Backup.json',
                    mode: 'overwrite',
                    autorename: false,
                    mute: true
                }),
                'Content-Type': 'application/octet-stream'
            },
            body: content
        });
        if (!response.ok) throw new Error(`Errore caricamento Dropbox: ${response.statusText}`);
        return await response.json();
    },

    async dropboxDownload(token) {
        const url = 'https://content.dropboxapi.com/2/files/download';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Dropbox-API-Arg': JSON.stringify({ path: '/Lex_Backup.json' })
            }
        });
        if (!response.ok) {
            if (response.status === 409 || response.status === 404) return null;
            throw new Error(`Errore download Dropbox: ${response.statusText}`);
        }
        return await response.text();
    },

    async webdavUpload(url, user, pass, content) {
        let targetUrl = url;
        if (!targetUrl.endsWith('/Lex_Backup.json')) {
            if (!targetUrl.endsWith('/')) targetUrl += '/';
            targetUrl += 'Lex_Backup.json';
        }
        const response = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${btoa(user + ':' + pass)}`,
                'Content-Type': 'application/json'
            },
            body: content
        });
        if (!response.ok) throw new Error(`Errore WebDAV PUT: ${response.status} ${response.statusText}`);
        return true;
    },

    async webdavDownload(url, user, pass) {
        let targetUrl = url;
        if (!targetUrl.endsWith('/Lex_Backup.json')) {
            if (!targetUrl.endsWith('/')) targetUrl += '/';
            targetUrl += 'Lex_Backup.json';
        }
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: { 'Authorization': `Basic ${btoa(user + ':' + pass)}` }
        });
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Errore WebDAV GET: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    },

    getBackupData() {
        const data = {};
        const sensitiveKeys = [
            'lex-gdrive-token', 'lex-gdrive-token-expiry', 
            'lex-dropbox-token', 'lex-webdav-pass', 
            'lex-gdrive-client-id', 'lex-dropbox-client-id', 
            'lex-webdav-user', 'lex-webdav-url', 
            'lex-cloud-provider', 'lex-cloud-autosave', 'lex-sync'
        ];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if ((key.startsWith('notes-') || key.startsWith('highlight-') || key.startsWith('lex-')) && !sensitiveKeys.includes(key)) {
                data[key] = localStorage.getItem(key);
            }
        }
        return JSON.stringify(data, null, 2);
    },

    restoreBackupData(jsonString) {
        try {
            this.isRestoring = true;
            const data = JSON.parse(jsonString);
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            });
            this.isRestoring = false;
            return true;
        } catch (err) {
            this.isRestoring = false;
            console.error("Errore importazione backup:", err);
            return false;
        }
    },

    async syncCloud(action = 'upload', silent = false) {
        const provider = localStorage.getItem('lex-cloud-provider') || 'none';
        if (provider === 'none') {
            if (!silent && action === 'upload') {
                alert('Seleziona e configura un provider Cloud prima di sincronizzare.');
            }
            return;
        }

        const container = document.getElementById('lex-pomo-container');
        try {
            if (container) container.classList.add('syncing');
            const content = this.getBackupData();
            
            if (provider === 'gdrive') {
                const token = localStorage.getItem('lex-gdrive-token');
                const expiry = localStorage.getItem('lex-gdrive-token-expiry');
                if (!token || (expiry && Date.now() > parseInt(expiry))) {
                    if (!silent) {
                        if (confirm('La sessione di Google Drive è scaduta o non attiva. Vuoi accedere ora?')) {
                            this.redirectToGDrive();
                        }
                    }
                    return;
                }
                
                const fileId = await this.gdriveSearchFile(token);
                if (action === 'upload') {
                    await this.gdriveUpload(token, fileId, content);
                    if (!silent) alert('Backup caricato su Google Drive con successo!');
                } else {
                    if (fileId) {
                        const downloaded = await this.gdriveDownload(token, fileId);
                        if (downloaded) {
                            if (silent || confirm('Dati trovati su Google Drive. Vuoi ripristinarli e sovrascrivere la sessione locale?')) {
                                if (this.restoreBackupData(downloaded)) {
                                    if (!silent) alert('Dati ripristinati da Google Drive.');
                                    window.location.reload();
                                }
                            }
                        }
                    } else {
                        if (!silent) alert('Nessun file di backup trovato su Google Drive.');
                    }
                }
            } else if (provider === 'dropbox') {
                const token = localStorage.getItem('lex-dropbox-token');
                if (!token) {
                    if (!silent) {
                        if (confirm('Non sei collegato a Dropbox. Vuoi connettere l\'account ora?')) {
                            this.redirectToDropbox();
                        }
                    }
                    return;
                }
                
                if (action === 'upload') {
                    await this.dropboxUpload(token, content);
                    if (!silent) alert('Backup caricato su Dropbox con successo!');
                } else {
                    const downloaded = await this.dropboxDownload(token);
                    if (downloaded) {
                        if (silent || confirm('Dati trovati su Dropbox. Vuoi ripristinarli e sovrascrivere la sessione locale?')) {
                            if (this.restoreBackupData(downloaded)) {
                                if (!silent) alert('Dati ripristinati da Dropbox.');
                                window.location.reload();
                            }
                        }
                    } else {
                        if (!silent) alert('Nessun file di backup trovato su Dropbox.');
                    }
                }
            } else if (provider === 'webdav') {
                const url = localStorage.getItem('lex-webdav-url');
                const user = localStorage.getItem('lex-webdav-user');
                const pass = localStorage.getItem('lex-webdav-pass');
                if (!url || !user || !pass) {
                    if (!silent) alert('Configura URL, username e password per WebDAV nelle impostazioni.');
                    return;
                }
                
                if (action === 'upload') {
                    await this.webdavUpload(url, user, pass, content);
                    if (!silent) alert('Backup caricato via WebDAV con successo!');
                } else {
                    const downloaded = await this.webdavDownload(url, user, pass);
                    if (downloaded) {
                        if (silent || confirm('Dati trovati su WebDAV. Vuoi ripristinarli e sovrascrivere la sessione locale?')) {
                            if (this.restoreBackupData(downloaded)) {
                                if (!silent) alert('Dati ripristinati da WebDAV.');
                                window.location.reload();
                            }
                        }
                    } else {
                        if (!silent) alert('Nessun file di backup trovato su WebDAV.');
                    }
                }
            }
        } catch (err) {
            console.error("Errore Sincronizzazione:", err);
            if (!silent) alert(`Sincronizzazione fallita: ${err.message}`);
        } finally {
            if (container) container.classList.remove('syncing');
        }
    },

    setupLocalStorageProxy() {
        const originalSetItem = localStorage.setItem;
        const self = this;
        localStorage.setItem = function(key, value) {
            originalSetItem.apply(this, arguments);
            if (self.isRestoring) return;
            
            const syncablePrefixes = [
                'notes-', 'highlight-', 'lex-quiz-stats', 'lex-custom-connections', 'lex-srs-',
                'lex-study-seconds', 'lex-night-study-seconds', 'lex-study-streak', 'lex-exams-passed', 'lex-achievements-completed',
                'lex-flashcards-completed'
            ];
            const shouldSync = syncablePrefixes.some(prefix => key.startsWith(prefix));
            
            const sensitiveKeys = [
                'lex-gdrive-token', 'lex-gdrive-token-expiry', 
                'lex-dropbox-token', 'lex-webdav-pass', 
                'lex-gdrive-client-id', 'lex-dropbox-client-id', 
                'lex-webdav-user', 'lex-webdav-url', 
                'lex-cloud-provider', 'lex-cloud-autosave', 'lex-sync'
            ];
            
            if (shouldSync && !sensitiveKeys.includes(key) && localStorage.getItem('lex-cloud-autosave') === 'true') {
                self.triggerAutosave();
            }
        };
    },

    triggerAutosave() {
        if (this.autosaveTimeout) clearTimeout(this.autosaveTimeout);
        this.autosaveTimeout = setTimeout(() => {
            console.log("Salvataggio automatico Cloud in background...");
            this.syncCloud('upload', true);
        }, 5000);
    },

    startTimer(type, mins) {
        this.state = type;
        this.endTime = Date.now() + (mins * 60 * 1000);
        this.saveState();
        this.updateUI();
        this.notify();
        if (type === 'break') {
            this.resetMemoryGameUI();
        }
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
                if (this.state === 'work') {
                    this.incrementStudyTime(1);
                }
                this.updateUI();
            }
        }, 1000);
    },

    // --- FOCUS SOUND PLAYER LOGIC ---
    initAudioContext() {
        if (!this.focusAudioCtx) {
            this.focusAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.focusGainNode = this.focusAudioCtx.createGain();
            this.focusGainNode.gain.value = this.focusVolume;
            this.focusGainNode.connect(this.focusAudioCtx.destination);
        }
        if (this.focusAudioCtx.state === 'suspended') {
            this.focusAudioCtx.resume();
        }
    },

    createWhiteNoiseNode() {
        const sampleRate = this.focusAudioCtx.sampleRate;
        const bufferSize = 2 * sampleRate;
        const noiseBuffer = this.focusAudioCtx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const node = this.focusAudioCtx.createBufferSource();
        node.buffer = noiseBuffer;
        node.loop = true;
        return node;
    },
    
    createBrownNoiseNode() {
        const sampleRate = this.focusAudioCtx.sampleRate;
        const bufferSize = 2 * sampleRate;
        const noiseBuffer = this.focusAudioCtx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Compensate for loss of gain
        }
        const node = this.focusAudioCtx.createBufferSource();
        node.buffer = noiseBuffer;
        node.loop = true;
        return node;
    },

    playFocusSound() {
        this.stopFocusSound();
        
        const soundType = this.focusSound;
        if (soundType === 'none') {
            return;
        }
        
        this.initAudioContext();
        
        if (soundType === 'white') {
            const node = this.createWhiteNoiseNode();
            node.connect(this.focusGainNode);
            node.start();
            this.focusSourceNode = node;
        } else if (soundType === 'brown') {
            const node = this.createBrownNoiseNode();
            node.connect(this.focusGainNode);
            node.start();
            this.focusSourceNode = node;
        } else if (soundType === 'rain') {
            const white = this.createWhiteNoiseNode();
            
            const hp = this.focusAudioCtx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 400;
            
            const lp = this.focusAudioCtx.createBiquadFilter();
            lp.type = 'lowpass';
            lp.frequency.value = 1500;
            
            white.connect(hp);
            hp.connect(lp);
            lp.connect(this.focusGainNode);
            
            white.start();
            this.focusSourceNode = white;
        } else if (soundType === 'ocean') {
            const brown = this.createBrownNoiseNode();
            
            const waveGain = this.focusAudioCtx.createGain();
            waveGain.gain.value = 0.4;
            
            const lfo = this.focusAudioCtx.createOscillator();
            lfo.frequency.value = 0.08;
            
            const lfoGain = this.focusAudioCtx.createGain();
            lfoGain.gain.value = 0.35;
            
            lfo.connect(lfoGain);
            lfoGain.connect(waveGain.gain);
            
            brown.connect(waveGain);
            waveGain.connect(this.focusGainNode);
            
            brown.start();
            lfo.start();
            
            this.focusSourceNode = brown;
            this.focusLfoNodes.push(lfo);
        } else if (soundType === 'drone') {
            const freqs = [65.41, 98.00, 130.81, 164.81, 196.00];
            
            const filter = this.focusAudioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 350;
            filter.connect(this.focusGainNode);
            
            freqs.forEach((freq, idx) => {
                const osc = this.focusAudioCtx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                
                const g = this.focusAudioCtx.createGain();
                g.gain.value = 0.15;
                
                const lfo = this.focusAudioCtx.createOscillator();
                lfo.frequency.value = 0.04 + (idx * 0.015);
                
                const lfoGain = this.focusAudioCtx.createGain();
                lfoGain.gain.value = 0.1;
                
                lfo.connect(lfoGain);
                lfoGain.connect(g.gain);
                
                osc.connect(g);
                g.connect(filter);
                
                osc.start();
                lfo.start();
                
                this.focusOscNodes.push(osc);
                this.focusLfoNodes.push(lfo);
            });
        }
        
        this.focusPlaying = true;
        this.updateFocusUI();
    },

    stopFocusSound() {
        if (this.focusSourceNode) {
            try { this.focusSourceNode.stop(); } catch(e){}
            try { this.focusSourceNode.disconnect(); } catch(e){}
            this.focusSourceNode = null;
        }
        if (this.focusLfoNodes) {
            this.focusLfoNodes.forEach(node => {
                try { node.stop(); } catch(e){}
                try { node.disconnect(); } catch(e){}
            });
            this.focusLfoNodes = [];
        }
        if (this.focusOscNodes) {
            this.focusOscNodes.forEach(node => {
                try { node.stop(); } catch(e){}
                try { node.disconnect(); } catch(e){}
            });
            this.focusOscNodes = [];
        }
        this.focusPlaying = false;
        this.updateFocusUI();
    },

    toggleFocusPlay() {
        if (this.focusPlaying) {
            this.stopFocusSound();
        } else {
            if (this.focusSound === 'none') {
                this.focusSound = 'rain';
                localStorage.setItem('lex-focus-sound', 'rain');
                const selectEl = document.getElementById('lex-focus-sound');
                if (selectEl) selectEl.value = 'rain';
            }
            this.playFocusSound();
        }
    },

    updateFocusUI() {
        const playBtn = document.getElementById('lex-focus-play-btn');
        const playIcon = document.getElementById('lex-focus-play-icon');
        const playText = document.getElementById('lex-focus-play-text');
        
        if (playBtn && playText) {
            if (this.focusPlaying) {
                playBtn.classList.add('playing');
                playText.textContent = 'Pausa';
                if (playIcon) {
                    playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
                }
            } else {
                playBtn.classList.remove('playing');
                playText.textContent = 'Play';
                if (playIcon) {
                    playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
                }
            }
        }
    },

    onFocusSoundChange(newSound) {
        this.focusSound = newSound;
        localStorage.setItem('lex-focus-sound', newSound);
        if (newSound === 'none') {
            this.stopFocusSound();
        } else {
            this.playFocusSound();
        }
    },

    onFocusVolumeChange(newVol) {
        this.focusVolume = newVol;
        localStorage.setItem('lex-focus-volume', newVol);
        if (this.focusGainNode) {
            this.focusGainNode.gain.setValueAtTime(newVol, this.focusAudioCtx.currentTime);
        }
    },

    incrementStudyTime(seconds) {
        try {
            let totalSec = parseInt(localStorage.getItem('lex-study-seconds') || '0');
            totalSec += seconds;
            localStorage.setItem('lex-study-seconds', totalSec);

            const nowHour = new Date().getHours();
            if (nowHour >= 0 && nowHour < 5) {
                let nightSec = parseInt(localStorage.getItem('lex-night-study-seconds') || '0');
                nightSec += seconds;
                localStorage.setItem('lex-night-study-seconds', nightSec);
            }

            this.updateStudyStreak();
        } catch(e) {
            console.error("Errore aggiornamento tempo studio:", e);
        }
    },

    updateStudyStreak() {
        try {
            const todayStr = new Date().toISOString().split('T')[0];
            const lastStudyDate = localStorage.getItem('lex-last-study-date');
            let streak = parseInt(localStorage.getItem('lex-study-streak') || '0');

            if (!lastStudyDate) {
                localStorage.setItem('lex-last-study-date', todayStr);
                localStorage.setItem('lex-study-streak', '1');
            } else if (lastStudyDate !== todayStr) {
                const lastDate = new Date(lastStudyDate);
                const todayDate = new Date(todayStr);
                const diffTime = Math.abs(todayDate - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    streak += 1;
                    localStorage.setItem('lex-study-streak', streak.toString());
                } else if (diffDays > 1) {
                    localStorage.setItem('lex-study-streak', '1');
                }
                localStorage.setItem('lex-last-study-date', todayStr);
            }
        } catch(e) {
            console.error("Errore aggiornamento streak studio:", e);
        }
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
    },

    // --- TEXT TO SPEECH LOGIC ---
    initTTS() {
        // Run after DOM load to ensure elements are present
        setTimeout(() => {
            const modalControls = document.querySelector('.modal-controls');
            if (!modalControls) return;

            // Check if controls already injected
            if (document.getElementById('tts-play-btn')) return;

            const ttsHTML = `
                <div class="tts-controls" style="display: flex; align-items: center; gap: 0.5rem; margin-right: 1.2rem;">
                    <button id="tts-play-btn" class="tts-btn" title="Ascolta/Pausa" style="background:none; border:none; cursor:pointer; color: var(--text-secondary); padding:5px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                    <button id="tts-stop-btn" class="tts-btn" title="Interrompi" style="display: none; background:none; border:none; cursor:pointer; color: var(--text-secondary); padding:5px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="4" y="4" width="16" height="16"></rect></svg>
                    </button>
                    <select id="tts-speed-select" title="Velocità" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-secondary); border-radius: 6px; padding: 2px 4px; font-size: 0.75rem; cursor: pointer; outline:none;">
                        <option value="0.8">0.8x</option>
                        <option value="1.0" selected>1.0x</option>
                        <option value="1.2">1.2x</option>
                        <option value="1.5">1.5x</option>
                    </select>
                </div>
            `;
            modalControls.insertAdjacentHTML('afterbegin', ttsHTML);

            const playBtn = document.getElementById('tts-play-btn');
            const stopBtn = document.getElementById('tts-stop-btn');
            const speedSelect = document.getElementById('tts-speed-select');

            playBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.ttsIsSpeaking) {
                    if (this.ttsIsPaused) this.resumeTTS();
                    else this.pauseTTS();
                } else {
                    this.startTTS();
                }
            };

            stopBtn.onclick = (e) => {
                e.stopPropagation();
                this.stopTTS();
            };

            speedSelect.onchange = () => {
                this.ttsSpeed = parseFloat(speedSelect.value);
                if (this.ttsIsSpeaking && !this.ttsIsPaused) {
                    window.speechSynthesis.cancel();
                    this.speakTTSBlock();
                }
            };
        }, 500);

        // Global listeners for stops
        document.addEventListener('click', (ev) => {
            if (ev.target.closest('.modal-close') || ev.target.classList.contains('modal')) {
                this.stopTTS();
            }
        });

        window.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') this.stopTTS();
        });
    },

    startTTS() {
        const mdView = document.getElementById('markdown-view');
        if (!mdView) return;

        this.ttsBlocks = Array.from(mdView.querySelectorAll('p, h1, h2, h3, li'));
        if (this.ttsBlocks.length === 0) return;

        this.ttsCurrentIndex = 0;
        this.ttsIsSpeaking = true;
        this.ttsIsPaused = false;
        
        const stopBtn = document.getElementById('tts-stop-btn');
        if (stopBtn) stopBtn.style.display = 'flex';

        this.speakTTSBlock();
    },

    speakTTSBlock() {
        if (this.ttsCurrentIndex >= this.ttsBlocks.length) {
            this.stopTTS();
            return;
        }

        this.ttsBlocks.forEach(b => b.classList.remove('tts-highlight'));

        const block = this.ttsBlocks[this.ttsCurrentIndex];
        block.classList.add('tts-highlight');
        block.scrollIntoView({ behavior: 'smooth', block: 'center' });

        this.ttsUtterance = new SpeechSynthesisUtterance(block.textContent);
        this.ttsUtterance.lang = 'it-IT';
        this.ttsUtterance.rate = this.ttsSpeed;

        this.ttsUtterance.onend = () => {
            if (this.ttsIsSpeaking && !this.ttsIsPaused) {
                this.ttsCurrentIndex++;
                this.speakTTSBlock();
            }
        };

        this.ttsUtterance.onerror = (e) => {
            console.error("SpeechSynthesis error:", e);
            if (this.ttsIsSpeaking && !this.ttsIsPaused) {
                this.ttsCurrentIndex++;
                this.speakTTSBlock();
            }
        };

        this.updateTTSUI();
        window.speechSynthesis.speak(this.ttsUtterance);
    },

    pauseTTS() {
        if (this.ttsIsSpeaking && !this.ttsIsPaused) {
            window.speechSynthesis.pause();
            this.ttsIsPaused = true;
            this.updateTTSUI();
        }
    },

    resumeTTS() {
        if (this.ttsIsSpeaking && this.ttsIsPaused) {
            window.speechSynthesis.resume();
            this.ttsIsPaused = false;
            this.updateTTSUI();
        }
    },

    stopTTS() {
        if (!this.ttsIsSpeaking) return;

        window.speechSynthesis.cancel();
        this.ttsIsSpeaking = false;
        this.ttsIsPaused = false;

        if (this.ttsCurrentIndex !== -1 && this.ttsBlocks[this.ttsCurrentIndex]) {
            this.ttsBlocks[this.ttsCurrentIndex].classList.remove('tts-highlight');
        }
        this.ttsCurrentIndex = -1;

        const stopBtn = document.getElementById('tts-stop-btn');
        if (stopBtn) stopBtn.style.display = 'none';

        this.updateTTSUI();
    },

    updateTTSUI() {
        const playBtn = document.getElementById('tts-play-btn');
        if (!playBtn) return;

        if (this.ttsIsSpeaking && !this.ttsIsPaused) {
            playBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
            playBtn.classList.add('speaking');
        } else {
            playBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
            playBtn.classList.remove('speaking');
        }
    },

    // --- HOOK GLOBAL LEAVING & HIGHLIGHT ACTIONS ---
    hookGlobalFeatures() {
        // A. Hook closeSummary (Trigger motivational toast on summary exit)
        const originalCloseSummary = window.closeSummary;
        window.closeSummary = function() {
            if (originalCloseSummary) originalCloseSummary();
            LexCore.showMotivationalToast();
        };

        // B. Hook applyHighlightColor (Trigger heart explosion on paragraph highlight)
        const originalApplyHighlightColor = window.applyHighlightColor;
        if (originalApplyHighlightColor) {
            window.applyHighlightColor = function(color) {
                originalApplyHighlightColor(color);
                if (color !== 'clear') {
                    LexCore.triggerHeartExplosion();
                    LexCore.showParagraphSuccessToast();
                }
            };
        }

        // C. Hook search inputs for Love Letter Easter Egg
        const searchInputs = document.querySelectorAll('#global-search-box, #search-box');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const val = e.target.value.toLowerCase().trim();
                const loveKeywords = ['ti amo', 'sei speciale', 'sei bellissima', 'amore', 'love', 'alessandra', 'lex'];
                if (loveKeywords.includes(val)) {
                    LexCore.triggerLoveLetter();
                    e.target.value = ''; // Reset input
                    e.target.blur(); // Remove focus
                }
            });
        });

        // D. Intercept questions in the Chatbot assistant (assistant.html)
        const originalSendMessage = window.sendMessage;
        if (originalSendMessage && window.location.pathname.includes('assistant.html')) {
            window.sendMessage = async function() {
                const inputField = document.getElementById('chat-user-input');
                if (inputField) {
                    const question = inputField.value.trim().toLowerCase();
                    const triggerKeywords = ['alessio', 'amore', 'fidanzato', 'ti amo', 'love', 'alessandra', 'lex'];
                    const isTrigger = triggerKeywords.some(keyword => question.includes(keyword));
                    if (isTrigger) {
                        if (window.addUserMessage && window.addBotMessage) {
                            window.addUserMessage(inputField.value.trim());
                            inputField.value = '';
                            setTimeout(() => {
                                const sweetReplies = [
                                    "Rilevata richiesta ad altissima priorità dal tuo ragazzo! ❤️ Dice che la sua Alessandra (la fantastica Lex) è la studentessa più in gamba, intelligente e bella del mondo, e che la ama all'infinito! Ora concentrati ancora un pochino, ma ricordati che dopo ti aspetta una valanga di coccole! ⚡🥰",
                                    "Bip-bop! Rilevato il segnale per Lex! 📡 Il tuo Alessio dice che ti ama tantissimo ed è super fiero di come ti stai impegnando su questo studio. Ti manda un bacio gigante! 😘 Non mollare, Ale!",
                                    "Avviso speciale dal tuo fan numero uno! 🏆 Alessio dice che la sua Lex farà un esame straordinario perché è splendida e preparatissima. Ti ama immensamente, Alessandra! ❤️ Ora fai un bel respiro e continua così!"
                                ];
                                const randomReply = sweetReplies[Math.floor(Math.random() * sweetReplies.length)];
                                window.addBotMessage(randomReply);
                            }, 800);
                            return;
                        }
                    }
                }
                return originalSendMessage.apply(this, arguments);
            };
        }
    },

    // --- SWEET MOTIVATIONAL TOAST ---
    showMotivationalToast() {
        const sweetPhrases = [
            "Sei bravissima, Ale! Un passo alla volta e conquisterai questo esame! 💖",
            "Fiero di te e del tuo impegno, Lex! Ti meriti un grandissimo bacio 😘",
            "Prenditi un secondo per respirare, Ale. Stai facendo un ottimo lavoro! 💕",
            "Anche nei capitoli più difficili, la mia Lex brilla sempre! ✨",
            "Un piccolo riposo ora e poi si riparte, Alessandra. Sei il mio orgoglio! 🌸",
            "Studiare è faticoso, ma tu lo fai sembrare una passeggiata, Lex! 👑",
            "Ricordati che credo in te, sempre! Ti amo all'infinito! ❤️",
            "Hai completato questa lettura, Ale. Sei un passo più vicina al successo! 🎯",
            "Il tuo impegno mi riempie il cuore, Lex. Fai una pausa e prendi un caffè! ☕",
            "Sei la studentessa (e la fidanzata) più splendida del mondo! 🌟"
        ];
        
        const randomPhrase = sweetPhrases[Math.floor(Math.random() * sweetPhrases.length)];
        
        let toastContainer = document.getElementById('lex-sweet-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'lex-sweet-toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = 'lex-sweet-toast';
        toast.innerHTML = `
            <div class="toast-heart">💖</div>
            <div class="toast-content">
                <div class="toast-title">Messaggio da Alessio</div>
                <div class="toast-body">${randomPhrase}</div>
            </div>
            <button class="toast-close-btn" style="margin-left: 0.5rem; font-size: 1.1rem; opacity: 0.7; border:none; background:none; cursor:pointer; color:var(--text-muted);">&times;</button>
        `;
        
        toast.querySelector('.toast-close-btn').onclick = () => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        };
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('hide');
                setTimeout(() => toast.remove(), 300);
            }
        }, 6000);
    },

    // --- PARAGRAPH COMPLETED TOAST ---
    showParagraphSuccessToast() {
        const messages = [
            "Ottimo lavoro, Ale! Un altro paragrafo evidenziato! ✨",
            "Perfetto, Lex! Concetti importanti evidenziati! 📝",
            "Bravissima, Ale! Stai memorizzando benissimo! 💖",
            "Fai scorta di questi concetti, Lex! Sei forte! 🌟"
        ];
        const randMsg = messages[Math.floor(Math.random() * messages.length)];
        
        let toastContainer = document.getElementById('lex-sweet-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'lex-sweet-toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = 'lex-sweet-toast';
        toast.style.minWidth = '240px';
        toast.style.borderLeftColor = '#10b981'; // Green border for success
        toast.innerHTML = `
            <div class="toast-heart">✨</div>
            <div class="toast-content">
                <div class="toast-body" style="font-size:0.8rem; margin: 0;">${randMsg}</div>
            </div>
        `;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    },

    // --- HEART EXPLOSION PARTICLES ANIMATION ---
    triggerHeartExplosion() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '10006';
        document.body.appendChild(container);
        
        // Spawn 15 hearts from the center/bottom
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💕', '🌸', '✨'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '70%';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heart.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
            container.appendChild(heart);
            
            // Random velocities
            const angle = (Math.random() * Math.PI) - Math.PI; // upward arc
            const dist = Math.random() * 160 + 60;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            
            setTimeout(() => {
                heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                heart.style.opacity = '0';
            }, 50);
        }
        
        setTimeout(() => container.remove(), 1100);
    },

    // --- EASTER EGG: LOVE LETTER OVERLAY ---
    triggerLoveLetter() {
        // 1. Rain of hearts
        const rainContainer = document.createElement('div');
        rainContainer.id = 'lex-hearts-rain';
        rainContainer.className = 'falling-hearts-container';
        document.body.appendChild(rainContainer);
        
        const hearts = ['❤️', '💖', '💕', '💗', '💘', '🌸'];
        const rainInterval = setInterval(() => {
            if (!document.getElementById('lex-hearts-rain')) {
                clearInterval(rainInterval);
                return;
            }
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (Math.random() * 100) + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            rainContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, 150);
        
        // 2. Love Letter Overlay
        const letterOverlay = document.createElement('div');
        letterOverlay.id = 'lex-love-letter-overlay';
        letterOverlay.className = 'love-letter-overlay';
        letterOverlay.innerHTML = `
            <div class="love-letter-card">
                <div class="letter-heart">❤️</div>
                <h2>Per la mia fantastica Lex</h2>
                <p>Ciao Alessandra mia,</p>
                <p>So quanto ti stai impegnando per preparare questo esame e quanto possa sembrare dura. Voglio solo ricordarti che sei incredibilmente intelligente, tenace e speciale. Sono super fiero di te e farò sempre il tifo per te, in ogni esame e in ogni passo della vita.</p>
                <p>Fai un bel respiro, bevi un goccio d'acqua e prenditi cura di te. Ricordati che ti amo all'infinito! 💕</p>
                <p style="text-align: right; font-style: italic; font-weight: 600; margin-top: 1.5rem;">— Il tuo Alessio</p>
                <button class="btn-close-letter" onclick="LexCore.closeLoveLetter()">Torna allo Studio 📚</button>
            </div>
        `;
        document.body.appendChild(letterOverlay);
        document.body.style.overflow = 'hidden';
    },
    
    closeLoveLetter() {
        const overlay = document.getElementById('lex-love-letter-overlay');
        const rain = document.getElementById('lex-hearts-rain');
        if (overlay) overlay.remove();
        if (rain) rain.remove();
        document.body.style.overflow = '';
    },

    // --- COCCOLE THEME FLOATING BACKGROUND HEARTS ---
    startFloatingHeartsBackground() {
        if (document.getElementById('lex-coccole-bg-hearts')) return;
        const bgContainer = document.createElement('div');
        bgContainer.id = 'lex-coccole-bg-hearts';
        bgContainer.style.pointerEvents = 'none';
        document.body.appendChild(bgContainer);
        
        this.coccoleBgInterval = setInterval(() => {
            if (!document.body.classList.contains('coccole-theme')) {
                this.stopFloatingHeartsBackground();
                return;
            }
            const heart = document.createElement('div');
            heart.className = 'coccole-bg-heart';
            heart.textContent = ['💕', '🌸', '✨', '💖'][Math.floor(Math.random() * 4)];
            heart.style.left = (Math.random() * 100) + 'vw';
            heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
            heart.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
            bgContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 12000);
        }, 1500);
    },

    stopFloatingHeartsBackground() {
        const bgContainer = document.getElementById('lex-coccole-bg-hearts');
        if (bgContainer) bgContainer.remove();
        if (this.coccoleBgInterval) {
            clearInterval(this.coccoleBgInterval);
            this.coccoleBgInterval = null;
        }
    },

    // --- TEMA COCCOLE DYNAMIC TITLES ---
    updateBrandName() {
        const headerTitle = document.querySelector('header h1, .brand h1');
        if (headerTitle) {
            if (document.body.classList.contains('coccole-theme')) {
                headerTitle.textContent = "Lex dell'Amore 💕";
            } else {
                const path = window.location.pathname;
                if (path.includes('diritto')) headerTitle.textContent = "Lex Patrimoniale";
                else if (path.includes('storia_arte')) headerTitle.textContent = "Lex Artistica";
                else if (path.includes('arte_romana')) headerTitle.textContent = "Lex Romana";
                else if (path.includes('storia')) headerTitle.textContent = "Lex Historia";
                else headerTitle.textContent = "Lex Studiorum";
            }
        }
    },

    // --- POMODORO MEMORY GAME GAMEPLAY ---
    resetMemoryGameUI() {
        const intro = document.getElementById('lex-memory-intro');
        const board = document.getElementById('lex-memory-board');
        const victory = document.getElementById('lex-memory-victory');
        if (intro) intro.style.display = 'block';
        if (board) board.style.display = 'none';
        if (victory) victory.style.display = 'none';
    },

    renderCoupons() {
        const couponsList = document.getElementById('lex-coupons-list');
        if (!couponsList) return;
        
        const unlocked = JSON.parse(localStorage.getItem('lex-unlocked-coupons')) || [];
        if (unlocked.length === 0) {
            couponsList.innerHTML = `<div style="font-size:0.7rem; color:var(--text-muted); text-align:center; padding: 0.5rem 0;">Gioca al Memory durante le pause per sbloccare coupon speciali! 🧸</div>`;
            return;
        }
        
        couponsList.innerHTML = unlocked.map((c, index) => `
            <div class="coupon-item">
                <span class="coupon-title">${c.text}</span>
                <button class="coupon-btn ${c.redeemed ? 'redeemed' : ''}" onclick="LexCore.redeemCoupon(${index})" ${c.redeemed ? 'disabled' : ''}>
                    ${c.redeemed ? 'Riscattato' : 'Riscatta'}
                </button>
            </div>
        `).join('');
    },

    redeemCoupon(index) {
        const unlocked = JSON.parse(localStorage.getItem('lex-unlocked-coupons')) || [];
        if (unlocked[index]) {
            unlocked[index].redeemed = true;
            localStorage.setItem('lex-unlocked-coupons', JSON.stringify(unlocked));
            this.renderCoupons();
            alert(`❤️ Buono Riscattato! ❤️\n"${unlocked[index].text}"\nMostralo ad Alessio per ricevere il tuo premio! 😉`);
        }
    },

    startMemoryGame() {
        const emojis = ['💖', '🧸', '🌸', '☕', '🍕', '🐱', '👑', '🍫'];
        let cardsData = [...emojis, ...emojis];
        cardsData.sort(() => Math.random() - 0.5);

        const grid = document.querySelector('.lex-memory-grid');
        if (!grid) return;

        grid.innerHTML = cardsData.map((emoji, index) => `
            <div class="lex-memory-card" data-index="${index}" data-emoji="${emoji}">
                <div class="card-face card-back">❓</div>
                <div class="card-face card-front">${emoji}</div>
            </div>
        `).join('');

        let flippedCards = [];
        let matchedCount = 0;
        let movesCount = 0;
        let isChecking = false;

        const movesEl = document.getElementById('memory-moves');
        const matchesEl = document.getElementById('memory-matches');
        if (movesEl) movesEl.textContent = '0';
        if (matchesEl) matchesEl.textContent = '0';

        const cards = grid.querySelectorAll('.lex-memory-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (isChecking || card.classList.contains('flipped') || card.classList.contains('matched')) return;

                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    movesCount++;
                    if (movesEl) movesEl.textContent = movesCount;
                    isChecking = true;

                    const emoji1 = flippedCards[0].getAttribute('data-emoji');
                    const emoji2 = flippedCards[1].getAttribute('data-emoji');

                    if (emoji1 === emoji2) {
                        flippedCards[0].classList.add('matched');
                        flippedCards[1].classList.add('matched');
                        matchedCount++;
                        if (matchesEl) matchesEl.textContent = matchedCount;
                        flippedCards = [];
                        isChecking = false;

                        // Particle match animation
                        LexCore.triggerHeartExplosion();

                        if (matchedCount === 8) {
                            setTimeout(() => {
                                const board = document.getElementById('lex-memory-board');
                                const victoryPanel = document.getElementById('lex-memory-victory');
                                if (board) board.style.display = 'none';
                                if (victoryPanel) {
                                    victoryPanel.style.display = 'block';
                                    document.getElementById('victory-moves').textContent = movesCount;
                                    
                                    const couponPrizes = [
                                        "Un massaggio rilassante alla schiena di 15 min 💆‍♀️",
                                        "Una cena speciale preparata con amore da Alessio 🍝",
                                        "Una colazione servita a letto con pancake caldi 🥞",
                                        "Un gelato gigante nel nostro posto preferito 🍦",
                                        "Un abbraccio gigante che dura 5 minuti 🧸",
                                        "Una maratona di coccole sul divano stasera 🛋️",
                                        "Un bacio lunghissimo ed extra appassionato 😘",
                                        "10 minuti di grattini rilassanti sulla testa 💆‍♂️"
                                    ];
                                    const randomPrize = couponPrizes[Math.floor(Math.random() * couponPrizes.length)];
                                    document.getElementById('unlocked-coupon-text').textContent = randomPrize;
                                }
                            }, 500);
                        }
                    } else {
                        setTimeout(() => {
                            flippedCards[0].classList.remove('flipped');
                            flippedCards[1].classList.remove('flipped');
                            flippedCards = [];
                            isChecking = false;
                        }, 850);
                    }
                }
            });
        });
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LexCore.init());
} else {
    LexCore.init();
}
