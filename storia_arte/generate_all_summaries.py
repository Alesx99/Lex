import os
import re
import json

# List of all artists with their IDs and names (extracted from artists_db.js)
artists = [
    {"id": "gentile-da-fabriano", "name": "Gentile da Fabriano", "period": "Gotico Internazionale", "years": "1370 – 1427"},
    {"id": "pisanello", "name": "Pisanello (Antonio Pisano)", "period": "Gotico Internazionale", "years": "1395 – 1455"},
    {"id": "lorenzo-monaco", "name": "Lorenzo Monaco", "period": "Gotico Internazionale", "years": "1370 – 1424"},
    {"id": "michelino-da-besozzo", "name": "Michelino da Besozzo", "period": "Gotico Internazionale", "years": "1370 – 1455"},
    {"id": "giovanni-da-modena", "name": "Giovanni da Modena", "period": "Gotico Internazionale", "years": "1379 – 1455"},
    {"id": "filippo-brunelleschi", "name": "Filippo Brunelleschi", "period": "Primo Rinascimento", "years": "1377 – 1446"},
    {"id": "donatello", "name": "Donatello", "period": "Primo Rinascimento", "years": "1386 – 1466"},
    {"id": "masaccio", "name": "Masaccio", "period": "Primo Rinascimento", "years": "1401 – 1428"},
    {"id": "lorenzo-ghiberti", "name": "Lorenzo Ghiberti", "period": "Primo Rinascimento", "years": "1378 – 1455"},
    {"id": "jacopo-della-quercia", "name": "Jacopo della Quercia", "period": "Primo Rinascimento", "years": "1374 – 1438"},
    {"id": "michelozzo", "name": "Michelozzo", "period": "Primo Rinascimento", "years": "1396 – 1472"},
    {"id": "beato-angelico", "name": "Beato Angelico", "period": "Primo Rinascimento", "years": "1395 – 1455"},
    {"id": "luca-della-robbia", "name": "Luca della Robbia", "period": "Primo Rinascimento", "years": "1400 – 1482"},
    {"id": "andrea-della-robbia", "name": "Andrea della Robbia", "period": "Primo Rinascimento", "years": "1435 – 1525"},
    {"id": "giovanni-della-robbia", "name": "Giovanni della Robbia", "period": "Primo Rinascimento", "years": "1469 – 1529"},
    {"id": "leon-battista-alberti", "name": "Leon Battista Alberti", "period": "Secondo Quattrocento", "years": "1404 – 1472"},
    {"id": "paolo-uccello", "name": "Paolo Uccello", "period": "Secondo Quattrocento", "years": "1397 – 1475"},
    {"id": "piero-della-francesca", "name": "Piero della Francesca", "period": "Secondo Quattrocento", "years": "1412 – 1492"},
    {"id": "andrea-del-verrocchio", "name": "Andrea del Verrocchio", "period": "Secondo Quattrocento", "years": "1435 – 1588"},
    {"id": "sandro-botticelli", "name": "Sandro Botticelli", "period": "Secondo Quattrocento", "years": "1445 – 1510"},
    {"id": "antonello-da-messina", "name": "Antonello da Messina", "period": "Secondo Quattrocento", "years": "1430 – 1479"},
    {"id": "andrea-mantegna", "name": "Andrea Mantegna", "period": "Secondo Quattrocento", "years": "1431 – 1506"},
    {"id": "giovanni-bellini", "name": "Giovanni Bellini", "period": "Secondo Quattrocento", "years": "1430 – 1516"},
    {"id": "pietro-perugino", "name": "Pietro Perugino", "period": "Secondo Quattrocento", "years": "1448 – 1523"},
    {"id": "cosme-tura", "name": "Cosmè Tura", "period": "Secondo Quattrocento", "years": "1430 – 1495"},
    {"id": "francesco-del-cossa", "name": "Francesco del Cossa", "period": "Secondo Quattrocento", "years": "1436 – 1478"},
    {"id": "ercole-de-roberti", "name": "Ercole de' Roberti", "period": "Secondo Quattrocento", "years": "1451 – 1496"},
    {"id": "domenico-ghirlandaio", "name": "Domenico Ghirlandaio", "period": "Secondo Quattrocento", "years": "1449 – 1494"},
    {"id": "filippino-lippi", "name": "Filippino Lippi", "period": "Secondo Quattrocento", "years": "1457 – 1504"},
    {"id": "piero-di-cosimo", "name": "Piero di Cosimo", "period": "Secondo Quattrocento", "years": "1462 – 1522"},
    {"id": "pinturicchio", "name": "Pinturicchio", "period": "Secondo Quattrocento", "years": "1454 – 1513"},
    {"id": "luca-signorelli", "name": "Luca Signorelli", "period": "Secondo Quattrocento", "years": "1445 – 1523"},
    {"id": "melozzo-da-forli", "name": "Melozzo da Forlì", "period": "Secondo Quattrocento", "years": "1438 – 1494"},
    {"id": "donato-bramante", "name": "Donato Bramante", "period": "Rinascimento Maturo", "years": "1444 – 1514"},
    {"id": "leonardo-da-vinci", "name": "Leonardo da Vinci", "period": "Rinascimento Maturo", "years": "1452 – 1519"},
    {"id": "raffaello-sanzio", "name": "Raffaello Sanzio", "period": "Rinascimento Maturo", "years": "1483 – 1520"},
    {"id": "michelangelo-buonarroti", "name": "Michelangelo Buonarroti", "period": "Rinascimento Maturo", "years": "1475 – 1564"},
    {"id": "giorgione", "name": "Giorgione da Castelfranco", "period": "Rinascimento Veneto", "years": "1477 – 1510"},
    {"id": "tiziano-vecellio", "name": "Tiziano Vecellio", "period": "Rinascimento Veneto", "years": "1488 – 1576"},
    {"id": "lorenzo-lotto", "name": "Lorenzo Lotto", "period": "Rinascimento Veneto", "years": "1480 – 1556"},
    {"id": "correggio", "name": "Correggio", "period": "Rinascimento Veneto", "years": "1489 – 1534"},
    {"id": "andrea-palladio", "name": "Andrea Palladio", "period": "Rinascimento Veneto", "years": "1508 – 1580"},
    {"id": "jacopo-tintoretto", "name": "Jacopo Tintoretto", "period": "Rinascimento Veneto", "years": "1518 – 1594"},
    {"id": "paolo-veronese", "name": "Paolo Veronese", "period": "Rinascimento Veneto", "years": "1528 – 1588"},
    {"id": "andrea-del-sarto", "name": "Andrea del Sarto", "period": "Manierismo", "years": "1486 – 1530"},
    {"id": "baldassarre-peruzzi", "name": "Baldassarre Peruzzi", "period": "Manierismo", "years": "1481 – 1536"},
    {"id": "giorgio-vasari", "name": "Giorgio Vasari", "period": "Manierismo", "years": "1511 – 1574"},
    {"id": "pontormo", "name": "Pontormo (Jacopo Carucci)", "period": "Manierismo", "years": "1494 – 1557"},
    {"id": "rosso-fiorentino", "name": "Rosso Fiorentino", "period": "Manierismo", "years": "1495 – 1540"},
    {"id": "agnolo-bronzino", "name": "Agnolo Bronzino", "period": "Manierismo", "years": "1503 – 1572"},
    {"id": "parmigianino", "name": "Parmigianino (Francesco Mazzola)", "period": "Manierismo", "years": "1503 – 1540"},
    {"id": "benvenuto-cellini", "name": "Benvenuto Cellini", "period": "Manierismo", "years": "1500 – 1571"},
    {"id": "giambologna", "name": "Giambologna", "period": "Manierismo", "years": "1529 – 1608"},
    {"id": "caravaggio", "name": "Caravaggio (Michelangelo Merisi)", "period": "Barocco", "years": "1571 – 1610"},
    {"id": "gian-lorenzo-bernini", "name": "Gian Lorenzo Bernini", "period": "Barocco", "years": "1598 – 1680"},
    {"id": "francesco-borromini", "name": "Francesco Borromini", "period": "Barocco", "years": "1599 – 1667"},
    {"id": "pietro-da-cortona", "name": "Pietro da Cortona", "period": "Barocco", "years": "1596 – 1669"},
    {"id": "annibale-carracci", "name": "Annibale Carracci", "period": "Barocco", "years": "1560 – 1609"},
    {"id": "agostino-carracci", "name": "Agostino Carracci", "period": "Barocco", "years": "1557 – 1602"},
    {"id": "ludovico-carracci", "name": "Ludovico Carracci", "period": "Barocco", "years": "1555 – 1619"},
    {"id": "guido-reni", "name": "Guido Reni", "period": "Barocco", "years": "1575 – 1642"},
    {"id": "guercino", "name": "Guercino", "period": "Barocco", "years": "1591 – 1666"},
    {"id": "artemisia-gentileschi", "name": "Artemisia Gentileschi", "period": "Barocco", "years": "1593 – 1653"},
    {"id": "jusepe-de-ribera", "name": "Jusepe de Ribera", "period": "Barocco", "years": "1591 – 1652"},
    {"id": "salvator-rosa", "name": "Salvator Rosa", "period": "Barocco", "years": "1615 – 1673"},
    {"id": "luca-giordano", "name": "Luca Giordano", "period": "Barocco", "years": "1634 – 1705"},
    {"id": "andrea-pozzo", "name": "Andrea Pozzo", "period": "Barocco", "years": "1642 – 1709"},
    {"id": "giambattista-tiepolo", "name": "Giambattista Tiepolo", "period": "Barocco", "years": "1696 – 1770"},
    {"id": "canaletto", "name": "Canaletto", "period": "Barocco", "years": "1697 – 1768"},
    {"id": "francesco-guardi", "name": "Francesco Guardi", "period": "Barocco", "years": "1712 – 1793"},
    {"id": "johann-joachim-winckelmann", "name": "Johann Joachim Winckelmann", "period": "Neoclassicismo", "years": "1717 – 1768"},
    {"id": "anton-raphael-mengs", "name": "Anton Raphael Mengs", "period": "Neoclassicismo", "years": "1728 – 1779"},
    {"id": "antonio-canova", "name": "Antonio Canova", "period": "Neoclassicismo", "years": "1757 – 1822"},
    {"id": "jacques-louis-david", "name": "Jacques-Louis David", "period": "Neoclassicismo", "years": "1748 – 1825"},
    {"id": "jean-auguste-dominique-ingres", "name": "Jean-Auguste-Dominique Ingres", "period": "Neoclassicismo", "years": "1780 – 1867"},
    {"id": "theodore-gericault", "name": "Théodore Géricault", "period": "Romanticismo", "years": "1791 – 1824"},
    {"id": "eugene-delacroix", "name": "Eugène Delacroix", "period": "Romanticismo", "years": "1798 – 1863"},
    {"id": "francesco-hayez", "name": "Francesco Hayez", "period": "Romanticismo", "years": "1791 – 1882"},
    {"id": "caspar-david-friedrich", "name": "Caspar David Friedrich", "period": "Romanticismo", "years": "1774 – 1840"},
    {"id": "william-turner", "name": "William Turner", "period": "Romanticismo", "years": "1775 – 1851"},
    {"id": "john-constable", "name": "John Constable", "period": "Romanticismo", "years": "1776 – 1837"},
    {"id": "gustave-courbet", "name": "Gustave Courbet", "period": "Realismo", "years": "1819 – 1877"},
    {"id": "jean-francois-millet", "name": "Jean-François Millet", "period": "Realismo", "years": "1814 – 1875"},
    {"id": "honore-daumier", "name": "Honoré Daumier", "period": "Realismo", "years": "1808 – 1879"},
    {"id": "camille-corot", "name": "Camille Corot", "period": "Realismo", "years": "1796 – 1875"},
    {"id": "edouard-manet", "name": "Édouard Manet", "period": "Impressionismo", "years": "1832 – 1883"},
    {"id": "claude-monet", "name": "Claude Monet", "period": "Impressionismo", "years": "1840 – 1926"},
    {"id": "pierre-auguste-renoir", "name": "Pierre-Auguste Renoir", "period": "Impressionismo", "years": "1841 – 1919"},
    {"id": "edgar-degas", "name": "Edgar Degas", "period": "Impressionismo", "years": "1834 – 1917"},
    {"id": "camille-pissarro", "name": "Camille Pissarro", "period": "Impressionismo", "years": "1830 – 1903"},
    {"id": "alfred-sisley", "name": "Alfred Sisley", "period": "Impressionismo", "years": "1839 – 1899"},
    {"id": "paul-cezanne", "name": "Paul Cézanne", "period": "Post-Impressionismo", "years": "1839 – 1906"},
    {"id": "georges-seurat", "name": "Georges Seurat", "period": "Post-Impressionismo", "years": "1859 – 1891"},
    {"id": "paul-gauguin", "name": "Paul Gauguin", "period": "Post-Impressionismo", "years": "1848 – 1903"},
    {"id": "vincent-van-gogh", "name": "Vincent van Gogh", "period": "Post-Impressionismo", "years": "1853 – 1890"},
    {"id": "henri-de-toulouse-lautrec", "name": "Henri de Toulouse-Lautrec", "period": "Post-Impressionismo", "years": "1864 – 1901"},
    {"id": "paul-signac", "name": "Paul Signac", "period": "Post-Impressionismo", "years": "1863 – 1935"}
]

