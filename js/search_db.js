/* CENTRALIZED SEARCH INDEX DATABASE - LEX STUDIORUM */

const searchDatabase = [
    // DIRITTO DEI BENI CULTURALI
    {
        title: "Patrimonio culturale e paesaggio: il bello dell'Italia",
        subject: "diritto",
        chapterTag: "Capitolo I",
        description: "Analisi del 'diritto alla bellezza' fondato sull'Art. 9 della Costituzione e sulla Convenzione di Faro. Evoluzione storica del concetto di 'bene culturale' e paesaggio.",
        keywords: "patrimonio culturale paesaggio costituzione bellezza art 9 faro cabiddu maria agostina franceschini",
        navPath: "diritto/index.html?open=summaries/1_patrimonio.md"
    },
    {
        title: "Il Governo dei beni culturali",
        subject: "diritto",
        chapterTag: "Capitolo II",
        description: "Studio dell'assetto organizzativo del Ministero della Cultura (MiC), sia a livello centrale (Direzioni Generali) sia periferico (Segretariati Regionali, Soprintendenze, Musei).",
        keywords: "governo ministero mic soprintendenza organizzazione centrale periferica colombo maria cristina accordi privati valorizzazione",
        navPath: "diritto/index.html?open=summaries/2_governo.md"
    },
    {
        title: "Individuazione e regime giuridico dei beni culturali",
        subject: "diritto",
        chapterTag: "Capitolo III",
        description: "Approfondimento sui procedimenti di verifica dell'interesse culturale per beni pubblici (Art. 12) e di dichiarazione dell'interesse per beni privati (Art. 13).",
        keywords: "individuazione regime giuridico beni pubblici privati verifica dichiarazione vincolo art 12 art 13 alterio mariano",
        navPath: "diritto/index.html?open=summaries/3_individuazione.md"
    },
    {
        title: "La tutela internazionale dei beni culturali",
        subject: "diritto",
        chapterTag: "Capitolo IV",
        description: "Studio del quadro normativo globale ed europeo: Convenzione Aja 1954, UNESCO 1970, UNIDROIT 1995 e la Direttiva UE sulla circolazione dei beni.",
        keywords: "tutela internazionale convenzioni unesco aja unidroit 1954 1970 1995 direttiva ue 2014/60/ue conflitti armati esportazione importazione",
        navPath: "diritto/index.html?open=summaries/4_tutela_internazionale.md"
    },
    {
        title: "La tutela dei beni culturali: le misure di protezione",
        subject: "diritto",
        chapterTag: "Capitolo V",
        description: "Misure di protezione e vigilanza, autorizzazioni per interventi, divieto di distruzione o smembramento e procedimenti di restauro coordinati dal MiC.",
        keywords: "tutela misure protezione conservazione vigilanza prevenzione manutenzione restauro autorizzazioni mic",
        navPath: "diritto/index.html?open=summaries/5_tutela.md"
    },
    {
        title: "La circolazione dei beni culturali: modelli nazionali ed europei",
        subject: "diritto",
        chapterTag: "Capitolo VI",
        description: "La disciplina dell'alienabilità dei beni pubblici (demanio, autorizzazione all'alienazione) e il commercio/esportazione delle opere d'arte.",
        keywords: "circolazione modelli nazionali europei alienazione sdemanializzazione commercio esportazione attestato libera circolazione licenza",
        navPath: "diritto/index.html?open=summaries/6_circolazione.md"
    },
    {
        title: "Appalti, concessioni e sponsorizzazioni",
        subject: "diritto",
        chapterTag: "Capitolo VIII",
        description: "Modalità di coinvolgimento dei privati. Gli appalti di lavori nei beni culturali (qualificazione, restauro), le concessioni di servizi e la sponsorizzazione.",
        keywords: "appalti concessioni sponsorizzazioni restauro privati interventi salerno marcello qualificazioni contratti pubblici",
        navPath: "diritto/index.html?open=summaries/8_appalti.md"
    },
    {
        title: "Ritrovamenti e scoperte archeologiche",
        subject: "diritto",
        chapterTag: "Capitolo IX",
        description: "Il regime delle ricerche archeologiche (riserva statale, concessione di scavo) e la disciplina dei ritrovamenti fortuiti (proprietà statale e premi di scoperta).",
        keywords: "ritrovamenti scoperte archeologiche scavo concessione riserva dello stato premi scopritore demanio archeologico art 91",
        navPath: "diritto/index.html?open=summaries/9_ritrovamenti.md"
    },
    {
        title: "L'espropriazione nei beni culturali",
        subject: "diritto",
        chapterTag: "Capitolo X",
        description: "L'espropriazione diretta del bene culturale, l'espropriazione per fini di scavo archeologico e l'espropriazione strumentale a fini monumentali o ambientali.",
        keywords: "espropriazione pubblica utilita esproprio diretto scavo espropriazione strumentale indennita di esproprio art 96",
        navPath: "diritto/index.html?open=summaries/10_espropriazione.md"
    },
    {
        title: "Il regime fiscale dei beni culturali",
        subject: "diritto",
        chapterTag: "Capitolo XI",
        description: "Le agevolazioni tributarie per i proprietari di beni vincolati (imposte dirette, IMU, successioni) e l'Art Bonus per il sostegno economico dei beni pubblici.",
        keywords: "regime fiscale tasse agevolazioni tributarie imu detrazioni imposte indirette donazioni art bonus liberalita credit",
        navPath: "diritto/index.html?open=summaries/11_regime_fiscale.md"
    },
    {
        title: "I beni paesaggistici",
        subject: "diritto",
        chapterTag: "Capitolo XII",
        description: "La tutela delle bellezze naturali e dei paesaggi. La dichiarazione di notevole interesse pubblico, le aree tutelate per legge e l'autorizzazione paesaggistica.",
        keywords: "beni paesaggistici vincolo paesaggio bellezze naturali dichiarazione di notevole interesse pubblico aree protette autorizzazione paesaggistica soprintendenza art 146",
        navPath: "diritto/index.html?open=summaries/12_paesaggio.md"
    },
    {
        title: "Le sanzioni penali e amministrative",
        subject: "diritto",
        chapterTag: "Capitolo XIII",
        description: "La tutela sanzionatoria del patrimonio storico-artistico. La grande riforma dei delitti contro il patrimonio culturale (Titolo VIII-bis c.p. introdotto nel 2022).",
        keywords: "sanzioni penali amministrative delitti codice penale titolo viii-bis furto ricettazione danneggiamento esportazione illecita contraffazione riforme penali 2022",
        navPath: "diritto/index.html?open=summaries/13_sanzioni.md"
    },
    // DIRITTO PUBBLICO (PARTE ISTITUZIONALE)
    {
        title: "Il Diritto Pubblico e la Costituzione Italiana",
        subject: "diritto",
        chapterTag: "Capitolo I-Pub",
        description: "Differenza tra diritto pubblico e privato, coattività delle norme giuridiche, nascita della Costituzione repubblicana (referendum del 2 giugno 1946) ed entrata in vigore il 1° gennaio 1948. Analisi dei caratteri e struttura della Costituzione rigida e scritta.",
        keywords: "diritto pubblico privato coattività giurisprudenza dottrina costituzione assemblea costituente referendum 2 giugno 1946 1 gennaio 1948 rigidità repubblica bicameralismo parlamento",
        navPath: "diritto/index.html?open=summaries/pub1_costituzione.md"
    },
    {
        title: "Gli Organi dello Stato: Parlamento e Governo",
        subject: "diritto",
        chapterTag: "Capitolo II-Pub",
        description: "Studio della separazione dei poteri. Bicameralismo perfetto, ruoli e commissioni del Parlamento. Struttura del Governo (Presidente del Consiglio e Ministri), procedimento di nomina fiduciario, e poteri di garanzia del Presidente della Repubblica.",
        keywords: "separazione poteri parlamento bicameralismo deputati senato gruppi commissioni governo premier consiglio dei ministri fiducia sfiducia presidente della repubblica controfirma",
        navPath: "diritto/index.html?open=summaries/pub2_governo_parlamento.md"
    },
    {
        title: "Le Fonti del Diritto e il Pluralismo Giuridico",
        subject: "diritto",
        chapterTag: "Capitolo III-Pub",
        description: "Analisi della piramide gerarchica delle fonti e risoluzione delle antinomie. Procedimento aggravato di revisione costituzionale (Art. 138), leggi ordinarie, decreti legge, decreti legislativi, fonti europee e riparto Stato-Regioni (Art. 117).",
        keywords: "fonti diritto antinomie gerarchico cronologico specialità competenza revisione costituzionale art 138 referendum confermativo legge ordinaria decreto legge legislativo regionali art 117 unione europea",
        navPath: "diritto/index.html?open=summaries/pub3_fonti_diritto.md"
    },
    {
        title: "I Diritti e le Libertà Costituzionali",
        subject: "diritto",
        chapterTag: "Capitolo IV-Pub",
        description: "I diritti inviolabili e doveri di solidarietà (Art. 2), il principio di uguaglianza formale e sostanziale (Art. 3). Le libertà costituzionali: personale (Art. 13), domicilio, riunione (Art. 17), associazione (Art. 18), pensiero, salute e istruzione.",
        keywords: "diritti doveri art 2 solidarietà art 3 uguaglianza formale sostanziale libertà personale domicilio riunione associazione pensiero stampa salute istruzione",
        navPath: "diritto/index.html?open=summaries/pub4_diritti_liberta.md"
    },
    {
        title: "Costituzione Economica: Proprietà e Impresa",
        subject: "diritto",
        chapterTag: "Capitolo V-Pub",
        description: "La tutela della libertà d'impresa e i suoi limiti sociali (Art. 41). La proprietà privata e il concetto costituzionale di 'funzione sociale' (Art. 42). Disciplina dell'espropriazione con indennizzo e classificazione dei beni pubblici.",
        keywords: "costituzione economica art 41 impresa mercati art 42 proprietà privata funzione sociale espropriazione indennità demanio patrimonio indisponibile",
        navPath: "diritto/index.html?open=summaries/pub5_proprieta_impresa.md"
    },

    // STORIA DELL'ARTE MODERNA
    {
        title: "Le Origini del Rinascimento e il Gotico Internazionale",
        subject: "arte",
        chapterTag: "Studio I",
        description: "La transizione dal Gotico Internazionale all'Umanesimo. L'eleganza lineare in Gentile da Fabriano e Pisanello, e la nascita geometrica della prospettiva di Brunelleschi.",
        keywords: "gotico internazionale gentile da fabriano adorazione dei magi pisanello san giorgio principessa umanesimo prospettiva lineare brunelleschi tavoletta filippo battistero specchio rinascimento origini",
        navPath: "storia_arte/index.html?open=summaries/rinascimento_1_origini.md"
    },
    {
        title: "I Padri Fondatori: Brunelleschi, Donatello, Masaccio",
        subject: "arte",
        chapterTag: "Studio II",
        description: "I pionieri del Rinascimento fiorentino: l'architettura razionale di Brunelleschi, il dramma plastico e lo stiacciato di Donatello, e la volumetria monumentale di Masaccio.",
        keywords: "padri fondatori brunelleschi donatello masaccio cupola firenze santa maria del fiore spedale innocenti sagrestia vecchia san lorenzo stiacciato san giorgio david bronzo trinita cappella brancacci cacciata tributo",
        navPath: "storia_arte/index.html?open=summaries/rinascimento_2_fondatori.md"
    },
    {
        title: "La Stagione delle Esperienze nel Secondo Quattrocento",
        subject: "arte",
        chapterTag: "Studio III",
        description: "La fioritura nelle corti: le teorie di Alberti, la luce geometrica di Piero della Francesca, l'allegoria neoplatonica di Botticelli e la prospettiva di Mantegna.",
        keywords: "stagione esperienze alberti tempio malatestiano palazzo rucellai santa maria novella piero della francesca battesimo cristo flagellazione pala brera botticelli primavera nascita venere mantegna san sebastiano camera sposi oculo cristo morto scorcio",
        navPath: "storia_arte/index.html?open=summaries/rinascimento_3_esperienze.md"
    },
    {
        title: "Il Rinascimento Maturo: Leonardo, Michelangelo, Raffaello",
        subject: "arte",
        chapterTag: "Studio IV",
        description: "Il culmine espressivo e monumentale: lo sfumato e l'ottica scientifica di Leonardo, il titanismo e il levare di Michelangelo, e la grazia sintetica classica di Raffaello.",
        keywords: "rinascimento maturo leonardo da vinci sfumato prospettiva aerea vergine rocce cenacolo gioconda michelangelo pietà david sistina giudizio universale levare non finito raffaello sposalizio vergine scuola atene stanze vaticane",
        navPath: "storia_arte/index.html?open=summaries/rinascimento_4_maturo.md"
    },
    {
        title: "Il Rinascimento Veneto e il Colorito Tonale",
        subject: "arte",
        chapterTag: "Studio V",
        description: "La rivoluzione pittorica veneta del Cinquecento: il primato cromatico e atmosferico del colore sul disegno fiorentino in Giorgione e Tiziano.",
        keywords: "rinascimento veneto colorito tonale pittura tonale disegno fiorentino giorgione tempesta tre filosofi tiziano vecellio amor sacro profano assunta frari venere urbino pittura tocco dita",
        navPath: "storia_arte/index.html?open=summaries/rinascimento_5_veneto.md"
    },
    {
        title: "Il Barocco e la Dinamica dei Sensi",
        subject: "arte",
        chapterTag: "Studio VI",
        description: "La teatralità e la sollecitazione sensoriale seicentesca: il naturalismo luminoso di Caravaggio, la metamorfosi carnale di Bernini e la geometria elastica di Borromini.",
        keywords: "barocco caravaggio michelangelo merisi vocazione san matteo morte vergine chiaroscuro naturalismo luce bernini apollo dafne estasi santa teresa colonnato san pietro bel composto borromini san carlino quattro fontane sant ivo sapienza lanterna elicoidale",
        navPath: "storia_arte/index.html?open=summaries/barocco_6.md"
    },
    {
        title: "Neoclassicismo, Preromanticismo e Sublime",
        subject: "arte",
        chapterTag: "Studio VII",
        description: "L'ideale etico ed estetico dell'antico: il bello ideale di Winckelmann e Canova, la pittura civile di David e il sentimento dell'infinito con Friedrich e Turner.",
        keywords: "neoclassicismo preromanticismo winckelmann nobile semplicita quieta grandezza bello ideale jacques louis david giuramento degli orazi morte marat martire civile laico antonio canova amore psiche monumento maria cristina austria repères ultima mano cera sublime caspar david friedrich viandante mare nebbia rückenfigur william turner pioggia vapore velocita dissoluzione",
        navPath: "storia_arte/index.html?open=summaries/neoclassicismo_7.md"
    },
    {
        title: "Romanticismo e Realismo: La Storia e il Popolo",
        subject: "arte",
        chapterTag: "Studio VIII",
        description: "La drammaticità della storia e il rifiuto dell'idealizzazione accademica: il naufragio di Géricault, il dinamismo di Delacroix e il realismo sociale di Courbet.",
        keywords: "romanticismo realismo theodore gericault zattera della medusa naufragio medusa eugene delacroix liberta guida popolo colore romantico tricolore gustave courbet spaccapietre funerale a ornans realismo sociale verità quotidiana ordinario d'orsay",
        navPath: "storia_arte/index.html?open=summaries/romanticismo_realismo_8.md"
    },
    {
        title: "L'Impressionismo e la Luce dell'Attimo",
        subject: "arte",
        chapterTag: "Studio IX",
        description: "La rivoluzione percettiva en plein air a Parigi: la pittura a campiture di Manet, gli studi di luce di Monet, la felicità di Renoir e le inquadrature di Degas.",
        keywords: "impressionismo edouard manet colazione erba dejeuner sur l'herbe olympia scandale campiture piatte claude monet impressione sole nascente cattedrali rouen plein air pierre auguste renoir moulin galette edgar degas classe danza assenzio taglio fotografico isolamento",
        navPath: "storia_arte/index.html?open=summaries/impressionismo_9.md"
    },
    {
        title: "Il Post-Impressionismo: Sintesi ed Espressione",
        subject: "arte",
        chapterTag: "Studio X",
        description: "La scomposizione formale ed emotiva: il geometrismo di Cézanne, il Pointillisme ottico di Seurat, il cloisonnisme di Gauguin e il colore espressionista di Van Gogh.",
        keywords: "postimpressionismo post-impressionismo paul cezanne scomposizione geometria giocatori carte montagna sainte victoire taches georges seurat divisionismo pointillisme pointillismo grande jatte michel eugene chevreul paul gauguin cloisonnisme sintetismo da dove veniamo chi siamo vincent van gogh notte stellata mangiatori patate espressionismo pennellata materica",
        navPath: "storia_arte/index.html?open=summaries/postimpressionismo_10.md"
    },
    // ARTE ROMANA
    {
        title: "Introduzione metodologica e storiografica",
        subject: "arte_romana",
        chapterTag: "Studio I",
        description: "La storiografia dell'arte romana da Winckelmann a Wickhoff e Riegl. Lo storicismo marxista di Bianchi Bandinelli e le letture semantiche di Hölscher e Zanker.",
        keywords: "arte romana storiografia winckelmann scuola vienna wickhoff riegl kunstwollen bianchi bandinelli senatoria plebea holscher zanker",
        navPath: "arte_romana/index.html?open=summaries/cap1_introduzione.md"
    },
    {
        title: "Origini di Roma e influenza etrusca",
        subject: "arte_romana",
        chapterTag: "Studio II",
        description: "I riti etruschi di fondazione, lo sviluppo delle Mura Serviane e l'architettura etrusco-italica del Tempio di Giove Ottimo Massimo sul Campidoglio. Area sacra di Sant'Omobono.",
        keywords: "origini roma fondazione etrusca mura serviane giove ottimo massimo campidoglio sant omobono minerva ercole tessera hospitalis",
        navPath: "arte_romana/index.html?open=summaries/cap2_fondazione.md"
    },
    {
        title: "Approfondimento: Origini e la Grande Roma dei Tarquini",
        subject: "arte_romana",
        chapterTag: "Studio II-bis",
        description: "Focus sulle leggende di fondazione, le capanne del Palatino, le tombe principesche, la Cloaca Maxima, il Campo Marzio e il Tempio di Cerere.",
        keywords: "leggende roma capanne palatino tombe principesche tarquini cloaca maxima campus martius cerere amazzone esquilino mater matuta",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_origini.md"
    },
    {
        title: "L'età repubblicana tra V e III secolo a.C.",
        subject: "arte_romana",
        chapterTag: "Studio III",
        description: "L'evoluzione artistica nel periodo repubblicano: il tempio di Cerere, la Ficoroni Cista, il Sarcofago di Scipione Barbato, il Bruto Capitolino e la Concordia.",
        keywords: "eta repubblicana tempio cerere damofilo gorgaso ficoroni cista scipione barbato bruto capitolino concordia",
        navPath: "arte_romana/index.html?open=summaries/cap3_repubblica.md"
    },
    {
        title: "L'influenza ellenistica nel II secolo a.C.",
        subject: "arte_romana",
        chapterTag: "Studio IV",
        description: "La monumentalizzazione del Campo Marzio, il lusso della Porticus Metelli, la rivoluzione del calcestruzzo e i complessi santuari a terrazze (Palestrina e Foro Boario).",
        keywords: "ellenismo II secolo campo marzio porticus metelli giove statore lisippo porticus aemilia opus caementicium palestrina fortuna primigenia portuno boario",
        navPath: "arte_romana/index.html?open=summaries/cap4_ellenismo.md"
    },
    {
        title: "Tardo-repubblicano, ritrattistica e Pompeo",
        subject: "arte_romana",
        chapterTag: "Studio V",
        description: "Il primo teatro stabile di Pompeo. L'origine sociale del verismo patrizio e del ius imaginum. Mosaici della Casa del Fauno e stili pompeiani.",
        keywords: "tardo repubblica pompeo teatro venere vincitrice verismo patrizio ius imaginum casa fauno alessandro mosaico stili pittura pompei affreschi",
        navPath: "arte_romana/index.html?open=summaries/cap5_tardo_repubblica.md"
    },
    {
        title: "L'età augustea e l'Ara Pacis",
        subject: "arte_romana",
        chapterTag: "Studio VI",
        description: "Il programma figurativo della Pax Romana: il Mausoleo di Augusto e l'analisi dettagliata dei rilievi storici, mitologici e vegetali dell'Ara Pacis.",
        keywords: "augusto ara pacis propaganda imperiale mausoleo campus martius acanto tellus dea madre processione dinastica",
        navPath: "arte_romana/index.html?open=summaries/cap6_augusto_ara_pacis.md"
    },
    {
        title: "Approfondimento: L'Apparato Decorativo dell'Ara Pacis",
        subject: "arte_romana",
        chapterTag: "Studio VI-bis",
        description: "Focus specifico sull'iconografia e il messaggio ideologico dei rilievi dell'Ara Pacis: il fregio dell'acanto, la rigenerazione naturale, i pannelli mitologici (Enea, Tellus, Roma) e la processione imperiale.",
        keywords: "ara pacis augustae rilievi allegorie miti acanto cigni apollinei palingenesi enea numa lupercale tellus pax dea roma bucrani ghirlande festoni",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_ara_pacis.md"
    },
    {
        title: "Foro di Augusto e Giulio-Claudi",
        subject: "arte_romana",
        chapterTag: "Studio VII",
        description: "Il Foro di Augusto e il Tempio di Marte Ultore con le Cariatidi. L'architettura dei Giulio-Claudi: Porta Maggiore in opus rusticum e la Tomba di Eurisace.",
        keywords: "foro augusto marte ultore cariatidi claudio porta maggiore stile rustico eurisace panificatore ara pietatis",
        navPath: "arte_romana/index.html?open=summaries/cap7_augusto_foro_successori.md"
    },
    {
        title: "Età flavia, Foro di Traiano e Colonna Traiana",
        subject: "arte_romana",
        chapterTag: "Studio VIII",
        description: "La monumentalità e la narrazione storica: il Colosseo, l'Arco di Tito, la Tomba degli Haterii e l'enorme Foro di Traiano con la Basilica Ulpia e la Colonna Traiana.",
        keywords: "eta flavia traiano colosseo anfiteatro flavio arco tito haterii foro traiano basilica ulpia colonna traiana mercati",
        navPath: "arte_romana/index.html?open=summaries/cap8_traiano.md"
    },
    {
        title: "Adriano: Il Pantheon e Villa Adriana",
        subject: "arte_romana",
        chapterTag: "Studio IX",
        description: "La spazialità sferica del Pantheon, il ritiro imperiale di Villa Adriana a Tivoli (Teatro Marittimo e Canopo) e il Tempio di Venere e Roma.",
        keywords: "adriano pantheon rotonda oculus tivoli villa adriana teatro marittimo canopo venere roma apollodoro",
        navPath: "arte_romana/index.html?open=summaries/cap9_adriano.md"
    },
    {
        title: "Antonini e Tarda Antichità",
        subject: "arte_romana",
        chapterTag: "Studio X",
        description: "La transizione formale verso il Medioevo: la Colonna di Antonino Pio e di Marco Aurelio. L'uso politico degli spolia nell'Arco di Costantino e la fortuna dantesca.",
        keywords: "antonini tarda antichita antonino pio decursio marco aurelio colonna aureliana arco costantino spolia reimpiego fregi dante",
        navPath: "arte_romana/index.html?open=summaries/cap10_antonini_tardoantico.md"
    },
    {
        title: "Approfondimento: L'Iconografia della Lupa",
        subject: "arte_romana",
        chapterTag: "Studio XI",
        description: "Evoluzione iconografica della Lupa Capitolina dall'antichità al Rinascimento (aggiunta dei gemelli del Pollaiolo) fino all'uso propagandistico in età moderna e contemporanea.",
        keywords: "lupa capitolina gemelli romolo remo mito etrusca datazione radiocarbonio carruba medioevo siena giustizia rinascimento pollaiolo sisto iv propaganda fascismo pop",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_lupa.md"
    },
    {
        title: "Approfondimento: Il Foro, il Comitium e le Basiliche",
        subject: "arte_romana",
        chapterTag: "Studio XII",
        description: "Focus sull'evoluzione dello spazio politico romano: la trasformazione del Comitium circolare (modello greco), i Rostra, i Moeniana e l'invenzione della Basilica Civile.",
        keywords: "foro romano comitium circolare ekklesiasterion curia hostilia rostra moeniana basilica civile porcia emilia sempronia",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_foro_basiliche.md"
    },
    {
        title: "Approfondimento: Santuari Laziali e Opus Caementicium",
        subject: "arte_romana",
        chapterTag: "Studio XIII",
        description: "La rivoluzione architettonica tardo-repubblicana. L'uso dell'opus caementicium nei santuari a terrazze scenografici di Palestrina (Fortuna Primigenia) e Tivoli.",
        keywords: "santuari scenografici laziali opus caementicium cementizio pozzolana palestrina praeneste fortuna primigenia pozzo sortes tivoli hercules victor",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_santuari_laziali.md"
    },
    {
        title: "Approfondimento: Il Ritratto Romano",
        subject: "arte_romana",
        chapterTag: "Studio XIV",
        description: "Lo scontro e l'integrazione tra il ritratto tipologico greco-ellenistico e il verismo fisiognomico patrizio. Analisi dei ritratti di Pompeo, Cesare e Cicerone.",
        keywords: "ritratto romano tipologico fisiognomico ius imaginum maschere funerarie verismo patrizio pompeo anastolè alessandro magno cesare cicerone",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_ritratto_romano.md"
    },
    {
        title: "Approfondimento: Campo Marzio e Teatro di Pompeo",
        subject: "arte_romana",
        chapterTag: "Studio XV",
        description: "La monumentalizzazione del Campo Marzio tra Tarda Repubblica e Augusto: il primo teatro stabile in muratura di Pompeo, i Saepta e il progetto di Augusto.",
        keywords: "campo marzio teatro di pompeo muratura venus victrix porticus pompeiana saepta iulia horologium augusti ara pacis mausoleo",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_campo_marzio.md"
    },
    {
        title: "Approfondimento: Dante e la Colonna Traiana",
        subject: "arte_romana",
        chapterTag: "Studio XVI",
        description: "La Colonna Traiana e la sua fortuna medievale. La leggenda di Papa Gregorio Magno, la vedovella e il battesimo di Traiano ripresa da Dante nel Purgatorio.",
        keywords: "colonna traiana dante alighieri purgatorio x gregorio magno vedova vedovella giubileo boni rilievo coclide",
        navPath: "arte_romana/index.html?open=summaries/approfondimento_dante_traiano.md"
    },
    // STORIA MODERNA
    {
        title: "La Riforma Protestante e l'Impero di Carlo V",
        subject: "storia",
        chapterTag: "Studio I",
        description: "Le origini della Riforma protestante, Erasmo, le 95 tesi di Martin Lutero, la Dieta di Worms, la Lega di Smalcalda, l'impero asburgico di Carlo V, il Sacco di Roma e lo scisma anglicano.",
        keywords: "riforma protestante carlo v martin lutero erasmo indulgenze 95 tesi worms smalcalda pavia sacco roma lepanto comuneros augusta anglicanesimo scisma enrico viii",
        navPath: "storia/index.html?open=summaries/sto1_riforma.md"
    },
    {
        title: "La Controriforma e la Nascita dello Stato Moderno",
        subject: "storia",
        chapterTag: "Studio II",
        description: "Il Concilio di Trento, la riorganizzazione dottrinale e disciplinare cattolica, il disciplinamento sociale e i teorici del potere moderno come Bodin, Hobbes e Botero.",
        keywords: "controriforma trento gesuiti inquisizione sant'uffizio stato moderno botero bodin hobbes althusius ragion stato favoriti potere sovrano",
        navPath: "storia/index.html?open=summaries/sto2_controriforma.md"
    },
    {
        title: "Guerre di Religione, Guerra dei Trent'anni e Crisi del Seicento",
        subject: "storia",
        chapterTag: "Studio III",
        description: "Le guerre di religione in Francia e la politica di Richelieu. La nascita delle Province Unite e della potenza olandese. La Guerra dei Trent'anni (1618-1648) e la Pace di Westfalia. La crisi del Seicento tra trasformazioni agrarie, protoindustria a domicilio, rivolte popolari (Spagna, Catalogna, Portogallo, Masaniello a Napoli) e le Fronde in Francia.",
        keywords: "guerre religione ugonotti guisa borbone nantes enrico iv richelieu la rochelle grazia papato ragion stato province unite olanda utrecht duca alba farnese economia spagnola bancarotte olivares trentanni boemia praga defenestrazione westfalia munster osnabruck crisi seicento rifeudalizzazione servaggio enclosures gentry farmers protoindustria rivolte croquants nu-pieds bonnets rouges catalogna portogallo masaniello napoli republica napoletana fronda mazzarino conde",
        navPath: "storia/index.html?open=summaries/sto3_crisi_seicento.md"
    },
    {
        title: "Le Rivoluzioni Inglesi e la Nascita del Costituzionalismo",
        subject: "storia",
        chapterTag: "Studio IV",
        description: "Le tensioni religiose e costituzionali tra la corona Stuart e il Parlamento. Lo scoppio della Guerra Civile (1642), il Commonwealth repubblicano di Oliver Cromwell. La Restaurazione, il Test Act, l'Habeas Corpus e lo spartiacque della Gloriosa Rivoluzione (1688) con il Bill of Rights, l'Act of Settlement, il mercantilismo e la nascita del bipartitismo parlamentare (Whigs/Tories).",
        keywords: "rivoluzioni inglesi stuart carlo i puritani parlamento guerra civile new model army cromwell livellatori zappatori gloriosa rivoluzione bill of rights test act habeas corpus settlement costituzionalismo common law whigs tories mercantilismo",
        navPath: "storia/index.html?open=summaries/sto4_rivoluzioni_inglesi.md"
    },
    {
        title: "L'Assolutismo di Luigi XIV e il Concerto delle Potenze",
        subject: "storia",
        chapterTag: "Studio V",
        description: "Il regno assolutistico del Re Sole a Versailles, le riforme finanziarie di Colbert, le guerre dinastiche europee del Settecento e l'ascesa russa di Pietro il Grande.",
        keywords: "assolutismo luigi xiv versailles colbertismo successione spagnola utrecht successione polacca successione austriaca sette anni russia pietro grande polonia re sole fontainebleau",
        navPath: "storia/index.html?open=summaries/sto5_assolutismo_guerre.md"
    },
    {
        title: "L'Illuminismo e il Riformismo del Settecento",
        subject: "storia",
        chapterTag: "Studio VI",
        description: "La rivoluzione scientifica e il pensiero illuminista di Montesquieu, Rousseau e Locke. I laboratori del dispotismo illuminato in Europa (Toscana, Napoli, Austria).",
        keywords: "illuminismo montesquieu rousseau locke leopoldo toscana tanucci napoli giuseppe ii asburgo pombal portogallo inghilterra francia stallo fisiocrazia beccaria",
        navPath: "storia/index.html?open=summaries/sto6_illuminismo_riforme.md"
    },
    {
        title: "La Rivoluzione Americana e lo Scoppio della Rivoluzione Francese",
        subject: "storia",
        chapterTag: "Studio VII",
        description: "L'indipendenza delle colonie americane e la Costituzione USA. La crisi dell'Antico Regime in Francia, la presa della Bastiglia e la dittatura del Terrore di Robespierre.",
        keywords: "rivoluzione americana colonie indipendenza washington costituzione rivoluzione francese stati generali pallacorda bastiglia diritti uomo costituzione clero vandea terrore robespierre",
        navPath: "storia/index.html?open=summaries/sto7_rivoluzione_americana_francese.md"
    },
    {
        title: "L'Età Napoleonica e la Restaurazione",
        subject: "storia",
        chapterTag: "Studio VIII",
        description: "La discesa di Napoleone Bonaparte in Italia, la riorganizzazione legislativa del Codice Civile del 1804, la sconfitta a Waterloo e il Congresso di Vienna con Metternich.",
        keywords: "direttorio napoleone bonaparte campagna italia campoformio repubbliche sorelle consolato codice civile 1804 impero austerlitz blocco continentale russia waterloo vienna restaurazione metternich",
        navPath: "storia/index.html?open=summaries/sto8_napoleone_restaurazione.md"
    },
    {
        title: "La Società Borghese e l'Europa Liberale (1830-1848)",
        subject: "storia",
        chapterTag: "Studio IX",
        description: "L'espansione industriale e l'avvento dei regimi liberali in Inghilterra e Francia. I moti insurrezionali del 1848, l'ascesa della Prussia di Bismarck e la Comune di Parigi.",
        keywords: "societa borghese rivoluzione industriale liberalismo inghilterra riforme carlo x orleans monarchia luglio 1848 ateliers nationaux napoleone iii reich bismarck comune parigi sedan",
        navPath: "storia/index.html?open=summaries/sto9_societa_borghese_liberalismo.md"
    },
    {
        title: "Il Risorgimento Italiano e i Moti Rivoluzionari",
        subject: "storia",
        chapterTag: "Studio X",
        description: "L'Italia divisa della Restaurazione, i moti settari della Carboneria, il programma unitario di Mazzini, il federalismo di Gioberti e le rivoluzioni del 1848.",
        keywords: "risorgimento italiano divisione italia carboneria moti 1820 1830 mazzini giovine italia neoguelfismo gioberti balbo d'azeglio 1848 milano cinque giornate venezia manin prima guerra indipendenza republica romana triumvirato",
        navPath: "storia/index.html?open=summaries/sto10_risorgimento_italiano.md"
    },
    {
        title: "Cavour, Garibaldi e la Nascita del Regno d'Italia",
        subject: "storia",
        chapterTag: "Studio XI",
        description: "La politica diplomatica sabauda di Cavour, l'alleanza di Plombières, la Spedizione dei Mille di Garibaldi, la nascita del Regno d'Italia (1861) e la breccia di Porta Pia (1870).",
        keywords: "unificazione italiana cavour connubio crimea plombieres seconda guerra indipendenza magenta solferino villafranca spedizione mille garibaldi teano regno italia guarentigie non expedit porta pia",
        navPath: "storia/index.html?open=summaries/sto11_unificazione_regno.md"
    },
    // NUOVI MODULI - PIANO DI STUDI
    {
        title: "Letteratura Italiana Cap. I: Introduzione al Corso",
        subject: "letteratura_italiana",
        chapterTag: "Capitolo I",
        description: "Panoramica del modulo di Letteratura Italiana, evoluzione della lingua letteraria, periodizzazioni e metodi critico-filologici.",
        keywords: "letteratura italiana origini trecento dante petrarca boccaccio rinascimento romanticismo novecento filologia",
        navPath: "letteratura_italiana/index.html?open=summaries/cap1.md"
    },
    {
        title: "Cultura Greca Cap. I: Introduzione al Corso",
        subject: "cultura_greca",
        chapterTag: "Capitolo I",
        description: "Indagine sulle espressioni letterarie, filosofiche e mitologiche greche dall'età omerica al tramonto ellenistico.",
        keywords: "cultura greca omero esiodo lirica tragedia sofocle platone aristotele ellenismo polis mito",
        navPath: "cultura_greca/index.html?open=summaries/cap1.md"
    },
    {
        title: "Storia Medievale Cap. I: Introduzione al Corso",
        subject: "storia_medievale",
        chapterTag: "Capitolo I",
        description: "Il millennio medievale tra sintesi romana, tradizioni germaniche e cristianesimo. Periodizzazione e critica delle fonti.",
        keywords: "storia medievale alto medioevo basso feudo carlo magno comuni investiture fonti diplomatica",
        navPath: "storia_medievale/index.html?open=summaries/cap1.md"
    },
    {
        title: "Geografia Cap. I: Introduzione al Corso",
        subject: "geografia",
        chapterTag: "Capitolo I",
        description: "La superficie terrestre come spazio dell'azione umana. Relazioni spaziali, sostenibilità e dinamiche demografiche urbane.",
        keywords: "geografia territorio spazio luogo paesaggio demografia globalizzazione urbanizzazione gis",
        navPath: "geografia/index.html?open=summaries/cap1.md"
    },
    {
        title: "Arte Medievale Cap. I: Introduzione al Corso",
        subject: "arte_medievale",
        chapterTag: "Capitolo I",
        description: "Lo sviluppo delle arti visive e dell'architettura in Europa e nel Mediterraneo dal IV al XV secolo.",
        keywords: "arte medievale bizantino paleocristiana mosaico romanico gotico giotto pisano panofsky",
        navPath: "arte_medievale/index.html?open=summaries/cap1.md"
    },
    {
        title: "Letteratura Latina Cap. I: Le Origini e la Preletteratura",
        subject: "letteratura_latina",
        chapterTag: "Cap. I",
        description: "Sintesi sulle origini della cultura latina: carmina sacrali (saliare, arvale) e celebrativi, fescennini, atellana, Leggi delle XII Tavole e Annales Maximi.",
        keywords: "letteratura latina origini preletteratura carmina saliare arvale fescennini saturnio atellana leggi xii tavole annales maximi mos maiorum",
        navPath: "letteratura_latina/index.html?open=summaries/cap1.md"
    },
    {
        title: "Letteratura Latina Cap. II: I Padri della Letteratura Arcaica",
        subject: "letteratura_latina",
        chapterTag: "Cap. II",
        description: "Studio di Livio Andronico (Odusia e vertere), Gneo Nevio (praetexta, Bellum Poenicum) e Quinto Ennio (Annales, rivoluzione dell'esametro).",
        keywords: "letteratura latina arcaica livio andronico gneo nevio quinto ennio odissea odusia saturnio vertere praetexta bellum poenicum annales esametro",
        navPath: "letteratura_latina/index.html?open=summaries/cap2.md"
    },
    {
        title: "Letteratura Latina Cap. III: Il Teatro Arcaico: Plauto e Terenzio",
        subject: "letteratura_latina",
        chapterTag: "Cap. III",
        description: "Il genere della palliata. Plauto (la beffa, lo schiavo callidus, cantica) vs Terenzio (humanitas, finezza psicologica, sermo purus).",
        keywords: "letteratura latina teatro commedia palliata plauto terenzio servus callidus cantica sermo plautinus humanitas prologo purus hecyra",
        navPath: "letteratura_latina/index.html?open=summaries/cap3.md"
    },
    {
        title: "Letteratura Latina Cap. IV: La Prosa arcaica e il Mos Maiorum",
        subject: "letteratura_latina",
        chapterTag: "Cap. IV",
        description: "Catone il Censore, il De agri cultura e le Origines (storiografia senza nomi). La nascita della satira d'opinione con Lucilio.",
        keywords: "letteratura latina prosa arcaica catone censore origines de agri cultura mos maiorum oratoria gaio lucilio satira esametro saturae",
        navPath: "letteratura_latina/index.html?open=summaries/cap4.md"
    },
    {
        title: "Letteratura Latina Cap. V: La Rivoluzione Poetica",
        subject: "letteratura_latina",
        chapterTag: "Cap. V",
        description: "Lucrezio e la fisica epicurea del De rerum natura. Catullo e la cerchia dei neoteroi (lirica personale, labor limae, amore per Lesbia).",
        keywords: "letteratura latina lucrezio catullo de rerum natura epicureismo epicuro clinamen neoteroi callimaco brevitas labor limae lesbia odi et amo",
        navPath: "letteratura_latina/index.html?open=summaries/cap5.md"
    },
    {
        title: "Letteratura Latina Cap. VI: La Prosa della Tarda Repubblica",
        subject: "letteratura_latina",
        chapterTag: "Cap. VI",
        description: "Cicerone (oratoria, retorica, filosofia eclettica, concinnitas); Cesare (Commentarii, terza persona); Sallustio (monografie storiche, inconcinnitas, gravitas).",
        keywords: "letteratura latina cicerone cesare sallustio oratoria commentarii de bello gallico de bello civili monografie catilina giugurta concinnitas",
        navPath: "letteratura_latina/index.html?open=summaries/cap6.md"
    },
    {
        title: "Letteratura Latina Cap. VII: Grammatica di Base e Lettura delle Epigrafi",
        subject: "letteratura_latina",
        chapterTag: "Cap. VII",
        description: "Introduzione alla lingua latina per i Beni Culturali: pronuncia (classica/ecclesiastica), i casi, le 5 declinazioni, coniugazioni verbali e abbreviazioni epigrafiche comuni.",
        keywords: "letteratura latina grammatica base epigrafi epigrafia pronuncia declinazioni coniugazioni verbi casi nominativo accusativo abbreviazioni dm hse vslm traiano",
        navPath: "letteratura_latina/index.html?open=summaries/plus1_grammatica.md"
    },
    {
        title: "Letteratura Latina Cap. VIII: Antologia Critica ed Esegesi dei Testi",
        subject: "letteratura_latina",
        chapterTag: "Cap. VIII",
        description: "Esegesi e commento testuale guidato di testi emblematici: elogio di Scipione Barbato, Pseudolus di Plauto, De agri cultura di Catone, De rerum natura di Lucrezio, Catullo e le Catilinarie di Cicerone.",
        keywords: "letteratura latina antologia esegesi testi commento traduzione scipione barbato plauto pseudolus catone de agri cultura lucrezio de rerum natura catullo odi et amo cicerone catilinaria",
        navPath: "letteratura_latina/index.html?open=summaries/plus2_antologia.md"
    },
    {
        title: "Letteratura Latina Cap. IX: Strumenti Digitali per lo Studio del Latino",
        subject: "letteratura_latina",
        chapterTag: "Cap. IX",
        description: "Guida pratica all'Umanistica Digitale applicata al latino: database epigrafici (EDCS, EDR), biblioteche testuali online (PHI, Perseus, Brepolis), vocabolari (Logeion) e database bibliografici (L'Année Philologique).",
        keywords: "letteratura latina strumenti digitali database epigrafia edcs edr eagle corpora testi phi latin texts packard humanities institute perseus digital library logeion dictionaries annee philologique gnomon",
        navPath: "letteratura_latina/index.html?open=summaries/plus3_strumenti_digitali.md"
    },
    {
        title: "Letteratura Latina Speciale I: Terenzio, Adelphoe, vv. 98-140",
        subject: "letteratura_latina",
        chapterTag: "Spec. I",
        description: "Il dibattito educativo tra Micio e Demea. Traduzione letterale parola per parola, analisi dei paradigmi verbali, della metrica e della grammatica.",
        keywords: "letteratura latina terenzio adelphoe demea micio commedia traduzione letterale paradigmi declinazioni grammatica",
        navPath: "letteratura_latina/index.html?open=summaries/spec1_terenzio_adelphoe.md"
    },
    {
        title: "Letteratura Latina Speciale II: Catullo, Carmina (Scelta)",
        subject: "letteratura_latina",
        chapterTag: "Spec. II",
        description: "Esegesi e traduzione dei Carmi 5 (Vivamus mea Lesbia), 85 (Odi et amo) e 101 (il compianto per il fratello). Traduzione letterale a due colonne e analisi dei paradigmi.",
        keywords: "letteratura latina catullo carmina carme 5 vivamus mea lesbia carme 85 odi et amo carme 101 frater traduzione letterale paradigmi declinazioni",
        navPath: "letteratura_latina/index.html?open=summaries/spec2_catullo_carmina.md"
    },
    {
        title: "Letteratura Latina Speciale III: Sallustio, De Catilinae coniuratione, cap. 5",
        subject: "letteratura_latina",
        chapterTag: "Spec. III",
        description: "Il paradosso del ritratto di Catilina in Sallustio: la forza dell'indole volta al crimine. Traduzione letterale, esame retorico e paradigmi.",
        keywords: "letteratura latina sallustio ritratto catilina de catilinae coniuratione congiura traduzione letterale paradigmi declinazioni",
        navPath: "letteratura_latina/index.html?open=summaries/spec3_sallustio_catilina.md"
    },
    {
        title: "Letteratura Latina Speciale IV: Cicerone, Prima Catilinaria, parr. 1-2",
        subject: "letteratura_latina",
        chapterTag: "Spec. IV",
        description: "L'esordio drammatico contro Catilina in senato ('Quo usque tandem'). Traduzione letterale a fronte, analisi sintattica e retorica.",
        keywords: "letteratura latina cicerone prima catilinaria quo usque tandem senato oratoria traduzione letterale paradigmi declinazioni",
        navPath: "letteratura_latina/index.html?open=summaries/spec4_cicerone_catilinaria.md"
    },
    {
        title: "Codicologia: Archeologia del Libro",
        subject: "codicologia",
        chapterTag: "Intro",
        description: "Studio del libro manoscritto: materiali e tecniche.",
        keywords: "codicologia libro manoscritto archeologia",
        navPath: "codicologia/index.html"
    },
    {
        title: "Codicologia Cap. I: Codicologia e Paleografia",
        subject: "codicologia",
        chapterTag: "Cap. I",
        description: "Definizione della materia, evoluzione metodologica (Samaran, Dain) e differenze con la Paleografia.",
        keywords: "codicologia dain samaran paleografia metodo quantitativo bozzolo ornato",
        navPath: "codicologia/index.html?open=summaries/cap1.md"
    },
    {
        title: "Codicologia Cap. II: I Supporti (Papiro e Pergamena)",
        subject: "codicologia",
        chapterTag: "Cap. II",
        description: "Studio del papiro (fabbricazione, volumen) e della pergamena (preparazione, lato pelo/carne, costi).",
        keywords: "supporti scrittura papiro pergamena caudex volumen pergamo calcinatura pelo carne",
        navPath: "codicologia/index.html?open=summaries/cap2.md"
    },
    {
        title: "Codicologia Cap. III: La Carta e le Filigrane",
        subject: "codicologia",
        chapterTag: "Cap. III",
        description: "L'invenzione cinese e araba, l'arrivo a Fabriano e le innovazioni. Studio delle filigrane e Briquet.",
        keywords: "carta filigrana watermark cina arabi fabriano pila magli collatura briquet datazione",
        navPath: "codicologia/index.html?open=summaries/cap3.md"
    },
    {
        title: "Codicologia Cap. IV: Fascicolazione e Numerazione",
        subject: "codicologia",
        chapterTag: "Cap. IV",
        description: "Allestimento del fascicolo (quaternioni). La Regola di Gregory, richiami, segnature, fogliazione e paginazione.",
        keywords: "struttura codice fascicolo gregory quaternione richiamo segnatura fogliazione paginazione",
        navPath: "codicologia/index.html?open=summaries/cap4.md"
    },
    {
        title: "Codicologia Cap. V: L'Allestimento della Pagina",
        subject: "codicologia",
        chapterTag: "Cap. V",
        description: "Metodi di foratura (pricking) e rigatura (ruling). La tabula ad rigandum e la regola del below top line.",
        keywords: "allestimento pagina foratura rigatura secco colore piombo tabula ad rigandum below top line",
        navPath: "codicologia/index.html?open=summaries/cap5.md"
    },
    {
        title: "Codicologia Cap. VI: La Copia e la Pecia",
        subject: "codicologia",
        chapterTag: "Cap. VI",
        description: "Strumenti di copia, scriptoria monastici, colofoni e la rivoluzione delle università col sistema della pecia.",
        keywords: "copia scriptoria amanuensi calamo inchiostro colofone universita pecia exemplar stazionari",
        navPath: "codicologia/index.html?open=summaries/cap6.md"
    },
    {
        title: "Codicologia Cap. VII: Decorazione e Miniatura",
        subject: "codicologia",
        chapterTag: "Cap. VII",
        description: "Tecniche pittoriche, doratura, tipi di lettere iniziali (campite, zoomorfe, istoriate) e capolavori.",
        keywords: "decorazione miniatura pigmento doratura foglia oro iniziale zoomorfa istoriata quedlinburg",
        navPath: "codicologia/index.html?open=summaries/cap7.md"
    },
    {
        title: "Codicologia Cap. VIII: La Legatura (Bookbinding)",
        subject: "codicologia",
        chapterTag: "Cap. VIII",
        description: "Anatomia della legatura (assi, piatti, nervi, capitelli, fermagli). Tipologie storiche (bizantina, gotica, Canevari).",
        keywords: "legatura bookbinding assi piatti dorso nervi capitelli borchie fermagli bizantina Canevari",
        navPath: "codicologia/index.html?open=summaries/cap8.md"
    },
    {
        title: "Codicologia Cap. IX: Storia delle Biblioteche e Cataloghi",
        subject: "codicologia",
        chapterTag: "Cap. IX",
        description: "Evoluzione delle biblioteche (Alessandria, Cesarea, Montecassino, Vaticana, Petrarca). Inventari vs cataloghi.",
        keywords: "biblioteche catalogazione conservazione alessandria cesarea montecassino vaticana petrarca inventario",
        navPath: "codicologia/index.html?open=summaries/cap9.md"
    },
    {
        title: "Codicologia Cap. X: I Manoscritti Palinsesti",
        subject: "codicologia",
        chapterTag: "Cap. X",
        description: "Causa e metodo dei palinsesti (scarsità pergamena, riscrittura). Scoperte storiche (Angelo Mai) e decifrazione multispettrale.",
        keywords: "palinsesto cancellazione riscrittura cicerone de re publica angelo mai gaio spettroscopia multispettrale codex rescriptus",
        navPath: "codicologia/index.html?open=summaries/cap10.md"
    },
    {
        title: "Codicologia Cap. XI: La Catalogazione dei Manoscritti",
        subject: "codicologia",
        chapterTag: "Cap. XI",
        description: "La scheda codicologica: descrizione esterna (supporto, rigatura, legatura) e interna (incipit, explicit, note di possesso).",
        keywords: "catalogazione scheda codicologica segnatura descrizione esterna interna incipit explicit manus online digita vaticana",
        navPath: "codicologia/index.html?open=summaries/cap11.md"
    },
    {
        title: "Codicologia Cap. XII: Scritture e Centri Scrittori",
        subject: "codicologia",
        chapterTag: "Cap. XII",
        description: "Pluralismo grafico in Italia. La scrittura Beneventana (regole, ti, interrogativo) e Montecassino sotto l'abate Desiderio.",
        keywords: "scritture centri scrittori beneventana desiderio montecassino barese ligatura ti interrogativo",
        navPath: "codicologia/index.html?open=summaries/cap12.md"
    },
    {
        title: "Archeologia Cristiana Cap. I: Introduzione al Corso",
        subject: "cristiana",
        chapterTag: "Capitolo I",
        description: "Studio delle testimonianze materiali, epigrafiche e monumentali delle prime comunità cristiane e topografia tardoantica.",
        keywords: "cristiana archeologia paleocristiana catacombe basilica costantino epigrafia scavo",
        navPath: "cristiana/index.html?open=summaries/cap1.md"
    },
    {
        title: "Inglese Accademico Cap. I: Introduzione al Corso",
        subject: "inglese",
        chapterTag: "Capitolo I",
        description: "Competenze linguistiche e lessico specialistico bilingue per la storia dell'arte, archeologia, musei e restauro.",
        keywords: "inglese lingua accademico vocabolario abstract museologia restauro english art heritage",
        navPath: "inglese/index.html?open=summaries/cap1.md"
    },
        {
        title: "Storia Contemporanea Cap. I: Le rivoluzioni del 1848",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo I",
        description: "La crisi rivoluzionaria europea del 1848, la caduta della monarchia orleanista in Francia, le Cinque Giornate di Milano, la Repubblica romana e la prima guerra di indipendenza.",
        keywords: "storia contemporanea le rivoluzioni del 1848 1848 quarantotto parigi vienna milano venezia carlo alberto statuto albertino repubblica romana mazzini garibaldi kossuth",
        navPath: "storia_contemporanea/index.html?open=summaries/cap1.md"
    },
    {
        title: "Storia Contemporanea Cap. II: Società borghese e movimento operaio",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo II",
        description: "L'ascesa della borghesia europea, il positivismo scientifico di Darwin, lo sviluppo economico e ferroviario, Marx e Il Capitale, la Prima Internazionale e l'enciclica Quanta Cura.",
        keywords: "storia contemporanea società borghese e movimento operaio borghesia positivismo darwin progresso boom ferroviario proletariato urbano marx capitale prima internazionale bakunin pio ix",
        navPath: "storia_contemporanea/index.html?open=summaries/cap2.md"
    },
    {
        title: "Storia Contemporanea Cap. III: L'unità d'Italia",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo III",
        description: "La seconda restaurazione, l'esperienza liberale in Piemonte e l'opera di Cavour, la diplomazia di Plombières, la spedizione dei Mille di Garibaldi e la proclamazione del Regno d'Italia.",
        keywords: "storia contemporanea l'unità d'italia unita italia cavour piemonte garibaldi mille teano plebisciti mazzini solferino san martino lombardia vittorio emanuele ii",
        navPath: "storia_contemporanea/index.html?open=summaries/cap3.md"
    },
    {
        title: "Storia Contemporanea Cap. IV: L'Europa delle grandi potenze (1850-1890)",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo IV",
        description: "L'egemonia continentale, la Francia di Napoleone III, la guerra di Crimea, l'ascesa della Prussia e l'unificazione tedesca di Bismarck, Sedan, la Comune di Parigi e la Terza Repubblica.",
        keywords: "storia contemporanea l'europa delle grandi potenze (1850-1890) bismarck prussia sedan napoleone iii comune parigi germania unificazione terza repubblica crimea potenza alsazia lorena",
        navPath: "storia_contemporanea/index.html?open=summaries/cap4.md"
    },
    {
        title: "Storia Contemporanea Cap. V: I nuovi mondi: Stati Uniti e Giappone",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo V",
        description: "Sviluppo e fratture negli USA, la guerra di secessione americana, l'abolizione della schiavitù, e la rivoluzione modernizzatrice della Restaurazione Meiji in Giappone.",
        keywords: "storia contemporanea i nuovi mondi: stati uniti e giappone stati uniti secessione lincoln guerra civile schiavitu confederati unione giappone meiji modernizzazione samurai tokyo",
        navPath: "storia_contemporanea/index.html?open=summaries/cap5.md"
    },
    {
        title: "Storia Contemporanea Cap. VI: La seconda rivoluzione industriale",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo VI",
        description: "La svolta capitalistica di fine Ottocento: concentrazioni industriali (trust, cartelli), dazi protezionistici, acciaio, chimica, elettricità, motore a scoppio e progresso medico.",
        keywords: "storia contemporanea la seconda rivoluzione industriale seconda rivoluzione industriale acciaio chimica elettricita motore scoppio medicina pasteur protezionismo taylorismo monopoli",
        navPath: "storia_contemporanea/index.html?open=summaries/cap6.md"
    },
    {
        title: "Storia Contemporanea Cap. VII: Imperialismo e colonialismo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo VII",
        description: "La febbre coloniale e la spartizione dell'Africa (Scramble for Africa), la Conferenza di Berlino del 1884-85, l'espansione asiatica e la guerra anglo-boera in Sudafrica.",
        keywords: "storia contemporanea imperialismo e colonialismo imperialismo colonialismo africa spartizione berlino congo fashoda india gran bretagna boeri transvaal cecil rhodes",
        navPath: "storia_contemporanea/index.html?open=summaries/cap7.md"
    },
    {
        title: "Storia Contemporanea Cap. VIII: Stato e società nell'Italia unita",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo VIII",
        description: "I problemi dell'unificazione: la Destra storica, l'accentramento prefettizio, il brigantaggio meridionale, Porta Pia, la Sinistra di Depretis, il trasformismo e il colonialismo di Crispi fino ad Adua.",
        keywords: "storia contemporanea stato e società nell'italia unita italia unita destra storica brigantaggio piemontesizzazione depretis trasformismo crispi triplice alleanza adua fasci siciliani porta pia",
        navPath: "storia_contemporanea/index.html?open=summaries/cap8.md"
    },
    {
        title: "Storia Contemporanea Cap. IX: Verso la società di massa",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo IX",
        description: "Istruzione obbligatoria, eserciti di leva, suffragio universale maschile, partiti di massa, sindacati, questione femminile (suffragette), la Seconda Internazionale e la Rerum Novarum.",
        keywords: "storia contemporanea verso la società di massa societa di massa suffragio universale partiti sindacati cgil femminismo suffragette rerum novarum leone xiii nazionalismo secolarizzazione",
        navPath: "storia_contemporanea/index.html?open=summaries/cap9.md"
    },
    {
        title: "Storia Contemporanea Cap. X: L'Europa tra due secoli",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo X",
        description: "Le nuove alleanze (Triplice Intesa e Triplice Alleanza), la Belle Époque e le sue contraddizioni, il caso Dreyfus in Francia, la Germania guglielmina, la Russia del 1905 e le guerre balcaniche.",
        keywords: "storia contemporanea l'europa tra due secoli belle epoque triplice intesa triplice alleanza guglielmo ii dreyfus russia 1905 domenica sangue soviet duma balcani",
        navPath: "storia_contemporanea/index.html?open=summaries/cap10.md"
    },
    {
        title: "Storia Contemporanea Cap. XI: Imperialismo e rivoluzione extraeuropea",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XI",
        description: "Il ridimensionamento dell'Europa: la guerra russo-giapponese del 1905, la proclamazione della Repubblica in Cina con Sun Yat-sen e la rivoluzione messicana di Zapata e Villa.",
        keywords: "storia contemporanea imperialismo e rivoluzione extraeuropea guerra russo giapponese tsushima cina repubblica sun yat-sen messico rivoluzione madero zapata pancho villa roosevelt panama",
        navPath: "storia_contemporanea/index.html?open=summaries/cap11.md"
    },
    {
        title: "Storia Contemporanea Cap. XII: L'Italia giolittiana",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XII",
        description: "La crisi di fine secolo, il decollo industriale del triangolo economico, il metodo di governo liberale di Giolitti, il Patto Gentiloni con i cattolici e la guerra di Libia (1911-12).",
        keywords: "storia contemporanea l'italia giolittiana italia giolittiana giolitti riforme suffragio universale patto gentiloni guerra libia turati socialismo cgil mezzogiorno",
        navPath: "storia_contemporanea/index.html?open=summaries/cap12.md"
    },
    {
        title: "Storia Contemporanea Cap. XIII: La prima guerra mondiale",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XIII",
        description: "Dall'attentato di Sarajevo alle trincee: guerra d'usura, mobilitazione totale del fronte interno, Caporetto, la svolta del 1917, l'intervento USA e i trattati punitivi di Versailles.",
        keywords: "storia contemporanea la prima guerra mondiale prima guerra mondiale sarajevo trincee gas somme verdun caporetto piave vittorio veneto 1917 wilson quattordici punti versailles",
        navPath: "storia_contemporanea/index.html?open=summaries/cap13.md"
    },
    {
        title: "Storia Contemporanea Cap. XIV: La rivoluzione russa",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XIV",
        description: "La caduta dello zarismo nel febbraio 1917, Lenin e le Tesi di Aprile, la Rivoluzione d'Ottobre, la guerra civile, il comunismo di guerra, la NEP e la fondazione dell'URSS.",
        keywords: "storia contemporanea la rivoluzione russa rivoluzione russa lenin bolscevichi soviet tesi aprile rivoluzione ottobre armata rossa trotskij comunismo guerra nep urss stalin",
        navPath: "storia_contemporanea/index.html?open=summaries/cap14.md"
    },
    {
        title: "Storia Contemporanea Cap. XV: L'eredità della grande guerra",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XV",
        description: "Le trasformazioni sociali postbelliche, l'inflazione monetaria, il biennio rosso europeo, la Repubblica di Weimar, la crisi della Ruhr e gli accordi distensivi di Locarno.",
        keywords: "storia contemporanea l'eredità della grande guerra eredita grande guerra biennio rosso repubblica weimar iperinflazione ruhr locarno briand stresemann societa nazioni",
        navPath: "storia_contemporanea/index.html?open=summaries/cap15.md"
    },
    {
        title: "Storia Contemporanea Cap. XVI: Il dopoguerra in Italia e l'avvento del fascismo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XVI",
        description: "La vittoria mutilata, l'impresa fiumana di D'Annunzio, il fascismo agrario e lo squadrismo, la marcia su Roma (1922), il delitto Matteotti, l'Aventino e le leggi fascistissime.",
        keywords: "storia contemporanea il dopoguerra in italia e l'avvento del fascismo dopoguerra italia vittoria mutilata fiume dannunzio fasci combattimento marcia roma matteotti leggi fascistissime aventino mussolini",
        navPath: "storia_contemporanea/index.html?open=summaries/cap16.md"
    },
    {
        title: "Storia Contemporanea Cap. XVII: La grande crisi: economia e società negli anni '30",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XVII",
        description: "Il grande crollo di Wall Street del 1929 ('giovedì nero'), la Grande Depressione economica mondiale, Franklin Delano Roosevelt, il New Deal e la teoria economica keynesiana.",
        keywords: "storia contemporanea la grande crisi: economia e società negli anni '30 grande crisi 1929 wall street crollo borsa roosevelt new deal keynes deficit spending disoccupazione ceto medio gold standard",
        navPath: "storia_contemporanea/index.html?open=summaries/cap17.md"
    },
    {
        title: "Storia Contemporanea Cap. XVIII: L'età dei totalitarismi",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XVIII",
        description: "La crisi definitiva di Weimar, l'ascesa di Adolf Hitler nel 1933, il Terzo Reich nazista, le leggi razziali di Norimberga, lo stalinismo dei gulag e la guerra civile spagnola.",
        keywords: "storia contemporanea l'età dei totalitarismi totalitarismo hitler nazismo terzo reich norimberga shoah stalin gulag purghe piani quinquennali spagna franco guernica",
        navPath: "storia_contemporanea/index.html?open=summaries/cap18.md"
    },
    {
        title: "Storia Contemporanea Cap. XIX: L'Italia fascista",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XIX",
        description: "Il totalitarismo imperfetto: i Patti Lateranensi del 1929, l'inquadramento di massa, la battaglia del grano, lo Stato-imprenditore (IRI), l'invasione dell'Etiopia e le leggi razziali del 1938.",
        keywords: "storia contemporanea l'italia fascista italia fascista patti lateranensi concordato chiesa iri battagliadelgrano autarchia etiopia impero leggi razziali 1938 consenso",
        navPath: "storia_contemporanea/index.html?open=summaries/cap19.md"
    },
    {
        title: "Storia Contemporanea Cap. XX: Il tramonto del colonialismo. L'Asia e l'America Latina",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XX",
        description: "La crisi degli imperi europei: Kemal Atatürk e la repubblica laica in Turchia, la resistenza nonviolenta di Gandhi in India, Mao Zedong in Cina e i populismi sudamericani (Vargas, Perón).",
        keywords: "storia contemporanea il tramonto del colonialismo. l'asia e l'america latina tramonto colonialismo ataturk turchia gandhi india nonviolenza maozedong lunga marcia cina populismo vargas peron america latina",
        navPath: "storia_contemporanea/index.html?open=summaries/cap20.md"
    },
    {
        title: "Storia Contemporanea Cap. XXI: La seconda guerra mondiale",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXI",
        description: "Dall'invasione della Polonia a Pearl Harbor, la battaglia di Stalingrado, l'8 settembre in Italia, la Resistenza partigiana, lo sbarco in Normandia, lo sterminio della Shoah e Hiroshima.",
        keywords: "storia contemporanea la seconda guerra mondiale seconda guerra mondiale polonia blitzkrieg stalingrado el alamein normandia 8 settembre resistenza cln shoah auschwitz hiroshima bomba atomica",
        navPath: "storia_contemporanea/index.html?open=summaries/cap21.md"
    },
    {
        title: "Storia Contemporanea Cap. XXII: Il mondo diviso",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXII",
        description: "Le conseguenze della guerra, nascita dell'ONU, la cortina di ferro, la Dottrina Truman, il Piano Marshall, la nascita della NATO e del Patto di Varsavia, la guerra di Corea e la destalinizzazione del 1956.",
        keywords: "storia contemporanea il mondo diviso mondo diviso guerra fredda cortina ferro truman marshall nato patto varsavia cina mao guerra corea 1956 destalinizzazione cee",
        navPath: "storia_contemporanea/index.html?open=summaries/cap22.md"
    },
    {
        title: "Storia Contemporanea Cap. XXIII: La decolonizzazione e il Terzo Mondo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXIII",
        description: "L'indipendenza dell'India e del Pakistan, la nascita di Israele (1948) e i conflitti arabo-israeliani, la crisi di Suez (Nasser), la guerra d'Algeria e il movimento dei non allineati di Bandung.",
        keywords: "storia contemporanea la decolonizzazione e il terzo mondo decolonizzazione terzo mondo india partizione pakistan israele 1948 suez nasser algeria fln africa nera bandung non allineati",
        navPath: "storia_contemporanea/index.html?open=summaries/cap23.md"
    },
    {
        title: "Storia Contemporanea Cap. XXIV: L'Italia dopo il fascismo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXIV",
        description: "Il referendum istituzionale del 2 giugno 1946 (Repubblica), l'Assemblea Costituente, la Costituzione del 1948, le elezioni del '48 con la vittoria della DC e il centrismo degasperiano.",
        keywords: "storia contemporanea l'italia dopo il fascismo italia dopoguerra repubblica 2 giugno 1946 costituzione de gasperi togliatti elezioni 1948 centrismo cassa mezzogiorno nato ricostruzione",
        navPath: "storia_contemporanea/index.html?open=summaries/cap24.md"
    },
    {
        title: "Storia Contemporanea Cap. XXV: La società del benessere",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXV",
        description: "Il miracolo economico degli anni '50 e '60, la diffusione dell'automobile e della TV, l'esplosione demografica del baby boom, la contestazione studentesca del 1968 e il Concilio Vaticano II.",
        keywords: "storia contemporanea la società del benessere societa benessere miracolo economico consumi massa automobile tv baby boom 1968 contestazione gioventu femminismo vaticano ii giovanni xxiii",
        navPath: "storia_contemporanea/index.html?open=summaries/cap25.md"
    },
    {
        title: "Storia Contemporanea Cap. XXVI: Distensione e confronto",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXVI",
        description: "L'età di Kennedy e Kruscev, la crisi missilistica di Cuba (1962), la guerra del Vietnam, la Primavera di Praga del 1968, la guerra del Kippur e lo shock petrolifero mondiale del 1973.",
        keywords: "storia contemporanea distensione e confronto distensione kennedy kruscev cuba missili vietnam praga dubcek 1968 yom kippur opec crisi petrolifera 1973",
        navPath: "storia_contemporanea/index.html?open=summaries/cap26.md"
    },
    {
        title: "Storia Contemporanea Cap. XXVII: Apogeo e crisi del bipolarismo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXVII",
        description: "Gli anni del riflusso, Ronald Reagan e il confronto con l'URSS, le riforme di Gorbaciov (perestrojka e glasnost), la caduta del Muro di Berlino nel 1989 e la dissoluzione dell'Unione Sovietica.",
        keywords: "storia contemporanea apogeo e crisi del bipolarismo apogeo crisi bipolarismo reagan gorbaciov perestrojka glasnost muro berlino 1989 crollo urss riunificazione germania tiananmen",
        navPath: "storia_contemporanea/index.html?open=summaries/cap27.md"
    },
    {
        title: "Storia Contemporanea Cap. XXVIII: L'Italia dal miracolo alla crisi della Prima Repubblica",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXVIII",
        description: "Il centrosinistra di Moro, l'autunno caldo del '69, lo Statuto dei Lavoratori, gli anni di piombo e lo stragismo, il compromesso storico di Berlinguer, il sequestro Moro e l'era del pentapartito di Craxi.",
        keywords: "storia contemporanea l'italia dal miracolo alla crisi della prima repubblica miracolo economico autunno caldo statuto lavoratori terrorismo brigate rosse aldo moro compromesso storico berlinguer craxi pentapartito",
        navPath: "storia_contemporanea/index.html?open=summaries/cap28.md"
    },
    {
        title: "Storia Contemporanea Cap. XXIX: La società postindustriale",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXIX",
        description: "I limiti dello sviluppo (ecologia), la terza rivoluzione industriale (microelettronica e computer), la globalizzazione dei mercati, i flussi migratori planetari e le sfide bioetiche.",
        keywords: "storia contemporanea la società postindustriale societa postindustriale ecologia rivoluzione elettronica informatica internet globalizzazione migrazioni societa multietnica bioetica",
        navPath: "storia_contemporanea/index.html?open=summaries/cap29.md"
    },
    {
        title: "Storia Contemporanea Cap. XXX: Il mondo contemporaneo",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXX",
        description: "La dissoluzione dell'URSS e la Russia di Eltsin e Putin, le guerre etniche nella ex Jugoslavia, il Trattato di Maastricht e l'Unione Europea, gli attentati dell'11 settembre 2001 e le guerre in Afghanistan e Iraq.",
        keywords: "storia contemporanea il mondo contemporaneo mondo contemporaneo fine urss russia eltsin jugoslavia bosnia maastricht euro unione europea 11 settembre terrorismo al qaeda iraq",
        navPath: "storia_contemporanea/index.html?open=summaries/cap30.md"
    },
    {
        title: "Storia Contemporanea Cap. XXXI: La seconda repubblica in Italia",
        subject: "storia_contemporanea",
        chapterTag: "Capitolo XXXI",
        description: "L'inchiesta giudiziaria di Tangentopoli (Mani Pulite), il crollo dei partiti storici, la riforma elettorale maggioritaria, la discesa in campo di Silvio Berlusconi nel 1994 e l'avvio del bipolarismo.",
        keywords: "storia contemporanea la seconda repubblica in italia seconda repubblica tangentopoli mani pulite di pietro referendum maggioritario berlusconi polo liberta ulivo prodi euro 1994 2001",
        navPath: "storia_contemporanea/index.html?open=summaries/cap31.md"
    },
    {
        title: "Arte Contemporanea Cap. I: Introduzione al Corso",
        subject: "arte_contemporanea",
        chapterTag: "Capitolo I",
        description: "Evoluzione delle arti visive dall'Impressionismo alle neoavanguardie del secondo dopoguerra e alle pratiche digitali odierne.",
        keywords: "arte contemporanea impressionismo avanguardie cubismo pop art performance installazione concettuale",
        navPath: "arte_contemporanea/index.html?open=summaries/cap1.md"
    },
    {
        title: "Museologia Cap. I: Introduzione al Corso",
        subject: "museologia",
        chapterTag: "Capitolo I",
        description: "Storia del collezionismo, evoluzione storica del museo pubblico, conservazione preventiva, didattica e comunicazione museale.",
        keywords: "museologia museografia collezionismo wunderkammer louvre icom allestimento tutela",
        navPath: "museologia/index.html?open=summaries/cap1.md"
    },
    {
        title: "Restauro Cap. I: Introduzione al Corso",
        subject: "restauro",
        chapterTag: "Capitolo I",
        description: "Sviluppo metodologico e teorico degli interventi conservativi. Istituzioni, carte del restauro e principi di Brandi.",
        keywords: "restauro conservazione brandi viollet-le-duc ruskin boito reversibilità diagnostica",
        navPath: "restauro/index.html?open=summaries/cap1.md"
    },
    {
        title: "Laboratorio Cap. I: Introduzione al Corso",
        subject: "laboratorio",
        chapterTag: "Capitolo I",
        description: "Traduzione delle nozioni teoriche in competenze operative: catalogazione ICCD, digitalizzazione e diagnostica per immagini.",
        keywords: "laboratorio catalogazione iccd sigec web digitalizzazione metadati diagnostica",
        navPath: "laboratorio/index.html?open=summaries/cap1.md"
    },
    {
        title: "Laboratorio Tesi Cap. I: Introduzione al Corso",
        subject: "tesi",
        chapterTag: "Capitolo I",
        description: "Metodologia della ricerca scientifica, schedatura bibliografica, stesura capitoli, note citazionali e redazione finale.",
        keywords: "tesi laurea ricerca redazione bibliografia note citazioni eco stesura",
        navPath: "tesi/index.html?open=summaries/cap1.md"
    },
    {
        title: "Spec. V — Plauto e Catullo: Antologia e Analisi",
        subject: "letteratura_latina",
        chapterTag: "Spec. V",
        description: "Selezione antologica e analisi filologica di testi da Rudens, Aulularia, Pseudolus e Mostellaria di Plauto, e dei Carmina 1, 2, 8, 51, 70 e 72 di Catullo. Traduzione letterale a due colonne, analisi grammaticale, paradigmi verbali e metrologia (strofe saffica).",
        keywords: "plauto catullo carmina rudens aulularia pseudolus mostellaria curculio servus callidus metateatro strofe saffica nugae labor limae neoteroi foedus amoris lesbia passer dilexi odi et amo analisi grammaticale paradigma fabula palliata cantica",
        navPath: "letteratura_latina/index.html?open=summaries/spec5_plauto_catullo.md"
    },
    {
        title: "Spec. I — Architettura Tardo-Antica e Svolta Costantiniana",
        subject: "arte_romana",
        chapterTag: "Spec. I",
        description: "Analisi della Basilica di Massenzio, dell'Arco di Costantino (uso degli spolia) e delle Terme di Diocleziano. Evoluzione delle volte in calcestruzzo e dell'iconografia del sovrano.",
        keywords: "arte romana architettura tardoantica basilica massenzio costantino arco costantino spolia reimpiego porfido acrolito terme diocleziano prospettiva ribaltata",
        navPath: "arte_romana/index.html?open=summaries/spec1_architettura_tardoantica.md"
    },
    {
        title: "Spec. II — Evoluzione della Ritrattistica Imperiale",
        subject: "arte_romana",
        chapterTag: "Spec. II",
        description: "Studio del ritratto romano dal verismo patrizio repubblicano (ius imaginum) al classicismo neo-attico augusteo (Prima Porta), fino al realismo di III secolo e all'astrazione tardo-imperiale.",
        keywords: "arte romana ritratto verismo patrizio ius imaginum augusto prima porta adriano adlocutio lorica marco aurelio costantino ieratico",
        navPath: "arte_romana/index.html?open=summaries/spec2_ritrattistica_imperiale.md"
    },
    {
        title: "Spec. I — Codice Urbani, Contenziosi sul Vincolo e Direttive UE",
        subject: "diritto",
        chapterTag: "Spec. I",
        description: "Approfondimento sul D.Lgs. 42/2004, procedimento di dichiarazione dell'interesse culturale (Art. 13), ricorsi amministrativi/TAR, diritto di prelazione e restituzione internazionale (Direttiva UE 2014/60/UE).",
        keywords: "diritto beni culturali codice urbani vincolo dichiarazione ricorso gerarchico tar acquisto coattivo prelazione attestato libera circolazione direttiva ue 2014/60/ue",
        navPath: "diritto/index.html?open=summaries/spec1_contenziosi_codice_urbani.md"
    },
    {
        title: "Spec. I — La Riforma Protestante e la Controriforma",
        subject: "storia",
        chapterTag: "Spec. I",
        description: "Analisi teologica e storica delle 95 Tesi di Lutero, sola fide, sola scriptura, calvinismo e risposte cattoliche al Concilio di Trento (inquisizione, seminari, registri parrocchiali).",
        keywords: "storia moderna riforma protestante lutero 95 tesi sola fide calvino predestinazione concilio trento controriforma transustanziazione inquisizione",
        navPath: "storia/index.html?open=summaries/spec1_riforma_controriforma.md"
    },
    {
        title: "Spec. II — La Rivoluzione Scientifica e Galilei",
        subject: "storia",
        chapterTag: "Spec. II",
        description: "La crisi del cosmo aristotelico-tolemaico: da Copernico e Keplero al metodo sperimentale di Galileo Galilei (Sidereus Nuncius) e alla fisica gravitazionale di Newton.",
        keywords: "storia moderna rivoluzione scientifica copernico keplero galileo galilei sidereus nuncius metodo sperimentale eliocentrismo abiura newton",
        navPath: "storia/index.html?open=summaries/spec2_rivoluzione_scientifica.md"
    },
    {
        title: "Spec. I — Dante e Petrarca: Antologia e Parafrasi",
        subject: "letteratura_italiana",
        chapterTag: "Spec. I",
        description: "Antologia con testo originale a fronte e parafrasi letterale a due colonne: Inferno V di Dante (Paolo e Francesca, Amor ch'al cor gentil) e Sonetto 1 di Petrarca (Voi ch'ascoltate in rime sparse).",
        keywords: "letteratura italiana dante alighieri petrarca inferno 5 paolo e francesca amor ch al cor gentil galeotto canzoniere voi ch ascoltate rime sparse parafrasi terzina sonetto",
        navPath: "letteratura_italiana/index.html?open=summaries/spec1_dante_petrarca.md"
    },

    // ═══════════════════════════════════════════════════════════════
    // STORIA DELLA FILOSOFIA MODERNA (16 Studi Monografici)
    // ═══════════════════════════════════════════════════════════════
    {
        title: "Il Naturalismo Rinascimentale e l'Alba della Modernità",
        subject: "filosofia",
        chapterTag: "Studio I",
        description: "Bernardino Telesio (natura iuxta propria principia, caldo e freddo), Giordano Bruno (universo infinito, panteismo immanente, eroico furore), Tommaso Campanella (primalità dell'essere, Città del Sole) e magia naturale.",
        keywords: "filosofia rinascimento naturalismo telesio caldo freddo bruno infinito panteismo mens insita omnibus eroico furore campanella posse nosse velle citta del sole magia ermetismo",
        navPath: "filosofia/index.html?open=summaries/cap1_naturalismo.md"
    },
    {
        title: "Alla Scoperta della Misura del Mondo – La Rivoluzione Astronomica",
        subject: "filosofia",
        chapterTag: "Studio II",
        description: "Il crollo del geocentrismo tolemaico-aristotelico. Niccolò Copernico (De revolutionibus, prefazione di Osiander), Tycho Brahe (rottura delle sfere cristalline) e le tre leggi delle orbite ellittiche di Keplero.",
        keywords: "filosofia astronomia rivoluzione scientifica copernico eliocentrismo osiander salvare i fenomeni tycho brahe sfere cristalline comete keplero orbite ellittiche tre leggi",
        navPath: "filosofia/index.html?open=summaries/cap2_misura_mondo.md"
    },
    {
        title: "Francis Bacon e Galileo Galilei – I Fondatori del Metodo Scientifico",
        subject: "filosofia",
        chapterTag: "Studio III",
        description: "Bacon: critica della tradizione, dottrina degli idola (tribus, specus, fori, theatri), metafora delle api, induzione vera e Nuova Atlantide. Galilei: Sidereus Nuncius, caratteri matematici della natura, qualità primarie e secondarie, relatività classica.",
        keywords: "filosofia scienza metodo bacone galileo novum organum sapere potere idoli induzione tavole nuova atlantide sidereus nuncius lettere copernicane dialogo massimi sistemi relativita abiura",
        navPath: "filosofia/index.html?open=summaries/cap3_bacone_galileo.md"
    },
    {
        title: "La Tarda Scolastica Europea e Francisco Suárez",
        subject: "filosofia",
        chapterTag: "Studio IV",
        description: "La Seconda Scolastica iberica di Salamanca e Coimbra. Le Disputationes Metaphysicae (1597) di Suárez: superamento del commentario per il trattato sistematico, ontologia dell'ens inquantum ens e influenza sul razionalismo moderno.",
        keywords: "filosofia scolastica suarez salamanca coimbra disputationes metaphysicae ontologia ens inquantum ens analogia entis metafisica generale speciale wolff cartesio",
        navPath: "filosofia/index.html?open=summaries/cap4_tarda_scolastica.md"
    },
    {
        title: "René Descartes – Il Dubbio, il Cogito e la Fondazione del Razionalismo",
        subject: "filosofia",
        chapterTag: "Studio V",
        description: "Le quattro regole del metodo; dubbio metodico, dubbio iperbolico del Genio Maligno e certezza del Cogito ergo sum; res cogitans, prove di Dio, dualismo con la res extensa, ghiandola pineale, fisica dei vortici e morale provvisoria.",
        keywords: "filosofia razionalismo cartesio descartes metodo evidenza analisi sintesi enumerazione dubbio iperbolico genio maligno cogito ergo sum res cogitans res extensa dio idee innate ghiandola pineale morale provvisoria",
        navPath: "filosofia/index.html?open=summaries/cap5_cartesio.md"
    },
    {
        title: "Baruch Spinoza – Deus Sive Natura e l'Etica More Geometrico",
        subject: "filosofia",
        chapterTag: "Studio VI",
        description: "Il monismo panteista dell'Ethica: Sostanza unica increata (Deus sive Natura, causa sui), Natura naturans e naturata, attributi e modi, parallelismo psico-fisico, conatus, dottrina degli affetti, tre generi di conoscenza e Amor Dei intellectualis.",
        keywords: "filosofia razionalismo spinoza etica geometria deus sive natura sostanza causa sui natura naturans naturata attributi pensiero estensione parallelismo conatus letizia tristezza cupiditas amor dei intellectualis beatitudine trattato teologico politico",
        navPath: "filosofia/index.html?open=summaries/cap6_spinoza.md"
    },
    {
        title: "Gottfried Wilhelm Leibniz – La Monadologia e l'Armonia Prestabilita",
        subject: "filosofia",
        chapterTag: "Studio VII",
        description: "Verità di ragione (non-contraddizione) e di fatto (ragion sufficiente), praedicatum inest subjecto; monadologia: sostanze semplici inestese senza finestre, percezione e appercezione; armonia prestabilita e i due orologi; Teodicea e migliore dei mondi possibili.",
        keywords: "filosofia razionalismo leibniz verita ragione fatto ragion sufficiente praedicatum inest subjecto monade monadologia atomi spirituali appercezione armonia prestabilita orologi teodicea male metafisico fisico morale migliore dei mondi",
        navPath: "filosofia/index.html?open=summaries/cap7_leibniz.md"
    },
    {
        title: "Crisi e Sviluppo del Razionalismo – Pascal, Malebranche e il Giusnaturalismo",
        subject: "filosofia",
        chapterTag: "Studio VIII",
        description: "Blaise Pascal: esprit de géométrie ed esprit de finesse, canna pensante, divertissement e scommessa su Dio. Occasionalismo e Nicolas Malebranche (visione delle idee in Dio). Giusnaturalismo laico: Grozio (etiamsi daremus non esse Deum), Pufendorf, Thomasius.",
        keywords: "filosofia razionalismo pascal esprit geometrie finesse canna pensante divertissement scommessa pari dio occasionalismo malebranche vision en dieu giusnaturalismo grozio pufendorf thomasius diritto naturale laico",
        navPath: "filosofia/index.html?open=summaries/cap8_crisi_razionalismo.md"
    },
    {
        title: "Thomas Hobbes – Materialismo Meccanicista e l'Assolutismo del Leviatano",
        subject: "filosofia",
        chapterTag: "Studio IX",
        description: "Nominalismo e ragione come calcolo additivo/sottrattivo; materialismo corporeo e negazione dell'incorporeo; stato di natura come bellum omnium contra omnes (homo homini lupus); leggi naturali di prudenza e patto di sottomissione al Leviatano assoluto.",
        keywords: "filosofia empirismo politica hobbes materialismo nominalismo calcolo ragione de corpore leviatano leviathan stato natura bellum omnium homo homini lupus leggi natura patto sottomissione sovranita assoluta indivisibile",
        navPath: "filosofia/index.html?open=summaries/cap9_hobbes.md"
    },
    {
        title: "Isaac Newton – I Principia e la Meccanica Razionale",
        subject: "filosofia",
        chapterTag: "Studio X",
        description: "Philosophiae Naturalis Principia Mathematica (1687): le tre leggi della dinamica, gravitazione universale, Regulae philosophandi, rifiuto delle ipotesi arbitrarie (Hypotheses non fingo), spazio e tempo assoluti e Scolio Generale teologico su Dio Pantokrator.",
        keywords: "filosofia scienza newton principia mathematica dinamica inerzia forza azione reazione gravitazione universale hypotheses non fingo regulae philosophandi spazio tempo assoluto scolio generale pantokrator",
        navPath: "filosofia/index.html?open=summaries/cap10_newton.md"
    },
    {
        title: "John Locke – L'Empirismo Gnoseologico e il Liberalismo Politico",
        subject: "filosofia",
        chapterTag: "Studio XI",
        description: "Saggio sull'intelletto umano: confutazione dell'innatismo e mente come tabula rasa; sensazione e riflessione; idee semplici/complesse e critica della sostanza come substratum sconosciuto. Due trattati sul governo: diritti naturali (vita, libertà, proprietà), trust e divisione poteri; tolleranza.",
        keywords: "filosofia empirismo locke saggio intelletto umano critica innatismo tabula rasa esperienza sensazione riflessione idee semplici complesse qualita primarie secondarie sostanza substratum due trattati governo stato natura proprieta liberalismo tolleranza",
        navPath: "filosofia/index.html?open=summaries/cap11_locke.md"
    },
    {
        title: "George Berkeley – L'Immaterialismo e il Principio Esse Est Percipi",
        subject: "filosofia",
        chapterTag: "Studio XII",
        description: "Critica delle idee astratte nell'Introduzione ai Princìpi; immaterialismo ontologico: Esse est percipi (l'essere delle cose consiste nel loro essere percepite); negazione della materia inerte; le idee del cosmo come linguaggio visivo impresso continuamente da Dio.",
        keywords: "filosofia empirismo berkeley immaterialismo esse est percipi esse est percipere critica idee astratte materia inesistente percezione spirito dio linguaggio natura hylas philonous apologetica",
        navPath: "filosofia/index.html?open=summaries/cap12_berkeley.md"
    },
    {
        title: "David Hume – Lo Scetticismo Radicale, la Causalità e le Passioni",
        subject: "filosofia",
        chapterTag: "Studio XIII",
        description: "Impressioni e idee, principio di copia, Forchetta di Hume (relazioni tra idee vs materie di fatto); demolizione del nesso causale a priori: abitudine (custom) e credenza (belief); teoria del fascio dell'Io; scetticismo moderato; Legge di Hume e morale della simpatia.",
        keywords: "filosofia empirismo scetticismo hume impressioni idee principio copia forchetta hume relazioni idee materie fatto critica causalita abitudine credenza critica sostanza io fascio passioni simpatia legge hume",
        navPath: "filosofia/index.html?open=summaries/cap13_hume.md"
    },
    {
        title: "Nello Spazio dell'Illuminismo – Modelli Inglese, Francese e Tedesco",
        subject: "filosofia",
        chapterTag: "Studio XIV",
        description: "Il Secolo dei Lumi (Sapere aude). Deismo inglese (Toland, Tindal). Philosophes francesi: Voltaire (tolleranza), Montesquieu (separazione dei poteri nello Spirito delle leggi), Encyclopédie di Diderot e d'Alembert, sensismo della statua di Condillac, materialismo. Aufklärung: Wolff, Baumgarten (nascita dell'Estetica) e Lessing.",
        keywords: "filosofia illuminismo lumi sapere aude deismo voltaire tolleranza candido montesquieu spirito leggi separazione poteri encyclopedie diderot dalembert condillac sensismo statua la mettrie uomo macchina wolff baumgarten estetica lessing tre anelli",
        navPath: "filosofia/index.html?open=summaries/cap14_illuminismo.md"
    },
    {
        title: "Due Casi Atipici – Giambattista Vico e Jean-Jacques Rousseau",
        subject: "filosofia",
        chapterTag: "Studio XV",
        description: "Vico: critica a Cartesio, principio del verum-factum, Scienza Nuova, tre età dell'umanità (dèi, eroi, uomini), corsi e ricorsi storici e Provvidenza. Rousseau: critica della civiltà nei due Discorsi, il buon selvaggio, disuguaglianza e proprietà privata, Contratto Sociale (alienazione totale e Volontà Generale), l'Émile.",
        keywords: "filosofia vico rousseau scienza nuova verum factum boria dotti nazioni tre eta dei eroi uomini corsi ricorsi provvidenza discorsi scienze arti disuguaglianza stato natura proprieta privata contratto sociale volonta generale emile pedagogia vicario savoiardo",
        navPath: "filosofia/index.html?open=summaries/cap15_vico_rousseau.md"
    },
    {
        title: "Immanuel Kant – La Filosofia Critica e i Tre Giudizi",
        subject: "filosofia",
        chapterTag: "Studio XVI",
        description: "La svolta criticista e la rivoluzione copernicana; giudizi sintetici a priori; Critica della ragion pura: estetica trascendentale (spazio e tempo), analitica (categorie, deduzione trascendentale, Io Penso), dialettica (paralogismi, antinomie, confutazione prove di Dio), fenomeno e noumeno; Critica della ragion pratica: imperativo categorico e postulati; Critica del Giudizio: estetico (bello e sublime) e teleologico.",
        keywords: "filosofia criticismo kant rivoluzione copernicana giudizi sintetici a priori critica ragion pura estetica trascendentale spazio tempo analitica categorie io penso deduzione fenomeno noumeno dialettica anima mondo dio antinomie critica ragion pratica imperativo categorico rispetto postulati critica giudizio estetico bello sublime teleologico",
        navPath: "filosofia/index.html?open=summaries/cap16_kant.md"
    },
];

// Global export
window.searchDatabase = searchDatabase;
