import { PageHead } from "components/mod.ts";
import { BsGithub } from "react-icons/bs";

export default function Home() {
  return (
    <div className="mb-2">
      <PageHead
        title="About"
        text="This project did not come from nowhere; this page summarises its history."
      />
      <h4 className="font-bold mt-2 mb-1">
        First version: Biomedica Helper Bot (18 February 2021 - 27 July 2021)
      </h4>
      <p>
        On 18 February 2021 a telegram bot, called "Biomedica helper bot" was
        published to gather and organise the then small number of biomedical
        engineering degree course groups in one place. In that academic year,
        teaching took place remotely due to the COVID-19 pandemic and the bot
        aimed to make these group chats easily accessible as they were seen as
        places for discussion in the absence of physical study rooms
        <br />
        The project was mainly inspired by @inginf_bot and the then newly born
        @PoliToGruppiBot. This early version of the bot had all the group links
        hard-coded in the script. Apart from organizing the links behind an
        inline keyboard, the bot did nothing else.
      </p>
      <a
        href="https://github.com/electrogram-project/biomedica-helper-bot"
        className="font-semibold decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub className="inline mr-2 mb-1" />
        GitHub
      </a>
      <h4 className="font-bold mt-4 mb-1">
        Second version: Encefalogramma (27 July 2021 - 28 October 2023)
      </h4>
      <p>
        Just five months later, on 27 July 2021, the second version of the bot
        was born, much more complex and comprehensive than the previous one, and
        it was published under the name "Encefalogramma" (in english
        Encephalogram). The main improvements were the addition of a database,
        inline queries and the inclusion of administration tools within the bot
        itself.
        <br />
        This version received a number of minor updates in the following months,
        one of which was the inclusion of the Master's degree groups, which were
        not initially planned.
      </p>
      <a
        href="https://github.com/electrogram-project/encefalogramma"
        className="font-semibold decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub className="inline mr-2 mb-1" />
        GitHub
      </a>
      <h4 className="font-bold mt-4 mb-1">
        Third version: Electrogram and Encephalogram (28 October 2023 - present)
      </h4>
      <p>
        On 28 October 2023, the third version of the bot was released after a
        complete code rewrite. The bot was renamed "Encephalogram" and it was
        accompanied by a website, called "Electrogram".
        <br />
        This version represents a major update with numerous improvements. Among
        them, the introduction of the WebApps to improve the telegram bot
        usability both for users and administrators. The nicest addition was the
        blog, which allows the publication of articles, mostly related to
        erasmus experiences.
      </p>
      <a
        href="https://github.com/electrogram-project/electrogram"
        className="font-semibold decoration-pink-600 dark:decoration-pink-300 decoration-2 underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub className="inline mr-2 mb-1" />
        GitHub
      </a>
    </div>
  );
}
