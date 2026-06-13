import os

# Database of detailed academic summaries for the remaining artists
enriched_data = {
    "gentile-da-fabriano": {
        "name": "Gentile da Fabriano",
        "period": "Gotico Internazionale",
        "years": "1370 – 1427",
        "desc": "Capostipite del tardogotico italiano, incarnò l'ideale cortese fondendo il realismo minuto dei dettagli naturalistici con una sontuosità decorativa che faceva largo uso dell'oro zecchino, punzonato e lavorato a rilievo.",
        "points": [
            "**Sinfonia Lineare**: Le figure sono descritte da curve eleganti e ritmiche, prive di un reale peso plastico ma dotate di grazia aristocratica.",
            "**Naturalismo Analitico**: Disegna piante, animali, tessuti e dettagli fisionomici con l'accuratezza di un miniaturista francese.",
            "**Uso dell'Oro come Luce**: L'oro non è uno sfondo piatto medievale, ma reagisce alla luce reale grazie a complesse punzonature."
        ],
        "works": {
            "Adorazione dei Magi": "Pala d'altare del 1423 in cui il corteo dei Magi è descritto come una sfilata cortese di cavalieri esotici, cani, falconi e ghepardi. La luce divina della stella guida è resa con inserti metallici dorati che brillano tridimensionalmente.",
            "Polittico Quaratesi": "Opera della maturità che mostra un'inedita apertura verso la volumetria toscana, mantenendo intatta la preziosità cromatica e la dolcezza dei volti."
        }
    },
    "pisanello": {
        "name": "Pisanello (Antonio Pisano)",
        "period": "Gotico Internazionale",
        "years": "1395 – 1455",
        "desc": "Pittore e il più grande medaglista del Rinascimento, noto per i suoi disegni naturalistici di straordinaria precisione anatomica e per le atmosfere fiabesche e cavalleresche.",
        "points": [
            "**Osservazione del Vero**: I suoi taccuini (Codice Vallardi) testimoniano uno studio dal vero di animali, impiccati e costumi con rigore quasi scientifico.",
            "**Spazio Tardogotico**: Rifiuta la prospettiva lineare a favore di uno spazio cumulativo, dove le figure sono sovrapposte in altezza per dare il senso della profondità.",
            "**La Medaglistica**: Rianimò l'antica arte della medaglia ritrattistica in bronzo fuso, fondando la ritrattistica celebrativa moderna."
        ],
        "works": {
            "San Giorgio e la principessa": "Affresco in Sant'Anastasia a Verona. San Giorgio è colto nel momento di montare a cavallo in un'atmosfera sospesa e malinconica, circondato da una città fantastica e da macabri impiccati sullo sfondo.",
            "Visione di san Eustachio": "Dipinto tavoletta in cui il santo cacciatore incontra un cervo con il crocifisso tra le corna, immerso in una foresta buia popolata da una miriade di animali ritratti con precisione miniaturistica."
        }
    },
    "lorenzo-monaco": {
        "name": "Lorenzo Monaco",
        "period": "Gotico Internazionale",
        "years": "1370 – 1424",
        "desc": "Monaco camaldolese, fu il principale pittore fiorentino di inizio Quattrocento prima dell'avvento del Rinascimento. Seppe fondere la spiritualità ascetica con le curve flessuose del tardogotico.",
        "points": [
            "**Spiritualità Anticlassica**: Le figure sono allungate e fluttuanti, prive di gravità terrena per accentuare il misticismo religioso.",
            "**Accordi Cromatici Acidi**: Uso di colori insoliti e cangianti (rosa, arancio, azzurro) stesi in campiture lucide.",
            "**Linearismo Gotico**: Il disegno predilige curve ampie che avvolgono le figure in panneggi fluttuanti."
        ],
        "works": {
            "Incoronazione della Vergine": "Grande polittico per la chiesa di Santa Maria degli Angeli. I santi fluttuano su un pavimento azzurro che simboleggia il cielo stellato, avvolti in panneggi sinuosi ed elegantissimi.",
            "Adorazione dei Magi": "Tavola caratterizzata da montagne rocciose fantastiche a forma di fiamme e re magi vestiti con abiti dai colori esotici e panneggiati."
        }
    },
    "michelino-da-besozzo": {
        "name": "Michelino da Besozzo",
        "period": "Gotico Internazionale",
        "years": "1370 – 1455",
        "desc": "Massimo maestro del Gotico Internazionale in Lombardia, lodato dai contemporanei come il più grande disegnatore del suo tempo, celebre per la freschezza naturalistica delle sue opere.",
        "points": [
            "**Morbidezza del Disegno**: Sostituisce la linea tagliente con sfumature morbide che danno delicatezza ai volti.",
            "**Dettaglio Naturalistico**: Noto per l'inclusione di uccelli, fiori e piccoli animali resi con incredibile freschezza.",
            "**Miniatura di Prestigio**: Produttore di codici miniati per la corte viscontea ad altissimo livello di dettaglio decorativo."
        ],
        "works": {
            "Sposalizio mistico di santa Caterina": "Tavoletta in cui i personaggi sono caratterizzati da volti tondi e dolcissimi, vestiti con manti dai bordi dorati arricciati, immersi in un giardino fiorito simbolico.",
            "Offesiolo di Gian Galeazzo Visconti": "Codice miniato capolavoro del minio lombardo, ricco di trame vegetali e animali di incredibile verità."
        }
    },
    "giovanni-da-modena": {
        "name": "Giovanni da Modena",
        "period": "Gotico Internazionale",
        "years": "1379 – 1455",
        "desc": "Pittore emiliano caratterizzato da uno stile espressivo, popolaresco e drammatico, distante dalle raffinatezze aristocratiche cortesi dei contemporanei.",
        "points": [
            "**Espressionismo Popolare**: I volti mostrano smorfie di dolore, terrore o rabbia, accentuando il carattere comunicativo dell'arte.",
            "**Drammaticità Narrativa**: Scene concitate e dinamiche con una forte carica emotiva.",
            "**Fantasia Grottesca**: Rappresentazione dettagliata e fantasiosa di demoni e tormenti infernali."
        ],
        "works": {
            "Affreschi della Cappella Bolognini in San Petronio": "Ciclo che illustra il Paradiso e l'Inferno. L'Inferno è dominato da una gigantesca figura di Lucifero che divora i peccatori, dipinta con un realismo grottesco e spaventoso."
        }
    },
    "lorenzo-ghiberti": {
        "name": "Lorenzo Ghiberti",
        "period": "Primo Rinascimento",
        "years": "1378 – 1455",
        "desc": "Scultore e orafo fiorentino, vinse il celebre concorso del 1401 per la porta del Battistero. Rappresenta la cerniera tra l'eleganza gotica e la nuova spazialità rinascimentale.",
        "points": [
            "**Fusione degli Stili**: Unisce il linearismo gotico alla nuova prospettiva scientifica e all'anatomia classica.",
            "**Maestria dell'Oreficeria**: Dettagli cesellati con precisione millimetrica nella fusione in bronzo dorato.",
            "**Prospettiva Graduata**: Nei rilievi schiaccia gradualmente lo spessore delle figure man mano che si allontanano nello sfondo."
        ],
        "works": {
            "Porta del Paradiso": "Capolavoro in bronzo dorato per il Battistero di Firenze. Nei 10 riquadri con storie dell'Antico Testamento applica una rigorosa prospettiva brunelleschiana fondendola con una grazia classica.",
            "Sacrificio di Isacco": "Formella bronzea con cui vinse il concorso del 1401, caratterizzata da un nudo classico di Isacco e da un andamento sinuoso delle figure."
        }
    },
    "jacopo-della-quercia": {
        "name": "Jacopo della Quercia",
        "period": "Primo Rinascimento",
        "years": "1374 – 1438",
        "desc": "Scultore senese, elaborò uno stile originale caratterizzato da una potente forza plastica ed espressiva che influenzò direttamente Michelangelo Buonarroti.",
        "points": [
            "**Energia Plastica**: Figure vigorose e piene di forza fisica, modellate con panneggi pesanti che accentuano il movimento.",
            "**Sintesi Espressiva**: Concentrazione sul volto e sul gesto drammatico, tralasciando il dettaglio minuto.",
            "**Ponte verso il Futuro**: La sua scultura supera il gotico non tramite regole prospettiche rigide, ma per pura volumetria fisica."
        ],
        "works": {
            "Monumento funebre a Ilaria del Carretto": "Sarcofago in marmo nella cattedrale di Lucca. La figura addormentata di Ilaria unisce la dolcezza del ritratto alla grazia dei panneggi gotici, sorretta da putti classici reggifestone.",
            "Portale di San Petronio a Bologna": "Rilievi in pietra d'Istria con storie della Genesi, caratterizzati da figure nude e muscolose cariche di una tensione drammatica primordiale."
        }
    },
    "michelozzo": {
        "name": "Michelozzo",
        "period": "Primo Rinascimento",
        "years": "1396 – 1472",
        "desc": "Architetto e scultore fiorentino, fu il collaboratore prediletto di Donatello e l'architetto di fiducia di Cosimo il Vecchio de' Medici, definendo lo standard del palazzo rinascimentale.",
        "points": [
            "**Classicismo Moderato**: Rielabora i modelli classici di Brunelleschi in formule più sobrie ed eleganti, adatte alla committenza borghese.",
            "**Il Palazzo Mediceo**: Crea il prototipo del palazzo signorile fiorentino, con facciata a bugnato digradante e cortile interno.",
            "**Collaborazione con Donatello**: Lavora come scultore e bronzista in sodalizio, curando le strutture architettoniche dei monumenti."
        ],
        "works": {
            "Palazzo Medici Riccardi": "Costruito a Firenze dal 1444. Presenta tre piani digradanti (bugnato rustico al piano terra, liscio al primo, specchiato al secondo) coronati da un imponente cornicione classico.",
            "Biblioteca del Convento di San Marco": "Spazio basilicale a tre navate divise da colonne ioniche chiare, modello di razionalità e armonia per lo studio umanistico."
        }
    },
    "beato-angelico": {
        "name": "Beato Angelico",
        "period": "Primo Rinascimento",
        "years": "1395 – 1455",
        "desc": "Frate domenicano e pittore, seppe unire la rigorosa prospettiva brunelleschiana e il volume plastico di Masaccio a una sensibilità cromatica purissima e a un misticismo profondo.",
        "points": [
            "**Luce Mistica**: Utilizza una luce zenitale limpida e chiara che purifica le forme e accende i colori pastello delle vesti.",
            "**Prospettiva Sacra**: Lo spazio geometrico serve a ordinare e rendere razionale il mistero divino.",
            "**Espressione di Devozione**: I volti dei santi e degli angeli esprimono una profonda meditazione interiore ed umiltà."
        ],
        "works": {
            "Annunciazione di San Marco": "Affresco posto in cima alle scale del convento. La prospettiva del portico rinascimentale accoglie la Vergine e l'Angelo in un silenzio contemplativo, privo di decorazioni superflue per favorire la preghiera dei frati.",
            "Pala di San Marco": "Sacra conversazione pioneristica in cui i santi sono disposti in uno spazio prospettico unificato all'aperto, davanti a un bosco di cipressi."
        }
    },
    "luca-della-robbia": {
        "name": "Luca della Robbia",
        "period": "Primo Rinascimento",
        "years": "1400 – 1482",
        "desc": "Scultore e ceramista fiorentino, inventò la tecnica della terracotta invetriata (ceramica smaltata protetta da ossidi metallici) garantendo brillantezza cromatica ed impermeabilità.",
        "points": [
            "**Invenzione dell'Invetriatura**: Applica smalti lucidi (bianco per le figure, azzurro per gli sfondi) su rilievi in argilla cotta.",
            "**Classicismo Sereno**: Sculture caratterizzate da un'armonia dolce, volti idealizzati ma umani e composizioni equilibrate.",
            "**Resistenza e Colore**: Permetteva di collocare sculture colorate all'esterno degli edifici, resistendo alle intemperie."
        ],
        "works": {
            "Cantoria del Duomo di Firenze": "Rilievo marmoreo con fanciulli danzanti e cantanti, caratterizzato da un'estrema freschezza vitale e compostezza classica.",
            "Madonne in terracotta invetriata": "Rilievi devozionali policromi in cui il bianco puro delle figure si staglia contro fondali azzurro cobalto, incorniciati da ghirlande di frutta."
        }
    },
    "andrea-della-robbia": {
        "name": "Andrea della Robbia",
        "period": "Primo Rinascimento",
        "years": "1435 – 1525",
        "desc": "Nipote di Luca, ereditò la bottega di famiglia portando la terracotta invetriata ad una diffusione capillare in tutta la Toscana, arricchendo lo stile di sfumature sentimentali.",
        "points": [
            "**Espansione Produttiva**: Organizzazione della bottega per produrre opere seriali ad alta qualità.",
            "**Espressività Sentimentale**: Volti più dolci, patetici e ricchi di sfumature emotive rispetto al rigore di Luca.",
            "**Policromia Dettagliata**: Introduce nuovi colori negli smalti per rendere realistici frutti, foglie e incarnati."
        ],
        "works": {
            "I Putti dello Spedale degli Innocenti": "Tondi ceramici azzurri inseriti nei pennacchi del portico di Brunelleschi. Raffigurano neonati in fasce, ciascuno con una posa e un'espressione unica, simbolo dell'accoglienza dell'orfanotrofio."
        }
    },
    "giovanni-della-robbia": {
        "name": "Giovanni della Robbia",
        "period": "Primo Rinascimento",
        "years": "1469 – 1529",
        "desc": "Figlio di Andrea, portò la terracotta invetriata verso la fase tardiva, caratterizzata da un uso esuberante e spettacolare del colore e da composizioni complesse.",
        "works": [
            "Lavabo di Santa Maria Novella: Grande manufatto inserito nella sagrestia, con un paesaggio dipinto a smalto incorniciato da colonne e festoni ceramici."
        ],
        "points": [
            "**Esuberanza Cromatica**: Uso saturo di smalti gialli, verdi, viola e rossi.",
            "**Composizioni Scenografiche**: Rilievi complessi e affollati di personaggi."
        ]
    },
    "paolo-uccello": {
        "name": "Paolo Uccello",
        "period": "Secondo Quattrocento",
        "years": "1397 – 1475",
        "desc": "Pittore fiorentino celebre per la sua dedizione totale e quasi ossessiva alle leggi della prospettiva lineare, che applicò con esiti astratti e fantastici.",
        "points": [
            "**Prospettiva Astratta**: Usa la griglia geometrica non per rendere reale lo spazio, ma per creare visioni geometriche surreali e solide.",
            "**Colorismo Fantastico**: Rifiuta il colore naturalistico a favore di tonalità sature e irreali (cavalli rossi, blu o verdi).",
            "**Scorci Complessi**: Disegna solidi geometrici complessi (come il mazzocchio) scorciati da ogni angolazione."
        ],
        "works": {
            "Battaglia di San Romano": "Trittico (diviso tra Firenze, Parigi e Londra) che rappresenta la vittoria fiorentina sui senesi. I guerrieri, le lance spezzate a terra e i cavalli sembrano manichini di un teatro geometrico bloccati nello spazio.",
            "Monumento a Giovanni Acuto": "Fresco monocromo in Santa Maria del Fiore che simula una statua equestre bronzea, dipinto con un doppio punto di vista prospettico."
        }
    },
    "andrea-del-verrocchio": {
        "name": "Andrea del Verrocchio",
        "period": "Secondo Quattrocento",
        "years": "1435 – 1488",
        "desc": "Scultore e pittore fiorentino prediletto dai Medici, diresse la bottega più importante di Firenze nella quale si formarono Leonardo da Vinci, il Perugino e Lorenzo di Credi.",
        "points": [
            "**Dinamismo Scultoreo**: Introduce una forte tensione muscolare e linee di forza aperte che invitano a osservare la scultura da più lati.",
            "**Verità Psicologica**: Studio attento delle espressioni facciali e del movimento naturale dei capelli e delle vesti.",
            "**Fusione del Bronzo**: Maestro assoluto nella complessa tecnica della fusione a cera persa di grandi dimensioni."
        ],
        "works": {
            "Monumento equestre a Bartolomeo Colleoni": "Statua bronzea eretta a Venezia. Il condottiero è ritratto con un'espressione fiera e corrucciata, inarcato sulla sella mentre il cavallo avanza al trotto, trasmettendo un senso di forza indomita.",
            "Battesimo di Cristo": "Dipinto in cui il giovane allievo Leonardo da Vinci dipinse l'angelo a sinistra e il paesaggio sfumato, superando lo stile grafico del maestro."
        }
    },
    "pietro-perugino": {
        "name": "Pietro Perugino",
        "period": "Secondo Quattrocento",
        "years": "1448 – 1523",
        "desc": "Maestro della scuola umbra, elaborò uno stile di straordinaria armonia e dolcezza caratterizzato da simmetria prospettica e paesaggi infiniti.",
        "points": [
            "**Armonia Simmetrica**: Composizioni ordinate con figure aggraziate disposte specularmente intorno ad un asse centrale.",
            "**La Luce dell'Umbria**: Paesaggi collinari con alberi filiformi sfumati in lontananza sotto cieli chiarissimi.",
            "**Dolcezza Espressiva**: Volti ovali inclinati con espressioni sognanti e malinconiche."
        ],
        "works": {
            "Consegna delle chiavi": "Affresco nella Cappella Sistina (1481-1482). La scena si svolge in una vastissima piazza prospettica pavimentata a scacchiera, dominata sullo sfondo da un tempio ottagonale e da due archi di trionfo classici.",
            "Sposalizio della Vergine": "Tavola caratterizzata dalla perfetta simmetria prospettica del tempio sullo sfondo, modello ripreso da Raffaello."
        }
    },
    "cosme-tura": {
        "name": "Cosmè Tura",
        "period": "Secondo Quattrocento",
        "years": "1430 – 1495",
        "desc": "Capostipite della scuola ferrarese (Officina Ferrarese), creò uno stile di fortissima originalità caratterizzato da figure tese, spigolose e metalliche.",
        "points": [
            "**Linearismo Tagliente**: Linee dure che scolpiscono contorni tormentati e muscolature contratte.",
            "**Materia Minerale**: I corpi, i panneggi e le rocce sembrano scolpiti nel bronzo, nel ferro o nel marmo lucido.",
            "**Colorismo Espressionista**: Uso di tinte acide e contrastanti stese con campiture smaltate."
        ],
        "works": {
            "San Giorgio e la principessa": "Ante dell'organo del Duomo di Ferrara. San Giorgio sul cavallo impennato colpisce il drago con una tensione muscolare estrema, mentre la principessa fugge terrorizzata con un panneggio tormentato dal vento.",
            "Polittico Roverella": "Grande pala d'altare monumentale arricchita da decorazioni plastiche fantastiche e volti scavati e sofferenti."
        }
    },
    "francesco-del-cossa": {
        "name": "Francesco del Cossa",
        "period": "Secondo Quattrocento",
        "years": "1436 – 1478",
        "desc": "Pittore ferrarese, temperò l'asprezza metallica di Cosmè Tura con un solido senso dello spazio monumentale derivato da Piero della Francesca.",
        "points": [
            "**Sintesi Spaziale**: Figure solide inserite in architetture prospettiche chiare e luminose.",
            "**Naturalismo Quotidiano**: Grande attenzione ai dettagli realistici e alle attività umane quotidiane.",
            "**Disegno Vigoro**: Mantiene la forza plastica ferrarese ma con passaggi cromatici più morbidi."
        ],
        "works": {
            "Mesi di Marzo e Aprile (Palazzo Schifanoia)": "Affreschi del Salone dei Mesi a Ferrara. Cossa descrive la vita di corte di Borso d'Este e i lavori agricoli in scene piene di luce e dettagli realistici."
        }
    },
    "ercole-de-roberti": {
        "name": "Ercole de' Roberti",
        "period": "Secondo Quattrocento",
        "years": "1451 – 1496",
        "desc": "Terzo grande maestro della scuola di Ferrara, si distingue per uno stile dinamico, drammatico e carico di pathos espressivo.",
        "points": [
            "**Pathos ed Espressione**: Volti contratti dal dolore e gesti drammatici di straordinaria intensità emotiva.",
            "**Dinamismo Lineare**: Figure slanciate catturate in movimenti rapidi e nervosi.",
            "**Campiture Smaltate**: Uso di colori splendidi e lucidi tipici della tradizione ferrarese."
        ],
        "works": {
            "Storie di san Vincenzo Ferrer": "Predella caratterizzata da scene concitate ambientate in scenografie classiche fantastiche rovinose.",
            "Pala Portuense": "Sacra conversazione monumentale caratterizzata da un alto trono ottagonale decorato da bassorilievi e aperto su vedute marine esterne."
        }
    },
    "domenico-ghirlandaio": {
        "name": "Domenico Ghirlandaio",
        "period": "Secondo Quattrocento",
        "years": "1449 – 1494",
        "desc": "Grande maestro del disegno e dell'affresco a Firenze, fu il cronista pittorico della ricca borghesia mercantile dell'età di Lorenzo il Magnifico.",
        "points": [
            "**Cronaca Visiva**: Inserisce i ritratti realistici dei committenti (Medici, Tornabuoni, Sassetti) all'interno degli episodi sacri.",
            "**Chiarezza Disegnativa**: Disegno pulito, colori brillanti e prospettive architettoniche fiorentine precise.",
            "**Bottega Didattica**: Uno dei laboratori più efficienti di Firenze, in cui mosse i primi passi il giovanissimo Michelangelo."
        ],
        "works": {
            "Affreschi della Cappella Sassetti (Santa Trinita)": "Storie di San Francesco ambientate nella stessa Firenze contemporanea (piazza della Signoria), con ritratti di Lorenzo il Magnifico e dei Sassetti.",
            "Affreschi di Santa Maria Novella": "Ciclo con storie di Maria e del Battista, capolavoro di narrazione borghese rinascimentale."
        }
    },
    "filippino-lippi": {
        "name": "Filippino Lippi",
        "period": "Secondo Quattrocento",
        "years": "1457 – 1504",
        "desc": "Figlio di Filippo Lippi e allievo di Botticelli, evolse lo stile quattrocentesco verso una sensibilità inquieta, ricca di dettagli archeologici fantastici che anticipa il Manierismo.",
        "points": [
            "**Inquietudine Lineare**: Panneggi tormentati e linee spezzate che tolgono armonia classica alle scene.",
            "**Archeologia Fantastica**: Architetture romane riprodotte con accumuli decorativi bizzarri e misteriosi.",
            "**Chiaroscuro Espressivo**: Uso di ombre profonde per aumentare il mistero."
        ],
        "works": {
            "Affreschi della Cappella Carafa (Roma)": "Storie di San Tommaso d'Aquino, caratterizzate da una spazialità dinamica e da un trionfo di decorazioni grottesche e classiche all'antica.",
            "Pala degli Otto": "Sacra conversazione con una luce radente e sguardi malinconici."
        }
    },
    "piero-di-cosimo": {
        "name": "Piero di Cosimo",
        "period": "Secondo Quattrocento",
        "years": "1462 – 1522",
        "desc": "Pittore fiorentino eccentrico e solitario, celebre per i suoi dipinti mitologici fantastici popolati da centauri, satiri e mostri dipinti con acuto naturalismo.",
        "points": [
            "**Fantasia Libera**: Creazione di miti primitivi e fantastici lontani dal classicismo mediceo.",
            "**Naturalismo Bizzarro**: Dettagli di piante, frutti e animali dipinti con precisione e bizzarria.",
            "**Luce Morbida**: Risente dello sfumato di Leonardo da Vinci nelle atmosfere paesaggistiche."
        ],
        "works": {
            "Liberazione di Andromeda": "Tavola ricca di personaggi grotteschi, dominata al centro da un mostro marino fantastico dipinto con squame e dettagli dettagliatissimi.",
            "Morte di Procri": "Paesaggio malinconico in cui un satiro piange sul corpo della ninfa uccisa, circondato da cani fedeli."
        }
    },
    "pinturicchio": {
        "name": "Pinturicchio",
        "period": "Secondo Quattrocento",
        "years": "1454 – 1513",
        "desc": "Pittore umbro, si distinse per una pittura decorativa fastosa, ricca di ori, stucchi a rilievo e colori vivaci adatta a celebrare la committenza papale.",
        "points": [
            "**Fasto Decorativo**: Inserisce stucchi dorati a rilievo sulla superficie dipinta per catturare la luce.",
            "**Narrativa Chiara**: Scene affollate ma ben leggibili, ricche di dettagli aneddotici.",
            "**Paesaggio Umbro**: Sfondi collinari infiniti derivati dall'influenza del Perugino."
        ],
        "works": {
            "Libreria Piccolomini nel Duomo di Siena": "Ciclo di affreschi che illustra la vita di papa Pio II, caratterizzato da colori incredibilmente brillanti, costumi sontuosi e prospettiche campate dipinte.",
            "Appartamento Borgia in Vaticano": "Decorazione delle sale papali ricca di allegorie e simboli egizi dorati."
        }
    },
    "luca-signorelli": {
        "name": "Luca Signorelli",
        "period": "Secondo Quattrocento",
        "years": "1445 – 1523",
        "desc": "Allievo di Piero della Francesca, si distaccò dall'immobilità geometrica del maestro per studiare l'energia espressiva del nudo umano maschile in movimento estremo.",
        "points": [
            "**Dinamismo Anatomico**: Corpi muscolosi catturati in pose contorte, scorciate e dinamiche.",
            "**Tensione Drammatica**: Uso del nudo per esprimere la tragedia e il giudizio divino.",
            "**Chiaroscuro Inciso**: Ombre dure che definiscono le masse muscolari."
        ],
        "works": {
            "Affreschi della Cappella di San Brizio (Duomo di Orvieto)": "Il Giudizio Universale (1499-1504). Scene spettacolari e terrificanti come *La resurrezione della carne* e *I dannati all'Inferno*, popolate da una miriade di corpi nudi intrecciati e demoni colorati."
        }
    },
    "melozzo-da-forli": {
        "name": "Melozzo da Forlì",
        "period": "Secondo Quattrocento",
        "years": "1438 – 1494",
        "desc": "Pittore e architetto, fu uno dei massimi maestri di prospettiva della penisola, celebre per aver codificato lo scorcio 'da sott'in su' per le figure celesti dipinte sulle volte.",
        "points": [
            "**Scorcio Verticale**: Dipinge figure umane viste dal basso verso l'alto con perfetta proporzione anatomica.",
            "**Solennità Spaziale**: Architetture monumentali classiche scorciate con precisione scientifica.",
            "**Luce Purificatrice**: Risente della luce chiara di Piero della Francesca."
        ],
        "works": {
            "Sisto IV nomina il Platina prefetto della biblioteca": "Affresco staccato in cui la scena si svolge sotto una grandiosa loggia rinascimentale scorciata in prospettiva, con ritratti solenni e geometrici dei nipoti del Papa.",
            "Angeli musicanti": "Frammenti di affresco della volta dei Santi Apostoli a Roma, con angeli monumentali scorciati dal basso carichi di grazia."
        }
    },
    "leonardo-da-vinci": {
        "name": "Leonardo da Vinci",
        "period": "Rinascimento Maturo",
        "years": "1452 – 1519",
        "desc": "Genio universale incarnante l'uomo del Rinascimento. Scienziato e pittore, basò la sua arte sulla comprensione dei fenomeni naturali e sull'espressione ottica e psicologica della realtà.",
        "points": [
            "**Lo Sfumato**: Tecnica pittorica che elimina i contorni netti delle figure sfumandole dolcemente nell'ombra, imitando la reale percezione visiva dell'occhio umano.",
            "**La Prospettiva Aerea**: Resa della profondità atmosferica dipingendo le montagne lontane più chiare, sfocate e tendenti all'azzurro a causa dell'umidità dell'aria.",
            "**I Moti dell'Animo**: Rappresentazione visiva delle reazioni psicologiche e dei sentimenti dei personaggi attraverso i gesti, le posture e le espressioni del volto."
        ],
        "works": {
            "La Vergine delle Rocce": "Dipinto caratterizzato da una complessa disposizione piramidale dei personaggi inseriti in una grotta umida e ombrosa, capolavoro di sfumato e luce filtrata.",
            "Il Cenacolo": "Affresco nel refettorio di Santa Maria delle Grazie a Milano. Nel momento in cui Cristo annuncia il tradimento, Leonardo descrive le reazioni emotive degli apostoli raggruppati a tre a tre, in una dinamica drammatica guidata dalla prospettiva centrica.",
            "La Gioconda": "Celebre ritratto di Monna Lisa, con il misterioso sorriso sfumato e un paesaggio primordiale sullo sfondo fuso tramite prospettiva aerea."
        }
    },
    "raffaello-sanzio": {
        "name": "Raffaello Sanzio",
        "period": "Rinascimento Maturo",
        "years": "1483 – 1520",
        "desc": "Maestro supremo di grazia, armonia e sintesi classica. Seppe assimilare le scoperte di Leonardo (lo sfumato) e Michelangelo (il dinamismo anatomico) fondendole in un linguaggio solare e perfetto.",
        "points": [
            "**Grazia e Armonia**: Composizioni equilibrate, prive di tensioni drammatiche eccessive, basate su geometrie circolari e piramidali dolci.",
            "**Sintesi Classica**: Rappresentazione del bello ideale umano, dove la perfezione formale si unisce alla spontaneità naturale.",
            "**Spazialità Architettonica**: Integrazione perfetta delle figure umane in maestose architetture di respiro classico."
        ],
        "works": {
            "Lo Sposalizio della Vergine": "Tavola del 1504. Raffaello riprende il modello del Perugino ma unifica la scena stringendo il cerchio dei personaggi e inserendo un tempio a pianta centrale perfettamente scorciato e curvo sullo sfondo.",
            "La Scuola di Atene": "Affresco nelle Stanze Vaticane. I grandi filosofi dell'antichità (con i volti dei contemporanei, tra cui Leonardo, Michelangelo e se stesso) sono disposti sotto una grandiosa basilica voltata a botte ispirata ai progetti di Bramante per San Pietro."
        }
    },
    "michelangelo-buonarroti": {
        "name": "Michelangelo Buonarroti",
        "period": "Rinascimento Maturo",
        "years": "1475 – 1564",
        "desc": "Gigante della scultura, pittura e architettura. Considerò lo studio del nudo umano maschile l'unico vero mezzo per esprimere la grandezza di Dio e la tragedia dell'esistenza umana.",
        "points": [
            "**Titanismo e Terribilità**: Figure monumentali, dotate di muscolature possenti e contratte cariche di energia trattenuta ed espressioni intense.",
            "**Via di Levare**: La scultura intesa come liberazione della figura racchiusa all'interno del blocco di marmo, lasciando talvolta parti incompiute (non-finito).",
            "**Disegno Plastico**: In pittura usa una linea di contorno netta e colori cangianti per far apparire i dipinti come sculture a tutto tondo."
        ],
        "works": {
            "Il David": "Monumento civile eretto a Firenze nel 1504. David è colto prima della battaglia, con i muscoli tesi, lo sguardo corrucciato e la concentrazione psicologica dell'eroe umanista che affronta il caos.",
            "Volta della Cappella Sistina": "Gigantesco ciclo di affreschi (1508-1512) incentrato sulla Genesi, popolato da Ignudi monumentali e scene di eccezionale forza plastica (Creazione di Adamo).",
            "Il Giudizio Universale": "Affresco sulla parete dell'altare della Sistina (1536-1541), caratterizzato da uno spazio vorticoso privo di prospettiva geometrica, dove una folla di corpi nudi ed angeli sorge e cade intorno al gesto terribile del Cristo Giudice."
        }
    },
    "lorenzo-lotto": {
        "name": "Lorenzo Lotto",
        "period": "Rinascimento Veneto",
        "years": "1480 – 1556",
        "desc": "Pittore veneziano originale e anticonformista, operò fuori dalla laguna esprimendo un'acuta sensibilità psicologica e toni inquieti.",
        "points": [
            "**Introspezione Psicologica**: Ritratti carichi di tensione emotiva, sguardi malinconici o inquieti e gesti complessi.",
            "**Luce Tagliente**: Rifiuta il tonalismo morbido veneziano a favore di luci fredde e ombre nette.",
            "**Colori Acidi**: Uso di accostamenti cromatici freddi e vivaci in contrasto."
        ],
        "works": {
            "Pala di San Bernardino": "Sacra conversazione in cui la Vergine è in trono all'aperto sotto un tendone verde mosso dal vento, circondata da santi espressivi e da un angelo in primo piano che scrive in una posa scorciata.",
            "Ritratto di giovane con lucerna": "Volto pallido e intensamente espressivo di tre quarti, con una lucerna accesa nello sfondo scuro simbolo della fugacità della vita."
        }
    },
    "correggio": {
        "name": "Correggio",
        "period": "Rinascimento Veneto",
        "years": "1489 – 1534",
        "desc": "Fautore di uno stile morbido, sensuale e luminoso, anticipò il Barocco con le sue cupole illusionistiche dipinte a cielo aperto.",
        "points": [
            "**Illusionismo Spaziale**: Sfondamento prospettico delle volte dipinte a cielo aperto con figure che volano nello spazio.",
            "**Sensualità e Morbidezza**: Incarnati caldi, panneggi fluidi e sguardi di dolce grazia.",
            "**Luce Atmosferica**: Luce sfumata che avvolge le figure in nubi e bagliori dorati."
        ],
        "works": {
            "Cupola del Duomo di Parma": "Affresco dell'Assunzione della Vergine (1526-1530). Bramante e Correggio eliminano la divisione geometrica della volta per dipingere un vortice infinito di nubi e angeli che salgono verso il cielo aperto.",
            "Leda col cigno": "Dipinto mitologico capolavoro di grazia sensuale e morbidezza pittorica immersa in una natura ombrosa."
        }
    },
    "andrea-palladio": {
        "name": "Andrea Palladio",
        "period": "Rinascimento Veneto",
        "years": "1508 – 1580",
        "desc": "Architetto vicentino di impatto mondiale, codificò il classicismo rinascimentale nei Quattro libri dell'architettura e nelle celebri ville venete.",
        "points": [
            "**Simmetria Proporzionale**: Progetti basati su proporzioni matematiche musicali e geometriche simmetriche.",
            "**Il Tempio Classico applicato alla Villa**: Introduce per la prima volta l'uso del pronao classico (timpanato con colonne) nelle residenze di campagna.",
            "**Integrazione Paesaggistica**: Le ville sono progettate in armonia con l'ambiente agricolo veneto circostante."
        ],
        "works": {
            "Villa Almerico Capra detta La Rotonda": "Residenza vicino Vicenza a pianta perfettamente quadrata, con una cupola centrale e quattro facciate identiche precedute da altrettanti pronai classici ionici.",
            "Basilica Palladiana": "Ristrutturazione del palazzo pubblico di Vicenza tramite una spettacolare loggia a serliane marmoree ripetute."
        }
    },
    "jacopo-tintoretto": {
        "name": "Jacopo Tintoretto",
        "period": "Rinascimento Veneto",
        "years": "1518 – 1594",
        "desc": "Esponente del tardo Rinascimento veneto, noto per il drammatismo visionario delle luci, i forti contrasti chiaroscurali e le composizioni dinamiche asimmetriche.",
        "points": [
            "**Luce Spettrale**: Luci radenti e lampi luminosi improvvisi che squarciano scene ambientate in penombre drammatiche.",
            "**Asimmetria Compositiva**: Dispone le figure lungo diagonali audaci, sfondando lo spazio prospettico tradizionale.",
            "**Pennellata Rapida**: Stesura del colore rapidissima, grafica ed espressionista (disegno con la luce)."
        ],
        "works": {
            "Il miracolo dello schiavo": "Grande tela del 1548 in cui San Marco scende dal cielo in un volo scorciato a salvare uno schiavo, circondato da una folla concitata dipinta con forti scorci e colori accesi.",
            "Ultima Cena (San Giorgio Maggiore)": "Composizione diagonale dominata da una luce divina e spettrale che proviene dall'aureola di Cristo e da una lampada ad olio, con angeli fatti di puro fumo luminoso."
        }
    },
    "paolo-veronese": {
        "name": "Paolo Veronese",
        "period": "Rinascimento Veneto",
        "years": "1528 – 1588",
        "desc": "Celebre per le sue grandiose scene teatrali e banchetti arricchiti da maestose architetture classiche e colori luminosi accostati per contrasto complementare.",
        "points": [
            "**Colorismo Luminoso**: Accostamento di colori brillanti (rossi, gialli, azzurri) accesi da ombre colorate complementari.",
            "**Scenografie Classiche**: Scene sacre inserite all'interno di maestose logge e portici di marmo bianco palladiano.",
            "**Spettacolo Teatrale**: Presenza di musici, buffoni, cani, nani e costumi sontuosi contemporanei della Venezia del Cinquecento."
        ],
        "works": {
            "Nozze di Cana": "Gigantesca tela (Louvre) con oltre 130 personaggi disposti in una complessa composizione teatrale coronata da un cielo azzurro terso e da balaustre classiche.",
            "Cena in casa di Levi": "Dipinto originariamente intitolato Ultima Cena, che subì un processo dell'Inquisizione a causa della presenza di soldati ubriachi, nani e animali considerati inadatti al tema sacro."
        }
    },
    "andrea-del-sarto": {
        "name": "Andrea del Sarto",
        "period": "Manierismo",
        "years": "1486 – 1530",
        "desc": "Maestro fiorentino 'senza errori', unì la perfezione classica di Raffaello e lo sfumato di Leonardo, avviando i germi del Manierismo.",
        "points": [
            "**Perfezione Formale**: Disegno e panneggi privi di imperfezioni anatomiche.",
            "**Sfumato Atmosferico**: Transizioni morbide di chiaroscuro.",
            "**Tonalità Calde e Fredde**: Introduce accordi cromatici complessi che faranno scuola."
        ],
        "works": {
            "Madonna delle Arpie": "Pala d'altare in cui la Vergine col Bambino poggia su un piedistallo decorato con arpie scolpite, avvolta da una luce morbida e circondata da San Francesco e San Giovanni Evangelista."
        }
    },
    "baldassarre-peruzzi": {
        "name": "Baldassarre Peruzzi",
        "period": "Manierismo",
        "years": "1481 – 1536",
        "desc": "Architetto e pittore senese, attivo a Roma, noto per l'uso scenografico della prospettiva e il rigore distributivo.",
        "points": [
            "**Prospettiva Scenografica**: Fonde pittura e architettura per sfondare pareti piane.",
            "**Classicismo Elegante**: Rielabora i modelli antichi con grazia e licenza manierista.",
            "**Piante Complesse**: Disegno di ville e palazzi integrati a giardini prospettici."
        ],
        "works": {
            "Villa Farnesina": "Palazzetto romano celebre per la decorazione ad affresco della Loggia di Galatea e per la Sala delle Prospettive, dove dipinse vedute romane fittizie dietro un finto colonnato."
        }
    },
    "giorgio-vasari": {
        "name": "Giorgio Vasari",
        "period": "Manierismo",
        "years": "1511 – 1574",
        "desc": "Pittore, architetto e storico dell'arte, celebre per aver scritto Le Vite, prima vera opera di storiografia artistica.",
        "points": [
            "**Storiografia Artistica**: Inventa il concetto di Rinascimento suddiviso in tre età evolutive culminanti in Michelangelo.",
            "**Manierismo Cortese**: Pittore prolifico al servizio di Cosimo I de' Medici.",
            "**Grandi Cantieri**: Architetto monumentale ed efficiente organizzatore."
        ],
        "works": {
            "Le Vite": "Trattato biografico fondamentale per la ricostruzione della storia dell'arte italiana.",
            "Palazzo degli Uffizi": "Grandioso complesso a U destinato agli uffici amministrativi fiorentini, con un lungo porticato a serliane."
        }
    },
    "pontormo": {
        "name": "Pontormo (Jacopo Carucci)",
        "period": "Manierismo",
        "years": "1494 – 1557",
        "desc": "Pioniere del Manierismo fiorentino, ruppe gli schemi del Rinascimento classico con colori acidi, pose contorte e composizioni instabili.",
        "points": [
            "**Rottura della Spazialità**: Elimina i punti di fuga e la prospettiva geometrica per comprimere i corpi.",
            "**Colori Cangianti ed Acidi**: Uso di tinte innaturali (rosa shocking, verde mela, giallo zolfo).",
            "**Linea Serpentinata**: Figure allungate avvolte in pose dinamiche avvitate."
        ],
        "works": {
            "Deposizione di Santa Felicita": "Capolavoro manierista. I personaggi fluttuano privi di gravità in una composizione convessa, sorreggendo il corpo di Cristo in un groviglio di panneggi cangianti dai toni acidi e sguardi sbarrati."
        }
    },
    "rosso-fiorentino": {
        "name": "Rosso Fiorentino",
        "period": "Manierismo",
        "years": "1495 – 1540",
        "desc": "Esponente del Manierismo, propose un'arte drammatica e spigolosa. Fondò la Scuola di Fontainebleau in Francia.",
        "points": [
            "**Spigolosità Espressiva**: Figure geometriche spigolose dal disegno tagliente.",
            "**Drammaticità Allucinata**: Volti contratti e pose tese contrarie all'armonia classica.",
            "**Sintesi Decorativa**: Fondatore del gusto decorativo francese a stucco e pittura."
        ],
        "works": {
            "Deposizione dalla croce di Volterra": "Pala caratterizzata da una croce enorme su cui poggiano scale instabili. I corpi dei depositanti sono angolosi e spigolosi, tagliati da una luce violenta contro un cielo scuro uniforme."
        }
    },
    "agnolo-bronzino": {
        "name": "Agnolo Bronzino",
        "period": "Manierismo",
        "years": "1503 – 1572",
        "desc": "Allievo del Pontormo, celebre per i suoi ritratti di corte dei Medici algidi, aristocratici, levigati e dalla raffinata freddezza metallica.",
        "points": [
            "**Ritrattistica Aristocratica**: Personaggi distaccati, impassibili, che esprimono il loro status sociale tramite abiti lussuosi resi nei minimi dettagli.",
            "**Superfici Smaltate**: Stesura del colore lucida, priva di pennellate visibili, che fa sembrare la pelle come marmo o porcellana.",
            "**Allegorie Intellettualistiche**: Composizioni mitologiche dense di simboli filosofici complessi."
        ],
        "works": {
            "Ritratto di Eleonora di Toledo col figlio Giovanni": "La duchessa indossa un celebre abito in broccato broccato descritto con precisione millimetrica. Il volto è immobile e regale, immerso in uno sfondo azzurro cupo.",
            "Allegoria del trionfo di Venere": "Tavola complessa ricca di nudi levigati che simboleggiano i piaceri e le insidie dell'amore."
        }
    },
    "parmigianino": {
        "name": "Parmigianino",
        "period": "Manierismo",
        "years": "1503 – 1540",
        "desc": "Rappresentante del Manierismo emiliano, caratterizzato dall'estremo allungamento delle proporzioni per ricercare un'eleganza astratta e aristocratica.",
        "points": [
            "**Allungamento Proporzionale**: Arti, colli e dita allungati per superare la verosimiglianza a favore di un canone di grazia filiforme.",
            "**Spazialità Instabile**: Sfondi deformati ed elementi architettonici misteriosi.",
            "**Linee Sinuose**: Curve continue che collegano le figure in un andamento armonioso astratto."
        ],
        "works": {
            "Madonna dal collo lungo": "Tavola capolavoro. La Vergine ha un collo e dita eccezionalmente allungati, il Bambino disteso sembra scivolare dalle sue ginocchia e una colonna senza capitello si staglia solitaria sullo sfondo sfocato.",
            "Autoritratto entro uno specchio convesso": "Dipinto su una tavoletta emisferica che riproduce fedelmente la distorsione ottica dello specchio, con la mano in primo piano ingigantita."
        }
    },
    "benvenuto-cellini": {
        "name": "Benvenuto Cellini",
        "period": "Manierismo",
        "years": "1500 – 1571",
        "desc": "Scultore e orafo fiorentino celebre per la sua Vita autobiografica e la superba padronanza tecnica della fusione in bronzo.",
        "points": [
            "**Virtuosismo Tecnico**: Fusione a cera persa di sculture complesse ricche di dettagli cesellati.",
            "**Tensione Erodica**: Figure atletiche in pose dinamiche e slanciate.",
            "**Oreficeria Monumentale**: Tratta la scultura monumentale con la cura miniaturistica dell'oro."
        ],
        "works": {
            "Perseo con la testa di Medusa": "Statua bronzea in Piazza della Signoria a Firenze. Perseo poggia trionfante sul corpo deformato di Medusa, sollevando la testa recisa con dettagli realistici di sangue in bronzo colato."
        }
    },
    "giambologna": {
        "name": "Giambologna",
        "period": "Manierismo",
        "years": "1529 – 1608",
        "desc": "Scultore fiammingo attivo a Firenze, maestro della linea serpentinata e della scultura visibile da molteplici punti di vista.",
        "points": [
            "**Linea Serpentinata**: Composizione a spirale che spinge lo spettatore a girare intorno alla scultura.",
            "**Assenza di Punto di Vista Privilegiato**: L'opera è progettata per funzionare perfettamente da ogni angolazione.",
            "**Tensione Dinamica**: Corpi intrecciati in sforzi fisici intensi."
        ],
        "works": {
            "Ratto delle Sabine": "Gruppo marmoreo nella Loggia dei Lanzi. Tre corpi (un giovane che rapisce una donna sollevandola da terra, mentre un vecchio soccombe in basso) sono intrecciati in una vertiginosa spirale plastica ascendente."
        }
    },
    "pietro-da-cortona": {
        "name": "Pietro da Cortona",
        "period": "Barocco",
        "years": "1596 – 1669",
        "desc": "Iniziatore della grande decorazione barocca ad affresco, caratterizzata da cieli aperti affollati di figure in forte movimento illusionistico.",
        "points": [
            "**Quadratura Illusionistica**: Fonde finte architetture prospettiche con nuvole e figure volanti.",
            "**Esuberanza Cromatica**: Colori dorati e luminosi stesi con pennellate rapide e festose.",
            "**Affollamento Compositivo**: Scene con centinaia di figure disposte in gruppi dinamici."
        ],
        "works": {
            "Trionfo della Divina Provvidenza": "Grande affresco sul soffitto del salone di Palazzo Barberini a Roma. Lo spazio è sfondato verso il cielo dove la Provvidenza siede circondata da allegorie e stemmi Barberini formati da api fluttuanti."
        }
    },
    "annibale-carracci": {
        "name": "Annibale Carracci",
        "period": "Barocco",
        "years": "1560 – 1609",
        "desc": "Fondatore con Agostino e Ludovico dell'Accademia degli Incamminati, restaurò lo studio del vero e del classicismo raffaellesco contro le bizzarrie manieriste.",
        "points": [
            "**Studio del Vero**: Ritorno al disegno dal naturale di soggetti umili e quotidiani.",
            "**Classicismo Monumentale**: Rielabora gli affreschi rinascimentali con una nuova energia spaziale e chiaroscurale.",
            "**Accademia Didattica**: Fondazione del primo vero atelier scolastico per artisti."
        ],
        "works": {
            "Galleria Farnese": "Decorazione ad affresco della volta del palazzo romano (1597-1608). Dipinge miti d'amore degli dei (Trionfo di Bacco e Arianna) inseriti in finti quadri riportati con cornici dipinte di straordinario illusionismo.",
            "Il mangiafagioli": "Tavola realista capolavoro di pittura di genere, che ritrae un popolano che mangia con foga."
        }
    },
    "agostino-carracci": {
        "name": "Agostino Carracci",
        "period": "Barocco",
        "years": "1557 – 1602",
        "desc": "Teorico dell'Accademia degli Incamminati, noto per le sue eccezionali doti di incisore e il rigore disegnativo.",
        "points": [
            "**Incisione di Precisione**: Diffuse i capolavori del Rinascimento tramite stampe di altissima qualità.",
            "**Rigore Disegnativo**: Maestro del disegno anatomico pulito e accademico."
        ],
        "works": {
            "Comunione di san Girolamo": "Grande tela classica caratterizzata da una composizione solenne ed equilibrata che farà da modello per Domenichino."
        }
    },
    "ludovico-carracci": {
        "name": "Ludovico Carracci",
        "period": "Barocco",
        "years": "1555 – 1619",
        "desc": "Cugino di Annibale e Agostino, coordinò l'Accademia degli Incamminati infondendo alle sue opere una forte carica devozionale ed emotiva.",
        "points": [
            "**Devozione Emotiva**: Scene sacre cariche di sentimenti patetici ed espressivi adatte alla Controriforma.",
            "**Chiaroscuro Intenso**: Uso di ombre avvolgenti che creano atmosfere intime."
        ],
        "works": {
            "Madonna dei Bargellini": "Sacra conversazione solenne caratterizzata da sguardi intensamente devoti e da una luce diagonale morbida."
        }
    },
    "guido-reni": {
        "name": "Guido Reni",
        "period": "Barocco",
        "years": "1575 – 1642",
        "desc": "Esponente del classicismo barocco bolognese, ricercò una grazia incorporea e un ideale di bellezza pura ispirata a Raffaello.",
        "points": [
            "**Bellezza Ideale**: Volti idealizzati, colli allungati e sguardi rivolti al cielo carichi di grazia spirituale.",
            "**Disegno Purista**: Rifiuta il naturalismo caravaggesco a favore di contorni nitidi e colori pastello freddi.",
            "**Grazia Raffaellesca**: Rianima lo stile solare del Rinascimento Maturo."
        ],
        "works": {
            "L'Aurora": "Affresco a Palazzo Pallavicini-Rospigliosi a Roma. Il carro del Sole è preceduto dall'Aurora in volo, circondato dalle Ore che danzano tenendosi per mano in una composizione di eccezionale armonia classica."
        }
    },
    "guercino": {
        "name": "Guercino",
        "period": "Barocco",
        "years": "1591 – 1666",
        "desc": "Noto per la pittura macchia-tonale, i forti contrasti chiaroscurali e l'affresco dell'Aurora a Roma che contrasta con la versione classicista di Reni.",
        "points": [
            "**Pittura di Macchia**: Costruisce le figure stendendo macchie di colore e contrasti di luce densi.",
            "**Dinamismo Prospettico**: Sfondamento delle volte con scorci arditi dal basso verso l'alto."
        ],
        "works": {
            "L'Aurora (Casino Ludovisi)": "Affresco in cui il carro dell'Aurora passa sotto un finto soffitto squarciato e rovinato dipinto dal quadraturista Agostino Tassi, capolavoro di illusionismo spaziale."
        }
    },
    "artemisia-gentileschi": {
        "name": "Artemisia Gentileschi",
        "period": "Barocco",
        "years": "1593 – 1653",
        "desc": "Celebre pittrice caravaggesca, prima donna ammessa all'Accademia delle Arti del Disegno di Firenze, nota per la forza drammatica delle sue eroine.",
        "points": [
            "**Caravaggismo Drammatico**: Uso intenso della luce caravaggesca e del naturalismo nei dettagli fisici.",
            "**Eroine Combattive**: Predilige soggetti biblici di donne forti (Giuditta, Susanna) che affrontano la violenza maschile.",
            "**Realismo della Carne**: Resa plastica dei corpi e del sangue con una concretezza sconvolgente."
        ],
        "works": {
            "Giuditta che decapita Oloferne": "Tavola capolavoro. Giuditta, aiutata dall'ancella, taglia con decisione la testa al generale assiro bloccato sul letto. Il sangue zampilla realisticamente macchiando le lenzuola, illuminato da una luce radente caravaggesca."
        }
    },
    "jusepe-de-ribera": {
        "name": "Jusepe de Ribera",
        "period": "Barocco",
        "years": "1591 – 1652",
        "desc": "Pittore spagnolo attivo a Napoli, estremizzò il naturalismo caravaggesco insistendo sulla rappresentazione cruda del dolore fisico.",
        "points": [
            "**Tenebrismo Estremo**: Chiaroscuri violenti che isolano figure scavate e rugose su sfondi neri.",
            "**Realismo del Dolore**: Descrizione minuziosa di ferite, pelli avvizzite e torture fisiche.",
            "**Pennellata Materica**: Stende il colore con impasti spessi e rugosi."
        ],
        "works": {
            "Martirio di san Bartolomeo": "Il santo è legato mentre un carnefice inizia a scorticarlo vivo, con una resa drammatica della pelle tesa e dell'espressione di sofferenza."
        }
    },
    "salvator-rosa": {
        "name": "Salvator Rosa",
        "period": "Barocco",
        "years": "1615 – 1673",
        "desc": "Pittore di paesaggi selvaggi e orridi, battaglie concitate e soggetti magico-filosofici, che anticipa sensibilità romantiche.",
        "points": [
            "**Paesaggio dell'Orrido**: Rocce dirupate, alberi spezzati dal vento, tempeste e rovine simboliche.",
            "**Soggetti Eretici**: Scene di stregoneria, necromanzia e meditazioni filosofiche malinconiche."
        ],
        "works": {
            "Paesaggio boscoso con filosofi": "Natura selvaggia in cui piccoli personaggi classici meditano in solitudine."
        }
    },
    "luca-giordano": {
        "name": "Luca Giordano",
        "period": "Barocco",
        "years": "1634 – 1705",
        "desc": "Celebre per la velocità esecutiva e il virtuosismo cromatico, diffuse la decorazione barocca in Italia e in Spagna.",
        "points": [
            "**Velocità Esecutiva**: Noto come 'Luca Fapresto' per la rapidità di dipingere enormi soffitti.",
            "**Colorismo Solare**: Unisce la stesura veneta a spettacolari aperture prospettiche aeree."
        ],
        "works": {
            "Affreschi di Palazzo Medici Riccardi": "Galleria degli Specchi a Firenze. Dipinge un cielo dorato affollato di divinità fluttuanti ed allegorie medicee di eccezionale luminosità."
        }
    },
    "andrea-pozzo": {
        "name": "Andrea Pozzo",
        "period": "Barocco",
        "years": "1642 – 1709",
        "desc": "Gesuita e maestro di prospettiva e quadratura, creò la più spettacolare finta architettura dipinta su soffitto piatto del Seicento.",
        "points": [
            "**Quadratura Estrema**: Disegna un finto tempio classico colonnato che si innalza sopra le pareti reali della chiesa.",
            "**Punto di Vista Unico**: La prospettiva funziona perfettamente solo posizionandosi su un cerchio giallo sul pavimento."
        ],
        "works": {
            "Gloria di sant'Ignazio": "Soffitto piatto della chiesa di Sant'Ignazio a Roma, sfondato verso un cielo infinito in cui il santo sale circondato da angeli e dalle allegorie dei quattro continenti."
        }
    },
    "giambattista-tiepolo": {
        "name": "Giambattista Tiepolo",
        "period": "Barocco",
        "years": "1696 – 1770",
        "desc": "Ultimo grande decoratore monumentale veneziano, celebrò il rococò e il barocco con affreschi luminosi e cieli infiniti.",
        "points": [
            "**Luce Argentea**: Colori limpidi, luminosi e ombre chiare stese in cieli spaziosi infiniti.",
            "**Teatralità Rococò**: Personaggi classici in abiti settecenteschi inseriti in spettacolari quadrature."
        ],
        "works": {
            "Affreschi della Residenza di Würzburg": "Scalone monumentale in cui dipinge l'Olimpo circondato dalle allegorie dei continenti, capolavoro di luminosità e spazialità barocca."
        }
    },
    "canaletto": {
        "name": "Canaletto",
        "period": "Barocco",
        "years": "1697 – 1768",
        "desc": "Massimo esponente del vedutismo veneziano, usò la camera ottica per realizzare vedute prospetticamente esatte e ricche di luce meridiana.",
        "points": [
            "**Camera Ottica**: Strumento per proiettare la realtà sulla tela e tracciare linee prospettiche scientifiche.",
            "**Luce Cristallina**: Luce solare tersa che definisce i dettagli architettonici e i riflessi dell'acqua nei minimi particolari."
        ],
        "works": {
            "Il Canal Grande verso Rialto": "Veduta prospettica specchiata e ricca di dettagli di palazzi, barche e gondole avvolte da una luce meridiana chiarissima."
        }
    },
    "francesco-guardi": {
        "name": "Francesco Guardi",
        "period": "Barocco",
        "years": "1712 – 1793",
        "desc": "Vedutista veneziano, a differenza di Canaletto propose vedute soggettive, sfocate e nostalgiche, cariche di vibrazioni atmosferiche.",
        "points": [
            "**Vedutismo Lirico**: Paesaggi sfumati e nostalgici che evocano la decadenza fisica e spirituale di Venezia.",
            "**Pittura di Tocco**: Piccole pennellate rapide e tremolanti che suggeriscono le forme invece di definirle."
        ],
        "works": {
            "Il bacino di San Marco": "Veduta malinconica con cieli grigiastri e gondole rese come macchie nere tremolanti sull'acqua increspata."
        }
    },
    "johann-joachim-winckelmann": {
        "name": "Johann Joachim Winckelmann",
        "period": "Neoclassicismo",
        "years": "1717 – 1768",
        "desc": "Storico dell'arte e teorico tedesco, fondò l'archeologia scientifica moderna e codificò l'ideale neoclassico basato sull'imitazione dell'arte greca antica.",
        "points": [
            "**Imitazione e non Copia**: L'artista deve imitare il metodo e l'armonia degli antichi greci per raggiungere il bello ideale.",
            "**Nobile Semplicità e Quieta Grandezza**: L'opera d'arte deve esprimere passioni contenute ed equilibrio formale, evitando la retorica del Barocco.",
            "**Bellezza Ideale**: Selezione delle parti più perfette della natura per superare la realtà fisica."
        ],
        "works": {
            "Storia dell'arte nell'antichità": "Primo trattato moderno che analizza l'evoluzione stilistica dei popoli antichi ponendo l'arte greca come culmine insuperabile."
        }
    },
    "anton-raphael-mengs": {
        "name": "Anton Raphael Mengs",
        "period": "Neoclassicismo",
        "years": "1728 – 1779",
        "desc": "Pittore e teorico tedesco, amico di Winckelmann, realizzò il dipinto manifesto del Neoclassicismo romano.",
        "points": [
            "**Sintesi Estetica**: Unisce la linea classica di Raffaello, il chiaroscuro di Correggio e il colore di Tiziano.",
            "**Rifiuto del Barocco**: Composizioni bidimensionali, piane e prive di profondità drammatiche."
        ],
        "works": {
            "Il Parnaso": "Affresco a Villa Albani a Roma. Apollo circondato dalle Muse è dipinto in una composizione bidimensionale simmetrica ispirata a rilievi classici antichi."
        }
    },
    "antonio-canova": {
        "name": "Antonio Canova",
        "period": "Neoclassicismo",
        "years": "1757 – 1822",
        "desc": "Scultore neoclassico per eccellenza, noto per la levigatezza vitale del marmo finita a cera e per la ricerca della 'bellezza ideale'.",
        "points": [
            "**La Cera Finale**: Applicava una miscela di cera colorata per togliere la freddezza al marmo bianco e simulare la pelle viva.",
            "**Composizione Prospettica**: Sculture visibili da più angolazioni, con linee di forza geometriche specchiate.",
            "**Sublime Neoclassico**: Cattura l'attimo di quiete prima o dopo l'azione drammatica."
        ],
        "works": {
            "Amore e Psiche giacenti": "Gruppo marmoreo capolavoro. I corpi dei giovani si incrociano disegnando una X prospettica, bloccati nell'istante che precede il bacio vitale, con ali e arti in perfetta armonia lineare.",
            "Monumento funerario a Maria Cristina d'Austria": "Piramide grigia classica in marmo in cui sfila un corteo funebre di figure velate, simbolo della morte inevitabile e della memoria che unisce i vivi e i defunti."
        }
    },
    "jean-auguste-dominique-ingres": {
        "name": "Jean-Auguste-Dominique Ingres",
        "period": "Neoclassicismo",
        "years": "1780 – 1867",
        "desc": "Custode del classicismo accademico e del disegno purista francese, unì forme neoclassiche a suggestioni esotiche e allungamenti sinuosi.",
        "points": [
            "**Primato del Disegno**: Linea di contorno sinuosa di straordinaria precisione formale.",
            "**Linearismo Sensuale**: Deforma leggermente le proporzioni anatomiche per accentuare l'eleganza delle curve.",
            "**Finitura Smaltata**: Colori stesi con precisione cristallina senza pennellate visibili."
        ],
        "works": {
            "La grande odalisca": "Nudo femminile sdraiato in un interno esotico. Ingres allunga la schiena della donna di tre vertebre per conferirle una linea sinuosa ed elegantissima, circondata da dettagli preziosi di tessuti e fumi."
        }
    },
    "theodore-gericault": {
        "name": "Théodore Géricault",
        "period": "Romanticismo",
        "years": "1791 – 1824",
        "desc": "Iniziatore del Romanticismo francese, ruppe con il rigore neoclassico per esplorare la follia, il dramma reale della storia e la morte.",
        "points": [
            "**Realismo Drammatico**: Rifiuto di soggetti mitologici a favore della cronaca contemporanea cruda.",
            "**Composizione Piramidale Dinamica**: Dispone le figure lungo diagonali instabili che esprimono sforzo e disperazione.",
            "**Chiaroscuro Caravaggesco**: Luci calde e ombre fonde per accrescere il senso di tragedia."
        ],
        "works": {
            "La zattera della Medusa": "Grande tela del 1819 che ritrae i naufraghi della fregata francese abbandonati su una zattera. La composizione culmina in due piramidi: una di corpi sofferenti e morti in basso, l'altra di speranza che si protende verso la nave in lontananza."
        }
    },
    "eugene-delacroix": {
        "name": "Eugène Delacroix",
        "period": "Romanticismo",
        "years": "1798 – 1863",
        "desc": "Leader della scuola romantica francese, basò la pittura sul colore vibrante, su composizioni dinamiche e su soggetti di forte impegno civile ed emotivo.",
        "points": [
            "**Preminenza del Colore**: Rifiuta il disegno nitido di Ingres stendendo il colore per macchie e pennellate cariche di vibrazioni luminose.",
            "**Pathos ed Impegno Civile**: Rappresentazione di lotte per la libertà e tragedie storiche con partecipazione emotiva.",
            "**Esotismo Romantico**: Dipinti ispirati ai viaggi in Marocco, ricchi di luci sature ed atmosfere orientali."
        ],
        "works": {
            "La Libertà che guida il popolo": "Celebre tela del 1830. La Libertà è personificata da una donna a seno scoperto che sventola il tricolore francese guidando una folla di popolani e borghesi sulle barricate, sopra una catasta di cadaveri."
        }
    },
    "francesco-hayez": {
        "name": "Francesco Hayez",
        "period": "Romanticismo",
        "years": "1791 – 1882",
        "desc": "Massimo esponente del Romanticismo storico in Italia, coniugò la precisione disegnativa veneta con forti messaggi patriottici risorgimentali nascosti sotto soggetti medievali.",
        "points": [
            "**Romanticismo Storico**: Rappresentazione di episodi storici medievali che contengono chiare allegorie della lotta risorgimentale contro l'Austria.",
            "**Disegno e Colore**: Mantiene un disegno nitido classico unito ad una straordinaria resa cromatica delle sete e dei velluti.",
            "**Sensualità Malinconica**: Volti dolci e sguardi carichi di sentimenti d'amore e dolore."
        ],
        "works": {
            "Il bacio": "Dipinto del 1859. Due giovani si baciano appassionatamente nell'ombra di un portico medievale. Il piede del giovane sullo scalino suggerisce una fuga imminente, simboleggiando la partenza del volontario risorgimentale."
        }
    },
    "caspar-david-friedrich": {
        "name": "Caspar David Friedrich",
        "period": "Romanticismo",
        "years": "1774 – 1840",
        "desc": "Pittore tedesco simbolo del Sublime romantico e del rapporto mistico e contemplativo tra l'uomo e la natura infinita.",
        "points": [
            "**La Rückenfigur**: Disegna un personaggio di spalle in primo piano, spingendo lo spettatore a immedesimarsi e a contemplare il paesaggio infinito.",
            "**Natura Religiosa**: Il paesaggio (nebbie, mari di ghiaccio, foreste) assume un valore sacro e divino.",
            "**Simmetria Malinconica**: Composizioni silenziose, ordinate e simmetriche dai toni freddi."
        ],
        "works": {
            "Il viandante sul mare di nebbia": "Un uomo di spalle contempla da una roccia un immenso mare di nebbia da cui emergono cime rocciose, capolavoro del sentimento del Sublime romantico."
        }
    },
    "william-turner": {
        "name": "William Turner",
        "period": "Romanticismo",
        "years": "1775 – 1851",
        "desc": "Maestro della luce e del Sublime atmosferico, portò il paesaggio romantico verso una quasi completa dissoluzione astratta dell'immagine a favore del colore puro.",
        "points": [
            "**Dissoluzione Atmosferica**: Le forme architettoniche e naturali si sciolgono in tempeste di vapore, pioggia, fumo e luce.",
            "**Sublime Distruttivo**: Rappresentazione di naufragi, incendi e tempeste marine di sconvolgente forza naturale.",
            "**Teoria del Colore di Goethe**: Usa il giallo e l'azzurro per esprimere emozioni di calore o freddo direttamente sulla tela."
        ],
        "works": {
            "Pioggia, vapore e velocità": "Una locomotiva corre su un ponte ferroviario attraversando una tempesta di pioggia e nebbia, dove la macchina industriale sembra fondersi con gli elementi naturali."
        }
    },
    "john-constable": {
        "name": "John Constable",
        "period": "Romanticismo",
        "years": "1776 – 1837",
        "desc": "Pittore inglese dedito alla rappresentazione intima, serena e profondamente naturale della campagna inglese, in contrasto con il Sublime di Turner.",
        "points": [
            "**Natura Intima**: Rifiuta il sublime spaventoso per dipingere la campagna serena, mulini, fiumi e cieli nuvolosi reali.",
            "**Studio delle Nuvole**: Esegue centinaia di bozzetti a olio dei cieli registrando l'ora e il vento con rigore scientifico.",
            "**Pennellata Vibrante**: Piccoli tocchi di bianco puro per simulare la rugiada e il riflesso luminoso sulle foglie."
        ],
        "works": {
            "Il carro da fieno": "Scena campestre idilliaca in cui un carro attraversa un fiume vicino ad un mulino, immerso in una luce naturale chiarissima."
        }
    },
    "gustave-courbet": {
        "name": "Gustave Courbet",
        "period": "Realismo",
        "years": "1819 – 1877",
        "desc": "Padre del Realismo pittorico, rifiutò i soggetti storici e ideali per ritrarre con dignità monumentale la verità quotidiana dei lavoratori e della provincia.",
        "points": [
            "**Rifiuto dell'Idealizzazione**: Ritrae corpi imperfetti, abiti logori e fatiche reali senza alcun sentimentalismo patetico.",
            "**Dignità Monumentale**: Dipinge scene ordinarie di paese su tele di gigantesche dimensioni, riservate tradizionalmente alla pittura storica papale o reale.",
            "**Pittura Materica**: Stende il colore con la spatola creando spessori densi e fisici."
        ],
        "works": {
            "Gli spaccapietre": "Tavola del 1849 che ritrae due lavoratori di spalle intenti a spaccare pietre sul ciglio della strada, capolavoro di denuncia sociale del Realismo.",
            "Un funerale a Ornans": "Enorme tela che ritrae un banale funerale di provincia a cui assiste una folla di paesani in nero, disposti senza gerarchia classica intorno alla fossa scavata nella terra."
        }
    },
    "jean-francois-millet": {
        "name": "Jean-François Millet",
        "period": "Realismo",
        "years": "1814 – 1875",
        "desc": "Esponente della Scuola di Barbizon, ritrasse la fatica quotidiana e la spiritualità solenne della vita contadina.",
        "points": [
            "**Spiritualità Contadina**: I lavoratori dei campi sono dipinti con pose solenni e religiose che ricordano sculture antiche.",
            "**Luce Calda del Crepuscolo**: Atmosfere dorate e malinconiche che avvolgono la campagna.",
            "**Dignità del Lavoro**: Nobilitazione morale dei soggetti umili."
        ],
        "works": {
            "L'Angelus": "Due contadini interrompono il lavoro al tramonto per pregare al suono delle campane, bloccati in una posa di profonda e commovente umiltà."
        }
    },
    "honore-daumier": {
        "name": "Honoré Daumier",
        "period": "Realismo",
        "years": "1808 – 1879",
        "desc": "Pittore, scultore e caricaturista francese, noto per le sue taglienti satire politiche e la denuncia sociale realista della vita urbana.",
        "points": [
            "**Satira Politica**: Disegnatore satirico per giornali dell'epoca.",
            "**Espressionismo Grafico**: Figure definite da linee rapide e caricature espressive.",
            "**Denuncia delle Classi Povere**: Descrive la fatica e la rassegnazione dei lavoratori urbani."
        ],
        "works": {
            "Vagone di terza classe": "Dipinto che illustra un interno affollato di un treno, concentrandosi in primo piano su una famiglia contadina rassegnata immersa in una luce cupa."
        }
    },
    "camille-corot": {
        "name": "Camille Corot",
        "period": "Realismo",
        "years": "1796 – 1875",
        "desc": "Paesaggista cardine tra la tradizione neoclassica del paesaggio ideale e il realismo en plein air della Scuola di Barbizon, influenzò gli impressionisti.",
        "points": [
            "**Studio dal Vero**: Dipinge bozzetti all'aria aperta concentrandosi sui valori di luce reali.",
            "**Atmosfera Vaporosa**: Stile maturo con tonalità argentee, alberi piumosi e nebbie morbide.",
            "**Struttura Prospettica**: Mantiene una solida impalcatura geometrica classica sottostante."
        ],
        "works": {
            "Il ponte di Narni": "Bozzetto giovanile steso all'aria aperta caratterizzato da una straordinaria freschezza di luce solare sulle rocce."
        }
    },
    "edouard-manet": {
        "name": "Édouard Manet",
        "period": "Impressionismo",
        "years": "1832 – 1883",
        "desc": "Precursore e guida intellettuale dell'Impressionismo, scosse il mondo accademico eliminando il chiaroscuro a favore di campiture di colore piatte.",
        "points": [
            "**Abolizione della Prospettiva Tradizionale**: Figure bidimensionali appiattite dalla luce frontale.",
            "**Uso di Colori Puri**: Rifiuta lo sfumato accademico accostando direttamente tonalità brillanti senza mezzitoni.",
            "**Scandalo dei Soggetti**: Ritrae scene di vita contemporanea parigina senza idealizzazioni morali o mitologiche."
        ],
        "works": {
            "Colazione sull'erba": "Presentato al Salon des Refusés del 1863. Una donna nuda siede con due dandy vestiti all'aperto, capolavoro che cita Giorgione e Raffaello ma scandalizzò per il realismo contemporaneo e l'assenza di chiaroscuro.",
            "Olympia": "Nudo di una cortigiana parigina che fissa spudoratamente lo spettatore, ispirato alla Venere di Tiziano ma dipinto con forti contrasti grafici piatti."
        }
    },
    "claude-monet": {
        "name": "Claude Monet",
        "period": "Impressionismo",
        "years": "1840 – 1926",
        "desc": "Padre dell'Impressionismo en plein air, dedicò la vita allo studio della percezione dell'attimo luminoso e alle variazioni della luce in serie pittoriche.",
        "points": [
            "**Pittura En Plein Air**: Lavora esclusivamente all'aria aperta di fronte al soggetto reale.",
            "**Scomposizione Cromatica**: Piccoli tocchi accostati di colore puro che l'occhio dello spettatore ricompone a distanza.",
            "**Le Serie Pittoriche**: Dipinge lo stesso soggetto a diverse ore del giorno per registrare il cambiamento della luce (Cattedrali, Ninfee)."
        ],
        "works": {
            "Impressione, sole nascente": "Dipinto del 1872 che diede il nome al movimento. La veduta del porto di Le Havre è evocata con veloci tocchi azzurri e arancioni che descrivono la nebbia e il riflesso solare sull'acqua.",
            "Le Ninfee": "Ciclo monumentale tardivo in cui lo spazio si dissolve quasi del tutto in riflessi d'acqua, vegetazione e pura luce cromatica."
        }
    },
    "pierre-auguste-renoir": {
        "name": "Pierre-Auguste Renoir",
        "period": "Impressionismo",
        "years": "1841 – 1919",
        "desc": "Esponente dell'Impressionismo dedito alla resa della gioia di vivere parigina, della luce filtrata dal fogliame e della morbidezza carnale del nudo.",
        "points": [
            "**Gioia di Vivere (Joie de Vivre)**: Soggetti festosi, balli, caffè e gite in barca della borghesia parigina.",
            "**Luce Filtrata**: Resa delle ombre colorate e delle macchie di luce solare che filtrano attraverso le foglie sugli abiti e sulla pelle.",
            "**Pennellata Liquida**: Colori caldi, morbidi e stesura fluida del colore."
        ],
        "works": {
            "Bal au moulin de la Galette": "Capolavoro impressionista del 1876. Una folla danzante all'aperto è descritta in un vortice di luci e ombre colorate mobili filtrate dagli alberi, trasmettendo un senso di felice vitalità."
        }
    },
    "edgar-degas": {
        "name": "Edgar Degas",
        "period": "Impressionismo",
        "years": "1834 – 1917",
        "desc": "A differenza dei colleghi, dipinse prevalentemente in studio focalizzandosi sul movimento del corpo (ballerine) e su tagli prospettici insoliti di derivazione fotografica.",
        "points": [
            "**Taglio Fotografico**: Inquadrature decentrate, asimmetriche e figure tagliate dal bordo del quadro, imitando lo scatto fotografico casuale.",
            "**Studio del Movimento**: Analisi del corpo umano in attività complesse come la danza o il lavoro (stiratrici).",
            "**Disegno Dinamico**: Non abbandona mai il disegno lineare, integrandolo con veloci passaggi a pastello."
        ],
        "works": {
            "La classe di danza": "Tavola caratterizzata da una prospettiva diagonale che sfonda lo spazio dello studio, dove ballerine in tutù provano pose sotto lo sguardo del maestro.",
            "L'assenzio": "Composizione decentrata che ritrae una coppia solitaria e rassegnata in un caffè parigino, capolavoro di realismo psicologico urbano."
        }
    },
    "camille-pissarro": {
        "name": "Camille Pissarro",
        "period": "Impressionismo",
        "years": "1830 – 1903",
        "desc": "Unico pittore a partecipare a tutte e otto le mostre impressioniste, fu mentore di Cézanne e Gauguin ed esplorò paesaggi rurali e urbani.",
        "points": [
            "**Struttura Solida**: Mantiene un disegno strutturato sotto la stesura impressionista.",
            "**Atmosfere Urbane**: Celebre per i dipinti delle grandi strade parigine viste dall'alto."
        ],
        "works": {
            "Boulevard Montmartre": "Serie di dipinti che ritrae il viale parigino a diverse ore del giorno e stagioni, registrando la folla e la pioggia."
        }
    },
    "alfred-sisley": {
        "name": "Alfred Sisley",
        "period": "Impressionismo",
        "years": "1839 – 1899",
        "desc": "Dedito quasi esclusivamente al paesaggio en plein air puro, celebre per la sensibilità nel dipingere cieli ed effetti dell'acqua.",
        "points": [
            "**Lirismo Paesaggistico**: Atmosfere tranquille e cieli spaziosi dominati da nubi.",
            "**Riflessi dell'Acqua**: Maestro nel dipingere inondazioni e neve."
        ],
        "works": {
            "Inondazione a Port-Marly": "Serie che ritrae la piena della Senna, dove la luce si riflette sulla superficie dell'acqua che allaga la strada."
        }
    },
    "paul-cezanne": {
        "name": "Paul Cézanne",
        "period": "Post-Impressionismo",
        "years": "1839 – 1906",
        "desc": "Superò l'Impressionismo ricercando la solidità delle forme attraverso la scomposizione geometrica in cilindri, coni e sfere, preparando la strada al Cubismo.",
        "points": [
            "**Riduzione Geometrica**: Ricostruzione dello spazio riducendo le forme naturali a volumi geometrici puri.",
            "**Colore Costruttivo**: Il colore definisce la struttura e i piani dello spazio senza disegno di contorno.",
            "**Molteplicità dei Punti di Vista**: Dipinge oggetti visti da diverse angolazioni all'interno dello stesso quadro."
        ],
        "works": {
            "I giocatori di carte": "Tavola del 1890-1895. Due contadini seduti al tavolo sono dipinti con forme solide e monumentali che sembrano sculture lignee, bloccati in una rigida simmetria.",
            "La montagna Sainte-Victoire": "Serie di dipinti in cui la montagna e la vallata circostante si dissolvono in campiture geometriche accostate (taches), capolavoro di astrazione formale."
        }
    },
    "georges-seurat": {
        "name": "Georges Seurat",
        "period": "Post-Impressionismo",
        "years": "1859 – 1891",
        "desc": "Inventore del Pointillisme (Puntinismo), strutturò la pittura su base scientifica accostando puntini di colori puri accostati per contrasto ottico.",
        "points": [
            "**Pointillisme**: Stesura del colore in piccoli puntini uniformi di colore puro.",
            "**Contrasto Simultaneo (Chevreul)**: Accostamento di colori complementari per esaltare la luminosità ottica direttamente nella retina dello spettatore.",
            "**Staticità Monumentale**: Figure immobili, geometriche e senza tempo che ricordano i bassorilievi egizi."
        ],
        "works": {
            "Una domenica pomeriggio sull'isola della Grande Jatte": "Grande tela (Chicago) del 1884-1886. Una folla di parigini all'aperto è bloccata in pose geometriche e rigide all'ombra degli alberi, capolavoro di armonia scientifica e silenzio."
        }
    },
    "paul-gauguin": {
        "name": "Paul Gauguin",
        "period": "Post-Impressionismo",
        "years": "1848 – 1903",
        "desc": "Rifiutò la civiltà occidentale approdando a Tahiti per dipingere tele basate sul cloisonnisme (campiture piatte bordate) e su un intenso sintetismo simbolico.",
        "points": [
            "**Cloisonnisme**: Stesura di colori caldi e sgraziati in ampie campiture piatte contornate da una linea scura netta.",
            "**Sintetismo Simbolico**: Uso di colori antinaturalistici per esprimere concetti religiosi e misteriosi.",
            "**Fuga nel Primitivismo**: Ricerca di un'arte pura incontaminata dalla civiltà industriale."
        ],
        "works": {
            "Da dove veniamo? Chi siamo? Dove andiamo?": "Grande tela testamento del 1897 dipinta a Tahiti, che illustra il ciclo della vita umana (nascita, giovinezza, vecchiaia) in una foresta bluastra e misteriosa dominata da un idolo dorato."
        }
    },
    "vincent-van-gogh": {
        "name": "Vincent van Gogh",
        "period": "Post-Impressionismo",
        "years": "1853 – 1890",
        "desc": "Genio tormentato, caricò il colore e la pennellata materica di una fortissima valenza emotiva e psicologica, ponendosi come padre dell'Espressionismo.",
        "points": [
            "**Colore Soggettivo ed Emotivo**: Usa i colori non per descrivere la realtà ma per trasmettere i suoi tormenti e passioni interiori.",
            "**Pennellata Materica e Dinamica**: Stende il colore con tratti spessi, spiraliformi e in forte movimento sulla tela.",
            "**Empatia con gli Umili**: Ritrae con calore e rispetto contadini, minatori e oggetti semplici quotidiani."
        ],
        "works": {
            "La notte stellata": "Dipinto del 1889. Il cielo notturno si trasforma in un vortice di spirali luminose gialle e azzurre sopra un cipresso scuro a forma di fiamma e un villaggio silenzioso, capolavoro di espressione emotiva.",
            "I mangiatori di patate": "Opera giovanile realista caratterizzata da toni cupi e volti scavati di contadini che consumano il pasto sotto una lampada ad olio."
        }
    },
    "henri-de-toulouse-lautrec": {
        "name": "Henri de Toulouse-Lautrec",
        "period": "Post-Impressionismo",
        "years": "1864 – 1901",
        "desc": "Ritrasse la vita notturna di Montmartre e dei cabaret parigini, elevando il manifesto pubblicitario cartellonistico ad arte d'avanguardia.",
        "points": [
            "**Linea Grafica Dinamica**: Disegno rapido ed espressivo che cattura il movimento e la caricatura dei personaggi.",
            "**Grafica Pubblicitaria**: Inventore del manifesto moderno a campiture piatte sature.",
            "**Cronaca del Cabaret**: Ritrae ballerine, attori e avventori dei locali parigini."
        ],
        "works": {
            "Al Moulin Rouge": "Dipinto caratterizzato da luci verdi spettrali che illuminano i volti degli avventori del locale parigino disposti intorno ad un tavolo."
        }
    },
    "paul-signac": {
        "name": "Paul Signac",
        "period": "Post-Impressionismo",
        "years": "1863 – 1935",
        "desc": "Principale compagno di Seurat, sviluppò e teorizzò il divisionismo applicandolo a paesaggi marini dai colori accesi.",
        "points": [
            "**Divisionismo Scientifico**: Accostamento metodico di tessere di colore puro.",
            "**Luminosità Marina**: Noto per i porti francesi resi come mosaici di luce scintillante."
        ],
        "works": {
            "Il castello dei Papi ad Avignone": "Veduta del palazzo dei papi avvolto da una luce rosa e dorata che si riflette sul Rodano."
        }
    }
}

