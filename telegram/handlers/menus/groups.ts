import { MyContext } from "telegram/context.ts";
import { Menu, MenuRange } from "grammy_menu";
import { Groups } from "utils/db.ts";

// Year menu
export const years = new Menu<MyContext>("years-menu")
  .dynamic((ctx) => {
    const step = ctx.match?.toString().split("") || ["b"];
    const n_years = step[0] === "b" ? 3 : 2;
    const range = new MenuRange<MyContext>();
    range.submenu(
      { text: (ctx) => ctx.t("years_gen"), payload: step[0] + "0" },
      "general_groups-menu",
      async (ctx) => {
        await ctx.editMessageText(
          ctx.t("general_groups_" + step[0] + "_header"),
          {
            parse_mode: "HTML",
          },
        );
      },
    ).row();
    for (let i = 1; i <= n_years; i++) {
      range.submenu(
        {
          text: ctx.t("years_" + i.toString()),
          payload: step[0] + i.toString(),
        },
        "semesters-menu",
        async (ctx) => {
          await ctx.editMessageText(
            ctx.t("semesters_" + step[0] + "_header", { n_year: i.toString() }),
            {
              parse_mode: "HTML",
            },
          );
        },
      );
    }
    range.row();
    range.back(
      { text: (ctx) => ctx.t("back"), payload: step[0] },
      async (ctx) => {
        await ctx.editMessageText(ctx.t("root_header"), {
          parse_mode: "HTML",
        });
      },
    );
    return range;
  });

// Semesters menu
export const semesters = new Menu<MyContext>("semesters-menu")
  .dynamic((ctx) => {
    const step = ctx.match?.toString().split("") || ["b", "1"];
    const range = new MenuRange<MyContext>();
    for (let i = 1; i <= 2; i++) {
      range.submenu(
        {
          text: ctx.t("semesters_" + i.toString()),
          payload: step[0] + step[1] + i.toString(),
        },
        "course_groups-menu",
        async (ctx) => {
          await ctx.editMessageText(
            ctx.t("course_groups_" + step[0] + "_header", {
              n_year: step[1],
              n_sem: i.toString(),
            }),
            {
              parse_mode: "HTML",
            },
          );
        },
      );
    }
    range.row();
    range.back(
      { text: (ctx) => ctx.t("back"), payload: step[0] + step[1] },
      async (ctx) => {
        await ctx.editMessageText(ctx.t("years_" + step[0] + "_header"), {
          parse_mode: "HTML",
        });
      },
    );
    return range;
  })
  .row();

// Course groups menu
export const courseGroups = new Menu<MyContext>("course_groups-menu")
  .dynamic(async (ctx) => {
    const step = ctx.match?.toString().split("") || ["b", "1", "1"];
    const groupsList = await Groups.find({
      degree: step[0],
      year: step[1],
      semester: step[2],
    });
    const range = new MenuRange<MyContext>();
    if (groupsList.length === 0) {
      range.text(ctx.t("empty")).row();
    } else {
      for (const group of groupsList) {
        if (!group.deleted) {
          range.url(group["name"], group["url"]).row();
        }
      }
    }
    range.back(
      { text: (ctx) => ctx.t("back"), payload: step[0] + step[1] + step[2] },
      async (ctx) => {
        await ctx.editMessageText(
          ctx.t("semesters_" + step[0] + "_header", { n_year: step[1] }),
          {
            parse_mode: "HTML",
          },
        );
      },
    );
    return range;
  })
  .row();

// General groups menu
export const generalGroups = new Menu<MyContext>("general_groups-menu")
  .dynamic(async (ctx) => {
    const step = ctx.match?.toString().split("") || ["b", "0"];
    const groupsList = await Groups.find({
      degree: step[0],
      year: step[1],
      semester: 0,
    });
    const range = new MenuRange<MyContext>();
    if (groupsList.length === 0) {
      range.text(ctx.t("empty")).row();
    } else {
      for (const group of groupsList) {
        if (!group.deleted) {
          range.url(group["name"], group["url"]).row();
        }
      }
    }
    range.back(
      { text: (ctx) => ctx.t("back"), payload: step[0] + step[1] + step[2] },
      async (ctx) => {
        await ctx.editMessageText(ctx.t("years_" + step[0] + "_header"), {
          parse_mode: "HTML",
        });
      },
    );
    return range;
  })
  .row();
