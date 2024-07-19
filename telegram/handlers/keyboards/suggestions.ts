import {
  type ChatMember,
  Composer,
  MemorySessionStorage,
} from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import { reserveKeyboard, unreserveKeyboard } from "telegram/bot.ts";
import { chatMembers } from "grammy_chatmembers";
import { getProfileLink } from "telegram/functions.ts";

const composer = new Composer<MyContext>();

const adapter = new MemorySessionStorage<ChatMember>();
composer.use(chatMembers(adapter));
// Reserve and unreserve tasks
composer.callbackQuery("reserve_task", async (ctx) => {
  const chatMember = await ctx.chatMembers.getChatMember();
  if (
    chatMember.status === "administrator" || chatMember.status === "creator"
  ) {
    const { callback_query: { from, message } } = ctx.update;
    const link = getProfileLink(from);
    const user_id = from.id;
    const { text, message_id, entities } = message!;

    if (text) {
      await ctx.reply(
        `${link} has taken on the task and will complete it soon 👩‍💻\n\n<i>You can drop the task by clicking again the button below the quoted message.</i>`,
        {
          reply_to_message_id: ctx.update.callback_query.message
            ?.message_id,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        },
      );

      const new_text = text + `\n\nTask reserved by ${user_id}`;
      await ctx.editMessageText(new_text, {
        entities: entities,
        link_preview_options: { is_disabled: true },
        reply_markup: unreserveKeyboard,
      });
      await ctx.unpinChatMessage(message_id);
    }
  } else {
    await ctx.answerCallbackQuery(
      "You need to be an admin to reserve a task!",
    );
  }
});

composer.callbackQuery("unreserve_task", async (ctx) => {
  const { callback_query: { from, message } } = ctx.update;
  const link = getProfileLink(from);
  const user_id = from.id;
  const { text, message_id, entities } = message!;

  if (text) {
    const task_user_id = parseInt(text.split("by").slice(-1)[0].trim());
    if (user_id === task_user_id) {
      await ctx.reply(
        `${link} has dropped the task marking it as unfinished 🫣\n\n<i>Another person should take on the task by clicking on the button below the quoted message.</i>`,
        {
          reply_to_message_id: message_id,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        },
      );

      const new_text = text.split("\n").slice(0, -2).join("\n");
      await ctx.editMessageText(new_text, {
        entities: entities,
        link_preview_options: { is_disabled: true },
        reply_markup: reserveKeyboard,
      });
      await ctx.pinChatMessage(message_id);
    } else {
      await ctx.answerCallbackQuery(
        "You can't unreserve a task that you didn't reserve!",
      );
    }
  }
});

export default composer;
