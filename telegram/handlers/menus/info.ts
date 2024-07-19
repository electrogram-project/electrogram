import { MyContext } from "telegram/context.ts";
import { Menu } from "grammy_menu";

// Info menu
export const info = new Menu<MyContext>("info-menu").back(
  (ctx) => ctx.t("back"),
  async (ctx) =>
    await ctx.editMessageText(ctx.t("root_header"), {
      parse_mode: "HTML",
    }),
);
