import { Divisor, PageHead } from "components/mod.ts";

export default function Home() {
  return (
    <div>
      <PageHead
        title="About"
        text="This project did not come from nowhere; this page summarises its history."
      />
      <Divisor title="First version" />
      <p className="text-sm font-medium text-justify mb-2">
        On 18 February 2021 a telegram bot, called "Biomedica helper bot" was
        published to gather and organise the then small number of biomedical
        engineering degree course groups in one place. In that academic year,
        teaching took place remotely due to the COVID-19 pandemic and the bot
        aimed to make these group chats easily accessible as they were seen as
        places for discussion in the absence of physical study rooms.<br />The
        project was mainly inspired by @inginf_bot and the then newly born
        @PoliToGruppiBot and was based on{"  "}
        <a
          href="https://telegraf.js.org/"
          target="_blank"
          className="italic hover:underline text-blue-500"
        >
          telegraf.js
        </a>{" "}
        - v4.0.3. This was an early version of the bot: all the links to the
        groups were hard-coded in the script and, apart from organising the
        links to the groups behind an inline keyboard, the bot did nothing else.
      </p>
      <a
        href="https://github.com/electrogram-project/biomedica-helper-bot"
        target="_blank"
        className="hover:underline text-blue-500"
      >
        GitHub
      </a>
      <Divisor title="Second version" />
      <p className="text-sm font-medium text-justify mb-2">
        Just five months later, on 27 July 2021, the second version of the bot
        was born, much more complex and comprehensive than the previous one, and
        it was published under the name "Encefalogramma" (in english
        Encephalogram). This time the bot was based on the popular wrapper{" "}
        <a
          href="https://python-telegram-bot.org/"
          target="_blank"
          className="italic hover:underline text-blue-500"
        >
          python-telegram-bot
        </a>{" "}
        - v13.x. The main improvements were the addition of a database, inline
        queries and the inclusion of administration tools within the bot
        itself.<br />This version received a number of minor updates in the
        following months, one of which was the inclusion of the Master's degree
        groups, which were not initially planned.
      </p>
      <a
        href="https://github.com/electrogram-project/encephalogram"
        target="_blank"
        className="hover:underline text-blue-500"
      >
        GitHub
      </a>
      <Divisor title="Third version" />
      <p className="text-sm font-medium text-justify mb-2">
        On 28 October 2024, the third version of the bot was released after
        completely rewritting the code. In addition to the telegram bot, a
        website was created both as an alternative to the bot and as a
        complement to it. The frameworks used this time were{" "}
        <a
          href="https://grammy.dev/"
          target="_blank"
          className="hover:underline text-blue-500"
        >
          grammy.js
        </a>{" "}
        - v0.18.x for the bot and{" "}
        <a
          href="https://fresh.deno.dev/"
          target="_blank"
          className="hover:underline text-blue-500"
        >
          Deno Fresh
        </a>{" "}
        for the website.{" "}
        <br />This version represents a major update and many improvements have
        been implemented. Groups in the bot have been better organised behind
        the keyboard and it has been made easier for a user to propose a new
        group and for an administrator to approve it. The bot has also been
        integrated with the FAQ channel and a blog has been created to collect
        students' Erasmus experiences. Finally, the administration tools have
        been moved to an intuitive web dashboard.
      </p>
      <a
        href="https://github.com/electrogram-project/electrogram"
        target="_blank"
        className="hover:underline text-blue-500"
      >
        GitHub
      </a>
    </div>
  );
}
