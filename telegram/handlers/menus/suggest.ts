import { GrammyContext } from "$grammy/context.ts";
import { Menu } from "grammy_menu";
import { WEBAPP_URL } from "$utils/constants.ts";

// Suggest menu
export const suggest = new Menu<GrammyContext>("suggest-menu")
  .webApp((ctx) => ctx.t("suggest_form"), WEBAPP_URL + "suggest")
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => await ctx.editMessageText(ctx.t("root_header")),
  );
