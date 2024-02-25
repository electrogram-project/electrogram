import { GrammyContext } from "$grammy/context.ts";
import { Menu } from "grammy_menu";
import {
  courseGroups,
  generalGroups,
  semesters,
  years,
} from "$grammy/handlers/menus/groups.ts";
import { suggest } from "$grammy/handlers/menus/suggest.ts";
import { info } from "$grammy/handlers/menus/info.ts";
import { contact } from "$grammy/handlers/menus/contact.ts";
import { language } from "$grammy/handlers/menus/language.ts";

// Root menu
export const rootMenu = new Menu<GrammyContext>("root-menu")
  .submenu(
    (ctx) => ctx.t("root_bachelor"),
    "years-menu",
    async (ctx) => {
      ctx.session.step[0] = "b";
      await ctx.editMessageText(ctx.t("years_b_header"));
    }
  )
  .submenu(
    (ctx) => ctx.t("root_master"),
    "years-menu",
    async (ctx) => {
      ctx.session.step[0] = "m";
      await ctx.editMessageText(ctx.t("years_m_header"));
    }
  )
  .row()
  .submenu(
    (ctx) => ctx.t("root_link"),
    "suggest-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("suggest_header"));
    }
  )
  .row()
  .submenu(
    (ctx) => ctx.t("root_contact"),
    "contact-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("contact_header"));
    }
  )
  .row()
  .submenu(
    (ctx) => ctx.t("root_info"),
    "info-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("info_header"));
    }
  )
  .submenu(
    (ctx) => ctx.t("root_language"),
    "language-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("language_header"));
    }
  )
  .url("📸 Ig", "https://www.instagram.com/bio_meme_polito/")
  .row();

// Register submenus
rootMenu.register(years);
rootMenu.register(semesters, "years-menu");
rootMenu.register(courseGroups, "semesters-menu");
rootMenu.register(generalGroups, "years-menu");
rootMenu.register(suggest);
rootMenu.register(info);
rootMenu.register(contact);
rootMenu.register(language);
