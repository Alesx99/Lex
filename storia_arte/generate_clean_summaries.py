import os
import re

# We will load the artists database directly in Python
artists = [
    # Gotico Internazionale
    {
        "id": "gentile-da-fabriano",
        "name": "Gentile da Fabriano",
        "period": "Gotico Internazionale",
        "years": "1370 – 1427",
        "desc": "Massimo esponente del Gotico Internazionale in Italia, caratterizzato da estrema eleganza lineare, ricchezza decorativa e uso abbondante dell'oro.",
        "works": ["Adorazione dei Magi", "Polittico Quaratesi"]
    },
    {
        "id": "pisanello",
        "name": "Pisanello (Antonio Pisano)",
        "period": "Gotico Internazionale",
        "years": "1395 – 1455",
        "desc": "Celebre pittore e medaglista, noto per la precisione quasi scientifica nel ritrarre animali e per lo stile tardogotico raffinato e fiabesco.",
        "works": ["San Giorgio e la principessa", "Visione di san Eustachio", "Medaglia di Giovanni VIII Paleologo"]
    },
    {
        "id": "lorenzo-monaco",
        "name": "Lorenzo Monaco",
        "period": "Gotico Internazionale",
        "years": "1370 – 1424",
        "desc": "Monaco camaldolese e pittore, unisce la spiritualità medievale alle sinuosità lineari e ai colori accesi del tardogotico fiorentino.",
        "works": ["Incoronazione della Vergine", "Adorazione dei Magi"]
    },
    {
        "id": "michelino-da-besozzo",
        "name": "Michelino da Besozzo",
        "period": "Gotico Internazionale",
        "years": "1370 – 1455",
        "desc": "Principale esponente del Gotico Internazionale in Lombardia, celebre per la morbidezza del disegno e le miniature naturalistiche.",
        "works": ["Sposalizio mistico di santa Caterina", "Offesiolo di Gian Galeazzo Visconti"]
    },
    {
        "id": "giovanni-da-modena",
        "name": "Giovanni da Modena",
        "period": "Gotico Internazionale",
        "years": "1379 – 1455",
        "desc": "Pittore emiliano noto per il tono espressivo, drammatico e talvolta grottesco dei suoi affreschi.",
        "works": ["Affreschi della Cappella Bolognini in San Petronio"]
    },

    # Primo Rinascimento
    {
        "id": "filippo-brunelleschi",
        "name": "Filippo Brunelleschi",
        "period": "Primo Rinascimento",
        "years": "1377 – 1446",
        "desc": "Padre dell'architettura rinascimentale, codificò la prospettiva lineare centrica e progettò strutture basate sul modulo proporzionale classico.",
        "works": ["Cupola di Santa Maria del Fiore", "Spedale degli Innocenti", "Sagrestia Vecchia di San Lorenzo"]
    },
    {
        "id": "donatello",
        "name": "Donatello (Donato de' Bardi)",
        "period": "Primo Rinascimento",
        "years": "1386 – 1466",
        "desc": "Scultore rivoluzionario, introdusse lo 'stiacciato' prospettico e infuse nelle sue figure un realismo drammatico e psicologico senza precedenti.",
        "works": ["David in bronzo", "San Giorgio", "Monumento equestre al Gattamelata"]
    },
    {
        "id": "masaccio",
        "name": "Masaccio (Tommaso di Ser Giovanni)",
        "period": "Primo Rinascimento",
        "years": "1401 – 1428",
        "desc": "Pioniere della pittura rinascimentale, applicò la prospettiva brunelleschiana per dare volume plastico e realismo emotivo alle figure.",
        "works": ["La Trinità (Santa Maria Novella)", "Cacciata dei Progenitori", "Il Tributo"]
    },
    {
        "id": "lorenzo-ghiberti",
        "name": "Lorenzo Ghiberti",
        "period": "Primo Rinascimento",
        "years": "1378 – 1455",
        "desc": "Scultore e orafo, noto per la transizione fluida tra l'eleganza gotica e la prospettiva rinascimentale.",
        "works": ["Porta della Mandorla", "Porta del Paradiso del Battistero di Firenze"]
    },
    {
        "id": "jacopo-della-quercia",
        "name": "Jacopo della Quercia",
        "period": "Primo Rinascimento",
        "years": "1374 – 1438",
        "desc": "Scultore senese, fonde la linearità del gotico con una possente volumetria plastica che anticipa Michelangelo.",
        "works": ["Monumento funebre a Ilaria del Carretto", "Fonte Gaia a Siena", "Portale di San Petronio"]
    },
    {
        "id": "michelozzo",
        "name": "Michelozzo di Bartolomeo",
        "period": "Primo Rinascimento",
        "years": "1396 – 1472",
        "desc": "Architetto e scultore, collaboratore di Donatello, definì il modello del palazzo signorile rinascimentale fiorentino.",
        "works": ["Palazzo Medici Riccardi", "Convento di San Marco (Biblioteca)"]
    },
    {
        "id": "beato-angelico",
        "name": "Beato Angelico (Fra Giovanni)",
        "period": "Primo Rinascimento",
        "years": "1395 – 1455",
        "desc": "Frate domenicano e pittore, conciliò la rigorosa spazialità rinascimentale con una profonda spiritualità e una luce purissima.",
        "works": ["Annunciazione del corridoio di San Marco", "Pala di San Marco"]
    },
    {
        "id": "luca-della-robbia",
        "name": "Luca della Robbia",
        "period": "Primo Rinascimento",
        "years": "1400 – 1482",
        "desc": "Scultore e ceramista, inventore della tecnica della terracotta invetriata che rese le sculture policrome lucide e resistenti.",
        "works": ["Cantoria del Duomo di Firenze", "Madonne in terracotta invetriata"]
    },
    {
        "id": "andrea-della-robbia",
        "name": "Andrea della Robbia",
        "period": "Primo Rinascimento",
        "years": "1435 – 1525",
        "desc": "Nipote di Luca, diffuse su larghissima scala la produzione di terrecotte invetriate arricchendo i dettagli espressivi.",
        "works": ["I Putti dello Spedale degli Innocenti"]
    },
    {
        "id": "giovanni-della-robbia",
        "name": "Giovanni della Robbia",
        "period": "Primo Rinascimento",
        "years": "1469 – 1529",
        "desc": "Figlio di Andrea, portò la terracotta invetriata verso accesi effetti policromi e composizioni molto complesse.",
        "works": ["Lavabo della Sagrestia di Santa Maria Novella"]
    },

    # Secondo Quattrocento
    {
        "id": "leon-battista-alberti",
        "name": "Leon Battista Alberti",
        "period": "Secondo Quattrocento",
        "years": "1404 – 1472",
        "desc": "Grande teorico dell'architettura (De re aedificatoria), concepì la progettazione basata sulla concinnitas (armonia proporzionale) e sui modelli antichi.",
        "works": ["Tempio Malatestiano", "Facciata di Santa Maria Novella", "Sant'Andrea a Mantova"]
    },
    {
        "id": "paolo-uccello",
        "name": "Paolo Uccello (Paolo di Dono)",
        "period": "Secondo Quattrocento",
        "years": "1397 – 1475",
        "desc": "Pittore ossessionato dalle leggi della prospettiva geometrica, che applicò con esiti quasi geometrico-astratti e visionari.",
        "works": ["Battaglia di San Romano", "Monumento a Giovanni Acuto"]
    },
    {
        "id": "piero-della-francesca",
        "name": "Piero della Francesca",
        "period": "Secondo Quattrocento",
        "years": "1412 – 1492",
        "desc": "Maestro di luce e geometria, autore del De prospectiva pingendi; creò figure monumentali e solenni immerse in atmosfere limpide.",
        "works": ["Il Battesimo di Cristo", "La Flagellazione di Urbino", "Pala di Brera"]
    },
    {
        "id": "andrea-del-verrocchio",
        "name": "Andrea del Verrocchio",
        "period": "Secondo Quattrocento",
        "years": "1435 – 1488",
        "desc": "Scultore e pittore fiorentino, titolare di una delle botteghe più importanti in cui si formarono Leonardo da Vinci e il Perugino.",
        "works": ["David in bronzo", "Monumento equestre a Bartolomeo Colleoni", "Battesimo di Cristo"]
    },
    {
        "id": "sandro-botticelli",
        "name": "Sandro Botticelli",
        "period": "Secondo Quattrocento",
        "years": "1445 – 1510",
        "desc": "Interprete visivo del neoplatonismo mediceo, predilesse la linea elegante e sinuosa e soggetti mitologici ad alta densità allegorica.",
        "works": ["La Primavera", "La Nascita di Venere", "La Calunnia"]
    },
    {
        "id": "antonello-da-messina",
        "name": "Antonello da Messina",
        "period": "Secondo Quattrocento",
        "years": "1430 – 1479",
        "desc": "Sintetizzò la monumentalità prospettica italiana con la minuziosa analisi del dettaglio e la tecnica a olio della pittura fiamminga.",
        "works": ["San Girolamo nello studio", "Annunciata di Palermo", "Ritratto d'uomo"]
    },
    {
        "id": "andrea-mantegna",
        "name": "Andrea Mantegna",
        "period": "Secondo Quattrocento",
        "years": "1431 – 1506",
        "desc": "Pittore e incisore padovano, unì un disegno scultoreo e archeologico a straordinari scorci e illusionismi prospettici.",
        "works": ["Camera degli Sposi", "Cristo Morto", "Pala di San Zeno"]
    },
    {
        "id": "giovanni-bellini",
        "name": "Giovanni Bellini (Giambellino)",
        "period": "Secondo Quattrocento",
        "years": "1430 – 1516",
        "desc": "Considerato il padre della pittura veneziana, aprì la strada al tonalismo fondendo luce e atmosfera nei paesaggi sacri.",
        "works": ["Pala di Pesaro", "Preghiera nell'orto", "Vergine in trono col Bambino"]
    },
    {
        "id": "pietro-perugino",
        "name": "Pietro Perugino (Pietro Vannucci)",
        "period": "Secondo Quattrocento",
        "years": "1448 – 1523",
        "desc": "Maestro della scuola umbra, celebre per le sue composizioni simmetriche, dolci e immerse in vasti e sereni paesaggi prospettici.",
        "works": ["Consegna delle chiavi (Cappella Sistina)", "Sposalizio della Vergine"]
    },
    {
        "id": "cosme-tura",
        "name": "Cosmè Tura",
        "period": "Secondo Quattrocento",
        "years": "1430 – 1495",
        "desc": "Fondatore della scuola ferrarese, caratterizzato da uno stile espressionista, angoloso, con figure metalliche ed estremamente tese.",
        "works": ["San Giorgio e la principessa", "Polittico Roverella"]
    },
    {
        "id": "francesco-del-cossa",
        "name": "Francesco del Cossa",
        "period": "Secondo Quattrocento",
        "years": "1436 – 1478",
        "desc": "Pittore ferrarese, unì la tensione plastica di Tura ad un maggiore senso della luce e del rigore monumentale prospettico.",
        "works": ["Mese di Marzo e Aprile nel Salone dei Mesi di Palazzo Schifanoia"]
    },
    {
        "id": "ercole-de-roberti",
        "name": "Ercole de' Roberti",
        "period": "Secondo Quattrocento",
        "years": "1451 – 1496",
        "desc": "Esponente della scuola di Ferrara, noto per il dinamismo drammatico e l'espressività concitata delle sue figure.",
        "works": ["Storie di san Vincenzo Ferrer", "Pala Portuense"]
    },
    {
        "id": "domenico-ghirlandaio",
        "name": "Domenico Ghirlandaio",
        "period": "Secondo Quattrocento",
        "years": "1449 – 1494",
        "desc": "Grande frescante fiorentino, noto per aver ritratto la ricca borghesia medicea all'interno di scene sacre.",
        "works": ["Affreschi della Cappella Sassetti", "Affreschi di Santa Maria Novella"]
    },
    {
        "id": "filippino-lippi",
        "name": "Filippino Lippi",
        "period": "Secondo Quattrocento",
        "years": "1457 – 1504",
        "desc": "Figlio di Filippo Lippi e allievo di Botticelli, evolse lo stile verso tensioni dinamiche e dettagli archeologici che anticipano il Manierismo.",
        "works": ["Affreschi della Cappella Carafa", "Pala degli Otto"]
    },
    {
        "id": "piero-di-cosimo",
        "name": "Piero di Cosimo",
        "period": "Secondo Quattrocento",
        "years": "1462 – 1522",
        "desc": "Pittore fiorentino eccentrico e originale, celebre per i suoi soggetti mitologici fantastici e densi di bizzarrie naturali.",
        "works": ["Liberazione di Andromeda", "Ritratti di Giuliano da Sangallo"]
    },
    {
        "id": "pinturicchio",
        "name": "Pinturicchio (Bernardino di Betto)",
        "period": "Secondo Quattrocento",
        "years": "1454 – 1513",
        "desc": "Pittore umbro, noto per la ricchezza decorativa e l'uso di dettagli in rilievo dorato nelle sue narrazioni storiche.",
        "works": ["Appartamento Borgia in Vaticano", "Libreria Piccolomini a Siena"]
    },
    {
        "id": "luca-signorelli",
        "name": "Luca Signorelli",
        "period": "Secondo Quattrocento",
        "years": "1445 – 1523",
        "desc": "Allievo di Piero della Francesca, si distinse per lo studio anatomico del nudo in movimento che influenzò profondamente Michelangelo.",
        "works": ["Affreschi della Cappella di San Brizio nel Duomo di Orvieto"]
    },
    {
        "id": "melozzo-da-forli",
        "name": "Melozzo da Forlì",
        "period": "Secondo Quattrocento",
        "years": "1438 – 1494",
        "desc": "Maestro di prospettiva, celebre per gli scorci dal basso di angeli e figure celesti.",
        "works": ["Sisto IV nomina il Platina prefetto della biblioteca", "Angeli musicanti"]
    },

    # Rinascimento Maturo
    {
        "id": "donato-bramante",
        "name": "Donato Bramante",
        "period": "Rinascimento Maturo",
        "years": "1444 – 1514",
        "desc": "Architetto e pittore, teorizzò e realizzò lo spazio centrico monumentale a Milano e Roma, avviando la ricostruzione di San Pietro.",
        "works": ["Tempietto di San Pietro in Montorio", "Santa Maria presso San Satiro (falsa prospettiva)", "Progetto per la Basilica di San Pietro"]
    },
    {
        "id": "leonardo-da-vinci",
        "name": "Leonardo da Vinci",
        "period": "Rinascimento Maturo",
        "years": "1452 – 1519",
        "desc": "Genio universale, introdusse lo 'sfumato' e la 'prospettiva aerea', basando l'arte sulla comprensione scientifica dei fenomeni naturali e dei moti dell'animo.",
        "works": ["Vergine delle Rocce", "Il Cenacolo", "La Gioconda"]
    },
    {
        "id": "raffaello-sanzio",
        "name": "Raffaello Sanzio",
        "period": "Rinascimento Maturo",
        "years": "1483 – 1520",
        "desc": "Incarnò l'ideale rinascimentale di grazia, armonia e sintesi classica, unendo il dinamismo michelangiolesco allo sfumato leonardesco.",
        "works": ["Lo Sposalizio della Vergine", "La Scuola di Atene (Stanze Vaticane)", "Madonna del Cardellino"]
    },
    {
        "id": "michelangelo-buonarroti",
        "name": "Michelangelo Buonarroti",
        "period": "Rinascimento Maturo",
        "years": "1475 – 1564",
        "desc": "Scultore, pittore e architetto, pose il nudo umano maschile al centro dell'universo espressivo, caratterizzato da titanismo anatomico e dalla poetica del non-finito.",
        "works": ["La Pietà di San Pietro", "Il David", "Volta della Cappella Sistina", "Giudizio Universale"]
    },

    # Rinascimento Veneto
    {
        "id": "giorgione",
        "name": "Giorgione da Castelfranco",
        "period": "Rinascimento Veneto",
        "years": "1477 – 1510",
        "desc": "Iniziatore della pittura tonale veneta moderna, creò opere liriche, misteriose ed ermetiche in cui l'uomo si fonde intimamente con la natura.",
        "works": ["La Tempesta", "I tre filosofi", "Venere dormiente"]
    },
    {
        "id": "tiziano-vecellio",
        "name": "Tiziano Vecellio",
        "period": "Rinascimento Veneto",
        "years": "1488 – 1576",
        "desc": "Massimo esponente della scuola veneta, sviluppò un colorito tonale espressivo e, nell'età tarda, una pennellata disgregata stesa anche con le dita.",
        "works": ["Assunta dei Frari", "Amor Sacro e Amor Profano", "Venere di Urbino", "La punizione di Marsia"]
    },
    {
        "id": "lorenzo-lotto",
        "name": "Lorenzo Lotto",
        "period": "Rinascimento Veneto",
        "years": "1480 – 1556",
        "desc": "Pittore veneziano originale e anticonformista, operò fuori dalla laguna esprimendo un'acuta sensibilità psicologica e toni inquieti.",
        "works": ["Pala di San Bernardino", "Ritratto di giovane con lucerna"]
    },
    {
        "id": "correggio",
        "name": "Correggio (Antonio Allegri)",
        "period": "Rinascimento Veneto",
        "years": "1489 – 1534",
        "desc": "Fautore di uno stile morbido, sensuale e luminoso, anticipò il Barocco con le sus cupole illusionistiche dipinte a cielo aperto.",
        "works": ["Cupola del Duomo di Parma", "Leda col cigno", "Adorazione dei pastori"]
    },
    {
        "id": "andrea-palladio",
        "name": "Andrea Palladio",
        "period": "Rinascimento Veneto",
        "years": "1508 – 1580",
        "desc": "Architetto vicentino di impatto mondiale, codificò il classicismo rinascimentale nei Quattro libri dell'architettura e nelle ville venete.",
        "works": ["Villa Capra detta La Rotonda", "Basilica Palladiana", "Teatro Olimpico di Vicenza"]
    },
    {
        "id": "jacopo-tintoretto",
        "name": "Jacopo Tintoretto",
        "period": "Rinascimento Veneto",
        "years": "1518 – 1594",
        "desc": "Esponente del tardo Rinascimento veneto, noto per il drammatismo visionario delle luci, i forti contrasti chiaroscurali e le composizioni dinamiche.",
        "works": ["Il miracolo dello schiavo", "Ritrovamento del corpo di san Marco", "Ciclo della Scuola Grande di San Rocco"]
    },
    {
        "id": "paolo-veronese",
        "name": "Paolo Veronese",
        "period": "Rinascimento Veneto",
        "years": "1528 – 1588",
        "desc": "Celebre per le sue grandiose scene teatrali e banchetti arricchiti da architetture classiche e colori luminosi e accostati per contrasto.",
        "works": ["Nozze di Cana", "Cena in casa di Levi", "Affreschi di Villa Barbaro a Maser"]
    },

    # Manierismo
    {
        "id": "andrea-del-sarto",
        "name": "Andrea del Sarto",
        "period": "Manierismo",
        "years": "1486 – 1530",
        "desc": "Maestro fiorentino 'senza errori', unì la perfezione classica di Raffaello e lo sfumato di Leonardo, avviando i germi del Manierismo.",
        "works": ["Madonna delle Arpie", "Affreschi del Chiostrino dei Voti"]
    },
    {
        "id": "baldassarre-peruzzi",
        "name": "Baldassarre Peruzzi",
        "period": "Manierismo",
        "years": "1481 – 1536",
        "desc": "Architetto e pittore senese, attivo a Roma, noto per l'uso scenografico della prospettiva e il rigore distributivo.",
        "works": ["Villa Farnesina", "Palazzo Massimo alle Colonne"]
    },
    {
        "id": "giorgio-vasari",
        "name": "Giorgio Vasari",
        "period": "Manierismo",
        "years": "1511 – 1574",
        "desc": "Pittore, architetto e storico dell'arte, celebre per aver scritto Le Vite, prima vera opera di storiografia artistica.",
        "works": ["Le Vite de' più eccellenti pittori, scultori, e architettori", "Palazzo degli Uffizi"]
    },
    {
        "id": "pontormo",
        "name": "Pontormo (Jacopo Carucci)",
        "period": "Manierismo",
        "years": "1494 – 1557",
        "desc": "Pioniere del Manierismo fiorentino, ruppe gli schemi del Rinascimento classico con colori acidi, pose contorte e composizioni instabili.",
        "works": ["Deposizione di Santa Felicita", "Visitazione di Carmignano"]
    },
    {
        "id": "rosso-fiorentino",
        "name": "Rosso Fiorentino",
        "period": "Manierismo",
        "years": "1495 – 1540",
        "desc": "Esponente del Manierismo, propose un'arte drammatica e spigolosa. Fondò la Scuola di Fontainebleau in Francia.",
        "works": ["Deposizione dalla croce di Volterra", "Pietà di Fontainebleau"]
    },
    {
        "id": "agnolo-bronzino",
        "name": "Agnolo Bronzino",
        "period": "Manierismo",
        "years": "1503 – 1572",
        "desc": "Allievo del Pontormo, celebre per i suoi ritratti di corte dei Medici algidi, aristocratici, levigati e dalla raffinata freddezza metallica.",
        "works": ["Ritratto di Eleonora di Toledo col figlio Giovanni", "Allegoria del trionfo di Venere"]
    },
    {
        "id": "parmigianino",
        "name": "Parmigianino",
        "period": "Manierismo",
        "years": "1503 – 1540",
        "desc": "Rappresentante del Manierismo emiliano, caratterizzato dall'estremo allungamento delle proporzioni per ricercare un'eleganza astratta.",
        "works": ["Madonna dal collo lungo", "Autoritratto entro uno specchio convesso"]
    },
    {
        "id": "benvenuto-cellini",
        "name": "Benvenuto Cellini",
        "period": "Manierismo",
        "years": "1500 – 1571",
        "desc": "Scultore e orafo fiorentino celebre per la sua Vita autobiografica e la superba padronanza tecnica della fusione in bronzo.",
        "works": ["Perseo con la testa di Medusa", "Saliera di Francesco I"]
    },
    {
        "id": "giambologna",
        "name": "Giambologna",
        "period": "Manierismo",
        "years": "1529 – 1608",
        "desc": "Scultore fiammingo attivo a Firenze, maestro della linea serpentinata e della scultura visibile da molteplici punti di vista.",
        "works": ["Ratto delle Sabine", "Mercurio volante", "Ercole e il Centauro"]
    },

    # Barocco
    {
        "id": "caravaggio",
        "name": "Caravaggio (Michelangelo Merisi)",
        "period": "Barocco",
        "years": "1571 – 1610",
        "desc": "Rivoluzionò la pittura europea introducendo un naturalismo radicale e l'uso drammatico e morale del chiaroscuro (luce divina su sfondi bui).",
        "works": ["Vocazione di san Matteo", "La morte della Vergine", "Canestra di frutta", "David con la testa di Golia"]
    },
    {
        "id": "gian-lorenzo-bernini",
        "name": "Gian Lorenzo Bernini",
        "period": "Barocco",
        "years": "1598 – 1680",
        "desc": "Architetto e scultore supremo del Barocco, teorizzò il 'bel composto' integrando arti diverse in spettacolari scenografie spaziali.",
        "works": ["Apollo e Dafne", "Estasi di santa Teresa", "Colonnato di Piazza San Pietro"]
    },
    {
        "id": "francesco-borromini",
        "name": "Francesco Borromini",
        "period": "Barocco",
        "years": "1599 – 1667",
        "desc": "Innovatore spaziale radicale, creò architetture dinamiche basate sulla geometria complessa, l'alternanza di curve concave/convesse e lo stucco bianco.",
        "works": ["San Carlo alle Quattro Fontane", "Sant'Ivo alla Sapienza", "Galleria di Palazzo Spada"]
    },
    {
        "id": "pietro-da-cortona",
        "name": "Pietro da Cortona",
        "period": "Barocco",
        "years": "1596 – 1669",
        "desc": "Iniziatore della grande decorazione barocca ad affresco, caratterizzata da cieli aperti affollati di figure in forte movimento illusionistico.",
        "works": ["Trionfo della Divina Provvidenza (Palazzo Barberini)", "Chiesa dei Santi Luca e Martina"]
    },
    {
        "id": "annibale-carracci",
        "name": "Annibale Carracci",
        "period": "Barocco",
        "years": "1560 – 1609",
        "desc": "Fondatore dell'Accademia degli Incamminati, restaurò lo studio del vero e del classicismo raffaellesco contro le bizzarrie manieriste.",
        "works": ["Galleria Farnese (affreschi)", "Il mangiafagioli"]
    },
    {
        "id": "agostino-carracci",
        "name": "Agostino Carracci",
        "period": "Barocco",
        "years": "1557 – 1602",
        "desc": "Teorico dell'Accademia degli Incamminati, noto per le sue eccezionali doti di incisore e il rigore disegnativo.",
        "works": ["Comunione di san Girolamo", "Incisioni della Galleria Farnese"]
    },
    {
        "id": "ludovico-carracci",
        "name": "Ludovico Carracci",
        "period": "Barocco",
        "years": "1555 – 1619",
        "desc": "Cugino di Annibale e Agostino, coordinò l'Accademia degli Incamminati infondendo alle sue opere una forte carica devozionale ed emotiva.",
        "works": ["Annunciazione", "Madonna dei Bargellini"]
    },
    {
        "id": "guido-reni",
        "name": "Guido Reni",
        "period": "Barocco",
        "years": "1575 – 1642",
        "desc": "Esponente del classicismo barocco bolognese, ricercò una grazia incorporea e un ideale di bellezza pura ispirata a Raffaello.",
        "works": ["L'Aurora (Palazzo Pallavicini-Rospigliosi)", "Strage degli innocenti"]
    },
    {
        "id": "guercino",
        "name": "Guercino",
        "period": "Barocco",
        "years": "1591 – 1666",
        "desc": "Noto per la pittura macchia-tonale, i forti contrasti chiaroscurali e l'affresco dell'Aurora a Roma che contrasta con la versione classicista di Reni.",
        "works": ["L'Aurora (Casino dell'Aurora Ludovisi)", "Vestizione di san Guglielmo"]
    },
    {
        "id": "artemisia-gentileschi",
        "name": "Artemisia Gentileschi",
        "period": "Barocco",
        "years": "1593 – 1653",
        "desc": "Celebre pittrice caravaggesca, prima donna ammessa all'Accademia delle Arti del Disegno di Firenze, nota per la forza drammatica delle sue eroine.",
        "works": ["Giuditta che decapita Oloferne", "Autoritratto come allegoria della Pittura"]
    },
    {
        "id": "jusepe-de-ribera",
        "name": "Jusepe de Ribera (Lo Spagnoletto)",
        "period": "Barocco",
        "years": "1591 – 1652",
        "desc": "Pittore spagnolo attivo a Napoli, estremizzò il naturalismo caravaggesco insistendo sulla rappresentazione cruda del dolore fisico.",
        "works": ["Sileno ebbro", "Martirio di san Bartolomeo", "Lo storpio"]
    },
    {
        "id": "salvator-rosa",
        "name": "Salvator Rosa",
        "period": "Barocco",
        "years": "1615 – 1673",
        "desc": "Pittore di paesaggi selvaggi e orridi, battaglie concitate e soggetti magico-filosofici, che anticipa sensibilità romantiche.",
        "works": ["Paesaggio boscoso con filosofi", "Streghe e incantesimi"]
    },
    {
        "id": "luca-giordano",
        "name": "Luca Giordano",
        "period": "Barocco",
        "years": "1634 – 1705",
        "desc": "Celebre per la velocità esecutiva e il virtuosismo cromatico, diffuse la decorazione barocca in Italia e in Spagna.",
        "works": ["Affreschi di Palazzo Medici Riccardi", "Trionfo di Giuditta"]
    },
    {
        "id": "andrea-pozzo",
        "name": "Andrea Pozzo",
        "period": "Barocco",
        "years": "1642 – 1709",
        "desc": "Gesuita e maestro di prospettiva e quadratura, creò la più spettacolare finta architettura dipinta su soffitto piatto del Seicento.",
        "works": ["Gloria di sant'Ignazio (chiesa di Sant'Ignazio a Roma)"]
    },
    {
        "id": "giambattista-tiepolo",
        "name": "Giambattista Tiepolo",
        "period": "Barocco",
        "years": "1696 – 1770",
        "desc": "Ultimo grande decoratore monumentale veneziano, celebrò il rococò e il barocco con affreschi luminosi e cieli infiniti.",
        "works": ["Affreschi della Residenza di Würzburg", "Affreschi di Palazzo Labia"]
    },
    {
        "id": "canaletto",
        "name": "Canaletto",
        "period": "Barocco",
        "years": "1697 – 1768",
        "desc": "Massimo esponente del vedutismo veneziano, usò la camera ottica per realizzare vedute prospetticamente esatte e ricche di luce meridiana.",
        "works": ["Il Canal Grande verso Rialto", "Ritorno del Bucintoro al Molo"]
    },
    {
        "id": "francesco-guardi",
        "name": "Francesco Guardi",
        "period": "Barocco",
        "years": "1712 – 1793",
        "desc": "Vedutista veneziano, a differenza di Canaletto propose vedute soggettive, sfocate e nostalgiche, cariche di vibrazioni atmosferiche.",
        "works": ["Il bacino di San Marco con l'isola di San Giorgio"]
    },

    # Neoclassicismo
    {
        "id": "johann-joachim-winckelmann",
        "name": "Johann Joachim Winckelmann",
        "period": "Neoclassicismo",
        "years": "1717 – 1768",
        "desc": "Storico dell'arte e teorico, fondò l'archeologia moderna e codificò l'ideale neoclassico basato sulla 'nobile semplicità e quieta grandezza' greca.",
        "works": ["Storia dell'arte nell'antichità", "Pensieri sull'imitazione delle opere greche"]
    },
    {
        "id": "anton-raphael-mengs",
        "name": "Anton Raphael Mengs",
        "period": "Neoclassicismo",
        "years": "1728 – 1779",
        "desc": "Pittore e teorico tedesco, amico di Winckelmann, realizzò il dipinto manifesto del Neoclassicismo romano.",
        "works": ["Il Parnaso (Villa Albani)", "Pensieri sulla bellezza"]
    },
    {
        "id": "antonio-canova",
        "name": "Antonio Canova",
        "period": "Neoclassicismo",
        "years": "1757 – 1822",
        "desc": "Scultore neoclassico per eccellenza, noto per la levigatezza vitale del marmo finita a cera e per la ricerca della 'bellezza ideale'.",
        "works": ["Amore e Psiche giacenti", "Monumento funerario a Maria Cristina d'Austria", "Paolina Borghese come Venere Vincitrice"]
    },
    {
        "id": "jacques-louis-david",
        "name": "Jacques-Louis David",
        "period": "Neoclassicismo",
        "years": "1748 – 1825",
        "desc": "Massimo pittore neoclassico francese, unì il primato del disegno geometrico a un severo impegno morale e rivoluzionario.",
        "works": ["Il giuramento degli Orazi", "La morte di Marat", "Il Primo Console supera le Alpi al Gran San Bernardo"]
    },
    {
        "id": "jean-auguste-dominique-ingres",
        "name": "Jean-Auguste-Dominique Ingres",
        "period": "Neoclassicismo",
        "years": "1780 – 1867",
        "desc": "Custode del classicismo accademico e del disegno purista francese, unì forme neoclassiche a suggestioni esotiche.",
        "works": ["La grande odalisca", "L'apoteosi di Omero"]
    },

    # Romanticismo
    {
        "id": "theodore-gericault",
        "name": "Théodore Géricault",
        "period": "Romanticismo",
        "years": "1791 – 1824",
        "desc": "Iniziatore del Romanticismo francese, ruppe con il rigore neoclassico per esplorare la follia, il dramma reale della storia e la morte.",
        "works": ["La zattera della Medusa", "La serie dei monomaniaci"]
    },
    {
        "id": "eugene-delacroix",
        "name": "Eugène Delacroix",
        "period": "Romanticismo",
        "years": "1798 – 1863",
        "desc": "Leader della scuola romantica francese, basò la pittura sul colore vibrante e su composizioni dinamiche di forte impegno civile.",
        "works": ["La Libertà che guida il popolo", "La barca di Dante", "Massacro di Scio"]
    },
    {
        "id": "francesco-hayez",
        "name": "Francesco Hayez",
        "period": "Romanticismo",
        "years": "1791 – 1882",
        "desc": "Massimo esponente del Romanticismo storico in Italia, coniugò la precisione disegnativa veneta con forti messaggi patriottici risorgimentali.",
        "works": ["Il bacio", "I vespri siciliani", "La congiura dei Lampugnani"]
    },
    {
        "id": "caspar-david-friedrich",
        "name": "Caspar David Friedrich",
        "period": "Romanticismo",
        "years": "1774 – 1840",
        "desc": "Pittore tedesco simbolo del Sublime romantico e del rapporto mistico tra l'uomo e la natura infinita (Rückenfigur).",
        "works": ["Il viandante sul mare di nebbia", "Monaco in riva al mare", "Le scogliere di gesso di Rügen"]
    },
    {
        "id": "william-turner",
        "name": "William Turner",
        "period": "Romanticismo",
        "years": "1775 – 1851",
        "desc": "Maestro della luce e del Sublime atmosferico, portò il paesaggio romantico verso una quasi completa dissoluzione astratta dell'immagine.",
        "works": ["Pioggia, vapore e velocità", "Il naufragio della Minotauro", "Luce e colore (la teoria di Goethe)"]
    },
    {
        "id": "john-constable",
        "name": "John Constable",
        "period": "Romanticismo",
        "years": "1776 – 1837",
        "desc": "Pittore inglese dedito alla rappresentazione intima, serena e profondamente naturale della campagna inglese, in contrasto con il Sublime di Turner.",
        "works": ["Il carro da fieno", "La cattedrale di Salisbury vista dai prati"]
    },

    # Realismo
    {
        "id": "gustave-courbet",
        "name": "Gustave Courbet",
        "period": "Realismo",
        "years": "1819 – 1877",
        "desc": "Padre del Realismo pittorico, rifiutò i soggetti storici e ideali per ritrarre con dignità monumentale la verità quotidiana e i lavoratori.",
        "works": ["Gli spaccapietre", "Un funerale a Ornans", "L'atelier del pittore"]
    },
    {
        "id": "jean-francois-millet",
        "name": "Jean-François Millet",
        "period": "Realismo",
        "years": "1814 – 1875",
        "desc": "Esponente della Scuola di Barbizon, ritrasse la fatica quotidiana e la spiritualità solenne della vita contadina.",
        "works": ["L'Angelus", "Le spigolatrici"]
    },
    {
        "id": "honore-daumier",
        "name": "Honoré Daumier",
        "period": "Realismo",
        "years": "1808 – 1879",
        "desc": "Pittore, scultore e caricaturista francese, noto per le sue taglienti satire politiche e la denuncia sociale realista.",
        "works": ["Vagone di terza classe", "Gargantua (litografia)"]
    },
    {
        "id": "camille-corot",
        "name": "Camille Corot",
        "period": "Realismo",
        "years": "1796 – 1875",
        "desc": "Paesaggista cardine tra la tradizione neoclassica e il realismo della Scuola di Barbizon, anticipò lo studio della luce impressionista.",
        "works": ["Il ponte di Narni", "Ricordo di Mortefontaine"]
    },

    # Impressionismo
    {
        "id": "edouard-manet",
        "name": "Édouard Manet",
        "period": "Impressionismo",
        "years": "1832 – 1883",
        "desc": "Precursore e guida intellettuale dell'Impressionismo, scosse il mondo accademico eliminando il chiaroscuro a favore di campiture di colore piatte.",
        "works": ["Colazione sull'erba (Déjeuner sur l'herbe)", "Olympia", "Il bar delle Folies-Bergère"]
    },
    {
        "id": "claude-monet",
        "name": "Claude Monet",
        "period": "Impressionismo",
        "years": "1840 – 1926",
        "desc": "Padre dell'Impressionismo en plein air, dedicò la vita allo studio della percezione dell'attimo luminoso e alle variazioni della luce in serie pittoriche.",
        "works": ["Impressione, sole nascente", "La serie delle Cattedrali di Rouen", "I covoni", "Le Ninfee"]
    },
    {
        "id": "pierre-auguste-renoir",
        "name": "Pierre-Auguste Renoir",
        "period": "Impressionismo",
        "years": "1841 – 1919",
        "desc": "Esponente dell'Impressionismo dedito alla resa della gioia di vivere parigina, della luce filtrata dal fogliame e della morbidezza carnale.",
        "works": ["Bal au moulin de la Galette", "La colazione dei canottieri"]
    },
    {
        "id": "edgar-degas",
        "name": "Edgar Degas",
        "period": "Impressionismo",
        "years": "1834 – 1917",
        "desc": "A differenza dei colleghi, dipinse prevalentemente in studio focalizzandosi sul movimento del corpo (ballerine) e su tagli fotografici insoliti.",
        "works": ["La classe di danza", "L'assenzio", "La tinozza"]
    },
    {
        "id": "camille-pissarro",
        "name": "Camille Pissarro",
        "period": "Impressionismo",
        "years": "1830 – 1903",
        "desc": "Unico pittore a partecipare a tutte e otto le mostre impressioniste, fu mentore di Cézanne e Gauguin ed esplorò paesaggi rurali e urbani.",
        "works": ["I tetti rossi", "Boulevard Montmartre di notte"]
    },
    {
        "id": "alfred-sisley",
        "name": "Alfred Sisley",
        "period": "Impressionismo",
        "years": "1839 – 1899",
        "desc": "Dedito quasi esclusivamente al paesaggio en plein air puro, celebre per la sensibilità nel dipingere cieli ed effetti dell'acqua.",
        "works": ["Inondazione a Port-Marly", "Il sentiero della Machine a Louveciennes"]
    },

    # Post-Impressionismo
    {
        "id": "paul-cezanne",
        "name": "Paul Cézanne",
        "period": "Post-Impressionismo",
        "years": "1839 – 1906",
        "desc": "Superò l'Impressionismo ricercando la solidità delle forme attraverso la scomposizione geometrica in cilindri, coni e sfere, preparando la strada al Cubismo.",
        "works": ["I giocatori di carte", "La montagna Sainte-Victoire", "Le grandi bagnanti"]
    },
    {
        "id": "georges-seurat",
        "name": "Georges Seurat",
        "period": "Post-Impressionismo",
        "years": "1859 – 1891",
        "desc": "Inventore del Pointillisme (Puntinismo), strutturò la pittura su base scientifica accostando puntini di colori puri accostati per contrasto ottico.",
        "works": ["Una domenica pomeriggio sull'isola della Grande Jatte", "Un bagno ad Asnières"]
    },
    {
        "id": "paul-gauguin",
        "name": "Paul Gauguin",
        "period": "Post-Impressionismo",
        "years": "1848 – 1903",
        "desc": "Rifiutò la civiltà occidentale approdando a Tahiti per dipingere tele basate sul cloisonnisme (campiture piatte bordate) e su un intenso sintetismo simbolico.",
        "works": ["Da dove veniamo? Chi siamo? Dove andiamo?", "Il Cristo giallo"]
    },
    {
        "id": "vincent-van-gogh",
        "name": "Vincent van Gogh",
        "period": "Post-Impressionismo",
        "years": "1853 – 1890",
        "desc": "Genio tormentato, caricò il colore e la pennellata materica di una fortissima valenza emotiva e psicologica, ponendosi come padre dell'Espressionismo.",
        "works": ["La notte stellata", "I mangiatori di patate", "Girasoli", "Campo di grano con volo di corvi"]
    },
    {
        "id": "henri-de-toulouse-lautrec",
        "name": "Henri de Toulouse-Lautrec",
        "period": "Post-Impressionismo",
        "years": "1864 – 1901",
        "desc": "Ritrasse la vita notturna di Montmartre e dei cabaret parigini, elevando il manifesto pubblicitario cartellonistico ad arte d'avanguardia.",
        "works": ["Al Moulin Rouge", "Manifesto di Moulin Rouge: La Goulue"]
    },
    {
        "id": "paul-signac",
        "name": "Paul Signac",
        "period": "Post-Impressionismo",
        "years": "1863 – 1935",
        "desc": "Principale compagno di Seurat, sviluppò e teorizzò il divisionismo applicandolo a paesaggi marini dai colori accesi.",
        "works": ["Il castello dei Papi ad Avignone", "Ritratto di Felix Feneon"]
    }
]

