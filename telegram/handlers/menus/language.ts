import { GrammyContext } from "$grammy/context.ts";
import { Menu, MenuRange } from "grammy_menu";
import { i18n } from "$grammy/bot.ts";

// Language menu
export const language = new Menu<GrammyContext>("language-menu", {
  autoAnswer: false,
})
  .dynamic(() => {
    const range = new MenuRange<GrammyContext>();
    for (const loc of i18n.locales) {
      range
        .text(i18n.t(loc, "language_flag"), async (ctx) => {
          if ((await ctx.i18n.getLocale()) !== loc) {
            await ctx.i18n.setLocale(loc);
            await ctx.editMessageText(ctx.t("language_header"));
            await ctx.answerCallbackQuery(ctx.t("language_msg_ok"));
          } else {
            await ctx.answerCallbackQuery(ctx.t("language_msg_error"));
          }
        })
        .row();
    }
    return range;
  })
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => await ctx.editMessageText(ctx.t("root_header")),
  );
