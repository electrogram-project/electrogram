import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";

const composer = new Composer<MyContext>();

// Create "/help" command
composer.command("privacy", async (ctx) => {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(
        ctx.t("privacy"),
        {
            parse_mode: "HTML",
        },
    );
});

export default composer;
