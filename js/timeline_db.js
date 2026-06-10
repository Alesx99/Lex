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
        id: "rom_fondazione_753",
        year: -753,
        title: "Fondazione rituale di Roma",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Fondazione di Roma da parte di Romolo secondo il cerimoniale sacro di matrice etrusca (liberatus, effatus, inauguratus), che traccia il pomerium (confine sacro).",
        link: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        id: "rom_muraserviane_cappellaccio_550",
        year: -550,
        title: "Prima fase delle Mura Serviane",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Edificazione del primo sistema difensivo di Roma attribuito a Servio Tullio, realizzato in blocchi di cappellaccio (tufo locale grigio e friabile).",
        link: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        id: "rom_terrecotte_omobono_540",
        year: -540,
        title: "Terrecotte di Minerva ed Ercole a Sant'Omobono",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Realizzazione delle statue acroteriali tardo-arcaiche in terracotta di Minerva ed Ercole, a riflesso dell'ideologia monarchica di Servio Tullio.",
        link: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        id: "rom_tempio_giove_509",
        year: -509,
        title: "Tempio di Giove Ottimo Massimo sul Campidoglio",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Inaugurazione del tempio capitolino di matrice etrusco-italica sine postico. Vulca di Veio realizza la statua di culto e la quadriga fittile del tetto.",
        link: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        id: "rom_tempio_saturno_497",
        year: -497,
        title: "Tempio di Saturno nel Foro Romano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Consacrazione del tempio ai piedi del Campidoglio, destinato a custodire l'erario (tesoro dello Stato romano).",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_tempio_cerere_493",
        year: -493,
        title: "Tempio di Cerere, Libero e Libera",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Erezione del tempio sull'Aventino decorato dai greci Damofilo e Gorgaso, primo forte influsso di maestranze greche a Roma.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_tempio_castore_484",
        year: -484,
        title: "Tempio di Castore e Polluce nel Foro Romano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Erezione del tempio dei Dioscuri per celebrare la vittoria romana al Lago Regillo contro la Lega Latina.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_muraserviane_tufo_378",
        year: -378,
        title: "Ricostruzione delle Mura Serviane in tufo",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Dopo il sacco gallico del 390 a.C., le mura di Roma vengono ricostruite in tufo di Grotta Oscura (estratto dalle cave di Veio conquistata nel 396 a.C.).",
        link: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        id: "rom_tempio_concordia_367",
        year: -367,
        title: "Tempio della Concordia nel Foro Romano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Fondazione del tempio da parte di Marco Furio Camillo per celebrare le Leggi Licinie-Sestie e la pacificazione tra patrizi e plebei.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_rostra_anzio_338",
        year: -338,
        title: "Istituzione dei Rostra nel Comizio",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "La tribuna degli oratori del Foro viene decorata con le prue (rostri) delle navi nemiche catturate ad Anzio durante la Guerra Latina.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_cista_ficoroni_315",
        year: -315,
        title: "La Cista Ficoroni",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Realizzazione del celebre contenitore bronzeo inciso con scene del mito degli Argonauti da Novio Plautio, capolavoro di toreutica praenestina.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_bruto_capitolino_300",
        year: -300,
        title: "Bronzo del Bruto Capitolino",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Fusione del celebre ritratto bronzeo simbolo dell'ideologia repubblicana del mos maiorum (severità, determinazione e devozione allo Stato).",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_sarcofago_barbato_298",
        year: -298,
        title: "Sarcofago di Scipione Barbato",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Sarcofago in peperino a forma di altare ellenistico con fregio dorico e metope a rosetta, recante una celebre iscrizione in versi saturni.",
        link: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        id: "rom_porticus_aemilia_193",
        year: -193,
        title: "Costruzione della Porticus Aemilia",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Edificazione della colossale struttura di smistamento merci all'Emporium, pietra miliare dell'uso dell'opus caementicium e della pozzolana.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_tempio_portuno_150",
        year: -150,
        title: "Tempio di Portuno nel Foro Boario",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Costruzione del tempio ionico pseudoperiptero, sintesi ideale tra la pianta greca e l'alto podio di tradizione etrusco-italica.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_conquista_macedonia_148",
        year: -148,
        title: "Conquista romana della Macedonia",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "La sconfitta macedone avvia l'afflusso massiccio di bottini di guerra, intellettuali e artisti greci a Roma, trasformando la cultura figurativa.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_distruzione_corinto_146",
        year: -146,
        title: "Sacco e distruzione di Corinto",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Ad opera di Lucio Mummio, segna il definitivo assoggettamento della Grecia. Intere collezioni statuarie e pinacoteche vengono portate a Roma.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_porticus_metelli_146",
        year: -146,
        title: "Porticus Metelli ed esposizione della Turma Alexandri",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Quinto Cecilio Metello Macedonico edifica il quadriportico esponendo le 25 statue bronzee equestri di Lisippo sottratte a Dion in Macedonia.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_tempio_giove_statore_131",
        year: -131,
        title: "Tempio di Giove Statore in marmo greco",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Ermodoro di Salamina progetta il primo tempio interamente in marmo greco a Roma, privo di podio italico ed esastilo alla greca.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_santuario_palestrina_120",
        year: -120,
        title: "Santuario di Fortuna Primigenia a Palestrina",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Costruzione del monumentale santuario tardo-ellenistico a terrazze sul Monte Ginestro, capolavoro ingegneristico-scenografico in cementizio.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_tempio_ercole_vincitore_110",
        year: -110,
        title: "Tempio di Ercole Vincitore nel Foro Boario",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Erezione del tempio circolare periptero in marmo pentelico ad opera di Ermodoro di Salamina e decorato dallo scultore Scopas Minore.",
        link: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        id: "rom_mosaico_alessandro_100",
        year: -100,
        title: "Mosaico di Alessandro nella Casa del Fauno",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Realizzazione in opus vermiculatum del celebre mosaico pompeiano raffigurante la battaglia di Isso tra Alessandro Magno e Dario III.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_secondostile_100",
        year: -100,
        title: "Affermazione del II Stile pittorico (Architettonico)",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Introduzione della decorazione parietale che sfonda la parete dipingendo colonne, podi e vedute prospettiche su giardini e città.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_teatro_pompeo_55",
        year: -55,
        title: "Inaugurazione del Teatro di Pompeo",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Pompeo edifica il primo teatro stabile in muratura di Roma ponendo sulla sommità della cavea il tempio di Venere Vincitrice.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_ritratto_veristico_50",
        year: -50,
        title: "Ritratto veristico tardo-repubblicano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Massima fioritura del ritratto patrizio veristico (es. Testa Torlonia), volto a esprimere la severitas del mos maiorum.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_assassinio_cesare_44",
        year: -44,
        title: "Assassinio di Giulio Cesare nella Curia di Pompeo",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Giulio Cesare viene assassinato alle Idi di marzo all'interno della Curia adiacente al Teatro di Pompeo, ponendo fine alla Repubblica.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_terzostile_30",
        year: -30,
        title: "Affermazione del III Stile pittorico (della Parete Chiusa)",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "La pittura rifiuta l'illusionismo prospettico. Le pareti diventano piatte e monocrome, con esili candelabri, ghirlande e piccoli quadri mitologici.",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_mausoleo_augusto_28",
        year: -28,
        title: "Inizio del Mausoleo di Augusto",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Ottaviano avvia l'edificazione del proprio colossale tumulo sepolcrale circolare nel Campo Marzio settentrionale, radicandosi a Roma.",
        link: "arte_romana/index.html?open=summaries/cap6_augusto_ara_pacis.md"
    },
    {
        id: "rom_tomba_eurisace_25",
        year: -25,
        title: "Tomba di Eurisace il Panificatore",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Il liberto Eurisace edifica un monumento in travertino a forma di macchinari da panificazione con fregio in stile plebeo che descrive il lavoro.",
        link: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        id: "rom_arapacis_9",
        year: -9,
        title: "Dedica dell'Ara Pacis Augustae",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Il Senato romano dedica l'altare della Pace ad Augusto di ritorno dalle campagne di Spagna e Gallia, celebrando il saeculum aureum.",
        link: "arte_romana/index.html?open=summaries/cap6_augusto_ara_pacis.md"
    },
    {
        id: "rom_foro_augusto_2",
        year: -2,
        title: "Inaugurazione del Foro di Augusto",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Augusto inaugura il suo Foro con il Tempio di Marte Ultore e le esedre decorate con le statue dei Summi Viri e le Cariatidi.",
        link: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        id: "rom_ara_pietatis_voto_22",
        year: 22,
        title: "Voto dell'Ara Pietatis Augustae",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Sotto Tiberio, il Senato vota l'erezione dell'Ara Pietatis per celebrare la devozione della famiglia imperiale.",
        link: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        id: "rom_ara_pietatis_inaugurazione_43",
        year: 43,
        title: "Inaugurazione dell'Ara Pietatis Augustae",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "L'imperatore Claudio inaugura solennemente l'altare della Pietà, i cui fregi descrivono i sacrifici romani davanti ai templi cittadini.",
        link: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        id: "rom_porta_maggiore_52",
        year: 52,
        title: "Edificazione di Porta Maggiore",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Claudio erige la monumentale porta-acquedotto in travertino a bugnato rustico (opus rusticum), esprimendo solidità e gravità arcaica.",
        link: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        id: "rom_quartostile_54",
        year: 54,
        title: "Affermazione del IV Stile pittorico (Fantastico)",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Diffusione dello stile barocco e fantastico che unisce le architetture teatrali del secondo stile agli ornamenti del terzo (es. Domus Aurea).",
        link: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        id: "rom_sacco_gerusalemme_70",
        year: 70,
        title: "Sacco di Gerusalemme",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Tito espugna e distrugge il Tempio di Gerusalemme, portando a Roma le ricchezze che finanzieranno il Colosseo e l'Arco di Tito.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_colosseo_80",
        year: 80,
        title: "Inaugurazione del Colosseo (Anfiteatro Flavio)",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Tito inaugura l'immenso anfiteatro per 50.000 spettatori, eretto sul sito del laghetto della Domus Aurea con sovrapposizione degli ordini.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_arco_tito_81",
        year: 81,
        title: "Erezione dell'Arco di Tito",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Domiziano erige l'arco sulla Via Sacra. I pannelli interni raffigurano il corteo trionfale della Menorah con effetti di prospettiva ottica.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_palazzo_domiziano_92",
        year: 92,
        title: "Completamento del Palazzo di Domiziano sul Palatino",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "L'architetto Rabirio completa la nuova e colossale reggia imperiale (Domus Flavia e Domus Augustana) con volte a ombrello e ampie esedre.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_guerre_daciche_106",
        year: 106,
        title: "Fine delle campagne daciche di Traiano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "La sottomissione dei Daci e la morte di Decebalo fruttano a Roma un bottino favoloso che finanzia le grandi opere pubbliche di Apollodoro.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_foro_traiano_112",
        year: 112,
        title: "Inaugurazione del Foro di Traiano",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Apollodoro di Damasco completa lo sbancamento del Quirinale e inaugura la Basilica Ulpia e i Mercati di Traiano in laterizio.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_colonna_113",
        year: 113,
        title: "Inaugurazione della Colonna Traiana",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Inaugurazione della colonna coclide istoriata alta 100 piedi romani. Il fregio spiraliforme di 200 metri narra con crudo realismo le campagne daciche.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_tomba_haterii_115",
        year: 115,
        title: "Rilievi della Tomba degli Haterii",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Creazione dei monumentali rilievi sepolcrali dell'appaltatore edile degli Haterii, capolavoro di arte plebea con raffigurazione di gru a ruota.",
        link: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        id: "rom_villa_adriana_118",
        year: 118,
        title: "Inizio costruzione di Villa Adriana a Tivoli",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Adriano inizia la monumentale residenza imperiale a Tivoli, riproducendo scenograficamente i monumenti dell'impero (Teatro Marittimo, Canopo).",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_tempio_venere_roma_inizio_121",
        year: 121,
        title: "Inizio costruzione del Tempio di Venere e Roma",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Adriano progetta e avvia la costruzione del tempio più grande di Roma sulla Velia, sul modello diptero greco dell'Asia Minore.",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_pantheon_125",
        year: 125,
        title: "Ricostruzione del Pantheon",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Completamento del Pantheon, capolavoro di ingegneria spaziale con cupola semisferica in calcestruzzo (43,30 m di diametro) e oculus aperto.",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_morte_antinoo_130",
        year: 130,
        title: "Morte e divinizzazione di Antinoo",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Morte per annegamento nel Nilo di Antinoo, favorito di Adriano. L'imperatore ne decreta la divinizzazione promuovendo una ricca statuaria classicista.",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_tempio_venere_roma_inaugura_135",
        year: 135,
        title: "Inaugurazione del Tempio di Venere e Roma",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Inaugurazione delle due celle speculari del tempio. La polemica sul soffitto basso porta alla condanna a morte di Apollodoro di Damasco.",
        link: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        id: "rom_colonna_antonino_pio_161",
        year: 161,
        title: "Erezione della Colonna di Antonino Pio",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Erezione del monumento onorario in Campo Marzio. Il basamento marmoreo mostra l'apoteosi classica e le decursio in stile plebeo paratattico.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        id: "rom_colonna_marco_aurelio_176",
        year: 176,
        title: "Inizio costruzione della Colonna Aureliana",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Inizio del monumento coclide di Marco Aurelio in Piazza Colonna, che racconta le dure campagne contro i Quadi e i Marcomanni.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        id: "rom_colonna_marco_aurelio_fine_180",
        year: 180,
        title: "Dedica della Colonna di Marco Aurelio",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Commodo dedica la colonna coclide istoriata. I rilievi eseguiti a trapano mostrano il Miracolo della Pioggia e la crudezza della guerra.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        id: "rom_commodo_ercole_192",
        year: 192,
        title: "Busto di Commodo come Ercole",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Creazione del busto celebrativo a valenza cosmica e divina. Commodo vi è raffigurato con la leontè, la clava e i pomi delle Esperidi.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        id: "rom_battaglia_ponte_milvio_312",
        year: 312,
        title: "Battaglia di Ponte Milvio",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Costantino sconfigge Massenzio alle porte di Roma, legittimando la sua ascesa e aprendo la strada alla cristianizzazione dell'Impero.",
        link: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        id: "rom_arco_315",
        year: 315,
        title: "Inaugurazione dell'Arco di Costantino",
        subject: "romana",
        subjectLabel: "Arte Romana",
        description: "Dedicazione dell'arco di trionfo a tre fornici, capolavoro tardoantico assemblato con spolia (rilievi di Traiano, Adriano e Marco Aurelio).",
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
