import { MyContext } from "telegram/context.ts";
import { Menu } from "grammy_menu";
import {
  courseGroups,
  generalGroups,
  semesters,
  years,
} from "telegram/handlers/menus/groups.ts";
import { suggest } from "telegram/handlers/menus/suggest.ts";
import { info } from "telegram/handlers/menus/info.ts";
import { contact } from "telegram/handlers/menus/contact.ts";
import { language } from "telegram/handlers/menus/language.ts";

// Root menu
export const rootMenu = new Menu<MyContext>("root-menu")
  .submenu(
    { text: (ctx) => ctx.t("root_bachelor"), payload: "b" },
    "years-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("years_b_header"), {
        parse_mode: "HTML",
      });
    },
  )
  .submenu(
    { text: (ctx) => ctx.t("root_master"), payload: "m" },
    "years-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("years_m_header"), {
        parse_mode: "HTML",
      });
    },
  )
  .row()
  .submenu(
    (ctx) => ctx.t("root_link"),
    "suggest-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("suggest_header"), {
        parse_mode: "HTML",
      });
    },
  )
  .row()
  .submenu(
    (ctx) => ctx.t("root_contact"),
    "contact-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("contact_header"), {
        parse_mode: "HTML",
      });
    },
  )
  .row()
  .url("🇪🇺 Erasmus", "https://electrogram.deno.dev/blog")
  .url("❓ Faqs", "https://t.me/faqbiomedicapolito")
  .row()
  .submenu(
    (ctx) => ctx.t("root_info"),
    "info-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("info_header"), {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      });
    },
  )
  .submenu(
    (ctx) => ctx.t("root_language"),
    "language-menu",
    async (ctx) => {
      await ctx.editMessageText(ctx.t("language_header"), {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
      });
    },
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
