import { Composer } from "grammy";
import { GrammyContext } from "$grammy/context.ts";
import { rootMenu } from "$grammy/handlers/menus/root.ts";

const composer = new Composer<GrammyContext>();

// Register menus
composer.use(rootMenu);

// Create "/start" command
composer.command("start", async (ctx) => {
  // Send the initial menu.
  await ctx.reply(ctx.t("root_header"), { reply_markup: rootMenu });
});

export default composer;
