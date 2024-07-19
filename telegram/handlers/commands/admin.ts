import { Composer } from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import { bot } from "telegram/bot.ts";
import { getFullName } from "telegram/functions.ts";
import { InlineKeyboard } from "telegram/deps.ts";
import { ADMIN_GROUP_ID, WEBAPP_URL } from "utils/constants.ts";
import { Groups } from "utils/db.ts";

const composer = new Composer<MyContext>();

const adminKeyboard = new InlineKeyboard()
  .webApp(
    `Approve a group`,
    WEBAPP_URL + "webapp/pending_groups",
  ).row()
  .webApp(
    `Modify a group`,
    WEBAPP_URL + "webapp/current_groups",
  ).row()
  .webApp(
    `Recover/delete a group`,
    WEBAPP_URL + "webapp/deleted_groups",
  )
  .row();

// Create "/admin" command
composer.command("admin", async (ctx) => {
  const admins = await bot.api.getChatAdministrators(ADMIN_GROUP_ID);
  const isAdmin = admins.some((admin) => admin.user.id === ctx.from?.id);

  const groupsList = await Groups.find();
  const pendingGroupsCount = groupsList.filter((group) =>
    group.status === "pending" && group.deleted === false
  ).length;
  const currentGroupsCount = groupsList.filter((group) =>
    group.status != "pending" && group.deleted === false
  ).length;
  const deletedGroupsCount = groupsList.filter((group) =>
    group.deleted === true
  ).length;

  if (isAdmin) {
    await ctx.replyWithChatAction("typing");
    await ctx.reply(
      ctx.t("admin", {
        name: getFullName(ctx.from!).replaceAll(".", ""),
        pending: pendingGroupsCount,
        current: currentGroupsCount,
        deleted: deletedGroupsCount,
      }),
      {
        parse_mode: "HTML",
        reply_markup: adminKeyboard,
      },
    );
  } else {
    await ctx.reply("You are not authorized to use this command.");
  }
});

export default composer;
