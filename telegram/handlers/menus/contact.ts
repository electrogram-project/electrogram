import { GrammyContext } from "$grammy/context.ts";
import { Menu } from "grammy_menu";
import { WEBAPP_URL } from "$utils/constants.ts";

// Contact menu
export const contact = new Menu<GrammyContext>("contact-menu")
  .webApp((ctx) => ctx.t("contact_form"), WEBAPP_URL + "contact")
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => await ctx.editMessageText(ctx.t("root_header")),
  );