# Read complete textbooks
with open("../knowledge_base/storia_arte/brunelleschi_completo.md", "r", encoding="utf-8") as f:
    brunelleschi_text = f.read()

with open("../knowledge_base/storia_arte/canova_completo.md", "r", encoding="utf-8") as f:
    canova_text = f.read()

# Helper to split file by Page
def get_pages(text):
    return re.split(r'## Pagina \d+', text)

brun_pages = get_pages(brunelleschi_text)
canova_pages = get_pages(canova_text)

def find_best_page(pages, artist_name):
    best_idx = -1
    max_count = 0
    
    clean_name = re.sub(r'\(.*?\)', '', artist_name).strip()
    words = clean_name.split()
    
    for idx, page in enumerate(pages):
        # Skip index pages to avoid matching table of contents
        if idx < 15:
            continue
        
        count = 0
        # High value for full name match
        count += len(re.findall(re.escape(clean_name), page, re.IGNORECASE)) * 15
        
        # Medium value for last name match
        if len(words) > 1:
            surname = words[-1]
            count += len(re.findall(re.escape(surname), page, re.IGNORECASE)) * 2
        else:
            count += len(re.findall(re.escape(words[0]), page, re.IGNORECASE)) * 2
            
        if count > max_count:
            max_count = count
            best_idx = idx
            
    # Fallback to simple matching if no highly-dense page above index is found
    if best_idx == -1 or max_count == 0:
        for idx, page in enumerate(pages):
            if re.search(re.escape(words[0]), page, re.IGNORECASE):
                return idx
        return 20 # fallback page
        
    return best_idx

