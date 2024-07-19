import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";

const composer = new Composer<MyContext>();

// Create "/inline" command
composer.command("inline", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("inline"), {
    parse_mode: "HTML",
  });
});

export default composer;
