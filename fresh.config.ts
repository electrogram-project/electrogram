import { defineConfig } from "$fresh/server.ts";
import {
  IS_PRODUCTION,
  TELEGRAM_BOT_TOKEN,
  WEBAPP_URL,
} from "$utils/constants.ts";
import { grammy } from "$grammy/bot.ts";
import { bold, yellow } from "$std/fmt/colors.ts";
import { kv, supabase } from "$utils/db.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  onListen: async ({ hostname, port }) => {
    console.log(
      bold(`Listening on http://`) +
        yellow(`${hostname === "0.0.0.0" ? "localhost" : hostname}:${port}/`),
    );

    if (supabase !== undefined) {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (
          event == "SIGNED_IN" ||
          (event == "TOKEN_REFRESHED" && session != null)
        ) {
          const { access_token, expires_in } = session!;
          const stringified = JSON.stringify(session);
          await kv.set(["access_token", access_token], stringified, {
            expireIn: expires_in * 1000,
          });
        }
      });
    }

    if (IS_PRODUCTION && grammy) {
      const webhookInfo = await grammy.api.getWebhookInfo();
      const webhookUrl =
        `${WEBAPP_URL}api/botfather?token=${TELEGRAM_BOT_TOKEN}`;

      console.info(`existing webhook info fetched: ${webhookInfo.url}`);

      if (webhookInfo.url !== webhookUrl) {
        console.info("deleting existing webhook");
        await grammy.api.deleteWebhook({
          drop_pending_updates: true,
        });
        console.info("existing webhook deleted");

        console.info(`setting new webhook to: ${webhookUrl}`);
        await grammy.api.setWebhook(webhookUrl, {
          allowed_updates: [
            "callback_query",
            "inline_query",
            "channel_post",
            "message",
            "edited_channel_post",
          ],
          drop_pending_updates: true,
        });
        console.info(`bot webhook set to: ${webhookUrl}`);
      }
    }
  },
  plugins: [tailwind()],
});