# Style descriptions for movements to render high quality summaries
movement_styles = {
    "Gotico Internazionale": [
        "Linea sinuosa, fluida ed elegante, che definisce sagome flessuose senza preoccuparsi del rigore prospettico.",
        "Ricchezza decorativa estrema: motivi floreali, trame dorate, armature lucenti e ambientazioni cortesi.",
        "Un gusto fiabesco e idealizzato per soggetti sia sacri che profani, con disinteresse per il realismo spaziale."
    ],
    "Primo Rinascimento": [
        "Definizione prospettica dello spazio in base a regole geometriche e matematiche razionali (Brunelleschi).",
        "Studio anatomico realistico, proporzione a misura d'uomo e recupero consapevole degli ordini classici antichi.",
        "Rilievo plastico e chiaroscuro per conferire peso fisico ed emotività alle figure umane."
    ],
    "Secondo Quattrocento": [
        "Diffusione dei modelli umanistici e rinascimentali nelle grandi corti principesche italiane (Urbino, Mantova, Ferrara).",
        "Integrazione della luce come elemento intellettuale e chiarificatore dei volumi geometrici (Piero della Francesca).",
        "Sperimentazioni prospettiche e illusionistiche estreme (Mantegna) ed eleganza allegorica neoplatonica (Botticelli)."
    ],
    "Rinascimento Maturo": [
        "Monumentalità espressiva e perfetto equilibrio classico delle proporzioni (Raffaello).",
        "Introduzione dello sfumato leonardesco e della prospettiva aerea per fondere le figure con l'atmosfera circostante.",
        "Studio visivo dinamico e drammatico dell'anatomia e la poetica del non-finito (Michelangelo)."
    ],
    "Rinascimento Veneto": [
        "Colorito tonale: le forme sono costruite stendendo direttamente il colore, definendo i volumi con la luce calda.",
        "Integrazione e fusione intima tra i personaggi umani e il paesaggio naturale circostante.",
        "Stile tardo con stesura materica e disgregata (Tiziano) in cui i contorni sfumano del tutto."
    ],
    "Manierismo": [
        "Rottura delle regole classiche rinascimentali di armonia, simmetria e verosimiglianza.",
        "Uso della linea serpentinata con proporzioni allungate all'estremo per un'eleganza sofisticata.",
        "Cromatismo insolito con colori acidi, cangianti e contrastanti."
    ],
    "Barocco": [
        "Coinvolgimento sensoriale dello spettatore attraverso la drammaticità, il dinamismo e la teatralità delle scene.",
        "Poetica del 'bel composto': fusione integrata di scultura, pittura e architettura in un'unica scenografia.",
        "Chiaroscuro violento e luce morale (Caravaggio) o spettacolari scorci prospettici aerei (quadratura)."
    ],
    "Neoclassicismo": [
        "Recupero del classicismo greco e romano in opposizione agli eccessi decorativi del Barocco e del Rococò.",
        "Bello ideale winckelmanniano caratterizzato da nobile semplicità, quieta grandezza ed equilibrio etico.",
        "Primato del disegno nitido, contorni puliti e colori puri e ordinati."
    ],
    "Romanticismo": [
        "Primato del sentimento, dell'emozione interiore e della fantasia individuale.",
        "Sentimento del Sublime: la piccolezza dell'uomo di fronte a una natura infinitamente grande o tempestosa.",
        "Attenzione alla storia contemporanea, con composizioni dinamiche e uso emotivo del colore."
    ],
    "Realismo": [
        "Rifiuto totale di soggetti mitologici, accademici o storici idealizzati.",
        "Raffigurazione scientifica e veritiera della realtà quotidiana, della povertà e del lavoro contadino.",
        "Resa pittorica sincera e immediata, senza edulcorazioni estetiche."
    ],
    "Impressionismo": [
        "Pittura all'aria aperta (en plein air) per catturare gli effetti atmosferici e l'istantanea fuggevolezza della luce.",
        "Accostamento di colori puri direttamente sulla tela, abolizione del nero e uso di ombre colorate.",
        "Inquadrature asimmetriche e dinamiche di derivazione fotografica e giapponese."
    ],
    "Post-Impressionismo": [
        "Superamento della transitorietà ottica impressionista per ricercare una solidità strutturale permanente.",
        "Scomposizione geometrica razionale (Cézanne) o scomposizione scientifica a puntini (Pointillisme di Seurat).",
        "Uso soggettivo ed espressionista del colore e della linea per esprimere tensioni interiori (Van Gogh, Gauguin)."
    ]
}

