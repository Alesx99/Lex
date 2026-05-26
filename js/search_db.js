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
    }
];

// Global export
window.searchDatabase = searchDatabase;
