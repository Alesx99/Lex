/**
 * LEX MINIGAMES ENGINE
 * Logic for Chronos Lex, Dilemma del Curatore, Treasure Hunt, and Fact or Fiction.
 */

const Minigames = {
    currentGame: null,
    score: 0,

    init() {
        console.log("Minigames Engine Initialized");
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
        const events = [
            { id: 1, year: 1909, text: "Legge Rosadi (n. 364)" },
            { id: 2, year: 1939, text: "Leggi Bottai (n. 1089 e 1497)" },
            { id: 3, year: 1948, text: "Entrata in vigore Costituzione (Art. 9)" },
            { id: 4, year: 1999, text: "Testo Unico dei Beni Culturali" },
            { id: 5, year: 2004, text: "Codice Urbani (D.Lgs. 42/2004)" }
        ].sort(() => Math.random() - 0.5);

        let html = `
            <p style="margin-bottom: 1.5rem;">Ordina queste pietre miliari del diritto dal più antico al più recente.</p>
            <div id="timeline-list" class="timeline-container">
                ${events.map(e => `
                    <div class="timeline-item" draggable="true" data-year="${e.year}">
                        <span>${e.text}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </div>
                `).join('')}
            </div>
            <button class="btn-action btn-action-primary" style="margin-top: 2rem;" onclick="Minigames.checkChronos()">Verifica Cronologia</button>
        `;
        return html;
    },

    renderDilemma() {
        const scenarios = [
            {
                text: "Durante uno scavo per la fibra ottica, una ditta trova un'anfora romana. Cosa dice il Codice?",
                options: [
                    "La ditta può tenerla se è in un terreno privato.",
                    "Bisogna fermare i lavori, denunciare entro 24h e conservare il reperto sul posto.",
                    "Il sindaco deve decidere se il reperto è di interesse culturale."
                ],
                correct: 1
            }
        ];
        const s = scenarios[0];
        return `
            <div class="scenario-box">
                <p>${s.text}</p>
            </div>
            <div class="options-list">
                ${s.options.map((opt, i) => `
                    <button class="option-btn" onclick="Minigames.answerDilemma(${i}, ${s.correct})">${opt}</button>
                `).join('')}
            </div>
        `;
    },

    renderTreasure() {
        return `
            <p>Il "Tesoro" di oggi è nascosto in un capitolo di Diritto.</p>
            <div class="fact-card" style="font-style: italic;">
                "È la facoltà dello Stato di acquistare il bene al medesimo prezzo stabilito nell'atto di alienazione..."
            </div>
            <p>Di quale istituto giuridico stiamo parlando?</p>
            <input type="text" id="treasure-input" class="form-input" style="width: 100%; max-width: 300px; margin-top: 1rem;" placeholder="Inserisci il termine...">
            <button class="btn-action btn-action-primary" style="margin-top: 1rem;" onclick="Minigames.checkTreasure()">Conferma</button>
        `;
    },

    renderFactFiction() {
        const facts = [
            { text: "L'Articolo 9 della Costituzione è stato modificato nel 2022 per includere la tutela dell'ambiente.", correct: true },
            { text: "Un bene culturale privato può essere venduto all'estero senza alcuna autorizzazione se ha meno di 100 anni.", correct: false }
        ];
        const f = facts[Math.floor(Math.random() * facts.length)];
        return `
            <div class="fact-card">
                "${f.text}"
            </div>
            <div style="display: flex; gap: 1rem;">
                <button class="btn-action btn-action-primary" style="background: var(--accent-green);" onclick="Minigames.answerFact(true, ${f.correct})">VERO</button>
                <button class="btn-action btn-action-primary" style="background: var(--accent-romana);" onclick="Minigames.answerFact(false, ${f.correct})">FALSO</button>
            </div>
        `;
    },

    renderMemory() {
        // Reuse LexCore if available, or re-implement
        return `
            <div id="lex-memory-game-wrapper" style="width: 100%;">
                <div id="lex-memory-intro">
                    <p>Mentre la mente sedimenta i concetti, rilassati con il Memory!</p>
                    <button id="lex-start-memory-btn" class="btn-action btn-action-primary" style="margin-top: 1.2rem;">Inizia Partita 🎮</button>
                </div>
                <div id="lex-memory-board" style="display: none;">
                    <div class="memory-stats" style="display: flex; justify-content: space-around; margin-bottom: 0.8rem; font-size: 0.9rem; font-weight: 600;">
                        <span>Mosse: <span id="memory-moves">0</span></span>
                        <span>Coppie: <span id="memory-matches">0</span> / 8</span>
                    </div>
                    <div class="lex-memory-grid"></div>
                </div>
                <div id="lex-memory-victory" style="display: none;">
                    <h3 style="color: var(--accent-gold);">Vittoria! 🏆</h3>
                    <p>Hai risolto il memory in <span id="victory-moves">0</span> mosse!</p>
                    <p id="unlocked-coupon-text" style="font-style: italic; margin-top: 0.5rem; color: var(--accent-gold);"></p>
                    <button class="btn-action btn-action-secondary" style="margin-top: 1rem;" onclick="Minigames.openGame('memory')">Gioca ancora</button>
                </div>
            </div>
        `;
    },

    // --- LOGIC ---

    checkChronos() {
        const items = Array.from(document.querySelectorAll('.timeline-item'));
        const years = items.map(item => parseInt(item.getAttribute('data-year')));
        const isSorted = years.every((v, i, a) => !i || a[i-1] <= v);

        if (isSorted) {
            alert("Ottimo! Hai ordinato correttamente la storia del diritto. +10 Punti");
            this.unlockAchievement('time_lord');
        } else {
            alert("Qualcosa non torna nella linea temporale. Riprova!");
        }
    },

    answerDilemma(idx, correct) {
        if (idx === correct) {
            alert("Corretto! Hai agito secondo le norme del MiC. +10 Punti");
            this.unlockAchievement('curator_master');
        } else {
            alert("Scelta errata. Il patrimonio potrebbe essere a rischio!");
        }
    },

    checkTreasure() {
        const val = document.getElementById('treasure-input').value.toLowerCase().trim();
        if (val === 'prelazione' || val === 'prelazione artistica') {
            alert("Trovato! È proprio la prelazione. +10 Punti");
            this.unlockAchievement('treasure_hunter');
        } else {
            alert("Non è questo il termine. Cerca meglio nella knowledge base!");
        }
    },

    answerFact(guess, correct) {
        if (guess === correct) {
            alert("Esatto! Non ti sei fatto ingannare. +10 Punti");
            this.unlockAchievement('fact_checker');
        } else {
            alert("Sbagliato! Studia meglio le sintesi.");
        }
    },

    unlockAchievement(id) {
        let achievements = JSON.parse(localStorage.getItem('lex-minigame-achievements')) || {};
        achievements[id] = true;
        localStorage.setItem('lex-minigame-achievements', JSON.stringify(achievements));
        
        // Notify user
        if (typeof LexCore !== 'undefined' && LexCore.showToast) {
            LexCore.showToast(`🏆 Traguardo Sbloccato: ${id.replace('_', ' ')}!`, 'success');
        } else {
            console.log("Achievement Unlocked:", id);
        }
    }
};

// Global Functions for UI
window.openGame = function(gameId) {
    const game = Minigames.games[gameId];
    if (!game) return;

    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-content').innerHTML = game.render();
    document.getElementById('game-modal-overlay').classList.add('open');

    // Special init for memory or drag-drop if needed
    if (gameId === 'memory') {
        // We'll use LexCore's existing memory logic if available
        if (typeof LexCore !== 'undefined' && LexCore.startMemoryGame) {
            // Setup listeners for the modal version
            document.getElementById('lex-start-memory-btn').onclick = () => {
                document.getElementById('lex-memory-intro').style.display = 'none';
                document.getElementById('lex-memory-board').style.display = 'block';
                LexCore.startMemoryGame();
            };
        }
    }

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
}

document.addEventListener('DOMContentLoaded', () => Minigames.init());
