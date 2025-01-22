import "$std/dotenv/load";
import { bot } from "telegram/bot.ts";
import { listOfCommands } from "telegram/handlers/commands/mod.ts";

bot.start({
  drop_pending_updates: true,
  allowed_updates: [
    "message",
    "callback_query",
    "chat_member",
    "inline_query",
  ],
  onStart: ({ username }) => {
    console.log(`@${username} ready!`);
    bot.api
      .setMyCommands(listOfCommands.filter((c) => c.show))
      .then(() => {
        console.log(
          "Default commands uploaded to BotFather!",
        );
      })
      .catch((e) =>
        console.error(
          "Failed to upload default commands to BotFather!",
          e,
        )
      );
  },
});

Deno.addSignalListener("SIGINT", () => bot.stop());
