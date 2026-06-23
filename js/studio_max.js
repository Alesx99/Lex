/* LEX STUDIO MAX - COGNITIVE PEDAGOGIES ENGINE */

document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        activePhase: 1,
        selectedSubject: '',
        selectedChapter: null,
        markdownContent: '',
        cleanText: '',
        notes: [], // Array of { head: '', body: '', letter: '', vowel: '' }
        glosse: {}, // marginal glosses { sentence: text }
        leitnerBox: {}, // note index to box mapping { idx: boxNum }
        kramaWords: [],
        jataWords: [],
        jataReverse: false,
        jataTimerInterval: null,
        disputatioTimerInterval: null,
        audioContext: null,
        binauralOscillators: [],
        isPlayingAudio: false,
        xpEarned: 0
    };

    // UI ELEMENTS
    const subjectSelect = document.getElementById('sm-subject-select');
    const chapterSelect = document.getElementById('sm-chapter-select');
    const startBtn = document.getElementById('sm-start-btn');
    const welcomeScreen = document.getElementById('sm-welcome-screen');
    const configPanel = document.querySelector('.sm-config-panel');
    const phaseItems = document.querySelectorAll('.phase-item');
    const phasePanels = document.querySelectorAll('.phase-panel');
    const sushiContent = document.getElementById('sushi-content');
    const nextPhaseBtns = document.querySelectorAll('.next-phase-btn');
    const xpDisplay = document.getElementById('sm-xp-display');

    // --- INITIALIZATION ---
    initSubjectSelectors();
    initPhaseNavigation();
    initBinauralAudio();
    updateXpDisplay();

    // Populate Subjects and Chapters dynamically from searchDatabase
    function initSubjectSelectors() {
        if (typeof searchDatabase === 'undefined') {
            console.error('searchDatabase not found!');
            return;
        }

        // Get unique subjects
        const subjects = {};
        searchDatabase.forEach(item => {
            if (item.subject) {
                // Map subjects to human readable titles
                let subTitle = item.subject.toUpperCase();
                if (item.subject === 'diritto') subTitle = 'Diritto dei Beni Culturali';
                else if (item.subject === 'arte') subTitle = 'Storia dell\'Arte Moderna';
                else if (item.subject === 'arte_romana') subTitle = 'Archeologia ed Arte Romana';
                else if (item.subject === 'storia') subTitle = 'Storia Moderna';
                else if (item.subject === 'codicologia') subTitle = 'Codicologia';
                else if (item.subject === 'cristiana') subTitle = 'Archeologia Cristiana';
                
                subjects[item.subject] = subTitle;
            }
        });

        subjectSelect.innerHTML = '<option value="">-- Seleziona una Materia --</option>';
        Object.entries(subjects).forEach(([key, val]) => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = val;
            subjectSelect.appendChild(opt);
        });

        // Subject Change Listener
        subjectSelect.addEventListener('change', () => {
            const selected = subjectSelect.value;
            state.selectedSubject = selected;
            
            if (!selected) {
                chapterSelect.innerHTML = '<option value="">Seleziona prima una materia</option>';
                chapterSelect.disabled = true;
                return;
            }

            // Filter chapters by subject
            const chapters = searchDatabase.filter(item => item.subject === selected);
            chapterSelect.innerHTML = '<option value="">-- Seleziona un Capitolo --</option>';
            chapters.forEach((ch, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${ch.chapterTag} - ${ch.title}`;
                chapterSelect.appendChild(opt);
            });
            chapterSelect.disabled = false;
        });

        // Start Button
        startBtn.addEventListener('click', async () => {
            const sub = subjectSelect.value;
            const chIdx = chapterSelect.value;
            if (!sub || chIdx === "") {
                alert("Per favore, seleziona sia la materia sia il capitolo da studiare.");
                return;
            }

            const chapterItem = searchDatabase.filter(item => item.subject === sub)[chIdx];
            state.selectedChapter = chapterItem;

            // Load and parse markdown
            await loadChapterMarkdown(chapterItem);
        });
    }

    // Load MD file dynamically
    async function loadChapterMarkdown(chapterItem) {
        // Resolve path to summary markdown
        // e.g. "diritto/index.html?open=summaries/1_patrimonio.md" -> "diritto/summaries/1_patrimonio.md"
        let rawPath = chapterItem.navPath;
        if (!rawPath) {
            alert("Impossibile caricare il capitolo: percorso mancante.");
            return;
        }

        let parts = rawPath.split('?open=');
        if (parts.length < 2) {
            // fallback: check if we can reconstruct
            alert("Percorso non conforme.");
            return;
        }

        let folder = parts[0].substring(0, parts[0].lastIndexOf('/'));
        let mdFile = parts[1];
        let filePath = folder ? `${folder}/${mdFile}` : mdFile;

        startBtn.innerHTML = '⚡ Caricamento...';
        startBtn.disabled = true;

        try {
            const res = await fetch(filePath);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            
            state.markdownContent = text;
            state.glosse = {};
            state.leitnerBox = {};
            // Strip markdown formatting for simpler textual analysis
            state.cleanText = text
                .replace(/[#*`\-]/g, '')
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
                .trim();

            // Preload glosses if codicologia
            if (state.selectedSubject === 'codicologia') {
                Object.entries(preloadedGlosse.codicologia).forEach(([kw, glosText]) => {
                    const sentences = state.cleanText.match(/[^.!?]+[.!?]*/g) || [state.cleanText];
                    const matchedSent = sentences.find(s => s.toLowerCase().includes(kw.toLowerCase()));
                    if (matchedSent) {
                        state.glosse[matchedSent.trim()] = glosText;
                    }
                });
            }

            // Hide Welcome Screen, show Phase 1
            welcomeScreen.style.display = 'none';
            setActivePhase(1);

            // Populate Phase 1: Su Shi Reader
            initSuShiReader();
            renderGlosseList();
            
            // Populate Phase 2 source text
            document.getElementById('lectio-source-text').innerHTML = marked.parse(text);

        } catch (err) {
            console.error(err);
            alert(`Errore nel caricamento della sintesi: ${err.message}. Verifica che il server locale sia attivo.`);
        } finally {
            startBtn.innerHTML = '🏛️ Avvia Studio Max';
            startBtn.disabled = false;
        }
    }

    // --- PHASE NAVIGATION ---
    function initPhaseNavigation() {
        phaseItems.forEach(item => {
            item.addEventListener('click', () => {
                const phaseNum = parseInt(item.getAttribute('data-phase'));
                if (state.selectedChapter) {
                    setActivePhase(phaseNum);
                } else {
                    alert("Seleziona una materia e un capitolo per sbloccare le fasi di studio.");
                }
            });
        });

        // Next buttons inside panels
        nextPhaseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let next = state.activePhase + 1;
                if (next <= 7) {
                    setActivePhase(next);
                } else {
                    // Completed the cycle
                    completeStudyCycle();
                }
            });
        });
    }

    function setActivePhase(phaseNum) {
        state.activePhase = phaseNum;
        
        // Clean timers
        clearInterval(state.jataTimerInterval);
        clearInterval(state.disputatioTimerInterval);
        if (state.isPlayingAudio) {
            toggleBinauralAudio(false);
        }

        // Update sidebar list
        phaseItems.forEach(item => {
            const num = parseInt(item.getAttribute('data-phase'));
            item.classList.remove('active');
            if (num === phaseNum) {
                item.classList.add('active');
            } else if (num < phaseNum) {
                item.classList.add('completed');
            }
        });

        // Update panels view
        phasePanels.forEach(panel => panel.classList.remove('active'));
        const activePanel = document.getElementById(`panel-phase-${phaseNum}`);
        if (activePanel) {
            activePanel.classList.add('active');
        }

        // Specific Phase Activations
        if (phaseNum === 3) {
            initLockeIndexer();
        } else if (phaseNum === 4) {
            initPathasGame();
        } else if (phaseNum === 5) {
            initSpatialPanel();
        } else if (phaseNum === 6) {
            initLeitnerBoxes();
        } else if (phaseNum === 7) {
            initDisputatioChat();
        }
    }

    // --- FASE 1: SU SHI MULTI-PASS READER ---
    function initSuShiReader() {
        const filterBtns = document.querySelectorAll('#panel-phase-1 .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applySuShiFilter(btn.getAttribute('data-filter'));
            });
        });

        // Initialize with Conceptual Filter
        applySuShiFilter('conceptual');
    }

    function applySuShiFilter(filterType) {
        if (!state.markdownContent) return;

        // Render standard HTML using marked
        let rawHtml = marked.parse(state.markdownContent);
        
        // Create an offline container to parse and manipulate DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHtml;

        // Helper to process text nodes
        function traverseAndApply(node, filterFn) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (!text.trim()) return;

                // Split text into sentences for fine-grained highlighting
                const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
                const spanContainer = document.createElement('span');

                sentences.forEach(sentence => {
                    const cleanSentence = sentence.trim();
                    if (!cleanSentence) return;

                    const matchesFilter = filterFn(cleanSentence);
                    const sentenceSpan = document.createElement('span');
                    sentenceSpan.textContent = sentence;

                    if (matchesFilter) {
                        sentenceSpan.className = 'sushi-text-highlight';
                        sentenceSpan.style.cursor = 'pointer';
                        sentenceSpan.addEventListener('click', (e) => {
                            e.stopPropagation();
                            addGlossaToSentence(cleanSentence);
                        });
                    } else {
                        sentenceSpan.className = 'sushi-text-dimmed';
                    }
                    spanContainer.appendChild(sentenceSpan);
                });

                node.replaceWith(spanContainer);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip script or style nodes
                if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
                
                // For headers and lists, we might have specific rules
                Array.from(node.childNodes).forEach(child => traverseAndApply(child, filterFn));
            }
        }

        // Define filter criteria
        let filterFn;
        if (filterType === 'conceptual') {
            // Definizioni teoriche: parole chiave, grassetti, verbi copulativi
            filterFn = (s) => {
                const copulativi = /\b(è|sono|definisce|consiste in|rappresenta|costituisce|significa)\b/i;
                const importances = /importanza|essenziale|fondamentale|principale|chiave/i;
                return copulativi.test(s) || importances.test(s);
            };
        } else if (filterType === 'evidential') {
            // Fatti, cifre, date, citazioni
            filterFn = (s) => {
                const datesAndNumbers = /\b(1\d{3}|20\d{2})\b|\d+%|\d+\s*(milioni|miliardi|euro|art)/i;
                const capitalNames = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/; // proper nouns
                const quotes = /["'«»“”]/;
                return datesAndNumbers.test(s) || capitalNames.test(s) || quotes.test(s);
            };
        } else if (filterType === 'methodological') {
            // Elenchi, passaggi, riparti, comparazioni
            filterFn = (s) => {
                const stepsAndLists = /^\d+\.|\b(fasi|passaggi|procedimento|metodo|procedura|sistema|regola)\b/i;
                const comparatives = /\b(rispetto a|mentre|differenza|invece|sebbene|tuttavia|analogo)\b/i;
                return stepsAndLists.test(s) || comparatives.test(s);
            };
        }

        // Traverse elements
        Array.from(tempDiv.childNodes).forEach(node => traverseAndApply(node, filterFn));
        sushiContent.innerHTML = tempDiv.innerHTML;
    }

    // --- FASE 2: LECTIO DIVINA SCRIPTORIUM ---
    let currentLectioStep = 1;
    const lstepPanels = document.querySelectorAll('.lstep-panel');
    const lstepNodes = document.querySelectorAll('.lectio-step-node');
    const lectioPrevBtn = document.getElementById('lectio-prev-btn');
    const lectioNextBtn = document.getElementById('lectio-next-btn');
    const notesInput = document.getElementById('lectio-notes-input');
    const summaryInput = document.getElementById('lectio-summary-input');
    const timerFill = document.querySelector('.lectio-timer-progress');
    const timerText = document.getElementById('lectio-timer-text');
    let lectioTimer = null;

    lectioNextBtn.addEventListener('click', () => {
        if (currentLectioStep === 4) {
            if (!validateFeynmanStep()) return;
        }

        if (currentLectioStep < 5) {
            setLectioStep(currentLectioStep + 1);
        } else {
            // Proceed to Phase 3
            setActivePhase(3);
        }
    });

    lectioPrevBtn.addEventListener('click', () => {
        if (currentLectioStep > 1) {
            setLectioStep(currentLectioStep - 1);
        }
    });

    function setLectioStep(step) {
        currentLectioStep = step;
        
        // Update nodes UI
        lstepNodes.forEach(node => {
            const sNum = parseInt(node.getAttribute('data-lstep'));
            node.classList.remove('active');
            if (sNum === step) {
                node.classList.add('active');
            } else if (sNum < step) {
                node.classList.add('completed');
            }
        });

        // Show proper panel
        lstepPanels.forEach(panel => panel.style.display = 'none');
        document.getElementById(`lstep-content-${step}`).style.display = 'block';

        // Nav Buttons State
        lectioPrevBtn.disabled = step === 1;
        lectioNextBtn.textContent = step === 5 ? "Completa Fase ➔" : "Avanti ▶";

        // Stop timer if leaving Step 5
        clearInterval(lectioTimer);
        if (step !== 5 && state.isPlayingAudio) {
            toggleBinauralAudio(false);
        }

        // Specific actions
        if (step === 2) {
            // Auto populate some notes from text if empty
            if (!notesInput.value.trim()) {
                generatePlaceholderNotes();
            }
        } else if (step === 4) {
            // Feynman Step: populate concept
            parseNotes();
            const concept = state.notes[0]?.head || "Codicologia";
            document.getElementById('feynman-concept-name').textContent = "Concetto da semplificare: " + concept;
            document.getElementById('lectio-feynman-input').value = '';
            document.getElementById('feynman-feedback').textContent = '';
        } else if (step === 5) {
            startContemplatioTimer();
        }
    }

    function generatePlaceholderNotes() {
        // Extract words or key phrases to make notes automatic if user doesn't write anything
        let generated = "";
        const lines = state.cleanText.split(/[.!?]/);
        let count = 0;
        for (let line of lines) {
            line = line.trim();
            if (line.length > 30 && line.includes(' è ')) {
                let parts = line.split(' è ');
                let head = parts[0].trim().split(' ').pop(); // last word of subject usually
                head = head.charAt(0).toUpperCase() + head.slice(1);
                
                // sanitize head
                head = head.replace(/[^a-zA-Z]/g, "");
                if (head.length > 2) {
                    generated += `${head}: è ${parts[1].trim()}.\n`;
                    count++;
                }
            }
            if (count >= 5) break;
        }

        // fallback if nothing extracted
        if (!generated) {
            if (state.selectedSubject === 'codicologia') {
                generated = "Pergamena: Pelle animale calcinata e tesa per scrivere.\nPalinsesto: Codice rescritto e lavato per riutilizzo.\nPecia: Sistema universitario medievale di copia a fascicoli.\nFiligrana: Marchio nella carta umida visibile controluce.\nLegatura: Cucitura dei fascicoli e copertina protettiva del libro.";
            } else {
                generated = "Costituzione: Legge fondamentale approvata nel 1947.\nBeniCulturali: Cose mobili e immobili che presentano interesse artistico.\nTutela: Attività dirette a individuare e conservare il patrimonio.";
            }
        }
        notesInput.value = generated;
    }

    function startContemplatioTimer() {
        let timeLeft = 60;
        timerText.textContent = "01:00";
        timerFill.style.strokeDashoffset = 0;
        
        // Audio auto-play theta waves for memory consolidation
        toggleBinauralAudio(true);

        lectioTimer = setInterval(() => {
            timeLeft--;
            let mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            let secs = String(timeLeft % 60).padStart(2, '0');
            timerText.textContent = `${mins}:${secs}`;

            // Update SVG circle
            let dashoffset = 477.5 * (1 - timeLeft / 60);
            if (timerFill) timerFill.style.strokeDashoffset = dashoffset;

            if (timeLeft <= 0) {
                clearInterval(lectioTimer);
                toggleBinauralAudio(false);
                alert("Consolidamento contemplativo completato! Il cervello ha riposato a sufficienza. Procediamo all'indicizzazione.");
            }
        }, 1000);
    }

    // --- BINAURAL AUDIO CONTEXT GENERATOR ---
    function initBinauralAudio() {
        const audioBtn = document.getElementById('binaural-btn');
        if (!audioBtn) return;

        audioBtn.addEventListener('click', () => {
            toggleBinauralAudio(!state.isPlayingAudio);
        });
    }

    function toggleBinauralAudio(play) {
        const audioBtn = document.getElementById('binaural-btn');
        
        if (play) {
            try {
                if (!state.audioContext) {
                    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                if (state.audioContext.state === 'suspended') {
                    state.audioContext.resume();
                }

                // Theta waves binaural beats: 100Hz (left ear) & 104Hz (right ear) -> 4Hz beat
                const merger = state.audioContext.createChannelMerger(2);
                
                // Left Osc
                const oscLeft = state.audioContext.createOscillator();
                oscLeft.frequency.value = 100;
                const gainLeft = state.audioContext.createGain();
                gainLeft.gain.value = 0.15;
                oscLeft.connect(gainLeft);
                gainLeft.connect(merger, 0, 0);

                // Right Osc
                const oscRight = state.audioContext.createOscillator();
                oscRight.frequency.value = 104;
                const gainRight = state.audioContext.createGain();
                gainRight.gain.value = 0.15;
                oscRight.connect(gainRight);
                gainRight.connect(merger, 0, 1);

                // Add a low filter low noise ambient hum
                const lowHum = state.audioContext.createOscillator();
                lowHum.type = 'triangle';
                lowHum.frequency.value = 50; // Deep meditation rumble
                const humGain = state.audioContext.createGain();
                humGain.gain.value = 0.05;
                lowHum.connect(humGain);
                humGain.connect(state.audioContext.destination);

                merger.connect(state.audioContext.destination);

                oscLeft.start();
                oscRight.start();
                lowHum.start();

                state.binauralOscillators = [oscLeft, oscRight, lowHum];
                state.isPlayingAudio = true;
                if (audioBtn) {
                    audioBtn.textContent = '⏸ Interrompi Suono';
                    audioBtn.classList.remove('secondary');
                }
            } catch (err) {
                console.error("Audio Context failed to start:", err);
            }
        } else {
            state.binauralOscillators.forEach(osc => {
                try { osc.stop(); } catch(e) {}
            });
            state.binauralOscillators = [];
            state.isPlayingAudio = false;
            if (audioBtn) {
                audioBtn.textContent = '🔊 Attiva Suono Ambientale';
                audioBtn.classList.add('secondary');
            }
        }
    }

    // --- FASE 3: LOCKE INDEXER ---
    function initLockeIndexer() {
        // Parse notes written in textarea
        parseNotes();

        // Render Locke Grid table cells
        const tbody = document.getElementById('locke-grid-body');
        tbody.innerHTML = '';

        // Standard letters to include in Locke's 25 rows
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        
        // Find which alphabet rows actually contain notes to highlight
        const activeRows = new Set(state.notes.map(n => n.letter));

        alphabets.forEach(letter => {
            // Locke's index skips less frequent letters, but we can list them all or focus on active ones.
            // Let's list all letters, but dynamically style them if active.
            const tr = document.createElement('tr');
            
            const letterTd = document.createElement('td');
            letterTd.textContent = letter;
            letterTd.style.fontWeight = '700';
            if (activeRows.has(letter)) {
                letterTd.style.color = 'var(--sm-accent)';
            }
            tr.appendChild(letterTd);

            const vowels = ['A', 'E', 'I', 'O', 'U'];
            vowels.forEach(vow => {
                const td = document.createElement('td');
                td.className = 'locke-cell';
                td.setAttribute('data-letter', letter);
                td.setAttribute('data-vowel', vow);
                
                // Count notes in this cell
                const matchedNotes = state.notes.filter(n => n.letter === letter && n.vowel === vow);
                if (matchedNotes.length > 0) {
                    td.classList.add('has-notes');
                    td.innerHTML = `${matchedNotes.length}<span class="locke-cell-count">${vow.toLowerCase()}</span>`;
                } else {
                    td.innerHTML = `<span style="opacity: 0.15;">-</span>`;
                }

                td.addEventListener('click', () => {
                    displayLockeNotes(letter, vow);
                });

                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        // Pre-select first cell with notes if any
        if (state.notes.length > 0) {
            const firstActive = state.notes[0];
            displayLockeNotes(firstActive.letter, firstActive.vowel);
        }
    }

    function parseNotes() {
        const text = notesInput.value;
        const lines = text.split('\n');
        state.notes = [];

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            let head = '';
            let body = '';
            
            if (line.includes(':')) {
                let parts = line.split(':');
                head = parts[0].trim();
                body = parts.slice(1).join(':').trim();
            } else {
                // fallback
                let words = line.split(' ');
                head = words[0].replace(/[^a-zA-Z]/g, '');
                body = line;
            }

            if (!head) return;

            // Locke Coordinate calculations
            const cleanHead = head.replace(/[^a-zA-Z]/g, '');
            const firstLetter = cleanHead.charAt(0).toUpperCase();
            
            // Find first vowel *after* first letter
            let firstVowel = 'A';
            const vowels = ['A', 'E', 'I', 'O', 'U'];
            for (let i = 1; i < cleanHead.length; i++) {
                let char = cleanHead.charAt(i).toUpperCase();
                if (vowels.includes(char)) {
                    firstVowel = char;
                    break;
                }
            }

            state.notes.push({
                head: head,
                body: body,
                letter: firstLetter,
                vowel: firstVowel
            });
        });
    }

    function displayLockeNotes(letter, vowel) {
        // Highlight active grid cell
        const cells = document.querySelectorAll('.locke-cell');
        cells.forEach(c => {
            c.style.boxShadow = 'none';
            c.style.borderColor = 'var(--sm-card-border)';
            if (c.getAttribute('data-letter') === letter && c.getAttribute('data-vowel') === vowel) {
                c.style.boxShadow = '0 0 10px var(--sm-glow-color)';
                c.style.borderColor = 'var(--sm-accent)';
            }
        });

        const panelTitle = document.getElementById('locke-selected-cell-title');
        const notesList = document.getElementById('locke-notes-list');

        panelTitle.textContent = `Indice Locke: Casella ${letter} - ${vowel}`;
        
        const matched = state.notes.filter(n => n.letter === letter && n.vowel === vowel);
        if (matched.length === 0) {
            notesList.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Nessuna nota archiviata sotto questa coordinata.</span>`;
            return;
        }

        notesList.innerHTML = '';
        matched.forEach((note, idx) => {
            const card = document.createElement('div');
            card.className = 'locke-note-card';
            
            // Backlinks generation
            // Scan other notes to see if their "Head" is mentioned in this note body
            const backlinks = [];
            state.notes.forEach(other => {
                if (other.head !== note.head && note.body.toLowerCase().includes(other.head.toLowerCase())) {
                    backlinks.push(other);
                }
            });

            // Double links (vide v. chronological chain)
            let prevNode = '';
            let nextNode = '';
            let globalIdx = state.notes.indexOf(note);
            if (globalIdx > 0) prevNode = state.notes[globalIdx - 1].head;
            if (globalIdx < state.notes.length - 1) nextNode = state.notes[globalIdx + 1].head;

            let backlinksHtml = '';
            if (backlinks.length > 0) {
                backlinksHtml = `
                    <div class="locke-note-links">
                        <span>🔗 Collegato a:</span>
                        ${backlinks.map(b => `<span class="locke-note-link-tag" onclick="jumpToLockeCell('${b.letter}', '${b.vowel}')">${b.head}</span>`).join(', ')}
                    </div>
                `;
            }

            let chainHtml = '';
            if (prevNode || nextNode) {
                chainHtml = `
                    <div class="locke-note-links" style="border-top: 1px solid rgba(255,255,255,0.03); padding-top: 0.4rem; margin-top: 0.4rem;">
                        ${prevNode ? `<span>⬅ v. precedente: <strong style="color:var(--text-secondary);">${prevNode}</strong></span>` : ''}
                        ${nextNode ? `<span style="margin-left:auto;">v. successivo: <strong style="color:var(--text-secondary);">${nextNode}</strong> ➡</span>` : ''}
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="locke-note-head">
                    <span>${note.head}</span>
                    <span style="font-size:0.75rem; color:var(--text-muted);">ID: #${globalIdx+1}</span>
                </div>
                <p style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.5;">${note.body}</p>
                <div style="margin-top: 0.5rem; display:flex; gap:0.5rem;">
                    <button class="sm-btn secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; display:inline-flex; align-items:center; gap:0.3rem;" onclick="showRicciMnemonic('${note.head.replace(/'/g, "\\'")}')">
                        🏮 Immagine Ricci
                    </button>
                </div>
                ${backlinksHtml}
                ${chainHtml}
            `;
            notesList.appendChild(card);
        });
    }

    // Expose jump function to window so click on backlinks works
    window.jumpToLockeCell = function(letter, vowel) {
        displayLockeNotes(letter, vowel);
    };

    // --- FASE 4: PATHAS VEDICI ---
    const kramaBtn = document.getElementById('pathas-krama-btn');
    const jataBtn = document.getElementById('pathas-jata-btn');
    const kramaPanel = document.getElementById('game-krama-panel');
    const jataPanel = document.getElementById('game-jata-panel');
    const kramaDropzone = document.getElementById('krama-dropzone');
    const kramaPool = document.getElementById('krama-pool');
    const jataDropzone = document.getElementById('jata-dropzone');
    const jataPool = document.getElementById('jata-pool');
    const jataDirectionBox = document.getElementById('jata-direction-box');
    const gameFeedback = document.getElementById('pathas-game-feedback');

    kramaBtn.addEventListener('click', () => {
        kramaBtn.classList.add('active');
        jataBtn.classList.remove('active');
        kramaPanel.style.display = 'block';
        jataPanel.style.display = 'none';
        initKramaGame();
    });

    jataBtn.addEventListener('click', () => {
        jataBtn.classList.add('active');
        kramaBtn.classList.remove('active');
        jataPanel.style.display = 'block';
        kramaPanel.style.display = 'none';
        initJataGame();
    });

    function initPathasGame() {
        // Init Krama by default
        initKramaGame();
    }

    // Get a key sentence from user notes or fallback
    function getGameSentence() {
        if (state.notes.length > 0) {
            // Find a note with a reasonable size sentence
            const suitable = state.notes.find(n => n.body.split(' ').length >= 4 && n.body.split(' ').length <= 10);
            if (suitable) return `${suitable.head} ${suitable.body}`.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        }
        
        // Fallbacks per materia
        if (state.selectedSubject === 'diritto') {
            return "La Costituzione italiana garantisce la tutela del paesaggio";
        } else if (state.selectedSubject === 'arte') {
            return "Brunelleschi inventò la prospettiva lineare a specchio geometrico";
        }
        return "Lo studio accademico richiede rigore logico e memorizzazione spaziale";
    }

    // 1. KRAMA PATHA (AB, BC, CD)
    function initKramaGame() {
        gameFeedback.textContent = '';
        kramaDropzone.innerHTML = '';
        kramaPool.innerHTML = '';

        const sentence = getGameSentence();
        const words = sentence.split(/\s+/).filter(w => w.trim());
        
        // Create pairs AB, BC, CD...
        const pairs = [];
        for (let i = 0; i < words.length - 1; i++) {
            pairs.push(`${words[i]} ${words[i+1]}`);
        }

        // Shuffle pairs
        const shuffled = [...pairs].sort(() => Math.random() - 0.5);

        // Render dropzone targets
        pairs.forEach((_, idx) => {
            const target = document.createElement('div');
            target.className = 'pathas-dropzone-target';
            target.style.width = '140px';
            target.style.height = '44px';
            target.style.border = '1px dashed var(--sm-card-border)';
            target.style.borderRadius = '8px';
            target.style.display = 'flex';
            target.style.alignItems = 'center';
            target.style.justifyContent = 'center';
            target.style.fontSize = '0.85rem';
            target.style.color = 'var(--text-muted)';
            target.textContent = `Coppia ${idx + 1}`;
            target.setAttribute('data-correct-pair', pairs[idx]);
            
            // Drag and drop listeners
            target.addEventListener('dragover', e => e.preventDefault());
            target.addEventListener('drop', e => {
                e.preventDefault();
                const pairText = e.dataTransfer.getData('text/plain');
                
                // Remove from previous parent if any
                const existingToken = document.querySelector(`.pathas-token[data-pair="${pairText}"]`);
                if (existingToken) existingToken.remove();

                const token = createToken(pairText);
                target.innerHTML = '';
                target.appendChild(token);
                checkKramaProgress();
            });

            // Click to drop selected token (touchscreen support)
            target.addEventListener('click', () => {
                const selected = document.querySelector('.pathas-token.selected');
                if (selected && selected.getAttribute('data-pair')) {
                    const prevToken = target.querySelector('.pathas-token');
                    if (prevToken && prevToken !== selected) {
                        prevToken.classList.remove('selected');
                        kramaPool.appendChild(prevToken);
                    }
                    selected.classList.remove('selected');
                    target.innerHTML = '';
                    target.appendChild(selected);
                    restoreKramaPlaceholders();
                    checkKramaProgress();
                }
            });

            kramaDropzone.appendChild(target);
        });

        // Render pool
        shuffled.forEach(pairText => {
            const token = createToken(pairText);
            kramaPool.appendChild(token);
        });

        // Click listener on pool to return items (touchscreen support)
        kramaPool.addEventListener('click', () => {
            const selected = document.querySelector('.pathas-token.selected');
            if (selected && selected.getAttribute('data-pair')) {
                if (selected.parentElement !== kramaPool) {
                    selected.classList.remove('selected');
                    kramaPool.appendChild(selected);
                    restoreKramaPlaceholders();
                    checkKramaProgress();
                }
            }
        });
    }

    function createToken(text) {
        const token = document.createElement('div');
        token.className = 'pathas-token';
        token.textContent = text;
        token.draggable = true;
        token.setAttribute('data-pair', text);
        
        token.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', text);
        });

        // Add selection listener
        token.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.pathas-token').forEach(t => {
                if (t !== token) t.classList.remove('selected');
            });
            token.classList.toggle('selected');
        });

        return token;
    }

    function restoreKramaPlaceholders() {
        const targets = document.querySelectorAll('.pathas-dropzone-target');
        targets.forEach((t, tIdx) => {
            if (t.children.length === 0) {
                t.textContent = `Coppia ${tIdx + 1}`;
            }
        });
    }

    function checkKramaProgress() {
        const targets = document.querySelectorAll('.pathas-dropzone-target');
        let allCorrect = true;
        let filledCount = 0;

        targets.forEach(target => {
            const token = target.querySelector('.pathas-token');
            if (token) {
                filledCount++;
                const correct = target.getAttribute('data-correct-pair');
                if (token.textContent === correct) {
                    token.classList.add('correct');
                    token.classList.remove('incorrect');
                } else {
                    token.classList.add('incorrect');
                    token.classList.remove('correct');
                    allCorrect = false;
                }
            } else {
                allCorrect = false;
            }
        });

        if (allCorrect && filledCount === targets.length) {
            gameFeedback.textContent = "✨ Krama Patha completato con successo! Le coppie sequenziali sono collegate perfettamente.";
            gameFeedback.style.color = "var(--accent-green)";
        } else {
            gameFeedback.textContent = '';
        }
    }

    // 2. JATA PATHA (Direct & Reverse under time pressure)
    function initJataGame() {
        gameFeedback.textContent = '';
        jataDropzone.innerHTML = '';
        jataPool.innerHTML = '';
        state.jataReverse = false;
        jataDirectionBox.textContent = "ORDINE DIRETTO (Avanti)";
        jataDirectionBox.style.background = "var(--sm-badge-bg)";
        jataDirectionBox.style.color = "var(--sm-accent)";

        const sentence = getGameSentence();
        state.jataWords = sentence.split(/\s+/).filter(w => w.trim());
        
        setupJataRound();
    }

    function createJataToken(word) {
        const token = document.createElement('div');
        token.className = 'pathas-token';
        token.textContent = word;
        token.draggable = true;
        token.setAttribute('data-word', word);
        
        token.addEventListener('dragstart', ev => {
            ev.dataTransfer.setData('text/plain', word);
        });

        token.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.pathas-token').forEach(t => {
                if (t !== token) t.classList.remove('selected');
            });
            token.classList.toggle('selected');
        });

        return token;
    }

    function restoreJataPlaceholders() {
        const targets = document.querySelectorAll('.jata-dropzone-target');
        targets.forEach(t => {
            if (t.children.length === 0) {
                t.innerHTML = `<span style="opacity: 0.15;">-</span>`;
            }
        });
    }

    function setupJataRound() {
        jataDropzone.innerHTML = '';
        jataPool.innerHTML = '';
        clearInterval(state.jataTimerInterval);

        // Shuffled pool
        const shuffled = [...state.jataWords].sort(() => Math.random() - 0.5);

        // Render drop targets
        state.jataWords.forEach((_, idx) => {
            const target = document.createElement('div');
            target.className = 'jata-dropzone-target';
            target.style.width = '90px';
            target.style.height = '40px';
            target.style.border = '1px dashed var(--sm-card-border)';
            target.style.borderRadius = '8px';
            target.style.display = 'flex';
            target.style.alignItems = 'center';
            target.style.justifyContent = 'center';
            target.style.fontSize = '0.9rem';
            target.setAttribute('data-index', idx);

            target.addEventListener('dragover', e => e.preventDefault());
            target.addEventListener('drop', e => {
                e.preventDefault();
                const word = e.dataTransfer.getData('text/plain');
                
                // remove previous
                const existing = document.querySelector(`.pathas-token[data-word="${word}"]`);
                if (existing) existing.remove();

                const token = createJataToken(word);
                target.innerHTML = '';
                target.appendChild(token);
                restoreJataPlaceholders();
                checkJataProgress();
            });

            // Click to drop selected token (touchscreen support)
            target.addEventListener('click', () => {
                const selected = document.querySelector('.pathas-token.selected');
                if (selected && selected.getAttribute('data-word')) {
                    const prevToken = target.querySelector('.pathas-token');
                    if (prevToken && prevToken !== selected) {
                        prevToken.classList.remove('selected');
                        jataPool.appendChild(prevToken);
                    }
                    selected.classList.remove('selected');
                    target.innerHTML = '';
                    target.appendChild(selected);
                    restoreJataPlaceholders();
                    checkJataProgress();
                }
            });

            jataDropzone.appendChild(target);
        });

        // Pool tokens
        shuffled.forEach(w => {
            const token = createJataToken(w);
            jataPool.appendChild(token);
        });

        // Click listener on pool to return items (touchscreen support)
        jataPool.addEventListener('click', () => {
            const selected = document.querySelector('.pathas-token.selected');
            if (selected && selected.getAttribute('data-word')) {
                if (selected.parentElement !== jataPool) {
                    selected.classList.remove('selected');
                    jataPool.appendChild(selected);
                    restoreJataPlaceholders();
                    checkJataProgress();
                }
            }
        });

        // Jata Timer: 15 seconds
        let timeLeft = 15;
        const timerFillBar = document.getElementById('jata-timer');
        timerFillBar.style.width = '100%';

        state.jataTimerInterval = setInterval(() => {
            timeLeft--;
            timerFillBar.style.width = `${(timeLeft / 15) * 100}%`;
            
            if (timeLeft <= 0) {
                clearInterval(state.jataTimerInterval);
                gameFeedback.textContent = "⏱️ Tempo scaduto! La recitazione vedica richiede una transizione rapida. Riprova.";
                gameFeedback.style.color = "var(--accent-terracotta)";
                // Disable drags
                document.querySelectorAll('.pathas-token').forEach(t => t.draggable = false);
            }
        }, 1000);
    }

    function checkJataProgress() {
        const targets = document.querySelectorAll('.jata-dropzone-target');
        let allCorrect = true;
        let filledCount = 0;

        targets.forEach((target, idx) => {
            const token = target.querySelector('.pathas-token');
            if (token) {
                filledCount++;
                // Target word depends on direction
                const correctWord = state.jataReverse 
                    ? state.jataWords[state.jataWords.length - 1 - idx]
                    : state.jataWords[idx];

                if (token.textContent === correctWord) {
                    token.classList.add('correct');
                    token.classList.remove('incorrect');
                } else {
                    token.classList.add('incorrect');
                    token.classList.remove('correct');
                    allCorrect = false;
                }
            } else {
                allCorrect = false;
            }
        });

        if (allCorrect && filledCount === targets.length) {
            clearInterval(state.jataTimerInterval);
            if (!state.jataReverse) {
                // Completed Forward round, now launch Reverse!
                state.jataReverse = true;
                setTimeout(() => {
                    jataDirectionBox.textContent = "🔄 ORDINE INVERSO (All'indietro!)";
                    jataDirectionBox.style.background = "rgba(200, 90, 50, 0.15)";
                    jataDirectionBox.style.color = "var(--accent-terracotta)";
                    setupJataRound();
                }, 1200);
            } else {
                // Completed Jata successfully
                gameFeedback.textContent = "✨ Algoritmo Jata Patha completato! Il cervello ha memorizzato la sequenza bidirezionalmente.";
                gameFeedback.style.color = "var(--accent-green)";
            }
        }
    }

    // --- FASE 5: MAPPE SPAZIALI (SONGLINES & LUKASA) ---
    const lukasaBtn = document.getElementById('spatial-lukasa-btn');
    const songlineBtn = document.getElementById('spatial-songline-btn');
    const lukasaPanel = document.getElementById('lukasa-panel');
    const songlinePanel = document.getElementById('songline-panel');
    
    lukasaBtn.addEventListener('click', () => {
        lukasaBtn.classList.add('active');
        songlineBtn.classList.remove('active');
        lukasaPanel.style.display = 'block';
        songlinePanel.style.display = 'none';
        initLukasaBoard();
    });

    songlineBtn.addEventListener('click', () => {
        songlineBtn.classList.add('active');
        lukasaBtn.classList.remove('active');
        songlinePanel.style.display = 'block';
        lukasaPanel.style.display = 'none';
        initSonglinePath();
    });

    function initSpatialPanel() {
        initLukasaBoard();
    }

    // 1. LUKASA BOARD
    let selectedBead = null;
    let lukasaLinks = []; // array of pairs [bead1Index, bead2Index]

    function initLukasaBoard() {
        const container = document.getElementById('lukasa-container');
        const svg = document.getElementById('lukasa-svg');
        
        // Remove existing beads
        container.querySelectorAll('.lukasa-bead').forEach(b => b.remove());
        svg.innerHTML = '';
        selectedBead = null;

        // If no notes, generate default nodes
        if (state.notes.length === 0) {
            parseNotes();
        }

        const nodesToRender = state.notes.slice(0, 10); // cap at 10 for spacing

        // Colors for beads
        const colors = ['#d4af37', '#06b6d4', '#a855f7', '#10b981', '#3b82f6', '#c85a32'];

        nodesToRender.forEach((note, idx) => {
            const bead = document.createElement('div');
            bead.className = 'lukasa-bead';
            bead.textContent = note.head.substring(0, 2);
            bead.title = `${note.head}: ${note.body}`;
            bead.setAttribute('data-index', idx);
            bead.style.background = colors[idx % colors.length];

            // Random positioning on the wood tablet
            const x = 50 + Math.random() * (container.clientWidth - 100);
            const y = 50 + Math.random() * (300);
            bead.style.left = `${x}px`;
            bead.style.top = `${y}px`;

            // Dragging variables
            let isDragging = false;
            let startX, startY;

            bead.addEventListener('mousedown', e => {
                isDragging = true;
                startX = e.clientX - bead.offsetLeft;
                startY = e.clientY - bead.offsetTop;
                bead.style.cursor = 'grabbing';
                
                // Select bead to draw links
                if (selectedBead === null) {
                    selectedBead = bead;
                    bead.style.outline = '3px solid #fff';
                } else if (selectedBead !== bead) {
                    // Create link between selectedBead and this bead
                    const b1Idx = parseInt(selectedBead.getAttribute('data-index'));
                    const b2Idx = idx;
                    
                    // Avoid duplicates
                    const linkExists = lukasaLinks.some(l => (l[0] === b1Idx && l[1] === b2Idx) || (l[0] === b2Idx && l[1] === b1Idx));
                    if (!linkExists) {
                        lukasaLinks.push([b1Idx, b2Idx]);
                        drawLukasaLines();
                    }

                    selectedBead.style.outline = 'none';
                    selectedBead = null;
                } else {
                    bead.style.outline = 'none';
                    selectedBead = null;
                }
            });

            document.addEventListener('mousemove', e => {
                if (!isDragging) return;
                let nx = e.clientX - startX;
                let ny = e.clientY - startY;

                // constrain
                nx = Math.max(10, Math.min(container.clientWidth - 38, nx));
                ny = Math.max(10, Math.min(container.clientHeight - 38, ny));

                bead.style.left = `${nx}px`;
                bead.style.top = `${ny}px`;
                drawLukasaLines();
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    bead.style.cursor = 'pointer';
                }
            });

            // Double click to view details
            bead.addEventListener('dblclick', () => {
                alert(`📌 [${note.head}]\n${note.body}`);
            });

            // Touch events for tablets (Haptic simulation, link creation and double tap details)
            let lastTapTime = 0;
            bead.addEventListener('touchstart', e => {
                const touch = e.touches[0];
                isDragging = true;
                startX = touch.clientX - bead.offsetLeft;
                startY = touch.clientY - bead.offsetTop;
                
                // Select bead to draw links (touch counterpart of mousedown)
                if (selectedBead === null) {
                    selectedBead = bead;
                    bead.style.outline = '3px solid #fff';
                } else if (selectedBead !== bead) {
                    const b1Idx = parseInt(selectedBead.getAttribute('data-index'));
                    const b2Idx = idx;
                    
                    const linkExists = lukasaLinks.some(l => (l[0] === b1Idx && l[1] === b2Idx) || (l[0] === b2Idx && l[1] === b1Idx));
                    if (!linkExists) {
                        lukasaLinks.push([b1Idx, b2Idx]);
                        drawLukasaLines();
                    }

                    selectedBead.style.outline = 'none';
                    selectedBead = null;
                } else {
                    bead.style.outline = 'none';
                    selectedBead = null;
                }

                // Double tap simulation to view details on touch screens
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTapTime;
                if (tapLength < 300 && tapLength > 0) {
                    e.preventDefault();
                    alert(`📌 [${note.head}]\n${note.body}`);
                }
                lastTapTime = currentTime;

                if (navigator.vibrate) navigator.vibrate(20);
            });

            bead.addEventListener('touchmove', e => {
                if (!isDragging) return;
                e.preventDefault(); // Prevent page scroll/bounce when dragging beads on touchscreens
                const touch = e.touches[0];
                let nx = touch.clientX - startX;
                let ny = touch.clientY - startY;

                nx = Math.max(10, Math.min(container.clientWidth - 38, nx));
                ny = Math.max(10, Math.min(container.clientHeight - 38, ny));

                bead.style.left = `${nx}px`;
                bead.style.top = `${ny}px`;
                drawLukasaLines();
            });

            bead.addEventListener('touchend', () => {
                isDragging = false;
            });

            container.appendChild(bead);
        });

        drawLukasaLines();
    }

    function drawLukasaLines() {
        const svg = document.getElementById('lukasa-svg');
        svg.innerHTML = '';
        const beads = document.querySelectorAll('.lukasa-bead');

        lukasaLinks.forEach(link => {
            const b1 = Array.from(beads).find(b => parseInt(b.getAttribute('data-index')) === link[0]);
            const b2 = Array.from(beads).find(b => parseInt(b.getAttribute('data-index')) === link[1]);

            if (b1 && b2) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('class', 'lukasa-connection-line');
                line.setAttribute('x1', b1.offsetLeft + 14);
                line.setAttribute('y1', b1.offsetTop + 14);
                line.setAttribute('x2', b2.offsetLeft + 14);
                line.setAttribute('y2', b2.offsetTop + 14);
                svg.appendChild(line);
            }
        });
    }

    // 2. SONGLINES PATH
    const stations = document.querySelectorAll('.songline-station');
    let activeStation = 0;

    stations.forEach(station => {
        station.addEventListener('click', () => {
            setSonglineStation(parseInt(station.getAttribute('data-station')));
        });
    });

    function initSonglinePath() {
        const container = document.getElementById('songline-cards-container');
        container.innerHTML = '';

        const activeNotes = state.notes.slice(0, 5); // map to 5 stations
        const landmarks = [
            { name: "1. L'Ingresso del Palazzo", emoji: "🏛️", desc: "Il punto di partenza del tuo viaggio mentale. Associa la prima nota alle grandi colonne di marmo." },
            { name: "2. La Fontana di Bronzo", emoji: "⛲", desc: "Sotto il getto d'acqua che scorre continuo. Mappa qui la seconda definizione." },
            { name: "3. Il Chiostro Antico", emoji: "⛪", desc: "Lungo le arcate silenziose esposte al sole del pomeriggio. Visualizza la terza scheda." },
            { name: "4. L'Albero Secolare", emoji: "🌳", desc: "All'ombra delle fronde della quercia millenaria nel cortile interno." },
            { name: "5. La Biblioteca Capitolare", emoji: "📚", desc: "Tra gli antichi scaffali in legno stracolmi di codici. Il traguardo finale del percorso." }
        ];

        landmarks.forEach((land, idx) => {
            const note = activeNotes[idx] || { head: "Concetto Vuoto", body: "Rivedi le note della Lectio Divina per popolare questa stazione." };
            const card = document.createElement('div');
            card.className = 'songline-card';
            card.id = `songline-card-${idx}`;
            if (idx === activeStation) card.classList.add('active');

            card.innerHTML = `
                <div class="songline-image">${land.emoji}</div>
                <div>
                    <h4 style="font-family:var(--font-serif); color:var(--sm-accent); margin-bottom:0.4rem;">${land.name}</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem; font-style:italic;">${land.desc}</p>
                    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--sm-card-border); padding:1rem; border-radius:10px;">
                        <strong style="color:var(--text-primary); display:block; margin-bottom:0.2rem;">${note.head}</strong>
                        <p style="font-size:0.95rem; line-height:1.4; color:var(--text-primary);">${note.body}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        setSonglineStation(0);
    }

    function setSonglineStation(idx) {
        activeStation = idx;
        
        // Update Stations UI
        stations.forEach(st => {
            const stNum = parseInt(st.getAttribute('data-station'));
            st.classList.remove('active');
            if (stNum === idx) {
                st.classList.add('active');
            } else if (stNum < idx) {
                st.classList.add('completed');
            }
        });

        // Show proper Card
        const cards = document.querySelectorAll('.songline-card');
        cards.forEach(card => card.classList.remove('active'));
        const activeCard = document.getElementById(`songline-card-${idx}`);
        if (activeCard) activeCard.classList.add('active');
    }

    // --- FASE 6: DISPUTATIO AI (CHALLENGE) ---
    const chatBox = document.getElementById('disputatio-chat-box');
    const disputatioInput = document.getElementById('disputatio-text-input');
    const disputatioSendBtn = document.getElementById('disputatio-send-btn');
    const disputatioTimerFill = document.getElementById('disputatio-timer-fill');
    const logicChoices = document.getElementById('disputatio-logic-choices');
    let disputatioStep = 0; // 0: waiting for thesis, 1: thesis stated, 2: debate active
    let activeObjectionIndex = 0;
    
    // Obiezioni locali simulate (in assenza di LLM)
    const localObjections = {
        diritto: [
            { subj: "l'espropriazione", obj: "non tutela il proprietario privato", reason: "consente la sottrazione coatta del bene senza un indennizzo concordato bilateralmente" },
            { subj: "l'Art Bonus", obj: "crea disparità tra i beni culturali", reason: "favorisce l'afflusso di fondi privati solo sui monumenti più popolari a discapito delle aree archeologiche periferiche" },
            { subj: "la tutela statale", obj: "ostacola la fruizione dei beni", reason: "impone vincoli conservativi troppo rigidi che limitano gli interventi di valorizzazione turistica da parte dei comuni" }
        ],
        arte: [
            { subj: "la prospettiva di Brunelleschi", obj: "non rappresenta la realtà ottica oggettiva", reason: "costringe l'occhio umano a un punto di vista fisso e monoculare artificiale che esclude la visione binoculare periferica" },
            { subj: "lo stiacciato di Donatello", obj: "è una tecnica puramente pittorica e non scultorea", reason: "annulla il volume tridimensionale riducendo il rilievo a linee superficiali incise sulla lastra" },
            { subj: "il colorito tonale veneto", obj: "manca di rigore strutturale", reason: "subordina la definizione geometrica del disegno all'atmosfera mutevole prodotta dalle stesure cromatiche" }
        ],
        default: [
            { subj: "il metodo di studio rapido", obj: "compromette la ritenzione a lungo termine", reason: "si focalizza esclusivamente sulla memorizzazione a breve termine per superare la valutazione immediata" }
        ]
    };

    disputatioSendBtn.addEventListener('click', () => {
        handleDisputatioInput();
    });

    disputatioInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleDisputatioInput();
    });

    function initDisputatioChat() {
        chatBox.innerHTML = `
            <div class="chat-bubble bot">
                <strong>Sfidante:</strong> Benvenuto nella Disputatio. Dichiara quale tesi intendi sostenere sul capitolo <strong>${state.selectedChapter ? state.selectedChapter.title : ''}</strong> per avviare il dibattito!
            </div>
        `;
        disputatioInput.placeholder = "Esempio: La tutela dei beni culturali deve prevalere sulla proprietà privata...";
        disputatioInput.style.display = 'block';
        disputatioSendBtn.style.display = 'block';
        logicChoices.style.display = 'none';
        disputatioStep = 0;
        activeObjectionIndex = 0;
        clearInterval(state.disputatioTimerInterval);
        disputatioTimerFill.style.width = '100%';
    }

    function handleDisputatioInput() {
        const text = disputatioInput.value.trim();
        if (!text) return;

        // Append user response
        appendChatMessage(text, 'user');
        disputatioInput.value = '';

        if (disputatioStep === 0) {
            // Thesis stated
            disputatioStep = 1;
            disputatioInput.placeholder = "Scrivi la tua argomentazione di difesa...";
            setTimeout(() => {
                sendTibetanObjection();
            }, 1000);
        } else if (disputatioStep === 1) {
            // Debate active, evaluating defense
            clearInterval(state.disputatioTimerInterval);
            setTimeout(() => {
                evaluateAndReplyDefense(text);
            }, 1000);
        }
    }

    function appendChatMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        
        let prefix = sender === 'bot' ? '<strong>Sfidante:</strong> ' : '<strong>Studente:</strong> ';
        bubble.innerHTML = prefix + text;
        chatBox.appendChild(bubble);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendTibetanObjection() {
        // Load API settings from localStorage
        const engine = localStorage.getItem('lex-oral-ai-engine') || 'local';
        const key = localStorage.getItem('lex-oral-ai-key') || '';
        const model = localStorage.getItem('lex-oral-ai-model') || 'meta-llama/llama-3.1-8b-instruct';

        let objectionText = "";
        let objectionObj = null;

        // Check if we can use LLM
        if (engine !== 'local' && key) {
            appendChatMessage("<em>Lo Sfidante sta elaborando un'obiezione logica...</em>", 'bot');
            try {
                objectionText = await generateLlmObjection(engine, key, model);
                // Remove loading message
                chatBox.lastElementChild.remove();
            } catch (err) {
                console.error("LLM Objection Failed, falling back to local:", err);
                chatBox.lastElementChild.remove();
            }
        }

        // Fallback to local structured database
        if (!objectionText) {
            const list = localObjections[state.selectedSubject] || localObjections.default;
            objectionObj = list[activeObjectionIndex % list.length];
            activeObjectionIndex++;
            objectionText = `Prendi <strong>${objectionObj.subj}</strong>, ne consegue che <strong>${objectionObj.obj}</strong>, poiché <strong>${objectionObj.reason}</strong>.`;
        }

        appendChatMessage(objectionText, 'bot');
        
        // Show logical choices button bar (Accetto, Nessuna Pervasione, etc.)
        logicChoices.style.display = 'flex';
        disputatioInput.style.display = 'none';
        disputatioSendBtn.style.display = 'none';

        // Start 15s Timer
        startDisputatioCountdown();
    }

    // Call LLM API (Gemini or other) for generating objections
    async function generateLlmObjection(engine, key, model) {
        const context = state.notes.map(n => `${n.head}: ${n.body}`).join('\n');
        const prompt = `Sei lo Sfidante in un dibattito logico tibetano su questo argomento d'esame.
Contesto: ${context}

Formula un'obiezione rigorosa e asimmetrica strutturata ESPLICITAMENTE in tre parti in italiano:
"Prendi [soggetto dell'obiezione], ne consegue che [tesi dell'obiezione contraria alla preparazione del candidato], poiché [ragione logica a supporto]."

Sii breve, tagliente e logico. Non aggiungere altre parole.`;

        let textResponse = "";

        if (engine === 'gemini') {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
            const data = await res.json();
            textResponse = data.candidates[0].content.parts[0].text;
        } else if (engine === 'nvidia') {
            const res = await fetch("https://corsproxy.io/?https://integrate.api.nvidia.com/v1/chat/completions", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({
                    model: 'meta/llama-3.1-8b-instruct',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });
            if (!res.ok) throw new Error(`Nvidia NIM HTTP ${res.status}`);
            const data = await res.json();
            textResponse = data.choices[0].message.content;
        } else if (engine === 'openrouter') {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({
                    model: model || 'meta-llama/llama-3.1-8b-instruct',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 150
                })
            });
            if (!res.ok) throw new Error(`OpenRouter HTTP ${res.status}`);
            const data = await res.json();
            textResponse = data.choices[0].message.content;
        }

        return textResponse.trim();
    }

    function startDisputatioCountdown() {
        let timeLeft = 15;
        disputatioTimerFill.style.width = '100%';

        disputatioTimerInterval = setInterval(() => {
            timeLeft--;
            disputatioTimerFill.style.width = `${(timeLeft / 15) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(disputatioTimerInterval);
                appendChatMessage("⏰ <strong>Tempo scaduto!</strong> Sfidante batte le mani e calpesta il terreno! Hai esitato troppo: il Difensore ha perso il dibattito.", 'bot');
                logicChoices.style.display = 'none';
                
                // Allow restarting
                setTimeout(() => {
                    const btn = document.createElement('button');
                    btn.className = 'sm-btn';
                    btn.style.margin = '1rem auto';
                    btn.textContent = '🔄 Riavvia il Dibattito';
                    btn.onclick = initDisputatioChat;
                    chatBox.appendChild(btn);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }, 1000);
            }
        }, 1000);
    }

    // Handle user clicking logical choices
    window.submitDisputatioChoice = function(choice) {
        clearInterval(disputatioTimerInterval);
        
        appendChatMessage(`Dichiaro: <strong>${choice}</strong>`, 'user');
        
        // Hide choices, show text input again for written defense
        logicChoices.style.display = 'none';
        disputatioInput.style.display = 'block';
        disputatioSendBtn.style.display = 'block';
        disputatioInput.focus();

        if (choice === 'Accetto') {
            // Student accepts objection, losing the round
            setTimeout(() => {
                appendChatMessage("Hai accettato l'obiezione dello Sfidante. La tesi iniziale capitola. Sforzati di trovare percorsi alternativi nelle prossime letture!", 'bot');
                completeStudyCycle(false);
            }, 1000);
        } else {
            // User denies, ask for short reason
            disputatioInput.placeholder = choice === 'Nessuna pervasione' 
                ? "Giustifica: perché la conseguenza non regge?"
                : "Giustifica: perché la premessa non è vera?";
        }
    };

    async function evaluateAndReplyDefense(defenseText) {
        // AI evaluates defense
        const engine = localStorage.getItem('lex-oral-ai-engine') || 'local';
        const key = localStorage.getItem('lex-oral-ai-key') || '';

        let response = "";

        if (engine !== 'local' && key) {
            appendChatMessage("<em>Lo Sfidante sta esaminando la difesa...</em>", 'bot');
            try {
                response = await generateLlmEvaluation(engine, key, defenseText);
                chatBox.lastElementChild.remove();
            } catch(e) {
                console.error(e);
                chatBox.lastElementChild.remove();
            }
        }

        if (!response) {
            // Local rule engine responses
            const successProbability = Math.random() > 0.4; // 60% success rate locally
            if (successProbability) {
                response = "La ragione è accettabile. Le pervasione logica è sciolta. Il Difensore vince questa disputa epistemologica!";
                state.xpEarned += 150;
            } else {
                response = "La difesa è insufficiente! Sfidante batte le mani ed evidenzia la contraddizione: 'Il soggetto non esclude il termine correlato'. Riprova ad elaborare la tesi.";
            }
        }

        appendChatMessage(response, 'bot');

        if (response.includes("vince") || response.toLowerCase().includes("accettabile") || response.toLowerCase().includes("congratulazioni")) {
            // Win the debate
            completeStudyCycle(true);
        } else {
            // Ask another objection
            setTimeout(() => {
                sendTibetanObjection();
            }, 2000);
        }
    }

    async function generateLlmEvaluation(engine, key, defenseText) {
        const prompt = `Sei lo Sfidante di un dibattito logico tibetano. Lo studente ha difeso la sua tesi dicendo: "${defenseText}".
Valuta se la sua difesa è sensata e solida dal punto di vista logico ed accademico:
- Se la difesa è valida: rispondi dichiarando che la difesa è solida e dichiara lo studente vincitore della disputa.
- Se la difesa ha falle logiche o è debole: formula una brevissima controrisposta che lo incalza o evidenzia la contraddizione.

Rispondi in massimo 2 frasi in italiano.`;

        let textResponse = "";

        if (engine === 'gemini') {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            textResponse = data.candidates[0].content.parts[0].text;
        } else {
            // fallback
            return "";
        }

        return textResponse.trim();
    }

    // --- FINISH CYCLE AND XP SYNC ---
    function completeStudyCycle(wonDebate = true) {
        clearInterval(state.jataTimerInterval);
        clearInterval(state.disputatioTimerInterval);
        
        let xpGained = 200; // Base completion XP
        if (wonDebate) xpGained += 150; // Bonus for winning debate
        
        // Save points in localStorage (syncing with Lex Studiorum profile)
        let currentPoints = parseInt(localStorage.getItem('lex-total-points') || '0');
        localStorage.setItem('lex-total-points', currentPoints + xpGained);
        updateXpDisplay();

        // Visual alert and congratulations
        const dialog = document.createElement('dialog');
        dialog.style.background = 'rgba(22, 28, 45, 0.95)';
        dialog.style.border = '2px solid var(--sm-accent)';
        dialog.style.borderRadius = '20px';
        dialog.style.padding = '2rem';
        dialog.style.color = 'var(--text-primary)';
        dialog.style.maxWidth = '450px';
        dialog.style.textAlign = 'center';
        dialog.style.margin = 'auto';
        dialog.style.boxShadow = '0 0 30px var(--sm-glow-color)';
        
        dialog.innerHTML = `
            <span style="font-size: 4rem; display: block; margin-bottom: 1rem;">🏆</span>
            <h2 style="font-family: var(--font-serif); color: var(--sm-accent); margin-bottom: 0.5rem;">Laurea ad Honorem in Studio Max</h2>
            <p style="margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">
                Hai completato con successo l'intero ciclo delle 6 tecnologie cognitive storiche per il capitolo <strong>${state.selectedChapter.title}</strong>!
            </p>
            <div style="background: var(--sm-badge-bg); border-radius: 10px; padding: 0.8rem; font-weight: 700; color: var(--sm-accent); font-size: 1.1rem; margin-bottom: 1.5rem;">
                +${xpGained} XP Guadagnati!
            </div>
            <button class="sm-btn" style="margin: 0 auto;" onclick="this.closest('dialog').close(); window.location.href='index.html'">
                Torna all'Hub Centrale
            </button>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
    }

    function updateXpDisplay() {
        if (xpDisplay) {
            xpDisplay.textContent = localStorage.getItem('lex-total-points') || '0';
        }
    }

    // --- PREGENERATED CONTENT DATABASES ---
    const preloadedGlosse = {
        codicologia: {
            "dain": "Glossa: Dain ha fondato il metodo della codicologia descrittiva nel XX secolo.",
            "samaran": "Glossa: Samaran ha introdotto l'uso della fotografia e della luce di Wood per i codici nel 1950.",
            "pergamena": "Glossa: Supporto scrittorio ottenuto dalla pelle di pecora, capra o vitello calcinata e tesa.",
            "palinsesto": "Glossa: Manoscritto riscritto dopo essere stato lavato con latte acido e raschiato.",
            "pecia": "Glossa: Sistema di copia universitaria basato sull'affitto di fascicoli sciolti.",
            "beneventana": "Glossa: Scrittura minuscola altomedievale dell'Italia meridionale con tratti spezzati.",
            "filigrana": "Glossa: Marchio di fabbrica impresso nella carta umida con fili metallici, visibile controluce.",
            "legatura": "Glossa: Copertina e cucitura dei fascicoli, spesso in assi di legno coperte di pelle.",
            "miniatura": "Glossa: Decorazione dipinta dei manoscritti con pigmenti minerali ed oro in foglia."
        }
    };

    const ricciMnemonicImages = {
        codicologia: {
            "pergamena": "Matteo Ricci descrive: Un agnello vestito da scriba che si stende volontariamente su un telaio dorato gigante, mentre un monaco alato lo raschia con un rasoio d'avorio da cui gocciola inchiostro profumato.",
            "palinsesto": "Matteo Ricci descrive: Un monaco infuriato che lava le pagine di un codice con latte acido usando una spugna di mare gigante, cancellando lettere d'oro che volano via come farfalle per scriverci sopra un elenco di zucche luminose.",
            "filigrana": "Matteo Ricci descrive: Una sirena di fil di ferro argentato imprigionata all'interno di un foglio di carta bagnato. Canta solo quando il foglio viene tenuto davanti alla fiamma di una candela rossa.",
            "legatura": "Matteo Ricci descrive: Un libro guerriero con braccia e gambe d'acciaio, coperto da una corazza in pelle di maiale borchiata di bronzo, che sbatte i suoi ganci metallici per spaventare i topi di biblioteca.",
            "pecia": "Matteo Ricci descrive: Una fila di studenti universitari medievali che corrono tenendo in mano piccoli pezzi di fogli di carta (pece) come in una staffetta olimpica, passandoseli per copiare a tutta velocità.",
            "beneventana": "Matteo Ricci descrive: Lettere nere che sembrano spilli rotti e spezzati, legati tra loro da ragnatele di seta benedettina, che si animano e marciano in cerchio come formiche spigolose.",
            "miniatura": "Matteo Ricci descrive: Una formica pittrice munita di un microscopico pennello d'oro zecchino, che decora una lettera capitale gigante che improvvisamente prende fuoco illuminando l'intero scriptorium.",
            "scriptorium": "Matteo Ricci descrive: Una sala avvolta dalla nebbia di candele in cui monaci scrivono freneticamente con piume d'oca volanti autonome che grattano sulla pelle animale producendo suoni melodiosi.",
            "dain": "Matteo Ricci descrive: Uno scienziato in abiti rinascimentali che misura antichi rotoli con un righello di cristallo, mentre le lettere si staccano e si dispongono in ordine di data davanti ai suoi occhi."
        },
        default: {
            "costituzione": "Matteo Ricci descrive: Una colossale tavola di marmo bianco incisa con lettere di fuoco, sostenuta da tre giganti che sorridono (i tre poteri dello Stato) e protetta da uno scudo dorato indistruttibile.",
            "espropriazione": "Matteo Ricci descrive: Un cavaliere imperiale che confisca una casa a un cittadino offrendogli in cambio un sacchetto di zecchini d'oro sigillati (indennità), mentre le fondamenta della casa vengono scavate alla ricerca di statue romane.",
            "tutela": "Matteo Ricci descrive: Una dea alata che stende il suo mantello di velluto rosso sopra una cattedrale in rovina, respingendo la pioggia e i ladri con un bastone di luce dorata.",
            "sistole": "Matteo Ricci descrive: Un enorme cuore di rubino che si contrae all'improvviso con la forza di una morsa di ferro, spruzzando fiumi di liquido scarlatto in canali di vetro trasparente."
        }
    };

    // --- NEW METHODOLOGY FUNCTIONS ---

    // 1. Feynman Method Validation
    function validateFeynmanStep() {
        const text = document.getElementById('lectio-feynman-input').value.trim();
        const feedback = document.getElementById('feynman-feedback');
        
        if (text.length < 15) {
            feedback.textContent = "❌ La spiegazione è troppo breve. Sforzati di spiegare il concetto con almeno 15 caratteri.";
            feedback.style.color = "var(--accent-terracotta)";
            return false;
        }

        // Define Jargon List based on subject
        let jargonList = ['studio', 'memorizzazione', 'università', 'esame', 'libro'];
        if (state.selectedSubject === 'codicologia') {
            jargonList = ['palinsesto', 'pergamena', 'fascicolo', 'quaterno', 'legatura', 'sfragistica', 'miniatura', 'beneventana', 'filigrana', 'codice', 'pecia', 'papiri', 'papiro', 'paleografia', 'copia'];
        } else if (state.selectedSubject === 'diritto') {
            jargonList = ['costituzione', 'espropriazione', 'tutela', 'paesaggio', 'delitti', 'sanzioni', 'demanio', 'alienazione', 'contratto'];
        } else if (state.selectedSubject === 'arte') {
            jargonList = ['rinascimento', 'prospettiva', 'stiacciato', 'colorito', 'tonale', 'barocco', 'impressionismo', 'plein air', 'divisionismo'];
        }

        const valText = text.toLowerCase();
        const foundJargon = jargonList.filter(word => valText.includes(word));

        if (foundJargon.length > 0) {
            feedback.textContent = `❌ Rilevato termine gergale d'esame: "${foundJargon[0]}". Riscrivi la frase spiegando questo termine con parole comuni.`;
            feedback.style.color = "var(--accent-terracotta)";
            return false;
        }

        feedback.textContent = "✅ Ottimo! Hai spiegato il concetto in modo semplice e comprensibile senza gergo tecnico. Procedi pure!";
        feedback.style.color = "var(--accent-green)";
        return true;
    }

    // 2. Matteo Ricci Mnemonic Modal Popup
    window.showRicciMnemonic = function(head) {
        if (!head) return;
        const cleanHead = head.toLowerCase().replace(/[^a-z]/g, '');
        
        let desc = "Matteo Ricci descrive: Un palazzo della memoria ibrido dove questo concetto è visualizzato come una grande colonna che brilla di una calda luce dorata, posizionata vicino all'ingresso.";
        
        if (state.selectedSubject === 'codicologia' && ricciMnemonicImages.codicologia) {
            const matches = Object.keys(ricciMnemonicImages.codicologia).filter(k => cleanHead.includes(k) || k.includes(cleanHead));
            if (matches.length > 0) {
                desc = ricciMnemonicImages.codicologia[matches[0]];
            }
        } else if (ricciMnemonicImages.default) {
            const matches = Object.keys(ricciMnemonicImages.default).filter(k => cleanHead.includes(k) || k.includes(cleanHead));
            if (matches.length > 0) {
                desc = ricciMnemonicImages.default[matches[0]];
            }
        }

        // Show dialog modal
        const dialog = document.createElement('dialog');
        dialog.style.background = 'rgba(22, 28, 45, 0.95)';
        dialog.style.border = '2px solid var(--sm-accent)';
        dialog.style.borderRadius = '20px';
        dialog.style.padding = '2rem';
        dialog.style.color = 'var(--text-primary)';
        dialog.style.maxWidth = '400px';
        dialog.style.textAlign = 'center';
        dialog.style.margin = 'auto';
        dialog.style.boxShadow = '0 0 30px var(--sm-glow-color)';
        
        dialog.innerHTML = `
            <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🏮</span>
            <h3 style="font-family: var(--font-serif); color: var(--sm-accent); margin-bottom: 0.8rem;">Metodo di Memoria Ricci</h3>
            <p style="font-style: italic; color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">
                Visualizzazione dell'immagine mnemonica per: <strong>${head}</strong>
            </p>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-primary); background: rgba(255,255,255,0.02); padding: 1rem; border-radius:10px; border:1px solid var(--sm-card-border);">
                "${desc}"
            </p>
            <button class="sm-btn" style="margin: 1.5rem auto 0 auto;" onclick="this.closest('dialog').close(); this.closest('dialog').remove();">
                Chiudi
            </button>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
    };

    // 3. Glossa Marginale Management
    function addGlossaToSentence(sentence) {
        let existing = state.glosse[sentence] || '';
        const userGlossa = prompt(`Aggiungi o modifica la glossa marginale per questa frase:\n"${sentence}"`, existing);
        if (userGlossa === null) return; 
        
        if (userGlossa.trim() === '') {
            delete state.glosse[sentence];
        } else {
            state.glosse[sentence] = userGlossa.trim();
        }
        renderGlosseList();
    }

    function renderGlosseList() {
        const glosseList = document.getElementById('glosse-list');
        if (!glosseList) return;
        
        if (Object.keys(state.glosse).length === 0) {
            glosseList.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Clicca su qualsiasi frase evidenziata nel testo a sinistra per aggiungere o visualizzare una glossa marginale.</span>`;
            return;
        }

        glosseList.innerHTML = '';
        Object.entries(state.glosse).forEach(([sentence, glosText]) => {
            const card = document.createElement('div');
            card.className = 'locke-note-card';
            card.style.fontSize = '0.85rem';
            card.style.padding = '0.6rem 0.8rem';
            card.style.marginBottom = '0.6rem';
            card.style.borderLeft = '3px solid var(--sm-accent)';
            card.innerHTML = `
                <div style="font-weight: 600; font-size: 0.8rem; margin-bottom: 0.2rem; color: var(--sm-accent); display:flex; justify-content:space-between; align-items:center;">
                    <span>Glossa Marginale</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); cursor:pointer;" onclick="deleteGlossa('${escapeQuotes(sentence)}')">❌</span>
                </div>
                <p style="margin-bottom:0.4rem; color: var(--text-primary); font-style:italic;">"${sentence.substring(0, 50)}..."</p>
                <div style="color: var(--text-secondary); font-weight: 500; font-family: var(--font-serif);">${glosText}</div>
            `;
            
            card.addEventListener('mouseenter', () => {
                const spans = document.querySelectorAll('.sushi-text-highlight');
                spans.forEach(span => {
                    if (span.textContent.includes(sentence.substring(0, 15))) {
                        span.style.background = 'rgba(212, 175, 55, 0.4)';
                        span.style.transform = 'scale(1.02)';
                    }
                });
            });
            card.addEventListener('mouseleave', () => {
                const spans = document.querySelectorAll('.sushi-text-highlight');
                spans.forEach(span => {
                    span.style.background = '';
                    span.style.transform = '';
                });
            });

            glosseList.appendChild(card);
        });
    }

    window.deleteGlossa = function(sentence) {
        delete state.glosse[sentence];
        renderGlosseList();
    };

    function escapeQuotes(str) {
        return str.replace(/'/g, "\'").replace(/"/g, '\"');
    }

    // 4. Leitner System Management
    function initLeitnerBoxes() {
        if (state.notes.length === 0) {
            parseNotes();
        }

        // Initialize notes to Box 1 if not set
        state.notes.forEach((note, idx) => {
            if (!state.leitnerBox[idx]) {
                state.leitnerBox[idx] = 1;
            }
        });

        renderLeitnerColumn(1, document.getElementById('leitner-list-1'));
        renderLeitnerColumn(2, document.getElementById('leitner-list-2'));
        renderLeitnerColumn(3, document.getElementById('leitner-list-3'));

        // Check if all notes in box 3 (Esame)
        const allInBox3 = state.notes.every((_, idx) => state.leitnerBox[idx] === 3);
        const nextBtn = document.querySelector('#panel-phase-6 .next-phase-btn');
        
        if (allInBox3 && state.notes.length > 0) {
            nextBtn.disabled = false;
            nextBtn.textContent = "Pronto per la Disputatio! ➔";
            nextBtn.style.background = "var(--accent-green)";
            nextBtn.style.color = "#000";
        } else {
            nextBtn.disabled = false;
            nextBtn.textContent = "Completa Fase e Continua ➔";
            nextBtn.style.background = "";
            nextBtn.style.color = "";
        }
    }

    function renderLeitnerColumn(boxNum, container) {
        container.innerHTML = '';
        const matched = state.notes.filter((_, idx) => state.leitnerBox[idx] === boxNum);

        if (matched.length === 0) {
            container.innerHTML = '<span style="color:var(--text-muted); font-size:0.8rem; font-style:italic; text-align:center; padding:1rem; display:block;">Cassetto Vuoto</span>';
            return;
        }

        matched.forEach(note => {
            const globalIdx = state.notes.indexOf(note);
            const card = document.createElement('div');
            card.className = 'locke-note-card';
            card.style.padding = '0.8rem';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.gap = '0.5rem';

            card.innerHTML = `
                <div style="font-weight:600; color:var(--sm-accent); display:flex; justify-content:space-between;">
                    <span>${note.head}</span>
                    <span style="font-size:0.75rem; color:var(--text-muted);">#${globalIdx+1}</span>
                </div>
                <div class="leitner-body-reveal" style="display:none; font-size:0.9rem; color:var(--text-primary); border-top:1px solid var(--sm-card-border); padding-top:0.4rem;">
                    ${note.body}
                    <div style="margin-top:0.4rem; display:flex; gap:0.3rem;">
                        <button class="sm-btn secondary" style="font-size:0.7rem; padding:0.2rem 0.5rem;" onclick="showRicciMnemonic('${note.head.replace(/'/g, "\\'")}')">🏮 Ricci</button>
                    </div>
                </div>
                <div class="leitner-action-buttons" style="display:flex; gap:0.4rem; margin-top:0.3rem;">
                    <button class="sm-btn reveal-btn" style="font-size:0.8rem; padding:0.3rem 0.6rem; width:100%;" onclick="revealLeitnerCard(this)">📖 Rivela Risposta</button>
                    <button class="sm-btn secondary fail-btn" style="font-size:0.8rem; padding:0.3rem 0.6rem; display:none; background:rgba(200,90,50,0.15); color:var(--accent-terracotta); border-color:var(--accent-terracotta);" onclick="moveLeitnerCard(${globalIdx}, false)">❌ Sbagliato</button>
                    <button class="sm-btn success-btn" style="font-size:0.8rem; padding:0.3rem 0.6rem; display:none; background:rgba(16,185,129,0.15); color:var(--accent-green); border:1px solid var(--accent-green);" onclick="moveLeitnerCard(${globalIdx}, true)">✅ Corretto</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    window.revealLeitnerCard = function(btn) {
        const card = btn.closest('.locke-note-card');
        card.querySelector('.leitner-body-reveal').style.display = 'block';
        btn.style.display = 'none';
        card.querySelector('.fail-btn').style.display = 'block';
        card.querySelector('.success-btn').style.display = 'block';
    };

    window.moveLeitnerCard = function(noteIdx, success) {
        if (success) {
            // Move up
            state.leitnerBox[noteIdx] = Math.min(3, state.leitnerBox[noteIdx] + 1);
        } else {
            // Move back to Box 1
            state.leitnerBox[noteIdx] = 1;
        }
        initLeitnerBoxes();
    };
});
