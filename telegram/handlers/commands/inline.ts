import { Composer } from "grammy";
import { GrammyContext } from "$grammy/context.ts";

const composer = new Composer<GrammyContext>();

// Create "/inline" command
composer.command("inline", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("inline"));
});

export default composer;
