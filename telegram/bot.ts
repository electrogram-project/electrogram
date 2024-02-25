import * as path from "$std/path/mod.ts";
import { Bot, InlineQueryResultBuilder } from "$grammy/deps.ts";
import { GrammyContext } from "$grammy/context.ts";
import { hydrateReply, parseMode } from "grammy_parse_mode";
import { I18n } from "grammy_i18n";
import { limit } from "grammy_ratelimiter";
import commands, { listOfCommands } from "$grammy/handlers/commands/mod.ts";
import session from "$grammy/middlewares/session_middleware.ts";
import { announce } from "$grammy/logger.ts";
import { createFaqEntry, getParseHTML } from "$grammy/functions.ts";
import { FAQ_CHANNEL_IDS, TELEGRAM_BOT_TOKEN } from "$utils/constants.ts";
import { Faq, Group } from "$utils/db.ts";

// Initialize the bot
let grammy: Bot<GrammyContext> | null = null;

// Create a new I18n instance.
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const i18n = new I18n<GrammyContext>({
  defaultLocale: "it",
  useSession: true,
  directory: `${__dirname}/locales`,
});

try {
  grammy = new Bot<GrammyContext>(TELEGRAM_BOT_TOKEN);
} catch (error) {
  console.error("Failed to create bot due to error: ", error);
}

if (grammy) {
  // Set the default parse_mode for ctx.reply
  grammy.api.config.use(parseMode("HTML"));
  // Register session
  grammy.use(hydrateReply<GrammyContext>);
  // Register session
  grammy.use(session);
  // Add rate limiter
  grammy.use(
    limit({
      timeFrame: 2000,
      limit: 8,
      onLimitExceeded: async (ctx) => {
        await ctx.reply("Please refrain from sending too many requests!");
      },
    })
  );
  // Register fluent middleware
  grammy.use(i18n);

  // Listen to the faq channel for new posts
  grammy.on("channel_post").filter(
    (ctx) => {
      return FAQ_CHANNEL_IDS.includes(ctx.chat.id.toString());
    },
    async (ctx) => {
      const text = ctx.update.channel_post.text || "";
      const splitText = text.split("\n");
      if (
        splitText.length > 1 &&
        splitText.slice(1).some((text) => text.trim() !== "")
      ) {
        const { message_id, chat, entities } = ctx.update.channel_post;
        const parsedText = getParseHTML(text, entities);
        const newData = createFaqEntry(message_id, chat, parsedText, text);
        // Save the new FAQ in the database
        const newFaq = new Faq(newData);
        await newFaq.save();
        // Announce the new FAQ
        await announce(`
New FAQ <a href='${newData.url}'>${newData.title}</a> added to the FAQ channel! 🎉`);
      }
    }
  );

  // Listen to the faq channel for edited posts
  grammy.on("edited_channel_post").filter(
    (ctx) => {
      return FAQ_CHANNEL_IDS.includes(ctx.chat.id.toString());
    },
    async (ctx) => {
      const text = ctx.update.edited_channel_post.text || "";
      const splitText = text.split("\n");
      if (
        splitText.length > 1 &&
        splitText.slice(1).some((text) => text.trim() !== "")
      ) {
        const { message_id, chat, entities } = ctx.update.edited_channel_post;
        const parsedText = getParseHTML(text, entities);
        const editedData = createFaqEntry(message_id, chat, parsedText, text);
        // Update the edited FAQ in the database
        await Faq.findOneAndUpdate({ message_id: message_id }, editedData, {
          upsert: true,
        });
      }
    }
  );

  // Set up the inline queries
  grammy.on("inline_query", async (ctx) => {
    const { query } = ctx.inlineQuery;
    const results = [];
    if (query.includes("faq:") && query.length > 6) {
      const faqsList = await Faq.find({
        title: { $regex: new RegExp(query.split(":")[1].trim(), "i") },
      }).exec();
      for (const faq of faqsList) {
        const title = faq.title || "FAQ Title Missing";
        const preview = faq.preview || "Preview Missing";
        results.push(
          InlineQueryResultBuilder.article(crypto.randomUUID(), title, {
            description: preview,
          }).text(
            `Have you read the faq yet?\n<a href='${faq.url}'>${faq.title}</a>
              `,
            { parse_mode: "HTML", disable_web_page_preview: true }
          )
        );
      }
    } else if (query.length > 3) {
      const groupsList = await Group.find({
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
            disable_web_page_preview: true,
          })
        );
      }
    }
    // Answer the inline query.
    await ctx.answerInlineQuery(results, { cache_time: 60 * 60 });
  });

  // Register the commands
  grammy.chatType("private");
  grammy.use(commands);
  grammy.api
    .setMyCommands(listOfCommands.filter((c) => c.show))
    .then(() => {
      console.log("Default commands have been uploaded to BotFather!");
    })
    .catch((e) =>
      console.error("Failed to upload default commands to BotFather!", e)
    );
}

export { grammy };
