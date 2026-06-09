/**
 * LEX MINIGAMES ENGINE v2
 * Enhanced interactivity, point system, and popup UI.
 */

const Minigames = {
    points: parseInt(localStorage.getItem('lex-total-points')) || 0,
    currentLevel: 1,

    init() {
        this.updatePointsUI();
        console.log("Minigames Engine v2 Ready");
    },

    updatePointsUI() {
        const el = document.getElementById('lex-points-total');
        if (el) el.textContent = this.points;
        localStorage.setItem('lex-total-points', this.points);
    },

    addPoints(val) {
        this.points += val;
        this.updatePointsUI();
        this.triggerConfetti();
    },

    // --- GAME MAPPING ---
    games: {
        'chronos': {
            title: "Chronos Lex",
            render: () => Minigames.renderChronos()
        },
        'dilemma': {
            title: "Il Dilemma del Curatore",
            render: () => Minigames.renderDilemma()
        },
        'treasure': {
            title: "Caccia al Tesoro",
            render: () => Minigames.renderTreasure()
        },
        'fact-fiction': {
            title: "Sentenza o Bufala?",
            render: () => Minigames.renderFactFiction()
        },
        'memory': {
            title: "Memory dell'Amore",
            render: () => Minigames.renderMemory()
        }
    },

    // --- RENDERERS ---

    renderChronos() {
        const pool = [
            { id: 1, year: 1909, text: "Legge Rosadi (n. 364)" },
            { id: 2, year: 1939, text: "Leggi Bottai (n. 1089 e 1497)" },
            { id: 3, year: 1948, text: "Costituzione Italiana (Art. 9)" },
            { id: 4, year: 1975, text: "Istituzione Ministero (Spadolini)" },
            { id: 5, year: 1999, text: "Testo Unico dei Beni Culturali" },
            { id: 6, year: 2004, text: "Codice Urbani (D.Lgs. 42/2004)" },
            { id: 7, year: 2014, text: "Riforma Franceschini (Art Bonus)" }
        ];
        
        // Pick 5 random events
        const selected = pool.sort(() => Math.random() - 0.5).slice(0, 5);
        const shuffled = [...selected].sort(() => Math.random() - 0.5);

        return `
            <p style="text-align: center; color: var(--text-secondary);">Trascina gli elementi per ordinarli cronologicamente dal più antico al più recente.</p>
            <div id="timeline-list" class="timeline-list">
                ${shuffled.map(e => `
                    <div class="timeline-item" draggable="true" data-year="${e.year}">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span class="drag-handle">☰</span>
                            <span>${e.text}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn-action btn-action-primary" style="width: 100%;" onclick="Minigames.checkChronos()">Conferma Ordine</button>
        `;
    },

    renderDilemma() {
        const pool = [
            {
                text: "Un privato trova un tesoretto di monete d'oro nel proprio giardino mentre scava per una piscina. A chi appartengono?",
                options: [
                    "Interamente al proprietario del terreno.",
                    "Appartengono allo Stato (Demanio), al proprietario spetta un premio.",
                    "Metà al proprietario e metà allo scopritore fortuito."
                ],
                correct: 1,
                points: 20
            },
            {
                text: "Un antiquario vuole vendere all'estero un quadro del 1850 di autore ignoto. È necessaria l'autorizzazione?",
                options: [
                    "No, se l'autore è ignoto non c'è tutela.",
                    "Sì, se il valore supera i 13.500€ serve l'attestato di libera circolazione.",
                    "Sì, sempre e comunque per ogni opera con più di 70 anni."
                ],
                correct: 1,
                points: 20
            }
        ];
        const s = pool[Math.floor(Math.random() * pool.length)];
        return `
            <div class="game-prompt-card">
                <p>${s.text}</p>
            </div>
            <div class="game-options-grid">
                ${s.options.map((opt, i) => `
                    <button class="game-option-btn" onclick="Minigames.handleAnswer(${i}, ${s.correct}, ${s.points}, 'curator_master')">
                        <span class="opt-index">${String.fromCharCode(65 + i)}</span>
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>
        `;
    },

    renderTreasure() {
        const pool = [
            { prompt: "È la facoltà dello Stato di acquistare il bene al medesimo prezzo stabilito nell'atto di alienazione.", answer: "prelazione", points: 15 },
            { prompt: "L'atto amministrativo con cui lo Stato dichiara l'interesse culturale di un bene privato.", answer: "notifica", points: 15 },
            { prompt: "Organo periferico del Ministero incaricato della tutela sul territorio.", answer: "soprintendenza", points: 15 }
        ];
        const t = pool[Math.floor(Math.random() * pool.length)];
        return `
            <div class="game-prompt-card">
                <p>"${t.prompt}"</p>
            </div>
            <div style="width: 100%;">
                <input type="text" id="treasure-input" class="form-input" style="width: 100%; text-align: center; font-size: 1.2rem; padding: 1rem; margin-bottom: 1rem;" placeholder="Scrivi la risposta...">
                <button class="btn-action btn-action-primary" style="width: 100%;" onclick="Minigames.checkTreasure('${t.answer}', ${t.points})">Verifica Risposta</button>
            </div>
        `;
    },

    renderFactFiction() {
        const pool = [
            { text: "L'Articolo 9 della Costituzione tutela anche l'ambiente e la biodiversità dal 2022.", correct: true },
            { text: "Le cose immobili di proprietà pubblica con più di 70 anni sono protette automaticamente (ope legis).", correct: true },
            { text: "Il proprietario di un bene notificato può distruggerlo se non riceve contributi dallo Stato.", correct: false },
            { text: "L'esportazione definitiva di beni culturali è sempre vietata, senza eccezioni.", correct: false }
        ];
        const f = pool[Math.floor(Math.random() * pool.length)];
        return `
            <div class="game-prompt-card" style="font-size: 1.3rem; padding: 3rem;">
                "${f.text}"
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%;">
                <button class="btn-action" style="background: var(--accent-green); height: 80px; font-size: 1.2rem;" onclick="Minigames.handleFact(${true}, ${f.correct})">VERO</button>
                <button class="btn-action" style="background: var(--accent-romana); height: 80px; font-size: 1.2rem;" onclick="Minigames.handleFact(${false}, ${f.correct})">FALSO</button>
            </div>
        `;
    },

    renderMemory() {
        return `
            <div id="lex-memory-game-wrapper" style="width: 100%;">
                <div id="lex-memory-intro">
                    <p style="margin-bottom: 2rem;">Trova le coppie di simboli accademici e sblocca coupon speciali.</p>
                    <button id="lex-start-memory-btn" class="btn-action btn-action-primary" style="width: 100%;" onclick="Minigames.initMemory()">Inizia Partita 🎮</button>
                </div>
                <div id="lex-memory-board" style="display: none;">
                    <div class="memory-stats" style="display: flex; justify-content: space-around; margin-bottom: 1rem; font-weight: 700; color: var(--accent-gold);">
                        <span>MOSSE: <span id="memory-moves">0</span></span>
                        <span>MATCH: <span id="memory-matches">0</span> / 8</span>
                    </div>
                    <div class="lex-memory-grid"></div>
                </div>
            </div>
        `;
    },

    // --- LOGIC ---

    handleAnswer(idx, correct, pts, achievementId) {
        if (idx === correct) {
            this.showResult(true, `Risposta Esatta!`, pts);
            this.unlockAchievement(achievementId);
        } else {
            this.showResult(false, `Risposta Errata`, 0);
        }
    },

    handleFact(guess, correct) {
        if (guess === correct) {
            this.showResult(true, `Corretto!`, 5);
            this.unlockAchievement('fact_checker');
        } else {
            this.showResult(false, `Peccato, era ${correct ? 'vero' : 'falso'}.`, 0);
        }
    },

    checkChronos() {
        const items = Array.from(document.querySelectorAll('.timeline-item'));
        const years = items.map(item => parseInt(item.getAttribute('data-year')));
        const isSorted = years.every((v, i, a) => !i || a[i-1] <= v);

        if (isSorted) {
            this.showResult(true, `Cronologia Perfetta!`, 15);
            this.unlockAchievement('time_lord');
        } else {
            this.showResult(false, `Ordine Errato`, 0);
        }
    },

    checkTreasure(correct, pts) {
        const val = document.getElementById('treasure-input').value.toLowerCase().trim();
        if (val === correct || (correct === 'prelazione' && val.includes('prelazione'))) {
            this.showResult(true, `Tesoro Trovato!`, pts);
            this.unlockAchievement('treasure_hunter');
        } else {
            this.showResult(false, `Non è la parola giusta`, 0);
        }
    },

    showResult(success, title, pts) {
        const container = document.getElementById('game-result-container');
        const icon = document.getElementById('res-icon');
        const resTitle = document.getElementById('res-title');
        const resPoints = document.getElementById('res-points');

        icon.textContent = success ? "🏆" : "❌";
        resTitle.textContent = title;
        resTitle.style.color = success ? "var(--accent-gold)" : "#ef4444";
        resPoints.textContent = success ? `+${pts} Lex Points` : "0 Lex Points";
        
        container.classList.remove('hidden');
        
        if (success) {
            this.addPoints(pts);
            if (typeof playChime !== 'undefined') playChime(true);
        } else {
            if (typeof playChime !== 'undefined') playChime(false);
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

    initMemory() {
        document.getElementById('lex-memory-intro').style.display = 'none';
        document.getElementById('lex-memory-board').style.display = 'block';
        
        // Inject points logic into memory victory
        const originalVictory = LexCore.startMemoryGame;
        LexCore.startMemoryGame = function() {
            // Setup cards and listeners...
            // Need to wrap the victory condition to add points
            // For now, we'll just use the existing LexCore.startMemoryGame but track the end
            originalVictory.apply(LexCore);
            
            // Watch for victory
            const checkVictory = setInterval(() => {
                const matches = document.getElementById('memory-matches');
                if (matches && matches.textContent === '8') {
                    clearInterval(checkVictory);
                    Minigames.addPoints(10);
                }
            }, 1000);
        };
        LexCore.startMemoryGame();
    },

    triggerConfetti() {
        const container = document.getElementById('game-particles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = '8px';
            p.style.height = '8px';
            p.style.background = ['#d4af37', '#c85a32', '#10b981', '#3b82f6'][Math.floor(Math.random()*4)];
            p.style.left = '50%';
            p.style.top = '50%';
            p.style.borderRadius = '50%';
            container.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * 200;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 100;

            p.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
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
    document.getElementById('game-content').innerHTML = game.render();
    document.getElementById('game-modal-overlay').classList.add('open');

    if (gameId === 'chronos') {
        setupDragAndDrop();
    }
};

window.closeGameModal = function() {
    document.getElementById('game-modal-overlay').classList.remove('open');
};

function setupDragAndDrop() {
    const list = document.getElementById('timeline-list');
    let draggedItem = null;

    // --- MOUSE EVENTS ---
    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.5';
    });

    list.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
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

    // --- TOUCH EVENTS (Tablet/Mobile support) ---
    list.addEventListener('touchstart', (e) => {
        const target = e.target.closest('.timeline-item');
        if (target) {
            draggedItem = target;
            draggedItem.style.opacity = '0.5';
            draggedItem.style.background = 'rgba(212, 175, 55, 0.2)';
            // Prevent scrolling while dragging
            e.preventDefault();
        }
    }, { passive: false });

    list.addEventListener('touchmove', (e) => {
        if (!draggedItem) return;
        e.preventDefault(); // Prevent scrolling

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
