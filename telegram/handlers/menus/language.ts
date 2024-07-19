import { MyContext } from "telegram/context.ts";
import { Menu } from "grammy_menu";

// Language menu
export const language = new Menu<MyContext>("language-menu")
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) =>
      await ctx.editMessageText(ctx.t("root_header"), {
        parse_mode: "HTML",
      }),
  );
