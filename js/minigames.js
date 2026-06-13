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
        'memory': { title: "Memory Visivo", start: () => Minigames.startMemory() },
        '2048': { title: "2048 Accademico", start: () => Minigames.start2048() },
        'snake': { title: "Lex Snake", start: () => Minigames.startSnake() },
        'lexle': { title: "Lexle", start: () => Minigames.startLexle() },
        'clicker': { title: "Caffè Clicker", start: () => Minigames.startClicker() }
    },

    // --- 2048 ACCADEMICO ---
    g2048Grid: [],
    g2048MergedIndices: [],
    g2048Levels: {
        2: "Matricola", 4: "Fuoricorso", 8: "Triennale", 16: "Magistrale", 
        32: "Master", 64: "Dottorando", 128: "Ricercatore", 256: "Assistente",
        512: "Professore", 1024: "Preside", 2048: "Rettore"
    },

    start2048() {
        this.g2048Grid = Array(16).fill(0);
        this.g2048MergedIndices = [];
        this.addRandomTile2048();
        this.addRandomTile2048();
        this.render2048();
        this.setup2048Controls();
    },

    addRandomTile2048() {
        const empty = this.g2048Grid.map((v, i) => v === 0 ? i : null).filter(i => i !== null);
        if (empty.length > 0) {
            const idx = empty[Math.floor(Math.random() * empty.length)];
            this.g2048Grid[idx] = Math.random() < 0.9 ? 2 : 4;
        }
    },

    render2048() {
        const html = `
            <div style="text-align: center; margin-bottom: 1rem; color: var(--text-secondary);">Unisci i tasselli per salire di grado!</div>
            <div class="g2048-grid">
                ${this.g2048Grid.map((v, index) => {
                    const isMerged = this.g2048MergedIndices.includes(index);
                    const classes = ['g2048-cell'];
                    if (v > 0) classes.push('filled');
                    if (isMerged) classes.push('pop');
                    return `<div class="${classes.join(' ')}" data-val="${v}">${v > 0 ? this.g2048Levels[v] || v : ''}</div>`;
                }).join('')}
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; width: 150px; margin: 1.5rem auto 0;">
                <div></div><button class="btn-action" onclick="Minigames.move2048('up')">↑</button><div></div>
                <button class="btn-action" onclick="Minigames.move2048('left')">←</button>
                <button class="btn-action" onclick="Minigames.move2048('down')">↓</button>
                <button class="btn-action" onclick="Minigames.move2048('right')">→</button>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;

        // Inietta stili CSS per l'animazione di merge
        if (!document.getElementById('g2048-style')) {
            const style = document.createElement('style');
            style.id = 'g2048-style';
            style.innerHTML = `
                @keyframes mergePop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); box-shadow: 0 0 20px var(--accent-gold); }
                    100% { transform: scale(1); }
                }
                .g2048-cell.pop {
                    animation: mergePop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `;
            document.head.appendChild(style);
        }
    },

    setup2048Controls() {
        const handler = (e) => {
            if (!document.querySelector('.g2048-grid')) return;
            if (e.key === 'ArrowUp') this.move2048('up');
            if (e.key === 'ArrowDown') this.move2048('down');
            if (e.key === 'ArrowLeft') this.move2048('left');
            if (e.key === 'ArrowRight') this.move2048('right');
        };
        window.removeEventListener('keydown', this._2048KeyHandler);
        this._2048KeyHandler = handler;
        window.addEventListener('keydown', handler);
    },

    move2048(dir) {
        let moved = false;
        const size = 4;
        this.g2048MergedIndices = [];
        
        const getLine = (i) => {
            if (dir === 'left' || dir === 'right') return this.g2048Grid.slice(i * size, (i + 1) * size);
            return [this.g2048Grid[i], this.g2048Grid[i+size], this.g2048Grid[i+size*2], this.g2048Grid[i+size*3]];
        };

        const setLine = (i, line, mergedPositions) => {
            if (dir === 'left' || dir === 'right') {
                for (let j = 0; j < size; j++) {
                    this.g2048Grid[i * size + j] = line[j];
                    if (mergedPositions.includes(j)) {
                        this.g2048MergedIndices.push(i * size + j);
                    }
                }
            } else {
                for (let j = 0; j < size; j++) {
                    this.g2048Grid[i + j * size] = line[j];
                    if (mergedPositions.includes(j)) {
                        this.g2048MergedIndices.push(i + j * size);
                    }
                }
            }
        };

        for (let i = 0; i < size; i++) {
            let line = getLine(i);
            let reversed = false;
            if (dir === 'right' || dir === 'down') {
                line.reverse();
                reversed = true;
            }
            
            // Slide
            let nonZero = line.filter(v => v !== 0);
            let newLine = [];
            let mergedPositions = [];
            for (let j = 0; j < nonZero.length; j++) {
                if (j < nonZero.length - 1 && nonZero[j] === nonZero[j+1]) {
                    const combined = nonZero[j] * 2;
                    newLine.push(combined);
                    mergedPositions.push(newLine.length - 1);
                    this.addPoints(Math.floor(combined / 10));
                    j++;
                    if (combined === 2048) this.showResult(true, "Rettore Magnifico!", 50);
                } else {
                    newLine.push(nonZero[j]);
                }
            }
            while (newLine.length < size) newLine.push(0);
            
            if (reversed) {
                newLine.reverse();
                mergedPositions = mergedPositions.map(pos => size - 1 - pos);
            }
            
            if (JSON.stringify(getLine(i)) !== JSON.stringify(newLine)) moved = true;
            setLine(i, newLine, mergedPositions);
        }

        if (moved) {
            this.addRandomTile2048();
            this.render2048();
        }
    },

    // --- LEX SNAKE ---
    snakeBody: [],
    snakeDir: { x: 0, y: -1 },
    snakeFood: { x: 5, y: 5 },
    snakeInterval: null,
    snakeGridSize: 20,

    snakeAnimationId: null,

    startSnake() {
        this.snakeBody = [{x: 10, y: 15}, {x: 10, y: 16}, {x: 10, y: 17}];
        this.snakeDir = { x: 0, y: -1 };
        this.scoreAccumulator = 0;
        this.renderSnake();
        this.setupSnakeControls();
        
        clearInterval(this.snakeInterval);
        cancelAnimationFrame(this.snakeAnimationId);
        
        this.snakeInterval = setInterval(() => this.moveSnake(), 150);
        
        const renderLoop = () => {
            if (document.getElementById('snake-canvas')) {
                this.drawSnake();
                this.snakeAnimationId = requestAnimationFrame(renderLoop);
            }
        };
        this.snakeAnimationId = requestAnimationFrame(renderLoop);
    },

    renderSnake() {
        const html = `
            <div style="text-align: center; margin-bottom: 0.5rem; font-weight: 700; color: var(--accent-gold);">Punti: ${this.scoreAccumulator}</div>
            <canvas id="snake-canvas" width="300" height="300" style="background: #000; border: 2px solid var(--border-color); border-radius: 8px; display: block; margin: 0 auto;"></canvas>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; width: 150px; margin: 1rem auto 0;">
                <div></div><button class="btn-action" onclick="Minigames.setSnakeDir(0, -1)">↑</button><div></div>
                <button class="btn-action" onclick="Minigames.setSnakeDir(-1, 0)">←</button>
                <button class="btn-action" onclick="Minigames.setSnakeDir(0, 1)">↓</button>
                <button class="btn-action" onclick="Minigames.setSnakeDir(1, 0)">→</button>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
    },

    setSnakeDir(x, y) {
        if (x !== 0 && this.snakeDir.x === 0) this.snakeDir = { x, y };
        if (y !== 0 && this.snakeDir.y === 0) this.snakeDir = { x, y };
    },

    setupSnakeControls() {
        const handler = (e) => {
            if (!document.getElementById('snake-canvas')) return;
            if (e.key === 'ArrowUp') this.setSnakeDir(0, -1);
            if (e.key === 'ArrowDown') this.setSnakeDir(0, 1);
            if (e.key === 'ArrowLeft') this.setSnakeDir(-1, 0);
            if (e.key === 'ArrowRight') this.setSnakeDir(1, 0);
        };
        window.removeEventListener('keydown', this._snakeKeyHandler);
        this._snakeKeyHandler = handler;
        window.addEventListener('keydown', handler);
    },

    moveSnake() {
        const head = { x: this.snakeBody[0].x + this.snakeDir.x, y: this.snakeBody[0].y + this.snakeDir.y };
        
        // Wall collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || this.snakeBody.some(b => b.x === head.x && b.y === head.y)) {
            clearInterval(this.snakeInterval);
            cancelAnimationFrame(this.snakeAnimationId);
            return this.showResult(false, "Collisione!", this.scoreAccumulator);
        }

        this.snakeBody.unshift(head);

        if (head.x === this.snakeFood.x && head.y === this.snakeFood.y) {
            this.scoreAccumulator++;
            this.addPoints(1);
            this.snakeFood = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        } else {
            this.snakeBody.pop();
        }
    },

    drawSnake() {
        const canvas = document.getElementById('snake-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const s = 15; // cell size

        ctx.clearRect(0, 0, 300, 300);

        // Draw backdrop coordinate grid (semi-transparent gold lines every cell)
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.07)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 300; i += s) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 300);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(300, i);
            ctx.stroke();
        }
        
        // Save ctx state for glowing elements
        ctx.save();

        // Pulsing food shadow
        const pulse = 8 + Math.sin(Date.now() / 150) * 4;
        ctx.shadowBlur = pulse;
        ctx.shadowColor = '#ef4444';
        ctx.fillStyle = '#ef4444';
        // Rounded food
        ctx.beginPath();
        ctx.arc(this.snakeFood.x * s + s/2, this.snakeFood.y * s + s/2, s/2 - 1, 0, Math.PI * 2);
        ctx.fill();

        // Snake Body & Head with neon glow
        this.snakeBody.forEach((b, i) => {
            if (i === 0) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#f59e0b';
                ctx.fillStyle = '#f59e0b';
            } else {
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#d4af37';
                ctx.fillStyle = '#d4af37';
            }
            // Draw slightly rounded segments
            ctx.beginPath();
            const radius = 3; // rounded corner radius
            const x = b.x * s + 0.5;
            const y = b.y * s + 0.5;
            const w = s - 1;
            const h = s - 1;
            ctx.roundRect ? ctx.roundRect(x, y, w, h, radius) : ctx.rect(x, y, w, h);
            ctx.fill();
        });

        ctx.restore();
    },

    // --- LEXLE (WORDLE) ---
    lexleTarget: '',
    lexleGuesses: [],
    lexleCurrentGuess: '',

    startLexle() {
        const words = ["ESAME", "LIBRO", "LAURE", "CORSO", "FONTE", "FORO", "STUDI", "LEGGE", "MUSEO", "ARTE", "PUNTO", "TESTO", "CLASSE", "SITO", "AULA"];
        this.lexleTarget = words[Math.floor(Math.random() * words.length)].padEnd(5, 'X').substring(0, 5).toUpperCase();
        this.lexleGuesses = [];
        this.lexleCurrentGuess = '';
        this.renderLexle();
        this.setupLexleControls();
    },

    renderLexle() {
        const html = `
            <div class="lexle-grid">
                ${Array(6).fill(0).map((_, r) => `
                    <div class="lexle-row">
                        ${Array(5).fill(0).map((_, c) => {
                            const guess = this.lexleGuesses[r];
                            let char = '';
                            let status = '';
                            if (guess) {
                                char = guess[c];
                                status = this.getLexleLetterStatus(guess, c);
                            } else if (r === this.lexleGuesses.length) {
                                char = this.lexleCurrentGuess[c] || '';
                            }
                            return `<div class="lexle-letter ${status}">${char}</div>`;
                        }).join('')}
                    </div>
                `).join('')}
            </div>
            <div id="lexle-keyboard" style="display: flex; flex-wrap: wrap; gap: 5px; justify-content: center; max-width: 350px; margin: 0 auto 1.5rem;">
                ${"QWERTYUIOPASDFGHJKLZXCVBNM".split('').map(l => {
                    const status = this.getLexleKeyStatus(l);
                    let styleAttr = 'padding: 0.5rem; min-width: 30px; transition: all 0.2s;';
                    if (status === 'correct') {
                        styleAttr += ' background: var(--accent-green) !important; border-color: var(--accent-green) !important; color: #fff;';
                    } else if (status === 'present') {
                        styleAttr += ' background: var(--accent-gold) !important; border-color: var(--accent-gold) !important; color: #000;';
                    } else if (status === 'absent') {
                        styleAttr += ' background: rgba(255,255,255,0.05) !important; border-color: transparent !important; opacity: 0.4;';
                    }
                    return `<button class="btn-action" style="${styleAttr}" onclick="Minigames.handleLexleInput('${l}')">${l}</button>`;
                }).join('')}
                <button class="btn-action" style="padding: 0.5rem; min-width: 60px; background: #ef4444;" onclick="Minigames.handleLexleInput('BACKSPACE')">DEL</button>
                <button class="btn-action" style="padding: 0.5rem; min-width: 60px; background: var(--accent-green);" onclick="Minigames.handleLexleInput('ENTER')">INVIO</button>
            </div>
        `;
        document.getElementById('game-content').innerHTML = html;
    },

    getLexleKeyStatus(char) {
        let status = '';
        for (const guess of this.lexleGuesses) {
            for (let i = 0; i < 5; i++) {
                if (guess[i] === char) {
                    if (this.lexleTarget[i] === char) {
                        return 'correct'; // Priorità massima: indovinata in posizione esatta
                    } else if (this.lexleTarget.includes(char)) {
                        status = 'present';
                    } else if (status !== 'present') {
                        status = 'absent';
                    }
                }
            }
        }
        return status;
    },

    getLexleLetterStatus(guess, i) {
        const char = guess[i];
        if (char === this.lexleTarget[i]) return 'correct';
        if (this.lexleTarget.includes(char)) return 'present';
        return 'absent';
    },

    handleLexleInput(key) {
        if (key === 'ENTER') {
            if (this.lexleCurrentGuess.length === 5) {
                this.lexleGuesses.push(this.lexleCurrentGuess);
                const win = this.lexleCurrentGuess === this.lexleTarget;
                this.lexleCurrentGuess = '';
                this.renderLexle();
                if (win) {
                    const pts = [50, 40, 30, 20, 15, 10][this.lexleGuesses.length - 1];
                    this.showResult(true, "Genio del Lessico!", pts);
                } else if (this.lexleGuesses.length === 6) {
                    this.showResult(false, `Parola era: ${this.lexleTarget}`, 0);
                }
            }
        } else if (key === 'BACKSPACE') {
            this.lexleCurrentGuess = this.lexleCurrentGuess.slice(0, -1);
            this.renderLexle();
        } else if (this.lexleCurrentGuess.length < 5 && /^[A-Z]$/.test(key)) {
            this.lexleCurrentGuess += key;
            this.renderLexle();
        }
    },

    setupLexleControls() {
        const handler = (e) => {
            if (!document.querySelector('.lexle-grid')) return;
            const key = e.key.toUpperCase();
            if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
                this.handleLexleInput(key);
            }
        };
        window.removeEventListener('keydown', this._lexleKeyHandler);
        this._lexleKeyHandler = handler;
        window.addEventListener('keydown', handler);
    },

    // --- CAFFÈ CLICKER ---
    clickerGocce: 0,
    clickerMulti: 1,
    clickerAuto: 0,
    clickerDeptCount: 0,
    clickerCafeCount: 0,
    clickerInterval: null,

    startClicker() {
        this.clickerGocce = parseInt(localStorage.getItem('lex-clicker-gocce')) || 0;
        this.clickerMulti = parseInt(localStorage.getItem('lex-clicker-multi')) || 1;
        this.clickerAuto = parseInt(localStorage.getItem('lex-clicker-auto')) || 0;
        this.clickerDeptCount = parseInt(localStorage.getItem('lex-clicker-dept-count')) || 0;
        this.clickerCafeCount = parseInt(localStorage.getItem('lex-clicker-cafe-count')) || 0;
        this.renderClicker();
        
        clearInterval(this.clickerInterval);
        this.clickerInterval = setInterval(() => {
            const cps = this.clickerAuto + (this.clickerDeptCount * 8) + (this.clickerCafeCount * 30);
            if (cps > 0) {
                this.clickerGocce += cps;
                this.updateClickerUI();
            }
        }, 1000);
    },

    renderClicker() {
        const costMulti = 50 * this.clickerMulti;
        const costAuto = 200 * (1 + (this.clickerAuto / 2));
        const costDept = 800 * (1 + this.clickerDeptCount);
        const costCafe = 3000 * (1 + this.clickerCafeCount);
        const cps = this.clickerAuto + (this.clickerDeptCount * 8) + (this.clickerCafeCount * 30);

        const html = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="font-size: 0.9rem; color: var(--text-secondary);">Gocce di Caffeina</div>
                <div id="clicker-count" style="font-size: 2.5rem; font-weight: 800; color: var(--accent-gold);">${Math.floor(this.clickerGocce)}</div>
                <div id="clicker-cps" style="font-size: 0.85rem; color: var(--accent-green); margin-top: 0.25rem;">+${cps}/sec</div>
            </div>
            <div class="clicker-btn" onclick="Minigames.handleClicker()">☕</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; margin-bottom: 1rem;">
                <button id="clicker-btn-multi" class="btn-action" style="font-size: 0.75rem; padding: 0.5rem;" onclick="Minigames.buyClicker('multi')">Espresso Doppio (+1/click)<br>Costo: ${costMulti}</button>
                <button id="clicker-btn-auto" class="btn-action" style="font-size: 0.75rem; padding: 0.5rem;" onclick="Minigames.buyClicker('auto')">Studente Insonne (+2/sec)<br>Costo: ${costAuto}</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
                <button id="clicker-btn-dept" class="btn-action" style="font-size: 0.75rem; padding: 0.5rem;" onclick="Minigames.buyClicker('dept')">Macchinetta Dipartimento (+8/sec)<br>Costo: ${costDept}</button>
                <button id="clicker-btn-cafe" class="btn-action" style="font-size: 0.75rem; padding: 0.5rem;" onclick="Minigames.buyClicker('cafe')">Caffetteria Univ. (+30/sec)<br>Costo: ${costCafe}</button>
            </div>
            <button class="btn-action btn-action-primary" style="margin-top: 1rem; width: 100%;" onclick="Minigames.convertGocce()">Converti 1000 Gocce in 5 LP</button>
        `;
        document.getElementById('game-content').innerHTML = html;
    },

    handleClicker() {
        this.clickerGocce += this.clickerMulti;
        this.updateClickerUI();
        // Visual feedback
        const btn = document.querySelector('.clicker-btn');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 50);
    },

    updateClickerUI() {
        const el = document.getElementById('clicker-count');
        if (el) el.textContent = Math.floor(this.clickerGocce);
        
        const cpsEl = document.getElementById('clicker-cps');
        const cps = this.clickerAuto + (this.clickerDeptCount * 8) + (this.clickerCafeCount * 30);
        if (cpsEl) cpsEl.textContent = `+${cps}/sec`;

        const costMulti = 50 * this.clickerMulti;
        const costAuto = 200 * (1 + (this.clickerAuto / 2));
        const costDept = 800 * (1 + this.clickerDeptCount);
        const costCafe = 3000 * (1 + this.clickerCafeCount);

        const btnMulti = document.getElementById('clicker-btn-multi');
        if (btnMulti) btnMulti.innerHTML = `Espresso Doppio (+1/click)<br>Costo: ${costMulti}`;

        const btnAuto = document.getElementById('clicker-btn-auto');
        if (btnAuto) btnAuto.innerHTML = `Studente Insonne (+2/sec)<br>Costo: ${costAuto}`;

        const btnDept = document.getElementById('clicker-btn-dept');
        if (btnDept) btnDept.innerHTML = `Macchinetta Dipartimento (+8/sec)<br>Costo: ${costDept}`;

        const btnCafe = document.getElementById('clicker-btn-cafe');
        if (btnCafe) btnCafe.innerHTML = `Caffetteria Univ. (+30/sec)<br>Costo: ${costCafe}`;

        localStorage.setItem('lex-clicker-gocce', this.clickerGocce);
        localStorage.setItem('lex-clicker-multi', this.clickerMulti);
        localStorage.setItem('lex-clicker-auto', this.clickerAuto);
        localStorage.setItem('lex-clicker-dept-count', this.clickerDeptCount);
        localStorage.setItem('lex-clicker-cafe-count', this.clickerCafeCount);
    },

    buyClicker(type) {
        const costMulti = 50 * this.clickerMulti;
        const costAuto = 200 * (1 + (this.clickerAuto / 2));
        const costDept = 800 * (1 + this.clickerDeptCount);
        const costCafe = 3000 * (1 + this.clickerCafeCount);

        if (type === 'multi' && this.clickerGocce >= costMulti) {
            this.clickerGocce -= costMulti;
            this.clickerMulti++;
        } else if (type === 'auto' && this.clickerGocce >= costAuto) {
            this.clickerGocce -= costAuto;
            this.clickerAuto += 2;
        } else if (type === 'dept' && this.clickerGocce >= costDept) {
            this.clickerGocce -= costDept;
            this.clickerDeptCount++;
        } else if (type === 'cafe' && this.clickerGocce >= costCafe) {
            this.clickerGocce -= costCafe;
            this.clickerCafeCount++;
        } else {
            return; // Non abbastanza gocce
        }
        this.updateClickerUI();
    },

    convertGocce() {
        if (this.clickerGocce >= 1000) {
            this.clickerGocce -= 1000;
            this.addPoints(5);
            this.updateClickerUI();
            LexCore.showToast("Caffeina convertita in Lex Points!", "success");
        } else {
            LexCore.showToast("Caffeina insufficiente!", "error");
        }
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
        
        let move = null;
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

        // 1. Can AI win?
        for (const w of wins) {
            const cells = w.map(i => this.trisBoard[i]);
            const oCount = cells.filter(c => c === 'O').length;
            const nullCount = cells.filter(c => c === null).length;
            if (oCount === 2 && nullCount === 1) {
                move = w.find(i => this.trisBoard[i] === null);
                break;
            }
        }

        // 2. Can player win in their next turn? If so, block them
        if (move === null) {
            for (const w of wins) {
                const cells = w.map(i => this.trisBoard[i]);
                const xCount = cells.filter(c => c === 'X').length;
                const nullCount = cells.filter(c => c === null).length;
                if (xCount === 2 && nullCount === 1) {
                    move = w.find(i => this.trisBoard[i] === null);
                    break;
                }
            }
        }

        // 3. Take center if empty
        if (move === null && this.trisBoard[4] === null) {
            move = 4;
        }

        // 4. Take a corner if empty
        if (move === null) {
            const corners = [0, 2, 6, 8].filter(i => this.trisBoard[i] === null);
            if (corners.length > 0) {
                move = corners[Math.floor(Math.random() * corners.length)];
            }
        }

        // 5. Take any empty spot
        if (move === null) {
            move = empty[Math.floor(Math.random() * empty.length)];
        }

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

        // Record tracking for Wax Tablet EE (ee-wax-tablet)
        if (success && this.currentGameId) {
            const currentScore = Math.max(pts, this.scoreAccumulator || 0);
            if (currentScore >= 10) {
                const recordKey = `lex-game-record-${this.currentGameId}`;
                const oldRecord = parseInt(localStorage.getItem(recordKey)) || 0;
                if (oldRecord > 0 && currentScore >= oldRecord * 1.2) {
                    if (typeof LexCore !== 'undefined' && LexCore.triggerWaxTablet) {
                        LexCore.triggerWaxTablet('Victor Academicus', currentScore);
                    }
                }
                if (currentScore > oldRecord) {
                    localStorage.setItem(recordKey, currentScore.toString());
                }
            } else {
                const recordKey = `lex-game-record-${this.currentGameId}`;
                const oldRecord = parseInt(localStorage.getItem(recordKey)) || 0;
                if (currentScore > oldRecord) {
                    localStorage.setItem(recordKey, currentScore.toString());
                }
            }
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

        this.currentGameId = gameId;
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
