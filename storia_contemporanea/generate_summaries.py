import os
import re

CHAPTERS = {
    1: {"title": "Le rivoluzioni del 1848", "period": "1848-1849", "time": "~9 min", "pages": "3-20"},
    2: {"title": "Società borghese e movimento operaio", "period": "1850-1875", "time": "~10 min", "pages": "21-46"},
    3: {"title": "L'unità d'Italia", "period": "1849-1861", "time": "~9 min", "pages": "47-65"},
    4: {"title": "L'Europa delle grandi potenze (1850-1890)", "period": "1850-1890", "time": "~11 min", "pages": "66-96"},
    5: {"title": "I nuovi mondi: Stati Uniti e Giappone", "period": "1850-1900", "time": "~8 min", "pages": "97-112"},
    6: {"title": "La seconda rivoluzione industriale", "period": "1870-1914", "time": "~8 min", "pages": "113-129"},
    7: {"title": "Imperialismo e colonialismo", "period": "1870-1914", "time": "~9 min", "pages": "130-147"},
    8: {"title": "Stato e società nell'Italia unita", "period": "1861-1896", "time": "~13 min", "pages": "148-185"},
    9: {"title": "Verso la società di massa", "period": "Fine Ottocento - 1914", "time": "~11 min", "pages": "186-213"},
    10: {"title": "L'Europa tra due secoli", "period": "1890-1914", "time": "~9 min", "pages": "214-233"},
    11: {"title": "Imperialismo e rivoluzione nei continenti extraeuropei", "period": "1900-1914", "time": "~7 min", "pages": "234-243"},
    12: {"title": "L'Italia giolittiana", "period": "1896-1914", "time": "~10 min", "pages": "244-268"},
    13: {"title": "La prima guerra mondiale", "period": "1914-1918", "time": "~13 min", "pages": "269-301"},
    14: {"title": "La rivoluzione russa", "period": "1917-1924", "time": "~9 min", "pages": "302-321"},
    15: {"title": "L'eredità della grande guerra", "period": "1919-1929", "time": "~9 min", "pages": "322-341"},
    16: {"title": "Il dopoguerra in Italia e l'avvento del fascismo", "period": "1919-1926", "time": "~10 min", "pages": "342-365"},
    17: {"title": "La grande crisi: economia e società negli anni '30", "period": "1929-1939", "time": "~9 min", "pages": "366-387"},
    18: {"title": "L'età dei totalitarismi", "period": "1922-1939", "time": "~13 min", "pages": "388-421"},
    19: {"title": "L'Italia fascista", "period": "1925-1940", "time": "~11 min", "pages": "422-448"},
    20: {"title": "Il tramonto del colonialismo. L'Asia e l'America Latina", "period": "1919-1939", "time": "~8 min", "pages": "449-463"},
    21: {"title": "La seconda guerra mondiale", "period": "1939-1945", "time": "~13 min", "pages": "464-495"},
    22: {"title": "Il mondo diviso", "period": "1945-1960", "time": "~12 min", "pages": "496-526"},
    23: {"title": "La decolonizzazione e il Terzo Mondo", "period": "1945-1975", "time": "~9 min", "pages": "527-548"},
    24: {"title": "L'Italia dopo il fascismo", "period": "1943-1958", "time": "~10 min", "pages": "549-572"},
    25: {"title": "La società del benessere", "period": "1950-1970", "time": "~8 min", "pages": "573-590"},
    26: {"title": "Distensione e confronto", "period": "1960-1975", "time": "~8 min", "pages": "591-607"},
    27: {"title": "Apogeo e crisi del bipolarismo", "period": "1973-1991", "time": "~11 min", "pages": "608-635"},
    28: {"title": "L'Italia dal miracolo economico alla crisi della prima repubblica", "period": "1958-1992", "time": "~11 min", "pages": "636-661"},
    29: {"title": "La società postindustriale", "period": "Anni '70 - 2000", "time": "~9 min", "pages": "662-680"},
    30: {"title": "Il mondo contemporaneo", "period": "1991-2005", "time": "~13 min", "pages": "681-720"},
    31: {"title": "La seconda repubblica in Italia", "period": "1992-2005", "time": "~9 min", "pages": "721-743"}
}

