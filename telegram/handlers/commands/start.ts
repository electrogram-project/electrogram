import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import { rootMenu } from "telegram/handlers/menus/mod.ts";

const composer = new Composer<MyContext>();

// Register menus
composer.use(rootMenu);

// Create "/start" command
composer.command("start", async (ctx) => {
  // Send the initial menu.
  await ctx.reply(ctx.t("root_header"), {
    parse_mode: "HTML",
    reply_markup: rootMenu,
  });
});

export default composer;
