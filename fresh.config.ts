import { defineConfig } from "$fresh/server.ts";
import { bot } from "telegram/bot.ts";
import { listOfCommands } from "telegram/handlers/commands/mod.ts";
import { bold, yellow } from "$std/fmt/colors";
import { IS_PRODUCTION, TELEGRAM_BOT_TOKEN } from "utils/constants.ts";
import { WEBAPP_URL } from "utils/constants.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({
  onListen: async ({ hostname, port }) => {
    console.log(
      bold(`Listening on http://`) +
        yellow(
          `${hostname === "0.0.0.0" ? "localhost" : hostname}:${port}/`,
        ),
    );

    if (IS_PRODUCTION) {
      console.log("BotFather is here!");
      console.log(`${WEBAPP_URL}api/botfather?token=${TELEGRAM_BOT_TOKEN}`);
      const webhookInfo = await bot.api.getWebhookInfo();
      const webhookUrl =
        `${WEBAPP_URL}/api/botfather?token=${TELEGRAM_BOT_TOKEN}`;

      console.info(`Existing webhook info fetched: ${webhookInfo.url}`);

      if (webhookInfo.url !== webhookUrl) {
        console.info("Deleting existing webhook...");
        await bot.api.deleteWebhook({
          drop_pending_updates: true,
        });
        console.info("Existing webhook deleted!");

        console.info(`Setting new webhook to: ${webhookUrl}`);
        await bot.api.setWebhook(webhookUrl, {
          allowed_updates: [
            "message",
            "callback_query",
            "chat_member",
            "inline_query",
          ],
          drop_pending_updates: true,
        });

        console.info(`Bot webhook set to: ${webhookUrl}`);

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
      }
    }
  },
  plugins: [twindPlugin(twindConfig)],
});
