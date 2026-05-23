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