os.makedirs("summaries", exist_ok=True)

print("Starting scored auto-generation of CLEAN summaries...")

for artist in artists:
    name = artist["name"]
    artist_id = artist["id"]
    period = artist["period"]
    years = artist["years"]
    desc = artist["desc"]
    works = artist["works"]
    
    # Get movement characteristics
    styles = movement_styles.get(period, [
        "Sviluppo formale ed espressivo caratteristico dell'epoca.",
        "Ricerca del superamento dei modelli precedenti.",
        "Uso della luce e del disegno tipico delle scuole d'appartenenza."
    ])
    
    # Render styles bullet list
    styles_list_html = "\n".join([f"*   **{style.split(':')[0]}**: {style.split(':')[1] if ':' in style else style}" for style in styles])
    
    # Render works list
    works_list_html = ""
    for w in works:
        works_list_html += f"### 🖼️ Opera Chiave: *{w}*\n"
        works_list_html += f"Rappresenta uno dei cardini dello studio di {name}. L'analisi si concentra sulla composizione prospettica, sulla stesura cromatica e sull'innovazione formale rispetto ai contemporanei.\n\n"

    # Clean formatted MD file (concise, bulleted, highly readable, NO OCR junk)
    md_content = f"""# Focus Artista: {name} ({years})

*   **Periodo/Movimento**: {period}
*   **Stato**: Sintesi Concettuale dei Punti Focali

---

## 📌 Punti Focali dell'Artista

### 1. Profilo e Contributo
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

**2. Quali sono gli estremi cronologici attribuiti a {name}?**
* a) 1500 – 1550.
* b) {years}.
* c) 1780 – 1830.
* *Risposta corretta: b*

**3. Qual è l'elemento centrale dell'analisi critica delle sue opere?**
* a) La scomposizione cubista totale.
* b) La combinazione tra stesura tecnica dell'epoca e innovazione proporzionale/cromatica.
* c) L'uso esclusivo del carboncino.
* *Risposta corretta: b*
"""

    file_path = f"summaries/focus_{artist_id}.md"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(md_content)

print("Finished clean generation of all artist focus summaries.")
