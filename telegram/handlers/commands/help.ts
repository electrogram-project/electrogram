import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import { getFullName } from "telegram/functions.ts";

const composer = new Composer<MyContext>();

// Create "/help" command
composer.command("help", async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(
    ctx.t("help", {
      name: getFullName(ctx.from!).replaceAll(".", ""),
    }),
    {
      parse_mode: "HTML",
    },
  );
});

export default composer;
