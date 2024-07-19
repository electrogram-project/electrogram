import {
  type ChatMember,
  Composer,
  MemorySessionStorage,
} from "telegram/deps.ts";
import { MyContext } from "telegram/context.ts";
import { chatMembers } from "grammy_chatmembers";
import { PUBLIC_GROUP_ID } from "utils/constants.ts";
import { bot } from "telegram/bot.ts";

const composer = new Composer<MyContext>();

const adapter = new MemorySessionStorage<ChatMember>();
composer.use(chatMembers(adapter));

// Mark message as read
composer.callbackQuery("read_task", async (ctx) => {
  const chatMember = await ctx.chatMembers.getChatMember();
  if (
    chatMember.status === "administrator" || chatMember.status === "creator"
  ) {
    const { callback_query: { from, message } } = ctx.update;
    const user_id = from.id;
    const { text, message_id, entities } = message!;

    if (text) {
      const new_text = text + `\n\nMessage read by ${user_id}`;
      await ctx.editMessageText(new_text, {
        entities: entities,
        link_preview_options: { is_disabled: true },
      });

      await ctx.unpinChatMessage(message_id);
    }
  } else {
    await ctx.answerCallbackQuery(
      "You need to be an admin to mark the message as read!",
    );
  }
});

composer.callbackQuery("announce_task", async (ctx) => {
  const chatMember = await ctx.chatMembers.getChatMember();
  if (
    chatMember.status === "administrator" || chatMember.status === "creator"
  ) {
    const { callback_query: { from, message } } = ctx.update;
    const user_id = from.id;
    const { text, message_id, entities } = message!;

    if (text) {
      const new_text = text + `\n\nMessage announced by ${user_id}`;
      await ctx.editMessageText(new_text, {
        entities: entities,
        link_preview_options: { is_disabled: true },
      });

      const jsonMatch = text.match(/{[^}]*}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const jsonObject = JSON.parse(jsonString);

        await bot.api.sendMessage(
          parseInt(PUBLIC_GROUP_ID),
          "📬 \*New annoucement* \n\n" +
            `[${
              jsonObject.name || jsonObject.title
            }](${jsonObject.url}) added to the database\\!`,
          {
            parse_mode: "MarkdownV2",
            link_preview_options: { is_disabled: true },
          },
        );
      }
      await ctx.unpinChatMessage(message_id);
    }
  } else {
    await ctx.answerCallbackQuery(
      "You need to be an admin to announce a message!",
    );
  }
});

export default composer;