KEYWORD_DESCRIPTIONS = {
    "Progresso": "Idea-guida della cultura positivista ottocentesca, che identifica il mutamento storico con un cammino lineare, indefinito e inarrestabile verso forme superiori di civiltà, sapere e benessere materiale guidato dal progresso scientifico e tecnologico.",
    "Potenza": "Categoria centrale della politica internazionale post-1870 (Machtpolitik): lo Stato nazionale si afferma attraverso la potenza militare, industriale e demografica, subordinando l'equilibrio diplomatico e i trattati alla tutela rigorosa del proprio interesse nazionale strategico.",
    "Modernizzazione": "Insieme di mutamenti economici, politici, sociali e culturali (industrializzazione, razionalizzazione burocratica, alfabetizzazione, laicizzazione) che trasformano società tradizionali e agrarie in sistemi produttivi complessi e dinamici (come nel Giappone della Restaurazione Meiji).",
    "Liberismo/Protezionismo": "I due paradigmi economici cardine dell'Ottocento e Novecento: il liberismo (libero scambio di Smith e Ricardo) fondato sulla libera circolazione delle merci senza dazi, opposto al protezionismo che introduce tariffe doganali per salvaguardare le industrie e l'agricoltura nazionali dalla concorrenza estera.",
    "Imperialismo": "Fase suprema dell'espansione coloniale (1870-1914) caratterizzata da un disegno sistematico di assoggettamento politico, militare ed economico di interi continenti (Africa, Asia) motivato dalla ricerca di mercati esclusivi, materie prime e prestigio geopolitico.",
    "Accentramento/Decentramento": "Dilemma strutturale dello Stato moderno: l'accentramento concentra le funzioni decisionali e burocratiche nel governo centrale (modello sabaudo/napoleonico esteso all'Italia unita con i prefetti); il decentramento riconosce autonomia politica ed amministrativa agli enti locali e alle comunità territoriali.",
    "Secolarizzazione": "Processo storico di progressiva autonomia della società, della cultura, delle istituzioni civili e della morale individuale dal controllo dogmatico delle autorità e delle credenze religiose, con la privatizzazione della fede.",
    "Radicalismo": "Corrente politica democratica e laica che persegue riforme democratiche profonde e incisive (laicità dello Stato, istruzione pubblica obbligatoria, giustizia sociale, difesa delle libertà repubblicane), particolarmente influente nella Terza Repubblica francese.",
    "Massoneria": "Rete transnazionale di logge segrete e filantropiche di orientamento illuminista, liberale e anticlericale, che svolse un ruolo di primo piano nella classe dirigente italiana ed europea del Risorgimento e dell'età giolittiana.",
    "Propaganda": "L'uso sistematico e scientifico dei mezzi di comunicazione (manifesti, stampa, cinema, radio) per mobilitare le masse popolari, indirizzare l'opinione pubblica e legittimare decisioni politiche, belliche o ideologiche di governi e regimi totalitari.",
    "Soviet": "Consigli di delegati operai, contadini e soldati sorti spontaneamente in Russia durante la rivoluzione del 1905 e riemersi nel 1917, divenuti l'organo costitutivo ed emblematico del potere bolscevico e dello Stato socialista sovietico.",
    "Ceto medio": "Fascia sociale intermedia tra la grande borghesia capitalistica e la classe lavoratrice salariata (impiegati pubblici e privati, commercianti, piccoli proprietari, liberi professionisti), protagonista dei consumi di massa ma anche bacino di consenso dei regimi autoritari negli anni della crisi.",
    "Totalitarismo": "Modello di potere assoluto e inedito del Novecento teorizzato da Hannah Arendt, in cui un partito unico elimina ogni pluralismo politico e sociale, instaura il terrore poliziesco, mobilita permanentemente le masse e subordina interamente la vita civile, culturale e privata all'ideologia di Stato.",
    "Consenso": "L'adesione attiva, passiva o conformistica della popolazione a un regime politico (in particolare ai regimi totalitari), ottenuta combinando la propaganda di massa, i servizi di welfare, le organizzazioni ricreative e giovanili e l'intimidazione poliziesca.",
    "Populismo": "Stile o dottrina politica che contrappone un popolo virtuoso, omogeneo e puro a élite corrotte e cosmopolite, affidandosi spesso alla guida carismatica di un leader che stabilisce un rapporto diretto con le masse bypassando le mediazioni istituzionali.",
    "Genocidio": "La distruzione deliberata, sistematica e pianificata di un intero gruppo nazionale, etnico, razziale o religioso. Termine coniato dal giurista Raphael Lemkin, trovò tragica incarnazione nella Shoah nazista (lo sterminio di 6 milioni di ebrei europei).",
    "Nucleare": "L'era geopolitica ed energetica inaugurata nell'agosto 1945 con Hiroshima e Nagasaki, fondata sulla minaccia della distruzione planetaria (MAD, Mutua Distruzione Assicurata) come perno dell'equilibrio bipolare USA-URSS durante la Guerra Fredda.",
    "Qualunquismo": "Atteggiamento di sfiducia disincantata verso la politica professionale, i partiti organizzati e le ideologie, nato nel dopoguerra italiano attorno al movimento 'L'Uomo Qualunque' di Guglielmo Giannini in nome delle esigenze pratiche dell'uomo comune.",
    "Ecologia": "La presa di coscienza scientifica, civile e politica dei limiti fisici ed ambientali dello sviluppo capitalistico, nata negli anni Settanta per preservare gli equilibri dell'ecosfera, combattere l'inquinamento e garantire la sostenibilità per le future generazioni."
}

