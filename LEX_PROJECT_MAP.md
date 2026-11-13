# 🏛️ LEX STUDIORUM — Architectural Blueprint & Codebase Map

> **Istruzioni per Gemini (Frontier Architect):**
> Questo documento sintetizza l'architettura, i moduli e l'albero completo dei file di **Lex Studiorum**, una Web App/PWA accademica complessa sviluppata in Vanilla JS, HTML5 e CSS moderno con persistenza locale e architettura modulare per materie.
> **Ruolo richiesto:** Agisci come Senior Software Architect. Quando ti viene richiesta una nuova feature o un refactoring, usa questa mappa per comprendere le dipendenze e genera un **Piano Operativo Step-by-Step** specificando i percorsi esatti dei file da modificare, il codice/logica e i test, ottimizzato per l'esecuzione autonoma da parte dell'IDE Antigravity.

---

## 1. 🏗️ Panoramica Architetturale

- **Tipo di Applicazione:** Progressive Web App (PWA) client-side avanzata per lo studio universitario multidisciplinare (Scienze Giuridiche, Beni Culturali, Filosofia, Storia dell'Arte, ecc.).
- **Stack Tecnologico:**
  - **Frontend:** Vanilla HTML5, Modern CSS (Glassmorphism, custom design system con blur shapes, variabili CSS per dark/light theme).
  - **Core Engine:** `js/lex_core.js` (~9.000 righe di runtime condiviso).
  - **Librerie esterne:** `Chart.js` (grafici di studio), `Fuse.js` (fuzzy search locale).
  - **Persistenza:** `localStorage` sincronizzato, PWA Service Worker (`sw.js`), predisposizione Cloud/OAuth sync.
  - **Audio & Media:** Web Audio API procedurale (rumori bianco/marrone, pioggia, binaurali, sequenziatore melodie per focus), Text-to-Speech (TTS) nativo integrato per lettura sintesi.

---

## 2. 🗂️ Moduli Principali (Root)

| File | Scopo Architetturale |
| :--- | :--- |
| `index.html` | **Hub Principale:** Dashboard di navigazione verso tutte le discipline, motore di ricerca fuzzy globale, widget Pomodoro e stato sincronizzato. |
| `assistant.html` | **Tutor Virtuale AI:** Interfaccia assistente di studio e guida interattiva. |
| `exam.html` | **Simulatore d'Esame:** Sessioni d'esame simulate con domande orali/scritte e calcolo voto. |
| `planner.html` | **Pianificatore di Studio:** Gestione calendario, sessioni di studio, deadline esami. |
| `flashcards.html` | **Spaced Repetition:** Flashcard attive per memorizzazione rapida per tutte le materie. |
| `achievements.html` | **Gamification:** Tracciamento obiettivi, badge sbloccabili e streak di studio. |
| `analytics.html` | **Statistiche:** Grafici di produttività, ore di studio per materia (Chart.js). |
| `timeline.html` | **Linee Temporali Interattive:** Cronologia comparata sincronizzata con `js/timeline_db.js`. |
| `connections.html` | **Mappa delle Connessioni:** Mappatura concettuale interdisciplinare tra arte, diritto, storia e filosofia. |
| `studio_max.html` | **Stanza di Studio Immersiva:** Ambiente full-screen con audio procedurale e timer avanzato. |
| `sleep_study.html` | **Sleep Study:** Modulo audio e ripasso passivo per il rilassamento/sonno. |
| `minigames.html` / `secret_puzzle.html` / `easter_eggs.html` | **Sezioni interattive ed Easter Eggs:** Minigiochi mnemonici e puzzle di logica. |
| `offline.html` / `sw.js` / `manifest.json` | **PWA Engine:** Cache offline e installabilità desktop/mobile. |
| `style.css` | **Foglio di Stile Globale:** Design tokens, layout responsive, componenti condivisi. |

---

## 3. 🧠 Il Cuore Condiviso (`/js`)

- **`js/lex_core.js`**: Il runtime singleton (`LexCore`) che governa:
  1. *Pomodoro Timer:* Sincronizzato fra tutti i tab ed iframe con persistenza su `localStorage`.
  2. *Tema:* Gestione Dark/Light Mode dinamica con override istantaneo.
  3. *Focus Mixer Audio:* Sintetizzatore procedurale basato su nodi Web Audio API (AudioContext, GainNode, filtri biquad per rumore rosa/marrone/pioggia).
  4. *TTS Engine:* Segmentazione a blocchi di testo delle sintesi con lettura sintetizzata e controllo velocità.
  5. *Cloud Sync:* Meccanismo di esportazione/ripristino e listener cross-tab (`storage`).
- **`js/lex_core.css`**: Stili atomici per i widget fluttuanti del core (lettore audio, timer, controlli TTS).
- **Database Statici:**
  - `quiz_db.js`, `quiz_diritto_new.js`, `quiz_diritto_new2.js`: Banchi dati quiz a risposta multipla e aperta.
  - `search_db.js`: Indice completo per la ricerca fuzzy rapida via Fuse.js.
  - `glossary_db.js`: Dizionario ed etimologie dei termini accademici.
  - `timeline_db.js`: Eventi storici categorizzati per la timeline interattiva.

---

## 4. 📚 Moduli Disciplinari (Struttura ad Isole - 23 Materie)

Ogni materia possiede una cartella dedicata che ricalca uno schema uniforme:
- `index.html` (portale della disciplina)
- `quiz.html` (quiz specifico della materia)
- `style.css` (tematizzazione locale)
- `connections.html` (collegamenti concettuali)
- `summaries/*.md` (dispense e riassunti dettagliati capitolo per capitolo)

### Elenco Discipline Attive:
- **`Storia della filosofia/`**: 0 sintesi capitolo | Esempi file: ``
- **`archeologia/`**: 0 sintesi capitolo | Esempi file: `extracted_text, summaries`
- **`arte_contemporanea/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`arte_medievale/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`arte_romana/`**: 20 sintesi capitolo | Esempi file: `extracted_text, index.html, quiz.html, style.css, summaries`
- **`codicologia/`**: 16 sintesi capitolo | Esempi file: `index.html, quiz.html, style.css, summaries, connections.html`
- **`cristiana/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`cultura_greca/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`diritto/`**: 19 sintesi capitolo | Esempi file: `extracted_text, index.html, generate_summaries.py, ocr_all.py, quiz.html`
- **`filosofia/`**: 16 sintesi capitolo | Esempi file: `extracted_text, index.html, quiz.html, style.css, summaries`
- **`geografia/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`inglese/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`laboratorio/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`letteratura/`**: 0 sintesi capitolo | Esempi file: `extracted_text, summaries`
- **`letteratura_italiana/`**: 2 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`letteratura_latina/`**: 14 sintesi capitolo | Esempi file: `index.html, Nuovi file da organizzare e analizzare, quiz.html, style.css, summaries`
- **`museologia/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`restauro/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`storia/`**: 14 sintesi capitolo | Esempi file: `extracted_text, index.html, quiz.html, style.css, summaries`
- **`storia_arte/`**: 107 sintesi capitolo | Esempi file: `write_all_summaries.py, extracted_text, index.html, js, generate_clean_summaries.py`
- **`storia_contemporanea/`**: 62 moduli didattici (31 capitoli base `cap1.md-cap31.md` + 31 approfondimenti monografici `cap1_bis.md-cap31_bis.md`) | Esempi file: `index.html, quiz.html, connections.html, style.css, summaries/ (cap1.md-cap31.md, cap1_bis.md-cap31_bis.md), extracted_text, Sabbatucci e Vidotto.pdf`
- **`storia_medievale/`**: 1 sintesi capitolo | Esempi file: `index.html, style.css, summaries`
- **`tesi/`**: 1 sintesi capitolo | Esempi file: `index.html, js, style.css, summaries`

---

## 5. 🌲 Albero Completo della Struttura (File di Codice ed Asset)

```text
├── Lex//
│   ├── GUIDA_EASTER_EGGS.md
│   ├── achievements.html
│   ├── analytics.html
│   ├── assistant.html
│   ├── connections.html
│   ├── easter_eggs.html
│   ├── exam.html
│   ├── flashcards.html
│   ├── index.html
│   ├── manifest.json
│   ├── minigames.html
│   ├── offline.html
│   ├── planner.html
│   ├── prohibited.html
│   ├── secret_puzzle.html
│   ├── segreti.html
│   ├── sleep_study.html
│   ├── studio_max.html
│   ├── style.css
│   ├── sw.js
│   ├── timeline.html
├── diritto/
│   ├── connections.html
│   ├── generate_summaries.py
│   ├── index.html
│   ├── ocr_all.py
│   ├── quiz.html
│   ├── style.css
  ├── summaries/
  │   ├── 10_espropriazione.md
  │   ├── 11_regime_fiscale.md
  │   ├── 12_paesaggio.md
  │   ├── 13_sanzioni.md
  │   ├── 1_patrimonio.md
  │   ├── 2_governo.md
  │   ├── 3_individuazione.md
  │   ├── 4_tutela_internazionale.md
  │   ├── 5_tutela.md
  │   ├── 6_circolazione.md
  │   ├── 8_appalti.md
  │   ├── 9_ritrovamenti.md
  │   ├── plus1_restauro_falsi.md
  │   ├── pub1_costituzione.md
  │   ├── pub2_governo_parlamento.md
  │   ├── pub3_fonti_diritto.md
  │   ├── pub4_diritti_liberta.md
  │   ├── pub5_proprieta_impresa.md
  │   ├── spec1_contenziosi_codice_urbani.md
├── arte_medievale/
│   ├── index.html
│   ├── style.css
  ├── summaries/
  │   ├── cap1.md
├── filosofia/
│   ├── connections.html
│   ├── index.html
│   ├── quiz.html
│   ├── style.css
  ├── summaries/
  │   ├── cap10_newton.md
  │   ├── cap11_locke.md
  │   ├── cap12_berkeley.md
  │   ├── cap13_hume.md
  │   ├── cap14_illuminismo.md
  │   ├── cap15_vico_rousseau.md
  │   ├── cap16_kant.md
  │   ├── cap1_naturalismo.md
  │   ├── cap2_misura_mondo.md
  │   ├── cap3_bacone_galileo.md
  │   ├── cap4_tarda_scolastica.md
  │   ├── cap5_cartesio.md
  │   ├── cap6_spinoza.md
  │   ├── cap7_leibniz.md
  │   ├── cap8_crisi_razionalismo.md
  │   ├── cap9_hobbes.md
├── Storia della filosofia/
├── tesi/
│   ├── index.html
│   ├── style.css
  ├── js/
  │   ├── tesi_studio.js
  ├── summaries/
  │   ├── cap1.md
├── letteratura_latina/
│   ├── Testi_di_Lett_Latina_Plauto_Catullo_extracted.txt
│   ├── connections.html
│   ├── index.html
│   ├── quiz.html
│   ├── style.css
  ├── Nuovi file da organizzare e analizzare/
  ├── summaries/
  │   ├── cap1.md
  │   ├── cap2.md
  │   ├── cap3.md
  │   ├── cap4.md
  │   ├── cap5.md
  │   ├── cap6.md
  │   ├── plus1_grammatica.md
  │   ├── plus2_antologia.md
  │   ├── plus3_strumenti_digitali.md
  │   ├── spec1_terenzio_adelphoe.md
  │   ├── spec2_catullo_carmina.md
  │   ├── spec3_sallustio_catilina.md
  │   ├── spec4_cicerone_catilinaria.md
  │   ├── spec5_plauto_catullo.md
├── storia_medievale/
│   ├── index.html
│   ├── style.css
  ├── summaries/
  │   ├── cap1.md
├── cultura_greca/
│   ├── index.html
│   ├── style.css
  ├── summaries/
  │   ├── cap1.md
├── js/
│   ├── chart.umd.min.js
│   ├── glossary_db.js
│   ├── lex_core.css
│   ├── lex_core.js
│   ├── minigames.js
│   ├── quiz_db.js
│   ├── quiz_diritto_new.js
│   ├── quiz_diritto_new2.js
│   ├── search_db.js
│   ├── studio_max.css
│   ├── studio_max.js
│   ├── timeline_db.js
├── storia_contemporanea/
│   ├── index.html
│   ├── quiz.html
│   ├── connections.html
│   ├── style.css
│   ├── Sabbatucci e Vidotto - Il mondo contemporaneo. Dal 1848 a oggi.pdf
│   ├── extracted_text/
│   └── summaries/
│       ├── cap1.md, cap1_bis.md
│       ├── ...
│       └── cap31.md, cap31_bis.md
├── cristiana/
│   ├── index.html
│   ├── style.css
  ├── summaries/
  │   ├── cap1.md
├── storia_arte/
│   ├── connections.html
│   ├── dizionario.html
│   ├── generate_all_summaries.py
│   ├── generate_clean_summaries.py
│   ├── index.html
│   ├── ocr_art.py
│   ├── quiz.html
│   ├── style.css
│   ├── write_all_summaries.py
  ├── js/
  │   ├── artists_db.js
  ├── summaries/
  │   ├── barocco_6.md
  │   ├── focus_agnolo-bronzino.md
  │   ├── focus_agostino-carracci.md
  │   ├── focus_alfred-sisley.md
  │   ├── focus_andrea-del-sarto.md
  │   ├── focus_andrea-del-verrocchio.md
  │   ├── focus_andrea-della-robbia.md
  │   ├── focus_andrea-mantegna.md
  │   ├── focus_andrea-palladio.md
  │   ├── focus_andrea-pozzo.md
  │   ├── focus_annibale-carracci.md
  │   ├── focus_anton-raphael-mengs.md
  │   ├── focus_antonello-da-messina.md
  │   ├── focus_antonio-canova.md
  │   ├── focus_artemisia-gentileschi.md
  │   ├── focus_baldassarre-peruzzi.md
  │   ├── focus_beato-angelico.md
  │   ├── focus_benvenuto-cellini.md
  │   ├── focus_camille-corot.md
  │   ├── focus_camille-pissarro.md
  │   ├── focus_canaletto.md
  │   ├── focus_caravaggio.md
  │   ├── focus_caspar-david-friedrich.md
  │   ├── focus_claude-monet.md
  │   ├── focus_correggio.md
  │   ├── focus_cosme-tura.md
  │   ├── focus_domenico-ghirlandaio.md
  │   ├── focus_donatello.md
  │   ├── focus_donato-bramante.md
  │   ├── focus_edgar-degas.md
  │   ├── focus_edouard-manet.md
  │   ├── focus_ercole-de-roberti.md
  │   ├── focus_eugene-delacroix.md
  │   ├── focus_filippino-lippi.md
  │   ├── focus_filippo-brunelleschi.md
  │   ├── focus_francesco-borromini.md
  │   ├── focus_francesco-del-cossa.md
  │   ├── focus_francesco-guardi.md
  │   ├── focus_francesco-hayez.md
  │   ├── focus_gentile-da-fabriano.md
  │   ├── focus_georges-seurat.md
  │   ├── focus_giambattista-tiepolo.md
  │   ├── focus_giambologna.md
  │   ├── focus_gian-lorenzo-bernini.md
  │   ├── focus_giorgio-vasari.md
  │   ├── focus_giorgione.md
  │   ├── focus_giovanni-bellini.md
  │   ├── focus_giovanni-da-modena.md
  │   ├── focus_giovanni-della-robbia.md
  │   ├── focus_guercino.md
  │   ├── focus_guido-reni.md
  │   ├── focus_gustave-courbet.md
  │   ├── focus_henri-de-toulouse-lautrec.md
  │   ├── focus_honore-daumier.md
  │   ├── focus_jacopo-della-quercia.md
  │   ├── focus_jacopo-tintoretto.md
  │   ├── focus_jacques-louis-david.md
  │   ├── focus_jean-auguste-dominique-ingres.md
  │   ├── focus_jean-francois-millet.md
  │   ├── focus_johann-joachim-winckelmann.md
  │   ├── focus_john-constable.md
  │   ├── focus_jusepe-de-ribera.md
  │   ├── focus_leon-battista-alberti.md
  │   ├── focus_leonardo-da-vinci.md
  │   ├── focus_lorenzo-ghiberti.md
  │   ├── focus_lorenzo-lotto.md
  │   ├── focus_lorenzo-monaco.md
  │   ├── focus_luca-della-robbia.md
  │   ├── focus_luca-giordano.md
  │   ├── focus_luca-signorelli.md
  │   ├── focus_ludovico-carracci.md
  │   ├── focus_masaccio.md
  │   ├── focus_melozzo-da-forli.md
  │   ├── focus_michelangelo-buonarroti.md
  │   ├── focus_michelino-da-besozzo.md
  │   ├── focus_michelozzo.md
  │   ├── focus_paolo-uccello.md
  │   ├── focus_paolo-veronese.md
  │   ├── focus_parmigianino.md
  │   ├── focus_paul-cezanne.md
  │   ├── focus_paul-gauguin.md
  │   ├── focus_paul-signac.md
  │   ├── focus_piero-della-francesca.md
  │   ├── focus_piero-di-cosimo.md
  │   ├── focus_pierre-auguste-renoir.md
  │   ├── focus_pietro-da-cortona.md
  │   ├── focus_pietro-perugino.md
  │   ├── focus_pinturicchio.md
  │   ├── focus_pisanello.md
  │   ├── focus_pontormo.md
  │   ├── focus_raffaello-sanzio.md
  │   ├── focus_rosso-fiorentino.md
  │   ├── focus_salvator-rosa.md
  │   ├── focus_sandro-botticelli.md
  │   ├── focus_theodore-gericault.md
  │   ├── focus_tiziano-vecellio.md
  │   ├── focus_vincent-van-gogh.md
  │   ├── focus_william-turner.md
```

---
*Blueprint generato per l'orchestrazione con modelli di pianificazione avanzati.*