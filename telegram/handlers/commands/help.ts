import { Composer } from "grammy";
import { GrammyContext } from "$grammy/context.ts";
import { getFullName } from "$grammy/functions.ts";

const composer = new Composer<GrammyContext>();

// Create "/help" command
composer.command("help", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(
    ctx.t("help", {
      name: getFullName(ctx.from!).replaceAll(".", ""),
    }),
  );
});

export default composer;