def clean_text(s):
    s = re.sub(r'[ \t]+', ' ', s)
    return s.strip()

def extract_sommario_paragraphs(full_text):
    sommario_idx = full_text.rfind("Sommario")
    biblio_idx = full_text.rfind("Bibliografia")
    if sommario_idx == -1:
        return []
    
    if biblio_idx > sommario_idx:
        raw_body = full_text[sommario_idx + len("Sommario"):biblio_idx].strip()
    else:
        raw_body = full_text[sommario_idx + len("Sommario"):].strip()
        
    lines = [l.strip() for l in raw_body.split('\n')]
    
    raw_paras = []
    curr = []
    for l in lines:
        if not l:
            continue
        curr.append(l)
        if l.endswith(('.', '!', '?')):
            raw_paras.append(' '.join(curr))
            curr = []
    if curr:
        raw_paras.append(' '.join(curr))
        
    # Stitch blocks where next block starts with lowercase or previous ended abnormally
    stitched = []
    for p in raw_paras:
        p_clean = clean_text(p)
        if not p_clean:
            continue
        if not stitched:
            stitched.append(p_clean)
        else:
            prev = stitched[-1]
            if p_clean[0].islower() or not prev.endswith(('.', '!', '?')) or prev.endswith((',', ';', '-', '–')):
                if prev.endswith('-'):
                    stitched[-1] = prev[:-1] + p_clean
                else:
                    stitched[-1] = prev + ' ' + p_clean
            else:
                stitched.append(p_clean)
                
    return stitched

def process_section_text(sec_text):
    lines = [l.strip() for l in sec_text.split('\n') if l.strip()]
    if not lines:
        return "", []
    
    subtopics = ""
    start_line = 0
    if len(lines) > 0 and (' - ' in lines[0] or ', ' in lines[0]):
        subtopics = lines[0]
        start_line = 1
        if len(lines) > 1 and (' - ' in lines[1] or lines[1].endswith('.')):
            if not any(lines[1].startswith(prefix) for prefix in ['Nel ', 'La ', 'Il ', 'L\'', 'Gli ', 'In ']):
                subtopics += " " + lines[1]
                start_line = 2
    
    body_paragraphs = lines[start_line:]
    
    filtered = []
    for p in body_paragraphs:
        if re.match(r'^[0-9]+$', p):
            continue
        if 'Sabbatucci e Vidotto' in p or 'Il mondo contemporaneo' in p:
            continue
        if p.startswith('Parola chiave'):
            continue
        filtered.append(p)
    
    paragraphs = []
    curr = []
    for line in filtered:
        curr.append(line)
        if line.endswith('.') or line.endswith(':') or line.endswith(';'):
            joined = ' '.join(curr)
            if len(joined) > 120:
                paragraphs.append(joined)
                curr = []
    if curr:
        paragraphs.append(' '.join(curr))
        
    return subtopics, paragraphs

def extract_chronology(full_text, ch_period):
    # Search for date sentences that begin or contain strong event markers
    sentences = re.split(r'(?<=[.!?])\s+', full_text.replace('\n', ' '))
    found_events = []
    seen_years = set()
    
    pattern = re.compile(r'\b(18[4-9][0-9]|19[0-9]{2}|200[0-5])\b')
    
    for s in sentences:
        s_clean = clean_text(s)
        if len(s_clean) < 40 or len(s_clean) > 280:
            continue
        if 'Sabbatucci' in s_clean or 'Bibliografia' in s_clean or 'Sommario' in s_clean:
            continue
            
        m = pattern.search(s_clean)
        if m:
            yr = int(m.group(1))
            if yr not in seen_years:
                seen_years.add(yr)
                # Ensure clean formatting without unescaped pipes
                desc = s_clean.replace('|', '/')
                found_events.append((yr, desc))
                if len(found_events) >= 8:
                    break
                    
    found_events.sort(key=lambda x: x[0])
    return found_events

