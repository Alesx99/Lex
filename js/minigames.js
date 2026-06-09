/**
 * LEX MINIGAMES ENGINE v3
 * High interactivity, timers, combos, Hangman, and fixed modal UI.
 */

const Minigames = {
    points: parseInt(localStorage.getItem('lex-total-points')) || 0,
    activeTimer: null,
    timeRemaining: 0,
    comboMultiplier: 1,
    currentQuestionIndex: 0,
    scoreAccumulator: 0,
    currentPool: [],

    // Hangman state
    hangmanWord: '',
    hangmanGuessed: [],
    hangmanMistakes: 0,
    hangmanMaxMistakes: 5,

    init() {
        this.updatePointsUI();
        console.log("Minigames Engine v3 Ready");
    },

    updatePointsUI() {
        const el = document.getElementById('lex-points-total');
        if (el) el.textContent = this.points;
        localStorage.setItem('lex-total-points', this.points);
    },

    addPoints(val) {
        this.points += val;
        this.updatePointsUI();
    },

    // --- GAME MAPPING ---
    games: {
        'chronos': {
            title: "Chronos Lex",
            start: () => Minigames.startChronos()
        },
        'dilemma': {
            title: "Il Dilemma del Curatore",
            start: () => Minigames.startDilemma()
        },
        'treasure': {
            title: "Caccia al Tesoro",
            start: () => Minigames.startTreasure()
        },
        'fact-fiction': {
            title: "Sentenza o Bufala?",
            start: () => Minigames.startFactFiction()
        },
        'memory': {
            title: "Memory dell'Amore",
            start: () => Minigames.startMemory()
        }
    },

    // --- TIMERS & UTILS ---
    startTimer(seconds, onTimeout) {
        clearInterval(this.activeTimer);
        this.timeRemaining = seconds;
        this.updateTimerUI();

        this.activeTimer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerUI();
            if (this.timeRemaining <= 0) {
                clearInterval(this.activeTimer);
                onTimeout();
            }
        }, 1000);
    },

    stopTimer() {
        clearInterval(this.activeTimer);
    },

    updateTimerUI() {
        const tUI = document.getElementById('game-timer-bar');
        const tText = document.getElementById('game-timer-text');
        if (tUI && tText) {
            // Assume initial time was stored in data attr or we just calc percentage based on known max
            const max = tUI.getAttribute('data-max') || 15;
            const pct = (this.timeRemaining / max) * 100;
            tUI.style.width = `${pct}%`;
            tText.textContent = `${this.timeRemaining}s`;
            
            if (this.timeRemaining <= 3) {
                tUI.style.background = '#ef4444';
                tText.style.color = '#ef4444';
            } else {
                tUI.style.background = 'var(--accent-gold)';
                tText.style.color = 'var(--text-primary)';
            }
        }
    },

    getTimerHTML(maxSeconds) {
        return `
            <div style="margin-bottom: 1rem; width: 100%;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.3rem;">
                    <span>TEMPO</span>
                    <span id="game-timer-text">${maxSeconds}s</span>
                </div>
                <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div id="game-timer-bar" data-max="${maxSeconds}" style="width: 100%; height: 100%; background: var(--accent-gold); transition: width 1s linear, background 0.3s;"></div>
                </div>
            </div>
        `;
    },

    // --- CHRONOS LEX ---
    startChronos() {
        const pool = [
            { year: 1909, text: "Legge Rosadi" },
            { year: 1939, text: "Leggi Bottai" },
            { year: 1948, text: "Costituzione (Art. 9)" },
            { year: 1975, text: "Istituzione Ministero" },
            { year: 1999, text: "Testo Unico Beni Culturali" },
            { year: 2004, text: "Codice Urbani" },
            { year: 2014, text: "Riforma Franceschini" },
            { year: 1820, text: "Editto Doria" },
            { year: 1902, text: "Editto Pacca" }
        ];
        
        const selected = pool.sort(() => Math.random() - 0.5).slice(0, 5);
        this.currentPool = [...selected].sort(() => Math.random() - 0.5);

        const html = `
            ${this.getTimerHTML(45)}
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1rem;">Trascina per ordinare dal più antico al più recente.</p>
            <div id="timeline-list" class="timeline-list">
                ${this.currentPool.map(e => `
                    <div class="timeline-item" draggable="true" data-year="${e.year}">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span class="drag-handle" style="font-size: 1.2rem;">☰</span>
                            <span style="font-weight: 500;">${e.text}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn-action btn-action-primary" style="width: 100%; margin-top: 1.5rem;" onclick="Minigames.checkChronos()">Verifica Linea Temporale</button>
        `;
        
        document.getElementById('game-content').innerHTML = html;
        setupDragAndDrop();
        this.startTimer(45, () => this.showResult(false, "Tempo Scaduto!", 0));
    },

    checkChronos() {
        this.stopTimer();
        const items = Array.from(document.querySelectorAll('.timeline-item'));
        const years = items.map(item => parseInt(item.getAttribute('data-year')));
        const isSorted = years.every((v, i, a) => !i || a[i-1] <= v);

        if (isSorted) {
            const timeBonus = Math.floor(this.timeRemaining / 2);
            const totalPts = 20 + timeBonus;
            this.showResult(true, `Cronologia Perfetta!`, totalPts);
            this.unlockAchievement('time_lord');
        } else {
            this.showResult(false, `Paradosso Temporale! Ordine Errato`, 0);
        }
    },

    // --- IL DILEMMA DEL CURATORE ---
    startDilemma() {
        this.currentPool = [
            {
                text: "Durante uno scavo per la fibra ottica, una ditta trova un'anfora romana. Cosa dice il Codice?",
                options: [
                    "La ditta può tenerla se è in un terreno privato.",
                    "Fermare i lavori, denunciare entro 24h e conservare il reperto.",
                    "Il sindaco deve decidere se il reperto è di interesse culturale."
                ],
                correct: 1
            },
            {
                text: "Un antiquario vuole vendere all'estero un quadro del 1850 di autore ignoto.",
                options: [
                    "Nessun vincolo, l'autore è ignoto.",
                    "Serve sempre l'attestato di libera circolazione se supera i 13.500€.",
                    "Serve sempre e comunque per ogni opera con più di 70 anni."
                ],
                correct: 1
            },
            {
                text: "Vuoi restaurare la facciata del tuo palazzo notificato del '600.",
                options: [
                    "Basta l'autorizzazione del Comune (SCIA).",
                    "Serve l'autorizzazione preventiva della Soprintendenza.",
                    "I privati non possono restaurare beni vincolati, deve farlo lo Stato."
                ],
                correct: 1
            }
        ].sort(() => Math.random() - 0.5);

        this.currentQuestionIndex = 0;
        this.scoreAccumulator = 0;
        this.comboMultiplier = 1;
        this.renderNextDilemma();
    },

    renderNextDilemma() {
        if (this.currentQuestionIndex >= this.currentPool.length) {
            this.showResult(true, "Dilemmi Risolti!", this.scoreAccumulator);
            this.unlockAchievement('curator_master');
            return;
        }

        const s = this.currentPool[this.currentQuestionIndex];
        const html = `
            ${this.getTimerHTML(15)}
            <div style="display:flex; justify-content:space-between; color:var(--accent-gold); font-weight:700; margin-bottom:1rem;">
                <span>Caso ${this.currentQuestionIndex + 1} di ${this.currentPool.length}</span>
                <span>Combo: x${this.comboMultiplier}</span>
            </div>
            <div class="game-prompt-card" style="margin-bottom: 1.5rem;">
                <p>${s.text}</p>
            </div>
            <div class="game-options-grid">
                ${s.options.map((opt, i) => `
                    <button class="game-option-btn" onclick="Minigames.answerDilemma(${i})">
                        <span class="opt-index">${String.fromCharCode(65 + i)}</span>
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
        this.startTimer(15, () => this.answerDilemma(-1)); // -1 means timeout
    },

    answerDilemma(idx) {
        this.stopTimer();
        const s = this.currentPool[this.currentQuestionIndex];
        
        if (idx === s.correct) {
            const basePts = 10;
            this.scoreAccumulator += (basePts * this.comboMultiplier);
            this.comboMultiplier++;
            this.currentQuestionIndex++;
            this.renderNextDilemma();
        } else {
            // Wrong answer ends the run
            this.showResult(false, idx === -1 ? "Tempo Scaduto!" : "Decisione Fatale!", this.scoreAccumulator);
            // Give partial points if they got some right
            if (this.scoreAccumulator > 0) {
                this.addPoints(this.scoreAccumulator);
            }
        }
    },

    // --- CACCIA AL TESORO (Hangman Style) ---
    startTreasure() {
        const pool = [
            { prompt: "Facoltà dello Stato di acquistare il bene allo stesso prezzo stabilito in un atto di compravendita tra privati.", answer: "PRELAZIONE" },
            { prompt: "Atto con cui si dichiara l'interesse culturale di un bene di proprietà privata.", answer: "NOTIFICA" },
            { prompt: "Rimozione di un bene pubblico dal regime del demanio per permetterne l'alienazione.", answer: "SDEMANIALIZZAZIONE" },
            { prompt: "Il divieto di costruire o modificare un'area per proteggere una prospettiva o la luce di un monumento.", answer: "VINCOLO" }
        ];
        const t = pool[Math.floor(Math.random() * pool.length)];
        
        this.hangmanWord = t.answer;
        this.hangmanGuessed = [];
        this.hangmanMistakes = 0;
        
        this.renderHangman(t.prompt);
    },

    renderHangman(prompt) {
        // Build word display
        const displayWord = this.hangmanWord.split('').map(char => {
            if (char === ' ') return '&nbsp;&nbsp;';
            return this.hangmanGuessed.includes(char) ? char : '_';
        }).join(' ');

        // Keyboard
        const alphabet = "ABCDEFGHILMNOPQRSTUVZ".split('');
        const kbHTML = alphabet.map(letter => {
            const isGuessed = this.hangmanGuessed.includes(letter);
            const isWrong = isGuessed && !this.hangmanWord.includes(letter);
            const isRight = isGuessed && this.hangmanWord.includes(letter);
            let btnClass = 'hangman-key';
            if (isWrong) btnClass += ' wrong';
            if (isRight) btnClass += ' right';
            
            return `<button class="${btnClass}" ${isGuessed ? 'disabled' : ''} onclick="Minigames.guessLetter('${letter}', '${prompt.replace(/'/g, "\\'")}')">${letter}</button>`;
        }).join('');

        const html = `
            <div class="game-prompt-card" style="margin-bottom: 1.5rem; font-style: italic;">
                "${prompt}"
            </div>
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 2.5rem; font-family: monospace; letter-spacing: 0.2em; font-weight: 700; color: var(--accent-gold); margin-bottom: 1rem;">
                    ${displayWord}
                </div>
                <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">
                    Errori: ${this.hangmanMistakes} / ${this.hangmanMaxMistakes}
                </div>
            </div>
            <div class="hangman-keyboard">
                ${kbHTML}
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
        
        // Add specific hangman CSS if not present
        if (!document.getElementById('hangman-css')) {
            const style = document.createElement('style');
            style.id = 'hangman-css';
            style.innerHTML = `
                .hangman-keyboard { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
                .hangman-key { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: white; border-radius: 8px; width: 40px; height: 40px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .hangman-key:hover:not(:disabled) { background: var(--accent-gold); color: black; }
                .hangman-key.wrong { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; opacity: 0.5; }
                .hangman-key.right { background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #10b981; }
            `;
            document.head.appendChild(style);
        }

        this.checkHangmanWin();
    },

    guessLetter(letter, prompt) {
        if (this.hangmanGuessed.includes(letter)) return;
        this.hangmanGuessed.push(letter);

        if (!this.hangmanWord.includes(letter)) {
            this.hangmanMistakes++;
            if (typeof playChime !== 'undefined') playChime(false);
        } else {
            // Little tick sound for correct letter (optional)
        }

        if (this.hangmanMistakes >= this.hangmanMaxMistakes) {
            this.showResult(false, `Impiccato! Era: ${this.hangmanWord}`, 0);
        } else {
            this.renderHangman(prompt);
        }
    },

    checkHangmanWin() {
        const isWin = this.hangmanWord.replace(/ /g, '').split('').every(char => this.hangmanGuessed.includes(char));
        if (isWin) {
            this.showResult(true, "Tesoro Dissotterrato!", 25);
            this.unlockAchievement('treasure_hunter');
        }
    },

    // --- SENTENZA O BUFALA (Rapid Fire) ---
    startFactFiction() {
        this.currentPool = [
            { text: "L'Articolo 9 della Costituzione tutela anche l'ambiente e la biodiversità dal 2022.", correct: true },
            { text: "Le cose immobili pubbliche con più di 70 anni sono protette automaticamente (ope legis).", correct: true },
            { text: "Il proprietario di un bene notificato può distruggerlo liberamente.", correct: false },
            { text: "L'esportazione definitiva di beni culturali è sempre vietata.", correct: false },
            { text: "L'Art Bonus è un credito d'imposta del 65% per erogazioni liberali a sostegno della cultura.", correct: true },
            { text: "Le Regioni possono legiferare sulla tutela dei beni culturali indipendentemente dallo Stato.", correct: false }
        ].sort(() => Math.random() - 0.5).slice(0, 5); // 5 facts streak

        this.currentQuestionIndex = 0;
        this.scoreAccumulator = 0;
        this.renderNextFact();
    },

    renderNextFact() {
        if (this.currentQuestionIndex >= this.currentPool.length) {
            this.showResult(true, "Debunker Infallibile!", this.scoreAccumulator + 10); // +10 bonus for completing
            this.unlockAchievement('fact_checker');
            return;
        }

        const f = this.currentPool[this.currentQuestionIndex];
        const html = `
            ${this.getTimerHTML(8)}
            <div style="text-align: center; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
                Fatto ${this.currentQuestionIndex + 1} di 5
            </div>
            <div class="game-prompt-card" style="font-size: 1.4rem; padding: 3rem; margin-bottom: 2rem; border-color: var(--accent-gold); box-shadow: 0 0 20px rgba(212,175,55,0.1);">
                "${f.text}"
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%;">
                <button class="btn-action" style="background: var(--accent-green); height: 80px; font-size: 1.2rem; font-weight: 700; border-radius: 16px;" onclick="Minigames.answerFact(${true})">VERO</button>
                <button class="btn-action" style="background: var(--accent-romana); height: 80px; font-size: 1.2rem; font-weight: 700; border-radius: 16px;" onclick="Minigames.answerFact(${false})">FALSO</button>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
        this.startTimer(8, () => this.answerFact(null)); // null means timeout
    },

    answerFact(guess) {
        this.stopTimer();
        const f = this.currentPool[this.currentQuestionIndex];
        
        if (guess === f.correct) {
            this.scoreAccumulator += 5;
            this.currentQuestionIndex++;
            this.renderNextFact();
        } else {
            this.showResult(false, guess === null ? "Troppo Lento!" : "Bufala Inghiottita!", this.scoreAccumulator);
            if (this.scoreAccumulator > 0) this.addPoints(this.scoreAccumulator);
        }
    },

    // --- MEMORY ---
    startMemory() {
        const html = `
            <div id="lex-memory-game-wrapper" style="width: 100%;">
                <div id="lex-memory-intro">
                    <p style="margin-bottom: 2rem; text-align: center; color: var(--text-secondary);">Allena la memoria visiva. Trova tutte le coppie il più velocemente possibile.</p>
                    <button id="lex-start-memory-btn" class="btn-action btn-action-primary" style="width: 100%; height: 60px; font-size: 1.1rem;" onclick="Minigames.initMemory()">Avvia Memory 🎮</button>
                </div>
                <div id="lex-memory-board" style="display: none;">
                    <div class="memory-stats" style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-weight: 700; color: var(--accent-gold); background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px;">
                        <span>MOSSE: <span id="memory-moves">0</span></span>
                        <span>MATCH: <span id="memory-matches">0</span> / 8</span>
                    </div>
                    <div class="lex-memory-grid"></div>
                </div>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
    },

    initMemory() {
        document.getElementById('lex-memory-intro').style.display = 'none';
        document.getElementById('lex-memory-board').style.display = 'block';
        
        if (typeof LexCore !== 'undefined' && LexCore.startMemoryGame) {
            const originalVictory = LexCore.startMemoryGame;
            LexCore.startMemoryGame = function() {
                originalVictory.apply(LexCore);
                
                const checkVictory = setInterval(() => {
                    const matches = document.getElementById('memory-matches');
                    if (matches && matches.textContent === '8') {
                        clearInterval(checkVictory);
                        // Using a small timeout to let the card flip animation finish
                        setTimeout(() => Minigames.showResult(true, "Memoria di Ferro!", 15), 800);
                    }
                }, 1000);
            };
            LexCore.startMemoryGame();
        }
    },

    // --- RESULT & UTILS ---
    showResult(success, title, pts) {
        this.stopTimer();
        const container = document.getElementById('game-result-container');
        const icon = document.getElementById('res-icon');
        const resTitle = document.getElementById('res-title');
        const resPoints = document.getElementById('res-points');

        icon.textContent = success ? "🏆" : "💥";
        resTitle.textContent = title;
        resTitle.style.color = success ? "var(--accent-gold)" : "#ef4444";
        resPoints.textContent = pts > 0 ? `+${pts} Lex Points` : "0 Lex Points";
        
        container.classList.remove('hidden');
        
        if (pts > 0) {
            this.addPoints(pts);
        }

        if (success) {
            if (typeof playChime !== 'undefined') playChime(true);
            this.triggerConfetti();
        } else {
            if (typeof playChime !== 'undefined') playChime(false);
            // Slight shake effect on modal
            const box = document.querySelector('.game-modal');
            if (box) {
                box.style.animation = 'none';
                void box.offsetWidth; // trigger reflow
                box.style.animation = 'shake 0.4s ease-in-out';
            }
        }
    },

    unlockAchievement(id) {
        let achievements = JSON.parse(localStorage.getItem('lex-minigame-achievements')) || {};
        achievements[id] = true;
        localStorage.setItem('lex-minigame-achievements', JSON.stringify(achievements));
        
        if (typeof LexCore !== 'undefined' && LexCore.showToast) {
            LexCore.showToast(`🏆 Traguardo Sbloccato!`, 'success');
        }
    },

    triggerConfetti() {
        const container = document.getElementById('game-particles');
        if (!container) return;

        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = '8px';
            p.style.height = '8px';
            p.style.background = ['#d4af37', '#c85a32', '#10b981', '#3b82f6', '#fff'][Math.floor(Math.random()*5)];
            p.style.left = '50%';
            p.style.top = '50%';
            p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * 300;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 150;

            p.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 800,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => p.remove();
        }
    }
};

// Global Functions for UI
window.openGame = function(gameId) {
    const game = Minigames.games[gameId];
    if (!game) return;

    document.getElementById('game-result-container').classList.add('hidden');
    document.getElementById('game-title').textContent = game.title;
    
    // Open modal first
    document.getElementById('game-modal-overlay').classList.add('open');
    
    // Start game logic
    game.start();
};

window.closeGameModal = function() {
    Minigames.stopTimer();
    document.getElementById('game-modal-overlay').classList.remove('open');
};

// Expose Minigames globally
window.Minigames = Minigames;

// Setup drag and drop for Chronos
function setupDragAndDrop() {
    const list = document.getElementById('timeline-list');
    if (!list) return;
    let draggedItem = null;

    // --- MOUSE EVENTS ---
    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target.closest('.timeline-item');
        if (draggedItem) {
            e.dataTransfer.effectAllowed = 'move';
            draggedItem.style.opacity = '0.4';
            draggedItem.style.transform = 'scale(0.98)';
        }
    });

    list.addEventListener('dragend', (e) => {
        if (draggedItem) {
            draggedItem.style.opacity = '1';
            draggedItem.style.transform = 'scale(1)';
        }
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    list.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target.closest('.timeline-item');
        if (target && target !== draggedItem) {
            const rect = target.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            list.insertBefore(draggedItem, next ? target.nextSibling : target);
        }
    });

    // --- TOUCH EVENTS ---
    list.addEventListener('touchstart', (e) => {
        const target = e.target.closest('.timeline-item');
        if (target) {
            draggedItem = target;
            draggedItem.style.opacity = '0.5';
            draggedItem.style.background = 'rgba(212, 175, 55, 0.2)';
            e.preventDefault();
        }
    }, { passive: false });

    list.addEventListener('touchmove', (e) => {
        if (!draggedItem) return;
        e.preventDefault();

        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        const itemUnderTouch = target ? target.closest('.timeline-item') : null;

        if (itemUnderTouch && itemUnderTouch !== draggedItem) {
            const rect = itemUnderTouch.getBoundingClientRect();
            const next = (touch.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            list.insertBefore(draggedItem, next ? itemUnderTouch.nextSibling : itemUnderTouch);
        }
    }, { passive: false });

    list.addEventListener('touchend', (e) => {
        if (draggedItem) {
            draggedItem.style.opacity = '1';
            draggedItem.style.background = '';
            draggedItem = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => Minigames.init());