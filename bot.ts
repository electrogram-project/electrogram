import { grammy } from "$grammy/bot.ts";
import { green } from "$std/fmt/colors.ts";

if (grammy) {
  grammy.start({
    drop_pending_updates: true,
    allowed_updates: [
      "callback_query",
      "inline_query",
      "channel_post",
      "message",
      "edited_channel_post",
    ],
    onStart: ({ username }) => console.log(`${green(username)} started.`),
  });
}
Deno.addSignalListener("SIGINT", () => {
  if (grammy) {
    grammy.stop();
  }
});

if (Deno.build.os === "linux") {
  Deno.addSignalListener("SIGTERM", () => {
    if (grammy) {
      grammy.stop();
    }
  });
}