def generate_chapter_summary(ch):
    path = f"storia_contemporanea/extracted_text/cap{ch}.txt"
    with open(path, encoding="utf-8") as f:
        full_text = f.read()
        
    meta = CHAPTERS[ch]
    sommario_paras = extract_sommario_paragraphs(full_text)
    
    sommario_idx = full_text.rfind("Sommario")
    main_text = full_text[:sommario_idx] if sommario_idx != -1 else full_text
    
    # Find all sections: e.g. "1.1. Una rivoluzione europea."
    pattern = rf'(?:^|\n)({ch}\.[0-9]+)\.\s+([^\n\r]+)'
    matches = list(re.finditer(pattern, main_text))
    
    # Find Parola chiave
    kw_match = re.search(r'Parola chiave\s+([^\n\r\.]+)', full_text)
    kw_name = kw_match.group(1).strip() if kw_match else None
    
    md = []
    md.append(f"# Capitolo {ch}: {meta['title']}")
    md.append("")
    md.append(f"**Autori:** Giovanni Sabbatucci, Vittorio Vidotto (*Il mondo contemporaneo. Dal 1848 a oggi*)  ")
    md.append(f"**Periodo Storico:** {meta['period']} | **Pagine Libro:** {meta['pages']} | **Tempo di Lettura:** {meta['time']}  ")
    md.append("")
    md.append("---")
    md.append("")
    
    # Introduzione e Quadro Storico
    md.append("## Introduzione e Quadro Storico")
    if sommario_paras:
        # Use first complete paragraph
        intro_text = sommario_paras[0]
        # If it was very brief (under 120 chars) and there is a second one, combine
        if len(intro_text) < 140 and len(sommario_paras) > 1:
            intro_text += " " + sommario_paras[1]
        md.append(intro_text)
    else:
        md.append(f"Il capitolo analizza gli eventi cruciali del periodo {meta['period']}, esaminando i mutamenti politici, sociali ed economici descritti nell'opera di Sabbatucci e Vidotto.")
    md.append("")
    
    # Process sections
    for i, m in enumerate(matches):
        sec_num = m.group(1)
        sec_title = m.group(2).strip().rstrip('.')
        start = m.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(main_text)
        sec_raw = main_text[start:end].strip()
        
        subtopics, paras = process_section_text(sec_raw)
        
        md.append(f"## {sec_num} {sec_title}")
        if subtopics:
            clean_sub = clean_text(subtopics).replace(' - ', ' • ').replace('; ', ' • ')
            md.append(f"**Nuclei Tematici:** *{clean_sub}*")
            md.append("")
            
        if paras:
            selected_paras = paras[:5]
            for p in selected_paras:
                p_clean = clean_text(p)
                md.append(f"{p_clean}")
                md.append("")
        else:
            md.append(f"Approfondimento analitico della sezione {sec_num} ({sec_title}) all'interno del manuale.")
            md.append("")
            
    # Parola chiave callout
    if kw_name:
        clean_kw = kw_name.strip()
        matched_kw = None
        for k in KEYWORD_DESCRIPTIONS:
            if k.lower() in clean_kw.lower():
                matched_kw = k
                break
        
        desc = KEYWORD_DESCRIPTIONS.get(matched_kw, f"Concetto storiografico e analitico fondamentale trattato da Sabbatucci e Vidotto per comprendere le dinamiche del capitolo {ch}.")
        md.append("---")
        md.append("")
        md.append(f"> ### 🔍 Parola Chiave: {clean_kw}")
        md.append(f"> {desc}")
        md.append("")
        
    # Quadro Sinottico / Cronologia
    events = extract_chronology(full_text, meta['period'])
    if events:
        md.append("---")
        md.append("")
        md.append("## Quadro Sinottico delle Tappe Fondamentali")
        md.append("")
        md.append("| Anno / Periodo | Ambito / Evento Rilevante |")
        md.append("| :--- | :--- |")
        for yr, desc in events:
            # Highlight key concept
            md.append(f"| **{yr}** | {desc} |")
        md.append("")
        
    # Sommario Ufficiale
    md.append("---")
    md.append("")
    md.append("## Sommario di Studio Ufficiale (Sabbatucci - Vidotto)")
    md.append("")
    if sommario_paras:
        for idx, sp in enumerate(sommario_paras, 1):
            md.append(f"{idx}. {sp}")
            md.append("")
    else:
        md.append(f"Sintesi complessiva del Capitolo {ch} redatta sulla base del testo accademico di Laterza.")
        md.append("")

    return '\n'.join(md)

if __name__ == "__main__":
    out_dir = "storia_contemporanea/summaries"
    os.makedirs(out_dir, exist_ok=True)
    for ch in range(1, 32):
        content = generate_chapter_summary(ch)
        out_path = os.path.join(out_dir, f"cap{ch}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated {out_path} ({len(content)} chars)")
    print("All 31 summaries regenerated successfully!")
