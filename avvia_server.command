#!/bin/bash
# Ottieni la directory in cui si trova lo script
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "========================================================="
echo "   Avvio del Server Locale Lex (Tutor Accademico)"
echo "========================================================="
echo ""
echo "Per ragioni di sicurezza dei browser (CORS), le chiavi API"
echo "come NVIDIA NIM richiedono che l'applicazione sia avviata"
echo "tramite un server locale anziché direttamente come file."
echo ""
echo "Apertura di http://localhost:8000/index.html nel browser..."
echo "Usa Ctrl+C nella finestra del Terminale per fermare il server."
echo "========================================================="

# Apri il browser alla pagina principale
open "http://localhost:8000/index.html"

# Avvia il server http di Python
python3 -m http.server 8000
