/**
 * Lex Studiorum - Centralized Timeline Database
 * Contains events categorized by subject with links to the corresponding study summaries.
 */

const timelineDatabase = [
    // --- STORIA MODERNA ---
    {
        id: "sto_hus_1414",
        year: 1414,
        title: "Condanna al rogo di Jan Hus",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Jan Hus viene condannato al rogo durante il Concilio di Costanza, innescando la rivolta degli hussiti in Boemia.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_lipany_1434",
        year: 1434,
        title: "Battaglia di Lipany",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "La sconfitta dell'ala radicale hussita segna la fine delle guerre hussite in Boemia.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_erasmo_1509",
        year: 1509,
        title: "Pubblicazione dell'Elogio della Follia",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Erasmo da Rotterdam pubblica l'opera caposaldo dell'umanesimo cristiano in cui critica la corruzione ecclesiastica.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_tesi_1517",
        year: 1517,
        title: "Martin Lutero e le 95 Tesi",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Martin Lutero affigge a Wittenberg le sue 95 Tesi contro la vendita delle indulgenze, dando inizio alla Riforma Protestante.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_carlo_1519",
        year: 1519,
        title: "Elezione imperiale di Carlo V",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Carlo V d'Asburgo viene eletto imperatore, ereditando un territorio immenso ed avviando il sogno della Restauratio Imperii.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_worms_1521",
        year: 1521,
        title: "Dieta di Worms",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Lutero compare davanti a Carlo V e rifiuta di ritrattare le sue tesi. Viene bandito dall'Impero e protetto da Federico di Sassonia.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_contadini_1524",
        year: 1524,
        title: "Guerra dei Contadini in Germania",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Thomas Müntzer guida una rivolta popolare antifeudale unendo istanze evangeliche. Lutero condanna duramente la rivolta.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_sacco_1527",
        year: 1527,
        title: "Sacco di Roma",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "I lanzichenecchi imperiali saccheggiano Roma, provocando una profonda rottura tra Carlo V e papa Clemente VII.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_supremazia_1534",
        year: 1534,
        title: "Atto di Supremazia",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Enrico VIII Tudor viene dichiarato capo supremo della Chiesa d'Inghilterra dal Parlamento, formalizzando lo scisma anglicano.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_trento_1545",
        year: 1545,
        title: "Apertura del Concilio di Trento",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Papa Paolo III convoca il concilio per riorganizzare la Chiesa cattolica e contrastare l'eresia protestante (Controriforma).",
        link: "storia/index.html?open=summaries/sto2_controriforma.md"
    },
    {
        id: "sto_augusta_1555",
        year: 1555,
        title: "Pace di Augusta",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Sancisce il principio del 'cuius regio eius religio', dividendo la Germania tra cattolici e luterani e segnando la fine dell'universalismo di Carlo V.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_cateau_1559",
        year: 1559,
        title: "Pace di Cateau-Cambrésis",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Trattato che mette fine alle guerre d'Italia, stabilendo la definitiva egemonia spagnola sulla penisola.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_lepanto_1571",
        year: 1571,
        title: "Battaglia di Lepanto",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "La Lega Santa sconfigge la flotta ottomana nel Mediterraneo, arginando l'espansione marittima turca.",
        link: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        id: "sto_nantes_1598",
        year: 1598,
        title: "Editto di Nantes",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Enrico IV di Francia concede libertà di culto agli ugonotti, ponendo fine alle sanguinose guerre di religione francesi.",
        link: "storia/index.html?open=summaries/sto3_crisi_seicento.md"
    },
    {
        id: "sto_vestfalia_1648",
        year: 1648,
        title: "Pace di Vestfalia",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Fine della Guerra dei Trent'anni e affermazione del sistema degli stati sovrani indipendenti in Europa.",
        link: "storia/index.html?open=summaries/sto3_crisi_seicento.md"
    },
    {
        id: "sto_bill_1689",
        year: 1689,
        title: "Promulgazione del Bill of Rights",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Guglielmo III d'Orange firma la carta dei diritti che limita il potere regio e fonda la monarchia costituzionale inglese.",
        link: "storia/index.html?open=summaries/sto4_rivoluzioni_inglesi.md"
    },
    {
        id: "sto_indipendenza_1776",
        year: 1776,
        title: "Dichiarazione d'Indipendenza Americana",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Le tredici colonie dichiarano la propria indipendenza dalla corona britannica, fondando gli Stati Uniti d'America.",
        link: "storia/index.html?open=summaries/sto7_rivoluzione_americana_francese.md"
    },
    {
        id: "sto_rivoluzione_1789",
        year: 1789,
        title: "Rivoluzione Francese",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Presa della Bastiglia e stesura della Dichiarazione dei diritti dell'uomo e del cittadino.",
        link: "storia/index.html?open=summaries/sto7_rivoluzione_americana_francese.md"
    },
    {
        id: "sto_vienna_1815",
        year: 1815,
        title: "Congresso di Vienna",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "Riorganizzazione dell'Europa dopo la sconfitta di Napoleone ed avvio dell'età della Restaurazione.",
        link: "storia/index.html?open=summaries/sto8_napoleone_restaurazione.md"
    },
    {
        id: "sto_unita_1861",
        year: 1861,
        title: "Proclamazione del Regno d'Italia",
        subject: "storia",
        subjectLabel: "Storia Moderna",
        description: "A Torino viene proclamato il Regno d'Italia sotto la dinastia dei Savoia, coronando le lotte risorgimentali.",
        link: "storia/index.html?open=summaries/sto11_unificazione_regno.md"
    },

    // --- STORIA DELL'ARTE MODERNA ---
    {
        id: "art_concorso_1401",
        year: 1401,
        title: "Concorso per la porta nord del Battistero di Firenze",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "La sfida tra Ghiberti e Brunelleschi è convenzionalmente considerata l'atto di nascita del Rinascimento fiorentino.",
        link: "storia_arte/index.html?open=summaries/rinascimento_1_origini.md"
    },
    {
        id: "art_cupola_1436",
        year: 1436,
        title: "Completamento della Cupola del Brunelleschi",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Filippo Brunelleschi completa la straordinaria cupola autoportante di Santa Maria del Fiore a Firenze.",
        link: "storia_arte/index.html?open=summaries/rinascimento_2_fondatori.md"
    },
    {
        id: "art_cenacolo_1498",
        year: 1498,
        title: "Leonardo completa l'Ultima Cena",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Leonardo da Vinci termina il celebre affresco nel refettorio di Santa Maria delle Grazie a Milano.",
        link: "storia_arte/index.html?open=summaries/rinascimento_4_maturo.md"
    },
    {
        id: "art_tempesta_1510",
        year: 1510,
        title: "Giorgione dipinge 'La Tempesta'",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Capolavoro del tonalismo veneto, l'opera introduce un uso rivoluzionario del colore e del paesaggio.",
        link: "storia_arte/index.html?open=summaries/rinascimento_5_veneto.md"
    },
    {
        id: "art_sistina_1512",
        year: 1512,
        title: "Inaugurazione della Volta della Cappella Sistina",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Michelangelo Buonarroti completa i monumentali affreschi della volta commissionati da papa Giulio II della Rovere.",
        link: "storia_arte/index.html?open=summaries/rinascimento_4_maturo.md"
    },
    {
        id: "art_matteo_1600",
        year: 1600,
        title: "Caravaggio e la Vocazione di San Matteo",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Dipinta per la Cappella Contarelli, l'opera introduce la rivoluzione luministica e naturalistica barocca.",
        link: "storia_arte/index.html?open=summaries/barocco_6.md"
    },
    {
        id: "art_apollo_1625",
        year: 1625,
        title: "Bernini completa l'Apollo e Dafne",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Gian Lorenzo Bernini scolpisce il capolavoro barocco per il cardinale Scipione Borghese, catturando la metamorfosi nel marmo.",
        link: "storia_arte/index.html?open=summaries/barocco_6.md"
    },
    {
        id: "art_winckelmann_1764",
        year: 1764,
        title: "Storia dell'Arte nell'Antichità",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Johann Joachim Winckelmann pubblica l'opera manifesto del Neoclassicismo teorizzando la 'nobile semplicità e quieta grandezza'.",
        link: "storia_arte/index.html?open=summaries/neoclassicismo_7.md"
    },
    {
        id: "art_impressionisti_1874",
        year: 1874,
        title: "Prima mostra degli Impressionisti",
        subject: "arte",
        subjectLabel: "Storia dell'Arte",
        description: "Nello studio del fotografo Nadar a Parigi, Monet, Renoir, Degas e compagni espongono le proprie tele sfidando il Salon accademico.",
        link: "storia_arte/index.html?open=summaries/impressionismo_9.md"
    },

    // --- ARTE ROMANA ---
    {
        id: "rom_arapacis_9",
        year: -9, // 9 a.C. representation
        title: "Dedica dell'Ara Pacis Augustae",
        subject: "arte_romana",
        subjectLabel: "Arte Romana",
        description: "Il Senato romano dedica l'altare della Pace ad Augusto di ritorno dalle campagne di Spagna e Gallia.",
        link: "arte_romana/index.html?open=summaries/cap6_augusto_ara_pacis.md"
    },
    {
        id: "rom_colonna_113",
        year: 113,
        title: "Inaugurazione della Colonna Traiana",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Viene inaugurata la colonna coclide istoriata per celebrare la vittoria di Traiano contro i Daci.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_pantheon_125",
        year: 125,
        title: "Ricostruzione del Pantheon",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "L'imperatore Adriano completa la ricostruzione del Pantheon con la celeberrima cupola emisferica in calcestruzzo.",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_arco_315",
        year: 315,
        title: "Inaugurazione dell'Arco di Costantino",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Eretto a celebrazione della vittoria di Costantino su Massenzio nella battaglia di Ponte Milvio.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },

    // --- DIRITTO DEI BENI CULTURALI ---
    {
        id: "dir_costituzione_1948",
        year: 1948,
        title: "Entrata in vigore della Costituzione Italiana",
        subject: "diritto",
        subjectLabel: "Diritto dei Beni Culturali",
        description: "L'Articolo 9 sancisce l'impegno della Repubblica nella tutela del paesaggio e del patrimonio storico e artistico della Nazione.",
        link: "diritto/index.html?open=summaries/pub1_costituzione.md"
    },
    {
        id: "dir_codice_2004",
        year: 2004,
        title: "Approvazione del Codice dei Beni Culturali (Codice Urbani)",
        subject: "diritto",
        subjectLabel: "Diritto dei Beni Culturali",
        description: "Viene approvato il D.Lgs. 42/2004, corpus normativo fondamentale per la tutela e valorizzazione del patrimonio in Italia.",
        link: "diritto/index.html?open=summaries/1_patrimonio.md"
    },
    {
        id: "dir_artbonus_2014",
        year: 2014,
        title: "Introduzione dell'Art Bonus",
        subject: "diritto",
        subjectLabel: "Diritto dei Beni Culturali",
        description: "Viene introdotta l'agevolazione fiscale al 65% per le erogazioni liberali a sostegno della cultura e dello spettacolo.",
        link: "diritto/index.html?open=summaries/11_regime_fiscale.md"
    },
    {
        id: "dir_sanzioni_2022",
        year: 2022,
        title: "Riforma dei Reati contro il Patrimonio Culturale",
        subject: "diritto",
        subjectLabel: "Diritto dei Beni Culturali",
        description: "La Legge 22/2022 inserisce nel codice penale nuove e più aspre fattispecie di reato per chi danneggia o traffica beni storici.",
        link: "diritto/index.html?open=summaries/13_sanzioni.md"
    }
];

// Export to window object for browser access
if (typeof window !== 'undefined') {
    window.timelineDatabase = timelineDatabase;
}
