import { grammy } from "$grammy/bot.ts";
import { ADMIN_CHANNEL_ID, PUBLIC_CHANNEL_ID } from "$utils/constants.ts";

/**
 * Sends a new announcement with the specified text.
 *
 * @param {string} text - The text of the announcement.
 * @returns {Promise<void>} - A promise that resolves when the announcement is sent.
 */
export async function announce(text: string): Promise<void> {
  const title = "📬 <b>New annoucement</b>";
  if (grammy) {
    await grammy.api.sendMessage(parseInt(PUBLIC_CHANNEL_ID), title + text, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }
}

/**
 * Sends a new log with the specified text.
 *
 * @param {string} text - The text to be logged.
 * @returns {Promise<void>} - A promise that resolves when the logging is complete.
 */
export async function log(text: string): Promise<void> {
  const title = "📄 <b>New log</b>";
  if (grammy) {
    await grammy.api.sendMessage(parseInt(ADMIN_CHANNEL_ID), title + text, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }
}
