/* CENTRALIZED QUIZ DATABASE - LEX STUDIORUM */

const quizDatabase = {
    // DIRITTO DEI BENI CULTURALI
    fonti_tutela: {
        subject: "diritto",
        chapterTag: "Modulo I",
        title: "Fonti, Organizzazione e Tutela",
        questions: [
            {
                question: "Quale trattato internazionale, ratificato dall'Italia nel 2020, ha sancito il passaggio dal \"diritto del patrimonio culturale\" (tutela dell'oggetto) al \"diritto al patrimonio culturale\" (diritto della persona e della collettività)?",
                options: [
                    "La Convenzione Europea del Paesaggio (Firenze, 2000).",
                    "La Convenzione di Faro (Consiglio d'Europa, 2005).",
                    "La Convenzione UNIDROIT (Roma, 1995).",
                    "La Convenzione UNESCO di Parigi (1970)."
                ],
                correctIndex: 1,
                explanation: "La Convenzione di Faro sposta il baricentro dell'azione di tutela sul rapporto uomo-patrimonio, inteso come risorsa per lo sviluppo umano, il dialogo interculturale, la coesione sociale e il benessere democratico dei cittadini."
            },
            {
                question: "Nell'organizzazione periferica del Ministero della Cultura (MiC), quale organo esercita concretamente le funzioni di tutela e vigilanza sui beni culturali in un determinato ambito territoriale?",
                options: [
                    "Il Segretariato Regionale.",
                    "La Soprintendenza Archeologia, Belle Arti e Paesaggio.",
                    "La Direzione Regionale Musei.",
                    "La Commissione Regionale per il Patrimonio Culturale."
                ],
                correctIndex: 1,
                explanation: "Le Soprintendenze sono organi tecnico-scientifici periferici del MiC incaricati della tutela dei beni storico-artistici, archeologici e paesaggistici sul territorio di competenza, mediante ispezioni, approvazione di progetti di restauro e ordini di sospensione di lavori non autorizzati."
            },
            {
                question: "Per i beni appartenenti a enti pubblici o persone giuridiche private senza fine di lucro (es. enti ecclesiastici), aventi più di 70 anni e opera di autore non vivente, quale regime si applica provvisoriamente prima della verifica formale?",
                options: [
                    "Sono considerati beni privati di libero commercio.",
                    "Sono tutelati provvisoriamente in virtù della presunzione di interesse culturale (Art. 12 del Codice).",
                    "Entrano direttamente a far parte del patrimonio disponibile dello Stato.",
                    "Sono soggetti a sdemanializzazione automatica decorsi 90 giorni."
                ],
                correctIndex: 1,
                explanation: "In virtù dell'Articolo 12 del Codice, i beni mobili e immobili ultra-settantennali e di autore non vivente di proprietà pubblica o ecclesiastica sono protetti provvisoriamente 'ope legis' finché non si effettua la verifica di interesse. Solo in caso di esito negativo escono dal campo d'applicazione della tutela."
            },
            {
                question: "Quale Convenzione internazionale disciplina la restituzione dei beni culturali rubati o illecitamente esportati, ponendo a carico dell'acquirente l'obbligo di diligenza al momento dell'acquisto per poter pretendere un indennizzo?",
                options: [
                    "La Convenzione dell'Aja del 1954.",
                    "La Convenzione UNESCO del 1970.",
                    "La Convenzione UNIDROIT (Roma, 1995).",
                    "La Convenzione di Faro del 2005."
                ],
                correctIndex: 2,
                explanation: "La Convenzione UNIDROIT del 1995 (operante sul piano civilistico del commercio privatistico) impone regole rigorose di buona fede e diligenza dell'acquirente all'atto dell'acquisto. Chi acquista un bene rubato è costretto a restituirlo e riceve un indennizzo equo solo se prova di aver svolto opportune indagini sulla provenienza."
            },
            {
                question: "Secondo l'Articolo 29 del Codice dei Beni Culturali, in quali tre fasi operative si articola l'attività di \"conservazione\" del patrimonio?",
                options: [
                    "Censimento, catalogazione e restauro.",
                    "Prevenzione, manutenzione e restauro.",
                    "Vigilanza, ispezione e ripristino.",
                    "Tutela, valorizzazione ed espropriazione."
                ],
                correctIndex: 1,
                explanation: "L'Art. 29 c.1 definisce la conservazione come attività coordinata e programmata che si realizza attraverso: 1. la Prevenzione (limitazione dei rischi di deterioramento ambientale); 2. la Manutenzione (interventi per mantenere l'efficienza funzionale); 3. il Restauro (intervento diretto sul bene per ripristinarne l'integrità)."
            },
            {
                question: "In base all'Articolo 91 del Codice, a chi appartengono per legge le cose d'interesse archeologico da chiunque e in qualunque modo ritrovate nel sottosuolo o sui fondali marini italiani?",
                options: [
                    "Al proprietario del terreno in cui si effettua il ritrovamento.",
                    "Allo Stato (demanio originario).",
                    "In parti uguali allo scopritore fortuito e al proprietario del fondo.",
                    "Al primo che ne prenda possesso materiale (diritto di occupazione)."
                ],
                correctIndex: 1,
                explanation: "Tutte le cose d'interesse archeologico, da chiunque e ovunque ritrovate, appartengono ab origine allo Stato. È nullo qualsiasi patto contrario. Lo scopritore fortuito e il proprietario dell'immobile hanno diritto solo a un premio di ritrovamento che può giungere fino al 25% del valore dei beni rinvenuti."
            }
        ]
    },
    gestione_sanzioni: {
        subject: "diritto",
        chapterTag: "Modulo II",
        title: "Circolazione, Gestione e Sanzioni",
        questions: [
            {
                question: "Entro quanti giorni il Ministero della Cultura può esercitare il diritto di prelazione artistica sull'acquisto di un bene culturale vincolato alienato a titolo oneroso?",
                options: [
                    "Entro 30 giorni dalla stipula dell'alienazione.",
                    "Entro 60 giorni dalla ricezione della formale denuncia di trasferimento (Art. 60).",
                    "Entro 90 giorni dalla trascrizione dell'atto nei registri pubblici.",
                    "Entro 120 giorni dal compimento del rogito."
                ],
                correctIndex: 1,
                explanation: "L'Art. 60 del Codice stabilisce che il MiC (o le Regioni ed Enti locali a cui il Ministero deleghi la facoltà) ha il diritto di acquistare in prelazione il bene alienato a titolo oneroso, allo stesso prezzo indicato nell'atto di compravendita, entro il termine perentorio di 60 giorni dalla denuncia del trasferimento."
            },
            {
                question: "Nel settore dei beni culturali, qual è la principale differenza formale e causale tra una sponsorizzazione e una concessione d'uso?",
                options: [
                    "La sponsorizzazione non prevede alcun corrispettivo a carico del privato.",
                    "La sponsorizzazione è un contratto a prestazioni corrispettive volto ad associare il marchio del privato al bene (con finalità promozionali), mentre la concessione trasferisce a terzi l'uso o la gestione materiale dello spazio.",
                    "La concessione d'uso è un provvedimento gratuito riservato a enti no-profit.",
                    "La sponsorizzazione si applica solo a mostre temporanee, la concessione solo a beni immobili."
                ],
                correctIndex: 1,
                explanation: "La sponsorizzazione (Art. 120) associa il logo/marchio di un privato a un intervento sul patrimonio culturale a scopo pubblicitario. La concessione d'uso (Art. 106) consente invece il godimento temporaneo, esclusivo o parziale, di spazi del demanio culturale (es. eventi privati in castelli o musei) in cambio del pagamento di un canone d'uso."
            },
            {
                question: "In quale tipo di espropriazione disciplinata dal Codice lo Stato acquisisce aree o edifici vicini a un bene culturale per garantirne la luce, la prospettiva o la dignità monumentale?",
                options: [
                    "Espropriazione diretta del bene culturale.",
                    "Espropriazione per fini di scavo archeologico.",
                    "Espropriazione strumentale (Art. 96).",
                    "Espropriazione per pubblica utilità generica."
                ],
                correctIndex: 2,
                explanation: "L'espropriazione strumentale ex Art. 96 consente di espropriare edifici o terreni adiacenti al bene culturale non per acquisire il bene in sé, ma per migliorarne la fruizione pubblica, garantirne la conservazione isolandolo da fonti di degrado o assicurarne condizioni di luce e prospettiva."
            },
            {
                question: "Quale incentivo fiscale, introdotto nel 2014, consente un credito d'imposta del 65% per le erogazioni liberali effettuate da privati a sostegno del restauro o della valorizzazione di beni culturali pubblici?",
                options: [
                    "Il Tax Credit per il patrimonio storico.",
                    "L'Art Bonus (D.L. 83/2014).",
                    "Il Superbonus per i beni storici vincolati.",
                    "La Detrazione IRPEF ordinaria del 19%."
                ],
                correctIndex: 1,
                explanation: "L'Art Bonus è una delle misure di mecenatismo culturale più vantaggiose in Europa. Consente a imprese e cittadini di beneficiare di un credito d'imposta pari al 65% delle somme donate a favore del patrimonio pubblico (es. manutenzione monumenti, musei, fondazioni lirico-sinfoniche)."
            },
            {
                question: "In base all'Articolo 146 del Codice, l'autorizzazione paesaggistica richiesta per interventi su aree sottoposte a vincolo paesaggistico ha natura:",
                options: [
                    "Di provvedimento autonomo e preliminare rispetto al rilascio del titolo edilizio (es. permesso di costruire).",
                    "Di parere consultivo non vincolante da parte del Soprintendente.",
                    "Di atto successivo che può essere sanato in via ordinaria post-operam.",
                    "Di nulla osta tacito soggetto al principio del silenzio-assenso tra pubbliche amministrazioni."
                ],
                correctIndex: 0,
                explanation: "L'autorizzazione paesaggistica è un atto presupposto, autonomo e preliminare rispetto a qualsiasi titolo abilitativo edilizio. Essa accerta la compatibilità paesaggistica dell'intervento, dura 5 anni e non può essere rilasciata in sanatoria a lavori ultimati (salvo ristrettissime ipotesi ex Art. 167)."
            },
            {
                question: "La riforma del 2022 (Legge 22/2022) ha introdotto nel Codice Penale un intero Titolo (VIII-bis) dedicato ai delitti contro il patrimonio culturale. Quale tra i seguenti costituisce un effetto di questa riforma?",
                options: [
                    "La depenalizzazione dei reati minori di deturpamento artistico.",
                    "La trasposizione di tutti i delitti penali all'interno del Codice dei Beni Culturali (D.Lgs. 42/2004).",
                    "La creazione di fattispecie autonome e aggravate come il furto di beni culturali (Art. 518-bis c.p.) e il danneggiamento o deturpamento specifico (Art. 518-duodecies c.p.) con pene severamente aumentate.",
                    "L'abolizione dell'arresto per le ricerche archeologiche clandestine."
                ],
                correctIndex: 2,
                explanation: "La riforma ha colmato un vuoto normativo inserendo nel Codice Penale delitti specifici contro il patrimonio artistico. In precedenza si applicavano i reati comuni di furto o danneggiamento. Oggi il furto di beni culturali (Art. 518-bis c.p.) e il danneggiamento specifico (Art. 518-duodecies c.p.) sono delitti autonomi gravemente puniti."
            }
        ]
    },

    // STORIA DELL'ARTE MODERNA
    origini: {
        subject: "arte",
        chapterTag: "Studio I",
        title: "Origini e Gotico Internazionale",
        questions: [
            {
                question: "Quale caratteristica distingue principalmente lo stile tardogotico o cortese dal primo Rinascimento?",
                options: [
                    "L'applicazione rigida della prospettiva geometrica a griglia.",
                    "L'evasione fiabesca, l'eleganza lineare e la ricchezza di dettagli ornamentali a scapito della tridimensionalità razionale.",
                    "L'uso esclusivo di colori freddi e sbiaditi senza sfumature d'oro.",
                    "La rimozione assoluta di ogni riferimento a soggetti naturali o animali."
                ],
                correctIndex: 1,
                explanation: "Il Gotico Internazionale (o cortese) predilige l'eleganza astratta della linea, la decorazione sfarzosa e gli elementi fiabeschi aristrocratici, senza curarsi del rigore prospettico o della plasticità dei corpi caratteristici del Rinascimento."
            },
            {
                question: "In quale opera di Gentile da Fabriano l'oro viene lavorato in pastiglia a rilievo per rendere tridimensionali i particolari di armi e vesti?",
                options: [
                    "Nel Polittico Quaratesi.",
                    "Nell'affresco di San Giorgio e la principessa.",
                    "Nell'Adorazione dei Magi (1423).",
                    "Nella Maestà degli Uffizi."
                ],
                correctIndex: 2,
                explanation: "Nell'Adorazione dei Magi, commissionata da Palla Strozzi, Gentile utilizza la tecnica della pastiglia dorata lavorata a rilievo per far risaltare sotto la luce le corone, le spade e le bardature dei cavalli della grandiosa sfilata dei Magi."
            },
            {
                question: "Qual era la funzione della tavoletta forata nel primo esperimento prospettico di Brunelleschi sul Battistero?",
                options: [
                    "Filtrare la luce solare per accecare temporaneamente l'osservatore.",
                    "Costringere l'osservatore a guardare dal retro tenendo uno specchio di fronte al dipinto, dimostrando che il punto di fuga coincideva geometricamente con la vista dell'edificio reale.",
                    "Consentire di spiare le persone all'interno del Battistero.",
                    "Creare un effetto ottico di zoom tridimensionale."
                ],
                correctIndex: 1,
                explanation: "Praticando un foro svasato in corrispondenza del punto di fuga sul dipinto, l'osservatore accostava l'occhio sul retro e regolava uno specchio di fronte ad esso: l'immagine riflessa coincideva perfettamente con l'edificio reale retrostante, validando scientificamente la prospettiva."
            },
            {
                question: "Quale celebre opera di Pisanello unisce il crudo realismo anatomico di due impiccati sullo sfondo all'eleganza araldica di una principessa?",
                options: [
                    "L'Adorazione dei Magi.",
                    "Il ritratto di Leonello d'Este.",
                    "San Giorgio e la principessa nella chiesa di Sant'Anastasia a Verona.",
                    "Il monumento equestre al Gattamelata."
                ],
                correctIndex: 2,
                explanation: "L'affresco di San Giorgio e la principessa di Pisanello unisce la dimensione fiabesca della principessa vestita di broccato al realismo macabro di due cadaveri penzolanti sulla forca in lontananza."
            },
            {
                question: "In geometria prospettica, come viene definita la linea su cui giace sempre il punto di fuga?",
                options: [
                    "La linea di terra.",
                    "La linea dell'orizzonte.",
                    "La retta di proiezione.",
                    "L'asse di scomposizione."
                ],
                correctIndex: 1,
                explanation: "La linea dell'orizzonte, collocata all'altezza dell'occhio ideale dello spettatore, ospita sempre il punto di fuga verso cui convergono tutte le rette perpendicolari al quadro prospettico."
            }
        ]
    },
    fondatori: {
        subject: "arte",
        chapterTag: "Studio II",
        title: "I Padri Fondatori",
        questions: [
            {
                question: "Per quale motivo la muratura a spina di pesce concepita da Brunelleschi era fondamentale per la Cupola?",
                options: [
                    "Per dare un aspetto estetico geometrico alle pareti interne.",
                    "Perché i mattoni posti verticalmente a intervalli regolari bloccavano le file orizzontali, scaricando il peso sui costoloni e rendendo la struttura autoportante durante l'asciugatura.",
                    "Per evitare infiltrazioni d'acqua all'interno dell'intercapedine.",
                    "Per nascondere l'utilizzo di materiali di scarsa qualità."
                ],
                correctIndex: 1,
                explanation: "La disposizione a 'spina di pesce' (opus spicatum) consentiva alla muratura di sostenersi da sola durante la costruzione senza bisogno di centine di legno, scaricando i carichi di compressione verso gli otto angoli della cupola."
            },
            {
                question: "Quale tecnica plastica è stata inventata da Donatello per suggerire la profondità atmosferica in bassorilievi di pochissimi millimetri?",
                options: [
                    "La scultura a tuttotondo.",
                    "Lo stiacciato (o schiacciato).",
                    "Il bassorilievo a cera persa.",
                    "L'intaglio ad altorilievo."
                ],
                correctIndex: 1,
                explanation: "Lo stiacciato consiste nel modellare il rilievo riducendone progressivamente l'altezza in millimetri man mano che ci si allontana nello spazio, simulando l'effetto ottico della sfocatura atmosferica pittorica."
            },
            {
                question: "In quale opera Masaccio realizza l'illusione tridimensionale di una cappella classica voltata a botte?",
                options: [
                    "Il Polittico di Pisa.",
                    "L'affresco del Tributo.",
                    "La Trinità in Santa Maria Novella.",
                    "La Madonna del solletico."
                ],
                correctIndex: 2,
                explanation: "Nella Trinità, Masaccio dipinge una finta cappella rinascimentale coperta da una volta a botte lacunata, talmente precisa da far supporre che la griglia prospettica sia stata calcolata direttamente con l'aiuto di Brunelleschi."
            },
            {
                question: "Nel dipinto del Tributo di Masaccio nella Cappella Brancacci, da quale direzione proviene la luce e perché?",
                options: [
                    "Da sinistra, per evidenziare la figura del gabelliere.",
                    "Proviene dal volto di Cristo, inteso come fonte di luce mistica autonoma.",
                    "Da destra, coerentemente con la posizione della finestra reale all'interno della cappella, proiettando ombre reali.",
                    "Dall'alto, come una luce zenitale diffusa e priva di ombre portate."
                ],
                correctIndex: 2,
                explanation: "Masaccio uniforma la luce dei suoi affreschi basandosi sull'effettivo posizionamento della finestra reale della cappella, facendo sì che le ombre nel quadro cadano coerentemente con la luce naturale della stanza."
            },
            {
                question: "Quale importante differenza stilistica e drammatica separa la Cacciata dall'Eden di Masaccio dalla Tentazione di Masolino?",
                options: [
                    "Masaccio dipinge i corpi fluttuanti e privi di gravità.",
                    "Masaccio esprime un dolore tragico reale, con Adamo che si copre il volto vergognoso ed Eva che urla disperata, con i piedi che poggiano saldamente sul suolo proiettando ombre scure.",
                    "Masolino usa colori molto più cupi e drammatici rispetto a Masaccio.",
                    "Masaccio si limita a copiare le figure bizantine piatte e prive di volume."
                ],
                correctIndex: 1,
                explanation: "Mentre Masolino dipinge Adamo ed Eva in posa elegante e decorativa, Masaccio toglie i filtri tardogotici e ritrae la disperazione cruda dei progenitori, dandogli un peso fisico reale e una profonda indagine psicologica."
            }
        ]
    },
    esperienze: {
        subject: "arte",
        chapterTag: "Studio III",
        title: "La Stagione delle Esperienze",
        questions: [
            {
                question: "Quale soluzione geometrico-decorativa adotta Alberti sulla facciata di Santa Maria Novella per unire la navata centrale e le navate laterali?",
                options: [
                    "Un portico sporgente ad arcate cieche.",
                    "Due grandi volute laterali decorate con motivi marmorei geometrici.",
                    "Due torri gotiche campanarie simmetriche.",
                    "Un frontone triangolare greco sovrapposto."
                ],
                correctIndex: 1,
                explanation: "Le volute (o raccordi ad S) create da Alberti in Santa Maria Novella divennero lo standard architettonico classico per connettere elegantemente le altezze disuguali tra la navata centrale alta e quelle laterali basse."
            },
            {
                question: "Qual è il significato teologico dell'uovo di struzzo che pende dall'abside della Pala di Brera di Piero della Francesca?",
                options: [
                    "È un semplice elemento decorativo e simbolico della passione di Sigismondo Malatesta per l'esotico.",
                    "Rappresenta la Creazione universale, la nascita verginale di Maria e fa riferimento al casato del duca Federico da Montefeltro.",
                    "Simboleggia la fragilità del potere temporale dei papi.",
                    "Indica il punto esatto in cui scavare per trovare le reliquie del Santo."
                ],
                correctIndex: 1,
                explanation: "L'uovo di struzzo appeso alla conchiglia è un simbolo mariano di nascita miracolosa (secondo la leggenda medievale lo struzzo cova le uova con il solo calore del sole), allude alla Verginità di Maria e richiama lo stemma dei Montefeltro."
            },
            {
                question: "Chi sono le tre fanciulle danzanti ritratte sulla sinistra nella Primavera di Botticelli?",
                options: [
                    "Le tre Moire o Parche.",
                    "Flora, Clori e Venere.",
                    "Le Tre Grazie (simbolo neoplatonico di liberalità e bellezza).",
                    "Le tre figlie predilette di Lorenzo il Magnifico."
                ],
                correctIndex: 2,
                explanation: "Le Tre Grazie, vestite di veli trasparenti mentre intrecciano le dita in una danza rituale, rappresentano le tre declinazioni neoplatoniche dell'amore e della grazia."
            },
            {
                question: "In quale opera Andrea Mantegna realizza il celebre oculo illusionistico che apre il soffitto verso il cielo?",
                options: [
                    "Nel Polittico di San Zeno a Verona.",
                    "Nel San Sebastiano di Vienna.",
                    "Nella Camera degli Sposi nel Palazzo Ducale di Mantova.",
                    "Nel transetto della Basilica di Sant'Andrea."
                ],
                correctIndex: 2,
                explanation: "La Camera degli Sposi (fatta per Ludovico III Gonzaga) presenta sul soffitto un finto oculo dipinto in prospettiva dal basso verso l'alto ('sotto in su') che simula un'apertura reale verso il cielo."
            },
            {
                question: "Perché nel Cristo Morto di Brera Andrea Mantegna riduce le dimensioni dei piedi della salma?",
                options: [
                    "Per un errore prospettico generato da un difetto di calcolo delle rette di fuga.",
                    "Per motivi espressivi ed estetici, evitando che i piedi in primo piano risultassero troppo grandi nascondendo la vista del corpo di Cristo.",
                    "Perché il marmo su cui dipingeva era troppo corto.",
                    "Per rispettare la corporatura esile del modello reale."
                ],
                correctIndex: 1,
                explanation: "Mantegna applica una deroga intenzionale alle regole prospettiche: se avesse mantenuto la proporzione geometrica pura, i piedi di Cristo sarebbero risultati enormi in primo piano, rovinando la visione della cassa toracica e del volto piangente."
            }
        ]
    },
    maturo: {
        subject: "arte",
        chapterTag: "Studio IV",
        title: "Il Rinascimento Maturo",
        questions: [
            {
                question: "Quale importante innovazione visiva caratterizza la Vergine delle Rocce di Leonardo da Vinci?",
                options: [
                    "La stesura della prospettiva centrale pura senza ombre.",
                    "L'uso dello sfumato per fondere i contorni delle figure con le ombre umide della grotta e la prospettiva aerea sullo sfondo.",
                    "La scomposizione geometrica cubista dei corpi.",
                    "Il recupero delle aureole d'oro zecchino medievali."
                ],
                correctIndex: 1,
                explanation: "La Vergine delle Rocce è un capolavoro dello sfumato leonardesco: i confini tra i volti dei santi e la roccia umida sfumano dolcemente, integrando perfettamente l'uomo nell'ambiente naturale."
            },
            {
                question: "Per quale motivo la pittura del Cenacolo di Leonardo cominciò a deteriorarsi già pochi anni dopo il completamento?",
                options: [
                    "Perché i monaci lavarono la parete con detergenti aggressivi.",
                    "Perché Leonardo dipinse a tempera grassa su intonaco asciutto invece di usare la tradizionale pittura ad affresco.",
                    "Perché l'umidità del refettorio fece crollare l'intero muro portante.",
                    "A causa del fumo delle cucine dei frati domenicani."
                ],
                correctIndex: 1,
                explanation: "Leonardo, desiderando lavorare con tempi lunghi per correggere e sfumare i dettagli, utilizzò una tecnica sperimentale su muro asciutto, incompatibile con l'umidità della parete del refettorio, causando screpolature precoci."
            },
            {
                question: "Quale momento drammatico e psicologico coglie Michelangelo Buonarroti nel David?",
                options: [
                    "La gioia successiva all'uccisione di Golia.",
                    "La fatica fisica durante la corsa con la fionda in mano.",
                    "L'attimo di massima tensione concentrata fisica e mentale prima dello scontro, con lo sguardo fiero e muscoli contratti.",
                    "La rassegnazione morale di fronte alla superiorità nemica."
                ],
                correctIndex: 2,
                explanation: "A differenza dei David del Quattrocento, Michelangelo ritrae l'eroe prima di lanciare la pietra: il corpo è teso, le vene della mano sono gonfie, la fronte è aggrottata e lo sguardo esprime massima concentrazione mentale."
            },
            {
                question: "Cosa intende Michelangelo per scultura realizzata 'per via di levare'?",
                options: [
                    "La tecnica di modellare i bozzetti in cera liquida.",
                    "Il concetto platonico per cui lo scultore toglie la pietra in eccesso per liberare la figura ideale che è già custodita e preesistente nel marmo.",
                    "La scultura realizzata incollando pezzi di pietre diverse.",
                    "La tecnica di doratura a foglia d'oro del marmo."
                ],
                correctIndex: 1,
                explanation: "Per Michelangelo la figura ideale è già contenuta all'interno della materia rocciosa; il compito dell'artista è semplicemente rimuovere lo strato superfluo di pietra con lo scalpello."
            },
            {
                question: "Quale grande intellettuale e artista del Rinascimento presta il volto al filosofo Platone nella Scuola di Atene di Raffaello?",
                options: [
                    "Michelangelo Buonarroti.",
                    "Leonardo da Vinci.",
                    "Donato Bramante.",
                    "Papa Giulio II."
                ],
                correctIndex: 1,
                explanation: "Raffaello celebra i maestri del suo tempo ritraendoli nei panni dei filosofi antichi: Platone ha le sembianze del vecchio Leonardo da Vinci, Eraclito ha il volto di Michelangelo e Euclide ha quello di Bramante."
            }
        ]
    },
    veneto: {
        subject: "arte",
        chapterTag: "Studio V",
        title: "Il Rinascimento Veneto",
        questions: [
            {
                question: "In cosa differisce principalmente il 'colorito tonale' veneto dal 'disegno' fiorentino?",
                options: [
                    "I veneti dipingevano solo su tavola, i fiorentini su tela.",
                    "I veneti costruivano la profondità e i volumi stendendo direttamente il colore in toni e calori caldi/freddi, senza un disegno di contorno netto e rigido.",
                    "I fiorentini rifiutavano l'uso della pittura ad olio.",
                    "I veneti applicavano la prospettiva centrale brunelleschiana con maggiore severità."
                ],
                correctIndex: 1,
                explanation: "La pittura veneta si affida interamente alle modulazioni cromatiche e luminose stese direttamente sulla tela, mentre quella centro-italiana poggia sull'intelaiatura teorica e lineare del disegno preparatorio."
            },
            {
                question: "Chi sono i due personaggi raffigurati in primo piano nella Tempesta di Giorgione?",
                options: [
                    "Una principessa in armatura e un drago ferito.",
                    "Un soldato (o pastore) sulla sinistra e una donna seminuda che allatta sulla destra.",
                    "Due filosofi che leggono una pergamena antica.",
                    "Il doge di Venezia e la sposa del mare."
                ],
                correctIndex: 1,
                explanation: "La Tempesta di Giorgione presenta a sinistra un giovane soldato in piedi e a destra una donna seduta che allatta, inseriti in un paesaggio naturale carico di tensione elettrica prima del temporale."
            },
            {
                question: "Nell'opera Amor Sacro e Amor Profano di Tiziano, quale figura rappresenta l'Amor Sacro secondo la critica neoplatonica e perché?",
                options: [
                    "La donna riccamente vestita di seta bianca, perché simboleggia lo sfarzo delle cerimonie religiose.",
                    "La donna nuda con il drappo rosso, poiché la nudità simboleggia la purezza dell'anima, la verità spirituale svestita delle passioni terrene e la bellezza divina.",
                    "Il putto che gioca con l'acqua nella vasca di pietra.",
                    "Il cavaliere che si scorge sullo sfondo collinare."
                ],
                correctIndex: 1,
                explanation: "Nel Rinascimento, la nudità femminile non era intesa solo come sensualità erotica, ma rappresentava la Verità e la Bellezza divina svestita (e quindi pura), opposta alle vesti terrene dell'Amor Profano."
            },
            {
                question: "Quale capolavoro altare di Tiziano unisce tre registri diversi grazie a imponenti gesti dinamici e all'uso teatrale del colore rosso?",
                options: [
                    "La Venere di Urbino.",
                    "L'Assunta dei Frari a Venezia (1516-1518).",
                    "La Pala Pesaro.",
                    "L'Incoronazione di spine."
                ],
                correctIndex: 1,
                explanation: "L'Assunta dei Frari si impone nella navata per l'effetto teatrale e per il ritmo ascendente scandito dalle vesti rosse degli apostoli in basso e della Vergine al centro, che risaltano contro lo sfondo dorato del cielo."
            },
            {
                question: "Cosa caratterizza la tecnica pittorica dell'ultimo Tiziano (dopo il 1550)?",
                options: [
                    "Una definizione millimetrica dei contorni tipica del neoclassicismo.",
                    "Una pittura di tocco rapida, pastosa e materica, stesa talvolta direttamente con i polpastrelli, dove le forme si disgregano nella luce e nel buio drammatico.",
                    "L'abbandono totale della pittura su tela a favore del mosaico.",
                    "L'uso di colori trasparenti privi di rilievo e di ombre."
                ],
                correctIndex: 1,
                explanation: "Nello stile tardo, Tiziano abbandona il rigore formale per stendere grumi densi di colore in modo concitato e materico, usando persino le dita per distribuire la pittura sulla tela, accentuando l'espressività drammatica."
            }
        ]
    },
    barocco: {
        subject: "arte",
        chapterTag: "Studio VI",
        title: "Il Barocco",
        questions: [
            {
                question: "Quale importante innovazione introduce Caravaggio nella stesura del quadro sacro per rifiutare l'idealizzazione accademica?",
                options: [
                    "L'uso di tele rotonde per focalizzare la prospettiva.",
                    "L'utilizzo di modelli reali estrapolati dal popolo e dagli emarginati, ritratti con fedele naturalezza senza abbellimenti.",
                    "La rimozione totale del colore ad olio a favore dell'acquerello rapido.",
                    "Il recupero di cornici dorate intarsiate a motivi geometrici bizantini."
                ],
                correctIndex: 1,
                explanation: "Caravaggio mette da parte l'idealizzazione accademica dipingendo i soggetti sacri a partire da persone comuni, prostitute o popolani incontrati per strada, ritraendone con assoluto realismo i piedi sporchi, le rughe e i segni della povertà."
            },
            {
                question: "Nella \"Vocazione di san Matteo\" di Caravaggio, quale significato assume il fascio di luce radente proveniente da destra?",
                options: [
                    "È un semplice espediente per illuminare il bancone del gabelliere.",
                    "Simboleggia la Grazia divina che squarcia il buio del peccato, parallela al braccio teso di Cristo.",
                    "Rappresenta la luce solare filtrata dalle tende della taverna.",
                    "Serve a deviare lo sguardo dello spettatore verso la finestra reale."
                ],
                correctIndex: 1,
                explanation: "La luce ha un valore morale e teologico: rappresenta la Grazia della vocazione che investe Matteo ed i suoi compagni di tavolo, procedendo parallelamente alla direzione del braccio teso di Cristo."
            },
            {
                question: "Quale capolavoro scultoreo di Bernini fonde in un unico \"bel composto\" la scultura drammatica, l'architettura classica e la luce zenitale dorata proveniente da una finestra nascosta?",
                options: [
                    "L'Apollo e Dafne della Galleria Borghese.",
                    "Il monumento equestre a Costantino.",
                    "L'Estasi di santa Teresa nella Cappella Cornaro.",
                    "Il Baldacchino di San Pietro."
                ],
                correctIndex: 2,
                explanation: "Nell'Estasi di santa Teresa, Bernini realizza la sintesi delle arti: la scultura del gruppo sacro è fusa con l'architettura scenografica della cappella e illuminata da una vera fonte di luce naturale gialla nascosta dietro la trabeazione."
            },
            {
                question: "Quale virtuosismo scultoreo caratterizza l'opera \"Apollo e Dafne\" di Bernini?",
                options: [
                    "La fusione in bronzo a cera persa di un gruppo di 15 figure complesse.",
                    "La resa plastica della metamorfosi della ninfa in alloro, con foglie sottilissime, radici che spuntano dai piedi e corteccia ruvida scavate direttamente nel marmo.",
                    "La pittura delle vesti con pigmenti naturali dorati luccicanti.",
                    "L'aggiunta di veri innesti di rami e legno sul marmo di Carrara."
                ],
                correctIndex: 1,
                explanation: "Bernini sfida i limiti fisici del marmo scolpendo con straordinaria morbidezza la ninfa nell'attimo della trasformazione vegetale: le sue mani fioriscono in rami d'alloro, i piedi si fanno radici e una corteccia ruvida avvolge il corpo liscio."
            },
            {
                question: "Su quale complessa pianta geometrica (rifiutando il modulo antropomorfico del Rinascimento) Borromini edifica la chiesa di Sant'Ivo alla Sapienza?",
                options: [
                    "Una pianta ellittica pura basata su due cerchi tangenti.",
                    "Una pianta a stella a sei punte generata dalla sovrapposizione di due triangoli equilateri ruotati.",
                    "Una croce latina a tre navate voltate a botte.",
                    "Una pianta ottagonale ispirata al Battistero fiorentino."
                ],
                correctIndex: 1,
                explanation: "Borromini imposta Sant'Ivo su una pianta stellare basata sulla sovrapposizione di due triangoli equilateri, creando uno spazio interno dinamico in cui nicchie concave e sporgenze convesse si alternano ritmicamente."
            }
        ]
    },
    neoclassicismo: {
        subject: "arte",
        chapterTag: "Studio VII",
        title: "Neoclassicismo e Sublime",
        questions: [
            {
                question: "Quale celebre formula conia l'archeologo Winckelmann per definire l'essenza dell'opera d'arte classica greca?",
                options: [
                    "Dinamismo concavo e ricchezza espressiva barocca.",
                    "Nobile semplicità e quieta grandezza.",
                    "Proporzione prospettica e modularità geometrica.",
                    "Realismo brutale e chiaroscuro drammatico."
                ],
                correctIndex: 1,
                explanation: "Winckelmann teorizza che i capolavori greci esprimono una 'nobile semplicità e quieta grandezza' (edle Einfalt und stille Größe), dove la violenza delle passioni è mitigata e sublimata in un'armonia equilibrata."
            },
            {
                question: "In quale capolavoro di Jacques-Louis David la morte fisica di un leader politico viene assimilata iconograficamente alla deposizione di Cristo?",
                options: [
                    "Il giuramento degli Orazi.",
                    "La morte di Marat (1793).",
                    "L'incoronazione di Napoleone.",
                    "Leonida alle Termopili."
                ],
                correctIndex: 1,
                explanation: "Nella Morte di Marat, David ritrae il braccio esanime del rivoluzionario caduto nella vasca riprendendo la posa del Cristo morto della Pietà di Michelangelo e della Deposizione di Raffaello, elevandolo a martire laico."
            },
            {
                question: "Quale trattamento superficiale applicava Canova sulle sculture finite per conferire al marmo di Carrara un calore simile a quello della pelle umana?",
                options: [
                    "Una lucidatura ad olio bollente stesa a pennello.",
                    "Una miscela fluida a base di cera d'api ed 'acqua di rotaia' (ricca di ossidi di ferro).",
                    "Una vernice trasparente acrilica lucida.",
                    "Una stesura di gesso liquido diluito in cera."
                ],
                correctIndex: 1,
                explanation: "Per eliminare la freddezza del marmo bianco, Canova eseguiva personalmente 'l'ultima mano' e applicava una patina calda a base di cera d'api e 'acqua di rotaia' (l'acqua contenente ruggine e ossidi di ferro), rendendo la pietra rosea e semitrasparente."
            },
            {
                question: "Nel gruppo monumentale di \"Amore e Psiche giacenti\" di Canova, quale momento della favola mitologica viene rappresentato?",
                options: [
                    "L'ira di Venere contro la fanciulla.",
                    "Il bacio carnale ed erotico dei due amanti.",
                    "L'attimo sospeso immediatamente precedente al bacio, dove le labbra e gli sguardi si sfiorano in perfetta tensione formale.",
                    "La fuga di Amore verso il monte Olimpo."
                ],
                correctIndex: 2,
                explanation: "Canova predilige il 'momento di transizione': non il bacio avvenuto, ma l'istante in cui Amore risveglia Psiche e i due volti si avvicinano sospesi in un abbraccio chiasmatico a forma di X."
            },
            {
                question: "Quale caratteristica compositiva definisce l'opera \"Viandante sul mare di nebbia\" di Friedrich come emblema del Sublime preromantico?",
                options: [
                    "La presenza di fulmini e navi in fiamme all'orizzonte.",
                    "La raffigurazione del protagonista di spalle (Rückenfigur) che invita lo spettatore a immedesimarsi e a contemplare l'infinito naturale.",
                    "La scomposizione scientifica dei colori in micro-punti accostati.",
                    "L'eliminazione totale di riferimenti umani a favore del puro paesaggio."
                ],
                correctIndex: 1,
                explanation: "La tecnica del personaggio ritratto di spalle (Rückenfigur) focalizza la composizione sulla meditazione solitaria: lo spettatore si immedesima nel viandante e si confronta con l'immensità della natura."
            }
        ]
    },
    romanticismo: {
        subject: "arte",
        chapterTag: "Studio VIII",
        title: "Romanticismo e Realismo",
        questions: [
            {
                question: "Quale metafora politica e morale rappresenta, secondo la critica romantica, la struttura instabile e dinamica della \"Zattera della Medusa\" di Géricault?",
                options: [
                    "L'inevitabile progresso tecnologico navale.",
                    "Il naufragio ideale della Francia post-napoleonica e la fragilità della condizione umana alla deriva.",
                    "La sottomissione dell'uomo alla sovranità assoluta dei re.",
                    "Il trionfo della ragione illuminista sulle tempeste della superstizione."
                ],
                correctIndex: 1,
                explanation: "La Zattera della Medusa, dipinta con crudo realismo basato su studi di cadaveri veri, esprime la disperazione e la speranza dei naufraghi, offrendosi come allegoria del fallimento della Restaurazione francese."
            },
            {
                question: "In \"La Libertà che guida il popolo\" di Delacroix, quale elemento simboleggia l'unione interclassista della rivolta parigina del 1830?",
                options: [
                    "Il colore uniforme degli abiti delle figure sullo sfondo.",
                    "L'affiancamento del borghese col cilindro, dell'operaio con la sciabola e dello studente del popolo con le pistole.",
                    "La parata ufficiale dei generali a cavallo in primo piano.",
                    "L'assenza di bandiere o simboli politici."
                ],
                correctIndex: 1,
                explanation: "Delacroix unisce nella battaglia figure appartenenti a estrazioni sociali diverse (borghesia, classe operaia e giovani popolani), che marciano compatti attorno all'allegoria a seno scoperto della Libertà."
            },
            {
                question: "Quale scandalosa scelta stilistica compì Gustave Courbet nell'opera \"Un funerale a Ornans\" per manifestare il suo Realismo?",
                options: [
                    "Dipinse figure mostruose o spettrali per deridere la chiesa.",
                    "Rappresentò un funerale anonimo di campagna su una tela di enormi dimensioni (3x6 metri) riservata storicamente ai grandi temi eroici.",
                    "Abolì totalmente la pittura ad olio usando il carboncino su muro.",
                    "Inserì angeli e santi dipinti a campiture d'oro zecchino."
                ],
                correctIndex: 1,
                explanation: "Courbet scandalizzò l'Accademia dipingendo una modesta e sobria cerimonia funebre di provincia su un formato monumentale solenne, senza gerarchie e tagliando la fossa al margine del quadro."
            },
            {
                question: "Quale celebre affermazione di Courbet sintetizza il suo rifiuto per la pittura mitologica, allegorica e accademica?",
                options: [
                    "'Il disegno è la probità dell'arte'.",
                    "'Mostratemi un angelo e io lo dipingerò'.",
                    "'La pittura è un'emozione pura senza oggetti'.",
                    "'Il colore è la musica della tela'."
                ],
                correctIndex: 1,
                explanation: "Con la frase 'Mostratemi un angelo e io lo dipingerò', Courbet rivendica il dovere morale del pittore realista di rappresentare solo ciò che appartiene all'esperienza sensibile e reale."
            },
            {
                question: "Nell'opera \"Gli spaccapietre\" di Courbet, come viene espressa la denuncia sociale del duro lavoro manuale?",
                options: [
                    "Ritraendo i due operai che piangono tenendosi la testa tra le mani.",
                    "Mostrando figure grottesche e deformi sullo sfondo di una miniera d'oro.",
                    "Ritraendo i due lavoratori di spalle o con il volto coperto, vestiti di stracci e intenti a un lavoro disumanizzante, senza aneddotica compassionevole.",
                    "Aggiungendo la figura di un proprietario terriero che li frusta."
                ],
                correctIndex: 2,
                explanation: "Courbet evita il sentimentalismo patetico: nasconde i volti dei due protagonisti e ne evidenzia gli abiti logori, i gesti pesanti legati al duro lavoro, elevandoli a simboli della fatica operaia."
            }
        ]
    },
    impressionismo: {
        subject: "arte",
        chapterTag: "Studio IX",
        title: "L'Impressionismo",
        questions: [
            {
                question: "Quale opera di Édouard Manet, esposta al Salon des Refusés del 1863, scatenò un enorme scandalo per la presenza di un nudo femminile contemporaneo e privo di giustificazione mitologica?",
                options: [
                    "L'Olympia.",
                    "La colazione sull'erba (Le Déjeuner sur l'herbe).",
                    "Il bar delle Folies-Bergère.",
                    "La ferrovia."
                ],
                correctIndex: 1,
                explanation: "La Colazione sull'erba sconvolse la morale borghese perché ritraeva una donna nuda seduta in mezzo a due uomini vestiti con abiti contemporanei, senza veste allegorica, e dipinta con toni piatti."
            },
            {
                question: "In quale opera Manet ritrae una prostituta parigina che fissa fiera l'osservatore, definita con contrasti netti contro lenzuola bianche e un gatto nero?",
                options: [
                    "La colazione sull'erba.",
                    "L'Olympia.",
                    "La cantante di strada.",
                    "Il pifferaio."
                ],
                correctIndex: 1,
                explanation: "Olympia suscitò scalpore sia per il soggetto (una cortigiana contemporanea) sia per lo stile: il corpo pallido contrasta duramente con lo sfondo buio e le lenzuola."
            },
            {
                question: "Quale dipinto di Claude Monet, raffigurante il porto di Le Havre all'alba, diede origine al termine \"Impressionismo\"?",
                options: [
                    "I papaveri.",
                    "La terrazza a Sainte-Adresse.",
                    "Impressione, sole nascente (1872).",
                    "Lo stagno delle ninfee."
                ],
                correctIndex: 2,
                explanation: "Esposto nel 1874 presso lo studio del fotografo Nadar, il dipinto Impressione, sole nascente ispirò al critico Louis Leroy l'articolo satirico 'La mostra degli impressionisti', battezzando il movimento."
            },
            {
                question: "Per quale motivo Monet dipinse la facciata della Cattedrale di Rouen in oltre 30 tele diverse?",
                options: [
                    "Perché la Cattedrale minacciava di crollare e voleva documentarne i dettagli.",
                    "Per studiare la variabilità degli effetti luminosi e cromatici sulla pietra nelle diverse ore del giorno e stagioni.",
                    "Su commissione specifica dell'arcivescovo della città.",
                    "Per dimostrare la superiorità dell'architettura gotica su quella rinascimentale."
                ],
                correctIndex: 1,
                explanation: "Monet studia la luce come fattore dinamico: dipingendo la cattedrale in serie (alba, sole calante, pioggia) dimostra che la materia solida si dissolve visivamente a seconda del variare dell'atmosfera."
            },
            {
                question: "Quale caratteristica compositiva distingue le opere di Edgar Degas come \"La classe di danza\" e \"L'assenzio\"?",
                options: [
                    "L'uso esclusivo della pittura en plein air in mezzo alle paludi.",
                    "Le inquadrature asimmetriche, i tagli diagonali del pavimento e le composizioni decentrate di derivazione fotografica.",
                    "Il recupero di fondali dorati zecchini e icone bizantine.",
                    "L'applicazione rigorosa del modulo del cerchio perfetto di origine classica."
                ],
                correctIndex: 1,
                explanation: "Degas, appassionato di fotografia e stampe giapponesi, inventa tagli audaci: nella Classe di danza usa una forte diagonale; nell'Assenzio posiziona i tavoli a zigzag ed i personaggi decentrati."
            }
        ]
    },
    postimpressionismo: {
        subject: "arte",
        chapterTag: "Studio X",
        title: "Il Post-Impressionismo",
        questions: [
            {
                question: "Quale formula geometrica teorizza Paul Cézanne per strutturare e razionalizzare gli oggetti della natura?",
                options: [
                    "La retta, la curva e il piano inclinato.",
                    "Il cilindro, la sfera e il cono.",
                    "Il quadrato, il cerchio e il triangolo equilatero.",
                    "La spirale, l'ovale e la piramide."
                ],
                correctIndex: 1,
                explanation: "Cézanne scrive che la natura va trattata secondo il cilindro, la sfera e il cono: l'artista non deve copiare le apparenze luminose ma ricomporre la realtà secondo volumi geometrici puri."
            },
            {
                question: "In che modo Georges Seurat applica le scoperte scientifiche sui colori complementari nell'opera \"Una domenica pomeriggio sull'isola della Grande Jatte\"?",
                options: [
                    "Dipingendo con colori metallici riflettenti.",
                    "Utilizzando la tecnica del Pointillisme, accostando micro-punti di colori puri sulla tela lasciando che sia l'occhio dello spettatore a fonderli otticamente.",
                    "Mescolando il nero a tutti i pigmenti per creare ombre profonde.",
                    "Abolendo totalmente il disegno e lasciando colare il colore a macchie casuali."
                ],
                correctIndex: 1,
                explanation: "Seurat applica le teorie sulla visione: accostando puntini di colori complementari (es. rosso e verde) senza mischiarli fisicamente, ottiene una luminosità straordinaria grazie alla ricomposizione ottica retinica."
            },
            {
                question: "Quale tecnica, ispirata alle vetrate medievali e alle stampe giapponesi, viene utilizzata da Paul Gauguin per stendere il colore?",
                options: [
                    "Lo stiacciato prospettico.",
                    "Il Cloisonnisme (campiture piatte racchiuse da spessi contorni scuri).",
                    "Lo sfumato a tempera grassa.",
                    "La pittura a spruzzo d'inchiostro."
                ],
                correctIndex: 1,
                explanation: "Il Cloisonnisme consiste nel delimitare zone di colore piatto con una marcata linea di contorno scura (simile al piombo che separa le vetrate medievali), accentuando la bidimensionalità antinaturalistica."
            },
            {
                question: "Nel capolavoro di Van Gogh \"Notte stellata\", quale elemento naturale funge da legame verticale e simbolico tra la terra e il cielo cosmico?",
                options: [
                    "Il campanile a bulbo del paese.",
                    "Il grande cipresso in primo piano a sinistra, simile a una fiamma oscura protesa verso il cielo.",
                    "La fitta schiera di olivi coltivati a terrazze.",
                    "La catena montuosa delle Alpilles sullo sfondo."
                ],
                correctIndex: 1,
                explanation: "Il cipresso, pianta associata alla morte, si erge come una fiamma scura e dinamica in primo piano, unendo la terra (la fragilità umana del villaggio) al cielo (il turbinio cosmico e l'infinito)."
            },
            {
                question: "Quale profonda differenza separa lo stile e la tavolozza dei \"Mangiatori di patate\" (1885) di Van Gogh dalle sue opere del periodo di Arles e Saint-Rémy?",
                options: [
                    "I Mangiatori di patate presentano colori psichedelici e sfondi completamente astratti.",
                    "Nel periodo olandese la tavolozza è cupa, terrosa e monocroma per esprimere la sacralità della povertà, mentre in Provenza esplode l'uso espressionista di gialli, blu e verdi saturi.",
                    "L'uso esclusivo di pennellate lisce e prive di spessore materico.",
                    "Il recupero di prospettive aeree leonardesche con fitti sfumati azzurri."
                ],
                correctIndex: 1,
                explanation: "Nel primo periodo olandese (I mangiatori di patate), Van Gogh usa toni terrosi. Successivamente, dopo il soggiorno a Parigi e lo spostamento a Sud, sperimenta l'esplosione cromatica espressionista e simbolica."
            }
        ]
    }
};

// Global export
window.quizDatabase = quizDatabase;
