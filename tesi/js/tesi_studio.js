/* LEX STUDIORUM - THESIS STUDIO LOGIC (3-COLUMN WORKSPACE) */

(function() {
    // STATE MANAGEMENT
    const STORAGE_KEY = 'lex_thesis_project_v1';
    
    const DEFAULT_PROJECT = {
        title: "Tesi di Laurea - Lex Studiorum",
        activeChapterId: "cap1",
        chapters: [
            {
                id: "frontespizio",
                title: "Frontespizio & Dedica",
                content: "# Tesi di Laurea\n\n**Candidato:** Lex\n**Anno Accademico:** 2025/2026\n**Corso di Laurea:** Diritto dei Beni Culturali e Scienze Umanistiche\n\n---\n\n*Dedicato alla costante ricerca del sapere e alla tutela della bellezza.*"
            },
            {
                id: "cap1",
                title: "Capitolo I: Introduzione",
                content: "# Capitolo I: Introduzione\n\nIl presente lavoro si propone di esplorare le interconnessioni tra le scienze giuridiche e la valorizzazione del patrimonio storico-artistico.\n\nAttraverso l'analisi delle fonti dello Studiorum, si intende ricostruire un quadro coerente del modello di tutela italiano..."
            },
            {
                id: "cap2",
                title: "Capitolo II: Quadro Normativo",
                content: "# Capitolo II: Quadro Normativo e Istituzionale\n\nL'evoluzione del Codice dei Beni Culturali e del Paesaggio (D.Lgs. 42/2004) fonda le sue radici nell'Articolo 9 della Costituzione..."
            },
            {
                id: "conclusioni",
                title: "Conclusioni",
                content: "# Conclusioni\n\nIn conclusione, la tutela del patrimonio non è soltanto un dovere giuridico, ma una missione culturale collettiva..."
            },
            {
                id: "bibliografia",
                title: "Bibliografia & Fonti",
                content: "# Bibliografia e Fonti\n\n1. Cabiddu M. A., *Diritto dei beni culturali*, Giappichelli.\n2. Settis S., *Italia S.p.A. - L'assalto al patrimonio culturale*, Einaudi.\n3. Brandi C., *Teoria del restauro*, Einaudi."
            }
        ]
    };

    let thesisProject = loadThesisProject();
    let currentStudiorumItem = null;
    let autoSaveTimeout = null;

    // SUBJECT CONFIG METADATA FOR BADGES AND ICONS
    const SUBJECT_META = {
        'diritto': { name: 'Diritto Beni Culturali', icon: '⚖️', folder: 'diritto' },
        'arte_romana': { name: 'Arte Romana', icon: '🏛️', folder: 'arte_romana' },
        'storia_medievale': { name: 'Storia Medievale', icon: '⚔️', folder: 'storia_medievale' },
        'codicologia': { name: 'Codicologia', icon: '📜', folder: 'codicologia' },
        'arte': { name: 'Arte Moderna', icon: '🎨', folder: 'storia_arte' },
        'storia': { name: 'Storia Moderna', icon: '⏳', folder: 'storia' },
        'letteratura_italiana': { name: 'Letteratura Italiana', icon: '📖', folder: 'letteratura_italiana' },
        'cultura_greca': { name: 'Cultura Greca', icon: 'Ω', folder: 'cultura_greca' },
        'geografia': { name: 'Geografia', icon: '🌍', folder: 'geografia' },
        'cristiana': { name: 'Archeologia Cristiana', icon: '⛪', folder: 'cristiana' },
        'letteratura_latina': { name: 'Letteratura Latina', icon: '🏛️', folder: 'letteratura_latina' },
        'arte_medievale': { name: 'Arte Medievale', icon: '🏰', folder: 'arte_medievale' },
        'storia_contemporanea': { name: 'Storia Contemporanea', icon: '📰', folder: 'storia_contemporanea' },
        'arte_contemporanea': { name: 'Arte Contemporanea', icon: '🖼️', folder: 'arte_contemporanea' },
        'museologia': { name: 'Museologia', icon: '🏛️', folder: 'museologia' },
        'restauro': { name: 'Restauro', icon: '🔍', folder: 'restauro' },
        'laboratorio': { name: 'Laboratorio', icon: '🛠️', folder: 'laboratorio' },
        'inglese': { name: 'Inglese', icon: '🌐', folder: 'inglese' }
    };

    // INITIALIZATION
    document.addEventListener('DOMContentLoaded', () => {
        initStudioUI();
        initStudiorumIndex();
        initThesisEditor();
        initDragAndDrop();
        initMascotSnoozeManager();
    });

    // LOCAL STORAGE LOAD/SAVE
    function loadThesisProject() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.chapters) && parsed.chapters.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Error loading thesis project from localStorage:", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_PROJECT));
    }

    function saveThesisProject() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(thesisProject));
            const statusEl = document.getElementById('autosave-status');
            if (statusEl) {
                statusEl.textContent = '⚡ Salvato ora';
                statusEl.classList.add('saved');
                setTimeout(() => statusEl.classList.remove('saved'), 2000);
            }
        } catch (e) {
            console.error("Error saving thesis project:", e);
            const statusEl = document.getElementById('autosave-status');
            if (statusEl) statusEl.textContent = '⚠️ Errore salvataggio';
        }
    }

    // STUDIO UI INITIALIZATION
    function initStudioUI() {
        // Set project title input
        const titleInput = document.getElementById('thesis-project-title');
        if (titleInput) {
            titleInput.value = thesisProject.title || "Tesi di Laurea - Lex Studiorum";
        }
    }

    // COLUMN 1: STUDIORUM INDEX & SEARCH
    function initStudiorumIndex() {
        const searchInput = document.getElementById('studiorum-search-input');
        const subjectFilter = document.getElementById('studiorum-subject-filter');

        if (searchInput) {
            searchInput.addEventListener('input', filterStudiorumList);
        }
        if (subjectFilter) {
            subjectFilter.addEventListener('change', filterStudiorumList);
        }

        renderStudiorumList();
    }

    function getRelativeMarkdownPath(item) {
        if (!item) return null;
        if (item.filePath) return '../' + item.filePath;
        if (item.navPath) {
            const parts = item.navPath.split('?open=');
            if (parts.length === 2) {
                const folder = parts[0].replace('/index.html', '');
                return '../' + folder + '/' + parts[1];
            }
        }
        return null;
    }

    function renderStudiorumList() {
        const container = document.getElementById('studiorum-chapters-list');
        const searchInput = document.getElementById('studiorum-search-input');
        const subjectFilter = document.getElementById('studiorum-subject-filter');
        const countBadge = document.getElementById('chapters-total-badge');

        if (!container) return;

        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const subjectVal = subjectFilter ? subjectFilter.value : 'all';

        const db = (window.searchDatabase && Array.isArray(window.searchDatabase)) ? window.searchDatabase : [];
        let items = db.filter(item => {
            if (subjectVal !== 'all' && item.subject !== subjectVal) return false;
            if (query) {
                const titleMatch = item.title && item.title.toLowerCase().includes(query);
                const descMatch = item.description && item.description.toLowerCase().includes(query);
                const kwMatch = item.keywords && item.keywords.toLowerCase().includes(query);
                const tagMatch = item.chapterTag && item.chapterTag.toLowerCase().includes(query);
                return titleMatch || descMatch || kwMatch || tagMatch;
            }
            return true;
        });

        if (countBadge) {
            countBadge.textContent = `${items.length} fonti`;
        }

        if (items.length === 0) {
            container.innerHTML = `<div class="index-empty-state">Nessun capitolo trovato per la ricerca.</div>`;
            return;
        }

        let html = '';
        items.forEach((item, idx) => {
            const meta = SUBJECT_META[item.subject] || { name: item.subject, icon: '📖' };
            const isActive = currentStudiorumItem && currentStudiorumItem.title === item.title;
            const relPath = getRelativeMarkdownPath(item);

            html += `
                <div class="studiorum-item ${isActive ? 'active' : ''}" data-idx="${idx}" onclick="selectStudiorumItem(${idx})">
                    <div class="item-header">
                        <span class="subject-badge">${meta.icon} ${meta.name}</span>
                        <span class="chapter-tag">${item.chapterTag || 'Capitolo'}</span>
                    </div>
                    <h4 class="item-title">${escapeHtml(item.title)}</h4>
                    <p class="item-desc">${escapeHtml(item.description || '')}</p>
                </div>
            `;
        });

        container.innerHTML = html;
        window.filteredStudiorumItems = items;
    }

    function filterStudiorumList() {
        renderStudiorumList();
    }

    // COLUMN 2: STUDIORUM READER
    window.selectStudiorumItem = function(idx) {
        const items = window.filteredStudiorumItems || window.searchDatabase || [];
        const item = items[idx];
        if (!item) return;

        currentStudiorumItem = item;
        renderStudiorumList(); // refresh active state

        const relPath = getRelativeMarkdownPath(item);
        if (!relPath) {
            alert("Impossibile determinare il percorso del file.");
            return;
        }

        loadStudiorumChapter(item, relPath);
    };

    function loadStudiorumChapter(item, relPath) {
        const subjectTagEl = document.getElementById('reader-subject-tag');
        const titleEl = document.getElementById('reader-title');
        const markdownView = document.getElementById('reader-markdown-view');

        const meta = SUBJECT_META[item.subject] || { name: item.subject, icon: '📖' };

        if (subjectTagEl) subjectTagEl.textContent = `${meta.icon} ${meta.name} · ${item.chapterTag || ''}`;
        if (titleEl) titleEl.textContent = item.title;

        if (markdownView) {
            markdownView.innerHTML = `
                <div class="reader-loading-spinner">
                    <div class="spinner"></div>
                    <p>Caricamento fonte accademica in corso...</p>
                </div>
            `;
        }

        fetch(relPath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}: Impossibile caricare ${relPath}`);
                return res.text();
            })
            .then(text => {
                // Parse markdown using marked
                if (typeof marked !== 'undefined') {
                    marked.setOptions({ gfm: true, breaks: true });
                    markdownView.innerHTML = marked.parse(text);
                } else {
                    markdownView.innerHTML = `<pre>${escapeHtml(text)}</pre>`;
                }

                // Inject glossary tooltips if function available
                if (typeof injectGlossaryTooltips === 'function') {
                    injectGlossaryTooltips(markdownView);
                }
            })
            .catch(err => {
                if (markdownView) {
                    markdownView.innerHTML = `
                        <div class="reader-error-state">
                            <p>⚠️ Impossibile caricare il capitolo (${relPath}).</p>
                            <p class="error-detail">${escapeHtml(err.message)}</p>
                        </div>
                    `;
                }
            });
    }

    let readerFontSize = 1;
    window.changeReaderFontSize = function(delta) {
        const readerBody = document.getElementById('reader-markdown-view');
        if (!readerBody) return;
        
        if (delta === 1) {
            readerFontSize = Math.min(readerFontSize + 0.1, 1.4);
        } else {
            readerFontSize = Math.max(readerFontSize - 0.1, 0.85);
        }
        readerBody.style.fontSize = `${readerFontSize}rem`;
    };

    // QUICK QUOTE: COPY FROM COLUMN 2 TO COLUMN 3 EDITOR
    window.insertQuoteIntoThesis = function() {
        const selection = window.getSelection();
        let selectedText = selection ? selection.toString().trim() : '';
        
        let quoteContent = '';
        const chapterTitle = currentStudiorumItem ? currentStudiorumItem.title : 'Fonte Studiorum';
        const subjectMeta = currentStudiorumItem && SUBJECT_META[currentStudiorumItem.subject] ? SUBJECT_META[currentStudiorumItem.subject].name : 'Studiorum';

        if (selectedText.length > 0) {
            quoteContent = `\n> "${selectedText}"\n> — *Fonte: ${chapterTitle} (${subjectMeta})*\n\n`;
        } else if (currentStudiorumItem) {
            quoteContent = `\n> **Riferimento:** ${currentStudiorumItem.title} (${subjectMeta})\n> ${currentStudiorumItem.description || ''}\n\n`;
        } else {
            alert("Seleziona una porzione di testo nella colonna centrale oppure seleziona un capitolo dello Studiorum da citare.");
            return;
        }

        const textarea = document.getElementById('thesis-textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = textarea.value;

        textarea.value = val.substring(0, start) + quoteContent + val.substring(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + quoteContent.length;

        handleThesisInput();
        showToast("Citazione inserita nell'editor della Tesi!");
    };

    // COLUMN 3: THESIS EDITOR & TABS
    function initThesisEditor() {
        renderThesisTabs();
        loadActiveChapterContent();

        const titleInput = document.getElementById('thesis-project-title');
        if (titleInput) {
            titleInput.addEventListener('input', (e) => {
                thesisProject.title = e.target.value;
                triggerAutoSave();
            });
        }
    }

    function renderThesisTabs() {
        const container = document.getElementById('thesis-chapters-tabs');
        if (!container) return;

        let html = '';
        thesisProject.chapters.forEach(chap => {
            const isActive = chap.id === thesisProject.activeChapterId;
            html += `
                <div class="thesis-tab ${isActive ? 'active' : ''}" onclick="switchThesisChapter('${chap.id}')">
                    <span class="tab-label">${escapeHtml(chap.title)}</span>
                    ${thesisProject.chapters.length > 1 ? `<button class="tab-close" onclick="event.stopPropagation(); deleteThesisChapter('${chap.id}')" title="Elimina capitolo">&times;</button>` : ''}
                </div>
            `;
        });

        html += `
            <button class="add-tab-btn" onclick="addNewThesisChapter()" title="Aggiungi nuovo capitolo tesi">+ Nuovo Capitolo</button>
        `;

        container.innerHTML = html;
    }

    function getActiveChapter() {
        return thesisProject.chapters.find(c => c.id === thesisProject.activeChapterId) || thesisProject.chapters[0];
    }

    function loadActiveChapterContent() {
        const chap = getActiveChapter();
        if (!chap) return;

        const textarea = document.getElementById('thesis-textarea');
        const previewView = document.getElementById('thesis-preview-view');

        if (textarea) textarea.value = chap.content || '';
        if (previewView && typeof marked !== 'undefined') {
            previewView.innerHTML = marked.parse(chap.content || '');
        }

        updateMetrics();
    }

    window.switchThesisChapter = function(chapId) {
        // Save current textarea content first
        saveCurrentTextareaState();

        thesisProject.activeChapterId = chapId;
        renderThesisTabs();
        loadActiveChapterContent();
    };

    window.addNewThesisChapter = function() {
        saveCurrentTextareaState();

        const num = thesisProject.chapters.length + 1;
        const newId = 'cap_' + Date.now();
        const newTitle = prompt("Inserisci il titolo del nuovo capitolo:", `Capitolo ${num}`);
        
        if (!newTitle) return;

        thesisProject.chapters.push({
            id: newId,
            title: newTitle,
            content: `# ${newTitle}\n\nInizia a scrivere qui il tuo capitolo...`
        });

        thesisProject.activeChapterId = newId;
        saveThesisProject();
        renderThesisTabs();
        loadActiveChapterContent();
    };

    window.deleteThesisChapter = function(chapId) {
        if (thesisProject.chapters.length <= 1) {
            alert("Impossibile eliminare l'unico capitolo presente.");
            return;
        }

        const chap = thesisProject.chapters.find(c => c.id === chapId);
        if (!confirm(`Sei sicuro di voler eliminare il capitolo "${chap ? chap.title : chapId}"?`)) {
            return;
        }

        thesisProject.chapters = thesisProject.chapters.filter(c => c.id !== chapId);
        if (thesisProject.activeChapterId === chapId) {
            thesisProject.activeChapterId = thesisProject.chapters[0].id;
        }

        saveThesisProject();
        renderThesisTabs();
        loadActiveChapterContent();
    };

    function saveCurrentTextareaState() {
        const textarea = document.getElementById('thesis-textarea');
        if (!textarea) return;

        const chap = getActiveChapter();
        if (chap) {
            chap.content = textarea.value;
        }
    }

    window.handleThesisInput = function() {
        saveCurrentTextareaState();
        updateMetrics();

        // Update live preview if active
        const previewView = document.getElementById('thesis-preview-view');
        const textarea = document.getElementById('thesis-textarea');
        if (previewView && textarea && previewView.style.display !== 'none') {
            if (typeof marked !== 'undefined') {
                previewView.innerHTML = marked.parse(textarea.value);
            }
        }

        triggerAutoSave();
    };

    function triggerAutoSave() {
        const statusEl = document.getElementById('autosave-status');
        if (statusEl) statusEl.textContent = '✍️ Modifica in corso...';

        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            saveThesisProject();
        }, 800);
    }

    function updateMetrics() {
        const textarea = document.getElementById('thesis-textarea');
        const metricsEl = document.getElementById('thesis-metrics');
        if (!textarea || !metricsEl) return;

        const text = textarea.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        const readingTime = Math.ceil(words / 200);

        metricsEl.textContent = `${words} parole · ${chars} car. · ~${readingTime} min lett.`;
    }

    // EDITOR MODES (WRITE / PREVIEW / SPLIT)
    window.setEditorMode = function(mode) {
        const writeBtn = document.getElementById('btn-mode-write');
        const previewBtn = document.getElementById('btn-mode-preview');
        const splitBtn = document.getElementById('btn-mode-split');

        const textarea = document.getElementById('thesis-textarea');
        const previewView = document.getElementById('thesis-preview-view');
        const bodyArea = document.getElementById('editor-body-area');

        if (!textarea || !previewView || !bodyArea) return;

        // Reset classes
        writeBtn.classList.remove('active');
        previewBtn.classList.remove('active');
        splitBtn.classList.remove('active');
        bodyArea.classList.remove('mode-split');

        if (mode === 'write') {
            writeBtn.classList.add('active');
            textarea.style.display = 'block';
            previewView.style.display = 'none';
        } else if (mode === 'preview') {
            previewBtn.classList.add('active');
            textarea.style.display = 'none';
            previewView.style.display = 'block';
            if (typeof marked !== 'undefined') {
                previewView.innerHTML = marked.parse(textarea.value);
            }
        } else if (mode === 'split') {
            splitBtn.classList.add('active');
            textarea.style.display = 'block';
            previewView.style.display = 'block';
            bodyArea.classList.add('mode-split');
            if (typeof marked !== 'undefined') {
                previewView.innerHTML = marked.parse(textarea.value);
            }
        }
    };

    // FORMATTING TOOLBAR HELPERS
    window.formatText = function(type) {
        const textarea = document.getElementById('thesis-textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = textarea.value;
        const selected = val.substring(start, end);

        let formatted = '';
        let cursorOffset = 0;

        switch (type) {
            case 'bold':
                formatted = `**${selected || 'testo in grassetto'}**`;
                cursorOffset = selected ? formatted.length : 2;
                break;
            case 'italic':
                formatted = `*${selected || 'testo in corsivo'}*`;
                cursorOffset = selected ? formatted.length : 1;
                break;
            case 'h1':
                formatted = `\n# ${selected || 'Titolo Capitolo'}\n`;
                cursorOffset = formatted.length;
                break;
            case 'h2':
                formatted = `\n## ${selected || 'Sottotitolo'}\n`;
                cursorOffset = formatted.length;
                break;
            case 'h3':
                formatted = `\n### ${selected || 'Sezione'}\n`;
                cursorOffset = formatted.length;
                break;
            case 'quote':
                formatted = `\n> ${selected || 'Citazione di rilievo'}\n`;
                cursorOffset = formatted.length;
                break;
            case 'list':
                formatted = `\n- ${selected || 'Punto lista'}\n`;
                cursorOffset = formatted.length;
                break;
            case 'link':
                const url = prompt("Inserisci URL del link:", "https://");
                if (url) {
                    formatted = `[${selected || 'Testo del link'}](${url})`;
                    cursorOffset = formatted.length;
                } else {
                    return;
                }
                break;
        }

        textarea.value = val.substring(0, start) + formatted + val.substring(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;

        handleThesisInput();
    };

    // EXPORT THESIS FUNCTIONS
    window.toggleExportMenu = function() {
        const menu = document.getElementById('export-dropdown');
        if (menu) {
            menu.classList.toggle('open');
        }
    };

    // Close export menu when clicking outside
    document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.action-dropdown-wrapper');
        const menu = document.getElementById('export-dropdown');
        if (menu && wrapper && !wrapper.contains(e.target)) {
            menu.classList.remove('open');
        }
    });

    window.exportThesis = function(format) {
        saveCurrentTextareaState();
        saveThesisProject();

        const menu = document.getElementById('export-dropdown');
        if (menu) menu.classList.remove('open');

        if (format === 'pdf') {
            generateAcademicPrintablePDF();
        } else if (format === 'md') {
            exportAsMarkdownFile();
        } else if (format === 'json') {
            exportAsJSONBackup();
        } else if (format === 'txt') {
            exportAsTextFile();
        }
    };

    function generateAcademicPrintablePDF() {
        const container = document.getElementById('printable-thesis-container');
        if (!container) return;

        let html = `
            <div class="print-title-page">
                <div class="print-university">UNIVERSITÀ DEGLI STUDI · LEX STUDIORUM</div>
                <div class="print-sub-header">Corso di Laurea in Diritto dei Beni Culturali e Scienze Umanistiche</div>
                <div class="print-main-title">${escapeHtml(thesisProject.title)}</div>
                <div class="print-author">Candidato: <strong>Lex</strong></div>
                <div class="print-date">Anno Domini MMXXVI</div>
            </div>
            <div class="print-toc">
                <h2>Indice della Tesi</h2>
                <ul>
        `;

        thesisProject.chapters.forEach(c => {
            html += `<li><span>${escapeHtml(c.title)}</span></li>`;
        });

        html += `</ul></div>`;

        thesisProject.chapters.forEach(c => {
            const parsed = (typeof marked !== 'undefined') ? marked.parse(c.content || '') : `<pre>${escapeHtml(c.content || '')}</pre>`;
            html += `
                <div class="print-chapter">
                    ${parsed}
                </div>
            `;
        });

        container.innerHTML = html;
        window.print();
    }

    function exportAsMarkdownFile() {
        let fullMarkdown = `# ${thesisProject.title}\n\n`;
        thesisProject.chapters.forEach(c => {
            fullMarkdown += `\n\n<!-- --- START CHAPTER: ${c.title} --- -->\n\n`;
            fullMarkdown += c.content + '\n';
        });

        downloadBlob(fullMarkdown, `${slugify(thesisProject.title)}.md`, 'text/markdown');
        showToast("Tesi esportata in formato Markdown (.md)!");
    }

    function exportAsJSONBackup() {
        const dataStr = JSON.stringify(thesisProject, null, 2);
        downloadBlob(dataStr, `backup_${slugify(thesisProject.title)}.json`, 'application/json');
        showToast("Backup completo della Tesi scaricato in formato JSON!");
    }

    function exportAsTextFile() {
        let fullText = `${thesisProject.title.toUpperCase()}\n${'='.repeat(40)}\n\n`;
        thesisProject.chapters.forEach(c => {
            fullText += `\n--- ${c.title.toUpperCase()} ---\n\n`;
            fullText += c.content.replace(/[#*`_>]/g, '') + '\n';
        });

        downloadBlob(fullText, `${slugify(thesisProject.title)}.txt`, 'text/plain');
        showToast("Tesi esportata in formato Testo (.txt)!");
    }

    function downloadBlob(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // UPLOAD / IMPORT THESIS FILE
    window.handleFileUpload = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        processUploadedFile(file);
    };

    function processUploadedFile(file) {
        const reader = new FileReader();
        const ext = file.name.split('.').pop().toLowerCase();

        reader.onload = function(e) {
            const content = e.target.result;

            if (ext === 'json') {
                try {
                    const parsed = JSON.parse(content);
                    if (parsed && Array.isArray(parsed.chapters)) {
                        thesisProject = parsed;
                        saveThesisProject();
                        initStudioUI();
                        renderThesisTabs();
                        loadActiveChapterContent();
                        showToast(`Progetto Tesi "${file.name}" caricato con successo!`);
                        return;
                    }
                } catch (err) {
                    alert("Errore nel parsing del file JSON: " + err.message);
                    return;
                }
            }

            // Standard .md or .txt file -> create/update chapter
            const fileNameNoExt = file.name.replace(/\.[^/.]+$/, "");
            const newId = 'import_' + Date.now();

            thesisProject.chapters.push({
                id: newId,
                title: fileNameNoExt,
                content: content
            });

            thesisProject.activeChapterId = newId;
            saveThesisProject();
            renderThesisTabs();
            loadActiveChapterContent();
            showToast(`File "${file.name}" importato come nuovo capitolo della Tesi!`);
        };

        reader.readAsText(file);
    }

    // DRAG AND DROP ZONE OVER EDITOR
    function initDragAndDrop() {
        const colRight = document.getElementById('col-right');
        if (!colRight) return;

        ['dragenter', 'dragover'].forEach(eventName => {
            colRight.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                colRight.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            colRight.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                colRight.classList.remove('drag-over');
            }, false);
        });

        colRight.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files.length > 0) {
                processUploadedFile(files[0]);
            }
        });
    }

    // HELPER UTILITIES
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '_')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    // MASCOT FRATE ALESSIO 15-MINUTE SNOOZE MANAGER
    const SNOOZE_KEY = 'lex_mascot_snooze_until';

    function initMascotSnoozeManager() {
        injectMascotSnoozePill();
        checkMascotSnoozeState();
        setInterval(() => {
            injectMascotSnoozePill();
            checkMascotSnoozeState();
        }, 1000);
    }

    function injectMascotSnoozePill() {
        const container = document.getElementById('lex-mascot-container');
        if (!container) return;

        // Ensure snooze pill is attached to mascot avatar wrapper
        const avatarWrapper = document.getElementById('lex-mascot-avatar-wrapper');
        if (avatarWrapper && !document.getElementById('mascot-snooze-action-pill')) {
            const pill = document.createElement('button');
            pill.id = 'mascot-snooze-action-pill';
            pill.className = 'mascot-snooze-pill';
            pill.title = 'Fai meditare Frate Alessio per 15 minuti per liberare lo spazio a sinistra';
            pill.innerHTML = '<span>💤 Medita 15m</span>';
            pill.onclick = (e) => {
                e.stopPropagation();
                window.toggleMascotSnooze15m();
            };
            avatarWrapper.appendChild(pill);
        }
    }

    function checkMascotSnoozeState() {
        const snoozeUntil = localStorage.getItem(SNOOZE_KEY);
        const container = document.getElementById('lex-mascot-container');
        let reentryPill = document.getElementById('mascot-snooze-reentry-pill');

        if (!snoozeUntil) {
            if (reentryPill) reentryPill.remove();
            if (container && container.style.display === 'none' && !container.classList.contains('mascot-snoozing-out')) {
                bringBackMascot(container);
            }
            return;
        }

        const remainingMs = parseInt(snoozeUntil, 10) - Date.now();
        if (remainingMs <= 0) {
            localStorage.removeItem(SNOOZE_KEY);
            if (reentryPill) reentryPill.remove();
            if (container) bringBackMascot(container);
        } else {
            const totalSec = Math.ceil(remainingMs / 1000);
            const mins = Math.floor(totalSec / 60);
            const secs = totalSec % 60;
            const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

            // Ensure container is hidden during snooze
            if (container && container.style.display !== 'none' && !container.classList.contains('mascot-snoozing-out')) {
                container.style.display = 'none';
            }

            // Create or update compact reentry pill at bottom left
            if (!reentryPill) {
                reentryPill = document.createElement('button');
                reentryPill.id = 'mascot-snooze-reentry-pill';
                reentryPill.className = 'mascot-reentry-pill';
                reentryPill.title = 'Richiama Frate Alessio prima del tempo';
                reentryPill.onclick = () => window.toggleMascotSnooze15m();
                document.body.appendChild(reentryPill);
            }
            reentryPill.innerHTML = `<span>🦫 Meditazione (${timeStr})</span> <span style="font-size:0.7rem; opacity:0.8;">· Richiama</span>`;
        }
    }

    window.toggleMascotSnooze15m = function() {
        const snoozeUntil = localStorage.getItem(SNOOZE_KEY);
        const container = document.getElementById('lex-mascot-container');

        if (snoozeUntil && parseInt(snoozeUntil, 10) > Date.now()) {
            localStorage.removeItem(SNOOZE_KEY);
            const reentryPill = document.getElementById('mascot-snooze-reentry-pill');
            if (reentryPill) reentryPill.remove();
            if (container) bringBackMascot(container);
        } else {
            const futureTime = Date.now() + 15 * 60 * 1000;
            localStorage.setItem(SNOOZE_KEY, futureTime.toString());

            if (container) {
                const bubble = document.getElementById('lex-mascot-bubble');
                const bubbleText = document.getElementById('lex-mascot-bubble-text');
                if (bubble && bubbleText) {
                    bubbleText.textContent = "Vado a meditare nello Scriptorium per 15 minuti! Buono studio, Lex! 🦫✨";
                    bubble.classList.add('visible');
                }

                setTimeout(() => {
                    container.classList.remove('mascot-snoozing-in');
                    container.classList.add('mascot-snoozing-out');

                    setTimeout(() => {
                        container.style.display = 'none';
                        container.classList.remove('mascot-snoozing-out');
                        checkMascotSnoozeState();
                    }, 750);
                }, 800);
            } else {
                checkMascotSnoozeState();
            }
        }
    };

    function bringBackMascot(container) {
        if (!container) return;
        const reentryPill = document.getElementById('mascot-snooze-reentry-pill');
        if (reentryPill) reentryPill.remove();

        container.style.display = 'flex';
        container.classList.remove('mascot-snoozing-out');
        container.classList.add('mascot-snoozing-in');

        const bubble = document.getElementById('lex-mascot-bubble');
        const bubbleText = document.getElementById('lex-mascot-bubble-text');
        if (bubble && bubbleText) {
            bubbleText.textContent = "Sono tornato dalla meditazione! Pronto ad assisterti nello studio, Lex! 📚✨";
            bubble.classList.add('visible');
            setTimeout(() => bubble.classList.remove('visible'), 5000);
        }

        setTimeout(() => {
            container.classList.remove('mascot-snoozing-in');
        }, 900);
    }

})();
