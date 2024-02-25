import { GrammyContext, GrammySession } from "$grammy/context.ts";
import { Menu, MenuRange } from "grammy_menu";
import { Group } from "$utils/db.ts";

// Year menu
export const years = new Menu<GrammyContext>("years-menu")
  .submenu(
    (ctx) => ctx.t("years_gen"),
    "general_groups-menu",
    async (ctx) => {
      const step = ctx.session.step as GrammySession["step"];
      await ctx.editMessageText(ctx.t("general_groups_" + step[0] + "_header"));
    }
  )
  .row()
  .dynamic((ctx) => {
    const step = ctx.session.step as GrammySession["step"];
    const n_years = step[0] === "b" ? 3 : 2;
    const range = new MenuRange<GrammyContext>();
    for (let i = 1; i <= n_years; i++) {
      range.submenu(
        ctx.t("years_" + i.toString()),
        "semesters-menu",
        async (ctx) => {
          ctx.session.step[1] = i.toString();
          await ctx.editMessageText(
            ctx.t("semesters_" + step[0] + "_header", { n_year: i.toString() })
          );
        }
      );
    }
    return range;
  })
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => {
      await ctx.editMessageText(ctx.t("root_header"));
    }
  );

// Semesters menu
export const semesters = new Menu<GrammyContext>("semesters-menu")
  .dynamic((ctx) => {
    const step = ctx.session.step as GrammySession["step"];
    const range = new MenuRange<GrammyContext>();
    for (let i = 1; i <= 2; i++) {
      range.submenu(
        ctx.t("semesters_" + i.toString()),
        "course_groups-menu",
        async (ctx) => {
          ctx.session.step[2] = i.toString();
          await ctx.editMessageText(
            ctx.t("course_groups_" + step[0] + "_header", {
              n_year: step[1],
              n_sem: i.toString(),
            })
          );
        }
      );
    }
    return range;
  })
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => {
      const step = ctx.session.step as GrammySession["step"];
      await ctx.editMessageText(ctx.t("years_" + step[0] + "_header"));
    }
  );

// Course groups menu
export const courseGroups = new Menu<GrammyContext>("course_groups-menu")
  .dynamic(async (ctx) => {
    const step = ctx.session.step as GrammySession["step"];
    const groupsList = await Group.find({
      degree: step[0],
      year: step[1],
      semester: step[2],
    });
    const range = new MenuRange<GrammyContext>();
    if (groupsList.length === 0) {
      range.text(ctx.t("empty")).row();
    } else {
      for (const group of groupsList) {
        if (group.deletedBy == "") {
          range.url(group["name"], group["url"]).row();
        }
      }
    }
    return range;
  })
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => {
      const step = ctx.session.step as GrammySession["step"];
      await ctx.editMessageText(
        ctx.t("semesters_" + step[0] + "_header", { n_year: step[1] })
      );
    }
  );

// General groups menu
export const generalGroups = new Menu<GrammyContext>("general_groups-menu")
  .dynamic(async (ctx) => {
    const step = ctx.session.step as GrammySession["step"];
    const groupsList = await Group.find({
      degree: step[0],
      year: 0,
      semester: 0,
    });
    const range = new MenuRange<GrammyContext>();
    if (groupsList.length === 0) {
      range.text(ctx.t("empty")).row();
    } else {
      for (const group of groupsList) {
        if (group.deletedBy == "") {
          range.url(group["name"], group["url"]).row();
        }
      }
    }
    return range;
  })
  .row()
  .back(
    (ctx) => ctx.t("back"),
    async (ctx) => {
      const step = ctx.session.step as GrammySession["step"];
      await ctx.editMessageText(ctx.t("years_" + step[0] + "_header"));
    }
  );
