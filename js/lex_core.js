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
    focusAudioCtx: null,
    focusGainNode: null,
    focusAnalyser: null,
    focusPlaying: false,
    focusLfoNodes: [],
    focusOscNodes: [],
    focusMixer: {
        white: { active: false, volume: 0.3, sourceNode: null, gainNode: null },
        brown: { active: false, volume: 0.3, sourceNode: null, gainNode: null },
        rain: { active: false, volume: 0.4, sourceNode: null, gainNode: null },
        ocean: { active: false, volume: 0.4, sourceNode: null, gainNode: null },
        drone: { active: false, volume: 0.5, sourceNode: null, gainNode: null },
        melody_sweet: { active: false, volume: 0.4, sourceNode: null, gainNode: null },
        melody_8bit: { active: false, volume: 0.3, sourceNode: null, gainNode: null }
    },

    // Sequencer State
    melodyInterval: null,
    melodyStep: 0,
    melodyTempo: 120,

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
        this.loadMixerConfig();
        this.applyTheme();
        this.renderUI();
        this.attachListeners();
        this.attachCloudListeners();
        this.checkOAuthCallback();
        this.setupLocalStorageProxy();
        this.startSync();
        this.tick();
        this.initTTS();
        this.injectUpdateButtons();
        this.injectFooterSecretLink();
        this.injectFooterChangelogLink();
        this.injectFooterCodexLink();
        this.injectXPBar();

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
        // Init hidden easter eggs
        this.initEasterEggs();
        this.initIndexedDB().catch(e => console.error("IndexedDB initialization error:", e));
        
        // Log study activity if viewing a summary/chapter
        if (window.location.search.includes('open=') || window.location.pathname.includes('/summaries/')) {
            this.logStudyActivity();
        }
    },


    // --- THEME LOGIC ---
    applyTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('coccole-theme', 'eclissi-theme');
            this.stopFloatingHeartsBackground();
            this.stopEclissiBackground();
        } else if (this.theme === 'coccole') {
            document.body.classList.add('coccole-theme');
            document.body.classList.remove('light-theme', 'eclissi-theme');
            this.stopEclissiBackground();
            this.startFloatingHeartsBackground();
        } else if (this.theme === 'eclissi') {
            document.body.classList.add('eclissi-theme');
            document.body.classList.remove('light-theme', 'coccole-theme');
            this.stopFloatingHeartsBackground();
            this.startEclissiBackground();
        } else {
            document.body.classList.remove('light-theme', 'coccole-theme', 'eclissi-theme');
            this.stopFloatingHeartsBackground();
            this.stopEclissiBackground();
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
                this.unlockEasterEgg('ee-coccole');
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
                        <span class="backup-title">Focus Player Mixer 🎧</span>
                        <div class="mixer-channels" style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.4rem;">
                            <!-- White Noise -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-white-chk" ${this.focusMixer.white.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Rumore Bianco
                                </label>
                                <input type="range" id="mix-white-vol" min="0" max="1" step="0.05" value="${this.focusMixer.white.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Brown Noise -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-brown-chk" ${this.focusMixer.brown.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Rumore Marrone
                                </label>
                                <input type="range" id="mix-brown-vol" min="0" max="1" step="0.05" value="${this.focusMixer.brown.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Rain -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-rain-chk" ${this.focusMixer.rain.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Pioggia Battente
                                </label>
                                <input type="range" id="mix-rain-vol" min="0" max="1" step="0.05" value="${this.focusMixer.rain.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Ocean -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-ocean-chk" ${this.focusMixer.ocean.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Onde del Mare
                                </label>
                                <input type="range" id="mix-ocean-vol" min="0" max="1" step="0.05" value="${this.focusMixer.ocean.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Drone -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-drone-chk" ${this.focusMixer.drone.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Drone Ambientale
                                </label>
                                <input type="range" id="mix-drone-vol" min="0" max="1" step="0.05" value="${this.focusMixer.drone.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Melody Sweet -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-melody_sweet-chk" ${this.focusMixer.melody_sweet.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Piano di Studio 🎹
                                </label>
                                <input type="range" id="mix-melody_sweet-vol" min="0" max="1" step="0.05" value="${this.focusMixer.melody_sweet.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                            <!-- Melody 8bit -->
                            <div class="mixer-row" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem;">
                                <label style="font-size:0.7rem; flex:1; display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer;">
                                    <input type="checkbox" id="mix-melody_8bit-chk" ${this.focusMixer.melody_8bit.active ? 'checked' : ''} style="width:12px; height:12px; accent-color:var(--accent-gold);">
                                    Nostalgia 8-bit 🎮
                                </label>
                                <input type="range" id="mix-melody_8bit-vol" min="0" max="1" step="0.05" value="${this.focusMixer.melody_8bit.volume}" style="width:80px; accent-color:var(--accent-gold); height:3px; cursor:pointer;">
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.6rem;">
                            <button id="lex-focus-play-btn" class="backup-btn" style="padding:0.4rem; font-size:0.7rem; display:flex; align-items:center; gap:0.2rem; flex:1; justify-content:center;">
                                <svg id="lex-focus-play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                <span id="lex-focus-play-text">Avvia Mixer</span>
                            </button>
                            <button id="lex-focus-reset-btn" class="backup-btn" style="padding:0.4rem; font-size:0.7rem; color:var(--text-muted); width:35px; justify-content:center;" title="Spegni Tutto">
                                ✕
                            </button>
                        </div>
                        <canvas id="lex-focus-visualizer" width="240" height="25" style="width:100%; height:25px; background:rgba(0,0,0,0.25); border-radius:6px; margin-top:0.5rem; border:1px solid var(--border-color); display:none; pointer-events:none;"></canvas>
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
                
                <div id="lex-pomo-plant-wrapper" class="pomo-plant-wrapper" style="display: flex; align-items: center; justify-content: center;" title="La tua piantina dello studio: cresce mentre studi!">
                    <span id="lex-pomo-plant-emoji" style="font-size: 1.15rem; transition: all 0.3s;">🌱</span>
                </div>
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

                if (b === 14) {
                    this.triggerClessidraRomantica();
                }
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

        // Focus Player Mixer listeners
        const chs = ['white', 'brown', 'rain', 'ocean', 'drone', 'melody_sweet', 'melody_8bit'];
        chs.forEach(key => {
            const chk = document.getElementById(`mix-${key}-chk`);
            const vol = document.getElementById(`mix-${key}-vol`);
            
            chk?.addEventListener('change', (e) => {
                this.toggleMixerChannel(key, e.target.checked);
            });
            vol?.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                this.focusMixer[key].volume = val;
                this.saveMixerConfig();
                if (this.focusPlaying && this.focusMixer[key].gainNode) {
                    this.focusMixer[key].gainNode.gain.setValueAtTime(val, this.focusAudioCtx.currentTime);
                }
            });
        });
        
        const focusPlayBtn = document.getElementById('lex-focus-play-btn');
        focusPlayBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFocusPlay();
        });
        
        const focusResetBtn = document.getElementById('lex-focus-reset-btn');
        focusResetBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.resetFocusMixer();
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
            // Backup all notes, highlights, achievements, planner roadmaps, coupons and other page states, excluding cloud credentials
            if (!sensitiveKeys.includes(key)) {
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
                'lex-flashcards-completed', 'lex-study-planner-roadmap', 'lex-roadmap-completed-days',
                'lex-unlocked-coupons', 'lex-visited-pages', 'lex-theme', 'lex-grad-target-cfu', 'lex-grad-thesis-bonus',
                'lex-sanctuary-unlocked', 'lex-coupon-redeemed-', 'lex-study-daily-log', 'lex-pomo-flowers',
                'lex-ee-unlocked', 'lex-gallery-unlocked', 'lex-game-record-'
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

        // Clessidra Romantica active check
        if (this.breakTime === 14) {
            document.body.classList.add('clessidra-romantica-active');
            if (this.state === 'break') {
                this.startClessidraRomanticaHearts();
            }
        } else {
            document.body.classList.remove('clessidra-romantica-active');
        }

        this.updatePlantDisplay();
    },

    updatePlantDisplay() {
        const plantWrapper = document.getElementById('lex-pomo-plant-wrapper');
        const plantEmoji = document.getElementById('lex-pomo-plant-emoji');
        if (!plantEmoji || !plantWrapper) return;

        if (this.state === 'idle') {
            plantEmoji.textContent = '🌱';
            plantWrapper.setAttribute('title', 'La tua piantina dello studio: cresce mentre studi!');
        } else if (this.state === 'break') {
            plantEmoji.textContent = '🌺';
            plantWrapper.setAttribute('title', 'Fiore sbocciato! Congratulazioni!');
        } else if (this.state === 'work') {
            const total = this.workTime * 60;
            const remaining = Math.max(0, Math.floor((this.endTime - Date.now()) / 1000));
            const elapsed = total - remaining;
            const pct = elapsed / total;

            if (pct < 0.25) {
                plantEmoji.textContent = '🌱'; // Seed
                plantWrapper.setAttribute('title', 'Semino piantato... concentrati per farlo germogliare!');
            } else if (pct < 0.50) {
                plantEmoji.textContent = '🌿'; // Sprout
                plantWrapper.setAttribute('title', 'Sta germogliando! Continua così!');
            } else if (pct < 0.75) {
                plantEmoji.textContent = '🪴'; // Potted Sprout
                plantWrapper.setAttribute('title', 'La piantina sta crescendo forte!');
            } else if (pct < 1.0) {
                plantEmoji.textContent = '🌸'; // Bud
                plantWrapper.setAttribute('title', 'Quasi sbocciata! Manca poco!');
            } else {
                plantEmoji.textContent = '🌺'; // Bloomed Flower
                plantWrapper.setAttribute('title', 'Fiore sbocciato! Lavoro fantastico!');
            }
        }
    },

    tick() {
        setInterval(() => {
            if (this.state === 'idle') return;
            const now = Date.now();
            if (now >= this.endTime) {
                if (this.state === 'work') {
                    // Save bloomed flower
                    try {
                        let flowers = parseInt(localStorage.getItem('lex-pomo-flowers') || '0');
                        flowers++;
                        localStorage.setItem('lex-pomo-flowers', flowers.toString());
                    } catch(e) {
                        console.error("Errore salvataggio fiore:", e);
                    }
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
    // --- FOCUS SOUND PLAYER LOGIC ---
    loadMixerConfig() {
        try {
            const stored = localStorage.getItem('lex-mixer-config');
            if (stored) {
                const config = JSON.parse(stored);
                Object.keys(config).forEach(key => {
                    if (this.focusMixer[key]) {
                        this.focusMixer[key].active = !!config[key].active;
                        this.focusMixer[key].volume = parseFloat(config[key].volume ?? '0.4');
                    }
                });
            }
        } catch(e) {
            console.error("Errore caricamento mixer config:", e);
        }
    },

    saveMixerConfig() {
        try {
            const config = {};
            Object.keys(this.focusMixer).forEach(key => {
                config[key] = {
                    active: this.focusMixer[key].active,
                    volume: this.focusMixer[key].volume
                };
            });
            localStorage.setItem('lex-mixer-config', JSON.stringify(config));
        } catch(e) {
            console.error("Errore salvataggio mixer config:", e);
        }
    },

    initAudioContext() {
        if (!this.focusAudioCtx) {
            this.focusAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.focusGainNode = this.focusAudioCtx.createGain();
            this.focusGainNode.gain.value = 1.0; // Master volume
            
            this.focusAnalyser = this.focusAudioCtx.createAnalyser();
            this.focusAnalyser.fftSize = 64;
            
            this.focusGainNode.connect(this.focusAnalyser);
            this.focusAnalyser.connect(this.focusAudioCtx.destination);
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

    createChannelSource(channelKey) {
        if (channelKey === 'white') {
            const node = this.createWhiteNoiseNode();
            return { source: node, lastNode: node };
        } else if (channelKey === 'brown') {
            const node = this.createBrownNoiseNode();
            return { source: node, lastNode: node };
        } else if (channelKey === 'rain') {
            const white = this.createWhiteNoiseNode();
            const hp = this.focusAudioCtx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 450;
            const lp = this.focusAudioCtx.createBiquadFilter();
            lp.type = 'lowpass';
            lp.frequency.value = 1400;
            white.connect(hp);
            hp.connect(lp);
            return { source: white, lastNode: lp };
        } else if (channelKey === 'ocean') {
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
            lfo.start();
            this.focusLfoNodes.push(lfo);
            return { source: brown, lastNode: waveGain };
        } else if (channelKey === 'drone') {
            const freqs = [65.41, 98.00, 130.81, 164.81, 196.00];
            const filter = this.focusAudioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 350;
            
            const outputGain = this.focusAudioCtx.createGain();
            outputGain.gain.value = 0.6;
            filter.connect(outputGain);
            
            freqs.forEach((freq, idx) => {
                const osc = this.focusAudioCtx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                const g = this.focusAudioCtx.createGain();
                g.gain.value = 0.12;
                
                const lfo = this.focusAudioCtx.createOscillator();
                lfo.frequency.value = 0.04 + (idx * 0.015);
                const lfoGain = this.focusAudioCtx.createGain();
                lfoGain.gain.value = 0.08;
                
                lfo.connect(lfoGain);
                lfoGain.connect(g.gain);
                
                osc.connect(g);
                g.connect(filter);
                osc.start();
                lfo.start();
                
                this.focusOscNodes.push(osc);
                this.focusLfoNodes.push(lfo);
            });
            return { source: null, lastNode: outputGain };
        } else if (channelKey === 'melody_sweet' || channelKey === 'melody_8bit') {
            const node = this.focusAudioCtx.createGain();
            node.gain.value = 1.0;
            // The actual sound is generated in the sequencer loop
            return { source: null, lastNode: node };
        }
    },

    // --- SEQUENCER LOGIC ---
    startMelodySequencer() {
        if (this.melodyInterval) return;
        this.melodyStep = 0;
        const stepDuration = 60 / this.melodyTempo / 2; // 8th notes
        
        this.melodyInterval = setInterval(() => {
            if (!this.focusPlaying) return;
            
            const now = this.focusAudioCtx.currentTime;
            
            if (this.focusMixer.melody_sweet.active) {
                this.playSweetStep(this.melodyStep, now);
            }
            if (this.focusMixer.melody_8bit.active) {
                this.play8bitStep(this.melodyStep, now);
            }
            
            this.melodyStep = (this.melodyStep + 1) % 32;
        }, stepDuration * 1000);
    },

    stopMelodySequencer() {
        clearInterval(this.melodyInterval);
        this.melodyInterval = null;
    },

    playSweetStep(step, time) {
        // Pentatonic major scale arpeggios
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
        const pattern = [0, 2, 4, 3, 5, 4, 2, 1];
        if (step % 4 === 0) {
            const noteIdx = pattern[(step / 4) % pattern.length];
            this.playSynthNote(notes[noteIdx], time, 'triangle', 0.15, this.focusMixer.melody_sweet.gainNode);
        }
    },

    play8bitStep(step, time) {
        // Retro game-like melody
        const notes = [130.81, 164.81, 196.00, 261.63, 329.63, 392.00]; // C3...G4
        const melody = [0, null, 2, 3, 4, null, 3, 5, 0, 2, 4, 3, null, 1, 0, null];
        if (step % 2 === 0) {
            const idx = (step / 2) % melody.length;
            const note = melody[idx];
            if (note !== null) {
                this.playSynthNote(notes[note], time, 'square', 0.1, this.focusMixer.melody_8bit.gainNode);
            }
        }
    },

    playSynthNote(freq, time, type, duration, targetNode) {
        if (!targetNode) return;
        const osc = this.focusAudioCtx.createOscillator();
        const env = this.focusAudioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);
        
        env.gain.setValueAtTime(0, time);
        env.gain.linearRampToValueAtTime(0.2, time + 0.05);
        env.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.connect(env);
        env.connect(targetNode);
        
        osc.start(time);
        osc.stop(time + duration);
    },

    playFocusMixer() {
        this.stopFocusSound();
        this.initAudioContext();
        
        let hasActive = false;
        Object.keys(this.focusMixer).forEach(key => {
            const ch = this.focusMixer[key];
            if (ch.active) {
                hasActive = true;
                const sourceObj = this.createChannelSource(key);
                ch.gainNode = this.focusAudioCtx.createGain();
                ch.gainNode.gain.value = ch.volume;
                
                sourceObj.lastNode.connect(ch.gainNode);
                ch.gainNode.connect(this.focusGainNode);
                
                if (sourceObj.source) {
                    sourceObj.source.start();
                    ch.sourceNode = sourceObj.source;
                } else {
                    ch.sourceNode = true;
                }
            }
        });
        
        if (hasActive) {
            this.focusPlaying = true;
            this.updateFocusUI();
            this.startVisualizer();
            this.startMelodySequencer();
        } else {
            this.focusPlaying = false;
            this.updateFocusUI();
        }
    },

    stopFocusSound() {
        this.stopMelodySequencer();
        Object.keys(this.focusMixer).forEach(key => {
            const ch = this.focusMixer[key];
            if (ch.sourceNode && ch.sourceNode !== true) {
                try { ch.sourceNode.stop(); } catch(e){}
                try { ch.sourceNode.disconnect(); } catch(e){}
            }
            if (ch.gainNode) {
                try { ch.gainNode.disconnect(); } catch(e){}
            }
            ch.sourceNode = null;
            ch.gainNode = null;
        });
        
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

    resetFocusMixer() {
        this.stopFocusSound();
        Object.keys(this.focusMixer).forEach(key => {
            this.focusMixer[key].active = false;
            const chk = document.getElementById(`mix-${key}-chk`);
            if (chk) chk.checked = false;
        });
        this.saveMixerConfig();
    },

    toggleMixerChannel(key, active) {
        this.focusMixer[key].active = active;
        this.saveMixerConfig();
        
        if (this.focusPlaying) {
            if (active) {
                this.initAudioContext();
                const ch = this.focusMixer[key];
                const sourceObj = this.createChannelSource(key);
                ch.gainNode = this.focusAudioCtx.createGain();
                ch.gainNode.gain.value = ch.volume;
                sourceObj.lastNode.connect(ch.gainNode);
                ch.gainNode.connect(this.focusGainNode);
                if (sourceObj.source) {
                    sourceObj.source.start();
                    ch.sourceNode = sourceObj.source;
                } else {
                    ch.sourceNode = true;
                }
            } else {
                const ch = this.focusMixer[key];
                if (ch.sourceNode && ch.sourceNode !== true) {
                    try { ch.sourceNode.stop(); } catch(e){}
                    try { ch.sourceNode.disconnect(); } catch(e){}
                }
                if (ch.gainNode) {
                    try { ch.gainNode.disconnect(); } catch(e){}
                }
                ch.sourceNode = null;
                ch.gainNode = null;
            }
            // Check if any remain active
            let activeCount = Object.values(this.focusMixer).filter(ch => ch.active).length;
            if (activeCount === 0) {
                this.stopFocusSound();
            }
        }
    },

    toggleFocusPlay() {
        if (this.focusPlaying) {
            this.stopFocusSound();
        } else {
            let activeCount = Object.values(this.focusMixer).filter(ch => ch.active).length;
            if (activeCount === 0) {
                this.focusMixer.rain.active = true;
                const chk = document.getElementById('mix-rain-chk');
                if (chk) chk.checked = true;
                this.saveMixerConfig();
            }
            this.playFocusMixer();
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
                playText.textContent = 'Avvia Mixer';
                if (playIcon) {
                    playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
                }
                const canvas = document.getElementById('lex-focus-visualizer');
                if (canvas) canvas.style.display = 'none';
            }
        }
    },

    startVisualizer() {
        const canvas = document.getElementById('lex-focus-visualizer');
        if (!canvas) return;
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        const bufferLength = this.focusAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if (!this.focusPlaying) {
                canvas.style.display = 'none';
                return;
            }
            requestAnimationFrame(draw);
            
            this.focusAnalyser.getByteTimeDomainData(dataArray);
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = document.body.classList.contains('coccole-theme') ? '#ff6b8b' : '#d4af37';
            ctx.beginPath();
            
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };
        
        draw();
    },

    trackNoteTaken() {
        let count = parseInt(localStorage.getItem('lex-notes-count') || '0');
        count++;
        localStorage.setItem('lex-notes-count', count);
    },

    trackSearch() {
        let count = parseInt(localStorage.getItem('lex-search-queries-count') || '0');
        count++;
        localStorage.setItem('lex-search-queries-count', count);
    },

    trackChapterRead(chapterId) {
        try {
            const read = JSON.parse(localStorage.getItem('lex-unique-chapters-read') || '[]');
            if (!read.includes(chapterId)) {
                read.push(chapterId);
                localStorage.setItem('lex-unique-chapters-read', JSON.stringify(read));
            }
        } catch(e){}
    },

    trackPdfView() {
        let count = parseInt(localStorage.getItem('lex-pdf-views-count') || '0');
        count++;
        localStorage.setItem('lex-pdf-views-count', count);
    },

    trackConnectionNode() {
        let count = parseInt(localStorage.getItem('lex-connections-nodes-count') || '0');
        count++;
        localStorage.setItem('lex-connections-nodes-count', count);
    },

    incrementStudyTime(seconds) {
        try {
            let totalSec = parseInt(localStorage.getItem('lex-study-seconds') || '0');
            totalSec += seconds;
            localStorage.setItem('lex-study-seconds', totalSec);

            // Update daily study log
            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];
            let dailyLog = {};
            try {
                dailyLog = JSON.parse(localStorage.getItem('lex-study-daily-log') || '{}');
            } catch(e) {
                dailyLog = {};
            }
            dailyLog[todayStr] = (dailyLog[todayStr] || 0) + seconds;
            localStorage.setItem('lex-study-daily-log', JSON.stringify(dailyLog));

            // Night study (00:00 - 05:00)
            const hour = now.getHours();
            if (hour >= 0 && hour < 5) {
                let nightSec = parseInt(localStorage.getItem('lex-night-study-seconds') || '0');
                nightSec += seconds;
                localStorage.setItem('lex-night-study-seconds', nightSec);
            }

            // Early morning study (before 08:30)
            if (hour < 8 || (hour === 8 && now.getMinutes() < 30)) {
                let earlySec = parseInt(localStorage.getItem('lex-early-study-seconds') || '0');
                earlySec += seconds;
                localStorage.setItem('lex-early-study-seconds', earlySec);
            }

            // Weekend study (Saturday = 6, Sunday = 0)
            const day = now.getDay();
            if (day === 0 || day === 6) {
                let weekendSec = parseInt(localStorage.getItem('lex-weekend-study-seconds') || '0');
                weekendSec += seconds;
                localStorage.setItem('lex-weekend-study-seconds', weekendSec);
            }

            // Check for focus player (Sinfonia Notturna)
            if (this.focusPlaying) {
                let focusSec = parseInt(localStorage.getItem('lex-focus-study-seconds') || '0');
                focusSec += seconds;
                localStorage.setItem('lex-focus-study-seconds', focusSec);
            }

            this.updateStudyStreak();
        } catch(e) {
            console.error("Errore incremento tempo studio:", e);
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
        // A. Hook closeSummary (Trigger motivational toast on summary exit and clean up tools)
        const originalCloseSummary = window.closeSummary;
        window.closeSummary = function() {
            if (originalCloseSummary) originalCloseSummary();
            LexCore.showMotivationalToast();
            LexCore.closeAllStudyTools();
        };

        // Hook openSummary (Trigger advanced study tools injection)
        const originalOpenSummary = window.openSummary;
        if (originalOpenSummary) {
            window.openSummary = function(title, path) {
                originalOpenSummary(title, path);
                setTimeout(() => {
                    LexCore.initAdvancedStudyTools(title, path);
                    // Award XP for opening chapter summary
                    try {
                        let openedXP = JSON.parse(localStorage.getItem('lex-opened-chapters-xp') || '[]');
                        if (!openedXP.includes(path)) {
                            openedXP.push(path);
                            localStorage.setItem('lex-opened-chapters-xp', JSON.stringify(openedXP));
                            LexCore.awardXP(10);
                        }
                    } catch(e){}
                }, 150);
            };
        }

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

        // E. Watch for markdown summary rendering to inject treasure hunt glyphs
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver((mutations) => {
                for (let mutation of mutations) {
                    if (mutation.addedNodes.length > 0) {
                        const view = document.getElementById('markdown-view') || document.querySelector('.markdown-view');
                        if (view && !view.querySelector('.treasure-glyph')) {
                            LexCore.injectTreasureHuntGlyphs();
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
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
            } else if (document.body.classList.contains('eclissi-theme')) {
                headerTitle.textContent = "Lex Eclissi 🌌";
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
    },

    // --- PWA UPDATE LOGIC ---
    injectUpdateButtons() {
        // Run after a short delay to ensure DOM is ready
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('pwa-update-btn')) {
                const btn = document.createElement('button');
                btn.id = 'pwa-update-btn';
                btn.className = 'pwa-update-btn';
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
                    </svg>
                    Verifica Aggiornamenti
                `;
                btn.onclick = () => this.forceUpdatePWA();
                footer.appendChild(btn);
            }
        }, 1000);
    },

    async forceUpdatePWA() {
        const btn = document.getElementById('pwa-update-btn');
        if (btn) btn.classList.add('loading');

        try {
            if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                
                // 1. Clear Caches
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                
                // 2. Unregister all SW
                for (let reg of regs) {
                    await reg.unregister();
                }

                // 3. Clear session storage (optional but safe)
                // sessionStorage.clear();

                // Show success toast if available
                if (this.showToast) {
                    this.showToast("Aggiornamento forzato avviato. Ricaricamento...", "success");
                }

                // 4. Force hard reload
                setTimeout(() => {
                    window.location.reload(true);
                }, 1000);
            } else {
                window.location.reload(true);
            }
        } catch (err) {
            console.error("Errore durante l'aggiornamento PWA:", err);
            if (btn) btn.classList.remove('loading');
            alert("Errore durante l'aggiornamento. Prova a ricaricare manualmente.");
        }
    },

    injectFooterSecretLink() {
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('lex-footer-secrets-btn')) {
                const isSubFolder = window.location.pathname.split('/').some(segment => [
                    'diritto', 'storia', 'arte_romana', 'storia_arte', 'cristiana', 'codicologia', 
                    'restauro', 'museologia', 'tesi', 'inglese', 'geografia', 'letteratura_italiana', 
                    'letteratura_latina', 'cultura_greca', 'laboratorio', 'arte_medievale', 
                    'arte_contemporanea', 'storia_medievale', 'storia_contemporanea'
                ].includes(segment));
                const prefix = isSubFolder ? '../' : '';

                const link = document.createElement('a');
                link.id = 'lex-footer-secrets-btn';
                link.href = prefix + 'segreti.html';
                link.className = 'lex-footer-secrets-btn';
                link.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px; vertical-align:middle;">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Libri Proibiti 📜
                `;


                const pwaBtn = document.getElementById('pwa-update-btn');
                if (pwaBtn) {
                    footer.insertBefore(link, pwaBtn);
                } else {
                    footer.appendChild(link);
                }
            }
        }, 1000);
    },

    injectFooterChangelogLink() {
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('lex-footer-changelog-btn')) {
                const link = document.createElement('a');
                link.id = 'lex-footer-changelog-btn';
                link.href = '#';
                link.className = 'lex-footer-changelog-btn';
                link.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px; vertical-align:middle;">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Changelog 📋
                `;
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showChangelogModal();
                });

                const secretsBtn = document.getElementById('lex-footer-secrets-btn');
                const pwaBtn = document.getElementById('pwa-update-btn');
                if (secretsBtn) {
                    footer.insertBefore(link, secretsBtn);
                } else if (pwaBtn) {
                    footer.insertBefore(link, pwaBtn);
                } else {
                    footer.appendChild(link);
                }
            }
        }, 1200);
    },

    showChangelogModal() {
        const existing = document.getElementById('changelog-modal');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'changelog-modal';
        overlay.className = 'changelog-modal-overlay';
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        overlay.innerHTML = `
            <div class="changelog-modal-card">
                <div class="changelog-modal-header">
                    <h3>📜 Registro Modifiche (Changelog)</h3>
                    <button class="changelog-modal-close" onclick="document.getElementById('changelog-modal').remove()">&times;</button>
                </div>
                <div class="changelog-modal-body">
                    <!-- Version 2.6.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num" onclick="LexCore.trackChangelogClick()" style="cursor: pointer;">v2.6.0 (Attuale)</span>
                            <span class="changelog-version-date">18 Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Strumenti di Studio Avanzati & Cursus Honorum:</strong> Rilascio del sistema di XP e Livelli (7 Ranghi Accademici) con barra di progresso e animazione di Level-Up.</li>
                            <li><strong>Miglioramenti Feature Esistenti:</strong> Integrazione SRS (SuperMemo-2) nelle Flashcards; Streak Badge nella barra degli strumenti; Generatore automatico di connessioni nella Mappa Trans-disciplinare basato sul glossario.</li>
                            <li><strong>Strumenti nel Modal:</strong> Tecnica Feynman ("Spiega al Monaco") con valutazione a stelle e rilevamento concetti chiave; Active Recall ("Il Quaesitor") con interruzioni di lettura mirate e ripasso automatico.</li>
                            <li><strong>Pagine e Strumenti Globali:</strong> Condensatore di Sintesi 3-tab ("L'Arte del Compendio"), Diario dello Studioso ("Codex Personalis") con statistiche di scrittura, Esportazione del Pacchetto Studio (📦), Speed Review ("Scriptura Veloce") a tempo con classifica, e Trova l'Errore ("L'Eresiarca") con parole cliccabili.</li>
                        </ul>
                    </div>

                    <!-- Version 2.5.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.5.0</span>
                            <span class="changelog-version-date">18 Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>5 Nuovi Strumenti di Studio Avanzati:</strong> Rilascio del Pomodoro Scriptorium (con candela canvas e rintocchi audio), Cloze Test (drag-and-drop con feedback di stelline), Studio Comparativo Split-Screen (scroll sincronizzato ed evidenziazione di lemmi comuni), Concept Matcher (gioco con linee elastiche SVG) e Marginator (post-it interattivi su margine salvati in localStorage).</li>
                            <li><strong>Incremento della piattaforma:</strong> Aggiornamento globale di sicurezza e stabilità a v2.5.0.</li>
                        </ul>
                    </div>

                    <!-- Version 2.4.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.4.0</span>
                            <span class="changelog-version-date">18 Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Capitoli Plus Interdisciplinari:</strong> Inserite 3 nuove sintesi interdisciplinari avanzate (Diritto/Restauro e Falsi d'Autore, Paleografia/Epigrafia Sperimentale, Iconoclastia Politica/Arte e Rivoluzione).</li>
                            <li><strong>Mappa Mentale su Canvas:</strong> Aggiunto un generatore dinamico di mappe concettuali con nodi trascinabili e funzione di esportazione dell'immagine in PNG.</li>
                            <li><strong>Esaminatore Vocale AI:</strong> Simulatore vocale interattivo per la prova orale, con sintesi vocale (TTS), trascrizione vocale (STT) ed elaborazione semantica del voto in trentesimi basata su concetti chiave.</li>
                            <li><strong>Instant Flashcards & Glossario:</strong> Parser automatico delle sintesi per generare mazzi di flashcard 3D pronti all'uso e cassetto laterale per la consultazione trans-disciplinare del glossario.</li>
                        </ul>
                    </div>

                    <!-- Version 2.3.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.3.0</span>
                            <span class="changelog-version-date">18 Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Galleria dei Segreti:</strong> Rilascio di 7 nuovi Easter Egg interattivi suddivisi in tre categorie (Amore, Scriptorium, Materie dello Studio).</li>
                            <li><strong>Integrazione Grafica & Sonora:</strong> Aggiunto il tema dinamico "Eclissi", scia orbitante di stelline/cuori al cursore del mouse, suoni sintetizzati via Web Audio API e animazione di terremoto sullo schermo.</li>
                            <li><strong>Sintesi Codicologia & Filosofia:</strong> Introdotte le gesture di scratching per svelare palinsesti medievali, timer di inattività con rosicchiamento del tarlo, ed effetto torcia/ombre cinesi per il Mito della Caverna.</li>
                            <li><strong>Simulatore Quiz:</strong> Aggiunta la scorciatoia di censura imperiale <code>Ctrl + Shift + X</code> (PROHIBITUM) per evitare le domande ostiche di Diritto Romano.</li>
                        </ul>
                    </div>

                    <!-- Version 2.2.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.2.0</span>
                            <span class="changelog-version-date">18 Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Pianificatore:</strong> Lavagna Kanban interattiva con drag-and-drop per la gestione delle attività di studio giornaliere, salvataggio persistente in <code>localStorage</code> e feedback sonori.</li>
                            <li><strong>Statistiche di Studio:</strong> Grafico Heatmap in stile GitHub (Calendario di Studio) e stimatore del tempo rimanente basato sui capitoli non ancora consultati (45 min/capitolo).</li>
                            <li><strong>Esportazione Calendario:</strong> Esportazione delle tabelle di marcia in file standard <code>.ics</code> (iCal) importabili in Google Calendar ed Apple Calendar.</li>
                            <li><strong>Caccia al Tesoro:</strong> Aggiunti glifi interattivi misteriosi (<code>🏺</code>, <code>⚖️</code>, <code>✒️</code>) nascosti nei riassunti delle materie per sbloccare l'Easter Egg "Il Saggio di Alessandria".</li>
                        </ul>
                    </div>

                    <!-- Version 2.1.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.1.0</span>
                            <span class="changelog-version-date">Giugno 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Supporto Offline:</strong> Integrazione del database IndexedDB (<code>LexKnowledgeBase</code>) per memorizzare in cache le sintesi delle materie e consentire l'utilizzo del RAG offline.</li>
                            <li><strong>RAG Inspector:</strong> Sezione di ispezione del contesto RAG nel pannello Assistente, con punteggi di similarità cosina e match di parole chiave.</li>
                            <li><strong>AI Quiz:</strong> Generatore di quiz rapidi a scelta multipla basato sul contesto RAG (+15 punti di ricompensa per risposte corrette).</li>
                        </ul>
                    </div>

                    <!-- Version 2.0.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v2.0.0</span>
                            <span class="changelog-version-date">Maggio 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Arena Minigiochi:</strong> Aggiunti i giochi interattivi "Decodifica il Codex" (decifrazione medievale con slider ROT) e "Cruciverba dello Scriptorium" (cruciverba 5x5).</li>
                            <li><strong>Classifica Copisti:</strong> Scriptorium Board con 4 copisti storici concorrenti che guadagnano punti dinamicamente.</li>
                            <li><strong>Sistema Easter Eggs:</strong> Aggiunto il registro degli Easter Eggs con 7 obiettivi segreti dello Scriptorium.</li>
                        </ul>
                    </div>

                    <!-- Version 1.5.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v1.5.0</span>
                            <span class="changelog-version-date">Aprile 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Simulatore d'Esame:</strong> Rilascio del motore per simulare gli esami universitari con calcolo statistico del voto di superamento.</li>
                            <li><strong>Flashcards Hub:</strong> Sistema di ripasso attivo programmato (SRS) basato sull'algoritmo di intervallo.</li>
                        </ul>
                    </div>

                    <!-- Version 1.0.0 -->
                    <div class="changelog-version-block">
                        <div class="changelog-version-header">
                            <span class="changelog-version-num">v1.0.0</span>
                            <span class="changelog-version-date">Marzo 2026</span>
                        </div>
                        <ul class="changelog-version-list">
                            <li><strong>Lancio del Portale:</strong> Rilascio iniziale di Lex Studiorum con lezioni interattive di Diritto, Cultura Greca, Codicologia e Storia.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    },

    _changelogClicks: 0,
    trackChangelogClick() {
        this._changelogClicks = (this._changelogClicks || 0) + 1;
        if (this._changelogClicks === 5) {
            this._changelogClicks = 0;
            this.unlockEasterEgg('ee-cronista-scriptorium');
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                osc.start(); osc.stop(ctx.currentTime + 0.4);
            } catch(e) {}
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // EASTER EGGS — 7 SEGRETI DELLO SCRIPTORIUM
    // ═══════════════════════════════════════════════════════════════

    // ── EE #1: Colofone del Copista ─────────────────────────────────
    checkColofone() {
        try {
            const read = JSON.parse(localStorage.getItem('lex-unique-chapters-read') || '[]');
            const codicologiaChapters = [
                'codicologia/summaries/cap1.md','codicologia/summaries/cap2.md',
                'codicologia/summaries/cap3.md','codicologia/summaries/cap4.md',
                'codicologia/summaries/cap5.md','codicologia/summaries/cap6.md',
                'codicologia/summaries/cap7.md','codicologia/summaries/cap8.md',
                'codicologia/summaries/cap9.md','codicologia/summaries/cap10.md',
                'codicologia/summaries/cap11.md','codicologia/summaries/cap12.md',
            ];
            const allRead = codicologiaChapters.every(c => read.includes(c));
            const alreadyShown = localStorage.getItem('lex-colofone-shown');
            if (allRead && !alreadyShown) {
                localStorage.setItem('lex-colofone-shown', '1');
                setTimeout(() => this.triggerColofone(), 800);
            }
        } catch(e){}
    },

    triggerColofone() {
        if (document.getElementById('lex-colofone-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'lex-colofone-overlay';
        overlay.className = 'colofone-overlay';
        overlay.innerHTML = `
            <div class="colofone-card">
                <span class="colofone-ornament">✦</span>
                <div class="colofone-title">Explicit Liber Codicologiae</div>
                <p class="colofone-text">
                    "Explicit liber feliciter. Finivi, deo gratias.<br>
                    Qui scripsit scribat, semper cum Domino vivat."
                </p>
                <p class="colofone-text" style="font-size:0.88rem; margin-bottom:1rem;">
                    Hai completato tutti e dodici i capitoli dello scriptorium.<br>
                    La tua conoscenza del manoscritto è ora integra.
                </p>
                <div class="colofone-sub">Codicologia · Anno Domini MMXXVI · Lex Studiorum</div>
                <button class="colofone-close" onclick="document.getElementById('lex-colofone-overlay').remove()">Chiudi il Codice ✦</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE #2: Manoscritto Perduto ──────────────────────────────────
    MANOSCRITTO_TEXTS: [
        {
            title: 'Frammento Ritrovato — Plinio il Vecchio, Naturalis Historia',
            text: '"Nusquam est qui ubique est." Chi è ovunque non è da nessuna parte. Così anche la conoscenza, dispersa senza ordine, si perde come inchiostro sulla pergamena bagnata.',
            source: 'Plinio il Vecchio, Naturalis Historia, Libro II, I sec. d.C.'
        },
        {
            title: 'Colofone Apocrifo — Scriptorium di Montecassino',
            text: '"Finis adest operis, mercedem posco laboris. Sit mihi pro pena sancta futura quies." Giunto al termine dell\'opera, chiedo il compenso della fatica. Sia per me, in cambio della pena, il riposo eterno.',
            source: 'Colofone anonimo, Montecassino, XI sec.'
        },
        {
            title: 'Nota Marginale — Codex Bembo, Biblioteca Marciana',
            text: '"Scripsi et non paenituit." Ho scritto e non me ne sono pentito. Il copista lascia qui la sua unica firma, nascosta ai margini del tempo.',
            source: 'Nota marginale, XV sec., Venezia'
        },
        {
            title: 'Frammento di Papiro — Biblioteca di Alessandria',
            text: '"Πάντες ἄνθρωποι τοῦ εἰδέναι ὀρέγονται φύσει." Tutti gli uomini per natura desiderano conoscere. Così iniziava ogni giornata nello scriptorium.',
            source: 'Aristotele, Metafisica, Libro I · IV sec. a.C.'
        },
    ],

    tryManoscrittoPerso() {
        if (Math.random() > 0.01) return; // 1% di probabilità
        if (sessionStorage.getItem('lex-manoscritto-shown')) return;
        sessionStorage.setItem('lex-manoscritto-shown', '1');
        const chosen = this.MANOSCRITTO_TEXTS[Math.floor(Math.random() * this.MANOSCRITTO_TEXTS.length)];
        const frag = document.createElement('div');
        frag.className = 'manoscritto-fragment';
        frag.id = 'lex-manoscritto-frag';
        frag.innerHTML = `<p>${chosen.text.substring(0, 90)}…</p><span class="mf-label">📜 Manoscritto Ritrovato</span>`;
        frag.addEventListener('click', () => this.openManoscritto(chosen));
        document.body.appendChild(frag);
        setTimeout(() => frag.remove(), 20000);
    },

    openManoscritto(data) {
        document.getElementById('lex-manoscritto-frag')?.remove();
        const overlay = document.createElement('div');
        overlay.className = 'manoscritto-page-overlay';
        overlay.id = 'lex-manoscritto-overlay';
        overlay.innerHTML = `
            <div class="manoscritto-page-card">
                <h2>📜 ${data.title}</h2>
                <p>${data.text}</p>
                <div class="mp-attribution">${data.source}</div>
                <button class="manoscritto-close-btn" onclick="document.getElementById('lex-manoscritto-overlay').remove()">Riporre il Frammento</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE #3: Konami — Scriptorium Mode ────────────────────────────
    _konamiSequence: ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'],
    _konamiProgress: 0,

    initKonami() {
        document.addEventListener('keydown', (e) => {
            const expected = this._konamiSequence[this._konamiProgress];
            if (e.key === expected) {
                this._konamiProgress++;
                if (this._konamiProgress === this._konamiSequence.length) {
                    this._konamiProgress = 0;
                    this.triggerScriptoriumMode();
                }
            } else {
                this._konamiProgress = 0;
                if (e.key === this._konamiSequence[0]) this._konamiProgress = 1;
            }
        });
    },

    triggerScriptoriumMode() {
        if (document.body.classList.contains('scriptorium-mode')) return;
        const banner = document.createElement('div');
        banner.className = 'scriptorium-banner';
        banner.id = 'lex-scriptorium-banner';
        banner.textContent = '✦ BENEDICTUS · QUI · LEGIT · ET · AUDIT · VERBA · SCRIPTURAE · HUIUS ✦';
        document.body.appendChild(banner);
        document.body.classList.add('scriptorium-mode');
        setTimeout(() => {
            document.body.classList.remove('scriptorium-mode');
            document.getElementById('lex-scriptorium-banner')?.remove();
        }, 10000);
    },

    // ── EE #4: Fantasma della Biblioteca ────────────────────────────
    GHOST_QUOTES: [
        '"Habent sua fata libelli." I libri hanno il loro destino. — Terenziano Mauro',
        '"Una biblioteca è il luogo in cui le generazioni morti si parlano con quelle vive." — Carlyle',
        '"I manoscritti non bruciano." — Michail Bulgakov, Il Maestro e Margherita',
        '"Scribitur ad narrandum, non ad probandum." Si scrive per narrare, non per dimostrare. — Quintiliano',
    ],

    initGhostBiblioteca() {
        const checkTime = () => {
            const now = new Date();
            if (now.getHours() === 23 && now.getMinutes() === 59) {
                if (!document.getElementById('lex-ghost')) {
                    this.triggerGhost();
                }
            }
        };
        setInterval(checkTime, 30000);
        checkTime();
    },

    triggerGhost() {
        const quote = this.GHOST_QUOTES[Math.floor(Math.random() * this.GHOST_QUOTES.length)];
        const ghost = document.createElement('div');
        ghost.className = 'ghost-biblioteca';
        ghost.id = 'lex-ghost';
        ghost.innerHTML = `
            <div class="ghost-card">
                <span class="ghost-emoji">👻</span>
                <p class="ghost-quote">${quote}</p>
            </div>
        `;
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 4500);
    },

    // ── EE #5: Codex Aureus — Auctor Perfectus ──────────────────────
    _quizStreak: 0,

    trackQuizStreak(isCorrect) {
        if (isCorrect) {
            this._quizStreak++;
            if (this._quizStreak === 10) {
                this._quizStreak = 0;
                this.triggerCodexAureus();
            }
        } else {
            this._quizStreak = 0;
        }
    },

    triggerCodexAureus() {
        if (document.getElementById('lex-codex-aureus')) return;
        const overlay = document.createElement('div');
        overlay.className = 'codex-aureus-overlay';
        overlay.id = 'lex-codex-aureus';
        overlay.innerHTML = `
            <div class="codex-aureus-card" id="lex-codex-aureus-card">
                <span class="codex-aureus-medal">🏅</span>
                <div class="codex-aureus-title">Auctor<br>Perfectus</div>
                <div class="codex-aureus-sub">X Risposte Corrette · Codex Aureus</div>
            </div>
        `;
        document.body.appendChild(overlay);
        // Gold leaf rain
        const card = document.getElementById('lex-codex-aureus-card');
        for (let i = 0; i < 28; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'gold-leaf';
            leaf.style.setProperty('--start-x', (Math.random() * 100) + '%');
            leaf.style.setProperty('--start-y', '0');
            leaf.style.setProperty('--end-y', (Math.random() * 200 + 80) + 'px');
            leaf.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
            leaf.style.setProperty('--dur', (Math.random() * 1.5 + 0.8) + 's');
            leaf.style.animationDelay = (Math.random() * 0.5) + 's';
            card.appendChild(leaf);
        }
        overlay.addEventListener('click', () => overlay.remove());
        setTimeout(() => overlay.remove(), 4000);
    },

    // ── EE #7: Timbro LAUS DEO ──────────────────────────────────────
    triggerLausDeo() {
        if (document.getElementById('lex-laus-deo')) return;
        const stamp = document.createElement('div');
        stamp.className = 'laus-deo-stamp';
        stamp.id = 'lex-laus-deo';
        stamp.innerHTML = `
            <div class="laus-deo-inner">
                <span class="laus-deo-title">LAUS · DEO</span>
                <span class="laus-deo-sub">Excellentia Academica · ≥ 90%</span>
            </div>
        `;
        document.body.appendChild(stamp);
        setTimeout(() => stamp.remove(), 4000);
    },

    // ── Inizializzazione Globale EE ──────────────────────────────────
    initEasterEggs() {
        this.initKonami();
        this.initGhostBiblioteca();
        // Manoscritto: solo sulla home (index.html)
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Lex/')) {
            setTimeout(() => this.tryManoscrittoPerso(), 3000);
        }
        // Colofone: su tutte le pagine di codicologia
        if (window.location.pathname.includes('codicologia')) {
            setTimeout(() => this.checkColofone(), 1500);
        }
        // Dispaccio: traccio le aperture di capitoli di Storia
        if (window.location.pathname.includes('storia')) {
            this._initDispaccioTracker();
        }
        // Campanile: pagine di Arte Cristiana
        if (window.location.pathname.includes('cristiana')) {
            this._checkCampanile();
        }
        // Nuovi Easter Eggs
        this.initBackgroundInkBlot();
        this.initDamnatioMemoriaeWatcher();
        this.initMouseTopolinoTracker();
        this.initAlchimistaWatcher();
        this.initScismaIconoclasta();
        
        // 7 Nuovi Easter Eggs
        this.initEclissiTheme();
        this.initPalinsestoBobbio();
        this.initTarloWatcher();
        this.initCavernaPlatoneWatcher();
        this.initStratigrafiaWatcher();
        this.initDamnatioMemoriaeQuizWatcher();
    },

    // ═══════════════════════════════════════════════════════════════
    // EASTER EGG REGISTRY — SISTEMA LOCK/UNLOCK GLOBALE
    // ═══════════════════════════════════════════════════════════════

    EE_REGISTRY: [
        // ── Categoria: Amore & Romantico ──
        { id:'ee-portale-atena',     cat:'amore',       icon:'Φ',  name:'Il Portale di Atena',           hint:'Un antico simbolo greco si nasconde in fondo alla pagina principale...',           desc:'Clicca il simbolo Φ nel footer della home e inserisci la parola d\'ordine "pantheon".', page:'index.html' },
        { id:'ee-lettera-amore',     cat:'amore',       icon:'❤️', name:'La Lettera d\'Amore',            hint:'Le parole più dolci sbloccano qualcosa di inaspettato nella ricerca...',           desc:'Digita "ti amo", "amore", "alessandra" o "lex" nel motore di ricerca.', page:'index.html' },
        { id:'ee-chatbot-romantico', cat:'amore',       icon:'💬', name:'Il Chatbot Romantico',           hint:'L\'assistente IA cela una sorpresa per chi fa le domande giuste...',               desc:'Chiedi all\'assistente qualcosa che contenga "alessio", "amore" o "fidanzato".', page:'assistant.html' },
        { id:'ee-cuori-highlight',   cat:'amore',       icon:'💖', name:'Esplosione di Cuori',            hint:'Evidenziare è un atto d\'amore — prova a sottolineare qualcosa...',                desc:'Evidenzia un paragrafo con qualsiasi colore nelle sintesi dei capitoli.', page:'*' },
        { id:'ee-coccole',           cat:'amore',       icon:'🌸', name:'Modalità Coccole',               hint:'Il pulsante tema nasconde un\'opzione rosa e dolcissima...',                       desc:'Clicca il pulsante tema 3 volte fino ad attivare la modalità coccole.', page:'*' },
        { id:'ee-toast-motivazionale',cat:'amore',      icon:'✨', name:'Toast Motivazionale',            hint:'Studiare e poi chiudere una sintesi ha la sua piccola ricompensa...',              desc:'Chiudi una sintesi dopo averla letta.', page:'*' },
        { id:'ee-memory-game',       cat:'amore',       icon:'🎮', name:'Memory Game Nascosto',           hint:'Il Pomodoro nasconde qualcosa di ludico nelle sue pause...',                      desc:'Trova il Memory Game nel pannello Pomodoro della barra laterale.', page:'*' },
        { id:'ee-frecce-cupido',     cat:'amore',       icon:'🏹', name:'Le Frecce di Cupido',            hint:'Unire i concetti giusti può far scoccare la scintilla...',                         desc:'Collega i nodi "Alessio" (o "Lex") e "Alessandra" nella lavagna di Connections.', page:'connections.html' },
        { id:'ee-clessidra-romantica',cat:'amore',      icon:'⏳', name:'Tempo d\'Amore',                 hint:'Il tempo si ferma per chi si ama... letteralmente.',                               desc:'Imposta il timer di pausa esattamente a 14 minuti.', page:'*' },
        { id:'ee-serenata-retro',    cat:'amore',       icon:'🎶', name:'La Serenata del Bot',            hint:'Chiedi una melodia per il tuo cuore all\'assistente...',                           desc:'Chiedi all\'assistente "cantami una canzone" o "dedicami una serenata".', page:'assistant.html' },
        { id:'ee-eclissi-tema',      cat:'amore',       icon:'🌌', name:'L\'Eclissi degli Innamorati',     hint:'Quando il Sole e la Luna si fondono, il cielo si tinge dei colori del cuore.',    desc:'Tieni premuto il pulsante del tema per 3 secondi o fai doppio clic premendo A.', page:'*' },
        { id:'ee-messaggio-bottiglia',cat:'amore',      icon:'🏺', name:'Il Messaggio del Naufrago',       hint:'Un antico frammento d\'amore fluttua nel mare delle connessioni concettuali...',   desc:'Nella mappa Connections, collega Alessio e Alessandra a grande distanza (>60% schermo).', page:'connections.html' },
        // ── Categoria: Scriptorium ──
        { id:'ee-colofone',          cat:'scriptorium', icon:'✦',  name:'Il Colofone del Copista',        hint:'"Explicit liber"... cosa succede quando si chiude davvero un\'opera?',             desc:'Completa tutti e 12 i capitoli di Codicologia.', page:'codicologia/index.html' },
        { id:'ee-manoscritto',       cat:'scriptorium', icon:'📜', name:'Il Manoscritto Perduto',         hint:'La fortuna sorride a chi apre la porta giusta nel momento giusto...',              desc:'Con l\'1% di probabilità ad ogni apertura della home, un frammento di pergamena appare.', page:'index.html' },
        { id:'ee-konami',            cat:'scriptorium', icon:'🎹', name:'Sequenza Konami del Copista',    hint:'Una celebre sequenza di tasti trasforma l\'interfaccia in uno scriptorium...',     desc:'Digita ↑↑↓↓←→←→BA da tastiera su qualsiasi pagina.', page:'*' },
        { id:'ee-fantasma',          cat:'scriptorium', icon:'👻', name:'Il Fantasma della Biblioteca',   hint:'"I manoscritti non bruciano" — ma appaiono ad un\'ora molto precisa...',           desc:'Apri la piattaforma alle 23:59.', page:'*' },
        { id:'ee-codex-aureus',      cat:'scriptorium', icon:'🏅', name:'Codex Aureus — Auctor Perfectus',hint:'La perfezione accademica viene premiata con l\'oro...',                           desc:'Rispondi correttamente a 10 domande consecutive senza errori.', page:'*' },
        { id:'ee-scriptore',         cat:'scriptorium', icon:'🔍', name:'Lo Scriptore Segreto',           hint:'Un capitolo non catalogato attende chi cerca nel posto giusto...',                desc:'Cerca la parola esatta "scriptorium" nel motore di ricerca della home.', page:'index.html' },
        { id:'ee-laus-deo',          cat:'scriptorium', icon:'🔴', name:'Timbro LAUS DEO',                hint:'"Laus Deo" — solo un voto eccellente merita questo sigillo antico...',            desc:'Completa una simulazione d\'esame con punteggio ≥ 90%.', page:'exam.html' },
        { id:'ee-inchiostro-rovesciato',cat:'scriptorium',icon:'✒️', name:'Macchia di Inchiostro',           hint:'Anche il miglior copista può commettere un errore maldestro sulla pergamena.',     desc:'Fai click 7 volte sullo sfondo vuoto di qualsiasi pagina di sintesi.', page:'*' },
        { id:'ee-damnatio-memoriae', cat:'scriptorium', icon:'🏛️', name:'Damnatio Memoriae',              hint:'Cancellare la storia per riscriverla da capo.',                                    desc:'Seleziona un testo in una sintesi e premi Canc o Backspace sulla tastiera.', page:'*' },
        { id:'ee-topolino-biblioteca',cat:'scriptorium',icon:'🐭', name:'Il Topo d\'Archivio',              hint:'Un piccolo ospite rosicchia i volumi più antichi nel silenzio della notte.',       desc:'Muovi il cursore sui bordi dello schermo per 30 secondi senza cliccare.', page:'*' },
        { id:'ee-index-prohibitorum',cat:'scriptorium', icon:'🔥', name:'L\'Indice dei Libri Proibiti',   hint:'Ci sono stanze della biblioteca in cui è vietato l\'accesso... ma l\'indirizzo è palese.',desc:'Forza l\'URL inserendo manualmente segreti.html o prohibited.html.', page:'*' },
        { id:'ee-palinsesto-bobbio', cat:'scriptorium', icon:'📜', name:'Il Palinsesto Nascosto',         hint:'Sotto le parole moderne giace la sapienza antica. Raschia via il presente.',       desc:'Nelle sintesi di Codicologia, trascina velocemente il mouse avanti e indietro su un paragrafo.', page:'codicologia/index.html' },
        { id:'ee-tarlo-biblioteca',  cat:'scriptorium', icon:'🐛', name:'Il Tarlo del Codice',            hint:'Se lasci la pergamena incustodita troppo a lungo, qualcuno farà merenda...',       desc:'Rimani completamente inattivo per esattamente 3 minuti su una pagina di sintesi.', page:'*' },
        // ── Categoria: Materie ──
        { id:'ee-dedica-augusto',    cat:'materie',     icon:'🏛️', name:'La Dedica dell\'Augusto',        hint:'"Tres faciunt collegium" — cosa succede se premi tre volte?',                    desc:'Clicca 3 volte di fila sul titolo del capitolo nella sintesi di Arte Romana.', page:'arte_romana/index.html' },
        { id:'ee-sentenza-pretore',  cat:'materie',     icon:'⚖️', name:'La Sentenza del Pretore',        hint:'Il diritto romano non perdona gli ignoranti... né li premia senza fatica.',       desc:'Nel quiz di Diritto, sbaglia 3 risposte di fila, poi rispondi correttamente 3 volte.', page:'exam.html' },
        { id:'ee-critico-ubriaco',   cat:'materie',     icon:'🎨', name:'Il Critico d\'Arte Ubriaco',     hint:'"Bellissimo!" dicevano i critici dell\'800... prova a dirlo anche tu.',           desc:'Cerca la parola "bellissimo" nel motore di ricerca della home.', page:'index.html' },
        { id:'ee-dispaccio',         cat:'materie',     icon:'📜', name:'Il Dispaccio del Corriere',      hint:'Versailles ha una missione urgente per chi studia la Storia Moderna...',          desc:'Apri 5 capitoli di Storia Moderna nella stessa sessione.', page:'storia/*' },
        { id:'ee-oracolo',           cat:'materie',     icon:'🏺', name:'L\'Oracolo di Delfi',            hint:'"Conosci te stesso" — ma chi sei davvero? Chiedi all\'assistente...',             desc:'Digita "chi sono?" o "cosa farò?" nell\'assistente AI.', page:'assistant.html' },
        { id:'ee-campanile',         cat:'materie',     icon:'⛪', name:'La Voce del Campanile',          hint:'"Ora est et nunc tempus" — l\'ora piena ha il suo suono segreto...',             desc:'Apri un capitolo di Arte Cristiana all\'ora esatta (es. 15:00, 16:00...).', page:'cristiana/index.html' },
        { id:'ee-professore',        cat:'materie',     icon:'🎓', name:'Il Consiglio del Professore',    hint:'"Sapere è potere, ma non sapere ha le sue conseguenze..." — controlla le analytics.', desc:'Visita la pagina Analytics con readiness < 40% o > 95%.', page:'analytics.html' },
        { id:'ee-costellazione',     cat:'materie',     icon:'⭐', name:'La Costellazione — Nexus Sapientiae', hint:'"Nexus Sapientiae" — sette è il numero perfetto nel cielo accademico...',   desc:'Collega 7 o più nodi nella mappa trans-disciplinare di Connections.', page:'connections.html' },
        { id:'ee-custos-memoriae',   cat:'materie',     icon:'🏆', name:'Custos Memoriae',                hint:'Un badge che non compare nella lista... esiste solo per i più completi.',         desc:'Sblocca tutti gli altri achievement nella pagina Traguardi.', page:'achievements.html' },
        { id:'ee-macchina-tempo',    cat:'materie',     icon:'⏱️', name:'La Macchina del Tempo',          hint:'"Il tempo non è una freccia ma un labirinto" — insisti su un evento...',        desc:'Clicca 5 volte sullo stesso evento nella Timeline storica.', page:'timeline.html' },
        { id:'ee-monaco',            cat:'materie',     icon:'🔔', name:'Il Promemoria del Monaco',       hint:'"Ora prima. Laus Deo." — il monaco approva chi studia all\'alba.',               desc:'Genera una roadmap nel Planner con data dell\'esame molto vicina (≤ 3 giorni).', page:'planner.html' },
        { id:'ee-wax-tablet',        cat:'materie',     icon:'🗿', name:'High Score Leggendario',         hint:'"Victor ex aequo" — batti il tuo stesso record con stile.',                      desc:'Batti il tuo record precedente nei minigame di oltre il 20%.', page:'minigames.html' },
        { id:'ee-scisma-iconoclasta',cat:'materie',     icon:'⛪', name:'La Crisi Iconoclasta',           hint:'Distruggi le immagini per salvare lo spirito.',                                    desc:'Fai doppio click su un\'immagine nei capitoli di Arte Cristiana o Bizantina.', page:'*' },
        { id:'ee-pecunia-non-olet',  cat:'materie',     icon:'🪙', name:'Il Tesoro di Vespasiano',        hint:'L\'oro non ha odore, specialmente sotto l\'esame del Pretore.',                   desc:'Durante una domanda fiscale sul Diritto Romano, clicca ripetutamente sulle monete/punti.', page:'exam.html' },
        { id:'ee-ghigliottina',      cat:'materie',     icon:'⚔️', name:'Il Taglio della Storia',         hint:'A Versailles le teste cadono velocemente... interrompi il flusso.',               desc:'Nella Linea del Tempo, trascina lo slider dall\'anno 1789 al 1793 velocemente.', page:'timeline.html' },
        { id:'ee-notte-stellata',    cat:'materie',     icon:'🌌', name:'Il Delirio di Van Gogh',         hint:'La follia creativa deforma la realtà della pagina.',                               desc:'Apri la pagina Analytics dopo aver studiato tra le 02:00 e le 05:00 del mattino.', page:'analytics.html' },
        { id:'ee-alchimista',        cat:'materie',     icon:'🧪', name:'La Pietra Filosofale',           hint:'Trasmutare il piombo in oro richiede la giusta combinazione di elementi.',        desc:'Seleziona consecutivamente le parole "Corpo", "Anima" e "Spirito" in un testo.', page:'*' },
        { id:'ee-decodifica-codex',  cat:'materie',     icon:'🔓', name:'Decodificatore di Codex',        hint:'Risolvi il mistero nascosto nel cifrario medievale...',                           desc:'Decodifica una frase latina nell\'Arena Minigiochi.', page:'minigames.html' },
        { id:'ee-cruciverba-completato',cat:'materie',  icon:'🧩', name:'Scriba Enigmatico',               hint:'Completa tutti i termini dello Scriptorium nel cruciverba...',                    desc:'Completa con successo il cruciverba didattico.', page:'minigames.html' },
        { id:'ee-caccia-tesoro-completata',cat:'materie',icon:'🏆', name:'Il Saggio di Alessandria',       hint:'Tre glifi antichi si nascondono nelle sintesi di materie diverse...',             desc:'Trova ed evidenzia i 3 glifi antichi nascosti nei capitoli.', page:'*' },
        { id:'ee-cronista-scriptorium',cat:'scriptorium',icon:'✍️', name:'Il Cronista dello Scriptorium',  hint:'Il tempo si misura in versioni... clicca sul numero per fare un salto nel passato.', desc:'Clicca 5 volte di fila sul numero di versione v2.5.0 nel modal del Changelog.', page:'*' },
        { id:'ee-caverna-platone',   cat:'materie',     icon:'🕯️', name:'La Caverna di Platone',          hint:'Ciò che vedi è solo un\'ombra. Spegni le luci e cerca la verità nella roccia.',    desc:'Nella sintesi di Filosofia con tema Scuro, seleziona la parola "Caverna" o "Ombra".', page:'filosofia/*' },
        { id:'ee-stratigrafia',      cat:'materie',     icon:'⛏️', name:'Lo Scavo Archeologico',          hint:'La conoscenza è stratificata. Scava oltre i limiti della pagina.',                desc:'Fai scorrimento continuo (overscroll) verso il basso a fondo pagina per 5 volte.', page:'*' },
        { id:'ee-damnatio-memoriae-quiz',cat:'materie', icon:'🛡️', name:'L\'Eresia Giuridica',            hint:'Certe eresie giuridiche non meritano risposta, solo l\'oblio della censura.',      desc:'Nel Simulatore d\'Esame, in una domanda di Diritto, premi Ctrl + Shift + X.', page:'exam.html' }
    ],

    unlockEasterEgg(id) {
        try {
            const unlocked = JSON.parse(localStorage.getItem('lex-ee-unlocked') || '[]');
            if (!unlocked.includes(id)) {
                unlocked.push(id);
                localStorage.setItem('lex-ee-unlocked', JSON.stringify(unlocked));
                const egg = this.EE_REGISTRY.find(e => e.id === id);
                if (egg) this._showEEUnlockToast(egg);
            }
        } catch(e) {}
    },

    getUnlockedEggs() {
        try {
            return JSON.parse(localStorage.getItem('lex-ee-unlocked') || '[]');
        } catch(e) { return []; }
    },

    isEggUnlocked(id) {
        return this.getUnlockedEggs().includes(id);
    },

    _showEEUnlockToast(egg) {
        const existing = document.getElementById('lex-ee-unlock-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.id = 'lex-ee-unlock-toast';
        toast.className = 'ee-unlock-toast';
        toast.innerHTML = `
            <div class="ee-unlock-icon">${egg.icon}</div>
            <div class="ee-unlock-text">
                <div class="ee-unlock-title">🔓 Segreto Sbloccato!</div>
                <div class="ee-unlock-name">${egg.name}</div>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 50);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    },

    // ═══════════════════════════════════════════════════════════════
    // 12 NUOVI EASTER EGG — MATERIE
    // ═══════════════════════════════════════════════════════════════

    // ── EE Dedica dell'Augusto (Arte Romana, triple click titolo) ──
    triggerDedicaAugusto() {
        if (document.getElementById('lex-epigraphic-overlay')) return;
        this.unlockEasterEgg('ee-dedica-augusto');
        const overlay = document.createElement('div');
        overlay.id = 'lex-epigraphic-overlay';
        overlay.className = 'epigraphic-overlay';
        overlay.innerHTML = `
            <div class="epigraphic-stone">
                <div class="epigraphic-text" id="epigraphic-incised"></div>
                <div class="epigraphic-sub">Inscritto nel marmo · Lex Studiorum</div>
                <button class="epigraphic-close" onclick="document.getElementById('lex-epigraphic-overlay').remove()">Congedare l'Imperatore</button>
            </div>
        `;
        document.body.appendChild(overlay);

        const txt = "IMP · CAESAR · DIVI · F · AVGVSTVS · PONTIF · MAX";
        let idx = 0;
        const target = document.getElementById('epigraphic-incised');
        
        function playChiselTick() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = 1200 + Math.random() * 400;
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                osc.start(); osc.stop(ctx.currentTime + 0.08);
            } catch(e) {}
        }

        const interval = setInterval(() => {
            if (idx >= txt.length) {
                clearInterval(interval);
                return;
            }
            const char = txt[idx++];
            target.textContent += char;
            if (char !== ' ') {
                playChiselTick();
            }
        }, 120);
    },

    // ── EE Sentenza del Pretore (Diritto, streak wrong/right) ────────
    triggerSentenzaPretore(isAbsolutus) {
        const id = 'lex-pretore-overlay';
        if (document.getElementById(id)) return;
        this.unlockEasterEgg('ee-sentenza-pretore');
        const overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'pretore-overlay';
        overlay.innerHTML = `
            <div class="pretore-card ${isAbsolutus ? 'absolutus' : ''}">
                <div class="pretore-title">${isAbsolutus ? 'ABSOLUTUS EST' : 'IN VINCULA DUCTUS EST'}</div>
                <p class="pretore-text">
                    ${isAbsolutus 
                        ? 'La giuria ha deliberato. Con tre risposte esatte consecutive avete riscattato il vostro onore. Siete assolto da ogni accusa accademica.' 
                        : 'La legge delle XII Tavole è chiara. Con tre risposte errate di fila avete dimostrato grave ignoranza del diritto dei beni culturali. Siete condotto in catene.'
                    }
                </p>
                <button class="pretore-close" onclick="document.getElementById('lex-pretore-overlay').remove()">Ritorna al Quiz</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE Critico d'Arte Ubriaco (ricerca "bellissimo") ────────────
    triggerCriticoUbriaco() {
        if (document.getElementById('lex-critico-overlay')) return;
        this.unlockEasterEgg('ee-critico-ubriaco');
        const CRITICHE = [
            { autore: 'Isidoro Bramante-Frasca', anno: 1847, testo: '"È un\'opera di sublime e celestiale fattura, elevata com\'è al di sopra di qualsiasi umana comprensione, benché il pittore sia certamente morto di fame e probabilmente non avesse pagato l\'affitto da quattro anni. La luce! L\'ombra! Il chiaroscuro! In sostanza: bellissimo."' },
            { autore: 'Edmondo De Caravelli', anno: 1863, testo: '"Questa tela trasuda un\'anima che piange lacrime di gloria e gloria di lacrime. Il colore è colore. La forma è forma. Eppure è qualcosa di più: è una forma di colore e un colore di forma. Ho pianto. Ho riso. Ho pranzato. Bellissimo."' },
            { autore: 'Celestino Artefice', anno: 1891, testo: '"Come osare criticare ciò che supera la critica stessa? Il pennello ha danzato sulla tela come un cigno ubriaco di esistenza. Non so cosa significhi, ma ho detto \'bellissimo\' a voce così alta che mi hanno buttato fuori dalla galleria."' },
        ];
        const c = CRITICHE[Math.floor(Math.random() * CRITICHE.length)];
        const overlay = document.createElement('div');
        overlay.id = 'lex-critico-overlay';
        overlay.className = 'critico-overlay';
        overlay.innerHTML = `
            <div class="critico-card">
                <div class="critico-header">
                    <span class="critico-ornament">🎨</span>
                    <div class="critico-meta">Critica d'Arte · ${c.anno}</div>
                </div>
                <blockquote class="critico-quote">${c.testo}</blockquote>
                <div class="critico-firma">— ${c.autore}, <em>Bollettino delle Arti Sublime</em></div>
                <button class="critico-close" onclick="document.getElementById('lex-critico-overlay').remove()">Chiudi la Galleria</button>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 12000);
    },

    // ── EE Dispaccio del Corriere (5 capitoli Storia nella sessione) ─
    _initDispaccioTracker() {
        const origTrack = this.trackChapterRead.bind(this);
        this.trackChapterRead = (chapterId) => {
            origTrack(chapterId);
            if (chapterId && (chapterId.includes('storia') || window.location.pathname.includes('storia'))) {
                let count = parseInt(sessionStorage.getItem('lex-storia-chapters-count') || '0');
                count++;
                sessionStorage.setItem('lex-storia-chapters-count', count.toString());
                if (count === 5 && !this.isEggUnlocked('ee-dispaccio')) {
                    setTimeout(() => this.triggerDispaccio(), 800);
                }
            }
        };
    },

    triggerDispaccio() {
        if (document.getElementById('lex-dispaccio-overlay')) return;
        this.unlockEasterEgg('ee-dispaccio');
        const overlay = document.createElement('div');
        overlay.id = 'lex-dispaccio-overlay';
        overlay.className = 'dispaccio-overlay';
        overlay.innerHTML = `
            <div class="dispaccio-card">
                <div class="dispaccio-seal">🔴</div>
                <div class="dispaccio-header">DISPACCIO URGENTE — VERSAILLES, Anno di Grazia 1789</div>
                <div class="dispaccio-body">
                    <p>Da: <em>Monsieur le Ministre des Archives Secrètes de Sa Majesté</em></p>
                    <p>A: Lo Studente Diligente della Materia di Storia Moderna</p>
                    <p>Oggetto: <strong>Rapporto di Ricognizione — Cinque Missioni Completate</strong></p>
                    <p style="margin-top:1rem; font-style:italic;">"Avete letto con diligenza i cinque dispacci che vi erano stati affidati. La Corona vi ha osservato con approvazione. Ricordate: la Rivoluzione Francese (1789), il Congresso di Vienna (1815), le Unificazioni (1848-1871) e le Guerre Mondiali (1914–1945) sono le pietre angolari di ogni analisi storica degna di tal nome. Continuate il servizio alla conoscenza."</p>
                    <p style="text-align:right; margin-top:1rem;">— Firmato con sigillo reale</p>
                </div>
                <button class="dispaccio-close" onclick="document.getElementById('lex-dispaccio-overlay').remove()">Chiudere il Dispaccio</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE Oracolo di Delfi (assistant chat) ─────────────────────────
    ORACOLO_RESPONSES: [
        '"Chi sei tu?" chiede lo studente. Risponde l\'oracolo: <em>"Sei colui che legge quando gli altri dormono, e che dorme quando gli esami incombono. Sei la domanda e la risposta, il codice e il copista. La tua stella è il frammento di una biblioteca mai bruciata."</em>',
        '"Cosa farò?" implora il pellegrino. L\'oracolo tace tre volte, poi parla: <em>"Porterai il peso dei libri come Atlante portava il mondo. Ma il tuo peso illuminerà, non schiaccerà. Un esame ti attende. Un altro ancora. E poi la laurea, come la primavera dopo il lungo inverno dello studio."</em>',
        'La Pizia si alza dalla sua sede, le pupille dilatate: <em>"Non cercare il futuro nei miei fumi. Il futuro è nelle sintesi che non hai ancora letto, nelle flashcard che hai rimandato, nelle simulazioni che temi. Vai. Studia. Il destino aiuta chi si prepara."</em>',
    ],
    triggerOracoloDelfi(addBotFn) {
        this.unlockEasterEgg('ee-oracolo');
        const r = this.ORACOLO_RESPONSES[Math.floor(Math.random() * this.ORACOLO_RESPONSES.length)];
        if (addBotFn) {
            addBotFn(`<div style="font-family:Georgia,serif; font-style:italic; border-left:3px solid #c9a84c; padding-left:1rem; color:var(--accent-gold);">🏺 <strong>L'Oracolo di Delfi risponde:</strong><br><br>${r}</div>`);
        }
    },

    // ── EE Voce del Campanile (ora piena, pagine cristiana) ──────────
    _checkCampanile() {
        const now = new Date();
        if (now.getMinutes() === 0 && now.getSeconds() < 30) {
            if (sessionStorage.getItem('lex-campanile-played')) return;
            sessionStorage.setItem('lex-campanile-played', '1');
            setTimeout(() => this.triggerCampanile(now.getHours()), 1000);
        }
    },

    triggerCampanile(hour) {
        this.unlockEasterEgg('ee-campanile');
        const HORAE = {1:'Prima',2:'Secunda',3:'Tertia',4:'Quarta',5:'Quinta',6:'Sexta',7:'Septima',8:'Octava',9:'Nona',10:'Decima',11:'Undecima',12:'Duodecima',13:'Tertia (post meridiem)',14:'Quarta (post meridiem)',15:'Nona (post meridiem)',16:'Quarta decima',17:'Quinta decima',18:'Sexta decima',19:'Septima decima',20:'Octava decima',21:'Nona decima',22:'Vicesima secunda',23:'Vicesima tertia',0:'Vigilia Noctis'};
        const horaName = HORAE[hour] || 'Hora Incognita';
        // Suono campana via Web Audio
        this._playCampanaBell(hour);
        // Toast animato
        const toast = document.createElement('div');
        toast.className = 'campanile-toast';
        toast.id = 'lex-campanile-toast';
        toast.innerHTML = `<span class="campanile-bell">🔔</span><div><div class="campanile-hora">Hora ${horaName}</div><div class="campanile-sub">Anno Domini MMXXVI · Lex Studiorum</div></div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 50);
        setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 500); }, 4000);
    },

    _playCampanaBell(times) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const ringCount = Math.min(times, 4) || 1;
            for (let i = 0; i < ringCount; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = 523.25;
                osc.type = 'sine';
                const t = ctx.currentTime + i * 0.9;
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.25, t + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc.start(t); osc.stop(t + 0.8);
            }
        } catch(e) {}
    },

    // ── EE Consiglio del Professore (analytics readiness) ─────────────
    triggerConsiglioProf(prob) {
        if (document.getElementById('lex-professore-overlay')) return;
        this.unlockEasterEgg('ee-professore');
        const isLow = prob < 40;
        const overlay = document.createElement('div');
        overlay.id = 'lex-professore-overlay';
        overlay.className = 'professore-overlay';
        overlay.innerHTML = `
            <div class="professore-card ${isLow ? 'prof-warning' : 'prof-success'}">
                <div class="prof-emoji">${isLow ? '👨‍🏫' : '🎓'}</div>
                <div class="prof-title">${isLow ? 'Il Professore scuote la testa...' : 'Il Professore si alza in piedi!'}</div>
                <p class="prof-text">${isLow 
                    ? '"Non è ancora il momento di presentarsi all\'esame, caro studente. Torno in cattedra quando avrete letto almeno qualche altro capitolo. Arrivederci."' 
                    : '"Straordinario! Raramente vedo una preparazione così solida. Se continuate così, otterrete la lode. Forse anche un dottorato. Forse." *applaude lentamente*'
                }</p>
                <button class="prof-close" onclick="document.getElementById('lex-professore-overlay').remove()">Congedare il Professore</button>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 8000);
    },

    // ── EE Costellazione (7+ nodi in connections) ────────────────────
    _sessionLinks: 0,
    trackConnectionLink() {
        this._sessionLinks++;
        if (this._sessionLinks === 7 && !this.isEggUnlocked('ee-costellazione')) {
            setTimeout(() => this.triggerCostellazione(), 500);
        }
    },

    triggerCostellazione() {
        this.unlockEasterEgg('ee-costellazione');
        const overlay = document.createElement('div');
        overlay.id = 'lex-costellazione-overlay';
        overlay.className = 'costellazione-overlay';
        overlay.innerHTML = `
            <div class="costellazione-card">
                <canvas id="costellazione-canvas" width="320" height="200"></canvas>
                <div class="costellazione-title">✦ Nexus Sapientiae ✦</div>
                <div class="costellazione-sub">Hai tracciato la costellazione della conoscenza</div>
                <button onclick="document.getElementById('lex-costellazione-overlay').remove()" class="costellazione-close">Chiudere il Firmamento</button>
            </div>
        `;
        document.body.appendChild(overlay);
        // Anima la costellazione su canvas
        setTimeout(() => {
            const canvas = document.getElementById('costellazione-canvas');
            if (!canvas) return;
            const ctx2 = canvas.getContext('2d');
            const stars = Array.from({length:12}, () => ({ x: Math.random()*300+10, y: Math.random()*180+10, r: Math.random()*2+1 }));
            ctx2.fillStyle = '#0b0f19';
            ctx2.fillRect(0,0,320,200);
            let drawn = 0;
            const interval = setInterval(() => {
                if (drawn >= stars.length) { clearInterval(interval); return; }
                const s = stars[drawn++];
                ctx2.beginPath();
                ctx2.arc(s.x, s.y, s.r, 0, Math.PI*2);
                ctx2.fillStyle = '#f0c040';
                ctx2.shadowBlur = 8; ctx2.shadowColor = '#f0c040';
                ctx2.fill();
                if (drawn > 1) {
                    ctx2.beginPath();
                    ctx2.moveTo(stars[drawn-2].x, stars[drawn-2].y);
                    ctx2.lineTo(s.x, s.y);
                    ctx2.strokeStyle = 'rgba(240,192,64,0.3)'; ctx2.lineWidth = 0.8;
                    ctx2.stroke();
                }
            }, 180);
        }, 200);
        setTimeout(() => document.getElementById('lex-costellazione-overlay')?.remove(), 10000);
    },

    // ── EE Macchina del Tempo (5 click stesso evento timeline) ──────
    _timelineClickMap: {},
    trackTimelineClick(eventId, eventData) {
        if (!this._timelineClickMap[eventId]) this._timelineClickMap[eventId] = 0;
        this._timelineClickMap[eventId]++;
        if (this._timelineClickMap[eventId] === 5) {
            this._timelineClickMap[eventId] = 0;
            this.triggerMacchinaDelTempo(eventData);
        }
    },

    triggerMacchinaDelTempo(eventData) {
        this.unlockEasterEgg('ee-macchina-tempo');
        const existing = document.getElementById('lex-macchina-overlay');
        if (existing) existing.remove();
        const overlay = document.createElement('div');
        overlay.id = 'lex-macchina-overlay';
        overlay.className = 'macchina-overlay';
        const anno = eventData?.year || eventData?.date || '???';
        const titolo = eventData?.title || 'Evento Storico';
        overlay.innerHTML = `
            <div class="macchina-vortex" id="lex-macchina-vortex"></div>
            <div class="macchina-card">
                <div class="macchina-year">${anno}</div>
                <div class="macchina-title">⏱️ Sei tornato nell\'anno ${anno}</div>
                <p class="macchina-text">Benvenuto. Intorno a te: <strong>${titolo}</strong>. L\'aria odora di polvere da sparo, inchiostro fresco e incertezza storica. Nessuno sa ancora come andrà a finire. Solo tu sì — hai studiato le sintesi.</p>
                <button class="macchina-close" onclick="document.getElementById('lex-macchina-overlay').remove()">Tornare al Presente</button>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 10000);
    },

    // ── EE Promemoria Monaco (planner, esame vicinissimo ≤ 3 giorni) ─
    triggerPromemoriaMonaco() {
        if (document.getElementById('lex-monaco-toast')) return;
        this.unlockEasterEgg('ee-monaco');
        const toast = document.createElement('div');
        toast.id = 'lex-monaco-toast';
        toast.className = 'monaco-toast';
        toast.innerHTML = `
            <div class="monaco-icon">🔔</div>
            <div class="monaco-text">
                <strong>Ora Prima. Laus Deo.</strong><br>
                <span>Il monaco approva il tuo spirito ascetico.<br>"In hoc signo vinces" — studia con fede.</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 50);
        setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 500); }, 5000);
    },

    // ── EE Wax Tablet (minigame, batti record di >20%) ──────────────
    triggerWaxTablet(playerName, score) {
        if (document.getElementById('lex-waxtablet-overlay')) return;
        this.unlockEasterEgg('ee-wax-tablet');
        const overlay = document.createElement('div');
        overlay.id = 'lex-waxtablet-overlay';
        overlay.className = 'waxtablet-overlay';
        overlay.innerHTML = `
            <div class="waxtablet-card">
                <div class="waxtablet-title">TABULA VICTORIAE</div>
                <div class="waxtablet-score">${score}</div>
                <div class="waxtablet-name">${playerName || 'Victor Academicus'}</div>
                <div class="waxtablet-sub">Record leggendario inciso nella cera · Lex Studiorum</div>
                <button class="waxtablet-close" onclick="document.getElementById('lex-waxtablet-overlay').remove()">Suggellare il Record</button>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 8000);
    },

    // ── EE Custos Memoriae (tutti gli achievement) ──────────────────
    checkCustosMemoriae() {
        try {
            const completed = JSON.parse(localStorage.getItem('lex-achievements-completed') || '[]');
            // Controlla se ci sono almeno 15 achievement completati
            if (completed.length >= 15 && !this.isEggUnlocked('ee-custos-memoriae')) {
                this.unlockEasterEgg('ee-custos-memoriae');
                setTimeout(() => this.triggerCustosMemoriae(), 1000);
            }
        } catch(e) {}
    },

    triggerCustosMemoriae() {
        if (document.getElementById('lex-custos-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'lex-custos-overlay';
        overlay.className = 'colofone-overlay';
        overlay.innerHTML = `
            <div class="colofone-card" style="border-color:#f0c040; box-shadow: 0 0 80px rgba(240,192,64,0.4);">
                <span class="colofone-ornament" style="font-size:3rem;">🏆</span>
                <div class="colofone-title" style="color:#f0c040;">Custos Memoriae</div>
                <p class="colofone-text">"Qui custodisce la memoria custodisce la civiltà stessa. Hai completato il ciclo degli achievement, dimostrandoti non solo studioso, ma guardiano del sapere accademico."</p>
                <div class="colofone-sub">Badge Segreto · Sbloccato · Lex Studiorum</div>
                <button class="colofone-close" style="border-color:#f0c040; color:#f0c040;" onclick="document.getElementById('lex-custos-overlay').remove()">Ricevere il Titolo ✦</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE-INK-BLOT: Macchia di inchiostro ───────────────────────────
    initBackgroundInkBlot() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        if (['minigames.html', 'exam.html', 'flashcards.html', 'connections.html', 'timeline.html', 'achievements.html', 'index.html', 'easter_eggs.html', 'segreti.html', 'prohibited.html'].includes(page) || window.location.pathname === '/') {
            return;
        }

        let clicks = 0;
        let lastClickTime = 0;
        document.addEventListener('click', (e) => {
            const now = Date.now();
            // Evita click su bottoni, link, input o immagini
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('img') || e.target.closest('textarea') || e.target.closest('#lex-pomo-container')) {
                clicks = 0;
                return;
            }
            if (now - lastClickTime < 1000) {
                clicks++;
            } else {
                clicks = 1;
            }
            lastClickTime = now;
            if (clicks === 7) {
                clicks = 0;
                this.triggerInkBlot(e.clientX, e.clientY);
            }
        });
    },

    triggerInkBlot(x, y) {
        if (document.getElementById('lex-ink-blot-overlay')) return;
        this.unlockEasterEgg('ee-inchiostro-rovesciato');
        const overlay = document.createElement('div');
        overlay.id = 'lex-ink-blot-overlay';
        overlay.className = 'ink-blot-overlay';
        overlay.innerHTML = `
            <div class="ink-blot-spot" style="left: ${x}px; top: ${y}px;"></div>
            <div class="ink-blot-text">Maledictus textus... pulisci la pergamena!</div>
        `;
        document.body.appendChild(overlay);
        
        // Sound effect (splash)
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = ctx.sampleRate * 0.4;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.3);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch(e) {}

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 1000);
        }, 4000);
    },

    // ── EE-DAMNATIO-MEMORIAE: Censura ──────────────────────────────
    initDamnatioMemoriaeWatcher() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const sel = window.getSelection();
                if (sel && sel.toString().trim().length > 0) {
                    // Evitiamo di censurare negli input/textarea di chat o impostazioni
                    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                        return;
                    }
                    const range = sel.getRangeAt(0);
                    const rects = range.getClientRects();
                    if (rects.length === 0) return;
                    
                    e.preventDefault();
                    this.unlockEasterEgg('ee-damnatio-memoriae');
                    
                    // Crea barre di censura nere sopra ogni rettangolo della selezione
                    const scrollY = window.scrollY || window.pageYOffset;
                    const scrollX = window.scrollX || window.pageXOffset;
                    for (let i = 0; i < rects.length; i++) {
                        const r = rects[i];
                        const bar = document.createElement('div');
                        bar.className = 'censor-blackout';
                        bar.style.position = 'absolute';
                        bar.style.top = (r.top + scrollY) + 'px';
                        bar.style.left = (r.left + scrollX) + 'px';
                        bar.style.width = r.width + 'px';
                        bar.style.height = r.height + 'px';
                        document.body.appendChild(bar);
                    }

                    // Timbro Damnatio Memoriae
                    const stamp = document.createElement('div');
                    stamp.className = 'damnatio-stamp-popup';
                    stamp.textContent = 'DAMNATIO MEMORIAE';
                    document.body.appendChild(stamp);
                    
                    // Sound effect (stamp hit)
                    try {
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain); gain.connect(ctx.destination);
                        osc.frequency.setValueAtTime(80, ctx.currentTime);
                        osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.15);
                        gain.gain.setValueAtTime(0.4, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                        osc.start(); osc.stop(ctx.currentTime + 0.15);
                    } catch(e) {}

                    setTimeout(() => stamp.classList.add('visible'), 50);
                    setTimeout(() => {
                        stamp.classList.remove('visible');
                        setTimeout(() => stamp.remove(), 400);
                    }, 3000);
                    
                    sel.removeAllRanges();
                }
            }
        });
    },

    // ── EE-TOPOLINO: Topo d'archivio ─────────────────────────────────
    initMouseTopolinoTracker() {
        let edgeTime = 0;
        let lastMove = Date.now();
        let trackerInterval = null;

        const onMouseMove = (e) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const x = e.clientX;
            const y = e.clientY;
            
            const isNearEdge = (x <= 15 || y <= 15 || x >= w - 15 || y >= h - 15);
            if (isNearEdge) {
                if (!trackerInterval) {
                    trackerInterval = setInterval(() => {
                        edgeTime += 200;
                        if (edgeTime >= 30000) { // 30s
                            clearInterval(trackerInterval);
                            trackerInterval = null;
                            edgeTime = 0;
                            this.spawnTopolino();
                        }
                    }, 200);
                }
            } else {
                if (trackerInterval) {
                    clearInterval(trackerInterval);
                    trackerInterval = null;
                }
                edgeTime = 0;
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', () => {
            if (trackerInterval) {
                clearInterval(trackerInterval);
                trackerInterval = null;
            }
            edgeTime = 0;
        });
    },

    spawnTopolino() {
        if (document.getElementById('lex-topolino-sprite')) return;
        this.unlockEasterEgg('ee-topolino-biblioteca');
        const mouse = document.createElement('div');
        mouse.id = 'lex-topolino-sprite';
        mouse.className = 'topolino-sprite';
        mouse.innerHTML = `🐀`;
        document.body.appendChild(mouse);

        // Sound effect (squeak)
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(3000, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(3500, ctx.currentTime + 0.1);
            osc.frequency.linearRampToValueAtTime(3000, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
            osc.start(); osc.stop(ctx.currentTime + 0.2);
        } catch(e) {}

        setTimeout(() => mouse.remove(), 4000);
    },

    // ── EE-ALCHIMISTA: Selezione Corpo, Anima, Spirito ─────────────────
    _alchemistWordState: [],
    initAlchimistaWatcher() {
        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection()?.toString().trim().toLowerCase();
            if (!sel) return;
            
            const expectedWords = ['corpo', 'anima', 'spirito'];
            const nextIdx = this._alchemistWordState.length;
            if (sel === expectedWords[nextIdx]) {
                this._alchemistWordState.push(sel);
                if (this._alchemistWordState.length === 3) {
                    this._alchemistWordState = [];
                    this.triggerAlchimista();
                }
            } else if (sel === expectedWords[0]) {
                this._alchemistWordState = [sel];
            } else if (!expectedWords.includes(sel)) {
                this._alchemistWordState = [];
            }
        });
    },

    triggerAlchimista() {
        this.unlockEasterEgg('ee-alchimista');
        document.body.classList.add('alchemist-glow-active');
        
        // Sound effect (magic sparkle chime)
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            freqs.forEach((f, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.15);
                gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
                gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + idx * 0.15 + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.6);
                osc.start(ctx.currentTime + idx * 0.15);
                osc.stop(ctx.currentTime + idx * 0.15 + 0.6);
            });
        } catch(e) {}

        setTimeout(() => {
            document.body.classList.remove('alchemist-glow-active');
        }, 10000);
    },

    // ── EE-SCISMA-ICONOCLASTA: Glitch su immagini ─────────────────────
    initScismaIconoclasta() {
        document.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'IMG' && (window.location.pathname.includes('cristiana') || window.location.pathname.includes('bizantina') || window.location.pathname.includes('storia_arte'))) {
                const img = e.target;
                if (img.classList.contains('iconoclast-glitched')) return;
                
                this.unlockEasterEgg('ee-scisma-iconoclasta');
                img.classList.add('iconoclast-glitched');
                
                // Sound effect (static glitch/crash)
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.4);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                    osc.start(); osc.stop(ctx.currentTime + 0.4);
                } catch(e) {}
            }
        });
    },

    // ── EE-CLESSIDRA-ROMANTICA: Pause a 14 minuti ────────────────────
    triggerClessidraRomantica() {
        this.unlockEasterEgg('ee-clessidra-romantica');
        this.startClessidraRomanticaHearts();
    },

    _clessidraRomanticaInterval: null,
    startClessidraRomanticaHearts() {
        if (this._clessidraRomanticaInterval) return;
        this._clessidraRomanticaInterval = setInterval(() => {
            if (this.state === 'break' && this.breakTime === 14) {
                const overlay = document.getElementById('lex-break-overlay');
                if (overlay && overlay.style.display !== 'none') {
                    const heart = document.createElement('div');
                    heart.className = 'falling-heart-timer';
                    heart.innerHTML = '❤️';
                    heart.style.left = (Math.random() * 80 + 10) + '%';
                    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
                    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    overlay.appendChild(heart);
                    setTimeout(() => heart.remove(), 5000);
                }
            } else {
                clearInterval(this._clessidraRomanticaInterval);
                this._clessidraRomanticaInterval = null;
            }
        }, 400);
    },

    // --- INDEXEDDB CACHING & SYNC ---
    db: null,
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('LexKnowledgeBase', 2);
            request.onerror = (e) => reject(e);
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('summaries')) {
                    db.createObjectStore('summaries', { keyPath: 'navPath' });
                }
            };
        });
    },

    async storeSummaryInDB(navPath, subject, chapterTag, chapterTitle, text) {
        if (!this.db) await this.initIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('summaries', 'readwrite');
            const store = tx.objectStore('summaries');
            store.put({
                navPath,
                subject,
                chapterTag,
                chapterTitle,
                text,
                syncedAt: Date.now()
            });
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e);
        });
    },

    async getSummaryFromDB(navPath) {
        if (!this.db) await this.initIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('summaries', 'readonly');
            const store = tx.objectStore('summaries');
            const req = store.get(navPath);
            req.onsuccess = (e) => resolve(e.target.result);
            req.onerror = (e) => reject(e);
        });
    },

    async getAllSummariesFromDB() {
        if (!this.db) await this.initIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('summaries', 'readonly');
            const store = tx.objectStore('summaries');
            const req = store.getAll();
            req.onsuccess = (e) => resolve(e.target.result || []);
            req.onerror = (e) => reject(e);
        });
    },

    async loadSearchDatabaseIfNeeded() {
        if (typeof searchDatabase !== 'undefined') return searchDatabase;
        return new Promise((resolve) => {
            const prefix = window.location.pathname.includes('/summaries/') || 
                           window.location.pathname.includes('/storia/') || 
                           window.location.pathname.includes('/diritto/') || 
                           window.location.pathname.includes('/arte_romana/') ||
                           window.location.pathname.includes('/storia_arte/') ||
                           window.location.pathname.includes('/codicologia/') ||
                           window.location.pathname.includes('/arte_contemporanea/') ||
                           window.location.pathname.includes('/arte_medievale/') ||
                           window.location.pathname.includes('/cristiana/') ||
                           window.location.pathname.includes('/cultura_greca/') ||
                           window.location.pathname.includes('/geografia/') ||
                           window.location.pathname.includes('/inglese/') ||
                           window.location.pathname.includes('/laboratorio/') ||
                           window.location.pathname.includes('/letteratura_italiana/') ||
                           window.location.pathname.includes('/letteratura_latina/') ||
                           window.location.pathname.includes('/museologia/') ||
                           window.location.pathname.includes('/restauro/') ||
                           window.location.pathname.includes('/tesi/') ||
                           window.location.pathname.includes('/storia_contemporanea/') ||
                           window.location.pathname.includes('/storia_medievale/')
                           ? '../' : '';
            const script = document.createElement('script');
            script.src = `${prefix}js/search_db.js`;
            script.onload = () => resolve(searchDatabase);
            script.onerror = () => {
                console.error("Impossibile caricare search_db.js");
                resolve([]);
            };
            document.head.appendChild(script);
        });
    },

    async startBackgroundSync(onProgress) {
        try {
            await this.initIndexedDB();
            const dbList = await this.loadSearchDatabaseIfNeeded();
            if (!dbList || dbList.length === 0) return;
            
            const total = dbList.length;
            let count = 0;
            
            for (const item of dbList) {
                const navPath = item.navPath;
                const existing = await this.getSummaryFromDB(navPath);
                if (existing) {
                    count++;
                    if (onProgress) onProgress(count, total, item.title);
                    continue;
                }

                const fetchUrl = this.getFetchUrlFromNavPath(navPath);
                if (!fetchUrl) {
                    count++;
                    if (onProgress) onProgress(count, total, item.title);
                    continue;
                }

                try {
                    const res = await fetch(fetchUrl);
                    if (res.ok) {
                        const text = await res.text();
                        await this.storeSummaryInDB(navPath, item.subject, item.chapterTag, item.title, text);
                    }
                } catch (err) {
                    console.error(`Errore nel sync di ${fetchUrl}:`, err);
                }
                
                count++;
                if (onProgress) onProgress(count, total, item.title);
            }
        } catch (e) {
            console.error("Errore generico nel background sync:", e);
        }
    },

    getFetchUrlFromNavPath(navPath) {
        const match = navPath.match(/^([^/]+)\/index\.html\?open=(.+)$/);
        if (match) {
            const prefix = window.location.pathname.includes('/summaries/') || 
                           window.location.pathname.includes('/storia/') || 
                           window.location.pathname.includes('/diritto/') || 
                           window.location.pathname.includes('/arte_romana/') ||
                           window.location.pathname.includes('/storia_arte/') ||
                           window.location.pathname.includes('/codicologia/') ||
                           window.location.pathname.includes('/arte_contemporanea/') ||
                           window.location.pathname.includes('/arte_medievale/') ||
                           window.location.pathname.includes('/cristiana/') ||
                           window.location.pathname.includes('/cultura_greca/') ||
                           window.location.pathname.includes('/geografia/') ||
                           window.location.pathname.includes('/inglese/') ||
                           window.location.pathname.includes('/laboratorio/') ||
                           window.location.pathname.includes('/letteratura_italiana/') ||
                           window.location.pathname.includes('/letteratura_latina/') ||
                           window.location.pathname.includes('/museologia/') ||
                           window.location.pathname.includes('/restauro/') ||
                           window.location.pathname.includes('/tesi/') ||
                           window.location.pathname.includes('/storia_contemporanea/') ||
                           window.location.pathname.includes('/storia_medievale/')
                           ? '../' : '';
            return `${prefix}${match[1]}/${match[2]}`;
        }
        return null;
    },

    // --- CACCIA AL TESORO GLYPHS INJECTION ---
    injectTreasureHuntGlyphs() {
        const view = document.getElementById('markdown-view') || document.querySelector('.markdown-view');
        if (!view) return;
        if (view.querySelector('.treasure-glyph')) return;
        
        const path = window.location.pathname;
        let glyph = null;
        let key = null;
        let riddle = '';
        
        if (path.includes('cultura_greca')) {
            glyph = '🏺';
            key = 'greca';
            riddle = 'Indovinello di Atena: "Custodisco l\'olio e il vino, plasmata dall\'argilla antica. Mi hai trovato! (1/3)"';
        } else if (path.includes('diritto')) {
            glyph = '⚖️';
            key = 'diritto';
            riddle = 'Indovinello di Giustizia: "Bilancio la colpa e il merito, ma non sono un mercante. Mi hai trovato! (2/3)"';
        } else if (path.includes('codicologia')) {
            glyph = '✒️';
            key = 'codicologia';
            riddle = 'Indovinello del Copista: "Traccio segni sull\'antica pergamena, intinta nel calamaio. Mi hai trovato! (3/3)"';
        }
        
        if (glyph) {
            const paras = view.querySelectorAll('p');
            if (paras.length > 0) {
                const targetPara = paras[Math.min(3, paras.length - 1)];
                const span = document.createElement('span');
                span.className = 'treasure-glyph';
                span.style.cursor = 'pointer';
                span.style.marginLeft = '8px';
                span.style.fontSize = '1.2rem';
                span.style.display = 'inline-block';
                span.style.transition = 'all 0.3s';
                span.style.filter = 'grayscale(100%) opacity(0.4)';
                span.title = 'Glifo misterioso... Cliccami!';
                span.innerHTML = glyph;
                
                span.addEventListener('mouseover', () => {
                    span.style.filter = 'none';
                    span.style.transform = 'scale(1.2) rotate(10deg)';
                });
                span.addEventListener('mouseout', () => {
                    span.style.filter = 'grayscale(100%) opacity(0.4)';
                    span.style.transform = 'none';
                });
                
                span.addEventListener('click', (e) => {
                    e.stopPropagation();
                    span.style.filter = 'none';
                    span.style.transform = 'scale(1.4)';
                    alert(riddle);
                    
                    let found = JSON.parse(localStorage.getItem('lex-treasure-glyphs') || '[]');
                    if (!found.includes(key)) {
                        found.push(key);
                        localStorage.setItem('lex-treasure-glyphs', JSON.stringify(found));
                    }
                    
                    if (found.length === 3) {
                        this.unlockEasterEgg('ee-caccia-tesoro-completata');
                    } else {
                        try {
                            const ctx = new (window.AudioContext || window.webkitAudioContext)();
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.connect(gain); gain.connect(ctx.destination);
                            osc.frequency.setValueAtTime(600, ctx.currentTime);
                            gain.gain.setValueAtTime(0.1, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                            osc.start(); osc.stop(ctx.currentTime + 0.3);
                        } catch(e) {}
                    }
                });
                targetPara.appendChild(span);
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 7 NUOVISSIMI EASTER EGG — LOGICA DI ATTIVAZIONE E EFFETTI
    // ═══════════════════════════════════════════════════════════════

    // ── EE #1: Eclissi degli Innamorati ──
    initEclissiTheme() {
        const themeBtn = document.getElementById('theme-toggle');
        if (!themeBtn) return;

        let pressTimer = null;
        let isHolding = false;

        const startPress = (e) => {
            if (e.button && e.button !== 0) return; // solo click sinistro
            isHolding = false;
            pressTimer = setTimeout(() => {
                isHolding = true;
                this.triggerEclissiTheme();
            }, 3000);
        };

        const cancelPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        themeBtn.addEventListener('mousedown', startPress);
        themeBtn.addEventListener('touchstart', startPress, { passive: true });
        themeBtn.addEventListener('mouseup', cancelPress);
        themeBtn.addEventListener('mouseleave', cancelPress);
        themeBtn.addEventListener('touchend', cancelPress);
        themeBtn.addEventListener('touchcancel', cancelPress);

        // Doppio click tenendo premuto il tasto A
        let isAKeyPressed = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'a' || e.key === 'A') isAKeyPressed = true;
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === 'a' || e.key === 'A') isAKeyPressed = false;
        });

        themeBtn.addEventListener('dblclick', () => {
            if (isAKeyPressed) {
                this.triggerEclissiTheme();
            }
        });
    },

    triggerEclissiTheme() {
        this.theme = 'eclissi';
        localStorage.setItem('lex-theme', this.theme);
        this.applyTheme();
        this.unlockEasterEgg('ee-eclissi-tema');

        // Suono: Accordo consonante di quinta tramite AudioContext
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.value = 261.63; // C4
            osc2.type = 'sine';
            osc2.frequency.value = 392.00; // G4

            osc1.connect(gain);
            osc2.connect(gain);

            osc1.start();
            osc2.start();

            osc1.stop(ctx.currentTime + 3.0);
            osc2.stop(ctx.currentTime + 3.0);
        } catch (e) {}

        alert("🌌 L'Eclissi degli Innamorati è iniziata! 🌌\nIl sole e la luna si fondono nei colori del cuore.");
    },

    startEclissiBackground() {
        if (document.getElementById('lex-eclissi-bg')) return;
        const bgContainer = document.createElement('div');
        bgContainer.id = 'lex-eclissi-bg';
        bgContainer.style.pointerEvents = 'none';
        document.body.appendChild(bgContainer);

        // Pioggia fluttuante di stelle e cuori
        this.eclissiBgInterval = setInterval(() => {
            if (this.theme !== 'eclissi') {
                this.stopEclissiBackground();
                return;
            }
            const el = document.createElement('div');
            el.className = 'eclissi-bg-element';
            el.textContent = ['⭐', '❤️', '✨', '💜'][Math.floor(Math.random() * 4)];
            el.style.left = (Math.random() * 100) + 'vw';
            el.style.animationDuration = (Math.random() * 6 + 6) + 's';
            el.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
            bgContainer.appendChild(el);
            setTimeout(() => el.remove(), 12000);
        }, 1200);

        // Scia del mouse orbitante/cadente
        this.eclissiMouseHandler = (e) => {
            if (Math.random() > 0.4) return; // limita la densità per performance
            const trail = document.createElement('div');
            trail.className = 'eclissi-mouse-trail';
            trail.textContent = ['✨', '❤️', '⭐'][Math.floor(Math.random() * 3)];
            
            // Offset casuale attorno al cursore
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 15;
            const x = e.clientX + Math.cos(angle) * dist + (window.scrollX || window.pageXOffset);
            const y = e.clientY + Math.sin(angle) * dist + (window.scrollY || window.pageYOffset);
            
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            
            // Imposta coordinate di traslazione casuali per l'effetto di caduta
            const dx = (Math.random() * 40 - 20) + 'px';
            const dy = (Math.random() * 30 - 50) + 'px';
            trail.style.setProperty('--dx', dx);
            trail.style.setProperty('--dy', dy);

            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1200);
        };
        document.addEventListener('mousemove', this.eclissiMouseHandler);
    },

    stopEclissiBackground() {
        const bgContainer = document.getElementById('lex-eclissi-bg');
        if (bgContainer) bgContainer.remove();
        if (this.eclissiBgInterval) {
            clearInterval(this.eclissiBgInterval);
            this.eclissiBgInterval = null;
        }
        if (this.eclissiMouseHandler) {
            document.removeEventListener('mousemove', this.eclissiMouseHandler);
            this.eclissiMouseHandler = null;
        }
    },

    // ── EE #2: Il Messaggio del Naufrago ──
    triggerMessaggioBottiglia() {
        if (document.getElementById('lex-bottiglia-container')) return;
        this.unlockEasterEgg('ee-messaggio-bottiglia');

        const container = document.createElement('div');
        container.id = 'lex-bottiglia-container';
        container.className = 'bottiglia-container';
        container.innerHTML = `
            <div class="bottiglia-sprite" id="lex-bottiglia-sprite">🏺</div>
        `;
        document.body.appendChild(container);

        const sprite = document.getElementById('lex-bottiglia-sprite');
        sprite.addEventListener('click', () => {
            container.remove();
            this.showMessaggioBottigliaLetter();
        });
    },

    showMessaggioBottigliaLetter() {
        if (document.getElementById('lex-bottiglia-letter-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'lex-bottiglia-letter-overlay';
        overlay.className = 'bottiglia-letter-overlay';
        overlay.innerHTML = `
            <div class="bottiglia-letter-card">
                <div class="bottiglia-letter-seal">🏺</div>
                <div class="bottiglia-letter-title">Frammento d'Amore Naufrago</div>
                <p class="bottiglia-letter-quote">
                    "Mi sembra che pari agli dei sia l'uomo che ti siede di fronte, e da vicino ascolta la tua dolce voce e il riso amoroso. Questo fa tremare il mio cuore nel petto: se appena ti guardo, non ho più voce, la lingua si spezza, un fuoco sottile scorre sotto la pelle, gli occhi non vedono più e le orecchie rombano..."
                </p>
                <div class="bottiglia-letter-author">— Saffo, Frammento 31 (Riadattato per Alessandra & Alessio)</div>
                <button class="bottiglia-letter-close" onclick="document.getElementById('lex-bottiglia-letter-overlay').remove()">Riporre l'Anfora</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Effetto sonoro: scala ascendente dolce
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

            const freqs = [329.63, 392.00, 523.25, 659.25]; // E4, G4, C5, E5
            freqs.forEach((f, idx) => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = f;
                osc.connect(gain);
                osc.start(ctx.currentTime + idx * 0.15);
                osc.stop(ctx.currentTime + idx * 0.15 + 1.2);
            });
        } catch (e) {}
    },

    // ── EE #3: Il Palinsesto Nascosto (Codicologia) ──
    initPalinsestoBobbio() {
        let scratchCount = 0;
        let lastX = null;
        let lastDir = 0; // -1 = sinistra, 1 = destra
        let isMouseDown = false;
        let scratchStartTime = 0;
        let targetP = null;

        document.addEventListener('mousedown', (e) => {
            if (!window.location.pathname.includes('codicologia')) return;
            const p = e.target.closest('#markdown-view p, .markdown-view p');
            if (!p) return;
            isMouseDown = true;
            scratchCount = 0;
            scratchStartTime = Date.now();
            lastX = e.clientX;
            lastDir = 0;
            targetP = p;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown || !targetP) return;
            const currentX = e.clientX;
            if (lastX === null) {
                lastX = currentX;
                return;
            }
            const dx = currentX - lastX;
            if (Math.abs(dx) > 12) {
                const dir = dx > 0 ? 1 : -1;
                if (lastDir !== 0 && dir !== lastDir) {
                    scratchCount++;
                    // Riproduci suono sfregamento/raschiatura
                    if (scratchCount % 2 === 0) {
                        this.playRaspingSound();
                    }
                    if (scratchCount >= 10 && (Date.now() - scratchStartTime) < 4500) {
                        this.triggerPalinsestoBobbio(targetP);
                        isMouseDown = false;
                        targetP = null;
                    }
                }
                lastDir = dir;
                lastX = currentX;
            }
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            targetP = null;
        });
    },

    playRaspingSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(90, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(130, ctx.currentTime + 0.1);

            filter.type = 'bandpass';
            filter.frequency.value = 750;
            filter.Q.value = 3.0;

            gain.gain.setValueAtTime(0.015, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        } catch (e) {}
    },

    playRevealSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

            [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
                const osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.value = f;
                osc.connect(gain);
                osc.start(ctx.currentTime + idx * 0.12);
                osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
            });
        } catch (e) {}
    },

    triggerPalinsestoBobbio(pElement) {
        if (pElement.classList.contains('palinsesto-revealed')) return;
        this.unlockEasterEgg('ee-palinsesto-bobbio');
        pElement.classList.add('palinsesto-revealed');
        this.playRevealSound();

        const explanation = document.createElement('div');
        explanation.className = 'palinsesto-toast';
        explanation.innerHTML = `
            <strong>📜 Palinsesto di Bobbio Svelato!</strong><br>
            <span>Sotto la sintesi moderna risorge un frammento onciale dell'abbazia di San Colombano (Codex Rescriptus).</span>
        `;
        document.body.appendChild(explanation);
        setTimeout(() => explanation.classList.add('visible'), 50);
        setTimeout(() => {
            explanation.classList.remove('visible');
            setTimeout(() => explanation.remove(), 400);
        }, 5000);
    },

    // ── EE #4: Il Tarlo del Codice ──
    initTarloWatcher() {
        const path = window.location.pathname;
        const isStudyPage = ['codicologia', 'diritto', 'storia', 'cristiana', 'cultura_greca', 'geografia', 'inglese', 'letteratura', 'restauro', 'museologia', 'storia_arte', 'arte_romana', 'arte_medievale', 'arte_contemporanea', 'storia_contemporanea', 'storia_medievale'].some(s => path.includes(s));
        if (!isStudyPage) return;

        let inactivityTimer = null;
        const resetTimer = () => {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                this.triggerTarloBiblioteca();
            }, 3 * 60 * 1000); // 3 minuti
        };

        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keydown', resetTimer);
        document.addEventListener('click', resetTimer);
        document.addEventListener('scroll', resetTimer);

        resetTimer();
    },

    playRosicchiamentoSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);

            for (let i = 0; i < 10; i++) {
                const t = ctx.currentTime + i * 0.22 + Math.random() * 0.04;
                const osc = ctx.createOscillator();
                const oscGain = ctx.createGain();

                osc.connect(oscGain);
                oscGain.connect(gain);

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(160, t);
                osc.frequency.exponentialRampToValueAtTime(25, t + 0.1);

                oscGain.gain.setValueAtTime(0, t);
                oscGain.gain.linearRampToValueAtTime(0.03, t + 0.02);
                oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

                osc.start(t);
                osc.stop(t + 0.1);
            }
        } catch (e) {}
    },

    triggerTarloBiblioteca() {
        if (document.getElementById('lex-tarlo-overlay')) return;
        this.unlockEasterEgg('ee-tarlo-biblioteca');
        this.playRosicchiamentoSound();

        const overlay = document.createElement('div');
        overlay.id = 'lex-tarlo-overlay';
        overlay.className = 'tarlo-overlay';
        overlay.innerHTML = `
            <div class="tarlo-bite-hole"></div>
            <div class="tarlo-bug">🐛</div>
            <div class="tarlo-balloon">"Mmm... questo capitolo era davvero squisito!"</div>
            <button class="tarlo-close" onclick="document.getElementById('lex-tarlo-overlay').remove()">Scacciare il Tarlo</button>
        `;
        document.body.appendChild(overlay);
    },

    // ── EE #5: La Caverna di Platone (Filosofia) ──
    initCavernaPlatoneWatcher() {
        document.addEventListener('selectionchange', () => {
            if (!window.location.pathname.includes('filosofia')) return;
            if (this.theme !== 'dark') return;

            const sel = window.getSelection()?.toString().trim().toLowerCase();
            if (sel === 'caverna' || sel === 'ombra') {
                this.triggerCavernaPlatone();
            }
        });
    },

    triggerCavernaPlatone() {
        if (document.getElementById('lex-caverna-overlay')) return;
        this.unlockEasterEgg('ee-caverna-platone');

        const overlay = document.createElement('div');
        overlay.id = 'lex-caverna-overlay';
        overlay.className = 'caverna-overlay';
        overlay.innerHTML = `
            <div class="caverna-shadow-elements">
                <span class="caverna-shadow shadow-1">🏺</span>
                <span class="caverna-shadow shadow-2">👑</span>
                <span class="caverna-shadow shadow-3">👥</span>
                <span class="caverna-shadow shadow-4">🐎</span>
                <span class="caverna-quote">"E se uno fosse costretto a guardare la luce stessa..." — Platone, Repubblica</span>
            </div>
            <button class="caverna-close" onclick="document.getElementById('lex-caverna-overlay').remove()">Uscire dalla Caverna</button>
        `;
        document.body.appendChild(overlay);

        const moveHandler = (e) => {
            overlay.style.setProperty('--x', `${e.clientX}px`);
            overlay.style.setProperty('--y', `${e.clientY}px`);
        };
        document.addEventListener('mousemove', moveHandler);

        // Auto-cleanup del mousemove quando viene chiuso l'overlay
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                m.removedNodes.forEach((node) => {
                    if (node.id === 'lex-caverna-overlay') {
                        document.removeEventListener('mousemove', moveHandler);
                        observer.disconnect();
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true });

        // Suono eco di caverna
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(105, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 2.5);
            osc.connect(gain);
            osc.start();
            osc.stop(ctx.currentTime + 2.5);
        } catch (e) {}
    },

    // ── EE #6: Lo Scavo Archeologico (Archeologia) ──
    initStratigrafiaWatcher() {
        let bottomScrollCount = 0;
        let lastScrollTime = 0;

        window.addEventListener('wheel', (e) => {
            // Verifica se siamo vicini al fondo della pagina
            const isBottom = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 25);
            if (!isBottom) return;

            if (e.deltaY > 0) {
                const now = Date.now();
                if (now - lastScrollTime < 1500) {
                    bottomScrollCount++;
                } else {
                    bottomScrollCount = 1;
                }
                lastScrollTime = now;

                if (bottomScrollCount >= 5) {
                    bottomScrollCount = 0;
                    this.triggerStratigrafia();
                }
            }
        }, { passive: true });

        // Supporto touch per mobile
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            const isBottom = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 25);
            if (!isBottom) return;

            const touchEndY = e.touches[0].clientY;
            if (touchStartY - touchEndY > 60) { // scorrimento verso il basso (swipe up)
                const now = Date.now();
                if (now - lastScrollTime < 1500) {
                    bottomScrollCount++;
                } else {
                    bottomScrollCount = 1;
                }
                lastScrollTime = now;

                if (bottomScrollCount >= 5) {
                    bottomScrollCount = 0;
                    this.triggerStratigrafia();
                }
            }
        }, { passive: true });
    },

    triggerStratigrafia() {
        if (document.getElementById('lex-stratigrafia-drawer')) return;
        this.unlockEasterEgg('ee-stratigrafia');

        // Effetto terremoto sullo schermo
        document.body.classList.add('lex-earthquake');
        setTimeout(() => document.body.classList.remove('lex-earthquake'), 900);

        // Suono ciottoli / sassi che cadono
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

            for (let i = 0; i < 5; i++) {
                const osc = ctx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(45 + Math.random() * 25, ctx.currentTime + i * 0.12);
                osc.connect(gain);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 0.25);
            }
        } catch (e) {}

        const drawer = document.createElement('div');
        drawer.id = 'lex-stratigrafia-drawer';
        drawer.className = 'stratigrafia-drawer';
        drawer.innerHTML = `
            <div class="stratigrafia-header">
                <h3>⛏️ Livello Stratigrafico I — Archeologia Romana</h3>
                <button class="stratigrafia-close-btn" onclick="document.getElementById('lex-stratigrafia-drawer').remove()">Chiudi Scavo</button>
            </div>
            <div class="stratigrafia-body">
                <p style="font-size:0.85rem; margin-bottom:0.5rem;">Usa il cursore (mouse/dito) come spazzola per rimuovere la terra e svelare il reperto:</p>
                <div class="stratigrafia-canvas-container">
                    <canvas id="stratigrafia-scratch-canvas" width="300" height="200"></canvas>
                    <div class="stratigrafia-treasure">
                        <div class="mosaic-tile">🏺</div>
                        <div class="mosaic-title">Vaso di Vetro Romano (IV d.C.)</div>
                        <div class="mosaic-sub">Reperto riportato alla luce!</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);

        // Inizializza scratch canvas dopo il caricamento nel DOM
        setTimeout(() => {
            const canvas = document.getElementById('stratigrafia-scratch-canvas');
            if (!canvas) return;
            const sctx = canvas.getContext('2d');

            // Colore terra di base
            sctx.fillStyle = '#654321';
            sctx.fillRect(0, 0, 300, 200);

            // Aggiunge granelli/trama
            sctx.fillStyle = '#4a2f13';
            for (let i = 0; i < 35; i++) {
                sctx.fillRect(Math.random() * 300, Math.random() * 200, 4, 4);
            }

            let isDrawing = false;
            const scratch = (clientX, clientY) => {
                const rect = canvas.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                sctx.globalCompositeOperation = 'destination-out';
                sctx.beginPath();
                sctx.arc(x, y, 22, 0, Math.PI * 2);
                sctx.fill();

                // Suono leggero spazzolamento casuale
                if (Math.random() > 0.88) {
                    try {
                        const actx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = actx.createOscillator();
                        const gn = actx.createGain();
                        osc.connect(gn); gn.connect(actx.destination);
                        osc.frequency.setValueAtTime(250, actx.currentTime);
                        gn.gain.setValueAtTime(0.008, actx.currentTime);
                        gn.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.08);
                        osc.start(); osc.stop(actx.currentTime + 0.08);
                    } catch (err) {}
                }
            };

            canvas.addEventListener('mousedown', (e) => {
                isDrawing = true;
                scratch(e.clientX, e.clientY);
            });
            canvas.addEventListener('mousemove', (e) => {
                if (isDrawing) scratch(e.clientX, e.clientY);
            });
            window.addEventListener('mouseup', () => isDrawing = false);

            // Touch
            canvas.addEventListener('touchstart', (e) => {
                isDrawing = true;
                scratch(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });
            canvas.addEventListener('touchmove', (e) => {
                if (isDrawing) scratch(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });
        }, 150);
    },

    // ── EE #7: L'Eresia Giuridica ──
    initDamnatioMemoriaeQuizWatcher() {
        document.addEventListener('keydown', (e) => {
            if (!window.location.pathname.includes('exam.html')) return;
            
            // Verifica combinazione Ctrl + Shift + X
            if (e.ctrlKey && e.shiftKey && (e.key === 'x' || e.key === 'X' || e.keyCode === 88)) {
                e.preventDefault();
                if (typeof examQuestions !== 'undefined' && typeof currentQuestionIndex !== 'undefined') {
                    const q = examQuestions[currentQuestionIndex];
                    if (q && q.subject === 'diritto') {
                        this.triggerDamnatioMemoriaeQuiz();
                    }
                }
            }
        });
    },

    triggerDamnatioMemoriaeQuiz() {
        this.unlockEasterEgg('ee-damnatio-memoriae-quiz');

        const qText = document.getElementById('exam-question-text');
        const opts = document.getElementById('exam-options-container');
        if (!qText || !opts) return;

        qText.classList.add('damnatio-censored');
        const optionBtns = opts.querySelectorAll('.exam-option-btn');
        optionBtns.forEach(btn => btn.classList.add('damnatio-censored'));

        // Crea ed inserisce a schermo il timbro rosso reale "PROHIBITUM"
        const stamp = document.createElement('div');
        stamp.className = 'prohibitum-stamp-popup';
        stamp.textContent = 'PROHIBITUM';
        
        const activeScreen = document.getElementById('exam-active-screen');
        if (activeScreen) {
            activeScreen.appendChild(stamp);
        } else {
            document.body.appendChild(stamp);
        }

        // Suono di timbratura/tonfo e buzzer
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const gain = ctx.createGain();
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(115, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.45);

            osc.connect(gain);
            osc.start();
            osc.stop(ctx.currentTime + 0.45);
        } catch (e) {}

        setTimeout(() => stamp.classList.add('visible'), 50);

        // Imposta la risposta corrente come corretta modificando la variabile globale del quiz
        if (typeof examQuestions !== 'undefined' && typeof currentQuestionIndex !== 'undefined') {
            const q = examQuestions[currentQuestionIndex];
            if (q && typeof selectedOptionIdx !== 'undefined') {
                selectedOptionIdx = q.correctIndex;
            }
        }

        // Rimuove la censura e invia la risposta automatica dopo 2.5 secondi
        setTimeout(() => {
            stamp.remove();
            qText.classList.remove('damnatio-censored');
            optionBtns.forEach(btn => btn.classList.remove('damnatio-censored'));
            if (typeof submitAnswer === 'function') {
                submitAnswer();
            }
        }, 2500);
    },

    // --- ACTIVITY LOG HELPER FOR HEATMAP ---
    logStudyActivity() {
        try {
            const today = new Date().toISOString().split('T')[0];
            const activity = JSON.parse(localStorage.getItem('lex-study-activity') || '{}');
            activity[today] = (activity[today] || 0) + 1;
            localStorage.setItem('lex-study-activity', JSON.stringify(activity));
        } catch(e) {}
    },

    // --- ADVANCED STUDY TOOLS SYSTEM (v2.5.0) ---
    currentSummaryTitle: '',
    currentSummaryPath: '',
    currentSummaryMarkdown: '',
    vocalRecognition: null,
    vocalSpeaking: false,

    initAdvancedStudyTools(title, filePath) {
        this.currentSummaryTitle = title;
        this.currentSummaryPath = filePath;
        this.currentSummaryMarkdown = ''; // Reset cache
        this.injectToolsButtons(title, filePath);
    },

    injectToolsButtons(title, filePath) {
        const header = document.querySelector('.modal-header');
        if (!header) return;

        let container = header.querySelector('.lex-study-tools-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'lex-study-tools-container';
            const titleArea = header.querySelector('.modal-title-area');
            if (titleArea) {
                titleArea.after(container);
            } else {
                header.prepend(container);
            }
        }

        // Dynamically inject Export Package button next to print button in header
        const modalControls = header.querySelector('.modal-controls');
        if (modalControls && !modalControls.querySelector('#lex-btn-export-pkg')) {
            const printBtn = modalControls.querySelector('button[onclick*="window.print"]');
            const exportBtn = document.createElement('button');
            exportBtn.id = 'lex-btn-export-pkg';
            exportBtn.className = 'modal-close';
            exportBtn.title = 'Esporta Pacchetto Studio Standalone';
            exportBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            `;
            exportBtn.onclick = () => loadAndExecute((md) => this.showExportPackage(title, md, filePath));
            if (printBtn) {
                printBtn.before(exportBtn);
            } else {
                modalControls.prepend(exportBtn);
            }
        }

        // Streak & study time info
        let streak = 0;
        let minutes = 0;
        try {
            const todayStr = new Date().toISOString().split('T')[0];
            streak = parseInt(localStorage.getItem('lex-study-streak') || '0');
            const dailyLog = JSON.parse(localStorage.getItem('lex-study-daily-log') || '{}');
            minutes = Math.floor((dailyLog[todayStr] || 0) / 60);
        } catch(e) {}

        container.innerHTML = `
            <div class="lex-streak-badge-container" style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.75rem; font-weight:bold; color:#d4af37; background:rgba(212,175,55,0.05); padding:3px 8px; border-radius:99px; border:1px solid rgba(212,175,55,0.15); margin-right: 0.5rem;">
                <span title="Giorni consecutivi di studio">🔥 <span id="lex-streak-badge-days">${streak}</span>d</span>
                <span style="color:rgba(255,255,255,0.3)">|</span>
                <span title="Tempo di studio oggi">⏱️ <span id="lex-streak-badge-time">${minutes}</span>m</span>
            </div>
            <button class="lex-study-tool-btn" data-tooltip="Mappa Concettuale" id="lex-btn-mindmap">
                <svg viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM18 8H6M18 16H6"/></svg>
            </button>
            <button class="lex-study-tool-btn" data-tooltip="Simulazione Orale" id="lex-btn-vocal">
                <svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
            </button>
            <button class="lex-study-tool-btn" data-tooltip="Genera Flashcard" id="lex-btn-flashcards">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </button>
            <button class="lex-study-tool-btn" data-tooltip="Glossario Capitolo" id="lex-btn-glossary">
                <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </button>
            <button class="lex-study-tool-btn" data-tooltip="Pomodoro Scriptorium" id="lex-btn-pomodoro">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H7M17 19H7M12 2a5 5 0 0 0-5 5v3c0 2 2 4 5 4s5-2 5-4V7a5 5 0 0 0-5-5zM12 22a5 5 0 0 1-5-5v-3c0-2 2-4 5-4s5 2 5 4v3a5 5 0 0 1-5 5z"/></svg>
            </button>
            <button class="lex-study-tool-btn" data-tooltip="Studio Comparativo" id="lex-btn-splitscreen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
            </button>

            <!-- Dropdown Altri Strumenti -->
            <div class="lex-study-tools-dropdown-container" id="lex-tools-dropdown-container">
                <button class="lex-study-tool-btn" data-tooltip="Altri Strumenti" id="lex-btn-dropdown-trigger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2zM7 7h10V5H7z"/></svg>
                </button>
                <div class="lex-study-tools-dropdown-menu" id="lex-tools-dropdown-menu">
                    <button class="lex-study-dropdown-item" id="lex-btn-cloze">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="10" y1="17" x2="8" y2="17"/></svg>
                        Test Riempi Spazi
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-matcher">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M8 21H3v-5M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M21 3L14 10M3 21l7-7"/></svg>
                        Concept Matcher
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-feynman">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        Spiega al Monaco
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-quaesitor">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                        Il Quaesitor
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-condensatore">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        Arte del Compendio
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-speedreview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        Scriptura Veloce
                    </button>
                    <button class="lex-study-dropdown-item" id="lex-btn-trovaerrore">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Trova l'Errore
                    </button>
                </div>
            </div>
        `;

        const loadAndExecute = (action) => {
            if (this.currentSummaryMarkdown && this.currentSummaryPath === filePath) {
                action(this.currentSummaryMarkdown);
            } else {
                fetch(filePath)
                    .then(r => {
                        if (!r.ok) throw new Error("File loading failed");
                        return r.text();
                    })
                    .then(text => {
                        this.currentSummaryMarkdown = text;
                        action(text);
                    })
                    .catch(e => {
                        console.error("Errore recupero markdown:", e);
                        const markdownView = document.getElementById('markdown-view');
                        if (markdownView) {
                            this.currentSummaryMarkdown = markdownView.innerText;
                            action(this.currentSummaryMarkdown);
                        }
                    });
            }
        };

        // Click handlers for visible buttons
        container.querySelector('#lex-btn-mindmap').onclick = () => loadAndExecute((md) => this.showMindMapOverlay(title, md));
        container.querySelector('#lex-btn-vocal').onclick = () => loadAndExecute((md) => this.showVocalExaminerOverlay(title, md));
        container.querySelector('#lex-btn-flashcards').onclick = () => loadAndExecute((md) => this.showFlashcardsOverlay(title, md));
        container.querySelector('#lex-btn-glossary').onclick = () => loadAndExecute((md) => this.showGlossarySidebar(title, md));
        container.querySelector('#lex-btn-pomodoro').onclick = () => loadAndExecute((md) => this.showPomodoroOverlay(title, md));
        container.querySelector('#lex-btn-splitscreen').onclick = () => loadAndExecute((md) => this.showSplitScreenOverlay(title, md));

        // Click handlers for dropdown elements
        container.querySelector('#lex-btn-cloze').onclick = () => loadAndExecute((md) => this.showClozeTestOverlay(title, md));
        container.querySelector('#lex-btn-matcher').onclick = () => loadAndExecute((md) => this.showConceptMatcherOverlay(title, md));
        container.querySelector('#lex-btn-feynman').onclick = () => loadAndExecute((md) => this.showFeynmanOverlay(title, md));
        container.querySelector('#lex-btn-quaesitor').onclick = () => this.toggleQuaesitor();
        container.querySelector('#lex-btn-condensatore').onclick = () => loadAndExecute((md) => this.showCondensatoreOverlay(title, md));
        container.querySelector('#lex-btn-speedreview').onclick = () => loadAndExecute((md) => this.showSpeedReviewOverlay(title, md));
        container.querySelector('#lex-btn-trovaerrore').onclick = () => loadAndExecute((md) => this.showTrovaErroreOverlay(title, md));

        // Toggle dropdown logic
        const dropdown = container.querySelector('#lex-tools-dropdown-container');
        const trigger = container.querySelector('#lex-btn-dropdown-trigger');
        trigger.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        };
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
        });
        container.querySelectorAll('.lex-study-dropdown-item').forEach(btn => {
            btn.addEventListener('click', () => {
                dropdown.classList.remove('open');
            });
        });

        // Toggle state styling for Quaesitor if active
        if (this.quaesitorActive) {
            container.querySelector('#lex-btn-quaesitor').classList.add('lex-active-tool-highlight');
        }

        setTimeout(() => {
            const inlineTerms = document.querySelectorAll('.glossary-term');
            inlineTerms.forEach(termSpan => {
                termSpan.onclick = (e) => {
                    e.stopPropagation();
                    const term = termSpan.getAttribute('data-term');
                    loadAndExecute((md) => {
                        this.showGlossarySidebar(title, md, term);
                    });
                };
            });
            // Inizializza post-it e note a margine
            this.initMarginNotes(filePath);
        }, 300);
    },

    getSharedOverlay(id, titleText, iconSvg) {
        let overlay = document.getElementById(id);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = id;
            overlay.className = 'lex-study-tool-overlay';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="lex-study-tool-card">
                <div class="lex-study-tool-card-header">
                    <h3 class="lex-study-tool-card-title">
                        ${iconSvg}
                        <span>${titleText}</span>
                    </h3>
                    <button class="lex-study-tool-close-btn">&times;</button>
                </div>
                <div class="lex-study-tool-card-body"></div>
            </div>
        `;

        overlay.querySelector('.lex-study-tool-close-btn').onclick = () => {
            this.closeStudyTool(id);
        };

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeStudyTool(id);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        return overlay;
    },

    closeStudyTool(id) {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.classList.remove('open');
            if (id === 'vocal-tool-overlay') {
                if (this.vocalRecognition) {
                    try { this.vocalRecognition.stop(); } catch(e){}
                }
                window.speechSynthesis.cancel();
                this.vocalSpeaking = false;
            }
            if (id === 'pomodoro-tool-overlay') {
                if (this.pomodoroInterval) {
                    clearInterval(this.pomodoroInterval);
                    this.pomodoroInterval = null;
                }
                if (this.pomodoroAudioCtx) {
                    try { this.pomodoroAudioCtx.close(); } catch(e){}
                    this.pomodoroAudioCtx = null;
                }
            }
            if (id === 'speedreview-tool-overlay') {
                if (this.speedReviewTimer) clearInterval(this.speedReviewTimer);
                if (this.speedReviewGameTimer) clearInterval(this.speedReviewGameTimer);
            }
        }
    },

    closeAllStudyTools() {
        ['mindmap-tool-overlay', 'vocal-tool-overlay', 'flashcard-tool-overlay', 'pomodoro-tool-overlay', 'cloze-tool-overlay', 'splitscreen-tool-overlay', 'matcher-tool-overlay', 'feynman-tool-overlay', 'condensatore-tool-overlay', 'speedreview-tool-overlay', 'trovaerrore-tool-overlay'].forEach(id => {
            this.closeStudyTool(id);
        });
        const sidebar = document.getElementById('lex-glossary-sidebar');
        if (sidebar) sidebar.classList.remove('open');

        if (this.quaesitorActive) {
            this.quaesitorActive = false;
            if (this.quaesitorTimer) clearTimeout(this.quaesitorTimer);
            const btn = document.getElementById('lex-btn-quaesitor');
            if (btn) btn.classList.remove('lex-active-tool-highlight');
        }
    },

    showMindMapOverlay(title, md) {
        const overlay = this.getSharedOverlay('mindmap-tool-overlay', 'Mappa Concettuale - ' + title, `
            <svg viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM18 8H6M18 16H6"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        body.innerHTML = `
            <div class="mindmap-canvas-container">
                <canvas id="mindmap-canvas" width="750" height="480"></canvas>
            </div>
            <div class="mindmap-controls">
                <div class="mindmap-hint">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Trascina i nodi per riorganizzare la mappa concettuale.
                </div>
                <button class="btn btn-primary" id="mindmap-export-png-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold;">Esporta PNG</button>
            </div>
        `;

        overlay.classList.add('open');

        const canvas = body.querySelector('#mindmap-canvas');
        const ctx = canvas.getContext('2d');
        
        const nodes = [];
        let rootNode = { id: 'root', label: title, x: 375, y: 240, radius: 45, color: '#d4af37', textColor: '#0d1423', isRoot: true };
        nodes.push(rootNode);

        const lines = md.split('\n');
        const h2s = [];
        const h3Map = {};

        lines.forEach(line => {
            const h2Match = line.match(/^##\s+(.+)$/);
            if (h2Match) {
                const label = h2Match[1].trim();
                h2s.push(label);
                h3Map[label] = [];
            } else {
                const h3Match = line.match(/^###\s+(.+)$/);
                if (h3Match && h2s.length > 0) {
                    const currentH2 = h2s[h2s.length - 1];
                    h3Map[currentH2].push(h3Match[1].trim());
                }
            }
        });

        const h2RadiusRange = 160;
        h2s.forEach((h2Text, idx) => {
            const angle = (idx / h2s.length) * 2 * Math.PI;
            const x = 375 + h2RadiusRange * Math.cos(angle);
            const y = 240 + h2RadiusRange * Math.sin(angle);
            const nodeId = 'h2-' + idx;
            nodes.push({
                id: nodeId,
                parentId: 'root',
                label: h2Text,
                x: x,
                y: y,
                radius: 28,
                color: '#06b6d4',
                textColor: '#ffffff'
            });

            const subHeadingList = h3Map[h2Text] || [];
            const h3RadiusRange = 85;
            subHeadingList.forEach((h3Text, subIdx) => {
                const subAngle = angle - Math.PI/4 + (subIdx / Math.max(1, subHeadingList.length - 1)) * (Math.PI/2);
                const sx = x + h3RadiusRange * Math.cos(subAngle);
                const sy = y + h3RadiusRange * Math.sin(subAngle);
                nodes.push({
                    id: 'h3-' + idx + '-' + subIdx,
                    parentId: nodeId,
                    label: h3Text,
                    x: sx,
                    y: sy,
                    radius: 20,
                    color: 'rgba(6, 182, 212, 0.2)',
                    borderColor: '#06b6d4',
                    textColor: '#cbd5e1',
                    isLeaf: true
                });
            });
        });

        const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
            const words = text.split(' ');
            let line = '';
            let testLine = '';
            let testWidth = 0;
            let lines = [];

            for (let n = 0; n < words.length; n++) {
                testLine = line + words[n] + ' ';
                testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line);

            let startY = y - ((lines.length - 1) * lineHeight) / 2;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i].trim(), x, startY + i * lineHeight);
            }
        };

        const drawMap = () => {
            ctx.fillStyle = '#090f1d';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = 'rgba(255,255,255,0.02)';
            ctx.lineWidth = 1;
            for(let i=0; i<canvas.width; i+=40) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
            }
            for(let j=0; j<canvas.height; j+=40) {
                ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
            }

            nodes.forEach(node => {
                if (node.parentId) {
                    const parent = nodes.find(n => n.id === node.parentId);
                    if (parent) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.strokeStyle = node.isLeaf ? 'rgba(6, 182, 212, 0.25)' : 'rgba(212, 175, 55, 0.4)';
                        ctx.lineWidth = node.isLeaf ? 1.5 : 2.5;
                        ctx.lineTo(parent.x, parent.y);
                        ctx.stroke();
                    }
                }
            });

            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
                
                ctx.shadowColor = node.isRoot ? 'rgba(212,175,55,0.3)' : 'rgba(6,182,212,0.1)';
                ctx.shadowBlur = 10;
                
                if (node.isRoot) {
                    const grad = ctx.createRadialGradient(node.x, node.y, 5, node.x, node.y, node.radius);
                    grad.addColorStop(0, '#f3e5ab');
                    grad.addColorStop(1, '#d4af37');
                    ctx.fillStyle = grad;
                    ctx.fill();
                } else if (node.isLeaf) {
                    ctx.fillStyle = node.color;
                    ctx.fill();
                    ctx.strokeStyle = node.borderColor || 'rgba(255,255,255,0.1)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                } else {
                    const grad = ctx.createLinearGradient(node.x - node.radius, node.y, node.x + node.radius, node.y);
                    grad.addColorStop(0, '#06b6d4');
                    grad.addColorStop(1, '#0891b2');
                    ctx.fillStyle = grad;
                    ctx.fill();
                }
                
                ctx.shadowBlur = 0;

                ctx.fillStyle = node.textColor || '#fff';
                ctx.font = node.isRoot ? 'bold 12px Inter, system-ui' : (node.isLeaf ? '9px Inter' : '10px Inter');
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                wrapText(ctx, node.label, node.x, node.y, node.radius * 2.1, 12);
            });
        };

        let draggedNode = null;
        let startX, startY;

        canvas.onmousedown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            for (let i = nodes.length - 1; i >= 0; i--) {
                const node = nodes[i];
                const dx = mx - node.x;
                const dy = my - node.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < node.radius) {
                    draggedNode = node;
                    startX = dx;
                    startY = dy;
                    break;
                }
            }
        };

        canvas.onmousemove = (e) => {
            if (!draggedNode) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            draggedNode.x = Math.max(draggedNode.radius + 10, Math.min(canvas.width - draggedNode.radius - 10, mx - startX));
            draggedNode.y = Math.max(draggedNode.radius + 10, Math.min(canvas.height - draggedNode.radius - 10, my - startY));
            drawMap();
        };

        canvas.onmouseup = () => { draggedNode = null; };
        canvas.onmouseleave = () => { draggedNode = null; };

        body.querySelector('#mindmap-export-png-btn').onclick = () => {
            drawMap();
            const link = document.createElement('a');
            link.download = 'mappa_mentale_' + title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };

        drawMap();
    },

    showVocalExaminerOverlay(title, md) {
        const overlay = this.getSharedOverlay('vocal-tool-overlay', 'Simulatore Esame Orale - ' + title, `
            <svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        body.innerHTML = `
            <div class="vocal-examiner-container">
                <div class="vocal-question-box">
                    <div class="vocal-question-title">Domanda dell'Esaminatore</div>
                    <div class="vocal-question-text" id="vocal-question-text">Clicca su "Avvia Simulazione" per cominciare...</div>
                </div>
                
                <div class="vocal-mic-area">
                    <button class="vocal-mic-btn" id="vocal-mic-btn" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path></svg>
                    </button>
                    <div class="vocal-listening-pulse" id="vocal-listening-pulse">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div id="vocal-status-text" style="font-size:0.85rem; color:var(--text-muted);">Simulazione non avviata</div>
                </div>

                <div class="vocal-transcript-box" id="vocal-transcript-box">
                    La tua risposta apparirà qui mentre parli...
                </div>

                <div id="vocal-feedback-area"></div>
                
                <div style="display:flex; gap:1rem; margin-top: 1rem;">
                    <button class="btn btn-primary" id="vocal-start-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold;">Avvia Simulazione</button>
                    <button class="btn btn-secondary" id="vocal-next-btn" style="display:none; background:rgba(255,255,255,0.05); color:#fff; border:1px solid rgba(255,255,255,0.15)">Prossima Domanda</button>
                </div>
            </div>
        `;

        overlay.classList.add('open');

        const sections = [];
        const lines = md.split('\n');
        let currentSection = null;

        lines.forEach(line => {
            const h2Match = line.match(/^##\s+(.+)$/);
            const h3Match = line.match(/^###\s+(.+)$/);
            const headingMatch = h2Match || h3Match;

            if (headingMatch) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = {
                    title: headingMatch[1].trim(),
                    content: ''
                };
            } else if (currentSection) {
                currentSection.content += line + '\n';
            }
        });
        if (currentSection) {
            sections.push(currentSection);
        }

        const validSections = sections.filter(sec => {
            const titleLower = sec.title.toLowerCase();
            return !titleLower.includes('sommario') && sec.content.trim().length > 40;
        });

        if (validSections.length === 0) {
            body.querySelector('#vocal-question-text').textContent = "Contenuto insufficiente per l'esame in questo capitolo.";
            body.querySelector('#vocal-start-btn').disabled = true;
            return;
        }

        const startBtn = body.querySelector('#vocal-start-btn');
        const nextBtn = body.querySelector('#vocal-next-btn');
        const micBtn = body.querySelector('#vocal-mic-btn');
        const qText = body.querySelector('#vocal-question-text');
        const statusText = body.querySelector('#vocal-status-text');
        const pulse = body.querySelector('#vocal-listening-pulse');
        const transBox = body.querySelector('#vocal-transcript-box');
        const feedbackArea = body.querySelector('#vocal-feedback-area');

        let activeSection = null;

        const speakText = (text, callback) => {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'it-IT';
            this.vocalSpeaking = true;
            
            const voices = window.speechSynthesis.getVoices();
            const itVoice = voices.find(v => v.lang.startsWith('it'));
            if (itVoice) utterance.voice = itVoice;

            utterance.onend = () => {
                this.vocalSpeaking = false;
                if (callback) callback();
            };
            utterance.onerror = () => {
                this.vocalSpeaking = false;
                if (callback) callback();
            };
            window.speechSynthesis.speak(utterance);
        };

        const initSpeechRecognition = () => {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                statusText.textContent = "Errore: Riconoscimento vocale non supportato su questo browser.";
                return null;
            }
            const rec = new SpeechRec();
            rec.lang = 'it-IT';
            rec.continuous = false;
            rec.interimResults = true;

            rec.onstart = () => {
                micBtn.classList.add('listening');
                pulse.classList.add('active');
                statusText.textContent = "Ascolto in corso... parla ora.";
                transBox.innerHTML = '';
            };

            rec.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                transBox.textContent = finalTranscript || interimTranscript;
            };

            rec.onerror = (e) => {
                console.error("Speech recognition error:", e);
                statusText.textContent = "Errore ascolto. Clicca sul microfono per ripetere.";
                micBtn.classList.remove('listening');
                pulse.classList.remove('active');
            };

            rec.onend = () => {
                micBtn.classList.remove('listening');
                pulse.classList.remove('active');
                statusText.textContent = "Ascolto completato. Valutazione in corso...";
                
                setTimeout(() => {
                    evaluateAnswer(transBox.textContent);
                }, 800);
            };

            return rec;
        };

        this.vocalRecognition = initSpeechRecognition();

        const askQuestion = () => {
            activeSection = validSections[Math.floor(Math.random() * validSections.length)];
            feedbackArea.innerHTML = '';
            transBox.textContent = 'In attesa della tua risposta...';
            
            const intro = "Domanda. " + activeSection.title + ". Parlami di questo argomento.";
            qText.textContent = `Parlami di: "${activeSection.title}"`;
            
            statusText.textContent = "L'esaminatore sta parlando...";
            micBtn.disabled = true;

            speakText(intro, () => {
                micBtn.disabled = false;
                if (this.vocalRecognition) {
                    try {
                        this.vocalRecognition.start();
                    } catch(e) {
                        statusText.textContent = "Clicca sull'icona del microfono per rispondere.";
                    }
                } else {
                    statusText.textContent = "Riconoscimento vocale non disponibile.";
                }
            });
        };

        micBtn.onclick = () => {
            if (micBtn.classList.contains('listening')) {
                try { this.vocalRecognition.stop(); } catch(e){}
            } else {
                window.speechSynthesis.cancel();
                this.vocalSpeaking = false;
                try { this.vocalRecognition.start(); } catch(e){}
            }
        };

        startBtn.onclick = () => {
            startBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            askQuestion();
        };

        nextBtn.onclick = () => {
            askQuestion();
        };

        const evaluateAnswer = (answerText) => {
            if (!answerText || answerText.trim() === '' || answerText.includes('In attesa della tua risposta')) {
                feedbackArea.innerHTML = `
                    <div class="vocal-feedback-card" style="border-color:#ef4444; background:rgba(239,68,68,0.02)">
                        <div class="vocal-score-ring" style="color:#ef4444">Non Classificato</div>
                        <div class="vocal-score-feedback">Risposta non pervenuta o insufficiente.</div>
                    </div>
                `;
                return;
            }

            const textSource = activeSection.content;
            const words = textSource.toLowerCase().replace(/[^a-zàèìòù\s]/g, '').split(/\s+/);
            const stopWords = new Set(['anche', 'della', 'delle', 'dello', 'della', 'nella', 'nelle', 'nello', 'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli', 'quelle', 'tutto', 'tutti', 'tutta', 'tutte', 'dopo', 'prima', 'sopra', 'sotto', 'senza', 'contro', 'verso', 'perché', 'come', 'dove', 'quando', 'mentre', 'sotto', 'dalle', 'dalla', 'dello', 'della', 'degli', 'del', 'al', 'ai', 'all', 'allo', 'alla', 'alle', 'nei', 'negli', 'nel', 'nella', 'nelle', 'sul', 'sulla', 'sulle', 'sugli']);
            
            const keywordFrequency = {};
            words.forEach(w => {
                if (w.length > 4 && !stopWords.has(w)) {
                    keywordFrequency[w] = (keywordFrequency[w] || 0) + 1;
                }
            });

            const targetKeywords = Object.keys(keywordFrequency).sort((a,b) => keywordFrequency[b] - keywordFrequency[a]).slice(0, 10);
            
            const cleanAnswer = answerText.toLowerCase();
            const matched = [];
            const missed = [];

            targetKeywords.forEach(kw => {
                const stem = kw.slice(0, Math.max(5, kw.length - 2));
                if (cleanAnswer.includes(stem)) {
                    matched.push(kw);
                } else {
                    missed.push(kw);
                }
            });

            const ratio = matched.length / Math.max(3, Math.min(6, targetKeywords.length));
            let grade = Math.min(30, Math.round(18 + ratio * 12));
            if (matched.length === 0) grade = 18;

            let feedbackMsg = '';
            let lode = false;
            
            if (grade >= 30) {
                grade = 30;
                if (ratio >= 1.0) lode = true;
            }

            if (grade === 30) {
                feedbackMsg = lode ? "Eccellente! Esposizione magistrale con termini precisi e concetti completi." : "Ottimo lavoro! Hai toccato tutti i punti principali richiesti.";
            } else if (grade >= 27) {
                feedbackMsg = "Molto bene! Risposta dettagliata e ben formulata.";
            } else if (grade >= 24) {
                feedbackMsg = "Buona risposta. Potresti migliorare citando i termini chiave mancanti.";
            } else {
                feedbackMsg = "Risposta sufficiente, ma l'esposizione necessita di maggiore approfondimento.";
            }

            const gradeSpeak = `Voto: ${grade} ${lode ? 'e Lode' : ''}. ${feedbackMsg}`;
            speakText(gradeSpeak);

            feedbackArea.innerHTML = `
                <div class="vocal-feedback-card">
                    <div class="vocal-score-ring">${grade}${lode ? ' e Lode' : ''} / 30</div>
                    <div class="vocal-score-feedback">${feedbackMsg}</div>
                    <div class="vocal-score-keywords" style="margin-bottom: 0.6rem;">
                        <strong>Concetti toccati:</strong> 
                        ${matched.length > 0 ? matched.map(m => `<span style="color:#4ade80">${m}</span>`).join(' ') : '<span style="color:#ef4444">Nessuno</span>'}
                    </div>
                    ${missed.length > 0 ? `
                    <div class="vocal-score-keywords">
                        <strong>Concetti da approfondire:</strong> 
                        ${missed.map(m => `<span style="color:rgba(255,255,255,0.4)">${m}</span>`).join(' ')}
                    </div>
                    ` : ''}
                </div>
            `;
            
            LexCore.logStudyActivity();
        };
    },

    showFlashcardsOverlay(title, md) {
        const overlay = this.getSharedOverlay('flashcard-tool-overlay', 'Flashcards RAG - ' + title, `
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');

        const cards = [];
        
        const termDefRegex = /\*\s*\*\*([^*]+)\*\*:\s*([^\n]+)/g;
        let match;
        const cleanText = md.replace(/\r/g, '');

        while ((match = termDefRegex.exec(cleanText)) !== null) {
            cards.push({
                id: 'fc-gen-' + Math.random().toString(36).substr(2, 9),
                subject: this.inferSubject(),
                question: match[1].trim(),
                answer: match[2].trim()
            });
        }

        if (cards.length < 4) {
            const listBoldRegex = /\*\s*\*\*([^*]+)\*\*\s+-\s+([^\n]+)/g;
            let match2;
            while ((match2 = listBoldRegex.exec(cleanText)) !== null) {
                cards.push({
                    id: 'fc-gen-' + Math.random().toString(36).substr(2, 9),
                    subject: this.inferSubject(),
                    question: match2[1].trim(),
                    answer: match2[2].trim()
                });
            }
        }

        if (cards.length < 3) {
            const lines = cleanText.split('\n');
            let lastH = null;
            let lastContent = '';
            
            lines.forEach(line => {
                const hMatch = line.match(/^(##|###)\s+(.+)$/);
                if (hMatch) {
                    if (lastH && lastContent.trim().length > 30) {
                        cards.push({
                            id: 'fc-gen-' + Math.random().toString(36).substr(2, 9),
                            subject: this.inferSubject(),
                            question: "Quali sono gli aspetti principali di: " + lastH,
                            answer: lastContent.trim().split('.').slice(0, 2).join('.') + '.'
                        });
                    }
                    lastH = hMatch[2].trim();
                    lastContent = '';
                } else if (lastH) {
                    lastContent += line + ' ';
                }
            });
            if (lastH && lastContent.trim().length > 30) {
                cards.push({
                    id: 'fc-gen-' + Math.random().toString(36).substr(2, 9),
                    subject: this.inferSubject(),
                    question: "Quali sono gli aspetti principali di: " + lastH,
                    answer: lastContent.trim().split('.').slice(0, 2).join('.') + '.'
                });
            }
        }

        if (cards.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding: 2rem; color:var(--text-muted)">
                    Impossibile generare flashcard in questo capitolo.
                </div>
            `;
            return;
        }

        try {
            const customList = JSON.parse(localStorage.getItem('lex-custom-flashcards') || '[]');
            cards.forEach(card => {
                if (!customList.some(c => c.question === card.question)) {
                    customList.push(card);
                }
            });
            localStorage.setItem('lex-custom-flashcards', JSON.stringify(customList));
        } catch(e) {
            console.error("Errore salvataggio flashcard:", e);
        }

        body.innerHTML = `
            <div class="flashcard-deck-container">
                <div class="flashcard-stage" id="flashcard-stage">
                    <div class="flashcard-card-3d" id="flashcard-card-3d">
                        <div class="flashcard-face flashcard-front">
                            <div class="flashcard-word" id="flashcard-front-text">Front</div>
                        </div>
                        <div class="flashcard-face flashcard-back">
                            <div class="flashcard-definition" id="flashcard-back-text">Back</div>
                        </div>
                    </div>
                </div>
                
                <div class="flashcard-status-actions" id="flashcard-status-actions" style="visibility:hidden; display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
                    <button class="flashcard-status-btn dont-know" id="fc-btn-srs-1" style="background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.2); padding:6px 12px; font-size:0.75rem;">
                        Di Nuovo
                    </button>
                    <button class="flashcard-status-btn hard" id="fc-btn-srs-3" style="background:rgba(245,158,11,0.1); color:#f59e0b; border:1px solid rgba(245,158,11,0.2); padding:6px 12px; font-size:0.75rem;">
                        Difficile
                    </button>
                    <button class="flashcard-status-btn good" id="fc-btn-srs-4" style="background:rgba(59,130,246,0.1); color:#3b82f6; border:1px solid rgba(59,130,246,0.2); padding:6px 12px; font-size:0.75rem;">
                        Bene
                    </button>
                    <button class="flashcard-status-btn easy" id="fc-btn-srs-5" style="background:rgba(34,197,94,0.1); color:#4ade80; border:1px solid rgba(34,197,94,0.2); padding:6px 12px; font-size:0.75rem;">
                        Facile
                    </button>
                </div>

                <div class="flashcard-nav-controls">
                    <button class="flashcard-nav-btn" id="fc-prev-btn">
                        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span class="flashcard-counter" id="fc-counter">1 / ${cards.length}</span>
                    <button class="flashcard-nav-btn" id="fc-next-btn">
                        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
            </div>
        `;

        overlay.classList.add('open');

        const stage = body.querySelector('#flashcard-stage');
        const card3D = body.querySelector('#flashcard-card-3d');
        const frontText = body.querySelector('#flashcard-front-text');
        const backText = body.querySelector('#flashcard-back-text');
        const statusBox = body.querySelector('#flashcard-status-actions');
        const prevBtn = body.querySelector('#fc-prev-btn');
        const nextBtn = body.querySelector('#fc-next-btn');
        const counter = body.querySelector('#fc-counter');
        const srsBtn1 = body.querySelector('#fc-btn-srs-1');
        const srsBtn3 = body.querySelector('#fc-btn-srs-3');
        const srsBtn4 = body.querySelector('#fc-btn-srs-4');
        const srsBtn5 = body.querySelector('#fc-btn-srs-5');

        let currentIndex = 0;

        const updateCard = () => {
            card3D.classList.remove('flipped');
            statusBox.style.visibility = 'hidden';
            
            setTimeout(() => {
                const card = cards[currentIndex];
                frontText.textContent = card.question;
                backText.textContent = card.answer;
                counter.textContent = `${currentIndex + 1} / ${cards.length}`;
            }, 150);
        };

        stage.onclick = () => {
            card3D.classList.toggle('flipped');
            if (card3D.classList.contains('flipped')) {
                statusBox.style.visibility = 'visible';
            } else {
                statusBox.style.visibility = 'hidden';
            }
        };

        prevBtn.onclick = (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateCard();
            }
        };

        nextBtn.onclick = (e) => {
            e.stopPropagation();
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCard();
            }
        };

        const handleSRS = (quality) => {
            const currentCard = cards[currentIndex];
            
            const defaultState = {
                interval: 0,
                repetition: 0,
                efactor: 2.5,
                dueDate: 0
            };
            let srs = defaultState;
            try {
                const stored = localStorage.getItem('lex-srs-' + currentCard.id);
                srs = stored ? JSON.parse(stored) : defaultState;
            } catch(e){}
            
            if (quality < 3) {
                srs.repetition = 0;
                srs.interval = 1;
            } else {
                if (srs.repetition === 0) {
                    srs.interval = 1;
                } else if (srs.repetition === 1) {
                    srs.interval = 3;
                } else {
                    srs.interval = Math.ceil(srs.interval * srs.efactor);
                }
                srs.repetition++;
            }
            
            srs.efactor = srs.efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            if (srs.efactor < 1.3) srs.efactor = 1.3;
            
            srs.dueDate = Date.now() + srs.interval * 24 * 60 * 60 * 1000;
            
            try {
                localStorage.setItem('lex-srs-' + currentCard.id, JSON.stringify(srs));
                let completed = parseInt(localStorage.getItem('lex-flashcards-completed') || '0');
                localStorage.setItem('lex-flashcards-completed', (completed + 1).toString());
            } catch(e){}
            
            this.awardXP(3);

            this.showNotification("Registrato!", `Ripasso programmato tra ${srs.interval} giorni.`);

            if (currentIndex < cards.length - 1) {
                setTimeout(() => {
                    currentIndex++;
                    updateCard();
                }, 400);
            } else {
                this.showNotification("Mazzo Completato!", "Ottimo! Hai completato le flashcard di questo capitolo.");
            }
        };

        srsBtn1.onclick = (e) => { e.stopPropagation(); handleSRS(1); };
        srsBtn3.onclick = (e) => { e.stopPropagation(); handleSRS(3); };
        srsBtn4.onclick = (e) => { e.stopPropagation(); handleSRS(4); };
        srsBtn5.onclick = (e) => { e.stopPropagation(); handleSRS(5); };

        updateCard();
    },

    inferSubject() {
        const path = window.location.pathname;
        if (path.includes('diritto')) return 'diritto';
        if (path.includes('romana')) return 'romana';
        if (path.includes('storia')) return 'storia';
        return 'arte';
    },

    showGlossarySidebar(title, md, activeTerm) {
        let sidebar = document.getElementById('lex-glossary-sidebar');
        if (!sidebar) {
            sidebar = document.createElement('div');
            sidebar.id = 'lex-glossary-sidebar';
            sidebar.className = 'lex-glossary-sidebar';
            document.body.appendChild(sidebar);
        }

        sidebar.innerHTML = `
            <div class="lex-glossary-sidebar-header">
                <h3 class="lex-glossary-sidebar-title">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    Glossario Capitolo
                </h3>
                <button class="lex-study-tool-close-btn">&times;</button>
            </div>
            <div class="lex-glossary-sidebar-body"></div>
        `;

        sidebar.querySelector('.lex-study-tool-close-btn').onclick = () => {
            sidebar.classList.remove('open');
        };

        const body = sidebar.querySelector('.lex-glossary-sidebar-body');
        
        const matchedTerms = [];
        if (window.glossaryDatabase) {
            const cleanMD = md.toLowerCase();
            Object.keys(window.glossaryDatabase).forEach(key => {
                const termMeta = window.glossaryDatabase[key];
                const cleanTerm = key.toLowerCase();
                if (cleanMD.includes(cleanTerm)) {
                    matchedTerms.push(termMeta);
                }
            });
        }

        if (matchedTerms.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding: 2rem; color:var(--text-muted); font-size:0.85rem">
                    Nessun termine di glossario identificato in questa sintesi.
                </div>
            `;
        } else {
            body.innerHTML = matchedTerms.map(term => `
                <div class="lex-glossary-item-card" id="glossary-card-${term.term.toLowerCase().replace(/\s+/g, '-')}" data-term="${term.term.toLowerCase()}">
                    <div class="lex-glossary-item-term">
                        <span>${term.term}</span>
                        <span class="lex-glossary-item-domain">${term.domain}</span>
                    </div>
                    <div class="lex-glossary-item-def">${term.definition}</div>
                </div>
            `).join('');
        }

        sidebar.classList.add('open');

        if (activeTerm) {
            const cardId = `glossary-card-${activeTerm.toLowerCase().replace(/\s+/g, '-')}`;
            setTimeout(() => {
                const card = body.querySelector('#' + cardId) || body.querySelector(`[data-term*="${activeTerm.toLowerCase()}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.classList.add('highlighted');
                    setTimeout(() => {
                        card.classList.remove('highlighted');
                    }, 2500);
                }
            }, 300);
        }
    },

    showNotification(title, message) {
        let toastContainer = document.getElementById('lex-sweet-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'lex-sweet-toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = 'lex-sweet-toast';
        toast.innerHTML = `
            <div class="toast-heart">✨</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-body">${message}</div>
            </div>
            <button class="toast-close-btn" style="margin-left: 0.5rem; font-size: 1.1rem; opacity: 0.7; border:none; background:none; cursor:pointer; color:var(--text-muted);">&times;</button>
        `;
        
        toast.querySelector('.toast-close-btn').onclick = () => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        };
        
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    playAudioSuccessChime() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            const playTone = (time, freq) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, time);
                gainNode.gain.setValueAtTime(0.15, time);
                gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
                osc.start(time);
                osc.stop(time + 0.5);
            };
            playTone(now, 880);
            playTone(now + 0.12, 1320);
        } catch(e) { console.error(e); }
    },

    playMonasteryBell() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            const freqs = [110, 220, 330, 440, 550];
            const gains = [0.4, 0.3, 0.2, 0.1, 0.05];
            freqs.forEach((f, idx) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                const lfo = audioCtx.createOscillator();
                const lfoGain = audioCtx.createGain();
                
                lfo.frequency.value = 6;
                lfoGain.gain.value = 2;
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now);
                gainNode.gain.setValueAtTime(gains[idx], now);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
                
                lfo.start(now);
                osc.start(now);
                lfo.stop(now + 4.5);
                osc.stop(now + 4.5);
            });
        } catch(e) { console.error(e); }
    },

    showPomodoroOverlay(title, md) {
        const overlay = this.getSharedOverlay('pomodoro-tool-overlay', 'Pomodoro Scriptorium - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H7M17 19H7M12 2a5 5 0 0 0-5 5v3c0 2 2 4 5 4s5-2 5-4V7a5 5 0 0 0-5-5zM12 22a5 5 0 0 1-5-5v-3c0-2 2-4 5-4s5 2 5 4v3a5 5 0 0 1-5 5z"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        body.innerHTML = `
            <div class="pomodoro-container">
                <canvas id="pomodoro-candle-canvas" width="200" height="250"></canvas>
                <div class="pomodoro-timer-display" id="pomodoro-timer-time">25:00</div>
                <div class="pomodoro-controls">
                    <button class="btn btn-primary" id="pomodoro-start-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold;">Avvia</button>
                    <button class="btn btn-secondary" id="pomodoro-reset-btn">Reset</button>
                </div>
                <div class="pomodoro-settings">
                    <div class="pomodoro-setting-group">
                        <label>Sessione</label>
                        <select id="pomodoro-study-select">
                            <option value="15">15 Minuti (Test)</option>
                            <option value="25" selected>25 Minuti</option>
                            <option value="50">50 Minuti</option>
                        </select>
                    </div>
                    <div class="pomodoro-setting-group">
                        <label>Pausa</label>
                        <select id="pomodoro-break-select">
                            <option value="3">3 Minuti (Test)</option>
                            <option value="5" selected>5 Minuti</option>
                            <option value="10">10 Minuti</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        
        overlay.classList.add('open');
        
        if (this.pomodoroInterval) clearInterval(this.pomodoroInterval);
        this.pomodoroInterval = null;
        
        this.pomodoroStudyTime = parseInt(body.querySelector('#pomodoro-study-select').value) * 60;
        this.pomodoroBreakTime = parseInt(body.querySelector('#pomodoro-break-select').value) * 60;
        
        this.pomodoroTimeLeft = this.pomodoroStudyTime;
        this.pomodoroTotalDuration = this.pomodoroStudyTime;
        this.pomodoroState = 'idle';
        
        const timeDisplay = body.querySelector('#pomodoro-timer-time');
        const startBtn = body.querySelector('#pomodoro-start-btn');
        const resetBtn = body.querySelector('#pomodoro-reset-btn');
        
        const updateTimeDisplay = () => {
            const mins = Math.floor(this.pomodoroTimeLeft / 60).toString().padStart(2, '0');
            const secs = (this.pomodoroTimeLeft % 60).toString().padStart(2, '0');
            timeDisplay.innerText = `${mins}:${secs}`;
            if (this.pomodoroState === 'break') {
                timeDisplay.style.color = '#4ade80';
                timeDisplay.style.textShadow = '0 0 15px rgba(74, 222, 128, 0.3)';
            } else {
                timeDisplay.style.color = 'var(--study-accent, #d4af37)';
                timeDisplay.style.textShadow = '0 0 15px rgba(212, 175, 55, 0.3)';
            }
        };
        
        updateTimeDisplay();
        this.startPomodoroAnimation();
        
        body.querySelector('#pomodoro-study-select').onchange = (e) => {
            if (this.pomodoroState === 'idle' || this.pomodoroState === 'paused') {
                this.pomodoroStudyTime = parseInt(e.target.value) * 60;
                this.pomodoroTimeLeft = this.pomodoroStudyTime;
                this.pomodoroTotalDuration = this.pomodoroStudyTime;
                updateTimeDisplay();
            }
        };
        
        body.querySelector('#pomodoro-break-select').onchange = (e) => {
            this.pomodoroBreakTime = parseInt(e.target.value) * 60;
        };
        
        startBtn.onclick = () => {
            if (this.pomodoroState === 'running') {
                this.pomodoroState = 'paused';
                startBtn.innerText = 'Riprendi';
                if (this.pomodoroInterval) clearInterval(this.pomodoroInterval);
            } else {
                if (this.pomodoroState === 'idle') {
                    this.playAudioSuccessChime();
                }
                this.pomodoroState = 'running';
                startBtn.innerText = 'Pausa';
                
                this.pomodoroInterval = setInterval(() => {
                    this.pomodoroTimeLeft--;
                    if (this.pomodoroTimeLeft <= 0) {
                        clearInterval(this.pomodoroInterval);
                        this.playMonasteryBell();
                        
                        if (this.pomodoroState === 'running') {
                            this.showNotification('Pomodoro Completato', 'Ottimo lavoro! Ora è tempo di fare una meritata pausa.');
                            this.awardXP(25);
                            this.pomodoroState = 'break';
                            this.pomodoroTimeLeft = this.pomodoroBreakTime;
                            this.pomodoroTotalDuration = this.pomodoroBreakTime;
                            startBtn.innerText = 'Avvia Pausa';
                        } else {
                            this.showNotification('Pausa Finita', 'La pausa è terminata. Sei pronto per una nuova sessione di studio?');
                            this.pomodoroState = 'idle';
                            this.pomodoroTimeLeft = this.pomodoroStudyTime;
                            this.pomodoroTotalDuration = this.pomodoroStudyTime;
                            startBtn.innerText = 'Avvia Studio';
                        }
                        updateTimeDisplay();
                    } else {
                        updateTimeDisplay();
                    }
                }, 1000);
            }
        };
        
        resetBtn.onclick = () => {
            if (this.pomodoroInterval) clearInterval(this.pomodoroInterval);
            this.pomodoroInterval = null;
            this.pomodoroState = 'idle';
            this.pomodoroStudyTime = parseInt(body.querySelector('#pomodoro-study-select').value) * 60;
            this.pomodoroTimeLeft = this.pomodoroStudyTime;
            this.pomodoroTotalDuration = this.pomodoroStudyTime;
            startBtn.innerText = 'Avvia';
            updateTimeDisplay();
        };
    },

    showClozeTestOverlay(title, md) {
        const overlay = this.getSharedOverlay('cloze-tool-overlay', 'Test Riempi Spazi - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="10" y1="17" x2="8" y2="17"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        const data = this.extractClozeItems(md);
        if (!data.paragraph || data.terms.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
                    Nessun elemento in grassetto sufficiente trovato per generare l'esercizio in questo capitolo.
                </div>
            `;
            overlay.classList.add('open');
            return;
        }
        
        let htmlParagraph = data.paragraph
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
        data.terms.forEach((term, idx) => {
            const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`\\*\\*${escapedTerm}\\*\\*`, 'g');
            htmlParagraph = htmlParagraph.replace(regex, `<span class="cloze-blank" data-answer="${encodeURIComponent(term)}" id="cloze-blank-${idx}">____</span>`);
        });
        
        htmlParagraph = htmlParagraph.replace(/\*\*(.*?)\*\*/g, '$1');
        
        const shuffled = [...data.terms].sort(() => Math.random() - 0.5);
        const wordPoolHtml = shuffled.map((term, idx) => `
            <div class="cloze-draggable-word" draggable="true" data-word="${encodeURIComponent(term)}" id="cloze-word-${idx}">${term}</div>
        `).join('');
        
        body.innerHTML = `
            <div class="cloze-container">
                <div class="cloze-instructions">
                    Trascina le parole dal pool sottostante oppure fai clic su una parola e poi sul relativo spazio vuoto.
                </div>
                <div class="cloze-paragraph">
                    ${htmlParagraph}
                </div>
                <div class="cloze-word-pool">
                    ${wordPoolHtml}
                </div>
                <div id="cloze-congrats-area"></div>
            </div>
        `;
        
        overlay.classList.add('open');
        
        let activeSelectedWord = null;
        const words = body.querySelectorAll('.cloze-draggable-word');
        const blanks = body.querySelectorAll('.cloze-blank');
        
        words.forEach(word => {
            word.ondragstart = (e) => {
                e.dataTransfer.setData('text/plain', word.getAttribute('data-word'));
                e.dataTransfer.setData('source-id', word.id);
            };
            word.onclick = () => {
                words.forEach(w => w.style.boxShadow = '');
                activeSelectedWord = word;
                word.style.boxShadow = '0 0 10px var(--accent-cyan)';
            };
        });
        
        const checkClozeAnswer = (blank, wordValue, sourceId) => {
            if (blank.classList.contains('correct')) return;
            
            const decodedAnswer = decodeURIComponent(blank.getAttribute('data-answer'));
            const decodedWord = decodeURIComponent(wordValue);
            
            if (decodedAnswer.toLowerCase().trim() === decodedWord.toLowerCase().trim()) {
                blank.innerText = decodedAnswer;
                blank.classList.add('correct');
                
                const srcEl = body.querySelector('#' + sourceId);
                if (srcEl) {
                    srcEl.style.opacity = '0.3';
                    srcEl.style.pointerEvents = 'none';
                    srcEl.setAttribute('draggable', 'false');
                }
                
                this.playAudioSuccessChime();
                this.triggerGoldStarsExplosion(blank);
                
                const allCorrect = Array.from(blanks).every(b => b.classList.contains('correct'));
                if (allCorrect) {
                    const congrats = body.querySelector('#cloze-congrats-area');
                    congrats.innerHTML = `
                        <div class="cloze-success-message">
                            🎉 Complimenti! Hai completato l'esercizio con successo!
                        </div>
                    `;
                    this.awardXP(15);
                }
            } else {
                blank.classList.add('shake');
                setTimeout(() => blank.classList.remove('shake'), 400);
            }
        };
        
        blanks.forEach(blank => {
            blank.ondragover = (e) => {
                e.preventDefault();
                blank.classList.add('hovered');
            };
            blank.ondragleave = () => {
                blank.classList.remove('hovered');
            };
            blank.ondrop = (e) => {
                e.preventDefault();
                blank.classList.remove('hovered');
                const wordValue = e.dataTransfer.getData('text/plain');
                const sourceId = e.dataTransfer.getData('source-id');
                checkClozeAnswer(blank, wordValue, sourceId);
            };
            blank.onclick = () => {
                if (activeSelectedWord) {
                    const wordValue = activeSelectedWord.getAttribute('data-word');
                    const sourceId = activeSelectedWord.id;
                    checkClozeAnswer(blank, wordValue, sourceId);
                    activeSelectedWord = null;
                    words.forEach(w => w.style.boxShadow = '');
                }
            };
        });
    },

    showSplitScreenOverlay(title, md) {
        const overlay = this.getSharedOverlay('splitscreen-tool-overlay', 'Studio Comparativo - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        const chapters = this.getAvailableChapters();
        const optionsHtml = chapters.map(ch => `
            <option value="${ch.path}">${ch.title}</option>
        `).join('');
        
        body.innerHTML = `
            <div class="splitscreen-container">
                <div class="splitscreen-col">
                    <div class="splitscreen-col-header">
                        <h4 class="splitscreen-col-title">${title}</h4>
                        <span style="font-size:0.75rem; color:var(--text-muted)">Corrente</span>
                    </div>
                    <div class="splitscreen-col-body" id="splitscreen-left-body">
                        ${this.renderMarkdownToHtml(md)}
                    </div>
                </div>
                <div class="splitscreen-col">
                    <div class="splitscreen-col-header">
                        <h4 class="splitscreen-col-title" id="splitscreen-right-title">Seleziona capitolo...</h4>
                        <select class="splitscreen-select-box" id="splitscreen-select-chapter">
                            <option value="" selected disabled>Confronta con...</option>
                            ${optionsHtml}
                        </select>
                    </div>
                    <div class="splitscreen-col-body" id="splitscreen-right-body" style="display:flex; align-items:center; justify-content:center; color:var(--text-muted)">
                        Scegli un capitolo dal menu a tendina per avviare il confronto.
                    </div>
                </div>
            </div>
        `;
        
        overlay.classList.add('open');
        
        const leftBody = body.querySelector('#splitscreen-left-body');
        const rightBody = body.querySelector('#splitscreen-right-body');
        const select = body.querySelector('#splitscreen-select-chapter');
        const rightTitle = body.querySelector('#splitscreen-right-title');
        
        let isSyncingScroll = false;
        const syncScroll = (src, dest) => {
            if (isSyncingScroll) return;
            isSyncingScroll = true;
            const percentage = src.scrollTop / (src.scrollHeight - src.clientHeight);
            dest.scrollTop = percentage * (dest.scrollHeight - dest.clientHeight);
            setTimeout(() => { isSyncingScroll = false; }, 50);
        };
        
        leftBody.onscroll = () => syncScroll(leftBody, rightBody);
        
        select.onchange = (e) => {
            const path = e.target.value;
            const option = select.options[select.selectedIndex];
            const compareTitle = option.text;
            
            rightBody.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100%">
                    <span style="color:var(--study-accent)">Caricamento in corso...</span>
                </div>
            `;
            
            fetch(path)
                .then(r => r.text())
                .then(compareMd => {
                    rightTitle.innerText = compareTitle;
                    
                    const commonKeywords = this.findCommonKeywords(md, compareMd);
                    
                    const leftHtml = this.highlightCommonWords(this.renderMarkdownToHtml(md), commonKeywords);
                    const rightHtml = this.highlightCommonWords(this.renderMarkdownToHtml(compareMd), commonKeywords);
                    
                    leftBody.innerHTML = leftHtml;
                    rightBody.innerHTML = rightHtml;
                    
                    rightBody.style.display = 'block';
                    rightBody.onscroll = () => syncScroll(rightBody, leftBody);
                    
                    if (commonKeywords.length > 0) {
                        this.showNotification('Analisi Completata', `Identificati ${commonKeywords.length} concetti in comune evidenziati in oro.`);
                    }
                })
                .catch(err => {
                    console.error(err);
                    rightBody.innerHTML = `
                        <div style="display:flex; justify-content:center; align-items:center; height:100%; color:#ef4444">
                            Errore durante il caricamento del capitolo.
                        </div>
                    `;
                });
        };
    },

    showConceptMatcherOverlay(title, md) {
        const overlay = this.getSharedOverlay('matcher-tool-overlay', 'Concept Matcher - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M8 21H3v-5M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M21 3L14 10M3 21l7-7"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');
        
        const pairs = this.getMatcherPairs(md);
        if (pairs.length < 3) {
            body.innerHTML = `
                <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
                    Termini di glossario insufficienti in questo capitolo per generare il gioco delle coppie.
                </div>
            `;
            overlay.classList.add('open');
            return;
        }
        
        const leftTerms = pairs.map((p, idx) => ({ id: idx, term: p.term }));
        const rightDefs = pairs.map((p, idx) => ({ id: idx, def: p.definition }));
        
        leftTerms.sort(() => Math.random() - 0.5);
        rightDefs.sort(() => Math.random() - 0.5);
        
        const leftHtml = leftTerms.map(t => `
            <div class="matcher-card-item matcher-col-left-item" data-id="${t.id}" id="matcher-left-${t.id}">
                <div style="flex-grow:1">${t.term}</div>
                <span class="matcher-connector-dot"></span>
            </div>
        `).join('');
        
        const rightHtml = rightDefs.map(d => `
            <div class="matcher-card-item matcher-col-right-item" data-id="${d.id}" id="matcher-right-${d.id}">
                <span class="matcher-connector-dot"></span>
                <div style="flex-grow:1; font-size:0.75rem; line-height:1.3">${d.def}</div>
            </div>
        `).join('');
        
        body.innerHTML = `
            <div class="matcher-container">
                <div class="cloze-instructions">
                    Collega ogni termine di sinistra con la rispettiva definizione a destra. Seleziona prima un termine, poi la sua definizione.
                </div>
                <div class="matcher-grid">
                    <div class="matcher-col matcher-col-left">
                        ${leftHtml}
                    </div>
                    <div class="matcher-col matcher-col-right">
                        ${rightHtml}
                    </div>
                </div>
                <svg class="matcher-svg-overlay" id="matcher-svg-lines"></svg>
                <div id="matcher-congrats-area"></div>
            </div>
        `;
        
        overlay.classList.add('open');
        
        const svgLines = body.querySelector('#matcher-svg-lines');
        let selectedLeftCard = null;
        
        const leftCards = body.querySelectorAll('.matcher-col-left-item');
        const rightCards = body.querySelectorAll('.matcher-col-right-item');
        
        const onMouseMove = (e) => {
            if (!selectedLeftCard) return;
            const rect = svgLines.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const startCoords = this.getDotCoords(selectedLeftCard);
            this.drawSvgLine('temp-line', startCoords.x, startCoords.y, mouseX, mouseY, 'var(--accent-cyan)', true);
        };
        
        overlay.addEventListener('mousemove', onMouseMove);
        
        const animateLineRetract = (id, x1, y1, startX2, startY2) => {
            const line = svgLines.getElementById(id);
            if (!line) return;
            line.setAttribute('stroke', '#ef4444');
            line.removeAttribute('stroke-dasharray');
            let startTime = null;
            const duration = 250;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                if (progress < 1) {
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const curX2 = startX2 - (startX2 - x1) * ease;
                    const curY2 = startY2 - (startY2 - y1) * ease;
                    line.setAttribute('x2', curX2);
                    line.setAttribute('y2', curY2);
                    requestAnimationFrame(animate);
                } else {
                    line.remove();
                }
            };
            requestAnimationFrame(animate);
        };
        
        leftCards.forEach(card => {
            card.onclick = (e) => {
                if (card.classList.contains('matched')) return;
                leftCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedLeftCard = card;
            };
        });
        
        rightCards.forEach(card => {
            card.onclick = (e) => {
                if (card.classList.contains('matched')) return;
                if (!selectedLeftCard) return;
                
                const leftId = selectedLeftCard.getAttribute('data-id');
                const rightId = card.getAttribute('data-id');
                const startCoords = this.getDotCoords(selectedLeftCard);
                const endCoords = this.getDotCoords(card);
                
                const tempLine = svgLines.getElementById('temp-line');
                if (tempLine) tempLine.remove();
                
                if (leftId === rightId) {
                    selectedLeftCard.classList.add('matched');
                    card.classList.add('matched');
                    selectedLeftCard.classList.remove('selected');
                    
                    const lineId = `matched-line-${leftId}`;
                    this.drawSvgLine(lineId, startCoords.x, startCoords.y, endCoords.x, endCoords.y, '#22c55e');
                    
                    this.playAudioSuccessChime();
                    this.triggerGoldStarsExplosion(card);
                    selectedLeftCard = null;
                    
                    const allMatched = Array.from(leftCards).every(c => c.classList.contains('matched'));
                    if (allMatched) {
                        const congrats = body.querySelector('#matcher-congrats-area');
                        congrats.innerHTML = `
                            <div class="cloze-success-message">
                                🎉 Fantastico! Hai accoppiato correttamente tutti i termini!
                            </div>
                        `;
                        this.awardXP(20);
                    }
                } else {
                    selectedLeftCard.classList.add('shake');
                    card.classList.add('shake');
                    const cSelected = selectedLeftCard;
                    const cCard = card;
                    setTimeout(() => {
                        cSelected.classList.remove('shake');
                        cCard.classList.remove('shake');
                    }, 400);
                    
                    this.drawSvgLine('wrong-line', startCoords.x, startCoords.y, endCoords.x, endCoords.y, '#ef4444');
                    animateLineRetract('wrong-line', startCoords.x, startCoords.y, endCoords.x, endCoords.y);
                    
                    selectedLeftCard.classList.remove('selected');
                    selectedLeftCard = null;
                }
            };
        });
    },

    initMarginNotes(filePath) {
        const view = document.getElementById('markdown-view') || document.querySelector('.markdown-view');
        if (!view) return;
        
        const paragraphs = view.querySelectorAll('p');
        paragraphs.forEach((p, idx) => {
            p.style.position = 'relative';
            const noteKey = `lex-margin-note-${filePath}-${idx}`;
            const savedNote = localStorage.getItem(noteKey);
            if (savedNote && savedNote.trim().length > 0) {
                this.createMarginNoteElements(filePath, idx, p, savedNote);
            }
            
            p.ondblclick = (e) => {
                if (e.target.closest('.lex-margin-note-btn') || e.target.closest('.lex-margin-postit')) return;
                this.showMarginPostIt(filePath, idx, p);
            };
        });
    },

    createMarginNoteElements(filePath, idx, paragraphEl, text) {
        let btn = paragraphEl.querySelector('.lex-margin-note-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'lex-margin-note-btn has-note';
            paragraphEl.appendChild(btn);
        }
        
        let postit = paragraphEl.querySelector('.lex-margin-postit');
        if (!postit) {
            postit = document.createElement('div');
            postit.className = 'lex-margin-postit';
            paragraphEl.appendChild(postit);
        }
        
        const noteKey = `lex-margin-note-${filePath}-${idx}`;
        postit.innerHTML = `
            <div class="lex-margin-postit-header">
                <span class="lex-margin-postit-title">Nota Paragrafo</span>
                <button class="lex-margin-postit-close">&times;</button>
            </div>
            <textarea placeholder="Scrivi nota...">${text}</textarea>
            <div class="lex-margin-postit-footer">
                <span>Modificato</span>
                <button class="lex-margin-postit-save-btn">Salva</button>
            </div>
        `;
        
        btn.onclick = (e) => {
            e.stopPropagation();
            postit.classList.toggle('open');
        };
        
        postit.querySelector('.lex-margin-postit-close').onclick = (e) => {
            e.stopPropagation();
            postit.classList.remove('open');
        };
        
        postit.querySelector('.lex-margin-postit-save-btn').onclick = (e) => {
            e.stopPropagation();
            const newText = postit.querySelector('textarea').value;
            if (newText.trim().length === 0) {
                localStorage.removeItem(noteKey);
                postit.remove();
                btn.remove();
            } else {
                localStorage.setItem(noteKey, newText);
                postit.classList.remove('open');
                this.showNotification('Nota Salvata', 'La nota a margine è stata salvata con successo.');
            }
        };
    },

    showMarginPostIt(filePath, idx, paragraphEl) {
        const noteKey = `lex-margin-note-${filePath}-${idx}`;
        const currentText = localStorage.getItem(noteKey) || '';
        this.createMarginNoteElements(filePath, idx, paragraphEl, currentText);
        const postit = paragraphEl.querySelector('.lex-margin-postit');
        if (postit) {
            postit.classList.add('open');
            postit.querySelector('textarea').focus();
        }
    },

    getDotCoords(cardEl) {
        const dot = cardEl.querySelector('.matcher-connector-dot');
        if (!dot) return { x: 0, y: 0 };
        const container = document.getElementById('matcher-svg-lines');
        if (!container) return { x: 0, y: 0 };
        const rectDot = dot.getBoundingClientRect();
        const rectContainer = container.getBoundingClientRect();
        return {
            x: rectDot.left + rectDot.width / 2 - rectContainer.left,
            y: rectDot.top + rectDot.height / 2 - rectContainer.top
        };
    },

    drawSvgLine(id, x1, y1, x2, y2, color, isTemp = false) {
        const svg = document.getElementById('matcher-svg-lines');
        if (!svg) return;
        let line = svg.getElementById(id);
        if (!line) {
            line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('id', id);
            svg.appendChild(line);
        }
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '3');
        if (isTemp) {
            line.setAttribute('stroke-dasharray', '5,5');
        } else {
            line.removeAttribute('stroke-dasharray');
        }
    },

    getAvailableChapters() {
        const list = [];
        const cards = document.querySelectorAll('.chapter-card, .chapter-card-plus');
        cards.forEach(card => {
            const h3 = card.querySelector('h3');
            const button = card.querySelector('button[onclick*="openSummary"]');
            if (h3 && button) {
                const title = h3.innerText.trim();
                const onclickText = button.getAttribute('onclick');
                const match = onclickText.match(/openSummary\s*\(\s*['"`](.*?)['"`]\s*,\s*['"`](.*?)['"`]\s*\)/);
                if (match) {
                    list.push({ title: match[1], path: match[2] });
                }
            }
        });
        if (list.length === 0) {
            const buttons = document.querySelectorAll('button[onclick*="openSummary"]');
            buttons.forEach(button => {
                const onclickText = button.getAttribute('onclick');
                const match = onclickText.match(/openSummary\s*\(\s*['"`](.*?)['"`]\s*,\s*['"`](.*?)['"`]\s*\)/);
                if (match) {
                    let title = match[1];
                    const card = button.closest('article, div');
                    if (card) {
                        const h3 = card.querySelector('h3, h4, h2');
                        if (h3) title = h3.innerText.trim();
                    }
                    list.push({ title: title, path: match[2] });
                }
            });
        }
        return list;
    },

    renderMarkdownToHtml(md) {
        if (window.marked && typeof window.marked.parse === 'function') {
            return window.marked.parse(md);
        } else if (window.marked && typeof window.marked === 'function') {
            return window.marked(md);
        } else {
            let html = md;
            html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
            html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
            html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
            html = html.replace(/\n\s*\n/g, '</p><p>');
            return '<p>' + html + '</p>';
        }
    },

    findCommonKeywords(text1, text2) {
        const stopwords = new Set([
            'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli', 'quelle',
            'perche', 'perché', 'quando', 'mentre', 'contro', 'dentro', 'dietro', 'grande',
            'piccolo', 'sempre', 'ancora', 'allora', 'invece', 'oppure', 'ovvero', 'alcuni',
            'alcune', 'durante', 'tramite', 'presso', 'pressoché', 'nonostante', 'tuttavia'
        ]);
        const getWords = (text) => {
            const clean = text.replace(/[*#_`~\[\]()\-+,.!?;:]/g, ' ');
            return clean.toLowerCase().split(/\s+/).filter(w => w.length >= 6 && !stopwords.has(w));
        };
        const words1 = new Set(getWords(text1));
        const words2 = new Set(getWords(text2));
        const common = new Set();
        words1.forEach(w => {
            if (words2.has(w)) common.add(w);
        });
        return Array.from(common);
    },

    highlightCommonWords(htmlContent, commonWords) {
        if (commonWords.length === 0) return htmlContent;
        let result = htmlContent;
        const sortedWords = [...commonWords].sort((a,b) => b.length - a.length);
        sortedWords.forEach(word => {
            const parts = result.split(/(<[^>]+>)/g);
            for (let i = 0; i < parts.length; i++) {
                if (parts[i].startsWith('<')) continue;
                const regex = new RegExp(`\\b(${word}[a-z]*)\\b`, 'gi');
                parts[i] = parts[i].replace(regex, '<span class="splitscreen-common-highlight">$1</span>');
            }
            result = parts.join('');
        });
        return result;
    },

    extractClozeItems(md) {
        const paragraphs = md.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0 && !p.startsWith('#') && !p.startsWith('!'));
        let targetParagraph = null;
        let terms = [];
        for (const p of paragraphs) {
            const matches = [...p.matchAll(/\*\*(.*?)\*\*/g)].map(m => m[1].trim());
            const uniqueMatches = [...new Set(matches)];
            if (uniqueMatches.length >= 3 && uniqueMatches.length <= 6) {
                targetParagraph = p;
                terms = uniqueMatches;
                break;
            }
        }
        if (!targetParagraph) {
            for (const p of paragraphs) {
                const matches = [...p.matchAll(/\*\*(.*?)\*\*/g)].map(m => m[1].trim());
                const uniqueMatches = [...new Set(matches)];
                if (uniqueMatches.length >= 2) {
                    targetParagraph = p;
                    terms = uniqueMatches;
                    break;
                }
            }
        }
        if (!targetParagraph) {
            const matches = [...md.matchAll(/\*\*(.*?)\*\*/g)].map(m => m[1].trim());
            const uniqueMatches = [...new Set(matches)].slice(0, 5);
            if (uniqueMatches.length >= 2) {
                terms = uniqueMatches;
                const sentences = md.split(/[.!?\n]/).map(s => s.trim()).filter(s => s.length > 0);
                const matchedSentences = [];
                for (const s of sentences) {
                    if (uniqueMatches.some(t => s.includes(`**${t}**`))) {
                        matchedSentences.push(s);
                        if (matchedSentences.length >= 4) break;
                    }
                }
                targetParagraph = matchedSentences.join('. ') + '.';
            }
        }
        return { paragraph: targetParagraph, terms: terms };
    },

    getMatcherPairs(md) {
        const pairs = [];
        if (window.glossaryDatabase) {
            const cleanMD = md.toLowerCase();
            Object.keys(window.glossaryDatabase).forEach(key => {
                const termMeta = window.glossaryDatabase[key];
                const cleanTerm = key.toLowerCase();
                if (cleanMD.includes(cleanTerm)) {
                    pairs.push({ term: termMeta.term, definition: termMeta.definition });
                }
            });
        }
        if (pairs.length < 3) {
            const lines = md.split('\n');
            lines.forEach(line => {
                const match = line.match(/^\s*\*\*(.*?)\*\*\s*[:\-]\s*(.*?)$/);
                if (match) {
                    const term = match[1].trim();
                    const def = match[2].trim();
                    if (term && def && !pairs.some(p => p.term.toLowerCase() === term.toLowerCase())) {
                        pairs.push({ term, definition: def });
                    }
                }
            });
        }
        if (pairs.length < 3) {
            const matches = [...md.matchAll(/\*\*(.*?)\*\*/g)].map(m => m[1].trim());
            const uniqueMatches = [...new Set(matches)];
            const sentences = md.split(/[.!?\n]/).map(s => s.trim()).filter(s => s.length > 10);
            uniqueMatches.forEach(term => {
                if (pairs.some(p => p.term.toLowerCase() === term.toLowerCase())) return;
                for (const s of sentences) {
                    const cleanS = s.replace(/\*\"/g, '');
                    if (s.includes(`**${term}**`) && cleanS.length > term.length + 15) {
                        pairs.push({ term, definition: cleanS });
                        break;
                    }
                }
            });
        }
        const shuffled = [...pairs].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
    },

    triggerGoldStarsExplosion(el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        for (let i = 0; i < 12; i++) {
            const star = document.createElement('div');
            star.className = 'lex-star-particle';
            star.innerText = '✨';
            star.style.left = `${centerX}px`;
            star.style.top = `${centerY}px`;
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 60;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;
            star.style.setProperty('--dx', `${destX}px`);
            star.style.setProperty('--dy', `${destY}px`);
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1000);
        }
    },

    startPomodoroAnimation() {
        const render = () => {
            if (!document.getElementById('pomodoro-tool-overlay') || !document.getElementById('pomodoro-tool-overlay').classList.contains('open')) {
                this.pomodoroAnimationId = null;
                return;
            }
            const total = this.pomodoroTotalDuration || 1500;
            const left = this.pomodoroTimeLeft !== undefined ? this.pomodoroTimeLeft : total;
            const progress = 1 - (left / total);
            const isRunning = this.pomodoroState === 'running';
            this.drawCandle(progress, isRunning);
            this.pomodoroAnimationId = requestAnimationFrame(render);
        };
        if (!this.pomodoroAnimationId) {
            this.pomodoroAnimationId = requestAnimationFrame(render);
        }
    },

    drawCandle(progress, isFlickering) {
        const canvas = document.getElementById('pomodoro-candle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const initialHeight = 140;
        const minHeight = 20;
        const currentHeight = initialHeight - (initialHeight - minHeight) * progress;
        const candleWidth = 40;
        const baseX = w / 2;
        const baseY = h - 30;
        const topY = baseY - currentHeight;
        ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(baseX, baseY, 60, 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(baseX, baseY - 5, 25, 6, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        const grad = ctx.createLinearGradient(baseX - candleWidth/2, topY, baseX + candleWidth/2, topY);
        grad.addColorStop(0, '#fbf4d9');
        grad.addColorStop(0.3, '#fffef2');
        grad.addColorStop(0.7, '#ebd8a3');
        grad.addColorStop(1, '#cca747');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(baseX - candleWidth/2, baseY);
        ctx.lineTo(baseX - candleWidth/2, topY + 5);
        ctx.quadraticCurveTo(baseX, topY, baseX + candleWidth/2, topY + 5);
        ctx.lineTo(baseX + candleWidth/2, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fbf4d9';
        ctx.beginPath();
        ctx.arc(baseX - 15, topY + 15, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(baseX - 19, topY + 5);
        ctx.quadraticCurveTo(baseX - 15, topY + 8, baseX - 11, topY + 5);
        ctx.lineTo(baseX - 11, topY + 15);
        ctx.lineTo(baseX - 19, topY + 15);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(baseX + 10, topY + 30, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(baseX + 5, topY + 5);
        ctx.lineTo(baseX + 15, topY + 5);
        ctx.lineTo(baseX + 15, topY + 30);
        ctx.lineTo(baseX + 5, topY + 30);
        ctx.fill();
        ctx.strokeStyle = '#2d2013';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(baseX, topY + 2);
        ctx.lineTo(baseX, topY - 8);
        ctx.stroke();
        if (progress < 1) {
            const flickerOffset = isFlickering ? (Math.sin(Date.now() * 0.02) * 2.5 + (Math.random() - 0.5) * 1.5) : 0;
            const flameY = topY - 8;
            const flameGrad = ctx.createRadialGradient(baseX, flameY - 15, 2, baseX, flameY - 15, 25);
            flameGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            flameGrad.addColorStop(0.2, 'rgba(253, 224, 71, 0.9)');
            flameGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.6)');
            flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
            ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
            ctx.shadowBlur = 18;
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.moveTo(baseX, flameY);
            ctx.bezierCurveTo(baseX - 12 + flickerOffset * 0.3, flameY - 10, baseX - 12 + flickerOffset, flameY - 25, baseX, flameY - 38);
            ctx.bezierCurveTo(baseX + 12 + flickerOffset, flameY - 25, baseX + 12 + flickerOffset * 0.3, flameY - 10, baseX, flameY);
            ctx.fill();
            ctx.shadowBlur = 0;
            const innerGrad = ctx.createLinearGradient(baseX, flameY, baseX, flameY - 15);
            innerGrad.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
            innerGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
            ctx.fillStyle = innerGrad;
            ctx.beginPath();
            ctx.moveTo(baseX, flameY);
            ctx.bezierCurveTo(baseX - 4, flameY - 4, baseX - 4, flameY - 12, baseX, flameY - 18);
            ctx.bezierCurveTo(baseX + 4, flameY - 18, baseX + 4, flameY - 4, baseX, flameY);
            ctx.fill();
        }
    },

    getLevelInfo(xp) {
        const levels = [
            { level: 1, name: "Novizio", icon: "📜", threshold: 0 },
            { level: 2, name: "Copista", icon: "✒️", threshold: 100 },
            { level: 3, name: "Amanuense", icon: "📖", threshold: 300 },
            { level: 4, name: "Scriba", icon: "🪶", threshold: 600 },
            { level: 5, name: "Magister", icon: "📚", threshold: 1200 },
            { level: 6, name: "Doctor", icon: "🎓", threshold: 2500 },
            { level: 7, name: "Doctor Universalis", icon: "👑", threshold: 5000 }
        ];
        let current = levels[0];
        let next = null;
        for (let i = 0; i < levels.length; i++) {
            if (xp >= levels[i].threshold) {
                current = levels[i];
                next = levels[i + 1] || null;
            } else {
                break;
            }
        }
        return { current, next };
    },

    checkLevelUp(xp) {
        const info = this.getLevelInfo(xp);
        const oldLevel = parseInt(localStorage.getItem('lex-xp-level') || '1');
        if (info.current.level > oldLevel) {
            localStorage.setItem('lex-xp-level', info.current.level.toString());
            this.showLevelUpAnimation(info.current);
        }
    },

    showLevelUpAnimation(levelInfo) {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            const playNote = (freq, delay, duration) => {
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + delay);
                gainNode.gain.setValueAtTime(0, now + delay);
                gainNode.gain.linearRampToValueAtTime(0.15, now + delay + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                osc.start(now + delay);
                osc.stop(now + delay + duration);
            };
            playNote(261.63, 0, 1.5);
            playNote(329.63, 0.15, 1.5);
            playNote(392.00, 0.3, 1.5);
            playNote(523.25, 0.45, 2.0);
        } catch(e) {}

        const overlay = document.createElement('div');
        overlay.className = 'lex-levelup-overlay';
        overlay.innerHTML = `
            <div class="lex-levelup-card">
                <div class="lex-levelup-sparkles"></div>
                <div class="lex-levelup-icon">${levelInfo.icon}</div>
                <h2 class="lex-levelup-title">Cursus Honorum</h2>
                <p class="lex-levelup-subtitle">Sei asceso di rango!</p>
                <div class="lex-levelup-rank">${levelInfo.name}</div>
                <p class="lex-levelup-desc">Nuovo rango accademico sbloccato con successo.</p>
                <button class="lex-levelup-close-btn">Prosegui gli Studi</button>
            </div>
        `;
        document.body.appendChild(overlay);

        setTimeout(() => overlay.classList.add('active'), 50);

        overlay.querySelector('.lex-levelup-close-btn').onclick = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        };
    },

    awardXP(amount) {
        try {
            let xp = parseInt(localStorage.getItem('lex-xp-total') || '0');
            xp += amount;
            localStorage.setItem('lex-xp-total', xp.toString());
            this.checkLevelUp(xp);
            this.renderXPBar();
        } catch(e) {
            console.error("Errore incremento XP:", e);
        }
    },

    injectXPBar() {
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('lex-footer-xp-bar-container')) {
                const container = document.createElement('div');
                container.id = 'lex-footer-xp-bar-container';
                container.className = 'lex-footer-xp-bar-container';
                footer.prepend(container);
                this.renderXPBar();
            }
        }, 1500);
    },

    renderXPBar() {
        const container = document.getElementById('lex-footer-xp-bar-container');
        if (!container) return;

        const xp = parseInt(localStorage.getItem('lex-xp-total') || '0');
        const info = this.getLevelInfo(xp);
        
        let nextThreshold = info.next ? info.next.threshold : info.current.threshold;
        let prevThreshold = info.current.threshold;
        let progressPercent = 100;
        
        if (info.next) {
            const range = nextThreshold - prevThreshold;
            const currentProgress = xp - prevThreshold;
            progressPercent = Math.min(100, Math.max(0, (currentProgress / range) * 100));
        }
        
        const xpRemainingText = info.next 
            ? `${xp} / ${nextThreshold} XP (Prossimo livello in ${nextThreshold - xp} XP)`
            : `${xp} XP (Rango Massimo)`;

        container.innerHTML = `
            <div class="lex-xp-bar-info">
                <span class="lex-xp-bar-rank">${info.current.icon} ${info.current.name} (Livello ${info.current.level})</span>
                <span class="lex-xp-bar-points">${xpRemainingText}</span>
            </div>
            <div class="lex-xp-bar-track">
                <div class="lex-xp-bar-fill" style="width: ${progressPercent}%"></div>
            </div>
        `;
    },

    injectFooterCodexLink() {
        setTimeout(() => {
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('lex-footer-codex-btn')) {
                const link = document.createElement('a');
                link.id = 'lex-footer-codex-btn';
                link.href = '#';
                link.className = 'lex-footer-codex-btn';
                link.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px; vertical-align:middle;">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    Codex Personalis 📖
                `;
                
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showCodexPersonalis();
                });

                const changelogBtn = document.getElementById('lex-footer-changelog-btn');
                const secretsBtn = document.getElementById('lex-footer-secrets-btn');
                const pwaBtn = document.getElementById('pwa-update-btn');
                if (changelogBtn) {
                    footer.insertBefore(link, changelogBtn);
                } else if (secretsBtn) {
                    footer.insertBefore(link, secretsBtn);
                } else if (pwaBtn) {
                    footer.insertBefore(link, pwaBtn);
                } else {
                    footer.appendChild(link);
                }
            }
        }, 1300);
    },

    showCodexPersonalis() {
        const existing = document.getElementById('codex-personalis-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'codex-personalis-modal';
        modal.className = 'lex-study-tool-overlay open';
        modal.innerHTML = `
            <div class="lex-study-tool-card" style="max-width: 650px;">
                <div class="lex-study-tool-card-header">
                    <h3 class="lex-study-tool-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        <span>Codex Personalis — Diario dello Studioso</span>
                    </h3>
                    <button class="lex-study-tool-close-btn" onclick="document.getElementById('codex-personalis-modal').remove()">&times;</button>
                </div>
                <div class="lex-study-tool-card-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; max-height: 480px; overflow-y: auto;">
                    <div class="codex-new-entry-card" style="background: rgba(212,175,55,0.03); border: 1px dashed rgba(212,175,55,0.25); padding: 12px; border-radius: 8px;">
                        <h4 style="color: #d4af37; margin-top: 0; margin-bottom: 8px; font-size: 0.85rem;">Nuova Riflessione Giornaliera</h4>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 8px;">
                            <select id="codex-subject-select" style="background:#0d1423; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 4px; border-radius: 4px; font-size: 0.75rem; flex-grow: 1;">
                                <option value="generale">Materia: Generale</option>
                                <option value="diritto">Materia: Diritto dei Beni Culturali</option>
                                <option value="arte">Materia: Storia dell'Arte</option>
                                <option value="storia">Materia: Storia Moderna</option>
                            </select>
                            <select id="codex-mood-select" style="background:#0d1423; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 4px; border-radius: 4px; font-size: 0.75rem;">
                                <option value="🔥 Concentrato">🔥 Concentrato</option>
                                <option value="📚 Produttivo">📚 Produttivo</option>
                                <option value="💤 Stanco">💤 Stanco</option>
                                <option value="💡 Ispirato">💡 Ispirato</option>
                            </select>
                        </div>
                        <textarea id="codex-entry-text" placeholder="Scrivi i tuoi progressi, difficoltà o riflessioni di oggi..." style="width: 100%; height: 60px; background: rgba(13,20,35,0.8); border: 1px solid rgba(255,255,255,0.08); color: white; padding: 6px; border-radius: 4px; font-size: 0.8rem; box-sizing: border-box; resize: none;"></textarea>
                        <button class="btn btn-primary" id="codex-save-entry-btn" style="background: #d4af37; border-color: #d4af37; color: #0d1423; font-weight: bold; width: 100%; font-size: 0.75rem; padding: 6px; margin-top: 8px;">
                            Sigilla nel Codex
                        </button>
                    </div>

                    <div id="codex-entries-list" style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;"></div>
                    
                    <div id="codex-stats-footer" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 8px; font-size: 0.7rem; color: var(--text-muted); display: flex; justify-content: space-between;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const listEl = modal.querySelector('#codex-entries-list');
        const statsEl = modal.querySelector('#codex-stats-footer');
        const saveBtn = modal.querySelector('#codex-save-entry-btn');
        const selectSubject = modal.querySelector('#codex-subject-select');
        const selectMood = modal.querySelector('#codex-mood-select');
        const entryText = modal.querySelector('#codex-entry-text');

        const renderEntries = () => {
            let entries = [];
            try {
                entries = JSON.parse(localStorage.getItem('lex-codex-personalis') || '[]');
            } catch(e){}

            if (entries.length === 0) {
                listEl.innerHTML = `
                    <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1.5rem;">
                        Il diario è vuoto. Appunta la tua prima riflessione di oggi!
                    </div>
                `;
                statsEl.innerHTML = `<span>Totale pagine: 0</span><span>Parole scritte: 0</span>`;
                return;
            }

            listEl.innerHTML = entries.map((entry, idx) => `
                <div class="codex-entry-card" style="background: rgba(13,20,35,0.95); border: 1px solid rgba(212,175,55,0.15); border-radius: 6px; padding: 12px; position: relative;">
                    <button style="position: absolute; top: 6px; right: 8px; background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.8rem;" onclick="window.deleteCodexEntry(${idx})">&times;</button>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #d4af37; margin-bottom: 6px;">
                        <span>📅 ${entry.date} (${entry.subject.toUpperCase()})</span>
                        <span>Stato: ${entry.mood}</span>
                    </div>
                    <p style="margin: 0; font-size: 0.8rem; line-height: 1.4; color: #e2e8f0; font-family: 'Playfair Display', serif; font-style: italic;">
                        “ ${entry.text} ”
                    </p>
                </div>
            `).join('');

            const totalWords = entries.reduce((acc, entry) => acc + entry.text.split(/\s+/).length, 0);
            statsEl.innerHTML = `
                <span>Totale pagine: <strong>${entries.length}</strong></span>
                <span>Parole: <strong>${totalWords}</strong></span>
            `;
        };

        window.deleteCodexEntry = (idx) => {
            let entries = [];
            try {
                entries = JSON.parse(localStorage.getItem('lex-codex-personalis') || '[]');
                entries.splice(idx, 1);
                localStorage.setItem('lex-codex-personalis', JSON.stringify(entries));
            } catch(e){}
            renderEntries();
        };

        saveBtn.onclick = () => {
            const text = entryText.value.trim();
            if (!text) {
                alert("Scrivi qualcosa prima di sigillare il Codex!");
                return;
            }

            let entries = [];
            try {
                entries = JSON.parse(localStorage.getItem('lex-codex-personalis') || '[]');
            } catch(e){}

            const todayStr = new Date().toLocaleDateString('it-IT');
            const alreadyWroteToday = entries.some(e => e.date.startsWith(todayStr));

            entries.unshift({
                date: todayStr + ' ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
                subject: selectSubject.value,
                mood: selectMood.value,
                text: text
            });

            try {
                localStorage.setItem('lex-codex-personalis', JSON.stringify(entries));
            } catch(e){}

            entryText.value = '';
            renderEntries();

            if (!alreadyWroteToday) {
                this.awardXP(5);
                this.showNotification("Codex Sigillato", "Hai aggiunto una pagina al Codex Personalis! +5 XP");
            } else {
                this.showNotification("Codex Sigillato", "Pagina aggiunta al Codex.");
            }
        };

        renderEntries();
    },

    showFeynmanOverlay(title, md) {
        const overlay = this.getSharedOverlay('feynman-tool-overlay', 'Spiega al Monaco - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');

        const sections = [];
        const regex = /^##\s+(.+)$/gm;
        let match;
        const cleanText = md.replace(/\r/g, '');
        while ((match = regex.exec(cleanText)) !== null) {
            const startIndex = match.index;
            const headingTitle = match[1].trim();
            const nextMatch = cleanText.indexOf('\n## ', startIndex + match[0].length);
            const content = nextMatch !== -1 ? cleanText.substring(startIndex, nextMatch) : cleanText.substring(startIndex);
            sections.push({ title: headingTitle, content });
        }

        if (sections.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
                    Nessuna sezione principale (##) trovata in questo capitolo per la tecnica Feynman.
                </div>
            `;
            overlay.classList.add('open');
            return;
        }

        const section = sections[Math.floor(Math.random() * sections.length)];

        const keywords = [];
        const allGlossaryTerms = Object.keys(window.glossaryDatabase || {});
        allGlossaryTerms.forEach(term => {
            const termObj = window.glossaryDatabase[term];
            if (section.content.toLowerCase().includes(termObj.term.toLowerCase()) || section.content.toLowerCase().includes(term.toLowerCase())) {
                if (!keywords.includes(termObj.term)) {
                    keywords.push(termObj.term);
                }
            }
        });

        const boldRegex = /\*\*(.*?)\*\*/g;
        let boldMatch;
        while ((boldMatch = boldRegex.exec(section.content)) !== null) {
            const word = boldMatch[1].trim();
            if (word.length > 3 && !keywords.includes(word)) {
                keywords.push(word);
            }
        }

        body.innerHTML = `
            <div class="feynman-container">
                <div class="feynman-prompt-card">
                    <div class="feynman-monk-avatar">🪶</div>
                    <div class="feynman-speech-bubble">
                        <p>Salute, studioso. Immagina di dover spiegare questo concetto a me, un semplice monaco amanuense privo di nozioni moderne:</p>
                        <h4 class="feynman-section-title">"${section.title}"</h4>
                        <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.5rem; font-style: italic;">
                            Spiegalo in modo semplice, chiaro e scorrevole. Cita i punti chiave senza gergo inutile.
                        </p>
                    </div>
                </div>
                
                <div class="feynman-input-area">
                    <textarea id="feynman-textarea" placeholder="Scrivi la tua spiegazione qui... (almeno 30 caratteri)"></textarea>
                    <button class="btn btn-primary" id="feynman-submit-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold; margin-top: 1rem; width: 100%;">
                        Invia Spiegazione al Scriptorium
                    </button>
                </div>
            </div>
        `;

        overlay.classList.add('open');

        const submitBtn = body.querySelector('#feynman-submit-btn');
        const textarea = body.querySelector('#feynman-textarea');

        submitBtn.onclick = () => {
            const userText = textarea.value.trim();
            if (userText.length < 30) {
                alert("La spiegazione è troppo breve! Sforzati di spiegare il concetto in almeno un paio di frasi compiute.");
                return;
            }

            const coveredKeywords = [];
            const missedKeywords = [];
            keywords.forEach(kw => {
                if (userText.toLowerCase().includes(kw.toLowerCase())) {
                    coveredKeywords.push(kw);
                } else {
                    missedKeywords.push(kw);
                }
            });

            let stars = 1;
            if (keywords.length > 0) {
                const ratio = coveredKeywords.length / keywords.length;
                if (ratio > 0.8) stars = 5;
                else if (ratio > 0.5) stars = 4;
                else if (ratio > 0.25) stars = 3;
                else if (ratio > 0) stars = 2;
            } else {
                stars = userText.length > 150 ? 5 : 4;
            }

            const xpAwarded = stars * 3;
            this.awardXP(xpAwarded);
            this.playAudioSuccessChime();

            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<span style="font-size: 1.8rem; color: ${i <= stars ? '#d4af37' : 'rgba(255,255,255,0.15)'};">★</span>`;
            }

            let keywordsHtml = '';
            if (coveredKeywords.length > 0) {
                keywordsHtml += `
                    <div style="margin-top: 1rem;">
                        <span style="color: #4ade80; font-weight: bold; font-size: 0.85rem;">✓ Concetti Coperti:</span>
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.3rem;">
                            ${coveredKeywords.map(k => `<span class="feynman-kw-badge covered">${k}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
            if (missedKeywords.length > 0) {
                keywordsHtml += `
                    <div style="margin-top: 1rem;">
                        <span style="color: #f87171; font-weight: bold; font-size: 0.85rem;">✗ Concetti Tralasciati:</span>
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.3rem;">
                            ${missedKeywords.map(k => `<span class="feynman-kw-badge missed">${k}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            body.innerHTML = `
                <div class="feynman-feedback-container">
                    <div class="feynman-stars-rating">${starsHtml}</div>
                    <h3 style="color: #d4af37; margin-bottom: 0.5rem; text-align: center;">Valutazione dello Scriba</h3>
                    <p style="text-align: center; font-size: 0.9rem; color: var(--text-muted);">
                        Hai spiegato il concetto guadagnando <strong>+${xpAwarded} XP</strong>!
                    </p>
                    
                    <div class="feynman-feedback-text-card">
                        <p style="font-style: italic; font-size: 0.85rem; line-height: 1.5; color: #e2e8f0;">
                            "${userText}"
                        </p>
                    </div>

                    ${keywordsHtml}

                    <div style="margin-top: 1.5rem; text-align: center;">
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
                            ${stars >= 4 
                                ? "Eccellente! Hai reso il concetto chiaro ed esaustivo, ideale per lo Scriptorium." 
                                : "Buon tentativo. Prova a includere più parole chiave per renderlo comprensibile a chiunque."}
                        </p>
                        <button class="btn btn-secondary" id="feynman-retry-btn">Spiega un Altro Concetto</button>
                    </div>
                </div>
            `;

            body.querySelector('#feynman-retry-btn').onclick = () => {
                this.showFeynmanOverlay(title, md);
            };
        };
    },

    toggleQuaesitor() {
        this.quaesitorActive = !this.quaesitorActive;
        const btn = document.getElementById('lex-btn-quaesitor');
        if (btn) {
            if (this.quaesitorActive) {
                btn.classList.add('lex-active-tool-highlight');
                this.showNotification("Il Quaesitor Attivo", "Il Quaesitor ti interrogherà periodicamente durante la lettura.");
                this.initQuaesitor();
            } else {
                btn.classList.remove('lex-active-tool-highlight');
                this.showNotification("Il Quaesitor Disattivato", "Le interruzioni di lettura sono disattivate.");
                if (this.quaesitorTimer) clearTimeout(this.quaesitorTimer);
            }
        }
    },

    initQuaesitor() {
        const scrollContainer = document.getElementById('modal-body-content');
        if (!scrollContainer) return;

        if (this.quaesitorScrollHandler) {
            scrollContainer.removeEventListener('scroll', this.quaesitorScrollHandler);
        }

        this.quaesitorLastHeading = null;
        if (this.quaesitorTimer) clearTimeout(this.quaesitorTimer);

        this.quaesitorScrollHandler = (e) => {
            if (!this.quaesitorActive) return;
            
            const headings = Array.from(document.querySelectorAll('#markdown-view h2'));
            if (headings.length === 0) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            let currentPassed = null;
            headings.forEach(h => {
                const hRect = h.getBoundingClientRect();
                if (hRect.top - containerRect.top < 80) {
                    currentPassed = h;
                }
            });

            if (currentPassed && currentPassed !== this.quaesitorLastHeading) {
                this.quaesitorLastHeading = currentPassed;
                if (this.quaesitorTimer) clearTimeout(this.quaesitorTimer);
                
                this.quaesitorTimer = setTimeout(() => {
                    this.triggerQuaesitorQuestion(currentPassed);
                }, 15000);
            }
        };

        scrollContainer.addEventListener('scroll', this.quaesitorScrollHandler);
    },

    triggerQuaesitorQuestion(heading) {
        if (!this.quaesitorActive) return;

        let sectionText = '';
        let curr = heading.nextElementSibling;
        while (curr && curr.tagName !== 'H2') {
            sectionText += ' ' + curr.innerText;
            curr = curr.nextElementSibling;
        }

        const allGlossaryTerms = Object.keys(window.glossaryDatabase || {});
        const domainTerms = allGlossaryTerms.filter(k => {
            const item = window.glossaryDatabase[k];
            return sectionText.toLowerCase().includes(item.term.toLowerCase()) || sectionText.toLowerCase().includes(k.toLowerCase());
        });

        let targetTermKey = '';
        if (domainTerms.length > 0) {
            targetTermKey = domainTerms[Math.floor(Math.random() * domainTerms.length)];
        } else {
            if (allGlossaryTerms.length > 0) {
                targetTermKey = allGlossaryTerms[Math.floor(Math.random() * allGlossaryTerms.length)];
            }
        }

        if (!targetTermKey) return;

        const termObj = window.glossaryDatabase[targetTermKey];
        const correctAnswer = termObj.definition;

        const otherDefs = Object.keys(window.glossaryDatabase)
            .filter(k => k !== targetTermKey)
            .map(k => window.glossaryDatabase[k].definition);
        otherDefs.sort(() => Math.random() - 0.5);
        const distractors = otherDefs.slice(0, 3);

        const options = [correctAnswer, ...distractors];
        options.sort(() => Math.random() - 0.5);

        const toast = document.createElement('div');
        toast.className = 'lex-quaesitor-toast';
        toast.innerHTML = `
            <div class="lex-quaesitor-toast-header">
                <span>⏱️ Quaesitor - Active Recall</span>
                <button class="lex-quaesitor-toast-close">&times;</button>
            </div>
            <div class="lex-quaesitor-toast-body">
                <p class="lex-quaesitor-question">Riguardo alla sezione appena letta, che cosa significa il termine <strong>${termObj.term}</strong>?</p>
                <div class="lex-quaesitor-options">
                    ${options.map((opt, idx) => `
                        <button class="lex-quaesitor-opt-btn" data-correct="${opt === correctAnswer}">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('visible'), 100);

        const closeToast = () => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        };

        toast.querySelector('.lex-quaesitor-toast-close').onclick = closeToast;

        const optionBtns = toast.querySelectorAll('.lex-quaesitor-opt-btn');
        optionBtns.forEach(btn => {
            btn.onclick = () => {
                const isCorrect = btn.getAttribute('data-correct') === 'true';
                optionBtns.forEach(b => {
                    const isBCorrect = b.getAttribute('data-correct') === 'true';
                    b.disabled = true;
                    if (isBCorrect) {
                        b.style.background = 'rgba(34, 197, 94, 0.2)';
                        b.style.borderColor = '#22c55e';
                        b.style.color = '#4ade80';
                    } else {
                        b.style.background = 'rgba(255, 255, 255, 0.02)';
                        b.style.borderColor = 'rgba(255,255,255,0.05)';
                        b.style.color = 'rgba(255,255,255,0.4)';
                    }
                });

                if (isCorrect) {
                    btn.style.background = '#22c55e';
                    btn.style.color = '#0d1423';
                    this.playAudioSuccessChime();
                    this.triggerGoldStarsExplosion(btn);
                    this.awardXP(5);
                    
                    const successBadge = document.createElement('div');
                    successBadge.style.color = '#4ade80';
                    successBadge.style.fontSize = '0.8rem';
                    successBadge.style.fontWeight = 'bold';
                    successBadge.style.marginTop = '0.5rem';
                    successBadge.style.textAlign = 'center';
                    successBadge.innerHTML = '🎉 Corretto! +5 XP';
                    toast.querySelector('.lex-quaesitor-toast-body').appendChild(successBadge);

                    setTimeout(closeToast, 2000);
                } else {
                    btn.style.background = 'rgba(239, 68, 68, 0.3)';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#f87171';

                    heading.classList.add('lex-quaesitor-review-highlight');

                    try {
                        const reviewKey = `lex-quaesitor-review-${this.currentSummaryPath}`;
                        const currentReview = JSON.parse(localStorage.getItem(reviewKey) || '[]');
                        if (!currentReview.includes(heading.innerText)) {
                            currentReview.push(heading.innerText);
                            localStorage.setItem(reviewKey, JSON.stringify(currentReview));
                        }
                    } catch(e){}

                    const failBadge = document.createElement('div');
                    failBadge.style.color = '#ef4444';
                    failBadge.style.fontSize = '0.8rem';
                    failBadge.style.fontWeight = 'bold';
                    failBadge.style.marginTop = '0.5rem';
                    failBadge.style.textAlign = 'center';
                    failBadge.innerHTML = '📌 Paragrafo contrassegnato da ripassare!';
                    toast.querySelector('.lex-quaesitor-toast-body').appendChild(failBadge);

                    const confirmBtn = document.createElement('button');
                    confirmBtn.className = 'btn btn-secondary';
                    confirmBtn.style.width = '100%';
                    confirmBtn.style.marginTop = '0.8rem';
                    confirmBtn.style.padding = '4px';
                    confirmBtn.style.fontSize = '0.8rem';
                    confirmBtn.innerText = 'Ho capito';
                    confirmBtn.onclick = closeToast;
                    toast.querySelector('.lex-quaesitor-toast-body').appendChild(confirmBtn);
                }
            };
        });
    },

    showCondensatoreOverlay(title, md) {
        const overlay = this.getSharedOverlay('condensatore-tool-overlay', 'Arte del Compendio - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');

        const markdownView = document.getElementById('markdown-view');
        const fullText = markdownView ? markdownView.innerText : '';
        const fullHtml = markdownView ? markdownView.innerHTML : '';

        let compendioHtml = '';
        if (markdownView) {
            const paragraphs = markdownView.querySelectorAll('p, li');
            paragraphs.forEach(p => {
                const text = p.innerText.trim();
                if (text.length > 15) {
                    const firstSentence = text.split(/[.!?]/)[0] + '.';
                    compendioHtml += `<p style="margin-bottom:0.8rem; line-height:1.4;">• ${firstSentence}</p>`;
                }
            });
            const glossarySpans = markdownView.querySelectorAll('.glossary-term');
            const uniqueTerms = new Set();
            glossarySpans.forEach(span => {
                const termAttr = span.getAttribute('data-term') || span.innerText;
                uniqueTerms.add(termAttr.toLowerCase().trim());
            });

            if (uniqueTerms.size > 0) {
                compendioHtml += `<h4 style="color:#d4af37; margin-top:1.5rem; margin-bottom:0.5rem; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom:4px;">Nodi Glossario Fondamentali</h4><ul>`;
                uniqueTerms.forEach(term => {
                    const item = window.glossaryDatabase[term];
                    if (item) {
                        compendioHtml += `<li style="font-size:0.8rem; margin-bottom:0.4rem;"><strong>${item.term}:</strong> ${item.definition}</li>`;
                    }
                });
                compendioHtml += `</ul>`;
            }
        }

        let haikuHtml = `<div class="lex-haiku-container" style="padding:1.5rem; background:rgba(212,175,55,0.02); border:1px dashed rgba(212,175,55,0.2); border-radius:8px; text-align:center; font-family:'Playfair Display', serif;">`;
        if (fullText) {
            const sentences = fullText.split(/[.!?\n]/).map(s => s.trim()).filter(s => s.length > 25);
            const sentenceScores = sentences.map(s => {
                let score = 0;
                Object.keys(window.glossaryDatabase || {}).forEach(k => {
                    if (s.toLowerCase().includes(k.toLowerCase())) {
                        score++;
                    }
                });
                return { sentence: s, score };
            });
            sentenceScores.sort((a, b) => b.score - a.score);
            const topSentences = sentenceScores.slice(0, 4);
            
            topSentences.forEach((ts, idx) => {
                haikuHtml += `<p style="font-style:italic; font-size:1rem; margin-bottom:0.8rem; color:#e2e8f0; line-height:1.5;">“ ${ts.sentence}. ”</p>`;
            });
        }
        haikuHtml += `</div>`;

        body.innerHTML = `
            <div class="condensatore-container" style="display:flex; flex-direction:column; height:100%;">
                <div class="condensatore-tabs" style="display:flex; gap:0.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:12px;">
                    <button class="condensatore-tab-btn active" data-tab="completa">Completa</button>
                    <button class="condensatore-tab-btn" data-tab="compendio">Compendio (30%)</button>
                    <button class="condensatore-tab-btn" data-tab="haiku">Haiku Accademico</button>
                </div>
                
                <div class="condensatore-content-area" style="flex-grow:1; overflow-y:auto; max-height:300px; padding-right:6px; font-size:0.85rem; line-height:1.5;">
                    <div class="condensatore-tab-content active" id="condensatore-tab-completa">${fullHtml}</div>
                    <div class="condensatore-tab-content" id="condensatore-tab-compendio" style="display:none;">${compendioHtml}</div>
                    <div class="condensatore-tab-content" id="condensatore-tab-haiku" style="display:none;">${haikuHtml}</div>
                </div>

                <div style="margin-top:12px; display:flex; gap:0.5rem;">
                    <button class="btn btn-primary" id="condensatore-copy-btn" style="flex-grow:1; background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold; font-size:0.8rem; padding:6px;">
                        Copia Testo
                    </button>
                </div>
            </div>
        `;

        overlay.classList.add('open');

        const tabBtns = body.querySelectorAll('.condensatore-tab-btn');
        const tabContents = body.querySelectorAll('.condensatore-tab-content');
        const copyBtn = body.querySelector('#condensatore-copy-btn');

        tabBtns.forEach(btn => {
            btn.onclick = () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const targetTab = btn.getAttribute('data-tab');
                tabContents.forEach(content => {
                    if (content.id === `condensatore-tab-${targetTab}`) {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            };
        });

        copyBtn.onclick = () => {
            const activeTab = body.querySelector('.condensatore-tab-btn.active').getAttribute('data-tab');
            const activeContent = body.querySelector(`#condensatore-tab-${activeTab}`);
            if (activeContent) {
                const text = activeContent.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification("Copiato!", "Il testo sintetizzato è stato copiato negli appunti.");
                });
            }
        };
    },

    showSpeedReviewOverlay(title, md) {
        const overlay = this.getSharedOverlay('speedreview-tool-overlay', 'Scriptura Veloce - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');

        const chapterTerms = [];
        const markdownView = document.getElementById('markdown-view');
        if (markdownView) {
            const glossarySpans = markdownView.querySelectorAll('.glossary-term');
            const uniqueTerms = new Set();
            glossarySpans.forEach(span => {
                const termAttr = span.getAttribute('data-term') || span.innerText;
                uniqueTerms.add(termAttr.toLowerCase().trim());
            });

            uniqueTerms.forEach(term => {
                const item = window.glossaryDatabase[term];
                if (item) {
                    chapterTerms.push(item);
                }
            });
        }

        if (chapterTerms.length < 3) {
            body.innerHTML = `
                <div style="text-align:center; padding:2rem; color:var(--text-muted);">
                    Termini insufficienti in questo capitolo per avviare la Scriptura Veloce.
                </div>
            `;
            overlay.classList.add('open');
            return;
        }

        body.innerHTML = `
            <div class="speedreview-game-container" style="text-align:center; padding:1.5rem;">
                <h3 style="color:#d4af37; margin-bottom:1rem;">Scriptura Veloce ⚡</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1.5rem;">
                    Un nastro scorrevole ti mostrerà le definizioni. Associa il termine corretto prima che scada il tempo! La velocità aumenta ogni 5 risposte corrette.
                </p>
                <button class="btn btn-primary" id="speedreview-start-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold; padding:10px 30px;">
                    Inizia la Gara
                </button>
            </div>
        `;

        overlay.classList.add('open');

        body.querySelector('#speedreview-start-btn').onclick = () => {
            this.runSpeedReviewGame(body, chapterTerms, title);
        };
    },

    runSpeedReviewGame(body, terms, title) {
        let score = 0;
        let currentIndex = 0;
        let speedMultiplier = 1;
        let correctAnswersCount = 0;
        let totalQuestions = Math.min(10, terms.length * 2);
        let startTime = Date.now();
        
        if (this.speedReviewTimer) clearInterval(this.speedReviewTimer);
        if (this.speedReviewGameTimer) clearInterval(this.speedReviewGameTimer);

        body.innerHTML = `
            <div class="speedreview-active-container" style="position:relative; height:320px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
                <div class="speedreview-stats-bar" style="display:flex; justify-content:space-between; font-size:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; margin-bottom:8px;">
                    <span>Domanda: <strong id="speed-q-index">1</strong> / ${totalQuestions}</span>
                    <span>Punteggio: <strong id="speed-score">0</strong></span>
                    <span>Velocità: <strong id="speed-multiplier">1.0x</strong></span>
                </div>
                
                <div class="speedreview-scroll-area" style="flex-grow:1; display:flex; justify-content:center; align-items:center; position:relative; perspective: 1000px;">
                    <div id="speedreview-scroll-card" class="speedreview-parchment-card">
                        <p id="speedreview-definition-text" style="font-family:'Playfair Display', serif; font-size:0.85rem; line-height:1.4; color:#0d1423; margin:0; padding:12px; font-weight:600; text-align:center;"></p>
                    </div>
                </div>

                <div class="speedreview-timer-track" style="height:4px; background:rgba(255,255,255,0.1); margin-top:8px; border-radius:2px; overflow:hidden;">
                    <div id="speedreview-timer-fill" style="height:100%; width:100%; background:#d4af37; transition: width 0.1s linear;"></div>
                </div>
                
                <div class="speedreview-options-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:6px; margin-top:12px;">
                    <button class="speed-opt-btn" id="speed-opt-0"></button>
                    <button class="speed-opt-btn" id="speed-opt-1"></button>
                    <button class="speed-opt-btn" id="speed-opt-2"></button>
                    <button class="speed-opt-btn" id="speed-opt-3"></button>
                </div>
            </div>
        `;

        const qIndexEl = body.querySelector('#speed-q-index');
        const scoreEl = body.querySelector('#speed-score');
        const multEl = body.querySelector('#speed-multiplier');
        const card = body.querySelector('#speedreview-scroll-card');
        const defText = body.querySelector('#speedreview-definition-text');
        const timerFill = body.querySelector('#speedreview-timer-fill');
        const optionBtns = [
            body.querySelector('#speed-opt-0'),
            body.querySelector('#speed-opt-1'),
            body.querySelector('#speed-opt-2'),
            body.querySelector('#speed-opt-3')
        ];

        const loadNextQuestion = () => {
            if (currentIndex >= totalQuestions) {
                endGame();
                return;
            }

            qIndexEl.innerText = currentIndex + 1;
            scoreEl.innerText = score;
            multEl.innerText = speedMultiplier.toFixed(1) + 'x';

            const correctTerm = terms[currentIndex % terms.length];
            defText.innerHTML = correctTerm.definition;

            const otherTerms = terms.filter(t => t.term !== correctTerm.term);
            otherTerms.sort(() => Math.random() - 0.5);
            const chosenDistractors = otherTerms.slice(0, 3);
            
            const gameOptions = [correctTerm, ...chosenDistractors];
            gameOptions.sort(() => Math.random() - 0.5);

            optionBtns.forEach((btn, idx) => {
                const opt = gameOptions[idx];
                btn.innerText = opt ? opt.term : "—";
                btn.disabled = false;
                btn.style.background = 'rgba(255, 255, 255, 0.03)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                btn.style.color = '#e2e8f0';
                btn.onclick = () => handleAnswer(opt === correctTerm, btn);
            });

            card.classList.remove('scrolled-in');
            void card.offsetWidth;
            card.classList.add('scrolled-in');

            const baseTime = 5000;
            const timeLimit = baseTime / speedMultiplier;
            let timeRemaining = timeLimit;

            if (this.speedReviewGameTimer) clearInterval(this.speedReviewGameTimer);
            
            this.speedReviewGameTimer = setInterval(() => {
                timeRemaining -= 100;
                const percent = Math.max(0, (timeRemaining / timeLimit) * 100);
                timerFill.style.width = percent + '%';

                if (timeRemaining <= 0) {
                    clearInterval(this.speedReviewGameTimer);
                    handleAnswer(false, null);
                }
            }, 100);
        };

        const handleAnswer = (isCorrect, clickedBtn) => {
            clearInterval(this.speedReviewGameTimer);
            optionBtns.forEach(btn => btn.disabled = true);

            if (isCorrect) {
                score += Math.round(10 * speedMultiplier);
                correctAnswersCount++;
                if (clickedBtn) {
                    clickedBtn.style.background = '#22c55e';
                    clickedBtn.style.color = '#0d1423';
                    this.triggerGoldStarsExplosion(clickedBtn);
                }
                this.playAudioSuccessChime();

                if (correctAnswersCount % 3 === 0) {
                    speedMultiplier += 0.3;
                }
            } else {
                if (clickedBtn) {
                    clickedBtn.style.background = '#ef4444';
                    clickedBtn.style.color = '#fff';
                }
                optionBtns.forEach(btn => {
                    const btnTerm = btn.innerText;
                    const correctTerm = terms[currentIndex % terms.length].term;
                    if (btnTerm === correctTerm) {
                        btn.style.background = 'rgba(34, 197, 94, 0.2)';
                        btn.style.borderColor = '#22c55e';
                        btn.style.color = '#4ade80';
                    }
                });
            }

            currentIndex++;
            setTimeout(loadNextQuestion, 1200);
        };

        const endGame = () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            const accuracy = Math.round((correctAnswersCount / totalQuestions) * 100);

            const xpAwarded = Math.min(30, Math.max(10, Math.round((score / 10) + correctAnswersCount)));
            this.awardXP(xpAwarded);

            const subject = this.inferSubject();
            const leaderboardKey = `lex-speed-review-${subject}`;
            let scores = [];
            try {
                scores = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
            } catch(e){}
            scores.push({
                score,
                accuracy,
                wpm: Math.round((totalQuestions / (timeSpent || 1)) * 60),
                date: new Date().toLocaleDateString('it-IT')
            });
            scores.sort((a,b) => b.score - a.score);
            scores = scores.slice(0, 5);
            localStorage.setItem(leaderboardKey, JSON.stringify(scores));

            body.innerHTML = `
                <div class="speedreview-results" style="text-align:center; padding:1rem;">
                    <div style="font-size:2.5rem; margin-bottom:0.5rem;">🏆</div>
                    <h3 style="color:#d4af37; margin-bottom:0.8rem;">Gara Completata!</h3>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1.5rem;">
                        Hai risposto correttamente a <strong>${correctAnswersCount}</strong> su ${totalQuestions} domande.
                    </p>
                    
                    <div style="display:flex; justify-content:space-around; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:12px; border-radius:8px; margin-bottom:1.5rem;">
                        <div>
                            <span style="display:block; font-size:0.75rem; color:var(--text-muted);">Punteggio</span>
                            <span style="font-size:1.2rem; font-weight:bold; color:#d4af37;">${score}</span>
                        </div>
                        <div>
                            <span style="display:block; font-size:0.75rem; color:var(--text-muted);">Accuratezza</span>
                            <span style="font-size:1.2rem; font-weight:bold; color:#22c55e;">${accuracy}%</span>
                        </div>
                        <div>
                            <span style="display:block; font-size:0.75rem; color:var(--text-muted);">XP Guadagnati</span>
                            <span style="font-size:1.2rem; font-weight:bold; color:#3b82f6;">+${xpAwarded}</span>
                        </div>
                    </div>

                    <h4 style="font-size:0.8rem; color:#d4af37; text-align:left; margin-bottom:0.5rem;">Classifica Locale (${subject.toUpperCase()})</h4>
                    <div style="text-align:left; font-size:0.75rem; margin-bottom:1.5rem;">
                        ${scores.map((s, idx) => `
                            <div style="display:flex; justify-content:between; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.03);">
                                <span style="width:30px;">#${idx+1}</span>
                                <span style="flex-grow:1;">Punti: <strong>${s.score}</strong> (${s.accuracy}% acc)</span>
                                <span style="color:var(--text-muted);">${s.date}</span>
                            </div>
                        `).join('')}
                    </div>

                    <button class="btn btn-primary" id="speedreview-retry-btn" style="background:#d4af37; border-color:#d4af37; color:#0d1423; font-weight:bold; padding:8px 24px;">
                        Gioca di Nuovo
                    </button>
                </div>
            `;

            body.querySelector('#speedreview-retry-btn').onclick = () => {
                this.runSpeedReviewGame(body, terms, title);
            };
        };

        loadNextQuestion();
    },

    showTrovaErroreOverlay(title, md) {
        const overlay = this.getSharedOverlay('trovaerrore-tool-overlay', 'L\'Eresiarca - ' + title, `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        `);
        const body = overlay.querySelector('.lex-study-tool-card-body');

        const markdownView = document.getElementById('markdown-view');
        if (!markdownView) {
            body.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">Sintesi non disponibile.</div>`;
            overlay.classList.add('open');
            return;
        }

        const paragraphs = Array.from(markdownView.querySelectorAll('p')).filter(p => p.innerText.trim().length > 100);
        if (paragraphs.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding:2rem; color:var(--text-muted);">
                    Testo insufficiente in questo capitolo per generare la modalità L'Eresiarca.
                </div>
            `;
            overlay.classList.add('open');
            return;
        }

        const targetPara = paragraphs[Math.floor(Math.random() * paragraphs.length)];
        const text = targetPara.innerText.trim();

        const dateRegex = /\b(\d{4})\b/g;
        const dates = [];
        let dateMatch;
        while ((dateMatch = dateRegex.exec(text)) !== null) {
            dates.push(dateMatch[1]);
        }

        const allGlossaryTerms = Object.keys(window.glossaryDatabase || {});
        const glossaryInPara = allGlossaryTerms.filter(k => {
            const item = window.glossaryDatabase[k];
            return text.toLowerCase().includes(item.term.toLowerCase()) || text.toLowerCase().includes(k.toLowerCase());
        });

        const nameRegex = /\b([A-Z][a-z]{4,})\b/g;
        const names = [];
        let nameMatch;
        while ((nameMatch = nameRegex.exec(text)) !== null) {
            const name = nameMatch[1];
            if (name !== 'Il' && name !== 'La' && name !== 'Lo' && name !== 'I' && name !== 'Nel' && name !== 'Con' && name !== 'Per' && !names.includes(name)) {
                names.push(name);
            }
        }

        const errorsToMake = [];
        if (dates.length > 0) {
            const date = dates[0];
            const swapped = date.substring(0, 1) + date.substring(2, 3) + date.substring(1, 2) + date.substring(3);
            errorsToMake.push({ type: 'date', original: date, altered: swapped });
        }
        if (glossaryInPara.length > 0) {
            const termKey = glossaryInPara[0];
            const termObj = window.glossaryDatabase[termKey];
            const otherTerms = allGlossaryTerms.filter(k => k !== termKey);
            if (otherTerms.length > 0) {
                const altKey = otherTerms[Math.floor(Math.random() * otherTerms.length)];
                errorsToMake.push({ type: 'glossary', original: termObj.term, altered: window.glossaryDatabase[altKey].term });
            }
        }
        if (names.length > 0) {
            const name = names[0];
            const otherNames = ['Teodosio', 'Giustiniano', 'Michelangelo', 'Brunelleschi', 'Canova', 'Bernini', 'Filippo Brunelleschi', 'Cesare Beccaria'].filter(n => n !== name);
            const alteredName = otherNames[Math.floor(Math.random() * otherNames.length)];
            errorsToMake.push({ type: 'name', original: name, altered: alteredName });
        }

        if (errorsToMake.length === 0) {
            errorsToMake.push({ type: 'word', original: 'studio', altered: 'esilio' });
        }

        let alteredText = text;
        errorsToMake.forEach(err => {
            const index = alteredText.indexOf(err.original);
            if (index !== -1) {
                alteredText = alteredText.substring(0, index) + `||ERR:${err.altered}:${err.original}||` + alteredText.substring(index + err.original.length);
            }
        });

        const parts = alteredText.split(/(\s+)/);
        let htmlContent = '';
        let errorCount = 0;

        parts.forEach((part) => {
            if (part.startsWith('||ERR:') && part.endsWith('||')) {
                const segments = part.substring(6, part.length - 2).split(':');
                const alteredVal = segments[0];
                const originalVal = segments[1];
                htmlContent += `<span class="errore-clickable-word altered" data-original="${originalVal}" id="err-word-${errorCount}">${alteredVal}</span>`;
                errorCount++;
            } else if (part.trim().length > 0) {
                const wordClean = part.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                const punctuation = part.substring(wordClean.length);
                htmlContent += `<span class="errore-clickable-word normal">${wordClean}</span>${punctuation}`;
            } else {
                htmlContent += part;
            }
        });

        body.innerHTML = `
            <div class="trovaerrore-container" style="display:flex; flex-direction:column; height:100%;">
                <div class="cloze-instructions" style="margin-bottom:12px;">
                    L'eresiarca ha inserito <strong>${errorCount}</strong> errori dottrinali in questo paragrafo. Clicca sulle parole errate per confutarle e rivelare la verità!
                </div>
                
                <div class="trovaerrore-text-card" style="flex-grow:1; padding:15px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); font-size:0.9rem; line-height:1.6; max-height:280px; overflow-y:auto; color:#e2e8f0; text-align:justify;">
                    ${htmlContent}
                </div>

                <div class="trovaerrore-footer" style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.8rem; color:var(--text-muted);">
                        Errori trovati: <strong id="err-found-count" style="color:#d4af37;">0</strong> / ${errorCount}
                    </span>
                    <button class="btn btn-secondary" id="err-reveal-btn" style="padding:6px 12px; font-size:0.75rem;">Rivela Errori</button>
                </div>
            </div>
        `;

        overlay.classList.add('open');

        let foundCount = 0;
        const foundCountEl = body.querySelector('#err-found-count');
        const revealBtn = body.querySelector('#err-reveal-btn');
        const wordSpans = body.querySelectorAll('.errore-clickable-word');

        wordSpans.forEach(span => {
            span.onclick = () => {
                if (span.classList.contains('clicked')) return;
                span.classList.add('clicked');

                if (span.classList.contains('altered')) {
                    span.style.background = '#22c55e';
                    span.style.color = '#0d1423';
                    const original = span.getAttribute('data-original');
                    span.innerText = `${span.innerText} (vero: ${original})`;
                    
                    foundCount++;
                    foundCountEl.innerText = foundCount;

                    this.playAudioSuccessChime();
                    this.triggerGoldStarsExplosion(span);
                    this.awardXP(5);

                    if (foundCount === errorCount) {
                        this.showNotification("Confutazione Completata!", "Hai scovato tutti gli errori dell'Eresiarca con successo!");
                    }
                } else {
                    span.style.background = 'rgba(239, 68, 68, 0.2)';
                    span.style.color = '#f87171';
                }
            };
        });

        revealBtn.onclick = () => {
            wordSpans.forEach(span => {
                if (span.classList.contains('altered') && !span.classList.contains('clicked')) {
                    span.classList.add('clicked');
                    span.style.background = 'rgba(212, 175, 55, 0.2)';
                    span.style.borderColor = '#d4af37';
                    span.style.color = '#d4af37';
                    const original = span.getAttribute('data-original');
                    span.innerText = `${span.innerText} (vero: ${original})`;
                }
            });
            revealBtn.disabled = true;
        };
    },

    showExportPackage(title, md, filePath) {
        const cards = [];
        const termDefRegex = /\*\s*\*\*([^*]+)\*\*:\s*([^\n]+)/g;
        let match;
        const cleanText = md.replace(/\r/g, '');
        while ((match = termDefRegex.exec(cleanText)) !== null) {
            cards.push({ question: match[1].trim(), answer: match[2].trim() });
        }

        const glossaryHtml = Object.keys(window.glossaryDatabase || {}).filter(k => {
            const item = window.glossaryDatabase[k];
            return md.toLowerCase().includes(item.term.toLowerCase()) || md.toLowerCase().includes(k.toLowerCase());
        }).map(k => {
            const item = window.glossaryDatabase[k];
            return `<div style="margin-bottom: 8px;"><strong>${item.term}:</strong> ${item.definition}</div>`;
        }).join('') || "Nessun termine glossario registrato per questo capitolo.";

        let notes = [];
        try {
            notes = JSON.parse(localStorage.getItem(`lex-margin-notes-${filePath}`) || '[]');
        } catch(e){}
        const notesHtml = notes.map(n => `
            <div style="background: #fef08a; border-left: 4px solid #ca8a04; padding: 8px; margin-bottom: 8px; color: #854d0e; font-size: 0.85rem; border-radius: 4px;">
                ${n.text}
            </div>
        `).join('') || "Nessuna nota salvata a margine di questo capitolo.";

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="it">
            <head>
                <meta charset="UTF-8">
                <title>Pacchetto Studio - ${title}</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        line-height: 1.6;
                        color: #1e293b;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 2rem;
                    }
                    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
                    h2 { color: #1e293b; margin-top: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                    .metadata { font-size: 0.85rem; color: #64748b; margin-bottom: 2rem; }
                    .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
                    .card { border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; background: #f8fafc; }
                    .print-btn { background: #0f172a; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer; margin-bottom: 2rem; }
                    @media print {
                        .print-btn { display: none; }
                    }
                </style>
            </head>
            <body>
                <button class="print-btn" onclick="window.print()">Stampa / Esporta PDF</button>
                <h1>Lex Studiorum - Pacchetto Studio</h1>
                <div class="metadata">Generato il: ${new Date().toLocaleDateString('it-IT')} | Capitolo: ${title}</div>
                
                <h2>1. Sintesi Completa</h2>
                <div style="text-align: justify;">
                    ${this.renderMarkdownToHtml(md)}
                </div>

                <h2>2. Mazzo di Flashcards</h2>
                <div class="card-grid">
                    ${cards.map(c => `
                        <div class="card">
                            <strong>D:</strong> ${c.question}<br>
                            <strong>R:</strong> ${c.answer}
                        </div>
                    `).join('') || "<div style='grid-column: span 2;'>Nessuna flashcard generata per questo capitolo.</div>"}
                </div>

                <h2>3. Glossario del Capitolo</h2>
                <div>${glossaryHtml}</div>

                <h2>4. Note a Margine</h2>
                <div>${notesHtml}</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        
        this.awardXP(5);
        this.showNotification("Pacchetto Generato", "Il documento stampabile è stato aperto in una nuova scheda. +5 XP!");
    },
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LexCore.init());
} else {
    LexCore.init();
}
