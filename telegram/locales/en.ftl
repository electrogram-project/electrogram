### Localization for english language

## Global settings
back = ⬅️ Go back
empty = 😐 Empty

# ------------------------

## Commands

help = 🧠 <b>Encephalogram</b>
        -- Help

        Hello {$name}! This bot allows you to find the telegram groups of the bachelor and master degree courses of biomedical engineering.
        
        <i>Use /start to start the bot.</i>

inline = 🧠 <b>Encephalogram</b>
        -- Inline

        - By writing in any chat, "@ingbio_bot" followed by the name of a group, you can get a link to the group in question.
        For example: <code>@ingbio_bot anatomia</code>
        - By writing in any chat, "@ingbio_bot" followed by "faq:" + the title of a FAQ, you can get a link to the FAQ in question.
        For example: <code>@ingbio_bot faq:tirocini</code>

        <i>Use /start to start the bot.</i>
        
# ------------------------
        
## Root menu
# Header
root_header = 🧠 <b>Encephalogram</b>
        -- Main Menu
        In this bot you can find a list of groups related to the bachelor and master degree courses of biomedical engineering.

        <i>Select the course you are interested in:</i>
# Buttons
root_bachelor = 🎒 Bachelor groups
root_master = 🎓 Master groups
root_link = ✏️ Report a new group
root_contact = 📝 Contact us!
root_info = 🔎 Info
root_language = 🌍 Language

# ------------------------

## Years menu
# Header
years_b_header = 🧠 <b>Encephalogram</b>
        -- Menu bachelor groups
        The bachelor's degree consists of three years. The groups covering all three years are listed under the "General groups" button.

        <i>Select an option:</i>

years_m_header = 🧠 <b>Encephalogram</b>
        -- Menu master groups
        The master's degree consists of two years. The groups covering all two years are listed under the "General groups" button.

        <i>Select an option:</i>

# Buttons
years_gen = General groups
years_1 = 1° year
years_2 = 2° year
years_3 = 3° year

# ------------------------

## Semesters menu
# Header
semesters_b_header = 🧠 <b>Encephalogram</b>
        -- Menu {$n_year}° year bachelor groups
        Each year is divided into two semesters.

        <i>Select an option:</i>

semesters_m_header = 🧠 <b>Encephalogram</b>
        -- Menu {$n_year}° year master groups
        Each year is divided into two semesters.

        <i>Select an option:</i>

# Buttons
semesters_1 = 1° semester
semesters_2 = 2° semester

# ------------------------

## Course groups menu
# Header
course_groups_b_header = 🧠 <b>Encephalogram</b>
        -- Menu {$n_year}° year bachelor groups
        In this page are listed the groups of the {$n_sem}° semester {$n_year}° year.
        
        <i>Click a button to join the respective group:</i>

course_groups_m_header = 🧠 <b>Encephalogram</b>
        -- Menu {$n_year}° year master groups
        In this page are listed the groups of the {$n_sem}° semester {$n_year}° year.

        <i>Click a button to join the respective group:</i>

# ------------------------

## General groups menu
# Header
general_groups_b_header = 🧠 <b>Encephalogram</b>
        -- Menu general bachelor groups
        In this page are listed the general groups of the bachelor degree.

        <i>Click a button to join the respective group:</i>

general_groups_m_header = 🧠 <b>Encephalogram</b>
        -- Menu general master groups
        In this page are listed the general groups of the master degree.

        <i>Click a button to join the respective group:</i>

# ------------------------

## Suggest menu
# Header
suggest_header = 🧠 <b>Encephalogram</b>
        -- Menu suggestions
        You may suggest a group by filling in the fields of the proposed form. An administrator will evaluate the request as soon as possible. If approved, you will see the addition announced in the main group.

        <i>Open the form by clicking the button below:</i>
# Buttons
suggest_form = Fill out the form

# ------------------------

## Info menu
# Header
info_header = 🧠 <b>Encephalogram</b>
        -- Menu Information
        The bot is released under an Apache 2.0 licence and the code can be consulted on <a href="https://github.com/electrogram-project/electrogram">GitHub</a>.

        If you encounter an abnormal behaviour, please report it on one of the main groups, through the contact form or open an issue in the GitHub repository.
# Buttons

# ------------------------

## Contact menu
# Header
contact_header = 🧠 <b>Encephalogram</b>
        -- Menu reports
        If you have any suggestions or would like to participate in this project, please contact us via the form below.

        <i>Open the form by clicking the button below:</i>
# Buttons
contact_form = Fill out the form

# ------------------------

## Language menu
# Header
language_header = 🧠 <b>Encephalogram</b>
        -- Language menu
        The bot is available in the languages shown in the underlying menu. If you desidere, you can propose a new translation or improve an existing one using the <a href="https://projectfluent.org/">file .flt</a> present in the <a href="https://projectfluent.org/">locales</a> folder in the GitHub repository.

        <i>Select a language:</i>
# Buttons
language_flag = 🇬🇧 English
# Callback query
language_msg_ok = Language set!
language_msg_error = Language already set!


# ------------------------