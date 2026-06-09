/**
 * LEX MINIGAMES ENGINE v4
 * Subject-based Arenas, Enigma Unlocks, and Dynamic Game Generation.
 */

const Minigames = {
    points: parseInt(localStorage.getItem('lex-total-points')) || 0,
    activeTimer: null,
    timeRemaining: 0,
    comboMultiplier: 1,
    currentQuestionIndex: 0,
    scoreAccumulator: 0,
    currentPool: [],
    
    currentSubject: null,
    subjectUnlocks: JSON.parse(localStorage.getItem('lex-arena-unlocks')) || {},

    // Hangman state
    hangmanWord: '',
    hangmanGuessed: [],
    hangmanMistakes: 0,
    hangmanMaxMistakes: 5,

    // Subject Enigmas
    enigmas: {
        'diritto': {
            text: "Custodisco le regole del bello, ma non sono un artista. Parlo per commi e difendo il passato. Chi sono?",
            answers: ["codice", "diritto", "legge", "codice dei beni culturali"]
        },
        'arte_romana': {
            text: "Costruisco con la calce ciò che i Greci facevano col marmo. Copro grandi spazi senza usare colonne. Chi sono?",
            answers: ["calcestruzzo", "romani", "opus caementicium", "cemento"]
        },
        'arte': {
            text: "Tra luce e ombra scolpisco la tela. Con i colori in tubetto ho catturato l'istante. Chi sono?",
            answers: ["pittore", "impressionista", "arte", "artista", "colore"]
        },
        'storia': {
            text: "Scandisco il tempo di re e rivoluzioni. Insegno il passato per farvi capire il presente. Chi sono?",
            answers: ["storia", "storico", "tempo"]
        }
    },

    init() {
        this.updatePointsUI();
        this.renderSubjectLocks();
        console.log("Minigames Engine v4 Ready");
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

    renderSubjectLocks() {
        Object.keys(this.enigmas).forEach(sub => {
            const card = document.getElementById(`subj-${sub}`);
            if (card) {
                if (this.subjectUnlocks[sub]) {
                    card.classList.remove('locked');
                } else {
                    card.classList.add('locked');
                }
            }
        });
    },

    openSubject(subId) {
        if (!this.subjectUnlocks[subId]) {
            this.currentSubject = subId;
            document.getElementById('enigma-text').textContent = `"${this.enigmas[subId].text}"`;
            document.getElementById('enigma-input').value = '';
            document.getElementById('enigma-error').style.display = 'none';
            document.getElementById('enigma-modal-overlay').classList.add('open');
        } else {
            this.showArena(subId);
        }
    },

    checkEnigma() {
        const input = document.getElementById('enigma-input').value.toLowerCase().trim();
        const validAnswers = this.enigmas[this.currentSubject].answers;
        
        const isCorrect = validAnswers.some(ans => input.includes(ans));
        
        if (isCorrect) {
            this.subjectUnlocks[this.currentSubject] = true;
            localStorage.setItem('lex-arena-unlocks', JSON.stringify(this.subjectUnlocks));
            this.renderSubjectLocks();
            document.getElementById('enigma-modal-overlay').classList.remove('open');
            this.showArena(this.currentSubject);
            this.triggerConfetti();
            if (typeof playChime !== 'undefined') playChime(true);
        } else {
            document.getElementById('enigma-error').style.display = 'block';
            if (typeof playChime !== 'undefined') playChime(false);
            const box = document.querySelector('#enigma-modal-overlay .modal-box');
            if (box) {
                box.style.animation = 'none';
                void box.offsetWidth;
                box.style.animation = 'shake 0.4s ease-in-out';
            }
        }
    },

    showArena(subId) {
        this.currentSubject = subId;
        document.getElementById('subjects-container').style.display = 'none';
        document.getElementById('games-container').style.display = 'grid';
        document.getElementById('back-to-subjects').classList.remove('hidden');
        
        const titles = {
            'diritto': 'Arena di Diritto',
            'arte_romana': 'Arena Romana',
            'arte': 'Arena dell\'Arte',
            'storia': 'Arena della Storia'
        };
        document.getElementById('arena-title').textContent = titles[subId] || 'Arena';
    },

    showSubjects() {
        document.getElementById('subjects-container').style.display = 'grid';
        document.getElementById('games-container').style.display = 'none';
        document.getElementById('back-to-subjects').classList.add('hidden');
        document.getElementById('arena-title').textContent = 'Mappa delle Arene';
    },

    // --- DYNAMIC GAME ROUTING ---
    games: {
        'quiz': { title: "Sfida a Quiz", start: () => Minigames.startQuiz() },
        'fact-fiction': { title: "Sentenza o Bufala?", start: () => Minigames.startFactFiction() },
        'treasure': { title: "L'Impiccato", start: () => Minigames.startTreasure() },
        'tris': { title: "Tris Accademico", start: () => Minigames.startTris() },
        'memory': { title: "Memory dell'Amore", start: () => Minigames.startMemory() }
    },

    // --- TRIS (TIC-TAC-TOE) ---
    trisBoard: Array(9).fill(null),
    trisTurn: 'X',

    startTris() {
        this.trisBoard = Array(9).fill(null);
        this.trisTurn = 'X';
        this.renderTris();
    },

    renderTris() {
        const html = `
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem;">Sfida l'IA: tu sei X. Allinea tre simboli per vincere!</p>
            <div class="tris-grid">
                ${this.trisBoard.map((cell, i) => `
                    <div class="tris-cell ${cell ? 'filled' : ''}" onclick="Minigames.handleTrisClick(${i})">${cell || ''}</div>
                `).join('')}
            </div>
            <style>
                .tris-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 240px; margin: 0 auto; }
                .tris-cell { aspect-ratio: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .tris-cell:hover:not(.filled) { background: rgba(212, 175, 55, 0.1); border-color: var(--accent-gold); }
                .tris-cell.filled { cursor: default; }
            </style>
        `;
        document.getElementById('game-content').innerHTML = html;
    },

    handleTrisClick(idx) {
        if (this.trisBoard[idx] || this.trisTurn !== 'X') return;
        
        this.trisBoard[idx] = 'X';
        this.renderTris();
        
        if (this.checkTrisWin('X')) return this.showResult(true, "Vittoria!", 5);
        if (this.trisBoard.every(c => c)) return this.showResult(true, "Pareggio!", 2);
        
        this.trisTurn = 'O';
        setTimeout(() => this.trisAIMove(), 500);
    },

    trisAIMove() {
        const empty = this.trisBoard.map((c, i) => c === null ? i : null).filter(i => i !== null);
        if (empty.length === 0) return;
        
        const move = empty[Math.floor(Math.random() * empty.length)];
        this.trisBoard[move] = 'O';
        this.trisTurn = 'X';
        this.renderTris();
        
        if (this.checkTrisWin('O')) return this.showResult(false, "Sconfitta!", 0);
        if (this.trisBoard.every(c => c)) return this.showResult(true, "Pareggio!", 2);
    },

    checkTrisWin(p) {
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        return wins.some(w => w.every(i => this.trisBoard[i] === p));
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
            // Check if victory logic is already wrapped
            if (!LexCore._isMemoryWrapped) {
                const originalVictory = LexCore.startMemoryGame;
                LexCore.startMemoryGame = function() {
                    originalVictory.apply(LexCore);
                    
                    const checkVictory = setInterval(() => {
                        const matches = document.getElementById('memory-matches');
                        if (matches && matches.textContent === '8') {
                            clearInterval(checkVictory);
                            setTimeout(() => Minigames.showResult(true, "Memoria di Ferro!", 15), 800);
                        }
                    }, 1000);
                };
                LexCore._isMemoryWrapped = true;
            }
            LexCore.startMemoryGame();
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

    // --- DYNAMIC QUIZ (from quiz_db.js) ---
    startQuiz() {
        if (!window.quizDatabase) return alert("Database Quiz non caricato.");
        
        let subjectQuestions = [];
        Object.values(window.quizDatabase).forEach(chapter => {
            if (chapter.subject === this.currentSubject) {
                subjectQuestions = subjectQuestions.concat(chapter.questions);
            }
        });

        if (subjectQuestions.length === 0) {
            // Fallback questions if subject is empty
            subjectQuestions = [
                { question: "Domanda segreta dell'arena. Scegli la via della virtù.", options: ["La via", "La verità", "La vita"], correctIndex: 1 }
            ];
        }

        // Pick 3 random questions
        this.currentPool = subjectQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
        this.currentQuestionIndex = 0;
        this.scoreAccumulator = 0;
        this.comboMultiplier = 1;
        this.renderNextQuiz();
    },

    renderNextQuiz() {
        if (this.currentQuestionIndex >= this.currentPool.length) {
            this.showResult(true, "Sfida Superata!", this.scoreAccumulator);
            return;
        }

        const q = this.currentPool[this.currentQuestionIndex];
        const html = `
            ${this.getTimerHTML(20)}
            <div style="display:flex; justify-content:space-between; color:var(--accent-gold); font-weight:700; margin-bottom:1rem;">
                <span>Domanda ${this.currentQuestionIndex + 1} di ${this.currentPool.length}</span>
                <span>Combo: x${this.comboMultiplier}</span>
            </div>
            <div class="game-prompt-card" style="margin-bottom: 1.5rem; text-align: left;">
                <p>${q.question}</p>
            </div>
            <div class="game-options-grid">
                ${q.options.map((opt, i) => `
                    <button class="game-option-btn" onclick="Minigames.answerQuiz(${i}, ${q.correctIndex})">
                        <span class="opt-index">${String.fromCharCode(65 + i)}</span>
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
        this.startTimer(20, () => this.answerQuiz(-1, q.correctIndex)); 
    },

    answerQuiz(idx, correct) {
        this.stopTimer();
        
        if (idx === correct) {
            const basePts = 10;
            this.scoreAccumulator += (basePts * this.comboMultiplier);
            this.comboMultiplier++;
            this.currentQuestionIndex++;
            this.renderNextQuiz();
        } else {
            this.showResult(false, idx === -1 ? "Tempo Scaduto!" : "Risposta Errata!", this.scoreAccumulator);
            if (this.scoreAccumulator > 0) this.addPoints(this.scoreAccumulator);
        }
    },

    // --- DYNAMIC FACT OR FICTION ---
    startFactFiction() {
        if (!window.quizDatabase) return;

        let subjectQuestions = [];
        Object.values(window.quizDatabase).forEach(chapter => {
            if (chapter.subject === this.currentSubject) {
                subjectQuestions = subjectQuestions.concat(chapter.questions);
            }
        });

        // Generate Facts: taking correct answers as True, random other options as False
        let facts = [];
        subjectQuestions.forEach(q => {
            facts.push({ text: q.options[q.correctIndex], correct: true });
            const wrongOptions = q.options.filter((o, i) => i !== q.correctIndex);
            if (wrongOptions.length > 0) {
                facts.push({ text: wrongOptions[Math.floor(Math.random() * wrongOptions.length)], correct: false });
            }
        });

        if (facts.length === 0) facts = [{text: "L'acqua è bagnata.", correct: true}, {text: "Il fuoco è freddo.", correct: false}];

        this.currentPool = facts.sort(() => Math.random() - 0.5).slice(0, 5);
        this.currentQuestionIndex = 0;
        this.scoreAccumulator = 0;
        this.renderNextFact();
    },

    renderNextFact() {
        if (this.currentQuestionIndex >= this.currentPool.length) {
            this.showResult(true, "Debunker Infallibile!", this.scoreAccumulator + 10);
            return;
        }

        const f = this.currentPool[this.currentQuestionIndex];
        const html = `
            ${this.getTimerHTML(10)}
            <div style="text-align: center; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">
                Affermazione ${this.currentQuestionIndex + 1} di ${this.currentPool.length}
            </div>
            <div class="game-prompt-card" style="font-size: 1.2rem; padding: 2rem; margin-bottom: 2rem; border-color: var(--accent-gold); box-shadow: 0 0 20px rgba(212,175,55,0.1);">
                "${f.text}"
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%;">
                <button class="btn-action" style="background: var(--accent-green); height: 80px; font-size: 1.2rem; font-weight: 700; border-radius: 16px;" onclick="Minigames.answerFact(${true})">VERO</button>
                <button class="btn-action" style="background: var(--accent-romana); height: 80px; font-size: 1.2rem; font-weight: 700; border-radius: 16px;" onclick="Minigames.answerFact(${false})">FALSO</button>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
        this.startTimer(10, () => this.answerFact(null));
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

    // --- DYNAMIC HANGMAN (from glossary_db.js) ---
    startTreasure() {
        if (!window.glossaryDatabase) return;
        
        let terms = Object.keys(window.glossaryDatabase).filter(key => window.glossaryDatabase[key].domain === this.currentSubject);
        
        if (terms.length === 0) {
             // Fallback to all if specific subject empty
             terms = Object.keys(window.glossaryDatabase);
        }

        const selectedTermKey = terms[Math.floor(Math.random() * terms.length)];
        const termData = window.glossaryDatabase[selectedTermKey];
        
        // Clean up word for hangman (only letters, no parenthesis)
        let cleanWord = termData.term.split('(')[0].trim().toUpperCase();
        // Remove accents
        cleanWord = cleanWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        this.hangmanWord = cleanWord;
        this.hangmanGuessed = [];
        this.hangmanMistakes = 0;
        
        this.renderHangman(termData.definition);
    },

    renderHangman(prompt) {
        const displayWord = this.hangmanWord.split('').map(char => {
            if (char === ' ' || char === "'" || char === "-") return char;
            return this.hangmanGuessed.includes(char) ? char : '_';
        }).join(' ');

        const alphabet = "ABCDEFGHILMNOPQRSTUVZKYJWX".split('');
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
            <div class="game-prompt-card" style="margin-bottom: 1.5rem; font-style: italic; font-size: 0.95rem; text-align: left;">
                "${prompt}"
            </div>
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 2rem; font-family: monospace; letter-spacing: 0.2em; font-weight: 700; color: var(--accent-gold); margin-bottom: 1rem; flex-wrap: wrap;">
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
        
        if (!document.getElementById('hangman-css')) {
            const style = document.createElement('style');
            style.id = 'hangman-css';
            style.innerHTML = `
                .hangman-keyboard { display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center; }
                .hangman-key { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: white; border-radius: 8px; width: 35px; height: 35px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
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
        }

        if (this.hangmanMistakes >= this.hangmanMaxMistakes) {
            this.showResult(false, `Impiccato! Era: ${this.hangmanWord}`, 0);
        } else {
            this.renderHangman(prompt);
        }
    },

    checkHangmanWin() {
        const wordChars = this.hangmanWord.replace(/[ '-]/g, '').split('');
        const isWin = wordChars.every(char => this.hangmanGuessed.includes(char));
        if (isWin) {
            this.showResult(true, "Tesoro Dissotterrato!", 25);
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
            const box = document.querySelector('.game-modal');
            if (box) {
                box.style.animation = 'none';
                void box.offsetWidth;
                box.style.animation = 'shake 0.4s ease-in-out';
            }
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
    },

    openGame(gameId) {
        const game = this.games[gameId];
        if (!game) return;

        document.getElementById('game-result-container').classList.add('hidden');
        document.getElementById('game-title').textContent = game.title;
        document.getElementById('game-modal-overlay').classList.add('open');
        
        game.start();
    },

    closeGameModal() {
        this.stopTimer();
        document.getElementById('game-modal-overlay').classList.remove('open');
    }
};

window.Minigames = Minigames;

document.addEventListener('DOMContentLoaded', () => Minigames.init());
