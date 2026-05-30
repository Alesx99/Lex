/* CENTRALIZED QUIZ DATABASE - LEX STUDIORUM */

const quizDatabase = {
    // ═══════════════════════════════════════════════════════════════
    // DIRITTO DEI BENI CULTURALI — 12 Capitoli × 5 Domande = 60 Domande
    // ═══════════════════════════════════════════════════════════════

    cap1_patrimonio: {
        subject: "diritto",
        chapterTag: "Cap. I",
        title: "Il Patrimonio Culturale e il Paesaggio",
        questions: [
            {
                question: "L'Articolo 9 della Costituzione è collocato tra i Principi Fondamentali. Quale conseguenza giuridica comporta questa collocazione per la tutela del patrimonio?",
                options: [
                    "Si tratta di una norma meramente programmatica priva di effetti giuridici diretti.",
                    "Essendo un principio fondamentale, vincola tutti i poteri dello Stato e costituisce parametro di legittimità costituzionale delle leggi ordinarie, prevalendo anche in sede di bilanciamento con altri diritti.",
                    "Si applica esclusivamente ai rapporti tra lo Stato e le Regioni a statuto speciale.",
                    "Ha efficacia solo nei confronti degli enti pubblici territoriali, non dei privati cittadini."
                ],
                correctIndex: 1,
                explanation: "La collocazione dell'Art. 9 tra i Principi Fondamentali (artt. 1-12) conferisce alla tutela del patrimonio e del paesaggio il rango di valore supremo dell'ordinamento, non derogabile dal legislatore ordinario e utilizzabile dalla Corte Costituzionale come parametro di giudizio."
            },
            {
                question: "La Commissione Franceschini (1964) ha introdotto una definizione fondamentale per il diritto dei beni culturali. Quale?",
                options: [
                    "Ha definito il patrimonio culturale come l'insieme delle opere d'arte di proprietà statale.",
                    "Ha definito il bene culturale come «testimonianza materiale avente valore di civiltà», svincolandolo dai criteri estetici tradizionali.",
                    "Ha introdotto il concetto di «bellezza naturale» come fondamento della tutela paesaggistica.",
                    "Ha stabilito che sono beni culturali esclusivamente le opere aventi più di 100 anni."
                ],
                correctIndex: 1,
                explanation: "La Commissione Franceschini ha superato la concezione estetizzante della «cosa d'arte» introducendo la nozione aperta di «testimonianza materiale avente valore di civiltà», che consente di includere nella tutela oggetti di valore storico, documentario ed etnoantropologico, non solo estetico."
            },
            {
                question: "Ai sensi dell'Articolo 2 del Codice dei Beni Culturali (D.Lgs. 42/2004), da quali due componenti è costituito il «patrimonio culturale»?",
                options: [
                    "Beni artistici e beni ambientali.",
                    "Beni culturali e beni paesaggistici.",
                    "Beni demaniali e beni patrimoniali indisponibili.",
                    "Beni materiali e beni immateriali."
                ],
                correctIndex: 1,
                explanation: "L'Art. 2 del Codice definisce il patrimonio culturale come l'insieme unitario dei beni culturali (artt. 10-11: cose mobili e immobili di interesse artistico, storico, archeologico, etnoantropologico) e dei beni paesaggistici (art. 134 e ss.)."
            },
            {
                question: "Quale riforma costituzionale del 2022 ha modificato l'Articolo 9 della Costituzione, ampliandone la portata?",
                options: [
                    "L'introduzione del diritto alla fruizione digitale del patrimonio culturale.",
                    "L'aggiunta della tutela dell'ambiente, della biodiversità e degli ecosistemi, anche nell'interesse delle future generazioni.",
                    "L'inserimento del principio di sussidiarietà orizzontale nella gestione dei musei.",
                    "La previsione dell'obbligo di insegnamento della storia dell'arte in tutte le scuole."
                ],
                correctIndex: 1,
                explanation: "La Legge Costituzionale 1/2022 ha aggiunto all'Art. 9 un nuovo comma che estende la tutela repubblicana all'ambiente, alla biodiversità e agli ecosistemi, anche nell'interesse delle future generazioni, affiancando la tutela ambientale a quella del patrimonio storico-artistico."
            },
            {
                question: "Quale importante evoluzione concettuale segna il passaggio dalla Legge 1497/1939 alla Convenzione Europea del Paesaggio (Firenze, 2000) nella nozione di «paesaggio»?",
                options: [
                    "Il paesaggio passa da «bellezza naturale» (visione estetica e selettiva) a «territorio espressivo di identità» (visione olistica che include ogni porzione di territorio percepita dalle popolazioni).",
                    "Il paesaggio viene escluso dalla competenza statale e affidato interamente alle Regioni.",
                    "Si elimina la distinzione tra paesaggio urbano e paesaggio rurale.",
                    "Il paesaggio diventa competenza esclusiva dell'UNESCO e non più degli Stati nazionali."
                ],
                correctIndex: 0,
                explanation: "La Legge 1497/1939 tutelava solo le «bellezze naturali» di pregio estetico (il «paesaggio-cartolina»). La Convenzione di Firenze del 2000 rivoluziona la nozione, definendo il paesaggio come qualsiasi parte di territorio così come è percepita dalle popolazioni, estendendo la tutela all'intero territorio."
            }
        ]
    },

    cap2_governo: {
        subject: "diritto",
        chapterTag: "Cap. II",
        title: "Il Governo dei Beni Culturali",
        questions: [
            {
                question: "Il D.P.C.M. 15 marzo 2024, n. 57 ha riorganizzato il Ministero della Cultura in quanti e quali Dipartimenti?",
                options: [
                    "3 Dipartimenti: Tutela, Valorizzazione e Attività Culturali.",
                    "4 Dipartimenti: DiAG (Amministrazione Generale), DiT (Tutela), DiVA (Valorizzazione), DiAC (Attività Culturali).",
                    "2 Dipartimenti: Patrimonio Materiale e Patrimonio Immateriale.",
                    "5 Dipartimenti: Musei, Archeologia, Archivi, Biblioteche e Spettacolo."
                ],
                correctIndex: 1,
                explanation: "La riforma del 2024 ha articolato il MiC in quattro Dipartimenti: DiAG (Amministrazione Generale), DiT (Tutela del patrimonio culturale), DiVA (Valorizzazione del patrimonio culturale) e DiAC (Attività culturali), ciascuno con proprie Direzioni Generali."
            },
            {
                question: "L'Articolo 4 del Codice dei Beni Culturali riserva le funzioni di tutela a quale soggetto istituzionale?",
                options: [
                    "Alle Regioni, in applicazione del principio di decentramento amministrativo.",
                    "Al Ministero della Cultura (MiC), che le esercita in via esclusiva.",
                    "Ai Comuni, in quanto enti più vicini al territorio.",
                    "Alle Soprintendenze, in quanto organi autonomi e indipendenti."
                ],
                correctIndex: 1,
                explanation: "L'Art. 4 del Codice stabilisce che le funzioni di tutela sono esercitate dal Ministero della Cultura, al quale spetta la potestà esclusiva in materia. Le Soprintendenze sono organi periferici del Ministero, non enti autonomi."
            },
            {
                question: "Ai sensi dell'Articolo 112 del Codice, con quale strumento Stato, Regioni ed enti locali definiscono strategie comuni di valorizzazione del patrimonio?",
                options: [
                    "Mediante decreti ministeriali vincolanti per gli enti locali.",
                    "Mediante accordi di valorizzazione su base regionale o sub-regionale.",
                    "Tramite ordinanze sindacali urgenti in materia di beni culturali.",
                    "Attraverso regolamenti dell'Unione Europea direttamente applicabili."
                ],
                correctIndex: 1,
                explanation: "L'Art. 112 prevede che Stato, Regioni e altri enti stipulino accordi di valorizzazione per definire strategie e obiettivi comuni di fruizione del patrimonio. Tali accordi possono anche coinvolgere soggetti privati proprietari di beni culturali, previo il loro consenso."
            },
            {
                question: "Quale peculiare regime organizzativo caratterizza istituti come gli Uffizi, il Colosseo, Pompei e la Pinacoteca di Brera?",
                options: [
                    "Sono gestiti interamente da fondazioni private con scopo di lucro.",
                    "Sono istituti museali dotati di autonomia scientifica, finanziaria, contabile e organizzativa.",
                    "Dipendono gerarchicamente dal Segretariato Regionale del MiC senza alcuna autonomia.",
                    "Sono enti pubblici economici quotati in borsa."
                ],
                correctIndex: 1,
                explanation: "La riforma Franceschini del 2014 ha conferito a numerosi musei e parchi archeologici statali lo status di istituti dotati di autonomia speciale, consentendo loro di gestire autonomamente i proventi della biglietteria, il personale e le strategie di valorizzazione."
            },
            {
                question: "In base all'Articolo 9 del Codice, come deve operare il Ministero quando si tratta di beni culturali di proprietà ecclesiastica destinati al culto?",
                options: [
                    "Può disporre unilateralmente senza alcuna consultazione dell'autorità religiosa.",
                    "Deve operare d'accordo con le autorità ecclesiastiche competenti, nel rispetto delle intese concordatarie.",
                    "Deve cedere la competenza esclusiva alla Santa Sede.",
                    "Non può intervenire in alcun modo su beni destinati al culto."
                ],
                correctIndex: 1,
                explanation: "L'Art. 9 del Codice dispone che, per i beni culturali di interesse religioso appartenenti a enti ecclesiastici, il MiC e le Regioni provvedano d'intesa con le autorità religiose competenti, nel quadro delle intese concordatarie tra Stato e Chiesa cattolica (e degli accordi con le altre confessioni)."
            }
        ]
    },

    cap3_individuazione: {
        subject: "diritto",
        chapterTag: "Cap. III",
        title: "Individuazione e Regime Giuridico dei Beni Culturali",
        questions: [
            {
                question: "Quale differenza fondamentale distingue la «verifica dell'interesse culturale» (Art. 12) dalla «dichiarazione dell'interesse culturale» (Art. 13) nel Codice?",
                options: [
                    "La verifica si applica ai beni mobili, la dichiarazione ai beni immobili.",
                    "La verifica è obbligatoria per i beni pubblici e di enti no-profit (con presunzione provvisoria di culturalità), mentre la dichiarazione è discrezionale e riguarda i beni di proprietà privata (senza presunzione).",
                    "La verifica è gratuita, la dichiarazione è a pagamento.",
                    "La verifica è di competenza regionale, la dichiarazione è di competenza comunale."
                ],
                correctIndex: 1,
                explanation: "La distinzione è cruciale: l'Art. 12 impone la verifica per beni di enti pubblici/no-profit ultra-settantennali, i quali godono di presunzione provvisoria di culturalità. L'Art. 13 disciplina invece la dichiarazione per beni privati, dove non opera alcuna presunzione e il vincolo deve essere formalmente imposto."
            },
            {
                question: "Entro quanti giorni dalla notifica della dichiarazione di interesse culturale (Art. 13) il proprietario privato può proporre ricorso amministrativo?",
                options: [
                    "Entro 60 giorni dalla pubblicazione in Gazzetta Ufficiale.",
                    "Entro 30 giorni dalla notifica del provvedimento.",
                    "Entro 90 giorni dalla trascrizione nei registri immobiliari.",
                    "Entro 120 giorni dalla comunicazione al Comune di residenza."
                ],
                correctIndex: 1,
                explanation: "L'Art. 16 del Codice prevede la possibilità di ricorso amministrativo entro 30 giorni dalla notifica. Il ricorso sospende l'efficacia del provvedimento di alienazione, ma restano ferme le misure cautelari di protezione applicate fin dall'avvio del procedimento."
            },
            {
                question: "Nel sistema del Codice Civile e del Codice dei Beni Culturali, in quale categoria rientrano le raccolte dei musei, le aree archeologiche e gli archivi pubblici?",
                options: [
                    "Beni patrimoniali disponibili, liberamente alienabili sul mercato.",
                    "Beni del demanio culturale, assolutamente inalienabili ai sensi dell'Art. 54.",
                    "Beni patrimoniali indisponibili, alienabili con autorizzazione del prefetto.",
                    "Beni privati di uso pubblico, soggetti a servitù di passaggio."
                ],
                correctIndex: 1,
                explanation: "L'Art. 54 del Codice elenca tassativamente i beni assolutamente inalienabili: aree archeologiche, raccolte di musei, pinacoteche, gallerie e biblioteche pubbliche, archivi e singoli documenti di Stato. Questi beni non possono essere alienati per nessun motivo."
            },
            {
                question: "Nell'ambito della verifica dell'interesse culturale (Art. 12), qual è la soglia temporale e soggettiva che attiva la presunzione provvisoria di culturalità?",
                options: [
                    "Beni di proprietà pubblica con più di 50 anni, a prescindere dalla condizione dell'autore.",
                    "Beni di enti pubblici o persone giuridiche senza scopo di lucro, di autore non più vivente, con esecuzione risalente a oltre 70 anni.",
                    "Qualsiasi bene immobile di proprietà pubblica costruito prima del 1900.",
                    "Beni mobili di proprietà ecclesiastica con più di 100 anni."
                ],
                correctIndex: 1,
                explanation: "L'Art. 12 fissa una doppia soglia cumulativa: il bene deve appartenere a un ente pubblico o a un ente no-profit, l'autore deve essere non più vivente e l'esecuzione deve risalire a oltre 70 anni. Solo al ricorrere di tutti i requisiti opera la presunzione provvisoria."
            },
            {
                question: "Nel procedimento di dichiarazione dell'interesse culturale su un bene privato (Artt. 14-15), quale effetto produce la comunicazione di avvio del procedimento al proprietario?",
                options: [
                    "Nessun effetto giuridico fino alla conclusione del procedimento.",
                    "L'applicazione immediata e cautelare di tutte le misure di protezione previste dal Codice, ancor prima della conclusione del procedimento.",
                    "L'obbligo di depositare il bene presso la Soprintendenza.",
                    "La sospensione automatica del diritto di proprietà per 180 giorni."
                ],
                correctIndex: 1,
                explanation: "La comunicazione di avvio del procedimento di dichiarazione comporta l'applicazione immediata, in via cautelare, delle disposizioni di tutela (divieto di alienazione, obbligo di conservazione, autorizzazioni per interventi), a protezione del bene durante l'istruttoria."
            }
        ]
    },

    cap4_tutela_internazionale: {
        subject: "diritto",
        chapterTag: "Cap. IV",
        title: "La Tutela Internazionale dei Beni Culturali",
        questions: [
            {
                question: "Il Secondo Protocollo della Convenzione dell'Aja (1999) ha introdotto un regime specifico per i beni di eccezionale valore. Come si chiama questo regime?",
                options: [
                    "Tutela ordinaria internazionale.",
                    "Protezione speciale rafforzata, con sanzioni penali internazionali per le violazioni.",
                    "Custodia diplomatica privilegiata presso le ambasciate.",
                    "Immunità assoluta da qualsiasi forma di requisizione o sequestro."
                ],
                correctIndex: 1,
                explanation: "Il II Protocollo del 1999 ha istituito la categoria della «protezione speciale rafforzata» per i beni di massima importanza per l'umanità, affiancandola a un sistema di sanzioni penali internazionali e a un Comitato intergovernativo di vigilanza."
            },
            {
                question: "Quale Convenzione UNESCO protegge il patrimonio culturale subacqueo e quale soglia temporale stabilisce per la protezione?",
                options: [
                    "La Convenzione dell'Aja (1954), per beni sommersi da almeno 50 anni.",
                    "La Convenzione UNESCO del 2001, per tracce di esistenza umana sommerse da almeno 100 anni.",
                    "La Convenzione UNIDROIT (1995), per relitti navali affondati prima del 1800.",
                    "La Convenzione di Faro (2005), senza limiti temporali specifici."
                ],
                correctIndex: 1,
                explanation: "La Convenzione UNESCO del 2001 tutela il patrimonio culturale subacqueo, definendolo come tutte le tracce di esistenza umana aventi un carattere culturale, storico o archeologico, che siano state sommerse per almeno 100 anni. Vieta inoltre lo sfruttamento commerciale di tali beni."
            },
            {
                question: "Quale Regolamento dell'Unione Europea disciplina le licenze di esportazione uniformi per i beni culturali che escono dal territorio doganale dell'UE?",
                options: [
                    "Il Regolamento UE 2019/880 sull'importazione di beni culturali.",
                    "La Direttiva 2014/60/UE sulla restituzione dei beni.",
                    "Il Regolamento CE 116/2009 sulle esportazioni di beni culturali.",
                    "Il Trattato di Lisbona (Art. 167 TFUE)."
                ],
                correctIndex: 2,
                explanation: "Il Regolamento CE 116/2009 stabilisce un sistema uniforme di licenze di esportazione per i beni culturali che lasciano il territorio doganale dell'UE, garantendo un controllo armonizzato alle frontiere esterne dell'Unione."
            },
            {
                question: "Quale differenza fondamentale distingue la Convenzione UNESCO del 1970 dalla Convenzione UNIDROIT del 1995 in materia di traffico illecito?",
                options: [
                    "La Convenzione UNESCO riguarda i beni immobili, quella UNIDROIT i beni mobili.",
                    "La Convenzione UNESCO opera sul piano del diritto pubblico internazionale (obblighi tra Stati), mentre la UNIDROIT disciplina i rapporti di diritto privato (restituzione tra privati e onere di diligenza).",
                    "La Convenzione UNESCO si applica solo in tempo di guerra, quella UNIDROIT solo in tempo di pace.",
                    "Sono identiche nel contenuto ma ratificate da gruppi diversi di Stati."
                ],
                correctIndex: 1,
                explanation: "La Convenzione UNESCO del 1970 impone obblighi agli Stati (certificati di esportazione, inventari, cooperazione doganale). La Convenzione UNIDROIT del 1995 disciplina i rapporti privatistici: il possessore di buona fede deve restituire il bene rubato e può ottenere un indennizzo solo dimostrando di aver esercitato la dovuta diligenza."
            },
            {
                question: "Il Regolamento UE 2019/880 disciplina l'importazione di beni culturali da paesi terzi. Qual è la sua principale finalità?",
                options: [
                    "Facilitare il libero commercio di antichità tra l'UE e i paesi del Medio Oriente.",
                    "Prevenire il commercio illecito di beni culturali, specialmente quelli provenienti da zone di conflitto, richiedendo documentazione di provenienza legittima.",
                    "Abolire tutti i dazi doganali sui beni culturali importati nell'UE.",
                    "Creare un mercato unico europeo delle opere d'arte senza controlli."
                ],
                correctIndex: 1,
                explanation: "Il Regolamento UE 2019/880 mira a impedire l'ingresso nel territorio doganale dell'UE di beni culturali esportati illecitamente da paesi terzi, con particolare attenzione ai beni provenienti da zone di conflitto armato, richiedendo licenze e dichiarazioni di importazione con prove di provenienza."
            }
        ]
    },

    cap5_tutela: {
        subject: "diritto",
        chapterTag: "Cap. V",
        title: "La Tutela dei Beni Culturali",
        questions: [
            {
                question: "Ai sensi dell'Articolo 22 del Codice, entro quanti giorni il Soprintendente deve pronunciarsi sulla richiesta di autorizzazione per interventi su beni culturali?",
                options: [
                    "Entro 30 giorni dalla presentazione della richiesta.",
                    "Entro 60 giorni, prorogabili a 90.",
                    "Entro 120 giorni dalla richiesta.",
                    "Non esiste un termine specifico; il procedimento si chiude con il silenzio-assenso."
                ],
                correctIndex: 2,
                explanation: "L'Art. 22 del Codice stabilisce che il Soprintendente deve pronunciarsi entro 120 giorni dalla presentazione della richiesta di autorizzazione. L'autorizzazione può contenere prescrizioni tecniche e può essere revocata o modificata per nuove esigenze di tutela."
            },
            {
                question: "L'Articolo 28 del Codice conferisce al Soprintendente un potere cautelare particolarmente incisivo. Di quale potere si tratta?",
                options: [
                    "Il potere di confiscare direttamente i beni mobili di proprietà privata.",
                    "Il potere di sospensione (inibitoria) dei lavori eseguiti senza autorizzazione o in difformità, estensibile anche a cose non ancora dichiarate di interesse culturale.",
                    "Il potere di espropriare immediatamente qualsiasi bene a rischio.",
                    "Il potere di imporre sanzioni pecuniarie senza procedimento amministrativo."
                ],
                correctIndex: 1,
                explanation: "L'Art. 28 consente al Soprintendente di ordinare la sospensione immediata dei lavori non autorizzati o difformi. Questo potere di inibitoria si estende anche a cose non ancora formalmente dichiarate di interesse culturale, fungendo da misura cautelare preventiva."
            },
            {
                question: "L'Articolo 20 del Codice stabilisce una serie di divieti assoluti per i beni culturali. Quale tra i seguenti rientra tra tali divieti?",
                options: [
                    "Il divieto di riproduzione fotografica per scopi editoriali.",
                    "Il divieto di distruzione, deterioramento, danneggiamento o destinazione ad usi non compatibili con il carattere storico o artistico del bene.",
                    "Il divieto di apertura al pubblico senza il pagamento di un biglietto.",
                    "Il divieto di collocazione in edifici moderni costruiti dopo il 1950."
                ],
                correctIndex: 1,
                explanation: "L'Art. 20 stabilisce che i beni culturali non possono essere distrutti, deteriorati, danneggiati o adibiti ad usi non compatibili con il loro carattere storico o artistico, pregiudicandone la conservazione. Si tratta di divieti assoluti e inderogabili."
            },
            {
                question: "In base all'Articolo 27 del Codice, in caso di urgenza per evitare danni al bene culturale, quale procedura eccezionale è ammessa?",
                options: [
                    "Il proprietario può procedere liberamente senza alcuna comunicazione.",
                    "Il proprietario può eseguire lavori provvisori indispensabili per evitare danni, con immediata comunicazione alla Soprintendenza e invio tempestivo del progetto definitivo.",
                    "Solo il Ministero può intervenire, con un decreto d'urgenza da emanarsi entro 48 ore.",
                    "È ammessa esclusivamente la messa in sicurezza da parte dei Vigili del Fuoco."
                ],
                correctIndex: 1,
                explanation: "L'Art. 27 prevede una deroga al regime autorizzatorio: in caso di assoluta urgenza, il proprietario può eseguire interventi provvisori indispensabili per evitare danni, a condizione di darne immediata comunicazione alla Soprintendenza e di trasmettere tempestivamente il progetto dei lavori definitivi."
            },
            {
                question: "Nell'Articolo 29 del Codice, quale distinzione concettuale viene tracciata tra «prevenzione», «manutenzione» e «restauro»?",
                options: [
                    "Sono tre sinonimi che indicano la stessa attività di conservazione.",
                    "La prevenzione limita i rischi di deterioramento del contesto; la manutenzione mantiene l'integrità funzionale e l'identità; il restauro è l'intervento diretto per l'integrità materiale e il recupero dei valori culturali.",
                    "La prevenzione è obbligatoria, la manutenzione è facoltativa, il restauro è vietato.",
                    "La prevenzione riguarda i beni mobili, la manutenzione i beni immobili, il restauro solo i beni archeologici."
                ],
                correctIndex: 1,
                explanation: "L'Art. 29 distingue tre concetti: la prevenzione (limitazione dei fattori di rischio nel contesto ambientale), la manutenzione (controllo delle condizioni e mantenimento dell'integrità e dell'identità del bene) e il restauro (intervento diretto sul bene per garantire l'integrità materiale e il recupero dei valori culturali)."
            }
        ]
    },

    cap6_circolazione: {
        subject: "diritto",
        chapterTag: "Cap. VI",
        title: "La Circolazione dei Beni Culturali",
        questions: [
            {
                question: "Ai sensi dell'Articolo 59 del Codice, entro quanti giorni dall'atto di trasferimento deve essere effettuata la denuncia obbligatoria?",
                options: [
                    "Entro 15 giorni dalla trascrizione nei registri immobiliari.",
                    "Entro 30 giorni dall'atto di trasferimento della proprietà o della detenzione.",
                    "Entro 60 giorni dalla stipula del contratto notarile.",
                    "Entro 90 giorni dalla data di consegna materiale del bene."
                ],
                correctIndex: 1,
                explanation: "L'Art. 59 impone che ogni atto che trasferisca la proprietà o la detenzione di beni culturali a titolo oneroso o gratuito sia denunciato al MiC entro 30 giorni. La denuncia è presupposto di efficacia del trasferimento e fa decorrere il termine per la prelazione."
            },
            {
                question: "Se la denuncia di trasferimento ex Art. 59 viene omessa o effettuata tardivamente, come si modifica il termine per l'esercizio della prelazione artistica dello Stato?",
                options: [
                    "Il termine resta invariato a 60 giorni, ma decorre dalla data dell'atto.",
                    "Il termine si estende a 180 giorni dalla data in cui il Ministero ha notizia del trasferimento.",
                    "La prelazione diventa imprescrittibile e può essere esercitata in qualunque momento.",
                    "Il diritto di prelazione decade automaticamente."
                ],
                correctIndex: 1,
                explanation: "In caso di denuncia omessa o tardiva, il termine per la prelazione si dilata da 60 a 180 giorni, decorrenti dal momento in cui il Ministero viene a conoscenza del trasferimento avvenuto. Si tratta di una sanzione indiretta contro l'inadempimento dell'obbligo di denuncia."
            },
            {
                question: "L'Articolo 63 del Codice impone un particolare obbligo a chi esercita il commercio di beni culturali, cose antiche o usate. Di quale obbligo si tratta?",
                options: [
                    "L'obbligo di assicurare ogni bene venduto per un valore almeno pari al doppio del prezzo di cessione.",
                    "L'obbligo di tenere un registro giornaliero delle operazioni commerciali, preventivamente vidimato dalla questura.",
                    "L'obbligo di esporre una copia della licenza di esportazione in vetrina.",
                    "L'obbligo di comunicare ogni vendita alla Guardia di Finanza entro 24 ore."
                ],
                correctIndex: 1,
                explanation: "L'Art. 63 prescrive che chiunque eserciti il commercio di cose antiche, usate o di beni culturali tenga un registro giornaliero delle operazioni preventivamente vidimato, annotandovi le generalità del cedente e dell'acquirente, la descrizione del bene e il prezzo."
            },
            {
                question: "Qual è la validità dell'attestato di libera circolazione rilasciato dall'Ufficio di Esportazione per l'uscita definitiva di beni culturali dal territorio nazionale?",
                options: [
                    "Ha validità illimitata.",
                    "Ha validità di 5 anni, rinnovabile.",
                    "Ha validità di 1 anno dalla data di rilascio.",
                    "Ha validità di 3 anni, non rinnovabile."
                ],
                correctIndex: 1,
                explanation: "L'Art. 68 del Codice stabilisce che l'attestato di libera circolazione ha validità di 5 anni dalla data del rilascio. Se l'Ufficio di Esportazione nega l'attestato, può avviare d'ufficio il procedimento di dichiarazione di interesse culturale (Art. 14)."
            },
            {
                question: "Durante il periodo di pendenza del termine di 60 giorni per la prelazione (Art. 60), quale effetto giuridico si produce sull'atto di alienazione?",
                options: [
                    "L'atto è immediatamente efficace e la proprietà passa all'acquirente.",
                    "L'atto è sottoposto a condizione sospensiva: la proprietà NON passa all'acquirente e l'alienante NON può consegnare il bene.",
                    "L'atto è annullabile solo su istanza del Ministero.",
                    "L'atto produce effetti parziali, limitatamente al godimento del bene."
                ],
                correctIndex: 1,
                explanation: "L'atto di alienazione è condizionato sospensivamente all'esito della prelazione: durante il termine di 60 giorni la proprietà non si trasferisce e il bene non può essere consegnato all'acquirente. Solo al decorso infruttuoso del termine l'atto diviene pienamente efficace."
            }
        ]
    },

    cap8_appalti: {
        subject: "diritto",
        chapterTag: "Cap. VIII",
        title: "Appalti, Concessioni e Sponsorizzazioni",
        questions: [
            {
                question: "L'Articolo 120 del Codice dei Beni Culturali disciplina la sponsorizzazione. Quale distinzione fondamentale opera tra le due forme di sponsorizzazione?",
                options: [
                    "Sponsorizzazione nazionale e sponsorizzazione internazionale.",
                    "Sponsorizzazione pura (erogazione di risorse finanziarie) e sponsorizzazione tecnica (lo sponsor esegue direttamente i lavori a propria cura e spese, sotto vigilanza del Ministero).",
                    "Sponsorizzazione pubblica (tra enti pubblici) e sponsorizzazione privata (tra privati).",
                    "Sponsorizzazione temporanea (per mostre) e sponsorizzazione permanente (per restauri)."
                ],
                correctIndex: 1,
                explanation: "L'Art. 120 e l'Art. 134 del Codice dei Contratti distinguono tra sponsorizzazione pura (il privato eroga denaro) e sponsorizzazione tecnica (il privato esegue direttamente i lavori di restauro/valorizzazione a proprie spese, sotto la vigilanza e le prescrizioni della Soprintendenza)."
            },
            {
                question: "L'Articolo 115 del Codice prevede la possibilità di affidare a privati la gestione di determinate attività presso istituti culturali. Di quali attività si tratta?",
                options: [
                    "Esclusivamente le funzioni di vigilanza e sorveglianza notturna.",
                    "I servizi per la pubblica fruizione: biglietteria, caffetteria, bookshop, guide turistiche, didattica museale.",
                    "La sola gestione amministrativa e contabile dell'istituto.",
                    "L'intera attività scientifica di catalogazione e restauro."
                ],
                correctIndex: 1,
                explanation: "L'Art. 115 disciplina la concessione di servizi di valorizzazione, consentendo alle amministrazioni di affidare a privati, mediante gara pubblica, la gestione dei servizi per la fruizione del patrimonio culturale (biglietteria, caffetteria, bookshop, didattica, visite guidate)."
            },
            {
                question: "Per poter eseguire lavori di restauro su beni culturali tutelati, quali categorie di qualificazione SOA devono possedere le imprese?",
                options: [
                    "Le categorie OG1 (Edifici civili) e OG2 (Fabbricati industriali).",
                    "Le categorie OS2-A (Superfici decorate di beni immobili) e OS2-B (Beni culturali mobili e superfici decorate di beni architettonici).",
                    "La sola categoria OG11 (Impianti tecnologici).",
                    "Non è richiesta alcuna qualificazione specifica per i lavori di restauro."
                ],
                correctIndex: 1,
                explanation: "Per i lavori su beni culturali tutelati è richiesta l'attestazione SOA nelle categorie specialistiche OS2-A (superfici decorate di beni immobili del patrimonio culturale) e OS2-B (beni culturali mobili e superfici decorate di beni architettonici), che certificano l'esperienza pregressa nell'ambito del restauro."
            },
            {
                question: "Quale criterio di aggiudicazione è obbligatorio per gli appalti relativi a lavori su beni culturali tutelati?",
                options: [
                    "Il massimo ribasso sul prezzo base d'asta.",
                    "L'Offerta Economicamente Più Vantaggiosa (OEPV), in cui il punteggio tecnico ha peso preponderante rispetto al prezzo.",
                    "Il sorteggio tra le imprese qualificate.",
                    "L'affidamento diretto all'impresa con il fatturato più elevato."
                ],
                correctIndex: 1,
                explanation: "Per i lavori su beni culturali il Codice dei Contratti impone il criterio dell'OEPV (Offerta Economicamente Più Vantaggiosa), dove la componente qualitativa e tecnica della proposta prevale sulla mera offerta economica, a garanzia della qualità dell'intervento conservativo."
            },
            {
                question: "Quale differenza fondamentale distingue la sponsorizzazione (Art. 120 Codice) dall'erogazione liberale agevolata dall'Art Bonus (D.L. 83/2014)?",
                options: [
                    "Non esiste alcuna differenza: sono sinonimi giuridici.",
                    "La sponsorizzazione prevede un ritorno di immagine (corrispettivo promozionale per lo sponsor), mentre l'erogazione liberale è un atto di mecenatismo senza corrispettivo, incentivato esclusivamente dal beneficio fiscale.",
                    "La sponsorizzazione è riservata alle persone fisiche, l'Art Bonus alle imprese.",
                    "La sponsorizzazione è deducibile al 100%, l'Art Bonus solo al 30%."
                ],
                correctIndex: 1,
                explanation: "La sponsorizzazione è un contratto a prestazioni corrispettive (lo sponsor finanzia in cambio dell'associazione del proprio marchio al bene). L'erogazione liberale è un atto gratuito di mecenatismo: il donante non riceve alcun corrispettivo se non il credito d'imposta del 65% previsto dall'Art Bonus."
            }
        ]
    },

    cap9_ritrovamenti: {
        subject: "diritto",
        chapterTag: "Cap. IX",
        title: "Ritrovamenti e Scoperte",
        questions: [
            {
                question: "L'Articolo 88 del Codice riserva in via esclusiva le ricerche archeologiche a quale soggetto istituzionale?",
                options: [
                    "Alle università pubbliche, in virtù dell'autonomia didattica e scientifica.",
                    "Al Ministero della Cultura (MiC), che può concederne l'esecuzione a soggetti terzi.",
                    "Ai Comuni, in quanto enti territoriali più vicini al sito archeologico.",
                    "A qualsiasi privato cittadino che ne faccia richiesta motivata."
                ],
                correctIndex: 1,
                explanation: "L'Art. 88 riserva le ricerche archeologiche in via esclusiva al Ministero della Cultura. Tuttavia, l'Art. 89 consente al MiC di concederne l'esecuzione a soggetti terzi (università, CNR, fondazioni), fermo restando che tutti i reperti devono essere consegnati allo Stato."
            },
            {
                question: "In caso di scoperta fortuita di beni di interesse archeologico, entro quale termine lo scopritore deve darne comunicazione alle autorità competenti?",
                options: [
                    "Entro 7 giorni lavorativi dalla scoperta.",
                    "Entro 24 ore dalla scoperta, al Soprintendente o all'autorità di pubblica sicurezza.",
                    "Entro 30 giorni dalla scoperta, mediante raccomandata al Ministero.",
                    "Non esiste un termine specifico, purché la comunicazione avvenga in tempi ragionevoli."
                ],
                correctIndex: 1,
                explanation: "L'Art. 90 del Codice impone allo scopritore fortuito l'obbligo di denuncia entro 24 ore al Soprintendente o, in alternativa, al Sindaco o all'autorità di pubblica sicurezza (Carabinieri). Lo scopritore deve inoltre conservare le cose nel luogo e nelle condizioni del ritrovamento."
            },
            {
                question: "Quanto può ammontare al massimo il premio di rinvenimento spettante allo scopritore fortuito e al proprietario del fondo, ai sensi degli Artt. 92-93 del Codice?",
                options: [
                    "Fino al 50% del valore commerciale dei reperti, ripartito liberamente.",
                    "Fino a un quarto (25%) del valore commerciale dei reperti, ripartito in parti uguali tra scopritore e proprietario del fondo.",
                    "Un importo fisso di 10.000 euro, indipendentemente dal valore dei beni.",
                    "Il 10% del valore dei reperti, interamente destinato allo scopritore."
                ],
                correctIndex: 1,
                explanation: "Gli Artt. 92-93 prevedono un premio che non può superare il 25% del valore commerciale dei reperti. Il premio è ripartito in parti uguali tra lo scopritore e il proprietario dell'immobile, salvo diverso accordo tra le parti. Lo scopritore che abbia effettuato ricerche abusive non ha diritto ad alcun premio."
            },
            {
                question: "In che cosa consiste la Verifica Preventiva dell'Interesse Archeologico (VPIA) prevista dall'Art. 28 del Codice per le opere pubbliche?",
                options: [
                    "In una semplice dichiarazione sostitutiva dell'impresa appaltatrice.",
                    "In un procedimento articolato in tre fasi: relazione di assoggettabilità, saggi preventivi (carotaggi/trincee), e scavo stratigrafico, con spese a carico della stazione appaltante.",
                    "In un'ispezione visiva superficiale effettuata dal direttore dei lavori.",
                    "In un'analisi satellitare del terreno condotta dall'Agenzia Spaziale Italiana."
                ],
                correctIndex: 1,
                explanation: "La VPIA si articola in tre fasi progressive: 1) relazione di assoggettabilità (studio documentale e ricognizione di superficie); 2) saggi preventivi (carotaggi e trincee esplorative); 3) scavo stratigrafico completo. Tutte le spese sono a carico della stazione appaltante."
            },
            {
                question: "Perché il regime del «tesoro» previsto dall'Art. 932 del Codice Civile non si applica ai beni di interesse archeologico?",
                options: [
                    "Perché il Codice Civile è stato abrogato dal Codice dei Beni Culturali.",
                    "Perché i beni archeologici appartengono ab origine allo Stato (demanio originario ex Art. 91), rendendo inapplicabile la norma sul tesoro (cose di cui nessuno può provare la proprietà).",
                    "Perché il regime del tesoro si applica solo ai beni mobili di valore inferiore a 1.000 euro.",
                    "Perché i beni archeologici sono per definizione di proprietà del proprietario del fondo."
                ],
                correctIndex: 1,
                explanation: "L'Art. 91 del Codice stabilisce che tutte le cose di interesse archeologico appartengono allo Stato ab origine, indipendentemente da chi le ritrovi e dove. Questa riserva di proprietà statale rende inapplicabile l'Art. 932 c.c. sul tesoro, che presuppone che nessuno possa provare la proprietà."
            }
        ]
    },

    cap10_espropriazione: {
        subject: "diritto",
        chapterTag: "Cap. X",
        title: "Espropriazione dei Beni Culturali",
        questions: [
            {
                question: "Quale differenza fondamentale distingue l'espropriazione ex Art. 95 (espropriazione del bene culturale) dall'espropriazione ex Art. 96 (espropriazione strumentale)?",
                options: [
                    "L'Art. 95 riguarda solo beni mobili, l'Art. 96 solo beni immobili.",
                    "L'Art. 95 espropria il bene culturale stesso per conservazione o fruizione; l'Art. 96 espropria beni ordinari adiacenti per garantire luce, prospettiva, decoro e accessibilità al bene culturale.",
                    "L'Art. 95 non prevede indennità, l'Art. 96 sì.",
                    "L'Art. 95 è di competenza regionale, l'Art. 96 di competenza comunale."
                ],
                correctIndex: 1,
                explanation: "L'Art. 95 consente di espropriare direttamente il bene culturale di proprietà privata quando la conservazione e la fruizione pubblica lo richiedano. L'Art. 96 espropria invece edifici e terreni circostanti (non culturali) per isolamento, restauro, luce, prospettiva e decoro del bene culturale."
            },
            {
                question: "L'Articolo 97 del Codice prevede un'ulteriore ipotesi di espropriazione. Per quale finalità specifica?",
                options: [
                    "Per costruire parcheggi a servizio dei musei statali.",
                    "Per consentire l'esecuzione di scavi e ricerche per il ritrovamento di beni archeologici.",
                    "Per realizzare infrastrutture stradali nei pressi di siti tutelati.",
                    "Per edificare nuovi musei su terreni privati."
                ],
                correctIndex: 1,
                explanation: "L'Art. 97 prevede la possibilità di espropriare immobili per consentire interventi di interesse archeologico o ricerche e scavi finalizzati al ritrovamento di beni archeologici, completando il trittico delle espropriazioni culturali (Art. 95, 96, 97)."
            },
            {
                question: "Come viene calcolata l'indennità di esproprio per i beni culturali ai sensi dell'Art. 99 del Codice?",
                options: [
                    "In base al valore catastale dell'immobile, senza maggiorazioni.",
                    "In base al valore venale (commerciale) al momento dell'esproprio, senza tener conto né del decremento di valore derivante dal vincolo né del plusvalore futuro derivante dal restauro programmato.",
                    "In base a una stima forfettaria pari al 50% del valore di mercato.",
                    "In base al costo storico di costruzione dell'immobile attualizzato con l'indice ISTAT."
                ],
                correctIndex: 1,
                explanation: "L'Art. 99 stabilisce che l'indennità si calcola sul valore venale (di mercato) al momento dell'esproprio. Non si tiene conto del decremento dovuto al vincolo culturale (che ridurrebbe artificiosamente il valore) né del plusvalore futuro derivante dal restauro programmato (che lo aumenterebbe speculativamente)."
            },
            {
                question: "Se un bene espropriato non viene utilizzato per lo scopo dichiarato, entro quale termine il precedente proprietario può chiederne la retrocessione?",
                options: [
                    "Entro 5 anni dall'esproprio.",
                    "Entro 10 anni dalla data del decreto di esproprio.",
                    "La retrocessione non è mai ammessa per i beni culturali.",
                    "Entro 20 anni, ma solo se il bene non ha subito restauri."
                ],
                correctIndex: 1,
                explanation: "Se il bene espropriato non viene destinato allo scopo dichiarato (conservazione, fruizione pubblica, scavi) entro 10 anni dal decreto di esproprio, il precedente proprietario può chiederne la retrocessione, ovvero la restituzione del bene dietro rimborso dell'indennità percepita."
            },
            {
                question: "Quale atto formale è necessario prima di procedere all'espropriazione di un bene culturale privato?",
                options: [
                    "Un'ordinanza del Sindaco del Comune di ubicazione del bene.",
                    "La dichiarazione di pubblica utilità, che può equivalere all'approvazione del progetto di conservazione o all'autorizzazione alle ricerche.",
                    "Un referendum popolare nel Comune interessato.",
                    "Una delibera della Corte dei Conti sulla congruità della spesa."
                ],
                correctIndex: 1,
                explanation: "L'Art. 98 del Codice richiede la dichiarazione di pubblica utilità come presupposto formale dell'espropriazione. L'approvazione del progetto di conservazione/valorizzazione o l'autorizzazione alle ricerche archeologiche equivale automaticamente a dichiarazione di pubblica utilità."
            }
        ]
    },

    cap11_regime_fiscale: {
        subject: "diritto",
        chapterTag: "Cap. XI",
        title: "Il Regime Fiscale dei Beni Culturali",
        questions: [
            {
                question: "L'Art Bonus (D.L. 83/2014) prevede un credito d'imposta del 65% per le erogazioni liberali. Quali sono i limiti massimi di spesa agevolabile?",
                options: [
                    "Nessun limite per le persone fisiche, 10% dei ricavi per le imprese.",
                    "Il 15% del reddito imponibile per le persone fisiche e gli enti non commerciali; il 5 per mille dei ricavi annui per le imprese.",
                    "Un tetto fisso di 100.000 euro per tutti i contribuenti.",
                    "Il 50% del reddito imponibile, senza distinzione tra persone fisiche e imprese."
                ],
                correctIndex: 1,
                explanation: "L'Art Bonus fissa limiti differenziati: per le persone fisiche e gli enti non commerciali il credito è calcolato su un massimo del 15% del reddito imponibile; per le imprese (soggetti IRES) su un massimo del 5 per mille dei ricavi annui. Il credito è ripartito in 3 quote annuali di pari importo."
            },
            {
                question: "Quale agevolazione IMU è prevista per gli immobili di interesse storico-artistico vincolati?",
                options: [
                    "Esenzione totale dall'IMU per tutti gli immobili vincolati.",
                    "Riduzione del 50% della base imponibile IMU, a prescindere dall'utilizzo del bene.",
                    "Riduzione del 25% dell'aliquota ordinaria comunale.",
                    "Nessuna agevolazione; l'IMU si applica integralmente."
                ],
                correctIndex: 1,
                explanation: "Per gli immobili riconosciuti di interesse storico-artistico la base imponibile IMU è ridotta del 50%. L'agevolazione si applica indipendentemente dall'utilizzo del bene (abitativo, commerciale, monumentale), quale compensazione degli onerosi vincoli conservativi."
            },
            {
                question: "In che cosa consiste la «dazione in pagamento» (datio in solutum) prevista dall'Art. 28-bis del D.P.R. 602/1973 in materia di beni culturali?",
                options: [
                    "La possibilità per lo Stato di pagare i restauri cedendo titoli di Stato ai proprietari.",
                    "La possibilità per il contribuente di estinguere debiti tributari (IRPEF, IRES, imposte di successione) mediante la cessione allo Stato di beni culturali vincolati, il cui valore è determinato da una commissione paritetica MiC-Agenzia delle Entrate.",
                    "L'obbligo per il proprietario di pagare un canone annuale al Ministero per la conservazione.",
                    "La possibilità per le banche di accettare beni culturali come garanzia per mutui ipotecari."
                ],
                correctIndex: 1,
                explanation: "La dazione in pagamento consente al contribuente di cedere allo Stato beni culturali vincolati (o di eccezionale interesse anche se non vincolati) in luogo del pagamento di imposte, sanzioni e interessi. Il valore è determinato da una commissione paritetica Ministero della Cultura/Agenzia delle Entrate."
            },
            {
                question: "A quali condizioni i beni culturali vincolati sono esenti dall'imposta di successione e donazione?",
                options: [
                    "Sono sempre e incondizionatamente esenti.",
                    "Sono esenti a condizione che gli eredi/donatari si obblighino a rispettare gli obblighi di conservazione e a consentire l'accesso per motivi di studio, con vincolo regolarmente trascritto.",
                    "Sono esenti solo se il valore del bene è inferiore a 50.000 euro.",
                    "Sono esenti esclusivamente per i beni archeologici di proprietà dello Stato."
                ],
                correctIndex: 1,
                explanation: "I beni culturali vincolati possono essere esclusi dall'attivo ereditario e godere dell'esenzione dall'imposta di successione/donazione, a condizione che: il vincolo sia regolarmente trascritto, gli eredi denuncino il trasferimento al Ministero e si impegnino a conservare il bene e a consentire l'accesso per motivi di studio."
            },
            {
                question: "Quale regime fiscale si applica alle spese di sponsorizzazione culturale sostenute da un'impresa?",
                options: [
                    "Sono parzialmente deducibili come erogazioni liberali (50% dell'importo).",
                    "Sono integralmente deducibili dal reddito d'impresa come spese di pubblicità, non come liberalità.",
                    "Non sono deducibili in nessun caso.",
                    "Sono deducibili solo se l'importo è inferiore a 10.000 euro annui."
                ],
                correctIndex: 1,
                explanation: "Le spese di sponsorizzazione culturale sono considerate spese di pubblicità (e non erogazioni liberali) poiché prevedono un ritorno di immagine. In quanto tali, sono integralmente deducibili dal reddito d'impresa senza limiti percentuali, a differenza delle liberalità soggette a tetti."
            }
        ]
    },

    cap12_paesaggio: {
        subject: "diritto",
        chapterTag: "Cap. XII",
        title: "I Beni Paesaggistici",
        questions: [
            {
                question: "L'Articolo 134 del Codice individua tre categorie di beni paesaggistici. Quali sono?",
                options: [
                    "Beni demaniali, beni patrimoniali e beni privati vincolati.",
                    "Immobili con provvedimento formale (Art. 136), aree tutelate per legge — «Vincoli Galasso» (Art. 142), e immobili individuati dai piani paesaggistici (Art. 143).",
                    "Parchi nazionali, riserve naturali e oasi protette.",
                    "Beni rurali, beni costieri e beni montani."
                ],
                correctIndex: 1,
                explanation: "L'Art. 134 del Codice distingue tre categorie: 1) beni sottoposti a vincolo con provvedimento individuale (Art. 136: ville, giardini, bellezze panoramiche); 2) aree tutelate direttamente per legge — i «Vincoli Galasso» ex Art. 142 (coste, fiumi, montagne, boschi, vulcani); 3) beni individuati dai piani paesaggistici regionali (Art. 143)."
            },
            {
                question: "Quali distanze metriche stabilisce l'Art. 142 del Codice (Vincoli Galasso) per le coste marine e le sponde dei fiumi?",
                options: [
                    "100 metri per le coste e 50 metri per i fiumi.",
                    "300 metri dalla riva per i territori costieri e 150 metri dalle sponde dei fiumi e torrenti.",
                    "500 metri dalla riva per le coste e 200 metri per i fiumi.",
                    "1.000 metri dalla riva per le coste e 300 metri per i fiumi."
                ],
                correctIndex: 1,
                explanation: "L'Art. 142 stabilisce vincoli metrici precisi: i territori costieri sono tutelati fino a 300 metri dalla linea di battigia, le sponde dei fiumi e torrenti fino a 150 metri dal ciglio di sponda. Per le montagne, la soglia è 1.600 metri per le Alpi e 1.200 metri per gli Appennini."
            },
            {
                question: "Qual è la caratteristica più significativa dell'autorizzazione paesaggistica prevista dall'Art. 146 del Codice?",
                options: [
                    "È un parere consultivo non vincolante che il Comune può disattendere motivatamente.",
                    "È un atto presupposto, autonomo e preliminare rispetto a qualsiasi titolo edilizio, NON sanabile (non può essere rilasciata in sanatoria), con validità di 5 anni.",
                    "È un atto successivo al permesso di costruire, rilasciabile anche dopo i lavori.",
                    "È un nulla osta tacito soggetto al principio del silenzio-assenso dopo 30 giorni."
                ],
                correctIndex: 1,
                explanation: "L'autorizzazione paesaggistica è l'unico atto amministrativo che per legge non è sanabile: non può mai essere rilasciata in sanatoria a lavori ultimati (salvo ristrettissime ipotesi di lieve entità ex Art. 167). È autonoma e preliminare rispetto a qualsiasi titolo edilizio, con validità di 5 anni."
            },
            {
                question: "Quale particolarità distingue il Piano Paesaggistico Regionale da tutti gli altri strumenti urbanistici nella sua formazione?",
                options: [
                    "Viene approvato esclusivamente dal Consiglio comunale.",
                    "È l'unico strumento urbanistico che richiede l'elaborazione congiunta Stato-Regione (copianificazione), prevalendo sugli strumenti urbanistici comunali.",
                    "È un atto del Governo approvato con decreto del Presidente della Repubblica.",
                    "Non ha valore vincolante e funge da mero indirizzo per i Comuni."
                ],
                correctIndex: 1,
                explanation: "Il Piano Paesaggistico è l'unico strumento urbanistico soggetto a copianificazione obbligatoria tra Stato e Regione (Artt. 135 e 143), poiché il paesaggio è un valore costituzionale inderogabile. Le sue prescrizioni d'uso prevalgono su tutti gli strumenti urbanistici comunali (PGT, PRG)."
            },
            {
                question: "In caso di lavori eseguiti senza autorizzazione paesaggistica, quale sanzione prevede l'Art. 167 del Codice?",
                options: [
                    "Una multa simbolica e l'obbligo di presentare l'autorizzazione entro 90 giorni.",
                    "L'obbligo di rimessione in pristino a spese del trasgressore; in alternativa, se i lavori non arrecano danno irreversibile, una sanzione pecuniaria pari al maggior importo tra il danno arrecato e il profitto conseguito.",
                    "La confisca automatica dell'immobile da parte del Comune.",
                    "La sola segnalazione alla Procura della Repubblica senza conseguenze amministrative."
                ],
                correctIndex: 1,
                explanation: "L'Art. 167 prevede come sanzione primaria la rimessione in pristino (demolizione delle opere abusive) a spese del trasgressore. Solo quando il ripristino non è possibile o non è ritenuto necessario, si applica in via alternativa una sanzione pecuniaria pari al maggiore tra il danno arrecato e il profitto conseguito."
            }
        ]
    },

    cap13_sanzioni: {
        subject: "diritto",
        chapterTag: "Cap. XIII",
        title: "Le Sanzioni a Tutela del Patrimonio Culturale",
        questions: [
            {
                question: "La Legge 9 marzo 2022, n. 22 ha introdotto nel Codice Penale un nuovo Titolo dedicato ai reati contro il patrimonio culturale. Come si chiama questo Titolo e dove è collocato?",
                options: [
                    "Titolo XII-bis del Libro III del Codice Penale.",
                    "Titolo VIII-bis del Libro II del Codice Penale, intitolato «Dei delitti contro il patrimonio culturale» (Artt. 518-bis – 518-undevicies c.p.).",
                    "Titolo IV-ter del Codice dei Beni Culturali (D.Lgs. 42/2004).",
                    "Titolo I del Libro I del Codice di Procedura Penale."
                ],
                correctIndex: 1,
                explanation: "La Legge 22/2022 ha inserito nel Codice Penale il Titolo VIII-bis del Libro II, intitolato «Dei delitti contro il patrimonio culturale», contenente fattispecie autonome e aggravate (Artt. 518-bis a 518-undevicies c.p.), spostando i reati più gravi dal Codice dei Beni Culturali al Codice Penale."
            },
            {
                question: "Quale pena detentiva prevede l'Art. 518-bis c.p. per il furto di beni culturali?",
                options: [
                    "Reclusione da 6 mesi a 3 anni.",
                    "Reclusione da 2 a 6 anni e multa da 927 a 1.500 euro.",
                    "Reclusione da 1 a 4 anni.",
                    "Arresto fino a 1 anno e ammenda fino a 2.000 euro."
                ],
                correctIndex: 1,
                explanation: "L'Art. 518-bis c.p. prevede per il furto di beni culturali la reclusione da 2 a 6 anni e la multa da 927 a 1.500 euro. La pena è significativamente più severa rispetto al furto ordinario (Art. 624 c.p.: reclusione da 6 mesi a 3 anni), a tutela dell'eccezionalità del bene."
            },
            {
                question: "Per quale reato contro il patrimonio culturale il Codice Penale prevede la pena più severa, con reclusione da 8 a 15 anni?",
                options: [
                    "Il furto di beni culturali (Art. 518-bis c.p.).",
                    "La ricettazione di beni culturali (Art. 518-quater c.p.).",
                    "La devastazione e il saccheggio di beni culturali (Art. 518-novies c.p.).",
                    "La contraffazione di opere d'arte (Art. 518-quaterdecies c.p.)."
                ],
                correctIndex: 2,
                explanation: "L'Art. 518-novies c.p. punisce con la reclusione da 8 a 15 anni chiunque commette fatti di devastazione e saccheggio aventi ad oggetto beni culturali. Si tratta della fattispecie più gravemente sanzionata del Titolo VIII-bis, a tutela del patrimonio contro atti di distruzione sistematica."
            },
            {
                question: "Quale effetto patrimoniale accessorio è disposto per tutti i reati del Titolo VIII-bis del Codice Penale?",
                options: [
                    "L'obbligo di risarcimento in denaro pari al doppio del valore del bene.",
                    "La confisca obbligatoria dei beni culturali oggetto del reato e del profitto derivante dal reato.",
                    "La sospensione della patente di guida per 5 anni.",
                    "L'interdizione perpetua dai pubblici uffici."
                ],
                correctIndex: 1,
                explanation: "Per tutti i delitti del Titolo VIII-bis è disposta la confisca obbligatoria sia dei beni culturali oggetto del reato (che vengono restituiti al legittimo proprietario o acquisiti dal patrimonio dello Stato) sia del profitto economico derivante dall'attività criminosa."
            },
            {
                question: "Quale pena è prevista dall'Art. 518-duodecies c.p. per la distruzione, il deterioramento, il deturpamento o l'imbrattamento di beni culturali o paesaggistici?",
                options: [
                    "Arresto da 1 a 6 mesi e ammenda fino a 1.000 euro.",
                    "Reclusione da 2 a 5 anni e multa da 2.500 a 15.000 euro.",
                    "Reclusione da 6 a 12 anni.",
                    "Sanzione amministrativa pecuniaria senza conseguenze penali."
                ],
                correctIndex: 1,
                explanation: "L'Art. 518-duodecies c.p. punisce con la reclusione da 2 a 5 anni e la multa da 2.500 a 15.000 euro chiunque distrugga, disperda, deteriori, danneggi, deturpi o imbratti beni culturali o paesaggistici propri o altrui. Si noti che il reato è configurabile anche sul bene di proprietà del reo."
            }
        ]
    },

    pub1_costituzione: {
        subject: "diritto",
        chapterTag: "D. Pub. I",
        title: "Il Diritto Pubblico e la Costituzione Italiana",
        questions: [
            {
                question: "Cosa distingue una norma giuridica da altre regole sociali o morali?",
                options: [
                    "La norma giuridica è scritta obbligatoriamente in latino arcaico.",
                    "La norma giuridica è coattiva e supportata dal monopolio statale della forza per garantirne il rispetto.",
                    "La norma giuridica è flessibile e può essere disapplicata se il destinatario dichiara di non essere d'accordo.",
                    "La norma giuridica si applica esclusivamente ai rapporti patrimoniali tra privati cittadini."
                ],
                correctIndex: 1,
                explanation: "La norma giuridica è coattiva, il che significa che l'ordinamento prevede sanzioni e può ricorrere all'uso della forza pubblica legittima per imporne il rispetto anche contro la volontà del destinatario, a differenza delle norme morali o di costume."
            },
            {
                question: "Quando è entrata formalmente in vigore la Costituzione della Repubblica Italiana?",
                options: [
                    "Il 2 giugno 1946, giorno del referendum istituzionale.",
                    "Il 1° gennaio 1948, dopo l'approvazione dell'Assemblea Costituente.",
                    "Il 22 dicembre 1947, giorno della votazione finale.",
                    "Il 17 marzo 1861, in concomitanza con l'Unità d'Italia."
                ],
                correctIndex: 1,
                explanation: "La Costituzione è stata approvata dall'Assemblea Costituente il 22 dicembre 1947 ed è entrata ufficialmente in vigore il 1° gennaio 1948, segnando la nascita dello Stato costituzionale repubblicano."
            },
            {
                question: "Cosa si intende in diritto per \"rigidità della costituzione\"?",
                options: [
                    "L'impossibilità assoluta di modificare qualsiasi articolo della Costituzione.",
                    "Il fatto che le sue disposizioni possono essere integrate o modificate solo con procedure speciali e più complesse (aggravate) rispetto alle leggi ordinarie.",
                    "La natura puramente scritta e non modificabile del testo conservato negli archivi di Stato.",
                    "L'applicazione inflessibile delle pene senza alcuna possibilità di concessione di attenuanti."
                ],
                correctIndex: 1,
                explanation: "La rigidità costituzionale indica che la Costituzione si pone al vertice gerarchico delle fonti e non può essere modificata da una normale legge del Parlamento, ma richiede la procedura aggravata prevista dall'Art. 138 Cost."
            },
            {
                question: "Quanti articoli componevano originariamente il testo della Costituzione Italiana?",
                options: [
                    "139 articoli, oltre a 18 disposizioni transitorie e finali.",
                    "150 articoli suddivisi in tre parti paritarie.",
                    "12 articoli che contengono solo i diritti dell'uomo.",
                    "57 articoli dedicati all'organizzazione dello Stato."
                ],
                correctIndex: 0,
                explanation: "La Costituzione italiana conta originariamente 139 articoli (di cui 5 successivamente abrogati nel tempo a seguito di riforme) e 18 disposizioni transitorie e finali."
            },
            {
                question: "In quale organo costituzionale risiede l'esercizio del potere giudiziario nell'ordinamento italiano?",
                options: [
                    "Nel Governo e nei singoli Ministeri competenti.",
                    "Nel Parlamento, per il tramite delle commissioni d'inchiesta.",
                    "Nella Magistratura, che costituisce un ordine autonomo e indipendente da ogni altro potere.",
                    "Nella Corte Costituzionale in via esclusiva."
                ],
                correctIndex: 2,
                explanation: "In base al principio di separazione dei poteri, il potere giudiziario (l'applicazione delle leggi ai casi concreti) è affidato alla Magistratura, definita dalla Costituzione come un ordine autonomo e indipendente da ogni altro potere dello Stato."
            }
        ]
    },

    pub2_governo_parlamento: {
        subject: "diritto",
        chapterTag: "D. Pub. II",
        title: "Gli Organi dello Stato: Parlamento e Governo",
        questions: [
            {
                question: "Quale caratteristica definisce il bicameralismo del Parlamento italiano?",
                options: [
                    "Un bicameralismo imperfetto, in cui il Senato ha solo funzioni consultive e non vota le leggi.",
                    "Un bicameralismo perfetto o paritario, dove Camera dei deputati e Senato hanno gli stessi poteri e funzioni costituzionali.",
                    "Un bicameralismo monocamerale, in cui le decisioni vengono sempre prese in aule riunite in seduta comune.",
                    "Un bicameralismo federale, in cui una Camera rappresenta i Comuni e l'altra rappresenta le Province."
                ],
                correctIndex: 1,
                explanation: "In Italia vige il bicameralismo perfetto: affinché un disegno di legge diventi legge, deve essere approvato nel medesimo testo da entrambe le Camere (Camera dei Deputati e Senato della Repubblica)."
            },
            {
                question: "Quale delle seguenti figure fa parte degli organi governativi definiti \"non necessari\"?",
                options: [
                    "Il Presidente del Consiglio dei Ministri.",
                    "Il Ministro senza portafoglio.",
                    "Il Ministro degli Affari Esteri.",
                    "Il Consiglio dei Ministri in composizione collegiale."
                ],
                correctIndex: 1,
                explanation: "I ministri senza portafoglio (così come i viceministri, i sottosegretari e i vicepresidenti del Consiglio) sono organi non necessari, introdotti con legge ordinaria. Gli organi necessari (PdC, Ministri e CDM) sono invece previsti direttamente dall'Art. 92 della Costituzione."
            },
            {
                question: "Entro quale termine costituzionale il Governo appena nominato deve presentarsi alle Camere per esporre il programma e ottenere la fiducia?",
                options: [
                    "Entro 48 ore dal giuramento.",
                    "Entro 10 giorni dalla sua formazione.",
                    "Entro 30 giorni dalla pubblicazione del decreto sul Quirinale.",
                    "Entro 60 giorni, coincidente con la durata massima dell'ordinaria amministrazione."
                ],
                correctIndex: 1,
                explanation: "Ai sensi dell'Articolo 94 della Costituzione, entro dieci giorni dalla sua formazione (avvenuta con la firma dei decreti e il giuramento), il Governo si deve presentare alle Camere per ottenerne la fiducia."
            },
            {
                question: "In quale dei seguenti casi il Parlamento si riunisce in \"seduta comune\" integrato dai delegati regionali?",
                options: [
                    "Per deliberare lo stato di guerra o convertire decreti d'urgenza.",
                    "Per approvare le leggi costituzionali e di revisione.",
                    "Per eleggere il Presidente della Repubblica.",
                    "Per approvare la mozione di sfiducia contro il Governo."
                ],
                correctIndex: 2,
                explanation: "Il Parlamento in seduta comune (presieduto dal Presidente della Camera) si riunisce a Montecitorio per eleggere il Presidente della Repubblica (in questo caso integrato da 3 delegati per regione, 1 per la Valle d'Aosta), per l'elezione di 1/3 dei giudici della Corte Costituzionale, di 1/3 del CSM e per la messa in stato d'accusa del PdR."
            },
            {
                question: "Che valore assume la \"controfirma\" ministeriale (Art. 89 Cost.) sugli atti del Presidente della Repubblica sostanzialmente presidenziali (decisi dal PdR)?",
                options: [
                    "Ha valore puramente economico per coprire le spese dell'atto.",
                    "Ha valore di controllo formale sulla regolarità dell'atto, mentre la decisione spetta al Presidente della Repubblica che ne è autore.",
                    "Ha valore decisionale, obbligando il Presidente della Repubblica a firmare ciò che il ministro propone.",
                    "Serve solo come registrazione notarile e non influisce sulla validità giuridica dell'atto."
                ],
                correctIndex: 1,
                explanation: "Negli atti sostanzialmente presidenziali (es. nomina dei 5 senatori a vita), la decisione spetta al PdR. La controfirma del ministro attesta la regolarità formale dell'atto, sollevando il PdR dalla responsabilità politica."
            }
        ]
    },

    pub3_fonti_diritto: {
        subject: "diritto",
        chapterTag: "D. Pub. III",
        title: "Le Fonti del Diritto e il Pluralismo Giuridico",
        questions: [
            {
                question: "Come si risolve un'antinomia (conflitto) tra due norme di pari grado gerarchico entrate in vigore in momenti diversi?",
                options: [
                    "Prevale sempre la norma speciale anche se precedente.",
                    "Si applica il criterio cronologico, in base al quale la norma successiva abroga quella precedente.",
                    "Entrambe le norme vengono dichiarate illegittime dalla Corte Costituzionale.",
                    "La risoluzione è rimessa a un arbitrato internazionale dell'Unione Europea."
                ],
                correctIndex: 1,
                explanation: "Il criterio cronologico dispone che la norma più recente nel tempo prevale su quella precedente di pari grado gerarchico, determinando l'abrogazione della norma più vecchia."
            },
            {
                question: "In base all'Articolo 138 Cost., in quale dei seguenti casi NON è consentito richiedere il referendum costituzionale confermativo?",
                options: [
                    "Se la legge è stata approvata in seconda votazione a maggioranza assoluta dei componenti di ciascuna Camera.",
                    "Se la legge è stata approvata in seconda votazione con la maggioranza qualificata dei 2/3 dei componenti di ciascuna Camera.",
                    "Se la richiesta viene formulata da almeno 5 Consigli regionali.",
                    "Se la richiesta viene presentata da 500.000 elettori entro tre mesi."
                ],
                correctIndex: 1,
                explanation: "L'Art. 138 stabilisce che non si fa luogo a referendum confermativo se la legge costituzionale è stata approvata nella seconda votazione da ciascuna delle Camere a maggioranza qualificata dei due terzi dei suoi componenti."
            },
            {
                question: "Cosa accade a un decreto-legge (DL) se il Parlamento non lo converte in legge entro 60 giorni dalla pubblicazione?",
                options: [
                    "Resta in vigore come regolamento secondario governativo.",
                    "Perde efficacia sin dall'inizio (decadenza retroattiva ex tunc), come se non fosse mai stato emanato.",
                    "Viene automaticamente prorogato per ulteriori 60 giorni dal Presidente della Repubblica.",
                    "Cessa di avere efficacia solo per il futuro (ex nunc), mantenendo salvi gli effetti passati."
                ],
                correctIndex: 1,
                explanation: "Il decreto-legge è una fonte provvisoria adottata in casi di necessità e urgenza. Se non convertito in legge dal Parlamento entro 60 giorni, perde efficacia retroattivamente (*ex tunc*)."
            },
            {
                question: "Quale differenza distingue un Regolamento dell'Unione Europea da una Direttiva UE?",
                options: [
                    "Il Regolamento si applica solo all'estero, la Direttiva solo in Italia.",
                    "Il Regolamento ha portata generale ed è direttamente applicabile negli Stati membri, mentre la Direttiva vincola gli Stati al raggiungimento di un obiettivo ma richiede un atto nazionale di recepimento.",
                    "Il Regolamento è emanato dal Parlamento europeo, la Direttiva dal Consiglio dei Ministri italiano.",
                    "Il Regolamento dura solo 5 anni, la Direttiva ha validità perpetua."
                ],
                correctIndex: 1,
                explanation: "Il regolamento UE ha diretta applicabilità e si impone immediatamente negli ordinamenti nazionali senza atti di recepimento. La direttiva fissa invece scopi obbligatori lasciando agli Stati la scelta sui mezzi e le forme per raggiungerli tramite leggi di attuazione."
            },
            {
                question: "Ai sensi dell'Articolo 117 della Costituzione italiana, a quale ente spetta la potestà legislativa esclusiva in materia di \"tutela dei beni culturali\"?",
                options: [
                    "Alle Regioni, in forza del principio di sussidiarietà.",
                    "Allo Stato, che la esercita in via esclusiva su tutto il territorio nazionale.",
                    "A Stato e Regioni in modo concorrente tramite leggi quadro.",
                    "Ai Comuni d'intesa con le singole Soprintendenze locali."
                ],
                correctIndex: 1,
                explanation: "L'Articolo 117, comma 2, lettera s), riserva in via esclusiva allo Stato la potestà legislativa in materia di tutela dell'ambiente, dell'ecosistema e dei beni culturali, al fine di garantire una protezione uniforme sul territorio nazionale. Alle Regioni spetta la valorizzazione (potestà concorrente)."
            }
        ]
    },

    pub4_diritti_liberta: {
        subject: "diritto",
        chapterTag: "D. Pub. IV",
        title: "I Diritti e le Libertà Costituzionali",
        questions: [
            {
                question: "Quale principio fondamentale è codificato dall'Articolo 3, comma 2, della Costituzione (uguaglianza sostanziale)?",
                options: [
                    "L'uguaglianza dei cittadini davanti alla legge senza distinzioni di sesso, razza o religione.",
                    "Il dovere della Repubblica di rimuovere gli ostacoli economici e sociali che limitano di fatto la libertà e l'uguaglianza dei cittadini.",
                    "L'obbligo per ciascun cittadino di concorrere alle spese pubbliche in base alla propria capacità contributiva.",
                    "L'uguaglianza morale e giuridica dei coniugi all'interno del matrimonio."
                ],
                correctIndex: 1,
                explanation: "L'uguaglianza sostanziale impegna la Repubblica a rimuovere attivamente gli ostacoli materiali che di fatto impediscono il pieno sviluppo della persona e l'effettiva partecipazione dei lavoratori alla vita del Paese."
            },
            {
                question: "Quali garanzie costituzionali richiede l'Articolo 13 per poter limitare legittimamente la libertà personale?",
                options: [
                    "La sola presenza delle forze dell'ordine sul luogo del reato.",
                    "La riserva di legge (casi e modi stabiliti dalla legge) e la riserva di giurisdizione (atto motivato dell'autorità giudiziaria).",
                    "La denuncia formale scritta di almeno tre cittadini italiani maggiorenni.",
                    "La convalida immediata del Prefetto o del Questore della provincia."
                ],
                correctIndex: 1,
                explanation: "La libertà personale è tutelata da una doppia garanzia: riserva di legge (solo il legislatore stabilisce le regole) e riserva di giurisdizione (solo un giudice può autorizzare provvedimenti restrittivi)."
            },
            {
                question: "In caso di fermo o arresto d'urgenza operato dalla pubblica sicurezza, entro quante ore l'atto deve essere comunicato al giudice per la convalida?",
                options: [
                    "Entro 12 ore dal fermo.",
                    "Entro 48 ore (e il giudice ha ulteriori 48 ore per convalidarlo, pena la decadenza).",
                    "Entro 7 giorni lavorativi.",
                    "Non vi sono limiti temporali rigidi purché vi sia flagranza di reato."
                ],
                correctIndex: 1,
                explanation: "I provvedimenti provvisori restrittivi presi dalle forze dell'ordine devono essere comunicati entro 48 ore all'autorità giudiziaria e convalidati da questa nelle 48 ore successive, altrimenti l'arresto decade retroattivamente."
            },
            {
                question: "Per quale tipologia di riunione (Articolo 17 della Costituzione) è richiesto il \"preavviso\" scritto al Questore?",
                options: [
                    "Per le riunioni tenute in luogo privato.",
                    "Per le riunioni tenute in luogo aperto al pubblico (es. cinema, teatri).",
                    "Per le riunioni tenute in luogo pubblico (es. strade, piazze).",
                    "Nessuna riunione richiede preavviso, in quanto il diritto di riunione è sempre libero."
                ],
                correctIndex: 2,
                explanation: "Le riunioni in luogo pubblico richiedono il preavviso scritto alle autorità almeno 3 giorni prima, per consentire la gestione dell'ordine e della sicurezza pubblica. Il Questore può vietarle solo per comprovati motivi di sicurezza o salute pubblica."
            },
            {
                question: "Quali tipi di associazioni sono espressamente vietate dall'Articolo 18 della Costituzione?",
                options: [
                    "Le associazioni politiche che si oppongono al Governo in carica.",
                    "Le associazioni segrete e quelle che perseguono, anche indirettamente, scopi politici mediante organizzazioni di carattere militare.",
                    "Le associazioni culturali e sportive prive di statuto vidimato.",
                    "Le associazioni sindacali con iscritti stranieri."
                ],
                correctIndex: 1,
                explanation: "L'Articolo 18 vieta le associazioni segrete (che occultano soci o scopi per influenzare le istituzioni) e le associazioni paramilitari che usano una struttura di tipo militare per fini politici."
            }
        ]
    },

    pub5_proprieta_impresa: {
        subject: "diritto",
        chapterTag: "D. Pub. V",
        title: "Costituzione Economica: Proprietà e Impresa",
        questions: [
            {
                question: "Quali limiti pone l'Articolo 41 della Costituzione alla libertà d'iniziativa economica privata?",
                options: [
                    "Non può essere avviata da cittadini privi di titoli accademici specifici.",
                    "Non può svolgersi in contrasto con l'utilità sociale o in modo da recare danno alla salute, all'ambiente, alla sicurezza, alla libertà e alla dignità umana.",
                    "È soggetta al monopolio esclusivo dello Stato in tutti i settori commerciali.",
                    "Non può superare i tetti di profitto stabiliti annualmente dalla Legge di Bilancio."
                ],
                correctIndex: 1,
                explanation: "L'iniziativa economica privata è libera (Art. 41 comma 1), ma non può essere svolta a danno del benessere sociale, della salute, dell'ambiente (riforma 2022) o dei diritti fondamentali dei lavoratori."
            },
            {
                question: "Che cosa si intende per \"funzione sociale\" della proprietà privata (Articolo 42 Cost.)?",
                options: [
                    "L'obbligo del proprietario di consentire il libero accesso a chiunque all'interno del proprio bene.",
                    "La facoltà del legislatore ordinario di imporre limiti e obblighi per contemperare l'interesse egoistico del proprietario con l'utilità e il benessere collettivo.",
                    "La destinazione automatica del bene a uffici pubblici o sindacali in caso di inutilizzo.",
                    "L'esenzione totale dalle imposte per tutti i proprietari di beni storici dichiarati."
                ],
                correctIndex: 1,
                explanation: "La funzione sociale giustifica l'intervento del legislatore nel limitare il godimento del proprietario privato per soddisfare interessi generali (es. vincoli di tutela storico-artistica e paesaggistica)."
            },
            {
                question: "Quali sono i tre requisiti costituzionali richiesti per procedere all'espropriazione di un bene privato (Art. 42)?",
                options: [
                    "Una condanna penale passata in giudicato, la presenza di testimoni e un decreto ministeriale.",
                    "La riserva di legge (casi previsti dalla legge), motivi di interesse generale e il pagamento di un indennizzo.",
                    "La perizia della Soprintendenza, la delibera del Comune e il consenso del proprietario.",
                    "La mancanza di eredi legittimi, lo stato di insolvenza e lo stato di abbandono del bene."
                ],
                correctIndex: 1,
                explanation: "L'espropriazione è legittima solo se prevista da una legge ordinaria, motivata da un reale interesse pubblico (es. infrastruttura, scavo archeologico) e accompagnata dal pagamento di un indennizzo che ristori il proprietario."
            },
            {
                question: "Quale regime giuridico caratterizza i beni del \"demanio pubblico accidentale\" (es. musei, archivi, pinacoteche pubbliche)?",
                options: [
                    "Possono essere alienati liberamente a privati senza alcuna autorizzazione ministeriale.",
                    "Appartengono necessariamente allo Stato per la loro stessa conformazione fisica naturale.",
                    "Se appartengono a enti pubblici territoriali, sono soggetti al regime demaniale di inalienabilità assoluta e non possono formare oggetto di diritti di terzi.",
                    "Sono pignorabili dai creditori dell'ente pubblico proprietario in caso di dissesto finanziario."
                ],
                correctIndex: 2,
                explanation: "I beni del demanio accidentale (storico-artistico) sono inalienabili se appartengono allo Stato o ad altri enti pubblici territoriali, e non possono essere sottratti alla loro destinazione pubblica se non nei modi speciali stabiliti dalla legge."
            },
            {
                question: "In quale categoria rientrano i beni pubblici che, pur non essendo demaniali, non possono essere sottratti alla loro destinazione pubblica se non nei modi stabiliti dalle leggi speciali (es. caserme, uffici pubblici)?",
                options: [
                    "Beni del demanio necessario.",
                    "Beni del patrimonio indisponibile.",
                    "Beni del patrimonio disponibile.",
                    "Beni culturali privati dichiarati."
                ],
                correctIndex: 1,
                explanation: "I beni del patrimonio indisponibile (Art. 826 c.c.) servono direttamente all'esercizio di funzioni pubbliche o servizi pubblici (es. caserme, uffici statali, miniere) e non possono essere venduti o sottratti alla loro destinazione se non tramite apposite procedure di sclassificazione."
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
,

    // ═══════════════════════════════════════════════════════════════
    // ARTE ROMANA — 10 Capitoli × 5 Domande = 50 Domande
    // ═══════════════════════════════════════════════════════════════

    cap1_introduzione: {
        subject: "arte_romana",
        chapterTag: "Cap. I",
        title: "Introduzione metodologica e storiografica",
        questions: [
            {
                question: "Quale visione dell'arte romana proponeva Johann Joachim Winckelmann nella sua opera del 1764?",
                options: [
                    "Un'arte dotata di piena autonomia formale che raggiunge il suo massimo splendore sotto Augusto.",
                    "Un'arte greca sotto i Romani, caratterizzata da una progressiva decadenza e priva di vera originalità.",
                    "Un'espressione puramente italica che si oppone radicalmente ai modelli greci classici.",
                    "Una corrente artistica volta esclusivamente all'utilitarismo e priva di qualsiasi pregio estetico."
                ],
                correctIndex: 1,
                explanation: "Per Winckelmann, l'arte romana non aveva un'identità autonoma ma rappresentava una decadenza dell'arte greca sotto il dominio di Roma, con un tracollo stilistico che si consumava a partire dall'età imperiale."
            },
            {
                question: "In quali ambiti Franz Wickhoff individuò l'originalità dell'arte romana rispetto a quella greca?",
                options: [
                    "L'uso dell'ordine dorico, la pittura su cavalletto e la statuaria bronzea colossale.",
                    "L'illusionismo ottico-spaziale, la narrazione continuata e il ritratto realistico.",
                    "La prospettiva lineare geometrica, la pittura vascolare e le scene mitologiche.",
                    "L'impiego del marmo carrarese, la fusione a cera persa e le scene di parata militare."
                ],
                correctIndex: 1,
                explanation: "Studiando la Genesi di Vienna, Wickhoff riconobbe all'arte romana l'originalità nella resa spaziale illusionistica, nella narrazione continua senza stacchi temporali (es. Colonna Traiana) e nel ritratto realistico."
            },
            {
                question: "Quali sono i tre stadi dello sviluppo del Kunstwollen definiti da Alois Riegl?",
                options: [
                    "Stadio lineare, stadio pittorico e stadio plastico.",
                    "Stadio arcaico, stadio classico e stadio tardo-ellenistico.",
                    "Stadio tattico, stadio ottico-geometrico e stadio spaziale.",
                    "Stadio tattile (visione ravvicinata), stadio tattile-ottico (visione normale) e stadio ottico (visione da lontano)."
                ],
                correctIndex: 3,
                explanation: "Riegl propose una scansione dell'evoluzione formale basata sulla percezione visiva: tattile per l'arte egizia, tattile-ottica per l'arte greca classica e ottica per l'arte tardoantica."
            },
            {
                question: "Come interpreta Ranuccio Bianchi Bandinelli lo scontro formale tra 'arte senatoria' e 'arte plebea'?",
                options: [
                    "Come una differenza geografica tra le officine di Roma e quelle delle province orientali.",
                    "Come un riflesso ideologico dello scontro sociale tra la classe patrizio-senatoria e il ceto medio dei liberti e commercianti.",
                    "Come il passaggio cronologico tra l'età repubblicana e l'età imperiale.",
                    "Come una pura scelta estetica operata dagli scultori greci immigrati a Roma."
                ],
                correctIndex: 2,
                explanation: "Secondo lo storicismo marxista di Bianchi Bandinelli, l'arte senatoria (aulica e classicizzante) e l'arte plebea (espressionista, paratattica, con proporzioni gerarchiche) riflettono le diverse ideologie e il posizionamento sociale delle classi committenti."
            },
            {
                question: "Secondo la teoria del linguaggio formale di Tonio Hölscher, in che modo i Romani riutilizzano i modelli greci?",
                options: [
                    "Copiandoli in modo identico senza apportare alcuna modifica stilistica o concettuale.",
                    "Attraverso un sistema semantico in cui stili greci diversi sono scelti appositamente in base al messaggio politico o religioso da trasmettere.",
                    "Utilizzando esclusivamente lo stile arcaizzante per tutti i tipi di monumenti pubblici.",
                    "Sostituendo completamente la scultura in pietra con la modellazione fittile etrusca."
                ],
                correctIndex: 1,
                explanation: "Hölscher teorizza che l'arte romana usi stili greci diversi (classico per le divinità, ellenistico/barocco per le battaglie, arcaico per culti antichi) come codici semantici per dare uno specifico significato romano all'immagine."
            }
        ]
    },
    cap2_fondazione: {
        subject: "arte_romana",
        chapterTag: "Cap. II",
        title: "Origini di Roma e influenza etrusca",
        questions: [
            {
                question: "Quali erano le tre fasi del rituale etrusco di fondazione di una città adottate per Roma?",
                options: [
                    "Liberatus (purificazione), Effatus (limiti) e Inauguratus (consacrazione sotto auspici).",
                    "Pomerium (tracciamento), Cardo (orientamento) e Decumanus (scansione).",
                    "Augurium (volo degli uccelli), Haruspicina (viscere) e Sacrificium (consacrazione).",
                    "Effatus (enunciazione), Pomerium (aratro) e Templum (spazio sacro)."
                ],
                correctIndex: 0,
                explanation: "Il cerimoniale di fondazione prevedeva la purificazione del luogo (liberatus), la definizione verbale e fisica dei confini (effatus) e la consacrazione formale tramite rito augurale (inauguratus)."
            },
            {
                question: "Quali materiali differenziano la fase arcaica da quella repubblicana (378 a.C.) nelle Mura Serviane?",
                options: [
                    "Il marmo pentelico per la fase arcaica e il travertino per la fase repubblicana.",
                    "Il calcestruzzo per la fase arcaica e il mattone cotto per la fase repubblicana.",
                    "Il tufo grigio locale (cappellaccio) per la fase arcaica e il tufo di Grotta Oscura per la fase repubblicana.",
                    "Il tufo di Monteverde per la fase arcaica e il peperino per la fase repubblicana."
                ],
                correctIndex: 2,
                explanation: "Le prime difese serviane arcaiche erano in blocchi di cappellaccio (tufo locale friabile). Dopo il sacco gallico del 390 a.C., le mura vennero ricostruite nel 378 a.C. impiegando il tufo di Grotta Oscura proveniente dal territorio di Veio."
            },
            {
                question: "Quale caratteristica tipologica presentava il Tempio di Giove Ottimo Massimo sul Campidoglio?",
                options: [
                    "Era un tempio periptero circolare in marmo su tre gradini di crepidine.",
                    "Era un tempio etrusco-italico su alto podio, quasi quadrato, con tre celle parallele e profondo pronao.",
                    "Era un tempio diptero con doppia fila di colonne e due celle speculari addossate.",
                    "Era un tempio pseudoperiptero in mattoni con una singola cella monumentale."
                ],
                correctIndex: 1,
                explanation: "Inaugurato nel 509 a.C., rispondeva al tipo etrusco-italico: sorgeva su un alto podio di cappellaccio, diviso in tre celle (Giove, Giunone, Minerva) precedute da un profondo pronao colonnato, privo di colonnato posteriore (sine postico)."
            },
            {
                question: "Cosa raffigurano le sculture acroteriali tardo-arcaiche rinvenute nell'area sacra di Sant'Omobono?",
                options: [
                    "L'apoteosi di Romolo e Remo alla presenza di Faustolo.",
                    "Ercole introdotto e protetto da Minerva armata.",
                    "Un sacrificio di suovetaurilia officiato da Servio Tullio.",
                    "La contesa tra Minerva e Nettuno per il controllo del Lazio."
                ],
                correctIndex: 1,
                explanation: "Il gruppo acroteriale fittile (540-530 a.C.) mostra Minerva armata che introduce Ercole. Questa raffigurazione era un manifesto politico legato a Servio Tullio, che si assimilava all'eroe protetto dalla dea."
            },
            {
                question: "Cos'è la 'tessera hospitalis' rinvenuta a Sant'Omobono e cosa documenta?",
                options: [
                    "Una tavoletta bronzea che elenca i dazi doganali del porto fluviale.",
                    "Un oggetto in avorio a forma di leoncino con iscrizione etrusca, che documenta gli scambi commerciali e diplomatici arcaici.",
                    "Una maschera funebre in cera appartenente a un mercante greco.",
                    "Un gettone fittile usato per l'accesso ai giochi nel Foro Boario."
                ],
                correctIndex: 1,
                explanation: "La tessera hospitalis in avorio, databile al VI secolo a.C., reca un nome etrusco legato a Sulcis (Sardegna), dimostrando i ricchi contatti internazionali del porto arcaico sul Tevere."
            }
        ]
    },
    cap3_repubblica: {
        subject: "arte_romana",
        chapterTag: "Cap. III",
        title: "L'età repubblicana tra V e III secolo a.C.",
        questions: [
            {
                question: "Quale innovazione artistica è legata ai pittori greci Damofilo e Gorgaso nel 493 a.C.?",
                options: [
                    "La fusione della statua bronzea del Bruto Capitolino.",
                    "La decorazione fittile e pittorica del Tempio di Cerere, Libero e Libera sull'Aventino.",
                    "L'introduzione della pittura trionfale su tela nel Foro Romano.",
                    "Il disegno del fregio dorico del Sarcofago di Scipione Barbato."
                ],
                correctIndex: 1,
                explanation: "Damofilo e Gorgaso furono chiamati a decorare con terrecotte e pitture il Tempio di Cerere sull'Aventino nel 493 a.C., segnando una delle prime importazioni dirette di artisti greci a Roma."
            },
            {
                question: "Quali elementi figurativi e iscrizioni caratterizzano la celebre Ficoroni Cista?",
                options: [
                    "Scene del mito degli Argonauti incise sul bronzo e la firma del fabbricante Novio Plautio.",
                    "Rilievi con la processione trionfale dei generali romani e un'iscrizione a Scipione.",
                    "Decorazioni a rilievo in oro con le fatiche di Ercole e una dedica a Giove.",
                    "Affreschi in secondo stile raffiguranti paesaggi bucolici e la firma di un artista campano."
                ],
                correctIndex: 0,
                explanation: "La cista presenta incisioni in bronzo del mito degli Argonauti (punizione di Amico) e un'iscrizione in latino arcaico che cita il creatore Novio Plautio e la committente Dindia Macolnia."
            },
            {
                question: "In quale materiale è realizzato il Sarcofago di Scipione Barbato e quale stile architettonico richiama?",
                options: [
                    "In marmo carrarese, a forma di tempio corinzio.",
                    "In tufo peperino, a forma di altare ellenistico con fregio dorico e volute ioniche.",
                    "In terracotta dipinta, a forma di letto conviviale etrusco.",
                    "In bronzo dorato, a forma di cassa liscia con iscrizioni in versi saturni."
                ],
                correctIndex: 1,
                explanation: "Il sarcofago (inizi III secolo a.C.) è in peperino e imita un altare ellenistico, fondendo elementi del fregio dorico (metope e triglifi) con volute ioniche sul coronamento."
            },
            {
                question: "Per quale motivo il busto bronzeo del 'Bruto Capitolino' è considerato un capolavoro della ritrattistica repubblicana?",
                options: [
                    "Perché è il primo ritratto imperiale a presentare la corona d'alloro.",
                    "Per l'uso del marmo greco unito alla resa veristica di ascendenza plebea.",
                    "Per la resa espressiva dei valori del mos maiorum attraverso occhi in pasta vitrea, barba incisa e cipiglio severo.",
                    "Perché raffigura fedelmente le fattezze fisiche del cesaricida Bruto documentate dalle monete."
                ],
                correctIndex: 2,
                explanation: "Il Bruto Capitolino (fine IV - inizio III secolo a.C.) unisce schemi greci dei ritratti dei filosofi con tecniche calligrafiche italiche, esprimendo severità, fermezza e virtù repubblicana."
            },
            {
                question: "Quale evento storico portò alla fondazione del Tempio della Concordia nel 367 a.C.?",
                options: [
                    "La fine della seconda guerra punica e la vittoria contro Cartagine.",
                    "L'approvazione delle Leggi Licinie-Sestie che pacificarono patrizi e plebei.",
                    "La cacciata dei Tarquini e l'istituzione della Repubblica.",
                    "Il superamento della pestilenza grazie all'intervento di Apollo Medico."
                ],
                correctIndex: 1,
                explanation: "Il tempio fu promosso da Marco Furio Camillo nel 367 a.C. per celebrare la riconciliazione tra patrizi e plebei sancita dalle Leggi Licinie-Sestie, che garantivano l'accesso al consolato per i plebei."
            }
        ]
    },
    cap4_ellenismo: {
        subject: "arte_romana",
        chapterTag: "Cap. IV",
        title: "L'influenza ellenistica nel II secolo a.C.",
        questions: [
            {
                question: "Quale primato architettonico spetta al Tempio di Giove Statore eretto all'interno della Porticus Metelli?",
                options: [
                    "È il primo tempio romano ad adottare una cupola in calcestruzzo armato.",
                    "È il primo tempio a Roma costruito interamente in marmo greco alla maniera ellenica.",
                    "È l'unico tempio repubblicano a conservare intatto il podio in cappellaccio.",
                    "È il primo tempio periptero rotondo edificato nel Foro Boario."
                ],
                correctIndex: 1,
                explanation: "Progettato da Ermodoro di Salamina all'interno della Porticus Metelli, fu il primo tempio romano costruito interamente in marmo (marmo di Paro), importando la tipologia greca senza alto podio."
            },
            {
                question: "Cos'era la 'Turma Alexandri' esposta nella Porticus Metelli e quale valore politico assunse?",
                options: [
                    "Un gruppo di 25 statue equestri di Lisippo, bottino di guerra che avviò il fenomeno dell'imitatio Alexandri.",
                    "Una serie di dipinti trionfali raffiguranti le vittorie di Alessandro Magno in Asia.",
                    "Un collegio sacerdotale dedito al culto dinastico dei generali romani.",
                    "Una collezione di armi macedoni consacrata nel Tempio di Giove Statore."
                ],
                correctIndex: 0,
                explanation: "La Turma Alexandri era un monumento bronzeo di Lisippo raffigurante i compagni di Alessandro alla battaglia del Granico. Portata a Roma da Metello nel 146 a.C., spinse i generali romani a emulare il sovrano macedone."
            },
            {
                question: "Quali soluzioni strutturali caratterizzano la Porticus Aemilia dell'Emporium?",
                options: [
                    "Un colonnato continuo in marmo di Carrara con capitelli corinzi in bronzo.",
                    "Una pianta circolare a cupola con oculus centrale aperta sul Tevere.",
                    "Una enorme struttura coperta da volte a botte in opus caementicium disposte su più livelli.",
                    "Un quadriportico greco con templi sine postico dedicati alle divinità marine."
                ],
                correctIndex: 2,
                explanation: "La Porticus Aemilia (193/174 a.C.) era un immenso interporto commerciale in cui le volte a botte di calcestruzzo consentivano di coprire circa 30.000 m² disposti su terrazze digradanti verso il fiume."
            },
            {
                question: "Come si articola lo spazio scenografico nel Santuario di Fortuna Primigenia a Palestrina?",
                options: [
                    "Attorno a una singola cella monumentale posta su un altissimo podio di travertino.",
                    "Su terrazze artificiali scavate sul fianco della collina, collegate da rampe e scale in calcestruzzo.",
                    "In una piazza chiusa dominata da cariatidi greche e fontane monumentali.",
                    "Attorno a un porto artificiale collegato direttamente a un canale navigabile."
                ],
                correctIndex: 1,
                explanation: "Il santuario tardo-ellenistico di Palestrina si sviluppa su terrazze collegate da rampe assiali e scale, unendo la plasticità strutturale del cementizio romano alla concezione scenografica greca del paesaggio."
            },
            {
                question: "Quale sintesi stilistica esprime il Tempio di Portuno nel Foro Boario?",
                options: [
                    "Unisce una pianta circolare greca a un coronamento di volute ioniche arcaiche.",
                    "Combina la pianta del tempio ionico pseudoperiptero greco con l'alto podio di tradizione etrusco-italica.",
                    "Associa colonne doriche in marmo a un frontone fittile modellato da Vulca.",
                    "Accosta una cupola in calcestruzzo a un pronao corinzio in bronzo dorato."
                ],
                correctIndex: 1,
                explanation: "Il Tempio di Portuno presenta mezze colonne addossate alla cella tipiche dello pseudoperiptero greco, ma mantiene l'impianto italico con alto podio e scalinata monumentale solo sul fronte."
            }
        ]
    },
    cap5_tardo_repubblica: {
        subject: "arte_romana",
        chapterTag: "Cap. V",
        title: "Tardo-repubblicano, ritrattistica e Pompeo",
        questions: [
            {
                question: "In che modo Pompeo riuscì a edificare il suo teatro stabile in muratura nel 55 a.C. superando il divieto del Senato?",
                options: [
                    "Corrompendo i censori in carica con il bottino della campagna in Oriente.",
                    "Costruendolo fuori dai confini dell'Italia, nel territorio di Ostia.",
                    "Collocando un tempio a Venere Vincitrice sulla sommità della cavea, rendendo le gradinate una scalinata d'accesso.",
                    "Dedicandolo esclusivamente a spettacoli religiosi e ludi plebei."
                ],
                correctIndex: 2,
                explanation: "Per aggirare il divieto del Senato contro i teatri stabili, Pompeo pose al culmine della cavea un tempio a Venus Victrix, facendo passare le gradinate come una monumentale scalinata d'accesso al luogo sacro."
            },
            {
                question: "Quale istituto sociale e giuridico romano favorì la nascita della ritrattistica veristica patrizia?",
                options: [
                    "Il ius publicum che imponeva la dedica di statue nel Foro Romano.",
                    "Il ius imaginum, ovvero il diritto dei patrizi di conservare ed esibire le maschere funebri in cera degli antenati.",
                    "L'uso delle tabulae triumphales per registrare i tratti fisionomici dei generali.",
                    "La clientela che imponeva ai clienti di regalare busti in marmo al patrono."
                ],
                correctIndex: 1,
                explanation: "Il verismo patrizio (Testa Torlonia, Patrizio di Otricoli) deriva dalle maschere di cera (imagines maiorum) colate sul volto dei defunti e conservate negli atri, che esaltavano le rughe ed i segni della vecchiaia come simboli di virtù civica."
            },
            {
                question: "Quali elementi rendono eccezionale la struttura e le decorazioni della Casa del Fauno a Pompei?",
                options: [
                    "La presenza di affreschi in IV stile e di un anfiteatro privato.",
                    "La facciata in pietra rustica e il monumentale tempio a doppia cella nell'atrio.",
                    "L'articolazione attorno a due atri e due peristili greci, uniti a pavimenti musivi come il Mosaico di Alessandro.",
                    "La totale assenza di decorazioni dipinte a favore di lastre di marmo greco."
                ],
                correctIndex: 2,
                explanation: "La Casa del Fauno è una delle domus più grandi dell'antichità, caratterizzata da due atri, due grandi peristili di tipo ellenistico e mosaici di altissimo livello come quello della battaglia di Isso tra Alessandro e Dario."
            },
            {
                question: "Qual è la caratteristica fondamentale del I Stile della pittura pompeiana?",
                options: [
                    "Lo sfondamento prospettico delle pareti tramite architetture dipinte.",
                    "L'imitazione di lastre marmoree pregiate realizzate in stucco colorato a rilievo.",
                    "L'uso di campiture monocrome piatte con candelabri sottili e mini-quadri.",
                    "La raffigurazione di scene teatrali ed elementi architettonici fantastici."
                ],
                correctIndex: 1,
                explanation: "Il primo stile (Incrostazione o Strutturale) imita i rivestimenti interni in marmo delle ricche regge ellenistiche utilizzando stucco sagomato e dipinto a rilievo."
            },
            {
                question: "Come si distingue il III Stile pittorico (Ornamentale) rispetto al II Stile (Architettonico)?",
                options: [
                    "Rifiuta l'illusionismo prospettico chiudendo la parete con campiture piatte, candelabri e piccoli quadri sospesi.",
                    "Aumenta la profondità spaziale inserendo giardini e paesaggi bucolici complessi.",
                    "Utilizza esclusivamente stucco a rilievo per imitare le murature esterne.",
                    "Introduce grandi scene storiche tratte dalle campagne militari romane."
                ],
                correctIndex: 0,
                explanation: "Il terzo stile (della Parete Chiusa) abbandona i giochi prospettici del secondo stile a favore di pareti piatte, campiture monocrome ed elementi ornamentali filiformi ed esili di gusto egittizzante o classico."
            }
        ]
    },
    cap6_augusto_ara_pacis: {
        subject: "arte_romana",
        chapterTag: "Cap. VI",
        title: "L'età augustea e l'Ara Pacis",
        questions: [
            {
                question: "Quale modello storiografico e architettonico influenzò l'edificazione del Mausoleo di Augusto nel 28 a.C.?",
                options: [
                    "La tholos del Pantheon e la rotonda del tempio di Ercole Vincitore.",
                    "I tumuli sepolcrali etruschi e la monumentalità dei mausolei dinastici ellenistici.",
                    "La staccionata lignea dell'Ara Pacis e il foro di Cesare.",
                    "Gli ustrina degli Antonini e la colonna centenaria."
                ],
                correctIndex: 1,
                explanation: "Il Mausoleo di Augusto combina il tumulo circolare di tradizione italico-etrusca (esaltazione del mos maiorum) con la grandiosità dei monumenti funerari ellenistici orientali per affermare la dinastia Giulio-Claudia."
            },
            {
                question: "In quale anno venne votata dal Senato e in quale anno inaugurata l'Ara Pacis Augustae?",
                options: [
                    "Votata nel 27 a.C. e inaugurata nel 23 a.C.",
                    "Votata nel 13 a.C. e inaugurata nel 9 a.C.",
                    "Votata nel 2 a.C. e inaugurata nel 14 d.C.",
                    "Votata nel 42 a.C. e inaugurata nel 2 a.C."
                ],
                correctIndex: 1,
                explanation: "L'Ara Pacis fu votata dal Senato nel 13 a.C. per il ritorno di Augusto dalle province occidentali e consacrata solennemente il 30 gennaio del 9 a.C."
            },
            {
                question: "Cosa raffigura il registro inferiore del recinto esterno dell'Ara Pacis?",
                options: [
                    "Una parata militare a cavallo con la decursio funebre.",
                    "La sfilata dei membri del Senato e dei magistrati romani.",
                    "Un fitto fregio di girali d'acanto popolato da piccoli animali e cigni, simbolo dell'età dell'oro.",
                    "Le fatiche di Ercole e il mito della fondazione di Roma."
                ],
                correctIndex: 2,
                explanation: "Il registro inferiore presenta una composizione vegetale di girali d'acanto arricchita da piccoli animali, raffigurazione allegorica della fertilità, della pace e del ritorno del saeculum aureum."
            },
            {
                question: "Chi sono i personaggi principali raffigurati nel pannello mitologico della Tellus (o Saturnia Tellus)?",
                options: [
                    "Romolo e Remo allattati dalla lupa alla presenza di Faustolo.",
                    "Enea che sacrifica una scrofa ai Penati di Lavinio.",
                    "Una dea madre seduta tra bambini, frutti e animali, affiancata dalle Aure del vento di terra e di mare.",
                    "La dea Roma seduta su una pila di armi barbariche catturate."
                ],
                correctIndex: 2,
                explanation: "Il pannello est dell'Ara Pacis mostra una divinità femminile (Tellus, Italia o Pax) prospera, seduta tra bimbi e animali, con le personificazioni dei venti terrestri e marini che simboleggiano la fertilità universale."
            },
            {
                question: "Quale messaggio politico esprime la processione storica scolpita sui lati nord e sud dell'Ara Pacis?",
                options: [
                    "La sottomissione delle province barbare d'Oriente e d'Occidente.",
                    "La legittimazione della dinastia imperiale attraverso la sfilata unita di Augusto, dei sacerdoti e dei suoi successori designati.",
                    "La rievocazione storica del trionfo di Augusto nella battaglia di Azio.",
                    "Il giuramento dei soldati romani al princeps prima della campagna gallica."
                ],
                correctIndex: 1,
                explanation: "Il fregio storico (ispirato al Partenone) mostra la famiglia imperiale (con Agrippa, Livia, Tiberio e i figli Gaio e Lucius) accanto ai sacerdoti per propagandare la stabilità dello Stato e la continuità dinastica."
            }
        ]
    },
    cap7_augusto_foro_successori: {
        subject: "arte_romana",
        chapterTag: "Cap. VII",
        title: "Foro di Augusto e Giulio-Claudi",
        questions: [
            {
                question: "Quale divinità era ospitata nel tempio principale del Foro di Augusto e quale promessa celebrava?",
                options: [
                    "Venere Genitrice, a celebrazione dell'origine divina della Gens Iulia.",
                    "Giove Statore, promesso da Metello dopo la conquista della Grecia.",
                    "Marte Ultore (Vendicatore), promesso da Ottaviano a Filippi (42 a.C.) per vendicare l'uccisione di Cesare.",
                    "Apollo Medico, eretto per debellare la pestilenza del V secolo a.C."
                ],
                correctIndex: 2,
                explanation: "Il Tempio di Marte Ultore (inaugurato nel 2 a.C.) fu promesso da Ottaviano nel 42 a.C. prima della battaglia di Filippi contro i cesaricidi Bruto e Cassio."
            },
            {
                question: "Cosa simboleggiavano le Cariatidi collocate nell'attico dei portici del Foro di Augusto?",
                options: [
                    "La sottomissione della Grecia e il ruolo di Roma come garante dell'ordine e della cultura dell'impero.",
                    "Le virtù domestiche delle donne della famiglia Giulio-Claudia.",
                    "La divinizzazione delle province galliche e ispaniche.",
                    "I sacerdoti dediti al culto di Marte e Venere."
                ],
                correctIndex: 0,
                explanation: "Le Cariatidi, copie fedeli di quelle dell'Eretteo di Atene, poste ad alternarsi con scudi di Giove Ammone, simboleggiavano la sottomissione e l'integrazione del mondo greco ed universale sotto l'egida di Roma."
            },
            {
                question: "Quale stile architettonico caratterizza la Porta Maggiore edificata sotto l'imperatore Claudio?",
                options: [
                    "Il classicismo fine in marmo di Luni con capitelli corinzi dorati.",
                    "Lo stile rustico (opus rusticum) con blocchi di travertino lasciati grezzi e sporgenti.",
                    "La muratura in mattoni sormontata da una cupola in calcestruzzo.",
                    "La decorazione con cariatidi e scudi di Giove Ammone."
                ],
                correctIndex: 1,
                explanation: "Claudio scelse per Porta Maggiore (52 d.C.) lo stile rustico, lasciando i blocchi di pietra grezzi per dare una sensazione di forza ingegneristica, solidità e deliberata antichità istituzionale."
            },
            {
                question: "Quali fasi della produzione sono rappresentate nei rilievi della Tomba di Eurisace il Panificatore?",
                options: [
                    "La mietitura del grano nelle province africane e il trasporto marittimo ad Ostia.",
                    "Le fasi della panificazione: scarico del grano, macinazione asinara, impasto, cottura e pesa del pane davanti ai magistrati.",
                    "La vendita dei pani al mercato del Foro Boario e le offerte votive a Cerere.",
                    "Il giuramento dei fornai al prefetto dell'annona e la distribuzione gratuita del pane."
                ],
                correctIndex: 1,
                explanation: "I rilievi della tomba del liberto Eurisace (fine I secolo a.C.) descrivono fedelmente il ciclo di panificazione della sua impresa, incarnando l'orgoglio del lavoro e l'estetica dell'arte plebea."
            },
            {
                question: "Quale virtù celebrava l'Ara Pietatis Augustae completata sotto Claudio nel 43 d.C.?",
                options: [
                    "La sottomissione militare delle tribù germaniche e britanniche.",
                    "La devozione religiosa e il rispetto per i doveri familiari della dinastia imperiale.",
                    "La stabilità economica garantita dalle distribuzioni dell'annona.",
                    "La giustizia imperiale esercitata direttamente dal principe nei tribunali."
                ],
                correctIndex: 1,
                explanation: "L'Ara Pietatis celebrava la pietas (devozione agli dei e alla famiglia) della dinastia giulio-claudia, mostrando rilievi dettagliati di sacrifici solenni dinanzi ai templi monumentali di Roma."
            }
        ]
    },
    cap8_traiano: {
        subject: "arte_romana",
        chapterTag: "Cap. VIII",
        title: "Età flavia e di Traiano",
        questions: [
            {
                question: "Quale scelta urbanistica di Vespasiano caratterizza la collocazione del Colosseo?",
                options: [
                    "Fu costruito sul Quirinale per sostenerne il fianco franoso.",
                    "Fu edificato nel Campo Marzio per facilitare la processione trionfale.",
                    "Fu posto sul sito del lago artificiale della Domus Aurea, restituendo al pubblico un'area privata sottratta da Nerone.",
                    "Fu addossato al tempio di Marte Ultore per scopi difensivi."
                ],
                correctIndex: 2,
                explanation: "Edificare il Colosseo sopra il lago della Domus Aurea servì a Vespasiano come forte atto di propaganda politica: restituire al popolo di Roma, sotto forma di spazio ludico pubblico, il terreno privato espropriato da Nerone."
            },
            {
                question: "Quale espediente prospettico rende celebre il rilievo del corteo trionfale all'interno dell'Arco di Tito?",
                options: [
                    "La disposizione delle figure su piani perfettamente orizzontali e privi di sfondo.",
                    "La prospettiva ribaltata che mostra contemporaneamente l'interno e l'esterno del tempio.",
                    "L'andamento parabolico del corteo che si avvicina e si allontana dallo spettatore creando profondità ottica.",
                    "L'uso di proporzioni gerarchiche in cui Tito è rappresentato grande quanto l'arco."
                ],
                correctIndex: 2,
                explanation: "Il rilievo dell'Arco di Tito (81 d.C.) curva la linea del corteo in senso parabolico, dando l'impressione che i portatori dei bottini e la quadriga stiano girando nello spazio tridimensionale."
            },
            {
                question: "Quale monumento plebeo raffigura dettagliatamente i macchinari da cantiere e le costruzioni flavie?",
                options: [
                    "Il Sarcofago di Scipione Barbato.",
                    "La Tomba di Eurisace il Panificatore.",
                    "La Tomba degli Haterii.",
                    "La decorazione acroteriale di Sant'Omobono."
                ],
                correctIndex: 2,
                explanation: "La Tomba degli Haterii (inizi II secolo d.C.) apparteneva a un costruttore edile e mostra nei dettagli una grande gru mossa da una ruota asinaria (*magna machina*) e i monumenti romani eretti dalla sua impresa."
            },
            {
                question: "Quale fu la funzione della Basilica Ulpia all'interno del Foro di Traiano?",
                options: [
                    "Ospitare le ceneri dell'imperatore all'interno della camera sepolcrale.",
                    "Svolgere funzioni giudiziarie ed economiche come la più grande basilica civile di Roma.",
                    "Essere il tempio principale per il culto di Traiano divinizzato.",
                    "Fungere da mercato coperto per la vendita del grano e dell'olio."
                ],
                correctIndex: 1,
                explanation: "La Basilica Ulpia, progettata da Apollodoro di Damasco, chiudeva la piazza del Foro di Traiano e fungeva da monumentale tribunale e centro di affari amministrativi civili."
            },
            {
                question: "Quale caratteristica distingue la decorazione figurativa della Colonna Traiana?",
                options: [
                    "Un fregio continuo a spirale che narra realisticamente le due guerre daciche senza nascondere il valore dei vinti.",
                    "Scene mitologiche tratte dall'Odissea e dall'Iliade legate alla figura di Enea.",
                    "Una sequenza di tondi raffiguranti cacce dell'imperatore ed eventi miracolosi.",
                    "Pannelli quadrangolari staccati che presentano la divinizzazione di Traiano e Plotina."
                ],
                correctIndex: 0,
                explanation: "La Colonna Traiana (113 d.C.) ospita un fregio coclide di 23 spire che narra le campagne in Dacia con precisione cronachistica e rispetto per i nemici, celebrando Traiano come optimus princeps."
            }
        ]
    },
    cap9_adriano: {
        subject: "arte_romana",
        chapterTag: "Cap. IX",
        title: "L'età di Adriano",
        questions: [
            {
                question: "Quale espediente geometrico definisce lo spazio interno del Pantheon di Adriano?",
                options: [
                    "Un ottagono regolare coperto da volte a crociera incrociate.",
                    "Una sfera perfetta inserita in un cilindro, in cui diametro e altezza corrispondono a 43,30 metri.",
                    "Una serie di cupole ad ombrello disposte in sequenza ellittica.",
                    "Un rettangolo allungato scandito da cariatidi e clypei di Giove Ammone."
                ],
                correctIndex: 1,
                explanation: "La rotonda del Pantheon è progettata in modo che lo spazio interno corrisponda a una sfera perfetta: il diametro alla base della cupola è uguale all'altezza totale da terra all'oculus (43,30 m)."
            },
            {
                question: "Cos'era il Teatro Marittimo all'interno di Villa Adriana a Tivoli?",
                options: [
                    "Una piscina monumentale in cui si svolgevano finti combattimenti navali (naumachie).",
                    "Un'isola artificiale circondata da un canale, usata da Adriano come rifugio privato.",
                    "Un teatro all'aperto decorato con copie bronzee della Scilla rodia.",
                    "Un tempio dedicato al dio Nettuno per propiziare i viaggi imperiali."
                ],
                correctIndex: 1,
                explanation: "Il Teatro Marittimo era una domus privata situata su un'isola artificiale circondata da un canale (euripo) all'interno del complesso perimetrale, accessibile tramite ponti mobili."
            },
            {
                question: "Quali sculture greche ornavano il Canopo di Villa Adriana?",
                options: [
                    "Copie delle Cariatidi dell'Eretteo di Atene, delle Amazzoni e del Doriforo.",
                    "La quadriga di Vulca di Veio e le sculture di Sant'Omobono.",
                    "I rilievi storici dei cavalieri e delle aquile imperiali della via Traiana.",
                    "La serie di statue equestri in bronzo della Turma Alexandri."
                ],
                correctIndex: 0,
                explanation: "Il Canopo (lungo canale a Tivoli) era arricchito da repliche di sculture greche celebri, tra cui cariatidi, statue di guerrieri e personificazioni fluviali care al gusto eclettico di Adriano."
            },
            {
                question: "Quale deviazione dalla tradizione del podio italico presenta il Tempio di Venere e Roma?",
                options: [
                    "Sorgeva su una terrazza sotterranea collegata direttamente al Colosseo.",
                    "Non aveva fondamenta stabili ma era sospeso su archi in cementizio.",
                    "Sorgeva su una crepidine a gradini alla greca ed era un periptero diptero.",
                    "Presentava un podio ottagonale in laterizio ricoperto di marmo colorato."
                ],
                correctIndex: 2,
                explanation: "Il tempio di Venere e Roma (135 d.C.) fu costruito su una crepidine greca a gradini (senza il tradizionale podio ad accesso frontale), seguendo il modello diptero dell'Asia Minore."
            },
            {
                question: "Quale critica storiografica mosse l'architetto Apollodoro di Damasco al progetto del tempio di Venere e Roma voluto da Adriano?",
                options: [
                    "Sostenne che il cementizio usato per le volte sarebbe crollato al primo terremoto.",
                    "Affermò che le celle erano troppo basse rispetto alle statue di culto sedute, che avrebbero urtato il soffitto volendosi alzare.",
                    "Criticò l'uso di mattoni a vista ritenendoli indegni di un tempio statale.",
                    "Sottolineò che la posizione del tempio bloccava l'accesso trionfale al Foro Romano."
                ],
                correctIndex: 1,
                explanation: "Secondo Cassio Dione, Apollodoro criticò l'altezza ridotta delle celle rispetto alle statue colossali delle dee sedute, scontro intellettuale che determinò la sua condanna a morte da parte dell'imperatore."
            }
        ]
    },
    cap10_antonini_tardoantico: {
        subject: "arte_romana",
        chapterTag: "Cap. X",
        title: "Antonini e Tarda Antichità",
        questions: [
            {
                question: "Quale contrapposizione stilistica caratterizza il basamento della Colonna di Antonino Pio?",
                options: [
                    "L'uso contemporaneo dell'incisione su bronzo e della pittura ad affresco.",
                    "Lo stile classicista nella scena dell'Apoteosi e lo stile plebeo/popolare nei lati con la Decursio.",
                    "La prospettiva lineare geometrica unita a rilievi in argilla etrusca.",
                    "La presenza di divinità greche ed egizie disposte in ordine gerarchico."
                ],
                correctIndex: 1,
                explanation: "La base (161 d.C.) mostra sul fronte l'apoteosi classica di stampo ellenizzante, mentre sui lati presenta la decursio (parata militare) in prospettiva ribaltata e figure tozze tipiche dell'arte plebea."
            },
            {
                question: "In cosa differisce lo stile della Colonna di Marco Aurelio rispetto alla precedente Colonna Traiana?",
                options: [
                    "Rinuncia completamente alla narrazione storica a favore di scene mitologiche.",
                    "Usa un rilievo molto più piatto e privo di contrasti chiaroscurali.",
                    "Adotta un rilievo più profondo ottenuto col trapano, figure frontali dell'imperatore ed elementi miracolosi.",
                    "È realizzata interamente in mattoni rivestiti di stucco dorato anziché in marmo."
                ],
                correctIndex: 2,
                explanation: "La Colonna Aureliana (dedicata nel 180 d.C.) presenta un rilievo più sporgente e drammatico lavorato col trapano, la frontazione della figura imperiale e l'inserimento di elementi sovrannaturali come il miracolo della pioggia."
            },
            {
                question: "Da quali monumenti imperiali provengono gli spolia (rilievi di reimpiego) dell'Arco di Costantino?",
                options: [
                    "Dai monumenti di Giulio Cesare, Augusto e Claudio.",
                    "Dai monumenti di Traiano, Adriano e Marco Aurelio.",
                    "Dalla Domus Aurea di Nerone e dal Colosseo dei Flavi.",
                    "Dall'area sacra di Sant'Omobono e dal foro di Nerva."
                ],
                correctIndex: 1,
                explanation: "Costantino utilizzò rilievi appartenenti a Traiano (fregio dacico), Adriano (tondi di caccia) e Marco Aurelio (pannelli storici dell'attico) per collegarsi ideologicamente ai 'buoni imperatori' del passato."
            },
            {
                question: "Quali caratteri formali distinguono i fregi costantiniani eseguiti nel 315 d.C. sull'Arco di Costantino?",
                options: [
                    "L'adesione rigorosa al naturalismo fidiaco e alle proporzioni classiche greche.",
                    "La perdita del naturalismo a favore di figure bidimensionali, rigida simmetria, frontalità e proporzioni gerarchiche.",
                    "La pittura illusionistica impressionista e la prospettiva aerea.",
                    "La modellazione calligrafica della barba e l'inserimento di occhi in pasta vitrea."
                ],
                explanation: "I rilievi costantiniani abbandonano il realismo tridimensionale classico a favore di una composizione gerarchica e simbolica (l'imperatore è grande e frontale al centro), inaugurando lo stile dell'arte medievale."
            },
            {
                question: "Quale scena scolpita sulla Colonna Traiana o sull'Arco di Costantino ispirò a Dante la descrizione del Purgatorio (Canto X)?",
                options: [
                    "Il miracolo di Giove Pluvio che salva le legioni assetate.",
                    "La processione dei portatori del candelabro a sette bracci di Gerusalemme.",
                    "L'imperatore davanti a una donna implorante, interpretata nel Medioevo come la leggenda di Traiano e la vedova.",
                    "La sottomissione del re dace Decebalo e il ponte di barche sul Danubio."
                ],
                correctIndex: 2,
                explanation: "Nel Medioevo la personificazione della via Traiana su una ruota (sull'Arco di Costantino) o le supplici daciche (sulla Colonna Traiana) vennero interpretate come la vedovella che chiede giustizia a Traiano, ispirando i versi del Purgatorio di Dante."
            }
        ]
    },
    sto1_riforma: {
        subject: "storia",
        chapterTag: "Studio I",
        title: "La Riforma Protestante e l'Impero di Carlo V",
        questions: [
            {
                question: "Quale importante decisione fu assunta nei confronti di Martin Lutero durante la Dieta imperiale di Worms nel 1521?",
                options: [
                    "Fu nominato consigliere ecclesiastico dell'Elettore di Sassonia.",
                    "Venne intimato di ritrattare le sue dottrine e, al suo rifiuto, fu bandito dall'Impero.",
                    "Venne condannato immediatamente al rogo come eretico relapso.",
                    "Gli fu concesso il libero insegnamento della teologia presso l'università di Wittenberg."
                ],
                correctIndex: 1,
                explanation: "Alla Dieta di Worms (1521), presieduta da Carlo V, Lutero rifiutò di ritrattare le sue tesi. Di conseguenza, l'imperatore emanò l'Editto di Worms, dichiarando Lutero fuorilegge e vietando la lettura e il possesso dei suoi scritti."
            },
            {
                question: "Quale fu l'atteggiamento di Martin Lutero di fronte alla Guerra dei Contadini (1524-1525) guidata da Thomas Müntzer?",
                options: [
                    "Sostenne attivamente le rivendicazioni antifeudali dei contadini ritenendole espressione del Vangelo.",
                    "Rimase neutrale, ritirandosi in preghiera nel castello di Wartburg.",
                    "Condannò duramente la rivolta, esortando i principi tedeschi alla repressione armata per preservare l'ordine politico voluto da Dio.",
                    "Propose un compromesso pacifico basato sui Dodici Articoli della Lega di Smalcalda."
                ],
                correctIndex: 2,
                explanation: "Lutero rifiutò strenuamente la politicizzazione del suo messaggio religioso. Nel libretto 'Contro le bande brigantesche e assassine dei contadini', giustificò la spietata repressione da parte dei principi, ritenendo che il potere politico debba difendere l'ordine sociale con la spada."
            },
            {
                question: "Cosa stabilì la Pace di Augusta del 1555 sotto il profilo politico-religioso nell'Impero?",
                options: [
                    "L'introduzione della piena libertà di coscienza e tolleranza religiosa per tutti i sudditi dell'impero.",
                    "Il principio del 'cuius regio eius religio', che obbligava i sudditi a seguire la confessione (cattolica o luterana) del proprio sovrano.",
                    "La sottomissione dei principi protestanti all'autorità papale in cambio della secolarizzazione dei beni ecclesiastici.",
                    "Il bando definitivo del luteranesimo e l'adozione esclusiva della confessione calvinista."
                ],
                correctIndex: 1,
                explanation: "La Pace di Augusta (1555) pose fine ai conflitti religiosi in Germania introducendo la formula del 'cuius regio, eius religio'. Solo i principi e i sovrani territoriali potevano scegliere la confessione religiosa (tra cattolicesimo e luteranesimo), mentre i sudditi dissidenti dovevano adeguarsi o emigrare."
            },
            {
                question: "Quale evento drammatico segnò la rottura diplomatica e militare tra l'imperatore Carlo V e papa Clemente VII nel 1527?",
                options: [
                    "Il bando papale emesso contro la Spagna con la bolla Exsurge Domine.",
                    "La firma della Pace di Augusta tra Clemente VII e i principi luterani.",
                    "Il devastante Sacco di Roma compiuto dai lanzichenecchi imperiali senza paga.",
                    "La cattura di papa Clemente VII durante la battaglia di Pavia."
                ],
                correctIndex: 2,
                explanation: "Nel maggio 1527, le truppe imperiali (composte in gran parte da mercenari tedeschi, i lanzichenecchi, molti dei quali luterani) rimaste senza soldo assediarono e saccheggiarono barbaramente Roma. Il Papa si rifugiò a Castel Sant'Angelo e fu costretto a capitolare mesi dopo."
            },
            {
                question: "Con quale provvedimento legislativo del 1534 Enrico VIII si autoproclamò capo della Chiesa d'Inghilterra?",
                options: [
                    "Il Bill of Rights.",
                    "La bolla Exsurge Domine.",
                    "L'Atto di Supremazia (Act of Supremacy).",
                    "Il Book of Common Prayer."
                ],
                correctIndex: 2,
                explanation: "L'Atto di Supremazia votato dal Parlamento inglese nel 1534 dichiarò Enrico VIII e i suoi successori 'capo supremo' della Chiesa d'Inghilterra (anglicana), consumando lo scisma con la Chiesa di Roma in seguito al rifiuto papale di annullare il matrimonio del re con Caterina d'Aragona."
            }
        ]
    },
    sto2_controriforma: {
        subject: "storia",
        chapterTag: "Studio II",
        title: "La Controriforma e la Nascita dello Stato Moderno",
        questions: [
            {
                question: "In quale sessione conciliare e con quali decreti il Concilio di Trento (1545-1563) rispose sul piano dottrinale alla Riforma?",
                options: [
                    "Accettando la dottrina della giustificazione per sola fede ma mantenendo la gerarchia papale.",
                    "Ribadendo la validità dei sette sacramenti, il ruolo del clero come intermediario, il culto dei santi e l'autorità della Vulgata.",
                    "Abolendo il tribunale dell'Inquisizione e autorizzando la traduzione della Bibbia in lingua volgare.",
                    "Sopprimendo gli ordini religiosi contemplativi a favore di ordini caritativi e scolastici."
                ],
                correctIndex: 1,
                explanation: "Il Concilio di Trento respinse in blocco le tesi teologiche protestanti: riaffermò il valore delle opere oltre alla fede, l'esistenza del Purgatorio, la transustanziazione eucaristica, il celibato ecclesiastico, i sette sacramenti e l'autorità interpretativa della Chiesa e del papa."
            },
            {
                question: "Quale organo fu istituito da papa Paolo III nel 1542 con la bolla 'Licet ab initio' per combattere la diffusione dell'eresia?",
                options: [
                    "La Congregazione dell'Indice dei libri proibiti.",
                    "La Congregazione del Sant'Ufficio (Inquisizione Romana).",
                    "La Compagnia di Gesù (Gesuiti).",
                    "Il Consiglio Supremo di Castiglia."
                ],
                correctIndex: 1,
                explanation: "La bolla 'Licet ab initio' (1542) istituì la Congregazione del Sant'Ufficio dell'Inquisizione, una commissione di cardinali dotata di poteri inquisitoriali e di giurisdizione universale per reprimere l'eresia e la dissidenza dottrinale nella penisola italiana."
            },
            {
                question: "Nel contesto dei teorici dello Stato moderno, a chi si deve l'elaborazione del concetto di 'sovranità indivisibile e assoluta' formulato nei 'Sei libri dello Stato' (1576)?",
                options: [
                    "Niccolò Machiavelli.",
                    "Thomas Hobbes.",
                    "Jean Bodin.",
                    "Johannes Althusius."
                ],
                correctIndex: 2,
                explanation: "Jean Bodin, durante le guerre di religione francesi, elaborò l'idea che la sovranità debba essere assoluta, perpetua e indivisibile, risiedendo unicamente nel re, come unico strumento per superare le fazioni e garantire la pace sociale."
            },
            {
                question: "Con quale bolla papale e in quale anno fu approvata la Compagnia di Gesù (Gesuiti), fondata da Ignazio di Loyola?",
                options: [
                    "Bolla Exsurge Domine del 1520.",
                    "Bolla Regimini militantis Ecclesiae del 1540 di Paolo III.",
                    "Bolla Licet ab initio del 1542.",
                    "Bolla Inter Caetera del 1493."
                ],
                correctIndex: 1,
                explanation: "La Compagnia di Gesù fu ufficialmente approvata da papa Paolo III nel 1540 con la bolla 'Regimini militantis Ecclesiae'. Caratterizzata da una rigida struttura gerarchica e dall'obbedienza assoluta al papa, divenne il braccio operativo della Controriforma nell'istruzione delle élite e nelle missioni mondiali."
            },
            {
                question: "Quale opera del 1589 di Giovanni Botero formalizzò il concetto di 'Ragion di Stato', contrapponendosi al pensiero di Machiavelli?",
                options: [
                    "Della Ragion di Stato.",
                    "Il Principe.",
                    "Il Leviatano.",
                    "La Repubblica."
                ],
                correctIndex: 0,
                explanation: "Giovanni Botero scrisse 'Della Ragion di Stato' nel 1589 per proporre un modello di governo in cui l'azione politica del sovrano, pur orientata alla conservazione dello Stato, fosse strettamente subordinata alla morale cattolica e alla religione, superando la separazione machiavelliana tra etica e politica."
            }
        ]
    },
    sto3_crisi_seicento: {
        subject: "storia",
        chapterTag: "Studio III",
        title: "Guerre di Religione, Guerra dei Trent'anni e Crisi del Seicento",
        questions: [
            {
                question: "Quale pacificazione pose fine nel 1598 alle guerre di religione in Francia tra ugonotti e cattolici, sancendo la libertà di coscienza e concedendo piazzeforti militari ai protestanti?",
                options: [
                    "L'Editto di Fontainebleau.",
                    "L'Editto di Nantes, promulgato da Enrico IV di Borbone.",
                    "L'Editto di Grazia di Richelieu.",
                    "La Pace di Osnabrück."
                ],
                correctIndex: 1,
                explanation: "L'Editto di Nantes (1598), firmato da Enrico IV, riconobbe agli ugonotti (calvinisti francesi) la libertà di coscienza e il diritto di praticare il culto in determinate località, concedendo loro circa cento piazzeforti di sicurezza (come La Rochelle). Questo editto segnò un passo storico verso il superamento dell'intolleranza confessionale e l'affermazione dell'autorità regia sopra le fazioni religiose."
            },
            {
                question: "Quale evento scatenò formalmente la Guerra dei Trent'anni il 23 maggio 1618 nella città di Praga?",
                options: [
                    "La proclamazione dell'Editto di Restituzione da parte dell'imperatore Ferdinando II.",
                    "La firma dell'Unione Evangelica guidata da Federico V del Palatinato.",
                    "La Defenestrazione di Praga: delegati calvinisti boemi gettarono da una finestra del castello imperiale due governatori cattolici.",
                    "La sconfitta delle truppe boeme nella battaglia della Montagna Bianca."
                ],
                correctIndex: 2,
                explanation: "Il 23 maggio 1618, i nobili protestanti boemi, irritati dalla limitazione della libertà di culto (garantita precedentemente dalle Lettere di Maestà di Rodolfo II) da parte dei rappresentanti del nuovo re Ferdinando II d'Asburgo, fecero irruzione nel castello di Praga e gettarono dalla finestra due governatori imperiali cattolici e un segretario. L'evento aprì la fase boemo-palatina e diede inizio alla Guerra dei Trent'anni."
            },
            {
                question: "In quale celebre trattato diplomatico del 1648 vennero gettate le basi del moderno sistema delle relazioni internazionali in Europa, sancendo la fine dei conflitti religiosi e del sogno egemonico degli Asburgo?",
                options: [
                    "La Pace di Lubecca.",
                    "La Pace di Westfalia, composta dai trattati di Münster e Osnabrück.",
                    "La Pace dei Pirenei.",
                    "Il Trattato di Utrecht."
                ],
                correctIndex: 1,
                explanation: "La Pace di Westfalia (1648) pose fine alla Guerra dei Trent'anni. Riconobbe la parità giuridica degli Stati indipendentemente dalla loro grandezza o religione (allargando il 'cuius regio eius religio' al calvinismo), sancì il fallimento del progetto imperiale asburgico di ricattolicizzazione della Germania e vide l'ascesa di nuove potenze come la Svezia e la Prussia, inaugurando l'equilibrio europeo."
            },
            {
                question: "Durante la crisi del Seicento nella penisola iberica, quali regioni si ribellarono contemporaneamente nel 1640 contro la centralizzazione burocratica ed esattoriale tentata dal Conte-Duca di Olivares?",
                options: [
                    "La Navarra e l'Andalusia.",
                    "La Catalogna e il Portogallo, che riuscì a recuperare l'indipendenza sotto la dinastia dei Braganza.",
                    "I Paesi Bassi del Sud e la Galizia.",
                    "Il Regno di Valencia e le Asturie."
                ],
                correctIndex: 1,
                explanation: "Il tentativo di Olivares di imporre la 'Union de las Armas' (che obbligava tutte le province a contribuire finanziariamente e militarmente all'esercito spagnolo) scatenò nel 1640 la rivolta dei contadini e dei nobili catalani (guidati da Pau Claris con l'aiuto francese) e la sollevazione del Portogallo. Mentre la Catalogna fu riconquistata nel 1652, il Portogallo ottenne l'indipendenza definitiva proclamando re Giovanni IV di Braganza."
            },
            {
                question: "Quale rivolta scoppiò a Napoli nel luglio 1647, guidata da un giovane pescivendolo e animata dall'ostilità verso il ceto togato e il vicereame spagnolo?",
                options: [
                    "La rivolta dei Croquants.",
                    "La rivolta dei Nu-Pieds.",
                    "La rivolta di Masaniello (Tommaso Aniello d'Amalfi) e Giulio Genoino, nata dall'imposizione di una gabella sulla frutta fresca.",
                    "La Fronda parlamentare contro il cardinale Mazzarino."
                ],
                correctIndex: 2,
                explanation: "Il 7 luglio 1647 scoppiò a Napoli una rivolta guidata dal pescivendolo Masaniello e ideata dall'anziano giurista Giulio Genoino. Originata dall'imposizione di una gabella sulla frutta da parte del viceré spagnolo duca d'Arcos, la rivolta prese di mira sia gli spagnoli sia il ceto togato. Portò alla nascita della Real Repubblica Napoletana prima della spietata repressione spagnola del 18 aprile 1648."
            }
        ]
    },
    sto4_rivoluzioni_inglesi: {
        subject: "storia",
        chapterTag: "Studio IV",
        title: "Le Rivoluzioni Inglesi e la Nascita del Costituzionalismo",
        questions: [
            {
                question: "Quale drammatico evento del 1649 pose temporaneamente fine alla monarchia in Inghilterra durante la prima rivoluzione?",
                options: [
                    "L'esilio volontario di Giacomo II in Francia.",
                    "La decapitazione pubblica di re Carlo I Stuart e la proclamazione del Commonwealth (Repubblica).",
                    "L'incoronazione di Oliver Cromwell come Re d'Inghilterra.",
                    "La firma della Magna Carta da parte degli Stuart."
                ],
                correctIndex: 1,
                explanation: "In seguito alla vittoria del Parlamento nella guerra civile, Carlo I Stuart fu processato dall'Alta Corte di Giustizia con l'accusa di alto tradimento, condannato a morte e decapitato il 30 gennaio 1649. Subito dopo venne abolita la camera dei Lord e proclamata la Repubblica (Commonwealth)."
            },
            {
                question: "Come si chiamava l'esercito parlamentare riorganizzato da Oliver Cromwell caratterizzato da disciplina ferrea, orientamento puritano e promozione per merito?",
                options: [
                    "I Lanzichenecchi.",
                    "I Cavalieri del Re.",
                    "La New Model Army (Esercito di Nuovo Modello).",
                    "La Lega di Smalcalda."
                ],
                correctIndex: 2,
                explanation: "La New Model Army, fondata nel 1645 su impulso di Cromwell e Fairfax, si distingueva perché formata da volontari fortemente motivati ideologicamente e religiosamente (puritani/indipendenti) e perché i gradi venivano assegnati per merito e valore sul campo, non per nascita nobiliare."
            },
            {
                question: "Quale programma politico sosteneva il movimento radicale dei Livellatori (Levellers) durante i dibattiti di Putney (1647)?",
                options: [
                    "L'abolizione immediata della proprietà privata e la comunione delle terre coltivate.",
                    "La restaurazione dell'autorità di Carlo I con poteri religiosi limitati.",
                    "La tolleranza per i soli cattolici e la soppressione della camera dei Comuni.",
                    "La sovranità popolare, l'estensione del suffragio a tutti i cittadini maschi liberi, l'uguaglianza giuridica e la tolleranza religiosa."
                ],
                correctIndex: 3,
                explanation: "I Levellers, attivi nell'esercito parlamentare, scrissero il 'Patto del Popolo' (An Agreement of the People). Sostenevano l'uguaglianza di fronte alla legge, la sovranità popolare e l'allargamento del suffragio a quasi tutti i maschi adulti, ma non mettevano in discussione la proprietà privata, a differenza dei Diggers (Zappatori)."
            },
            {
                question: "Per quale motivo la rivoluzione del 1688-1689 in Inghilterra fu definita 'Gloriosa' o 'Pacifica'?",
                options: [
                    "Perché portò alla firma di un trattato di pace perpetuo con la Francia di Luigi XIV.",
                    "Perché segnò la cacciata del cattolico Giacomo II Stuart e l'insediamento di Guglielmo d'Orange senza spargimento di sangue sul suolo inglese.",
                    "Perché la transizione repubblicana guidata da Cromwell ottenne l'approvazione unanime della corte spagnola.",
                    "Perché re Carlo II abdicò pacificamente a favore del Parlamento inglese."
                ],
                correctIndex: 1,
                explanation: "La Gloriosa Rivoluzione (1688) si compì senza scontri armati sanguinosi in Inghilterra: di fronte allo sbarco di Guglielmo d'Orange, convocato dai leader parlamentari sia Whigs che Tories, il re cattolico Giacomo II Stuart fuggì in Francia, lasciando il trono vacante."
            },
            {
                question: "Quale documento costituzionale del 1689 dovettero giurare Guglielmo d'Orange e Maria Stuart prima di essere incoronati?",
                options: [
                    "L'Atto di Supremazia.",
                    "L'Editto di Nantes.",
                    "La Dichiarazione dei Diritti (Bill of Rights).",
                    "Lo Statuto Albertino."
                ],
                correctIndex: 2,
                explanation: "Il Bill of Rights (1689) pose limits precisi al potere della Corona, vietando al re di sospendere leggi, imporre tasse o mantenere un esercito permanente in tempo di pace senza il consenso del Parlamento, e garantendo la libertà di parola e le libere elezioni parlamentari. Nacque così la prima monarchia parlamentare."
            }
        ]
    },
    sto5_assolutismo_guerre: {
        subject: "storia",
        chapterTag: "Studio V",
        title: "L'Assolutismo di Luigi XIV e il Concerto delle Potenze",
        questions: [
            {
                question: "Quali erano i cardini della politica mercantilistica applicata in Francia da Jean-Baptiste Colbert sotto Luigi XIV?",
                options: [
                    "La liberalizzazione dei commerci esteri e l'abolizione delle dogane interne.",
                    "La promozione delle importazioni di manufatti finiti e l'esportazione di materie prime grezze.",
                    "Il protezionismo doganale, lo sviluppo delle manifatture regie protette dallo Stato e la creazione di compagnie commerciali privilegiate.",
                    "La tassazione esclusiva della proprietà terriera e l'esenzione fiscale per le attività commerciali."
                ],
                correctIndex: 2,
                explanation: "Il colbertismo (mercantilismo francese) mirava ad accumulare metalli preziosi favorendo le esportazioni e penalizzando le importazioni con alti dazi. Lo Stato finanziava manifatture di lusso (es. arazzi Gobelins) e concedeva monopoli commerciali alle Compagnie delle Indie."
            },
            {
                question: "Con quali trattati di pace si concluse la Guerra di Successione Spagnola (1701-1714) sancendo l'ascesa britannica e la fine del dominio spagnolo in Italia?",
                options: [
                    "Pace di Cateau-Cambrésis del 1559.",
                    "Trattati di Utrecht (1713) e Rastatt (1714).",
                    "Pace di Westfalia del 1648.",
                    "Trattato di Parigi del 1763."
                ],
                correctIndex: 1,
                explanation: "I trattati di Utrecht (1713) e Rastatt (1714) posero fine alla Guerra di Successione Spagnola. Filippo V di Borbone mantenne il trono spagnolo ma rinunciò a unire le corone di Spagna e Francia. L'Austria asburgica ottenne i Paesi Bassi spagnoli, il Ducato di Milano, il Regno di Napoli e la Sardegna, mentre la Gran Bretagna ottenne Gibilterra e l'asiento (monopolio della tratta degli schiavi)."
            },
            {
                question: "Quale conflitto (1756-1763) vide scontrarsi due blocchi (Gran Bretagna e Prussia contro Francia, Austria e Russia) sul suolo europeo e coloniale, venendo definito da alcuni storici come la vera prima guerra mondiale?",
                options: [
                    "La Guerra di Successione Polacca.",
                    "La Guerra di Successione Austriaca.",
                    "La Guerra dei Sette Anni.",
                    "La Guerra dei Trent'anni."
                ],
                correctIndex: 2,
                explanation: "La Guerra dei Sette Anni si disputò non solo in Europa, ma soprattutto in Nord America e India tra Gran Bretagna e Francia per il predominio coloniale. Si concluse con la pace di Parigi (1763), che sancì il trionfo dell'impero britannico e la perdita del Canada e dell'India francesi."
            },
            {
                question: "Quale sovrano avviò tra la fine del Seicento e l'inizio del Settecento una radicale opera di modernizzazione e occidentalizzazione forzata della Russia?",
                options: [
                    "Pietro I il Grande.",
                    "Ivan IV il Terribile.",
                    "Alessandro I.",
                    "Caterina II la Grande."
                ],
                correctIndex: 0,
                explanation: "Pietro I il Grande della dinastia Romanov avviò riforme per modernizzare l'esercito e la marina russa su modello occidentale. Spostò la capitale a San Pietroburgo (fondata nel 1703), impose costumi europei e istituì la Tavola dei Ranghi per legare la nobiltà al servizio dello Stato."
            },
            {
                question: "Quale editto del 1685, firmato da Luigi XIV, revocò le concessioni religiose dell'Editto di Nantes del 1598, provocando l'esilio di oltre 200.000 ugonotti?",
                options: [
                    "L'Editto di Fontainebleau.",
                    "La Dichiarazione dei Quattro Articoli.",
                    "L'Atto di Supremazia.",
                    "L'Editto di tolleranza di Giuseppe II."
                ],
                correctIndex: 0,
                explanation: "Nel 1685, perseguendo l'unificazione religiosa del regno in base al principio 'un solo re, una sola legge, una sola fede', Luigi XIV firmò l'Editto di Fontainebleau. Con esso si dichiarava illegale il culto protestante, costringendo i calvinisti (ugonotti) alla conversione o alla fuga all'estero."
            }
        ]
    },
    sto6_illuminismo_riforme: {
        subject: "storia",
        chapterTag: "Studio VI",
        title: "L'Illuminismo e il Riformismo del Settecento",
        questions: [
            {
                question: "Quale opera monumentale del barone di Montesquieu gettò le basi della teoria politica della separazione dei poteri (legislativo, esecutivo, giudiziario)?",
                options: [
                    "Il Contratto Sociale.",
                    "Lo Spirito delle Leggi (De l'esprit des lois, 1748).",
                    "Le Lettere Persiane.",
                    "L'Enciclopedia."
                ],
                correctIndex: 1,
                explanation: "Nello 'Spirito delle Leggi' (1748), Montesquieu analizzò le diverse forme di governo e teorizzò la divisione dei poteri come unica garanzia contro la tirannia e a salvaguardia della libertà politica dei cittadini, indicando nel modello costituzionale inglese l'esempio da seguire."
            },
            {
                question: "Quale Stato italiano del Settecento passò alla storia per aver abolito, per la prima volta al mondo, la pena di morte e la tortura?",
                options: [
                    "Il Regno di Sardegna sotto Carlo Emanuele III.",
                    "La Repubblica di Venezia.",
                    "Il Granducato di Toscana sotto Pietro Leopoldo d'Asburgo-Lorena (1786).",
                    "Il Regno di Napoli sotto Carlo di Borbone."
                ],
                correctIndex: 2,
                explanation: "Il Codice Leopoldino (30 novembre 1786), promulgato dal granduca Pietro Leopoldo (futuro imperatore Leopoldo II), recepì i principi dell'opera di Cesare Beccaria 'Dei delitti e delle pene', decretando l'abolizione totale della pena di morte, della tortura e della confisca dei beni."
            },
            {
                question: "Con quale termine si definisce la politica ecclesiastica dell'imperatore Giuseppe II d'Asburgo, volta a subordinare la Chiesa cattolica allo Stato?",
                options: [
                    "Giuseppinismo.",
                    "Giansenismo.",
                    "Gallicanesimo.",
                    "Colbertismo."
                ],
                correctIndex: 0,
                explanation: "Il 'Giuseppinismo' indica il programma di riforme religiose attuato da Giuseppe II negli anni '80 del Settecento: soppresse oltre 700 monasteri e conventi di ordini contemplativi (ritenuti socialmente inutili), confiscandone i beni per finanziare clero e istruzione, concesse tolleranza a protestanti ed ebrei con l'Editto di Tolleranza del 1781, e regolò la formazione dei sacerdoti in seminari statali."
            },
            {
                question: "Quale teoria economica settecentesca, elaborata da François Quesnay, considerava la terra e l'agricoltura come le uniche fonti reali di ricchezza nazionale?",
                options: [
                    "Il Mercantilismo.",
                    "La Fisiocrazia.",
                    "Il Protezionismo.",
                    "Il Liberismo classico di Adam Smith."
                ],
                correctIndex: 1,
                explanation: "La fisiocrazia (letteralmente 'regno della natura') sosteneva che l'agricoltura fosse l'unico settore produttivo capace di generare un 'prodotto netto', mentre industria e commercio erano attività solo 'sterili' di trasformazione. I fisiocratici invocavano il libero commercio dei prodotti agricoli (laissez-faire) e l'abolizione dei dazi."
            },
            {
                question: "Quale ministro portoghese sotto il regno di Giuseppe I attuò riforme radicali, tra cui la ricostruzione di Lisbona nel 1755 e la prima espulsione dei Gesuiti nel 1759?",
                options: [
                    "Il duca di Choiseul.",
                    "Bernardo Tanucci.",
                    "Il marchese di Pombal.",
                    "Wenzel Anton von Kaunitz."
                ],
                correctIndex: 2,
                explanation: "Sebastião José de Carvalho e Melo, marchese di Pombal, guidò il Portogallo con pugno di ferro. Ricostruì Lisbona secondo criteri moderni e antisismici dopo il terremoto del 1755, limitò i poteri dell'Inquisizione, e nel 1759 espulse i Gesuiti dal Portogallo e dalle sue colonie, dando inizio a un'ondata europea di soppressioni dell'ordine."
            }
        ]
    },
    sto7_rivoluzione_americana_francese: {
        subject: "storia",
        chapterTag: "Studio VII",
        title: "La Rivoluzione Americana e lo Scoppio della Rivoluzione Francese",
        questions: [
            {
                question: "Quale data e quale autor principale caratterizzano l'adozione della Dichiarazione d'Indipendenza delle tredici colonie nordamericane?",
                options: [
                    "14 luglio 1789, redatta da George Washington.",
                    "4 luglio 1776, redatta da Thomas Jefferson.",
                    "17 settembre 1787, redatta da Benjamin Franklin.",
                    "5 maggio 1789, redatta da John Adams."
                ],
                correctIndex: 1,
                explanation: "La Dichiarazione d'Indipendenza fu approvata dal Secondo Congresso Continentale a Filadelfia il 4 luglio 1776. Scritta principalmente da Thomas Jefferson, si ispirava ai principi contrattualistici e naturali di John Locke, dichiarando che tutti gli uomini hanno pari diritti alla vita, alla libertà e alla ricerca della felicità."
            },
            {
                question: "Quale soluzione istituzionale fu adottata dalla Convenzione di Filadelfia nella Costituzione degli Stati Uniti del 1787?",
                options: [
                    "Una confederazione di Stati sovrani legati solo da un accordo commerciale e doganale.",
                    "Un impero costituzionale con a capo un sovrano ereditario controllato dal Senato.",
                    "Una Repubblica presidenziale e federale, con una netta separazione dei poteri (Presidente, Congresso bicamerale, Corte Suprema).",
                    "Un regime centralizzato e unitario di stampo giacobino diretto da un Comitato di Salute Pubblica."
                ],
                correctIndex: 2,
                explanation: "La Costituzione del 1787 superò la precedente confederazione instabile, istituendo uno Stato federale unitario guidato da un Presidente (potere esecutivo), un Congresso composto da Camera e Senato (potere legislativo) e una Corte Suprema (potere giudiziario), bilanciando i poteri centrali con l'autonomia dei singoli Stati."
            },
            {
                question: "Con quale celebre giuramento i deputati del Terzo Stato si impegnarono a non separarsi fino alla stesura di una Costituzione in Francia nel giugno 1789?",
                options: [
                    "Il Giuramento della Pallacorda.",
                    "La Dichiarazione dei Diritti dell'Uomo e del Cittadino.",
                    "La Dichiarazione di Pillnitz.",
                    "L'Atto di Supremazia."
                ],
                correctIndex: 0,
                explanation: "Il 20 giugno 1789, trovando chiusa la sala delle riunioni degli Stati Generali per ordine del Re, i deputati del Terzo Stato si riunirono in una vicina sala adibita al gioco della pallacorda. Lì giurarono solennemente di non sciogliersi finché la Francia non avesse avuto una nuova Costituzione, trasformandosi in Assemblea Nazionale Costituente."
            },
            {
                question: "In quale giorno l'Assemblea Nazionale Costituente approvò la Dichiarazione dei Diritti dell'Uomo e del Cittadino?",
                options: [
                    "Il 14 luglio 1789, subito dopo la presa della Bastiglia.",
                    "Il 26 agosto 1789, dopo aver decretato l'abolizione del regime feudale.",
                    "Il 21 gennaio 1793, giorno dell'esecuzione di Luigi XVI.",
                    "Il 9 termidoro dell'anno II (27 luglio 1794)."
                ],
                correctIndex: 1,
                explanation: "La Dichiarazione dei Diritti dell'Uomo e del Cittadino, testo fondamentale che sanciva i principi di libertà personale, uguaglianza giuridica di fronte alla legge, sovranità nazionale e diritto di proprietà, fu solennemente votata il 26 agosto 1789, coronando le deliberazioni d'agosto che avevano demolito l'Antico Regime."
            },
            {
                question: "Quale organo straordinario di governo esercitò un potere dittatoriale durante la fase del 'Terrore' giacobino (1793-1794) guidato da Maximilien de Robespierre?",
                options: [
                    "Il Direttorio.",
                    "Il Comitato di Salute Pubblica.",
                    "Il Senato Conservatore.",
                    "L'Assemblea Legislativa."
                ],
                correctIndex: 1,
                explanation: "Istituito nella primavera del 1793 per far fronte alla minaccia militare esterna e alla guerra civile interna (Vandea), il Comitato di Salute Pubblica, dominato da Robespierre e Saint-Just, assunse poteri dittatoriali di emergenza, perseguitando e ghigliottinando migliaia di presunti nemici della rivoluzione tramite la legge dei sospetti."
            }
        ]
    },
    sto8_napoleone_restaurazione: {
        subject: "storia",
        chapterTag: "Studio VIII",
        title: "L'Età Napoleonica e la Restaurazione",
        questions: [
            {
                question: "Con quale importante trattato di pace del 1797 si concluse la prima campagna d'Italia di Napoleone Bonaparte, segnando la fine della Repubblica di Venezia?",
                options: [
                    "Pace di Cateau-Cambrésis.",
                    "Trattato di Campoformio (Campoformido).",
                    "Trattato di Presburgo.",
                    "Trattato di Lunéville."
                ],
                correctIndex: 1,
                explanation: "Con il Trattato di Campoformio (ottobre 1797), Napoleone ottenne dall'Austria il riconoscimento delle annessioni francesi in Belgio e della creazione della Repubblica Cisalpina in Italia, ma cedette in cambio i territori della millenaria Repubblica di Venezia all'Austria, suscitando profonda delusione tra i patrioti italiani (tra cui Ugo Foscolo)."
            },
            {
                question: "Quale caposaldo giuridico dell'età napoleonica (emanato nel 1804) confermò l'uguaglianza dei cittadini di fronte alla legge, la laicità dello Stato e la libertà di iniziativa economica?",
                options: [
                    "La Dichiarazione d'Indipendenza.",
                    "Il Codice Civile (Code Civil des Français).",
                    "La Legge delle Guarentigie.",
                    "Il Codice Leopoldino."
                ],
                correctIndex: 1,
                explanation: "Il Codice Civile del 1804 (noto come Codice Napoleone) fu il capolavoro normativo dell'età napoleonica. Raccolse ed uniformò le leggi civili eliminando le barriere di ceto dell'Antico Regime e tutelando la proprietà privata e la famiglia nucleare laica, influenzando profondamente la legislazione di tutta l'Europa continentale."
            },
            {
                question: "In quale storica battaglia del 18 giugno 1815 Napoleone Bonaparte subì la definitiva sconfitta militare ad opera delle potenze coalizzate guidate da Wellington e Blücher?",
                options: [
                    "Battaglia di Austerlitz.",
                    "Battaglia di Lipsia (Battaglia delle Nazioni).",
                    "Battaglia di Waterloo.",
                    "Battaglia di Borodino."
                ],
                correctIndex: 2,
                explanation: "Dopo essere fuggito dall'esilio dell'isola d'Elba e aver ripreso il potere per cento giorni, Napoleone affrontò la settima coalizione in Belgio. Sconfitto a Waterloo il 18 giugno 1815 ad opera dell'esercito anglo-alleato di Wellington e dei prussiani di Blücher, abdicò definitivamente e fu esiliato nella sperduta isola di Sant'Elena."
            },
            {
                question: "Quali erano i due principi guida fondamentali applicati nel Congresso di Vienna (1814-1815) per ridisegnare la mappa geopolitica europea post-napoleonica?",
                options: [
                    "Il principio di nazionalità e l'autodeterminazione dei popoli.",
                    "Il principio di legittimità (reinsediare i sovrani spodestati da Napoleone) e il principio di equilibrio (evitare che uno Stato sovrastasse gli altri).",
                    "La democrazia parlamentare e l'annessione forzata delle colonie africane.",
                    "La laicizzazione dei territori pontifici e la federazione degli Stati tedeschi."
                ],
                correctIndex: 1,
                explanation: "Sotto la regia del cancelliere austriaco Metternich e del ministro francese Talleyrand, il Congresso si resse sul principio di legittimità (restituire i troni ai legittimi regnanti pre-rivoluzionari) e di equilibrio (stabilire confini e pesi bilanciati tra le grandi potenze per prevenire tentativi egemonici)."
            },
            {
                question: "Quale patto politico-religioso, fondato sul principio di intervento militare contro le insurrezioni, fu stipulato nel settembre 1815 da Russia, Austria e Prussia?",
                options: [
                    "La Quadruplice Alleanza.",
                    "La Santa Alleanza.",
                    "La Società delle Nazioni.",
                    "La Lega di Cognac."
                ],
                correctIndex: 1,
                explanation: "La Santa Alleanza fu firmata dallo zar Alessandro I di Russia, da Francesco I d'Austria e da Federico Guglielmo III di Prussia. Ispirata a una mistica fratellanza cristiana dei regnanti, si trasformò in uno strumento pratico di alleanza militare per reprimere militarmente qualsiasi moto liberale e rivoluzionario che minacciasse l'ordine restaurato."
            }
        ]
    },
    sto9_societa_borghese_liberalismo: {
        subject: "storia",
        chapterTag: "Studio IX",
        title: "La Società Borghese e l'Europa Liberale (1830-1848)",
        questions: [
            {
                question: "Quale importante riforma elettorale fu approvata dal Parlamento britannico nel 1832 per adeguare la rappresentanza politica all'industrializzazione?",
                options: [
                    "L'introduzione del suffragio universale maschile e femminile.",
                    "Il Reform Act (Great Reform Act), che allargò il censo elettorale e ridusse la circoscrizione dei 'borghi putridi' a favore delle città industriali.",
                    "L'abolizione totale dei dazi doganali sul grano (Corn Laws).",
                    "Il riconoscimento ufficiale del partito laburista."
                ],
                correctIndex: 1,
                explanation: "Il Reform Act del 1832 allargò il corpo elettorale inglese di oltre il 60% e, soprattutto, ridisegnò i collegi eliminando i 'borghi putridi' (circoscrizioni rurali spopolate ma controllate dai nobili terrieri) a favore di grandi centri industriali come Manchester e Birmingham, cresciuti con la Rivoluzione Industriale."
            },
            {
                question: "Quale re fu costretto ad abdicare durante le 'Tre Giornate Gloriose' del luglio 1830 a Parigi, portando al trono Luigi Filippo d'Orléans?",
                options: [
                    "Luigi XVIII.",
                    "Carlo X.",
                    "Napoleone II.",
                    "Luigi XVI."
                ],
                correctIndex: 1,
                explanation: "Nel luglio 1830, il tentativo di re Carlo X Stuart di restaurare l'assolutismo emanando quattro ordinanze liberticide scatenò l'insurrezione parigina delle tre giornate (27-29 luglio). Il re fuggì e la borghesia liberale offrì la corona a Luigi Filippo d'Orléans, proclamato 're dei francesi per volontà della nazione'."
            },
            {
                question: "Quale misura di orientamento sociale, introdotta in Francia nel febbraio 1848 per combattere la disoccupazione operaia, scatenò lo scontro sanguinoso con la borghesia moderata a giugno?",
                options: [
                    "L'istituzione degli Ateliers Nationaux (Opifici Nazionali).",
                    "L'assegnazione gratuita di terre demaniali ai braccianti.",
                    "La statalizzazione delle banche private di credito.",
                    "L'introduzione della giornata lavorativa di 14 ore."
                ],
                correctIndex: 0,
                explanation: "Gli Ateliers Nationaux furono creati dal governo provvisorio della Seconda Repubblica (su impulso del socialista Louis Blanc) per impiegare i disoccupati in lavori pubblici a spese dello Stato. La loro chiusura a giugno, decisa dall'Assemblea costituente moderata, scatenò una disperata rivolta operaia repressa nel sangue dall'esercito."
            },
            {
                question: "Con quale decisiva vittoria militare la Prussia di Otto von Bismarck sconfisse la Francia nel 1870, decretando il crollo del Secondo Impero napoleonico?",
                options: [
                    "Battaglia di Sadowa.",
                    "Battaglia di Sedan (1 settembre 1870).",
                    "Battaglia di Waterloo.",
                    "Battaglia di Solferino."
                ],
                correctIndex: 1,
                explanation: "Nella battaglia di Sedan (1 settembre 1870), l'esercito prussiano accerchiò e annientò le truppe francesi, catturando lo stesso imperatore Napoleone III. Pochi giorni dopo a Parigi fu proclamata la Terza Repubblica, mentre a Versailles (gennaio 1871) i principi tedeschi proclamarono Guglielmo I imperatore di Germania (Secondo Reich)."
            },
            {
                question: "Quale forma rivoluzionaria di autogoverno operaio e socialista nacque a Parigi nel marzo 1871 in opposizione al governo repubblicano conservatore di Thiers?",
                options: [
                    "La Comune di Parigi.",
                    "Il Comitato di Salute Pubblica.",
                    "Gli Stati Generali.",
                    "La Repubblica Romana."
                ],
                correctIndex: 0,
                explanation: "La Comune di Parigi fu un esperimento di democrazia diretta e autogoverno socialista instaurato dalla popolazione parigina insorta contro il governo provvisorio di Adolphe Thiers. Fu soppressa con inaudita ferocia dall'esercito regolare francese durante la 'settimana di sangue' (21-28 maggio 1871), che costò oltre 20.000 vite."
            }
        ]
    },
    sto10_risorgimento_italiano: {
        subject: "storia",
        chapterTag: "Studio X",
        title: "Il Risorgimento Italiano e i Moti Rivoluzionari",
        questions: [
            {
                question: "Quale fu il limite fondamentale delle prime cospirazioni carbonare in Italia nei moti del 1820-1821 e 1830-1831?",
                options: [
                    "L'alleanza diplomatica stretta con la corona spagnola.",
                    "La segretezza della struttura e dei programmi, che precluse la partecipazione popolare, limitando i moti a militari e intellettuali borghesi.",
                    "Il rifiuto sistematico dell'intervento militare straniero.",
                    "L'adesione incondizionata al pensiero politico di Giuseppe Mazzini."
                ],
                correctIndex: 1,
                explanation: "I moti promossi dalla Carboneria e dalle società segrete fallirono principalmente a causa del loro carattere elitario e cospirativo: la mancanza di un programma politico chiaro e pubblico e la mancata mobilitazione delle masse rurali e cittadine lasciarono gli insorti isolati di fronte alla repressione austriaca."
            },
            {
                question: "Quale associazione politica clandestina fondò Giuseppe Mazzini nel 1831, ponendosi come obiettivo un'Italia unita, indipendente e repubblicana?",
                options: [
                    "La Carboneria.",
                    "La Giovine Italia.",
                    "La Società Nazionale Italiana.",
                    "Il Partito d'Azione."
                ],
                correctIndex: 1,
                explanation: "Mazzini fondò la Giovine Italia a Marsiglia nel 1831 per superare il modello settario della Carboneria. L'associazione si proponeva di educare il popolo all'insurrezione popolare per dare vita a una Repubblica unitaria, democratica e indipendente, diffondendo apertamente il proprio programma ideologico."
            },
            {
                question: "Quale tesi sosteneva l'abate Vincenzo Gioberti nella sua celebre opera 'Del primato morale e civile degli italiani' (1843), caposaldo del Neoguelfismo?",
                options: [
                    "L'unificazione italiana attraverso una rivoluzione repubblicana e anticlericale.",
                    "Una federazione di Stati italiani sotto la presidenza del Papa, appoggiata militarmente dal Regno di Sardegna.",
                    "La cessione di tutti i territori italiani all'Impero Asburgico in cambio dell'unione doganale.",
                    "L'annessione immediata del Regno delle Due Sicilie al Piemonte sabaudo."
                ],
                correctIndex: 1,
                explanation: "Il neoguelfismo di Gioberti proponeva una transizione pacifica all'indipendenza: una confederazione degli Stati italiani esistenti presieduta dal pontefice (allora Pio IX, ritenuto un liberale) ed assistita dalla forza militare sabauda, conciliando il sentimento nazionale con la tradizione cattolica."
            },
            {
                question: "In quale città italiana l'insurrezione del marzo 1848 portò alla cacciata delle truppe austriache del generale Radetzky dopo cinque giorni di aspri combattimenti?",
                options: [
                    "Milano (Cinque Giornate di Milano, 18-22 marzo 1848).",
                    "Roma.",
                    "Napoli.",
                    "Torino."
                ],
                correctIndex: 0,
                explanation: "Tra il 18 e il 22 marzo 1848, la popolazione di Milano insorse contro gli austriaci. Dopo cinque giorni di barricate ('Cinque Giornate'), le forze austriache comandate dal feldmaresciallo Radetzky furono costrette ad abbandonare la città e a ritirarsi nel sistema fortificato del Quadrilatero."
            },
            {
                question: "Quale regime democratico nacque a Roma nel febbraio 1849, guidato da un Triumvirato (Mazzini, Armellini, Saffi), prima di essere represso dall'intervento francese?",
                options: [
                    "La Repubblica Cisalpina.",
                    "La Repubblica Romana.",
                    "La Repubblica Partenopea.",
                    "Lo Stato Pontificio Liberale."
                ],
                correctIndex: 1,
                explanation: "In seguito alla fuga di papa Pio IX a Gaeta, nel febbraio 1849 un'Assemblea Costituente eletta a suffragio universale proclamò la Repubblica Romana. Retta da un Triumvirato, approvò una costituzione avanzatissima (laicità, suffragio universale, abolizione della pena di morte) e fu difesa strenuamente da Garibaldi contro le truppe francesi inviate da Luigi Napoleone."
            }
        ]
    },
    sto11_unificazione_regno: {
        subject: "storia",
        chapterTag: "Studio XI",
        title: "Cavour, Garibaldi e la Nascita del Regno d'Italia",
        questions: [
            {
                question: "Quale alleanza politica parlamentare interna ('connubio') strinse Camillo Benso conte di Cavour nel 1852 per consolidare la sua maggioranza al governo piemontese?",
                options: [
                    "Un accordo di governo con l'ala mazziniana e repubblicana guidata da Garibaldi.",
                    "L'alleanza tra il centro-sinistro di Urbano Rattazzi e il centro-destro di Cavour stesso.",
                    "Un patto segreto con i cattolici reazionari fedeli a Pio IX.",
                    "La coalizione con gli esponenti sabaudi contrari allo Statuto Albertino."
                ],
                correctIndex: 1,
                explanation: "Il 'connubio' (1852) fu l'accordo politico tra la componente moderata della destra (guidata da Cavour) e la sinistra moderata (guidata da Rattazzi). Tagliando fuori le ali estreme (clericali e democratici radicali), garantì a Cavour una solida maggioranza parlamentare per avviare riforme liberiste e una politica estera dinamica."
            },
            {
                question: "Cosa prevedevano gli accordi segreti di Plombières stipulati nel 1858 tra Cavour e l'imperatore francese Napoleone III?",
                options: [
                    "L'annessione immediata del Regno delle Due Sicilie alla Francia in cambio della Sardegna.",
                    "Un'alleanza militare difensiva: la Francia sarebbe intervenuta in aiuto del Piemonte solo in caso di aggressione austriaca, mirando a ridisegnare l'Italia in quattro Stati in cambio di Nizza e Savoia.",
                    "Il ritiro immediato delle truppe francesi che difendevano lo Stato Pontificio a Roma.",
                    "La cessione del Ducato di Milano all'Austria in cambio di un corridoio doganale con la Svizzera."
                ],
                correctIndex: 1,
                explanation: "Plombières (1858) sancì l'alleanza franco-piemontese. Napoleone III si impegnò a scendere in guerra a fianco del Regno di Sardegna in caso di attacco dell'Austria. La vittoria avrebbe portato alla creazione di un Regno dell'Alta Italia (sotto i Savoia), un Regno dell'Italia Centrale, un Regno dell'Italia Meridionale e la presidenza papale della confederazione, cedendo alla Francia Nizza e la Savoia."
            },
            {
                question: "Da dove partì, nel maggio 1860, la Spedizione dei Mille organizzata da Giuseppe Garibaldi per liberare il Mezzogiorno borbonico?",
                options: [
                    "Dal porto di Marsala.",
                    "Da Quarto (Genova), a bordo dei piroscafi Piemonte e Lombardo.",
                    "Dall'isola di Caprera.",
                    "Dalla foce del Tevere."
                ],
                correctIndex: 1,
                explanation: "La notte tra il 5 e il 6 maggio 1860, Garibaldi e circa mille volontari salparono da Quarto, presso Genova, a bordo di due navi della compagnia Rubattino (il Piemonte e il Lombardo). Sbarcarono a Marsala (Sicilia) l'11 maggio, dando avvio al collasso del Regno delle Due Sicilie."
            },
            {
                question: "In quale giorno e con quale formula Vittorio Emanuele II fu proclamato Re del neonato Regno d'Italia?",
                options: [
                    "Il 20 settembre 1870, dopo la breccia di Porta Pia.",
                    "Il 17 marzo 1861, con legge approvata dal primo Parlamento nazionale a Torino.",
                    "Il 26 ottobre 1860, in seguito all'incontro di Teano.",
                    "Il 23 marzo 1849, dopo la battaglia di Novara."
                ],
                correctIndex: 1,
                explanation: "Il 17 marzo 1861, il Parlamento nazionale riunito a Torino approvò la legge n. 4671 con la quale Vittorio Emanuele II assumeva per sé e per i suoi successori il titolo di 'Re d'Italia, per grazia di Dio e volontà della nazione', ufficializzando la nascita dello Stato unitario italiano."
            },
            {
                question: "Quale disposizione emessa da papa Pio IX nel 1874 vietò espressamente ai cattolici italiani di partecipare alla vita politica attiva del Regno d'Italia?",
                options: [
                    "La legge delle Guarentigie.",
                    "La bolla Licet ab initio.",
                    "Il Non Expedit ('non conviene').",
                    "Il Syllabus dei modernisti."
                ],
                correctIndex: 2,
                explanation: "Il Non Expedit (1874) fu la reazione pontificia all'annessione forzata di Roma (1870). Papa Pio IX vietò ai cattolici di partecipare alle elezioni politiche del Regno d'Italia sia come candidati che come elettori, innescando una profonda frattura etico-politica tra Chiesa e Stato ('questione romana') sanata solo dai Patti Lateranensi del 1929."
            }
        ]
    }
};

// Global export
window.quizDatabase = quizDatabase;