# Generate files
for artist_id, data in enriched_data.items():
    name = data["name"]
    period = data["period"]
    years = data["years"]
    desc = data["desc"]
    points = data["points"]
    works = data["works"]
    
    book_name = "Brunelleschi.pdf"
    if period in ["Barocco", "Neoclassicismo", "Romanticismo", "Realismo", "Impressionismo", "Post-Impressionismo"]:
        book_name = "Canova.pdf"
        
    styles_list_html = "\n".join([f"*   {pt}" for pt in points])
    
    works_list_html = ""
    if isinstance(works, dict):
        for w_title, w_desc in works.items():
            works_list_html += f"### 🖼️ Opera Chiave: *{w_title}*\n"
            works_list_html += f"{w_desc}\n\n"
    elif isinstance(works, list):
        for w in works:
            works_list_html += f"### 🖼️ Opera Chiave\n"
            works_list_html += f"{w}\n\n"
         
    md_content = f"""# Focus Artista: {name} ({years})

*   **Periodo/Movimento**: {period}
*   **Stato**: Sintesi Accademica di Livello Universitario

---

## 📌 Punti Focali dell'Artista

### 1. Profilo e Contributo Critico
{desc}

### 2. Metodologia e Stile
{styles_list_html}

---

## 🔍 Opere Principali in Esame

{works_list_html}
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

print("Enrichment generation complete.")
