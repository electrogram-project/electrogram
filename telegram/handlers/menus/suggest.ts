import { MyContext } from "telegram/context.ts";
import { Menu } from "grammy_menu";
import { WEBAPP_URL } from "utils/constants.ts";

// Suggest menu
export const suggest = new Menu<MyContext>("suggest-menu")
  .webApp(
    (ctx) => ctx.t("suggest_form"),
    WEBAPP_URL + "webapp/suggest",
  )
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) =>
      await ctx.editMessageText(ctx.t("root_header"), {
        parse_mode: "HTML",
      }),
  );
