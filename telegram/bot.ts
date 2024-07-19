import * as path from "$std/path/mod.ts";
import {
  Bot,
  GrammyError,
  HttpError,
  InlineKeyboard,
  InlineQueryResultBuilder,
} from "telegram/deps.ts";
import { limit } from "grammy_ratelimiter";
import { I18n } from "grammy_i18n";
import { MyContext } from "telegram/context.ts";
import commands from "telegram/handlers/commands/mod.ts";
import keyboards from "telegram/handlers/keyboards/mod.ts";
import { Groups } from "utils/db.ts";
import { ADMIN_GROUP_ID, TELEGRAM_BOT_TOKEN } from "utils/constants.ts";

// Create a new bot
export const bot = new Bot<MyContext>(TELEGRAM_BOT_TOKEN);

// Create a new I18n instance.
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const i18n = new I18n<MyContext>({
  defaultLocale: "en",
  directory: `${__dirname}/locales`,
});

// Use middlewares
bot.use(i18n); // i18n
bot.use(keyboards); // Keyboards
bot.chatType("private").use(commands); // Commands
bot.use(
  limit({
    timeFrame: 2000,
    limit: 8,
  }),
); // Rate limiter

// Define the inline keyboards
export const reserveKeyboard = new InlineKeyboard()
  .text("✅ Reserve", "reserve_task");
export const unreserveKeyboard = new InlineKeyboard()
  .text("❌ Drop", "unreserve_task");
export const readKeyboard = new InlineKeyboard()
  .text("📖 Mark as read", "read_task");
export const readannounceKeyboard = new InlineKeyboard()
  .text("📖 Mark as read", "read_task").row()
  .text("📬 Announce", "announce_task");

// Send a new log to the admin group
export async function logSuggestion(text: string): Promise<void> {
  const title = "📄 <b>New Suggestion</b>\n";

  const sentMessage = await bot.api.sendMessage(
    parseInt(ADMIN_GROUP_ID),
    title + text,
    {
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      reply_markup: reserveKeyboard,
    },
  );
  await bot.api.pinChatMessage(
    parseInt(ADMIN_GROUP_ID),
    sentMessage.message_id,
  );
}

// Sends a new log with the specified text
export async function logMessage(
  text: string,
  announce: boolean = false,
): Promise<void> {
  const title = "💌 <b>New Log</b>\n";

  const sentMessage = await bot.api.sendMessage(
    parseInt(ADMIN_GROUP_ID),
    title + text,
    {
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      reply_markup: announce ? readannounceKeyboard : readKeyboard,
    },
  );
  await bot.api.pinChatMessage(
    parseInt(ADMIN_GROUP_ID),
    sentMessage.message_id,
  );
}

// Handle inline queries
bot.on("inline_query", async (ctx) => {
  const { query } = ctx.inlineQuery;
  const results = [];
  if (query.length > 3) {
    const groupsList = await Groups.find({
      name: { $regex: query, $options: "i" },
    }).exec();
    for (const group of groupsList) {
      const name = group.name || "Group Name Missing";
      const url = group.url || "https://example.com/";
      results.push(
        InlineQueryResultBuilder.article(crypto.randomUUID(), name, {
          url: url,
        }).text(`<a href='${group.url}'>${group.name}</a>`, {
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        }),
      );
    }
  }
  await ctx.answerInlineQuery(results, { cache_time: 60 * 60 });
});

// Handle unknown commands
bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery("Error: send /start to restart the bot.");
});

// Log errors
bot.catch((err) => {
  const { ctx } = err;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});