os.makedirs("summaries", exist_ok=True)

print(f"Starting scored auto-generation of {len(artists)} summaries...")

for artist in artists:
    name = artist["name"]
    artist_id = artist["id"]
    period = artist["period"]
    years = artist["years"]
    
    # Check which book covers the period
    pages_to_search = brun_pages
    book_name = "Brunelleschi.pdf"
    if period in ["Barocco", "Neoclassicismo", "Romanticismo", "Realismo", "Impressionismo", "Post-Impressionismo"]:
        pages_to_search = canova_pages
        book_name = "Canova.pdf"
        
    # Find best page using frequency scoring
    best_page_idx = find_best_page(pages_to_search, name)
    
    # Extract 6 pages starting from the best page index
    start_page = max(0, best_page_idx)
    end_page = min(start_page + 6, len(pages_to_search))
    
    extracted_pages = []
    for p_idx in range(start_page, end_page):
        p_text = pages_to_search[p_idx].strip()
        p_text = re.sub(r'\n+', '\n', p_text)
        extracted_pages.append(f"### Approfondimento (Fonte: Pagina {p_idx+1} del Manuale)\n{p_text}")
        
    extracted_content = "\n\n".join(extracted_pages)

    # Format the Markdown file content
    md_content = f"""# Focus Artista: {name} ({years})

*   **Periodo/Movimento**: {period}
*   **Fonte Manuale**: {book_name}

---

## Inquadramento Storico e Critico
{name} rappresenta una figura fondamentale all'interno del movimento artistico del **{period}**. La sua opera testimonia lo sviluppo formale, teorico e metodologico descritto dettagliatamente nelle pagine del manuale di riferimento.

---

## Analisi e Contenuto dal Manuale

{extracted_content}

---

## Quiz di Autovalutazione

**1. A quale movimento o periodo artistico appartiene l'opera di {name}?**
* a) Gotico Internazionale.
* b) {period}.
* c) Rinascimento Maturo.
* *Risposta corretta: b*

**2. Quale manuale d'esame contiene l'analisi completa di questo artista?**
* a) {book_name}.
* b) Diritto dei Beni Culturali.
* c) Codicologia e Paleografia.
* *Risposta corretta: a*

**3. Quali sono gli estremi cronologici (anni di nascita e morte/attività) attribuiti a {name}?**
* a) 1500 – 1550.
* b) {years}.
* c) 1780 – 1830.
* *Risposta corretta: b*
"""

    file_path = f"summaries/focus_{artist_id}.md"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(md_content)

print("Finished scored generation of all artist focus summaries.")
