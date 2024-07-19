### Localization for italian language

## Global settings
back = ⬅️ Indietro
back_to_root = ⬅️ Torna al menu iniziale
empty = 😐 Vuoto

# ------------------------

## Commands

help = 🧠 <b>Encefalogramma</b>
        -- Help
        Ciao {$name}! Questo bot ti permette di trovare i gruppi telegram dei corsi di laurea triennale e laurea magistrale di ingegneria biomedica al PoliTO.        
        
        <i>Usa /start per avviare il bot.</i>

inline = 🧠 <b>Encefalogramma</b>
        -- Inline

        - Scrivendo in qualsiasi chat "@ingbio_bot" seguito dal nome di un gruppo, è possibile ottenere un link al gruppo in questione.
        Per esempio: <code>@ingbio_bot anatomia</code>

        <i>Usa /start per avviare il bot.</i>

privacy = 🧠 <b>Encefalogramma</b>
        -- Privacy policy

        Questo bot non memorizza dati sull'utente.
        
        I dati forniti tramite i moduli sono utilizzati esclusivamente per rispondere alle richieste degli utenti.
        
admin = 🧠 <b>Encefalogramma</b>
        -- Dashboard

        Benvenuto {$name}! Da questa pagina puoi gestire il database del bot.
        
        - <b>Gruppi da approvare</b>: {$pending}
        - <b>Gruppi visibili</b>: {$current}
        - <b>Gruppi cancellati</b>: {$deleted}

        <i>Apri la dashboard cliccando il pulsate sottostante:</i>
# ------------------------
        
## Root menu
# Header
root_header = 🧠 <b>Encefalogramma</b>
        -- Menu principale
        In questo bot puoi trovare una lista dei gruppi relativi ai corsi di laurea triennale e magistrale di ingegneria biomedica.

        <i>Seleziona il percorso di tuo interesse:</i>
# Buttons
root_bachelor = 🎒 Gruppi triennale
root_master = 🎓 Gruppi magistrale
root_link = ✏️ Segnala un nuovo gruppo
root_contact = 📝 Contattaci!
root_info = 🔎 Info
root_language = 🌍 Lingua

# ------------------------

## Years menu
# Header
years_b_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi magistrale
        La laurea triennale è composta da tre anni. I gruppi che coprono tutti e tre gli anni sono elencati sotto il pulsante "Gruppi generali".
        
        <i>Seleziona un'opzione:</i>

years_m_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi magistrale
        La laurea magistrale è composta da due anni. I gruppi che coprono tutti e tre gli anni sono elencati sotto il pulsante "Gruppi generali".

        <i>Seleziona un'opzione:</i>

# Buttons
years_gen = Gruppi generali
years_1 = 1° anno
years_2 = 2° anno
years_3 = 3° anno

# ------------------------

## Semesters menu
# Header
semesters_b_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi {$n_year}° anno triennale
        Ogni anno è suddiviso in due semestri.

        <i>Seleziona un'opzione:</i>

semesters_m_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi {$n_year}° anno magistrale
        Ogni anno è suddiviso in due semestri.

        <i>Seleziona un'opzione:</i>

# Buttons
semesters_1 = 1° semestre
semesters_2 = 2° semestre

# ------------------------

## Course groups menu
# Header
course_groups_b_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi {$n_year}° anno trinnale
        Questa pagina elenca i gruppi del {$n_sem}° semestre {$n_year}° anno.
        
        <i>Cliccare su un pulsante per unirsi al rispettivo gruppo:</i>

course_groups_m_header = 🧠 <b>Encefalogramma</b>
        -- Menu gruppi {$n_year}° anno magistrale
        Questa pagina elenca i gruppi del {$n_sem}° semestre {$n_year}° anno.

        <i>Cliccare su un pulsante per unirsi al rispettivo gruppo:</i>

# ------------------------

## General groups menu
# Header
general_groups_b_header = 🧠 <b>Encefalogramma</b>
        -- Menu general bachelor groups
        In questa pagina sono elencati i gruppi generali della laurea triennale.

        <i>Cliccare su un pulsante per unirsi al rispettivo gruppo:</i>

general_groups_m_header = 🧠 <b>Encefalogramma</b>
        -- Menu general master groups
        In questa pagina sono elencati i gruppi generali della laurea magistrale.

        <i>Cliccare su un pulsante per unirsi al rispettivo gruppo:</i>

# ------------------------

## Suggest menu
# Header
suggest_header = 🧠 <b>Encefalogramma</b>
        -- Menu suggestions
        È possibile proporre un gruppo compilando i campi del modulo di proposta. Un amministratore valuterà la richiesta il prima possibile. Se approvata, l'aggiunta sarà annunciata nel gruppo principale.
        
        <i>Apri il modulo cliccando il pulsante sottostante:</i>

# Buttons
suggest_form = Compila il modulo

# ------------------------

## Info menu
# Header
info_header = 🧠 <b>Encefalogramma</b>
        -- Menu informazioni
        Il bot è rilasciato dietro licenza Apache 2.0 e il codice può essere consultato su <a href="https://github.com/electrogram-project/electrogram">GitHub</a>.

        Se riscontri comportamenti anomali, comunicalo su uno dei gruppi principali o attraverso il modulo di contatto.
# Buttons

# ------------------------

## Contact menu
# Header
contact_header = 🧠 <b>Encefalogramma</b>
        -- Menu contatti
        Se hai suggerimenti oppure vuoi partecipare a questo progetto, contattaci attraverso il modulo sottostante.

        <i>Apri il modulo cliccando il pulsate sottostante:</i>
# Buttons
contact_form = Compila il modulo

# ------------------------

## Language menu
# Header
language_header = 🧠 <b>Encefalogramma</b>
        -- Menu lingua
        La lingua dei messaggi del bot segue la lingua impostata nell'applicazione di Telegram. Se la lingua impostata non è disponibile, i messaggi sono visualizzati in inglese. Se lo desideri, puoi proporre una nuova traduzione oppure migliorarne una esistente utilizzando i <a href="https://projectfluent.org/">files .ftl</a> che trovi della cartella <a href="https://github.com/electrogram-project/electrogram/tree/b006cf3a54972a16de59ea365a62d1d7a6978b8b/telegram/locales">locales</a> della repository del bot.

# ------------------------